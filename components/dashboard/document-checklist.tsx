import Link from "next/link";
import {
  User,
  GraduationCap,
  Wallet,
  HeartPulse,
  Plane,
  Camera,
  Baby,
  Award,
  FileText,
  Receipt,
  CreditCard,
  Syringe,
  CheckCircle,
  Clock,
  Upload,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

type DocumentStatus = "verified" | "pending" | "required";

interface Document {
  id: string;
  name: string;
  icon: typeof User;
  status: DocumentStatus;
  date?: string;
}

interface DocumentSection {
  title: string;
  icon: typeof User;
  documents: Document[];
}

const documentSections: DocumentSection[] = [
  {
    title: "Personal Documents",
    icon: User,
    documents: [
      {
        id: "passport",
        name: "Passport Copy",
        icon: Plane,
        status: "verified",
        date: "12 Oct 2023",
      },
      {
        id: "photo",
        name: "Passport Photo",
        icon: Camera,
        status: "verified",
        date: "12 Oct 2023",
      },
      {
        id: "birth-cert",
        name: "Birth Certificate",
        icon: Baby,
        status: "required",
      },
    ],
  },
  {
    title: "Education Documents",
    icon: GraduationCap,
    documents: [
      {
        id: "diploma",
        name: "Medical Diploma",
        icon: Award,
        status: "pending",
      },
      {
        id: "transcript",
        name: "Academic Transcript",
        icon: FileText,
        status: "verified",
        date: "14 Oct 2023",
      },
    ],
  },
  {
    title: "Financial Documents",
    icon: Wallet,
    documents: [
      {
        id: "income",
        name: "Proof of Income",
        icon: Receipt,
        status: "verified",
        date: "15 Oct 2023",
      },
      {
        id: "bank",
        name: "Bank Statements",
        icon: CreditCard,
        status: "verified",
        date: "15 Oct 2023",
      },
    ],
  },
  {
    title: "Security & Health",
    icon: HeartPulse,
    documents: [
      {
        id: "vaccination",
        name: "Vaccination Record",
        icon: Syringe,
        status: "required",
      },
    ],
  },
];

function getStatusBadge(status: DocumentStatus, date?: string) {
  switch (status) {
    case "verified":
      return (
        <div className="flex items-center gap-1">
          <CheckCircle className="h-5 w-5 text-primary" />
          <span className="text-xs text-primary font-medium">
            Verified {date && `- ${date}`}
          </span>
        </div>
      );
    case "pending":
      return (
        <div className="flex items-center gap-1">
          <Clock className="h-5 w-5 text-amber-500" />
          <span className="text-xs text-amber-600 font-medium">
            Pending Review
          </span>
        </div>
      );
    case "required":
      return (
        <Link
          href="/dashboard/documents/upload"
          className="flex items-center gap-1 bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-lg text-sm font-bold transition-colors"
        >
          <Upload className="h-4 w-4" />
          Upload
        </Link>
      );
  }
}

export function DocumentChecklist() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Document Checklist</h2>

      {documentSections.map((section) => (
        <section key={section.title} className="space-y-3">
          <div className="flex items-center gap-2">
            <section.icon className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">
              {section.title}
            </h3>
          </div>

          <div className="space-y-3">
            {section.documents.map((doc) => (
              <div
                key={doc.id}
                className={cn(
                  "bg-white p-4 rounded-xl border flex items-center justify-between",
                  doc.status === "required"
                    ? "border-dashed border-2 border-border"
                    : "border-border"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      doc.status === "required"
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    <doc.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p
                      className={cn(
                        "font-semibold",
                        doc.status === "required"
                          ? "text-muted-foreground"
                          : "text-foreground"
                      )}
                    >
                      {doc.name}
                    </p>
                    {doc.status === "required" && (
                      <p className="text-xs text-muted-foreground">
                        Required for verification
                      </p>
                    )}
                  </div>
                </div>

                {doc.status === "pending" ? (
                  <div className="flex items-center gap-2">
                    <button className="text-muted-foreground hover:text-foreground">
                      <Eye className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span className="text-xs text-amber-600 font-medium">
                        Pending
                      </span>
                    </div>
                  </div>
                ) : (
                  getStatusBadge(doc.status, doc.date)
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Security Check CTA */}
      <div className="bg-primary/5 p-5 rounded-2xl border border-primary/20">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-white rounded-xl text-primary shadow-sm">
            <Syringe className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-foreground">Vaccination Record</h4>
            <p className="text-sm text-muted-foreground">
              Please provide your COVID-19 and Hep B records for UK hospital
              access.
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/documents/upload"
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Upload className="h-5 w-5" />
          Start Security Check
        </Link>
      </div>
    </div>
  );
}
