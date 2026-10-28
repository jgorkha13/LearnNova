import React, { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, BookOpen, HelpCircle } from "lucide-react";
import LumiCharacter from "./LumiCharacter";
import { sendTutorMessage } from "../services/api";

export default function TutorModal({ isOpen, onClose, profile, activeTopic = "Current Electricity" }) {
  const [messages, setMessages] = useState([
    {
      id: "init_1",
      role: "assistant",
      content: `Hey! I'm Lumi, your AI companion. I'm tracking your progress in **${activeTopic}**.\n\nWhether you're puzzled by a formula, wondering why an answer was incorrect, or need a real-world analogy, ask me anytime!`,
      expression: "welcome",
      suggestedActions: [
        "Explain this concept simply",
        "Why does wire stretching multiply R by 4?",
        "Give me a hint for Kirchhoff's rules",
        "Test me with a quick question",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentExpression, setCurrentExpression] = useState("welcome");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend) => {
    const q = (textToSend || input).trim();
    if (!q || loading) return;

    const userMsg = {
      id: "msg_" + Date.now(),
      role: "user",
      content: q,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setCurrentExpression("thinking");

    try {
      const res = await sendTutorMessage({
        message: q,
        context: {
          activeTopic,
          grade: profile?.grade,
          subject: profile?.subject,
        },
      });

      const tutorMsg = {
        id: "msg_" + (Date.now() + 1),
        role: "assistant",
        content: res.reply || "Let's explore this together step by step!",
        expression: res.expression || "explaining",
        suggestedActions: res.suggestedActions || [],
      };

      setCurrentExpression(res.expression || "explaining");
      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err) {
      console.error("Tutor error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: "msg_err_" + Date.now(),
          role: "assistant",
          content: "Let's review the core equation: In Current Electricity, always check whether Current (series) or Voltage (parallel) is constant first!",
          expression: "encouraging",
        },
      ]);
      setCurrentExpression("encouraging");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.4)",
        backdropFilter: "blur(2px)",
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          height: "100%",
          backgroundColor: "var(--bg-surface)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "var(--shadow-modal)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tutor Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "var(--bg-surface)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LumiCharacter expression={currentExpression} size={48} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
                  Lumi Tutor
                </h3>
                <span
                  style={{
                    fontSize: 11,
                    backgroundColor: "var(--brand-primary-tint)",
                    color: "var(--brand-primary)",
                    padding: "2px 8px",
                    borderRadius: 12,
                    fontWeight: 600,
                  }}
                >
                  Socratic AI
                </span>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>
                {profile?.grade || "Class 12"} • {activeTopic}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-ghost"
            style={{
              padding: 6,
              borderRadius: "50%",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close tutor panel"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isUser ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "88%",
                    padding: "14px 16px",
                    borderRadius: "var(--radius-lg)",
                    backgroundColor: isUser ? "var(--brand-primary)" : "var(--bg-surface-secondary)",
                    color: isUser ? "#fff" : "var(--text-primary)",
                    borderBottomRightRadius: isUser ? 4 : "var(--radius-lg)",
                    borderBottomLeftRadius: isUser ? "var(--radius-lg)" : 4,
                    fontSize: 14,
                    lineHeight: 1.5,
                    whiteSpace: "pre-line",
                  }}
                >
                  {m.content}
                </div>

                {/* Suggested Prompt Action Chips */}
                {m.suggestedActions && m.suggestedActions.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginTop: 10,
                      maxWidth: "90%",
                    }}
                  >
                    {m.suggestedActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(action)}
                        style={{
                          fontSize: 12,
                          padding: "6px 10px",
                          backgroundColor: "var(--bg-surface)",
                          border: "1px solid var(--border-medium)",
                          borderRadius: "var(--radius-full)",
                          color: "var(--brand-primary)",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "var(--brand-primary-tint)";
                          e.currentTarget.style.borderColor = "var(--brand-primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "var(--bg-surface)";
                          e.currentTarget.style.borderColor = "var(--border-medium)";
                        }}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <LumiCharacter expression="thinking" size={36} />
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-surface-secondary)",
                  color: "var(--text-muted)",
                  fontSize: 13,
                  fontStyle: "italic",
                }}
              >
                Lumi is thinking...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{
            padding: "16px 20px",
            borderTop: "1px solid var(--border-light)",
            backgroundColor: "var(--bg-surface)",
            display: "flex",
            gap: 10,
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Lumi a question or request a hint..."
            disabled={loading}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-medium)",
              fontSize: 14,
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-primary)",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--brand-primary)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border-medium)")}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="btn btn-primary"
            style={{
              padding: "0 16px",
              height: 44,
              borderRadius: "var(--radius-md)",
            }}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
