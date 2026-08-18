import { NextResponse } from "next/server";
import { contentTypeFor, readUpload, safeUploadName } from "@/lib/uploads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Props = {
  params: Promise<{ filename: string }>;
};

export async function GET(_req: Request, { params }: Props) {
  const { filename } = await params;
  const safe = safeUploadName(filename);
  if (!safe) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  const data = await readUpload(safe);
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type": contentTypeFor(safe),
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
