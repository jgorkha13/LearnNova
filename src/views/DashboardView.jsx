import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Clock,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
  Flame,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Play,
  Layers,
  ChevronRight,
  Zap,
  Calendar,
  FileText,
  Video,
  Code2,
  Atom,
  FlaskConical,
  Binary,
  Cpu,
  Network,
  Database,
  GraduationCap,
} from "lucide-react";
import LumiCharacter from "../components/LumiCharacter";
import {
  fetchProgress,
  fetchStreakActivity,
  fetchDomainCurriculum,
  switchTopic,
} from "../services/api";

export default function DashboardView({
  profile,
  progress,
  onStartLesson,
  onOpenTutor,
  onOpenStreakModal,
  onOpenSubjectDashboard,
  onNavigateTo,
  onTopicSwitched,
}) {
  const [progressData, setProgressData] = useState(progress || null);
  const [streakData, setStreakData] = useState(null);
  const [curriculumData, setCurriculumData] = useState(null);
  const [loadingCurriculum, setLoadingCurriculum] = useState(false);

  const studentName = profile?.name || "Alex";
  const activeDomain = profile?.domain || "class_11";
  const activeSubjectName = profile?.subject || "Physics";
  const activeTopicName = profile?.topic || "Uniformly Accelerated Motion & Equations";

  // Load progress, streak, and active domain curriculum
  useEffect(() => {
    async function loadData() {
      try {
        const [prog, streak, curRes] = await Promise.all([
          fetchProgress().catch(() => null),
          fetchStreakActivity().catch(() => null),
          fetchDomainCurriculum(activeDomain).catch(() => null),
        ]);
        if (prog) setProgressData(prog);
        if (streak) setStreakData(streak);
        if (curRes) setCurriculumData(curRes);
      } catch (err) {
        console.warn("Could not load dashboard data:", err);
      }
    }
    loadData();
  }, [profile?.topicId, profile?.domain, profile?.subject]);

  // Find active subject inside curriculum
  const activeSubject =
    curriculumData?.subjects?.find(
      (s) => s.name.toLowerCase() === (activeSubjectName || "").toLowerCase()
    ) ||
    curriculumData?.subjects?.[0] ||
    null;

  // Find active topic object
  let activeTopicObj = null;
  activeSubject?.units?.forEach((u) => {
    u.topics?.forEach((t) => {
      if (t.id === profile?.topicId || t.name === activeTopicName) {
        activeTopicObj = t;
      }
    });
  });

  // Derived metrics
  const completedLessons = progressData?.overallProgress?.completedNodes || 4;
  const inProgressCount = 2;
  const averageProgress = progressData?.overallProgress?.percentage || 68;
  const currentStreak = streakData?.currentStreak || 7;

  // Build DYNAMIC recommendations from the active subject's units & topics
  const dynamicRecommendations = [];
  if (activeSubject?.units) {
    activeSubject.units.forEach((unit, uIdx) => {
      unit.topics?.forEach((top, tIdx) => {
        if (dynamicRecommendations.length < 4) {
          const isArticle = tIdx % 2 === 0;
          dynamicRecommendations.push({
            id: top.lessonId || `lesson_${top.id}`,
            type: isArticle ? "Article" : "Interactive",
            typeIcon: isArticle ? FileText : Zap,
            formatLabel: isArticle ? "Concept Lesson" : "Interactive Guide",
            recommended: true,
            title: top.name,
            description: `Master core principles, key definitions (${top.concepts?.slice(0, 2).join(", ") || "theory"}), and practical exam applications.`,
            duration: top.duration || "20m",
            subject: activeSubject.name,
            difficulty: top.difficulty || "Intermediate",
            difficultyColor:
              top.difficulty === "Advanced"
                ? "#DC2626"
                : top.difficulty === "Intermediate"
                ? "#D97706"
                : "#059669",
            difficultyBg:
              top.difficulty === "Advanced"
                ? "#FEE2E2"
                : top.difficulty === "Intermediate"
                ? "#FEF3C7"
                : "#ECFDF5",
            tags: top.concepts?.slice(0, 3) || ["#core-theory", "#exam-prep"],
            topicId: top.id,
          });
        }
      });
    });
  }

  // Quick switch chapter handler
  const handleQuickChapterChange = async (targetTopic) => {
    if (!targetTopic || !activeSubject) return;
    try {
      const res = await switchTopic({
        domain: activeDomain,
        subject: activeSubject.name,
        topic: targetTopic.name,
        topicId: targetTopic.id,
        grade: curriculumData?.title || activeDomain,
      });
      if (onTopicSwitched) {
        onTopicSwitched(res.profile);
      }
    } catch (err) {
      console.error("Failed to switch chapter:", err);
    }
  };

  // Dynamic date string
  const todayStr = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const handleStartRecommendation = (rec) => {
    if (onStartLesson && rec.id) {
      onStartLesson(rec.id);
    } else if (onNavigateTo) {
      onNavigateTo("learn");
    }
  };

  return (
    <div style={{ maxWidth: 1240, margin: "0 auto", padding: "28px 24px 60px 24px" }}>
      {/* Top Breadcrumb & Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-muted)" }}>
          <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>Dashboard</span>
          <span>/</span>
          <span>Overview</span>
          <span>/</span>
          <span
            onClick={onOpenSubjectDashboard}
            style={{
              color: "var(--brand-primary)",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {activeSubject?.name || activeSubjectName}: {activeTopicObj?.name || activeTopicName}
            <ChevronRight size={14} />
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={onOpenSubjectDashboard}
            className="btn btn-secondary"
            style={{
              padding: "7px 14px",
              fontSize: 13,
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            title="Switch subject, domain, or chapter"
          >
            <Layers size={16} color="var(--brand-primary)" />
            <span>Change Subject ({activeSubject?.name || activeSubjectName})</span>
          </button>

          <button
            onClick={() => onNavigateTo("practice")}
            className="btn btn-primary"
            style={{
              padding: "7px 14px",
              fontSize: 13,
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            title="Open syllabus and take topic quizzes"
          >
            <Target size={16} />
            <span>Syllabus & Quiz Hub</span>
          </button>
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              margin: "0 0 6px 0",
            }}
          >
            Welcome back, {studentName}!
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", margin: 0 }}>
            Active Subject: <strong style={{ color: "var(--text-primary)" }}>{activeSubject?.name || activeSubjectName}</strong> • Current Focus:{" "}
            <strong style={{ color: "var(--brand-primary)" }}>{activeTopicObj?.name || activeTopicName}</strong>
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
            Today
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-secondary)" }}>
            {todayStr}
          </div>
        </div>
      </div>

      {/* QUICK CHAPTER & SUBJECT SELECTOR STRIP */}
      <div
        className="card"
        style={{
          padding: "16px 20px",
          marginBottom: 28,
          backgroundColor: "var(--bg-surface)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--brand-primary-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: "var(--brand-primary)", textTransform: "uppercase" }}>
            Quick Chapter Switch:
          </span>

          {/* Direct Subject Chapters Dropdown */}
          <select
            value={profile?.topicId || ""}
            onChange={(e) => {
              const selectedId = e.target.value;
              let foundTopic = null;
              activeSubject?.units?.forEach((u) => {
                u.topics?.forEach((t) => {
                  if (t.id === selectedId) foundTopic = t;
                });
              });
              if (foundTopic) handleQuickChapterChange(foundTopic);
            }}
            style={{
              padding: "7px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-medium)",
              backgroundColor: "var(--bg-canvas)",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text-primary)",
              cursor: "pointer",
            }}
          >
            {activeSubject?.units?.map((u) => (
              <optgroup key={u.id} label={u.title}>
                {u.topics?.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={onOpenSubjectDashboard}
            className="btn btn-secondary"
            style={{ padding: "7px 14px", fontSize: 12, fontWeight: 700 }}
          >
            ⚡ Switch Subject & Domain
          </button>

          <button
            onClick={() => onNavigateTo("practice")}
            className="btn btn-primary"
            style={{ padding: "7px 14px", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}
          >
            <Target size={14} />
            <span>Test Topic with Lumi</span>
          </button>
        </div>
      </div>

      {/* 4 Top Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {/* Card 1: Completed Lessons */}
        <div
          className="card"
          style={{
            padding: "22px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-light)",
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
              Completed Topics
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
              {activeSubject?.completedTopics || completedLessons}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
              {activeSubject?.totalTopics || 12} total topics in syllabus
            </div>
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#ECFDF5",
              color: "#059669",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BookOpen size={22} />
          </div>
        </div>

        {/* Card 2: In Progress */}
        <div
          className="card"
          style={{
            padding: "22px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-light)",
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
              Active Learning Units
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
              {activeSubject?.units?.length || 5}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
              In {activeSubject?.name || activeSubjectName}
            </div>
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#EEF2FF",
              color: "var(--brand-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Layers size={22} />
          </div>
        </div>

        {/* Card 3: LeetCode Streak */}
        <div
          className="card"
          onClick={onOpenStreakModal}
          style={{
            padding: "22px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-light)",
            cursor: "pointer",
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
              Learning Streak
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#D97706", lineHeight: 1 }}>
              {currentStreak} Days 🔥
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
              Click to view LeetCode matrix
            </div>
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#FEF3C7",
              color: "#D97706",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Flame size={22} />
          </div>
        </div>

        {/* Card 4: Average Progress */}
        <div
          className="card"
          style={{
            padding: "22px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-light)",
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
              Subject Mastery
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
              {activeSubject?.overallMastery || averageProgress}%
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
              Exam readiness index
            </div>
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#F3E8FF",
              color: "#7C3AED",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Target size={22} />
          </div>
        </div>
      </div>

      {/* DYNAMIC CONCEPT GAP & DIAGNOSTIC MATRIX STRIP (BASED ON ACTIVE TOPIC!) */}
      <div
        className="card"
        style={{
          padding: "20px 24px",
          marginBottom: 32,
          backgroundColor: "#fff",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-medium)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 280 }}>
          <LumiCharacter expression="thinking" size={54} floating={true} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "var(--text-primary)" }}>
                Diagnostic Concept Focus: {activeTopicObj?.name || activeTopicName}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor:
                    activeTopicObj?.trackReport?.mastery === "Mastered"
                      ? "#ECFDF5"
                      : "#FEF3C7",
                  color:
                    activeTopicObj?.trackReport?.mastery === "Mastered"
                      ? "#059669"
                      : "#92400E",
                }}
              >
                {activeTopicObj?.trackReport?.mastery || "Measurement Pending"}
              </span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
              {activeTopicObj?.trackReport?.judgmentVerdict ||
                `Lumi is ready to judge your conceptual measurement in ${activeTopicObj?.name || activeTopicName}. Take a 3-question quiz to uncover your exact level!`}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() =>
              onOpenTutor(
                `Lumi, explain the core physical intuition and applications of ${activeTopicObj?.name || activeTopicName} using simple analogies.`
              )
            }
            className="btn btn-secondary"
            style={{
              padding: "9px 16px",
              fontSize: 13,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Sparkles size={15} color="var(--brand-primary)" />
            <span>Explain With Analogy</span>
          </button>
          <button
            onClick={() => onNavigateTo("practice")}
            className="btn btn-primary"
            style={{
              padding: "9px 16px",
              fontSize: 13,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Zap size={15} />
            <span>🎯 Topic Quiz & Measure</span>
          </button>
        </div>
      </div>

      {/* DYNAMIC AI RECOMMENDATIONS FOR THE ACTIVE SUBJECT */}
      <div style={{ marginBottom: 36 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--brand-primary-tint)",
                color: "var(--brand-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles size={18} />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
              AI Recommendations in {activeSubject?.name || activeSubjectName}
            </h2>
          </div>

          <button
            onClick={() => onNavigateTo("library")}
            className="btn-ghost"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--brand-primary)",
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 12px",
            }}
          >
            <span>View Full Syllabus</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dynamic Card Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {dynamicRecommendations.map((rec) => {
            const TypeIcon = rec.typeIcon;
            return (
              <div
                key={rec.id}
                className="card card-interactive"
                style={{
                  padding: "24px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-light)",
                  backgroundColor: "var(--bg-surface)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.2s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--text-muted)",
                      }}
                    >
                      <TypeIcon size={14} />
                      <span>{rec.formatLabel}</span>
                    </div>

                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "var(--radius-full)",
                        backgroundColor: "#EEF2FF",
                        color: "var(--brand-primary)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Sparkles size={12} />
                      Recommended
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      margin: "0 0 8px 0",
                      lineHeight: 1.35,
                    }}
                  >
                    {rec.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                      margin: "0 0 16px 0",
                    }}
                  >
                    {rec.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontSize: 12,
                      color: "var(--text-muted)",
                      marginBottom: 14,
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Clock size={13} />
                      {rec.duration}
                    </span>
                    <span>•</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: 600 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--brand-primary)" }} />
                      {rec.subject}
                    </span>
                    <span>•</span>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "var(--radius-sm)",
                        backgroundColor: rec.difficultyBg,
                        color: rec.difficultyColor,
                        fontWeight: 700,
                        fontSize: 11,
                      }}
                    >
                      {rec.difficulty}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                    {rec.tags.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: 11,
                          fontFamily: "var(--font-mono)",
                          padding: "2px 8px",
                          borderRadius: "var(--radius-sm)",
                          backgroundColor: "var(--bg-canvas)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border-light)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => handleStartRecommendation(rec)}
                    className="btn btn-primary"
                    style={{
                      flex: 1,
                      padding: "11px 0",
                      fontSize: 14,
                      fontWeight: 700,
                      borderRadius: "var(--radius-md)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <BookOpen size={16} />
                    <span>Start Lesson</span>
                  </button>

                  <button
                    onClick={() => onNavigateTo("practice")}
                    className="btn btn-secondary"
                    style={{
                      padding: "11px 16px",
                      fontSize: 13,
                      fontWeight: 700,
                      borderRadius: "var(--radius-md)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                    title="Take targeted measurement quiz on this topic"
                  >
                    <Target size={15} />
                    <span>Quiz</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LeetCode Streak Preview Strip & Daily Goal */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        {/* LeetCode Heatmap Strip */}
        <div
          className="card"
          style={{
            padding: "22px 24px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-light)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Flame size={20} color="#D97706" />
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                Learning Streak: {currentStreak} Days
              </h3>
            </div>
            <button
              onClick={onOpenStreakModal}
              className="btn-ghost"
              style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-primary)" }}
            >
              View 84-Day Grid →
            </button>
          </div>

          <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 14px 0" }}>
            Consistency beats last-minute cramming. Study 15 minutes today to preserve your active streak shield!
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto", paddingBottom: 6 }}>
            {Array.from({ length: 14 }).map((_, i) => {
              const isActive = i >= 7;
              return (
                <div
                  key={i}
                  title={`Day ${i + 1}: ${isActive ? "Completed" : "Rest"}`}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 4,
                    backgroundColor: isActive ? "#10B981" : "var(--border-light)",
                    opacity: isActive ? 0.3 + (i - 7) * 0.1 : 1,
                    transition: "transform 0.15s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: 12, color: "var(--text-muted)" }}>
            <Shield size={14} color="#059669" />
            <span>Streak Freeze Active: 1 shield available</span>
          </div>
        </div>

        {/* Daily Goal & Focus Tracker */}
        <div
          className="card"
          style={{
            padding: "22px 24px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-light)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Target size={20} color="var(--brand-primary)" />
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                Today's Learning Goal
              </h3>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--brand-primary)" }}>
              20 / 30 mins
            </span>
          </div>

          <div
            style={{
              width: "100%",
              height: 10,
              backgroundColor: "var(--border-light)",
              borderRadius: "var(--radius-full)",
              overflow: "hidden",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: "67%",
                height: "100%",
                backgroundColor: "var(--brand-primary)",
                borderRadius: "var(--radius-full)",
              }}
            />
          </div>

          <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 16px 0" }}>
            10 minutes remaining to reach today's target in {activeSubject?.name || activeSubjectName}. Complete any lesson or topic quiz above!
          </p>

          <button
            onClick={() => onNavigateTo("practice")}
            className="btn btn-secondary"
            style={{ width: "100%", padding: "9px 0", fontSize: 13, fontWeight: 700 }}
          >
            <span>Open Topic Quiz & Measure</span>
          </button>
        </div>
      </div>
    </div>
  );
}
