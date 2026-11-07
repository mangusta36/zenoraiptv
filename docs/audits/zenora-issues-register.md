# Zenora issue register

## F-001 — P1 FAIL — Commercial flows are nonfunctional

Route: `/checkout`, `/trial`, `/contact`, `/renew`, `/order/status`, `/order/success`. Files: `src/app/checkout/page.tsx`, `src/components/site.tsx`, `src/components/pages.tsx`, `src/app/order/*`.

Evidence/reproduction: open each flow or inspect submit handlers. Checkout states payment is not configured and disables payment; contact/trial prevent default and show “No message was sent”; renewal says no API/payment form; order status reports no lookup. Impact: visitors cannot purchase, submit a request, renew, or retrieve an order. Fix: integrate authenticated server-side payment, request, renewal and order services; validate inputs; implement success/error/cancellation states. Acceptance: sandbox end-to-end tests create/retrieve an order without exposing data and truthful UI states are browser-tested.

## F-002 — P1 FAIL — Legal/publication readiness is explicitly incomplete

Route: footer and all legal pages. Files: `src/components/site.tsx`, `src/components/pages.tsx`, `src/app/{terms,privacy-policy,refund-policy,cookie-policy}/page.tsx`.

Evidence: footer says business details and policies require final review; `Legal` calls policies “Draft presentation only” and “structured legal-content placeholder.” Impact: commercial publication lacks approved terms, privacy, cookie, refund and business disclosures. Fix: obtain counsel/business-approved jurisdiction-appropriate documents and verified business contact details. Acceptance: no draft/placeholder language; legal review sign-off; policy links and effective dates verified.

## F-003 — P2 FAIL — Sitemap omits setup detail routes

Route: `/setup/android`, `/setup/apple-tv`, `/setup/firestick`, `/setup/ios`, `/setup/mac`, `/setup/mag`, `/setup/smart-tv`, `/setup/windows`. File: `src/app/sitemap.ts`.

Evidence/reproduction: compare the hard-coded `paths` array against `src/app/setup/*/page.tsx`; only `/setup` is represented. Impact: reduced crawl/discovery coverage. Fix: include all canonical public setup routes or generate them from a central route list. Acceptance: sitemap contains every indexable setup URL and returns valid XML in production.

## F-004 — P2 NOT VERIFIED — Browser and accessibility QA absent

Route: all. Files: project tooling/package manifest.

Evidence: no Playwright/Cypress/Vitest browser configuration or tests; Chromium is installed but no automation harness was configured. Impact: responsive overflow, focus behavior, client interactions, console/network failures and images have no evidence. Fix: add Playwright and axe checks; run bounded production-server suites at 375×844, 390×844, 768×1024 and 1440×900. Acceptance: retained screenshots/traces and zero critical console/network/a11y failures.

## F-005 — P2 WARNING — Version reproducibility drift

Route: build system. Files: `package.json`, `package-lock.json`.

Evidence: package manifest declares `next ^15.3.3`; fresh build reported 15.5.28. Impact: a caret range allows different production builds over time. Fix: adopt an intentional update policy and pin/lock verified framework versions. Acceptance: CI prints expected versions and a clean install/build produces the recorded release artifact.

## F-006 — P3 NOT VERIFIED — Performance budget and field telemetry absent

Route: all. Files: build output/configuration.

Evidence: build reports 103 kB shared first-load JS and 108–121 kB first load on public pages; no Lighthouse/CWV tooling or analytics was found. Impact: mobile performance regressions cannot be detected. Fix: establish route budgets, synthetic audit in CI, and privacy-reviewed real-user telemetry. Acceptance: CI records budgets; measurements are tracked without claiming field CWV before data exists.

## F-007 — P2 FAIL — Shared page metadata has no Twitter card

Route: non-article public pages using `brandMetadata`. File: `src/app/route-metadata.ts`.

Evidence/reproduction: `brandMetadata` returns title, description, canonical, robots and Open Graph only. Blog article metadata includes `twitter`, demonstrating an inconsistent site-wide result. Impact: non-article links have no explicit Twitter/X card configuration. Fix: add a consistent Twitter card object, including a suitable image where available, to shared metadata. Acceptance: rendered metadata for representative marketing, setup, legal and blog-index pages contains accurate `twitter:card`, title, description and image fields.
