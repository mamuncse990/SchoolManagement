import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          <div className={styles.schoolInfo}>
            <img src="/images/school.jpg" alt="School Logo" className={styles.schoolLogo} />
            <h2 className={styles.schoolName}>Online Academy</h2>
            <p className={styles.contact}><span>Contact :</span> 01916006330</p>
            <p className={styles.email}><span>Email :</span> abcschool@gmail.com</p>
            <p className={styles.address}><span>Address :</span> Dhaka, Bangladesh</p>
          </div>
          <div className={styles.quickLinks}>
            <h3>Quick Links</h3>
            <div className={styles.linksGrid}>
              <ul>
                <li>DSHE</li>
                <li>BANBEIS</li>
                <li>BD National Portal</li>
                <li>Ministry of Education</li>
                <li>Sylhet Board</li>
              </ul>
              <ul>
                <li>Primary & Mass Education</li>
                <li>Form of BD. Govt</li>
                <li>Pathshala EIMS</li>
                <li>UGC</li>
                <li>Dhaka University</li>
                <li>SUST</li>
              </ul>
            </div>
          </div>
          <div className={styles.maintainedBy}>
            <h3>Maintained By</h3>
            <img src="/images/developed1.png" alt="Developer Logo" className={styles.maintainerLogo} />
            <div className={styles.visitorBox}>
              <span className={styles.visitorCount}>007296</span>
              <span className={styles.visitorLabel}>ONLINE VISITOR</span>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.developedBy}>
            <span>@Developed By </span>
            <img src="/images/developed.png" alt="@Developer Ltd." className={styles.devLogo} />
            <span className={styles.devName}>Deleloper Ltd.</span>
          </div>
          <div className={styles.helpline}>
            <span>Helpline - </span>
            <span className={styles.helplineIcon}>📞</span>
            <span className={styles.helplineNumber}>+88 01916006330</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 