// Local-only signup lab. No MPS credentials, providers, messages or payments.
import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { randomBytes, randomUUID, createHash, scrypt as derive, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { mkdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { dirname, resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const scrypt = promisify(derive);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const hash = value => createHash('sha256').update(value).digest('hex');
const lifetime = 8 * 60 * 60 * 1000;
const fail = (status, message) => Object.assign(new Error(message), { status });
const text = (value, label, max = 120) => {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) throw fail(400, `Enter a valid ${label}.`);
  return value.trim();
};
const email = value => {
  const result = text(value, 'email', 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result)) throw fail(400, 'Enter a valid email.');
  return result;
};
async function passwordRecord(value) {
  if (typeof value !== 'string' || value.length < 12 || value.length > 128) throw fail(400, 'Use a password of 12–128 characters.');
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${(await scrypt(value, salt, 64)).toString('hex')}`;
}
async function verifyPassword(value, record) {
  if (typeof value !== 'string' || value.length > 128) return false;
  const [salt, digest] = record.split(':');
  return timingSafeEqual(await scrypt(value, salt, 64), Buffer.from(digest, 'hex'));
}
async function body(req) {
  if (!req.headers['content-type']?.startsWith('application/json')) throw fail(415, 'Use JSON.');
  let data = '';
  for await (const part of req) {
    data += part;
    if (Buffer.byteLength(data) > 16384) throw fail(413, 'Request too large.');
  }
  try { return JSON.parse(data); } catch { throw fail(400, 'Invalid request.'); }
}

export function createDemoServer({ databasePath = resolve(root, '.sandbox/demo.sqlite'), distPath = resolve(root, 'dist') } = {}) {
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') throw new Error('The signup lab runs locally only.');
  if (databasePath !== ':memory:') mkdirSync(dirname(databasePath), { recursive: true });
  const db = new DatabaseSync(databasePath);
  db.exec(`PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS companies (id TEXT PRIMARY KEY, name TEXT NOT NULL, country TEXT NOT NULL, currency TEXT NOT NULL, timezone TEXT NOT NULL, provider TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, company_id TEXT NOT NULL REFERENCES companies(id), name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS properties (id TEXT PRIMARY KEY, company_id TEXT NOT NULL REFERENCES companies(id), name TEXT NOT NULL, bedrooms INTEGER NOT NULL, area TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, company_id TEXT NOT NULL REFERENCES companies(id), property_id TEXT NOT NULL REFERENCES properties(id), title TEXT NOT NULL, done INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS invites (token_hash TEXT PRIMARY KEY, company_id TEXT NOT NULL REFERENCES companies(id), email TEXT NOT NULL, role TEXT NOT NULL, expires INTEGER NOT NULL, accepted INTEGER NOT NULL DEFAULT 0);`);
  const attempts = new Map();
  const dummyPassword = passwordRecord(randomBytes(24).toString('hex'));
  function transaction(action) {
    db.exec('BEGIN IMMEDIATE');
    try { const value = action(); db.exec('COMMIT'); return value; }
    catch (error) { db.exec('ROLLBACK'); throw error; }
  }
  const cookie = token => `hp_demo=${token}; HttpOnly; SameSite=Strict; Path=/api/sandbox; Max-Age=${lifetime / 1000}`;
  function issueSession(userId, res) {
    db.prepare('DELETE FROM sessions WHERE expires <= ?').run(Date.now());
    const token = randomBytes(32).toString('hex');
    db.prepare('INSERT INTO sessions VALUES (?, ?, ?)').run(hash(token), userId, Date.now() + lifetime);
    res.setHeader('Set-Cookie', cookie(token));
  }
  function userFor(req) {
    const token = req.headers.cookie?.split(';').map(s => s.trim()).find(s => s.startsWith('hp_demo='))?.slice(8);
    if (!token) return null;
    return db.prepare('SELECT u.id, u.company_id, u.name, u.email, u.role FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires > ?').get(hash(token), Date.now()) || null;
  }
  function workspace(user) {
    const company = db.prepare('SELECT * FROM companies WHERE id = ?').get(user.company_id);
    return {
      user, company,
      properties: db.prepare('SELECT * FROM properties WHERE company_id = ? ORDER BY name').all(user.company_id),
      tasks: db.prepare('SELECT t.*, p.name AS property_name FROM tasks t JOIN properties p ON p.id = t.property_id AND p.company_id = t.company_id WHERE t.company_id = ? ORDER BY p.name').all(user.company_id),
      team: db.prepare('SELECT id, name, email, role FROM users WHERE company_id = ? ORDER BY name').all(user.company_id),
      invites: user.role === 'admin' ? db.prepare('SELECT email, role, expires FROM invites WHERE company_id = ? AND accepted = 0 AND expires > ?').all(user.company_id, Date.now()) : [],
    };
  }
  const server = createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('X-Frame-Options', 'DENY');
    const send = (status, value) => { res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(value)); };
    try {
      const port = server.address()?.port;
      if (![`127.0.0.1:${port}`, `localhost:${port}`].includes(req.headers.host)) throw fail(403, 'Local demo only.');
      const url = new URL(req.url, `http://${req.headers.host}`);
      const path = url.pathname;
      if (!path.startsWith('/api/sandbox/')) {
        if (req.method !== 'GET' && req.method !== 'HEAD') throw fail(405, 'Method not allowed.');
        let file = resolve(distPath, `.${decodeURIComponent(path)}`);
        if (!file.startsWith(resolve(distPath) + sep)) throw fail(404, 'Not found.');
        if (path.startsWith('/sandbox/') || ['/', '/sandbox', '/capabilities', '/ops', '/owner', '/guest', '/full-suite', '/field', '/demo', '/pricing', '/tour', '/about', '/proof', '/blog', '/features'].includes(path)) file = resolve(distPath, 'index.html');
        if (!existsSync(file) || !statSync(file).isFile()) throw fail(404, 'Build the website with npm run build first.');
        const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };
        res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
        return res.end(req.method === 'HEAD' ? undefined : readFileSync(file));
      }
      if (req.method !== 'GET') {
        if (req.headers.origin !== `http://${req.headers.host}`) throw fail(403, 'Open the form in this demo website.');
      }
      if (path === '/api/sandbox/status' && req.method === 'GET') return send(200, { mode: 'local-isolated-demo', outboundIntegrations: false });
      if (['/api/sandbox/signup', '/api/sandbox/login', '/api/sandbox/accept-invite'].includes(path) && req.method === 'POST') {
        const key = req.socket.remoteAddress;
        const now = Date.now();
        for (const [address, record] of attempts) if (now - record.start > 300000) attempts.delete(address);
        const record = attempts.get(key) || { start: now, count: 0 };
        attempts.set(key, record);
        if (++record.count > 20) throw fail(429, 'Too many attempts. Try again in five minutes.');
        const input = await body(req);
        const accountEmail = email(input.email);
        if (path === '/api/sandbox/login') {
          const row = db.prepare('SELECT * FROM users WHERE email = ?').get(accountEmail);
          const valid = await verifyPassword(input.password, row?.password || await dummyPassword);
          if (!row || !valid) throw fail(401, 'Email or password is incorrect.');
          issueSession(row.id, res); return send(200, workspace(userFor({ headers: { cookie: res.getHeader('Set-Cookie') } })));
        }
        const name = text(input.name, 'name');
        const password = await passwordRecord(input.password);
        const userId = randomUUID();
        const companyId = transaction(() => {
          if (db.prepare('SELECT id FROM users WHERE email = ?').get(accountEmail)) throw fail(409, 'This email already has a demo account. Sign in instead.');
          if (path === '/api/sandbox/accept-invite') {
            const invitation = db.prepare('SELECT * FROM invites WHERE token_hash = ? AND accepted = 0 AND expires > ?').get(hash(text(input.token, 'invitation', 128)), Date.now());
            if (!invitation || invitation.email !== accountEmail) throw fail(400, 'Invitation is invalid, expired or for a different email.');
            db.prepare('INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)').run(userId, invitation.company_id, name, accountEmail, password, invitation.role);
            db.prepare('UPDATE invites SET accepted = 1 WHERE token_hash = ?').run(invitation.token_hash);
            return invitation.company_id;
          }
          const id = randomUUID();
          const country = text(input.country, 'country', 60);
          const currency = text(input.currency, 'currency', 3).toUpperCase();
          if (!['THB', 'USD', 'EUR', 'GBP', 'MYR', 'IDR', 'VND'].includes(currency)) throw fail(400, 'Choose a supported currency.');
          const timezone = text(input.timezone, 'timezone', 80);
          try { new Intl.DateTimeFormat('en', { timeZone: timezone }); } catch { throw fail(400, 'Choose a valid timezone.'); }
          const provider = text(input.provider, 'booking system', 40);
          if (!['Hostaway', 'Guesty', 'Lodgify', 'Other', 'None yet'].includes(provider)) throw fail(400, 'Choose a booking system.');
          db.prepare('INSERT INTO companies VALUES (?, ?, ?, ?, ?, ?)').run(id, text(input.company, 'company name'), country, currency, timezone, provider);
          db.prepare('INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)').run(userId, id, name, accountEmail, password, 'admin');
          return id;
        });
        issueSession(userId, res);
        return send(201, workspace({ id: userId, company_id: companyId, name, email: accountEmail, role: db.prepare('SELECT role FROM users WHERE id = ?').get(userId).role }));
      }
      const user = userFor(req);
      if (!user) throw fail(401, 'Sign in to your demo workspace.');
      if (path === '/api/sandbox/workspace' && req.method === 'GET') return send(200, workspace(user));
      if (path === '/api/sandbox/logout' && req.method === 'POST') {
        db.prepare('DELETE FROM sessions WHERE user_id = ?').run(user.id);
        res.setHeader('Set-Cookie', 'hp_demo=; HttpOnly; SameSite=Strict; Path=/api/sandbox; Max-Age=0');
        return send(200, { ok: true });
      }
      if (path === '/api/sandbox/load-samples' && req.method === 'POST') {
        if (user.role !== 'admin') throw fail(403, 'Only your company administrator can load sample properties.');
        transaction(() => {
          if (db.prepare('SELECT id FROM properties WHERE company_id = ? LIMIT 1').get(user.company_id)) return;
          for (let i = 1; i <= 40; i++) {
            const id = randomUUID();
            db.prepare('INSERT INTO properties VALUES (?, ?, ?, ?, ?)').run(id, user.company_id, `Demo Villa ${String(i).padStart(2, '0')}`, 2 + i % 4, ['Bophut', 'Lamai', 'Maenam', 'Choeng Mon'][i % 4]);
            if (i <= 6) db.prepare('INSERT INTO tasks VALUES (?, ?, ?, ?, 0)').run(randomUUID(), user.company_id, id, i % 2 ? 'Sample pool inspection' : 'Sample arrival preparation');
          }
        });
        return send(200, workspace(user));
      }
      const taskMatch = path.match(/^\/api\/sandbox\/tasks\/([a-f0-9-]+)$/);
      if (taskMatch && req.method === 'PATCH') {
        const input = await body(req);
        if (typeof input.done !== 'boolean') throw fail(400, 'Choose a task status.');
        const result = db.prepare('UPDATE tasks SET done = ? WHERE id = ? AND company_id = ?').run(Number(input.done), taskMatch[1], user.company_id);
        if (!result.changes) throw fail(404, 'Task not found.');
        return send(200, workspace(user));
      }
      if (path === '/api/sandbox/invites' && req.method === 'POST') {
        if (user.role !== 'admin') throw fail(403, 'Only your company administrator can invite people.');
        const input = await body(req);
        const inviteEmail = email(input.email);
        if (!['manager', 'field'].includes(input.role)) throw fail(400, 'Choose manager or field staff.');
        if (db.prepare('SELECT id FROM users WHERE email = ?').get(inviteEmail)) throw fail(409, 'This email already has a demo account.');
        if (db.prepare('SELECT COUNT(*) AS count FROM invites WHERE company_id = ? AND expires > ? AND accepted = 0').get(user.company_id, Date.now()).count >= 20) throw fail(400, 'This demo supports 20 pending invitations.');
        const token = randomBytes(32).toString('hex');
        db.prepare('INSERT INTO invites VALUES (?, ?, ?, ?, ?, 0)').run(hash(token), user.company_id, inviteEmail, input.role, Date.now() + 7 * 86400000);
        return send(201, { invitationPath: `/sandbox/join#${token}`, email: inviteEmail });
      }
      throw fail(404, 'Not found.');
    } catch (error) {
      if (!error.status) console.error('Local demo request failed:', error.message);
      send(error.status || 500, { error: error.status ? error.message : 'The demo could not complete this request.' });
    }
  });
  server.on('close', () => db.close());
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  createDemoServer().listen(5417, '127.0.0.1', () => console.log('Isolated HostPilotPro demo: http://127.0.0.1:5417/sandbox/signup'));
}
