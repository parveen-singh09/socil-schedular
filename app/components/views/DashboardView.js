"use client";

import { useState } from "react";
import { PLATFORMS, formatDate } from "../constants";

export default function DashboardView({ posts, onViewChange, showToast, onNavigateCreator }) {
  const [quickPrompt, setQuickPrompt] = useState("");
  const [quickPlatform, setQuickPlatform] = useState("twitter");

  const scheduledCount = posts.filter((p) => p.status === "scheduled").length;
  const publishedCount = posts.filter((p) => p.status === "published").length;
  const upcoming = posts
    .filter((p) => p.status === "scheduled" || p.status === "draft")
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
    .slice(0, 3);

  return (
    <section className="view-section">
      {/* Stats */}
      <div className="stats-grid">
        <StatCard icon={<CalendarIcon />} label="Scheduled Posts" value={scheduledCount} gradient="purple-gradient" />
        <StatCard icon={<CheckIcon />} label="Published Posts" value={publishedCount} gradient="blue-gradient" />
        <StatCard icon={<TrendIcon />} label="Avg Engagement" value="4.8%" gradient="green-gradient" />
        <StatCard icon={<CompassIcon />} label="AI Generations" value="12" gradient="orange-gradient" />
      </div>

      {/* Split */}
      <div className="dash-split-grid">
        {/* Upcoming Queue */}
        <div className="dashboard-panel-card">
          <div className="card-header">
            <h3>Upcoming Queue</h3>
            <button className="text-link" onClick={() => onViewChange("queue")}>
              View Full Queue
            </button>
          </div>
          <div className="queue-mini-list">
            {upcoming.length === 0 ? (
              <div className="empty-state">
                <p>No upcoming posts scheduled. Click Create Post to schedule your first post!</p>
              </div>
            ) : (
              upcoming.map((post) => (
                <div key={post.id} className="queue-mini-item">
                  <div className={`mini-platform-badge ${PLATFORMS[post.platform].colorClass}`}>
                    {PLATFORMS[post.platform].icon}
                  </div>
                  <div className="mini-item-details">
                    <div className="mini-item-text">{post.content}</div>
                    <span className="mini-item-time">
                      {formatDate(post.date)} at {post.time}
                    </span>
                  </div>
                  <span className={`mini-status-tag status-${post.status}`}>
                    {post.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick AI Draft */}
        <div className="dashboard-panel-card">
          <div className="card-header">
            <h3>Quick AI Draft</h3>
          </div>
          <div className="quick-draft-box">
            <textarea
              placeholder="E.g., An educational post explaining what a Next.js App Router is..."
              id="quick-prompt"
              value={quickPrompt}
              onChange={(e) => setQuickPrompt(e.target.value)}
            />
            <div className="quick-draft-options">
              <select
                value={quickPlatform}
                onChange={(e) => setQuickPlatform(e.target.value)}
              >
                <option value="twitter">Twitter / X</option>
                <option value="linkedin">LinkedIn</option>
                <option value="instagram">Instagram</option>
              </select>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  if (!quickPrompt.trim()) {
                    showToast("Please enter a description or topic first.", "error");
                    return;
                  }
                  showToast("Navigating to AI Post Creator...");
                  if (onNavigateCreator) {
                    onNavigateCreator(quickPrompt, quickPlatform);
                  } else {
                    onViewChange("creator");
                  }
                }}
              >
                Draft with AI
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, label, value, gradient }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${gradient}`}>{icon}</div>
      <div>
        <span className="stat-label">{label}</span>
        <h3 className="stat-value">{value}</h3>
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 6l-9.5 9.5-5-5L1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
