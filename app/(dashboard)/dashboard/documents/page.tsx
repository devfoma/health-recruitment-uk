import { DocumentChecklist } from "@/components/dashboard/document-checklist";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documents - Health Recruitment UK",
  description: "Manage your application documents",
};

export default function DocumentsPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-foreground mb-2">My Documents</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Track and manage all your application documents.
      </p>

      <DocumentChecklist />
    </div>
  );
}
