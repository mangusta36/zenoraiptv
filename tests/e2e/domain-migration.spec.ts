import { expect, test } from "@playwright/test";

const canonicalOrigin = "https://www.zenoratv.vip";
const representativeRoutes = ["/", "/pricing", "/blog", "/blog/what-is-iptv", "/setup/firestick"];

test("representative routes emit only the canonical www production origin", async ({ page }) => {
  for (const route of representativeRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const expected = route === "/" ? canonicalOrigin : `${canonicalOrigin}${route}`;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", expected);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", expected);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", new RegExp(`^${canonicalOrigin.replaceAll(".", "\\.")}\/`));
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", new RegExp(`^${canonicalOrigin.replaceAll(".", "\\.")}\/`));
    const structuredData = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(structuredData.join("\n")).toContain(canonicalOrigin);
    expect(structuredData.join("\n")).not.toContain("zenoraiptv.tv");
    expect(structuredData.join("\n")).not.toContain("https://zenoratv.vip");
  }
});

test("sitemap and robots use the canonical www origin", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  expect(locations).toHaveLength(42);
  expect(locations.every((location) => new URL(location).origin === canonicalOrigin)).toBeTruthy();
  expect(sitemap).not.toContain("zenoraiptv.tv");
  expect(sitemap).not.toContain("https://zenoratv.vip");

  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain(`Sitemap: ${canonicalOrigin}/sitemap.xml`);
});

test("apex host permanently redirects to www without looping", async ({ request }) => {
  const response = await request.get("/pricing?connections=2", {
    headers: { host: "zenoratv.vip" },
    maxRedirects: 0,
  });
  expect([301, 308]).toContain(response.status());
  expect(response.headers().location).toBe(`${canonicalOrigin}/pricing?connections=2`);

  const wwwResponse = await request.get("/pricing", {
    headers: { host: "www.zenoratv.vip" },
    maxRedirects: 0,
  });
  expect(wwwResponse.status()).toBe(200);
});
