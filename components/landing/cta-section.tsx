import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 px-8 py-16 lg:px-16 lg:py-24">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          <div className="relative text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl text-balance">
              Ready to Start Your UK Healthcare Career?
            </h2>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Join thousands of healthcare professionals who have successfully
              verified their credentials and found opportunities across the UK.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-primary shadow-lg hover:bg-white/90 transition-all group"
              >
                Create Free Account
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition-all"
              >
                Sign In to Dashboard
              </Link>
            </div>

            <p className="mt-6 text-sm text-white/60">
              No credit card required. Free to create an account and start your
              application.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
