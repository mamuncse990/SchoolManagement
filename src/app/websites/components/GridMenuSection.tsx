import Link from "next/link";
import Image from "next/image";
import styles from "./GridMenuSection.module.css";

const menuItems = [
  { label: "Student List", icon: "/student.png", href: "/student/list", large: true },
  { label: "Our Teachers", icon: "/teacher.png", href: "/academic/teachers", large: true },
  { label: "Attendance Sheet", icon: "/attendance.png", href: "/academic/attendance" },
  { label: "Result", icon: "/result.png", href: "/result/view" },
  { label: "Exam Schedule", icon: "/calendar.png", href: "/student/exam-schedule" },
  { label: "News", icon: "/announcement.png", href: "/others/news" },
  { label: "Routine", icon: "/calendar.png", href: "/others/routine" },
  { label: "Gallery", icon: "/images/gallery.png", href: "/others/gallery" },
];

export default function GridMenuSection() {
  return (
    <section className={styles.gridSection}>
      <div className={styles.gridContainerLarge}>
        {menuItems.slice(0, 2).map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className={styles.gridCard}
          >
            <div className={styles.cardInner}>
              <Image 
                src={item.icon} 
                alt={item.label} 
                width={48} 
                height={48}
                className={styles.cardIcon} 
              />
              <div className={styles.cardLabel}>{item.label}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.gridContainerSmall}>
        {menuItems.slice(2).map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className={styles.gridCard}
          >
            <div className={styles.cardInner}>
              <Image 
                src={item.icon} 
                alt={item.label}
                width={32} 
                height={32}
                className={styles.cardIcon}
              />
              <div className={styles.cardLabel}>{item.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}