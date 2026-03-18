import {
  FileBarChart,
  TrendingUp,
  Users,
  FileCheck,
  Download,
  Calendar,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports & Analytics - Health Recruitment UK",
  description: "View recruitment analytics and reports",
};

const monthlyData = [
  { month: "Jan", applications: 120, verified: 85, rejected: 15 },
  { month: "Feb", applications: 145, verified: 102, rejected: 18 },
  { month: "Mar", applications: 168, verified: 125, rejected: 22 },
  { month: "Apr", applications: 192, verified: 148, rejected: 19 },
  { month: "May", applications: 215, verified: 178, rejected: 24 },
  { month: "Jun", applications: 248, verified: 195, rejected: 28 },
];

export default function ReportsPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <FileBarChart className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground text-sm">
              Track recruitment performance and trends
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-border px-5 py-2.5 rounded-full text-sm font-bold text-foreground hover:bg-muted transition-colors">
            <Calendar className="h-4 w-4" />
            Last 6 Months
          </button>
          <button className="flex items-center gap-2 bg-primary px-6 py-2.5 rounded-full text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Total Applications
            </span>
          </div>
          <p className="text-3xl font-bold text-foreground">1,088</p>
          <p className="text-sm text-primary font-semibold mt-1">
            +23% from last period
          </p>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <FileCheck className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Verified Applicants
            </span>
          </div>
          <p className="text-3xl font-bold text-foreground">833</p>
          <p className="text-sm text-primary font-semibold mt-1">
            76.6% verification rate
          </p>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Avg. Processing Time
            </span>
          </div>
          <p className="text-3xl font-bold text-foreground">2.4 days</p>
          <p className="text-sm text-primary font-semibold mt-1">
            -0.5 days from last month
          </p>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white rounded-xl border border-border">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">
            Monthly Breakdown
          </h2>
          <p className="text-sm text-muted-foreground">
            Application trends over the last 6 months
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Month
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Applications
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Verified
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Rejected
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Success Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {monthlyData.map((row) => (
                <tr key={row.month} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-foreground">
                    {row.month} 2024
                  </td>
                  <td className="px-6 py-4 text-foreground">
                    {row.applications}
                  </td>
                  <td className="px-6 py-4 text-primary font-semibold">
                    {row.verified}
                  </td>
                  <td className="px-6 py-4 text-red-500 font-semibold">
                    {row.rejected}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${Math.round((row.verified / row.applications) * 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {Math.round((row.verified / row.applications) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
