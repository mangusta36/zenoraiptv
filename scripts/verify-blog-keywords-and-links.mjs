import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = resolve(root, "docs/audits");
const csvPath = resolve(outputDirectory, "ZENORA-19-BLOG-KEYWORD-LINK-VERIFICATION.csv");
const reportPath = resolve(outputDirectory, "ZENORA-19-BLOG-KEYWORD-LINK-REPORT.md");
const productionOrigin = JSON.parse(await readFile(resolve(root, "src/config/site.json"), "utf8")).origin;
const staleOrigins = ["https://zenoraiptv.tv", "https://www.zenoraiptv.tv", "https://zenoratv.vip"];
const providedBaseURL = process.env.BLOG_VERIFY_BASE_URL;
const port = process.env.BLOG_VERIFY_PORT ?? "3011";
const baseURL = providedBaseURL ?? `http://127.0.0.1:${port}`;

function loadGuides() {
  const typescript = require("typescript");
  const source = readFileSync(resolve(root, "src/data/guides.ts"), "utf8");
  const transpiled = typescript.transpileModule(source, {
    compilerOptions: { module: typescript.ModuleKind.CommonJS },
  }).outputText;
  const guideModule = { exports: {} };
  new Function("exports", "module", "require", transpiled)(guideModule.exports, guideModule, require);
  return guideModule.exports.guides;
}

