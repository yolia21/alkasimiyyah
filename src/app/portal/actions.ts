"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  verifyCitizen,
  createSessionToken,
  verifySessionToken,
  SESSION_COOKIE,
} from "@/lib/auth";

// ─── Sign In ──────────────────────────────────────────────────────────────────

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const civilId = (formData.get("civilId") as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null) ?? "";

  const citizen = await verifyCitizen(civilId, password);

  if (!citizen) {
    return "Invalid Civil ID or password. Please try again.";
  }

  const token = await createSessionToken(citizen);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 8 * 60 * 60, // 8 hours
  });

  redirect("/portal");
}

// ─── Sign Out ─────────────────────────────────────────────────────────────────

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/portal/login");
}

// ─── Get current session (server-side) ───────────────────────────────────────

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
