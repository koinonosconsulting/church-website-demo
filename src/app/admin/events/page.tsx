// src/app/admin/events/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

interface Event {
  id: string;
  title: string;
  slug: string;
  description?: string;
  dateStart?: string;
  dateEnd?: string;
  location?: string;
  capacity?: number;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    dateStart: "",
    dateEnd: "",
    location: "",
    capacity: "",
  });

  const fetchEvents = async () => {
    try {
      const res = await axios.get("/api/admin/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load events");
    }
  };

  useEffect(() => { 
    fetchEvents(); 
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === "title" && !editingId) {
      const slug = value.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      setForm(prev => ({ ...prev, slug }));
    }
  };

  const handleAddOrUpdate = async () => {
    if (!form.title || !form.dateStart) return toast.error("Title and start date required");
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`/api/admin/events/${editingId}`, form);
        toast.success("Event updated successfully!");
      } else {
        await axios.post("/api/admin/events", form);
        toast.success("Event added successfully!");
      }
      setForm({ title: "", slug: "", description: "", dateStart: "", dateEnd: "", location: "", capacity: "" });
      setEditingId(null);
      fetchEvents();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Failed to save event");
    } finally { 
      setLoading(false); 
    }
  };

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setForm({
      title: event.title,
      slug: event.slug,
      description: event.description || "",
      dateStart: event.dateStart?.slice(0, 16) || "",
      dateEnd: event.dateEnd?.slice(0, 16) || "",
      location: event.location || "",
      capacity: event.capacity?.toString() || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`/api/admin/events/${id}`);
      toast.success("Event deleted successfully!");
      fetchEvents();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Failed to delete event");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", slug: "", description: "", dateStart: "", dateEnd: "", location: "", capacity: "" });
  };

  const formatEventDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B1D40] mb-2">Event Management</h1>
        <p className="text-gray-600">Create and manage church events and activities</p>
      </div>

      {/* Event Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-[#0B1D40] mb-4">
          {editingId ? "Edit Event" : "Create New Event"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
            <input
              placeholder="Enter event title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <input
              placeholder="event-slug"
              value={form.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time *</label>
            <input
              type="datetime-local"
              placeholder="Start Date"
              value={form.dateStart}
              onChange={(e) => handleChange("dateStart", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date & Time</label>
            <input
              type="datetime-local"
              placeholder="End Date"
              value={form.dateEnd}
              onChange={(e) => handleChange("dateEnd", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              placeholder="Event location"
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
            <input
              type="number"
              placeholder="Number of attendees"
              value={form.capacity}
              onChange={(e) => handleChange("capacity", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            placeholder="Event description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7B500] focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAddOrUpdate}
            disabled={loading || !form.title || !form.dateStart}
            className="bg-gradient-to-r from-[#F7B500] to-[#e6a500] text-[#0B1D40] px-8 py-3 rounded-xl font-semibold hover:from-[#e6a500] hover:to-[#d69900] transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:scale-100 shadow-lg"
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-[#0B1D40] border-t-transparent rounded-full animate-spin" />
                <span>{editingId ? "Updating..." : "Creating..."}</span>
              </span>
            ) : (
              editingId ? "Update Event" : "Create Event"
            )}
          </button>
          
          {editingId && (
            <button
              onClick={cancelEdit}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
          )}
        </div>
      </motion.div>

      {/* Events List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#0B1D40]">
            Upcoming Events ({events.length})
          </h2>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events scheduled</h3>
            <p className="text-gray-500">Create your first event to get started</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0B1D40] to-[#1a3a7a] rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">
                          {new Date(event.dateStart!).getDate()}
                        </span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-[#0B1D40] mb-1">
                          {event.title}
                        </h3>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center space-x-1">
                            <span>📅</span>
                            <span>{formatEventDate(event.dateStart!)}</span>
                          </span>
                          
                          {event.dateEnd && (
                            <span className="flex items-center space-x-1">
                              <span>→</span>
                              <span>{formatEventDate(event.dateEnd)}</span>
                            </span>
                          )}
                          
                          {event.location && (
                            <span className="flex items-center space-x-1">
                              <span>📍</span>
                              <span>{event.location}</span>
                            </span>
                          )}
                          
                          {event.capacity && (
                            <span className="flex items-center space-x-1">
                              <span>👥</span>
                              <span>{event.capacity} people</span>
                            </span>
                          )}
                        </div>
                        
                        {event.description && (
                          <p className="text-gray-700 text-sm line-clamp-2">
                            {event.description}
                          </p>
                        )}
                        
                        <div className="mt-2">
                          <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono">
                            {event.slug}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-[#F7B500] text-[#0B1D40] px-4 py-2 rounded-lg font-medium hover:bg-[#e6a500] transition-colors shadow-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
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