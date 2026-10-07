import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateConfig } from '../src/config.js';
test('client refuses missing, mismatched or secret-bearing database configuration',()=>{
  const ref='abcdefghijklmnopqrst'; const url=`https://${ref}.supabase.co`; const key='sb_publishable_synthetic_test';
  assert.equal(validateConfig(url,key,ref),null);
  assert.ok(validateConfig(undefined,key,ref));
  assert.ok(validateConfig(url,key,'zzzzzzzzzzzzzzzzzzzz'));
  assert.ok(validateConfig(url,'sb_secret_synthetic_test',ref));
  assert.ok(validateConfig(url,'eyJsynthetic_legacy_service_key',ref));
  assert.ok(validateConfig(`http://${ref}.supabase.co`,key,ref));
  assert.ok(validateConfig(`${url}.evil.example`,key,ref));
  assert.ok(validateConfig(`https://user:pass@${ref}.supabase.co`,key,ref));
  assert.ok(validateConfig(`${url}:8080`,key,ref));
});
