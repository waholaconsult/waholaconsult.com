import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              wahola<span className="text-gradient">.</span>
            </Link>
            <p className={styles.desc}>
              Premium digital marketing agency. We elevate your brand through strategic design, marketing, and automation.
            </p>
          </div>
          
          <div className={styles.col}>
            <h4>Services</h4>
            <div className={styles.links}>
              <Link href="/services#marketing">Social Marketing</Link>
              <Link href="/services#design">Website Design</Link>
              <Link href="/services#youtube">YouTube Automation</Link>
              <Link href="/services#ads">Digital Ads</Link>
            </div>
          </div>
          
          <div className={styles.col}>
            <h4>Company</h4>
            <div className={styles.links}>
              <Link href="/about">About Us</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          
          <div className={styles.col}>
            <h4>Legal</h4>
            <div className={styles.links}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Wahola. All rights reserved.</p>
          <div className={styles.socials}>
            {/* Social Icons Placeholders */}
            <span>Twitter</span> &nbsp;|&nbsp; <span>LinkedIn</span> &nbsp;|&nbsp; <span>Instagram</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
