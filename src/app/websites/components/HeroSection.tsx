'use client';
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Carousel: any = require("./CarouselNoSSR").default;
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./HeroSection.module.css";
import { useEffect, useState } from "react";

const images = [
  "/images/43.jpg",
  "/images/40.jpeg",
  "/images/41.jpeg",
  "/images/42.jpg"
];

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className={styles.heroSection}>
      {isClient && (
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={true}
          interval={4000}
          renderArrowPrev={(
            onClickHandler: () => void,
            hasPrev: boolean,
            label: string
          ) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{
                  position: "absolute",
                  zIndex: 2,
                  top: "50%",
                  left: 15,
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.5)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  fontSize: 24,
                  cursor: "pointer"
                }}
              >
                &#8592;
              </button>
            )
          }
          renderArrowNext={(
            onClickHandler: () => void,
            hasNext: boolean,
            label: string
          ) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{
                  position: "absolute",
                  zIndex: 2,
                  top: "50%",
                  right: 15,
                  transform: "translateY(-50%)",
                  background: "rgba(0,0,0,0.5)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  fontSize: 24,
                  cursor: "pointer"
                }}
              >
                &#8594;
              </button>
            )
          }
        >
          {images.map((src, idx) => (
            <div key={idx}>
              <img src={src} alt={`Slide ${idx + 1}`} />
            </div>
          ))}
        </Carousel>
      )}
      <div className={styles.heroOverlay}>
        <h1>All Teachers 2023</h1>
        <div className={styles.heroActions}>
          <Link href="/contact" className={`${styles.btn} ${styles.btnPrimary}`}>
            Contact
          </Link>
          <Link href="/about" className={`${styles.btn} ${styles.btnSecondary}`}>
            About Us
          </Link>
        </div>
      </div>
      <div className={styles.infoBar}>
        <div className={styles.infoItem} style={{background:'#e91e24'}}>
          <div className={styles.infoTitle}>EIIN</div>
          <div className={styles.infoValue}>129421</div>
        </div>
        <div className={styles.infoItem} style={{background:'#0019a5'}}>
          <div className={styles.infoTitle}>Institution Code</div>
          <div className={styles.infoValue}>N/A</div>
        </div>
        <div className={styles.infoItem} style={{background:'#e91e24'}}>
          <div className={styles.infoTitle}>Center Code</div>
          <div className={styles.infoValue}>N/A</div>
        </div>
        <div className={styles.infoItem} style={{background:'#0019a5'}}>
          <div className={styles.infoTitle}>Estd Year</div>
          <div className={styles.infoValue}>1918</div>
        </div>
      </div>
    </section>
  );
} 