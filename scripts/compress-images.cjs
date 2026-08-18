const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function writeAtomic(srcPath, pipeline) {
  const tmp = `${srcPath}.tmp`;
  await pipeline.toFile(tmp);
  fs.renameSync(tmp, srcPath);
}

async function compressJpeg(file, width, height) {
  await writeAtomic(
    file,
    sharp(file).rotate().resize(width, height, { fit: "cover" }).jpeg({ quality: 68, mozjpeg: true }),
  );
}

async function compressWebp(file, width, height) {
  await writeAtomic(
    file,
    sharp(file).rotate().resize(width, height, { fit: "cover" }).webp({ quality: 68 }),
  );
}

async function compressPng(file, width) {
  await writeAtomic(
    file,
    sharp(file).resize({ width, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true }),
  );
}

(async () => {
  const root = path.join(process.cwd(), "public", "images");
  const packages = fs.readdirSync(path.join(root, "packages")).filter((f) => /\.(jpe?g)$/i.test(f));
  for (const f of packages) {
    const p = path.join(root, "packages", f);
    const before = fs.statSync(p).size;
    await compressJpeg(p, 1200, 750);
    console.log("pkg", f, before, "->", fs.statSync(p).size);
  }

  const sigDir = path.join(root, "signature");
  for (const f of fs.readdirSync(sigDir)) {
    const p = path.join(sigDir, f);
    if (/^gallery-/i.test(f)) continue;
    const before = fs.statSync(p).size;
    if (/\.webp$/i.test(f)) await compressWebp(p, 720, 1280);
    else if (/\.(jpe?g)$/i.test(f)) await compressJpeg(p, 720, 1280);
    console.log("sig", f, before, "->", fs.statSync(p).size);
  }

  const poster = path.join(root, "hero-video-poster.jpg");
  const posterBefore = fs.statSync(poster).size;
  await writeAtomic(
    poster,
    sharp(poster).resize({ width: 1280, withoutEnlargement: true }).jpeg({ quality: 66, mozjpeg: true }),
  );
  console.log("poster", posterBefore, "->", fs.statSync(poster).size);

  const logo = path.join(root, "ambition-holiday-logo.png");
  const logoBefore = fs.statSync(logo).size;
  await compressPng(logo, 640);
  console.log("logo", logoBefore, "->", fs.statSync(logo).size);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
