import React, { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, XCircle, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import LumiCharacter from "../components/LumiCharacter";
import { fetchAssessmentResults } from "../services/api";

export default function DiagnosticReport({ onProceedToPath, onOpenTutor }) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAssessmentResults();
        setResults(data);
      } catch (err) {
        console.error("Error loading diagnostic results:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <LumiCharacter expression="thinking" size={90} />
        <p style={{ marginTop: 16, fontSize: 16, color: "var(--text-secondary)" }}>
          Lumi is computing your concept proficiency report...
        </p>
      </div>
    );
  }

  const { overallScore = 0, totalAnswered = 0, correctCount = 0, conceptBreakdown = [], lumiGuidance = "" } = results || {};

  const mastered = conceptBreakdown.filter((c) => c.status === "mastered");
  const needsPractice = conceptBreakdown.filter((c) => c.status === "needs_practice");
  const criticalGaps = conceptBreakdown.filter((c) => c.status === "gap");

  const lumiExpression = overallScore >= 70 ? "celebrating" : overallScore >= 40 ? "encouraging" : "concerned";

  return (
    <div className="page-container" style={{ padding: "32px 20px" }}>
      {/* Top Banner Card */}
      <div
        className="card"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "28px 32px",
          marginBottom: 32,
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-light)",
        }}
      >
        <LumiCharacter expression={lumiExpression} size={96} />

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "inline-block",
              padding: "4px 10px",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "var(--brand-primary-tint)",
              color: "var(--brand-primary)",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: 8,
            }}
          >
            Diagnostic Assessment Complete
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 6px 0" }}>
            Your Concept Knowledge Map
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
            {lumiGuidance}
          </p>
        </div>

        {/* Score Ring / Pill */}
        <div
          style={{
            padding: "16px 20px",
            borderRadius: "var(--radius-lg)",
            backgroundColor: "var(--bg-canvas)",
            border: "1px solid var(--border-light)",
            textAlign: "center",
            minWidth: 120,
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 800, color: "var(--brand-primary)" }}>
            {overallScore}%
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginTop: 2 }}>
            {correctCount} of {totalAnswered} Correct
          </div>
        </div>
      </div>

      {/* 3 Structured Columns / Sections for Starting Point, Practice, and Gaps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* 1. Demonstrated Starting Point */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "var(--success-bg)",
                color: "var(--success-solid)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
                Starting Point • Demonstrated Concepts ({mastered.length})
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
                You demonstrated solid understanding here. These form the foundation of your journey.
              </p>
            </div>
          </div>

          {mastered.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
              {mastered.map((c) => (
                <div
                  key={c.id}
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "var(--success-bg)",
                    border: "1px solid var(--success-border)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--success-text)" }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--success-text)", opacity: 0.85, marginTop: 2 }}>
                    Accuracy: {c.score}% ({c.correct}/{c.attempts})
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 14, color: "var(--text-muted)", fontStyle: "italic", padding: "8px 0" }}>
              No concepts marked as mastered yet. We will build them from the ground up!
            </div>
          )}
        </div>

        {/* 2. Needs Practice */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "#FEF3C7",
                color: "#D97706",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertTriangle size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
                Developing • Needs Targeted Practice ({needsPractice.length})
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
                Partial understanding observed. A short focused lesson and 2-3 practice problems will lock this in.
              </p>
            </div>
          </div>

          {needsPractice.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
              {needsPractice.map((c) => (
                <div
                  key={c.id}
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "#FFFBEB",
                    border: "1px solid #FDE68A",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#92400E" }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#92400E", opacity: 0.85, marginTop: 2 }}>
                    Proficiency: {c.score}% • Recommended for quick review
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 14, color: "var(--text-muted)", fontStyle: "italic", padding: "8px 0" }}>
              Great consistency across intermediate topics!
            </div>
          )}
        </div>

        {/* 3. Critical Knowledge Gaps */}
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "var(--error-bg)",
                color: "var(--error-solid)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <XCircle size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
                Critical Knowledge Gaps ({criticalGaps.length})
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
                High friction detected. Lumi will break these down with analogies, simple steps, and zero judgment.
              </p>
            </div>
          </div>

          {criticalGaps.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
              {criticalGaps.map((c) => (
                <div
                  key={c.id}
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "var(--error-bg)",
                    border: "1px solid var(--error-border)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--error-text)" }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--error-text)", opacity: 0.85, marginTop: 2 }}>
                    Priority gap • Interactive lesson recommended first
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 14, color: "var(--text-muted)", fontStyle: "italic", padding: "8px 0" }}>
              Zero critical gaps detected! You are ready for advanced applications.
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA to launch Learning Path */}
      <div
        style={{
          marginTop: 36,
          padding: "24px",
          backgroundColor: "var(--brand-primary-tint)",
          border: "1px solid var(--brand-primary-border)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <div>
          <h4 style={{ fontSize: 17, fontWeight: 700, color: "var(--brand-primary-hover)", margin: "0 0 4px 0" }}>
            Ready to start your personalized learning path?
          </h4>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>
            Lumi has sequenced your activities based on your exact diagnostic results.
          </p>
        </div>

        <button
          onClick={onProceedToPath}
          className="btn btn-primary"
          style={{ padding: "14px 28px", fontSize: 16, borderRadius: "var(--radius-md)", whiteSpace: "nowrap" }}
        >
          <span>View My Learning Path</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
