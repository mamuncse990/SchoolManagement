import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2 className="section-title">About Our School</h2>
        <div className="about-content">
          {/*<div className="about-image">
            <Image
              src="/images/40.jpeg"
              alt="School Building"
              width={500}
              height={300}
            />
          </div>*/}
          <div className="about-text">
            <p>
              Shaistaganj High School, established in 1918, is one of the most prestigious educational institutions in the region. 
              We are committed to providing quality education and nurturing future leaders.
            </p>
            <p>
              Our school offers a comprehensive curriculum with modern facilities and experienced teachers. 
              We focus on both academic excellence and character development.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <h3>100+</h3>
                <p>Years of Excellence</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Qualified Teachers</p>
              </div>
              <div className="stat-item">
                <h3>1000+</h3>
                <p>Successful Students</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 