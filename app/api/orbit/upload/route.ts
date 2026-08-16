import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  readSessionFromCookieHeader,
  verifySessionToken,
} from "@/lib/orbit-auth";

export const dynamic = "force-dynamic";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function isAuthed(req: Request) {
  return verifySessionToken(readSessionFromCookieHeader(req.headers.get("cookie")));
}

/** Center-cover crop to exact 9:16 portrait so frames never show empty bars. */
async function toNineSixteen(buffer: Buffer): Promise<Buffer> {
  const image = sharp(buffer, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  const width = meta.width ?? 1080;
  const height = meta.height ?? 1920;
  const targetRatio = 9 / 16;
  const currentRatio = width / height;

  let extractW = width;
  let extractH = height;
  let left = 0;
  let top = 0;

  if (currentRatio > targetRatio) {
    // too wide — crop sides
    extractW = Math.round(height * targetRatio);
    left = Math.max(0, Math.round((width - extractW) / 2));
  } else if (currentRatio < targetRatio) {
    // too tall — crop top/bottom
    extractH = Math.round(width / targetRatio);
    top = Math.max(0, Math.round((height - extractH) / 2));
  }

  return sharp(buffer, { failOn: "none" })
    .rotate()
    .extract({
      left,
      top,
      width: Math.min(extractW, width),
      height: Math.min(extractH, height),
    })
    .resize(1080, 1920, { fit: "fill" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
}

export async function POST(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  const crop = String(form.get("crop") || "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Images only" }, { status: 400 });
  }

  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Max 8MB" }, { status: 400 });
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const raw = Buffer.from(await file.arrayBuffer());

  let out: Buffer;
  let name: string;

  if (crop === "9x16") {
    out = await toNineSixteen(raw);
    name = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}-9x16.jpg`;
  } else {
    out = raw;
    const ext = path.extname(file.name || "").toLowerCase() || ".jpg";
    const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)
      ? ext
      : ".jpg";
    name = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${safeExt}`;
  }

  await fs.writeFile(path.join(UPLOAD_DIR, name), out);

  const publicPath = `/uploads/${name}`;
  revalidatePath("/");
  return NextResponse.json({ url: publicPath });
}
