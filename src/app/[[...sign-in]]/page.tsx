"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log('Attempting login...');
      
      const response = await fetch('/api/auth/verify-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      
      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error('Error parsing response:', error);
        throw new Error('Invalid response from server');
      }

      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.success) {
        const { user } = data;
        if (user && user.role && user.id) {
          login(user.role, user.id.toString());
        }
        
        // Verify the data was stored after a small delay
        setTimeout(() => {
          console.log('Delayed verification:');
          console.log('- localStorage role:', localStorage.getItem('role'));
          console.log('- sessionStorage role:', sessionStorage.getItem('role'));
        }, 100);

        // Navigate after successful login
        type UserRole = 'admin' | 'teacher' | 'student' | 'parent';
        const dashboardRoutes: Record<UserRole, string> = {
          admin: '/dashboard/admin',
          teacher: '/dashboard/teacher',
          student: '/dashboard/student',
          parent: '/dashboard/parent'
        };
        
        router.push(dashboardRoutes[user.role as UserRole] || '/dashboard');
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <div className="bg-white p-4 rounded-md shadow-xl flex flex-col gap-1 max-w-xs w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <h1 className="text-lg font-bold flex items-center gap-1 mb-1">
            <Image src="/logo.png" alt="" width={20} height={20} />
            Abc School
          </h1>
          <h2 className="text-gray-400 text-sm mb-2">Sign in to your account</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded text-xs mb-1" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <div className="flex flex-col gap-1 mb-1">
            <label className="text-xs text-gray-500">
              Email
            </label>
            <input
              type="email"
              required
              className="p-1.5 rounded-md ring-1 ring-gray-300 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <label className="text-xs text-gray-500">
              Password
            </label>
            <input
              type="password"
              required
              className="p-1.5 rounded-md ring-1 ring-gray-300 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white rounded-md text-xs p-2 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
