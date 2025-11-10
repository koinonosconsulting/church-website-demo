// src/app/admin/donations/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

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

  // CSV Export respecting search + status filters
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

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-semibold mb-6">Recent Donations</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-2 mb-4 items-center">
        <input
          type="text"
          placeholder="Search donor, branch, project, purpose..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="SUCCESS">SUCCESS</option>
          <option value="PENDING">PENDING</option>
          <option value="FAILED">FAILED</option>
        </select>
        <button
          onClick={exportCSV}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Export CSV
        </button>
      </div>

      {/* Donations Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Donor</th>
              <th className="p-2 text-left">Branch</th>
              <th className="p-2 text-left">Project</th>
              <th className="p-2 text-left">Purpose</th>
              <th className="p-2 text-right">Amount (₦)</th>
              <th className="p-2 text-center">Status</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center p-4">Loading...</td>
              </tr>
            ) : donations.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500">
                  No donations found.
                </td>
              </tr>
            ) : (
              donations.map((d) => (
                <tr key={d.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{new Date(d.createdAt).toLocaleDateString()}</td>
                  <td className="p-2">{d.donorName || d.donorEmail || "Anonymous"}</td>
                  <td className="p-2">{d.branch?.name || "-"}</td>
                  <td className="p-2">{d.project?.title || "-"}</td>
                  <td className="p-2">{d.purpose}</td>
                  <td className="p-2 text-right">{d.amount.toLocaleString()}</td>
                  <td className="p-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        d.status === "SUCCESS"
                          ? "bg-green-100 text-green-700"
                          : d.status === "FAILED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => setSelectedDonation(d)}
                      className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1 border rounded">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* View Donation Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setSelectedDonation(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Donation Details</h2>
            <p><strong>Date:</strong> {new Date(selectedDonation.createdAt).toLocaleString()}</p>
            <p><strong>Donor:</strong> {selectedDonation.donorName || "Anonymous"}</p>
            <p><strong>Email:</strong> {selectedDonation.donorEmail}</p>
            <p><strong>Branch:</strong> {selectedDonation.branch?.name || "-"}</p>
            <p><strong>Project:</strong> {selectedDonation.project?.title || "-"}</p>
            <p><strong>Purpose:</strong> {selectedDonation.purpose}</p>
            <p><strong>Amount:</strong> ₦{selectedDonation.amount.toLocaleString()}</p>
            <p><strong>Status:</strong> {selectedDonation.status}</p>
            {selectedDonation.meta && (
              <pre className="bg-gray-100 p-2 mt-2 rounded overflow-x-auto text-xs">
                {JSON.stringify(selectedDonation.meta, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}