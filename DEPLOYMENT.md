# HostPilot Pro — Marketing Site

Marketing website for **HostPilot Pro**, built by Mr Property Siam (Koh Samui).

- **Live URL:** https://hostpilotpro.vercel.app
- **Repo:** https://github.com/Hostpilotpro/hostpilotpro-marketing
- **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS. No CMS — all content lives in `lib/content.ts` and the page TSX files.

## Pages

| Route            | File                          |
| ---------------- | ----------------------------- |
| `/`              | `app/page.tsx`                |
| `/pricing`       | `app/pricing/page.tsx`        |
| `/how-it-works`  | `app/how-it-works/page.tsx`   |
| `/about`         | `app/about/page.tsx`          |
| `/contact`       | `app/contact/page.tsx`        |

SEO assets: `app/sitemap.ts` (→ `/sitemap.xml`), `public/robots.txt`, `public/og.svg`, `public/favicon.svg`, and an `Organization` JSON-LD block in `app/layout.tsx`.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Redeploy to Vercel

The Vercel project is named `hostpilotpro-marketing`. From the project directory:

```bash
npx vercel --token $VERCEL_TOKEN --prod --yes
```

`git push` to `main` also triggers a production deploy once the repo is connected to the Vercel project.

## Content

All copy — pricing tiers, features, case study, FAQ, and app descriptions — is in `lib/content.ts`. Edit there to update the site; no CMS or database is involved. No environment variables are required.
