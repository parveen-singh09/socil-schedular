"use client";

export default function AnalyticsView() {
  return (
    <section className="view-section">
      {/* Metric Cards */}
      <div className="analytics-stats-grid">
        <MetricCard title="Aggregate Impressions" value="142.8K" badge="+12.4%" badgeType="green" desc="Across all linked social accounts" />
        <MetricCard title="Engagements" value="6,854" badge="+8.2%" badgeType="green" desc="Likes, comments, shares, and retweets" />
        <MetricCard title="Link Clicks" value="2,109" badge="-1.5%" badgeType="red" desc="Traffic driven back to your web channels" />
      </div>

      {/* Charts */}
      <div className="analytics-charts-grid">
        {/* Impression Chart */}
        <div className="analytics-chart-card">
          <div className="chart-header-row">
            <h3>Impression Trajectory (Last 7 Days)</h3>
            <div className="chart-legend">
              <span className="legend-color purple-legend" />
              <span>Impressions</span>
            </div>
          </div>
          <div className="svg-chart-container">
            <svg viewBox="0 0 400 200" width="100%" height="100%">
              <defs>
                <linearGradient id="gradient-glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="40" y1="20" x2="380" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="40" y1="60" x2="380" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="40" y1="100" x2="380" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="40" y1="140" x2="380" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="40" y1="170" x2="380" y2="170" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <path className="chart-line" d="M 40 150 Q 90 90 140 120 T 240 60 T 340 40 L 380 50" fill="none" stroke="#8b5cf6" strokeWidth="3" />
              <path className="chart-fill" d="M 40 150 Q 90 90 140 120 T 240 60 T 340 40 L 380 50 L 380 170 L 40 170 Z" fill="url(#gradient-glow)" />
              <circle className="chart-point" cx="90" cy="115" r="4" fill="#ec4899" />
              <circle className="chart-point" cx="190" cy="95" r="4" fill="#ec4899" />
              <circle className="chart-point" cx="290" cy="48" r="4" fill="#ec4899" />
              <text x="40" y="186" fill="#6b7280" fontSize="10">May 27</text>
              <text x="150" y="186" fill="#6b7280" fontSize="10">May 30</text>
              <text x="260" y="186" fill="#6b7280" fontSize="10">Jun 01</text>
              <text x="350" y="186" fill="#6b7280" fontSize="10">Jun 02</text>
              <text x="15" y="24" fill="#6b7280" fontSize="9">30K</text>
              <text x="15" y="104" fill="#6b7280" fontSize="9">15K</text>
              <text x="15" y="174" fill="#6b7280" fontSize="9">0</text>
            </svg>
          </div>
        </div>

        {/* Platform Engagement Chart */}
        <div className="analytics-chart-card">
          <div className="chart-header-row">
            <h3>Engagement Rate By Platform</h3>
            <div className="chart-legend">
              <span className="legend-color cyan-legend" />
              <span>Avg Engagement %</span>
            </div>
          </div>
          <div className="svg-chart-container">
            <svg viewBox="0 0 400 200" width="100%" height="100%">
              <line x1="40" y1="170" x2="380" y2="170" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <line x1="40" y1="100" x2="380" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="40" y1="30" x2="380" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <rect className="chart-bar chart-bar-1" x="80" y="70" width="40" height="100" rx="4" fill="#1d9bf0" opacity="0.85" />
              <text x="85" y="60" fill="#f3f4f6" fontSize="11" fontWeight="600">4.2%</text>
              <text x="82" y="186" fill="#9ca3af" fontSize="10">Twitter / X</text>
              <rect className="chart-bar chart-bar-2" x="180" y="40" width="40" height="130" rx="4" fill="#0077b5" opacity="0.85" />
              <text x="185" y="30" fill="#f3f4f6" fontSize="11" fontWeight="600">6.1%</text>
              <text x="180" y="186" fill="#9ca3af" fontSize="10">LinkedIn</text>
              <rect className="chart-bar chart-bar-3" x="280" y="85" width="40" height="85" rx="4" fill="#ec4899" opacity="0.85" />
              <text x="285" y="75" fill="#f3f4f6" fontSize="11" fontWeight="600">3.8%</text>
              <text x="277" y="186" fill="#9ca3af" fontSize="10">Instagram</text>
              <text x="15" y="34" fill="#6b7280" fontSize="9">8.0%</text>
              <text x="15" y="104" fill="#6b7280" fontSize="9">4.0%</text>
              <text x="15" y="174" fill="#6b7280" fontSize="9">0.0%</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ title, value, badge, badgeType, desc }) {
  return (
    <div className="analytics-metric-card">
      <span className="metric-title">{title}</span>
      <div className="metric-value-row">
        <span className="metric-val">{value}</span>
        <span className={`metric-badge ${badgeType === "green" ? "green-badge" : "red-badge"}`}>
          {badge}
        </span>
      </div>
      <p className="metric-desc">{desc}</p>
    </div>
  );
}
