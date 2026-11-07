# Zenora IPTV topical authority and semantic SEO forensic audit

Audit date: 2026-11-06. Scope: the local Next.js repository only. This is a read-only diagnostic, not an official Google assessment or a statement about rankings, traffic, backlinks, or Search Console performance.

## Executive summary

Zenora has a substantial, coherent on-site learning library: 19 long-form articles arranged around four code-defined categories (`fundamentals`, `setup`, `performance`, `safety`), plus devices, setup, troubleshooting, pricing, feature, support, and policy routes. The editorial renderer supplies consistent answer-first pages, sources, FAQ content, schema, related articles, and contextual article links. This is materially stronger than a disconnected blog.

The limiting issue is architecture rather than article count. The blog index is an archive, not a clearly named pillar hub for each cluster; commercial/setup routes and editorial clusters use different navigation paths; and the data model selects related articles manually without an explicit bidirectional pillar/support relationship. The resulting network is useful but uneven, especially for safety and subscription topics. On-site coverage is good; external authority is UNKNOWN without Search Console, crawl, backlink, rank, and user-behaviour data.

**Custom diagnostics (not Google scores): topical coverage 72/100; semantic SEO 77/100; internal linking 61/100; overall 70/100.** No P0 code or schema defect was confirmed. Three P1 architecture/content issues and five P2 improvements are evidence-backed below.

## Scope and method

CODE-VERIFIED: route inventory from `src/app`, indexable paths from `src/app/sitemap.ts:4-11`, metadata helper from `src/app/route-metadata.ts:5-16`, article data from `src/data/guides.ts:40-3619`, and renderer from `src/app/blog/[slug]/page.tsx:298-355`.

RENDER-VERIFIED evidence is limited to the existing local Chromium checks recorded in `docs/audits/ZENORA-ARTICLE-SEO-AUDIT.md`; this audit did not rerun the full browser matrix. EXTERNAL authority, rankings, PAA ownership, backlinks, and Search Console query/page overlap are UNKNOWN.

## Complete content-bearing inventory

46 sitemap-indexable URLs were found: 19 editorial articles, 8 device setup routes, and 19 non-article public routes. `checkout`, `order/status`, and `order/success` are functional/demo paths and are excluded from topical scoring; their source files are `src/app/checkout/page.tsx`, `src/app/order/status/page.tsx`, and `src/app/order/success/page.tsx`.

| URL group | Page type / primary topic | Intent | Content source | Indexability |
|---|---|---|---|---|
| `/` | commercial/informational IPTV overview | mixed discovery + commercial | `src/app/page.tsx` | indexed |
| `/pricing`, `/trial`, `/renew` | plan selection/trial/renewal | commercial | `src/app/pricing/page.tsx`, `trial/page.tsx`, `renew/page.tsx` | indexed |
| `/channels`, `/features`, `/how-it-works` | offer explanation | commercial investigation | matching `src/app/*/page.tsx` | indexed |
| `/devices`, `/setup` | compatibility/setup hubs | navigational + how-to | `src/components/pages.tsx:22-26` | indexed |
| `/setup/{android,apple-tv,firestick,ios,mac,mag,smart-tv,windows}` | device setup | how-to | matching `src/app/setup/*/page.tsx`, shared page components | indexed |
| `/troubleshooting`, `/support`, `/faq` | support hub/help | problem-solving | matching route files/shared components | indexed |
| `/about`, `/contact` | company/contact | navigational | matching route files | indexed |
| `/privacy-policy`, `/terms`, `/refund-policy`, `/cookie-policy` | policy | legal/navigational | matching route files | indexed; excluded from topical score |
| `/blog` | editorial archive/category filter | informational discovery | `src/app/blog/page.tsx` | indexed |
| `/blog/{19 slugs}` | editorial guides | informational, how-to, problem-solving, commercial investigation | `src/data/guides.ts`, `src/app/blog/[slug]/page.tsx` | indexed |

The individual editorial inventory, keyword, intent, cluster, and semantic assessment is in `ZENORA-PAGE-SEMANTIC-MATRIX.csv`.

## Actual topical clusters

