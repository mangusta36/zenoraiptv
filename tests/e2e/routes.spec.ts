import { expect, test } from "@playwright/test";

const staticRoutes = ["/", "/pricing", "/features", "/channels", "/devices", "/setup", "/setup/android", "/setup/apple-tv", "/setup/firestick", "/setup/ios", "/setup/mac", "/setup/mag", "/setup/smart-tv", "/setup/windows", "/blog", "/faq", "/contact", "/trial", "/checkout", "/order/status", "/order/success", "/renew", "/support", "/about", "/privacy-policy", "/terms", "/refund-policy", "/cookie-policy", "/how-it-works", "/troubleshooting"];
const guides = ["what-is-iptv", "m3u-playlists-explained", "device-compatibility", "fire-tv-setup-checklist", "iptv-troubleshooting", "improve-streaming-quality", "iptv-security-privacy", "choosing-an-iptv-subscription", "what-is-an-iptv-player", "android-tv-google-tv-iptv", "iptv-buffering-causes", "ethernet-vs-wifi-streaming", "samsung-smart-tv-iptv", "apple-tv-iptv-compatibility", "iptv-epg-not-working", "m3u-playlist-not-loading", "iptv-black-screen-no-sound", "fire-tv-vs-android-tv", "iptv-login-authentication-errors"];
const routes = [...staticRoutes, ...guides.map((slug) => `/blog/${slug}`)];

for (const route of routes) test(`renders without overflow or broken images: ${route}`, async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto(route, { waitUntil: "domcontentloaded" });
  expect(response?.status()).toBeLessThan(400);
  await expect(page.locator("#main-content")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
  expect(errors).toEqual([]);
  const broken = await page.locator("img").evaluateAll((images) => images.filter((image) => {
    const bitmap = image as HTMLImageElement;
    const box = image.getBoundingClientRect();
    return box.top < window.innerHeight && box.bottom > 0 && (!bitmap.complete || bitmap.naturalWidth === 0);
  }).map((image) => (image as HTMLImageElement).currentSrc || (image as HTMLImageElement).src));
  expect(broken).toEqual([]);
});

test("navigation, mobile menu, pricing, FAQs, forms and 404 behave safely", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  if (testInfo.project.name.startsWith("mobile")) {
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.locator("#mobile-navigation")).toHaveClass(/open/);
    await page.getByRole("button", { name: /close menu/i }).click();
  }
  await page.goto("/pricing");
  await page.getByRole("button", { name: "2 Devices" }).click();
  await expect(page.getByText("$114").first()).toBeVisible();
  await page.goto("/faq");
  const first = page.locator("details").first(); await first.locator("summary").click(); await expect(first).toHaveAttribute("open", "");
  await page.goto("/contact"); await page.getByRole("button", { name: /send message/i }).click(); await expect(page.locator("input:invalid").first()).toBeVisible();
  await page.goto("/definitely-not-a-route"); await expect(page.getByRole("heading", { name: /isn’t on the guide/i })).toBeVisible();
});

test("topic hubs route readers to the relevant editorial paths", async ({ page }) => {
  await page.goto("/blog", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Choose the question before the fix." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Safety, privacy, and subscription evaluation/i })).toHaveAttribute("href", "/blog?category=safety");
  await page.goto("/troubleshooting", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Start with the symptom, not a random fix." })).toBeVisible();
  const buffering = page.getByRole("link", { name: /Playback pauses or quality changes/i });
  await buffering.focus();
  await expect(buffering).toBeFocused();
  await expect(buffering).toHaveAttribute("href", "/blog/iptv-buffering-causes");
});
