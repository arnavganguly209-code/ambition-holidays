import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import path from "path";
import {
  readSessionFromCookieHeader,
  verifySessionToken,
} from "@/lib/orbit-auth";
import { writeUpload } from "@/lib/uploads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

function isAuthed(req: Request) {
  return verifySessionToken(readSessionFromCookieHeader(req.headers.get("cookie")));
}

/** Center-cover crop to exact 9:16 portrait so frames never show empty bars. */
async function loadSharp() {
  const { default: sharp } = await import("sharp");
  return sharp;
}

async function toNineSixteen(buffer: Buffer): Promise<Buffer> {
  const sharp = await loadSharp();
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
    extractW = Math.round(height * targetRatio);
    left = Math.max(0, Math.round((width - extractW) / 2));
  } else if (currentRatio < targetRatio) {
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
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();
}

/** Landscape-friendly web jpeg so Orbit previews and the homepage stay sharp. */
async function toWebPhoto(buffer: Buffer): Promise<Buffer> {
  const sharp = await loadSharp();
  return sharp(buffer, { failOn: "none" })
    .rotate()
    .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
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

  const type = file.type || "";
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const isVideo =
    type.startsWith("video/") || /\.(mp4|webm|mov)$/i.test(file.name || "");

  if (isVideo) {
    if (file.size > 32 * 1024 * 1024) {
      return NextResponse.json({ error: "Video max 32MB" }, { status: 400 });
    }
    const ext = path.extname(file.name || "").toLowerCase();
    const safeExt = [".mp4", ".webm", ".mov"].includes(ext) ? ext : ".mp4";
    const name = `upload-${stamp}${safeExt}`;
    const raw = Buffer.from(await file.arrayBuffer());
    await writeUpload(name, raw);
    revalidatePath("/");
    return NextResponse.json({ url: `/uploads/${name}` });
  }

  if (type && !type.startsWith("image/") && type !== "application/octet-stream") {
    return NextResponse.json({ error: "Images or MP4 video only" }, { status: 400 });
  }

  if (file.size > 12 * 1024 * 1024) {
    return NextResponse.json({ error: "Max 12MB" }, { status: 400 });
  }

  const raw = Buffer.from(await file.arrayBuffer());

  try {
    if (crop === "9x16") {
      const out = await toNineSixteen(raw);
      const name = `upload-${stamp}-9x16.jpg`;
      await writeUpload(name, out);
      revalidatePath("/");
      return NextResponse.json({ url: `/uploads/${name}` });
    }

    const out = await toWebPhoto(raw);
    const name = `upload-${stamp}.jpg`;
    await writeUpload(name, out);
    revalidatePath("/");
    return NextResponse.json({ url: `/uploads/${name}` });
  } catch {
    return NextResponse.json(
      { error: "Could not process that image. Try a JPG or PNG." },
      { status: 400 },
    );
  }
}
