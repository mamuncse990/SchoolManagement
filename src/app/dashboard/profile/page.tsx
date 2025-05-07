"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  interface User {
    name?: string;
    email?: string;
    img?: string;
    createdAt?: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = localStorage.getItem('user');
        if (!user) {
          router.push('/login');
          return;
        }
        const parsedUserId = JSON.parse(user).id;
        if (!parsedUserId) {
          router.push('/login');
          return;
        }

        if (!parsedUserId) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/auth/verify-user', {
          headers: {
            'x-user-id': parsedUserId,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/login');
      }
    }

    fetchUser();
  }, [router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      <main className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">User Profile</h1>
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <Image
                src={user.img || '/noAvatar.png'}
                alt="User Avatar"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{user.name || 'No Name'}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <div className="mb-2">
              <span className="font-medium">Full Name:</span> {user.name || 'No Name'}
            </div>
            <div className="mb-2">
              <span className="font-medium">Email:</span> {user.email}
            </div>
            <div>
              <span className="font-medium">Account Created:</span> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
            </div>
          </div>
          {/* <div className="flex justify-between mt-6">
            <button
              onClick={() => router.push('/')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Back
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Edit Profile
            </button>
          </div> */}
        </div>
      </main>
    </div>
  );
}