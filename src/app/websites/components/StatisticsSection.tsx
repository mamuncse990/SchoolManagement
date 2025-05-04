import styles from './StatisticsSection.module.css';

export default function StatisticsSection() {
  const stats = [
    {
      id: 1,
      number: "6",
      label: "Classes"
    },
    {
      id: 2,
      number: "398",
      label: "Students"
    },
    {
      id: 3,
      number: "18",
      label: "Teachers"
    },
    {
      id: 4,
      number: "5",
      label: "Staffs"
    }
  ];

  return (
    <section className={styles.statisticsSection}>
      <div className={styles.container}>
        <h2 className={styles.statisticsTitle}>Statistics</h2>
        <div className={styles.statisticsUnderline}></div>
        <div className={styles.statisticsSubtitle}>Our Organization At a Glance</div>
        <div className={styles.statisticsGrid}>
          {stats.map((stat, idx) => (
            <div key={stat.id} className={styles.statItem}>
              <div className={styles.statIcon}>
                {/* Example icons, replace with actual SVGs or images as needed */}
                {idx === 0 && <img src="/images/icons/classroom.png" alt="Classes" />}
                {idx === 1 && <img src="/images/icons/student-male.png" alt="Students" />}
                {idx === 2 && <img src="/images/icons/teacher.png" alt="Teachers" />}
                {idx === 3 && <img src="/images/icons/staff.png" alt="Staffs" />}
              </div>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 