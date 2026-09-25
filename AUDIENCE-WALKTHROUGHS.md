# Audience walkthrough update

## Scope

Repository: `Hostpilotpro/hostpilotpro-marketing`. Target branch: `vite-live-site`.
No Ops Hub, owner portal, guest portal, Supabase or production records changed.

The public marketing site has three audience paths: property management companies,
owners and guests. Existing `/ops`, `/owner`, `/guest`, `/tour` and `/proof` routes
are reused. Field staff remain a secondary part of the management-company story.

HostPilot Pro is the software identity. Mr Property Siam is explicitly the founding
client/operator showcase, not an independent testimonial. Azure Coast Villas is
the fictional demo company. No fresh captures from authenticated production apps
are included.

The requested walkthrough is a PDF, not a video. No video is included. The
supplied 38-page owner guide informs a concise, six-page sales adaptation.
New six-page Operations and Guest sales guides use the same structure, focused
on core business functions rather than documenting every screen.

One owner Money-hub image is extracted from page 7 of the supplied PDF. It contains
no customer records. Two Ops views and one guest view are captured from the
synthetic marketing replicas, not inpainted or represented as production captures.
Primary audience pages each contain just one selected product visual.
The optional interactive demos remain accessible separately from the PDF library.

## QA inventory

- Three desktop navigation paths, mobile menu open/close and Escape.
- Homepage audience tabs: all views, arrow keys, Home/End, corresponding product
  and walkthrough destinations, selected state and images.
- Tour audience tabs: all three paths, step progress controls, previous/next,
  restart, direct URLs, invalid parameters, browser Back/Forward.
- Operations: dashboard, task transition and finance view.
- Owner: statement expansion, approve/cap/decline/Undo, overview/statements/
  approvals views; calendar replica limitation explicitly disclosed.
- Guest: arrival, essentials, sample add-on toggle and total, return/reset.
- Secondary field view and return to operations.
- All three PDFs: six pages, readable layout, correct title/author metadata,
  selective screenshots, no original 38-page manual published wholesale.
- Product page PDF links land on the corresponding guide; library read/download
  links work and preserve preview-relative asset paths.
- Showcase separates the real client from fictional sample data.
- Cream/gold and dark themes; 1440px and 375px layouts; intermediate viewport.
- Images load, no page-level horizontal overflow, no uncaught browser errors.
- Exploratory checks: malformed surface/step, refresh and history after changing
  audiences, minimum-width long labels, keyboard-only tab changes.

## Deployment

Build both `npm run build` and `npm run build:preview`. The preview uses HashRouter
and relative assets; Vercel keeps BrowserRouter and root-relative assets.
Production publishing is held until preview approval.

## Verification performed

- Production and nested-path preview builds pass.
- Homepage tabs and keyboard selection, audience routes and corresponding PDF
  downloads pass. Download response signatures were checked as actual PDFs.
- 1440px desktop, 1024px intermediate and 375px mobile reviewed. Main routes have
  no page-level horizontal overflow. Mobile menu, Escape and route-close pass.
- Both color themes reviewed after transitions settle.
- Secondary interactive demos: next/previous/restart, statement expansion,
  approval/cap/decline/Undo, guest selections, browser history, refresh and invalid
  parameters pass without uncaught browser errors.
- All 18 PDF pages rendered and visually reviewed. Three six-page documents have
  descriptive metadata, selected screens and clickable website/call links.
- Scope excludes real data freshness, live workflow parity of the existing demo
  replicas, production deployment and actual sales form submission. No outbound
  test lead was sent.

## Rebuilding PDF guides

The website's sales copy is the source. Refresh the build input mechanically:

```sh
node --input-type=module -e "import {sales} from './src/data/sales.js'; import {writeFileSync} from 'node:fs'; writeFileSync('./scripts/sales-content.json',JSON.stringify(sales,null,2));"
python scripts/build-sales-guides.py
```

Requires ReportLab, Pillow and Noto Sans regular/bold fonts. The original supplied
PDF is not committed; only its selected, non-personal Money-hub screen is used.
