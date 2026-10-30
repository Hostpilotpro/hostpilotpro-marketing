import { pageSchema } from './public-schema.js';
import { createContext, useContext, useEffect } from 'react';

// Each build-time render gets its own collector; nothing is shared across routes.
export const SeoContext = createContext(null);

const SITE = 'https://hostpilotpro.com';

function upsert(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(attrs.tag || 'meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'tag') return;
    el.setAttribute(k, v);
  });
  return el;
}

/** Sets title, description, canonical and OG tags per route. */
export default function useSeo({ title, description, path = '/', image = '/og.png' }) {
  const collector = useContext(SeoContext);
  if (collector) collector.current = { title, description, path, image };
  useEffect(() => {
    const full = title.includes('HostPilot') ? title : `${title} · HostPilot Pro`;
    document.title = full;
    let schema = document.head.querySelector('script[data-seo="page"]');
    if (!schema) { schema = document.createElement('script'); schema.type = 'application/ld+json'; schema.dataset.seo = 'page'; document.head.appendChild(schema); }
    schema.textContent = JSON.stringify(pageSchema(title, description, path)).replace(/</g, '\u003c');
    if (path === '/404') upsert('meta[name="robots"]', { tag: 'meta', name: 'robots', content: 'noindex,follow' });
    else document.head.querySelector('meta[name="robots"]')?.remove();
    upsert('meta[name="description"]', { tag: 'meta', name: 'description', content: description });
    upsert('link[rel="canonical"]', { tag: 'link', rel: 'canonical', href: SITE + path });
    upsert('meta[property="og:title"]', { tag: 'meta', property: 'og:title', content: full });
    upsert('meta[property="og:description"]', {
      tag: 'meta',
      property: 'og:description',
      content: description,
    });
    upsert('meta[property="og:url"]', { tag: 'meta', property: 'og:url', content: SITE + path });
    upsert('meta[property="og:image"]', { tag: 'meta', property: 'og:image', content: SITE + image });
    upsert('meta[name="twitter:image"]', { tag: 'meta', name: 'twitter:image', content: SITE + image });
    upsert('meta[name="twitter:title"]', { tag: 'meta', name: 'twitter:title', content: full });
    upsert('meta[name="twitter:description"]', {
      tag: 'meta',
      name: 'twitter:description',
      content: description,
    });
    upsert('meta[name="twitter:image"]', { tag: 'meta', name: 'twitter:image', content: SITE + image });
  }, [title, description, path, image]);
}
