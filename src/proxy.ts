import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "kasimid_session";

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "fallback-secret-replace-in-production"
);

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, SECRET_KEY);
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/portal")) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === "/portal/login";
  const authed = await isAuthenticated(request);

  if (isLoginPage) {
    // Already logged in → go to dashboard
    if (authed) {
      return NextResponse.redirect(new URL("/portal", request.url));
    }
    return NextResponse.next();
  }

  // All other /portal/* routes require auth
  if (!authed) {
    return NextResponse.redirect(new URL("/portal/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};
