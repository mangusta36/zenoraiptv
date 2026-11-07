import fs from "node:fs";

const manifestPath = ".next/build-manifest.json";
if (!fs.existsSync(manifestPath)) {
  console.error("FAIL: no .next/build-manifest.json; run npm run build first.");
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const root = manifest.rootMainFiles ?? [];
const bytes = root.reduce((total, file) => {
  const path = `.next/${file}`;
  return total + (fs.existsSync(path) ? fs.statSync(path).size : 0);
}, 0);
// Build manifests list uncompressed files. This 400 KiB ceiling is therefore
// intentionally distinct from the build table's transfer-size estimate.
const budget = 400 * 1024;
console.log(`Shared root JavaScript: ${bytes} bytes; budget: ${budget} bytes.`);
if (bytes > budget) {
  console.error("FAIL: shared root JavaScript exceeds budget.");
  process.exit(1);
}
