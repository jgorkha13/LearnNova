import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import TutorModal from "./components/TutorModal";
import MiloCharacter from "./components/MiloCharacter";
import SubjectDashboardModal from "./components/SubjectDashboardModal";
import StreakModal from "./components/StreakModal";

// Views
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
  // Mode: 'app' | 'onboarding' | 'assessment' | 'diagnostic_report'
  const [mode, setMode] = useState("app");
  const [activeTab, setActiveTab] = useState("learn"); // 'learn' | 'practice' | 'progress' | 'profile'
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isSubjectDashboardOpen, setIsSubjectDashboardOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);

  // Initial Load
  const loadInitialData = async () => {
    try {
      const pData = await fetchProfile();
      if (pData?.profile) {
        setProfile(pData.profile);
        if (!pData.profile.isOnboarded) {
          setMode("onboarding");
        } else {
          setMode("app");
        }
      } else {
        setMode("onboarding");
      }

      const progData = await fetchProgress();
      if (progData) {
        setProgress(progData);
      }
    } catch (err) {
      console.error("Initialization error:", err);
      setMode("onboarding");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Handlers
  const handleOnboardingComplete = async (newProfile) => {
    setLoading(true);
    try {
      const data = await updateProfile({ ...newProfile, isOnboarded: true });
      setProfile(data.profile);
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
    setMode("onboarding");
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
        <MiloCharacter expression="thinking" size={90} />
        <p style={{ fontSize: 16, fontWeight: 600, color: "var(--text-secondary)" }}>
          Loading LearnNova...
        </p>
      </div>
    );
  }

  // 1. Onboarding Mode
  if (mode === "onboarding") {
    return <Onboarding onComplete={handleOnboardingComplete} />;
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
