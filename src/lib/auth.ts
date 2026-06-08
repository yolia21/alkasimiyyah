import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

// ─── Mock Citizen Database ────────────────────────────────────────────────────
// Admin-provisioned. No self-registration.
// To add a citizen, generate a hash:
//   node -e "const b=require('bcryptjs');console.log(b.hashSync('PASSWORD',12));"

export const CITIZENS = [
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
];

export type CitizenSession = {
  civilId: string;
  name: string;
  role: string;
};

// ─── JWT helpers ─────────────────────────────────────────────────────────────

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "fallback-secret-replace-in-production"
);

export const SESSION_COOKIE = "kasimid_session";
const SESSION_DURATION = 8 * 60 * 60; // 8 hours in seconds

export async function createSessionToken(citizen: CitizenSession): Promise<string> {
  return new SignJWT({ ...citizen })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(SECRET_KEY);
}

export async function verifySessionToken(token: string): Promise<CitizenSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      civilId: payload.civilId as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

// ─── Credential verification ──────────────────────────────────────────────────

export async function verifyCitizen(
  civilId: string,
  password: string
): Promise<CitizenSession | null> {
  const citizen = CITIZENS.find(
    (c) => c.civilId.toLowerCase() === civilId.trim().toLowerCase()
  );
  if (!citizen) return null;

  const match = await bcrypt.compare(password, citizen.passwordHash);
  if (!match) return null;

  return { civilId: citizen.civilId, name: citizen.name, role: citizen.role };
}
