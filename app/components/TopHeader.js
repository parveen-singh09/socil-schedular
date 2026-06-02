"use client";

import { useState, useEffect } from "react";

export default function TopHeader({ title, subtitle, onCreateClick }) {
  const [timeText, setTimeText] = useState("");

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      setTimeText(
        now.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="top-header">
      <div>
        <h1>{title}</h1>
        <p className="header-desc">{subtitle}</p>
      </div>
      <div className="header-right">
        <div className="system-time">
          <span className="pulse-indicator" />
          <span className="time-text">{timeText}</span>
        </div>
        <button className="btn btn-primary" onClick={onCreateClick}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Create Post</span>
        </button>
      </div>
    </header>
  );
}
