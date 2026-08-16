import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readContent, writeContent } from "@/lib/content";
import type { SiteContent } from "@/lib/content-types";
import {
  readSessionFromCookieHeader,
  verifySessionToken,
} from "@/lib/orbit-auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isAuthed(req: Request) {
  const token = readSessionFromCookieHeader(req.headers.get("cookie"));
  return verifySessionToken(token);
}

export async function GET() {
  const content = await readContent();
  return NextResponse.json(content, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  });
}

export async function POST(req: Request) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: SiteContent;
  try {
    body = (await req.json()) as SiteContent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const saved = await writeContent(body);
  revalidatePath("/");
  revalidatePath("/orbit");
  return NextResponse.json(saved, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
