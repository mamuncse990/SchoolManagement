import Link from "next/link";
import styles from "./MenuSection.module.css";

const menuItems = [
  { label: "Student List", icon: "👥", href: "/students", large: true },
  { label: "Our Teachers", icon: "🧑‍🏫", href: "/teachers", large: true },
  { label: "Attendance Sheet", icon: "✔️", href: "/attendance" },
  { label: "Result", icon: "⚡", href: "/result" },
  { label: "Exam Schedule", icon: "🔔", href: "/exam-schedule" },
  { label: "News", icon: "📄", href: "/news" },
  { label: "Routine", icon: "®️", href: "/routine" },
  { label: "Gallery", icon: "🖼️", href: "/gallery" },
];

export default function MenuSection() {
  return (
    <section className={styles.menuSection}>
      <div className={styles.menuGridTwo}>
        {menuItems.slice(0, 2).map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className={styles.menuCard}
          >
            <div className={styles.menuIcon}>{item.icon}</div>
            <div className={styles.menuLabel}>{item.label}</div>
          </Link>
        ))}
      </div>
      <div className={styles.menuGridThree}>
        {menuItems.slice(2).map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className={styles.menuCard}
          >
            <div className={styles.menuIcon}>{item.icon}</div>
            <div className={styles.menuLabel}>{item.label}</div>
          </Link>
        ))}
      </div>
    </section>
  );
} 