import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
}

interface MessageFormProps {
  type: "create" | "update";
  data?: any;
  setOpen: (open: boolean) => void;
  relatedData?: any;
}

const MessageForm: React.FC<MessageFormProps> = ({ type, data, setOpen }) => {
  const router = useRouter();
  const [senderId, setSenderId] = useState<string>(data?.senderId?.toString() || "");
  const [receiverId, setReceiverId] = useState<string>(data?.receiverId?.toString() || "");
  const [content, setContent] = useState(data?.content || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const usersData = await response.json();
        setUsers(usersData);
      } catch (err) {
        setError("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const method = type === "create" ? "POST" : "PUT";
      const res = await fetch("/api/messages", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data?.id,
          senderId: Number(senderId),
          receiverId: Number(receiverId),
          content,
        }),
      });
      if (!res.ok) throw new Error("Failed to save message");
      setOpen(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label>
        Sender
        <select
          value={senderId}
          onChange={e => setSenderId(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select a sender</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </label>
      <label>
        Receiver
        <select
          value={receiverId}
          onChange={e => setReceiverId(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select a receiver</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </label>
      <label>
        Content
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </label>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        className="bg-lamaYellow rounded px-4 py-2 font-semibold"
        disabled={loading}
      >
        {loading ? "Saving..." : type === "create" ? "Create Message" : "Update Message"}
      </button>
    </form>
  );
};

export default MessageForm; 