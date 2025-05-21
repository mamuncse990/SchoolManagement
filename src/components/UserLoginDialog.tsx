"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

interface UserLoginDialogProps {
  open: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const UserLoginDialog: React.FC<UserLoginDialogProps> = ({
  open,
  onClose,
  user,
}) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  if (!open) return null;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/switch-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          password: password,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        // Clear existing session data
        localStorage.clear();
        sessionStorage.clear();

        // Wait for session to clear
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Use AuthContext login
        await login(
          data.user.role?.toLowerCase() || "user",
          data.user.id.toString(),
          data.user.name
        );

        toast.success(`Successfully logged in as ${user.name}`);
        onClose();

        // Wait for session to update
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Redirect based on role
        const dashboardRoutes: Record<string, string> = {
          admin: "/dashboard/admin",
          teacher: "/dashboard/teacher",
          student: "/dashboard/student",
          parent: "/dashboard/parent",
          user: "/dashboard",
        };

        const role = data.user.role?.toLowerCase() || "user";
        const redirectPath = dashboardRoutes[role] || "/dashboard";

        // Force a complete page reload with new route
        window.location.href = redirectPath;
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred while logging in");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6">Login as {user.name}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded p-2"
              required
            />
          </div>{" "}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple hover:bg-blue-600 transition duration-200"
            >
              <Image src="/cancel.png" alt="Cancel" width={14} height={14} />
              
            </button>
            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple hover:bg-blue-600 transition duration-200"
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  <Image src="/right-click.png" alt="Login" width={14} height={14} />
                 
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLoginDialog;
