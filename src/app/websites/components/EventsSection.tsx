import Link from "next/link";

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

  return (
    <section className="section events-section">
      <div className="container">
        <h2 className="section-title">Events</h2>
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <Link href={event.link}>
                <div className="event-date">
                  <span className="event-day">{event.date.split(" ")[0]}</span>
                  <span className="event-month">{event.date.split(" ")[1]}</span>
                </div>
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <span className="event-full-date">{event.date}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="events-actions">
          <Link href="/events" className="btn btn-primary">
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
} 