"use client";

import Link from "next/link";
import { Stethoscope, User, ChevronLeft } from "lucide-react";
import type { User as UserType } from "@/lib/auth/types";

interface DashboardHeaderProps {
  user: UserType;
  title?: string;
  showBack?: boolean;
}

export function DashboardHeader({
  user,
  title,
  showBack = false,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-border">
      <div className="flex items-center p-4">
        {showBack ? (
          <button
            onClick={() => window.history.back()}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
            <Stethoscope className="h-5 w-5" />
          </div>
        )}

        <div className="flex-1 px-4">
          {title ? (
            <h1 className="text-lg font-bold text-foreground">{title}</h1>
          ) : (
            <>
              <h2 className="text-lg font-bold text-foreground leading-tight">
                Health Recruitment Hub
              </h2>
              <p className="text-xs font-medium text-primary">
                UK Medical Placement
              </p>
            </>
          )}
        </div>

        <Link
          href="/dashboard/profile"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <User className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}
