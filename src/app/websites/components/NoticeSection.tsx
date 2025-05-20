"use client";

import Link from "next/link";
import styles from "./NoticeSection.module.css";
import { useState, useEffect } from "react";

export default function NoticeSection() {
  const [startIndex, setStartIndex] = useState(0);
  const notices = [
    {
      id: 1,
      title: "২১শে ফেব্রুয়ারী উদযাপন",
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
    },
    {
      id: 4,
      title: "Class Nine Test Exam Routine-2025",
      date: "20 Oct, 2024",
      link: "/notice/3"
    }
  ];

  // Create a doubled array for seamless loop
  const duplicatedNotices = [...notices, ...notices];

  const [isPaused, setIsPaused] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('normal');

  useEffect(() => {
    const wrapper = document.querySelector(`.${styles.noticeWrapper}`) as HTMLElement;
    if (wrapper) {
      wrapper.style.animationPlayState = isPaused ? 'paused' : 'running';
      wrapper.style.animationDirection = scrollDirection;
    }
  }, [isPaused, scrollDirection]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setScrollDirection('normal');
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleScrollUp = () => {
    setScrollDirection('reverse');
    setIsPaused(false);
  };

  const handleScrollDown = () => {
    setScrollDirection('normal');
    setIsPaused(false);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const visibleNotices = notices.slice(startIndex, startIndex + 3);

  return (
    <section className={styles.noticeSectionBox}>
      <div className={styles.noticeHeader}>
        <span className={styles.quoteIcon}>&#10077;</span>
        <span className={styles.noticeTitle}>NOTICE BOARD</span>
      </div>
      <div className={styles.noticeList}>
        <div 
          className={styles.noticeWrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {duplicatedNotices.map((notice, index) => (
            <div key={`${notice.id}-${index}`} className={styles.noticeRow}>
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
      </div>
      <div className={styles.noticeFooter}>
        <Link href="/notice" className={styles.moreBtn}>
          <span className={styles.moreIcon}>&#9776;</span> More
        </Link>
        <div className={styles.scrollButtons}>
          <button 
            className={styles.arrowBtn} 
            onClick={handleScrollUp}
          >
            <span>&#9650;</span>
          </button>
          <button 
            className={styles.arrowBtn} 
            onClick={handleScrollDown}
          >
            <span>&#9660;</span>
          </button>
        </div>
      </div>
    </section>
  );
}