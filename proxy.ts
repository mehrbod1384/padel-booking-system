import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "./lib/auth";

const publicRoutes = ["/login", "/verify-otp"];

export async function proxy(req: NextRequest) {
  const User = await getUserFromToken();

  const pathname = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!User && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (User && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
