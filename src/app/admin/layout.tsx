// src/app/admin/layout.tsx
import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-lg font-semibold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/admin/donations" className="block hover:text-yellow-400">Donations</Link>
          <Link href="/admin/branches" className="block hover:text-yellow-400">Branches</Link>
          <Link href="/admin/projects" className="block hover:text-yellow-400">Projects</Link>
          <Link href="/admin/settings" className="block hover:text-yellow-400">Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}