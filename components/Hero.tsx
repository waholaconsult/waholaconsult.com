import styles from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.glow} />
      <div className={`container ${styles.content}`}>
        <div className={`animate-fade-in ${styles.badge}`}>
          <span className={styles.badgeDot}></span>
          Next-Gen Digital Marketing
        </div>
        
        <h1 className={`animate-fade-in ${styles.title}`}>
          Transform Your Brand&apos;s <br />
          <span className="text-gradient">Digital Presence</span>
        </h1>
        
        <p className={`animate-fade-in ${styles.subtitle}`}>
          We specialize in social marketing, website design, youtube automation, and targeted ads that drive explosive growth for your business.
        </p>
        
        <div className={`animate-fade-in ${styles.actions}`}>
          <Link href="/contact" className="btn-primary">
            Start Your Project
          </Link>
          <Link href="/services" className="btn-outline">
            Our Services
          </Link>
        </div>
        
        <div className={`animate-float ${styles.stats}`}>
          <div className={`glass-panel ${styles.statBox}`}>
            <h3>250+</h3>
            <p>Clients Scaled</p>
          </div>
          <div className={`glass-panel ${styles.statBox}`}>
            <h3>10M+</h3>
            <p>Ad Spend Managed</p>
          </div>
          <div className={`glass-panel ${styles.statBox}`}>
            <h3>98%</h3>
            <p>Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
