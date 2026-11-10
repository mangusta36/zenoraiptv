import { chromium } from "@playwright/test";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const baseURL = process.env.SEO_BASE_URL ?? "http://127.0.0.1:3000";
const { origin: productionOrigin } = JSON.parse(await readFile(new URL("../src/config/site.json", import.meta.url), "utf8"));
const staleProductionOrigins = ["https://zenoraiptv.tv", "https://www.zenoraiptv.tv", "https://zenoratv.vip"];
const explicitlyNoindex = [
  "/privacy-policy",
  "/terms",
  "/refund-policy",
  "/cookie-policy",
  "/checkout",
  "/order/status",
  "/order/success",
];
const errors = [];
const linkRecords = [];
const pageRecords = [];

const fail = (message) => errors.push(message);
const clean = (value = "") => value.replace(/\s+/g, " ").trim();
const csv = (value) => `"${String(value).replaceAll('"', '""')}"`;
const pathFromProductionUrl = (url) => {
  const parsed = new URL(url);
  return `${parsed.pathname === "/" ? "/" : parsed.pathname.replace(/\/$/, "")}${parsed.search}`;
};
const expectedCanonical = (path) => path === "/" ? productionOrigin : `${productionOrigin}${path}`;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ baseURL });
const page = await context.newPage();

