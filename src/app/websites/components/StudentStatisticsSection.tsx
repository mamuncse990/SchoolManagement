import styles from './StudentStatisticsSection.module.css';

export default function StudentStatisticsSection() {
  const classStats = [
    { id: 1, number: 5, label: 'Old Ten' },
    { id: 2, number: 20, label: 'Six' },
    { id: 3, number: 78, label: 'Seven' },
    { id: 4, number: 107, label: 'Eight' },
    { id: 5, number: 99, label: 'Nine' },
    { id: 6, number: 89, label: 'Ten' },
  ];

  return (
    <section className={styles.studentStatisticsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Student Statistics</h2>
        <div className={styles.underline}></div>
        <div className={styles.subtitle}>Class wise Students</div>
        <div className={styles.statsGrid}>
          {classStats.map((stat) => (
            <div key={stat.id} className={styles.statCard}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 