import { useEffect } from 'react';

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
  useEffect(() => {
    const full = title.includes('HostPilot') ? title : `${title} · HostPilot Pro`;
    document.title = full;
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
    upsert('meta[name="twitter:title"]', { tag: 'meta', name: 'twitter:title', content: full });
    upsert('meta[name="twitter:description"]', {
      tag: 'meta',
      name: 'twitter:description',
      content: description,
    });
  }, [title, description, path, image]);
}
