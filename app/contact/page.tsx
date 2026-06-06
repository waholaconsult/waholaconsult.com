"use client";

import { useState } from "react";
import NewsletterForm from "@/components/NewsletterForm";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div style={{ paddingTop: "140px", paddingBottom: "100px", backgroundColor: "var(--bg-secondary)" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "80px", maxWidth: "800px", margin: "0 auto 80px" }}>
          <h1 style={{ marginBottom: "24px", color: "var(--text-primary)" }}>
            Let&apos;s Build Something <span style={{ color: "var(--bg-orange)" }}>Incredible</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", lineHeight: "1.6" }}>
            Whether you need a new website, a social media strategy, or a scalable ad campaign, our team is ready to help you dominate your market.
          </p>
        </div>

        {/* Layout Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
          
          {/* Column 1: Contact Information */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <div style={{ 
              padding: "40px", 
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)"
            }}>
              <h3 style={{ marginBottom: "20px", color: "var(--bg-orange)", fontSize: "1.5rem" }}>Contact Details</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "18px", display: "flex", alignItems: "center", gap: "12px", fontSize: "1.05rem" }}>
                <span style={{ fontSize: "1.5rem" }}>📧</span> waholaconsult@gmail.com
              </p>
              <p style={{ color: "var(--text-secondary)", marginBottom: "18px", display: "flex", alignItems: "center", gap: "12px", fontSize: "1.05rem" }}>
                <span style={{ fontSize: "1.5rem" }}>📱</span> +233 24634 8580
              </p>
              <p style={{ color: "var(--text-secondary)", display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "1.05rem", lineHeight: "1.5" }}>
                <span style={{ fontSize: "1.5rem", lineHeight: "1" }}>📍</span> Tema Comm 23, Adjei-kojo, Night market
              </p>
            </div>

            <div style={{ 
              padding: "40px", 
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)"
            }}>
              <h3 style={{ marginBottom: "24px", color: "var(--text-primary)", fontSize: "1.5rem" }}>Follow Our Journey</h3>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href="https://www.youtube.com/@WaholaConsult" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 20px", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "30px", color: "var(--text-primary)", fontWeight: 600, fontSize: "0.9rem", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--bg-orange)"; e.currentTarget.style.color = "var(--bg-orange)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "var(--text-primary)"; }}>YouTube</a>
                <a href="https://web.facebook.com/waholaconsult" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 20px", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "30px", color: "var(--text-primary)", fontWeight: 600, fontSize: "0.9rem", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--bg-orange)"; e.currentTarget.style.color = "var(--bg-orange)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "var(--text-primary)"; }}>Facebook</a>
                <a href="https://www.linkedin.com/in/wahola-consult-4a578240a/" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 20px", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "30px", color: "var(--text-primary)", fontWeight: 600, fontSize: "0.9rem", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--bg-orange)"; e.currentTarget.style.color = "var(--bg-orange)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "var(--text-primary)"; }}>LinkedIn</a>
                <a href="https://www.tiktok.com/@waho609" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 20px", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "30px", color: "var(--text-primary)", fontWeight: 600, fontSize: "0.9rem", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--bg-orange)"; e.currentTarget.style.color = "var(--bg-orange)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "var(--text-primary)"; }}>TikTok</a>
              </div>
            </div>
          </div>

          {/* Column 2: Inquiry Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <div style={{ 
              padding: "40px", 
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)"
            }}>
              <h3 style={{ marginBottom: "24px", color: "var(--text-primary)", fontSize: "1.5rem" }}>Send Us a Message</h3>
              <form style={{ display: "flex", flexDirection: "column", gap: "20px" }} onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required 
                  disabled={status === "loading" || status === "success"}
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required 
                  disabled={status === "loading" || status === "success"}
                />
                <textarea 
                  placeholder="Tell us about your project or inquiry..." 
                  rows={5} 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required 
                  disabled={status === "loading" || status === "success"}
                ></textarea>
                
                {status === "error" && (
                  <p style={{ color: "red", fontWeight: 600 }}>Something went wrong. Please try again.</p>
                )}
                
                {status === "success" && (
                  <p style={{ color: "green", fontWeight: 600 }}>Inquiry submitted successfully! We will get back to you shortly.</p>
                )}

                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ width: "100%", padding: "16px" }}
                  disabled={status === "loading" || status === "success"}
                >
                  {status === "loading" ? "Submitting Inquiry..." : "Submit Inquiry"}
                </button>
              </form>
            </div>
            
            <NewsletterForm />
          </div>

        </div>
      </div>
    </div>
  );
}
