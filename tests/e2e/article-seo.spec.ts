import { expect, test } from "@playwright/test";

const guides = ["what-is-iptv", "m3u-playlists-explained", "device-compatibility", "fire-tv-setup-checklist", "iptv-troubleshooting", "improve-streaming-quality", "iptv-security-privacy", "choosing-an-iptv-subscription", "what-is-an-iptv-player", "android-tv-google-tv-iptv", "iptv-buffering-causes", "ethernet-vs-wifi-streaming", "samsung-smart-tv-iptv", "apple-tv-iptv-compatibility", "iptv-epg-not-working", "m3u-playlist-not-loading", "iptv-black-screen-no-sound", "fire-tv-vs-android-tv", "iptv-login-authentication-errors"];

for (const slug of guides) {
  test(`article body has the Zenora IPTV homepage link: ${slug}`, async ({ page }) => {
    await page.goto(`/blog/${slug}`, { waitUntil: "domcontentloaded" });
    const link = page.locator("article.article-body").getByRole("link", { name: "Zenora IPTV", exact: true });
    await expect(link).toHaveAttribute("href", "/");
    await expect(link).toBeVisible();
    await link.focus();
    await expect(link).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/$/);
  });
}

test("article topical paths expose focused next steps without replacing the brand link", async ({ page }) => {
  await page.goto("/blog/iptv-buffering-causes", { waitUntil: "domcontentloaded" });
  const journey = page.getByRole("complementary", { name: "Editorial learning path" });
  await expect(journey.getByRole("heading", { name: "Use this guide in the right order." })).toBeVisible();
  await expect(journey.getByRole("link", { name: /Next: Ethernet vs. Wi-Fi/i })).toHaveAttribute("href", "/blog/ethernet-vs-wifi-streaming");
  await expect(page.locator("article.article-body").getByRole("link", { name: "Zenora IPTV", exact: true })).toHaveAttribute("href", "/");
});

test("What Is IPTV renders its two source-backed delivery findings", async ({ page }) => {
  await page.goto("/blog/what-is-iptv", { waitUntil: "domcontentloaded" });
  const callout = page.getByRole("heading", { name: "Verified delivery details" });
  await expect(callout).toBeVisible();
  await expect(page.getByRole("link", { name: "Apple: HTTP Live Streaming" }).first()).toHaveAttribute("href", "https://developer.apple.com/documentation/http-live-streaming");
  await expect(page.getByRole("link", { name: "IETF: RFC 8216" }).first()).toHaveAttribute("href", "https://datatracker.ietf.org/doc/html/rfc8216");
});

test("M3U guide renders its two source-backed delivery findings", async ({ page }) => {
  await page.goto("/blog/m3u-playlists-explained", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Verified delivery details" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Apple: HTTP Live Streaming" }).first()).toHaveAttribute("href", "https://developer.apple.com/documentation/http-live-streaming");
  await expect(page.getByRole("link", { name: "IETF: RFC 8216" }).first()).toHaveAttribute("href", "https://datatracker.ietf.org/doc/html/rfc8216");
});

