"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  created_at: string;
  category: string;
  cover_image_url: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch("/api/blog");
        if (res.ok) {
          setPosts(await res.json());
        }
      } catch (err) {
        console.error("Failed to load blog posts:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <div style={{ paddingTop: "120px", paddingBottom: "100px", minHeight: "80vh" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <h1 style={{ marginBottom: "24px" }}>The <span style={{ color: "var(--bg-orange)" }}>Wahola</span> Blog</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem" }}>
            Insights, strategies, and updates from the digital marketing frontier.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", fontSize: "1.2rem", color: "var(--text-secondary)" }}>
            Loading articles...
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", fontSize: "1.2rem", color: "var(--text-secondary)" }}>
            No articles found. Use the admin dashboard to publish one.
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", 
            gap: "30px" 
          }}>
            {posts.map((post) => {
              const date = new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
              
              return (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <div className="glass-panel" style={{ padding: "0", height: "100%", display: "flex", flexDirection: "column", transition: "transform 0.3s ease, boxShadow 0.3s ease", overflow: "hidden" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-glow)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {post.cover_image_url && (
                    <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
                      <img src={post.cover_image_url} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <div style={{ padding: "40px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontSize: "0.9rem" }}>
                      <span style={{ color: "var(--bg-orange)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.05em" }}>{post.category}</span>
                      <span style={{ color: "var(--text-secondary)" }}>{date}</span>
                    </div>
                    <h3 style={{ marginBottom: "16px", color: "var(--text-primary)" }}>{post.title}</h3>
                    <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", flexGrow: 1 }}>{post.excerpt}</p>
                    <div style={{ color: "var(--bg-orange)", marginTop: "24px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
                      Read Article <span>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            )})}
          </div>
        )}
      </div>
    </div>
  );
}
