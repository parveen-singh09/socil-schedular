"use client";

export default function AboutView() {
  return (
    <section className="view-section">
      <div className="settings-layout" style={{ maxWidth: "800px" }}>
        <div className="settings-card-body" style={{ gap: "28px" }}>
          <div>
            <h3 className="settings-subtitle" style={{ fontSize: "20px", marginBottom: "8px" }}>
              The PostAI Mission
            </h3>
            <p className="settings-desc" style={{ marginTop: "0", lineHeight: "1.6" }}>
              PostAI was built to bridge the gap between creative copywriting and structured campaign distributions. By leveraging simulated AI contextual models, the platform acts as an intelligence companion—optimizing copy formatting, hashtags, and engagement indicators for diverse modern social media platforms.
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--border-glow)", paddingTop: "24px" }}>
            <h3 className="settings-subtitle" style={{ fontSize: "16px", marginBottom: "16px" }}>
              Key Technical Primitives
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <div className="platform-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: "8px", padding: "16px" }}>
                <h4 style={{ color: "var(--accent-purple)", fontWeight: "600", fontSize: "14px" }}>Next.js App Core</h4>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.4" }}>
                  Constructed as a modular component architecture with client-side state hydration and responsive framework layouts.
                </p>
              </div>
              <div className="platform-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: "8px", padding: "16px" }}>
                <h4 style={{ color: "var(--accent-cyan)", fontWeight: "600", fontSize: "14px" }}>Pure CSS tokens</h4>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.4" }}>
                  Atmospheric background glowing backdrops and fine glassmorphic border elements styled entirely using native CSS.
                </p>
              </div>
              <div className="platform-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: "8px", padding: "16px" }}>
                <h4 style={{ color: "var(--accent-pink)", fontWeight: "600", fontSize: "14px" }}>Isolate sandboxing</h4>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.4" }}>
                  All social posts and platform configurations are kept strictly private inside the browser's local sandbox environment.
                </p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border-glow)", paddingTop: "24px" }}>
            <h3 className="settings-subtitle" style={{ fontSize: "16px", marginBottom: "12px" }}>
              Version Status
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.5" }}>
              <strong>PostAI Core:</strong> v1.2.0 (Stable Release)<br />
              <strong>Mock AI Engine:</strong> Template-Driven Contextual Simulator<br />
              <strong>Environment:</strong> Local Storage Hydrated Client Sandbox
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
