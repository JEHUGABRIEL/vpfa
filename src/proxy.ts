import { type NextRequest, NextResponse } from "next/server";
import { readSession, SESSION_COOKIE } from "@/lib/auth/token";

// Optimistic check only: pages and actions verify the admin again in requireAdmin().
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const session = await readSession(request.cookies.get(SESSION_COOKIE)?.value);

  if (!session && !isLogin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (session && isLogin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
