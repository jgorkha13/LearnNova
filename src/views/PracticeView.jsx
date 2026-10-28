import React, { useState, useEffect } from "react";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  BookOpen,
  Target,
  Clock,
  Layers,
  ChevronDown,
  ChevronRight,
  Bot,
  Zap,
  Play,
  Award,
  HelpCircle,
  TrendingUp,
  RotateCcw,
} from "lucide-react";
import LumiCharacter from "../components/LumiCharacter";
import {
  fetchDomainCurriculum,
  fetchDomains,
  fetchTopicQuiz,
  submitTopicQuiz,
  switchTopic,
} from "../services/api";

export default function PracticeView({
  profile,
  onOpenTutor,
  onOpenSubjectDashboard,
  onStartLesson,
  onTopicSwitched,
}) {
  const [loading, setLoading] = useState(true);
  const [domains, setDomains] = useState([]);
  const [selectedDomainId, setSelectedDomainId] = useState(profile?.domain || "class_11");
  const [curriculumData, setCurriculumData] = useState(null);
  const [expandedUnits, setExpandedUnits] = useState({});

  // Active Topic Quiz Mode state
  // quizState: 'syllabus' (default - NEVER show questions immediately!) | 'active_quiz' | 'judgment_result'
  const [quizState, setQuizState] = useState("syllabus");
  const [activeQuizTopic, setActiveQuizTopic] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);

  // Active quiz runner state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: optionId }
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [judgmentResult, setJudgmentResult] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState(null);

  // Lumi message
  const [lumiExpression, setLumiExpression] = useState("welcome");
  const [lumiMessage, setLumiMessage] = useState(
    "Explore your syllabus below. Choose any topic to trigger a targeted diagnostic quiz so I can evaluate and judge your conceptual measurement!"
  );

  // Load curriculum data
  const loadCurriculum = async (domainId) => {
    setLoading(true);
    try {
      const domRes = await fetchDomains().catch(() => null);
      if (domRes?.domains) {
        setDomains(domRes.domains);
      }
      const data = await fetchDomainCurriculum(domainId || selectedDomainId);
      setCurriculumData(data);

      // Expand all units by default so student sees full syllabus clearly
      const exp = {};
      data.subjects?.forEach((s) => {
        s.units?.forEach((u) => {
          exp[u.id] = true;
        });
      });
      setExpandedUnits(exp);
    } catch (err) {
      console.error("Failed to load practice syllabus:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const activeDomain = profile?.domain || "class_11";
    setSelectedDomainId(activeDomain);
    loadCurriculum(activeDomain);
  }, [profile?.domain]);

  const handleDomainSwitch = (domainId) => {
    setSelectedDomainId(domainId);
    loadCurriculum(domainId);
  };

  const toggleUnit = (unitId) => {
    setExpandedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  // Launch AI Agent Quiz for a specific topic
  const handleStartTopicQuiz = async (subject, topic, unit) => {
    setQuizLoading(true);
    setActiveQuizTopic({
      topicId: topic.id,
      topicName: topic.name,
      subjectName: subject.name,
      unitTitle: unit.title,
    });
    setQuizState("active_quiz");
    setCurrentQIndex(0);
    setUserAnswers({});
    setSelectedOptionId(null);
    setJudgmentResult(null);
    setQuizStartTime(Date.now());
    setLumiExpression("curious");
    setLumiMessage(
      `Let's evaluate your conceptual understanding of "${topic.name}"! I've prepared 3 diagnostic questions.`
    );

    try {
      const data = await fetchTopicQuiz(topic.id, {
        topicName: topic.name,
        subject: subject.name,
        unitTitle: unit.title,
      });
      setQuizData(data);
    } catch (err) {
      console.error("Failed to load topic quiz:", err);
    } finally {
      setQuizLoading(false);
    }
  };

  // Select option in active quiz
  const handleSelectOption = (optId) => {
    setSelectedOptionId(optId);
    if (!quizData?.questions?.[currentQIndex]) return;
    const qId = quizData.questions[currentQIndex].id;
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optId,
    }));
  };

  // Next Question in active quiz
  const handleNextQuizQuestion = () => {
    if (currentQIndex < (quizData?.questions?.length || 3) - 1) {
      const nextIdx = currentQIndex + 1;
      setCurrentQIndex(nextIdx);
      const nextQId = quizData.questions[nextIdx]?.id;
      setSelectedOptionId(userAnswers[nextQId] || null);
      setLumiExpression("thinking");
      setLumiMessage(`Question ${nextIdx + 1} of 3: Keep going! Analyze the principle carefully.`);
    }
  };

  // Previous Question
  const handlePrevQuizQuestion = () => {
    if (currentQIndex > 0) {
      const prevIdx = currentQIndex - 1;
      setCurrentQIndex(prevIdx);
      const prevQId = quizData.questions[prevIdx]?.id;
      setSelectedOptionId(userAnswers[prevQId] || null);
    }
  };

  // Submit quiz & trigger Lumi Judgment
  const handleSubmitQuizForJudgment = async () => {
    if (!activeQuizTopic || !quizData) return;
    setIsSubmitting(true);
    const timeSpentSeconds = Math.round((Date.now() - (quizStartTime || Date.now())) / 1000);

    try {
      const result = await submitTopicQuiz({
        topicId: activeQuizTopic.topicId,
        answers: userAnswers,
        timeSpentSeconds,
      });

      setJudgmentResult(result);
      setQuizState("judgment_result");

      if (result.percentage >= 80) {
        setLumiExpression("celebrating");
        setLumiMessage(
          `Mastery judged! You scored ${result.percentage}% on "${activeQuizTopic.topicName}". Your conceptual understanding is solid!`
        );
      } else if (result.percentage >= 50) {
        setLumiExpression("encouraging");
        setLumiMessage(
          `Good effort! You scored ${result.percentage}% on "${activeQuizTopic.topicName}". Review the Socratic breakdowns below to repair minor gaps.`
        );
      } else {
        setLumiExpression("thinking");
        setLumiMessage(
          `Concept gap diagnosed (${result.percentage}%). Don't worry—Lumi will guide you through the core principles!`
        );
      }

      // Refresh curriculum to reflect updated track report
      loadCurriculum(selectedDomainId);
    } catch (err) {
      console.error("Failed to submit quiz for judgment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset to syllabus view
  const handleBackToSyllabus = () => {
    setQuizState("syllabus");
    setActiveQuizTopic(null);
    setQuizData(null);
    setJudgmentResult(null);
    setLumiExpression("welcome");
    setLumiMessage(
      "Choose another topic from your syllabus to continue testing and measuring your proficiency!"
    );
  };

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: "center", padding: "80px 20px" }}>
        <LumiCharacter expression="thinking" size={80} floating={true} />
        <p style={{ marginTop: 16, color: "var(--text-secondary)", fontWeight: 600 }}>
          Loading your subject syllabus and curriculum units...
        </p>
      </div>
    );
  }

  // Active Subject based on profile or first subject in domain
  const activeSubject =
    curriculumData?.subjects?.find(
      (s) => s.name.toLowerCase() === (profile?.subject || "").toLowerCase()
    ) ||
    curriculumData?.subjects?.[0] ||
    null;

  return (
    <div className="page-container" style={{ paddingBottom: 60 }}>
      {/* Top Lumi AI Guidance Banner */}
      <div
        className="card"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "20px 26px",
          marginBottom: 28,
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-light)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
        }}
      >
        <LumiCharacter expression={lumiExpression} size={70} floating={true} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: "var(--brand-primary)",
                backgroundColor: "var(--brand-primary-tint)",
                padding: "2px 8px",
                borderRadius: "var(--radius-sm)",
                textTransform: "uppercase",
              }}
            >
              Lumi AI Conceptual Measurement
            </span>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
              • Syllabus First, No Unrequested Questions
            </span>
          </div>
          <p
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--text-primary)",
              margin: 0,
              lineHeight: 1.45,
            }}
          >
            {lumiMessage}
          </p>
        </div>

        {quizState !== "syllabus" && (
          <button
            onClick={handleBackToSyllabus}
            className="btn btn-secondary"
            style={{
              padding: "8px 16px",
              fontSize: 13,
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <BookOpen size={15} />
            <span>View Syllabus</span>
          </button>
        )}
      </div>

      {/* ============================================================ */}
      {/* VIEW 1: SYLLABUS & TOPIC SELECTION HUB (NEVER ASK QUESTIONS ON LOGIN!) */}
      {/* ============================================================ */}
      {quizState === "syllabus" && (
        <div>
          {/* Domain & Academic Level Switcher Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                {activeSubject?.name || "Physics"} Syllabus & Units
              </h1>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
                Select any topic below to take a targeted quiz. Lumi will diagnose your conceptual understanding and judge your measurement.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {onOpenSubjectDashboard && (
                <button
                  onClick={onOpenSubjectDashboard}
                  className="btn btn-secondary"
                  style={{
                    padding: "8px 14px",
                    fontSize: 13,
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                  title="Switch to another subject or chapter"
                >
                  <Layers size={15} color="var(--brand-primary)" />
                  <span>Change Chapter / Subject</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Domain Pills */}
          <div
            style={{
              display: "flex",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 8,
              marginBottom: 24,
              borderBottom: "1px solid var(--border-light)",
            }}
          >
            {[
              { id: "class_11", label: "Class 11th (Physics & Science)" },
              { id: "class_12", label: "Class 12th (Current Electricity & Boards)" },
              { id: "cse_3rd_year", label: "B.Tech CSE - 3rd Year (Networks, SE, DBMS)" },
              { id: "cse_1st_year", label: "B.Tech CSE - 1st Year (C Programming, Math)" },
              { id: "entrance", label: "Entrance (JEE / NEET)" },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => handleDomainSwitch(d.id)}
                style={{
                  padding: "7px 14px",
                  borderRadius: "var(--radius-full)",
                  fontSize: 13,
                  fontWeight: selectedDomainId === d.id ? 700 : 500,
                  backgroundColor: selectedDomainId === d.id ? "var(--brand-primary)" : "var(--bg-surface)",
                  color: selectedDomainId === d.id ? "#fff" : "var(--text-secondary)",
                  border: "1px solid",
                  borderColor: selectedDomainId === d.id ? "var(--brand-primary)" : "var(--border-light)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                }}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Subject Units & Topic Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {activeSubject?.units?.map((unit) => {
              const isExpanded = expandedUnits[unit.id] ?? true;

              return (
                <div
                  key={unit.id}
                  className="card"
                  style={{
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--border-light)",
                    overflow: "hidden",
                    backgroundColor: "var(--bg-surface)",
                  }}
                >
                  {/* Unit Header Accordion Bar */}
                  <div
                    onClick={() => toggleUnit(unit.id)}
                    style={{
                      padding: "16px 22px",
                      backgroundColor: "var(--bg-surface-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      borderBottom: isExpanded ? "1px solid var(--border-light)" : "none",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            padding: "2px 8px",
                            borderRadius: "var(--radius-sm)",
                            backgroundColor: "var(--brand-primary-tint)",
                            color: "var(--brand-primary)",
                            textTransform: "uppercase",
                          }}
                        >
                          Unit {unit.unitNumber}
                        </span>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                          {unit.title}
                        </h3>
                      </div>
                      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
                        {unit.description}
                      </p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "var(--text-secondary)",
                          backgroundColor: "var(--bg-surface)",
                          padding: "3px 10px",
                          borderRadius: "var(--radius-full)",
                          border: "1px solid var(--border-light)",
                        }}
                      >
                        {unit.topics?.length} Topics
                      </span>
                      {isExpanded ? (
                        <ChevronDown size={18} color="var(--text-muted)" />
                      ) : (
                        <ChevronRight size={18} color="var(--text-muted)" />
                      )}
                    </div>
                  </div>

                  {/* Topics Grid inside Unit */}
                  {isExpanded && (
                    <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                      {unit.topics?.map((topic) => {
                        const report = topic.trackReport || {};
                        const isMastered = report.mastery === "Mastered" || report.percent >= 80;
                        const isLearning = report.mastery === "Learning" || (report.percent > 0 && report.percent < 80);

                        return (
                          <div
                            key={topic.id}
                            style={{
                              padding: "16px 20px",
                              borderRadius: "var(--radius-md)",
                              border: "1px solid var(--border-light)",
                              backgroundColor: "var(--bg-surface)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 16,
                              flexWrap: "wrap",
                              transition: "all 0.15s ease",
                            }}
                            className="card-interactive"
                          >
                            {/* Topic Details */}
                            <div style={{ flex: "1 1 320px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                <span
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    padding: "2px 8px",
                                    borderRadius: "var(--radius-full)",
                                    backgroundColor: isMastered
                                      ? "#ECFDF5"
                                      : isLearning
                                      ? "#FEF3C7"
                                      : "var(--bg-surface-secondary)",
                                    color: isMastered ? "#059669" : isLearning ? "#B45309" : "var(--text-muted)",
                                  }}
                                >
                                  {isMastered ? "✓ Mastered" : isLearning ? "● In Progress" : "○ Untested"}
                                </span>
                                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                                  • {topic.duration || "15m"}
                                </span>
                                <span
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    padding: "1px 6px",
                                    borderRadius: "var(--radius-sm)",
                                    backgroundColor:
                                      topic.difficulty === "Advanced"
                                        ? "#FEE2E2"
                                        : topic.difficulty === "Intermediate"
                                        ? "#FEF3C7"
                                        : "#ECFDF5",
                                    color:
                                      topic.difficulty === "Advanced"
                                        ? "#DC2626"
                                        : topic.difficulty === "Intermediate"
                                        ? "#B45309"
                                        : "#059669",
                                  }}
                                >
                                  {topic.difficulty || "Beginner"}
                                </span>
                              </div>

                              <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 6px 0" }}>
                                {topic.name}
                              </h4>

                              {/* Concepts */}
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {topic.concepts?.slice(0, 3).map((concept, cIdx) => (
                                  <span
                                    key={cIdx}
                                    style={{
                                      fontSize: 11,
                                      color: "var(--text-secondary)",
                                      backgroundColor: "var(--bg-canvas)",
                                      padding: "2px 8px",
                                      borderRadius: "var(--radius-sm)",
                                      border: "1px solid var(--border-light)",
                                    }}
                                  >
                                    {concept}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Track Measurement Report Pill */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                                gap: 2,
                                minWidth: 110,
                              }}
                            >
                              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                                Score: <strong>{report.accuracy || "—"}</strong>
                              </div>
                              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                                Time: <strong>{report.timeSpent || "0m"}</strong>
                              </div>
                              <div
                                style={{
                                  fontSize: 11,
                                  fontWeight: 700,
                                  color: isMastered ? "#059669" : isLearning ? "#D97706" : "var(--text-muted)",
                                }}
                              >
                                {report.mastery || "Not Measured"}
                              </div>
                            </div>

                            {/* Topic Action: Take Quiz & Measure */}
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <button
                                onClick={() => handleStartTopicQuiz(activeSubject, topic, unit)}
                                className="btn btn-primary"
                                style={{
                                  padding: "9px 18px",
                                  fontSize: 13,
                                  fontWeight: 700,
                                  borderRadius: "var(--radius-md)",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 6,
                                  whiteSpace: "nowrap",
                                  boxShadow: "0 2px 6px rgba(79, 70, 229, 0.25)",
                                }}
                                title="Lumi AI will quiz you on this topic and judge your conceptual measurement"
                              >
                                <Target size={15} />
                                <span>🎯 Test with Lumi (Quiz)</span>
                              </button>

                              {onStartLesson && (
                                <button
                                  onClick={() => onStartLesson(topic.lessonId || `lesson_${topic.id}`)}
                                  className="btn btn-secondary"
                                  style={{
                                    padding: "9px 14px",
                                    fontSize: 13,
                                    borderRadius: "var(--radius-md)",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 6,
                                  }}
                                  title="Read interactive lesson directly"
                                >
                                  <BookOpen size={14} />
                                  <span>Lesson</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 2: ACTIVE LUMI AI TOPIC QUIZ RUNNER (AFTER SELECTING TOPIC) */}
      {/* ============================================================ */}
      {quizState === "active_quiz" && (
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          {quizLoading ? (
            <div className="card" style={{ textAlign: "center", padding: "60px 20px" }}>
              <LumiCharacter expression="thinking" size={70} floating={true} />
              <p style={{ marginTop: 16, color: "var(--text-secondary)", fontWeight: 600 }}>
                Lumi is generating diagnostic questions for {activeQuizTopic?.topicName}...
              </p>
            </div>
          ) : quizData?.questions?.length > 0 ? (
            (() => {
              const totalQ = quizData.questions.length;
              const currentQ = quizData.questions[currentQIndex];
              const isSelected = !!selectedOptionId;
              const isLast = currentQIndex === totalQ - 1;
              const allAnswered = Object.keys(userAnswers).length === totalQ;

              return (
                <div
                  className="card"
                  style={{
                    padding: "32px 36px",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--border-light)",
                    backgroundColor: "var(--bg-surface)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Quiz Header Bar */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 16,
                      flexWrap: "wrap",
                      gap: 12,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: "var(--brand-primary)",
                          backgroundColor: "var(--brand-primary-tint)",
                          padding: "3px 10px",
                          borderRadius: "var(--radius-sm)",
                          textTransform: "uppercase",
                        }}
                      >
                        {activeQuizTopic?.unitTitle}
                      </span>
                      <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", margin: "6px 0 0 0" }}>
                        Topic: {activeQuizTopic?.topicName}
                      </h2>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--brand-primary)" }}>
                        Question {currentQIndex + 1} of {totalQ}
                      </span>
                      {/* Step Progress Dots */}
                      <div style={{ display: "flex", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                        {quizData.questions.map((q, idx) => (
                          <div
                            key={q.id}
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor:
                                idx === currentQIndex
                                  ? "var(--brand-primary)"
                                  : userAnswers[q.id]
                                  ? "#10B981"
                                  : "var(--border-light)",
                              transition: "all 0.2s ease",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Question Stem */}
                  <div
                    style={{
                      padding: "20px 24px",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--bg-canvas)",
                      border: "1px solid var(--border-light)",
                      marginBottom: 24,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        lineHeight: 1.55,
                        margin: 0,
                      }}
                    >
                      {currentQ.question}
                    </p>
                  </div>

                  {/* Options List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                    {currentQ.options?.map((opt) => {
                      const isOptSelected = selectedOptionId === opt.id;

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(opt.id)}
                          className={`option-card ${isOptSelected ? "selected" : ""}`}
                          style={{
                            padding: "16px 20px",
                            textAlign: "left",
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            borderRadius: "var(--radius-md)",
                            border: isOptSelected ? "2px solid var(--brand-primary)" : "1px solid var(--border-light)",
                            backgroundColor: isOptSelected ? "var(--brand-primary-tint)" : "var(--bg-surface)",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <div
                            className="option-badge"
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 800,
                              fontSize: 13,
                              backgroundColor: isOptSelected ? "var(--brand-primary)" : "var(--bg-surface-secondary)",
                              color: isOptSelected ? "#fff" : "var(--text-secondary)",
                            }}
                          >
                            {opt.id}
                          </div>
                          <div style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>
                            {opt.text}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Hint Accordion */}
                  {currentQ.hint && (
                    <div
                      style={{
                        padding: "12px 16px",
                        borderRadius: "var(--radius-md)",
                        backgroundColor: "#FFFBEB",
                        border: "1px solid #FDE68A",
                        fontSize: 13,
                        color: "#92400E",
                        marginBottom: 24,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <HelpCircle size={16} color="#D97706" />
                      <span>
                        <strong>Lumi's Hint:</strong> {currentQ.hint}
                      </span>
                    </div>
                  )}

                  {/* Quiz Navigation & Submit */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <button
                      onClick={handlePrevQuizQuestion}
                      disabled={currentQIndex === 0}
                      className="btn btn-secondary"
                      style={{ padding: "10px 18px", fontSize: 14, opacity: currentQIndex === 0 ? 0.4 : 1 }}
                    >
                      Previous
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {!isLast ? (
                        <button
                          onClick={handleNextQuizQuestion}
                          disabled={!selectedOptionId}
                          className="btn btn-primary"
                          style={{ padding: "10px 22px", fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}
                        >
                          <span>Next Question</span>
                          <ArrowRight size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmitQuizForJudgment}
                          disabled={!selectedOptionId || isSubmitting}
                          className="btn btn-primary"
                          style={{
                            padding: "12px 28px",
                            fontSize: 14,
                            fontWeight: 800,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            backgroundColor: "#059669",
                            borderColor: "#059669",
                            boxShadow: "0 2px 8px rgba(5, 150, 105, 0.3)",
                          }}
                        >
                          <Target size={16} />
                          <span>{isSubmitting ? "Lumi is Judging..." : "Submit & Judge Measurement"}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="card" style={{ textAlign: "center", padding: "40px 20px" }}>
              <p>No questions found for this topic.</p>
              <button onClick={handleBackToSyllabus} className="btn btn-primary">
                Back to Syllabus
              </button>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW 3: LUMI MEASUREMENT JUDGMENT & VERDICT SCREEN */}
      {/* ============================================================ */}
      {quizState === "judgment_result" && judgmentResult && (
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {/* Top Judgment Hero Card */}
          <div
            className="card"
            style={{
              padding: "32px",
              borderRadius: "var(--radius-lg)",
              border: "1.5px solid",
              borderColor:
                judgmentResult.percentage >= 80
                  ? "#10B981"
                  : judgmentResult.percentage >= 50
                  ? "#F59E0B"
                  : "#EF4444",
              backgroundColor: "var(--bg-surface)",
              marginBottom: 24,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
              <LumiCharacter
                expression={
                  judgmentResult.percentage >= 80
                    ? "celebrating"
                    : judgmentResult.percentage >= 50
                    ? "encouraging"
                    : "thinking"
                }
                size={80}
                floating={true}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      padding: "3px 12px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor:
                        judgmentResult.percentage >= 80
                          ? "#ECFDF5"
                          : judgmentResult.percentage >= 50
                          ? "#FEF3C7"
                          : "#FEE2E2",
                      color:
                        judgmentResult.percentage >= 80
                          ? "#059669"
                          : judgmentResult.percentage >= 50
                          ? "#B45309"
                          : "#DC2626",
                      textTransform: "uppercase",
                    }}
                  >
                    Measurement Status: {judgmentResult.mastery}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                    • Score: {judgmentResult.score} / {judgmentResult.totalQuestions} ({judgmentResult.percentage}%)
                  </span>
                </div>

                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 8px 0" }}>
                  Measurement Judgment on {judgmentResult.topicName}
                </h2>

                <p
                  style={{
                    fontSize: 15,
                    color: "var(--text-secondary)",
                    lineHeight: 1.5,
                    margin: 0,
                    backgroundColor: "var(--bg-canvas)",
                    padding: "12px 16px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  {judgmentResult.judgmentVerdict}
                </p>
              </div>
            </div>

            {/* Gap Analysis Diagnostic Strip */}
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "var(--radius-md)",
                backgroundColor: judgmentResult.percentage >= 80 ? "#F0FDF4" : "#FEF3C7",
                border: "1px solid",
                borderColor: judgmentResult.percentage >= 80 ? "#BBF7D0" : "#FDE68A",
                color: judgmentResult.percentage >= 80 ? "#166534" : "#92400E",
                fontSize: 13,
                lineHeight: 1.45,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {judgmentResult.percentage >= 80 ? (
                <CheckCircle2 size={18} color="#166534" />
              ) : (
                <AlertCircle size={18} color="#D97706" />
              )}
              <div>
                <strong>Lumi's Gap Diagnostic:</strong> {judgmentResult.gapAnalysis}
              </div>
            </div>
          </div>

          {/* Socratic Question Breakdowns */}
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 16px 0" }}>
            Socratic Question Reasoning Breakdown
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
            {judgmentResult.questionResults?.map((qr, qIdx) => (
              <div
                key={qr.questionId}
                className="card"
                style={{
                  padding: "20px 24px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-light)",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)" }}>
                    Question {qIdx + 1}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "2px 10px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: qr.isCorrect ? "#ECFDF5" : "#FEE2E2",
                      color: qr.isCorrect ? "#059669" : "#DC2626",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {qr.isCorrect ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
                    {qr.isCorrect ? "Correct" : "Gap Flagged"}
                  </span>
                </div>

                <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 12px 0" }}>
                  {qr.questionText}
                </p>

                <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>
                  Your selection: <strong>Option {qr.selectedOptionId}</strong> • Correct:{" "}
                  <strong style={{ color: "#059669" }}>Option {qr.correctOptionId}</strong>
                </div>

                {/* Socratic Feedback */}
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: qr.isCorrect ? "#F0FDF4" : "#FEF2F2",
                    border: "1px solid",
                    borderColor: qr.isCorrect ? "#DCFCE7" : "#FEE2E2",
                    fontSize: 13,
                    color: qr.isCorrect ? "#166534" : "#991B1B",
                    marginBottom: 10,
                  }}
                >
                  {qr.feedback}
                </div>

                {/* Conceptual Explanation */}
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>Why this holds: </span>
                  {qr.explanation}
                </div>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <button
              onClick={handleBackToSyllabus}
              className="btn btn-secondary"
              style={{ padding: "12px 24px", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}
            >
              <BookOpen size={16} />
              <span>Back to Syllabus Overview</span>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                onClick={() =>
                  onOpenTutor &&
                  onOpenTutor(
                    `Lumi, explain the concept gap in ${judgmentResult.topicName}: ${judgmentResult.gapAnalysis}`
                  )
                }
                className="btn btn-secondary"
                style={{ padding: "12px 20px", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}
              >
                <Bot size={16} color="var(--brand-primary)" />
                <span>Discuss with Lumi</span>
              </button>

              <button
                onClick={() =>
                  handleStartTopicQuiz(
                    activeSubject,
                    { id: activeQuizTopic.topicId, name: activeQuizTopic.topicName },
                    { title: activeQuizTopic.unitTitle }
                  )
                }
                className="btn btn-primary"
                style={{ padding: "12px 24px", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}
              >
                <RotateCcw size={16} />
                <span>Retest Topic</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
