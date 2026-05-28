import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAuthRoute = req.nextUrl.pathname.startsWith("/api/protected");

  if (isAuthRoute && !token) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  return NextResponse.next();
}
