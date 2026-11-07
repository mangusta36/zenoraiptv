# Zenora IPTV final platform audit

Audit date: 2026-11-05. Scope: source, production-build output, validation, static SEO/accessibility/security review. No application code was changed.

## Executive summary

Classification: **A — mostly static marketing website with a comprehensive editorial knowledge hub.** It is not a production-ready integrated commercial platform. The article data and static build are in good shape, but core commercial workflows are expressly demonstration-only, legal pages are draft placeholders, and no browser automation evidence was produced.

Release recommendation: **NOT READY** for a commercial launch. A content-only/staging release is conditional on resolving the legal and disclosure findings and completing browser QA.

## Environment and command evidence

Node 24.15.0; npm 11.16.0; package declares Next 15.3.3, React 19.0.0 and TypeScript 5.8.3, while the installed production build reported Next 15.5.28. App Router is used. No project test runner, Playwright/Cypress configuration, or browser-test suite was found. Chromium exists at `/usr/bin/chromium`, but no browser automation harness is installed/configured.

| Command | Result | Duration | Evidence |
|---|---|---:|---|
| `npm run validate` | PASS (exit 0) | 0.6s | 19 unique slugs/titles; 159 local WebP references |
| `npm run typecheck` | PASS (exit 0) | 3.5s | `tsc --noEmit` completed silently |
| `npm run lint` | PASS (exit 0) | 4.7s | `eslint .` completed silently |
| `npm run build` | NOT VERIFIED | first trace 42.6s; retry output ~40s | Both runs compiled and generated 57/57 static pages; the execution harness did not return a process exit status. Treat build exit code as unverified. |

The build route table shows static routes for all public pages and SSG for `/blog/[slug]` (19 generated paths); `/blog` is dynamic because it reads category search parameters.

## Route inventory and coverage

| Route family | Purpose | Rendering / metadata | Interactive elements | Audit coverage |
|---|---|---|---|---|
| `/`, `/features`, `/about`, `/how-it-works`, `/troubleshooting`, `/support` | marketing/support | static; page metadata except root | nav, CTAs/WhatsApp | static reviewed; browser NOT VERIFIED |
| `/pricing`, `/checkout` | plan selection / checkout preview | static; checkout noindex layout | connection selector, disabled payment form, WhatsApp | static reviewed |
| `/trial`, `/contact`, `/renew`, `/order/*` | request/support/order flows | static; private metadata on order/checkout | demo forms, WhatsApp | static reviewed |
| `/devices`, `/setup`, `/setup/*` | compatibility and setup | static; metadata | internal links | static reviewed |
| `/channels`, `/faq` | catalogue/FAQ | static; metadata | catalogue filtering, details accordions | static reviewed |
| `/blog`, `/blog/[slug]` | editorial hub | dynamic index / SSG articles; per-article metadata/schema | category links, article links | data/schema reviewed; browser NOT VERIFIED |
| legal pages, `/404`, error boundary | policies/error recovery | static | recovery link/reload | static reviewed |

No duplicate filesystem routes were found. `sitemap.ts` omits all eight `/setup/*` detail routes (F-003).

## Article audit matrix

Data/schema audit passed for all 19: unique slugs/titles; each has 7 section figures, a valid hero, table, 4+ FAQs, 3+ internal links, sources, canonical/OG/Twitter metadata and article/breadcrumb/FAQ JSON-LD through the renderer. `validate` confirms referenced local WebP assets. Rendered mobile readability, network images, and live JSON-LD parsing remain NOT VERIFIED.

| Article | Data/schema | Render/mobile |
|---|---|---|
| what-is-iptv; m3u-playlists-explained; device-compatibility; fire-tv-setup-checklist; iptv-troubleshooting | PASS | NOT VERIFIED |
| improve-streaming-quality; iptv-security-privacy; choosing-an-iptv-subscription; what-is-an-iptv-player; android-tv-google-tv-iptv | PASS | NOT VERIFIED |
| iptv-buffering-causes; ethernet-vs-wifi-streaming; samsung-smart-tv-iptv; apple-tv-iptv-compatibility; iptv-epg-not-working | PASS | NOT VERIFIED |
| m3u-playlist-not-loading; iptv-black-screen-no-sound; fire-tv-vs-android-tv; iptv-login-authentication-errors | PASS | NOT VERIFIED |

## Findings

See the issue register for reproduction and acceptance criteria. Counts: P0 0, P1 2, P2 4, P3 1.

- F-001 P1: commerce, trial, contact, renewal and order lookup have no backend integration.
- F-002 P1: legal pages are explicitly draft placeholders and footer says business details/policies require final review.
- F-003 P2: setup detail pages are absent from sitemap.xml.
- F-004 P2: browser/device/keyboard/network validation is entirely unverified; no automated suite is present.
- F-005 P2: installed Next version differs from declared package range, weakening reproducibility evidence.
- F-007 P2: shared metadata omits Twitter card metadata on most non-article public pages.
- F-006 P3: large shared first-load JS is 103 kB before route code; no field/synthetic CWV measurement exists.

## SEO, accessibility, security, performance

SEO foundations exist: metadata base, robots, sitemap, canonical metadata, and guide JSON-LD. Sitemap omission and missing non-article Twitter metadata are confirmed. Article JSON-LD is serialized from controlled local data; no direct user input reaches `dangerouslySetInnerHTML` in the reviewed uses. No environment files or `process.env` application usage were found. Static review found no payment processor, auth service, analytics, monitoring, server actions, or API routes.

Accessibility positives include a skip link, labelled mobile-menu button, `aria-expanded`, labelled catalogue input, native `details` FAQs, and form labels. Browser/keyboard/focus/contrast/touch-target testing is NOT VERIFIED. The demo forms correctly state that no data is sent, but their submit controls still require interaction and should be replaced by a direct support action before commercial publication.

Images are local WebP and article images declare dimensions. The build reports 103 kB shared first-load JavaScript and 108–121 kB on core pages. No Lighthouse or Core Web Vitals tooling/run was available, so live metrics are NOT VERIFIED.

## Integration readiness

| Capability | Status |
|---|---|
| Editorial hub | Implemented; static validation verified |
| Pricing selector / WhatsApp inquiry | Implemented; browser behavior not verified |
| Payment / order creation | Demo/placeholder |
| Trial/contact capture | Demo/placeholder |
| Renewal | Support-assisted only |
| Order lookup | Demo/placeholder |
| Legal publication | Placeholder; not ready |
| Analytics, monitoring, alerts | Missing/not found |

## Unverified areas

All four requested viewport/browser combinations; console/network failures; keyboard paths; real external WhatsApp behavior; responsive screenshots; deployed headers/redirects; field performance; dependency-vulnerability scan (no audit command was requested/run); production build exit status.
