import React from "react";
import { Flame, Star, ChevronDown, Layers } from "lucide-react";
import MiloCharacter from "./MiloCharacter";

export default function Header({
  profile,
  progress,
  onOpenTutor,
  onOpenSubjectDashboard,
  onOpenStreakModal,
}) {
  const grade = profile?.grade || "Class 12";
  const board = profile?.board || "CBSE";
  const subject = profile?.subject || "Physics";
  const topic = profile?.topic || "Current Electricity";

  const masteredCount = progress?.masteredCount ?? 0;
  const totalConcepts = progress?.totalConcepts ?? 8;
  const streak = progress?.streak ?? 5;

  return (
    <header
      style={{
        backgroundColor: "var(--bg-surface)",
        borderBottom: "1px solid var(--border-light)",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Current Academic Context & Subject Dashboard Button */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <button
          onClick={onOpenSubjectDashboard}
          title="Click to switch subject or topic without losing progress"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            backgroundColor: "var(--brand-primary-tint)",
            border: "1px solid var(--brand-primary-border)",
            borderRadius: "var(--radius-full)",
            cursor: "pointer",
            transition: "all 0.15s ease",
            textAlign: "left",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#E0E7FF";
            e.currentTarget.style.borderColor = "var(--brand-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--brand-primary-tint)";
            e.currentTarget.style.borderColor = "var(--brand-primary-border)";
          }}
        >
          <Layers size={15} color="var(--brand-primary)" />
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--brand-primary)" }}>
            {grade} • {subject}
          </span>
          <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 600 }}>
            • {topic}
          </span>
          <ChevronDown size={14} color="var(--brand-primary)" />
        </button>
      </div>

      {/* Verified Achievement Stats & Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* LeetCode-Style Streak Pill Button */}
        <button
          onClick={onOpenStreakModal}
          title="View LeetCode-style activity matrix & streak tracking"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            backgroundColor: "#FEF3C7",
            border: "1px solid #FDE68A",
            borderRadius: "var(--radius-full)",
            fontSize: 13,
            fontWeight: 700,
            color: "#92400E",
            cursor: "pointer",
            transition: "transform 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Flame size={16} color="#D97706" />
          <span>{streak} Days Streak</span>
        </button>

        {/* Mastery Pill */}
        <div
          title="Demonstrated concept mastery from diagnostics & quizzes"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            backgroundColor: masteredCount > 0 ? "var(--success-bg)" : "var(--bg-surface-secondary)",
            border: "1px solid",
            borderColor: masteredCount > 0 ? "var(--success-border)" : "var(--border-light)",
            borderRadius: "var(--radius-full)",
            fontSize: 13,
            fontWeight: 700,
            color: masteredCount > 0 ? "var(--success-text)" : "var(--text-muted)",
          }}
        >
          <Star size={16} color={masteredCount > 0 ? "#059669" : "#94A3B8"} />
          <span>
            {masteredCount}/{totalConcepts} Mastered
          </span>
        </div>

        {/* AI Tutor Button */}
        <button
          onClick={onOpenTutor}
          className="btn btn-primary"
          style={{
            padding: "8px 14px",
            fontSize: 13,
            borderRadius: "var(--radius-full)",
          }}
        >
          <MiloCharacter expression="welcome" size={24} />
          <span>Ask Milo</span>
        </button>
      </div>
    </header>
  );
}
