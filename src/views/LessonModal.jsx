import React, { useState, useEffect } from "react";
import { X, HelpCircle, Sparkles, Calculator, ArrowRight } from "lucide-react";
import LumiCharacter from "../components/LumiCharacter";
import Formula from "../components/Formula";
import { fetchLesson, sendLessonAction, completeActivity, fetchTopicQuiz, submitTopicQuiz } from "../services/api";

export default function LessonModal({ lessonId, onClose, onLessonCompleted }) {
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState(null);

  // Dynamic Tutor Extensions State
  const [dynamicCards, setDynamicCards] = useState([]);
  const [activeHint, setActiveHint] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [topicQuiz, setTopicQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  // Lumi state
  const [lumiExpression, setLumiExpression] = useState("explaining");
  const [lumiMessage, setLumiMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchLesson(lessonId);
        if (data.lesson) {
          setLesson(data.lesson);
          setLumiMessage(data.lesson.lumiIntro || "Let's explore this concept step-by-step!");
          setLumiExpression("explaining");
        }
      } catch (err) {
        console.error("Error loading lesson:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [lessonId]);

  // Handle Dynamic Tutor Actions
  const handleAction = async (actionType) => {
    try {
      const res = await sendLessonAction({ lessonId, actionType });
      if (res.lumiExpression) setLumiExpression(res.lumiExpression);
      if (res.lumiMessage) setLumiMessage(res.lumiMessage);

      if (actionType === "simplify" && res.data) {
        setDynamicCards((prev) => [
          ...prev.filter((c) => c.id !== "dynamic_simplify"),
          {
            id: "dynamic_simplify",
            type: "analogy",
            heading: res.data.analogyTitle || "Intuitive Real-World Analogy",
            content: [res.data.analogyContent],
          },
        ]);
      } else if (actionType === "another_example" && res.data) {
        setDynamicCards((prev) => [
          ...prev.filter((c) => c.id !== "dynamic_example"),
          {
            id: "dynamic_example",
            type: "worked_example",
            heading: res.data.title || "Additional Worked Example",
            problem: res.data.problem,
            steps: [{ step: "Step-by-step Solution", detail: res.data.solution }],
          },
        ]);
      } else if (actionType === "hint" && res.data) {
        setActiveHint(res.data.hint);
      }
    } catch (err) {
      console.error("Action error:", err);
    }
  };

  const handleFinishLesson = async () => {
    setIsCompleting(true);
    try {
      await completeActivity({
        activityId: lesson.id,
        conceptId: lesson.conceptId,
        score: quizResult?.percentage ?? 0,
      });
      onLessonCompleted(lesson.id);
    } catch (err) {
      console.error("Completion error:", err);
      onClose();
    } finally {
      setIsCompleting(false);
    }
  };

  const startTopicQuiz = async () => {
    if (quizLoading) return;
    setQuizLoading(true);
    try {
      const data = await fetchTopicQuiz(lesson.conceptId, {
        topicName: lesson.title,
        subject: lesson.conceptName,
      });
      setTopicQuiz(data);
      setQuizStarted(true);
      setLumiExpression("curious");
      setLumiMessage(`Let's check what you learned about ${lesson.conceptName || lesson.title}.`);
    } catch (err) {
      console.error("Topic quiz load error:", err);
      setLumiMessage("I couldn't load the quiz just now. Please try again.");
    } finally {
      setQuizLoading(false);
    }
  };

  const submitTopicQuizAnswers = async () => {
    if (!topicQuiz || quizSubmitting || Object.keys(quizAnswers).length < topicQuiz.questions.length) return;
    setQuizSubmitting(true);
    try {
      const result = await submitTopicQuiz({ topicId: lesson.conceptId, answers: quizAnswers });
      setQuizResult(result);
      setLumiExpression(result.percentage >= 80 ? "celebrating" : "supportive");
      setLumiMessage(result.judgmentVerdict);
    } catch (err) {
      console.error("Topic quiz submit error:", err);
    } finally {
      setQuizSubmitting(false);
    }
  };

  if (loading || !lesson) {
    return null;
  }

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
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 780,
          maxHeight: "92vh",
          backgroundColor: "var(--bg-surface)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "var(--shadow-modal)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Lesson Top Header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid var(--border-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "var(--bg-surface)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontSize: 11,
                  padding: "3px 8px",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--brand-primary-tint)",
                  color: "var(--brand-primary)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {lesson.conceptName}
              </span>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                • {lesson.duration}
              </span>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)", margin: "4px 0 0 0" }}>
              {lesson.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="btn-ghost"
            style={{
              padding: 8,
              borderRadius: "50%",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close lesson"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {/* Lumi Introduction Banner */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "16px 20px",
              backgroundColor: "var(--bg-canvas)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-md)",
              marginBottom: 24,
            }}
          >
            <LumiCharacter expression={lumiExpression} size={54} />
            <div style={{ flex: 1, fontSize: 14, color: "var(--text-primary)", lineHeight: 1.45, fontWeight: 500 }}>
              {lumiMessage}
            </div>
          </div>

          {/* Action Toolbar: Explain simply, Worked example, Hint, Similar question */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 24,
              padding: "10px 14px",
              backgroundColor: "var(--brand-primary-tint)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--brand-primary-border)",
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-primary)", alignSelf: "center", marginRight: 4 }}>
              Lumi's Tools:
            </span>
            <button
              onClick={() => handleAction("simplify")}
              className="btn btn-secondary"
              style={{ fontSize: 12, padding: "6px 12px", borderRadius: "var(--radius-full)" }}
            >
              <Sparkles size={14} color="var(--brand-primary)" />
              <span>Explain more simply</span>
            </button>
            <button
              onClick={() => handleAction("another_example")}
              className="btn btn-secondary"
              style={{ fontSize: 12, padding: "6px 12px", borderRadius: "var(--radius-full)" }}
            >
              <Calculator size={14} color="var(--brand-primary)" />
              <span>Show another example</span>
            </button>
            <button
              onClick={() => handleAction("hint")}
              className="btn btn-secondary"
              style={{ fontSize: 12, padding: "6px 12px", borderRadius: "var(--radius-full)" }}
            >
              <HelpCircle size={14} color="var(--brand-primary)" />
              <span>Give me a hint</span>
            </button>
          </div>

          {/* Hint Callout if active */}
          {activeHint && (
            <div
              style={{
                padding: "14px 18px",
                backgroundColor: "#FFFBEB",
                border: "1px solid #FDE68A",
                borderRadius: "var(--radius-md)",
                color: "#92400E",
                fontSize: 13,
                marginBottom: 20,
              }}
            >
              <strong>💡 Key Conceptual Hint:</strong> {activeHint}
            </div>
          )}

          {/* Base Structured Cards */}
          {lesson.cards.map((card) => (
            <div
              key={card.id}
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "20px 24px",
                marginBottom: 20,
                boxShadow: "var(--shadow-subtle)",
              }}
            >
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
                {card.heading}
              </h3>

              {card.content && (
                <ul style={{ paddingLeft: 20, margin: "0 0 16px 0", color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
                  {card.content.map((point, idx) => (
                    <li key={idx} style={{ marginBottom: 8 }}>
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {card.formula && (
                <Formula formula={card.formula} labels={card.formulaLabels} />
              )}

              {card.problem && (
                <div
                  style={{
                    backgroundColor: "var(--bg-canvas)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-md)",
                    padding: "14px 18px",
                    marginBottom: 14,
                  }}
                >
                  <strong style={{ fontSize: 13, color: "var(--brand-primary)", textTransform: "uppercase" }}>
                    Problem Statement:
                  </strong>
                  <p style={{ margin: "4px 0 0 0", fontSize: 14, color: "var(--text-primary)", lineHeight: 1.5 }}>
                    {card.problem}
                  </p>
                </div>
              )}

              {card.steps && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {card.steps.map((st, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "10px 14px",
                        backgroundColor: "var(--bg-surface-secondary)",
                        borderRadius: "var(--radius-sm)",
                        fontSize: 13,
                      }}
                    >
                      <strong style={{ color: "var(--brand-primary)" }}>{st.step}: </strong>
                      <span style={{ color: "var(--text-primary)" }}>{st.detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Dynamically Injected Cards (from Simplify or Example buttons) */}
          {dynamicCards.map((card) => (
            <div
              key={card.id}
              style={{
                backgroundColor: card.type === "analogy" ? "#F5F3FF" : "#F0FDF4",
                border: "1px solid",
                borderColor: card.type === "analogy" ? "#DDD6FE" : "#BBF7D0",
                borderRadius: "var(--radius-lg)",
                padding: "20px 24px",
                marginBottom: 20,
                animation: "slideUp 0.25s ease-out",
              }}
            >
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: card.type === "analogy" ? "#5B21B6" : "#166534",
                  marginBottom: 10,
                }}
              >
                {card.heading}
              </h3>
              {card.content && (
                <p style={{ fontSize: 14, color: card.type === "analogy" ? "#4C1D95" : "#14532D", lineHeight: 1.6, margin: 0 }}>
                  {card.content[0]}
                </p>
              )}
              {card.problem && (
                <p style={{ fontSize: 14, color: "#14532D", marginBottom: 8, fontWeight: 500 }}>
                  {card.problem}
                </p>
              )}
              {card.steps && (
                <div style={{ fontSize: 13, color: "#14532D", backgroundColor: "#DCFCE7", padding: "10px 14px", borderRadius: 6 }}>
                  {card.steps[0].detail}
                </div>
              )}
            </div>
          ))}

          {!quizStarted && (
            <div style={{ padding: 22, marginTop: 24, border: "2px solid var(--border-brand)", borderRadius: "var(--radius-lg)", background: "var(--brand-primary-tint)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <LumiCharacter expression="curious" size={48} />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: "var(--text-primary)" }}>Ready for a quick topic quiz?</strong>
                  <p style={{ margin: "4px 0 0", color: "var(--text-secondary)", fontSize: 13 }}>I’ll ask you about {lesson.conceptName || lesson.title} and explain the answer.</p>
                </div>
                <button onClick={startTopicQuiz} disabled={quizLoading} className="btn btn-primary">
                  {quizLoading ? "Preparing quiz…" : "Start topic quiz"} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {quizStarted && topicQuiz && (
            <div
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "2px solid var(--border-brand)",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                marginTop: 24,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-primary)", textTransform: "uppercase", marginBottom: 6 }}>
                {topicQuiz.subject} • {topicQuiz.questions.length}-question topic quiz
              </div>
              {topicQuiz.questions.map((question, index) => {
                const result = quizResult?.questionResults?.find((item) => item.questionId === question.id);
                return (
                  <div key={question.id} style={{ padding: "16px 0", borderBottom: index < topicQuiz.questions.length - 1 ? "1px solid var(--border-light)" : "none" }}>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 12px", lineHeight: 1.45 }}>
                      {index + 1}. {question.question}
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {question.options.map((option) => {
                        const selected = quizAnswers[question.id] === option.id;
                        const correct = result?.correctOptionId === option.id;
                        const incorrect = result?.selectedOptionId === option.id && !result?.isCorrect;
                        return <button key={option.id} disabled={!!quizResult} onClick={() => setQuizAnswers((prev) => ({ ...prev, [question.id]: option.id }))} className={`option-card ${correct ? "correct" : incorrect ? "incorrect" : selected ? "selected" : ""}`} style={{ padding: "10px 14px" }}>
                          <div className="option-badge">{option.id}</div><div className="option-text" style={{ flex: 1 }}>{option.text}</div>
                        </button>;
                      })}
                    </div>
                    {result && <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{result.feedback} {result.explanation}</p>}
                  </div>
                );
              })}
              {quizResult ? (
                <div style={{ marginTop: 16, padding: 16, borderRadius: "var(--radius-md)", background: "var(--success-bg)", color: "var(--text-primary)" }}>
                  <strong>{quizResult.percentage}% • {quizResult.mastery}</strong><p style={{ margin: "5px 0 0", fontSize: 13 }}>{quizResult.gapAnalysis}</p>
                </div>
              ) : (
                <button onClick={submitTopicQuizAnswers} disabled={Object.keys(quizAnswers).length < topicQuiz.questions.length || quizSubmitting} className="btn btn-primary" style={{ width: "100%", marginTop: 16, padding: "12px 0" }}>
                  {quizSubmitting ? "Checking your answers…" : "Submit quiz answers"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid var(--border-light)",
            backgroundColor: "var(--bg-surface)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button onClick={onClose} className="btn btn-ghost">
            Close & Review Later
          </button>

          <button
            onClick={quizStarted ? handleFinishLesson : startTopicQuiz}
            disabled={(quizStarted && !quizResult) || quizLoading || isCompleting}
            className="btn btn-primary"
            style={{ padding: "12px 28px", fontSize: 15 }}
          >
            <span>{isCompleting ? "Saving..." : quizLoading ? "Preparing quiz…" : quizStarted ? "Finish Quiz & Complete Topic" : "Finish Learning & Start Quiz"}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
