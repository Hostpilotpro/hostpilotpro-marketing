# HostPilot Pro blended preview

## Boundary

Production base: `vite-live-site` at `3712d8a`. This remains a marketing-only,
unpublished draft. No Ops code, operational record, payment, message or database
is changed. Publication requires user confirmation.

The original coastal hero, villa imagery, stack comparison, statement graphic,
audience paths and detailed product sections remain. The Owner, Guest and Field
illustrations are separate and labelled as demonstrations, not actual captures.

## Real Ops correction · 25 September 2026

The user rejected invented product interfaces. All newly invented Ops workflow
scenes are removed and replaced by four actual, sanitised screenshots:

- Message centre: `/inbox`.
- Owner ledger: `/owner-ledger`.
- Finance overview: `/finance`.
- Payroll walkthrough: `/payroll-run`.

Captured from the authenticated current Ops v2 application in a separate browser
tab. Private names, message previews, property identities, financial values and
banking details were replaced or masked in the browser presentation before
capture. No change/input events were dispatched to save data. Read-only network
guards blocked mutations while permitting verified read-only batch endpoints.
No operational action was performed.

Original navigation, typography, colours, chart shapes, branding, warnings,
unassigned/unavailable labels and disabled controls remain intact. Operational
counts and dates may remain visible. Only sanitised flattened JPG images are
included in the marketing repository; no raw capture, DOM dump or banking
metadata is included.

Screenshots are shown at their original aspect ratio, with full-size links.
HostPilot Pro is identified as the software and Mr Property Siam as the operator
outside the screenshot rather than by fabricating replacement app branding.

The old OpsConsole illustration is no longer rendered on the Ops page or tour.
Legacy `/tour?surface=ops` opens the real screenshot tour. Non-Ops illustrations
remain unchanged by this correction. Unsupported or old story keys fall back
to the actual message-centre screenshot.

## QA inventory

- All four screenshot tabs display their matching actual capture.
- Left/right/Home/End keyboard navigation and selected-tab focus.
- Full-size image links open the matching flattened asset.
- Homepage, Ops page and tour retain original marketing visuals.
- Legacy Ops surface route shows screenshots, never the old OpsConsole.
- Invalid story and invalid surface parameters fall back safely.
- Owner and Guest demonstration links remain separate and labelled.
- Desktop and mobile layouts, both themes, no horizontal page overflow.
- No image distortion, UI recreation or live-account connection.
- Builds and whitespace checks pass.

## Capture review

All four sanitised screenshots were visually inspected. Names and banking fields
were checked in the source DOM before capture where applicable. The payroll
input values were removed from the presentation without dispatching events;
opaque bullet placeholders are visible rather than recoverable blurred values.
No OCR-based privacy verification is claimed.

The payroll capture is intentionally a real draft state, including an unresolved
staff warning. It is a review candidate, not a fabricated clean successful run.
Screenshots do not prove integration activation, notification delivery, end-to-end
payment behaviour or every feature in the accompanying product description.

## Verification completed

- Production and static-preview builds pass; `git diff --check` passes.
- Four screenshot tabs display the correct image with no page errors.
- Keyboard Home, End and Right tested; full-size image link opens the correct JPG.
- Legacy Ops link, invalid story and invalid surface fallbacks show the gallery.
- Homepage, Ops and tour fit 1440px and 375px viewports without page-level overflow.
- Light and dark screenshot-gallery presentation visually inspected.
- Separate Owner and Guest demonstration routes remain outside the screenshot gallery.

## Follow-up: fuel, league and international positioning

The first screenshot version was published by explicit user approval as PR #8.
This follow-up is a separate draft branch, `feat/real-fuel-league-screens`.

- Adds actual Travel & Fuel allowance policy and staff-calculation captures.
- Adds actual staff-facing Initiative League season and rulebook captures.
- No recompute, baseline edit, points award, payroll apply, payout or season
  rollover was performed. All capture-tab requests remained read-only.
- Staff names, policy author, company monetary values and reward allocation
  percentages were anonymised. Empty/zero states remain genuine.
- Fuel rotation-coverage/task-attribution warnings and the league's Not started
  state are disclosed, not hidden. These are not successful-run demonstrations.
- Two image-view buttons within each new tab expose actual page positions/views,
  not a reconstructed or simulated operational interface.
- International messaging distinguishes MPS's current English/Thai/Burmese setup
  from planned country-by-country language, legal-setting and payment adaptations.
- Spanish-speaking and French-speaking markets, the Philippines and Indonesia
  are stated as planned directions, not supported-country or compliance claims.
- Homepage has the full rollout explanation; product pages link to it with a
  first-client note. Field/About copy no longer presents three languages as the
  product's worldwide limit. Regional payment providers are not invented.

### Follow-up QA inventory

- Fuel and league parent tabs, both image views, full-size links and alt/captions.
- Switching away and back resets the image view; keyboard and direct URL access.
- Existing four screenshot tabs and old Ops surface route continue to work.
- International section link works from product pages and direct hash URLs,
  including nested HashRouter preview builds.
- Markets and planned/current distinction visible on desktop and mobile.
- No page overflow, image load failures or browser errors; production/preview builds.

### Follow-up verification

Both views in both new tabs load the correct flattened image and caption, with
matching full-size URLs. Keyboard End selects the league tab; returning to a tab
resets its subview. Full-size opening was exercised. The new pages fit 375px and
1440px widths, with mobile and dark-theme visual review. The international anchor
was corrected to avoid smooth-scroll displacement during route changes. No page
errors were recorded. Production and nested-path preview builds pass.
