import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

/**
 * Next.js 16 Proxy (formerly middleware).
 * Runs on Node.js runtime — protects all /portal/* routes recursively.
 * Unauthenticated requests are redirected to /portal/login.
 * Authenticated users visiting /portal/login are bounced to /portal.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPortalRoute = pathname.startsWith("/portal");
  const isLoginPage = pathname === "/portal/login";

  if (!isPortalRoute) {
    return NextResponse.next();
  }

  const session = await auth();

  if (isLoginPage) {
    // Already authenticated — redirect to dashboard
    if (session?.user) {
      return NextResponse.redirect(new URL("/portal", request.url));
    }
    return NextResponse.next();
  }

  // All other /portal/* routes require authentication
  if (!session?.user) {
    const loginUrl = new URL("/portal/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};