| Cluster | Existing hub/pillar | Supporting pages | Classification | Evidence and limitation |
|---|---|---|---|---|
| Fundamentals and delivery | `/blog` category archive; no dedicated pillar | What Is IPTV; M3U; Player | PARTIAL | `guides.ts:40,271,1554`; strong definitions, but archive is not a dedicated cornerstone page. |
| Device compatibility and setup | `/devices`, `/setup` | device compatibility, Fire TV, Android/Google TV, Samsung, Apple TV, Fire vs Android; eight setup routes | STRONG | `components/pages.tsx:22-26`; good user progression from device selection to setup. Model/region and player coverage still vary. |
| Streaming/network performance | `/troubleshooting`; no editorial pillar | troubleshooting, quality, buffering, Ethernet/Wi-Fi, EPG, M3U loading, black screen, login | STRONG | `guides.ts:890,1055,1925,2141,2806-3488`; broad diagnostic coverage and dense cross-links. |
| Security, privacy, subscription evaluation | no true hub | security/privacy; subscription evaluation; login guide | PARTIAL | `guides.ts:1209,1368,3487`; useful pages, but no category landing page that connects privacy, purchase, renewals, support verification, and login safety. |
| Commercial product understanding | homepage/pricing/features | channels, features, trial, FAQ, how-it-works | PARTIAL | `src/app/page.tsx`, `components/site.tsx:252-287`; commercial CTAs are clear but pages are comparatively generic and do not form a learning-to-decision funnel. |

## Semantic and intent findings

**Strengths (CODE-VERIFIED, HIGH):** Every guide defines `keyword`, `intent`, `category`, sections, FAQ, sources and `related` data (`src/data/guides.ts`). The renderer exposes headings, a contents list, table, FAQ, sources, contextual links, related cards, and an exact brand home link (`src/app/blog/[slug]/page.tsx:341-355`). The research callout adds two visible linked findings when present (`:347`). This supports direct answers, entities and traceability without relying on keyword density.

**P1-01 — no explicit editorial pillar contract (HIGH).** `/blog` filters category cards (`src/app/blog/page.tsx:98-112`) but neither code nor data identifies a pillar, a parent URL, required reciprocal link, or cluster order. Consequence: a user can reach articles but is not consistently shown an authoritative start/end path. Affects all four clusters.

**P1-02 — performance cluster has overlapping symptom boundaries (MEDIUM).** `iptv-troubleshooting`, `iptv-buffering-causes`, `improve-streaming-quality`, `ethernet-vs-wifi-streaming`, and `iptv-black-screen-no-sound` all discuss controlled comparisons, network/device/player layers (`guides.ts:890,1055,1925,2141,3152`). Their keywords distinguish them, so repository evidence does not prove cannibalization; however, the same diagnostic intent is close enough to require intentional query mapping and distinctive SERP snippets. Search Console confirmation is UNKNOWN.

**P1-03 — safety cluster lacks a visible cluster hub (HIGH).** The footer only exposes three blog category links and does not expose safety as a full journey beyond a filtered archive (`components/site.tsx:136-139`). The two safety guides have useful source support, but purchase, privacy, renewal and authentication decisions are not organized as a single path.

**P2-01 — product entities are under-specified on commercial routes (MEDIUM).** Shared `Standard` content uses generic language such as “a clear next step” and “considered subscription” (`src/components/pages.tsx:3`). It cannot answer device, entitlement, service scope, legal, feature, and support questions at the depth of editorial guides. This is appropriate caution for a demo but weakens entity completeness of indexed commercial pages.

**P2-02 — contextual link governance is implicit (HIGH).** Article links come from `section.links` or category defaults (`blog/[slug]/page.tsx:346`) plus manual `related`. There is no automated check for reciprocal cluster links, contextual inlinks, or anchor diversity. This is maintainable at 19 articles but fragile as the inventory grows.

**P2-03 — source labels repeat at callout level (LOW).** Some two-finding callouts use the same authoritative page twice by design (`article-research.ts`); this is transparent but offers less source diversity than two independent authorities.

## Internal linking analysis

Navigation and footer links are intentionally excluded from contextual counts. Contextual article relationships are data-driven body links, category defaults, and `related` cards; related cards are useful discovery but weaker semantic evidence than in-body explanatory anchors. A representative directed edge table is supplied in `ZENORA-INTERNAL-LINK-AUDIT.csv`.

