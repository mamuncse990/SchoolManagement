"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { FaTwitter, FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const notices = [
    { id: 1, title: "২১শে ফেব্রুয়ারী উদযাপন", link: "/notice/1" },
    { id: 2, title: "শ্রী শ্যামা পূজা উপলক্ষে বন্ধের নোটিশ-২০২৪", link: "/notice/2" },
    { id: 3, title: "Class Ten Test Exam Routine-2024", link: "/notice/3" },
    { id: 4, title: "২১শে ফেব্রুয়ারী উদযাপন", link: "/notice/1" },
    { id: 5, title: "২১শে ফেব্রুয়ারী উদযাপন", link: "/notice/1" },
  ];

  return (
    <header className={styles.header}>
      {/* Top Bar */}
      <div className={styles["header-top-bar"]}>
        <div className={styles["header-top-left"]}>
          <span className="icon email-icon">📧</span>
          <span className="header-contact-email">abcschool@gmail.com</span>
          <span className="icon phone-icon">📞</span>
          <span className="header-contact-phone">01916006330</span>
        </div>
        <div className={styles["header-top-right"]}>
          <FaTwitter className={styles["social-icon"]} />
          <FaFacebookF className={styles["social-icon"]} />
          <FaInstagram className={styles["social-icon"]} />
          <FaWhatsapp className={styles["social-icon"]} />
          <FaYoutube className={styles["social-icon"]} />
          <button className={styles["lang-btn"]}><span style={{fontSize: '1.2em', marginRight: 4}}>↻</span> বাংলা</button>
          <Link href="/apply" className={styles["btn-apply"]}>Online Apply</Link>
          <span className={styles["portal-btn"]}>
            <Image src="/portal-logo.png" alt="পোর্টাল" width={80} height={32} />
          </span>
        </div>
      </div>
      {/* Main Header */}
      <div className={styles["header-main"]}>
        <div className={styles["header-logo"]}>
          <Image
            src="/logo.png"
            alt="School Logo"
            width={100}
            height={100}
          />
        </div>
        <div className={styles["header-info"]}>
          <div className={styles["header-estd"]}>ESTD : 2025</div>
          <div className={styles["header-title"]}>Abc High School</div>
          <div className={styles["header-address"]}>Dhaka, Bangladesh</div>
        </div>
        {/* Hamburger Button for Mobile */}
        <button
          className={styles.hamburger}
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
        </button>
      </div>
      {/* Navigation Bar */}
      <nav
        className={
          menuOpen
            ? `${styles["main-nav"]} ${styles["main-nav--open"]}`
            : styles["main-nav"]
        }
      >
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/academic">Academic</Link></li>
          <li><Link href="/admission">Admission</Link></li>
          <li><Link href="/facilities">Facilities</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
      {/* ---------------- Notice Marquee -------------------- */}
      <div style={{background: '#fff', borderBottom: '3px solid #000a99', padding: '0.3rem 0 0.3rem 2rem', fontSize: '1.15rem', minHeight: '38px', display: 'flex', alignItems: 'center'}}>
        <span style={{color: '#002080', fontWeight: 'bold', fontSize: '1.2rem', marginRight: '1.2rem', letterSpacing: '1px'}}>NOTICE</span>
        <div className={styles.noticeMarqueeWrapper}>
          <div className={styles.noticeMarqueeContent}>
            {[...notices, ...notices].map((notice, idx) => (
              <span key={idx + '-' + notice.id} style={{display: 'inline-block', marginRight: '2.2rem'}}>
                {idx % notices.length !== 0 && <span style={{color: '#e53935', fontSize: '1.2em', margin: '0 0.7rem'}}>▸</span>}
                <Link href={notice.link} style={{color: '#222', textDecoration: 'none', fontWeight: 500}}>{notice.title}</Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
} 