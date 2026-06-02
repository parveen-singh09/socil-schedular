"use client";

export default function PrivacyView() {
  return (
    <section className="view-section">
      <div className="settings-layout" style={{ maxWidth: "800px" }}>
        <div className="settings-card-body" style={{ gap: "28px" }}>
          <div>
            <h3 className="settings-subtitle" style={{ fontSize: "20px", marginBottom: "8px" }}>
              Data Collection &amp; Sandbox Integrity
            </h3>
            <p className="settings-desc" style={{ marginTop: "0", lineHeight: "1.6" }}>
              At PostAI, we believe that your digital schedule and social communications belong exclusively to you. The application is architected to prioritize absolute local privacy, isolation, and security.
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--border-glow)", paddingTop: "24px" }}>
            <h3 className="settings-subtitle" style={{ fontSize: "16px", marginBottom: "12px" }}>
              1. Local-Only Storage Policies
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "16px" }}>
              All drafted post content, tones, dates, times, and mock performance indicators are written directly into your local browser's <code>localStorage</code> database sandbox. No server databases, telemetry brokers, or tracking pixels collect, parse, or transmit your post topics.
            </p>

            <h3 className="settings-subtitle" style={{ fontSize: "16px", marginBottom: "12px" }}>
              2. Browser Isolation Safeguards
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "16px" }}>
              Settings profiles, selected default timezones, and simulated platform configuration keys are managed strictly via isolated browser cookies and memory instances. No credentials or integration secrets are processed on remote backends, ensuring complete client protection from credential exposure.
            </p>

            <h3 className="settings-subtitle" style={{ fontSize: "16px", marginBottom: "12px" }}>
              3. Data Ownership &amp; Export
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6" }}>
              You retain absolute ownership of all campaign queues. Since all records exist locally in your browser memory, clearing your browser site data or local cookies will wipe all scheduled entries cleanly.
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--border-glow)", paddingTop: "24px" }}>
            <h3 className="settings-subtitle" style={{ fontSize: "14px", marginBottom: "8px" }}>
              Privacy Statement Compliance
            </h3>
            <p style={{ fontSize: "11px", color: "var(--text-dark)", lineHeight: "1.4" }}>
              PostAI operates under zero tracking permissions. We do not collect cookies, email listings, browser specs, or geographical telemetries. Build safely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
