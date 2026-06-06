"use client";

import { useState } from "react";
import Link from "next/link";

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "Social Media Marketing Specialist",
    portfolio: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const positions = [
    "Social Media Marketing Specialist",
    "Website Designer & Developer",
    "YouTube Automation Producer",
    "Digital Ads Manager",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "career",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          position: formData.position,
          portfolio: formData.portfolio,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          position: "Social Media Marketing Specialist",
          portfolio: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div style={{ paddingTop: "140px", paddingBottom: "100px", backgroundColor: "var(--bg-secondary)" }}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ color: "var(--bg-orange)", fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
            Join the Team
          </div>
          <h1 style={{ marginBottom: "24px", color: "var(--text-primary)" }}>
            Careers at <span style={{ color: "var(--bg-orange)" }}>Wahola</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", lineHeight: "1.6", maxWidth: "700px", margin: "0 auto" }}>
            We are a 100% remote team of passionate marketers, designers, and creatives. We value results, work-life balance, and continuous growth.
          </p>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>
          
          {/* Left Column: Roles Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <div style={{ 
              padding: "40px", 
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)"
            }}>
              <h2 style={{ marginBottom: "20px", fontSize: "1.8rem" }}>Why Wahola?</h2>
              <ul style={{ listStyleType: "none", padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.25rem", color: "var(--bg-orange)" }}>🏠</span>
                  <div>
                    <strong>100% Remote:</strong> Work from anywhere in the world on a flexible schedule.
                  </div>
                </li>
                <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.25rem", color: "var(--bg-orange)" }}>🌴</span>
                  <div>
                    <strong>Work-life Balance:</strong> Unlimited paid time off and mental health days.
                  </div>
                </li>
                <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.25rem", color: "var(--bg-orange)" }}>🚀</span>
                  <div>
                    <strong>Growth Environment:</strong> Tech stipend, training resources, and fast-track career progression.
                  </div>
                </li>
              </ul>
            </div>

            <div style={{ 
              padding: "40px", 
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)"
            }}>
              <h2 style={{ marginBottom: "20px", fontSize: "1.8rem" }}>Open Positions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {positions.map((pos) => (
                  <div 
                    key={pos}
                    style={{ 
                      padding: "16px 20px", 
                      background: "var(--bg-secondary)", 
                      borderRadius: "8px", 
                      fontWeight: 600, 
                      fontSize: "0.95rem",
                      color: "var(--text-primary)"
                    }}
                  >
                    {pos}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div style={{ 
            padding: "40px", 
            backgroundColor: "var(--bg-primary)",
            border: "1px solid var(--border-color)",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
            height: "fit-content"
          }}>
            <h2 style={{ marginBottom: "12px", fontSize: "1.8rem" }}>Apply Now</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "30px", fontSize: "0.95rem" }}>
              Submit your application details below, and our HR team will reach out to schedule an interview.
            </p>

            <form style={{ display: "flex", flexDirection: "column", gap: "20px" }} onSubmit={handleSubmit}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "0.9rem" }}>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required 
                  disabled={status === "loading" || status === "success"}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "0.9rem" }}>Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required 
                  disabled={status === "loading" || status === "success"}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "0.9rem" }}>Position</label>
                <select 
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)",
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-primary)",
                    fontFamily: "inherit",
                    fontSize: "1rem"
                  }}
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  disabled={status === "loading" || status === "success"}
                >
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "0.9rem" }}>Portfolio / LinkedIn Link</label>
                <input 
                  type="url" 
                  placeholder="https://portfolio.com or linkedin.com/in/username" 
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  required 
                  disabled={status === "loading" || status === "success"}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "0.9rem" }}>Why should we hire you?</label>
                <textarea 
                  placeholder="Briefly describe your experience and passion..." 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required 
                  disabled={status === "loading" || status === "success"}
                ></textarea>
              </div>

              {status === "error" && (
                <p style={{ color: "red", fontWeight: 600 }}>Oops! Something went wrong. Please try again.</p>
              )}

              {status === "success" && (
                <p style={{ color: "green", fontWeight: 600 }}>Application submitted successfully! We will contact you soon.</p>
              )}

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: "100%", padding: "16px" }}
                disabled={status === "loading" || status === "success"}
              >
                {status === "loading" ? "Submitting Application..." : "Submit Application"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
