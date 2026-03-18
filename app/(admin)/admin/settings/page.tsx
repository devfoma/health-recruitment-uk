import { Settings, Bell, Shield, Users, Mail, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings - Health Recruitment UK Admin",
  description: "Manage admin settings",
};

export default function SettingsPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Settings className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground text-sm">
            Manage your admin panel preferences
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Notifications */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">
                  New Applications
                </p>
                <p className="text-sm text-muted-foreground">
                  Get notified when new applications are submitted
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">
                  Document Uploads
                </p>
                <p className="text-sm text-muted-foreground">
                  Get notified when documents need review
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Weekly Reports</p>
                <p className="text-sm text-muted-foreground">
                  Receive weekly summary reports via email
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Security</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Two-Factor Authentication
              </label>
              <button className="w-full py-3 px-4 rounded-lg border border-border text-left hover:bg-muted/50 transition-colors">
                <span className="font-semibold text-foreground">
                  Enable 2FA
                </span>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Session Timeout
              </label>
              <select className="w-full p-3 rounded-lg border border-border bg-white text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
                <option>8 hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Team Management */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              Team Management
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  SA
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    System Administrator
                  </p>
                  <p className="text-xs text-muted-foreground">Super Admin</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Owner
              </span>
            </div>
          </div>

          <button className="mt-4 w-full py-3 rounded-lg border border-dashed border-border text-muted-foreground font-semibold hover:border-primary hover:text-primary transition-colors">
            + Invite Team Member
          </button>
        </div>

        {/* Email Settings */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              Email Settings
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Sender Name
              </label>
              <input
                type="text"
                defaultValue="Health Recruitment UK"
                className="w-full p-3 rounded-lg border border-border bg-white text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Reply-To Email
              </label>
              <input
                type="email"
                defaultValue="support@healthrecruit.uk"
                className="w-full p-3 rounded-lg border border-border bg-white text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          Save Changes
        </button>
      </div>
    </div>
  );
}
