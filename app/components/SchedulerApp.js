"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import AuthPage from "./AuthPage";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import DashboardView from "./views/DashboardView";
import CreatorView from "./views/CreatorView";
import QueueView from "./views/QueueView";
import CalendarView from "./views/CalendarView";
import AnalyticsView from "./views/AnalyticsView";
import SettingsView from "./views/SettingsView";
import AboutView from "./views/AboutView";
import PrivacyView from "./views/PrivacyView";
import ContactView from "./views/ContactView";
import ToastContainer from "./ToastContainer";

const SEED_POSTS = [
  {
    id: "seed-1",
    platform: "twitter",
    content:
      "Why static site generation (SSG) is crucial for search engine optimization and speed: By building static HTML files during compilations, crawlers index optimized pages instantly without waiting for client-side JavaScript execution. Speed wins search positions! 🚀",
    tone: "hype",
    date: "2026-06-05",
    time: "10:00",
    status: "scheduled",
  },
  {
    id: "seed-2",
    platform: "linkedin",
    content:
      "Reflections on launching our new developer productivity tools live this week:\n\nOur focus was simple: cut down on developer friction. By building clean vanilla web components and keeping standard utilities lightweight, startup times decreased by 40%.\n\nFocusing on minimal packages is a highly underrated architecture decision.",
    tone: "professional",
    date: "2026-06-12",
    time: "14:30",
    status: "draft",
  },
  {
    id: "seed-3",
    platform: "instagram",
    content:
      "Why secure database architectures rely on Backend-for-Frontend patterns. Keeping sensitive configurations and private keys strictly off client browsers ensures high session integrity. Let's make safety a default design token!",
    tone: "hype",
    date: "2026-06-01",
    time: "09:15",
    status: "published",
  },
  {
    id: "seed-4",
    platform: "linkedin",
    content:
      "5 design tokens you should include in every vanilla CSS configuration:\n\n1. Harmonious typography sets (Outfit/Inter)\n2. Backdrop blurring properties (Glassmorphism)\n3. Coherent padding hierarchies\n4. Dynamic transition values\n5. Custom focus indicators\n\nSimplifying styling with clean standard CSS provides outstanding user experiences.",
    tone: "informative",
    date: "2026-06-19",
    time: "16:00",
    status: "scheduled",
  },
];

const VIEW_TITLES = {
  dashboard: {
    title: "Dashboard Overview",
    subtitle: "Welcome back, here is your posting queue status.",
  },
  creator: {
    title: "AI Post Creator",
    subtitle:
      "Generate, edit, and optimize post templates for custom distributions.",
  },
  queue: {
    title: "Scheduled Queue",
    subtitle: "Inspect, manage, and edit posts pending distribution.",
  },
  calendar: {
    title: "Calendar Grid",
    subtitle:
      "Visual overview of publication distributions across calendars.",
  },
  analytics: {
    title: "Performance Analytics",
    subtitle:
      "Simulated audience interaction and engagement parameters.",
  },
  settings: {
    title: "Scheduler Settings",
    subtitle: "Configure profiles, custom API keys, and model metrics.",
  },
  about: {
    title: "About PostAI",
    subtitle: "Learn about the mission, AI engine, and technical primitives behind PostAI.",
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "Review how we isolate your social campaigns and protect credentials.",
  },
  contact: {
    title: "Contact Support",
    subtitle: "Submit support requests directly to Parveen Singh.",
  },
};

