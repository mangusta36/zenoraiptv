# Zenora IPTV complete SEO audit

Audit date: 2026-11-10  
Repository: `/home/mangusta/Projects/zenoraiptv`  
Canonical origin: `https://www.zenoratv.vip`

## Executive status

The verified route set is 42 indexable URLs and 7 intentional noindex URLs. The indexable set contains 15 core/hub pages, 8 device setup pages, and 19 long-form articles. No route, slug, article, price, connection option, annual-promotion term, or WhatsApp destination was removed or changed.

The final production-mode checks confirm:

- 42 sitemap URLs and 7 noindex routes
- unique rendered titles and meta descriptions on all indexable routes
- one rendered H1 per audited route
- correct self-canonicals, robots directives, social metadata, and sitemap membership
- no broken internal targets, internal `nofollow`, generic exact anchors, or indexable orphan routes
- one contextual homepage brand link and at least two editorial-section links per article
- 19 unique 1200×630 WebP article heroes and 140 valid 800×500 supporting placements
- all configured prices, all six connection choices, and the 12 paid months + 2 free months promotion preserved
- 384 responsive functional checks passed across 375, 390, 768, and 1440px

## Route and indexability inventory

| Group | Count | Routes/status |
| --- | ---: | --- |
| Core and commercial | 15 | `/`, `/pricing`, `/channels`, `/features`, `/devices`, `/how-it-works`, `/trial`, `/faq`, `/contact`, `/about`, `/setup`, `/troubleshooting`, `/renew`, `/support`, `/blog` |
| Device setup | 8 | Android, Apple TV, Fire TV Stick, iOS/iPadOS, macOS, MAG, Smart TV, Windows |
| Articles | 19 | Fundamentals, setup/device, performance/troubleshooting, and safety/subscription clusters |
| Legal drafts | 4 | `noindex, follow`; excluded from sitemap pending approval |
| Private workflow previews | 3 | Checkout, order status, and order success use `noindex, nofollow`; excluded from sitemap |

The exact rendered inventory is generated at `docs/audits/results/seo-route-inventory.csv`. Legacy `/guides` paths retain permanent redirects to current `/blog` destinations. Filtered blog category views canonicalize to `/blog` and are not separate sitemap URLs.

## Internal-link reconciliation

The historical Markdown/CSV mismatch had three concrete causes:

1. `scripts/validate-internal-links.mjs` and `tests/e2e/internal-link-crawl.spec.ts` both wrote `ZENORA-INTERNAL-LINK-AUDIT.csv`, so whichever ran last replaced the artifact.
2. The script counted links from 42 indexable plus 7 noindex source routes, while the browser test counted only the 42 indexable sources.
3. The browser test did not classify `#mobile-navigation` as navigation, so those links were recorded as page content. The producers also emitted different columns and could represent different runs.

The script is now the only report writer. It validates all 49 routes but defines the canonical edge dataset as rendered links from the 42 indexable sources. The CSV and Markdown summary are built from the same `dedupedLinks` array in one execution, with a fixed classification order, deduplication key, and sort order. The browser test validates the crawl but no longer overwrites the report.

| Context | Canonical records |
| --- | ---: |
| Article body | 101 |
| Topic journey | 71 |
| Related content | 74 |
| Page content | 443 |
| Navigation | 420 |
| Footer | 630 |
| **Total** | **1,739** |

The context sum equals the CSV row total. Two consecutive production-mode runs produced the same CSV SHA-256: `d6e61263b4666a886899ed1a25e0e5c97d1eb838db2ded278c489e58adca7060`. The canonical generated summary is `docs/audits/ZENORA-INTERNAL-LINK-SUMMARY.md`.

## Keyword and content strategy

`docs/audits/ZENORA-KEYWORD-MAP.csv` maps all 42 indexable URLs across 13 fields: primary non-branded keyword, secondary terms, long tails, brand role, intent, existing/proposed title and H1, entities, supporting links, and overlap risks. Static validation requires exact 42-URL coverage with no duplicate or empty records.

The homepage, About, Contact, and Renew remain appropriately brand-led. Commercial and hub pages now lead with useful non-branded topics including IPTV subscription plans, IPTV pricing, channel information, service features, device compatibility, setup guides, troubleshooting, and paid-trial information. Device and article routes retain their focused queries rather than receiving generic keyword repetition.

Key title/H1 changes include:

| URL | Before | Final |
| --- | --- | --- |
| `/pricing` | Zenora IPTV Pricing / Compare a new Zenora IPTV subscription | IPTV Subscription Plans & Pricing / Compare IPTV subscription plans by duration and connections |
| `/channels` | Zenora IPTV Channels / Explore Zenora IPTV channel information | IPTV Channel Information & Availability / Explore IPTV channel information and availability |
| `/features` | Zenora IPTV Features / Zenora IPTV features for a more connected viewing experience | IPTV Service Features & Device Support / IPTV service features for compatible devices and flexible plans |
| `/devices` | Zenora IPTV Devices / Find the right Zenora IPTV device setup path | IPTV Device Compatibility & Setup Guides / Compare IPTV device compatibility and setup paths |
| `/how-it-works` | How Zenora IPTV Works / How Zenora IPTV works, from plan choice to setup | How an IPTV Subscription Works / How an IPTV subscription works, from plan choice to setup |
| `/trial` | Zenora IPTV Trial / Request a Zenora IPTV paid trial | Paid IPTV Trial Information / Request information about a paid IPTV trial |
| `/faq` | Zenora IPTV FAQ / Zenora IPTV FAQs for plans, devices, setup, and support | IPTV Subscription, Setup & Device FAQ / IPTV FAQs about plans, devices, setup, and support |
| `/setup` | Zenora IPTV Setup | IPTV Setup Guides for Smart TVs & Devices |
| `/troubleshooting` | Zenora IPTV Troubleshooting | IPTV Not Working? Troubleshooting Guide |
| `/support` | Zenora IPTV Support / Zenora IPTV support for setup and playback questions | IPTV Setup & Playback Support / IPTV support for setup and playback questions |
| `/blog` | Zenora IPTV Blog / Zenora IPTV guides for clearer streaming decisions | IPTV Setup, Device & Troubleshooting Guides / IPTV guides for setup, devices, and troubleshooting |
| Buffering article | IPTV Buffering Fix: Diagnose the Actual Cause | IPTV Buffering Fix: Causes and Troubleshooting Steps |

