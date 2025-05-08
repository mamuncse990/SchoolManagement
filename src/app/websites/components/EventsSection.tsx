import Link from "next/link";
import styles from "./EventsSection.module.css";

export default function EventsSection() {
  const events = [
    {
      id: 1,
      title: "Study Tour-2025",
      date: "18 Feb, 2025",
      link: "/events/1"
    },
    {
      id: 2,
      title: "ডেঙ্গু প্রতিরোধে পরিচ্ছন্নতা সপ্তাহ-২০২৩",
      date: "29 Nov, 2023",
      link: "/events/2"
    },
    {
      id: 3,
      title: "Shiekh Rassel Corner",
      date: "19 Sep, 2022",
      link: "/events/3"
    }
  ];

  const news = [
    {
      id: 1,
      title: "21 February",
      date: "18 Feb, 2025",
      link: "/news/1"
    },
    {
      id: 2,
      title: "UNO visited our school",
      date: "01 Jul, 2020",
      link: "/news/2"
    },
    {
      id: 3,
      title: "Debate Competition Held",
      date: "01 Jul, 2020",
      link: "/news/3"
    }
  ];

  return (
    <div className={styles.wrapper}>
      {/* Events Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Events</h2>
          <div className={styles.eventsGrid}>
            {events.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                <Link href={event.link} legacyBehavior>
                  <a style={{display: 'flex', alignItems: 'center', textDecoration: 'none', width: '100%'}}>
                    <div className={styles.eventDate}>
                      <span className={styles.eventDay}>{event.date.split(" ")[0]}</span>
                      <span className={styles.eventMonth}>{event.date.split(" ")[1]}</span>
                    </div>
                    <div className={styles.eventInfo}>
                      <h3>{event.title}</h3>
                      <span className={styles.eventFullDate}>{event.date}</span>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.eventsActions}>
            <Link href="/events" legacyBehavior>
              <a className={styles.btn}>SEE MORE ...</a>
            </Link>
          </div>
        </div>
      </section>
      {/* News Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>NEWS</h2>
          <div className={styles.eventsGrid}>
            {news.map((item) => (
              <div key={item.id} className={styles.eventCard}>
                <Link href={item.link} legacyBehavior>
                  <a style={{display: 'block', width: '100%', textDecoration: 'none'}}>
                    <div className={styles.eventInfo}>
                      <h3>{item.title}</h3>
                      <span className={styles.eventFullDate}>{item.date}</span>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.eventsActions}>
            <Link href="/news" legacyBehavior>
              <a className={styles.btn}>SEE MORE ...</a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}