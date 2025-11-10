// src/app/admin/branches/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

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
      toast.success("Branch added");
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
      toast.success("Branch deleted");
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
      toast.success("Branch updated");
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
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-semibold mb-6">Manage Branches</h1>

      {/* Add Branch Form */}
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Branch Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="City (optional)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          className="bg-green-600 text-white px-4 rounded min-w-[100px]"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {/* Branch List */}
      {branches.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No branches yet.</p>
      ) : (
        <ul className="space-y-2">
          {branches.map((b) => (
            <li
              key={b.id}
              className="flex justify-between items-start border p-3 rounded"
            >
              <div className="flex-1">
                {editingId === b.id ? (
                  <>
                    <input
                      type="text"
                      value={editFields.name}
                      onChange={(e) =>
                        setEditFields((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="border p-1 rounded mb-1 w-full"
                    />
                    <input
                      type="text"
                      value={editFields.slug}
                      onChange={(e) =>
                        setEditFields((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      className="border p-1 rounded mb-1 w-full"
                    />
                    <input
                      type="text"
                      value={editFields.city}
                      onChange={(e) =>
                        setEditFields((prev) => ({ ...prev, city: e.target.value }))
                      }
                      className="border p-1 rounded mb-1 w-full"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdate}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-medium">
                      {b.name} <span className="text-gray-500">({b.slug})</span>
                    </p>
                    {b.city && <p className="text-sm text-gray-500">City: {b.city}</p>}
                    {b.donationsCount !== undefined && (
                      <p className="text-xs text-gray-400">
                        {b.donationsCount} donations — ₦
                        {b.donationsTotal?.toLocaleString() || 0}
                      </p>
                    )}
                  </>
                )}
              </div>

              {editingId !== b.id && (
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => startEditing(b)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}