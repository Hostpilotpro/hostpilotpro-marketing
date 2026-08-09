import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// PREVIEW builds are served from a nested proxy path, so they need relative
// asset URLs and a hash router. Production (Vercel) builds stay at the root.
const preview = process.env.VITE_PREVIEW === '1';

export default defineConfig({
  plugins: [react()],
  base: preview ? './' : '/',
  define: { __PREVIEW__: JSON.stringify(preview) },
  server: { host: '0.0.0.0', port: 3000 },
});
