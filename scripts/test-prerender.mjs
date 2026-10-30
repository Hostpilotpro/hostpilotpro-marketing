import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { routes } from './prerender.mjs';
const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');
test('each public URL exposes its own content and metadata without JavaScript', async () => {
 const titles = new Set();
 for (const route of routes) {
  const html = await read('dist/' + (route === '/' ? 'index' : route.slice(1)) + '.html');
  assert.match(html, /id="root" data-prerendered="true"><.+/);
  assert.equal((html.match(/<h1\b/g)||[]).length, 1, route);
  assert.match(html, /<main>[\s\S]{1000,}<\/main>/, route);
  assert.ok(html.includes(`rel="canonical" href="https://hostpilotpro.com${route}"`), route);
  const title = html.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!titles.has(title), 'duplicate title: '+route); titles.add(title);
  assert.ok(!html.includes('name="robots" content="noindex'), route);
  const blocks=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];
  assert.equal(blocks.length,1,route);
  const schema=JSON.parse(blocks[0][1]);
  assert.equal(schema['@graph'].find(o=>o['@type']==='WebPage').url,'https://hostpilotpro.com'+route);
  assert.ok(!JSON.stringify(schema).includes('InStock'));
 }
});
test('unknown routes have a real 404 document and no catch-all success rewrite', async () => {
 const html=await read('dist/404.html');
 assert.match(html, /name="robots" content="noindex,follow"/);
 const config=JSON.parse(await read('vercel.json'));
 assert.deepEqual(config.rewrites,[{source:'/sandbox/:path*',destination:'/sandbox.html'}]); assert.equal(config.cleanUrls,true);
 assert.equal(config.redirects.length,5);
 for(const rule of config.redirects){assert.ok(routes.includes(rule.destination));assert.equal(rule.permanent,true);}
 const sandbox=await read('dist/sandbox.html');assert.match(sandbox, /name="robots" content="noindex,follow"/);assert.match(sandbox, /<div id="root"><\/div>/);
});
test('sitemap lists exactly the public routes', async () => {
 const sitemap=await read('dist/sitemap.xml');
 assert.equal((sitemap.match(/<loc>/g)||[]).length,routes.length);
 for(const route of routes)assert.ok(sitemap.includes(`<loc>https://hostpilotpro.com${route}</loc>`));
 assert.ok(!sitemap.includes('/404'));assert.ok(!sitemap.includes('<lastmod>'));
});
