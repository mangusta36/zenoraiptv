import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const productionOrigin = JSON.parse(await readFile(resolve(root, "src/config/site.json"), "utf8")).origin;
const providedBaseURL = process.env.IMAGE_ALT_BASE_URL;
const port = process.env.IMAGE_ALT_PORT ?? "3012";
const baseURL = providedBaseURL ?? `http://127.0.0.1:${port}`;
const noindexRoutes = [
  "/privacy-policy",
  "/terms",
  "/refund-policy",
  "/cookie-policy",
  "/checkout",
  "/order/status",
  "/order/success",
];
const genericAltPattern = /^(?:image|photo|picture|iptv image|placeholder)$/i;
const errors = [];
const decorativeImages = [];
let renderedImageCount = 0;
let serverImageCount = 0;
let server;
let browser;

const clean = (value = "") => value.replace(/\s+/g, " ").trim();
const fail = (route, source, problem) => errors.push({ route, source: source || "[unknown source]", problem });
const sourceFromTag = (tag) => tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1] ?? "[unknown source]";
const filenameWords = (source) => {
  const raw = new URL(source, productionOrigin);
  const original = raw.pathname === "/_next/image" ? raw.searchParams.get("url") ?? raw.pathname : raw.pathname;
  return original.split("/").pop()?.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").toLowerCase() ?? "";
};

async function waitForServer() {
  let lastError;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`${baseURL}/sitemap.xml`);
      if (response.ok) return;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 500));
  }
  throw new Error(`Production server did not become ready at ${baseURL}: ${lastError?.message ?? "unknown error"}`);
}

if (!providedBaseURL) {
  if (!existsSync(resolve(root, ".next/BUILD_ID"))) {
    throw new Error("No production build found. Run `npm run build` before `npm run verify:image-alt`.");
  }
  server = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", port], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let serverLog = "";
  server.stdout.on("data", (chunk) => { serverLog += chunk.toString(); });
  server.stderr.on("data", (chunk) => { serverLog += chunk.toString(); });
  server.on("exit", (code) => {
    if (code && !process.exitCode) console.error(`Production server exited with ${code}.\n${serverLog}`);
  });
}

try {
  await waitForServer();
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ baseURL });
  const page = await context.newPage();
  const sitemapResponse = await context.request.get("/sitemap.xml");
  if (!sitemapResponse.ok()) throw new Error(`Sitemap returned HTTP ${sitemapResponse.status()}.`);
  const sitemap = await sitemapResponse.text();
  const indexableRoutes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const routes = [...indexableRoutes, ...noindexRoutes.filter((route) => !indexableRoutes.includes(route))];

  if (indexableRoutes.length !== 42) errors.push({ route: "/sitemap.xml", source: "[route inventory]", problem: `expected 42 indexable routes, found ${indexableRoutes.length}` });

  for (const route of routes) {
    let rawHtml = "";
    try {
      const response = await context.request.get(route);
      if (!response.ok()) {
        fail(route, "[route]", `server HTML request returned HTTP ${response.status()}`);
      } else {
        rawHtml = await response.text();
        const serverImages = rawHtml.match(/<img\b[^>]*>/gi) ?? [];
        serverImageCount += serverImages.length;
        for (const imageTag of serverImages) {
          if (!/\balt\s*=\s*["'][^"']*["']/i.test(imageTag)) fail(route, sourceFromTag(imageTag), "server-rendered image has no alt attribute");
        }
      }
    } catch (error) {
      fail(route, "[route]", `server HTML request failed: ${error.message}`);
    }

    try {
      const response = await page.goto(route, { waitUntil: "domcontentloaded", timeout: 20_000 });
      if (!response?.ok()) fail(route, "[route]", `browser navigation returned HTTP ${response?.status() ?? "unknown"}`);
      const images = await page.locator("img").evaluateAll((nodes) => nodes.map((node) => {
        const image = node;
        const link = image.closest("a");
        const linkText = (link?.textContent ?? "").replace(/\s+/g, " ").trim();
        return {
          source: image.getAttribute("src") ?? image.currentSrc,
          hasAlt: image.hasAttribute("alt"),
          alt: image.getAttribute("alt"),
          linked: Boolean(link),
          linkName: (link?.getAttribute("aria-label") ?? link?.getAttribute("title") ?? linkText).trim(),
          role: image.getAttribute("role") ?? "",
          ariaHidden: image.getAttribute("aria-hidden") ?? "",
          explicitDecorative: image.getAttribute("data-decorative") === "true",
        };
      }));

      renderedImageCount += images.length;
      for (const image of images) {
        if (!image.hasAlt || image.alt === null) {
          fail(route, image.source, "browser-rendered image has no alt attribute");
          continue;
        }
        const alt = clean(image.alt);
        if (!alt) {
          if (image.linked && !image.linkName) fail(route, image.source, "linked image has empty alt text and its link has no accessible name");
          else decorativeImages.push({ route, source: image.source, explicit: image.explicitDecorative || image.role === "presentation" || image.ariaHidden === "true" });
          continue;
        }
        if (genericAltPattern.test(alt)) fail(route, image.source, `generic alt text: “${alt}”`);
        if (clean(filenameWords(image.source)) === alt.toLowerCase()) fail(route, image.source, `filename-based alt text: “${alt}”`);
        if ((alt.match(/\bIPTV\b/gi) ?? []).length > 1) fail(route, image.source, `keyword-stuffed alt text: “${alt}”`);
      }
    } catch (error) {
      fail(route, "[route]", `browser verification failed: ${error.message}`);
    }
  }

  if (errors.length) {
    console.error(errors.map(({ route, source, problem }) => `FAIL: ${productionOrigin}${route} — ${source} — ${problem}`).join("\n"));
    console.error(`Image alt verification failed: ${routes.length} pages checked, ${renderedImageCount} browser-rendered images checked, ${errors.length} issue(s).`);
    process.exitCode = 1;
  } else {
    console.log(`Image alt verification passed: ${routes.length} pages checked (${indexableRoutes.length} indexable, ${routes.length - indexableRoutes.length} noindex), ${renderedImageCount} browser-rendered images and ${serverImageCount} server-rendered image occurrences checked.`);
    console.log(`Missing alt attributes: 0. Intentionally decorative empty alts: ${decorativeImages.length}.`);
  }
} finally {
  if (browser) await browser.close();
  if (server && !server.killed) server.kill("SIGTERM");
}