const guides = loadGuides();
if (guides.length !== 19) throw new Error(`Expected 19 guides, found ${guides.length}.`);
const guideSlugs = new Set(guides.map((guide) => guide.slug));
const normalize = (value = "") => value.replace(/\s+/g, " ").trim();
const comparable = (value = "") => normalize(value).toLocaleLowerCase("en-US");
const words = (value = "") => value.match(/[A-Za-z0-9]+(?:[’'-][A-Za-z0-9]+)*/g) ?? [];
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const csv = (value) => `"${String(value).replaceAll('"', '""')}"`;
const markdown = (value) => String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
const canonicalFor = (path) => `${productionOrigin}${path}`;

let server;
async function waitForServer() {
  let lastError;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`${baseURL}/blog/what-is-iptv`);
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
    throw new Error("No production build found. Run `npm run build` before `npm run verify:blog-keywords`.");
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

const records = [];
const globalErrors = [];
let browser;

try {
  await waitForServer();
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ baseURL });
  const page = await context.newPage();
  const targetStatuses = new Map();

  async function targetStatus(path) {
    if (!targetStatuses.has(path)) {
      const response = await context.request.get(path, { maxRedirects: 0 });
      targetStatuses.set(path, response.status());
    }
    return targetStatuses.get(path);
  }

  for (const guide of guides) {
    const route = `/blog/${guide.slug}`;
    const expectedCanonical = canonicalFor(route);
    const expectedImages = (guide.hero ? 1 : 0) + guide.sections.filter((section) => section.figure).length;
    const expectedRelated = guide.related.filter((slug) => guideSlugs.has(slug)).length;
    const serverErrors = [];
    const browserErrors = [];
    let html = "";
    let dom;

    try {
      const response = await fetch(`${baseURL}${route}`);
      html = await response.text();
      if (!response.ok) serverErrors.push(`server returned HTTP ${response.status}`);
      const articleHtml = html.match(/<article[^>]*class="[^"]*\barticle-body\b[^"]*"[^>]*>([\s\S]*?)<\/article>/i)?.[1] ?? "";
      if (!articleHtml) serverErrors.push("server HTML has no article.article-body");
      if (!html.includes(`href="${expectedCanonical}"`) && !html.includes(`href='${expectedCanonical}'`)) serverErrors.push("server HTML canonical is missing or incorrect");
      if (staleOrigins.some((origin) => html.includes(origin))) serverErrors.push("server HTML contains a stale or non-www production origin");
      const anchorPattern = new RegExp(`<a[^>]+href=["']\/["'][^>]*>\\s*${escapeRegExp(guide.keyword)}\\s*<\\/a>`, "gi");
      if ((articleHtml.match(anchorPattern) ?? []).length < 2) serverErrors.push("server HTML has fewer than two exact primary-keyword homepage anchors");
      const contextualPattern = /<a[^>]+href=["']\/blog\/([^"'#?]+)["'][^>]*>([\s\S]*?)<\/a>/gi;
      const rawContextual = [...articleHtml.matchAll(contextualPattern)].filter((match) => match[1] !== guide.slug);
      if (!rawContextual.length) serverErrors.push("server HTML has no contextual link to another article");
      if (articleHtml.includes("&lt;a href=")) serverErrors.push("server HTML contains escaped anchor markup");
      if (!comparable(articleHtml.replace(/<[^>]+>/g, " ")).includes(comparable(guide.keyword))) serverErrors.push("server HTML does not contain the primary keyword in article content");
    } catch (error) {
      serverErrors.push(`server HTML request failed: ${error.message}`);
    }

    try {
      const response = await page.goto(route, { waitUntil: "domcontentloaded", timeout: 20_000 });
      if (!response?.ok()) browserErrors.push(`browser navigation returned HTTP ${response?.status() ?? "unknown"}`);
      await page.locator("article.article-body").waitFor({ state: "visible", timeout: 5_000 });
      dom = await page.locator("main").evaluate((main, expectedKeyword) => {
        const article = main.querySelector("article.article-body");
        const clean = (value = "") => value.replace(/\s+/g, " ").trim();
        const isVisible = (element) => {
          const style = getComputedStyle(element);
          const box = element.getBoundingClientRect();
          return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0 && box.width > 0 && box.height > 0;
        };
        if (!article) return undefined;
        const headings = [...article.querySelectorAll(':scope > section[id^="s"] h2, :scope > section[id^="s"] h3')]
          .filter(isVisible)
          .map((heading) => clean(heading.textContent ?? ""));
        const primaryAnchors = [...article.querySelectorAll('a[href="/"]')]
          .filter((anchor) => clean(anchor.textContent ?? "") === expectedKeyword)
          .map((anchor) => ({
            href: anchor.getAttribute("href") ?? "",
            resolvedHref: anchor.href,
            visible: isVisible(anchor),
            paragraph: clean(anchor.closest("p")?.textContent ?? ""),
            excluded: Boolean(anchor.closest("header, footer, .breadcrumbs, .topic-journey, .related")),
            html: anchor.outerHTML,
          }));
        const contextualAnchors = [...article.querySelectorAll('a[href^="/blog/"]')]
          .filter((anchor) => !anchor.closest(".topic-journey") && new URL(anchor.href).pathname !== location.pathname)
          .map((anchor) => ({ href: anchor.getAttribute("href") ?? "", text: clean(anchor.textContent ?? ""), visible: isVisible(anchor), html: anchor.outerHTML }));
        const clone = article.cloneNode(true);
        clone.querySelectorAll(".topic-journey, .article-research, .sources, .article-context-links, .article-primary-keyword-link, .article-contextual-guide").forEach((element) => element.remove());
        return {
          h1Count: document.querySelectorAll("h1").length,
          headings,
          primaryAnchors,
          contextualAnchors,
          relatedCount: main.querySelectorAll('.related a[href^="/blog/"]').length,
          topicJourneyCount: article.querySelectorAll('.topic-journey a[href^="/blog/"]').length,
          wordText: clean(clone.textContent ?? ""),
          imageCount: main.querySelectorAll("img").length,
          faqCount: article.querySelectorAll("#faq details").length,
          jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => script.textContent ?? "").join("\n"),
          canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
          escapedMarkup: (article.textContent ?? "").includes('<a href="'),
        };
      }, guide.keyword);

      if (!dom) throw new Error("article DOM was not found");
      const headingText = dom.headings.map(comparable);
      const matchedKeywords = guide.headingKeywords.filter((keyword) => headingText.some((heading) => heading.includes(comparable(keyword))));
      if (matchedKeywords.length !== 5) browserErrors.push(`only ${matchedKeywords.length}/5 assigned phrases appear in visible editorial headings`);
      if (!headingText.some((heading) => heading.includes(comparable(guide.keyword)))) browserErrors.push("primary keyword is absent from visible editorial headings");
      if (dom.h1Count !== 1) browserErrors.push(`page has ${dom.h1Count} H1 elements`);
      if (dom.primaryAnchors.length < 2) browserErrors.push(`found ${dom.primaryAnchors.length}/2 primary-keyword homepage anchors`);
      if (dom.primaryAnchors.some((anchor) => anchor.href !== "/" || canonicalFor(anchor.href) !== `${productionOrigin}/`)) browserErrors.push("a primary-keyword anchor does not resolve to the canonical homepage");
      if (dom.primaryAnchors.some((anchor) => !anchor.visible || anchor.excluded)) browserErrors.push("a primary-keyword anchor is hidden or in an excluded region");
      if (new Set(dom.primaryAnchors.slice(0, 2).map((anchor) => anchor.paragraph)).size < 2) browserErrors.push("the two primary-keyword anchors are not in distinct paragraphs");
      if (!dom.contextualAnchors.length) browserErrors.push("no editorial-body link points to another article");
      if (dom.contextualAnchors.some((anchor) => !anchor.visible || !anchor.text || ["click here", "read more", "learn more"].includes(anchor.text.toLowerCase()))) browserErrors.push("a contextual article link is hidden or has generic/empty text");
      if (dom.relatedCount !== expectedRelated) browserErrors.push(`Related Articles has ${dom.relatedCount} links; expected ${expectedRelated}`);
      if (dom.topicJourneyCount < 1) browserErrors.push("Topic Journey has no article links");
      const editorialWordCount = words(dom.wordText).length;
      if (editorialWordCount < 2_500) browserErrors.push(`editorial word count is ${editorialWordCount}; expected at least 2500`);
      if (dom.imageCount < expectedImages) browserErrors.push(`page has ${dom.imageCount} images; expected at least ${expectedImages}`);
      if (dom.faqCount < 1 || !dom.jsonLd.includes('"FAQPage"') || !dom.jsonLd.includes('"BlogPosting"')) browserErrors.push("FAQ or article structured data is missing");
      if (dom.canonical !== expectedCanonical) browserErrors.push(`canonical is ${dom.canonical || "missing"}; expected ${expectedCanonical}`);
      if (staleOrigins.some((origin) => dom.canonical.includes(origin) || dom.jsonLd.includes(origin))) browserErrors.push("DOM metadata contains a stale or non-www production origin");
      if (dom.escapedMarkup) browserErrors.push("escaped anchor markup is visible in the article");

      for (const anchor of dom.contextualAnchors) {
        const target = new URL(anchor.href, productionOrigin).pathname;
        if (!guideSlugs.has(target.replace("/blog/", ""))) browserErrors.push(`contextual target does not exist in the article inventory: ${target}`);
        else if ((await targetStatus(target)) >= 400) browserErrors.push(`contextual target returned an error: ${target}`);
      }
      for (const anchor of await page.locator('.topic-journey a[href^="/blog/"], .related a[href^="/blog/"]').evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href") ?? ""))) {
        if ((await targetStatus(anchor)) >= 400) browserErrors.push(`preserved article link returned an error: ${anchor}`);
      }

      records.push({
        guide,
        serverErrors,
        browserErrors,
        headings: matchedKeywords,
        primaryAnchors: dom.primaryAnchors,
        contextualAnchors: dom.contextualAnchors,
        relatedCount: dom.relatedCount,
        topicJourneyCount: dom.topicJourneyCount,
        editorialWordCount,
        imageCount: dom.imageCount,
        canonical: dom.canonical,
      });
    } catch (error) {
      browserErrors.push(`browser verification failed: ${error.message}`);
      records.push({ guide, serverErrors, browserErrors, headings: [], primaryAnchors: [], contextualAnchors: [], relatedCount: 0, topicJourneyCount: 0, editorialWordCount: 0, imageCount: 0, canonical: "" });
    }
  }

  const primaryClickPage = await context.newPage();
  await primaryClickPage.goto("/blog/what-is-iptv", { waitUntil: "domcontentloaded" });
  await Promise.all([
    primaryClickPage.waitForURL((url) => url.pathname === "/", { timeout: 8_000 }),
    primaryClickPage.locator("article.article-body .article-primary-keyword-link").first().getByRole("link", { name: "what is IPTV", exact: true }).click(),
  ]).catch(() => globalErrors.push("Representative primary-keyword click did not navigate to the homepage."));
  await primaryClickPage.close();

  const contextualClickPage = await context.newPage();
  await contextualClickPage.goto("/blog/device-compatibility", { waitUntil: "domcontentloaded" });
  const contextualDestination = await contextualClickPage.locator("article.article-body .article-contextual-guide a").getAttribute("href");
  if (!contextualDestination) {
    globalErrors.push("Representative contextual article link has no destination.");
  } else {
    await Promise.all([
      contextualClickPage.waitForURL((url) => url.pathname === contextualDestination, { timeout: 8_000 }),
      contextualClickPage.locator("article.article-body .article-contextual-guide a").click(),
    ]).catch(() => globalErrors.push("Representative contextual article click did not reach its intended article."));
  }
  await contextualClickPage.close();

  const headers = ["Article URL", "Primary keyword", "Heading keyword 1", "Heading keyword 2", "Heading keyword 3", "Heading keyword 4", "Heading keyword 5", "Heading verification result", "Primary keyword homepage anchor count", "First homepage anchor href", "Second homepage anchor href", "Contextual article link count", "Example contextual article destination", "Related Articles link count", "Topic Journey link count", "Editorial word count", "Image count", "Canonical URL", "Browser verification result", "Overall PASS/FAIL"];
  const rows = records.map((record) => {
    const headingPass = !record.browserErrors.some((error) => error.includes("heading") || error.includes("keyword is absent") || error.includes("H1"));
    const browserPass = record.browserErrors.length === 0;
    const overallPass = browserPass && record.serverErrors.length === 0;
    const verifiedHeadings = Array.from({ length: 5 }, (_, index) => record.headings[index] ?? "");
    return [canonicalFor(`/blog/${record.guide.slug}`), record.guide.keyword, ...verifiedHeadings, headingPass ? "PASS" : "FAIL", record.primaryAnchors.length, record.primaryAnchors[0] ? `${productionOrigin}${record.primaryAnchors[0].href}` : "", record.primaryAnchors[1] ? `${productionOrigin}${record.primaryAnchors[1].href}` : "", record.contextualAnchors.length, record.contextualAnchors[0] ? canonicalFor(record.contextualAnchors[0].href) : "", record.relatedCount, record.topicJourneyCount, record.editorialWordCount, record.imageCount, record.canonical, browserPass ? "PASS" : "FAIL", overallPass ? "PASS" : "FAIL"];
  });

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(csvPath, `${headers.map(csv).join(",")}\n${rows.map((row) => row.map(csv).join(",")).join("\n")}\n`);

  const failedRecords = records.filter((record) => record.serverErrors.length || record.browserErrors.length);
  const deviceRecord = records.find((record) => record.guide.slug === "device-compatibility");
  const representative = records.find((record) => record.guide.slug === "what-is-iptv");
  const report = `# Zenora 19-article keyword and link verification

Generated by \`npm run verify:blog-keywords\` against the local production build at ${new Date().toISOString()}.

## Initial problems found

- The article template provided one exact \`Zenora IPTV\` homepage anchor, but did not enforce two anchors using each article's assigned primary keyword.
- Primary phrases were not consistently present in visible editorial H2/H3 headings.
- A contextual blog-to-blog link inside the editorial body was not guaranteed; \`/blog/device-compatibility\` depended on Related Articles and Topic Journey links.
- The existing validators did not produce article-level proof for the five heading phrases, two primary anchors, editorial contextual links, or representative click navigation.

## Files changed

- \`src/data/guides.ts\`: assigned five distinct heading phrases per article and integrated each primary phrase into a substantive section heading.
- \`src/app/blog/[slug]/page.tsx\`: rendered two exact primary-keyword homepage anchors in separate paragraphs and one curated related-article link inside the editorial body.
- \`scripts/validate-guides.mjs\`: enforced five distinct assigned heading phrases and primary-keyword membership.
- \`scripts/verify-blog-keywords-and-links.mjs\`: added production HTML, browser DOM, target-resolution, preservation, and click checks plus generated evidence.
- \`tests/e2e/blog-keywords-and-links.spec.ts\`: added an independent browser regression across all 19 articles plus representative click tests.
- \`scripts/check-platform.mjs\`: exempted the verifier's intentional stale-domain rejection fixtures from the production-source stale-domain scan.
- \`package.json\`: added \`npm run verify:blog-keywords\`.
- \`docs/audits/ZENORA-19-BLOG-KEYWORD-LINK-VERIFICATION.csv\`: generated machine-readable results.
- \`docs/audits/ZENORA-19-BLOG-KEYWORD-LINK-REPORT.md\`: generated this report.
- \`docs/audits/ZENORA-INTERNAL-LINK-AUDIT.csv\` and \`docs/audits/ZENORA-INTERNAL-LINK-SUMMARY.md\`: regenerated by the existing full-site link validator.

## Verification layers

- Server-rendered HTML: ${records.filter((record) => !record.serverErrors.length).length}/19 PASS.
- Browser DOM: ${records.filter((record) => !record.browserErrors.length).length}/19 PASS.
- Primary-keyword click: ${globalErrors.some((error) => error.includes("primary-keyword")) ? "FAIL" : "PASS"} (\`/blog/what-is-iptv\` → \`/\`).
- Contextual article click: ${globalErrors.some((error) => error.includes("contextual")) ? "FAIL" : "PASS"} (\`/blog/device-compatibility\` → \`${deviceRecord?.contextualAnchors[0]?.href ?? "missing"}\`).

## Results for all 19 articles

| Article | Primary keyword | Five verified heading phrases | Homepage anchors | Contextual article links | Browser | Overall |
| --- | --- | --- | ---: | ---: | --- | --- |
${records.map((record) => `| /blog/${record.guide.slug} | ${markdown(record.guide.keyword)} | ${record.headings.map(markdown).join("; ")} | ${record.primaryAnchors.length} | ${record.contextualAnchors.length} | ${record.browserErrors.length ? "FAIL" : "PASS"} | ${record.serverErrors.length || record.browserErrors.length ? "FAIL" : "PASS"} |`).join("\n")}

## Extracted rendered HTML evidence

Two primary-keyword homepage anchors from \`/blog/what-is-iptv\`:

\`\`\`html
${representative?.primaryAnchors.slice(0, 2).map((anchor) => anchor.html).join("\n") ?? "missing"}
\`\`\`

The editorial-body contextual article link on \`/blog/device-compatibility\`:

\`\`\`html
${deviceRecord?.contextualAnchors[0]?.html ?? "missing"}
\`\`\`

The device-compatibility article now has ${deviceRecord?.contextualAnchors.length ?? 0} real contextual article link(s) inside \`article.article-body\`, excluding Related Articles and Topic Journey.

## Remaining failures

${failedRecords.length || globalErrors.length ? [...failedRecords.flatMap((record) => [...record.serverErrors.map((error) => `- /blog/${record.guide.slug} server HTML: ${error}`), ...record.browserErrors.map((error) => `- /blog/${record.guide.slug} browser DOM: ${error}`)]), ...globalErrors.map((error) => `- Click verification: ${error}`)].join("\n") : "None. All 19 article rows pass every mandatory check."}
`;
  await writeFile(reportPath, report);

  if (rows.length !== 19) globalErrors.push(`Evidence CSV has ${rows.length} data rows; expected 19.`);
  if (failedRecords.length || globalErrors.length) {
    console.error([...failedRecords.flatMap((record) => [...record.serverErrors.map((error) => `${record.guide.slug} server: ${error}`), ...record.browserErrors.map((error) => `${record.guide.slug} browser: ${error}`)]), ...globalErrors].map((error) => `FAIL: ${error}`).join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Blog keyword/link verification passed: 19/19 server-rendered HTML checks and 19/19 browser DOM checks.");
    console.log("Representative click checks passed: primary keyword → homepage; device compatibility → contextual article.");
    console.log(`Evidence written to ${csvPath} and ${reportPath}.`);
  }
} finally {
  if (browser) await browser.close();
  if (server && !server.killed) server.kill("SIGTERM");
}
