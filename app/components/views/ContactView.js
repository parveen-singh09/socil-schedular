"use client";

import { useState } from "react";

export default function ContactView({ showToast }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast("Please populate all form fields first.", "error");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      showToast(`Thank you, ${name}! Message simulated successfully.`);
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <section className="view-section">
      <div className="creator-layout">
        {/* Left Card: Info */}
        <div className="creator-inputs-card">
          <div className="creator-step-section">
            <h3 className="section-tag" style={{ fontSize: "18px", marginBottom: "8px" }}>
              Get in Touch
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6" }}>
              Have questions regarding feature updates, custom AI model configurations, or support? Reach out directly using the verified channels below.
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--border-glow)", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Owner Details */}
            <div className="platform-row" style={{ padding: "16px" }}>
              <div className="platform-info">
                <div className="platform-icon-circle purple-gradient" style={{ width: "36px", height: "36px", borderRadius: "50%" }}>
                  <span>PS</span>
                </div>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: "600" }}>Lead Engineer</h4>
                  <p className="platform-handle-status">Parveen Singh</p>
                </div>
              </div>
            </div>

            {/* Email Channel */}
            <div className="platform-row" style={{ padding: "16px" }}>
              <div className="platform-info">
                <div className="platform-icon-circle blue-gradient" style={{ width: "36px", height: "36px", borderRadius: "50%", fontWeight: "600", fontSize: "12px" }}>
                  <span>@</span>
                </div>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: "600" }}>Email support</h4>
                  <a href="mailto:parveensingh@socialschedular.tech" style={{ color: "var(--accent-cyan)", textDecoration: "none", fontSize: "12px" }}>
                    parveensingh@socialschedular.tech
                  </a>
                </div>
              </div>
            </div>

            {/* LinkedIn Profile */}
            <div className="platform-row" style={{ padding: "16px" }}>
              <div className="platform-info">
                <div className="platform-icon-circle" style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#0077b5", color: "white", fontWeight: "700", fontSize: "12px" }}>
                  <span>in</span>
                </div>
                <div>
                  <h4 style={{ fontSize: "13px", fontWeight: "600" }}>LinkedIn Profile</h4>
                  <a
                    href="https://www.linkedin.com/in/parveen-s-809880218"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--accent-blue)", textDecoration: "none", fontSize: "12px" }}
                  >
                    parveen-s-809880218
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Message Form */}
        <div className="creator-inputs-card">
          <h3 className="section-tag" style={{ fontSize: "18px", marginBottom: "16px" }}>
            Submit a Message
          </h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="input-group">
              <label htmlFor="contact-name">Full Name</label>
              <input
                type="text"
                id="contact-name"
                className="form-input-text"
                placeholder="E.g., Parveen Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="contact-email">Email Address</label>
              <input
                type="email"
                id="contact-email"
                className="form-input-text"
                placeholder="E.g., parveensingh@socialschedular.tech"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="contact-message">Your Message</label>
              <textarea
                id="contact-message"
                className="prompt-textarea"
                placeholder="Enter feedback or questions..."
                style={{ minHeight: "100px" }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-glow btn-primary" style={{ marginTop: "8px" }} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="dot-pulse">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Submit Message</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
