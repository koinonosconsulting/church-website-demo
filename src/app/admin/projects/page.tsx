// src/app/admin/projects/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Branch {
  id: string;
  name: string;
}

interface Project {
  id: string;
  title: string;
  branchId: string;
  branchName: string;
  targetAmount?: number;
  collectedAmount?: number;
  donationsCount?: number;
}

export default function ProjectsPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Project>>({});

  const fetchBranches = async () => {
    const res = await axios.get("/api/admin/branches");
    setBranches(res.data);
    if (res.data.length > 0 && !selectedBranch) setSelectedBranch(res.data[0].id);
  };

  const fetchProjects = async () => {
    if (!selectedBranch) return;
    const res = await axios.get(`/api/admin/projects?branchId=${selectedBranch}`);
    setProjects(res.data);
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [selectedBranch]);

  const handleAdd = async () => {
    if (!title || !selectedBranch) return alert("Title and branch are required");
    setLoading(true);
    try {
      await axios.post("/api/admin/projects", {
        title,
        branchId: selectedBranch,
        targetAmount,
      });
      setTitle("");
      setTargetAmount(0);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await axios.delete(`/api/admin/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  const startEdit = (project: Project) => {
    setEditingProject(project.id);
    setEditData({
      title: project.title,
      branchId: project.branchId,
      targetAmount: project.targetAmount,
    });
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setEditData({});
  };

  const saveEdit = async (id: string) => {
    if (!editData.title || !editData.branchId) return alert("Title and branch required");
    try {
      await axios.put(`/api/admin/projects/${id}`, editData);
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to update project");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-6">Manage Projects</h1>

      {/* Add Project Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6">
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="border p-2 rounded col-span-1 md:col-span-1"
        >
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded col-span-1 md:col-span-1"
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(Number(e.target.value))}
          className="border p-2 rounded col-span-1 md:col-span-1"
        />
        <button
          onClick={handleAdd}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded col-span-1 md:col-span-1"
        >
          {loading ? "Adding..." : "Add Project"}
        </button>
      </div>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-200"
          >
            {editingProject === p.id ? (
              <>
                <input
                  type="text"
                  value={editData.title || ""}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Project Title"
                />
                <select
                  value={editData.branchId || ""}
                  onChange={(e) => setEditData({ ...editData, branchId: e.target.value })}
                  className="border p-2 rounded w-full mb-2"
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={editData.targetAmount || 0}
                  onChange={(e) =>
                    setEditData({ ...editData, targetAmount: Number(e.target.value) })
                  }
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Target Amount"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => saveEdit(p.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Branch:</strong> {p.branchName}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Target:</strong> ₦{p.targetAmount?.toLocaleString() || 0}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Collected:</strong> ₦{p.collectedAmount?.toLocaleString() || 0} (
                  {p.donationsCount} donations)
                </p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}