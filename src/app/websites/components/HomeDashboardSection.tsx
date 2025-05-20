import GridMenuSection from "./GridMenuSection";
import NoticeSection from "./NoticeSection";
import styles from "./HomeDashboardSection.module.css";

export default function HomeDashboardSection() {
  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.menuArea}>
        <GridMenuSection />
      </div>
      <div className={styles.noticeArea}>
        <NoticeSection />
      </div>
    </div>
  );
} 