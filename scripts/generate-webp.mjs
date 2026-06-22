import { readdir, readFile } from "node:fs/promises";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "../public/images");

const jobs = [
  { file: "logo.svg", width: 96, height: 96 },
  { file: "og-cover.svg", width: 1200, height: 630 },
  { dir: "partners", width: 320, height: 112 },
  { dir: "projects", width: 1200, height: 720 },
];

async function convert(svgPath, outPath, width, height) {
  const svg = await readFile(svgPath);
  await sharp(svg, { density: 150 })
    .resize(width, height, { fit: "contain", background: { r: 5, g: 8, b: 22, alpha: 0 } })
    .webp({ quality: 82, effort: 4 })
    .toFile(outPath);
  console.log(`✓ ${basename(outPath)}`);
}

for (const job of jobs) {
  if (job.file) {
    const svgPath = join(root, job.file);
    const outPath = join(root, job.file.replace(".svg", ".webp"));
    await convert(svgPath, outPath, job.width, job.height);
    continue;
  }

  const dirPath = join(root, job.dir);
  const files = (await readdir(dirPath)).filter((f) => f.endsWith(".svg"));
  for (const file of files) {
    const svgPath = join(dirPath, file);
    const outPath = join(dirPath, file.replace(".svg", ".webp"));
    await convert(svgPath, outPath, job.width, job.height);
  }
}
