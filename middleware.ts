import { NextResponse, type NextRequest } from "next/server";

// Page protection lives in app/orbit/(protected)/layout.tsx (Node runtime).
// This middleware only blocks unauthenticated API calls with a lightweight cookie presence check;
// full HMAC verification happens in each API route (Node).

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/api/orbit/")) {
    return NextResponse.next();
  }

  if (pathname === "/api/orbit/login") {
    return NextResponse.next();
  }

  const hasCookie = Boolean(request.cookies.get("orbit_session")?.value);
  if (!hasCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/orbit/:path*"],
};
