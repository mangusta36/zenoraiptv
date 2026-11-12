# Zenora Internal Link Audit Summary

This summary and `ZENORA-INTERNAL-LINK-AUDIT.csv` are generated in the same run by `scripts/validate-internal-links.mjs`. The canonical dataset contains deduplicated, rendered internal links whose source is one of the 42 indexable sitemap routes. The 7 noindex routes are validated but excluded as link sources.

## Canonical dataset

- Indexable source routes: 42
- Unique rendered internal links: 1777
- CSV SHA-256: `5598a2ff6b2f777dce41d08d3ca1f0458ae8bb1bf599c05a15d0c86cb094a4d4`

## Link contexts

| Context | Links |
| --- | ---: |
| article-body | 139 |
| footer | 630 |
| navigation | 420 |
| page-content | 443 |
| related-content | 74 |
| topic-journey | 71 |
| **Total** | **1777** |

## Reproduction

Run `npm run validate:links` against a production build. The output is deterministic for an unchanged rendered site: route scope, context classification, deduplication key, and sort order are fixed in the generator.
