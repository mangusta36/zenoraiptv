# Zenora IPTV final SEO quality gap report

Audit date: 2026-11-06. This is a repository and local-Chromium assessment, not a Google ranking, indexing, backlink, conversion, or legal-compliance determination.

## Final scope and evidence

- **Indexable, content-bearing routes:** 46 — 19 editorial guides, 8 device setup pages, and 19 other public pages, reconciled with `src/app/sitemap.ts`.
- **Article records:** 19/19, with 19 relationship contracts, 19 unique primary-query boundaries, and 19 research records containing at least two source-linked findings each. `npm run validate` enforces these local contracts.
- **Rendered internal-link crawl:** 46/46 source routes rendered in Chromium desktop with one worker and a 10-second navigation limit per route. The crawler produced 2,043 deduplicated rendered link records, 51 distinct destinations, **0 unexpected internal destinations**, **0 source render failures**, and **0 contextual orphan indexable routes**. Evidence: `tests/e2e/internal-link-crawl.spec.ts` and `ZENORA-INTERNAL-LINK-AUDIT.csv`.
- **Responsive regression:** `/features` and `/how-it-works` passed at mobile-standard (390 × 844) without horizontal overflow or broken in-viewport images. Existing focused hub, article-path, and exact in-body homepage-link checks remain passing.

## Weighted repository quality score

| Original category | Weight | Final score | Evidence and retained deduction |
|---|---:|---:|---|
| Topical coverage and cluster completeness | 20 | 18 | Four named journeys, designated pillars, a device hub, and a symptom-first troubleshooting hub now exist. A purpose-built static safety landing page is still represented by the filtered blog hub rather than a separate destination. |
| Semantic completeness and entity coverage | 20 | 18 | Guides have structured sections, sources, FAQs, tables where appropriate, citations, and query boundaries. Features and how-it-works now describe decision steps accurately. Owner-only product, legal, and business facts remain intentionally absent. |
| Internal linking and topical architecture | 20 | 19 | Typed article relationships, labelled journeys, and a full rendered crawl demonstrate complete route coverage with no contextual orphans. One point is retained because link quality and future editorial ownership still require human review, not because a defect was found. |
| Search-intent alignment | 15 | 13 | Every guide has a primary, secondary, and excluded query contract. Actual SERP overlap, impressions, and query/page performance remain unknown without Search Console. |
| Content differentiation and overlap control | 10 | 8 | Explicit exclusions distinguish close troubleshooting and setup topics. The remaining two points require live query evidence before declaring cannibalization resolved. |
| Site-wide consistency and factual support | 10 | 8 | Source-linked findings, cautious demo disclosures, support boundaries, and commercial decision paths are consistent. Legal approval, service entitlement facts, and verified business details require an authorized owner. |
| Metadata and structured-data alignment | 5 | 5 | Existing canonical, metadata, FAQ, breadcrumb, and article schema implementation remains in place and was not weakened. |
| **Total** | **100** | **89** | A strong on-site, repository-verifiable result; it is not defensible to claim 100 without external performance data and owner-confirmed commercial/legal facts. |

## Confirmed changes

1. Added `src/data/topic-architecture.ts` as a single, typed cluster/parent/prerequisite/successor/cross-cluster contract for all 19 guides.
2. Added labelled editorial learning paths to every guide, topic-pathway navigation to `/blog`, and a symptom-first performance hub at `/troubleshooting`.
3. Replaced generic placeholder bodies on `/features` and `/how-it-works` with factual decision guidance linking plan selection, device compatibility, setup, and troubleshooting. No price, term, offer, integration, policy, domain, or URL changed.
4. Added static validation for research-record coverage, two source-linked findings per guide, relationship coverage, and unique primary-query boundaries.
5. Added the reproducible one-worker Chromium rendered-link crawl and regenerated the complete, deduplicated CSV audit.

## Verification results

| Check | Result |
|---|---|
| `npm run validate` | PASS |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run verify:build` | PASS — optimized production build completed after the content-route changes |
| Chromium rendered-link crawl, desktop | PASS — 1/1 test, 46/46 source routes, 17.2 seconds |
| Chromium responsive regression, mobile-standard | PASS — 2/2 (`/features`, `/how-it-works`) |
| Previously completed focused article/hub checks | PASS — topic hub 1/1, article path 1/1, exact in-body homepage link 19/19 |

## Remaining gaps and required owner/external inputs

No repository defect is currently blocking the audited on-site architecture. The following are deliberate, documented limits rather than failures:

| Gap | Why it cannot be closed locally | Required input |
|---|---|---|
| Search demand, rankings, index selection, cannibalization, CTR and Core Web Vitals field data | These are external runtime/search signals. | Search Console and analytics exports; field-performance access. |
| Backlinks, publisher reputation, and external E-E-A-T signals | They are not stored in this repository. | Legitimate outreach/PR and backlink data. |
| Exact service entitlement, channel availability, supported apps, refund/cancellation terms, legal entity and support SLA | The code intentionally labels demo/placeholder or support-assisted flows and must not invent owner facts. | Authorized product, operations, and legal approval. |
| Legal-policy readiness | The policy pages explicitly require legal review. | Signed-off final policy text and verified contact information. |

## Verdict

**Technical topical and semantic readiness: PASS, with an 89/100 repository-verifiable quality score.** The route graph is fully crawled locally, no contextual orphan or unexpected internal destination was found, and the audit gates protect the completed editorial model. A 100/100 claim would be misleading until the listed owner-confirmed and external-search evidence is supplied.
