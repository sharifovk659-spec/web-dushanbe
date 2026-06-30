import { readdir, readFile } from "node:fs/promises";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "../public/images");

const jobs = [
  { file: "logo.svg", width: 96, height: 96 },
  { file: "og-cover.svg", width: 1200, height: 630 },
  { dir: "partners", width: 960, height: 1200, quality: 96 },
  { dir: "projects", width: 1200, height: 720 },
  { dir: "products", width: 1200, height: 720 },
];

const PARTNER_BG = { r: 248, g: 248, b: 248, alpha: 1 };

async function convertPartnerLogo(input, outPath, width, height, quality = 96) {
  await sharp(input)
    .flatten({ background: PARTNER_BG })
    .resize(width, height, {
      fit: "contain",
      background: PARTNER_BG,
    })
    .sharpen({ sigma: 0.6, m1: 0.8, m2: 0.4 })
    .webp({ quality, effort: 6 })
    .toFile(outPath);
  console.log(`✓ ${basename(outPath)}`);
}

async function convertRaster(input, outPath, width, height, quality = 82) {
  await sharp(input)
    .resize(width, height, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality, effort: 6, alphaQuality: 100 })
    .toFile(outPath);
  console.log(`✓ ${basename(outPath)}`);
}

async function convertSvg(svgPath, outPath, width, height, quality = 82) {
  const svg = await readFile(svgPath);
  await convertRaster(svg, outPath, width, height, quality);
}

for (const job of jobs) {
  if (job.file) {
    const svgPath = join(root, job.file);
    const outPath = join(root, job.file.replace(".svg", ".webp"));
    await convertSvg(svgPath, outPath, job.width, job.height, job.quality);
    continue;
  }

  const dirPath = join(root, job.dir);
  const files = (await readdir(dirPath)).filter((f) =>
    f.endsWith(".svg") || f.endsWith(".png"),
  );

  for (const file of files) {
    const inputPath = join(dirPath, file);
    const outPath = join(dirPath, file.replace(/\.(svg|png)$/i, ".webp"));

    if (file.endsWith(".svg")) {
      await convertSvg(inputPath, outPath, job.width, job.height, job.quality);
      continue;
    }

    if (job.dir === "partners") {
      await convertPartnerLogo(
        inputPath,
        outPath,
        job.width,
        job.height,
        job.quality ?? 96,
      );
      continue;
    }

    await convertRaster(
      inputPath,
      outPath,
      job.width,
      job.height,
      job.quality ?? 82,
    );
  }
}
