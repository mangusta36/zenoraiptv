import fs from "node:fs";

const fail = (message) => { console.error(`FAIL: ${message}`); process.exitCode = 1; };
const sitemap = fs.readFileSync("src/app/sitemap.ts", "utf8");
const metadata = fs.readFileSync("src/app/route-metadata.ts", "utf8");
const guideData = fs.readFileSync("src/data/guides.ts", "utf8");
const setupSlugs = ["android", "apple-tv", "firestick", "ios", "mac", "mag", "smart-tv", "windows"];

for (const slug of setupSlugs) if (!sitemap.includes(`"${slug}"`)) fail(`sitemap omits setup/${slug}`);
for (const slug of [...guideData.matchAll(/"slug": "([^"]+)"/g)].map((match) => match[1])) {
  if (!sitemap.includes("guides.map")) fail(`sitemap does not derive guide ${slug}`);
}
if (!metadata.includes("twitter:")) fail("shared metadata has no Twitter card");
if (!metadata.includes("summary_large_image")) fail("shared metadata lacks a large-image Twitter card");
if (!process.exitCode) console.log("Platform static checks passed: setup sitemap coverage and shared Twitter metadata are present.");
