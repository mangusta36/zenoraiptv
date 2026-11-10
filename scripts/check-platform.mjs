import fs from "node:fs";
import { createRequire } from "node:module";

const fail = (message) => { console.error(`FAIL: ${message}`); process.exitCode = 1; };
const sitemap = fs.readFileSync("src/app/sitemap.ts", "utf8");
const metadata = fs.readFileSync("src/app/route-metadata.ts", "utf8");
const guideData = fs.readFileSync("src/data/guides.ts", "utf8");
const siteConfig = JSON.parse(fs.readFileSync("src/config/site.json", "utf8"));
const nextConfig = fs.readFileSync("next.config.ts", "utf8");
const setupSlugs = ["android", "apple-tv", "firestick", "ios", "mac", "mag", "smart-tv", "windows"];
const publicPaths = ["/", "/pricing", "/channels", "/features", "/devices", "/how-it-works", "/trial", "/faq", "/contact", "/about", "/setup", "/troubleshooting", "/renew", "/support", "/blog"];
const guideSlugs = [...guideData.matchAll(/"slug": "([^"]+)"/g)].map((match) => match[1]);

for (const slug of setupSlugs) if (!sitemap.includes(`"${slug}"`)) fail(`sitemap omits setup/${slug}`);
for (const slug of guideSlugs) {
  if (!sitemap.includes("guides.map")) fail(`sitemap does not derive guide ${slug}`);
}
if (!metadata.includes("twitter:")) fail("shared metadata has no Twitter card");
if (!metadata.includes("summary_large_image")) fail("shared metadata lacks a large-image Twitter card");
if (siteConfig.origin !== "https://www.zenoratv.vip") fail(`Canonical site origin is ${siteConfig.origin}; expected https://www.zenoratv.vip.`);
if (!nextConfig.includes("value: 'zenoratv.vip'") || !nextConfig.includes("destination: 'https://www.zenoratv.vip/:path*'")) fail("Apex-to-www host redirect is missing or points to the wrong host.");
if (/destination:\s*['"]https:\/\/zenoratv\.vip/.test(nextConfig)) fail("Redirect configuration creates a www-to-apex loop risk.");
const productionFiles = ["src/app", "src/components", "src/config", "scripts", "tests"];
const sourceFiles = productionFiles.flatMap((entry) => fs.statSync(entry).isDirectory()
  ? fs.readdirSync(entry, { recursive: true }).filter((path) => /\.(?:ts|tsx|mjs|json)$/.test(String(path))).map((path) => `${entry}/${path}`)
  : [entry]);
const staleOriginPattern = /https:\/\/(?:www\.)?zenoraiptv\.tv|https:\/\/zenoratv\.vip/g;
for (const file of sourceFiles) {
  const contents = fs.readFileSync(file, "utf8");
  if (["scripts/check-platform.mjs", "scripts/validate-internal-links.mjs", "scripts/verify-blog-keywords-and-links.mjs", "tests/e2e/domain-migration.spec.ts"].includes(file)) continue;
  if (staleOriginPattern.test(contents)) fail(`Stale or non-www production origin remains in ${file}.`);
  staleOriginPattern.lastIndex = 0;
}

const parseCsv = (input) => {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (quoted && character === '"' && input[index + 1] === '"') { value += '"'; index += 1; }
    else if (character === '"') quoted = !quoted;
    else if (character === "," && !quoted) { row.push(value); value = ""; }
    else if (character === "\n" && !quoted) { row.push(value.replace(/\r$/, "")); if (row.some(Boolean)) rows.push(row); row = []; value = ""; }
    else value += character;
  }
  if (value || row.length) { row.push(value); rows.push(row); }
  return rows;
};

const keywordRows = parseCsv(fs.readFileSync("docs/audits/ZENORA-KEYWORD-MAP.csv", "utf8"));
const keywordHeaders = keywordRows.shift();
const requiredKeywordHeaders = ["url", "primary_non_branded_keyword", "secondary_keywords", "long_tail_variations", "branded_keyword_role", "search_intent", "existing_title", "proposed_title", "existing_h1", "proposed_h1", "main_topical_entities", "supporting_article_links", "potential_cannibalization_risks"];
if (keywordHeaders?.join("|") !== requiredKeywordHeaders.join("|")) fail("Keyword map headers do not match the required schema.");
const expectedIndexable = [...publicPaths, ...setupSlugs.map((slug) => `/setup/${slug}`), ...guideSlugs.map((slug) => `/blog/${slug}`)].sort();
const mappedUrls = keywordRows.map((row) => row[0]).sort();
if (mappedUrls.length !== expectedIndexable.length) fail(`Keyword map has ${mappedUrls.length} routes; expected ${expectedIndexable.length}.`);
if (new Set(mappedUrls).size !== mappedUrls.length) fail("Keyword map contains duplicate URLs.");
for (const route of expectedIndexable) if (!mappedUrls.includes(route)) fail(`Keyword map omits ${route}.`);
for (const row of keywordRows) {
  if (row.length !== requiredKeywordHeaders.length) fail(`Keyword map row ${row[0] || "[unknown]"} has ${row.length} columns; expected ${requiredKeywordHeaders.length}.`);
  if (row.some((value) => !value.trim())) fail(`Keyword map row ${row[0] || "[unknown]"} has an empty required field.`);
}

const require = createRequire(import.meta.url);
const typescript = require("typescript");
const pricingSource = fs.readFileSync("src/config/pricing.ts", "utf8");
const compiledPricing = typescript.transpileModule(pricingSource, { compilerOptions: { module: typescript.ModuleKind.CommonJS } }).outputText;
const pricingModule = { exports: {} };
new Function("exports", "module", "require", compiledPricing)(pricingModule.exports, pricingModule, require);
const { connectionOptions, durations, priceMatrix } = pricingModule.exports;
if (connectionOptions.join(",") !== "1,2,3,4,5,6") fail("Pricing must preserve connection options 1–6.");
if (durations.map((duration) => duration.id).join(",") !== "1,3,6,12") fail("Pricing must preserve 1, 3, 6, and 12 month durations.");
for (const connections of connectionOptions) for (const duration of durations) {
  if (!Number.isFinite(priceMatrix[connections]?.[duration.id])) fail(`Missing configured price for ${connections} connection(s), ${duration.id} month(s).`);
}
const promotion = fs.readFileSync("src/config/promotions.ts", "utf8");
for (const [label, expression] of [["12 paid months", /paidMonths:\s*12/], ["2 free months", /bonusMonths:\s*2/], ["14 total months", /totalMonths:\s*14/], ["annual checkout plan", /checkoutPlanId:\s*"12"/], ["all connection options", /eligibleConnectionCounts:\s*connectionOptions/]]) {
  if (!expression.test(promotion)) fail(`Annual promotion no longer preserves ${label}.`);
}
const commercialSource = [fs.readFileSync("src/components/site.tsx", "utf8"), fs.readFileSync("src/components/pages.tsx", "utf8"), ...fs.readdirSync("src/app", { recursive: true }).filter((path) => String(path).endsWith(".tsx")).map((path) => fs.readFileSync(`src/app/${path}`, "utf8"))].join("\n");
if (/26,000\+|100,000\+/.test(commercialSource)) fail("Unsupported quantitative catalogue claim remains in rendered application source.");

if (!process.exitCode) console.log(`Platform static checks passed: ${siteConfig.origin} canonical/redirect rules, sitemap/metadata checks, ${mappedUrls.length}-URL keyword map coverage, ${connectionOptions.length * durations.length} configured prices, and annual promotion consistency.`);
