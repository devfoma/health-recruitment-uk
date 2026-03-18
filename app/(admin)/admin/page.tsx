import {
  Users,
  UserCheck,
  Clock,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Health Recruitment UK",
  description: "Admin dashboard overview",
};

const stats = [
  {
    label: "Total Applicants",
    value: "1,248",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Verified",
    value: "892",
    change: "+8%",
    trend: "up",
    icon: UserCheck,
  },
  {
    label: "Pending Review",
    value: "234",
    change: "-5%",
    trend: "down",
    icon: Clock,
  },
  {
    label: "Requires Action",
    value: "122",
    change: "+3%",
    trend: "up",
    icon: AlertTriangle,
  },
];

const recentApplicants = [
  {
    id: "44321",
    name: "Dr. Sarah Jenkins",
    role: "General Practitioner",
    status: "pending",
    progress: 65,
  },
  {
    id: "44322",
    name: "Nurse Michael Smith",
    role: "Registered Nurse",
    status: "verified",
    progress: 100,
  },
  {
    id: "44323",
    name: "James Wilson",
    role: "Physical Therapist",
    status: "blocked",
    progress: 20,
  },
  {
    id: "44324",
    name: "Dr. Elena Rodriguez",
    role: "Pediatrician",
    status: "pending",
    progress: 85,
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "verified":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Verified
        </span>
      );
    case "pending":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Pending
        </span>
      );
    case "blocked":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-muted text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
          Blocked
        </span>
      );
    default:
      return null;
  }
}

export default function AdminDashboardPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your recruitment pipeline.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-border p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <stat.icon className="h-6 w-6" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-semibold ${
                  stat.trend === "up" ? "text-primary" : "text-red-500"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Applicants */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Recent Applicants
              </h2>
              <p className="text-sm text-muted-foreground">
                Latest applications requiring attention
              </p>
            </div>
            <a
              href="/admin/applicants"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View All
            </a>
          </div>
          <div className="divide-y divide-border">
            {recentApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {applicant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {applicant.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {applicant.role} - #{applicant.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            applicant.status === "verified"
                              ? "bg-primary"
                              : applicant.status === "blocked"
                                ? "bg-muted-foreground"
                                : "bg-primary"
                          }`}
                          style={{ width: `${applicant.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {applicant.progress}%
                      </span>
                    </div>
                  </div>
                  {getStatusBadge(applicant.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              Pipeline Status
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Document Verification
                </span>
                <span className="text-sm font-semibold text-foreground">
                  78%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "78%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Identity Verification
                </span>
                <span className="text-sm font-semibold text-foreground">
                  65%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "65%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Background Check
                </span>
                <span className="text-sm font-semibold text-foreground">
                  45%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: "45%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Final Approval
                </span>
                <span className="text-sm font-semibold text-foreground">
                  32%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: "32%" }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Avg. Processing Time
              </span>
              <span className="font-bold text-foreground">2.4 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
