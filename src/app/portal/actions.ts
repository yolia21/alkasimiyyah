"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      civilId: formData.get("civilId"),
      password: formData.get("password"),
      redirectTo: "/portal",
    });
  } catch (error) {
    // signIn throws a NEXT_REDIRECT on success — re-throw it so Next.js handles the redirect
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid Civil ID or password. Please try again.";
        default:
          return "An authentication error occurred. Please try again.";
      }
    }
    // Re-throw redirect errors (this is normal for successful sign-in)
    throw error;
  }
}
