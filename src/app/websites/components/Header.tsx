"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { FaTwitter, FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBangla, setIsBangla] = useState(false);

  const menuItems = {
    en: [
      { id: 1, title: "Home", link: "/websites" },
      { id: 2, title: "About", link: "/#about" },
      { id: 3, title: "Academic", link: "/academic" },
      { id: 4, title: "Admission", link: "/admission" },
      { id: 5, title: "Facilities", link: "/facilities" },
      { id: 6, title: "Contact", link: "/#contact" },
      { id: 7, title: "Login", link: "/login" },
    ],
    bn: [
      { id: 1, title: "হোম", link: "/" },
      { id: 2, title: "আমাদের সম্পর্কে", link: "/#about" },
      { id: 3, title: "একাডেমিক", link: "/academic" },
      { id: 4, title: "ভর্তি", link: "/admission" },
      { id: 5, title: "সুবিধাসমূহ", link: "/facilities" },
      { id: 6, title: "যোগাযোগ", link: "/#contact" },
      { id: 7, title: "লগইন", link: "/login" },
    ]
  };

  const notices = [
    { id: 1, title: "২১শে ফেব্রুয়ারী উদযাপন", link: "/notice/1" },
    { id: 2, title: "শ্রী শ্যামা পূজা উপলক্ষে বন্ধের নোটিশ-২০২৪", link: "/notice/2" },
    { id: 3, title: "Class Ten Test Exam Routine-2024", link: "/notice/3" },
    { id: 4, title: "২১শে ফেব্রুয়ারী উদযাপন", link: "/notice/1" },
    { id: 5, title: "২১শে ফেব্রুয়ারী উদযাপন", link: "/notice/1" },
  ];

  const toggleLanguage = () => {
    setIsBangla(!isBangla);
  };

  const handleMenuClick = (link: string) => {
    if (link.startsWith('/#')) {
      const element = document.getElementById(link.substring(2));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  };

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
          <button className={styles["lang-btn"]} onClick={toggleLanguage}>
            <span style={{fontSize: '1.2em', marginRight: 4}}>↻</span> 
            {isBangla ? 'ENGLISH' : 'বাংলা'}
          </button>
          <Link href="/websites/admission/registration" className={styles["btn-apply"]}>
            {isBangla ? 'অনলাইন আবেদন' : 'Online Apply'}
          </Link>
          <span className={styles["portal-btn"]}>
            <Image src="/images/developed1.png" alt="পোর্টাল" width={80} height={20} />
          </span>
        </div>
      </div>
      {/* Main Header */}
      <div className={styles["header-main"]}>
        <div className={styles["header-logo"]}>
          <Image
            src="/images/school.jpg"
            alt="School Logo"
            width={100}
            height={100}
          />
        </div>
        <div className={styles["header-info"]}>
          <div className={styles["header-estd"]}>ESTD : 2025</div>
          <div className={styles["header-title"]}>Online Academy</div>
          <div className={styles["header-address"]}>Dhaka, Bangladesh</div>
        </div>
        </div>
        {/* Hamburger Button for Mobile */}
        {/* <button
          className={styles.hamburger}
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
        </button>
      </div> */}
      {/* Navigation Bar */}
      {/* <nav
        className={
          menuOpen
            ? `${styles["main-nav"]} ${styles["main-nav--open"]}`
            : styles["main-nav"]
        }
      >
        <ul>
          {menuItems[isBangla ? 'bn' : 'en'].map((item) => (
            <li key={item.id}>
              {item.link === '/#about' || item.link === '/#contact' ? (
                <a
                  href={item.link}
                  onClick={e => {
                    e.preventDefault();
                    const id = item.link.replace('/#', '');
                    const element = document.getElementById(id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                    setMenuOpen(false);
                  }}
                  style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', padding: '0.5rem 0.5rem', display: 'block' }}
                >
                  {item.title}
                </a>
              ) : (
                <Link href={item.link} onClick={() => handleMenuClick(item.link)}>{item.title}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav> */}
      {/* ---------------- Notice Marquee -------------------- */}
      <div style={{background: '#fff', borderBottom: '3px solid #000a99', padding: '0.3rem 0 0.3rem 2rem', fontSize: '1.15rem', minHeight: '38px', display: 'flex', alignItems: 'center'}}>
        <span style={{color: '#002080', fontWeight: 'bold', fontSize: '0.8rem', marginRight: '1.2rem', letterSpacing: '1px'}}>
          {isBangla ? 'নোটিশ' : 'NOTICE'}
        </span>
        <div className={styles.noticeMarqueeWrapper}>
          <div className={styles.noticeMarqueeContent}>
            {[...notices, ...notices].map((notice, idx) => (
              <span key={idx + '-' + notice.id} style={{display: 'inline-block', marginRight: '2.2rem'}}>
                {idx % notices.length !== 0 && <span style={{color: '#e53935', fontSize: '0.7em', margin: '0 0.7rem'}}>▸</span>}
                <Link href={notice.link} style={{color: '#222', textDecoration: 'none', fontWeight: 500}}>{notice.title}</Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}