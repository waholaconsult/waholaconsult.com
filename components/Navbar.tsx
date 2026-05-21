"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <Image src="/waholaconsult.png" alt="Wahola Consult Logo" width={50} height={40} priority style={{ borderRadius: "4px" }} />
        </Link>
        
        {/* Desktop Links */}
        <div className={styles.navLinks}>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/services" className={styles.link}>Services</Link>
          <Link href="/blog" className={styles.link}>Blog</Link>
          <Link href="/contact" className={styles.ctaBtn}>Contact Us</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuBtn} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <div className={styles.mobileNavLinks}>
          <Link href="/" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/services" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/blog" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/contact" className={styles.mobileCtaBtn} onClick={() => setMenuOpen(false)}>Contact Us</Link>
        </div>
      </div>
    </nav>
  );
}
