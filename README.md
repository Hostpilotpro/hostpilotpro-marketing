# HostPilotPro Marketing Site — Vite Build

This is the **live version** currently deployed at [hostpilotpro.vercel.app](https://hostpilotpro.vercel.app).

**Stack:** React 18 + Vite + Tailwind CSS + React Router DOM

**Pages:**
- `/` — Home
- `/full-suite` — Full Suite deep-dive
- `/owner-portal` `/ops-hub` `/guest-portal` — Product deep-dives
- `/features` — Every shipped feature across all three apps
- `/pricing` — 4 PM tiers + 2 Owner tiers, monthly/annual toggle
- `/about` — Story, timeline, principles
- `/testimonials` — 6 quotes with filter
- `/blog` — Coming-soon index
- `/demo` — Request-a-demo form

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & deploy
```bash
npm run build    # → dist/
# Deploy dist/ to Vercel (project: hostpilotpro)
```

## Notes for the other chat
This branch (`vite-live-site`) is what is actually deployed at hostpilotpro.vercel.app today. The `main` branch has an earlier Next.js scaffold. Pick one to be canonical — do not merge blindly, they are different codebases.
