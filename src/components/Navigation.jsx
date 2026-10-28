import React, { useState } from "react";
import {
  LayoutDashboard,
  Compass,
  Library,
  Bot,
  BarChart3,
  Settings,
  Sparkles,
  TrendingUp,
  Flame,
  ArrowRight,
  Shield,
  Layers,
} from "lucide-react";
import LumiCharacter from "./LumiCharacter";

export default function Navigation({
  activeTab,
  onSelectTab,
  onOpenTutor,
  onOpenSubjectDashboard,
  onOpenStreakModal,
  onViewLandingPage,
  streakDays = 7,
}) {
  const [smartMode, setSmartMode] = useState(true);

  // Exact 6 items matching user's screenshot
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "learn", label: "Learning Path", icon: Compass },
    { id: "library", label: "Content Library", icon: Library },
    { id: "tutor", label: "AI Tutor", icon: Bot, isAction: true },
    { id: "progress", label: "Analytics", icon: BarChart3 },
    { id: "profile", label: "Settings", icon: Settings },
  ];

  const handleItemClick = (item) => {
    if (item.isAction) {
      if (item.id === "tutor") onOpenTutor();
      return;
    }
    if (item.id === "library") {
      onOpenSubjectDashboard();
      return;
    }
    onSelectTab(item.id);
  };

  return (
    <>
      {/* Desktop Sidebar (Matching user's screenshot layout) */}
      <aside
        className="desktop-nav"
        style={{
          width: 250,
          borderRight: "1px solid var(--border-light)",
          backgroundColor: "var(--bg-surface)",
          display: "flex",
          flexDirection: "column",
          padding: "24px 16px",
          flexShrink: 0,
          height: "100vh",
          position: "sticky",
          top: 0,
          overflowY: "auto",
        }}
      >
        {/* Brand Header */}
        <div
          onClick={onViewLandingPage}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 10px 24px 10px",
            borderBottom: "1px solid var(--border-light)",
            cursor: "pointer",
          }}
          title="Click to view Landing Page"
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--brand-primary)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 18,
              boxShadow: "0 2px 6px rgba(79, 70, 229, 0.3)",
            }}
          >
            LN
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              LearnNova
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>
              Personalized Learning
            </div>
          </div>
        </div>

        {/* Primary Navigation Items (Exact screenshot layout with active blue pill) */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 20 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`nav-btn ${isActive ? "active" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#2563EB" : "var(--text-secondary)",
                  backgroundColor: isActive ? "#EFF6FF" : "transparent",
                  border: "none",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                  width: "100%",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "var(--bg-canvas)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }
                }}
              >
                <Icon size={19} color={isActive ? "#2563EB" : "var(--text-muted)"} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Divider & Lower Modules */}
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 14, paddingTop: 16 }}>
          {/* Smart Mode Toggle (Matching Screenshot) */}
          <div
            style={{
              padding: "12px 14px",
              backgroundColor: "var(--bg-canvas)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: "#EFF6FF",
                  color: "#2563EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles size={16} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>
                  Smart Mode
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  AI-powered learning
                </div>
              </div>
            </div>

            {/* Interactive Toggle Switch */}
            <div
              onClick={() => setSmartMode(!smartMode)}
              style={{
                width: 38,
                height: 22,
                borderRadius: "var(--radius-full)",
                backgroundColor: smartMode ? "#2563EB" : "var(--border-medium)",
                display: "flex",
                alignItems: "center",
                padding: "2px",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              title="Toggle Socratic Smart Mode"
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  transform: smartMode ? "translateX(16px)" : "translateX(0)",
                  transition: "transform 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          </div>

          {/* Learning Streak Module (Matching Screenshot) */}
          <div
            onClick={onOpenStreakModal}
            style={{
              padding: "14px",
              backgroundColor: "var(--bg-canvas)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#F59E0B";
              e.currentTarget.style.backgroundColor = "#FFFBEB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-light)";
              e.currentTarget.style.backgroundColor = "var(--bg-canvas)";
            }}
            title="Click to view LeetCode Streak Heatmap"
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <TrendingUp size={15} color="#D97706" />
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)" }}>
                Learning Streak
              </span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>
              {streakDays} days
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", marginTop: 4 }}>
              Keep it up! 🔥
            </div>
          </div>

          {/* Bottom Profile / Lumi Assistant Pill (Matching Screenshot) */}
          <div
            onClick={onViewLandingPage}
            style={{
              padding: "10px 12px",
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--brand-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-light)")}
            title="Click to view landing page & floating Lumi"
          >
            <LumiCharacter expression="welcome" size={36} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>
                Welcome back!
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Ready to learn?
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav
        className="mobile-nav"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 64,
          backgroundColor: "var(--bg-surface)",
          borderTop: "1px solid var(--border-light)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 40,
          padding: "0 8px",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.04)",
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: "8px 12px",
                color: isActive ? "#2563EB" : "var(--text-muted)",
                fontSize: 11,
                fontWeight: isActive ? 700 : 500,
                border: "none",
                backgroundColor: "transparent",
              }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <style>{`
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
        }
        @media (min-width: 768px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