Observed graph characteristics (CODE-VERIFIED): each article has the mandatory homepage link (`blog/[slug]/page.tsx:352`), two category/default contextual links at most (`:346`), and manually selected related cards (`:355`). The homepage link is excluded from topical relationship counts. No source-code broken route was found in the sampled contextual edges; a full rendered link crawl was not run in this audit, so universal broken-link status is UNKNOWN. Blog articles have strong outgoing links but no explicit parent-pillar back-link beyond breadcrumb/archive.

## Cannibalization assessment

| Pair | Shared query space | Evidence | Severity | Resolution |
|---|---|---|---|---|
| Troubleshooting ↔ Buffering ↔ Streaming quality | “IPTV not working”, buffering, stability | distinct keyword/intent fields but overlapping diagnostics (`guides.ts:890,1055,1925`) | MEDIUM / unconfirmed | Define one primary query and “not about” scope in intros/meta; use hub links. |
| Device compatibility ↔ Fire vs Android ↔ platform guides | compatibility/device choice | separate platform/entity focus (`:448,1710,2360,2581,3299`) | LOW | Retain; add comparison-to-model guidance links. |
| M3U Explained ↔ M3U Not Loading | M3U playlist | explain vs troubleshooting (`:271,2998`) | LOW | Retain intentional journey; reciprocal “learn/fix” anchors. |
| Troubleshooting ↔ Black screen ↔ Login ↔ EPG | generic “IPTV not working” | issue-specific symptoms (`:890,2806,3152,3487`) | MEDIUM / unconfirmed | Keep separate only with symptom-first titles and canonical intent mapping. |

## Scorecard methodology

Scores use direct repository evidence, not rankings. Available evidence receives points only where a user journey, semantic coverage, or documented structure is observable. External authority is not scored as pass.

| Category | Weight | Score | Rationale |
|---|---:|---:|---|
| Topical coverage and cluster completeness | 20 | 14 | Broad 19-guide coverage, but absent safety and editorial pillar hubs. |
| Semantic completeness and entity coverage | 20 | 16 | Long-form sources/FAQs/tables and entities; commercial pages generic. |
| Internal linking and topical architecture | 20 | 12 | Contextual links and related cards exist; no explicit hierarchy/reciprocity governance. |
| Search intent alignment | 15 | 12 | Per-guide intent data and page formats align; close diagnostic queries need SERP evidence. |
| Content differentiation and overlap control | 10 | 7 | Intent/keyword fields help; cluster query boundaries are not formally enforced. |
| Site-wide consistency and factual support | 10 | 7 | Research callouts and cautious claims; public business/policy readiness remains generic. |
| Metadata and structured-data alignment | 5 | 5 | Renderer/shared audit records metadata, canonical and JSON-LD implementation. |
| **Total** | **100** | **70** | Custom diagnostic only. |

## Prioritized recommendations

1. **P1:** create explicit cluster-hub specifications for Fundamentals, Performance, and Safety, and add designated parent/next-step relationships. Affected `/blog`, `guides.ts`, safety and performance articles. This fixes hierarchy, not word count.
2. **P1:** map one primary query, secondary query and explicit exclusion for each performance guide; compare with Search Console before consolidation. Affects `/blog/iptv-troubleshooting`, buffering, quality, Ethernet/Wi-Fi, black screen, login, EPG and M3U loading.
3. **P1:** design a safety/subscription journey from privacy → subscription evaluation → login help → verified support. Affects `/blog/iptv-security-privacy`, subscription, login, `/support`, `/pricing`.
4. **P2:** add a link-governance data field for pillar, prerequisite, successor, and reciprocal contextual-link expectations; test it in validation.
5. **P2:** strengthen commercial pages with specific, verifiable decision entities and boundaries, while retaining demo/integration disclosures.
6. **P2:** make category archive introductions explain the task sequence and distinction among related troubleshooting pages.
7. **P2:** audit anchors for descriptive destination language and add contextual inbound links from setup pages to platform articles.
8. **P3:** diversify sources when feasible where two article findings cite the same page.

## Unknowns and final verdict

UNKNOWN: Google indexing/canonical selection, rankings, impressions, query cannibalization, backlinks, EEAT signals off-site, competitor performance, conversions, Core Web Vitals field data, and user engagement. Search Console and analytics exports are required to resolve these.

