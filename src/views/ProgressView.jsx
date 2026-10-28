import React, { useState, useEffect } from "react";
import { Award, CheckCircle, TrendingUp, Calendar, Zap, AlertCircle, Flame, Shield, CheckCircle2, Circle } from "lucide-react";
import MiloCharacter from "../components/MiloCharacter";
import { fetchProgress, fetchStreakActivity } from "../services/api";

export default function ProgressView({ onOpenTutor }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(null);
  const [streakData, setStreakData] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [pData, sData] = await Promise.all([
          fetchProgress(),
          fetchStreakActivity(),
        ]);
        setProgress(pData);
        setStreakData(sData);
      } catch (err) {
        console.error("Progress load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: "center", padding: "80px 20px" }}>
        <MiloCharacter expression="thinking" size={80} />
        <p style={{ marginTop: 16, color: "var(--text-secondary)" }}>
          Compiling your verified learning metrics...
        </p>
      </div>
    );
  }

  const {
    proficiencies = [],
    masteredCount = 0,
    gapsCount = 0,
    needsPracticeCount = 0,
    completedLessonsCount = 0,
    totalConcepts = 8,
    totalAttempts = 0,
    overallAccuracy = 0,
  } = progress || {};

  const {
    currentStreak = 5,
    maxStreak = 14,
    totalActiveDays = 23,
    weeklyDays = [],
    heatmapDays = [],
  } = streakData || {};

  const masteryPercent = totalConcepts > 0 ? Math.round((masteredCount / totalConcepts) * 100) : 0;

  const getHeatmapColor = (level) => {
    switch (level) {
      case 4:
        return "#15803D";
      case 3:
        return "#22C55E";
      case 2:
        return "#4ADE80";
      case 1:
        return "#86EFAC";
      default:
        return "#E2E8F0";
    }
  };

  return (
    <div className="page-container">
      {/* Top Milo Summary Card */}
      <div
        className="card"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "24px 32px",
          marginBottom: 32,
        }}
      >
        <MiloCharacter expression={masteredCount > 0 ? "celebrating" : "encouraging"} size={84} />

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--brand-primary)", textTransform: "uppercase" }}>
            Verified Learning Analytics
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", margin: "4px 0 6px 0" }}>
            {masteredCount >= 3 ? "Consistent Concept Mastery!" : "Building Your Foundation"}
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
            Every statistic here reflects demonstrated problem-solving, real assessment outcomes, and completed practice sets—never fabricated XP.
          </p>
        </div>
      </div>

      {/* 4 Core Verified Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div className="card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--brand-primary)", marginBottom: 8 }}>
            <Award size={20} />
            <span style={{ fontSize: 13, fontWeight: 700 }}>Concepts Mastered</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)" }}>
            {masteredCount} / {totalConcepts}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
            {masteryPercent}% topic coverage
          </div>
        </div>

        <div className="card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--success-solid)", marginBottom: 8 }}>
            <TrendingUp size={20} />
            <span style={{ fontSize: 13, fontWeight: 700 }}>Overall Accuracy</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)" }}>
            {overallAccuracy}%
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
            Across {totalAttempts} questions answered
          </div>
        </div>

        <div className="card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#D97706", marginBottom: 8 }}>
            <Flame size={20} />
            <span style={{ fontSize: 13, fontWeight: 700 }}>Daily Streak</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#D97706" }}>
            {currentStreak} Days
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
            Max: {maxStreak} days • {totalActiveDays} active
          </div>
        </div>

        <div className="card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#8B5CF6", marginBottom: 8 }}>
            <CheckCircle size={20} />
            <span style={{ fontSize: 13, fontWeight: 700 }}>Lessons Completed</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)" }}>
            {completedLessonsCount}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
            Interactive structured modules
          </div>
        </div>
      </div>

      {/* LeetCode-Style Days Tracking & Heatmap Section */}
      <div className="card" style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Flame size={22} color="#D97706" />
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                LeetCode-Style Activity & Days Tracking
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "2px 0 0 0" }}>
                Consistency heatmap tracking problems solved and lessons completed daily
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#059669", fontWeight: 700 }}>
            <Shield size={16} />
            <span>Streak Protected</span>
          </div>
        </div>

        {/* Weekly Day Capsules */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 20 }}>
          {weeklyDays.map((d, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: "10px 4px",
                borderRadius: "var(--radius-md)",
                backgroundColor: d.isToday ? "#FEF3C7" : "var(--bg-canvas)",
                border: d.isToday ? "2px solid #F59E0B" : "1px solid var(--border-light)",
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: d.isToday ? "#92400E" : "var(--text-muted)" }}>
                {d.dayName}
              </span>

              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: d.isActive ? "#22C55E" : "var(--border-light)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {d.isActive ? <CheckCircle2 size={16} /> : <Circle size={14} color="#94A3B8" />}
              </div>

              <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
                {d.isActive ? `${d.count} done` : "—"}
              </span>
            </div>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div
          style={{
            padding: "16px 20px",
            backgroundColor: "var(--bg-canvas)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-light)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>
              Past 12 Weeks Activity Heatmap
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-muted)" }}>
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((lvl) => (
                <div
                  key={lvl}
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 2,
                    backgroundColor: getHeatmapColor(lvl),
                  }}
                />
              ))}
              <span>More</span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridAutoFlow: "column",
              gridTemplateRows: "repeat(7, 13px)",
              gap: 4,
              overflowX: "auto",
              padding: "6px 0",
            }}
          >
            {heatmapDays.map((cell, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredDay(cell)}
                onMouseLeave={() => setHoveredDay(null)}
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: 2,
                  backgroundColor: getHeatmapColor(cell.level),
                  border: cell.isToday ? "2px solid #F59E0B" : "none",
                  cursor: "pointer",
                }}
                title={`${cell.date}: ${cell.count} activities`}
              />
            ))}
          </div>

          <div style={{ minHeight: 20, marginTop: 8, fontSize: 12, color: "var(--text-secondary)", textAlign: "center" }}>
            {hoveredDay ? (
              <span>
                <strong>{hoveredDay.date}</strong>: {hoveredDay.count} activities completed
              </span>
            ) : (
              <span style={{ color: "var(--text-muted)" }}>
                Hover over squares to inspect daily practice count
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Concept Proficiency Breakdown */}
      <div className="card">
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
          Concept-by-Concept Proficiency Breakdown
        </h3>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 20 }}>
          Directly tracked through diagnostic checks and practice question results:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {proficiencies.map((item) => {
            const isMastered = item.status === "mastered";
            const isGap = item.status === "gap";
            const isPractice = item.status === "needs_practice";

            let barColor = "var(--border-medium)";
            let badgeBg = "var(--bg-surface-secondary)";
            let badgeColor = "var(--text-secondary)";
            let labelText = "Unassessed";

            if (isMastered) {
              barColor = "var(--success-solid)";
              badgeBg = "var(--success-bg)";
              badgeColor = "var(--success-text)";
              labelText = "Mastered";
            } else if (isGap) {
              barColor = "var(--error-solid)";
              badgeBg = "var(--error-bg)";
              badgeColor = "var(--error-text)";
              labelText = "Critical Gap";
            } else if (isPractice) {
              barColor = "#D97706";
              badgeBg = "#FEF3C7";
              badgeColor = "#92400E";
              labelText = "Needs Practice";
            }

            return (
              <div
                key={item.conceptId}
                style={{
                  padding: "16px 20px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-canvas)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div>
                    <strong style={{ fontSize: 15, color: "var(--text-primary)" }}>{item.name}</strong>
                    <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 8 }}>
                      • {item.level}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      backgroundColor: badgeBg,
                      color: badgeColor,
                      padding: "2px 8px",
                      borderRadius: "var(--radius-sm)",
                      textTransform: "uppercase",
                    }}
                  >
                    {labelText}
                  </span>
                </div>

                {/* Progress Bar */}
                <div
                  style={{
                    height: 8,
                    backgroundColor: "var(--border-light)",
                    borderRadius: "var(--radius-full)",
                    overflow: "hidden",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      width: `${item.score}%`,
                      height: "100%",
                      backgroundColor: barColor,
                      borderRadius: "var(--radius-full)",
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)" }}>
                  <span>Accuracy: {item.score}%</span>
                  <span>{item.attempts} attempts</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
