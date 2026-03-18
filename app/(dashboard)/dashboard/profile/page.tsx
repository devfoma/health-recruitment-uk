import { requireApplicant, logout } from "@/lib/auth/actions";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  LogOut,
  ChevronRight,
  Bell,
  Lock,
  HelpCircle,
  FileText,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - Health Recruitment UK",
  description: "Manage your profile settings",
};

const menuItems = [
  { icon: Bell, label: "Notifications", href: "#" },
  { icon: Lock, label: "Security Settings", href: "#" },
  { icon: FileText, label: "Privacy Policy", href: "#" },
  { icon: HelpCircle, label: "Help & Support", href: "#" },
];

export default async function ProfilePage() {
  const user = await requireApplicant();

  return (
    <div className="px-4 py-6">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {user.fullName}
            </h1>
            <div className="flex items-center gap-1 text-sm text-primary">
              <Shield className="h-4 w-4" />
              <span className="font-medium">
                {user.isVerified ? "Verified Account" : "Pending Verification"}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{user.email}</p>
            </div>
          </div>

          {user.phone && (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{user.phone}</p>
              </div>
            </div>
          )}

          {user.country && (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Country</p>
                <p className="font-medium text-foreground">{user.country}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden mb-6">
        {menuItems.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${
              index !== menuItems.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-foreground">{item.label}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </a>
        ))}
      </div>

      {/* Logout Button */}
      <form action={logout}>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-4 rounded-xl transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </form>
    </div>
  );
}
