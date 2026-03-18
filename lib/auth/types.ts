export type UserRole = "applicant" | "admin";

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  country?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: Date;
}

export interface Session {
  user: User;
  expiresAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
