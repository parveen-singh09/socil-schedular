"use client";

import { useState, useMemo } from "react";
import { PLATFORMS } from "../constants";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function CalendarView({ posts, showToast, onViewChange, onNavigateCreator }) {
  const [viewDate, setViewDate] = useState(new Date(2026, 5, 1)); // June 2026

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevTotal = new Date(year, month, 0).getDate();
    const result = [];

    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevTotal - i;
      const m = month === 0 ? 11 : month - 1;
      const y = month === 0 ? year - 1 : year;
      result.push({ day: d, otherMonth: true, dateStr: `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}` });
    }

    // Current month
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const isToday = d === 2 && month === 5 && year === 2026;
      result.push({ day: d, otherMonth: false, dateStr, isToday });
    }

    // Next month padding
    const remaining = 42 - result.length;
    for (let d = 1; d <= remaining; d++) {
      const m = month === 11 ? 0 : month + 1;
      const y = month === 11 ? year + 1 : year;
      result.push({ day: d, otherMonth: true, dateStr: `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}` });
    }

    return result;
  }, [year, month]);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const goToday = () => setViewDate(new Date(2026, 5, 1));

  const handleCellClick = (dateStr) => {
    showToast(`Date chosen: ${dateStr}. Let's write a post.`);
    if (onNavigateCreator) {
      onNavigateCreator(null, null, dateStr);
    } else {
      onViewChange("creator");
    }
  };

  return (
    <section className="view-section">
      <div className="calendar-card">
        <div className="calendar-header-bar">
          <div className="calendar-nav">
            <button className="btn-icon" onClick={prevMonth}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <h2>{MONTH_NAMES[month]} {year}</h2>
            <button className="btn-icon" onClick={nextMonth}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={goToday}>Today</button>
        </div>

        <div className="calendar-weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="calendar-grid">
          {cells.map((cell, i) => {
            const dayPosts = posts.filter((p) => p.date === cell.dateStr);
            return (
              <div
                key={i}
                className={`calendar-day-cell${cell.otherMonth ? " other-month" : ""}${cell.isToday ? " current-day" : ""}`}
                onClick={() => handleCellClick(cell.dateStr)}
              >
                <span className="calendar-day-num">{cell.day}</span>
                <div className="calendar-cell-events">
                  {dayPosts.map((p) => (
                    <span
                      key={p.id}
                      className="calendar-cell-badge"
                      style={{
                        backgroundColor:
                          p.platform === "twitter" ? "#1d9bf0" :
                          p.platform === "linkedin" ? "#0077b5" : "#ec4899",
                      }}
                    >
                      [{PLATFORMS[p.platform].icon}] {p.content.slice(0, 20)}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
