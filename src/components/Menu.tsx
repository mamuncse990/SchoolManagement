"use client";

import { useAuth } from '@/context/AuthContext';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PrismaClient, User } from '@prisma/client';
import { useRouter } from 'next/navigation';

type UserList = User & { role: { name: string } | null };

// First, update the MenuItem type to include nested submenus
type MenuItem = {
  icon?: string;
  label: string;
  href: string | ((userRole: string | null, userId: string | null) => string);
  visible: string[];
  hasSubmenu?: boolean;
  subItems?: {
    label: string;
    href: string;
    hasSubmenu?: boolean;
    subItems?: {
      label: string;
      href: string;
    }[];
  }[];
};

// Add this type for menu state management
type MenuState = {
  [key: string]: boolean;
};

// Update the menuItems structure
const menuItems: { items: MenuItem[] }[] = [
  {
    items: [
      {
        label: "WEBSITES",
        href: "/websites",
        icon: "/home.png",
        hasSubmenu: true,
        visible: ["admin", "teacher", "student", "parent"],
        subItems: [
          {
            label: "ABOUT",
            href: "/about",
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
            href: "/contact"
          },
          { 
            label: "ALUMNI", 
            href: "/alumni",
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

// Update the Menu component
const Menu = () => {
  // Add router
  const router = useRouter();
  
  // Add state for collapsed/expanded menus
  const [expandedMenus, setExpandedMenus] = useState<MenuState>({});
  
  const auth = useAuth();
  const pathname = usePathname();
  const { role, id } = auth;

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedId = localStorage.getItem('id');

    if (storedRole && storedId && (!role || !id)) {
      console.log('Found stored credentials:', { role: storedRole, id: storedId });
      auth.login(storedRole, storedId);
    }
  }, [role, id, auth]);

  const userRole = auth.role || localStorage.getItem('role') || null;
  console.log('Current user role:', userRole);
  console.log('LocalStorage role:', localStorage.getItem('role'));
  console.log('Auth context role:', auth.role);

  const filteredMenuItems = menuItems.map(section => ({
    ...section,
    items: section.items.filter(item => 
      userRole === null 
        ? item.visible.includes("student") && 
          item.visible.includes("teacher") && 
          item.visible.includes("parent") && 
          item.visible.includes("admin")
        : item.visible.includes(userRole)
    )
  }));

  // Add toggle function
  const toggleSubmenu = (label: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Update the click handler function
  const handleMenuClick = (item: MenuItem, event: React.MouseEvent) => {
    event.preventDefault();
    
    if (item.hasSubmenu) {
      toggleSubmenu(item.label);
    } else {
      const href = typeof item.href === 'function' ? item.href(userRole, id) : item.href;
      router.push(href);
    }
  };

  // Update the Menu component's return statement
  return (
    <div className="mt-4 text-sm h-auto max-h-[calc(100vh-20px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] hover:[&::-webkit-scrollbar]:block hover:[-ms-overflow-style:auto] hover:[scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
      {filteredMenuItems.map((section, index) => (
        <div className="flex flex-col gap-2" key={index}>
          {section.items.map((item) => (
            <div key={item.label}>
              <div
                className={`flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight cursor-pointer ${
                  pathname === (typeof item.href === 'function' ? item.href(userRole, id) : item.href)
                    ? 'bg-lamaSkyLight text-lamaBlue' 
                    : 'text-gray-500'
                }`}
                onClick={(e) => handleMenuClick(item, e)}
              >
                <div className="flex items-center justify-center lg:justify-start gap-4 flex-1">
                  {item.icon && <Image src={item.icon} alt="" width={20} height={20} />}
                  <span className="hidden lg:block">{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedMenus[item.label] ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>
              {item.hasSubmenu && item.subItems && expandedMenus[item.label] && (
                <div className="ml-8 mt-2">
                  {item.subItems.map((subItem) => (
                    <div key={subItem.label}>
                      <div
                        className={`flex items-center py-2 px-4 text-sm hover:bg-lamaSkyLight rounded-md cursor-pointer ${
                          pathname === subItem.href ? 'bg-lamaSkyLight text-lamaBlue' : 'text-gray-500'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (subItem.hasSubmenu) {
                            toggleSubmenu(`${item.label}-${subItem.label}`);
                          } else {
                            router.push(subItem.href);
                          }
                        }}
                      >
                        <span className="flex-1">{subItem.label}</span>
                        {subItem.hasSubmenu && (
                          <svg className={`w-4 h-4 transition-transform duration-200 ${
                            expandedMenus[`${item.label}-${subItem.label}`] ? 'transform rotate-180' : ''
                          }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </div>
                      {subItem.hasSubmenu && subItem.subItems && expandedMenus[`${item.label}-${subItem.label}`] && (
                        <div className="ml-8 mt-2">
                          {subItem.subItems.map((nestedItem) => (
                            <Link
                              key={nestedItem.label}
                              href={nestedItem.href}
                              className={`flex items-center py-2 px-4 text-sm hover:bg-lamaSkyLight rounded-md ${
                                pathname === nestedItem.href ? 'bg-lamaSkyLight text-lamaBlue' : 'text-gray-500'
                              }`}
                            >
                              {nestedItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
