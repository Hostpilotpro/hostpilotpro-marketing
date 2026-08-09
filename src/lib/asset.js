/**
 * Resolve a public asset path against the current Vite base.
 * Production (Vercel) builds use base '/', so this is a no-op.
 * Preview builds run from a nested path, so they need relative URLs.
 */
export default function asset(p) {
  return `${import.meta.env.BASE_URL}${String(p).replace(/^\//, '')}`;
}
