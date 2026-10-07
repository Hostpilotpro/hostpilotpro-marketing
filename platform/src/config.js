export function validateConfig(url, key, expectedProject) {
  if (!url || !key || url.includes('YOUR_NEW_PROJECT') || key.includes('REPLACE_ME')) return 'The separate test database is not connected yet.';
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || !/^[a-z]{20}\.supabase\.co$/.test(parsed.hostname) || parsed.username || parsed.password || parsed.port || parsed.pathname !== '/' || parsed.search || parsed.hash) return 'Choose a valid hosted test database.';
    if (!expectedProject || parsed.hostname !== `${expectedProject}.supabase.co`) return 'The database does not match this test platform’s project.';
    if (!key.startsWith('sb_publishable_')) return 'Only a Supabase publishable key is allowed in this app.';
  } catch { return 'Choose a valid hosted test database.'; }
  return null;
}
