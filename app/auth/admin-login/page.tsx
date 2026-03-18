import { AdminLoginForm } from "@/components/auth/admin-login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login - Health Recruitment UK",
  description: "Admin portal login for Health Recruitment UK",
};

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}
