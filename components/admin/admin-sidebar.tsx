"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Stethoscope,
  LayoutDashboard,
  Users,
  Briefcase,
  FileBarChart,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/auth/actions";
import type { User } from "@/lib/auth/types";

interface AdminSidebarProps {
  user: User;
}

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/applicants", icon: Users, label: "Applicants" },
  { href: "/admin/jobs", icon: Briefcase, label: "Job Postings" },
  { href: "/admin/reports", icon: FileBarChart, label: "Reports" },
];

const systemItems = [
  { href: "/admin/settings", icon: Settings, label: "Settings" },
  { href: "/admin/support", icon: HelpCircle, label: "Support" },
];

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-white border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-primary text-base font-bold leading-none">
              HealthRecruit UK
            </h1>
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-full transition-colors",
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-semibold">{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-4 pb-2">
          <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            System
          </p>
        </div>

        {systemItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-full transition-colors",
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-full">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">{user.fullName}</p>
            <p className="text-xs text-muted-foreground">System Admin</p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
