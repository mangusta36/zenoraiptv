import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  timeout: 30_000,
  expect: { timeout: 8_000 },
  workers: 1,
  fullyParallel: false,
  retries: 0,
  reporter: [["list"], ["json", { outputFile: "docs/audits/results/browser/playwright-results.json" }]],
  use: { baseURL: "http://127.0.0.1:3010", trace: "retain-on-failure", screenshot: "only-on-failure", video: "off" },
  projects: [
    { name: "mobile-small", use: { browserName: "chromium", viewport: { width: 375, height: 844 }, isMobile: true } },
    { name: "mobile-standard", use: { browserName: "chromium", viewport: { width: 390, height: 844 }, isMobile: true } },
    { name: "tablet", use: { browserName: "chromium", viewport: { width: 768, height: 1024 }, isMobile: true } },
    { name: "desktop", use: { browserName: "chromium", viewport: { width: 1440, height: 900 } } },
  ],
  webServer: { command: "npm run start -- --hostname 127.0.0.1 --port 3010", url: "http://127.0.0.1:3010", timeout: 30_000, reuseExistingServer: false },
  outputDir: "docs/audits/results/browser/artifacts",
});
