"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMessage("");

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail })
      });

      const data = await response.json();

      if (response.ok) {
        setResetMessage("If an account exists with this email, you will receive password reset instructions.");
        setShowForgotPassword(false);
        setResetEmail("");
      } else {
        setResetMessage(data.message || "An error occurred");
      }
    } catch (error) {
      setResetMessage("An error occurred while processing your request");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      {showForgotPassword ? (
        <div className="bg-white p-4 rounded-md shadow-xl flex flex-col gap-1 max-w-xs w-full">
          <form onSubmit={handleForgotPassword} className="flex flex-col gap-1">
            <h1 className="text-lg font-bold flex items-center gap-1 mb-1">
              <Image src="/logo.png" alt="" width={20} height={20} />
              Reset Password
            </h1>
            <h2 className="text-gray-400 text-sm mb-2">Enter your email address</h2>
            
            {resetMessage && (
              <div className={`px-2 py-1 rounded text-xs mb-1 ${resetMessage.includes("error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                <span className="block sm:inline">{resetMessage}</span>
              </div>
            )}
            
            <div className="flex flex-col gap-1 mb-2">
              <label className="text-xs text-gray-500">
                Email
              </label>
              <input
                type="email"
                required
                className="p-1.5 rounded-md ring-1 ring-gray-300 text-sm"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={resetLoading}
              className={`bg-blue-500 text-white rounded-md text-xs p-2 w-full mb-2 ${resetLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {resetLoading ? 'Processing...' : 'Reset Password'}
            </button>
            
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="text-xs text-blue-500 hover:text-blue-700 hover:underline"
            >
              Back to Login
            </button>
          </form>
        </div>
      ) : (
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="p-1.5 rounded-md ring-1 ring-gray-300 text-sm w-full pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <Link 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setShowForgotPassword(true);
                  }}
                  className="text-xs text-blue-500 hover:text-blue-700 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
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
      )}
    </div>
  );
}
