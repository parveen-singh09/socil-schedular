"use client";

export default function PostPreview({ platform, content }) {
  if (platform === "twitter") return <TwitterPreview content={content} />;
  if (platform === "linkedin") return <LinkedInPreview content={content} />;
  if (platform === "instagram") return <InstagramPreview content={content} />;
  return null;
}

function TwitterPreview({ content }) {
  return (
    <div className="platform-preview preview-twitter">
      <div className="twitter-header">
        <div className="twitter-avatar">PS</div>
        <div className="twitter-userinfo">
          <div className="twitter-name-row">
            <span className="twitter-name">Parveen S.</span>
            <svg viewBox="0 0 24 24" fill="currentColor" className="twitter-badge">
              <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.48 0-.941.1-1.357.277C14.773 2.51 13.5 1.5 12 1.5c-1.5 0-2.773 1.01-3.414 2.287-.416-.177-.877-.277-1.357-.277-2.108 0-3.818 1.78-3.818 3.99 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.48 0 .941-.1 1.357-.277.64 1.277 1.914 2.287 3.414 2.287 1.5 0 2.773-1.01 3.414-2.287.416.177.877.277 1.357.277 2.108 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.8 3.9l-3.3-3.3 1.4-1.4 1.9 1.9 4.8-4.8 1.4 1.4-6.2 6.2z" />
            </svg>
          </div>
          <span className="twitter-handle">@parveen_sched</span>
        </div>
      </div>
      <div className="twitter-body">{content}</div>
      <div className="twitter-footer">
        <span>11:07 AM · Jun 2, 2026</span>
      </div>
      <div className="twitter-actions">
        <ActionItem icon={<ChatIcon />} value="0" />
        <ActionItem icon={<RepeatIcon />} value="0" />
        <ActionItem icon={<HeartIcon />} value="0" />
      </div>
    </div>
  );
}

function LinkedInPreview({ content }) {
  return (
    <div className="platform-preview preview-linkedin">
      <div className="linkedin-header">
        <div className="linkedin-avatar">PS</div>
        <div className="linkedin-userinfo">
          <span className="linkedin-name">Parveen S.</span>
          <span className="linkedin-headline">Founder @ Aetheris AI</span>
          <span className="linkedin-time">Just now · 🌎</span>
        </div>
      </div>
      <div className="linkedin-body">{content}</div>
      <div className="linkedin-footer">
        <div className="linkedin-action-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          <span>Like</span>
        </div>
        <div className="linkedin-action-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span>Comment</span>
        </div>
        <div className="linkedin-action-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="17 1 21 5 17 9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          </svg>
          <span>Repost</span>
        </div>
      </div>
    </div>
  );
}

function InstagramPreview({ content }) {
  const words = content.split(" ");
  const titleText = words.slice(0, 5).join(" ") + (words.length > 5 ? "..." : "");

  return (
    <div className="platform-preview preview-instagram">
      <div className="instagram-header">
        <div className="instagram-avatar">
          <div className="instagram-avatar-inner">PS</div>
        </div>
        <span className="instagram-name">parveen_creations</span>
      </div>
      <div className="instagram-graphic-box">
        <div className="instagram-graphic-text">{titleText}</div>
        <span className="instagram-graphic-watermark">Aetheris Engine</span>
      </div>
      <div className="instagram-actions">
        <div className="instagram-actions-left">
          <div className="instagram-action-item"><HeartIcon /></div>
          <div className="instagram-action-item"><ChatIcon /></div>
        </div>
      </div>
      <div className="instagram-likes">1 like</div>
      <div className="instagram-caption-box">
        <span className="instagram-bold-name">parveen_creations</span>
        <span className="instagram-caption-text">{content}</span>
      </div>
    </div>
  );
}

function ActionItem({ icon, value }) {
  return (
    <div className="twitter-action-item">
      {icon}
      <span>{value}</span>
    </div>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
