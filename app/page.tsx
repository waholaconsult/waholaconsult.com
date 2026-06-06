import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import NewsletterForm from "@/components/NewsletterForm";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const services = [
    {
      title: "Social Media Marketing",
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
      description: "Your #1 resource for digital marketing tips, trends, and strategy to help you build a successful online business.",
      link: "/blog",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      )
    },
    {
      title: "Audience Search Insights",
      description: "Find out what your audience is searching for online with our free search insights tool.",
      link: "/contact?tool=search-insights",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
        </svg>
      )
    },
    {
      title: "Google Ads Grader",
      description: "Get in-depth campaign analysis now so you can optimize ad spend, increase ROI, and reach your target audience more effectively than ever before.",
      link: "/contact?tool=google-ads-grader",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <polyline points="9 15 11 17 15 13"></polyline>
        </svg>
      )
    },
    {
      title: "Growth Engine",
      description: "Our proprietary technology that helps drive innovation and efficiencies for our team.",
      link: "/contact?tool=growth-engine",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      )
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero />
      
      {/* Services Section */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "60px", padding: "0 20px" }}>
            <div style={{ 
              position: "relative", 
              width: "100%", 
              maxWidth: "1100px", 
              height: "450px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0, 74, 173, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <Image 
                src="/marketing-strategy.jpg" 
                alt="Wahola Marketing Strategy" 
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
              />
            </div>
          </div>
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
              <Link href="/careers" className="peopleArrow">
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
                
                <Link href="/careers" className="btn-blue" style={{ width: "100%", textAlign: "center" }}>
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
              <Link key={idx} href={resource.link} className="resourceCard">
                <div>
                  <div className="resourceIconWrapper">
                    {resource.icon}
                  </div>
                  <div className="resourceHeader">
                    <h3 className="resourceTitle">{resource.title}</h3>
                    <div className="resourceArrowWrapper">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>
                  <p className="resourceDesc">
                    {resource.description}
                  </p>
                </div>
              </Link>
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
