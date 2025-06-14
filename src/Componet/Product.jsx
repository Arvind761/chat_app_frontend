import React from 'react';
import './Product.css';

export default function Product() {
  return (
    <section className="product-section">
      <div className="product-container">
        <h1 className="product-title">
          No Need Login, Direct Chat Start
          <br />
          Powerfully Simple, <span className="highlight">Feature-Rich</span> Chat Experience
        </h1>
        <p className="product-description">
          DavBroApp is crafted for modern communication. Whether it's one-on-one messaging or large group discussions, our platform offers speed, security, and simplicity — all in one place.
        </p>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-text">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="product-cta">
          <a href="/chat" className="product-button">
            Start Chatting Now 🚀
          </a>
        </div>
      </div>
    </section>
  );
}

const features = [
  { title: "Real-Time Messaging", description: "Enjoy instant communication with fast and seamless message delivery.", icon: "💬" },
  { title: "Message Seen & Status", description: "Know when your message is delivered and seen with WhatsApp-like indicators.", icon: "✅" },
  { title: "Responsive on All Devices", description: "Use DavBroApp on mobile, tablet, or desktop — fully optimized UI.", icon: "📱" },
  { title: "Fast SignalR Backend", description: "Built with SignalR & .NET Core for ultra-fast real-time performance.", icon: "⚡" },
];
