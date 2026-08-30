/**
 * Resizes the full-resolution source photos in assets/ into web-sized WebP
 * in public/. Runs automatically before `dev` and `build`.
 *
 * The originals are 3024x4032 phone photos (~2.4 MB each) displayed in a
 * ~320px square box. They live outside public/ so the full-resolution files
 * never ship in the static export; only the generated WebP does.
 */
import { mkdir, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * 2x the ~320px display box. `position` picks which part of the portrait
 * survives the square crop.
 *
 * Add an entry here to build another source photo from assets/ into public/.
 */
const IMAGES = [
  { src: "assets/headshot-dark.png", out: "public/me.webp", size: 640, position: "attention" },
];

async function mtime(path) {
  try {
    return (await stat(path)).mtimeMs;
  } catch {
    return null;
  }
}

async function main() {
  await mkdir(resolve(ROOT, "public"), { recursive: true });

  for (const { src, out, size, position } of IMAGES) {
    const srcPath = resolve(ROOT, src);
    const outPath = resolve(ROOT, out);

    const srcTime = await mtime(srcPath);
    if (srcTime === null) {
      console.warn(`[images] missing source, skipping: ${src}`);
      continue;
    }

    const outTime = await mtime(outPath);
    if (outTime !== null && outTime >= srcTime) {
      console.log(`[images] up to date: ${out}`);
      continue;
    }

    await sharp(srcPath)
      .rotate() // honour EXIF orientation before cropping
      .resize(size, size, { fit: "cover", position })
      .webp({ quality: 82 })
      .toFile(outPath);

    const { size: bytes } = await stat(outPath);
    console.log(`[images] ${src} -> ${out} (${(bytes / 1024).toFixed(1)} KB)`);
  }
}

main().catch((error) => {
  console.error("[images] failed:", error);
  process.exitCode = 1;
});
