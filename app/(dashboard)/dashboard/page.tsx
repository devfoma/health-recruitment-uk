import { requireApplicant } from "@/lib/auth/actions";
import { ApplicationProgress } from "@/components/dashboard/application-progress";
import { DocumentChecklist } from "@/components/dashboard/document-checklist";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Health Recruitment UK",
  description: "Manage your healthcare recruitment application",
};

export default async function DashboardPage() {
  const user = await requireApplicant();

  return (
    <div className="px-4 py-6">
      {/* Welcome Message */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {user.fullName.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Complete your application to start your UK healthcare career.
        </p>
      </div>

      <ApplicationProgress completedCount={8} totalCount={12} />
      <DocumentChecklist />
    </div>
  );
}
