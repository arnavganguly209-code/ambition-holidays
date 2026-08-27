const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const src =
  process.argv[2] ||
  String.raw`C:\Users\Admin\.cursor\projects\c-Users-Admin-Desktop-ARNAB-ambition-holidays\assets\c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_ChatGPT_Image_Aug_27__2026__09_28_30_PM-e1ec57cd-f434-4d31-be5f-21d4e759ae85.png`;

const outDir = path.join(__dirname, "..", "public", "images", "journal");

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const meta = await sharp(src).metadata();
  const w = meta.width;
  const h = meta.height;
  console.log("src", w, h);

  const names = ["everest.jpg", "annapurna.jpg", "mustang.jpg"];
  const leftPad = w * 0.08;
  const rightPad = w * 0.08;
  const gap = w * 0.02;
  const usable = w - leftPad - rightPad;
  const cardW = (usable - gap * 2) / 3;
  const photoTop = h * 0.33;
  const photoH = h * 0.24;

  for (let i = 0; i < 3; i++) {
    // Bias left within each card so the mockup play-button center is excluded.
    const left = Math.round(leftPad + i * (cardW + gap) + cardW * 0.04);
    const width = Math.round(cardW * 0.62);
    const top = Math.round(photoTop);
    const height = Math.round(photoH);
    await sharp(src)
      .extract({ left, top, width, height })
      .resize(1280, 720, { fit: "cover" })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(outDir, names[i]));
    console.log("wrote", names[i], { left, top, width, height });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
