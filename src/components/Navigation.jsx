import React from "react";
import { BookOpen, Sparkles, TrendingUp, User, Layers, Flame, Compass } from "lucide-react";
import LumiCharacter from "./LumiCharacter";

export default function Navigation({
  activeTab,
  onSelectTab,
  onOpenTutor,
  onOpenSubjectDashboard,
  onOpenStreakModal,
  onViewLandingPage,
}) {
  const navItems = [
    { id: "learn", label: "Learn", icon: BookOpen },
    { id: "practice", label: "Practice", icon: Sparkles },
    { id: "progress", label: "Progress", icon: TrendingUp },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <>
      {/* Desktop Sidebar / Rail */}
      <aside
        className="desktop-nav"
        style={{
          width: 240,
          borderRight: "1px solid var(--border-light)",
          backgroundColor: "var(--bg-surface)",
          display: "flex",
          flexDirection: "column",
          padding: "24px 16px",
          flexShrink: 0,
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 12px 28px 12px",
            borderBottom: "1px solid var(--border-light)",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--brand-primary)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 20,
              boxShadow: "0 2px 4px rgba(79, 70, 229, 0.3)",
            }}
          >
            LN
          </div>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              LearnNova
            </h1>
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>
              AI Learning Companion
            </p>
          </div>
        </div>

        {/* Primary Navigation Items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 24 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`nav-btn ${isActive ? "active" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  fontSize: 15,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "var(--brand-primary)" : "var(--text-secondary)",
                  backgroundColor: isActive ? "var(--brand-primary-tint)" : "transparent",
                  border: "1px solid",
                  borderColor: isActive ? "var(--brand-primary-border)" : "transparent",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <Icon size={20} color={isActive ? "var(--brand-primary)" : "var(--text-muted)"} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Tools Section */}
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border-light)", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", padding: "0 12px 4px 12px" }}>
            Curriculum & Streaks
          </div>

          <button
            onClick={onOpenSubjectDashboard}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--text-secondary)",
              backgroundColor: "transparent",
              border: "1px solid transparent",
              transition: "all 0.15s ease",
              textAlign: "left",
              width: "100%",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-canvas)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <Layers size={18} color="var(--brand-primary)" />
            <span>Switch Subject</span>
          </button>

          <button
            onClick={onOpenStreakModal}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--text-secondary)",
              backgroundColor: "transparent",
              border: "1px solid transparent",
              transition: "all 0.15s ease",
              textAlign: "left",
              width: "100%",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FEF3C7";
              e.currentTarget.style.color = "#92400E";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <Flame size={18} color="#D97706" />
            <span>Streak Heatmap</span>
          </button>

          {onViewLandingPage && (
            <button
              onClick={onViewLandingPage}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "10px 14px",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--text-secondary)",
                backgroundColor: "transparent",
                border: "1px solid transparent",
                transition: "all 0.15s ease",
                textAlign: "left",
                width: "100%",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--brand-primary-tint)";
                e.currentTarget.style.color = "var(--brand-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <Compass size={18} color="var(--brand-primary)" />
              <span>Landing Page</span>
            </button>
          )}
        </div>

        {/* Lumi Tutor Quick Launcher */}
        <div
          onClick={onOpenTutor}
          style={{
            marginTop: "auto",
            padding: "14px",
            backgroundColor: "var(--bg-canvas)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          className="milo-launcher card-interactive"
        >
          <LumiCharacter expression="welcome" size={44} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>
              Ask Lumi Tutor
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Get hints & simple analogies
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
              onClick={() => onSelectTab(item.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: "8px 12px",
                color: isActive ? "var(--brand-primary)" : "var(--text-muted)",
                fontSize: 11,
                fontWeight: isActive ? 700 : 500,
              }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Media query styles */}
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
