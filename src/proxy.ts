import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Next.js 16 Proxy (replaces middleware.ts).
 * Reads the JWT session token directly — avoids circular dependency
 * of calling auth() inside the proxy itself.
 *
 * Protects all /portal/* routes recursively.
 * Unauthenticated → redirect to /portal/login.
 * Authenticated visiting /portal/login → redirect to /portal dashboard.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/portal")) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === "/portal/login";

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const isAuthenticated = !!token;

  if (isLoginPage) {
    // Already authenticated — bounce to dashboard
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/portal", request.url));
    }
    return NextResponse.next();
  }

  // All other /portal/* routes require authentication
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/portal/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};
