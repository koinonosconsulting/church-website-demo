// src/app/admin/branches/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

interface Branch {
  id: string;
  name: string;
  slug: string;
  city?: string | null;
  donationsCount?: number;
  donationsTotal?: number;
}

export default function AdminBranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState<{ name: string; slug: string; city?: string }>({
    name: "",
    slug: "",
    city: "",
  });

  const fetchBranches = async () => {
    try {
      const res = await axios.get("/api/admin/branches");
      setBranches(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load branches");
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return toast.error("Name required");
    setLoading(true);
    try {
      await axios.post("/api/admin/branches", { name, slug, city });
      toast.success("Branch added successfully!");
      setName("");
      setSlug("");
      setCity("");
      fetchBranches();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Failed to add branch");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this branch?")) return;
    try {
      await axios.delete(`/api/admin/branches/${id}`);
      toast.success("Branch deleted successfully!");
      fetchBranches();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Failed to delete branch");
    }
  };

  const startEditing = (branch: Branch) => {
    setEditingId(branch.id);
    setEditFields({
      name: branch.name,
      slug: branch.slug,
      city: branch.city || "",
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditFields({ name: "", slug: "", city: "" });
  };

  const handleUpdate = async () => {
    if (!editFields.name.trim()) return toast.error("Name required");
    try {
      await axios.put(`/api/admin/branches/${editingId}`, editFields);
      toast.success("Branch updated successfully!");
      cancelEditing();
      fetchBranches();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Failed to update branch");
    }
  };

  // Auto-slugify new branch
  useEffect(() => {
    setSlug(name.toLowerCase().replace(/\s+/g, "-"));
  }, [name]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B1D40] mb-2">Manage Branches</h1>
        <p className="text-gray-600">Add and manage church branch locations</p>
      </div>

      {/* Add Branch Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-[#0B1D40] mb-4">Add New Branch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch Name *
            </label>
            <input
              type="text"
              placeholder="Enter branch name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              placeholder="branch-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
        
        <button
          onClick={handleAdd}
          disabled={loading || !name.trim()}
          className="bg-gradient-to-r from-[#F7B500] to-[#e6a500] text-[#0B1D40] px-6 py-3 rounded-xl font-semibold hover:from-[#e6a500] hover:to-[#d69900] transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:scale-100 shadow-lg"
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-[#0B1D40] border-t-transparent rounded-full animate-spin" />
              <span>Adding Branch...</span>
            </span>
          ) : (
            "Add New Branch"
          )}
        </button>
      </motion.div>

      {/* Branches List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#0B1D40]">
            Church Branches ({branches.length})
          </h2>
        </div>

        {branches.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No branches yet</h3>
            <p className="text-gray-500">Add your first branch to get started</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                {editingId === branch.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editFields.name}
                        onChange={(e) =>
                          setEditFields((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7B500] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug
                      </label>
                      <input
                        type="text"
                        value={editFields.slug}
                        onChange={(e) =>
                          setEditFields((prev) => ({ ...prev, slug: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7B500] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={editFields.city}
                        onChange={(e) =>
                          setEditFields((prev) => ({ ...prev, city: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7B500] focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-3 flex gap-2 mt-4">
                      <button
                        onClick={handleUpdate}
                        className="bg-[#0B1D40] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0a1838] transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0B1D40] to-[#1a3a7a] rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">LC</span>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {branch.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                            {branch.slug}
                          </span>
                          {branch.city && (
                            <span className="flex items-center space-x-1">
                              <span>📍</span>
                              <span>{branch.city}</span>
                            </span>
                          )}
                        </div>
                        
                        {branch.donationsCount !== undefined && (
                          <div className="flex items-center space-x-4 text-xs text-gray-400 mt-2">
                            <span>{branch.donationsCount} donations</span>
                            <span>•</span>
                            <span className="text-[#F7B500] font-semibold">
                              ₦{branch.donationsTotal?.toLocaleString() || 0}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => startEditing(branch)}
                        className="bg-[#F7B500] text-[#0B1D40] px-4 py-2 rounded-lg font-medium hover:bg-[#e6a500] transition-colors shadow-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(branch.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors shadow-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}