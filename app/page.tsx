import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import NewsletterForm from "@/components/NewsletterForm";
import Link from "next/link";

export default function Home() {
  const services = [
    {
      title: "Social Marketing",
      description: "Data-driven social media strategies that amplify your voice and engage your target audience.",
      icon: "📱",
      link: "/services#marketing"
    },
    {
      title: "Website Design",
      description: "Stunning, high-converting premium websites built with modern technologies.",
      icon: "💻",
      link: "/services#design"
    },
    {
      title: "YouTube Automation",
      description: "End-to-end channel management, content creation, and growth strategies.",
      icon: "▶️",
      link: "/services#youtube"
    },
    {
      title: "Digital Ads",
      description: "Highly targeted ad campaigns across Google, Meta, and TikTok to maximize ROI.",
      icon: "🎯",
      link: "/services#ads"
    }
  ];

  return (
    <div>
      <Hero />
      
      {/* Services Section */}
      <section className="section-padding" style={{ position: "relative" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 className="text-gradient">What We Do</h2>
            <p style={{ color: "var(--text-secondary)", marginTop: "16px", fontSize: "1.1rem" }}>
              Comprehensive digital solutions to elevate your brand.
            </p>
          </div>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "30px" 
          }}>
            {services.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Newsletter Section */}
      <section className="section-padding" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px", maxWidth: "800px", margin: "0 auto 60px" }}>
            <h2 style={{ marginBottom: "20px" }}>Ready to scale your business?</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", marginBottom: "30px" }}>
              Let&apos;s build something incredible together. Our team of experts is ready to take your digital presence to the next level.
            </p>
            <Link href="/contact" className="btn-primary" style={{ padding: "16px 36px", fontSize: "1.1rem" }}>
              Get a Free Consultation
            </Link>
          </div>
          
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
