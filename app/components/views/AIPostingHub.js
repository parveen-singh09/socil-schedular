"use client";

import { useState, useCallback, useEffect } from "react";
import { PLATFORMS, MOCK_AI_TEMPLATES, SUGGESTIONS, formatDate } from "../constants";
import PostPreview from "../PostPreview";

export default function AIPostingHub({ posts, onAddPost, onDelete, onPublish, showToast }) {
  const [platform, setPlatform] = useState("twitter");
  const [tone, setTone] = useState("professional");
  const [prompt, setPrompt] = useState("");
  const [editorText, setEditorText] = useState("");
  const [date, setDate] = useState("2026-06-11");
  const [time, setTime] = useState("12:00");
  const [isGenerating, setIsGenerating] = useState(false);
  const [agentLogs, setAgentLogs] = useState([]);
  const [previewPlatform, setPreviewPlatform] = useState("twitter");

  /* eslint-disable react-hooks/set-state-in-effect */
  // Hydrate date
  useEffect(() => {
    const d = new Date();
    const currentLocalDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    setDate(currentLocalDate);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const runAgentPipeline = useCallback((targetPrompt, targetPlatform, targetTone, onComplete) => {
    setIsGenerating(true);
    setAgentLogs([]);
    
    const baseTime = new Date();
    const formatTime = (offsetMs) => {
      const d = new Date(baseTime.getTime() + offsetMs);
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      const s = String(d.getSeconds()).padStart(3, "0");
      return `${h}:${m}:${s}`;
    };

    const logs = [
      { time: formatTime(0), agent: "Dispatcher", text: "Initializing Aetheris-LLM-v2 engine on Kiro Cloud Node-H100-3...", type: "info" },
      { time: formatTime(250), agent: "ResearchAgent", text: "Querying market signals & fetching context embeddings from Vector DB...", type: "info" },
      { time: formatTime(550), agent: "CopyAgent", text: `Drafting content canvas optimized for ${targetPlatform}...`, type: "info" },
      { time: formatTime(850), agent: "CriticAgent", text: "Verifying post structure, readability index, and semantic resonance...", type: "warning" },
      { time: formatTime(1150), agent: "System", text: "Self-correction completed. Delivering final optimized tokens...", type: "success" }
    ];

    logs.forEach((logItem, index) => {
      setTimeout(() => setAgentLogs(prev => [...prev, logItem]), index * 300);
    });

    setTimeout(() => {
      const template = MOCK_AI_TEMPLATES[targetTone]?.[targetPlatform];
      const generated = template ? template(targetPrompt) : `Optimized post about ${targetPrompt}.`;
      onComplete(generated);
      setIsGenerating(false);
      showToast("AI Generation Complete.");
    }, (logs.length * 300) + 100);
  }, [showToast]);

  const handleGenerate = () => {
    if (!prompt.trim()) return showToast("Enter a prompt first.", "error");
    runAgentPipeline(prompt, platform, tone, setEditorText);
  };

  const handleSave = (status) => {
    if (!editorText.trim()) return showToast("No content to save.", "error");
    onAddPost({
      id: `post-${Date.now()}`,
      platform,
      content: editorText,
      tone,
      date,
      time,
      status,
    });
    setEditorText("");
    setPrompt("");
  };

  const upcoming = posts
    .filter((p) => p.status === "scheduled" || p.status === "draft")
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

  return (
    <div className="animate-view-transition hub-layout">
      {/* Left: AI Generation & Editor */}
      <div className="hub-column-main">
        
        {/* Step 1: Input */}
        <div className="dashboard-panel-card hub-card-compact">
          <div className="card-header">
            <h3>AI Command Input</h3>
          </div>
          <div className="hub-input-grid">
            <div className="input-group">
              <label>Platform</label>
              <select className="form-select" value={platform} onChange={(e) => { setPlatform(e.target.value); setPreviewPlatform(e.target.value); }}>
                <option value="twitter">Twitter / X</option>
                <option value="linkedin">LinkedIn</option>
                <option value="instagram">Instagram</option>
              </select>
            </div>
            <div className="input-group">
              <label>Tone Style</label>
              <select className="form-select" value={tone} onChange={(e) => setTone(e.target.value)}>
                <option value="professional">Professional</option>
                <option value="witty">Witty</option>
                <option value="hype">Hype</option>
              </select>
            </div>
            <div className="input-group">
              <label>Schedule Date</label>
              <input type="date" className="form-input-text" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Time</label>
              <input type="time" className="form-input-text" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>
          
          <div style={{ position: "relative" }}>
            <textarea
              className="prompt-textarea"
              placeholder="What do you want to post about?"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{ minHeight: "100px", width: "100%" }}
            />
            <button 
              className="btn btn-primary btn-ai-gradient hub-generate-btn" 
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? "Processing..." : "Generate"}
            </button>
          </div>

          {isGenerating && (
            <div className="agent-terminal" style={{ marginTop: "16px", background: "#020617", padding: "16px", borderRadius: "12px", border: "1px solid rgba(139, 92, 246, 0.2)" }}>
              {agentLogs.map((log, i) => (
                <div key={i} style={{ fontSize: "11px", marginBottom: "4px", fontFamily: "monospace" }}>
                  <span style={{ color: "#475569" }}>{log.time}</span>{" "}
                  <span style={{ color: "var(--accent-purple)", fontWeight: "bold" }}>[{log.agent}]</span>{" "}
                  <span style={{ color: "#f1f5f9" }}>{log.text}</span>
                </div>
              ))}
              <div style={{ width: "8px", height: "14px", background: "var(--accent-purple)", display: "inline-block", animation: "pulse-ring 1s infinite" }} />
            </div>
          )}
        </div>

        {/* Step 2: Editor */}
        <div className="dashboard-panel-card hub-editor-card">
          <div className="card-header">
            <h3>Content Workshop</h3>
          </div>
          <textarea
            className="editor-textarea"
            placeholder="AI response will appear here..."
            value={editorText}
            onChange={(e) => setEditorText(e.target.value)}
            style={{ flex: 1, minHeight: "220px" }}
          />
          <div className="hub-editor-footer">
            <div className="hub-save-actions">
              <button className="btn btn-secondary" onClick={() => handleSave("draft")}>Save Draft</button>
              <button className="btn btn-primary" onClick={() => handleSave("scheduled")}>Schedule Now</button>
            </div>
            <div className="hub-preview-selectors">
              {["twitter", "linkedin", "instagram"].map(p => (
                <button key={p} className={`btn-icon ${previewPlatform === p ? "active" : ""}`} onClick={() => setPreviewPlatform(p)} style={previewPlatform === p ? { borderColor: "var(--accent-purple)", color: "var(--accent-purple)" } : {}}>
                  {p[0].toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Preview & Queue */}
      <div className="hub-column-side">
        {/* Live Preview */}
        <div className="dashboard-panel-card preview-card-hub">
          <div className="card-header">
            <h3>Live Preview</h3>
          </div>
          <PostPreview platform={previewPlatform} content={editorText || "Content preview..."} />
        </div>

        {/* Mini Queue */}
        <div className="dashboard-panel-card queue-card-hub">
          <div className="card-header">
            <h3>Active Queue</h3>
          </div>
          <div className="queue-mini-list">
            {upcoming.length === 0 ? (
              <div className="empty-state">No active posts.</div>
            ) : (
              upcoming.map((post) => (
                <div key={post.id} className="queue-mini-item" style={{ position: "relative" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "11px", color: "var(--accent-purple)", fontWeight: "bold", textTransform: "uppercase" }}>{post.platform}</div>
                    <div className="mini-item-text" style={{ fontSize: "12px", margin: "4px 0" }}>{post.content}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-dark)" }}>{formatDate(post.date)} at {post.time}</div>
                  </div>
                  <button onClick={() => onDelete(post.id)} style={{ background: "none", border: "none", color: "var(--accent-red)", cursor: "pointer", fontSize: "10px" }}>Cancel</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
