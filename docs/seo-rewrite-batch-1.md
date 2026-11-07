# Zenora IPTV — SEO Rewrite Batch 1

## `fire-tv-setup-checklist`

- Status: `IN_PROGRESS`
- Primary keyword: IPTV Setup on Firestick
- Intent: Practical device-setup tutorial for a beginner who needs to verify a Fire TV device, choose a legitimate player source, and diagnose a safe first-run problem.
- Verified sources:
  - Amazon Fire TV, [Get Started with Fire TV](https://developer.amazon.com/docs/fire-tv/get-started-with-fire-tv.html) — Fire OS is Android-derived, but device specifications and supported features vary.
  - Amazon Fire TV, [Fire OS Overview](https://developer.amazon.com/docs/fire-tv/fire-os-overview.html) — Fire OS versions and rollout differ by device.
  - Amazon Fire TV, [Fire TV FAQ](https://www.developer.amazon.com/docs/fire-tv/faq-general.html) — individual device specifications and hardware limits matter for compatibility.
- Writing: `IMPLEMENTED` — metadata, answer-first summary, four substantive sections, a source-backed setup checklist, and four visible FAQs. Source-data word measurement: 1,639 words.
- Images: `IMPLEMENTED` — `fire-tv-iptv-setup-hero.webp` (1200×630) plus four 800×500 section diagrams created under `public/images/guides/`; all are local WebP assets and under 80 KB.
- Implementation: `IMPLEMENTED` — reusable table and per-section figure fields added to the shared data model and renderer.
- QA: `IN_PROGRESS` — stale project dev server was safely restarted after build. Clean rendered GET `/blog/fire-tv-setup-checklist` returned HTTP 200 with self-canonical `https://zenoraiptv.tv/blog/fire-tv-setup-checklist`, one H1, four FAQ controls, one table, and all five Fire TV WebP paths in the rendered HTML. Build, validation, typecheck, and lint previously passed. Full JSON-LD/internal-link/browser console and all-route checks remain.
- Next action: inspect rendered JSON-LD and links, then run responsive console checks before marking the article verified.

### Additional QA attempt

- Chromium created screenshots for the Fire TV article at 320, 390, 768, 1024, and 1440px.
- Rendered internal links were enumerated and are limited to existing Blog, commercial, policy, and asset paths.
- `NOT VERIFIED`: the detached local development server was terminated by the execution environment while the all-19 HTTP loop was running; route checks returned `000` and must be rerun against a persistent server.
- `NOT VERIFIED`: the initial JSON-LD extraction matched more than one script payload; parse the dedicated `application/ld+json` script with a DOM-aware browser check on the next run.

## `iptv-buffering-causes`

- Status: `IMPLEMENTED`
- Primary keyword: IPTV Buffering Fix
- Intent: Troubleshooting; isolate the actual playback failure rather than promise a universal fix.
- Verified sources: Apple [HTTP Live Streaming](https://developer.apple.com/streaming/) and [HLS overview](https://developer.apple.com/documentation/http-live-streaming?language=objc).
- Writing: expanded diagnostic article with answer-first introduction, three substantive H2 sections, a symptom/cause/action table, and four visible FAQs.
- Images: `iptv-buffering-diagnosis-hero.webp` (1200×630) plus `iptv-buffering-path.webp`, `iptv-buffering-isolation.webp`, and `iptv-buffering-notes.webp` (800×500).
- QA: `NOT_STARTED`.
- Next action: expand content to the requested word range, then run consolidated Batch 1 validation after Article 3 is implemented.

## `choosing-an-iptv-subscription`

- Status: `NOT_STARTED`
- Research lead: Zenora pricing, device, FAQ, support, and policy pages are the only permitted sources for Zenora-specific claims; CISA guidance will support general credential and payment-safety advice.

## Remediation continuation — 2026-11-01

- Removed 90 duplicated `Worked example` sections. They reused boilerplate across unrelated articles and did not meet the no-filler requirement; this intentionally lowers several provisional word counts.
- Replaced every live guide-image reference with a local WebP asset. There are 19 valid article heroes at 1200×630 and 29 verified local WebP references in article data. The missing login/authentication hero was created as `iptv-login-authentication-errors-overview.webp`.
- The Blog renderer now supports safe React `Link`-based contextual links, semantic table headings/captions, Open Graph/Twitter image metadata, a visible third FAQ fallback where an existing article only has two, `FAQPage` JSON-LD matching those visible FAQs, `BlogPosting` JSON-LD, and an article image field.
- `npm run validate`, `npm run typecheck`, and `npm run lint` pass. The production build compiled and completed its process after the validation run; the final build report was not captured, so it is not recorded as a fully verified build result.
- Not verified: no original, source-specific 800×500 section figure exists for every H2 across all 19 articles; article body counts remain below the requested ~2,500 words for multiple records; publication dates and individual author identities are not independently verified and therefore have not been fabricated into schema.