export default function SchedulerApp() {
  const { user, loading, signout } = useAuth();
  const [activeView, setActiveView] = useState("dashboard");
  const [posts, setPosts] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [settings, setSettings] = useState({
    timezone: "local",
    creativity: 70,
  });
  const [creatorPrefill, setCreatorPrefill] = useState(null);

  // User-specific localStorage keys
  const postsKey = user ? `postai_posts_${user.id}` : null;
  const settingsKey = user ? `postai_settings_${user.id}` : null;

  /* eslint-disable react-hooks/set-state-in-effect */
  // Load from localStorage on mount or when user changes
  useEffect(() => {
    if (!user) return;

    const storedPosts = localStorage.getItem(postsKey);
    if (storedPosts) {
      try {
        setPosts(JSON.parse(storedPosts));
      } catch {
        setPosts(SEED_POSTS);
      }
    } else {
      // First time for this user — load seed posts
      setPosts(SEED_POSTS);
    }

    const storedSettings = localStorage.getItem(settingsKey);
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
      } catch {
        // Keep defaults
      }
    }
  }, [user, postsKey, settingsKey]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Persist posts to localStorage
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

  const addPost = useCallback(
    (post) => {
      setPosts((prev) => {
        const index = prev.findIndex((p) => p.id === post.id);
        if (index > -1) {
          const next = [...prev];
          next[index] = post;
          return next;
        }
        return [...prev, post];
      });
      showToast(
        post.status === "scheduled"
          ? `Post scheduled for ${formatDate(post.date)}`
          : "Post saved as draft"
      );
    },
    [showToast]
  );

  const deletePost = useCallback(
    (postId) => {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      showToast("Post deleted successfully.");
    },
    [showToast]
  );

  const publishPost = useCallback(
    (postId) => {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, status: "published" } : p
        )
      );
      showToast("Post has been published immediately!");
    },
    [showToast]
  );

  const removePost = useCallback((postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }, []);

  const saveSettings = useCallback(
    (newSettings) => {
      setSettings(newSettings);
      if (settingsKey) {
        localStorage.setItem(settingsKey, JSON.stringify(newSettings));
      }
      showToast("Settings saved successfully.");
    },
    [showToast, settingsKey]
  );

  // Show loading screen while checking auth
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
          <span className="auth-loading-text">Loading PostAI...</span>
        </div>
      </div>
    );
  }

  // Show auth page if not logged in
  if (!user) {
    return <AuthPage />;
  }

  const headerInfo = VIEW_TITLES[activeView] || VIEW_TITLES.dashboard;

  return (
    <div className="app-container">
      {/* Animated background orbs */}
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />
      <Sidebar
        activeView={activeView}
        onViewChange={(view) => {
          if (view === "creator") {
            setCreatorPrefill(null);
          }
          setActiveView(view);
        }}
        user={user}
        onSignOut={signout}
      />
      <main className="main-content">
        <TopHeader
          title={headerInfo.title}
          subtitle={headerInfo.subtitle}
          onCreateClick={() => {
            setCreatorPrefill(null);
            setActiveView("creator");
          }}
        />
        <div key={activeView} className="view-panel animate-view-transition">
          {activeView === "dashboard" && (
            <DashboardView
              posts={posts}
              onViewChange={setActiveView}
              showToast={showToast}
              onNavigateCreator={(prompt, platform, date) => {
                setCreatorPrefill({ prompt, platform, date });
                setActiveView("creator");
              }}
            />
          )}
          {activeView === "creator" && (
            <CreatorView
              onAddPost={addPost}
              showToast={showToast}
              onViewChange={setActiveView}
              prefill={creatorPrefill}
              clearPrefill={() => setCreatorPrefill(null)}
            />
          )}
          {activeView === "queue" && (
            <QueueView
              posts={posts}
              onDelete={deletePost}
              onPublish={publishPost}
              onEdit={(post) => {
                setCreatorPrefill({
                  id: post.id,
                  platform: post.platform,
                  tone: post.tone,
                  content: post.content,
                  date: post.date,
                  time: post.time,
                  prompt: "",
                });
                setActiveView("creator");
              }}
            />
          )}
          {activeView === "calendar" && (
            <CalendarView
              posts={posts}
              showToast={showToast}
              onViewChange={setActiveView}
              onNavigateCreator={(prompt, platform, date) => {
                setCreatorPrefill({ prompt, platform, date });
                setActiveView("creator");
              }}
            />
          )}
          {activeView === "analytics" && <AnalyticsView />}
          {activeView === "settings" && (
            <SettingsView
              settings={settings}
              onSave={saveSettings}
              onViewChange={setActiveView}
            />
          )}
          {activeView === "about" && <AboutView />}
          {activeView === "privacy" && <PrivacyView />}
          {activeView === "contact" && <ContactView showToast={showToast} />}
        </div>
      </main>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
