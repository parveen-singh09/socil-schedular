"use client";

import { useState, useCallback, useEffect } from "react";
import { PLATFORMS, MOCK_AI_TEMPLATES, SUGGESTIONS } from "../constants";
import PostPreview from "../PostPreview";

export default function CreatorView({ onAddPost, showToast, onViewChange, prefill, clearPrefill }) {
  const [platform, setPlatform] = useState(prefill?.platform || "twitter");
  const [tone, setTone] = useState(prefill?.tone || "professional");
  const [prompt, setPrompt] = useState(prefill?.prompt || "");
  const [editorText, setEditorText] = useState(prefill?.content || "");
  const [date, setDate] = useState(prefill?.date || "2026-06-02");
  const [time, setTime] = useState(prefill?.time || "12:00");
  const [previewPlatform, setPreviewPlatform] = useState(prefill?.platform || "twitter");
  const [isGenerating, setIsGenerating] = useState(false);
  const [postId, setPostId] = useState(prefill?.id || null);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (prefill) {
      const targetPlatform = prefill.platform || "twitter";
      const targetTone = prefill.tone || "professional";
      const targetPrompt = prefill.prompt || "";
      const targetContent = prefill.content || "";
      
      setPlatform(targetPlatform);
      setPreviewPlatform(targetPlatform);
      setTone(targetTone);
      setPrompt(targetPrompt);
      setEditorText(targetContent);
      setPostId(prefill.id || null);
      
      if (prefill.date) setDate(prefill.date);
      if (prefill.time) setTime(prefill.time);
      
      if (targetPrompt && !targetContent) {
        setIsGenerating(true);
        const timer = setTimeout(() => {
          const template = MOCK_AI_TEMPLATES[targetTone]?.[targetPlatform];
          const generated = template
            ? template(targetPrompt)
            : `Here is an optimized post focusing on ${targetPrompt}. Build scalable workspaces using modern client methodologies.`;
          setEditorText(generated);
          setIsGenerating(false);
          showToast("AI Post drafted successfully.");
        }, 1200);
        
        if (clearPrefill) clearPrefill();
        return () => clearTimeout(timer);
      }
      
      if (clearPrefill) {
        clearPrefill();
      }
    } else {
      // Safe hydration: set local browser date on mount
      const d = new Date();
      const currentLocalDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      setDate(currentLocalDate);
    }
  }, [prefill, clearPrefill, showToast]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const charLimit = PLATFORMS[platform]?.limit || 280;

  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) {
      showToast("Please supply description instructions or a topic first.", "error");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const template = MOCK_AI_TEMPLATES[tone]?.[platform];
      const generated = template
        ? template(prompt)
        : `Here is an optimized post focusing on ${prompt}. Build scalable workspaces using modern client methodologies.`;
      setEditorText(generated);
      setIsGenerating(false);
      showToast("Post drafted successfully.");
    }, 1200);
  }, [prompt, tone, platform, showToast]);

  const handleSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * SUGGESTIONS.length);
    setPrompt(SUGGESTIONS[randomIndex]);
    showToast("Suggestion loaded. Click Generate below.");
  };

  const handleOptimizeHashtags = () => {
    if (!editorText.trim()) {
      showToast("Generate or write content before optimizing hashtags.", "error");
      return;
    }
    setEditorText((prev) => prev + "\n\n#buildinpublic #webdev #indiehackers #tech");
    showToast("Hashtags appended cleanly.");
  };

  const handleSave = (status) => {
    if (!editorText.trim()) {
      showToast("Please provide content to save or schedule.", "error");
      return;
    }
    if (editorText.length > charLimit) {
      showToast(`Content exceeds character limit for ${PLATFORMS[platform].name}.`, "error");
      return;
    }
    if (!date || !time) {
      showToast("Please define a target date and time.", "error");
      return;
    }
    onAddPost({
      id: postId || `post-${Date.now()}`,
      platform,
      content: editorText,
      tone,
      date,
      time,
      status,
    });
    setEditorText("");
    setPrompt("");
    setPostId(null);
    onViewChange("queue");
  };

  return (
    <section className="view-section">
      <div className="creator-layout">
        {/* Left: Inputs */}
        <div className="creator-inputs-card">
          {/* Step 1 */}
          <div className="creator-step-section">
            <h3 className="section-tag">Step 1: Choose Platform &amp; Tone</h3>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="post-platform">Platform</label>
                <div className="custom-select-wrapper">
                  <select
                    id="post-platform"
                    value={platform}
                    onChange={(e) => {
                      setPlatform(e.target.value);
                      setPreviewPlatform(e.target.value);
                    }}
                  >
                    <option value="twitter">Twitter / X</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="instagram">Instagram</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="post-tone">AI Tone Style</label>
                <div className="custom-select-wrapper">
                  <select id="post-tone" value={tone} onChange={(e) => setTone(e.target.value)}>
                    <option value="professional">💼 Professional &amp; Concise</option>
                    <option value="witty">⚡ Witty &amp; Engaging</option>
                    <option value="hype">🔥 Inspirational Hype</option>
                    <option value="informative">📖 Informative / Explainer</option>
                    <option value="casual">👋 Friendly &amp; Casual</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="creator-step-section">
            <div className="label-with-aside">
              <label htmlFor="ai-prompt">Step 2: Describe what you want to post</label>
              <button className="prompt-ideas-btn" onClick={handleSuggestion}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 10a6 6 0 0 0-12 0c0 7 3 9 3 9h6s3-2 3-9" />
                  <line x1="9" y1="22" x2="15" y2="22" />
                </svg>
                Try Suggestion
              </button>
            </div>
            <textarea
              id="ai-prompt"
              className="prompt-textarea"
              placeholder="E.g., Write a post explaining why static site generation is crucial for modern web performance..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="generation-controls">
              <button
                className="btn btn-glow btn-ai-gradient"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="dot-pulse">
                      <span />
                      <span />
                      <span />
                    </span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                    <span>Generate Optimized Post</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="creator-step-section">
            <label htmlFor="editor-text">Step 3: Edit and Refine Content</label>
            <textarea
              id="editor-text"
              className="editor-textarea"
              placeholder="Your post content will appear here... Edit as you wish."
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
            />
            <div className="editor-footer">
              <span className="char-counter">
                <strong style={editorText.length > charLimit ? { color: "var(--accent-red)", fontWeight: 700 } : {}}>
                  {editorText.length}
                </strong>{" "}
                / {charLimit} characters
              </span>
              <button className="btn btn-secondary btn-sm" onClick={handleOptimizeHashtags}>
                Optimize Hashtags
              </button>
            </div>
          </div>

          {/* Step 4 */}
          <div className="creator-step-section">
            <h3 className="section-tag">Step 4: Set Publishing Time</h3>
            <div className="scheduling-input-row">
              <div className="input-group">
                <label htmlFor="schedule-date">Date</label>
                <input type="date" id="schedule-date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="schedule-time">Time</label>
                <input type="time" id="schedule-time" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
            </div>
            <div className="action-footer">
              <button className="btn btn-secondary" onClick={() => handleSave("draft")}>
                Save as Draft
              </button>
              <button className="btn btn-primary" onClick={() => handleSave("scheduled")}>
                Schedule Post
              </button>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="creator-preview-card">
          <div className="preview-header">
            <h3>Live Post Preview</h3>
            <p className="preview-header-desc">This is exactly how your post will render on the platform.</p>
          </div>
          <div className="preview-tabs">
            {["twitter", "linkedin", "instagram"].map((p) => (
              <button
                key={p}
                className={`preview-tab${previewPlatform === p ? " active" : ""}`}
                onClick={() => setPreviewPlatform(p)}
              >
                {PLATFORMS[p].name}
              </button>
            ))}
          </div>
          <div className="preview-render-area">
            <PostPreview
              platform={previewPlatform}
              content={editorText || "Post content preview will render dynamically in this space..."}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
