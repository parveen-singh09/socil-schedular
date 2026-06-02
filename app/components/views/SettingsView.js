"use client";

import { useState } from "react";

export default function SettingsView({ settings, onSave, onViewChange }) {
  const [creativity, setCreativity] = useState(settings?.creativity ?? 70);
  const [timezone, setTimezone] = useState(settings?.timezone ?? "local");

  const handleSave = () => {
    onSave({ creativity, timezone });
    onViewChange("dashboard");
  };

  return (
    <section className="view-section">
      <div className="settings-layout">
        <div className="settings-card-body">
          <h3 className="settings-subtitle">Connected Social Platforms</h3>
          <p className="settings-desc">Link accounts to toggle publishing and previews.</p>

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
            <label htmlFor="api-key-mock">Simulated API Token</label>
            {/* TODO(security): Transition token configs to server-side BFF environment variables for actual API authentication. */}
            <input
              type="password"
              id="api-key-mock"
              className="form-input-text"
              defaultValue="••••••••••••••••••••••••••••••••"
              readOnly
            />
            <p className="form-help-text">
              Your connection key is managed via secure, browser-isolated cookies.
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
