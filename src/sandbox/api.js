export async function demoApi(path, { method = 'GET', data, signal } = {}) {
  const response = await fetch(`/api/sandbox/${path}`, {
    method, credentials: 'same-origin', signal,
    headers: data ? { 'Content-Type': 'application/json' } : undefined,
    body: data ? JSON.stringify(data) : undefined,
  });
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('This signup demo needs its separate local server. It is not enabled on the public website yet.');
  }
  const result = await response.json();
  if (!response.ok) throw Object.assign(new Error(result.error || 'Please try again.'), { status: response.status });
  return result;
}
