# Blended sales refresh

## Baseline and boundary

Started from production `vite-live-site` commit `3712d8a`, not the earlier
replacement branch. Changes are marketing-only. No operational app, database,
messaging integration, payment endpoint or production deployment is changed.

The original coastal hero, imagery, visual stack comparison, statement graphic,
four product surfaces, pricing/about/proof pages and full-suite explanation remain.
Smart-property imagery/catalogue remains visible on the homepage, with conceptual
connection status made explicit. Roadmap text expands on demand. The Ops page
keeps its original detail in expandable sections.

## New visual layer

- Three direct audience paths in navigation and in the hero.
- Short interactive scenes for messages, two-way owner finance, payday and travel
  calculations, goals/recognition, RatePilot policy, listing rewrites and care.
- Original portfolio console is still available as a scene and a full replica.
- Original Owner/Guest/Field demos remain at the same surface deep links.

The new scenes are explicitly workflow illustrations, not replicas of the current
production interface. All amounts, employees, policies, messages and examples are
fictional. No real AI call, message, invoice, payment, rate change or task is sent.
Full workflows/channel activation must be verified before stronger public claims.

## QA inventory

- Homepage visuals still present; original image files unchanged.
- Desktop and mobile audience navigation and route-specific tour links.
- Seven scene tabs, keyboard left/right/Home/End, reset and deep-link history.
- Messages: all three contacts; polish, full draft, assignment, lead/reset.
- Finance: manager/owner collection; arithmetic and stage progression; claimed
  payment stays distinct from verified payment; reset.
- Payroll: three employees; travel is excess-only under the sample policy;
  reviewed count is idempotent; review is not payment; reset.
- Motivation and employment tabs; explicit sample standings.
- Pricing: below-floor vs permitted example; review button gating; no push.
- Listings: three channel examples and original/rewrite toggle.
- Care: signal, manager review, example inspection and reset.
- Original console search and old surface links; Owner statement interactions.
- Deep detail accordions, visible smart-photo panels and roadmap expansion.
- 1440px and 375px layouts; both themes; no page-level overflow or browser errors.
- Production and nested-path static preview builds.

## Release notes

Earlier PR #7 is not merged or reused. This branch is a separate, additive
integration for preview. Publication requires user confirmation. The earlier
PDF files have not been revised or presented as approved sales collateral here.

## Verification completed

- Production build and `git diff --check` pass.
- All new scene interactions tested in a real browser, including both owner-money
  directions, claimed versus verified payment, all three payroll totals, zero
  versus excess travel, idempotent review controls, and all three listing channels.
- New scene keyboard navigation, direct URLs, invalid story fallback and browser
  back/forward checked. Owner and Guest product CTAs open the correct old surface.
- Original portfolio search and villa dossier still work.
- 1440px desktop and 375px mobile reviewed; main routes and all seven scenes have
  no page-level horizontal overflow. Light and dark reviewed. No page errors.
- New scenes produced no non-read network requests. No real external action was tested.
- Original public imagery is unchanged versus production.
