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
  const [agentLogs, setAgentLogs] = useState([]);

  const runAgentPipeline = useCallback((targetPrompt, targetPlatform, targetTone, onComplete) => {
    setIsGenerating(true);
    setAgentLogs([]);
    
    const baseTime = new Date();
    const formatTime = (offsetMs) => {
      const d = new Date(baseTime.getTime() + offsetMs);
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      const s = String(d.getSeconds()).padStart(2, "0");
      const ms = String(d.getMilliseconds()).padStart(3, "0");
      return `${h}:${m}:${s}.${ms}`;
    };

    const logs = [
      { time: formatTime(0), agent: "Dispatcher", text: "Initializing Aetheris-LLM-v2 engine on Kiro Cloud Node-H100-3...", type: "info" },
      { time: formatTime(250), agent: "ResearchAgent", text: "Querying market signals & fetching context embeddings from Vector DB...", type: "info" },
      { time: formatTime(550), agent: "CopyAgent", text: `Drafting content canvas optimized for ${targetPlatform} (Tone: ${targetTone})...`, type: "info" },
      { time: formatTime(850), agent: "CriticAgent", text: "Verifying post structure, readability index, and semantic resonance...", type: "warning" },
      { time: formatTime(1150), agent: "System", text: "Self-correction completed. Delivering final optimized tokens to editor...", type: "success" }
    ];

    // Trigger log updates sequentially
    logs.forEach((logItem, index) => {
      setTimeout(() => {
        setAgentLogs(prev => [...prev, logItem]);
      }, index * 300);
    });

    const totalDuration = logs.length * 300;
    const timer = setTimeout(() => {
      const template = MOCK_AI_TEMPLATES[targetTone]?.[targetPlatform];
      const generated = template
        ? template(targetPrompt)
        : `Here is an optimized post focusing on ${targetPrompt}. Powered by autonomous agents on Kiro Cloud clusters.`;
      
      onComplete(generated);
      setIsGenerating(false);
      showToast("Aetheris AI Agent sequence complete.");
    }, totalDuration + 100);

    return () => clearTimeout(timer);
  }, [showToast]);

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
        const cancelPipeline = runAgentPipeline(targetPrompt, targetPlatform, targetTone, (generated) => {
          setEditorText(generated);
        });
        
        if (clearPrefill) clearPrefill();
        return cancelPipeline;
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
  }, [prefill, clearPrefill, showToast, runAgentPipeline]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const charLimit = PLATFORMS[platform]?.limit || 280;

  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) {
      showToast("Please supply description instructions or a topic first.", "error");
      return;
    }
    runAgentPipeline(prompt, platform, tone, (generated) => {
      setEditorText(generated);
    });
  }, [prompt, platform, tone, runAgentPipeline]);

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
            {isGenerating && (
              <div className="agent-terminal" style={{
                background: "#030712",
                border: "1px solid var(--border-glow)",
                borderRadius: "var(--radius-md)",
                padding: "16px",
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#34d399",
                marginTop: "16px",
                maxHeight: "220px",
                overflowY: "auto",
                lineHeight: "1.6"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "6px", marginBottom: "8px" }}>
                  <span style={{ color: "var(--text-muted)", fontWeight: "bold" }}>AETHERIS AGENT SHELL v2.0</span>
                  <span style={{ color: "var(--accent-cyan)", fontSize: "10px" }}>KIRO-GPU-CLUSTER</span>
                </div>
                {agentLogs.map((log, idx) => (
                  <div key={idx} style={{ marginBottom: "4px" }}>
                    <span style={{ color: log.type === 'success' ? '#10b981' : log.type === 'warning' ? '#f59e0b' : 'var(--text-muted)' }}>
                      {log.time} [{log.agent}]
                    </span>{" "}
                    <span style={{ color: "var(--text-main)" }}>{log.text}</span>
                  </div>
                ))}
              </div>
            )}
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
          {editorText.trim() && (
            <div className="predictive-scorecard" style={{
              marginTop: "24px",
              padding: "20px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--border-glow)",
              borderRadius: "var(--radius-md)",
              animation: "fadeIn 0.4s ease-out"
            }}>
              <h4 style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-main)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "16px", height: "16px" }}>
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                Aetheris AI Predictive Scorecard
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                <div style={{ padding: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "var(--radius-sm)" }}>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Engagement Boost</span>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--accent-green)", marginTop: "4px" }}>
                    +{Math.min(15, Math.max(3, (editorText.length % 12) + 4))}.{(editorText.length % 9)}%
                  </div>
                </div>
                <div style={{ padding: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "var(--radius-sm)" }}>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Readability Grade</span>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--accent-cyan)", marginTop: "4px" }}>
                    Level {Math.min(12, Math.max(6, (editorText.split(" ").length % 5) + 7))}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>
                  <span>Sentiment Resonance (Positive)</span>
                  <span style={{ color: "var(--text-main)", fontWeight: "600" }}>{Math.min(98, Math.max(65, 82 + (editorText.length % 10)))}%</span>
                </div>
                <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(98, Math.max(65, 82 + (editorText.length % 10)))}%`, background: "var(--primary-glow)" }} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "var(--text-muted)" }}>
                <span className="pulse-indicator" style={{ width: "6px", height: "6px", backgroundColor: "var(--accent-green)" }} />
                <span>Simulated via Kiro-Vector-Cache retrieval model</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
