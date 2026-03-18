import { UserPlus, FileUp, ScanFace, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Account",
    description:
      "Sign up with your email and basic information. Verify your email address to get started.",
  },
  {
    icon: FileUp,
    step: "02",
    title: "Upload Documents",
    description:
      "Upload your passport, medical credentials, diplomas, and other required documents securely.",
  },
  {
    icon: ScanFace,
    step: "03",
    title: "Identity Verification",
    description:
      "Complete biometric verification with passport scan, selfie, and liveness check for security.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Get Verified",
    description:
      "Once verified, access job opportunities and connect with UK healthcare employers.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Get Started in 4 Simple Steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our streamlined application process makes it easy to verify your
            credentials and start your healthcare career in the UK.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector Line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 bg-border" />
              )}

              <div className="relative flex flex-col items-center text-center">
                {/* Step Number */}
                <div className="relative mb-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white border-2 border-primary shadow-lg">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
