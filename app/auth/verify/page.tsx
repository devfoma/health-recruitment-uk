"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Stethoscope, ShieldCheck, Loader2, CheckCircle2 } from "lucide-react";
import { verifyAccount, resendVerificationCode } from "@/lib/auth/actions";

export default function VerifyPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newCode[i] = char;
    });
    setCode(newCode);

    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const result = await verifyAccount(verificationCode);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "Verification failed");
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError(null);
    setSuccess(null);

    const result = await resendVerificationCode();

    if (result.success) {
      setSuccess("A new verification code has been sent to your email.");
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } else {
      setError(result.error || "Failed to resend code");
    }

    setIsResending(false);
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
          <Stethoscope className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-foreground">
          Health Recruitment UK
        </h2>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Verify Your Account
          </h1>
          <p className="text-muted-foreground text-sm">
            We sent a 6-digit verification code to your registered email
            address. Please check your inbox and spam folder.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="block text-center text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
              Enter Verification Code
            </label>
            <div className="flex justify-between gap-2 sm:gap-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-2xl font-bold border-b-2 border-border bg-transparent focus:border-primary focus:ring-0 transition-all outline-none text-foreground"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || code.some((d) => !d)}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-bold py-4 rounded-full transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <span>Verify Account</span>
                <ShieldCheck className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {"Didn't receive the code? "}
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-primary font-semibold hover:underline disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend Code"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
