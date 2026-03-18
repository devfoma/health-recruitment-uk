import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Shield,
  Download,
  Eye,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applicant Profile - Health Recruitment UK",
  description: "View applicant details and documents",
};

// Mock applicant data
const applicant = {
  id: "44321",
  name: "Dr. Sarah Jenkins",
  role: "General Practitioner",
  email: "sarah.jenkins@email.com",
  phone: "+44 7700 900123",
  country: "United Kingdom",
  joinDate: "January 15, 2024",
  status: "pending",
  progress: 65,
  documents: [
    { name: "Passport Copy", status: "verified", date: "Jan 12, 2024" },
    { name: "Medical Diploma", status: "pending", date: "Jan 14, 2024" },
    { name: "Academic Transcript", status: "verified", date: "Jan 13, 2024" },
    { name: "Proof of Income", status: "verified", date: "Jan 15, 2024" },
    { name: "Birth Certificate", status: "required", date: null },
    { name: "Vaccination Record", status: "required", date: null },
  ],
  verification: {
    identity: true,
    documents: false,
    background: false,
  },
};

function getDocumentStatusBadge(status: string) {
  switch (status) {
    case "verified":
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
          <CheckCircle className="h-4 w-4" />
          Verified
        </span>
      );
    case "pending":
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
          <Clock className="h-4 w-4" />
          Pending
        </span>
      );
    case "required":
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
          <XCircle className="h-4 w-4" />
          Not Uploaded
        </span>
      );
    default:
      return null;
  }
}

export default function ApplicantDetailPage() {
  return (
    <div>
      {/* Back Button */}
      <Link
        href="/admin/applicants"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Applicants
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
              SJ
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {applicant.name}
              </h1>
              <p className="text-muted-foreground">
                {applicant.role} - #{applicant.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 rounded-full border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-colors">
              Reject
            </button>
            <button className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Approve Application
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Application Progress
            </span>
            <span className="text-sm font-bold text-primary">
              {applicant.progress}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${applicant.progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contact Information */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{applicant.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{applicant.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Country</p>
                <p className="font-medium text-foreground">
                  {applicant.country}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Joined</p>
                <p className="font-medium text-foreground">
                  {applicant.joinDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Verification Status
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">
                  Identity Verification
                </span>
              </div>
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-amber-600" />
                <span className="font-medium text-foreground">
                  Document Verification
                </span>
              </div>
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium text-foreground">
                  Background Check
                </span>
              </div>
              <XCircle className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Admin Notes */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Admin Notes
          </h2>
          <textarea
            className="w-full h-32 p-3 rounded-lg bg-muted border border-border text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="Add notes about this applicant..."
          />
          <button className="mt-3 w-full py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
            Save Notes
          </button>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-xl border border-border mt-6">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">
            Uploaded Documents
          </h2>
          <p className="text-sm text-muted-foreground">
            Review and verify applicant documents
          </p>
        </div>
        <div className="divide-y divide-border">
          {applicant.documents.map((doc) => (
            <div
              key={doc.name}
              className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.date || "Not uploaded"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {getDocumentStatusBadge(doc.status)}
                {doc.status !== "required" && (
                  <div className="flex gap-2">
                    <button
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
