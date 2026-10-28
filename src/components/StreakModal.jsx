import React, { useState, useEffect } from "react";
import { X, Flame, Shield, CheckCircle2, Circle, Calendar, Trophy, Zap, Award } from "lucide-react";
import MiloCharacter from "./MiloCharacter";
import { fetchStreakActivity } from "../services/api";

export default function StreakModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(true);
  const [streakData, setStreakData] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadStreak();
    }
  }, [isOpen]);

  const loadStreak = async () => {
    setLoading(true);
    try {
      const data = await fetchStreakActivity();
      setStreakData(data);
    } catch (err) {
      console.error("Failed to load streak:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const {
    currentStreak = 5,
    maxStreak = 14,
    totalActiveDays = 23,
    totalProblemsSolved = 48,
    isTodayActive = true,
    weeklyDays = [],
    heatmapDays = [],
    streakFreezeAvailable = true,
  } = streakData || {};

  const getHeatmapColor = (level) => {
    switch (level) {
      case 4:
        return "#15803D"; // Deep green
      case 3:
        return "#22C55E"; // Bright green
      case 2:
        return "#4ADE80"; // Medium green
      case 1:
        return "#86EFAC"; // Light mint
      default:
        return "#E2E8F0"; // Inactive neutral
    }
  };

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
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 680,
          maxHeight: "90vh",
          backgroundColor: "var(--bg-surface)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "var(--shadow-modal)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFBEB",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: "#FEF3C7",
                border: "2px solid #FDE68A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Flame size={26} color="#D97706" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#92400E", margin: 0 }}>
                  {currentStreak} Days Streak!
                </h3>
                {isTodayActive && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      backgroundColor: "#D97706",
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    Active Today
                  </span>
                )}
              </div>
              <p style={{ fontSize: 13, color: "#B45309", margin: "2px 0 0 0" }}>
                Keep your momentum alive by completing at least 1 learning activity every day.
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-ghost" style={{ padding: 6, borderRadius: "50%" }}>
            <X size={20} color="#92400E" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Key Metric Tiles (LeetCode Style) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            <div
              style={{
                padding: "16px",
                backgroundColor: "var(--bg-canvas)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                Longest Streak
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)", marginTop: 4 }}>
                {maxStreak} Days
              </div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>
                Personal Best
              </div>
            </div>

            <div
              style={{
                padding: "16px",
                backgroundColor: "var(--bg-canvas)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                Total Active Days
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#059669", marginTop: 4 }}>
                {totalActiveDays} Days
              </div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>
                Consistent practice
              </div>
            </div>

            <div
              style={{
                padding: "16px",
                backgroundColor: "var(--bg-canvas)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                Problems Solved
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "var(--brand-primary)", marginTop: 4 }}>
                {totalProblemsSolved}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>
                Across all subjects
              </div>
            </div>
          </div>

          {/* Weekly Days Tracker */}
          <div
            style={{
              padding: "18px 20px",
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                This Week's Activity
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#059669", fontWeight: 600 }}>
                <Shield size={15} />
                <span>Streak Protected</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              {weeklyDays.map((d, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 4px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: d.isToday ? "#FEF3C7" : "var(--bg-canvas)",
                    border: d.isToday ? "2px solid #F59E0B" : "1px solid var(--border-light)",
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 700, color: d.isToday ? "#92400E" : "var(--text-muted)" }}>
                    {d.dayName}
                  </span>

                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: d.isActive ? "#22C55E" : "var(--border-light)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {d.isActive ? <CheckCircle2 size={18} /> : <Circle size={16} color="#94A3B8" />}
                  </div>

                  <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
                    {d.isActive ? `${d.count} done` : "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* LeetCode Contribution Heatmap Grid */}
          <div
            style={{
              padding: "20px 24px",
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                  Activity Calendar Heatmap
                </h4>
                <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "2px 0 0 0" }}>
                  Daily study intensity over the past 12 weeks
                </p>
              </div>

              {/* Legend */}
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-muted)" }}>
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <div
                    key={lvl}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 2,
                      backgroundColor: getHeatmapColor(lvl),
                    }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>

            {/* Heatmap Grid (Weeks columns × 7 day rows) */}
            <div
              style={{
                display: "grid",
                gridAutoFlow: "column",
                gridTemplateRows: "repeat(7, 14px)",
                gap: 4,
                overflowX: "auto",
                padding: "8px 0",
              }}
            >
              {heatmapDays.map((cell, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredDay(cell)}
                  onMouseLeave={() => setHoveredDay(null)}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 3,
                    backgroundColor: getHeatmapColor(cell.level),
                    border: cell.isToday ? "2px solid #F59E0B" : "none",
                    cursor: "pointer",
                    transition: "transform 0.1s ease",
                  }}
                  title={`${cell.date}: ${cell.count} activities`}
                />
              ))}
            </div>

            {/* Hover Tooltip display */}
            <div style={{ minHeight: 22, marginTop: 8, fontSize: 12, color: "var(--text-secondary)", textAlign: "center" }}>
              {hoveredDay ? (
                <span>
                  <strong>{hoveredDay.date}</strong>: {hoveredDay.count} activities completed
                </span>
              ) : (
                <span style={{ color: "var(--text-muted)" }}>
                  Hover over any square to view daily activity count
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid var(--border-light)",
            backgroundColor: "var(--bg-canvas)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MiloCharacter expression="celebrating" size={32} />
            <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              "Keep the flame burning every single day!"
            </span>
          </div>

          <button onClick={onClose} className="btn btn-primary" style={{ padding: "8px 20px" }}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
