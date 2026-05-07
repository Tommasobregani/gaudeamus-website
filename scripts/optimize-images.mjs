#!/usr/bin/env node
/**
 * Optimize all production photos in public/events and public/media.
 * Resizes anything wider than MAX_WIDTH and re-encodes JPEG/PNG with quality
 * tuned for web. Skips files smaller than MIN_BYTES so we don't re-touch
 * already-small assets (icons, logos).
 *
 * Run:  node scripts/optimize-images.mjs
 *       node scripts/optimize-images.mjs --dry
 */

import { readdir, stat, copyFile, mkdir } from "node:fs/promises";
import { join, extname, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");
const TARGETS = [join(PUBLIC, "events"), join(PUBLIC, "media")];
const BACKUP_ROOT = join(ROOT, ".image-backup");
const DRY = process.argv.includes("--dry");

const MAX_WIDTH = 2400;          // resize anything wider
const JPEG_QUALITY = 78;
const PNG_QUALITY = 80;
const MIN_BYTES = 200 * 1024;    // skip files <200KB (already small)

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function isImage(p) {
  return /\.(jpe?g|png)$/i.test(p);
}

async function ensureDir(p) {
  await mkdir(dirname(p), { recursive: true });
}

async function processOne(file) {
  const s = await stat(file);
  if (s.size < MIN_BYTES) return null;

  const ext = extname(file).toLowerCase();
  const img = sharp(file, { failOn: "none" });
  const meta = await img.metadata();
  const needsResize = (meta.width ?? 0) > MAX_WIDTH;

  let pipe = img.rotate(); // honour EXIF
  if (needsResize) pipe = pipe.resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (ext === ".png") {
    pipe = pipe.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true });
  } else {
    pipe = pipe.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  if (DRY) {
    return { file, before: s.size, willResize: needsResize };
  }

  // backup original
  const rel = relative(PUBLIC, file);
  const backup = join(BACKUP_ROOT, rel);
  await ensureDir(backup);
  await copyFile(file, backup);

  const buf = await pipe.toBuffer();
  await sharp(buf).toFile(file);

  const after = (await stat(file)).size;
  return { file, before: s.size, after, willResize: needsResize };
}

(async () => {
  let totalBefore = 0;
  let totalAfter = 0;
  let touched = 0;

  for (const root of TARGETS) {
    for await (const file of walk(root)) {
      if (!isImage(file)) continue;
      try {
        const r = await processOne(file);
        if (!r) continue;
        touched += 1;
        totalBefore += r.before;
        totalAfter += r.after ?? r.before;
        const beforeKB = (r.before / 1024).toFixed(0);
        const afterKB = ((r.after ?? r.before) / 1024).toFixed(0);
        const delta = r.after ? `${beforeKB}KB → ${afterKB}KB` : `${beforeKB}KB (dry)`;
        console.log(`✓ ${relative(PUBLIC, file)}  ${delta}${r.willResize ? "  (resized)" : ""}`);
      } catch (err) {
        console.warn(`! ${relative(PUBLIC, file)} — ${err.message}`);
      }
    }
  }

  const beforeMB = (totalBefore / 1024 / 1024).toFixed(1);
  const afterMB = (totalAfter / 1024 / 1024).toFixed(1);
  const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1);
  console.log("");
  console.log(
    `${DRY ? "[dry] " : ""}${touched} files · ${beforeMB} MB → ${afterMB} MB  (saved ${savedMB} MB)`,
  );
  if (!DRY) {
    console.log(`originals backed up to ${relative(ROOT, BACKUP_ROOT)}/`);
  }
})();
