import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';
import { ThemeProvider } from './lib/theme.jsx';
import { SeoContext } from './lib/seo.js';

export function render(url) {
  const seo = { current: null };
  const html = renderToString(
    <React.StrictMode>
      <SeoContext.Provider value={seo}>
        <ThemeProvider initial="light">
          <StaticRouter location={url}><App /></StaticRouter>
        </ThemeProvider>
      </SeoContext.Provider>
    </React.StrictMode>
  );
  if (!seo.current) throw new Error(`Missing page metadata for ${url}`);
  return { html, seo: seo.current };
}
