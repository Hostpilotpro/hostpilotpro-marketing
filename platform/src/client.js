import { createClient } from '@supabase/supabase-js';
import { validateConfig } from './config.js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const configError = validateConfig(url, key, import.meta.env.VITE_SUPABASE_PROJECT_REF);
export const client = configError ? null : createClient(url, key, { auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true, autoRefreshToken: true, storageKey: 'hostpilotpro-platform-auth' } });
export async function unwrap(query) {
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
