import Link from "next/link";
import {
  Users,
  Download,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Ban,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applicant Management - Health Recruitment UK",
  description: "Manage healthcare professional applicants",
};

const applicants = [
  {
    id: "44321",
    name: "Dr. Sarah Jenkins",
    role: "General Practitioner",
    email: "sarah.jenkins@email.com",
    status: "pending",
    progress: 65,
    date: "2024-01-15",
  },
  {
    id: "44322",
    name: "Nurse Michael Smith",
    role: "Registered Nurse",
    email: "m.smith@email.com",
    status: "verified",
    progress: 100,
    date: "2024-01-14",
  },
  {
    id: "44323",
    name: "James Wilson",
    role: "Physical Therapist",
    email: "j.wilson@email.com",
    status: "blocked",
    progress: 20,
    date: "2024-01-13",
  },
  {
    id: "44324",
    name: "Dr. Elena Rodriguez",
    role: "Pediatrician",
    email: "elena.r@email.com",
    status: "pending",
    progress: 85,
    date: "2024-01-12",
  },
  {
    id: "44325",
    name: "Dr. Aisha Patel",
    role: "Cardiologist",
    email: "a.patel@email.com",
    status: "verified",
    progress: 100,
    date: "2024-01-11",
  },
  {
    id: "44326",
    name: "Nurse David Chen",
    role: "ICU Nurse",
    email: "d.chen@email.com",
    status: "pending",
    progress: 55,
    date: "2024-01-10",
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

export default function ApplicantsPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Applicant Management
            </h1>
            <p className="text-muted-foreground text-sm">
              Verified healthcare professionals database
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-border">
          <button className="px-6 py-2 rounded-full text-sm font-bold bg-primary text-white">
            All Applicants
          </button>
          <button className="px-6 py-2 rounded-full text-sm font-bold text-muted-foreground hover:bg-muted transition-colors">
            Pending
          </button>
          <button className="px-6 py-2 rounded-full text-sm font-bold text-muted-foreground hover:bg-muted transition-colors">
            Verified
          </button>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-border px-5 py-2.5 rounded-full text-sm font-bold text-foreground hover:bg-muted transition-colors shadow-sm">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 bg-primary px-6 py-2.5 rounded-full text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" />
            Add New
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Name & Role
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Verification Progress
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {applicants.map((applicant) => (
                <tr
                  key={applicant.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-5">
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
                  </td>
                  <td className="px-6 py-5">
                    {getStatusBadge(applicant.status)}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-32">
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
                      <span className="text-xs font-bold text-foreground">
                        {applicant.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/applicants/${applicant.id}`}
                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      {applicant.status === "pending" && (
                        <>
                          <button
                            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      {applicant.status === "blocked" ? (
                        <button className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all">
                          Unblock
                        </button>
                      ) : (
                        <button
                          className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Block"
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between bg-muted/50 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground">
            Showing <span className="font-bold text-foreground">6</span> of{" "}
            <span className="font-bold text-foreground">248</span> applicants
          </p>
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-full border border-border text-muted-foreground hover:bg-white transition-all disabled:opacity-50"
              disabled
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
              1
            </button>
            <button className="px-3 py-1 rounded-full text-xs font-bold text-muted-foreground hover:bg-muted transition-colors">
              2
            </button>
            <button className="px-3 py-1 rounded-full text-xs font-bold text-muted-foreground hover:bg-muted transition-colors">
              3
            </button>
            <button className="p-2 rounded-full border border-border text-muted-foreground hover:bg-white transition-all">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
