import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      id: "marketing",
      title: "Social Marketing",
      description: "We craft data-driven social media strategies that amplify your voice, engage your target audience, and turn followers into loyal customers.",
      icon: "📱",
      link: "/contact"
    },
    {
      id: "design",
      title: "Website Design",
      description: "We build stunning, high-converting premium websites with modern technologies tailored specifically to your brand identity.",
      icon: "💻",
      link: "/contact"
    },
    {
      id: "youtube",
      title: "YouTube Automation",
      description: "End-to-end channel management, content creation, scriptwriting, and growth strategies to passively scale your YouTube presence.",
      icon: "▶️",
      link: "/contact"
    },
    {
      id: "ads",
      title: "Digital Ads",
      description: "Highly targeted ad campaigns across Google, Meta, and TikTok. We optimize every dollar of your ad spend to maximize ROI.",
      icon: "🎯",
      link: "/contact"
    }
  ];

  return (
    <div style={{ paddingTop: "120px", paddingBottom: "100px" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "80px", maxWidth: "800px", margin: "0 auto 80px" }}>
          <div className="text-gradient" style={{ fontWeight: 600, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "2px" }}>Our Expertise</div>
          <h1 style={{ marginBottom: "24px" }}>Premium Digital Services</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", lineHeight: "1.6" }}>
            We provide end-to-end digital solutions designed to scale your business, increase your revenue, and dominate your industry.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}>
          {services.map((service, idx) => (
            <div 
              key={service.id} 
              id={service.id}
              className="glass-panel" 
              style={{ 
                padding: "60px", 
                display: "flex", 
                gap: "40px", 
                alignItems: "center",
                flexDirection: idx % 2 === 1 ? "row-reverse" : "row"
              }}
            >
              <div style={{ flex: "1", fontSize: "100px", textAlign: "center" }}>
                {service.icon}
              </div>
              <div style={{ flex: "2" }}>
                <h2 style={{ marginBottom: "20px" }}>{service.title}</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "30px" }}>
                  {service.description}
                </p>
                <Link href="/contact" className="btn-primary">
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
