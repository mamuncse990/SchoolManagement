'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Get relevant menu items from the websites section of Menu.tsx
const menuItems = [
  {
    items: [
      {
        label: "WEBSITES",
        href: "/websites",
        icon: "/websites.png",
        hasSubmenu: true,
        visible: ["admin", "teacher", "student", "parent"],
        subItems: [
          {
            label: "ABOUT",
            href: "/about",
            icon: "/about.png",
            hasSubmenu: true,
            subItems: [
              { label: "About Us", href: "/websites/about/about-us" },
              { label: "Founder & Doner List", href: "/websites/about/founder-doner" },
              { label: "History", href: "/websites/about/history" },
              { label: "Our Vision", href: "/websites/about/vision" },
              { label: "Campus Tour", href: "/websites/about/campus-tour" },
              { label: "Achievements", href: "/websites/about/achievements" },
              { label: "Honorable Chairman", href: "/websites/about/chairman" },
              { label: "Governing Body", href: "/websites/about/governing-body" },
              { label: "Ex Governing Body", href: "/websites/about/ex-governing-body" },
              { label: "Our Principal", href: "/websites/about/principal" },
              { label: "Our Ex Principals", href: "/websites/about/ex-principals" },
              { label: "Administrator", href: "/websites/about/administrator" }
            ]
          },
          { 
            label: "INFORMATION", 
            href: "/information",
            icon: "/information.png",
            hasSubmenu: true,
            subItems: [
              { label: "Teaching Permission & Recognition Letter", href: "/websites/information/teaching-permission" },
              { label: "Nationalization", href: "/websites/information/nationalization" },
              { label: "Statistics Report", href: "/websites/information/statistics" },
              { label: "Govt. Approval Letter", href: "/websites/information/approval-letter" }
            ]
          },
          { 
            label: "ACADEMIC", 
            href: "/academic",
            icon: "/academic.png",
            hasSubmenu: true,
            subItems: [
              { label: "Class Schedule", href: "/websites/academic/class-schedule" },
              { label: "Our Teachers", href: "/websites/academic/teachers" },
              { label: "Prior Teachers", href: "/websites/academic/prior-teachers" },
              { label: "Our Staffs", href: "/websites/academic/staffs" },
              { label: "Prior Staffs", href: "/websites/academic/prior-staffs" },
              { label: "Academic Rules", href: "/websites/academic/rules" },
              { label: "Academic Calendar", href: "/websites/academic/calendar" },
              { label: "Attendance Sheet", href: "/websites/academic/attendance" },
              { label: "Leave Information", href: "/websites/academic/leave" }
            ]
          },
          { 
            label: "ADMISSION", 
            href: "/admission",
            icon: "/admission.png",
            hasSubmenu: true,
            subItems: [
              { label: "Why Study ?", href: "/websites/admission/why-study" },
              { label: "How To Apply ?", href: "/websites/admission/how-to-apply" },
              { label: "Admission Test", href: "/websites/admission/test" },
              { label: "Admission Policy", href: "/websites/admission/policy" },
              { label: "Online Registration", href: "/websites/admission/registration" }
            ]
          },
          { 
            label: "STUDENT", 
            href: "/student",
            icon: "/student.png",
            hasSubmenu: true,
            subItems: [
              { label: "Student List", href: "/websites/student/list" },
              { label: "Tuition Fees", href: "/websites/student/fees" },
              { label: "Mobile Banking", href: "/websites/student/banking" },
              { label: "Daily Activities", href: "/websites/student/activities" },
              { label: "Exam Schedule", href: "/websites/student/exam-schedule" },
              { label: "Student Uniform", href: "/websites/student/uniform" },
              { label: "Exam System", href: "/websites/student/exam-system" },
              { label: "Rules & Regulation", href: "/websites/student/rules" },
              { label: "Verify Certificate", href: "/websites/student/verify-certificate" }
            ]
          },
          { 
            label: "FACILITIES", 
            href: "/facilities",
            icon: "/facilities.png",
            hasSubmenu: true,
            subItems: [
              { label: "Library", href: "/websites/facilities/library" },
              { label: "Play Ground", href: "/websites/facilities/playground" },
              { label: "Physics Lab", href: "/websites/facilities/physics-lab" },
              { label: "Biology Lab", href: "/websites/facilities/biology-lab" },
              { label: "ICT Lab", href: "/websites/facilities/ict-lab" },
              { label: "Chemistry Lab", href: "/websites/facilities/chemistry-lab" },
              { label: "Co Curricular Activity", href: "/websites/facilities/co-curricular" }
            ]
          },
          { 
            label: "RESULT", 
            href: "/result",
            icon: "/result.png",
            hasSubmenu: true,
            subItems: [
              { label: "Result", href: "/websites/result/view" },
              { label: "Academic Result", href: "/websites/result/academic" },
              { label: "Evaluation", href: "/websites/result/evaluation" },
              { label: "Board Exam", href: "/websites/result/board-exam" }
            ]
          },
          { 
            label: "OTHERS", 
            href: "/others",
            icon: "/others.png",
            hasSubmenu: true,
            subItems: [
              { label: "Notice", href: "/websites/others/notice" },
              { label: "News", href: "/websites/others/news" },
              { label: "Gallery", href: "/websites/others/gallery" },
              { label: "Events", href: "/websites/others/events" },
              { label: "Routine Download", href: "/websites/others/routine" }
            ]
          },
          { 
            label: "CONTACT", 
            href: "/contact",
            icon: "/contact.png",
          },
          { 
            label: "ALUMNI", 
            href: "/alumni",
            icon: "/alumni.png",
            hasSubmenu: true,
            subItems: [
              { label: "Alumni Registration", href: "/websites/alumni/register" },
              { label: "Alumni List", href: "/websites/alumni/list" }
            ]
          }
        ]
      }
    ]
  },
  {
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/websites",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/dashboard.png",
        label: "Dashboard",
        href: (userRole: string | null, userId: string | null) => {
          if (userRole === 'admin') {
            return '/dashboard/admin';
          } else {
            return `/dashboard/${userRole}/${userId}`;
          }
        },
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/customer.png",
        label: "Users",
        href: "/dashboard/list/users",
        visible: ["admin"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/dashboard/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/dashboard/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/dashboard/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/dashboard/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/dashboard/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/dashboard/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/dashboard/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/dashboard/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/dashboard/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/dashboard/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/dashboard/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/dashboard/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/dashboard/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/dashboard/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/dashboard/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  }
];

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFontSizeOpen, setIsFontSizeOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState(100);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user } = useAuth(); // Add this line to get the user from AuthContext

  // Add console log to debug user data
  useEffect(() => {
    console.log('Current user:', user);
  }, [user]);

  const filteredMenuItems = menuItems.flatMap(menu => menu.items).filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setSearchQuery('');
  };

  const handleMenuItemClick = (path: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    router.push(path);
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    document.documentElement.style.fontSize = `${size}%`;
  };

  return (
    <>
      <div className="w-full h-[50px] bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-40">
        {/* Left Side Icons */}
        <div className="flex items-center gap-6">
          <button className="text-gray-500 hover:text-gray-700">
            <Image src="/calendar.png" alt="Calendar" width={20} height={20} className="opacity-60" />
          </button>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6">
          {/* Text Size */}
          <div className="relative">
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsFontSizeOpen(!isFontSizeOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <text x="50%" y="65%" fontSize="16" textAnchor="middle" fill="currentColor" className="font-bold">T</text>
                <text x="50%" y="85%" fontSize="12" textAnchor="middle" fill="currentColor">T</text>
              </svg>
            </button>

            {/* Font Size Dropdown */}
            {isFontSizeOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700 font-medium">Font Size</span>
                    <span className="text-gray-500">{fontSize}%</span>
                  </div>
                  <div className="w-full flex items-center gap-2">
                    <span className="text-gray-500 text-sm">70%</span>
                    <input
                      type="range"
                      min="70"
                      max="130"
                      value={fontSize}
                      step="10"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                    />
                    <span className="text-gray-500 text-sm">130%</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    {[70, 80, 90, 100, 110, 120, 130].map((size) => (
                      <div key={size} className="text-[10px] text-gray-400">{size}%</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative" ref={searchRef}>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={handleSearchClick}
            >
              <Image src="/search.png" alt="Search" width={20} height={20} className="opacity-60" />
            </button>

            {/* Search Overlay */}
            {isSearchOpen && (
              <>
                <div className="fixed inset-0 bg-black bg-opacity-5 z-50" onClick={() => setIsSearchOpen(false)} />
                <div className="fixed inset-x-0 top-0 bg-white border-b shadow-sm z-50">
                  <div className="container mx-auto">
                    <div className="flex items-center h-[50px] px-4 gap-3">
                      <Image src="/search.png" alt="Search" width={20} height={20} className="opacity-60" />
                      <input
                        type="text"
                        placeholder="Search menus..."
                        className="flex-1 text-base text-gray-600 placeholder-gray-400 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      <button 
                        onClick={() => setIsSearchOpen(false)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <Image src="/close.png" alt="Close" width={16} height={16} className="opacity-60" />
                      </button>
                    </div>
                    {/* Menu Items - only show when there's an active search query */}
                    {searchQuery.trim() !== '' && filteredMenuItems.length > 0 && (
                      <div className="px-4 py-3 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8">
                          {filteredMenuItems.map((item) => (
                            <button
                              key={typeof item.href === 'string' ? item.href : 'dynamic-key'}
                              onClick={() => {
                                const path = typeof item.href === 'function' ? item.href(null, null) : item.href;
                                handleMenuItemClick(path);
                              }}
                              className="flex items-center gap-3 text-gray-700 hover:text-gray-900"
                            >
                              <div className="w-5 h-5 opacity-60">
                                <Image src={item.icon} alt={item.label} width={20} height={20} />
                              </div>
                              <span className="text-[15px]">{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Profile */}
          <div className="relative">
            
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:bg-gray-50 py-1 px-2 rounded-md"
            >
              
              <span className="text-gray-700 text-sm font-medium">
                {user && user.name ? user.name : 'Guest'}
              </span>
              <Image
                // src={user?.image || '/avatar.png'}
                src={'/avatar.png'}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                <div className="py-1">
                  <Link href="/dashboard/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Image src="/profile.png" alt="My Profile" width={16} height={16} className="mr-2 opacity-60" />
                    My Profile
                  </Link>
                  <Link href="/dashboard/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Image src="/setting.png" alt="Edit Profile" width={16} height={16} className="mr-2 opacity-60" />
                    Edit Profile
                  </Link>
                  <Link href="/logout" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Image src="/logout.png" alt="Logout" width={16} height={16} className="mr-2 opacity-60" />
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
