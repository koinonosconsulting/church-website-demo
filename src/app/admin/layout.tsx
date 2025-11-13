// src/app/admin/layout.tsx
"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <AdminHeader />
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

function AdminSidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/donations", label: "Donations", icon: "💰" },
    { href: "/admin/branches", label: "Branches", icon: "🏢" },
    { href: "/admin/projects", label: "Projects", icon: "🚀" },
    { href: "/admin/events", label: "Events", icon: "📅" },
    { href: "/admin/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-[#0B1D40] to-[#1a3a7a] text-white shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-[#0B1D40] text-sm font-bold">LC</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">Lightline Church</h1>
            <p className="text-xs text-gray-300">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-[#F7B500] text-[#0B1D40] shadow-lg"
                  : "text-gray-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="admin-sidebar-active"
                  className="absolute right-4 w-2 h-2 bg-[#0B1D40] rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#F7B500] to-[#4FC3F7] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">Admin User</p>
            <p className="text-xs text-gray-400 truncate">admin@lightlinechurch.org</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function AdminHeader() {
  const pathname = usePathname();
  
  // Get current page title based on pathname
  const getPageTitle = () => {
    const route = pathname.split('/').pop() || 'dashboard';
    return route.charAt(0).toUpperCase() + route.slice(1);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1D40] capitalize">{getPageTitle()}</h1>
          <p className="text-gray-600">Manage your church operations</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-[#0B1D40] hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-lg">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#F7B500] rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-[#F7B500] to-[#4FC3F7] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}