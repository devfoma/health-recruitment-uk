import { Info } from "lucide-react";

interface ApplicationProgressProps {
  completedCount: number;
  totalCount: number;
}

export function ApplicationProgress({
  completedCount,
  totalCount,
}: ApplicationProgressProps) {
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border p-5 mb-6">
      <div className="flex justify-between items-end mb-3">
        <div>
          <p className="text-primary text-sm font-semibold uppercase tracking-wider">
            Application Progress
          </p>
          <h3 className="text-2xl font-bold text-foreground">
            {completedCount} of {totalCount} Completed
          </h3>
        </div>
        <div className="text-right">
          <span className="text-primary font-bold text-lg">{percentage}%</span>
        </div>
      </div>

      <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-3 text-muted-foreground text-sm flex items-center gap-1">
        <Info className="h-4 w-4 text-primary" />
        {percentage < 100
          ? "Almost there! Complete your remaining documents to proceed."
          : "Congratulations! Your application is complete."}
      </p>
    </div>
  );
}
