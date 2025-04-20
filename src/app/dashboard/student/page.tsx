'use client';

import { useEffect, useState } from 'react';
import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalendar";
import { useAuth } from "@/context/AuthContext";

const StudentPage = () => {
  const { id, role } = useAuth();
  const [classItem, setClassItem] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        console.log('Fetching classes for id:', id);
        const response = await fetch(`/api/classes?userId=${id}`);
        const data = await response.json();
        console.log('API response:', data);
        setClassItem(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };
    
    if (id) {
      console.log('Current user ID:', id);
      fetchClasses();
    }
  }, [id]);

  console.log('Current classItem:', classItem);

  if (!id || role !== 'student') {
    return <div>Please sign in to view your schedule</div>;
  }

  if (!classItem || classItem.length === 0) {
    return <div>No classes found</div>;
  }

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          {classItem && classItem[0] && (
            <BigCalendarContainer type="classId" id={classItem[0].id} />
          )}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
