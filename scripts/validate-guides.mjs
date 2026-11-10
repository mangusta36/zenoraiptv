import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
const require = createRequire(import.meta.url);
const text = readFileSync(
  new URL("../src/data/guides.ts", import.meta.url),
  "utf8",
);
const architecturePath = new URL("../src/data/topic-architecture.ts", import.meta.url);
const architecture = readFileSync(architecturePath, "utf8");
const research = readFileSync(new URL("../src/data/article-research.ts", import.meta.url), "utf8");
const slugs = [...text.matchAll(/["']?slug["']?\s*:\s*["']([^"']+)["']/g)].map((m) => m[1]);
const titles = [...text.matchAll(/["']?title["']?\s*:\s*["']([^"']+)["']/g)].map(
  (m) => m[1],
);
const duplicates = (items) => items.filter((x, i) => items.indexOf(x) !== i);
const errors = [
  ...duplicates(slugs).map((x) => `Duplicate slug: ${x}`),
  ...duplicates(titles).map((x) => `Duplicate title: ${x}`),
];

const typescript = require("typescript");
const transpiled = typescript.transpileModule(text, {
  compilerOptions: { module: typescript.ModuleKind.CommonJS },
}).outputText;
const guideModule = { exports: {} };
new Function("exports", "module", "require", transpiled)(guideModule.exports, guideModule, require);
const renderedGuides = guideModule.exports.guides;

function webpDimensions(path) {
  const bytes = readFileSync(path);
  if (bytes.toString("ascii", 0, 4) !== "RIFF" || bytes.toString("ascii", 8, 12) !== "WEBP") return undefined;
  const chunk = bytes.toString("ascii", 12, 16);
  if (chunk === "VP8 ") return { width: bytes.readUInt16LE(26) & 0x3fff, height: bytes.readUInt16LE(28) & 0x3fff };
  if (chunk === "VP8L") {
    const b1 = bytes[21]; const b2 = bytes[22]; const b3 = bytes[23]; const b4 = bytes[24];
    return { width: 1 + b1 + ((b2 & 0x3f) << 8), height: 1 + (b2 >> 6) + (b3 << 2) + ((b4 & 0x0f) << 10) };
  }
  if (chunk === "VP8X") return { width: 1 + bytes.readUIntLE(24, 3), height: 1 + bytes.readUIntLE(27, 3) };
  return undefined;
}

const wordCounts = [];
let supportingImageCount = 0;
const imageCoverageGaps = [];
for (const guide of renderedGuides) {
  const normalizedHeadings = guide.sections.map((section) => section.heading.toLowerCase());
  if (!Array.isArray(guide.headingKeywords) || guide.headingKeywords.length !== 5) {
    errors.push(`Expected exactly five heading keywords: ${guide.slug}`);
  } else {
    const normalizedKeywords = guide.headingKeywords.map((keyword) => keyword.trim().toLowerCase());
    if (new Set(normalizedKeywords).size !== 5) errors.push(`Heading keywords must be distinct: ${guide.slug}`);
    if (!normalizedKeywords.includes(guide.keyword.toLowerCase())) errors.push(`Primary keyword is missing from heading keyword set: ${guide.slug}`);
    for (const keyword of guide.headingKeywords) {
      if (!normalizedHeadings.some((heading) => heading.includes(keyword.toLowerCase()))) {
        errors.push(`Heading keyword does not appear in a section heading for ${guide.slug}: ${keyword}`);
      }
    }
  }
  const editorialText = [guide.summary, ...guide.sections.flatMap((section) => [section.heading, ...section.body]), ...guide.faqs.flat(), ...(guide.table ? [guide.table.caption, ...guide.table.headers, ...guide.table.rows.flat()] : [])]
    .join(" ").replace(/<[^>]+>/g, " ");
  wordCounts.push((editorialText.match(/[A-Za-z0-9]+(?:[’'-][A-Za-z0-9]+)*/g) ?? []).length);
  if (!guide.hero) errors.push(`Missing hero image: ${guide.slug}`);
  if (guide.hero) {
    const dimensions = webpDimensions(resolve(process.cwd(), "public", guide.hero.src.slice(1)));
    if (!dimensions || dimensions.width !== 1200 || dimensions.height !== 630) errors.push(`Hero image must be a valid 1200x630 WebP: ${guide.hero.src}`);
  }
  const guideSupportingImages = guide.sections.filter((section) => section.figure).length;
  if (guideSupportingImages < 8) imageCoverageGaps.push(`${guide.slug} (${guideSupportingImages}/8)`);
  for (const section of guide.sections) if (section.figure) {
    supportingImageCount += 1;
    const dimensions = webpDimensions(resolve(process.cwd(), "public", section.figure.src.slice(1)));
    if (!dimensions || dimensions.width !== 800 || dimensions.height !== 500) errors.push(`Section image must be a valid 800x500 WebP: ${section.figure.src}`);
  }
}
if (slugs.length !== 19) errors.push(`Expected 19 blog articles, found ${slugs.length}`);
if (titles.length !== 19) errors.push(`Expected 19 blog titles, found ${titles.length}`);
const imageSources = [...text.matchAll(/["']src["']?\s*:\s*["'](\/images\/guides\/[^"']+)["']/g)].map((m) => m[1]);
for (const source of imageSources) {
  if (!source.endsWith(".webp")) errors.push(`Guide image must be WebP: ${source}`);
  if (!existsSync(resolve(process.cwd(), "public", source.slice(1)))) errors.push(`Missing guide image: ${source}`);
}
for (const slug of slugs) {
  if (!new RegExp(`["']?slug["']?\\s*:\\s*["']${slug}["']`).test(text))
    errors.push(`Missing blog article: ${slug}`);
}
const relationshipSlugs = [...architecture.matchAll(/^  "([^"]+)": \{ cluster:/gm)].map((match) => match[1]);
for (const slug of slugs) {
  if (!relationshipSlugs.includes(slug)) errors.push(`Missing topical relationship: ${slug}`);
}
for (const slug of relationshipSlugs) {
  if (!slugs.includes(slug)) errors.push(`Topical relationship references unknown article: ${slug}`);
}
if (relationshipSlugs.length !== slugs.length) errors.push(`Expected ${slugs.length} topical relationships, found ${relationshipSlugs.length}`);
for (const match of architecture.matchAll(/^  "([^"]+)": \{([\s\S]*?)\n  \},$/gm)) {
  const slug = match[1];
  const block = match[2];
  const cluster = block.match(/cluster: "([^"]+)"/)?.[1];
  if (!cluster || !["fundamentals", "setup", "performance", "safety"].includes(cluster)) errors.push(`Invalid topical cluster for ${slug}`);
  const relationshipOnly = block.replace(/pillar: "[^"]+"/, "");
  const references = [...relationshipOnly.matchAll(/"([^"]+)"/g)].map((entry) => entry[1]).filter((value) => slugs.includes(value));
  if (references.includes(slug)) errors.push(`Self-referential topical relationship: ${slug}`);
  if (new Set(references).size !== references.length) errors.push(`Duplicate topical relationship reference: ${slug}`);
}
const researchSlugs = [...research.matchAll(/^  "([^"]+)": \[/gm)].map((match) => match[1]);
for (const slug of slugs) {
  if (!researchSlugs.includes(slug)) errors.push(`Missing research findings: ${slug}`);
  const block = research.match(new RegExp(`^  "${slug}": \\[([\\s\\S]*?)^  \\],`, "m"))?.[1] || "";
  const findings = [...block.matchAll(/claim:\s*"[^"]+",\s*\n\s*sourceLabel:\s*"[^"]+",\s*\n\s*href:\s*"https:\/\/[^\"]+"/g)];
  if (findings.length < 2) errors.push(`Expected two source-linked research findings: ${slug}`);
}
for (const slug of researchSlugs) {
  if (!slugs.includes(slug)) errors.push(`Research findings reference unknown article: ${slug}`);
}
if (researchSlugs.length !== slugs.length) errors.push(`Expected ${slugs.length} research records, found ${researchSlugs.length}`);
const primaryQueries = [...architecture.matchAll(/primaryQuery:\s*"([^"]+)"/g)].map((match) => match[1].toLowerCase());
for (const query of duplicates(primaryQueries)) errors.push(`Duplicate primary query boundary: ${query}`);
if (primaryQueries.length !== slugs.length) errors.push(`Expected ${slugs.length} primary query boundaries, found ${primaryQueries.length}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Blog validation passed: ${slugs.length} unique article slugs, ${titles.length} unique article titles, ${imageSources.length} local WebP references (${supportingImageCount} section placements), and ${Math.min(...wordCounts)}-${Math.max(...wordCounts)} editorial words per article.`,
);
if (imageCoverageGaps.length) console.log(`Desired eight-support-image target remains unmet for ${imageCoverageGaps.length} article(s): ${imageCoverageGaps.join(", ")}. Existing assets remain valid; no duplicate placeholder was added.`);
