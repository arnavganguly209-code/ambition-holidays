import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readContent, scrubUploadRefs, writeContent } from "@/lib/content";
import {
  readSessionFromCookieHeader,
  verifySessionToken,
} from "@/lib/orbit-auth";

export const dynamic = "force-dynamic";

function isAuthed(req: Request) {
  return verifySessionToken(readSessionFromCookieHeader(req.headers.get("cookie")));
}

export async function DELETE(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let publicPath = "";
  try {
    const body = (await req.json()) as { path?: string };
    publicPath = typeof body.path === "string" ? body.path : "";
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!publicPath.startsWith("/uploads/")) {
    return NextResponse.json({ error: "Only uploads can be deleted" }, { status: 400 });
  }

  const filename = path.basename(publicPath);
  const abs = path.join(process.cwd(), "public", "uploads", filename);
  try {
    await fs.unlink(abs);
  } catch {
    // file may already be gone
  }

  const content = await readContent();
  const cleaned = scrubUploadRefs(content, publicPath);
  // Also remove matching signature images by src
  cleaned.signature.images = cleaned.signature.images.filter(
    (img) => img.src !== publicPath,
  );
  cleaned.hero.stats = cleaned.hero.stats.map((stat) =>
    stat.iconSrc === publicPath ? { ...stat, iconSrc: undefined } : stat,
  );
  if (cleaned.header.logoSrc === publicPath) {
    cleaned.header.logoSrc = "/images/ambition-holiday-logo.png";
  }

  const saved = await writeContent(cleaned);
  revalidatePath("/");
  return NextResponse.json(saved);
}

export async function GET(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  try {
    await fs.mkdir(dir, { recursive: true });
    const files = await fs.readdir(dir);
    return NextResponse.json({
      files: files
        .filter((f) => !f.startsWith("."))
        .map((f) => `/uploads/${f}`),
    });
  } catch {
    return NextResponse.json({ files: [] });
  }
}
