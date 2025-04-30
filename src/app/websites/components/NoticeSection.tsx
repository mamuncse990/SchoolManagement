import Link from "next/link";
import styles from "./NoticeSection.module.css";

export default function NoticeSection() {
  const notices = [
    {
      id: 1,
      title: "২১শে ফেব্রুয়ারী উদযাপন",
      date: "21 Feb, 2025",
      link: "/notice/1"
    },
    {
      id: 2,
      title: "শ্রী শ্যামা পূজা উপলক্ষে বন্ধের নোটিশ-২০২৪",
      date: "30 Oct, 2024",
      link: "/notice/2"
    },
    {
      id: 3,
      title: "Class Ten Test Exam Routine-2024",
      date: "20 Oct, 2024",
      link: "/notice/3"
    }
  ];

  return (
    <section className={styles.noticeSectionBox}>
      <div className={styles.noticeHeader}>
        <span className={styles.quoteIcon}>&#10077;</span>
        <span className={styles.noticeTitle}>NOTICE BOARD</span>
      </div>
      <div className={styles.noticeList}>
        {notices.map((notice, idx) => (
          <div key={notice.id} className={styles.noticeRow}>
            <div className={styles.noticeBar}></div>
            <Link href={notice.link} className={styles.noticeLink}>
              <div className={styles.noticeText}>
                <span className={styles.noticeTitleText}>{notice.title}</span>
                <span className={styles.noticeDateText}>{notice.date}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.noticeFooter}>
        <Link href="/notice" className={styles.moreBtn}>
          <span className={styles.moreIcon}>&#9776;</span> More
        </Link>
        <button className={styles.arrowBtn}><span>&#x25BC;</span></button>
        <button className={styles.arrowBtn}><span>&#x25B2;</span></button>
      </div>
    </section>
  );
} 