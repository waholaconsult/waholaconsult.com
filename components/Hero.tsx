import styles from "./Hero.module.css";
import Image from "next/image";

export default function Hero() {
  const services = [
    "Digital Marketing", "Social Media Management", "Design", 
    "Web Development", "Email Marketing", "Printing", 
    "IT Training and Consulting", "Youtube Automation"
  ];

  return (
    <section className={styles.hero}>
      <div className="container">
        {/* Header Tagline & Title */}
        <div className="animate-fade-in">
          <div className={styles.tagline}>Meet Our Award-Winning</div>
          <h1 className={styles.title}>Expert Digital Agency</h1>
        </div>
        
        {/* Services List */}
        <div className={`animate-fade-in ${styles.locations}`}>
          {services.map((service, idx) => (
            <span key={service}>
              {service}
              {idx < services.length - 1 && <span className={styles.bullet}>&bull;</span>}
            </span>
          ))}
        </div>
        

        {/* Grayscale Trust Badges */}
        <div className={`animate-fade-in ${styles.trustSection}`}>
          <div className={styles.trustGrid}>
            <div className={styles.badge} style={{ fontStyle: "italic" }}>ADWEEK</div>
            <div className={styles.badge}>
              AOY
              <span className={styles.badgeSub} style={{ fontWeight: 500 }}>PERFORMANCE AGENCY</span>
            </div>
            <div className={styles.badge} style={{ fontSize: "1.15rem" }}>
              Inc.
              <span className={styles.badgeSub} style={{ display: "inline", marginLeft: "4px", fontSize: "0.85rem", fontWeight: 700 }}>Best Workplaces</span>
            </div>
            <div className={styles.badge}>OMMA AWARDS</div>
            <div className={styles.badge} style={{ fontSize: "1.25rem" }}>
              Inc. <span style={{ color: "#d1d5db" }}>500</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
