import { useState, useEffect } from "react";
import {
  getProjects,
  getClients,
  submitContact,
  subscribeNewsletter,
} from "../services/api";
import { toast } from "react-toastify";

function Home() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Default sample projects
  const defaultProjects = [
    {
      _id: "sample-1",
      name: "Modern Family Home",
      description:
        "Beautiful 3 bedroom house in prime location with garden and modern amenities.",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      isSample: true,
    },
    {
      _id: "sample-2",
      name: "Luxury Villa",
      description:
        "Spacious villa with pool, 4 bedrooms, and stunning city views.",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      isSample: true,
    },
    {
      _id: "sample-3",
      name: "Downtown Apartment",
      description:
        "Modern 2 bedroom apartment in the heart of the city with parking.",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      isSample: true,
    },
    {
      _id: "sample-4",
      name: "Countryside Estate",
      description:
        "Large property with 5 bedrooms, perfect for family living and entertaining.",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      isSample: true,
    },
  ];

  // Default sample testimonials
  const defaultClients = [
    {
      _id: "client-1",
      name: "Sarah Johnson",
      description:
        "Real Trust helped me find my dream home! The team was professional and made the entire process smooth and stress-free. Highly recommended!",
      designation: "Homeowner",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      isSample: true,
    },
    {
      _id: "client-2",
      name: "Michael Chen",
      description:
        "Excellent service and great property options. I highly recommend Real Trust for anyone looking to buy or invest in property.",
      designation: "Property Investor",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      isSample: true,
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [projectsRes, clientsRes] = await Promise.all([
        getProjects(),
        getClients(),
      ]);

      const realProjects = projectsRes.data || [];
      const realClients = clientsRes.data || [];

      setProjects([...realProjects, ...defaultProjects]);
      setClients([...realClients, ...defaultClients]);
    } catch (error) {
      console.error("Error loading data:", error);
      setProjects(defaultProjects);
      setClients(defaultClients);
    } finally {
      setLoading(false);
    }
  };

  const validateContactForm = () => {
    if (!contactForm.fullName || contactForm.fullName.length < 2) {
      toast.error("Please enter a valid name (min 2 characters)");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!/^[0-9]{10,15}$/.test(contactForm.mobile)) {
      toast.error("Please enter a valid mobile number (10-15 digits)");
      return false;
    }
    if (!contactForm.city || contactForm.city.length < 2) {
      toast.error("Please enter a valid city name");
      return false;
    }
    return true;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!validateContactForm()) return;

    try {
      setSubmitting(true);
      await submitContact(contactForm);
      toast.success("Thank you! We will contact you soon.");
      setContactForm({ fullName: "", email: "", mobile: "", city: "" });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit form. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setSubmitting(true);
      await subscribeNewsletter({ email: newsletterEmail });
      toast.success("Successfully subscribed to newsletter!");
      setNewsletterEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to subscribe. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="real-estate-landing">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <div className="logo-icon">🏠</div>
            <span>Real Trust</span>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>

          <div className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
            <a href="#home" onClick={() => scrollToSection("home")}>
              Home
            </a>
            <a href="#projects" onClick={() => scrollToSection("projects")}>
              Properties
            </a>
            <a href="#clients" onClick={() => scrollToSection("clients")}>
              Testimonials
            </a>
            <a href="#contact" onClick={() => scrollToSection("contact")}>
              Contact
            </a>
            <a href="/admin" className="admin-link">
              Admin Panel
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content fade-in">
              <div className="trust-badge">
                <span className="badge-icon">✓</span>
                <span>Real Trust</span>
              </div>
              <h1>Find Your Dream Property</h1>
              <p>Trusted Real Estate Solutions for Modern Living</p>
              <div className="hero-stats">
                <div className="stat">
                  <h3>500+</h3>
                  <p>Properties Sold</p>
                </div>
                <div className="stat">
                  <h3>1000+</h3>
                  <p>Happy Clients</p>
                </div>
                <div className="stat">
                  <h3>50+</h3>
                  <p>Expert Agents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="projects" className="properties-section">
        <div className="container">
          <h2>Featured Properties</h2>
          <p className="section-subtitle">
            Discover our handpicked selection of premium properties
          </p>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading properties...</p>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div
                  key={project._id}
                  className="property-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="property-image">
                    <img
                      src={project.image}
                      alt={project.name}
                      loading="lazy"
                    />
                    <span
                      className={
                        project.isSample
                          ? "property-badge sample-badge"
                          : "property-badge"
                      }
                    >
                      {project.isSample ? "Sample" : "For Sale"}
                    </span>
                  </div>
                  <div className="property-content">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <button className="read-more-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="clients" className="testimonials-section">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <p className="section-subtitle">
            Real stories from satisfied property owners
          </p>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading testimonials...</p>
            </div>
          ) : (
            <div className="clients-grid">
              {clients.map((client, index) => (
                <div
                  key={client._id}
                  className="testimonial-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {client.isSample && (
                    <div className="sample-testimonial-badge">Sample</div>
                  )}
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">{client.description}</p>
                  <div className="client-info">
                    <img src={client.image} alt={client.name} loading="lazy" />
                    <div>
                      <h4>{client.name}</h4>
                      <span className="designation">{client.designation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>
                Ready to find your dream property? Contact us today and let our
                expert team guide you.
              </p>
              <div className="contact-features">
                <div className="feature">
                  <span className="icon">🏠</span>
                  <div>
                    <h4>Prime Locations</h4>
                    <p>Properties in the best neighborhoods</p>
                  </div>
                </div>
                <div className="feature">
                  <span className="icon">💰</span>
                  <div>
                    <h4>Best Prices</h4>
                    <p>Competitive rates and financing options</p>
                  </div>
                </div>
                <div className="feature">
                  <span className="icon">✅</span>
                  <div>
                    <h4>Trusted Service</h4>
                    <p>Over 10 years of excellence</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <h3>Send us a Message</h3>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.fullName}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        fullName: e.target.value,
                      })
                    }
                    placeholder="Enter your full name"
                    disabled={submitting}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    placeholder="your.email@example.com"
                    disabled={submitting}
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={contactForm.mobile}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        mobile: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    placeholder="+91 XXXXX XXXXX"
                    disabled={submitting}
                    maxLength="15"
                  />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.city}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, city: e.target.value })
                    }
                    placeholder="Enter your city"
                    disabled={submitting}
                  />
                </div>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="btn-spinner"></span>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated with Latest Properties</h2>
            <p>Subscribe to our newsletter and never miss exclusive deals</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                disabled={submitting}
              />
              <button
                type="submit"
                className="subscribe-btn"
                disabled={submitting}
              >
                {submitting ? "Subscribing..." : "Subscribe Now"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <div className="logo-icon">🏠</div>
                <span>Real Trust</span>
              </div>
              <p>Your trusted partner in real estate</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <a href="#home" onClick={() => scrollToSection("home")}>
                Home
              </a>
              <a href="#projects" onClick={() => scrollToSection("projects")}>
                Properties
              </a>
              <a href="#clients" onClick={() => scrollToSection("clients")}>
                Testimonials
              </a>
              <a href="#contact" onClick={() => scrollToSection("contact")}>
                Contact
              </a>
            </div>
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p>Email: info@realtrust.com</p>
              <p>Phone: +91 XXXXX XXXXX</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Real Trust. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
