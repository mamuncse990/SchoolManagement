"use client";

import Link from "next/link";
import styles from "./MenuSection.module.css";
import Image from "next/image";
import { useState } from "react";

const menuItems = [
  { 
    label: "HOME", 
    href: "/websites" 
  },
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
      { label: "Registration System", href: "/websites/admission/registration" }
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
  },
  { 
    label: "LOGIN", 
    href: "/login",
   
  }
];

export default function MenuSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});

  const toggleSubmenu = (label: string, e: React.MouseEvent) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setOpenSubmenus(prev => ({
        ...prev,
        [label]: !prev[label]
      }));
    }
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    setOpenSubmenus({});
  };

  return (
    <nav className={styles.menuSection}>
      <div className={styles.mobileHeader}>
        <button
          className={styles.hamburger}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
        </button>
      </div>
      
      <div className={menuOpen ? `${styles.menuGrid} ${styles.menuOpen}` : styles.menuGrid}>
        {menuItems.map((item, index) => (
          <div 
            key={item.label} 
            className={styles.menuContainer}
            style={{ transitionDelay: menuOpen ? `${index * 0.05}s` : '0s' }}
          >
            <Link 
              href={item.href} 
              className={styles.menuItem} 
              onClick={(e) => item.hasSubmenu ? toggleSubmenu(item.label, e) : handleLinkClick()}
            >
              {item.label}
              {item.hasSubmenu && (
                <span className={`${styles.arrow} ${openSubmenus[item.label] ? styles.arrowOpen : ''}`}>
                  ▼
                </span>
              )}
            </Link>
            {item.subItems && (
              <div className={`${styles.submenu} ${openSubmenus[item.label] ? styles.submenuOpen : ''}`}>
                {item.subItems.map((subItem, subIndex) => (
                  <Link 
                    key={subItem.href} 
                    href={subItem.href} 
                    className={styles.submenuItem}
                    onClick={handleLinkClick}
                    style={{ transitionDelay: `${subIndex * 0.03}s` }}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}