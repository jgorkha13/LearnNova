import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import TutorModal from "./components/TutorModal";
import LumiCharacter from "./components/LumiCharacter";
import SubjectDashboardModal from "./components/SubjectDashboardModal";
import StreakModal from "./components/StreakModal";

// Views
import LandingPage from "./views/LandingPage";
import Onboarding from "./views/Onboarding";
import Assessment from "./views/Assessment";
import DiagnosticReport from "./views/DiagnosticReport";
import LearnView from "./views/LearnView";
import PracticeView from "./views/PracticeView";
import ProgressView from "./views/ProgressView";
import ProfileView from "./views/ProfileView";

import { fetchProfile, updateProfile, fetchProgress } from "./services/api";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);

  // App Navigation & Workflow State
  // Mode: 'landing' | 'onboarding' | 'assessment' | 'diagnostic_report' | 'app'
  const [mode, setMode] = useState("landing");
  const [activeTab, setActiveTab] = useState("learn"); // 'learn' | 'practice' | 'progress' | 'profile'
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isSubjectDashboardOpen, setIsSubjectDashboardOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [onboardingInitialData, setOnboardingInitialData] = useState({});

  // Initial Load
  const loadInitialData = async () => {
    try {
      const pData = await fetchProfile();
      if (pData?.profile) {
        setProfile(pData.profile);
      }

      const progData = await fetchProgress();
      if (progData) {
        setProgress(progData);
      }

      // Check URL parameters for explicit view overrides
      const params = new URLSearchParams(window.location.search);
      if (params.get("view") === "app") {
        setMode("app");
      } else if (params.get("view") === "onboarding") {
        setMode("onboarding");
      } else {
        // Default to the interactive Duolingo Landing Page
        setMode("landing");
      }
    } catch (err) {
      console.error("Initialization error:", err);
      setMode("landing");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Handlers
  const handleGetStarted = async (customData) => {
    if (customData?.name) {
      // Direct signup from Landing page modal
      setLoading(true);
      try {
        const payload = {
          isOnboarded: true,
          name: customData.name,
          category: customData.category || "entrance",
          grade: "Class 12",
          board: "CBSE",
          subject: customData.subject || "Physics",
          topic: customData.topic || "Current Electricity",
          topicId: customData.topicId || "current_electricity",
          exam: customData.category === "entrance" ? "JEE Main" : "",
          preferences: {
            studyTime: customData.preferences?.studyTime || "30 min",
            confidence: "medium",
            struggleArea: "Numerical problem solving & formula application",
            learningStyle: "Simple intuitive explanations with worked examples",
          },
        };
        const data = await updateProfile(payload);
        setProfile(data.profile);
        const progData = await fetchProgress();
        if (progData) setProgress(progData);
        setMode("assessment");
      } catch (err) {
        console.error("Direct signup error:", err);
        setMode("assessment");
      } finally {
        setLoading(false);
      }
    } else {
      if (customData) {
        setOnboardingInitialData(customData);
      }
      setMode("onboarding");
    }
  };

  const handleSignIn = async (name) => {
    setLoading(true);
    try {
      if (name && profile) {
        const updated = await updateProfile({ ...profile, name, isOnboarded: true });
        setProfile(updated.profile);
      }
      const progData = await fetchProgress();
      if (progData) setProgress(progData);
      setMode("app");
      setActiveTab("learn");
    } catch (e) {
      console.warn("Sign in error:", e);
      setMode("app");
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = async (newProfile) => {
    setLoading(true);
    try {
      const data = await updateProfile({ ...newProfile, isOnboarded: true });
      setProfile(data.profile);
      const progData = await fetchProgress();
      if (progData) setProgress(progData);
      setMode("assessment");
    } catch (err) {
      console.error("Failed to complete onboarding:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssessmentComplete = async () => {
    try {
      const progData = await fetchProgress();
      if (progData) setProgress(progData);
    } catch (e) {
      console.warn("Could not refresh progress:", e);
    }
    setMode("diagnostic_report");
  };

  const handleProceedToPath = () => {
    setMode("app");
    setActiveTab("learn");
  };

  const handleResetAll = () => {
    setProfile(null);
    setProgress(null);
    setMode("landing");
  };

  const handleTopicSwitched = async (updatedProfile) => {
    setProfile(updatedProfile);
    try {
      const progData = await fetchProgress();
      if (progData) setProgress(progData);
    } catch (err) {
      console.warn("Could not reload progress:", err);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--bg-canvas)",
          gap: 16,
        }}
      >
        <LumiCharacter expression="thinking" size={90} floating={true} />
        <p style={{ fontSize: 16, fontWeight: 600, color: "var(--text-secondary)" }}>
          Loading LearnNova...
        </p>
      </div>
    );
  }

  // 0. Interactive Duolingo Signup Landing Page Mode
  if (mode === "landing") {
    return (
      <LandingPage
        onGetStarted={handleGetStarted}
        onSignIn={handleSignIn}
        existingProfile={profile}
      />
    );
  }

  // 1. Onboarding Mode
  if (mode === "onboarding") {
    return (
      <Onboarding
        initialSelections={onboardingInitialData}
        onComplete={handleOnboardingComplete}
        onExit={() => setMode("landing")}
      />
    );
  }

  // 2. Focused Diagnostic Assessment Mode
  if (mode === "assessment") {
    return (
      <Assessment
        topicId={profile?.topicId || "current_electricity"}
        onExit={() => setMode("app")}
        onComplete={handleAssessmentComplete}
      />
    );
  }

  // 3. Post-Assessment Knowledge Gap Report Mode
  if (mode === "diagnostic_report") {
    return (
      <div className="app-shell">
        <Navigation
          activeTab="learn"
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setMode("app");
          }}
          onOpenTutor={() => setIsTutorOpen(true)}
          onOpenSubjectDashboard={() => setIsSubjectDashboardOpen(true)}
          onOpenStreakModal={() => setIsStreakModalOpen(true)}
          onViewLandingPage={() => setMode("landing")}
        />
        <div className="main-content">
          <Header
            profile={profile}
            progress={progress}
            onOpenTutor={() => setIsTutorOpen(true)}
            onOpenSubjectDashboard={() => setIsSubjectDashboardOpen(true)}
            onOpenStreakModal={() => setIsStreakModalOpen(true)}
            onStartDiagnostic={() => setMode("assessment")}
          />
          <DiagnosticReport
            onProceedToPath={handleProceedToPath}
            onOpenTutor={() => setIsTutorOpen(true)}
          />
        </div>
        <TutorModal
          isOpen={isTutorOpen}
          onClose={() => setIsTutorOpen(false)}
          profile={profile}
          activeTopic={profile?.topic || "Current Electricity"}
        />
        <SubjectDashboardModal
          isOpen={isSubjectDashboardOpen}
          onClose={() => setIsSubjectDashboardOpen(false)}
          onTopicSwitched={handleTopicSwitched}
        />
        <StreakModal
          isOpen={isStreakModalOpen}
          onClose={() => setIsStreakModalOpen(false)}
        />
      </div>
    );
  }

  // 4. Main Application Experience
  return (
    <div className="app-shell">
      {/* Sidebar Navigation */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenTutor={() => setIsTutorOpen(true)}
        onOpenSubjectDashboard={() => setIsSubjectDashboardOpen(true)}
        onOpenStreakModal={() => setIsStreakModalOpen(true)}
        onViewLandingPage={() => setMode("landing")}
      />

      {/* Main Workspace Area */}
      <div className="main-content">
        <Header
          profile={profile}
          progress={progress}
          onOpenTutor={() => setIsTutorOpen(true)}
          onOpenSubjectDashboard={() => setIsSubjectDashboardOpen(true)}
          onOpenStreakModal={() => setIsStreakModalOpen(true)}
          onStartDiagnostic={() => setMode("assessment")}
        />

        <main style={{ flex: 1 }}>
          {activeTab === "learn" && (
            <LearnView
              key={profile?.topicId}
              onStartDiagnostic={() => setMode("assessment")}
              onOpenTutor={() => setIsTutorOpen(true)}
            />
          )}

          {activeTab === "practice" && (
            <PracticeView
              key={profile?.topicId}
              onOpenTutor={() => setIsTutorOpen(true)}
              onStartDiagnostic={() => setMode("assessment")}
            />
          )}

          {activeTab === "progress" && (
            <ProgressView
              key={profile?.topicId}
              onOpenTutor={() => setIsTutorOpen(true)}
            />
          )}

          {activeTab === "profile" && (
            <ProfileView
              profile={profile}
              onProfileUpdated={(updated) => setProfile(updated)}
              onResetAll={handleResetAll}
              onViewLandingPage={() => setMode("landing")}
            />
          )}
        </main>
      </div>

      {/* Modals & Drawers */}
      <TutorModal
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        profile={profile}
        activeTopic={profile?.topic || "Current Electricity"}
      />
      <SubjectDashboardModal
        isOpen={isSubjectDashboardOpen}
        onClose={() => setIsSubjectDashboardOpen(false)}
        onTopicSwitched={handleTopicSwitched}
      />
      <StreakModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
      />
    </div>
  );
}
