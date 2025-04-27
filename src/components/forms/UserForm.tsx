import React, { useState, useEffect } from "react";

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
  const [roles, setRoles] = useState<Role[]>([]);
  const [form, setForm] = useState({
    name: data?.name || "",
    email: data?.email || "",
    password: "",
    roleId: data?.roleId || "",
  });

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
    // TODO: Implement API call for create/update user
    setOpen(false);
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
        >
          {type === "create" ? "Add User" : "Update User"}
        </button>
        <button
          type="button"
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm; 