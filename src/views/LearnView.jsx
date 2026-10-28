import React, { useState, useEffect } from "react";
import { CheckCircle2, Play, Lock, AlertTriangle, ArrowRight, Sparkles, BookOpen, Clock } from "lucide-react";
import MiloCharacter from "../components/MiloCharacter";
import LessonModal from "./LessonModal";
import { fetchLearningPath } from "../services/api";

export default function LearnView({ onStartDiagnostic, onOpenTutor }) {
  const [loading, setLoading] = useState(true);
  const [pathData, setPathData] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);

  const loadPath = async () => {
    try {
      const data = await fetchLearningPath();
      setPathData(data);
    } catch (err) {
      console.error("Failed to load learning path:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPath();
  }, []);

  const handleLessonCompleted = (lessonId) => {
    setActiveLessonId(null);
    loadPath(); // Refresh path states
  };

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: "center", padding: "80px 20px" }}>
        <MiloCharacter expression="thinking" size={80} />
        <p style={{ marginTop: 16, color: "var(--text-secondary)" }}>
          Building your personalized learning journey...
        </p>
      </div>
    );
  }

  const { pathNodes = [], nextActivity = null, completedCount = 0, totalNodes = 0 } = pathData || {};

  return (
    <div className="page-container">
      {/* Milo Next Best Action Hero Card */}
      <div
        className="card"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "24px 28px",
          marginBottom: 32,
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-light)",
        }}
      >
        <MiloCharacter expression="explaining" size={84} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--brand-primary)",
              marginBottom: 4,
            }}
          >
            Your Next Best Activity
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 6px 0" }}>
            {nextActivity ? nextActivity.title : "Diagnostic Assessment"}
          </h2>

          <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.45 }}>
            {nextActivity?.whyItMatters || "Discover which concepts you already understand and where we should start."}
          </p>
        </div>

        <div>
          {nextActivity ? (
            <button
              onClick={() => setActiveLessonId(nextActivity.id)}
              className="btn btn-primary"
              style={{
                padding: "14px 24px",
                fontSize: 15,
                whiteSpace: "nowrap",
                borderRadius: "var(--radius-md)",
              }}
            >
              <Play size={16} fill="currentColor" />
              <span>Start Activity</span>
            </button>
          ) : (
            <button
              onClick={onStartDiagnostic}
              className="btn btn-primary"
              style={{ padding: "14px 24px", fontSize: 15, whiteSpace: "nowrap" }}
            >
              <span>Take Diagnostic</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Path Header & Diagnostic Re-check Option */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
            Current Electricity • Learning Sequence
          </h3>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "2px 0 0 0" }}>
            {completedCount} of {totalNodes} activities completed
          </p>
        </div>

        <button
          onClick={onStartDiagnostic}
          className="btn btn-ghost"
          style={{ fontSize: 13, color: "var(--brand-primary)", fontWeight: 600 }}
        >
          Retake Diagnostic Test
        </button>
      </div>

      {/* Connected Vertical Learning Path */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
        {pathNodes.map((node, index) => {
          const isCompleted = node.state === "completed";
          const isRecommended = node.state === "recommended";
          const isNeedsPractice = node.state === "needs_practice";

          let borderLeftColor = "var(--border-medium)";
          let badgeText = "Ready";
          let badgeBg = "var(--bg-surface-secondary)";
          let badgeColor = "var(--text-secondary)";

          if (isCompleted) {
            borderLeftColor = "var(--success-solid)";
            badgeText = "Completed";
            badgeBg = "var(--success-bg)";
            badgeColor = "var(--success-text)";
          } else if (isRecommended) {
            borderLeftColor = "var(--brand-primary)";
            badgeText = "Recommended Next";
            badgeBg = "var(--brand-primary-tint)";
            badgeColor = "var(--brand-primary)";
          } else if (isNeedsPractice) {
            borderLeftColor = "#D97706";
            badgeText = "Needs Practice";
            badgeBg = "#FEF3C7";
            badgeColor = "#92400E";
          }

          return (
            <div
              key={node.id}
              onClick={() => setActiveLessonId(node.id)}
              className="card card-interactive"
              style={{
                borderLeft: `5px solid ${borderLeftColor}`,
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "20px 24px",
                position: "relative",
              }}
            >
              {/* Order Indicator / Checkmark */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  backgroundColor: isCompleted
                    ? "var(--success-bg)"
                    : isRecommended
                    ? "var(--brand-primary-tint)"
                    : "var(--bg-surface-secondary)",
                  color: isCompleted
                    ? "var(--success-solid)"
                    : isRecommended
                    ? "var(--brand-primary)"
                    : "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {isCompleted ? <CheckCircle2 size={24} /> : node.order}
              </div>

              {/* Node Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      backgroundColor: badgeBg,
                      color: badgeColor,
                      padding: "2px 8px",
                      borderRadius: "var(--radius-sm)",
                      textTransform: "uppercase",
                    }}
                  >
                    {badgeText}
                  </span>

                  <span style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={13} />
                    {node.duration}
                  </span>
                </div>

                <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px 0" }}>
                  {node.title}
                </h4>

                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.4 }}>
                  {node.whyItMatters}
                </p>
              </div>

              {/* Action Trigger */}
              <button
                className={`btn ${isRecommended ? "btn-primary" : "btn-secondary"}`}
                style={{
                  padding: "8px 16px",
                  fontSize: 13,
                  borderRadius: "var(--radius-md)",
                  whiteSpace: "nowrap",
                }}
              >
                <span>{isCompleted ? "Review" : "Start"}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Lesson Modal Runner */}
      {activeLessonId && (
        <LessonModal
          lessonId={activeLessonId}
          onClose={() => setActiveLessonId(null)}
          onLessonCompleted={handleLessonCompleted}
        />
      )}
    </div>
  );
}
