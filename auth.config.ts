import type { NextAuthConfig } from "next-auth";

/**
 * Base NextAuth config — consumed by src/auth.ts (full config).
 * In Next.js 16, proxy.ts runs on Node.js runtime so there is no
 * need for a separate edge-safe split; this file exists purely as
 * a shared base config to keep src/auth.ts clean.
 */
export const authConfig = {
  pages: {
    signIn: "/portal/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  providers: [],
  callbacks: {},
} satisfies NextAuthConfig;
