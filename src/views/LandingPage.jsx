import React, { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Atom,
  FlaskConical,
  BookOpen,
  Binary,
  Target,
  CheckCircle2,
  Flame,
  Shield,
  X,
} from "lucide-react";
import LumiCharacter from "../components/LumiCharacter";

export default function LandingPage({ onGetStarted, onSignIn, existingProfile }) {
  // Lumi Hero interactive state
  const [lumiExpr, setLumiExpr] = useState("welcome");
  const [lumiQuoteIndex, setLumiQuoteIndex] = useState(0);
  const [auraColor, setAuraColor] = useState("indigo"); // indigo, emerald, amber, rose
  const [particles, setParticles] = useState([]);
  const [isBouncing, setIsBouncing] = useState(false);

  // Modals state
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [signInName, setSignInName] = useState(existingProfile?.name || "Alex");

  // Sign Up Multi-Step State (Duolingo Style)
  const [signUpStep, setSignUpStep] = useState(1);
  const [signUpData, setSignUpData] = useState({
    name: "Alex",
    goal: "entrance", // 'school' | 'entrance' | 'college' | 'curiosity'
    dailyCommitment: "30 min",
    subject: "Physics",
    topic: "Current Electricity",
    topicId: "current_electricity",
  });

  // Interactive Live Socratic Demo Tab
  const [demoTab, setDemoTab] = useState("analogy"); // 'textbook' | 'analogy' | 'math'

  // Floating screen companion widget (bottom right)
  const [isFloatingWidgetOpen, setIsFloatingWidgetOpen] = useState(true);
  const [widgetTipIndex, setWidgetTipIndex] = useState(0);

  const widgetTips = [
    "Psst! Click 'Get Started' to uncover your secret knowledge gaps!",
    "No boring lectures here—we learn by solving real, bite-sized puzzles!",
    "Want to master Ohm's law or Redox reactions? Tap any subject below!",
    "Keep your daily streak alive and watch your exam anxiety vanish! 🔥",
  ];

  const lumiQuotes = [
    "Hey there! I’m Lumi. Tap me to see my expressions and high-five! ✨",
    "Learning with me feels like a game, but it’s 100% rigorous science! 🚀",
    "I adapt to your exact speed—no judgment, just crystal-clear analogies! 💡",
    "Ready to find your starting level? Click 'Get Started' below! 🎯",
    "We'll build a daily streak that rivals your LeetCode consistency! 🔥",
  ];

  const triggerSparkles = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 600);

    const icons = ["✨", "⭐", "🚀", "💡", "🔥", "🎯", "🧬"];
    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      left: Math.random() * 80 + 10,
      delay: Math.random() * 0.2,
    }));
    setParticles((prev) => [...prev.slice(-10), ...newParticles]);
  };

  const handleLumiClick = () => {
    const expressions = ["celebrating", "curious", "thinking", "explaining", "encouraging", "welcome"];
    const nextIdx = (expressions.indexOf(lumiExpr) + 1) % expressions.length;
    setLumiExpr(expressions[nextIdx]);
    setLumiQuoteIndex((prev) => (prev + 1) % lumiQuotes.length);
    triggerSparkles();
  };

  const handleSubjectSelect = (subName, chapterName, chapterId) => {
    setSignUpData((prev) => ({
      ...prev,
      subject: subName,
      topic: chapterName,
      topicId: chapterId,
    }));
    setLumiExpr("celebrating");
    setIsSignUpModalOpen(true);
    triggerSparkles();
  };

  const handleQuickSignInSubmit = (e) => {
    e.preventDefault();
    setIsSignInModalOpen(false);
    onSignIn(signInName);
  };

  const handleSignUpComplete = (e) => {
    e.preventDefault();
    setIsSignUpModalOpen(false);
    onGetStarted({
      name: signUpData.name,
      category: signUpData.goal,
      subject: signUpData.subject,
      topic: signUpData.topic,
      topicId: signUpData.topicId,
      preferences: {
        studyTime: signUpData.dailyCommitment,
      },
    });
  };

  const getAuraGradient = () => {
    switch (auraColor) {
      case "emerald":
        return "radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, rgba(240, 253, 244, 0) 70%)";
      case "amber":
        return "radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(254, 243, 199, 0) 70%)";
      case "rose":
        return "radial-gradient(circle, rgba(244, 63, 94, 0.22) 0%, rgba(255, 241, 242, 0) 70%)";
      default:
        return "radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(238, 242, 255, 0) 70%)";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-canvas)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Top Navbar */}
      <header
        style={{
          height: 72,
          backgroundColor: "var(--bg-surface)",
          borderBottom: "1px solid var(--border-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--brand-primary)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 20,
              boxShadow: "0 3px 6px rgba(79, 70, 229, 0.35)",
            }}
          >
            LN
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              LearnNova
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>
              Guided by Lumi AI
            </div>
          </div>
        </div>

        {/* Quick Subjects Pills in Nav */}
        <div className="desktop-subjects" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {[
            { name: "Physics", icon: "⚛️", topicId: "current_electricity", topic: "Current Electricity" },
            { name: "Chemistry", icon: "🧪", topicId: "electrochemistry", topic: "Electrochemistry" },
            { name: "Mathematics", icon: "📐", topicId: "calculus_integrals", topic: "Calculus & Integrals" },
            { name: "Computer Science", icon: "💻", topicId: "binary_search_trees", topic: "Binary Search Trees" },
          ].map((item) => (
            <button
              key={item.name}
              id={`nav-subject-${item.topicId}`}
              onClick={() => handleSubjectSelect(item.name, item.topic, item.topicId)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-secondary)",
                backgroundColor: "var(--bg-canvas)",
                border: "1px solid var(--border-light)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--brand-primary)";
                e.currentTarget.style.color = "var(--brand-primary)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-light)";
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Right CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {existingProfile?.isOnboarded ? (
            <button
              id="btn-nav-dashboard"
              onClick={() => onSignIn(existingProfile.name || "Alex")}
              className="btn btn-primary"
              style={{
                padding: "8px 18px",
                fontSize: 14,
                borderRadius: "var(--radius-md)",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>Enter Dashboard ({existingProfile.name || "Alex"})</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              id="btn-nav-signin"
              onClick={() => setIsSignInModalOpen(true)}
              className="btn btn-secondary"
              style={{
                padding: "8px 18px",
                fontSize: 14,
                borderRadius: "var(--radius-md)",
                fontWeight: 700,
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Hero Section (Duolingo-Inspired Tactile Layout) */}
      <section
        style={{
          maxWidth: 1140,
          width: "100%",
          margin: "0 auto",
          padding: "60px 24px 44px 24px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 48,
          flexWrap: "wrap",
        }}
      >
        {/* Left: Floating Interactive Lumi Companion */}
        <div
          style={{
            flex: "1 1 430px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Reactive Speech Bubble above Lumi */}
          <div
            id="lumi-hero-bubble"
            onClick={handleLumiClick}
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "2px solid var(--brand-primary-border)",
              borderRadius: "var(--radius-lg)",
              padding: "16px 22px",
              boxShadow: "var(--shadow-card)",
              marginBottom: 20,
              maxWidth: 380,
              cursor: "pointer",
              position: "relative",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "var(--shadow-modal)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "var(--shadow-card)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: "var(--brand-primary)", textTransform: "uppercase" }}>
                Lumi says:
              </span>
              <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#10B981" }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#059669" }}>Live</span>
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", margin: 0, lineHeight: 1.45 }}>
              {lumiQuotes[lumiQuoteIndex]}
            </p>
            <span style={{ fontSize: 11, color: "var(--text-muted)", display: "block", marginTop: 6 }}>
              (Tap Lumi or this bubble to interact)
            </span>

            {/* Bubble Tail Pointing Down */}
            <div
              style={{
                position: "absolute",
                bottom: -9,
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                width: 16,
                height: 16,
                backgroundColor: "var(--bg-surface)",
                borderRight: "2px solid var(--brand-primary-border)",
                borderBottom: "2px solid var(--brand-primary-border)",
              }}
            />
          </div>

          {/* Floating Character Container with Glowing Aura */}
          <div
            style={{
              position: "relative",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Ambient Background Aura */}
            <div
              style={{
                position: "absolute",
                width: 280,
                height: 280,
                borderRadius: "50%",
                background: getAuraGradient(),
                zIndex: 0,
                transition: "background 0.4s ease",
              }}
            />

            {/* Sparkle Particles Burst */}
            {particles.map((p) => (
              <div
                key={p.id}
                className="sparkle-particle"
                style={{
                  position: "absolute",
                  left: `${p.left}%`,
                  bottom: "30%",
                  fontSize: 22,
                  pointerEvents: "none",
                  zIndex: 10,
                  animation: `particleFloat 1.2s ease-out forwards`,
                  animationDelay: `${p.delay}s`,
                }}
              >
                {p.icon}
              </div>
            ))}

            {/* Floating Mascot */}
            <div
              id="lumi-hero-mascot"
              onClick={handleLumiClick}
              className={isBouncing ? "lumi-bounce" : ""}
              style={{
                position: "relative",
                zIndex: 2,
                cursor: "pointer",
                transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              title="Click me to play!"
            >
              <LumiCharacter
                expression={lumiExpr}
                size={200}
                floating={true}
                interactive={true}
              />
            </div>
          </div>

          {/* Reactive Tap Mood Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 12 }}>
            <button
              id="btn-high-five-lumi"
              onClick={() => {
                setLumiExpr("celebrating");
                setLumiQuoteIndex(1);
                triggerSparkles();
              }}
              className="tag"
              style={{
                fontSize: 12,
                fontWeight: 700,
                padding: "6px 14px",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-medium)",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                color: "var(--text-secondary)",
                transition: "all 0.15s ease",
              }}
            >
              🎉 High Five Lumi!
            </button>
            <button
              id="btn-lumi-teach"
              onClick={() => {
                setLumiExpr("explaining");
                setLumiQuoteIndex(2);
                triggerSparkles();
              }}
              className="tag"
              style={{
                fontSize: 12,
                fontWeight: 700,
                padding: "6px 14px",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-medium)",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                color: "var(--text-secondary)",
                transition: "all 0.15s ease",
              }}
            >
              💡 How does Lumi teach?
            </button>
            <button
              id="btn-switch-aura"
              onClick={() => {
                const colors = ["indigo", "emerald", "amber", "rose"];
                const next = colors[(colors.indexOf(auraColor) + 1) % colors.length];
                setAuraColor(next);
                setLumiExpr("curious");
                triggerSparkles();
              }}
              className="tag"
              style={{
                fontSize: 12,
                fontWeight: 700,
                padding: "6px 14px",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-medium)",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                color: "var(--text-secondary)",
                transition: "all 0.15s ease",
              }}
            >
              🎨 Switch Aura Color
            </button>
          </div>
        </div>

        {/* Right: Duolingo-Style Hero Pitch & CTAs */}
        <div style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                backgroundColor: "var(--brand-primary-tint)",
                border: "1px solid var(--brand-primary-border)",
                borderRadius: "var(--radius-full)",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--brand-primary)",
                marginBottom: 16,
              }}
            >
              <Sparkles size={16} />
              <span>Free, Interactive STEM Learning Guided by Lumi AI</span>
            </div>

            <h1
              style={{
                fontSize: 44,
                fontWeight: 800,
                color: "var(--text-primary)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                margin: "0 0 16px 0",
              }}
            >
              The smart, playful way to master Science, Math & Coding.
            </h1>

            <p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
              Say goodbye to passive lectures. Lumi diagnoses your exact conceptual traps, adapts every question on the fly, and builds daily study streaks that feel like a game.
            </p>
          </div>

          {/* Duolingo Primary Tactile Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 400 }}>
            <button
              id="btn-get-started"
              onClick={() => setIsSignUpModalOpen(true)}
              className="btn-cta-green"
              style={{ width: "100%" }}
            >
              <span>Get Started</span>
              <ArrowRight size={20} />
            </button>

            <button
              id="btn-already-account"
              onClick={() => setIsSignInModalOpen(true)}
              className="btn-cta-white"
              style={{ width: "100%" }}
            >
              <span>I Already Have An Account</span>
            </button>
          </div>

          {/* Duolingo Social Proof Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 18,
              fontSize: 13,
              color: "var(--text-secondary)",
              fontWeight: 600,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <CheckCircle2 size={16} color="#059669" /> 5-minute diagnostic level check
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <CheckCircle2 size={16} color="#059669" /> Zero credit card or paywalls
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Flame size={16} color="#D97706" /> LeetCode-style streak tracking
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Subject Selector Carousel (Duolingo Language Picker Feel) */}
      <section
        style={{
          backgroundColor: "var(--bg-surface)",
          borderTop: "1px solid var(--border-light)",
          borderBottom: "1px solid var(--border-light)",
          padding: "54px 24px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "#EEF2FF",
                color: "var(--brand-primary)",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 8,
              }}
            >
              Bite-Sized Modules
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 8px 0" }}>
              Choose What You Want to Master Today
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", margin: 0 }}>
              Select a chapter to trigger a free diagnostic quiz and uncover your starting level:
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              {
                id: "current_electricity",
                subject: "Physics",
                topic: "Current Electricity",
                desc: "Drift velocity, Ohm's law, circuits & Kirchhoff's rules",
                icon: Atom,
                color: "#4F46E5",
                bg: "#EEF2FF",
                badge: "Board & JEE Core",
              },
              {
                id: "electrochemistry",
                subject: "Chemistry",
                topic: "Electrochemistry",
                desc: "Galvanic cells, Nernst equation & Kohlrausch's law",
                icon: FlaskConical,
                color: "#059669",
                bg: "#ECFDF5",
                badge: "High-Weightage",
              },
              {
                id: "calculus_integrals",
                subject: "Mathematics",
                topic: "Calculus & Integrals",
                desc: "Definite integrals, substitution & parts (ILATE)",
                icon: BookOpen,
                color: "#D97706",
                bg: "#FEF3C7",
                badge: "Calculus Backbone",
              },
              {
                id: "binary_search_trees",
                subject: "Computer Science",
                topic: "Binary Search Trees",
                desc: "Tree invariants, in-order traversals & O(log N) lookups",
                icon: Binary,
                color: "#2563EB",
                bg: "#EFF6FF",
                badge: "DSA Essential",
              },
            ].map((sub) => {
              const Icon = sub.icon;
              return (
                <div
                  key={sub.id}
                  id={`card-subject-${sub.id}`}
                  onClick={() => handleSubjectSelect(sub.subject, sub.topic, sub.id)}
                  className="card card-interactive"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "26px 22px",
                    borderRadius: "var(--radius-lg)",
                    border: "2px solid var(--border-light)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = sub.color;
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-light)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "var(--shadow-card)";
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "var(--radius-md)",
                          backgroundColor: sub.bg,
                          color: sub.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={26} />
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "var(--radius-full)",
                          backgroundColor: sub.bg,
                          color: sub.color,
                        }}
                      >
                        {sub.badge}
                      </span>
                    </div>

                    <div style={{ fontSize: 12, fontWeight: 700, color: sub.color, textTransform: "uppercase" }}>
                      {sub.subject}
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "4px 0 8px 0" }}>
                      {sub.topic}
                    </h3>

                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.45, margin: 0 }}>
                      {sub.desc}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 13,
                      fontWeight: 700,
                      color: sub.color,
                      marginTop: 24,
                    }}
                  >
                    <span>Start Diagnostic</span>
                    <ArrowRight size={15} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Socratic Demonstration (Try Lumi before signing up) */}
      <section style={{ maxWidth: 1040, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 12px",
              backgroundColor: "var(--brand-primary-tint)",
              borderRadius: "var(--radius-full)",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--brand-primary)",
              marginBottom: 10,
            }}
          >
            <Sparkles size={14} />
            <span>Interactive Demo</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 10px 0" }}>
            See How Lumi Explains Complex Ideas
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", margin: 0 }}>
            Click the tabs below to compare a dry textbook definition with Lumi's intuitive analogy:
          </p>
        </div>

        <div
          className="card"
          style={{
            padding: 32,
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-medium)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Question Title */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: "#EEF2FF",
                color: "var(--brand-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
              }}
            >
              ?
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
              Question: Why does electrical resistance increase when a metallic conductor heats up?
            </h3>
          </div>

          {/* Interactive Switcher */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            <button
              id="demo-tab-analogy"
              onClick={() => setDemoTab("analogy")}
              style={{
                padding: "8px 16px",
                borderRadius: "var(--radius-md)",
                fontSize: 13,
                fontWeight: 700,
                border: "1px solid",
                borderColor: demoTab === "analogy" ? "var(--brand-primary)" : "var(--border-light)",
                backgroundColor: demoTab === "analogy" ? "var(--brand-primary-tint)" : "var(--bg-canvas)",
                color: demoTab === "analogy" ? "var(--brand-primary)" : "var(--text-secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>💡 Lumi's Crowded Hallway Analogy</span>
            </button>

            <button
              id="demo-tab-textbook"
              onClick={() => setDemoTab("textbook")}
              style={{
                padding: "8px 16px",
                borderRadius: "var(--radius-md)",
                fontSize: 13,
                fontWeight: 700,
                border: "1px solid",
                borderColor: demoTab === "textbook" ? "var(--brand-primary)" : "var(--border-light)",
                backgroundColor: demoTab === "textbook" ? "var(--brand-primary-tint)" : "var(--bg-canvas)",
                color: demoTab === "textbook" ? "var(--brand-primary)" : "var(--text-secondary)",
                cursor: "pointer",
              }}
            >
              📖 Standard Textbook Definition
            </button>

            <button
              id="demo-tab-math"
              onClick={() => setDemoTab("math")}
              style={{
                padding: "8px 16px",
                borderRadius: "var(--radius-md)",
                fontSize: 13,
                fontWeight: 700,
                border: "1px solid",
                borderColor: demoTab === "math" ? "var(--brand-primary)" : "var(--border-light)",
                backgroundColor: demoTab === "math" ? "var(--brand-primary-tint)" : "var(--bg-canvas)",
                color: demoTab === "math" ? "var(--brand-primary)" : "var(--text-secondary)",
                cursor: "pointer",
              }}
            >
              🧮 Numerical Formula & Trap
            </button>
          </div>

          {/* Content Pane */}
          {demoTab === "analogy" && (
            <div
              style={{
                backgroundColor: "#F8FAFC",
                border: "1px solid var(--brand-primary-border)",
                borderRadius: "var(--radius-md)",
                padding: "20px 24px",
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
              }}
            >
              <LumiCharacter expression="explaining" size={68} floating={true} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "var(--brand-primary)", marginBottom: 4 }}>
                  LUMI'S INTUITIVE BREAKDOWN:
                </div>
                <p style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.6, margin: "0 0 10px 0" }}>
                  Imagine sprinting through a high school corridor. If everyone is standing still, you can dodge past them quickly (low resistance).
                </p>
                <p style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.6, margin: 0 }}>
                  Now turn on the heat: everyone starts jumping and dancing erratically (thermal lattice vibrations)! You collide with someone every two steps. That increased collision frequency is why resistance surges!
                </p>
              </div>
            </div>
          )}

          {demoTab === "textbook" && (
            <div
              style={{
                backgroundColor: "#F8FAFC",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                padding: "20px 24px",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", marginBottom: 6 }}>
                TRADITIONAL ROTE DEFINITION:
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                "The resistance of metallic conductors exhibits a positive temperature coefficient because the amplitude of lattice ion thermal vibrations increases, diminishing electron relaxation time τ in the conductivity relation σ = ne²τ/m."
              </p>
            </div>
          )}

          {demoTab === "math" && (
            <div
              style={{
                backgroundColor: "#F8FAFC",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                padding: "20px 24px",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--brand-primary)", marginBottom: 6 }}>
                FORMULA & EXAM APPLICATION:
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 16,
                  fontWeight: 700,
                  backgroundColor: "#fff",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  display: "inline-block",
                  marginBottom: 10,
                  border: "1px solid var(--border-light)",
                }}
              >
                R(T) = R₀ [1 + α (T - T₀)]
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                Common exam trap: Students forget that semiconductors like Silicon have a <strong>negative</strong> temperature coefficient (α &lt; 0), so their resistance drops with heat! Lumi always points out these exam traps.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4 Duolingo Product Pillars */}
      <section style={{ maxWidth: 1040, margin: "0 auto", padding: "0 24px 64px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 10px 0" }}>
            Why Students Stick With LearnNova
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", margin: 0 }}>
            Engaging Duolingo-style micro-sessions combined with genuine AI gap detection
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          <div className="card" style={{ padding: "26px" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <Flame size={24} color="#D97706" />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
              LeetCode-Style Streaks
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
              Track consecutive study days with genuine 12-week contribution heatmaps, weekly capsules, and streak freeze shields.
            </p>
          </div>

          <div className="card" style={{ padding: "26px" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <Target size={24} color="var(--brand-primary)" />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
              Diagnostic Gap Detection
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
              Lumi identifies your exact misconceptions in 5 minutes and groups them into Mastered, Developing, and Critical Gaps.
            </p>
          </div>

          <div className="card" style={{ padding: "26px" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <Sparkles size={24} color="#059669" />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
              "Explain More Simply"
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
              Stuck on a problem? Tap one button to see intuitive analogies, worked numerical examples, and step-by-step hints.
            </p>
          </div>

          <div className="card" style={{ padding: "26px" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#F3E8FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <Shield size={24} color="#7C3AED" />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
              Zero Fake XP or Fluff
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
              No spammy ads or meaningless badges. Every percentage reflects demonstrated conceptual mastery in actual exams.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section
        style={{
          backgroundColor: "var(--brand-primary-tint)",
          borderTop: "1px solid var(--brand-primary-border)",
          padding: "54px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "var(--brand-primary-hover)", margin: "0 0 12px 0" }}>
            Ready to master how you learn?
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", margin: "0 0 28px 0" }}>
            Join Lumi now. Discover what you know, repair what you don't, and conquer your exams.
          </p>

          <button
            id="btn-bottom-cta"
            onClick={() => setIsSignUpModalOpen(true)}
            className="btn-cta-green"
            style={{ padding: "18px 48px", fontSize: 17 }}
          >
            <span>Start Free Diagnostic</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "var(--bg-surface)",
          borderTop: "1px solid var(--border-light)",
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 13,
          color: "var(--text-muted)",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          © 2026 LearnNova Platform • Designed with Lumi AI Companion
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <span>CBSE / ICSE</span>
          <span>JEE & NEET</span>
          <span>College Engineering</span>
        </div>
      </footer>

      {/* FLOATING SCREEN MASCOT WIDGET (Duolingo-style screen companion) */}
      <div
        className="floating-lumi-screen-widget"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 45,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 10,
        }}
      >
        {isFloatingWidgetOpen && (
          <div
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "2px solid var(--brand-primary-border)",
              borderRadius: "var(--radius-lg)",
              padding: "12px 16px",
              boxShadow: "var(--shadow-modal)",
              maxWidth: 260,
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text-primary)",
              position: "relative",
              animation: "slideUp 0.25s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "var(--brand-primary)", textTransform: "uppercase" }}>
                Lumi Companion
              </span>
              <button
                onClick={() => setIsFloatingWidgetOpen(false)}
                className="btn-ghost"
                style={{ padding: 2, borderRadius: "50%" }}
                aria-label="Dismiss message"
              >
                <X size={14} />
              </button>
            </div>
            <p style={{ margin: "0 0 10px 0", lineHeight: 1.4 }}>
              {widgetTips[widgetTipIndex]}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                id="btn-widget-quiz"
                onClick={() => setIsSignUpModalOpen(true)}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  backgroundColor: "#58cc02",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  padding: "4px 10px",
                  cursor: "pointer",
                }}
              >
                Start Quiz!
              </button>
              <button
                id="btn-widget-next-tip"
                onClick={() => setWidgetTipIndex((prev) => (prev + 1) % widgetTips.length)}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Next tip →
              </button>
            </div>
          </div>
        )}

        {/* Floating Mini Lumi Button */}
        <div
          id="floating-widget-lumi"
          onClick={() => {
            setIsFloatingWidgetOpen((prev) => !prev);
            setLumiExpr("curious");
            triggerSparkles();
          }}
          className="lumi-floating"
          style={{
            cursor: "pointer",
            filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.15))",
            transition: "transform 0.15s ease",
          }}
          title="Click to chat with Lumi!"
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <LumiCharacter expression="welcome" size={68} interactive={true} />
        </div>
      </div>

      {/* DUOLINGO-STYLE INTERACTIVE SIGN UP MODAL */}
      {isSignUpModalOpen && (
        <div
          id="signup-modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: 16,
          }}
          onClick={() => setIsSignUpModalOpen(false)}
        >
          <div
            id="signup-modal-content"
            style={{
              width: "100%",
              maxWidth: 520,
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-lg)",
              padding: "32px",
              boxShadow: "var(--shadow-modal)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <LumiCharacter expression="welcome" size={42} />
                <div>
                  <h3 style={{ fontSize: 19, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                    Create Your Learning Profile
                  </h3>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    Step {signUpStep} of 3 • Guided by Lumi
                  </span>
                </div>
              </div>
              <button
                id="btn-close-signup-modal"
                onClick={() => setIsSignUpModalOpen(false)}
                className="btn-ghost"
                style={{ padding: 6, borderRadius: "50%" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Step Progress Bar */}
            <div
              style={{
                width: "100%",
                height: 6,
                backgroundColor: "var(--border-light)",
                borderRadius: "var(--radius-full)",
                marginBottom: 24,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(signUpStep / 3) * 100}%`,
                  height: "100%",
                  backgroundColor: "#58cc02",
                  transition: "width 0.3s ease",
                }}
              />
            </div>

            {/* STEP 1: Academic Goal */}
            {signUpStep === 1 && (
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
                  What are you primarily preparing for?
                </h4>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 18 }}>
                  Lumi calibrates diagnostic questions to your specific exam format:
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {[
                    { id: "school", title: "Class 11 & 12 Boards", desc: "CBSE / ICSE syllabus, conceptual derivations & formulas" },
                    { id: "entrance", title: "Competitive Entrance (JEE / NEET)", desc: "Tricky numerical applications, traps & speed solving" },
                    { id: "college", title: "College Engineering / B.Tech", desc: "Computer science algorithms, circuits & university exams" },
                    { id: "curiosity", title: "Independent STEM Explorer", desc: "Building rock-solid science foundations from first principles" },
                  ].map((goal) => (
                    <div
                      key={goal.id}
                      id={`signup-goal-${goal.id}`}
                      onClick={() => setSignUpData({ ...signUpData, goal: goal.id })}
                      style={{
                        padding: "14px 16px",
                        borderRadius: "var(--radius-md)",
                        border: "2px solid",
                        borderColor: signUpData.goal === goal.id ? "var(--brand-primary)" : "var(--border-light)",
                        backgroundColor: signUpData.goal === goal.id ? "var(--brand-primary-tint)" : "var(--bg-canvas)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{goal.title}</div>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{goal.desc}</div>
                      </div>
                      {signUpData.goal === goal.id && <CheckCircle2 size={18} color="var(--brand-primary)" />}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  id="btn-signup-step1-continue"
                  onClick={() => setSignUpStep(2)}
                  className="btn-cta-green"
                  style={{ width: "100%", padding: "14px 0" }}
                >
                  Continue →
                </button>
              </div>
            )}

            {/* STEP 2: Daily Commitment */}
            {signUpStep === 2 && (
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
                  Choose your daily study target
                </h4>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 18 }}>
                  Short, consistent daily habits build massive exam confidence:
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {[
                    { id: "15 min", title: "Casual", time: "15 min / day", desc: "1 quick concept + 3 practice problems" },
                    { id: "30 min", title: "Regular", time: "30 min / day", desc: "Recommended for solid board & entrance prep" },
                    { id: "45 min", title: "Serious", time: "45 min / day", desc: "Intensive gap repair & multi-step problems" },
                  ].map((commit) => (
                    <div
                      key={commit.id}
                      id={`signup-commit-${commit.id.replace(" ", "")}`}
                      onClick={() => setSignUpData({ ...signUpData, dailyCommitment: commit.id })}
                      style={{
                        padding: "14px 16px",
                        borderRadius: "var(--radius-md)",
                        border: "2px solid",
                        borderColor: signUpData.dailyCommitment === commit.id ? "#58cc02" : "var(--border-light)",
                        backgroundColor: signUpData.dailyCommitment === commit.id ? "#f0fdf4" : "var(--bg-canvas)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                          {commit.title} ({commit.time})
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{commit.desc}</div>
                      </div>
                      {signUpData.dailyCommitment === commit.id && <CheckCircle2 size={18} color="#58cc02" />}
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    type="button"
                    onClick={() => setSignUpStep(1)}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: "12px 0" }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    id="btn-signup-step2-next"
                    onClick={() => setSignUpStep(3)}
                    className="btn-cta-green"
                    style={{ flex: 2, padding: "12px 0" }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Student Name & Subject Confirmation */}
            {signUpStep === 3 && (
              <form onSubmit={handleSignUpComplete}>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
                  What should Lumi call you?
                </h4>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 18 }}>
                  Your name will appear on your personalized diagnostic report:
                </p>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 6 }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="signup-input-name"
                    value={signUpData.name}
                    onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "var(--radius-md)",
                      border: "2px solid var(--border-medium)",
                      fontSize: 15,
                      fontWeight: 600,
                    }}
                    required
                  />
                </div>

                <div
                  style={{
                    backgroundColor: "var(--bg-canvas)",
                    padding: "12px 16px",
                    borderRadius: "var(--radius-md)",
                    marginBottom: 24,
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                    Starting Module
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginTop: 2 }}>
                    {signUpData.subject} • {signUpData.topic}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    type="button"
                    onClick={() => setSignUpStep(2)}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: "14px 0" }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    id="btn-signup-step3-submit"
                    className="btn-cta-green"
                    style={{ flex: 2, padding: "14px 0" }}
                  >
                    Launch Diagnostic →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* QUICK SIGN IN MODAL */}
      {isSignInModalOpen && (
        <div
          id="signin-modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: 16,
          }}
          onClick={() => setIsSignInModalOpen(false)}
        >
          <div
            id="signin-modal-content"
            style={{
              width: "100%",
              maxWidth: 440,
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-lg)",
              padding: "32px",
              boxShadow: "var(--shadow-modal)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <LumiCharacter expression="welcome" size={38} />
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                  Welcome back!
                </h3>
              </div>
              <button
                id="btn-close-signin-modal"
                onClick={() => setIsSignInModalOpen(false)}
                className="btn-ghost"
                style={{ padding: 6, borderRadius: "50%" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleQuickSignInSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 6 }}>
                  STUDENT NAME OR USERNAME
                </label>
                <input
                  type="text"
                  id="signin-input-name"
                  value={signInName}
                  onChange={(e) => setSignInName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-medium)",
                    fontSize: 14,
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                id="btn-signin-submit"
                className="btn-cta-green"
                style={{ width: "100%", padding: "14px 0" }}
              >
                Sign In & Continue
              </button>

              <div style={{ textAlign: "center", marginTop: 8 }}>
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  New to LearnNova?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignInModalOpen(false);
                      setIsSignUpModalOpen(true);
                    }}
                    style={{ color: "var(--brand-primary)", fontWeight: 700, textDecoration: "underline" }}
                  >
                    Create an account
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dynamic Keyframe Animations for Particles & Bounce */}
      <style>{`
        @keyframes particleFloat {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.6);
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) scale(1.4);
          }
        }

        .lumi-bounce {
          animation: lumiBounce 0.5s ease;
        }

        @keyframes lumiBounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.12) translateY(-12px);
          }
        }

        @media (max-width: 768px) {
          .desktop-subjects {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
