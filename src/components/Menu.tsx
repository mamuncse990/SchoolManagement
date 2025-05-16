"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PrismaClient, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { masterDataConfigs } from "@/app/masterSetupConfig/masterDataConfig";

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
    icon?: string;
    subItems?: {
      label: string;
      href: string;
      icon?: string;
    }[];
  }[];
};

// Add this type for menu state management
type MenuState = {
  [key: string]: boolean;
};

const getMasterDataSubItems = () => {
  return Object.entries(masterDataConfigs).map(([key, config]) => ({
    label: config.label,
    href: `/dashboard/masterSetup/master-data/${key}`,
    icon: config.icon,
  }));
};

// Update the menuItems structure
const menuItems: { items: MenuItem[] }[] = [
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
              {
                label: "Founder & Doner List",
                href: "/websites/about/founder-doner",
              },
              { label: "History", href: "/websites/about/history" },
              { label: "Our Vision", href: "/websites/about/vision" },
              { label: "Campus Tour", href: "/websites/about/campus-tour" },
              { label: "Achievements", href: "/websites/about/achievements" },
              { label: "Honorable Chairman", href: "/websites/about/chairman" },
              {
                label: "Governing Body",
                href: "/websites/about/governing-body",
              },
              {
                label: "Ex Governing Body",
                href: "/websites/about/ex-governing-body",
              },
              { label: "Our Principal", href: "/websites/about/principal" },
              {
                label: "Our Ex Principals",
                href: "/websites/about/ex-principals",
              },
              { label: "Administrator", href: "/websites/about/administrator" },
            ],
          },
          {
            label: "INFORMATION",
            href: "/information",
            icon: "/information.png",
            hasSubmenu: true,
            subItems: [
              {
                label: "Teaching Permission & Recognition Letter",
                href: "/websites/information/teaching-permission",
              },
              {
                label: "Nationalization",
                href: "/websites/information/nationalization",
              },
              {
                label: "Statistics Report",
                href: "/websites/information/statistics",
              },
              {
                label: "Govt. Approval Letter",
                href: "/websites/information/approval-letter",
              },
            ],
          },
          {
            label: "ACADEMIC",
            href: "/academic",
            icon: "/academic.png",
            hasSubmenu: true,
            subItems: [
              {
                label: "Class Schedule",
                href: "/websites/academic/class-schedule",
              },
              { label: "Our Teachers", href: "/websites/academic/teachers" },
              {
                label: "Prior Teachers",
                href: "/websites/academic/prior-teachers",
              },
              { label: "Our Staffs", href: "/websites/academic/staffs" },
              {
                label: "Prior Staffs",
                href: "/websites/academic/prior-staffs",
              },
              { label: "Academic Rules", href: "/websites/academic/rules" },
              {
                label: "Academic Calendar",
                href: "/websites/academic/calendar",
              },
              {
                label: "Attendance Sheet",
                href: "/websites/academic/attendance",
              },
              { label: "Leave Information", href: "/websites/academic/leave" },
            ],
          },
          {
            label: "ADMISSION",
            href: "/admission",
            icon: "/admission.png",
            hasSubmenu: true,
            subItems: [
              { label: "Why Study ?", href: "/websites/admission/why-study" },
              {
                label: "How To Apply ?",
                href: "/websites/admission/how-to-apply",
              },
              { label: "Admission Test", href: "/websites/admission/test" },
              { label: "Admission Policy", href: "/websites/admission/policy" },
              {
                label: "Online Registration",
                href: "/websites/admission/registration",
              },
            ],
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
              {
                label: "Daily Activities",
                href: "/websites/student/activities",
              },
              {
                label: "Exam Schedule",
                href: "/websites/student/exam-schedule",
              },
              { label: "Student Uniform", href: "/websites/student/uniform" },
              { label: "Exam System", href: "/websites/student/exam-system" },
              { label: "Rules & Regulation", href: "/websites/student/rules" },
              {
                label: "Verify Certificate",
                href: "/websites/student/verify-certificate",
              },
            ],
          },
          {
            label: "FACILITIES",
            href: "/facilities",
            icon: "/facilities.png",
            hasSubmenu: true,
            subItems: [
              { label: "Library", href: "/websites/facilities/library" },
              { label: "Play Ground", href: "/websites/facilities/playground" },
              {
                label: "Physics Lab",
                href: "/websites/facilities/physics-lab",
              },
              {
                label: "Biology Lab",
                href: "/websites/facilities/biology-lab",
              },
              { label: "ICT Lab", href: "/websites/facilities/ict-lab" },
              {
                label: "Chemistry Lab",
                href: "/websites/facilities/chemistry-lab",
              },
              {
                label: "Co Curricular Activity",
                href: "/websites/facilities/co-curricular",
              },
            ],
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
              { label: "Board Exam", href: "/websites/result/board-exam" },
            ],
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
              { label: "Routine Download", href: "/websites/others/routine" },
            ],
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
              {
                label: "Alumni Registration",
                href: "/websites/alumni/register",
              },
              { label: "Alumni List", href: "/websites/alumni/list" },
            ],
          },
        ],
      },
    ],
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
          if (userRole === "admin") {
            return "/dashboard/admin";
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
      // {
      //   icon: "/subject.png",
      //   label: "Subjects",
      //   href: "/dashboard/list/subjects",
      //   visible: ["admin"],
      // },
      // {
      //   icon: "/class.png",
      //   label: "Classes",
      //   href: "/dashboard/list/classes",
      //   visible: ["admin", "teacher"],
      // },
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
        label: "Master Data",
        href: "/master-data",
        icon: "/setting.png",
        hasSubmenu: true,
        visible: ["admin", "teacher"],
        subItems: getMasterDataSubItems(),
      },
    ],
  },
  // {
  //   items: [
  //     {
  //       icon: "/profile.png",
  //       label: "Profile",
  //       href: "/dashboard/profile",
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //     {
  //       icon: "/setting.png",
  //       label: "Settings",
  //       href: "/dashboard/settings",
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //     {
  //       icon: "/logout.png",
  //       label: "Logout",
  //       href: "/logout",
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //   ],
  // }
];

