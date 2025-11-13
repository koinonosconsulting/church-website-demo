// src/app/admin/settings/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  branchId: string | null;
  branch?: {
    name: string;
  } | null;
  createdAt: string;
}

interface Branch {
  id: string;
  name: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    name: "",
    role: "VOLUNTEER" as string,
    branchId: "",
    password: "",
  });

  const roles = [
    "SUPER_ADMIN",
    "BRANCH_ADMIN", 
    "PROJECT_LEAD",
    "FINANCE",
    "CONTENT_ADMIN",
    "VOLUNTEER",
    "DONOR"
  ];

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    }
  };

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
    fetchUsers();
    fetchBranches();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!form.email) return toast.error("Email is required");
    if (!editingUserId && !form.password) return toast.error("Password is required for new users");
    
    setLoading(true);
    try {
      if (editingUserId) {
        // Update existing user (don't send password if empty)
        const updateData: any = {
          email: form.email,
          name: form.name,
          role: form.role,
          branchId: form.branchId || null,
        };
        
        if (form.password) {
          updateData.password = form.password;
        }
        
        await axios.put(`/api/admin/users/${editingUserId}`, updateData);
        toast.success("User updated successfully!");
      } else {
        // Create new user
        await axios.post("/api/admin/users", form);
        toast.success("User created successfully!");
      }
      
      resetForm();
      fetchUsers();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Failed to delete user");
    }
  };

  const handleEdit = (user: User) => {
    setEditingUserId(user.id);
    setForm({
      email: user.email,
      name: user.name || "",
      role: user.role,
      branchId: user.branchId || "",
      password: "", // Don't pre-fill password for security
    });
  };

  const resetForm = () => {
    setEditingUserId(null);
    setForm({
      email: "",
      name: "",
      role: "VOLUNTEER",
      branchId: "",
      password: "",
    });
  };

  const getRoleColor = (role: string) => {
    const colors: { [key: string]: string } = {
      SUPER_ADMIN: "bg-red-100 text-red-800 border-red-200",
      BRANCH_ADMIN: "bg-blue-100 text-blue-800 border-blue-200",
      PROJECT_LEAD: "bg-purple-100 text-purple-800 border-purple-200",
      FINANCE: "bg-green-100 text-green-800 border-green-200",
      CONTENT_ADMIN: "bg-yellow-100 text-yellow-800 border-yellow-200",
      VOLUNTEER: "bg-gray-100 text-gray-800 border-gray-200",
      DONOR: "bg-indigo-100 text-indigo-800 border-indigo-200",
    };
    return colors[role] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B1D40] mb-2">User Management</h1>
        <p className="text-gray-600">Manage admin users and their permissions</p>
      </div>

      {/* Add/Edit User Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-[#0B1D40] mb-4">
          {editingUserId ? "Edit User" : "Add New User"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              placeholder="user@lightlinechurch.org"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Branch Assignment</label>
            <select
              value={form.branchId}
              onChange={(e) => setForm({ ...form, branchId: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            >
              <option value="">No Branch (Global Access)</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {editingUserId ? "New Password (leave blank to keep current)" : "Password *"}
            </label>
            <input
              type="password"
              placeholder={editingUserId ? "••••••••" : "Enter password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAddOrUpdate}
            disabled={loading || !form.email || (!editingUserId && !form.password)}
            className="bg-gradient-to-r from-[#F7B500] to-[#e6a500] text-[#0B1D40] px-8 py-3 rounded-xl font-semibold hover:from-[#e6a500] hover:to-[#d69900] transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:scale-100 shadow-lg"
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-[#0B1D40] border-t-transparent rounded-full animate-spin" />
                <span>{editingUserId ? "Updating..." : "Creating..."}</span>
              </span>
            ) : (
              editingUserId ? "Update User" : "Create User"
            )}
          </button>
          
          {editingUserId && (
            <button
              onClick={resetForm}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
          )}
        </div>
      </motion.div>

      {/* Users List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#0B1D40]">
            System Users ({users.length})
          </h2>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">Create your first user to get started</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {users.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0B1D40] to-[#1a3a7a] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">
                        {(user.name || user.email).charAt(0).toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-[#0B1D40]">
                          {user.name || "No Name"}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                          {user.role.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-2">{user.email}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        {user.branch && (
                          <span className="flex items-center space-x-1">
                            <span>🏢</span>
                            <span>{user.branch.name}</span>
                          </span>
                        )}
                        
                        <span className="flex items-center space-x-1">
                          <span>📅</span>
                          <span>Joined {formatDate(user.createdAt)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-[#F7B500] text-[#0B1D40] px-4 py-2 rounded-lg font-medium hover:bg-[#e6a500] transition-colors shadow-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors shadow-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}