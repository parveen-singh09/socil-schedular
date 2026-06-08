"use client";

import { useState } from "react";

export default function AboutView() {
  const [activeTab, setActiveTab] = useState("pitch"); // "pitch" | "architecture" | "resources"

  return (
    <section className="view-section">
      <div className="settings-layout" style={{ maxWidth: "900px" }}>
        {/* Startup Pitch Headers */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "700", color: "var(--text-main)", margin: 0 }}>
              Kiro Startup Program Integration Hub
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px", margin: 0 }}>
              Aetheris AI Accelerator Profile, Architecture, and Cloud Resource Projections.
            </p>
          </div>
          <span className="mini-status-tag" style={{ background: "rgba(139, 92, 246, 0.15)", color: "#c084fc", border: "1px solid rgba(139, 92, 246, 0.3)" }}>
            Application Stage: Evaluator Review
          </span>
        </div>

        {/* Tab switcher */}
        <div style={{
          display: "flex",
          gap: "8px",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid var(--border-glow)",
          borderRadius: "var(--radius-md)",
          padding: "4px",
          marginBottom: "28px"
        }}>
          <button
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "var(--transition-fast)",
              fontFamily: "inherit",
              background: activeTab === "pitch" ? "rgba(255,255,255,0.08)" : "transparent",
              color: activeTab === "pitch" ? "var(--text-main)" : "var(--text-muted)"
            }}
            onClick={() => setActiveTab("pitch")}
          >
            Startup Pitch Deck
          </button>
          <button
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "var(--transition-fast)",
              fontFamily: "inherit",
              background: activeTab === "architecture" ? "rgba(255,255,255,0.08)" : "transparent",
              color: activeTab === "architecture" ? "var(--text-main)" : "var(--text-muted)"
            }}
            onClick={() => setActiveTab("architecture")}
          >
            AI Agent Architecture
          </button>
          <button
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "var(--transition-fast)",
              fontFamily: "inherit",
              background: activeTab === "resources" ? "rgba(255,255,255,0.08)" : "transparent",
              color: activeTab === "resources" ? "var(--text-main)" : "var(--text-muted)"
            }}
            onClick={() => setActiveTab("resources")}
          >
            Kiro Credit Resource Plan
          </button>
        </div>

        {/* Tab 1: Pitch Deck */}
        {activeTab === "pitch" && (
          <div className="settings-card-body animate-view-transition" style={{ gap: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="platform-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: "8px", padding: "20px", background: "rgba(255, 255, 255, 0.01)" }}>
                <span style={{ fontSize: "10px", color: "var(--accent-purple)", fontWeight: "bold", textTransform: "uppercase" }}>The Problem</span>
                <h4 style={{ margin: "4px 0 0", color: "var(--text-main)", fontSize: "15px" }}>Manual Multichannel Fragmentation</h4>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.5", margin: "4px 0 0" }}>
                  Early-stage startups spend up to 15 hours a week manually drafting, tweaking, and adapting social campaigns across disconnected networks. Existing schedulers lack intelligent audience semantic insight and brand voice consistency.
                </p>
              </div>

              <div className="platform-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: "8px", padding: "20px", background: "rgba(255, 255, 255, 0.01)" }}>
                <span style={{ fontSize: "10px", color: "var(--accent-cyan)", fontWeight: "bold", textTransform: "uppercase" }}>The Solution</span>
                <h4 style={{ margin: "4px 0 0", color: "var(--text-main)", fontSize: "15px" }}>Autonomous Agent Swarms</h4>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.5", margin: "4px 0 0" }}>
                  Aetheris AI automates content pipelines using specialized AI Agents (Research, Copywriting, and Critiques) that execute in parallel. The orchestrator simulates engagement models and formats output with platform-specific tokens.
                </p>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border-glow)", paddingTop: "20px" }}>
              <h3 className="settings-subtitle" style={{ fontSize: "15px", marginBottom: "8px" }}>Why Aetheris AI Maps to Kiro Infrastructure</h3>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6", margin: 0 }}>
                Autonomous marketing networks are compute-intensive. To support real-time research agents and keep custom LLMs (Aetheris-LLM-v2) highly responsive, we rely on Kiro's dedicated GPU cloud. Additionally, keeping historical post embeddings and target client analytics synced requires low-latency serverless background orchestrators. The Kiro Startup grant will directly bootstrap our initial scale-up phase.
              </p>
            </div>

            <div style={{ borderTop: "1px solid var(--border-glow)", paddingTop: "20px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--accent-purple)" }}>$82B</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>TAM for AI Marketing</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--accent-cyan)" }}>10x</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>Friction Reduction</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--accent-green)" }}>95%</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>Brand Consistency Index</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Agent Architecture */}
        {activeTab === "architecture" && (
          <div className="settings-card-body animate-view-transition" style={{ gap: "24px" }}>
            <div>
              <h3 className="settings-subtitle" style={{ fontSize: "16px", marginBottom: "8px" }}>Orchestrator Lifecycle Flow</h3>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.5", margin: 0 }}>
                Below is the technical workflow of our multi-agent model running on Kiro serverless microservices.
              </p>
            </div>

            {/* Visual SVG diagram */}
            <div style={{
              background: "rgba(0, 0, 0, 0.25)",
              border: "1px solid var(--border-glow)",
              borderRadius: "var(--radius-md)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px"
            }}>
              {/* HTML/CSS-based flow diagram */}
              <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between", position: "relative" }}>
                {/* Connector line background */}
                <div style={{
                  position: "absolute",
                  top: "22px",
                  left: "40px",
                  right: "40px",
                  height: "2px",
                  background: "linear-gradient(to right, var(--accent-purple) 0%, var(--accent-cyan) 50%, var(--accent-green) 100%)",
                  zIndex: 1
                }} />

                {/* Node 1 */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "70px", zIndex: 2 }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "var(--primary-glow)",
                    display: "flex",
                    alignItems: "center",
                    justify: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    color: "white",
                    boxShadow: "0 0 10px rgba(139, 92, 246, 0.4)",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    USER
                  </div>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "6px", textAlign: "center" }}>Input Topic</span>
                </div>

                {/* Node 2 */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "90px", zIndex: 2 }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "#1e1b4b",
                    border: "2px solid var(--accent-purple)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-purple)",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    RAG
                  </div>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "6px", textAlign: "center" }}>Vector Context</span>
                </div>

                {/* Node 3 */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "90px", zIndex: 2 }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "#083344",
                    border: "2px solid var(--accent-cyan)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-cyan)",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    LLM
                  </div>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "6px", textAlign: "center" }}>Generator Agent</span>
                </div>

                {/* Node 4 */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "90px", zIndex: 2 }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "#064e3b",
                    border: "2px solid var(--accent-green)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-green)",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    CRITIC
                  </div>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "6px", textAlign: "center" }}>Refinement Loop</span>
                </div>

                {/* Node 5 */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "70px", zIndex: 2 }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "var(--secondary-glow)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    boxShadow: "0 0 10px rgba(6, 182, 212, 0.4)",
                    fontWeight: "bold",
                    fontSize: "12px"
                  }}>
                    API
                  </div>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "6px", textAlign: "center" }}>Dispatch Queue</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border-glow)", paddingTop: "20px" }}>
              <h4 style={{ color: "var(--text-main)", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Key Engineering Highlights:</h4>
              <ul style={{ paddingLeft: "20px", fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.6" }}>
                <li>
                  <strong style={{ color: "var(--text-main)" }}>Adaptive Context Injection (RAG):</strong> Uses cosine-similarity search against target campaign objectives cached in key-value stores.
                </li>
                <li>
                  <strong style={{ color: "var(--text-main)" }}>Multi-Turn Agent Dialogues:</strong> Separate execution threads for generation and critique prevents model collapse and keeps character counts restricted.
                </li>
                <li>
                  <strong style={{ color: "var(--text-main)" }}>Secure Client Sandbox isolation:</strong> Connection credentials and system inputs are isolated on the user client to align with browser-isolated privacy paradigms.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Kiro Credit Budget */}
        {activeTab === "resources" && (
          <div className="settings-card-body animate-view-transition" style={{ gap: "24px" }}>
            <div>
              <h3 className="settings-subtitle" style={{ fontSize: "16px", marginBottom: "8px" }}>
                Kiro Cloud Grant Budget Allocation
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.5", margin: 0 }}>
                Below is our projected infrastructure utilization plan for the $5,000 credit grant to bootstrap production scalability.
              </p>
            </div>

            {/* Budget Table */}
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "12px",
              color: "var(--text-main)",
              textAlign: "left"
            }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-glow)" }}>
                  <th style={{ padding: "12px 8px", color: "var(--text-muted)" }}>Infrastructure Resource</th>
                  <th style={{ padding: "12px 8px", color: "var(--text-muted)" }}>Purpose</th>
                  <th style={{ padding: "12px 8px", color: "var(--text-muted)" }}>Monthly Cost</th>
                  <th style={{ padding: "12px 8px", color: "var(--text-muted)" }}>Credit Allocation (Annual)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border-glow)" }}>
                  <td style={{ padding: "12px 8px", fontWeight: "600" }}>2x NVIDIA H100 GPU Instances</td>
                  <td style={{ padding: "12px 8px", color: "var(--text-muted)" }}>Running Aetheris-LLM-v2 fine-tuning and inference pipelines</td>
                  <td style={{ padding: "12px 8px" }}>$150 / mo</td>
                  <td style={{ padding: "12px 8px", fontWeight: "600", color: "var(--accent-purple)" }}>$1,800.00</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-glow)" }}>
                  <td style={{ padding: "12px 8px", fontWeight: "600" }}>Kiro Vector Search Node</td>
                  <td style={{ padding: "12px 8px", color: "var(--text-muted)" }}>Indexing trend context and semantic embeddings (Pinecone/Milvus)</td>
                  <td style={{ padding: "12px 8px" }}>$60 / mo</td>
                  <td style={{ padding: "12px 8px", fontWeight: "600", color: "var(--accent-purple)" }}>$720.00</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-glow)" }}>
                  <td style={{ padding: "12px 8px", fontWeight: "600" }}>Kiro Serverless Microservices</td>
                  <td style={{ padding: "12px 8px", color: "var(--text-muted)" }}>API endpoint hosting, queue systems, and background agent cron loops</td>
                  <td style={{ padding: "12px 8px" }}>$80 / mo</td>
                  <td style={{ padding: "12px 8px", fontWeight: "600", color: "var(--accent-purple)" }}>$960.00</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-glow)" }}>
                  <td style={{ padding: "12px 8px", fontWeight: "600" }}>Redis Cache &amp; Messaging Nodes</td>
                  <td style={{ padding: "12px 8px", color: "var(--text-muted)" }}>Synchronizing agent state changes and handling request queues</td>
                  <td style={{ padding: "12px 8px" }}>$50 / mo</td>
                  <td style={{ padding: "12px 8px", fontWeight: "600", color: "var(--accent-purple)" }}>$600.00</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-glow)" }}>
                  <td style={{ padding: "12px 8px", fontWeight: "600" }}>Staging Sandbox Clusters</td>
                  <td style={{ padding: "12px 8px", color: "var(--text-muted)" }}>Isolated environments for testing automated pipeline deployments</td>
                  <td style={{ padding: "12px 8px" }}>$45 / mo</td>
                  <td style={{ padding: "12px 8px", fontWeight: "600", color: "var(--accent-purple)" }}>$540.00</td>
                </tr>
                <tr style={{ fontWeight: "750" }}>
                  <td style={{ padding: "16px 8px 12px" }}>Total Projected Cloud Budget</td>
                  <td style={{ padding: "16px 8px 12px" }}></td>
                  <td style={{ padding: "16px 8px 12px" }}>$385 / mo</td>
                  <td style={{ padding: "16px 8px 12px", color: "var(--accent-green)", fontSize: "14px" }}>$4,620.00</td>
                </tr>
              </tbody>
            </table>
            <div style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--border-glow)",
              borderRadius: "var(--radius-md)",
              padding: "16px",
              fontSize: "11px",
              color: "var(--text-muted)",
              lineHeight: "1.4"
            }}>
              <strong>Evaluator Note:</strong> The remaining balance of $380.00 will be held as buffer credits to cover peak inference request bursts and automated campaign expansion spikes.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
