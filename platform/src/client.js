import { createClient } from '@supabase/supabase-js';

export function validateConfig(url, key, expectedProject) {
  if (!url || !key || url.includes('YOUR_NEW_PROJECT') || key.includes('REPLACE_ME')) return 'The separate test database is not connected yet.';
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || !/^[a-z]{20}\.supabase\.co$/.test(parsed.hostname)) return 'Choose a valid hosted test database.';
    if (!expectedProject || parsed.hostname !== `${expectedProject}.supabase.co`) return 'The database does not match this test platform’s project.';
    if (!key.startsWith('sb_publishable_')) return 'Only a Supabase publishable key is allowed in this app.';
  } catch { return 'Choose a valid hosted test database.'; }
  return null;
}

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const configError = validateConfig(url, key, import.meta.env.VITE_SUPABASE_PROJECT_REF);
export const client = configError ? null : createClient(url, key, { auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true, autoRefreshToken: true, storageKey: 'hostpilotpro-platform-auth' } });
export async function unwrap(query) {
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
