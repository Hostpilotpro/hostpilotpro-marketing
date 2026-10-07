import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { PGlite } from '@electric-sql/pglite';

test('PostgreSQL enforces tenant isolation, verified identity and guarded invitations', async () => {
  const db = new PGlite();
  try {
    await db.exec(`create role anon; create role authenticated; create schema auth;
      create table auth.users(id uuid primary key,email text,email_confirmed_at timestamptz,is_anonymous boolean default false,banned_until timestamptz);
      create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid; $$;
      grant usage on schema auth to authenticated,anon;`);
    const schema=await readFile(new URL('../database/schema.sql', import.meta.url), 'utf8');
    const migration=await readFile(new URL('../supabase/migrations/20261007080641_company_foundation.sql', import.meta.url), 'utf8');
    assert.equal(migration,schema,'Deployment migration must match the schema exercised by these tests.');
    await db.exec(migration);
    await db.exec(await readFile(new URL('../supabase/migrations/20261007084606_tenant_access_indexes.sql', import.meta.url), 'utf8'));
    const [a,b,field,unverified,impostor] = Array.from({length:5},()=>randomUUID());
    for(const [id,email,verified] of [[a,'admin-a@example.test',true],[b,'admin-b@example.test',true],[field,'field@example.test',true],[unverified,'unverified@example.test',false],[impostor,'impostor@example.test',true]]) {
      await db.query('insert into auth.users(id,email,email_confirmed_at) values($1,$2,$3)',[id,email,verified?new Date().toISOString():null]);
    }
    async function as(id,role='authenticated') {
      await db.exec(`reset role; set role ${role};`);
      await db.query("select set_config('request.jwt.claim.sub',$1,false)",[id||'']);
    }
    async function create(name) {
      return (await db.query("select public.hp_create_company($1,'Thailand','THB','Asia/Bangkok','Hostaway','Demo Administrator') as id",[name])).rows[0].id;
    }
    await as(null,'anon');
    await assert.rejects(db.query('select * from public.hp_companies'),/permission denied/);
    await assert.rejects(create('No anonymous company'),/permission denied/);
    await as(unverified);
    await assert.rejects(create('No unverified company'),/Verify your email/);
    await as(a); const companyA=await create('Sunshine Villas — Fictional');
    await assert.rejects(create('Duplicate company'),/already belongs/);
    await db.query('select public.hp_load_demo_portfolio()');
    await db.query('select public.hp_load_demo_portfolio()');
    assert.equal((await db.query('select count(*) as n from public.hp_properties')).rows[0].n,40);
    const taskA=(await db.query('select id from public.hp_tasks limit 1')).rows[0].id;
    await db.query('update public.hp_tasks set done=true where id=$1',[taskA]);
    assert.equal((await db.query('select done from public.hp_tasks where id=$1',[taskA])).rows[0].done,true);
    await assert.rejects(db.query("update public.hp_memberships set role='admin'"),/permission denied/);
    await assert.rejects(db.query("select public.hp_create_team_invite('field@example.test','admin')"),/Choose manager or field/);
    const token=(await db.query("select public.hp_create_team_invite('FIELD@example.test','field') as token")).rows[0].token;
    assert.match(token,/^[a-f0-9]{64}$/);
    await assert.rejects(db.query('select * from hp_private.invites'),/permission denied/);
    assert.equal((await db.query('select * from public.hp_list_team_invites()')).rows[0].email,'field@example.test');
    await as(b);const companyB=await create('Cloud Villas — Fictional');
    assert.notEqual(companyA,companyB);
    assert.equal((await db.query('select * from public.hp_companies')).rows.length,1);
    assert.equal((await db.query('select * from public.hp_companies where id=$1',[companyA])).rows.length,0);
    assert.equal((await db.query('select * from public.hp_memberships')).rows.length,1);
    assert.equal((await db.query('select * from public.hp_properties')).rows.length,0);
    assert.equal((await db.query('select * from public.hp_tasks')).rows.length,0);
    assert.equal((await db.query('update public.hp_tasks set done=false where id=$1 returning id',[taskA])).rows.length,0);
    await assert.rejects(db.query('update public.hp_tasks set company_id=$1 where id=$2',[companyB,taskA]),/permission denied/);
    await db.query('select public.hp_load_demo_portfolio()');
    const taskB=(await db.query('select id from public.hp_tasks limit 1')).rows[0].id;
    assert.equal((await db.query('select count(*) as n from public.hp_properties')).rows[0].n,40);
    await as(impostor);
    // A forged editable metadata claim cannot replace the verified auth.users email.
    await db.query("select set_config('request.jwt.claims',$1,false)",[JSON.stringify({sub:impostor,user_metadata:{email:'field@example.test',company_id:companyA,role:'admin'}})]);
    await assert.rejects(db.query('select public.hp_accept_team_invite($1,$2)',[token,'Wrong person']),/invited email/);
    await as(field);
    assert.equal((await db.query('select public.hp_accept_team_invite($1,$2) as id',[token,'Demo Field Worker'])).rows[0].id,companyA);
    assert.equal((await db.query('select role from public.hp_memberships where user_id=$1',[field])).rows[0].role,'field');
    assert.equal((await db.query('select count(*) as n from public.hp_properties')).rows[0].n,40);
    assert.equal((await db.query('select id from public.hp_tasks where id=$1',[taskB])).rows.length,0);
    await assert.rejects(db.query('select public.hp_load_demo_portfolio()'),/Only your company administrator/);
    await assert.rejects(db.query("select public.hp_create_team_invite('new@example.test','manager')"),/Only your company administrator/);
    await assert.rejects(db.query('select public.hp_list_team_invites()'),/Only your company administrator/);
    await assert.rejects(db.query('select public.hp_accept_team_invite($1,$2)',[token,'Replay']),/already belongs/);
    await as(a);
    const revokeToken=(await db.query("select public.hp_create_team_invite('impostor@example.test','manager') as token")).rows[0].token;
    const invitation=(await db.query("select * from public.hp_list_team_invites() where email='impostor@example.test'")).rows[0];
    await as(b);
    await assert.rejects(db.query('select public.hp_revoke_team_invite($1)',[invitation.id]),/not found/);
    await as(a);await db.query('select public.hp_revoke_team_invite($1)',[invitation.id]);
    await as(impostor);await assert.rejects(db.query('select public.hp_accept_team_invite($1,$2)',[revokeToken,'Revoked link']),/valid invitation/);
    await as(a);
    assert.equal((await db.query('select done from public.hp_tasks where id=$1',[taskA])).rows[0].done,true);
    await db.exec('reset role');
    assert.equal((await db.query('select count(*) as n from public.hp_companies')).rows[0].n,2);
    assert.equal((await db.query('select count(*) as n from public.hp_properties')).rows[0].n,80);
    assert.equal((await db.query("select count(*) as n from pg_class where relname like 'hp_%' and relkind='r' and not relrowsecurity")).rows[0].n,0);
    assert.equal((await db.query("select count(*) as n from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname like 'hp_%' and p.prosecdef")).rows[0].n,0);
  } finally { await db.close(); }
});
