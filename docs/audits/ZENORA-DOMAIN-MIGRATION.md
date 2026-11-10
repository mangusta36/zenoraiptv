# Zenora IPTV domain migration

Migration date: 2026-11-10  
Local implementation status: **complete and verified**  
Deployment/DNS status: **not changed or claimed**

## 1. Domain change

- Previous configured origin: `https://zenoraiptv.tv`
- New canonical origin: `https://www.zenoratv.vip`
- Required apex redirect: `https://zenoratv.vip/*` → `https://www.zenoratv.vip/*`
- Brand remains **Zenora IPTV**.
- All route paths, article slugs, pricing, promotion terms, connection options, WhatsApp behavior, legal indexability, and content architecture remain unchanged.

## 2. Repository inventory and files changed

The prior origin was active in root metadata, global Organization/WebSite JSON-LD, sitemap, robots, article BlogPosting/Breadcrumb JSON-LD, shared breadcrumbs, brand configuration, the link validator, and the current complete audit. No production site-URL environment variable existed.

Domain implementation files:

- `src/config/site.json` — single canonical-origin value
- `src/config/site.ts` — shared `siteOrigin`, hostname, and absolute-URL helper
- `src/app/layout.tsx` — metadata base and global Organization/WebSite entities
- `src/app/robots.ts` — canonical sitemap reference
- `src/app/sitemap.ts` — all sitemap URLs derive from the shared origin
- `src/app/blog/[slug]/page.tsx` — BlogPosting, publisher/author reference, image, main entity, and breadcrumbs
- `src/components/pages.tsx` — shared page BreadcrumbList URLs
- `src/config/brand.ts` — brand domain derives from shared origin; brand name unchanged
- `next.config.ts` — apex-host-only permanent redirect to `www`
- `scripts/validate-internal-links.mjs` — shared-origin loading plus rendered domain regression checks
- `scripts/check-platform.mjs` — canonical-origin, redirect-loop, and stale-origin checks
- `tests/e2e/domain-migration.spec.ts` — representative rendered metadata, sitemap/robots, and redirect smoke tests
- `docs/audits/ZENORA_COMPLETE_SEO_AUDIT.md` — current canonical origin
- `docs/audits/ZENORA-DOMAIN-MIGRATION.md` — this handoff
- Generated verification artifacts: `docs/audits/results/seo-route-inventory.csv`, `docs/audits/ZENORA-INTERNAL-LINK-AUDIT.csv`, browser JSON, and the desktop pricing capture

Historical audit notes may still mention the former hostname as dated evidence. They do not feed generated site output. The old hostname is also intentionally present in regression assertions that fail if it reappears in production metadata.

## 3. Canonical and social verification

Production rendering was checked for all 42 indexable routes:

- Homepage canonical: `https://www.zenoratv.vip`
- Pricing canonical: `https://www.zenoratv.vip/pricing`
- Blog canonical: `https://www.zenoratv.vip/blog`
- Example article canonical: `https://www.zenoratv.vip/blog/what-is-iptv`
- Example setup canonical: `https://www.zenoratv.vip/setup/firestick`
- Open Graph `url` equals each indexable canonical.
- Open Graph and Twitter image metadata resolve against the new `www` origin.
- No indexable canonical uses the apex host, old domain, query parameters, or an inconsistent trailing slash.
- Local `next start` continues to serve through `127.0.0.1`; local hostnames do not become canonical origins.

## 4. Sitemap and robots

- Sitemap contains the same 42 indexable paths, all on `https://www.zenoratv.vip`.
- The seven existing noindex routes remain excluded.
- Redirect routes remain excluded.
- All 19 article `lastModified` values still derive from their editorial dates.
- Robots declares `Sitemap: https://www.zenoratv.vip/sitemap.xml` and continues to allow public crawling.

## 5. Structured data

- One global Organization entity uses `https://www.zenoratv.vip/#organization`.
- One global WebSite entity uses `https://www.zenoratv.vip/#website` and references the Organization.
- BlogPosting author and publisher refer to that same Organization `@id`; no duplicate organization was added.
- BlogPosting `mainEntityOfPage`, image, and BreadcrumbList items use the new origin.
- Shared page breadcrumbs use the new origin.
- Existing FAQPage data is unchanged because it contains no domain-dependent URL fields.
- Rendered JSON-LD on all audited routes was checked for the new origin and rejected the old or non-www production origin.

## 6. Internal links and business preservation

Same-site navigation remains root-relative. The exact in-body **Zenora IPTV** link on every article still points to `/`, which resolves to the canonical homepage on production without hard-coding a host.

The production crawl remains:

- 42 indexable routes
- 7 noindex routes
- 1,739 unique internal-link records
- 101 article-body, 71 topic-journey, 74 related-content, 443 page-content, 420 navigation, and 630 footer records
- no broken internal targets, no orphan indexable pages, and no internal `nofollow`

All 24 price combinations, six connection choices, the 12 paid months + 2 free months offer, checkout summaries, and WhatsApp order messages passed the focused browser regression unchanged.

## 7. Redirect strategy

