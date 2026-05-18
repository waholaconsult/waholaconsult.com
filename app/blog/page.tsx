"use client";

import Link from "next/link";

// Mock blog data
const blogPosts = [
  {
    slug: "future-of-social-marketing-2026",
    title: "The Future of Social Marketing in 2026",
    excerpt: "Discover the emerging trends that will dominate social media algorithms and how your brand can stay ahead of the curve.",
    date: "May 10, 2026",
    category: "Social Media"
  },
  {
    slug: "youtube-automation-guide",
    title: "A Complete Guide to YouTube Automation",
    excerpt: "Learn how to build a passive income machine on YouTube without ever showing your face on camera.",
    date: "May 05, 2026",
    category: "YouTube"
  },
  {
    slug: "high-converting-web-design",
    title: "7 Elements of a High-Converting Website",
    excerpt: "Traffic means nothing if your website doesn't convert. Here are the core principles of premium website design.",
    date: "April 28, 2026",
    category: "Web Design"
  }
];

export default function BlogPage() {
  return (
    <div style={{ paddingTop: "120px", paddingBottom: "100px", minHeight: "80vh" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <h1 style={{ marginBottom: "24px" }}>The <span className="text-gradient">Wahola</span> Blog</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem" }}>
            Insights, strategies, and updates from the digital marketing frontier.
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", 
          gap: "30px" 
        }}>
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <div className="glass-panel" style={{ padding: "40px", height: "100%", display: "flex", flexDirection: "column", transition: "transform 0.3s ease, boxShadow 0.3s ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>{post.category}</span>
                  <span style={{ color: "var(--text-secondary)" }}>{post.date}</span>
                </div>
                <h3 style={{ marginBottom: "16px" }}>{post.title}</h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", flexGrow: 1 }}>{post.excerpt}</p>
                <div style={{ color: "var(--accent-primary)", marginTop: "24px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
                  Read Article <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
