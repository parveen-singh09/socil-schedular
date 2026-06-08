"use client";

import { useState } from "react";

export default function SettingsView({ settings, onSave, onViewChange }) {
  const [creativity, setCreativity] = useState(settings?.creativity ?? 70);
  const [timezone, setTimezone] = useState(settings?.timezone ?? "local");
  const [llmEngine, setLlmEngine] = useState(settings?.llmEngine ?? "kiro");
  const [brandGuidelines, setBrandGuidelines] = useState(
    settings?.brandGuidelines ??
      "Voice: professional, tech-savvy, startup-focused. Focus areas: developer velocity, AI infrastructure, and multi-agent systems."
  );

  const handleSave = () => {
    onSave({ creativity, timezone, llmEngine, brandGuidelines });
    onViewChange("dashboard");
  };

  return (
    <section className="view-section">
      <div className="settings-layout">
        <div className="settings-card-body">
          <h3 className="settings-subtitle">Connected Social Platforms</h3>
          <p className="settings-desc">Link accounts to toggle publishing and previews.</p>

          <div className="kiro-credit-widget" style={{
            background: "rgba(139, 92, 246, 0.04)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            borderRadius: "var(--radius-lg)",
            padding: "20px",
            marginBottom: "28px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h4 style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)", display: "flex", alignItems: "center", gap: "8px", margin: 0 }}>
                <span className="pulse-indicator" style={{ width: "8px", height: "8px", backgroundColor: "var(--accent-purple)", boxShadow: "0 0 10px rgba(139,92,246,0.6)" }} />
                Kiro Cloud Credit Allocation Monitor
              </h4>
              <span className="mini-status-tag" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                Active Credits
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Startup Grant Status:</span>
              <strong style={{ fontSize: "13px", color: "var(--text-main)" }}>$5,000.00 / $5,000.00 remaining</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Running Compute Nodes:</span>
              <strong style={{ fontSize: "13px", color: "var(--text-main)" }}>2x NVIDIA H100 (West-US)</strong>
            </div>
            <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "var(--radius-full)", overflow: "hidden", marginBottom: "12px" }}>
              <div style={{ height: "100%", width: "100%", background: "var(--primary-glow)" }} />
            </div>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: "1.4", margin: 0 }}>
              Startup credits are billed directly for background orchestrator cron jobs and semantic vector database storage on Kiro Cloud infrastructure.
            </p>
          </div>

          <div className="platform-connectors-list">
            <PlatformRow
              iconClass="twitter-blue"
              iconText="X"
              name="Twitter / X Account"
              handle="Connected as @parveen_sched"
              defaultChecked
            />
            <PlatformRow
              iconClass="linkedin-blue"
              iconText="in"
              name="LinkedIn Profile"
              handle="Connected as Parveen S."
              defaultChecked
            />
            <PlatformRow
              iconClass="instagram-pink"
              iconText="ig"
              name="Instagram Business"
              handle="Connected as @parveen_creations"
              defaultChecked
            />
          </div>

          <h3 className="settings-subtitle top-divider">AI Optimization Engine</h3>

          <div className="setting-form-group">
            <label htmlFor="ai-model-provider">LLM Agent Model Provider</label>
            <div className="custom-select-wrapper">
              <select id="ai-model-provider" value={llmEngine} onChange={(e) => setLlmEngine(e.target.value)}>
                <option value="kiro">Kiro Aetheris-LLM-v2 Cluster (Recommended)</option>
                <option value="openai">OpenAI GPT-4o Connection</option>
                <option value="anthropic">Anthropic Claude 3.5 Sonnet Connection</option>
              </select>
            </div>
            <p className="form-help-text">
              Selecting the Kiro Cluster routes multi-step agent coordination to your allocated NVIDIA H100 instances.
            </p>
          </div>

          <div className="setting-form-group">
            <label htmlFor="brand-guidelines">Brand Identity &amp; Target Persona guidelines</label>
            <textarea
              id="brand-guidelines"
              className="form-input-text"
              style={{ minHeight: "80px", resize: "vertical", fontFamily: "inherit" }}
              value={brandGuidelines}
              onChange={(e) => setBrandGuidelines(e.target.value)}
              placeholder="e.g. Tone: professional & authoritative. Audience: developers & tech founders. Focus: developer tools, serverless scaling..."
            />
            <p className="form-help-text">
              Guidelines are embedded in the agent coordination loop to maintain absolute brand consistency.
            </p>
          </div>

          <div className="setting-form-group">
            <label htmlFor="ai-creativity-slider">AI Creativity Level (Temperature)</label>
            <div className="slider-wrapper">
              <input
                type="range"
                id="ai-creativity-slider"
                min="0"
                max="100"
                value={creativity}
                onChange={(e) => setCreativity(Number(e.target.value))}
              />
              <span className="slider-value">{(creativity / 100).toFixed(1)}</span>
            </div>
            <p className="form-help-text">
              Higher values produce more creative &amp; emotional phrasing, lower values produce standardized formats.
            </p>
          </div>

          <div className="setting-form-group">
            <label htmlFor="default-timezone">Default Timezone</label>
            <div className="custom-select-wrapper">
              <select id="default-timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                <option value="local">Browser Default Timezone (IST - UTC+5:30)</option>
                <option value="utc">Coordinated Universal Time (UTC)</option>
                <option value="est">Eastern Standard Time (EST - UTC-5)</option>
                <option value="pst">Pacific Standard Time (PST - UTC-8)</option>
                <option value="gmt">Greenwich Mean Time (GMT)</option>
              </select>
            </div>
          </div>

          <div className="setting-form-group">
            <label htmlFor="api-key-mock">Kiro Integration API Token</label>
            {/* TODO(security): Transition token configs to server-side BFF environment variables for actual API authentication. */}
            <input
              type="password"
              id="api-key-mock"
              className="form-input-text"
              defaultValue="kiro_sk_live_f8a3c2d4b9e1a762c5b0"
              readOnly
            />
            <p className="form-help-text">
              Your active integration key is managed via secure, browser-isolated cookies.
            </p>
          </div>

          <div className="settings-action-row">
            <button className="btn btn-primary" onClick={handleSave}>
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformRow({ iconClass, iconText, name, handle, defaultChecked }) {
  return (
    <div className="platform-row">
      <div className="platform-info">
        <div className={`platform-icon-circle ${iconClass}`}>
          <span>{iconText}</span>
        </div>
        <div>
          <h4>{name}</h4>
          <p className="platform-handle-status">{handle}</p>
        </div>
      </div>
      <label className="toggle-switch">
        <input type="checkbox" defaultChecked={defaultChecked} />
        <span className="toggle-slider" />
      </label>
    </div>
  );
}
