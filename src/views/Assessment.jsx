import React, { useState, useEffect } from "react";
import { X, ArrowRight, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import MiloCharacter from "../components/MiloCharacter";
import { startAssessment, submitAssessmentAnswer } from "../services/api";

export default function Assessment({ topicId = "current_electricity", onExit, onComplete }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(6);
  
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  
  const [miloExpression, setMiloExpression] = useState("welcome");
  const [miloMessage, setMiloMessage] = useState("Let's discover what you know! Don't stress—this helps me find your perfect starting point.");
  const [showHint, setShowHint] = useState(false);

  // Initialize assessment on mount
  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        const data = await startAssessment(topicId);
        if (mounted && data.session) {
          setSession(data.session);
          setCurrentQuestion(data.session.question);
          setCurrentNumber(data.session.currentNumber);
          setTotalQuestions(data.session.totalQuestions);
          setMiloMessage(data.session.miloMessage);
          setMiloExpression(data.session.miloExpression || "welcome");
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to start assessment:", err);
        setLoading(false);
      }
    }
    init();
    return () => {
      mounted = false;
    };
  }, [topicId]);

  // Keyboard shortcut handler (1-4 for options, Enter for Submit/Continue)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (loading || isSubmitting) return;

      if (!submissionResult) {
        // Selection phase
        if (currentQuestion?.options) {
          const keyNum = parseInt(e.key, 10);
          if (keyNum >= 1 && keyNum <= currentQuestion.options.length) {
            const opt = currentQuestion.options[keyNum - 1];
            if (opt) {
              setSelectedOptionId(opt.id);
              setMiloExpression("thinking");
            }
          }
        }
        if (e.key === "Enter" && selectedOptionId) {
          handleSubmit();
        }
      } else {
        // Feedback phase
        if (e.key === "Enter") {
          handleContinue();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedOptionId, submissionResult, currentQuestion, loading, isSubmitting]);

  const handleSubmit = async () => {
    if (!selectedOptionId || isSubmitting || submissionResult) return;
    setIsSubmitting(true);

    try {
      const data = await submitAssessmentAnswer({
        questionId: currentQuestion.id,
        selectedOptionId,
      });

      setSubmissionResult(data.result);
      setMiloExpression(data.result.miloExpression || (data.result.isCorrect ? "celebrating" : "concerned"));
      setMiloMessage(data.result.miloMessage);

      // Store next step info
      if (data.isComplete) {
        setSession((prev) => ({ ...prev, isComplete: true }));
      } else if (data.nextQuestion) {
        setSession((prev) => ({
          ...prev,
          nextQuestion: data.nextQuestion,
          nextNumber: data.currentNumber,
        }));
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    if (session?.isComplete) {
      onComplete();
      return;
    }

    if (session?.nextQuestion) {
      setCurrentQuestion(session.nextQuestion);
      setCurrentNumber(session.nextNumber || currentNumber + 1);
      setSelectedOptionId(null);
      setSubmissionResult(null);
      setShowHint(false);
      setMiloExpression("curious");
      setMiloMessage("Here’s the next question tailored to your responses:");
    } else {
      onComplete();
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <MiloCharacter expression="thinking" size={90} />
        <p style={{ fontSize: 16, fontWeight: 600, color: "var(--text-secondary)" }}>
          Milo is preparing your diagnostic assessment...
        </p>
      </div>
    );
  }

  const progressPercent = ((currentNumber - 1) / totalQuestions) * 100;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-canvas)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Compact Top Bar */}
      <header
        style={{
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          backgroundColor: "var(--bg-surface)",
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <button
          onClick={onExit}
          className="btn-ghost"
          style={{
            padding: 8,
            borderRadius: "50%",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Exit assessment"
        >
          <X size={22} />
        </button>

        {/* Assessment Progress Bar */}
        <div style={{ flex: 1, maxWidth: 600, margin: "0 auto" }}>
          <div
            style={{
              height: 10,
              backgroundColor: "var(--border-light)",
              borderRadius: "var(--radius-full)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                backgroundColor: "var(--brand-primary)",
                borderRadius: "var(--radius-full)",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
          Question {currentNumber} of {totalQuestions}
        </div>
      </header>

      {/* Main Focused Learning Screen */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: 760,
          width: "100%",
          margin: "0 auto",
          padding: "24px 20px 140px 20px", /* Clearance for bottom action sheet */
        }}
      >
        {/* Concept Badge */}
        {currentQuestion?.conceptName && (
          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--brand-primary-tint)",
                color: "var(--brand-primary)",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {currentQuestion.conceptName}
            </span>
          </div>
        )}

        {/* Milo Guidance Bubble */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
            padding: "12px 16px",
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-subtle)",
          }}
        >
          <MiloCharacter expression={miloExpression} size={54} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 500, lineHeight: 1.4 }}>
              {miloMessage}
            </div>
          </div>
          {currentQuestion?.hint && !submissionResult && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="btn-ghost"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                color: "var(--brand-primary)",
                padding: "6px 10px",
                borderRadius: "var(--radius-full)",
              }}
              title="Show a helpful clue"
            >
              <HelpCircle size={15} />
              <span>{showHint ? "Hide Hint" : "Hint"}</span>
            </button>
          )}
        </div>

        {/* Hint Box */}
        {showHint && currentQuestion?.hint && (
          <div
            style={{
              padding: "12px 16px",
              backgroundColor: "#FFFBEB",
              border: "1px solid #FDE68A",
              borderRadius: "var(--radius-md)",
              color: "#92400E",
              fontSize: 13,
              marginBottom: 20,
              lineHeight: 1.5,
            }}
          >
            <strong>💡 Clue from Milo:</strong> {currentQuestion.hint}
          </div>
        )}

        {/* Primary Question */}
        <div
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            padding: "24px 28px",
            marginBottom: 24,
            boxShadow: "var(--shadow-subtle)",
          }}
        >
          <h2
            style={{
              fontSize: 19,
              fontWeight: 600,
              lineHeight: 1.5,
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            {currentQuestion?.question}
          </h2>
        </div>

        {/* Answer Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {currentQuestion?.options.map((opt, index) => {
            const isSelected = selectedOptionId === opt.id;
            let stateClass = "";

            if (submissionResult) {
              if (opt.id === submissionResult.correctOptionId) {
                stateClass = "correct";
              } else if (isSelected && !submissionResult.isCorrect) {
                stateClass = "incorrect";
              } else {
                stateClass = "disabled";
              }
            } else if (isSelected) {
              stateClass = "selected";
            }

            return (
              <button
                key={opt.id}
                onClick={() => {
                  if (!submissionResult) {
                    setSelectedOptionId(opt.id);
                    setMiloExpression("thinking");
                  }
                }}
                disabled={!!submissionResult}
                className={`option-card ${stateClass}`}
                style={{
                  cursor: submissionResult ? "default" : "pointer",
                  opacity: submissionResult && opt.id !== submissionResult.correctOptionId && !isSelected ? 0.6 : 1,
                }}
              >
                <div className="option-badge">
                  {opt.id}
                </div>
                <div className="option-text" style={{ flex: 1 }}>
                  {opt.text}
                </div>
                <span style={{ fontSize: 11, color: "var(--text-muted)", alignSelf: "center" }}>
                  Key [{index + 1}]
                </span>
              </button>
            );
          })}
        </div>
      </main>

      {/* Bottom Sticky Action Area */}
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: submissionResult
            ? submissionResult.isCorrect
              ? "var(--success-bg)"
              : "var(--error-bg)"
            : "var(--bg-surface)",
          borderTop: "2px solid",
          borderColor: submissionResult
            ? submissionResult.isCorrect
              ? "var(--success-border)"
              : "var(--error-border)"
            : "var(--border-light)",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 40,
          transition: "all 0.2s ease",
        }}
      >
        <div
          style={{
            maxWidth: 760,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* Post-submission Feedback Content */}
          {submissionResult ? (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 700,
                  fontSize: 16,
                  color: submissionResult.isCorrect ? "var(--success-text)" : "var(--error-text)",
                  marginBottom: 4,
                }}
              >
                {submissionResult.isCorrect ? (
                  <>
                    <CheckCircle2 size={20} />
                    <span>Correct! Great reasoning.</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={20} />
                    <span>Not quite, but let's see why:</span>
                  </>
                )}
              </div>
              <div
                style={{
                  fontSize: 13,
                  lineHeight: 1.45,
                  color: submissionResult.isCorrect ? "var(--success-text)" : "var(--error-text)",
                  maxHeight: 70,
                  overflowY: "auto",
                }}
              >
                {submissionResult.feedback}
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
              {selectedOptionId ? "Press Enter or click Submit" : "Select an answer to continue"}
            </div>
          )}

          {/* Action Button */}
          {!submissionResult ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOptionId || isSubmitting}
              className="btn btn-primary"
              style={{
                minWidth: 150,
                padding: "14px 28px",
                fontSize: 15,
                borderRadius: "var(--radius-md)",
              }}
            >
              <span>{isSubmitting ? "Evaluating..." : "Check Answer"}</span>
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className={`btn ${submissionResult.isCorrect ? "btn-success" : "btn-primary"}`}
              style={{
                minWidth: 150,
                padding: "14px 28px",
                fontSize: 15,
                borderRadius: "var(--radius-md)",
              }}
            >
              <span>Continue</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
