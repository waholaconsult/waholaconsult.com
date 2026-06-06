"use client";

import { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import RichTextEditor from "./RichTextEditor";
import { supabase } from "@/lib/supabase";

interface BlogPostStat {
  title: string;
  slug: string;
  views: number;
  reads: number;
}

interface Lead {
  id: string;
  type: "contact" | "career";
  name: string;
  email: string;
  message: string;
  position?: string;
  portfolio?: string;
  timestamp: string;
  status: "new" | "contacted" | "closed";
}

interface Subscriber {
  id: string;
  email: string;
  timestamp: string;
  status: string;
}

interface AnalyticsData {
  totalViews: number;
  totalLeads: number;
  totalSubscribers: number;
  viewsByPage: Record<string, number>;
  blogStats: BlogPostStat[];
}

export default function AdminPage() {
      const [activeTab, setActiveTab] = useState<"analytics" | "leads" | "subscribers" | "write">("analytics");
    
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  
  const [article, setArticle] = useState({
    title: "",
    category: "Social Media",
    excerpt: "",
    content: "",
    coverImage: null as File | null,
  });
  const [articleStatus, setArticleStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  const categories = ["Social Media", "YouTube", "Web Design", "Digital Ads", "SEO", "Branding"];

  
  
  const fetchData = async () => {
        try {
      const [resAnal, resLeads, resSubs] = await Promise.all([
        fetch(`/api/analytics`),
        fetch(`/api/leads`),
        fetch(`/api/subscribers`),
      ]);

      if (resAnal.ok && resLeads.ok && resSubs.ok) {
        setAnalytics(await resAnal.json());
        setLeads(await resLeads.json());
        setSubscribers(await resSubs.json());
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setArticleStatus("loading");
    try {
      let coverImageUrl = "";

      if (article.coverImage) {
        const fileExt = article.coverImage.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from("blog-images")
          .upload(fileName, article.coverImage);
          
        if (error) {
          console.error("Image upload failed:", error);
          setArticleStatus("error");
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("blog-images")
          .getPublicUrl(fileName);
          
        coverImageUrl = publicUrlData.publicUrl;
      }

      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: article.title,
          category: article.category,
          excerpt: article.excerpt,
          content: article.content,
          coverImageUrl,
        }),
      });

      if (res.ok) {
        setArticleStatus("success");
        setArticle({ title: "", category: "Social Media", excerpt: "", content: "", coverImage: null });
        fetchData();
      } else {
        setArticleStatus("error");
      }
    } catch (err) {
      setArticleStatus("error");
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: "new" | "contacted" | "closed") => {
    try {
      const res = await fetch("/api/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, }),
      });
      if (res.ok) {
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    try {
      const res = await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;
    try {
      const res = await fetch(`/api/subscribers?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubscribers(subscribers.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const exportCSV = (type: "leads" | "subscribers") => {
    let headers = "";
    let rows = "";
    let filename = "";

    if (type === "leads") {
      headers = "ID,Type,Name,Email,Position,Portfolio,Date,Status,Message\n";
      rows = leads.map(l => 
        `"${l.id}","${l.type}","${l.name}","${l.email}","${l.position || ""}","${l.portfolio || ""}","${new Date(l.timestamp).toLocaleString()}","${l.status}","${l.message.replace(/"/g, '""')}"`
      ).join("\n");
      filename = "wahola_crm_leads.csv";
    } else {
      headers = "ID,Email,Date,Status\n";
      rows = subscribers.map(s => 
        `"${s.id}","${s.email}","${new Date(s.timestamp).toLocaleString()}","${s.status}"`
      ).join("\n");
      filename = "wahola_newsletter_subscribers.csv";
    }

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  
  return (
    <div style={{ paddingTop: "140px", paddingBottom: "100px", minHeight: "100vh", backgroundColor: "var(--bg-secondary)" }}>
      <div className="container" style={{ maxWidth: "1200px" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "50px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <h1 style={{ fontSize: "2.25rem", color: "var(--text-primary)" }}>Wahola CRM & Dashboard</h1>
            <p style={{ color: "var(--text-secondary)" }}>Control panel for writing articles, tracking analytics, and managing contacts.</p>
          </div>
          <UserButton />
        </div>

        <div className="admin-tabs">
          {[
            { id: "analytics", label: "Analytics & Performance" },
            { id: "leads", label: `Leads & Careers (${leads.length})` },
            { id: "subscribers", label: `Subscribers (${subscribers.length})` },
            { id: "write", label: "Write Blog Article" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: "12px 24px",
                fontWeight: 600,
                borderRadius: "8px",
                background: activeTab === tab.id ? "var(--bg-orange)" : "transparent",
                color: activeTab === tab.id ? "white" : "var(--text-secondary)",
                transition: "all 0.2s"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "analytics" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginBottom: "50px" }}>
              <div className="glass-panel" style={{ padding: "30px", textAlign: "center" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "8px" }}>Total Page Views</p>
                <h2 style={{ fontSize: "2.75rem", color: "var(--bg-orange)" }}>{analytics?.totalViews || 0}</h2>
              </div>
              <div className="glass-panel" style={{ padding: "30px", textAlign: "center" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "8px" }}>Total Form Submissions</p>
                <h2 style={{ fontSize: "2.75rem", color: "var(--bg-orange)" }}>{analytics?.totalLeads || 0}</h2>
              </div>
              <div className="glass-panel" style={{ padding: "30px", textAlign: "center" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "8px" }}>Newsletter Subscribers</p>
                <h2 style={{ fontSize: "2.75rem", color: "var(--bg-orange)" }}>{analytics?.totalSubscribers || 0}</h2>
              </div>
            </div>

            <div className="responsive-grid-2-col">
              <div className="glass-panel table-responsive" style={{ padding: "30px" }}>
                <h3 style={{ marginBottom: "20px" }}>Blog Performance Stats</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--border-color)" }}>
                      <th style={{ padding: "12px 10px", color: "var(--text-secondary)" }}>Article Title</th>
                      <th style={{ padding: "12px 10px", color: "var(--text-secondary)" }}>Views</th>
                      <th style={{ padding: "12px 10px", color: "var(--text-secondary)" }}>Reads</th>
                      <th style={{ padding: "12px 10px", color: "var(--text-secondary)" }}>Read Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics?.blogStats.map((post) => {
                      const rate = post.views > 0 ? ((post.reads / post.views) * 100).toFixed(0) : "0";
                      return (
                        <tr key={post.slug} style={{ borderBottom: "1px solid var(--border-color)" }}>
                          <td style={{ padding: "16px 10px", fontWeight: 600 }}>{post.title}</td>
                          <td style={{ padding: "16px 10px" }}>{post.views}</td>
                          <td style={{ padding: "16px 10px" }}>{post.reads}</td>
                          <td style={{ padding: "16px 10px", color: "var(--bg-orange)", fontWeight: 700 }}>{rate}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="glass-panel" style={{ padding: "30px" }}>
                <h3 style={{ marginBottom: "20px" }}>Page Traffic</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {analytics && Object.entries(analytics.viewsByPage).map(([page, count]) => (
                    <div key={page} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
                      <code style={{ fontWeight: 600, color: "var(--text-primary)" }}>{page}</code>
                      <span style={{ fontWeight: 700 }}>{count} hits</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "leads" && (
          <div className="glass-panel" style={{ padding: "40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "20px" }}>
              <h3>Contact & Career Enquiries</h3>
              <button className="btn-primary" onClick={() => exportCSV("leads")} style={{ padding: "10px 20px" }}>Export CSV</button>
            </div>
            
            {leads.length === 0 ? (
              <p style={{ color: "var(--text-secondary)" }}>No submissions received yet.</p>
            ) : (
              <div className="table-responsive">
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--border-color)" }}>
                      <th style={{ padding: "12px 10px", color: "var(--text-secondary)" }}>Type</th>
                      <th style={{ padding: "12px 10px", color: "var(--text-secondary)" }}>Name/Email</th>
                      <th style={{ padding: "12px 10px", color: "var(--text-secondary)" }}>Role/Portfolio</th>
                      <th style={{ padding: "12px 10px", color: "var(--text-secondary)" }}>Message</th>
                      <th style={{ padding: "12px 10px", color: "var(--text-secondary)" }}>Status</th>
                      <th style={{ padding: "12px 10px", color: "var(--text-secondary)", textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} style={{ borderBottom: "1px solid var(--border-color)", verticalAlign: "top" }}>
                        <td style={{ padding: "20px 10px" }}>
                          <span style={{
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            backgroundColor: lead.type === "career" ? "rgba(127, 0, 255, 0.1)" : "rgba(0, 74, 173, 0.1)",
                            color: lead.type === "career" ? "purple" : "var(--bg-orange)"
                          }}>
                            {lead.type}
                          </span>
                        </td>
                        <td style={{ padding: "20px 10px" }}>
                          <div style={{ fontWeight: 600 }}>{lead.name}</div>
                          <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{lead.email}</div>
                          <div style={{ fontSize: "0.8rem", color: "var(--text-light)", marginTop: "4px" }}>{new Date(lead.timestamp).toLocaleString()}</div>
                        </td>
                        <td style={{ padding: "20px 10px", fontSize: "0.9rem" }}>
                          {lead.type === "career" ? (
                            <>
                              <div style={{ fontWeight: 600 }}>{lead.position}</div>
                              <a href={lead.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: "var(--bg-orange)", textDecoration: "underline", fontSize: "0.8rem" }}>Portfolio Link</a>
                            </>
                          ) : (
                            <span style={{ color: "var(--text-light)" }}>N/A</span>
                          )}
                        </td>
                        <td style={{ padding: "20px 10px", fontSize: "0.9rem", maxWidth: "300px", lineHeight: "1.5", whiteSpace: "pre-line" }}>
                          {lead.message}
                        </td>
                        <td style={{ padding: "20px 10px" }}>
                          <select 
                            value={lead.status}
                            onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                            style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid var(--border-color)", fontWeight: 600 }}
                          >
                            <option value="new">🆕 New</option>
                            <option value="contacted">📞 Contacted</option>
                            <option value="closed">✅ Closed</option>
                          </select>
                        </td>
                        <td style={{ padding: "20px 10px", textAlign: "right" }}>
                          <button onClick={() => handleDeleteLead(lead.id)} style={{ color: "red", fontWeight: 600, border: "1px solid red", padding: "6px 12px", borderRadius: "6px", fontSize: "0.85rem", background: "transparent" }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "subscribers" && (
          <div className="glass-panel" style={{ padding: "40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "20px" }}>
              <h3>Newsletter Subscribers List</h3>
              <button className="btn-primary" onClick={() => exportCSV("subscribers")} style={{ padding: "10px 20px" }}>Export CSV</button>
            </div>

            {subscribers.length === 0 ? (
              <p style={{ color: "var(--text-secondary)" }}>No newsletter subscribers found.</p>
            ) : (
              <div className="table-responsive">
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--border-color)" }}>
                      <th style={{ padding: "12px 10px", color: "var(--text-secondary)" }}>Subscriber ID</th>
                      <th style={{ padding: "12px 10px", color: "var(--text-secondary)" }}>Email Address</th>
                      <th style={{ padding: "12px 10px", color: "var(--text-secondary)" }}>Subscribed On</th>
                      <th style={{ padding: "12px 10px", color: "var(--text-secondary)", textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub) => (
                      <tr key={sub.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td style={{ padding: "16px 10px", fontWeight: 600 }}>#{sub.id}</td>
                        <td style={{ padding: "16px 10px" }}>{sub.email}</td>
                        <td style={{ padding: "16px 10px" }}>{new Date(sub.timestamp).toLocaleString()}</td>
                        <td style={{ padding: "16px 10px", textAlign: "right" }}>
                          <button onClick={() => handleDeleteSubscriber(sub.id)} style={{ color: "red", fontWeight: 600, border: "1px solid red", padding: "6px 12px", borderRadius: "6px", fontSize: "0.85rem", background: "transparent" }}>Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "write" && (
          <div className="glass-panel" style={{ padding: "40px" }}>
            <h3 style={{ marginBottom: "24px" }}>Publish a New Blog Article</h3>
            
            <form onSubmit={handlePublish} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Article Title</label>
                  <input 
                    type="text" 
                    placeholder="Enter catchy title" 
                    value={article.title}
                    onChange={(e) => setArticle({ ...article, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Category</label>
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
                    value={article.category}
                    onChange={(e) => setArticle({ ...article, category: e.target.value })}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Cover Image</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setArticle({ ...article, coverImage: e.target.files ? e.target.files[0] : null })}
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-color)",
                    backgroundColor: "var(--bg-primary)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Excerpt / Short Summary</label>
                <input 
                  type="text" 
                  placeholder="Summarize the article in 1-2 sentences..." 
                  value={article.excerpt}
                  onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Article Body Content</label>
                <RichTextEditor 
                  content={article.content}
                  onChange={(html) => setArticle({ ...article, content: html })}
                />
              </div>

              {articleStatus === "success" && (
                <p style={{ color: "green", fontWeight: 600 }}>Article published successfully and is now live on the Blog!</p>
              )}

              {articleStatus === "error" && (
                <p style={{ color: "red", fontWeight: 600 }}>Failed to publish article. Check your server logs.</p>
              )}

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ padding: "16px 36px", alignSelf: "flex-start" }}
                disabled={articleStatus === "loading"}
              >
                {articleStatus === "loading" ? "Publishing..." : "Publish Article"}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
