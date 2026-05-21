"use client";

import NewsletterForm from "@/components/NewsletterForm";

export default function ContactPage() {
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
              borderRadius: "8px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)"
            }}>
              <h3 style={{ marginBottom: "20px", color: "var(--bg-orange)", fontSize: "1.5rem" }}>Contact Details</h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: "18px", display: "flex", alignItems: "center", gap: "12px", fontSize: "1.05rem" }}>
                <span style={{ fontSize: "1.5rem" }}>📧</span> hello@wahola.agency
              </p>
              <p style={{ color: "var(--text-secondary)", marginBottom: "18px", display: "flex", alignItems: "center", gap: "12px", fontSize: "1.05rem" }}>
                <span style={{ fontSize: "1.5rem" }}>📱</span> +1 (555) 123-4567
              </p>
              <p style={{ color: "var(--text-secondary)", display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "1.05rem", lineHeight: "1.5" }}>
                <span style={{ fontSize: "1.5rem", lineHeight: "1" }}>📍</span> 100 Premium Way, Suite 400<br/>New York, NY 10001
              </p>
            </div>

            <div style={{ 
              padding: "40px", 
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)"
            }}>
              <h3 style={{ marginBottom: "24px", color: "var(--text-primary)", fontSize: "1.5rem" }}>Follow Our Journey</h3>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 20px", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "30px", color: "var(--text-primary)", fontWeight: 600, fontSize: "0.9rem", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--bg-orange)"; e.currentTarget.style.color = "var(--bg-orange)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "var(--text-primary)"; }}>Twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 20px", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "30px", color: "var(--text-primary)", fontWeight: 600, fontSize: "0.9rem", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--bg-orange)"; e.currentTarget.style.color = "var(--bg-orange)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "var(--text-primary)"; }}>Instagram</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 20px", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: "30px", color: "var(--text-primary)", fontWeight: 600, fontSize: "0.9rem", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--bg-orange)"; e.currentTarget.style.color = "var(--bg-orange)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "var(--text-primary)"; }}>LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Column 2: Inquiry Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <div style={{ 
              padding: "40px", 
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)"
            }}>
              <h3 style={{ marginBottom: "24px", color: "var(--text-primary)", fontSize: "1.5rem" }}>Send Us a Message</h3>
              <form style={{ display: "flex", flexDirection: "column", gap: "20px" }} onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Tell us about your project or inquiry..." rows={5} required></textarea>
                <button type="submit" className="btn-primary" style={{ width: "100%", padding: "16px" }}>Submit Inquiry</button>
              </form>
            </div>
            
            <NewsletterForm />
          </div>

        </div>
      </div>
    </div>
  );
}
