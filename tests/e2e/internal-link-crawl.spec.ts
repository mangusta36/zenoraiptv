import { expect, test } from "@playwright/test";

const publicRoutes = ["/", "/pricing", "/channels", "/features", "/devices", "/how-it-works", "/trial", "/faq", "/contact", "/about", "/setup", "/troubleshooting", "/renew", "/support", "/blog"];
const noindexPublicRoutes = ["/privacy-policy", "/terms", "/refund-policy", "/cookie-policy"];
const setupRoutes = ["android", "apple-tv", "firestick", "ios", "mac", "mag", "smart-tv", "windows"].map((slug) => `/setup/${slug}`);
const guideSlugs = ["what-is-iptv", "m3u-playlists-explained", "device-compatibility", "fire-tv-setup-checklist", "iptv-troubleshooting", "improve-streaming-quality", "iptv-security-privacy", "choosing-an-iptv-subscription", "what-is-an-iptv-player", "android-tv-google-tv-iptv", "iptv-buffering-causes", "ethernet-vs-wifi-streaming", "samsung-smart-tv-iptv", "apple-tv-iptv-compatibility", "iptv-epg-not-working", "m3u-playlist-not-loading", "iptv-black-screen-no-sound", "fire-tv-vs-android-tv", "iptv-login-authentication-errors"];
const crawlRoutes = [...publicRoutes, ...setupRoutes, ...guideSlugs.map((slug) => `/blog/${slug}`)];
const validPaths = new Set([...crawlRoutes, ...noindexPublicRoutes, "/checkout", "/order/status", "/order/success"]);

type LinkRecord = { source: string; destination: string; anchor: string; context: string; relation: string };

test("crawls every indexable route and records validated rendered internal links", async ({ page, baseURL }) => {
  test.setTimeout(120_000);
  const records: LinkRecord[] = [];
  const unexpectedDestinations = new Set<string>();
  const renderFailures: string[] = [];

  for (const route of crawlRoutes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded", timeout: 10_000 });
    if (!response || response.status() >= 400) renderFailures.push(`${route} returned ${response?.status() ?? "no response"}`);
    const links = await page.locator("a[href]").evaluateAll((anchors) => anchors.map((anchor) => {
      const element = anchor as HTMLAnchorElement;
      const context = element.closest(".topic-journey") ? "topic-journey" : element.closest("article.article-body") ? "article-body" : element.closest("header") || element.closest("#mobile-navigation") ? "navigation" : element.closest("footer") ? "footer" : element.closest(".related") ? "related-content" : "page-content";
      return { href: element.href, anchor: (element.textContent || "").replace(/\s+/g, " ").trim(), context, relation: element.getAttribute("rel") || "contextual" };
    }));
    for (const link of links) {
      const target = new URL(link.href);
      if (target.origin !== baseURL) continue;
      const destination = `${target.pathname}${target.search}`;
      if (!validPaths.has(target.pathname) && !(target.pathname === "/blog" && /^\?category=(fundamentals|setup|performance|safety)$/.test(target.search))) unexpectedDestinations.add(destination);
      records.push({ source: route, destination, anchor: link.anchor || "[no visible text]", context: link.context, relation: link.relation });
    }
  }

  const deduped = [...new Map(records.map((record) => [`${record.source}\u0000${record.destination}\u0000${record.anchor}\u0000${record.context}`, record])).values()]
    .sort((a, b) => `${a.source}|${a.destination}|${a.anchor}`.localeCompare(`${b.source}|${b.destination}|${b.anchor}`));
  expect(crawlRoutes).toHaveLength(42);
  expect(renderFailures).toEqual([]);
  expect(unexpectedDestinations).toEqual(new Set());
  expect(deduped.length).toBeGreaterThan(150);
});

test("every article renders contextual body links without escaped anchor markup", async ({ page }) => {
  for (const slug of guideSlugs) {
    await page.goto(`/blog/${slug}`, { waitUntil: "domcontentloaded" });
    const body = page.locator("article.article-body");
    await expect(body.getByRole("link", { name: "Zenora IPTV", exact: true })).toHaveCount(1);
    expect(await body.locator('section[id^="s"] a[href^="/"]').count()).toBeGreaterThanOrEqual(2);
    expect(await body.textContent()).not.toContain('<a href="');
  }
});
