"use client";

import { useState, useMemo } from "react";
import { PLATFORMS, formatDate } from "../constants";

export default function QueueView({ posts, onDelete, onPublish, onEdit }) {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("soonest");

  const filteredPosts = useMemo(() => {
    let filtered = [...posts];
    if (filter !== "all") {
      filtered = filtered.filter((p) => p.status === filter);
    }
    filtered.sort((a, b) => {
      const da = new Date(`${a.date}T${a.time}`);
      const db = new Date(`${b.date}T${b.time}`);
      return sort === "soonest" ? da - db : db - da;
    });
    return filtered;
  }, [posts, filter, sort]);

  const filters = ["all", "scheduled", "draft", "published"];

  return (
    <section className="view-section">
      <div className="queue-control-bar">
        <div className="filter-tabs">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-tab${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All posts" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="queue-sort">
          <span className="sort-label">Sort:</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="soonest">Soonest First</option>
            <option value="latest">Latest First</option>
          </select>
        </div>
      </div>

      <div className="queue-list-container">
        {filteredPosts.length === 0 ? (
          <div className="dashboard-panel-card" style={{ justifyContent: "center" }}>
            <div className="empty-state">
              <p>No {filter !== "all" ? filter : ""} posts available. Add some using the Creator tool!</p>
            </div>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className="queue-post-card">
              <div className="queue-post-left">
                <div className={`queue-platform-icon ${PLATFORMS[post.platform].colorClass}`}>
                  {PLATFORMS[post.platform].icon}
                </div>
              </div>
              <div className="queue-post-main">
                <div className="queue-post-meta">
                  <span className="queue-post-time">
                    ⏰ Scheduled: {formatDate(post.date)} at {post.time}
                  </span>
                  <span className={`mini-status-tag status-${post.status}`}>
                    {post.status}
                  </span>
                </div>
                <p className="queue-post-content">{post.content}</p>
                <div className="queue-post-actions">
                  {post.status !== "published" && (
                    <>
                      <button className="btn btn-secondary btn-sm" onClick={() => onPublish(post.id)}>
                        Publish Now
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => onEdit(post)}>
                        Edit
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ borderColor: "rgba(239, 68, 68, 0.2)", color: "var(--accent-red)" }}
                    onClick={() => onDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
