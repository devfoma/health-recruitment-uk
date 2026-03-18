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
} from "./mock-data";
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
