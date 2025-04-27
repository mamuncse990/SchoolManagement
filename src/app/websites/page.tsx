import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import styles from './page.module.css';

const WebsitePage = () => {
  return (
    <>
      <Head>
        <title>Abc School</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="referrer" content="origin" />
        <link rel="icon" href="https://storage.googleapis.com/example-images/129421/school.jpg" />
        <meta name="author" content="PATHSHALA" />
        <meta name="designer" content="IT Lab Solutions Ltd." />
        <meta name="og:site_name" content="https://www.Abchighschool.edu.bd/" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content="Abc School" />
        <meta name="description" content="Welcome to Abc School (Digital Dynamic School in Bangladesh). It's regarded as one of the best educational institution due to its discipline, teaching technique and other educational activities." />
        <meta property="og:description" content="Welcome to Abc School (Digital Dynamic School in Bangladesh). It's regarded as one of the best educational institution due to its discipline, teaching technique and other educational activities." />
        <meta name="keywords" content="Abc School,Pathshala, Pathshala-eims, Education Managemnt Software, Education, Educational Website, IT Lab Solutions Ltd., IT Lab, eims, পাঠশালা, শিক্ষা, শিক্ষা বোর্ড" />
        <meta property="og:image" content="https://storage.googleapis.com/example-images/129421/school.jpg" />
        <meta property="ia:rules_url" content="https://www.Abchighschool.edu.bd/" />
      </Head>

      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className={styles.hero}>
        <Image 
          src="/api/placeholder/1200/400" 
          alt="School Building"
          width={1200}
          height={400}
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <h2>Welcome to Abc School</h2>
          <p>Building the foundation for a brighter future through quality education and character development</p>
          <Link href="#" className={styles.btn}>Apply Now</Link>
        </div>
      </section>
      
      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Why Choose Us</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureImage}>
                <Image 
                  src="/api/placeholder/400/300" 
                  alt="Academic Excellence"
                  width={400}
                  height={300}
                />
              </div>
              <div className={styles.featureContent}>
                <h3>Academic Excellence</h3>
                <p>Our rigorous curriculum and dedicated faculty ensure students achieve their highest potential.</p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureImage}>
                <Image 
                  src="/api/placeholder/400/300" 
                  alt="Modern Facilities"
                  width={400}
                  height={300}
                />
              </div>
              <div className={styles.featureContent}>
                <h3>Modern Facilities</h3>
                <p>State-of-the-art classrooms, labs, and recreational areas provide an ideal learning environment.</p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureImage}>
                <Image 
                  src="/api/placeholder/400/300" 
                  alt="Character Building"
                  width={400}
                  height={300}
                />
              </div>
              <div className={styles.featureContent}>
                <h3>Character Building</h3>
                <p>We focus on developing values, ethics, and leadership qualities in our students.</p>
              </div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureImage}>
                <Image 
                  src="/api/placeholder/400/300" 
                  alt="Extracurricular Activities"
                  width={400}
                  height={300}
                />
              </div>
              <div className={styles.featureContent}>
                <h3>Extracurricular Activities</h3>
                <p>A wide range of sports, cultural, and club activities for holistic development.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* News & Events */}
      <section className={styles.newsEvents}>
        <div className="container">
          <h2 className={styles.sectionTitle}>News & Events</h2>
          <div className={styles.newsGrid}>
            <div className={styles.newsCard}>
              <div className={styles.newsContent}>
                <div className={styles.newsDate}>April 15, 2025</div>
                <h3>Annual Sports Day</h3>
                <p>Join us for our annual sports day celebration featuring various athletic competitions and team events.</p>
              </div>
            </div>
            <div className={styles.newsCard}>
              <div className={styles.newsContent}>
                <div className={styles.newsDate}>April 10, 2025</div>
                <h3>Science Fair Winners</h3>
                <p>Congratulations to our students who won top prizes at the District Science Fair Competition.</p>
              </div>
            </div>
            <div className={styles.newsCard}>
              <div className={styles.newsContent}>
                <div className={styles.newsDate}>April 5, 2025</div>
                <h3>Parent-Teacher Meeting</h3>
                <p>The next parent-teacher meeting is scheduled for April 20th. Please mark your calendars.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className={styles.about}>
        <div className="container">
          <div className={styles.aboutContent}>
            <div className={styles.aboutImage}>
              <Image 
                src="/api/placeholder/600/400" 
                alt="School History"
                width={600}
                height={400}
              />
            </div>
            <div className={styles.aboutText}>
              <h2>Our History</h2>
              <p>Established in 1962, Abc School has been providing quality education to thousands of students for over six decades. Founded with a vision to create a center of academic excellence, our school has grown from humble beginnings to become one of the most respected educational institutions in the region.</p>
              <p>Our mission is to nurture young minds, instill values, and prepare students to face the challenges of the modern world with confidence and integrity.</p>
              <Link href="#" className={styles.btn}>Learn More</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerColumn}>
              <h3>Quick Links</h3>
              <ul>
                <li><Link href="#">Home</Link></li>
                <li><Link href="#">About Us</Link></li>
                <li><Link href="#">Academics</Link></li>
                <li><Link href="#">Admissions</Link></li>
                <li><Link href="#">Faculty</Link></li>
                <li><Link href="#">Contact</Link></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h3>Important Links</h3>
              <ul>
                <li><Link href="#">Academic Calendar</Link></li>
                <li><Link href="#">Results</Link></li>
                <li><Link href="#">Notice Board</Link></li>
                <li><Link href="#">Photo Gallery</Link></li>
                <li><Link href="#">Career</Link></li>
              </ul>
            </div>
            <div className={`${styles.footerColumn} ${styles.contactInfo}`}>
              <h3>Contact Us</h3>
              <p>Dhaka, Bangladesh</p>
              <p>Phone: +8801916-006330</p>
              <p>Email: info@abcschool.edu.bd</p>
              <p>Office Hours: Sun-Thu, 8:00 AM - 4:00 PM</p>
            </div>
          </div>
          <div className={styles.copyright}>
            <p>&copy; 2025 Abc School. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default WebsitePage;
