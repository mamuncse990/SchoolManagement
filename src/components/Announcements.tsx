"use client";

import { useState, useEffect } from 'react';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcements', {
          credentials: 'include'
        });
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return <div>Loading announcements...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Announcements</h2>
      {announcements.length > 0 ? (
        <ul className="space-y-2">
          {announcements.map((announcement: any) => (
            <li key={announcement.id} className="border-b pb-2">
              <h3 className="font-medium">{announcement.title}</h3>
              <p className="text-sm text-gray-600">{announcement.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No announcements available.</p>
      )}
    </div>
  );
}
