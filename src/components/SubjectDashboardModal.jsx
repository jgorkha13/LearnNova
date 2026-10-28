import React, { useState, useEffect } from "react";
import { X, Check, BookOpen, Atom, FlaskConical, Binary, ChevronRight, Award } from "lucide-react";
import MiloCharacter from "./MiloCharacter";
import { fetchTopicsDashboard, switchTopic } from "../services/api";

export default function SubjectDashboardModal({ isOpen, onClose, onTopicSwitched }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadDashboard();
    }
  }, [isOpen]);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const res = await fetchTopicsDashboard();
      setData(res);
      setSelectedTopicId(res.currentTopicId);
    } catch (err) {
      console.error("Failed to load topics dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleSelectTopic = async (subName, topic) => {
    setIsSwitching(true);
    try {
      const res = await switchTopic({
        subject: subName,
        topic: topic.name,
        topicId: topic.id,
      });
      setSelectedTopicId(topic.id);
      onTopicSwitched(res.profile);
      onClose();
    } catch (err) {
      console.error("Failed to switch topic:", err);
    } finally {
      setIsSwitching(false);
    }
  };

  const getSubjectIcon = (name) => {
    switch (name) {
      case "Physics":
        return <Atom size={20} color="#4F46E5" />;
      case "Chemistry":
        return <FlaskConical size={20} color="#059669" />;
      case "Mathematics":
        return <BookOpen size={20} color="#D97706" />;
      case "Computer Science":
        return <Binary size={20} color="#2563EB" />;
      default:
        return <BookOpen size={20} color="#4F46E5" />;
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 680,
          maxHeight: "88vh",
          backgroundColor: "var(--bg-surface)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "var(--shadow-modal)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <MiloCharacter expression="curious" size={44} />
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                Subject & Chapter Dashboard
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "2px 0 0 0" }}>
                Switch topics anytime without resetting your learning progress
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-ghost" style={{ padding: 6, borderRadius: "50%" }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <MiloCharacter expression="thinking" size={64} />
              <p style={{ marginTop: 12, color: "var(--text-secondary)" }}>Loading subjects...</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {data?.subjects.map((sub, idx) => (
                <div key={idx}>
                  {/* Subject Title */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    {getSubjectIcon(sub.subject)}
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                      {sub.subject}
                    </h4>
                    <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: "auto" }}>
                      {sub.category}
                    </span>
                  </div>

                  {/* Topics List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {sub.topics.map((top) => {
                      const isCurrent = top.id === data.currentTopicId;
                      return (
                        <div
                          key={top.id}
                          onClick={() => handleSelectTopic(sub.subject, top)}
                          className={`card-interactive ${isCurrent ? "selected" : ""}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "14px 18px",
                            borderRadius: "var(--radius-md)",
                            border: `2px solid ${isCurrent ? "var(--brand-primary)" : "var(--border-light)"}`,
                            backgroundColor: isCurrent ? "var(--brand-primary-tint)" : "var(--bg-surface)",
                            cursor: "pointer",
                          }}
                        >
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <strong style={{ fontSize: 15, color: isCurrent ? "var(--brand-primary)" : "var(--text-primary)" }}>
                                {top.name}
                              </strong>
                              {isCurrent && (
                                <span
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    backgroundColor: "var(--brand-primary)",
                                    color: "#fff",
                                    padding: "2px 8px",
                                    borderRadius: "var(--radius-full)",
                                  }}
                                >
                                  Current Active
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
                              {top.masteredCount} of {top.totalConcepts} concepts mastered ({top.percent}%)
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            {/* Mastery Pill */}
                            <div
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                backgroundColor: isCurrent ? "var(--brand-primary)" : "var(--bg-surface-secondary)",
                                color: isCurrent ? "#fff" : "var(--text-muted)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {isCurrent ? <Check size={18} /> : <ChevronRight size={18} />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid var(--border-light)",
            backgroundColor: "var(--bg-canvas)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 13,
            color: "var(--text-muted)",
          }}
        >
          <span>All topic progress is preserved independently.</span>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: "8px 16px" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
