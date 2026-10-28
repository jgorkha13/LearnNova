import React from "react";
import { Flame, Star, MessageSquareCode, Award } from "lucide-react";
import MiloCharacter from "./MiloCharacter";

export default function Header({ profile, progress, onOpenTutor, onStartDiagnostic }) {
  const grade = profile?.grade || "Class 12";
  const board = profile?.board || "CBSE";
  const subject = profile?.subject || "Physics";
  const topic = profile?.topic || "Current Electricity";

  const masteredCount = progress?.masteredCount ?? 0;
  const totalConcepts = progress?.totalConcepts ?? 8;
  const streak = progress?.streak ?? 0;

  return (
    <header
      style={{
        backgroundColor: "var(--bg-surface)",
        borderBottom: "1px solid var(--border-light)",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Current Academic Context Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <div
          style={{
            padding: "6px 12px",
            backgroundColor: "var(--brand-primary-tint)",
            border: "1px solid var(--brand-primary-border)",
            borderRadius: "var(--radius-full)",
            fontSize: 13,
            fontWeight: 700,
            color: "var(--brand-primary)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            whiteSpace: "nowrap",
          }}
        >
          <span>{grade}</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span>{board}</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span>{subject}</span>
        </div>

        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text-secondary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {topic}
        </div>
      </div>

      {/* Verified Achievement Stats & Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Streak Pill */}
        <div
          title="Verified consecutive learning sessions"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            backgroundColor: streak > 0 ? "#FEF3C7" : "var(--bg-surface-secondary)",
            border: "1px solid",
            borderColor: streak > 0 ? "#FDE68A" : "var(--border-light)",
            borderRadius: "var(--radius-full)",
            fontSize: 13,
            fontWeight: 700,
            color: streak > 0 ? "#92400E" : "var(--text-muted)",
          }}
        >
          <Flame size={16} color={streak > 0 ? "#D97706" : "#94A3B8"} />
          <span>{streak} {streak === 1 ? "Session" : "Sessions"}</span>
        </div>

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
          <MiloCharacter expression="welcoming" size={24} />
          <span>Ask Milo</span>
        </button>
      </div>
    </header>
  );
}