**Final verdict:** Zenora is a well-structured on-site educational foundation with particularly strong setup and troubleshooting coverage. It is not yet proven to have external topical authority, and its on-site authority is constrained by missing named pillars, an incomplete safety cluster journey, and implicit link governance. The next work should be information architecture and query-boundary design, not indiscriminate article expansion.

## Optimization re-audit — November 6, 2026

Implemented evidence: `src/data/topic-architecture.ts` now supplies one typed relationship layer for all 19 guides (cluster, pillar, prerequisites, successor, supporting and cross-cluster articles, plus primary/secondary/excluded query boundaries). `src/app/blog/page.tsx` renders Fundamentals, Setup, Performance and Safety pathways; `src/app/troubleshooting/page.tsx` is a symptom-first Performance hub; and `src/app/blog/[slug]/page.tsx` renders a labelled editorial path without replacing the mandatory brand link. `scripts/validate-guides.mjs` validates relationship coverage, known slugs, cluster names, duplicate references and unintended self-references.

The earlier 46-versus-42 matrix discrepancy is resolved: the 42 substantive data rows were supplemented with the four indexable policy pages. They are present in the inventory but marked `NOT_SCORED` for topical-semantic depth because their legal/navigational purpose is not an editorial-topic task.

| Category | Before | After | Evidence / remaining deduction |
|---|---:|---:|---|
| Topical coverage and cluster completeness | 72 | 82 | Four explicit journeys and pillars exist; no external authority evidence. |
| Semantic completeness and entity coverage | 77 | 80 | Hub explanation and intent boundaries added; generic commercial copy remains a business-fact limitation. |
| Internal linking and topical architecture | 61 | 81 | Typed paths and validation make relationships intentional; no full rendered all-link crawler yet. |
| Overall custom diagnostic | 70 | 81 | Same rubric; deductions retained for external evidence, commercial specificity, and full rendered graph completeness. |

Focused Chromium/mobile-small evidence: hub navigation 1/1 passed; article topical path 1/1 passed; mandatory exact in-body brand link regression 19/19 passed in bounded 10/10 and 9/9 batches. `npm run validate`, `npm run typecheck`, and `npm run lint` passed before the focused browser checks. No ranking, backlink, Search Console, or user-behaviour conclusion is inferred from these changes.

## Final quality re-audit — November 6, 2026

This section supersedes the earlier limitation that no full rendered all-link crawl had run. `tests/e2e/internal-link-crawl.spec.ts` rendered every one of the 46 sitemap-indexable content routes in Chromium desktop (one worker, 10-second route navigation limit). It completed **46/46** routes with no render failures, generated **2,043** deduplicated internal-link records across **51** destinations, and found **zero** unexpected internal destinations and **zero** contextual orphan indexable routes. The generated evidence is `ZENORA-INTERNAL-LINK-AUDIT.csv`; it records source URL, destination, anchor, rendered context, relationship type, and validation method.

`/features` and `/how-it-works` no longer rely on the generic shared placeholder card body. Their factual, bounded decision paths now distinguish new-subscription plan comparison, device guidance, setup, troubleshooting, and existing-customer renewal without changing pricing, offers, integrations, or policy terms. `scripts/validate-guides.mjs` additionally enforces a source-linked two-finding research minimum and a unique primary-query boundary for every one of the 19 articles.

| Original weighted category | Weight | Final score |
|---|---:|---:|
| Topical coverage and cluster completeness | 20 | 18 |
| Semantic completeness and entity coverage | 20 | 18 |
| Internal linking and topical architecture | 20 | 19 |
| Search-intent alignment | 15 | 13 |
| Content differentiation and overlap control | 10 | 8 |
| Site-wide consistency and factual support | 10 | 8 |
| Metadata and structured-data alignment | 5 | 5 |
| **Total** | **100** | **89** |

The retained 11-point deduction is intentional and documented in `ZENORA-100-QUALITY-GAP-REPORT.md`: external query/ranking/backlink/field data and authorized legal/product/operations facts cannot be inferred from the repository. Final local checks passed: validation, typecheck, lint, production build verification, the 46-route Chromium crawl, and the two updated mobile commercial-route regressions.
