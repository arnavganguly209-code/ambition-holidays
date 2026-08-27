const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const src =
  process.argv[2] ||
  String.raw`C:\Users\Admin\.cursor\projects\c-Users-Admin-Desktop-ARNAB-ambition-holidays\assets\c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_079a9aa4-9eab-4e31-bf24-4d584fd27033-07b8e51d-45cb-4820-878b-a430bdd881d5.png`;

const outDir = path.join(__dirname, "..", "public", "images", "availability");

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const meta = await sharp(src).metadata();
  const w = meta.width;
  const h = meta.height;
  console.log("src", w, h);

  // Three cards in a row. Photo sits under month header, above journey list.
  const names = ["sep.jpg", "oct.jpg", "nov.jpg"];
  const leftPad = w * 0.085;
  const rightPad = w * 0.085;
  const gap = w * 0.022;
  const usable = w - leftPad - rightPad;
  const cardW = (usable - gap * 2) / 3;
  // Skip month header; take only photo band inside each card.
  const photoTop = h * 0.375;
  const photoH = h * 0.175;

  for (let i = 0; i < 3; i++) {
    const left = Math.round(leftPad + i * (cardW + gap) + cardW * 0.055);
    const width = Math.round(cardW * 0.89);
    const top = Math.round(photoTop);
    const height = Math.round(photoH);
    await sharp(src)
      .extract({ left, top, width, height })
      .resize(1200, 640, { fit: "cover" })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(outDir, names[i]));
    console.log("wrote", names[i], { left, top, width, height });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
