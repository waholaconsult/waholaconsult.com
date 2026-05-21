import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* Top Section with Logo and Primary Navigation */}
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <Image src="/waholaconsult.JPG" alt="Wahola Consult Logo" width={63} height={50} style={{ borderRadius: "4px" }} />
            </Link>
            <span className={styles.lang}>EN</span>
          </div>
          
          <div className={styles.navLinks}>
            <Link href="/blog">Blog</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        {/* Sub Links Section */}
        <div style={{ marginBottom: "30px" }}>
          <div className={styles.subLinksRow}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms of Service</Link>
            <a href="#cookie-settings">Cookie Settings</a>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input type="checkbox" id="high-contrast" style={{ width: "auto" }} />
              <label htmlFor="high-contrast" style={{ cursor: "pointer" }}>High Contrast</label>
            </span>
          </div>
        </div>
        
        {/* Bottom Section with Copyright and Socials */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()}, by Wahola Consulting Group, LLC
          </div>
          <div className={styles.socials}>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter (X)</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
