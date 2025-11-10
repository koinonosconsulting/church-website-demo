// src/app/admin/events/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

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

  useEffect(() => { fetchEvents(); }, []);

  const handleChange = (field: string, value: string) => setForm({ ...form, [field]: value });

  const handleAddOrUpdate = async () => {
    if (!form.title || !form.dateStart) return toast.error("Title and start date required");
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`/api/admin/events/${editingId}`, form);
        toast.success("Event updated");
      } else {
        await axios.post("/api/admin/events", form);
        toast.success("Event added");
      }
      setForm({ title: "", slug: "", description: "", dateStart: "", dateEnd: "", location: "", capacity: "" });
      setEditingId(null);
      fetchEvents();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Failed");
    } finally { setLoading(false); }
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
    if (!confirm("Delete this event?")) return;
    try {
      await axios.delete(`/api/admin/events/${id}`);
      toast.success("Event deleted");
      fetchEvents();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Failed to delete");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-semibold mb-6">Manage Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
        <input placeholder="Title" value={form.title} onChange={(e) => handleChange("title", e.target.value)} className="border p-2 rounded" />
        <input placeholder="Slug" value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} className="border p-2 rounded" />
        <input type="datetime-local" placeholder="Start Date" value={form.dateStart} onChange={(e) => handleChange("dateStart", e.target.value)} className="border p-2 rounded" />
        <input type="datetime-local" placeholder="End Date" value={form.dateEnd} onChange={(e) => handleChange("dateEnd", e.target.value)} className="border p-2 rounded" />
        <input placeholder="Location" value={form.location} onChange={(e) => handleChange("location", e.target.value)} className="border p-2 rounded" />
        <input type="number" placeholder="Capacity" value={form.capacity} onChange={(e) => handleChange("capacity", e.target.value)} className="border p-2 rounded" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => handleChange("description", e.target.value)} className="border p-2 rounded col-span-full"></textarea>
        <button onClick={handleAddOrUpdate} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded col-span-full">
          {loading ? "Saving..." : editingId ? "Update Event" : "Add Event"}
        </button>
      </div>

      <ul className="space-y-2">
        {events.map((e) => (
          <li key={e.id} className="flex justify-between items-center border p-3 rounded">
            <div>
              <p className="font-medium">{e.title}</p>
              <p className="text-sm text-gray-500">{new Date(e.dateStart!).toLocaleString()} {e.location && `- ${e.location}`}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(e)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(e.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}