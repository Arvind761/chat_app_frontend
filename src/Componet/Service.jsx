import React from 'react';
import './Section.css';

export default function Services() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Our Services</h1>
        <p className="section-subtitle">
          DavBroApp provides a full suite of communication tools to make collaboration easy, instant, and secure.
        </p>

        <div className="card-grid">
          {services.map((s, i) => (
            <div className="card" key={i}>
              <div className="icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  
  { title: "Group Chat", description: "Collaborate in real-time with multiple users.", icon: "👨‍👩‍👧‍👦" },
  { title: "Seen/Delivery Status", description: "Track whether messages were seen or delivered.", icon: "✅" },
  { title: "Live User Count", description: "Know who's online and actively chatting.", icon: "👁️" },
];