test("Device compatibility guide renders its two source-backed TV findings", async ({ page }) => {
  await page.goto("/blog/device-compatibility", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Verified delivery details" })).toBeVisible();
  const sources = page.getByRole("link", { name: "Android Developers: TV app quality" });
  await expect(sources).toHaveCount(2);
  await expect(sources.first()).toHaveAttribute("href", "https://developer.android.com/docs/quality-guidelines/tv-app-quality");
  await expect(page.getByText("Can I rely on a phone app listing for my Android TV or Google TV?", { exact: true })).toBeVisible();
});

test("Fire TV guide renders its two source-backed platform findings", async ({ page }) => {
  await page.goto("/blog/fire-tv-setup-checklist", { waitUntil: "domcontentloaded" });
  const callout = page.locator(".article-research");
  await expect(callout.getByRole("heading", { name: "Verified delivery details" })).toBeVisible();
  await expect(callout.getByRole("link", { name: "Amazon: Fire OS Overview" })).toHaveAttribute("href", "https://developer.amazon.com/docs/fire-tv/fire-os-overview.html");
  await expect(callout.getByRole("link", { name: "Amazon: Get Started with Fire TV" })).toHaveAttribute("href", "https://developer.amazon.com/docs/fire-tv/get-started-with-fire-tv.html");
});

test("Troubleshooting guide renders its two source-backed diagnostic findings", async ({ page }) => {
  await page.goto("/blog/iptv-troubleshooting", { waitUntil: "domcontentloaded" });
  const callout = page.locator(".article-research");
  await expect(callout.getByRole("heading", { name: "Verified delivery details" })).toBeVisible();
  await expect(callout.getByRole("link", { name: "Apple: HTTP Live Streaming" })).toHaveAttribute("href", "https://developer.apple.com/documentation/http-live-streaming");
  await expect(callout.getByRole("link", { name: "IETF: RFC 8216" })).toHaveAttribute("href", "https://datatracker.ietf.org/doc/html/rfc8216");
});

test("Streaming-quality guide renders its two source-backed performance findings", async ({ page }) => {
  await page.goto("/blog/improve-streaming-quality", { waitUntil: "domcontentloaded" });
  const callout = page.locator(".article-research");
  await expect(callout.getByRole("link", { name: "Apple: HTTP Live Streaming" })).toHaveAttribute("href", "https://developer.apple.com/streaming/");
  await expect(callout.getByRole("link", { name: "MDN: MediaCapabilities" })).toHaveAttribute("href", "https://developer.mozilla.org/en-US/docs/Web/API/MediaCapabilities");
});

test("Security guide renders its two source-backed security findings", async ({ page }) => {
  await page.goto("/blog/iptv-security-privacy", { waitUntil: "domcontentloaded" });
  const callout = page.locator(".article-research");
  await expect(callout.getByRole("link", { name: "CISA: IAM recommended practices" })).toHaveAttribute("href", /cisa\.gov/);
  await expect(callout.getByRole("link", { name: "CISA: Protecting your digital home" })).toHaveAttribute("href", /cisa\.gov/);
});

test("Subscription guide renders its two source-backed consumer findings", async ({ page }) => {
  await page.goto("/blog/choosing-an-iptv-subscription", { waitUntil: "domcontentloaded" });
  const callout = page.locator(".article-research");
  const sources = callout.getByRole("link", { name: "FTC: free trials and auto-renewals" });
  await expect(sources).toHaveCount(2);
  await expect(sources.first()).toHaveAttribute("href", "https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions");
});

test("Player guide renders its two source-backed platform findings", async ({ page }) => {
  await page.goto("/blog/what-is-an-iptv-player", { waitUntil: "domcontentloaded" });
  const callout = page.locator(".article-research");
  await expect(callout.getByRole("link", { name: "Apple: HTTP Live Streaming" })).toHaveAttribute("href", "https://developer.apple.com/streaming/");
  await expect(callout.getByRole("link", { name: "Android Developers: TV app quality" })).toHaveAttribute("href", "https://developer.android.com/docs/quality-guidelines/tv-app-quality");
});

test("Android TV guide renders its two source-backed TV findings", async ({ page }) => {
  await page.goto("/blog/android-tv-google-tv-iptv", { waitUntil: "domcontentloaded" });
  const callout = page.locator(".article-research");
  const sources = callout.getByRole("link", { name: "Android Developers: TV app quality" });
  await expect(sources).toHaveCount(2);
  await expect(sources.first()).toHaveAttribute("href", "https://developer.android.com/docs/quality-guidelines/tv-app-quality");
});

test("Buffering guide renders its two source-backed diagnostic findings", async ({ page }) => {
  await page.goto("/blog/iptv-buffering-causes", { waitUntil: "domcontentloaded" });
  const callout = page.locator(".article-research");
  await expect(callout.getByRole("link", { name: "Apple: HTTP Live Streaming" })).toHaveAttribute("href", "https://developer.apple.com/streaming/");
  await expect(callout.getByRole("link", { name: "MDN: MediaCapabilities" })).toHaveAttribute("href", "https://developer.mozilla.org/en-US/docs/Web/API/MediaCapabilities");
});

test("Ethernet guide renders its two source-backed local-network findings", async ({ page }) => {
  await page.goto("/blog/ethernet-vs-wifi-streaming", { waitUntil: "domcontentloaded" });
  const callout = page.locator(".article-research");
  await expect(callout.getByRole("link", { name: "Ofcom: improving your Wi-Fi experience" })).toHaveAttribute("href", /ofcom\.org\.uk/);
  await expect(callout.getByRole("link", { name: "Ofcom: choosing a broadband provider" })).toHaveAttribute("href", /ofcom\.org\.uk/);
});

test("Samsung guide renders its two source-backed platform findings", async ({ page }) => {
  await page.goto("/blog/samsung-smart-tv-iptv", { waitUntil: "domcontentloaded" });
  const sources = page.locator(".article-research").getByRole("link", { name: "Samsung: app troubleshooting" });
  await expect(sources).toHaveCount(2);
  await expect(sources.first()).toHaveAttribute("href", "https://www.samsung.com/us/support/troubleshoot/TSG10000062/");
});

for (const [slug, firstSource, secondSource] of [
  ["apple-tv-iptv-compatibility", "Apple Support: compatible device setup", "Apple Support: compatible device setup"],
  ["iptv-epg-not-working", "XMLTV: file format", "XMLTV: published DTD"],
  ["m3u-playlist-not-loading", "IETF: RFC 8216", "Apple: HTTP Live Streaming"],
  ["iptv-black-screen-no-sound", "MDN: MediaCapabilities", "Apple: HTTP Live Streaming"],
  ["fire-tv-vs-android-tv", "Amazon: Fire OS Overview", "Android Developers: TV app quality"],
  ["iptv-login-authentication-errors", "IETF: RFC 9110", "CISA: IAM recommended practices"],
] as const) {
  test(`${slug} renders its two source-backed findings`, async ({ page }) => {
    await page.goto(`/blog/${slug}`, { waitUntil: "domcontentloaded" });
    const callout = page.locator(".article-research");
    const first = callout.getByRole("link", { name: firstSource });
    if (firstSource === secondSource) {
      await expect(first).toHaveCount(2);
      await expect(first.first()).toBeVisible();
      await expect(first.nth(1)).toBeVisible();
    } else {
      await expect(first).toHaveCount(1);
      await expect(first).toBeVisible();
      await expect(callout.getByRole("link", { name: secondSource })).toHaveCount(1);
      await expect(callout.getByRole("link", { name: secondSource })).toBeVisible();
    }
  });
}
