import { requireApplicant } from "@/lib/auth/actions";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireApplicant();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader user={user} />
      <main className="flex-1 pb-24">{children}</main>
      <DashboardNav />
    </div>
  );
}
