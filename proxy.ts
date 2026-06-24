import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/verify-otp"];

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token");

  const pathname = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
