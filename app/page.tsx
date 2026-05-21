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

  const resources = [
    {
      title: "Wahola's Digital Marketing Blog",
      description: "Your #1 resource for digital marketing tips, trends, and strategy to help you build a successful online business."
    },
    {
      title: "Audience Search Insights",
      description: "Find out what your audience is searching for online with our free search insights tool."
    },
    {
      title: "Google Ads Grader",
      description: "Get in-depth campaign analysis now so you can optimize ad spend, increase ROI, and reach your target audience more effectively than ever before."
    },
    {
      title: "Growth Engine",
      description: "Our proprietary technology that helps drive innovation and efficiencies for our team."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero />
      
      {/* Services Section */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ color: "var(--bg-orange)", fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
              Our Capabilities
            </div>
            <h2 style={{ fontSize: "2.5rem", color: "var(--text-primary)" }}>What We Do</h2>
            <p style={{ color: "var(--text-secondary)", marginTop: "16px", fontSize: "1.1rem", maxWidth: "600px", margin: "16px auto 0" }}>
              Comprehensive digital solutions designed to elevate your brand and drive sustainable growth.
            </p>
          </div>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
            gap: "30px" 
          }}>
            {services.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* People / Careers Section */}
      <section className="section-padding peopleSection">
        <div className="container">
          <div className="peopleGrid">
            
            {/* Left Column: Headline copy */}
            <div className="peopleLeft">
              <div style={{ color: "var(--bg-orange)", fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
                Work With Us
              </div>
              <h2 className="peopleTitle">
                Outstanding <strong>results</strong> require outstanding <strong>people</strong>.
              </h2>
              <p className="peopleText">
                Are you down with data, crazy about conversion rates, and passionate about performance metrics?
              </p>
              <p className="peopleText">
                Do you enjoy a good mix of nerdiness and creativity?
              </p>
              <p className="peopleText" style={{ fontWeight: 600 }}>
                Then you&apos;ll fit right in with us!
              </p>
              <Link href="/contact" className="peopleArrow">
                &rarr;
              </Link>
            </div>
            
            {/* Right Column: Mini-Branding / Recruitment Card */}
            <div className="peopleRight">
              <div className="careerCard">
                <div className="careerCardHeader">
                  <div className="careerLogoBox">W</div>
                  <span className="careerLogoText">wahola digital</span>
                </div>
                
                <p className="careerDesc">
                  Wahola is a 100% remote workplace with industry-leading benefits. We put work-life balance first, so our team members are always on top of their game.
                </p>
                
                <p className="careerCallout">
                  Are you ready for a game-changing career move?
                </p>
                
                <Link href="/contact" className="btn-blue" style={{ width: "100%", textAlign: "center" }}>
                  Geek Out With Us!
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Giving Back Section */}
      <section className="section-padding givingBackSection">
        <div className="container">
          {/* Section Header */}
          <div className="givingBackHeader">
            <h2 className="givingBackTitle">
              <span>We Believe In</span>
              Giving Back
            </h2>
            <p className="givingBackDesc">
              Our greatest satisfaction comes from seeing businesses succeed. That&apos;s why we offer a variety of resources to help you unlock your potential.
            </p>
          </div>
          
          {/* Resources Grid */}
          <div className="resourcesGrid">
            {resources.map((resource, idx) => (
              <div key={idx} className="resourceCard">
                <div className="resourceHeader">
                  <h3 className="resourceTitle">{resource.title}</h3>
                  <div className="resourceArrowWrapper">
                    &nearr;
                  </div>
                </div>
                <p className="resourceDesc">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter & Final CTA Section */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "60px", maxWidth: "800px", margin: "0 auto 60px" }}>
            <h2 style={{ marginBottom: "20px", fontSize: "2.25rem" }}>Ready to scale your business?</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.15rem", marginBottom: "30px", lineHeight: "1.6" }}>
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
