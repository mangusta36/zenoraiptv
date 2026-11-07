import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const route of ["/", "/pricing", "/blog", "/blog/what-is-iptv", "/contact", "/faq"]) test(`axe WCAG AA scan: ${route}`, async ({ page }) => {
  await page.goto(route, { waitUntil: "networkidle" });
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
});
