import React from 'react';
import './Section.css';

export default function Privacy() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Privacy Policy</h1>
        <p className="section-subtitle">
          Your privacy is important to us. Here’s how we handle your data.
        </p>

        <div className="policy-block">
          <h3>🔐 Data Security</h3>
          <p>We use industry-standard encryption and JWT tokens to secure user sessions and communication.</p>
        </div>

        <div className="policy-block">
          <h3>👁️‍🗨️ Data Usage</h3>
          <p>We only collect information necessary for account creation and chat functionality. We do not sell or share your data.</p>
        </div>

        <div className="policy-block">
          <h3>🗑️ Data Retention</h3>
          <p>Chat history is stored securely. Users may request deletion of their account and associated data anytime.</p>
        </div>
      </div>
    </section>
  );
}
