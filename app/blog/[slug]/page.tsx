import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import NewsletterForm from "@/components/NewsletterForm";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { data: post, error } = await supabase.from("posts").select("*").eq("slug", slug).maybeSingle();

  if (!post || error) {
    notFound();
  }

  // Increment reads
  await supabase.from("posts").update({ reads: (post.reads || 0) + 1 }).eq("id", post.id);

  // Format date
  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article style={{ paddingTop: "120px", paddingBottom: "100px" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div style={{ marginBottom: "60px", textAlign: "center" }}>
          <Link href="/blog" style={{ color: "var(--bg-orange)", marginBottom: "20px", display: "inline-block", fontWeight: 600 }}>
            ← Back to Blog
          </Link>
          <h1 style={{ marginBottom: "24px", color: "var(--text-primary)" }}>{post.title}</h1>
          <div style={{ color: "var(--text-secondary)", display: "flex", gap: "20px", justifyContent: "center", fontSize: "0.95rem", marginBottom: "30px" }}>
            <span>By Wahola Team</span>
            <span>•</span>
            <span>{date}</span>
            <span>•</span>
            <span style={{ color: "var(--bg-orange)", fontWeight: 600 }}>{post.category}</span>
          </div>
          
          {post.cover_image_url && (
            <div style={{ width: "100%", maxHeight: "400px", overflow: "hidden", borderRadius: "12px", marginBottom: "40px" }}>
              <img 
                src={post.cover_image_url} 
                alt={post.title} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </div>
          )}
        </div>

        <div 
          className="glass-panel tiptap-editor" 
          style={{ padding: "40px", marginBottom: "80px", lineHeight: "1.8", fontSize: "1.1rem", color: "var(--text-secondary)" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div style={{ textAlign: "center" }}>
          <h3 style={{ marginBottom: "30px" }}>Enjoyed this article?</h3>
          <NewsletterForm />
        </div>
      </div>
    </article>
  );
}
