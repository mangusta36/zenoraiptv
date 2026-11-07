# Zenora IPTV topical and semantic SEO audit handoff

## Executive summary

This read-only audit examined the local Next.js project at `/home/mangusta/Projects/zenoraiptv`: 46 sitemap-indexable content-bearing routes, including 19 editorial articles. Zenora has a coherent on-site educational base, particularly for device setup and troubleshooting. It does **not** have repository evidence proving external topical authority, rankings, traffic, or actual query cannibalization.

Custom diagnostics, not Google scores: **topical authority 72/100, semantic SEO 77/100, internal linking 61/100, overall 70/100.** The main opportunity is structural: define named pillar/hub journeys and formalize contextual link relationships. Do not respond by producing many loosely related articles.

## Scope and clusters

Audited route groups: homepage; pricing/trial/renew; channels/features/how-it-works; devices/setup plus eight device routes; troubleshooting/support/FAQ; about/contact; policies; `/blog`; and all 19 guides. Functional checkout/order paths were documented but excluded from topical scoring.

Actual clusters: Fundamentals (partial), Device compatibility/setup (strong), Playback/network troubleshooting (strong), Security/privacy/subscription evaluation (partial), and Commercial product understanding (partial). Detailed map: `docs/audits/ZENORA-TOPICAL-MAP.md`.

## Key evidence

1. All article metadata, sections, FAQs, source lists, related selections, keywords and intent live in `src/data/guides.ts:40-3619`.
2. The renderer emits TOC, sections, source-linked research callouts, contextual links, FAQ, source list, mandatory brand link and related cards in `src/app/blog/[slug]/page.tsx:298-355`.
3. The category archive is a filter/listing (`src/app/blog/page.tsx:98-112`), not a named pillar with a prescribed cluster journey.
4. Link selection is data-driven but implicit: `section.links` / category defaults and manual related records (`src/app/blog/[slug]/page.tsx:346,355`).
5. `/devices` and `/setup` create a meaningful setup hub but safety/privacy/subscription has no comparable hub (`src/components/pages.tsx:22-26`; `src/components/site.tsx:136-139`).

## Top 10 weaknesses

1. No explicit pillar/parent relationship contract for editorial clusters.
2. No dedicated safety/subscription journey hub.
3. Performance guides have close diagnostic query territory; ranking conflict is unconfirmed without Search Console.
4. Contextual-link reciprocity and anchor diversity are not validated automatically.
5. Blog archive is an index, not a topical decision tree.
6. Commercial indexed routes rely on generic shared copy in places (`src/components/pages.tsx:3`).
7. Setup route-to-long-form-guide connections are uneven.
8. Related cards are discovery aids but weaker than explanatory contextual links.
9. Source diversity varies where two visible findings cite one authority.
10. External authority evidence is entirely unavailable in the repository.

## Top 10 recommendations

1. Define Fundamentals, Performance, and Safety hubs with start/next-step paths (P1).
2. Establish a primary/secondary/excluded query map for every performance guide before consolidation (P1).
3. Connect security → subscription evaluation → login recovery → verified support (P1).
4. Add data fields for pillar, prerequisite, successor, and reciprocal contextual links (P2).
5. Validate required reciprocal and descriptive anchors in the guide validator (P2).
6. Add clear archive introductions that route users by goal/symptom (P2).
7. Add setup-page contextual links to matching platform articles (P2).
8. Make commercial claims more entity-specific and verifiable while retaining demo disclosures (P2).
9. Use Search Console query/page data to resolve the performance overlap risk (P1 external dependency).
10. Use a crawl/rendered link export to validate all internal hrefs and calculate true inlink counts (P2).

## Statistics and limitations

Sitemap declares 46 indexed content routes (`src/app/sitemap.ts:4-11`): 19 articles, 8 setup pages, 19 other public routes. The article renderer guarantees related cards and the mandatory homepage brand link; the latter was excluded from semantic-link scoring. `ZENORA-INTERNAL-LINK-AUDIT.csv` lists verified representative contextual edges; it is not a full rendered crawl. Potential cannibalization pairs: general troubleshooting/buffering/quality/Ethernet/black-screen; M3U explanation/loading; and device comparison/platform guides. These are **unconfirmed** until Search Console query-page exports are reviewed.

## Final verdict

Zenora is a credible on-site information foundation rather than a proven external topical authority. It has strong article depth and a useful device/troubleshooting network. Its highest-value next phase is a deliberate topical architecture: named hubs, reciprocal context links, and query-boundary governance. External ranking, backlink, and user-behaviour conclusions remain UNKNOWN.

## Optimization update — November 6, 2026

Implemented: typed editorial architecture in `src/data/topic-architecture.ts`; topic pathway navigation on `/blog`; a symptom-first `/troubleshooting` hub; per-article labelled learning paths; and validator coverage for every relationship record. Query boundaries are represented as `primaryQuery`, `secondaryQuery`, and `excludedQuery` without claiming actual ranking data.

Re-audit: topical 82/100, semantic 80/100, internal linking 81/100, overall 81/100. These are custom repository diagnostics. Deductions remain for no Search Console/backlink/ranking data, generic commercial copy where owner-confirmed facts are unavailable, and absence of a full rendered all-link crawler. Validation, typecheck, lint, a production build, focused mobile hub/path checks, and 19/19 exact brand-link checks passed.

## Final quality handoff — November 6, 2026

The full rendered-link-crawler limitation is closed. Chromium crawled all 46 sitemap-indexable content routes and generated 2,043 deduplicated audit rows across 51 destinations, with no unexpected internal path, render failure, or contextual orphan indexable route. `/features` and `/how-it-works` received bounded decision-content improvements; no commercial terms or demo disclosures changed. The final repository-verifiable weighted score is 89/100. See `ZENORA-100-QUALITY-GAP-REPORT.md` for the exact rubric, command results, and owner/external dependencies; do not represent this as a Google or business-readiness score.
