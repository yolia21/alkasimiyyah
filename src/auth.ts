import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

/**
 * Mock citizen database — admin-provisioned, no self-registration.
 * Passwords are stored as bcrypt hashes (cost factor 12).
 *
 * To add a citizen, generate a hash:
 *   node -e "const b=require('bcryptjs');console.log(b.hashSync('PASSWORD',12));"
 * then append an entry to CITIZENS below.
 */
const CITIZENS = [
  {
    civilId: "KS-001",
    name: "Sultan Yusuf I",
    passwordHash: "$2b$12$U5XPrado3mU1rAmlni1nOeLs98YHj4gNHuRvW7HS1cWUxqKLBPiZG",
    role: "Sultan",
  },
  {
    civilId: "KS-002",
    name: "Ali Al Masry",
    passwordHash: "$2b$12$/AGgbAoGt1ZNVsbmyza2Ze7e/XZh6n210HOIxG8crHxwsxNWcAzsK",
    role: "Grand Vizier",
  },
  {
    civilId: "KS-003",
    name: "Habibullah Mikail Al-Asad",
    passwordHash: "$2b$12$A8fenYrScfhmBsFWSlIYmeNBWlRccdb6jtemcaEvjqFAUn4SzeWci",
    role: "Shura Chairman",
  },
] as const;

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Required for non-Vercel / local deployments — prevents "Configuration" error
  trustHost: true,

  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: "/portal/login",
    error: "/portal/login", // redirect auth errors back to our login page
  },

  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8-hour sessions
  },

  providers: [
    Credentials({
      name: "Civil ID",
      credentials: {
        civilId: { label: "Civil ID Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const civilId = (credentials?.civilId as string | undefined)?.trim();
        const password = credentials?.password as string | undefined;

        if (!civilId || !password) return null;

        const citizen = CITIZENS.find(
          (c) => c.civilId.toLowerCase() === civilId.toLowerCase()
        );

        if (!citizen) return null;

        const passwordsMatch = await bcrypt.compare(password, citizen.passwordHash);
        if (!passwordsMatch) return null;

        return {
          id: citizen.civilId,
          name: citizen.name,
          email: `${citizen.civilId.toLowerCase()}@kasimid.gov`,
          civilId: citizen.civilId,
          role: citizen.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // On first sign-in, user object is available — persist extra fields to token
      if (user) {
        token.civilId = (user as { civilId?: string }).civilId;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        (session.user as { civilId?: string; role?: string }).civilId =
          token.civilId as string;
        (session.user as { civilId?: string; role?: string }).role =
          token.role as string;
      }
      return session;
    },
  },
});
