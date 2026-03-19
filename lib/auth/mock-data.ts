import type { User } from "./types";

// Mock users for demonstration - in production, use a real database
export const mockUsers: (User & { password: string })[] = [
  {
    id: "user-1",
    email: "applicant@healthrecruit.uk",
    password: "Demo@Health2024!",
    fullName: "Dr. Sarah Ahmed",
    phone: "+44 7700 900123",
    country: "UK",
    role: "applicant",
    isVerified: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "admin-1",
    email: "admin@healthrecruit.uk",
    password: "Admin@Secure2024!",
    fullName: "System Administrator",
    phone: "+44 7700 900001",
    country: "UK",
    role: "admin",
    isVerified: true,
    createdAt: new Date("2023-06-01"),
  },
];

// Simple session storage (in production, use secure HTTP-only cookies with JWT or session tokens)
const sessions = new Map<string, { userId: string; expiresAt: Date }>();

export function createSession(userId: string): string {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  sessions.set(sessionId, { userId, expiresAt });
  return sessionId;
}

export function getSession(
  sessionId: string
): { userId: string; expiresAt: Date } | null {
  const session = sessions.get(sessionId);
  if (!session) return null;
  if (session.expiresAt < new Date()) {
    sessions.delete(sessionId);
    return null;
  }
  return session;
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}

export function getUserById(id: string): User | null {
  const user = mockUsers.find((u) => u.id === id);
  if (!user) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function getUserByEmail(
  email: string
): (User & { password: string }) | null {
  return mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function addUser(
  userData: Omit<User, "id" | "createdAt"> & { password: string }
): User {
  const newUser = {
    ...userData,
    id: `user-${Date.now()}`,
    createdAt: new Date(),
  };
  mockUsers.push(newUser);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}
