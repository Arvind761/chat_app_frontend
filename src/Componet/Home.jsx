import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";
import Product from "./Product";
import Services from "./Service";
import Privacy from "./Privacy";
import Contact from "./Contact";

function Home() {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTryFree = () => {
    navigate("/chat", { state: { user: "Guest" } });
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="landing-container">
      {/* ✅ Navbar */}
      <nav className="navbar">
        <div className="logo">
          DavBro<span>App</span>
        </div>

        {/* ✅ Full menu on large screens */}
        <div className="nav-links">
          <a href="#product">Product</a>
          <a href="#services">Services</a>
          <a href="#privacy">Privacy</a>
          <a href="#contact">Contact</a>
          <Link to="/login">Log In</Link>
        </div>

        {/* ✅ Hamburger menu for mobile */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>

      {/* ✅ Mobile Overlay */}
      {menuOpen && <div className="mobile-overlay" onClick={toggleMenu}></div>}

      {/* ✅ Slide-in Sidebar */}
      <div className={`mobile-sidebar ${menuOpen ? "active" : ""}`}>
        <a href="#product" onClick={toggleMenu}>
          Product
        </a>
        <a href="#services" onClick={toggleMenu}>
          Services
        </a>
        <a href="#privacy" onClick={toggleMenu}>
          Privacy
        </a>
        <a href="#contact" onClick={toggleMenu}>
          Contact
        </a>
        <Link to="/login" onClick={toggleMenu}>
          Log In
        </Link>
      </div>

      {/* ✅ Hero Section */}
      <div className="hero-section">
        <div className="hero-left">
          <h1>
            Empower Conversations, <br />
            <span>Build Real Connections</span>
          </h1>
          <p>
            Please don’t use it for personal or sensitive communication.
            <br />
            <br />
            I built this chat app because sometimes we all feel a little down or
            lonely — and talking to someone online can help. So feel free to
            chat with others who are online here.
            <br />
            <br />
            🗣️ Share your thoughts, have fun, and spread good vibes!
            <br />
            <br />
            I’m still working on improving this app and hope to make it even
            better soon.
            <br />
            <br />
            🔥 Stay tuned for more updates!
          </p>
          <div className="hero-buttons">
            <button className="btn primary" onClick={handleTryFree}>
              Start Chatting With Everyone
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="image-grid">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Chat 2"
              className="img-secondary"
            />
            <div className="chat-bubble bubble-1">
              Hey! You Can Chat With Everyone.
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Sections */}
      <section id="product" className="section">
        <Product />
      </section>
      <section id="services" className="section">
        <Services />
      </section>
      <section id="privacy" className="section">
        <Privacy />
      </section>
      <section id="contact" className="section">
        <Contact />
      </section>

      {/* ✅ Footer */}
      <footer className="footer">
        <p>
          © 2025{" "}
          <Link
            to="https://arvind761.github.io/PortFolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>DavBroApp.com</strong>
          </Link>{" "}
          All rights reserved.
        </p>
      </footer>

      {/* ✅ Scroll-to-top Button */}
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ⬆
        </button>
      )}
    </div>
  );
}

export default Home;
