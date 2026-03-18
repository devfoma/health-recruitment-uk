import Link from "next/link";
import { Stethoscope, Shield, Lock, CheckCircle } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <Stethoscope className="h-6 w-6" />
            </div>
            <span className="text-lg font-bold text-foreground">
              Health Recruitment UK
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        {children}
      </main>

      {/* Trust Badges Footer */}
      <footer className="py-6 border-t border-border">
        <div className="flex justify-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-1 text-xs">
            <Shield className="h-4 w-4" />
            <span className="font-medium uppercase tracking-tight">
              NHS Partner
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Lock className="h-4 w-4" />
            <span className="font-medium uppercase tracking-tight">
              Secure SSL
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <CheckCircle className="h-4 w-4" />
            <span className="font-medium uppercase tracking-tight">
              Data Protected
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
