const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const src =
  process.argv[2] ||
  String.raw`C:\Users\Admin\.cursor\projects\c-Users-Admin-Desktop-ARNAB-ambition-holidays\assets\c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_ChatGPT_Image_Aug_22__2026__08_43_38_PM-e6125054-a754-4646-9d22-30f2c3e7f83f.png`;

const outDir = path.join(__dirname, "..", "public", "images", "why");

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const img = sharp(src);
  const meta = await img.metadata();
  const w = meta.width;
  const h = meta.height;
  console.log("src", w, h);

  // Six cards sit in a row. Photo is the bottom ~32% of each card.
  // Approximate layout for 1536-wide ChatGPT mockups:
  // cards start ~10% from left, end ~90%, y photo around 52%-72% of canvas.
  const names = [
    "years.jpg",
    "reviews.jpg",
    "guides.jpg",
    "stays.jpg",
    "support.jpg",
    "responsible.jpg",
  ];

  const leftPad = w * 0.072;
  const rightPad = w * 0.072;
  const gap = w * 0.01;
  const usable = w - leftPad - rightPad;
  const cardW = (usable - gap * 5) / 6;
  const photoTop = h * 0.618;
  const photoH = h * 0.108;

  for (let i = 0; i < 6; i++) {
    const left = Math.round(leftPad + i * (cardW + gap) + cardW * 0.03);
    const width = Math.round(cardW * 0.94);
    const top = Math.round(photoTop);
    const height = Math.round(photoH);
    await sharp(src)
      .extract({ left, top, width, height })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(outDir, names[i]));
    console.log("wrote", names[i], { left, top, width, height });
  }

  const logos = [
    { name: "tripadvisor.png", left: 0.545, top: 0.795, w: 0.035, h: 0.062 },
    { name: "google.png", left: 0.655, top: 0.795, w: 0.035, h: 0.062 },
    { name: "facebook.png", left: 0.765, top: 0.795, w: 0.035, h: 0.062 },
    { name: "instagram.png", left: 0.875, top: 0.795, w: 0.035, h: 0.062 },
  ];
  const logoDir = path.join(outDir, "brands");
  fs.mkdirSync(logoDir, { recursive: true });
  for (const logo of logos) {
    await sharp(src)
      .extract({
        left: Math.round(w * logo.left),
        top: Math.round(h * logo.top),
        width: Math.round(w * logo.w),
        height: Math.round(h * logo.h),
      })
      .png()
      .toFile(path.join(logoDir, logo.name));
    console.log("logo", logo.name);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
