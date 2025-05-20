import Image from "next/image";
import Link from "next/link";
import styles from "./TeachersSection.module.css";

export default function TeachersSection() {
  const teachers = [
    {
      id: 1,
      name: "MD. HARUNUR RASID TALUKDER",
      position: "Head Teacher",
      image: "/images/teachers/head-teacher.jpg"
    },
    {
      id: 2,
      name: "MOHAMMAD MOHIBUR RAHMAN",
      position: "Asst. Head Teacher",
      image: "/images/teachers/asst-head.jpg"
    },
    {
      id: 3,
      name: "MD. GIAS UDDIN",
      position: "Senior Teacher",
      image: "/images/teachers/senior-teacher.jpg"
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Teachers</h2>
        <div className={styles.teachersGrid}>
          {teachers.map((teacher) => (
            <div key={teacher.id} className={styles.teacherCard}>
              <div className={styles.teacherImage}>
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  width={200}
                  height={200}
                />
              </div>
              <div className={styles.teacherInfo}>
                <h3>{teacher.name}</h3>
                <p>{teacher.position}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.teachersActions}>
          <Link href="/teachers" className="btn btn-primary">
            View All Teachers
          </Link>
        </div>
      </div>
    </section>
  );
} 