Visible copy now naturally names simultaneous streams, M3U, Xtream Codes, portals, platform/device checks, buffering, playlist, picture, sound, login, and authentication questions only where relevant. No geographic, “best,” search-volume, ranking, or performance promise was invented.

## Topic clusters and overlap controls

The 34 previously escaped contextual anchors remain repaired. This pass added reciprocal body links between the four closest overlapping pairs:

- `/setup/firestick` ↔ `/blog/fire-tv-setup-checklist`
- `/troubleshooting` ↔ `/blog/iptv-troubleshooting`
- `/devices` ↔ `/blog/device-compatibility`
- `/pricing` ↔ `/blog/choosing-an-iptv-subscription`

Each pair keeps a distinct intent: concise setup vs detailed preflight; symptom router vs diagnostic method; device directory vs compatibility methodology; configured offer vs buyer-evaluation checklist. No actual Google cannibalization is claimed without Search Console evidence.

## Legal status

Privacy, terms, refund, and cookie pages now show policy-specific missing inputs instead of a generic placeholder or unapproved refund promise. They remain visible through working footer links, `noindex, follow`, and outside the sitemap. `docs/audits/ZENORA-LEGAL-APPROVAL-CHECKLIST.md` records the exact identity, data, processor, retention, billing, renewal, refund, dispute, cookie-inventory, consent, and jurisdictional inputs required before authorization. Indexing remains an explicit post-approval release gate.

## Commercial claims and workflow honesty

The visible `26,000+` channel and `100,000+` movie/series claims had no authoritative evidence beyond repeated marketing copy and were removed. Service-wide 4K/Full-HD language was replaced with accurate, conditional wording about content, player, device, and connection dependencies. Exact catalogue/territory availability, device coverage, content rights, uptime, and staffed support remain owner-dependent.

The configured price matrix, six simultaneous-connection options, paid trial request, and annual promotion were preserved. `docs/audits/ZENORA-COMMERCIAL-CLAIMS.md` classifies each claim and identifies the evidence needed for future publication.

Contact and trial forms remain clearly demonstration-only. Checkout remains a disabled preview and creates no payment or order. Order status discloses the absent backend. Order success now says explicitly that no order confirmation is available rather than implying payment confirmation or credential delivery. Pricing and checkout WhatsApp links continue to derive plan duration, connection count, price, and annual bonus from shared configuration.

## Article and image standard

All 19 existing articles contain 2,735–3,001 editorial words. Validation confirms 159 local WebP content references: 19 unique heroes plus 140 supporting placements. Every referenced file exists and has the expected 1200×630 hero or 800×500 support dimensions.

Four articles meet or exceed the desired eight-support-image target: `what-is-iptv` (11), `m3u-playlists-explained` (8), `fire-tv-setup-checklist` (8), and `iptv-troubleshooting` (8). The other 15 have 7 supporting images and remain one genuine asset short. No suitable unused, unique 800×500 asset was available for those sections, so no duplicate or unrelated placeholder was added. The exact gap is emitted by `npm run validate:guides` and remains an honest follow-up item.

## Automated QA

| Check | Outcome |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm run validate:guides` | Pass; 19 articles, 159 WebP references, 140 support placements, exact 15-article image gap reported |
| `npm run test:static` | Pass; 42 keyword-map URLs, 24 price combinations, sitemap/social metadata, and annual promotion invariants |
| `npm run build` | Pass; 57/57 static pages generated |
| `npm run validate:links` against `next start` | Pass twice; 42 indexable, 7 noindex, 1,739 deterministic links |
| `npm run test:e2e` | 384/384 pass across 375×844, 390×844, 768×1024, and 1440×900 |

The browser suite covered all page routes, representative and all article routes, pricing and all 24 checkout combinations, broken images, horizontal overflow, mobile navigation, forms, FAQs, 404 behavior, contextual article links, topic hubs, and the rendered internal-link crawl.

## Remaining owner-dependent items

1. Supply authoritative legal/business inputs and counsel approval before indexing any legal page.
2. Supply catalogue, rights, territory, device-test, support-hours, and service-availability evidence before restoring strong capability claims.
3. Approve paid-trial price/scope and refund terms; neither is inferred from historical marketing language.
4. Create or properly license 15 genuinely useful 800×500 section images if the eight-support-image target is mandatory.
5. Connect and verify payment, order, contact, and fulfillment backends only if the business intends those workflows to operate.
6. After deployment, use Search Console, analytics, server logs, and field Core Web Vitals to measure indexing and query/page behavior. Repository QA cannot establish rankings or live organic performance.

No commit, push, deployment, Vercel, DNS, or production-system change was performed.
