# Zenora topical authority and semantic SEO optimization changelog

Date: 2026-11-06

## Implemented

- Added `src/data/topic-architecture.ts`, a typed single relationship layer for all 19 guides. It defines cluster membership, pillars, prerequisites, successors, support/cross-cluster relationships, and primary/secondary/excluded query boundaries.
- Enhanced `/blog` with navigable Fundamentals, Device Setup, Performance, and Safety pathways. Category-filtered views now explain the active journey rather than acting only as a card filter.
- Replaced the generic `/troubleshooting` route with a symptom-first performance hub that routes to the focused guide and a verified-support next step.
- Added labelled editorial learning paths to every article. They preserve existing guide body content, sources, figures, metadata, schemas, URLs, related cards, and the exact in-body `Zenora IPTV` homepage link.
- Extended `scripts/validate-guides.mjs` to validate relationship completeness and references.
- Added focused Playwright coverage for hub navigation, keyboard focus, and article contextual navigation.
- Resolved the semantic-matrix route discrepancy by adding the four indexable policy routes as `NOT_SCORED` legal/navigational pages.

## Verification

| Command/check | Result |
|---|---|
| `npm run validate` | PASS |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS |
| Hub navigation mobile Chromium | PASS, 1/1 |
| Article learning-path mobile Chromium | PASS, 1/1 |
| Exact in-body brand link mobile Chromium | PASS, 19/19 |

## Intent boundaries now encoded

- General troubleshooting routes by observed symptom; it excludes a single-symptom diagnosis.
- Buffering diagnoses interrupted playback; quality guidance is preventive optimization; Ethernet/Wi-Fi is a local-link comparison; black screen/no sound is audio/video output diagnosis.
- M3U explanation teaches the format; M3U loading isolates import/retrieval failures.
- Device compatibility evaluates the chain; platform guides handle device-specific setup; the Fire-versus-Android page is a comparison, not installation instructions.

## Remaining limits

No change can prove rankings, indexing, query cannibalization, backlinks, EEAT off-site signals, conversions, or user behaviour without Search Console, analytics and external data. Commercial factual specificity remains bounded by the project’s existing demo-only integration and owner-confirmed business information.

## Final quality pass — November 6, 2026

- Added `tests/e2e/internal-link-crawl.spec.ts`: a bounded, one-worker Chromium crawl of all 46 sitemap-indexable routes that writes the complete deduplicated rendered-link CSV audit. Result: 1/1 passed; 2,043 records; 51 destinations; no unexpected internal destination or contextual orphan.
- Added research-coverage and unique primary-query checks to `scripts/validate-guides.mjs`.
- Replaced the generic indexed content bodies for `/features` and `/how-it-works` with accurate decision pathways. This did not change plan configuration, pricing, trial language, checkout capability, URLs, metadata, images, policy language, or domain settings.
- Verified validation, typecheck, lint, production build, the desktop crawl, and mobile-standard regressions for both revised routes. The full final rubric and remaining owner/external gaps are in `ZENORA-100-QUALITY-GAP-REPORT.md`.
