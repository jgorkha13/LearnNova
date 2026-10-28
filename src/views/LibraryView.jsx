import React, { useState, useEffect } from "react";
import {
  BookOpen,
  GraduationCap,
  Layers,
  ChevronDown,
  ChevronRight,
  Play,
  CheckCircle2,
  Clock,
  Sparkles,
  Bot,
  Search,
  Filter,
  Flame,
  Check,
  TrendingUp,
  Cpu,
  Code2,
  Network,
  Database,
  Binary,
  Atom,
  FlaskConical,
  Zap,
  Target,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import LumiCharacter from "../components/LumiCharacter";
import { fetchDomains, fetchDomainCurriculum, switchTopic, updateTopicProgress } from "../services/api";

export default function LibraryView({
  profile,
  onStartLesson,
  onOpenTutor,
  onTopicSwitched,
}) {
  const [loading, setLoading] = useState(true);
  const [domains, setDomains] = useState([]);
  const [selectedDomainId, setSelectedDomainId] = useState(profile?.domain || "cse_3rd_year");
  const [curriculumData, setCurriculumData] = useState(null);
  const [expandedUnits, setExpandedUnits] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [switchingTopicId, setSwitchingTopicId] = useState(null);

  // Load domain data
  useEffect(() => {
    async function loadDomainsData() {
      try {
        const d = await fetchDomains().catch(() => null);
        if (d?.domains) {
          setDomains(d.domains);
          const initialDomain = profile?.domain || d.activeDomain || "cse_3rd_year";
          setSelectedDomainId(initialDomain);
          loadDomainDetails(initialDomain);
        } else {
          loadDomainDetails("cse_3rd_year");
        }
      } catch (err) {
        console.warn("Domain load error:", err);
        loadDomainDetails("cse_3rd_year");
      }
    }
    loadDomainsData();
  }, [profile?.domain]);

  const loadDomainDetails = async (domId) => {
    setLoading(true);
    try {
      const details = await fetchDomainCurriculum(domId);
      setCurriculumData(details);

      // Default expand the first 2 units of each subject
      const initialExpanded = {};
      details.subjects?.forEach((sub) => {
        sub.units?.slice(0, 2).forEach((u) => {
          initialExpanded[u.id] = true;
        });
      });
      setExpandedUnits(initialExpanded);
    } catch (err) {
      console.error("Failed to load curriculum details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDomainChange = (domId) => {
    setSelectedDomainId(domId);
    loadDomainDetails(domId);
  };

  const toggleUnit = (unitId) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

  const handleSetActive = async (subject, topic) => {
    setSwitchingTopicId(topic.id);
    try {
      const res = await switchTopic({
        domain: selectedDomainId,
        subject: subject.name,
        topic: topic.name,
        topicId: topic.id,
        grade: curriculumData?.title || selectedDomainId,
      });
      if (onTopicSwitched) {
        onTopicSwitched(res.profile);
      }
    } catch (err) {
      console.error("Switch topic failed:", err);
    } finally {
      setSwitchingTopicId(null);
    }
  };

  const handleStartDirectLesson = async (subject, topic) => {
    // Make sure active topic is set
    handleSetActive(subject, topic);
    // Open lesson modal directly
    if (onStartLesson) {
      onStartLesson(topic.lessonId || `lesson_${topic.id}`);
    }
  };

  const getSubjectIcon = (iconName) => {
    switch (iconName) {
      case "Network":
        return <Network size={22} color="#2563EB" />;
      case "Database":
        return <Database size={22} color="#059669" />;
      case "Cpu":
        return <Cpu size={22} color="#D97706" />;
      case "Code2":
        return <Code2 size={22} color="#2563EB" />;
      case "Layers":
        return <Layers size={22} color="#4F46E5" />;
      case "Atom":
        return <Atom size={22} color="#4F46E5" />;
      case "FlaskConical":
        return <FlaskConical size={22} color="#059669" />;
      case "Binary":
        return <Binary size={22} color="#7C3AED" />;
      case "Zap":
        return <Zap size={22} color="#059669" />;
      default:
        return <BookOpen size={22} color="#4F46E5" />;
    }
  };

  return (
    <div className="page-container" style={{ paddingBottom: 60 }}>
      {/* Top Header Banner */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 20,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--brand-primary)",
                backgroundColor: "var(--brand-primary-tint)",
                padding: "3px 10px",
                borderRadius: "var(--radius-full)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Hierarchical Curriculum & Track Reports
            </span>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>• Start Lessons Directly</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
            Content Library & Syllabus Explorer
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "6px 0 0 0" }}>
            Explore every subject, unit, and topic across school and engineering domains. View live track reports and jump straight into lessons without prerequisite quizzes.
          </p>
        </div>

        {/* Quick Lumi Mascot Chip */}
        <div
          onClick={() => onOpenTutor && onOpenTutor("Need an overview of the syllabus")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 16px",
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
          title="Click to ask Lumi about this curriculum"
        >
          <LumiCharacter expression="welcome" size={40} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>
              Ask Lumi Tutor
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
              Direct lesson explanations & analogies
            </div>
          </div>
        </div>
      </div>

      {/* Domain / Academic Level Selector Pills */}
      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          paddingBottom: 8,
          marginBottom: 24,
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        {[
          { id: "class_11", label: "Class 11th (Senior Sec)", badge: "CBSE / State", icon: GraduationCap },
          { id: "cse_1st_year", label: "B.Tech CSE - 1st Year", badge: "Engineering Freshman", icon: Code2 },
          { id: "cse_3rd_year", label: "B.Tech CSE - 3rd Year", badge: "Core Subjects", icon: Cpu },
          { id: "class_12", label: "Class 12th (Boards)", badge: "Grade 12", icon: BookOpen },
          { id: "entrance", label: "Entrance (JEE / NEET)", badge: "Competitive", icon: Target },
        ].map((dom) => {
          const isSelected = selectedDomainId === dom.id;
          const Icon = dom.icon;
          return (
            <button
              key={dom.id}
              onClick={() => handleDomainChange(dom.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 18px",
                borderRadius: "var(--radius-md)",
                backgroundColor: isSelected ? "var(--brand-primary)" : "var(--bg-surface)",
                color: isSelected ? "#FFFFFF" : "var(--text-primary)",
                border: isSelected ? "1px solid var(--brand-primary)" : "1px solid var(--border-light)",
                cursor: "pointer",
                fontWeight: isSelected ? 700 : 500,
                fontSize: 14,
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
                boxShadow: isSelected ? "0 2px 6px rgba(37,99,235,0.25)" : "none",
              }}
            >
              <Icon size={16} />
              <span>{dom.label}</span>
              <span
                style={{
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: isSelected ? "rgba(255,255,255,0.2)" : "var(--bg-surface-secondary)",
                  color: isSelected ? "#FFFFFF" : "var(--text-muted)",
                  fontWeight: 600,
                }}
              >
                {dom.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: 260, maxWidth: 420 }}>
          <Search
            size={16}
            color="var(--text-muted)"
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            placeholder="Search topics, algorithms, or concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 12px 9px 36px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
              backgroundColor: "var(--bg-surface)",
              fontSize: 14,
              color: "var(--text-primary)",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>Status:</span>
          {["all", "completed", "in_progress", "not_started"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
                fontSize: 12,
                fontWeight: statusFilter === st ? 700 : 500,
                backgroundColor: statusFilter === st ? "var(--brand-primary-tint)" : "transparent",
                color: statusFilter === st ? "var(--brand-primary)" : "var(--text-secondary)",
                border: "1px solid",
                borderColor: statusFilter === st ? "var(--brand-primary)" : "var(--border-light)",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {st.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <LumiCharacter expression="thinking" size={80} floating={true} />
          <p style={{ marginTop: 16, color: "var(--text-secondary)", fontSize: 15 }}>
            Loading curriculum units and live track reports...
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {curriculumData?.subjects?.map((subject) => {
            const isSubjectActive = profile?.subject === subject.name;

            // Filter units/topics by search query and status filter
            const filteredUnits = subject.units
              ?.map((unit) => {
                const topics = unit.topics?.filter((top) => {
                  const matchQuery =
                    !searchQuery ||
                    top.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    top.concepts?.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

                  const matchStatus =
                    statusFilter === "all" ||
                    (top.trackReport?.status || "not_started") === statusFilter;

                  return matchQuery && matchStatus;
                });

                return {
                  ...unit,
                  topics,
                };
              })
              .filter((u) => u.topics && u.topics.length > 0);

            if (searchQuery && filteredUnits.length === 0) {
              return null;
            }

            return (
              <div
                key={subject.id}
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderRadius: "var(--radius-lg)",
                  border: isSubjectActive ? "2px solid var(--brand-primary)" : "1px solid var(--border-light)",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                }}
              >
                {/* Subject Header Banner */}
                <div
                  style={{
                    padding: "20px 24px",
                    backgroundColor: isSubjectActive ? "rgba(37, 99, 235, 0.04)" : "var(--bg-canvas)",
                    borderBottom: "1px solid var(--border-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "var(--radius-md)",
                        backgroundColor: subject.bgTint || "#EEF2FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {getSubjectIcon(subject.icon)}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: "var(--radius-full)",
                            backgroundColor: subject.bgTint || "#EEF2FF",
                            color: subject.color || "#4F46E5",
                          }}
                        >
                          {subject.code}
                        </span>
                        <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                          {subject.name}
                        </h2>
                        {isSubjectActive && (
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: "#059669",
                              backgroundColor: "#ECFDF5",
                              padding: "2px 8px",
                              borderRadius: "var(--radius-full)",
                            }}
                          >
                            ● Active Subject
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
                        {subject.description}
                      </p>
                    </div>
                  </div>

                  {/* Subject Mastery Track Stats */}
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>
                        Track Progress: {subject.completedTopics} / {subject.totalTopics} Topics
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                        <div
                          style={{
                            width: 120,
                            height: 7,
                            backgroundColor: "var(--border-light)",
                            borderRadius: "var(--radius-full)",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${subject.overallMastery || 0}%`,
                              height: "100%",
                              backgroundColor: subject.color || "var(--brand-primary)",
                              borderRadius: "var(--radius-full)",
                              transition: "width 0.3s ease",
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 800, color: "var(--text-primary)" }}>
                          {subject.overallMastery || 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Units & Topics List */}
                <div style={{ padding: "16px 20px" }}>
                  {filteredUnits?.map((unit) => {
                    const isExpanded = expandedUnits[unit.id] ?? false;

                    return (
                      <div
                        key={unit.id}
                        style={{
                          marginBottom: 14,
                          border: "1px solid var(--border-light)",
                          borderRadius: "var(--radius-md)",
                          backgroundColor: "var(--bg-surface)",
                          overflow: "hidden",
                        }}
                      >
                        {/* Unit Accordion Bar */}
                        <div
                          onClick={() => toggleUnit(unit.id)}
                          style={{
                            padding: "14px 18px",
                            backgroundColor: "var(--bg-canvas)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 12,
                            cursor: "pointer",
                            userSelect: "none",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 800,
                                backgroundColor: "var(--bg-surface)",
                                color: "var(--brand-primary)",
                                border: "1px solid var(--border-light)",
                                padding: "3px 8px",
                                borderRadius: "var(--radius-sm)",
                              }}
                            >
                              UNIT {unit.unitNumber}
                            </span>
                            <div>
                              <strong style={{ fontSize: 15, color: "var(--text-primary)" }}>
                                {unit.title}
                              </strong>
                              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                                {unit.description}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <span
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: unit.percent === 100 ? "#059669" : "var(--text-secondary)",
                                backgroundColor: unit.percent === 100 ? "#ECFDF5" : "var(--bg-surface)",
                                padding: "3px 10px",
                                borderRadius: "var(--radius-full)",
                                border: "1px solid var(--border-light)",
                              }}
                            >
                              {unit.completedTopics || 0}/{unit.totalTopics || unit.topics?.length} Done ({unit.percent || 0}%)
                            </span>
                            {isExpanded ? <ChevronDown size={18} color="var(--text-muted)" /> : <ChevronRight size={18} color="var(--text-muted)" />}
                          </div>
                        </div>

                        {/* Topics Inside Unit */}
                        {isExpanded && (
                          <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
                            {unit.topics?.map((topic) => {
                              const report = topic.trackReport || {};
                              const isCompleted = report.status === "completed" || report.percent === 100;
                              const isInProgress = report.status === "in_progress" || (report.percent > 0 && report.percent < 100);
                              const isCurrent = topic.isCurrent || profile?.topicId === topic.id;

                              return (
                                <div
                                  key={topic.id}
                                  style={{
                                    padding: "16px",
                                    borderRadius: "var(--radius-md)",
                                    border: isCurrent ? "1.5px solid var(--brand-primary)" : "1px solid var(--border-light)",
                                    backgroundColor: isCurrent ? "rgba(37, 99, 235, 0.02)" : "var(--bg-surface)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 16,
                                    flexWrap: "wrap",
                                    transition: "all 0.15s ease",
                                  }}
                                  className="topic-card card-interactive"
                                >
                                  {/* Left Details */}
                                  <div style={{ flex: 1, minWidth: 260 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                      {/* Status Badge */}
                                      {isCompleted ? (
                                        <span
                                          style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 4,
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: "#059669",
                                            backgroundColor: "#ECFDF5",
                                            padding: "2px 8px",
                                            borderRadius: "var(--radius-full)",
                                          }}
                                        >
                                          <CheckCircle2 size={12} />
                                          Completed
                                        </span>
                                      ) : isInProgress ? (
                                        <span
                                          style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 4,
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: "#D97706",
                                            backgroundColor: "#FEF3C7",
                                            padding: "2px 8px",
                                            borderRadius: "var(--radius-full)",
                                          }}
                                        >
                                          <Clock size={12} />
                                          In Progress ({report.percent || 50}%)
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            fontSize: 11,
                                            fontWeight: 600,
                                            color: "var(--text-muted)",
                                            backgroundColor: "var(--bg-surface-secondary)",
                                            padding: "2px 8px",
                                            borderRadius: "var(--radius-full)",
                                          }}
                                        >
                                          Not Started
                                        </span>
                                      )}

                                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>• {topic.duration || "15m"}</span>
                                      <span
                                        style={{
                                          fontSize: 11,
                                          fontWeight: 600,
                                          padding: "1px 6px",
                                          borderRadius: "var(--radius-sm)",
                                          backgroundColor: topic.difficulty === "Advanced" ? "#FEE2E2" : topic.difficulty === "Intermediate" ? "#FEF3C7" : "#ECFDF5",
                                          color: topic.difficulty === "Advanced" ? "#DC2626" : topic.difficulty === "Intermediate" ? "#B45309" : "#059669",
                                        }}
                                      >
                                        {topic.difficulty || "Beginner"}
                                      </span>

                                      {isCurrent && (
                                        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--brand-primary)" }}>
                                          ★ Current Learning Focus
                                        </span>
                                      )}
                                    </div>

                                    <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 6px 0" }}>
                                      {topic.name}
                                    </h4>

                                    {/* Concepts Tags */}
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

                                  {/* Right Track Report Metrics & Actions */}
                                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                    {/* Detailed Track Report Pill */}
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-end",
                                        gap: 2,
                                        minWidth: 100,
                                      }}
                                    >
                                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                                        Time Spent: <strong>{report.timeSpent || "0m"}</strong>
                                      </div>
                                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                                        Mastery: <strong style={{ color: isCompleted ? "#059669" : isInProgress ? "#D97706" : "var(--text-muted)" }}>{report.mastery || "Untested"}</strong>
                                      </div>
                                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                                        Accuracy: <strong>{report.accuracy || "—"}</strong>
                                      </div>
                                    </div>

                                    {/* Action Buttons: Start Lesson Directly (NO QUIZZES!) */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                      <button
                                        onClick={() => handleStartDirectLesson(subject, topic)}
                                        className="btn btn-primary"
                                        style={{
                                          padding: "8px 16px",
                                          fontSize: 13,
                                          fontWeight: 700,
                                          borderRadius: "var(--radius-md)",
                                          display: "inline-flex",
                                          alignItems: "center",
                                          gap: 6,
                                          whiteSpace: "nowrap",
                                        }}
                                        title="Start interactive lesson directly without taking any quiz"
                                      >
                                        <Play size={14} fill="currentColor" />
                                        <span>Start Lesson</span>
                                      </button>

                                      <button
                                        onClick={() => onOpenTutor && onOpenTutor(`Explain ${topic.name} in simple terms with worked examples`)}
                                        className="btn btn-secondary"
                                        style={{
                                          padding: "8px 12px",
                                          fontSize: 13,
                                          borderRadius: "var(--radius-md)",
                                          display: "inline-flex",
                                          alignItems: "center",
                                          gap: 6,
                                        }}
                                        title="Ask Lumi AI Tutor about this topic"
                                      >
                                        <Bot size={14} />
                                        <span>Ask Lumi</span>
                                      </button>
                                    </div>
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
            );
          })}
        </div>
      )}
    </div>
  );
}
