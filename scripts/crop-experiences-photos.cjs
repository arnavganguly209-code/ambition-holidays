const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const src =
  process.argv[2] ||
  String.raw`C:\Users\Admin\.cursor\projects\c-Users-Admin-Desktop-ARNAB-ambition-holidays\assets\c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_ChatGPT_Image_Aug_22__2026__09_59_39_PM-632fea4c-a890-4846-be5e-a8dc6c8f8828.png`;

const outDir = path.join(__dirname, "..", "public", "images", "experiences");

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const meta = await sharp(src).metadata();
  const w = meta.width;
  const h = meta.height;
  console.log("src", w, h);

  const names = [
    "heli.jpg",
    "lodges.jpg",
    "culture.jpg",
    "flights.jpg",
    "wellness.jpg",
    "wildlife.jpg",
  ];

  // Mockup: 6 cards in a row. Photo sits under the gold icon, above the title.
  const leftPad = w * 0.062;
  const rightPad = w * 0.062;
  const gap = w * 0.0145;
  const usable = w - leftPad - rightPad;
  const cardW = (usable - gap * 5) / 6;
  const photoTop = h * 0.348;
  const photoH = h * 0.168;

  for (let i = 0; i < 6; i++) {
    const left = Math.round(leftPad + i * (cardW + gap) + cardW * 0.12);
    const width = Math.round(cardW * 0.76);
    const top = Math.round(photoTop);
    const height = Math.round(photoH);
    await sharp(src)
      .extract({ left, top, width, height })
      .resize(720, 520, { fit: "cover" })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(outDir, names[i]));
    console.log("wrote", names[i], { left, top, width, height });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
