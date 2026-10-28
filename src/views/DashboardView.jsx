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
} from "lucide-react";
import LumiCharacter from "../components/LumiCharacter";
import { fetchProgress, fetchStreakActivity, fetchTopicsDashboard } from "../services/api";

export default function DashboardView({
  profile,
  onStartLesson,
  onOpenTutor,
  onOpenStreakModal,
  onOpenSubjectDashboard,
  onNavigateTo,
  onStartDiagnostic,
}) {
  const [progressData, setProgressData] = useState(null);
  const [streakData, setStreakData] = useState(null);
  const [smartMode, setSmartMode] = useState(true);
  const [selectedTagFilter, setSelectedTagFilter] = useState("all");

  const studentName = profile?.name || "Alex";
  const activeSubject = profile?.subject || "Physics";
  const activeTopic = profile?.topic || "Current Electricity";
  const activeExam = profile?.exam || profile?.grade || "Class 12 Boards / JEE";

  useEffect(() => {
    async function loadData() {
      try {
        const [prog, streak] = await Promise.all([
          fetchProgress().catch(() => null),
          fetchStreakActivity().catch(() => null),
        ]);
        if (prog) setProgressData(prog);
        if (streak) setStreakData(streak);
      } catch (err) {
        console.warn("Could not load dashboard auxiliary data:", err);
      }
    }
    loadData();
  }, [profile?.topicId]);

  // Derived metrics
  const completedLessons = progressData?.overallProgress?.completedNodes || 4;
  const inProgressCount = 2;
  const studyHours = "3.5h";
  const averageProgress = progressData?.overallProgress?.percentage || 68;
  const currentStreak = streakData?.currentStreak || 7;

  // AI Recommended Lessons/Activities matching the user screenshot layout
  const recommendations = [
    {
      id: "lesson_electric_current_drift",
      type: "Article",
      typeIcon: FileText,
      formatLabel: "Interactive Article",
      recommended: true,
      title: "Electric Current & Drift Velocity",
      description: "Master microscopic electron throughput, relaxation time, and why electrons drift slower than a snail.",
      duration: "15m",
      subject: "Physics",
      subjectIcon: Atom,
      difficulty: "Beginner",
      difficultyColor: "#059669",
      difficultyBg: "#ECFDF5",
      tags: ["#drift-velocity", "#circuits", "#ohms-law"],
      topicId: "current_electricity",
      conceptId: "electric_current_drift",
    },
    {
      id: "lesson_ohms_law",
      type: "Interactive",
      typeIcon: Zap,
      formatLabel: "Targeted Practice",
      recommended: true,
      title: "Ohm's Law & Temperature Factors",
      description: "Derive R(T) = R₀[1 + αΔT], understand thermal lattice vibrations, and avoid positive vs negative α traps.",
      duration: "20m",
      subject: "Physics",
      subjectIcon: Atom,
      difficulty: "Intermediate",
      difficultyColor: "#D97706",
      difficultyBg: "#FEF3C7",
      tags: ["#resistance", "#temperature-coefficient", "#jee-core"],
      topicId: "current_electricity",
      conceptId: "temp_dependence_resistance",
    },
    {
      id: "lesson_galvanic_cells",
      type: "Video",
      typeIcon: Video,
      formatLabel: "Video & Analogy",
      recommended: true,
      title: "Galvanic Cells & Nernst Equation",
      description: "Understand spontaneous redox half-reactions, salt bridges, and EMF calculation under non-standard conditions.",
      duration: "25m",
      subject: "Chemistry",
      subjectIcon: FlaskConical,
      difficulty: "Intermediate",
      difficultyColor: "#D97706",
      difficultyBg: "#FEF3C7",
      tags: ["#redox", "#galvanic-cell", "#nernst"],
      topicId: "electrochemistry",
      conceptId: "galvanic_cells_emf",
    },
    {
      id: "lesson_calculus_integrals",
      type: "Interactive",
      typeIcon: Sparkles,
      formatLabel: "Numerical Workshop",
      recommended: true,
      title: "Definite Integrals & Area under Curves",
      description: "Connect Riemann slice sums to definite limits, substitution rules, and integration by parts (ILATE).",
      duration: "20m",
      subject: "Mathematics",
      subjectIcon: BookOpen,
      difficulty: "Intermediate",
      difficultyColor: "#D97706",
      difficultyBg: "#FEF3C7",
      tags: ["#calculus", "#definite-integrals", "#ilate"],
      topicId: "calculus_integrals",
      conceptId: "definite_integrals_area",
    },
    {
      id: "lesson_binary_search_trees",
      type: "Interactive",
      typeIcon: Code2,
      formatLabel: "Interactive Code",
      recommended: true,
      title: "Binary Search Trees & Traversal",
      description: "Master BST invariants, left < root < right recursive logic, and O(log N) lookup guarantees.",
      duration: "25m",
      subject: "Computer Science",
      subjectIcon: Binary,
      difficulty: "Beginner",
      difficultyColor: "#059669",
      difficultyBg: "#ECFDF5",
      tags: ["#trees", "#inorder", "#dsa-algorithms"],
      topicId: "binary_search_trees",
      conceptId: "bst_properties",
    },
  ];

  // Dynamic date string
  const todayStr = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const handleStartRecommendation = (rec) => {
    if (rec.topicId === profile?.topicId && rec.id) {
      if (onStartLesson) {
        onStartLesson(rec.id);
      } else {
        onNavigateTo("learn");
      }
    } else {
      // Switch topic or open lesson
      if (onStartLesson) {
        onStartLesson(rec.id);
      } else {
        onNavigateTo("learn");
      }
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
            {activeSubject}: {activeTopic}
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
          >
            <Layers size={16} color="var(--brand-primary)" />
            <span>Change Subject ({activeSubject})</span>
          </button>

          {onStartDiagnostic && (
            <button
              onClick={onStartDiagnostic}
              className="btn btn-primary"
              style={{
                padding: "7px 14px",
                fontSize: 13,
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Sparkles size={15} />
              <span>Diagnostic Assessment</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Welcome Headline (Exact layout as screenshot) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
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
            Ready to continue your learning journey in <strong style={{ color: "var(--text-primary)" }}>{activeTopic}</strong>?
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

      {/* 4 Top Metric Cards (Exact screenshot replica style) */}
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
              Completed Lessons
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
              {completedLessons}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
              Keep up the great work!
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#059669", marginTop: 4 }}>
              +12% from last week
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
              In Progress
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
              {inProgressCount}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
              Courses you're working on
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", marginTop: 4 }}>
              {activeSubject} & Chemistry
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
            <Clock size={22} />
          </div>
        </div>

        {/* Card 3: Total Study Time */}
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
              Total Study Time
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
              {studyHours}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
              Hours spent learning
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", marginTop: 4 }}>
              +8% from last week
            </div>
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#EFF6FF",
              color: "#2563EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrendingUp size={22} />
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
              Average Progress
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
              {averageProgress}%
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
              Across active concepts
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#7C3AED", marginTop: 4 }}>
              Target: 85% for exam
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

      {/* MORE INFORMATIVE: Concept Gap & Knowledge Health Matrix Strip */}
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <LumiCharacter expression="thinking" size={54} floating={true} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "var(--text-primary)" }}>
                Diagnostic Concept Matrix: {activeTopic}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "#FEF3C7",
                  color: "#92400E",
                }}
              >
                1 High-Priority Gap
              </span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
              Lumi detected friction in <strong>Temperature Dependence of Resistance</strong>. Repairing this unlocks 15+ Board & JEE questions.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => onOpenTutor(`I want to understand why metallic conductor resistance increases with temperature, while semiconductors have negative alpha.`)}
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
            <span>Targeted Practice</span>
          </button>
        </div>
      </div>

      {/* AI Recommendations for You Section (Exact layout as screenshot) */}
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
              AI Recommendations for You
            </h2>
          </div>

          <button
            onClick={() => onNavigateTo("learn")}
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
            <span>View All</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* 3-Column / 2-Column Responsive Card Grid (Matching Screenshot) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {recommendations.map((rec) => {
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
                  {/* Card Header Tag Row */}
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

                    {rec.recommended && (
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
                    )}
                  </div>

                  {/* Title & Description */}
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

                  {/* Meta Details Row */}
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

                  {/* Tag Chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                    {rec.tags.map((t) => (
                      <span
                        key={t}
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

                {/* Card CTA Button (Screenshot matching blue full width button) */}
                <button
                  onClick={() => handleStartRecommendation(rec)}
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    padding: "11px 0",
                    fontSize: 14,
                    fontWeight: 700,
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "0 2px 4px rgba(79, 70, 229, 0.25)",
                  }}
                >
                  <BookOpen size={16} />
                  <span>Start Learning</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* MORE INFORMATIVE: LeetCode Streak Preview Strip & Daily Goal Hub */}
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

          {/* Mini 14-Day Activity Row */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto", paddingBottom: 6 }}>
            {Array.from({ length: 14 }).map((_, i) => {
              const isActive = i >= 7; // Last 7 days active
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
            10 minutes remaining to reach today's target. Complete any recommended lesson above to hit 100%!
          </p>

          <button
            onClick={() => onNavigateTo("practice")}
            className="btn btn-secondary"
            style={{ width: "100%", padding: "9px 0", fontSize: 13, fontWeight: 700 }}
          >
            <span>Solve Quick Practice Question (+5 mins)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
