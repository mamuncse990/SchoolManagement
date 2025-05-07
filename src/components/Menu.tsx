"use client";

import { useAuth } from '@/context/AuthContext';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PrismaClient, User } from '@prisma/client';

type UserList = User & { role: { name: string } | null };

type MenuItem = {
  icon: string;
  label: string;
  href: string | ((userRole: string | null, userId: string | null) => string);
  visible: string[];
};

const menuItems = [
  {
    title: "MENU",
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
    title: "OTHER",
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
  },
];

const Menu = () => {
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

  //console.log('Filtered menu items:', filteredMenuItems);

  return (
    <div className="mt-4 text-sm h-auto max-h-[calc(100vh-20px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] hover:[&::-webkit-scrollbar]:block hover:[-ms-overflow-style:auto] hover:[scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
      {filteredMenuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {section.title}
          </span>
          {section.items.map((item) => (
            <Link
              href={typeof item.href === 'function' ? item.href(userRole, id) : item.href}
              key={item.label}
              className={`flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight ${
                pathname === (typeof item.href === 'function' ? item.href(userRole, id) : item.href)
                  ? 'bg-lamaSkyLight text-lamaBlue' 
                  : 'text-gray-500'
              }`}
            >
              <Image src={item.icon} alt="" width={20} height={20} />
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