`next.config.ts` now contains a host-guarded permanent redirect from `zenoratv.vip` to `https://www.zenoratv.vip/:path*`. Because the condition matches only the apex host, requests already using `www` are not redirected and cannot loop. Next.js emits HTTP 308 for this permanent redirect. A local production request verified that `/pricing?connections=2` preserves both path and query.

Vercel should still set the `www` hostname as primary and explicitly redirect the apex hostname to it. This is the platform-level canonical-domain control and is consistent with the application fallback, not opposite to it. Vercel recommends `www` as primary and supports configuring the other attached domain through **Project Settings → Domains → Edit → Redirect to**. See [Vercel’s domain redirect guidance](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting).

The repository does not prove current ownership, deployment, or DNS control of `zenoraiptv.tv`. No old-domain redirect is claimed active. If the owner controls the former domain, attach it only after confirming ownership and configure direct permanent redirects from every old path to the same path on `https://www.zenoratv.vip`, avoiding an intermediate apex hop.

## 8. Environment variables

The application does not consume `NEXT_PUBLIC_SITE_URL`, `SITE_URL`, or `BASE_URL`. The canonical origin is deliberately fixed in `src/config/site.json`, so preview deployment hostnames cannot become canonical by accident. `SEO_BASE_URL` remains a validator-only local target and does not affect generated metadata.

No environment variable is required for this migration. If external deployment automation already defines a site-URL variable, review it for stale values, but adding an unused public variable is unnecessary. No secret or private environment file was modified.

## 9. Vercel deployment checklist

Owner/deployer actions:

1. In the correct Vercel project, open **Settings → Domains**.
2. Add `www.zenoratv.vip`.
3. Add `zenoratv.vip`.
4. Make `www.zenoratv.vip` the primary production domain.
5. Edit `zenoratv.vip` and set its redirect target to `www.zenoratv.vip`; do not create the reverse redirect.
6. Copy the exact DNS records displayed by Vercel for this project to the authoritative DNS provider. Do not substitute generic A or CNAME values. Vercel’s current setup guide explicitly says to inspect the domain for project-specific records: [Adding and configuring a custom domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain).
7. Preserve unrelated MX, TXT, CAA, or other records required by email and existing services.
8. Redeploy after domain/project settings are complete.
9. Verify HTTPS for both hostnames, a single-hop apex-to-www redirect, and representative canonical/OG/JSON-LD output.
10. Verify `https://www.zenoratv.vip/robots.txt` and `https://www.zenoratv.vip/sitemap.xml` from the deployed site.

No Vercel project was connected or changed during this task.

## 10. DNS requirements

- Use only the records Vercel displays for `zenoratv.vip` and `www.zenoratv.vip` in this specific project.
- If DNS is managed outside Vercel, enter those records at that provider and retain required non-web records.
- If Vercel requests a TXT ownership record, complete that verification before assuming the domain is attached.
- Do not create both-direction redirects or point `www` back to the apex.
- Check Vercel’s domain status and deployed HTTPS responses before declaring DNS propagation or certificate issuance complete.

No DNS record, propagation state, or SSL status was inspected or modified here.

## 11. Google Search Console checklist

1. Verify ownership of a `zenoratv.vip` Domain property or the required URL-prefix properties.
2. Inspect the deployed homepage and representative pricing, blog, article, and setup URLs.
3. Submit `https://www.zenoratv.vip/sitemap.xml` in the Sitemaps report.
4. Confirm that Google can fetch the sitemap and that indexable pages declare the `www` canonical.
5. If the owner controls and previously indexed `zenoraiptv.tv`, first activate direct old-to-new redirects and verify both properties, then use Search Console’s Change of Address tool. Google says to use that tool after the site has moved and redirects are active: [Change of Address documentation](https://support.google.com/webmasters/answer/9370220).
6. Do not use Change of Address merely for apex-to-www normalization; use it for the former-domain-to-new-domain move when the former property is controlled.
7. Monitor Pages/Indexing, Sitemaps, crawl errors, canonical selection, and Performance for both properties during migration.

No Search Console property was accessed or changed.

## 12. Test commands and actual results

| Command | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm run validate:guides` | Pass; 19 articles and 159 valid WebP references; existing 15-image aspirational gap unchanged |
| `npm run test:static` | Pass; canonical/redirect rules, 42 keyword-map URLs, 24 price combinations, and annual promotion |
| `npm run build` | Pass; 57/57 static pages generated |
| `npm run validate:links` against local `next start` | Pass; 42 indexable, 7 noindex, 1,739 internal links plus domain/robots/sitemap/social/JSON-LD checks |
| `npx playwright test tests/e2e/domain-migration.spec.ts --project=desktop` | 3/3 pass |
| `npx playwright test tests/e2e/pricing.spec.ts --project=desktop` | 4/4 pass; full matrix, promotion, checkout, and WhatsApp messages |

## 13. Remaining owner-dependent actions

- Configure and verify the two new domains, primary-domain rule, DNS records, deployment, and HTTPS in Vercel.
- Confirm whether the former domain is owned and currently deployed; configure old-to-new redirects only if control is verified.
- Complete Search Console verification, sitemap submission, and—if applicable—the former-domain Change of Address process.
- Monitor deployed redirect/canonical behavior and indexing after launch.

No commit, push, deployment, Vercel mutation, DNS mutation, or Search Console mutation was performed.
