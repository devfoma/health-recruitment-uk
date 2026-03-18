"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { login } from "@/lib/auth/actions";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(login, {
    error: null,
  });

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
        {/* Header Illustration */}
        <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center">
            <Lock className="h-8 w-8 text-primary" />
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to access your application dashboard
            </p>
          </div>

          {state.error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-foreground">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className="w-full pl-12 pr-12 py-3.5 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember"
                className="text-sm text-muted-foreground"
              >
                Keep me logged in for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-bold py-4 rounded-full transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-primary font-semibold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 rounded-lg bg-muted border border-border">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Demo Credentials:
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Applicant:</strong> applicant@healthrecruit.uk /
              password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
