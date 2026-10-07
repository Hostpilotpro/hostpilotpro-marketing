import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { DatabaseSync } from 'node:sqlite';
import { createDemoServer } from './server.mjs';

test('signup, durable accounts, company isolation and invitation permissions', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'hostpilotpro-demo-'));
  const databasePath = join(directory, 'test.sqlite');
  let server;
  let origin;
  async function start() {
    server = createDemoServer({ databasePath });
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    origin = `http://127.0.0.1:${server.address().port}`;
  }
  async function call(path, { method = 'GET', data, cookie, foreignOrigin } = {}) {
    const response = await fetch(`${origin}/api/sandbox/${path}`, {
      method, headers: { Origin: foreignOrigin || origin, ...(cookie ? { Cookie: cookie } : {}), ...(data ? { 'Content-Type': 'application/json' } : {}) },
      body: data ? JSON.stringify(data) : undefined,
    });
    return { status: response.status, data: await response.json(), cookie: response.headers.get('set-cookie')?.split(';')[0], headers: response.headers };
  }
  const account = (company, email) => ({ name: 'Test Admin', company, email, password: 'Only-for-demo-12345', country: 'Thailand', currency: 'THB', timezone: 'Asia/Bangkok', provider: 'Hostaway' });
  try {
    await start();
    assert.equal((await call('workspace')).status, 401);
    assert.equal((await call('signup', { method: 'POST', foreignOrigin: 'https://unrelated.example', data: account('A', 'a@example.test') })).status, 403);
    assert.equal((await call('signup', { method: 'POST', data: { ...account('A', 'a@example.test'), password: 'short' } })).status, 400);
    const a = await call('signup', { method: 'POST', data: account('Sunshine Sample', 'a@example.test') });
    assert.equal(a.status, 201);
    assert.match(a.headers.get('set-cookie'), /HttpOnly; SameSite=Strict/);
    assert.equal(a.data.properties.length, 0);
    assert.equal(a.data.user.role, 'admin');
    assert.equal(a.data.user.password, undefined);
    assert.equal((await call('signup', { method: 'POST', data: account('Duplicate', 'A@example.test') })).status, 409);
    const b = await call('signup', { method: 'POST', data: { ...account('Other Company', 'b@example.test'), currency: 'EUR', timezone: 'Europe/Amsterdam', provider: 'Guesty' } });
    assert.equal(b.status, 201);
    assert.notEqual(a.data.company.id, b.data.company.id);
    const loaded = await call('load-samples', { method: 'POST', cookie: a.cookie });
    assert.equal(loaded.data.properties.length, 40);
    assert.equal(loaded.data.tasks.length, 6);
    assert.equal((await call('load-samples', { method: 'POST', cookie: a.cookie })).data.properties.length, 40);
    const task = loaded.data.tasks[0];
    assert.equal((await call(`tasks/${task.id}`, { method: 'PATCH', data: { done: true, company_id: a.data.company.id }, cookie: b.cookie })).status, 404);
    assert.equal((await call('workspace', { cookie: b.cookie })).data.properties.length, 0);
    const updated = await call(`tasks/${task.id}`, { method: 'PATCH', data: { done: true }, cookie: a.cookie });
    assert.equal(updated.data.tasks.find(t => t.id === task.id).done, 1);
    const invitation = await call('invites', { method: 'POST', data: { email: 'staff@example.test', role: 'field' }, cookie: a.cookie });
    assert.equal(invitation.status, 201);
    const token = invitation.data.invitationPath.split('#')[1];
    assert.equal((await call('accept-invite', { method: 'POST', data: { name: 'Bad', email: 'wrong@example.test', password: 'Only-for-demo-12345', token } })).status, 400);
    const teammate = await call('accept-invite', { method: 'POST', data: { name: 'Field Teammate', email: 'staff@example.test', password: 'Only-for-demo-12345', token, role: 'admin', company_id: b.data.company.id } });
    assert.equal(teammate.status, 201);
    assert.equal(teammate.data.company.id, a.data.company.id);
    assert.equal(teammate.data.user.role, 'field');
    assert.equal(teammate.data.properties.length, 40);
    assert.equal(teammate.data.team.length, 2);
    assert.equal((await call('invites', { method: 'POST', data: { email: 'extra@example.test', role: 'manager' }, cookie: teammate.cookie })).status, 403);
    assert.equal((await call('load-samples', { method: 'POST', cookie: teammate.cookie })).status, 403);
    assert.equal((await call('accept-invite', { method: 'POST', data: { name: 'Replay', email: 'staff@example.test', password: 'Only-for-demo-12345', token } })).status, 409);
    assert.equal((await call('logout', { method: 'POST', cookie: a.cookie })).status, 200);
    assert.equal((await call('workspace', { cookie: a.cookie })).status, 401);
    assert.equal((await call('login', { method: 'POST', data: { email: 'a@example.test', password: 'wrong' } })).status, 401);
    await new Promise(resolve => server.close(resolve));
    await start();
    const login = await call('login', { method: 'POST', data: { email: 'a@example.test', password: 'Only-for-demo-12345' } });
    assert.equal(login.status, 200);
    assert.equal(login.data.properties.length, 40);
    assert.equal(login.data.tasks.find(t => t.id === task.id).done, 1);
    const db = new DatabaseSync(databasePath);
    const stored = db.prepare('SELECT password FROM users WHERE email = ?').get('a@example.test').password;
    assert.notEqual(stored, 'Only-for-demo-12345');
    assert.match(stored, /^[a-f0-9]{32}:[a-f0-9]{128}$/);
    db.close();
  } finally {
    if (server?.listening) await new Promise(resolve => server.close(resolve));
    rmSync(directory, { recursive: true, force: true });
  }
});
