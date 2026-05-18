import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // In a real app, you would fetch the blog post data based on the slug here.
  const title = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return (
    <article style={{ paddingTop: "120px", paddingBottom: "100px" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div style={{ marginBottom: "60px", textAlign: "center" }}>
          <Link href="/blog" style={{ color: "var(--accent-primary)", marginBottom: "20px", display: "inline-block", fontWeight: 600 }}>
            ← Back to Blog
          </Link>
          <h1 style={{ marginBottom: "24px" }}>{title}</h1>
          <div style={{ color: "var(--text-secondary)", display: "flex", gap: "20px", justifyContent: "center", fontSize: "0.95rem" }}>
            <span>By Wahola Team</span>
            <span>•</span>
            <span>May 10, 2026</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: "40px", marginBottom: "80px", lineHeight: "1.8", fontSize: "1.1rem", color: "var(--text-secondary)" }}>
          <p style={{ marginBottom: "20px" }}>
            This is a placeholder for the blog post content. In a production environment, this content would be pulled dynamically from a headless CMS (like Sanity or Contentful) or from markdown files.
          </p>
          <h2 style={{ color: "var(--text-primary)", marginTop: "40px", marginBottom: "20px", fontSize: "1.8rem" }}>The Importance of Strategy</h2>
          <p style={{ marginBottom: "20px" }}>
            Digital marketing is no longer just about running ads. It requires a holistic approach that connects your website, your social media presence, and your email marketing into a single, cohesive funnel. 
          </p>
          <ul style={{ paddingLeft: "24px", marginBottom: "20px" }}>
            <li style={{ marginBottom: "10px" }}>Understand your audience</li>
            <li style={{ marginBottom: "10px" }}>Build high-converting landing pages</li>
            <li style={{ marginBottom: "10px" }}>Optimize for search engines and social algorithms</li>
          </ul>
          <p>
            Wahola specializes in building these comprehensive systems for premium brands looking to scale their operations passively and aggressively.
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <h3 style={{ marginBottom: "30px" }}>Enjoyed this article?</h3>
          <NewsletterForm />
        </div>
      </div>
    </article>
  );
}
