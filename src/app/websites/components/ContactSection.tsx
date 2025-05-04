import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaSkype, FaYoutube } from "react-icons/fa";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <h2 className={styles.title}>Contact Us</h2>
            <div className={styles.infoText}>
              Bangladesh International School & College, Road No: 27, DOHS, Mohakhali, Dhaka Cantonment, Dhaka-1206<br />
              VP Jr. Division- 01769-018352<br />
              (9.00 am to 4.00pm)<br />
              VP (Nat'l) Sr. Division- 01769-018351<br />
              (9.00 am to 4.00pm)<br />
              VP (Int'l) Sr. Division- 01820-102209<br />
              (9.00 am to 4.00pm)<br />
              Head Clerk: Telephone: 02-222286056<br />
              Front desk: Telephone: 02-222260621 & 02-222288413, Army No: 7705
            </div>
          </div>
          <div className={styles.col}>
            <h2 className={styles.title}>Email</h2>
            <div className={styles.infoText}>
              bisschool@yahoo.com<br />
              office@bisc.com.bd<br />
              biscoffice1995@gmail.com
            </div>
          </div>
          <div className={styles.col}>
            <h2 className={styles.title}>Important Links</h2>
            <ul className={styles.linksList}>
              <li>About Us</li>
              <li>Admission</li>
              <li>Our History</li>
              <li>Career</li>
            </ul>
          </div>
          <div className={styles.col}>
            <h2 className={styles.title}>Find us on map</h2>
            <div className={styles.mapWrapper}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902019688799!2d90.3842533154316!3d23.75090319459195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a2e2e2e2e2%3A0x2e2e2e2e2e2e2e2e!2sBangladesh%20International%20School%20and%20College!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location"
              ></iframe>
            </div>
          </div>
        </div>
        <div className={styles.socialRow}>
          <div className={styles.socialIcons}>
            <span className={styles.icon}><FaFacebookF /></span>
            <span className={styles.icon}><FaTwitter /></span>
            <span className={styles.icon}><FaInstagram /></span>
            <span className={styles.icon}><FaLinkedinIn /></span>
            <span className={styles.icon}><FaYoutube /></span>
            <span className={styles.icon}><FaSkype /></span>
          </div>
        </div>
      </div>
    </section>
  );
} 