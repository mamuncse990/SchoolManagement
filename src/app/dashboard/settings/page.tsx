"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { id, logout } = useAuth();

  useEffect(() => {
    if (!id) {
      router.push('/login');
    }
  }, [id, router]);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!id) {
      setError('You must be logged in to change your password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: parseInt(id), // Convert id to number
          currentPassword,
          newPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        setTimeout(() => {
          logout(); // Call logout to clear auth state
          router.push('/sign-in'); // Redirect to sign-in page
        }, 1500); // Wait 1.5 seconds to show success message
      } else {
        setError(data.message || 'Failed to change password');
        if (response.status === 401) {
          // Handle unauthorized cases
          if (data.message.includes('token')) {
            router.push('/login');
          }
        }
      }
    } catch (error) {
      setError('An error occurred while changing password');
      console.error('Error changing password:', error);
    }
  }

  if (!id) {
    return null;
  }

  return (
    <div className="flex">
      <main className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-blue-600 mb-6">Settings</h1>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
              
              {message && (
                <div className="text-green-500 text-sm mt-2">{message}</div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}