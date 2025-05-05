"use client";

import { useState, useEffect } from "react";

interface AnnouncementFormProps {
  type: "create" | "update";
  data?: any; // For update, pass the announcement object
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  relatedData?: {
    classes: Class[];
  };
}

interface Class {
  id: number;
  name: string;
}

export default function AnnouncementForm({ type, data, setOpen, onSuccess, relatedData }: AnnouncementFormProps) {
  const [title, setTitle] = useState(data?.title || "");
  const [description, setDescription] = useState(data?.description || "");
  const [date, setDate] = useState(data?.date ? new Date(data.date).toISOString().slice(0, 10) : "");
  const [classId, setClassId] = useState(data?.classId || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = { title, description, date, classId: classId ? Number(classId) : null };
    try {
      const res = await fetch("/api/announcements", {
        method: type === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(type === "create" ? payload : { ...payload, id: data.id }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Something went wrong");
      } else {
        setOpen(false);
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <label>
        Title
        <input
          className="input border rounded px-2 py-1"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <textarea
          className="input border rounded px-2 py-1"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Date
        <input
          className="input border rounded px-2 py-1"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </label>
      <label>
        Class
        <select
          className="input border rounded px-2 py-1 w-full"
          value={classId}
          onChange={e => setClassId(e.target.value)}
        >
          <option value="">Select a class</option>
          {relatedData?.classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </label>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        className="bg-lamaYellow px-4 py-2 rounded font-semibold"
        disabled={loading}
      >
        {loading ? "Saving..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
} 