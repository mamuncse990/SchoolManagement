import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserFormProps {
  setOpen: (open: boolean) => void;
  type: "create" | "update";
  data?: any; // user data for update
  relatedData?: any; // for future use (e.g., roles)
}

interface Role {
  id: number;
  name: string;
}

const UserForm: React.FC<UserFormProps> = ({ setOpen, type, data }) => {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [form, setForm] = useState({
    name: data?.name || "",
    email: data?.email || "",
    password: "",
    roleId: data?.roleId || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("/api/roles");
        if (!response.ok) {
          throw new Error("Failed to fetch roles");
        }
        const rolesData = await response.json();
        setRoles(rolesData);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        roleId: form.roleId,
      };
      let response;
      if (type === 'create') {
        response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        // For update, don't send password if not changed
        if (!payload.password) delete (payload as any).password;
        response = await fetch(`/api/users/${data.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to save user');
        setLoading(false);
        return;
      }
      router.refresh();
      setOpen(false);
    } catch (error) {
      alert('An error occurred while saving the user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 rounded"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 rounded"
        required
      />
      {type === "create" && (
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="border p-2 rounded"
          required
        />
      )}
      <select
        name="roleId"
        value={form.roleId}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      >
        <option value="">Select a role</option>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Loading...' : (type === "create" ? "Add User" : "Update User")}
        </button>
        <button
          type="button"
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={() => setOpen(false)}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm; 