try {
  const sitemapResponse = await context.request.get("/sitemap.xml");
  if (!sitemapResponse.ok()) throw new Error(`Sitemap returned ${sitemapResponse.status()}`);
  const sitemapXml = await sitemapResponse.text();
  const sitemapLocations = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  for (const location of sitemapLocations) {
    if (new URL(location).origin !== productionOrigin) fail(`Sitemap URL uses a non-canonical origin: ${location}.`);
  }
  if (staleProductionOrigins.some((origin) => sitemapXml.includes(origin))) fail("Sitemap contains a stale or non-www production origin.");
  const sitemapPaths = sitemapLocations.map(pathFromProductionUrl);
  const sitemapSet = new Set(sitemapPaths);
  if (sitemapSet.size !== sitemapPaths.length) fail("Sitemap contains duplicate URLs.");

  const robotsResponse = await context.request.get("/robots.txt");
  const robotsText = await robotsResponse.text();
  if (!robotsResponse.ok()) fail(`Robots returned ${robotsResponse.status()}.`);
  if (!robotsText.includes(`Sitemap: ${productionOrigin}/sitemap.xml`)) fail("Robots sitemap reference does not use the canonical www origin.");
  if (staleProductionOrigins.some((origin) => robotsText.includes(origin))) fail("Robots contains a stale or non-www production origin.");

  const routes = [...sitemapPaths, ...explicitlyNoindex.filter((path) => !sitemapSet.has(path))];
  const routePathSet = new Set(routes.map((route) => new URL(route, productionOrigin).pathname));

  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded", timeout: 15_000 });
    const status = response?.status() ?? 0;
    if (status < 200 || status >= 400) fail(`${route} returned HTTP ${status || "unknown"}.`);
    // Client components such as checkout can attach their rendered heading just
    // after DOMContentLoaded. Validate the rendered DOM, not only the HTML shell.
    await page.locator("h1").first().waitFor({ state: "attached", timeout: 3_000 }).catch(() => {});

    const record = await page.evaluate(() => {
      const content = (selector) => document.querySelector(selector)?.getAttribute("content") ?? "";
      return {
        title: document.title.trim(),
        description: content('meta[name="description"]'),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
        robots: content('meta[name="robots"]'),
        ogTitle: content('meta[property="og:title"]'),
        ogDescription: content('meta[property="og:description"]'),
        ogUrl: content('meta[property="og:url"]'),
        ogImage: content('meta[property="og:image"]'),
        twitterCard: content('meta[name="twitter:card"]'),
        twitterImage: content('meta[name="twitter:image"]'),
        jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => script.textContent ?? "").join("\n"),
        h1Count: document.querySelectorAll("h1").length,
      };
    });
    const indexable = sitemapSet.has(route);
    pageRecords.push({ route, status, indexable, ...record });

    if (!record.title) fail(`${route} has no rendered title.`);
    if (!record.description) fail(`${route} has no meta description.`);
    if (record.h1Count !== 1) fail(`${route} renders ${record.h1Count} H1 elements; expected exactly one.`);
    if (!record.ogTitle || !record.ogDescription || !record.twitterCard) fail(`${route} has incomplete Open Graph or Twitter metadata.`);
    if (indexable) {
      if (record.robots.includes("noindex")) fail(`${route} is in the sitemap but renders noindex.`);
      if (record.canonical !== expectedCanonical(route)) fail(`${route} canonical is ${record.canonical || "missing"}; expected ${expectedCanonical(route)}.`);
      if (record.ogUrl !== expectedCanonical(route)) fail(`${route} Open Graph URL is ${record.ogUrl || "missing"}; expected ${expectedCanonical(route)}.`);
      if (!record.ogImage.startsWith(`${productionOrigin}/`)) fail(`${route} Open Graph image is not on the canonical origin: ${record.ogImage || "missing"}.`);
      if (!record.twitterImage.startsWith(`${productionOrigin}/`)) fail(`${route} Twitter image is not on the canonical origin: ${record.twitterImage || "missing"}.`);
    } else if (!record.robots.includes("noindex")) {
      fail(`${route} should be noindex but renders robots=${record.robots || "missing"}.`);
    }
    if (!record.jsonLd.includes(productionOrigin)) fail(`${route} structured data does not contain the canonical origin.`);
    if (staleProductionOrigins.some((origin) => record.jsonLd.includes(origin))) fail(`${route} structured data contains a stale or non-www production origin.`);

    const links = await page.locator("a[href]").evaluateAll((anchors) => anchors.map((anchor) => {
      const element = anchor;
      const context = element.closest(".topic-journey")
        ? "topic-journey"
        : element.closest("article.article-body")
          ? "article-body"
          : element.closest("header") || element.closest("#mobile-navigation")
            ? "navigation"
            : element.closest("footer")
              ? "footer"
              : element.closest(".related")
                ? "related-content"
                : "page-content";
      return {
        href: element.href,
        anchor: (element.textContent ?? "").replace(/\s+/g, " ").trim(),
        context,
        rel: element.getAttribute("rel") ?? "",
      };
    }));

    for (const link of links) {
      const target = new URL(link.href);
      if (target.origin !== new URL(baseURL).origin) continue;
      const destination = `${target.pathname}${target.search}`;
      if (link.rel.split(/\s+/).includes("nofollow")) fail(`${route} has an internal nofollow link to ${destination}.`);
      if (["click here", "read more", "learn more"].includes(link.anchor.toLowerCase())) fail(`${route} uses generic anchor text “${link.anchor}” for ${destination}.`);
      // The canonical audit dataset intentionally uses indexable source pages only.
      // Noindex routes are still crawled and validated above, but including their
      // navigation/footer links would make the report scope ambiguous.
      if (indexable) linkRecords.push({ source: route, destination, anchor: link.anchor || "[no visible text]", context: link.context, rel: link.rel || "follow" });
    }

    if (route.startsWith("/blog/")) {
      const articleResult = await page.locator("article.article-body").evaluate((article) => ({
        brandLinks: [...article.querySelectorAll('a[href="/"]')].filter((link) => link.textContent?.trim() === "Zenora IPTV").length,
        contextualLinks: article.querySelectorAll('section[id^="s"] a[href^="/"]').length,
        escapedLinks: article.textContent?.includes('<a href="') ?? false,
      }));
      if (articleResult.brandLinks !== 1) fail(`${route} has ${articleResult.brandLinks} exact Zenora IPTV body links; expected one.`);
      if (articleResult.contextualLinks < 2) fail(`${route} has only ${articleResult.contextualLinks} contextual section links; expected at least two.`);
      if (articleResult.escapedLinks) fail(`${route} renders escaped anchor markup in editorial text.`);
    }
  }

  const unique = (items, field) => {
    const seen = new Map();
    for (const item of items) {
      const value = clean(item[field]);
      if (!value) continue;
      seen.set(value, [...(seen.get(value) ?? []), item.route]);
    }
    for (const [value, routes] of seen) if (routes.length > 1) fail(`Duplicate ${field} on ${routes.join(", ")}: ${value}`);
  };
  const indexableRecords = pageRecords.filter((record) => record.indexable);
  unique(indexableRecords, "title");
  unique(indexableRecords, "description");

  const targets = [...new Set(linkRecords.map((record) => record.destination))];
  for (const target of targets) {
    const pathname = new URL(target, productionOrigin).pathname;
    if (!routePathSet.has(pathname)) fail(`Internal link points outside the route inventory: ${target}.`);
    const response = await context.request.get(target, { maxRedirects: 0 });
    if (response.status() >= 400) fail(`Internal link target ${target} returned HTTP ${response.status()}.`);
  }

  const incoming = new Map();
  for (const link of linkRecords) {
    const destinationPath = new URL(link.destination, productionOrigin).pathname;
    if (link.source !== destinationPath) incoming.set(destinationPath, (incoming.get(destinationPath) ?? 0) + 1);
  }
  for (const route of sitemapPaths) {
    const pathname = new URL(route, productionOrigin).pathname;
    if (pathname !== "/" && !incoming.get(pathname)) fail(`Indexable route ${pathname} has no incoming internal link.`);
  }

  await mkdir(resolve("docs/audits/results"), { recursive: true });
  const pageHeaders = ["route", "status", "indexable", "title", "description", "canonical", "robots", "h1_count"];
  const pageRows = pageRecords.map((record) => [record.route, record.status, record.indexable, record.title, record.description, record.canonical, record.robots, record.h1Count]);
  await writeFile(resolve("docs/audits/results/seo-route-inventory.csv"), `${pageHeaders.join(",")}\n${pageRows.map((row) => row.map(csv).join(",")).join("\n")}\n`);

  const linkHeaders = ["source_url", "destination_url", "anchor_text", "link_context", "relationship_type"];
  const dedupedLinks = [...new Map(linkRecords.map((record) => [`${record.source}\0${record.destination}\0${record.anchor}\0${record.context}`, record])).values()]
    .sort((a, b) => `${a.source}|${a.destination}|${a.anchor}|${a.context}|${a.rel}`.localeCompare(`${b.source}|${b.destination}|${b.anchor}|${b.context}|${b.rel}`));
  const linkCsv = `${linkHeaders.join(",")}\n${dedupedLinks.map((record) => [record.source, record.destination, record.anchor, record.context, record.rel].map(csv).join(",")).join("\n")}\n`;
  await writeFile(resolve("docs/audits/ZENORA-INTERNAL-LINK-AUDIT.csv"), linkCsv);

  const contextCounts = Object.fromEntries([...new Set(dedupedLinks.map((record) => record.context))].sort().map((name) => [name, dedupedLinks.filter((record) => record.context === name).length]));
  const contextTotal = Object.values(contextCounts).reduce((sum, count) => sum + count, 0);
  if (contextTotal !== dedupedLinks.length) fail(`Link context total ${contextTotal} does not match dataset total ${dedupedLinks.length}.`);
  const csvSha256 = createHash("sha256").update(linkCsv).digest("hex");
  const summary = `# Zenora Internal Link Audit Summary

This summary and \`ZENORA-INTERNAL-LINK-AUDIT.csv\` are generated in the same run by \`scripts/validate-internal-links.mjs\`. The canonical dataset contains deduplicated, rendered internal links whose source is one of the ${sitemapPaths.length} indexable sitemap routes. The ${explicitlyNoindex.length} noindex routes are validated but excluded as link sources.

## Canonical dataset

- Indexable source routes: ${sitemapPaths.length}
- Unique rendered internal links: ${dedupedLinks.length}
- CSV SHA-256: \`${csvSha256}\`

## Link contexts

| Context | Links |
| --- | ---: |
${Object.entries(contextCounts).map(([name, count]) => `| ${name} | ${count} |`).join("\n")}
| **Total** | **${contextTotal}** |

## Reproduction

Run \`npm run validate:links\` against a production build. The output is deterministic for an unchanged rendered site: route scope, context classification, deduplication key, and sort order are fixed in the generator.
`;
  await writeFile(resolve("docs/audits/ZENORA-INTERNAL-LINK-SUMMARY.md"), summary);
  if (errors.length) {
    console.error(errors.map((error) => `FAIL: ${error}`).join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`SEO link validation passed: ${sitemapPaths.length} indexable routes, ${explicitlyNoindex.length} noindex routes, ${dedupedLinks.length} unique rendered internal links.`);
    console.log(`Link contexts: ${Object.entries(contextCounts).map(([name, count]) => `${name}=${count}`).join(", ")}.`);
  }
} finally {
  await browser.close();
}
