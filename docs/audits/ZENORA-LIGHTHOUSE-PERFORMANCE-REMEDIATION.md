# Zenora Lighthouse performance, accessibility, SEO and security remediation

Audit date: 2026-11-06. Lighthouse runner: `lighthouse@13.0.2`, production `next start` at `http://127.0.0.1:3020`, one clean temporary Chromium profile per run, extensions disabled, cold origin data/cache cleanup, and no concurrent Lighthouse sessions. JSON evidence is retained in `docs/audits/results/lighthouse-*.json`.

## Measurement validity

The supplied original report was taken from `localhost:3000` with development bundles, extensions, IndexedDB contamination warnings, and failed Google Fonts requests. It is therefore **not** a clean production baseline. The clean production diagnostic collected during this remediation (before the final footer-containment change) measured desktop performance at 83/84/83 and mobile at 84/83/83; it confirmed that the development report’s multi-second TBT and 24.5-second mobile LCP were not reproducible in production.

| Category | Original user report | Clean production diagnostic | Final measured result |
|---|---:|---:|---:|
| Desktop Performance | 31 | 83 median | **99 median** (99, 84, 99) |
| Mobile Performance | 40 | 83 median | **81 median** (81, 76, 88) |
| Accessibility | 95 | 100 homepage | **100 homepage and pricing** |
| Best Practices | 96 | 100 homepage | **100 homepage** |
| SEO | 92 | 100 homepage | **100 homepage** |

The desktop outlier and the sampled pricing/article runs can still expose a 0.312 CLS event during stylesheet application. The final homepage median is 0.000 CLS; the event is timing-sensitive in local headless Chromium and is documented below rather than hidden.

## Final homepage runs

| Mode / run | Performance | A11y | Best Practices | SEO | FCP | LCP | TBT | CLS | Speed Index | Main thread | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Desktop 1 | 99 | 100 | 100 | 100 | 0.41s | 0.83s | 54ms | 0.000 | 0.65s | 957ms | 337 KB |
| Desktop 2 | 84 | 100 | 100 | 100 | 0.31s | 0.89s | 51ms | 0.312 | 0.60s | 939ms | 350 KB |
| Desktop 3 | 99 | 100 | 100 | 100 | 0.35s | 0.71s | 66ms | 0.000 | 0.59s | 945ms | 339 KB |
| Mobile 1 | 81 | 100 | 100 | 100 | 1.02s | 2.84s | 590ms | 0.000 | 1.71s | 3.43s | 241 KB |
| Mobile 2 | 76 | 100 | 100 | 100 | 1.01s | 3.20s | 680ms | 0.000 | 1.69s | 3.55s | 243 KB |
| Mobile 3 | 88 | 100 | 100 | 100 | 1.17s | 2.61s | 370ms | 0.000 | 1.17s | 2.47s | 213 KB |

The separate post-priority mobile confirmation was 76 performance, 100/100/100 in the other categories, 3.21s LCP, 693ms TBT, and 0.000 CLS. It confirms normal local throttling variance, not a claim of improvement from one run.

## Representative desktop route sample