// Update the Menu component
const Menu = () => {
  // Add router
  const router = useRouter();

  // Add state for collapsed/expanded menus and overall menu collapse
  const [expandedMenus, setExpandedMenus] = useState<MenuState>({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  const auth = useAuth();
  const pathname = usePathname();
  const { role, id } = auth;

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedId = localStorage.getItem("id");
    const storedName = localStorage.getItem("name");

    if (storedRole && storedId && (!role || !id)) {
      console.log("Found stored credentials:", {
        role: storedRole,
        id: storedId,
        name: storedName,
      });
      auth.login(storedRole, storedId, storedName || "");
    }
  }, [role, id, auth]);

  const userRole = auth.role || localStorage.getItem("role") || null;

  const filteredMenuItems = menuItems.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      userRole === null
        ? item.visible.includes("student") &&
          item.visible.includes("teacher") &&
          item.visible.includes("parent") &&
          item.visible.includes("admin")
        : item.visible.includes(userRole)
    ),
  }));

  const toggleSubmenu = (label: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleMenuClick = (item: MenuItem, event: React.MouseEvent) => {
    event.preventDefault();

    if (item.hasSubmenu) {
      toggleSubmenu(item.label);
    } else {
      const href =
        typeof item.href === "function" ? item.href(userRole, id) : item.href;
      router.push(href);
    }
  };

  return (
    <div
      className={`relative flex flex-col ${
        isCollapsed ? "w-[60px]" : "w-[200px]"
      } transition-all duration-300 group bg-white min-h-screen`}
      onMouseEnter={() => isCollapsed && setIsCollapsed(false)}
      onMouseLeave={() => isCollapsed && setIsCollapsed(true)}
    >
      {/* Logo Header Section */}
      <div
        className={`px-2 py-2.5 border-b border-gray-100 flex items-center justify-between`}
        style={{ backgroundColor: isCollapsed ? "white" : "transparent" }}
      >
        <div className="flex items-center gap-3">
          <Image
            //src="/logo.png"
            src="/images/school.jpg"
            alt="School Logo"
            width={30}
            height={30}
            className="rounded-full"
          />
          <div
            className={`flex flex-col transition-opacity duration-300 ${
              isCollapsed
                ? "opacity-0 hidden group-hover:block group-hover:opacity-100"
                : "opacity-100"
            }`}
          >
            <span className="font-bold text-sm text-gray-700">
              Online Academy
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
        >
          <Image
            src="/expand-menu.png"
            alt="Expand Menu"
            width={16}
            height={16}
            className={`transform transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`mt-4 text-sm h-auto max-h-[calc(100vh-100px)] overflow-y-auto overflow-x-hidden relative w-full 
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] 
        hover:[&::-webkit-scrollbar]:block hover:[-ms-overflow-style:auto] hover:[scrollbar-width:thin] 
        [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 
        [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full
        ${
          isCollapsed
            ? "group-hover:w-[200px] group-hover:absolute group-hover:bg-white group-hover:shadow-lg group-hover:rounded-r-lg group-hover:z-50"
            : ""
        }`}
      >
        {filteredMenuItems.map((section, index) => (
          <div className="flex flex-col gap-2 w-full" key={index}>
            {section.items.map((item) => (
              <div key={item.label} className="w-full">
                <div
                  className={`flex items-center justify-center lg:justify-start gap-4 py-2 px-2 rounded-md hover:bg-lamaSkyLight cursor-pointer ${
                    pathname ===
                    (typeof item.href === "function"
                      ? item.href(userRole, id)
                      : item.href)
                      ? "bg-lamaSkyLight text-lamaBlue"
                      : "text-gray-500"
                  }`}
                  onClick={(e) => handleMenuClick(item, e)}
                >
                  <div className="flex items-center justify-center lg:justify-start gap-4 flex-1 min-w-0">
                    {item.icon && (
                      <Image src={item.icon} alt="" width={20} height={20} />
                    )}
                    <span
                      className={`whitespace-nowrap overflow-hidden ${
                        isCollapsed ? "hidden group-hover:block" : "block"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {item.hasSubmenu && !isCollapsed && (
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${
                        expandedMenus[item.label] ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
                {item.hasSubmenu &&
                  item.subItems &&
                  expandedMenus[item.label] &&
                  !isCollapsed && (
                    <div className="pl-4 mt-2 w-full">
                      {item.subItems.map((subItem) => (
                        <div key={subItem.label} className="w-full">
                          <div
                            className={`flex items-center py-2 px-4 text-sm hover:bg-lamaSkyLight rounded-md cursor-pointer ${
                              pathname === subItem.href
                                ? "bg-lamaSkyLight text-lamaBlue"
                                : "text-gray-500"
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
                            <div className="flex items-center flex-1 min-w-0">
                              {subItem.icon && (
                                <Image
                                  src={subItem.icon}
                                  alt=""
                                  width={16}
                                  height={16}
                                  className="mr-2 flex-shrink-0"
                                />
                              )}
                              <span className="truncate">{subItem.label}</span>
                            </div>
                            {subItem.hasSubmenu && (
                              <svg
                                className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                                  expandedMenus[
                                    `${item.label}-${subItem.label}`
                                  ]
                                    ? "transform rotate-180"
                                    : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            )}
                          </div>
                          {subItem.hasSubmenu &&
                            subItem.subItems &&
                            expandedMenus[`${item.label}-${subItem.label}`] && (
                              <div className="pl-4 mt-2 w-full">
                                {subItem.subItems.map((nestedItem) => (
                                  <Link
                                    key={nestedItem.label}
                                    href={nestedItem.href}
                                    className={`flex items-center py-2 px-4 text-sm hover:bg-lamaSkyLight rounded-md ${
                                      pathname === nestedItem.href
                                        ? "bg-lamaSkyLight text-lamaBlue"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    <span className="truncate">
                                      {nestedItem.label}
                                    </span>
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
    </div>
  );
};

export default Menu;
