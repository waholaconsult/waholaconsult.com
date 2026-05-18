"use client";

import NewsletterForm from "@/components/NewsletterForm";

export default function ContactPage() {
  return (
    <div style={{ paddingTop: "120px", paddingBottom: "100px" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "80px", maxWidth: "800px", margin: "0 auto 80px" }}>
          <h1 style={{ marginBottom: "24px" }}>Let&apos;s Build Something <span className="text-gradient">Incredible</span></h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", lineHeight: "1.6" }}>
            Whether you need a new website, a social media strategy, or a scalable ad campaign, our team is ready to help you dominate your market.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px" }}>
          
          {/* Contact Information */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <div className="glass-panel" style={{ padding: "40px" }}>
              <h3 style={{ marginBottom: "20px", color: "var(--accent-primary)" }}>Contact Information</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "1.5rem" }}>📧</span> hello@wahola.agency
              </p>
              <p style={{ color: "var(--text-secondary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "1.5rem" }}>📱</span> +1 (555) 123-4567
              </p>
              <p style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "1.5rem" }}>📍</span> 100 Premium Way, Suite 400<br/>New York, NY 10001
              </p>
            </div>

            <div className="glass-panel" style={{ padding: "40px" }}>
              <h3 style={{ marginBottom: "20px" }}>Follow Us</h3>
              <div style={{ display: "flex", gap: "16px" }}>
                <a href="#" style={{ padding: "12px 24px", background: "rgba(255,255,255,0.05)", borderRadius: "30px", color: "var(--text-primary)", transition: "all 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.background = "var(--accent-primary)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>Twitter</a>
                <a href="#" style={{ padding: "12px 24px", background: "rgba(255,255,255,0.05)", borderRadius: "30px", color: "var(--text-primary)", transition: "all 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.background = "var(--accent-primary)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>Instagram</a>
                <a href="#" style={{ padding: "12px 24px", background: "rgba(255,255,255,0.05)", borderRadius: "30px", color: "var(--text-primary)", transition: "all 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.background = "var(--accent-primary)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Contact / Newsletter Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <NewsletterForm />
            
            <div className="glass-panel" style={{ padding: "40px" }}>
              <h3 style={{ marginBottom: "24px" }}>Send us a message</h3>
              <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <input type="text" placeholder="Your Name" style={{ width: "100%", padding: "16px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", borderRadius: "12px", color: "var(--text-primary)", outline: "none" }} />
                <input type="email" placeholder="Your Email" style={{ width: "100%", padding: "16px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", borderRadius: "12px", color: "var(--text-primary)", outline: "none" }} />
                <textarea placeholder="Tell us about your project..." rows={5} style={{ width: "100%", padding: "16px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", borderRadius: "12px", color: "var(--text-primary)", outline: "none", resize: "vertical" }}></textarea>
                <button type="button" className="btn-primary" style={{ width: "100%", padding: "16px" }}>Submit Inquiry</button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
