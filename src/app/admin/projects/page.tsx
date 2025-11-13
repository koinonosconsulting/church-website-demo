// src/app/admin/projects/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

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
    try {
      const res = await axios.get("/api/admin/branches");
      setBranches(res.data);
      if (res.data.length > 0 && !selectedBranch) setSelectedBranch(res.data[0].id);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load branches");
    }
  };

  const fetchProjects = async () => {
    if (!selectedBranch) return;
    try {
      const res = await axios.get(`/api/admin/projects?branchId=${selectedBranch}`);
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [selectedBranch]);

  const handleAdd = async () => {
    if (!title || !selectedBranch) return toast.error("Title and branch are required");
    setLoading(true);
    try {
      await axios.post("/api/admin/projects", {
        title,
        branchId: selectedBranch,
        targetAmount,
      });
      toast.success("Project added successfully!");
      setTitle("");
      setTargetAmount(0);
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`/api/admin/projects/${id}`);
      toast.success("Project deleted successfully!");
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project");
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
    if (!editData.title || !editData.branchId) return toast.error("Title and branch required");
    try {
      await axios.put(`/api/admin/projects/${id}`, editData);
      toast.success("Project updated successfully!");
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update project");
    }
  };

  const getProgressPercentage = (collected: number = 0, target: number = 0) => {
    if (target === 0) return 0;
    return Math.min((collected / target) * 100, 100);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B1D40] mb-2">Project Management</h1>
        <p className="text-gray-600">Manage church projects and track fundraising progress</p>
      </div>

      {/* Add Project Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-[#0B1D40] mb-4">Create New Project</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
            <input
              type="text"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount</label>
            <input
              type="number"
              placeholder="Target amount"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleAdd}
              disabled={loading || !title.trim()}
              className="w-full bg-gradient-to-r from-[#F7B500] to-[#e6a500] text-[#0B1D40] px-6 py-3 rounded-xl font-semibold hover:from-[#e6a500] hover:to-[#d69900] transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:scale-100 shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-[#0B1D40] border-t-transparent rounded-full animate-spin" />
                  <span>Adding...</span>
                </span>
              ) : (
                "Add Project"
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#0B1D40]">
            Active Projects ({projects.length})
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Filter by branch:</span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F7B500] focus:border-transparent"
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-4">Create your first project to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {editingProject === project.id ? (
                  <div className="p-6">
                    <input
                      type="text"
                      value={editData.title || ""}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent"
                      placeholder="Project Title"
                    />
                    <select
                      value={editData.branchId || ""}
                      onChange={(e) => setEditData({ ...editData, branchId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-[#F7B500] focus:border-transparent"
                      placeholder="Target Amount"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => saveEdit(project.id)}
                        className="flex-1 bg-[#0B1D40] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0a1838] transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[#0B1D40] flex-1">
                          {project.title}
                        </h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEdit(project)}
                            className="text-[#F7B500] hover:text-[#e6a500] transition-colors"
                            title="Edit project"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                            title="Delete project"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Branch:</strong> {project.branchName}
                      </p>
                      
                      <div className="mt-4 space-y-3">
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Target: ₦{project.targetAmount?.toLocaleString() || 0}</span>
                            <span>Collected: ₦{project.collectedAmount?.toLocaleString() || 0}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[#F7B500] to-[#e6a500] h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${getProgressPercentage(project.collectedAmount, project.targetAmount)}%`
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>
                            {project.donationsCount || 0} donations
                          </span>
                          <span>
                            {getProgressPercentage(project.collectedAmount, project.targetAmount).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          {project.donationsCount || 0} donations
                        </span>
                        <span className="text-sm font-semibold text-[#F7B500]">
                          ₦{project.collectedAmount?.toLocaleString() || 0} raised
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}