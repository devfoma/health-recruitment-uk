import { RegisterForm } from "@/components/auth/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account - Health Recruitment UK",
  description:
    "Create your Health Recruitment UK account and start your healthcare career journey",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
