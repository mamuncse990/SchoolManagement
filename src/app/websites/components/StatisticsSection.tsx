export default function StatisticsSection() {
  const stats = [
    {
      id: 1,
      number: "6",
      label: "Classes"
    },
    {
      id: 2,
      number: "398",
      label: "Students"
    },
    {
      id: 3,
      number: "18",
      label: "Teachers"
    },
    {
      id: 4,
      number: "5",
      label: "Staffs"
    }
  ];

  return (
    <section className="section statistics-section">
      <div className="container">
        <h2 className="section-title">Our Organization At a Glance</h2>
        <div className="statistics-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 