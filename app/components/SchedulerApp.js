"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import AuthPage from "./AuthPage";
import AIPostingHub from "./views/AIPostingHub";
import ToastContainer from "./ToastContainer";

const SEED_POSTS = [
  {
    id: "seed-1",
    platform: "twitter",
    content: "Launching Aetheris AI v2.4 on Kiro Cloud! 🚀 #AI #Kiro",
    tone: "hype",
    date: "2026-06-11",
    time: "10:00",
    status: "scheduled",
  }
];

export default function SchedulerApp() {
  const { user, loading, signout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [toasts, setToasts] = useState([]);

  // User-specific localStorage key
  const postsKey = user ? `postai_posts_${user.id}` : null;

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!user) return;
    const storedPosts = localStorage.getItem(postsKey);
    if (storedPosts) {
      try { setPosts(JSON.parse(storedPosts)); } catch { setPosts(SEED_POSTS); }
    } else { setPosts(SEED_POSTS); }
  }, [user, postsKey]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (postsKey && posts.length > 0) {
      localStorage.setItem(postsKey, JSON.stringify(posts));
    }
  }, [posts, postsKey]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addPost = useCallback((post) => {
    setPosts((prev) => [...prev, post]);
    showToast("Post scheduled/drafted successfully.");
  }, [showToast]);

  const deletePost = useCallback((postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    showToast("Post removed.");
  }, [showToast]);

  if (loading) {
    return (
      <div className="auth-loading-screen">
        <div className="auth-loading-content">
          <div className="auth-loading-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <span className="auth-loading-text">Synchronizing Neural Hub...</span>
        </div>
      </div>
    );
  }

  if (!user) return <AuthPage />;

  return (
    <div className="app-container">
      {/* Animated background orbs */}
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />
      
      <main className="main-content" style={{ marginLeft: 0, padding: "32px 48px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "var(--text-main)", letterSpacing: "-1px" }}>AETHERIS COMMAND</h1>
            <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>Multi-Agent AI Posting Hub</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
             <div className="system-time">
                <div className="pulse-indicator" />
                <span className="time-text">HUB ACTIVE</span>
             </div>
             <button className="btn btn-secondary btn-sm" onClick={signout}>Sign Out</button>
          </div>
        </header>

        <AIPostingHub 
          posts={posts} 
          onAddPost={addPost} 
          onDelete={deletePost}
          showToast={showToast}
        />
      </main>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
