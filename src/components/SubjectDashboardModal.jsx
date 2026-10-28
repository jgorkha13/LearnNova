import React, { useState, useEffect } from "react";
import { X, Check, BookOpen, Atom, FlaskConical, Binary, ChevronRight, Award, Cpu, Code2, Network, Database, Layers, GraduationCap, Target } from "lucide-react";
import LumiCharacter from "./LumiCharacter";
import { fetchDomains, fetchDomainCurriculum, switchTopic } from "../services/api";

export default function SubjectDashboardModal({ isOpen, onClose, onTopicSwitched }) {
  const [loading, setLoading] = useState(true);
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("cse_1st_year");
  const [curriculumData, setCurriculumData] = useState(null);
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadInitial();
    }
  }, [isOpen]);

  const loadInitial = async () => {
    setLoading(true);
    try {
      const domRes = await fetchDomains().catch(() => null);
      if (domRes?.domains) {
        setDomains(domRes.domains);
        const domId = domRes.activeDomain || "cse_1st_year";
        setSelectedDomain(domId);
        setCurrentTopicId(domRes.currentTopicId);
        const curRes = await fetchDomainCurriculum(domId);
        setCurriculumData(curRes);
      }
    } catch (err) {
      console.error("Failed to load dashboard domains:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDomainChange = async (domId) => {
    setSelectedDomain(domId);
    setLoading(true);
    try {
      const curRes = await fetchDomainCurriculum(domId);
      setCurriculumData(curRes);
    } catch (err) {
      console.error("Failed to load domain curriculum:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleSelectTopic = async (sub, topic) => {
    setIsSwitching(true);
    try {
      const res = await switchTopic({
        domain: selectedDomain,
        subject: sub.name,
        topic: topic.name,
        topicId: topic.id,
        grade: curriculumData?.title || selectedDomain,
      });
      setCurrentTopicId(topic.id);
      if (onTopicSwitched) {
        onTopicSwitched(res.profile);
      }
      onClose();
    } catch (err) {
      console.error("Failed to switch topic:", err);
    } finally {
      setIsSwitching(false);
    }
  };

  const getSubjectIcon = (iconName) => {
    switch (iconName) {
      case "Network":
        return <Network size={20} color="#2563EB" />;
      case "Database":
        return <Database size={20} color="#059669" />;
      case "Cpu":
        return <Cpu size={20} color="#D97706" />;
      case "Code2":
        return <Code2 size={20} color="#2563EB" />;
      case "Layers":
        return <Layers size={20} color="#4F46E5" />;
      case "Atom":
        return <Atom size={20} color="#4F46E5" />;
      case "FlaskConical":
        return <FlaskConical size={20} color="#059669" />;
      case "Binary":
        return <Binary size={20} color="#7C3AED" />;
      default:
        return <BookOpen size={20} color="#4F46E5" />;
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.5)",
        backdropFilter: "blur(5px)",
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
          maxWidth: 720,
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
            <LumiCharacter expression="curious" size={42} />
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                Subject & Chapter Navigator
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

        {/* Domain Tabs Strip */}
        <div
          style={{
            display: "flex",
            gap: 8,
            padding: "12px 24px",
            backgroundColor: "var(--bg-canvas)",
            borderBottom: "1px solid var(--border-light)",
            overflowX: "auto",
          }}
        >
          {[
            { id: "class_11", label: "Class 11th" },
            { id: "cse_1st_year", label: "CSE 1st Year" },
            { id: "cse_3rd_year", label: "CSE 3rd Year" },
            { id: "class_12", label: "Class 12th" },
            { id: "entrance", label: "Entrance (JEE/NEET)" },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => handleDomainChange(d.id)}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                fontSize: 12,
                fontWeight: selectedDomain === d.id ? 700 : 500,
                backgroundColor: selectedDomain === d.id ? "var(--brand-primary)" : "var(--bg-surface)",
                color: selectedDomain === d.id ? "#fff" : "var(--text-secondary)",
                border: selectedDomain === d.id ? "1px solid var(--brand-primary)" : "1px solid var(--border-light)",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <LumiCharacter expression="thinking" size={64} floating={true} />
              <p style={{ marginTop: 12, color: "var(--text-secondary)" }}>Loading subjects & topics...</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {curriculumData?.subjects?.map((sub) => (
                <div key={sub.id}>
                  {/* Subject Title */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    {getSubjectIcon(sub.icon)}
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                      {sub.name}
                    </h4>
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        marginLeft: "auto",
                        backgroundColor: "var(--bg-canvas)",
                        padding: "2px 8px",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      {sub.totalTopics} Topics
                    </span>
                  </div>

                  {/* Units & Topics Grid */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {sub.units?.map((unit) => (
                      <div key={unit.id} style={{ marginBottom: 6 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6 }}>
                          Unit {unit.unitNumber}: {unit.title}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          {unit.topics?.map((top) => {
                            const isCurrent = top.id === currentTopicId;
                            const report = top.trackReport || {};
                            const isCompleted = report.status === "completed" || report.percent === 100;

                            return (
                              <div
                                key={top.id}
                                onClick={() => handleSelectTopic(sub, top)}
                                className={`card-interactive ${isCurrent ? "selected" : ""}`}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  padding: "10px 14px",
                                  borderRadius: "var(--radius-md)",
                                  border: `1.5px solid ${isCurrent ? "var(--brand-primary)" : "var(--border-light)"}`,
                                  backgroundColor: isCurrent ? "var(--brand-primary-tint)" : "var(--bg-surface)",
                                  cursor: "pointer",
                                }}
                              >
                                <div>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <strong style={{ fontSize: 14, color: isCurrent ? "var(--brand-primary)" : "var(--text-primary)" }}>
                                      {top.name}
                                    </strong>
                                    {isCurrent && (
                                      <span
                                        style={{
                                          fontSize: 10,
                                          fontWeight: 700,
                                          backgroundColor: "var(--brand-primary)",
                                          color: "#fff",
                                          padding: "1px 6px",
                                          borderRadius: "var(--radius-full)",
                                        }}
                                      >
                                        Active
                                      </span>
                                    )}
                                    {isCompleted && (
                                      <span
                                        style={{
                                          fontSize: 10,
                                          fontWeight: 700,
                                          backgroundColor: "#ECFDF5",
                                          color: "#059669",
                                          padding: "1px 6px",
                                          borderRadius: "var(--radius-full)",
                                        }}
                                      >
                                        ✓ Done
                                      </span>
                                    )}
                                  </div>
                                  <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>
                                    {top.duration || "15m"} • {top.difficulty || "Beginner"} • Mastery: {report.mastery || "Untested"} ({report.percent || 0}%)
                                  </div>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <div
                                    style={{
                                      width: 28,
                                      height: 28,
                                      borderRadius: "50%",
                                      backgroundColor: isCurrent ? "var(--brand-primary)" : "var(--bg-surface-secondary)",
                                      color: isCurrent ? "#fff" : "var(--text-muted)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {isCurrent ? <Check size={16} /> : <ChevronRight size={16} />}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 24px",
            borderTop: "1px solid var(--border-light)",
            backgroundColor: "var(--bg-canvas)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            Tip: All topics start lessons directly without diagnostic test requirements.
          </span>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: "8px 16px", fontSize: 13 }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
