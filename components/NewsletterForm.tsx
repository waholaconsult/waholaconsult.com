"use client";

import { useState } from "react";
import styles from "./NewsletterForm.module.css";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Placeholder for actual email marketing integration (e.g., Mailchimp, ConvertKit)
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <div className={`glass-panel ${styles.wrapper}`}>
      <div className={styles.content}>
        <h3>Join Our Newsletter</h3>
        <p>Get exclusive digital marketing tips and strategies sent straight to your inbox.</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className={styles.input}
            disabled={status === "loading" || status === "success"}
          />
          <button 
            type="submit" 
            className="btn-primary"
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        
        {status === "success" && (
          <p className={styles.successMsg}>Thanks for subscribing! Check your inbox soon.</p>
        )}
      </div>
    </div>
  );
}
