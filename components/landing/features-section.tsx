import {
  FileCheck,
  ShieldCheck,
  Clock,
  Users,
  Building2,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "Document Verification",
    description:
      "Securely upload and verify your medical credentials, diplomas, and professional certifications with our automated verification system.",
  },
  {
    icon: ShieldCheck,
    title: "Identity Verification",
    description:
      "Multi-layer identity verification including passport scanning, facial recognition, and liveness detection for maximum security.",
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description:
      "Our streamlined verification process ensures quick turnaround times. Most applications are reviewed within 48-72 hours.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description:
      "Get personalized support from our healthcare recruitment specialists who understand the UK medical landscape.",
  },
  {
    icon: Building2,
    title: "NHS & Private Partners",
    description:
      "Access opportunities across NHS trusts and leading private healthcare providers throughout the United Kingdom.",
  },
  {
    icon: BadgeCheck,
    title: "Compliance Ready",
    description:
      "All verifications meet NHS employment standards, CQC requirements, and UK healthcare regulatory guidelines.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
            Platform Features
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Everything You Need to Start Your UK Healthcare Career
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our comprehensive platform handles all aspects of healthcare
            professional verification and recruitment.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border bg-card p-8 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
