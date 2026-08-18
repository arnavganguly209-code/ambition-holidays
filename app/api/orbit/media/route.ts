import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readContent, scrubUploadRefs, writeContent } from "@/lib/content";
import { UPLOAD_DIRS, safeUploadName } from "@/lib/uploads";
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

  const filename = safeUploadName(path.basename(publicPath));
  if (!filename) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }
  for (const dir of UPLOAD_DIRS) {
    try {
      await fs.unlink(path.join(dir, filename));
    } catch {
      // file may already be gone
    }
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
  cleaned.journeys.packages = cleaned.journeys.packages.map((pkg) =>
    pkg.imageSrc === publicPath
      ? { ...pkg, imageSrc: "/images/packages/everest.jpg" }
      : pkg,
  );

  const saved = await writeContent(cleaned);
  revalidatePath("/");
  return NextResponse.json(saved);
}

export async function GET(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const names = new Set<string>();
  for (const dir of UPLOAD_DIRS) {
    try {
      await fs.mkdir(dir, { recursive: true });
      const files = await fs.readdir(dir);
      for (const file of files) {
        if (!file.startsWith(".")) names.add(file);
      }
    } catch {
      // directory may not exist yet
    }
  }

  return NextResponse.json({
    files: Array.from(names).map((file) => `/uploads/${file}`),
  });
}
