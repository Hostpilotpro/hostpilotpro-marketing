import { pageSchema } from '../src/lib/public-schema.js';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const routes = ['/', '/tour', '/owner', '/ops', '/guest', '/field', '/full-suite', '/capabilities', '/partners', '/pricing', '/about', '/proof', '/demo', '/blog'];
const SITE = 'https://hostpilotpro.com';
const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

export function documentFor(shell, rendered, route) {
  const { title, description, image } = rendered.seo;
  const fullTitle = title.includes('HostPilot') ? title : `${title} · HostPilot Pro`;
  let html = shell.replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${rendered.html}</div>`);
  if (html === shell) throw new Error('Missing prerender root');
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(fullTitle)}</title>`);
  for (const [attribute, key, value] of [
    ['name','description',description], ['property','og:title',fullTitle],
    ['property','og:description',description], ['property','og:url',SITE + route],
    ['property','og:image',SITE + image], ['name','twitter:title',fullTitle],
    ['name','twitter:description',description], ['name','twitter:image',SITE + image],
  ]) html = html.replace(new RegExp(`<meta\\s+${attribute}="${key}"[\\s\\S]*?/>`), `<meta ${attribute}="${key}" content="${escape(value)}" />`);
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${SITE + route}" />`);
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  html = html.replace('</head>', `<script type="application/ld+json" data-seo="page">${json(pageSchema(title, description, route))}</script>\n${route === '/404' ? '<meta name="robots" content="noindex,follow" />\n' : ''}</head>`);
  return html;
}

async function main() {
  const root = resolve(import.meta.dirname, '..');
  const { render } = await import(pathToFileURL(resolve(root, '.ssr/entry-server.js')));
  const shell = await readFile(resolve(root, 'dist/index.html'), 'utf8');
  // The isolated interactive sandbox keeps its client router and stays outside
  // the marketing sitemap. It must not hydrate the homepage as a demo screen.
  await writeFile(resolve(root, 'dist/sandbox.html'), shell.replace('</head>', '<meta name="robots" content="noindex,follow" /></head>'));
  for (const route of [...routes, '/404']) {
    const rendered = render(route);
    if (rendered.seo.path !== route) throw new Error(`Route metadata mismatch: ${route}`);
    const output = route === '/' ? 'index.html' : route.slice(1) + '.html';
    await writeFile(resolve(root, 'dist', output), documentFor(shell, rendered, route));
  }
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + routes.map(route => `  <url><loc>${SITE + route}</loc></url>`).join('\n') + '\n</urlset>\n';
  await writeFile(resolve(root, 'dist/sitemap.xml'), sitemap);
  console.log(`Prerendered ${routes.length} public routes and a noindex 404 from the actual React application.`);
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) main().catch(e => { console.error(e); process.exitCode=1; });
