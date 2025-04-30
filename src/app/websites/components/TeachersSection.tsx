import Image from "next/image";
import Link from "next/link";

export default function TeachersSection() {
  const teachers = [
    {
      id: 1,
      name: "MD. HARUNUR RASID TALUKDER",
      position: "Head Teacher",
      image: "/images/teachers/head-teacher.jpg"
    },
    {
      id: 2,
      name: "MOHAMMAD MOHIBUR RAHMAN",
      position: "Asst. Head Teacher",
      image: "/images/teachers/asst-head.jpg"
    },
    {
      id: 3,
      name: "MD. GIAS UDDIN",
      position: "Senior Teacher",
      image: "/images/teachers/senior-teacher.jpg"
    }
  ];

  return (
    <section className="section teachers-section">
      <div className="container">
        <h2 className="section-title">Our Teachers</h2>
        <div className="teachers-grid">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="teacher-card">
              <div className="teacher-image">
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  width={200}
                  height={200}
                />
              </div>
              <div className="teacher-info">
                <h3>{teacher.name}</h3>
                <p>{teacher.position}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="teachers-actions">
          <Link href="/teachers" className="btn btn-primary">
            View All Teachers
          </Link>
        </div>
      </div>
    </section>
  );
} 