import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, CheckCircle2, AlertCircle, RefreshCw, ArrowRight, BookOpen } from "lucide-react";
import MiloCharacter from "../components/MiloCharacter";
import { fetchPractice, submitPractice } from "../services/api";

export default function PracticeView({ onOpenTutor, onStartDiagnostic }) {
  const [loading, setLoading] = useState(true);
  const [weakConcepts, setWeakConcepts] = useState([]);
  const [practiceQuestions, setPracticeQuestions] = useState([]);
  const [spacedRevision, setSpacedRevision] = useState([]);

  // Active question runner
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Milo state
  const [miloExpression, setMiloExpression] = useState("curious");
  const [miloMessage, setMiloMessage] = useState("Targeted practice turns shaky concepts into exam confidence!");

  const loadData = async () => {
    try {
      const data = await fetchPractice();
      setWeakConcepts(data.weakConcepts || []);
      setPracticeQuestions(data.practiceQuestions || []);
      setSpacedRevision(data.spacedRevision || []);
    } catch (err) {
      console.error("Practice load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const currentQ = practiceQuestions[currentIndex];

  const handleSubmit = async () => {
    if (!selectedOptionId || isSubmitting || !currentQ) return;
    setIsSubmitting(true);

    try {
      const res = await submitPractice({
        questionId: currentQ.id,
        selectedOptionId,
      });

      setSubmissionResult(res);
      setMiloExpression(res.miloExpression || (res.isCorrect ? "celebrating" : "encouraging"));
      setMiloMessage(res.miloMessage || "Keep up the consistent practice!");
    } catch (err) {
      console.error("Practice submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < practiceQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setSubmissionResult(null);
      setMiloExpression("curious");
      setMiloMessage("Here’s another question targeting core application principles:");
    } else {
      // Loop or refresh
      setCurrentIndex(0);
      setSelectedOptionId(null);
      setSubmissionResult(null);
      setMiloExpression("celebrating");
      setMiloMessage("You completed this practice set! Feel free to review or try again.");
    }
  };

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: "center", padding: "80px 20px" }}>
        <MiloCharacter expression="thinking" size={80} />
        <p style={{ marginTop: 16, color: "var(--text-secondary)" }}>
          Loading your personalized practice queue...
        </p>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Top Milo Guidance Card */}
      <div
        className="card"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "20px 24px",
          marginBottom: 28,
        }}
      >
        <MiloCharacter expression={miloExpression} size={72} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-primary)", textTransform: "uppercase" }}>
            Targeted Revision & Weakness Repair
          </div>
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", margin: "4px 0 0 0" }}>
            {miloMessage}
          </p>
        </div>
      </div>

      {/* Identified Weak Concepts Pills */}
      {weakConcepts.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 8 }}>
            CONCEPTS FLAGGED FROM DIAGNOSTIC:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {weakConcepts.map((c) => (
              <span
                key={c.id}
                style={{
                  padding: "6px 12px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "#FEF3C7",
                  border: "1px solid #FDE68A",
                  color: "#92400E",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                ⚠️ {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Active Practice Question Runner */}
      {currentQ ? (
        <div
          className="card"
          style={{
            padding: "28px 32px",
            marginBottom: 32,
            border: "1px solid var(--border-light)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--brand-primary)",
                backgroundColor: "var(--brand-primary-tint)",
                padding: "4px 10px",
                borderRadius: "var(--radius-sm)",
                textTransform: "uppercase",
              }}
            >
              {currentQ.conceptName || "Current Electricity"}
            </span>

            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
              Question {currentIndex + 1} of {practiceQuestions.length}
            </span>
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.5, margin: "0 0 20px 0" }}>
            {currentQ.question}
          </h3>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let optClass = "";
              if (submissionResult) {
                if (opt.id === submissionResult.correctOptionId) optClass = "correct";
                else if (isSelected && !submissionResult.isCorrect) optClass = "incorrect";
                else optClass = "disabled";
              } else if (isSelected) {
                optClass = "selected";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => !submissionResult && setSelectedOptionId(opt.id)}
                  disabled={!!submissionResult}
                  className={`option-card ${optClass}`}
                  style={{ padding: "14px 18px" }}
                >
                  <div className="option-badge">{opt.id}</div>
                  <div className="option-text" style={{ flex: 1 }}>{opt.text}</div>
                </button>
              );
            })}
          </div>

          {/* Feedback & Actions */}
          {submissionResult ? (
            <div>
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: submissionResult.isCorrect ? "var(--success-bg)" : "var(--error-bg)",
                  border: "1px solid",
                  borderColor: submissionResult.isCorrect ? "var(--success-border)" : "var(--error-border)",
                  color: submissionResult.isCorrect ? "var(--success-text)" : "var(--error-text)",
                  marginBottom: 16,
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  {submissionResult.isCorrect ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>{submissionResult.isCorrect ? "Correct!" : "Reasoning breakdown:"}</span>
                </div>
                <div>{submissionResult.feedback || submissionResult.explanation}</div>
              </div>

              <button
                onClick={handleNextQuestion}
                className="btn btn-primary"
                style={{ padding: "12px 28px", fontSize: 15 }}
              >
                <span>Next Question</span>
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!selectedOptionId || isSubmitting}
              className="btn btn-primary"
              style={{ padding: "12px 28px", fontSize: 15 }}
            >
              <span>{isSubmitting ? "Checking..." : "Submit Answer"}</span>
            </button>
          )}
        </div>
      ) : (
        <div className="card" style={{ textAlign: "center", padding: "40px 20px" }}>
          <p style={{ fontSize: 15, color: "var(--text-muted)" }}>
            No practice questions available. Complete a diagnostic assessment first!
          </p>
          <button onClick={onStartDiagnostic} className="btn btn-primary" style={{ marginTop: 12 }}>
            Start Diagnostic Assessment
          </button>
        </div>
      )}

      {/* Spaced Revision System Queue */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <Calendar size={20} color="var(--brand-primary)" />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
            Transparent Spaced Revision Schedule
          </h3>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 16px 0", lineHeight: 1.5 }}>
          Based on the Ebbinghaus forgetting curve, concepts you've learned are scheduled for quick 2-minute refreshers so they transfer into long-term memory.
        </p>

        {spacedRevision.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {spacedRevision.map((rev, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  backgroundColor: "var(--bg-canvas)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <div>
                  <strong style={{ fontSize: 14, color: "var(--text-primary)" }}>
                    {rev.conceptId.replace(/_/g, " ").toUpperCase()}
                  </strong>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    Scheduled review in {rev.intervalDays} days
                  </div>
                </div>

                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--brand-primary)",
                    backgroundColor: "var(--brand-primary-tint)",
                    padding: "4px 10px",
                    borderRadius: "var(--radius-full)",
                  }}
                >
                  On Track
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: 13, color: "var(--text-muted)", fontStyle: "italic" }}>
            Complete lessons in the Learn tab to automatically schedule your spaced memory refreshers!
          </div>
        )}
      </div>
    </div>
  );
}
