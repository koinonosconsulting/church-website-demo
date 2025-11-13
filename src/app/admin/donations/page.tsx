// src/app/admin/donations/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

interface Donation {
  id: string;
  donorName: string | null;
  donorEmail: string;
  purpose: string;
  amount: number;
  status: string;
  branch?: { name: string } | null;
  project?: { title: string } | null;
  createdAt: string;
  meta?: any;
}

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const limit = 20;

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());
      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);

      const res = await axios.get(`/api/admin/donations?${params.toString()}`);
      setDonations(res.data.donations);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [page, search, statusFilter]);

  const totalPages = Math.ceil(total / limit);

  const exportCSV = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);

      const res = await axios.get(`/api/admin/donations/export?${params.toString()}`);
      const allDonations: Donation[] = res.data;

      if (allDonations.length === 0) return toast.error("No donations to export");

      const headers = [
        "Date",
        "Donor Name",
        "Donor Email",
        "Branch",
        "Project",
        "Purpose",
        "Amount",
        "Status",
      ];

      const rows = allDonations.map((d) => [
        new Date(d.createdAt).toLocaleDateString(),
        d.donorName || "Anonymous",
        d.donorEmail,
        d.branch?.name || "-",
        d.project?.title || "-",
        d.purpose,
        d.amount.toString(),
        d.status,
      ]);

      const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `donations_all.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`Exported ${allDonations.length} donations`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to export donations");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-800 border-green-200";
      case "FAILED":
        return "bg-red-100 text-red-800 border-red-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B1D40] mb-2">Donation Management</h1>
        <p className="text-gray-600">View and manage all church donations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Donations", value: `₦${(donations.reduce((sum, d) => sum + d.amount, 0)).toLocaleString()}`, icon: "💰" },
          { label: "Successful", value: donations.filter(d => d.status === "SUCCESS").length.toString(), icon: "✅" },
          { label: "Pending", value: donations.filter(d => d.status === "PENDING").length.toString(), icon: "⏳" },
          { label: "This Month", value: `₦${(donations.filter(d => new Date(d.createdAt).getMonth() === new Date().getMonth()).reduce((sum, d) => sum + d.amount, 0)).toLocaleString()}`, icon: "📅" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#0B1D40] to-[#1a3a7a] rounded-xl flex items-center justify-center">
                <span className="text-xl text-white">{stat.icon}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Donations
            </label>
            <input
              type="text"
              placeholder="Search donor, branch, project, purpose..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="w-full lg:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            >
              <option value="">All Statuses</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="PENDING">PENDING</option>
              <option value="FAILED">FAILED</option>
            </select>
          </div>

          <button
            onClick={exportCSV}
            className="bg-gradient-to-r from-[#0B1D40] to-[#1a3a7a] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#0a1838] hover:to-[#152a5c] transition-all duration-300 shadow-lg"
          >
            Export CSV
          </button>
        </div>
      </motion.div>

      {/* Donations Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#0B1D40]">
            Recent Donations ({total})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date & Donor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Branch & Project</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-4 border-[#F7B500] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-gray-500 mt-2">Loading donations...</p>
                  </td>
                </tr>
              ) : donations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-6xl mb-4">💰</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No donations found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                donations.map((donation, index) => (
                  <motion.tr
                    key={donation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(donation.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {donation.donorName || donation.donorEmail || "Anonymous"}
                        </p>
                        {donation.donorEmail && donation.donorName && (
                          <p className="text-xs text-gray-500">{donation.donorEmail}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">
                          {donation.branch?.name || "-"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {donation.project?.title || "-"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 max-w-xs truncate">
                        {donation.purpose}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-lg font-bold text-[#0B1D40]">
                        ₦{donation.amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(donation.status)}`}>
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedDonation(donation)}
                        className="bg-[#F7B500] text-[#0B1D40] px-4 py-2 rounded-lg font-medium hover:bg-[#e6a500] transition-colors shadow-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Showing page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-[#0B1D40] text-white rounded-lg text-sm font-medium hover:bg-[#0a1838] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Donation Details Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#0B1D40]">Donation Details</h2>
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700">Amount</span>
                  <span className="text-2xl font-bold text-[#F7B500]">
                    ₦{selectedDonation.amount.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                    <p className="text-gray-900">{new Date(selectedDonation.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedDonation.status)}`}>
                      {selectedDonation.status}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Donor</label>
                  <p className="text-gray-900">{selectedDonation.donorName || "Anonymous"}</p>
                  {selectedDonation.donorEmail && (
                    <p className="text-sm text-gray-600">{selectedDonation.donorEmail}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Branch</label>
                    <p className="text-gray-900">{selectedDonation.branch?.name || "-"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Project</label>
                    <p className="text-gray-900">{selectedDonation.project?.title || "-"}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Purpose</label>
                  <p className="text-gray-900">{selectedDonation.purpose}</p>
                </div>

                {selectedDonation.meta && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Additional Data</label>
                    <pre className="bg-gray-50 p-3 rounded-lg text-xs overflow-x-auto">
                      {JSON.stringify(selectedDonation.meta, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}