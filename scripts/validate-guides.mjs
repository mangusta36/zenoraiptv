import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
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
  `Blog validation passed: ${slugs.length} unique article slugs, ${titles.length} unique article titles, and ${imageSources.length} local WebP references.`,
);
