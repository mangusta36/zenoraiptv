import { expect, test } from "@playwright/test";
import { guides } from "../../src/data/guides";
import { siteOrigin } from "../../src/config/site";

test("all 19 articles expose verified heading phrases and editorial links", async ({ page, request }) => {
  test.setTimeout(120_000);

  for (const guide of guides) {
    await page.goto(`/blog/${guide.slug}`, { waitUntil: "domcontentloaded" });
    const article = page.locator("article.article-body");
    await expect(article).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${siteOrigin}/blog/${guide.slug}`);

    const headings = (await article.locator(':scope > section[id^="s"] h2, :scope > section[id^="s"] h3').allTextContents())
      .map((heading) => heading.replace(/\s+/g, " ").trim().toLowerCase());
    for (const keyword of guide.headingKeywords) {
      expect(headings.some((heading) => heading.includes(keyword.toLowerCase())), `${guide.slug}: missing visible heading phrase “${keyword}”`).toBe(true);
    }

    const primaryAnchors = article.getByRole("link", { name: guide.keyword, exact: true });
    await expect(primaryAnchors).toHaveCount(2);
    await expect(primaryAnchors.nth(0)).toBeVisible();
    await expect(primaryAnchors.nth(1)).toBeVisible();
    await expect(primaryAnchors.nth(0)).toHaveAttribute("href", "/");
    await expect(primaryAnchors.nth(1)).toHaveAttribute("href", "/");
    const primaryParagraphs = await primaryAnchors.evaluateAll((anchors) => anchors.map((anchor) => anchor.closest("p")?.textContent?.replace(/\s+/g, " ").trim() ?? ""));
    expect(new Set(primaryParagraphs).size, `${guide.slug}: primary anchors must be in separate paragraphs`).toBe(2);

    const contextualAnchors = article.locator('a[href^="/blog/"]').filter({ visible: true }).filter({ hasNot: page.locator(".topic-journey a") });
    const contextual = article.locator('.article-contextual-guide a[href^="/blog/"]');
    await expect(contextual).toHaveCount(1);
    await expect(contextual).toBeVisible();
    expect(await contextual.getAttribute("href")).not.toBe(`/blog/${guide.slug}`);
    expect((await contextual.textContent())?.trim().length ?? 0).toBeGreaterThan(5);
    expect(await contextualAnchors.count()).toBeGreaterThan(0);
    const target = await contextual.getAttribute("href");
    expect(target).toBeTruthy();
    if (target) expect((await request.get(target)).ok(), `${guide.slug}: contextual target ${target} must resolve`).toBe(true);

    expect(await article.textContent()).not.toContain('<a href="');
    expect(await article.locator('.topic-journey a[href^="/blog/"]').count()).toBeGreaterThan(0);
    expect(await page.locator('.related a[href^="/blog/"]').count()).toBe(guide.related.length);
  }
});

test("representative primary and contextual links navigate on click", async ({ page }) => {
  await page.goto("/blog/what-is-iptv", { waitUntil: "domcontentloaded" });
  await page.locator("article.article-body .article-primary-keyword-link").first().getByRole("link", { name: "what is IPTV", exact: true }).click();
  await expect(page).toHaveURL("/");

  await page.goto("/blog/device-compatibility", { waitUntil: "domcontentloaded" });
  const contextual = page.locator("article.article-body .article-contextual-guide a");
  const target = await contextual.getAttribute("href");
  expect(target).toBeTruthy();
  await contextual.click();
  await expect(page).toHaveURL(target!);
});
