// src/app/admin/page.tsx
"use client";

import { motion } from "framer-motion";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Donations", value: "₦1,234,567", change: "+12%", icon: "💰" },
    { label: "Active Branches", value: "8", change: "+2", icon: "🏢" },
    { label: "Projects", value: "12", change: "+3", icon: "🚀" },
    { label: "Members", value: "1,234", change: "+45", icon: "👥" },
  ];

  const recentActivities = [
    { action: "New donation received", user: "John Doe", time: "2 min ago", amount: "₦50,000" },
    { action: "Branch updated", user: "Admin", time: "1 hour ago", branch: "Main Campus" },
    { action: "Project created", user: "Sarah Wilson", time: "3 hours ago", project: "Youth Outreach" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[#0B1D40] mb-2">Welcome back, Admin!</h1>
        <p className="text-gray-600">Here's what's happening with your church today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0B1D40] to-[#1a3a7a] rounded-xl flex items-center justify-center">
                <span className="text-xl">{stat.icon}</span>
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <h2 className="text-xl font-semibold text-[#0B1D40] mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-r from-[#F7B500] to-[#4FC3F7] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium">{activity.action}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <span>{activity.user}</span>
                    <span>•</span>
                    <span>{activity.time}</span>
                    {activity.amount && (
                      <>
                        <span>•</span>
                        <span className="text-[#F7B500] font-semibold">{activity.amount}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <h2 className="text-xl font-semibold text-[#0B1D40] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Add Donation", icon: "💰", href: "/admin/donations", color: "from-green-500 to-emerald-600" },
              { label: "New Branch", icon: "🏢", href: "/admin/branches", color: "from-blue-500 to-cyan-600" },
              { label: "Create Project", icon: "🚀", href: "/admin/projects", color: "from-purple-500 to-pink-600" },
              { label: "Settings", icon: "⚙️", href: "/admin/settings", color: "from-gray-500 to-gray-600" },
            ].map((action) => (
              <button
                key={action.label}
                className="bg-gradient-to-r p-4 rounded-xl text-white font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => window.location.href = action.href}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <div className="text-sm">{action.label}</div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}