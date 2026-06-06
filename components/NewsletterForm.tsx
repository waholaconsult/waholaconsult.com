"use client";

import { useState } from "react";
import styles from "./NewsletterForm.module.css";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className={styles.wrapper}>
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
        
        {status === "error" && (
          <p style={{ color: "red", marginTop: "12px", fontSize: "0.9rem", fontWeight: 600 }}>Something went wrong. Please try again.</p>
        )}
      </div>
    </div>
  );
}
