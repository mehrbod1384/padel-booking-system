import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const publicRoutes = ["/login", "/verify-otp"];

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token");

  const pathname = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  let isTokenValid = false;
  if (token) {
    try {
      jwt.verify(token.value, process.env.JWT_SECRET!);
      isTokenValid = true;
    } catch {
      isTokenValid = false;
    }
  }

  if (!isTokenValid && !isPublicRoute) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    if (token) response.cookies.delete("token");
    return response;
  }

  if (isTokenValid && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