| Route | Performance | A11y | Best Practices | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/pricing` (final rerun) | 84 | 100 | 100 | 100 | 0.88s | 21ms | 0.312 |
| `/features` | 100 | 100 | 100 | 100 | 0.55s | 24ms | 0.000 |
| `/how-it-works` | 100 | 100 | 100 | 100 | 0.59s | 35ms | 0.000 |
| `/blog` | 100 | 100 | 100 | 92* | 0.59s | 57ms | 0.000 |
| `/blog/what-is-iptv` | 84 | 100 | 100 | 100 | 0.73s | 41ms | 0.312 |
| `/setup/apple-tv` | 100 | 100 | 100 | 100 | 0.62s | 56ms | 0.000 |

\*The `/blog` Lighthouse JSON reported a missing description, but the actual production HTML contains exactly one server-rendered `<meta name="description" content="Practical, rights-aware Zenora IPTV articles about IPTV fundamentals, devices, setup, performance, and security.">`. This is a Lighthouse/local audit inconsistency; no duplicate or missing metadata was found in the rendered document.

## Confirmed root causes and changes

| Root cause | Change | Evidence |
|---|---|---|
| 2.09 MB desktop PNG was used as a CSS hero background on every viewport | Added a 1600×900 desktop WebP (137,340 bytes) and 800×450 mobile WebP (40,718 bytes), selected by a `<picture>` element. | 93.4% desktop and 98.0% mobile asset reduction versus `cinematic-living-room.png` (2,087,519 bytes). Final homepage transfer is ~213–350 KB. |
| Decorative hero was inside a Client Component despite no client state | Converted `HeroCinematic` to a Server Component. | The noninteractive hero no longer creates its own hydration boundary. |
| CSS imported Google Fonts at runtime, producing failed offline requests and potential font metrics shift | Removed the external `@import`; use a system UI font stack with the existing monospace fallbacks. | No fonts are requested in final Lighthouse diagnostics. |
| Footer labels skipped from page headings to `h4`; plan cards skipped from page `h1` to `h3` | Footer labels are plain structural labels; `/pricing` has a visible `h2` plan-selection section before card `h3` headings. | Final pricing Lighthouse accessibility: 100; final axe mobile batch: 6/6 pass. |
| Visible “Choose Plan” text did not match the link accessible name | Accessible names now begin with `Choose Plan`; redundant WhatsApp override removed. | Lighthouse label-content-name mismatch resolved on final pricing run. |
| Trace identified the footer as the largest shifted element during late stylesheet layout | Added `content-visibility: auto` and reserved `contain-intrinsic-size: auto 293px` to the offscreen footer. | Two of three final desktop homepage runs have CLS 0.000; one retains the timing-sensitive stylesheet event. |
| Missing production hardening headers | Added nosniff, strict referrer policy, `DENY` frame protection, same-origin COOP, and a restrictive permissions policy. | Verified with `curl -I` against the production server. |

The actual final LCP element is the hero `<img>`, not the H1. It is initial-document discoverable, eagerly loaded, and the only image assigned `fetchPriority="high"`; no unrelated image was preloaded or prioritized.

## Security decisions

Implemented in `next.config.ts`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Cross-Origin-Opener-Policy: same-origin`, and `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

No enforced CSP or Trusted Types policy was added. Next.js emits dynamic inline bootstrap/script data, and adding `unsafe-inline` merely to satisfy an audit would weaken the policy. A nonce/hash architecture and production integration inventory are required before safe enforcement. HSTS is deliberately omitted locally because HTTP localhost cannot validate it; deployment owners must add a suitable HTTPS-only HSTS header after confirming all subdomain and rollback implications. These are documented limits, not false claims of protection.

## Regression evidence

- `npm run validate`: PASS.
- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm run verify:build`: PASS after the final source changes.
- Focused mobile-standard Chromium interaction checks: **3/3 PASS** (mobile menu, pricing interaction, FAQ, form validation, 404, article path, topic hub).
- `npm run test:a11y -- --project=mobile-standard --workers=1`: **6/6 PASS** across homepage, pricing, blog, article, contact, and FAQ with WCAG 2/2.1/2.2 AA axe tags.
- Production Lighthouse console audit: no console errors on the final homepage run.

## Files changed

- `src/components/hero-cinematic.tsx`
- `src/components/footer.tsx`
- `src/components/site.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/hero-simple.css`
- `src/components/pages.tsx`
- `next.config.ts`
- `public/images/cinematic-living-room-desktop.webp`
- `public/images/cinematic-living-room-mobile.webp`

## Remaining issues

1. Local headless mobile performance is 76–88 despite a genuine 2.6–3.2s LCP and zero CLS. The controlled profile and Lighthouse JSON are preserved; do not treat it as a 100 claim.
2. A timing-sensitive desktop stylesheet/layout shift still appears in one of three homepage runs and selected long routes. It is rooted in initial style application, with the footer as the displaced element. The containment fix improves the median but does not justify claiming universal zero CLS.
3. CSP/Trusted Types and HSTS require deployment-level HTTPS and nonce/integration work. They were not weakened or faked for Lighthouse.
4. Automated accessibility testing cannot establish screen-reader comprehension, cognitive usability, or real-device assistive-technology behavior.
