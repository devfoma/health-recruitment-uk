"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getUserByEmail,
  createSession,
  getSession,
  deleteSession,
  getUserById,
  addUser,
  generateVerificationCode,
  storeVerificationCode,
  verifyCode,
  markUserAsVerified,
} from "./mock-data";
import { sendVerificationEmail } from "../email/resend";
import type { User } from "./types";

const SESSION_COOKIE = "health_recruit_session";

export async function login(
  _prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const user = getUserByEmail(email);
  if (!user || user.password !== password) {
    return { error: "Invalid email or password" };
  }

  const sessionId = createSession(user.id);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  // Redirect based on role
  if (user.role === "admin") {
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}

export async function register(
  _prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const country = formData.get("country") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const terms = formData.get("terms");

  if (!fullName || !email || !password || !confirmPassword) {
    return { error: "All required fields must be filled" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long" };
  }

  if (!terms) {
    return { error: "You must agree to the terms and conditions" };
  }

  const existingUser = getUserByEmail(email);
  if (existingUser) {
    return { error: "An account with this email already exists" };
  }

  const user = addUser({
    email,
    fullName,
    phone,
    country,
    password,
    role: "applicant",
    isVerified: false,
  });

  // Generate and store verification code
  const verificationCode = generateVerificationCode();
  storeVerificationCode(user.id, verificationCode);

  // Send verification email
  const emailResult = await sendVerificationEmail(email, verificationCode, fullName);
  if (!emailResult.success) {
    console.error("Failed to send verification email:", emailResult.error);
    // Continue anyway - user can resend
  }

  const sessionId = createSession(user.id);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  redirect("/auth/verify");
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  if (sessionId) {
    deleteSession(sessionId);
    cookieStore.delete(SESSION_COOKIE);
  }

  redirect("/");
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionId) return null;

  const session = getSession(sessionId);
  if (!session) return null;

  return getUserById(session.userId);
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/admin-login");
  }
  if (user.role !== "admin") {
    redirect("/dashboard");
  }
  return user;
}

export async function requireApplicant(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }
  if (user.role !== "applicant") {
    redirect("/admin");
  }
  return user;
}

export async function verifyAccount(
  code: string
): Promise<{ success: boolean; error?: string }> {
  const user = await getCurrentUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  if (user.isVerified) {
    return { success: true };
  }

  const result = verifyCode(user.id, code);

  if (!result.valid) {
    return { success: false, error: result.error };
  }

  markUserAsVerified(user.id);
  return { success: true };
}

export async function resendVerificationCode(): Promise<{
  success: boolean;
  error?: string;
}> {
  const user = await getCurrentUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  if (user.isVerified) {
    return { success: false, error: "Account is already verified" };
  }

  // Generate and store new verification code
  const verificationCode = generateVerificationCode();
  storeVerificationCode(user.id, verificationCode);

  // Get full user data including email
  const fullUser = getUserByEmail(user.email);
  if (!fullUser) {
    return { success: false, error: "User not found" };
  }

  // Send verification email
  const emailResult = await sendVerificationEmail(
    user.email,
    verificationCode,
    user.fullName
  );

  if (!emailResult.success) {
    return { success: false, error: "Failed to send verification email" };
  }

  return { success: true };
}
