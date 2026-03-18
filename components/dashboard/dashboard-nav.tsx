"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, MessageCircle, Settings, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/dashboard/documents", icon: FileText, label: "Documents" },
  { href: "/dashboard/support", icon: MessageCircle, label: "Support" },
  { href: "/dashboard/profile", icon: Settings, label: "Profile" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-border px-4 pb-6 pt-2 z-20">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.slice(0, 2).map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon
                className="h-5 w-5"
                fill={isActive ? "currentColor" : "none"}
              />
              <span className="text-[10px] font-bold uppercase tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Center Action Button */}
        <div className="relative -top-6">
          <Link
            href="/dashboard/documents/upload"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40 border-4 border-background hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-6 w-6" />
          </Link>
        </div>

        {navItems.slice(2).map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon
                className="h-5 w-5"
                fill={isActive ? "currentColor" : "none"}
              />
              <span className="text-[10px] font-bold uppercase tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
