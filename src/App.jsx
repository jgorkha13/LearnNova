import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import TutorModal from "./components/TutorModal";
import LumiCharacter from "./components/LumiCharacter";
import SubjectDashboardModal from "./components/SubjectDashboardModal";
import StreakModal from "./components/StreakModal";

// Views
import LandingPage from "./views/LandingPage";
import DashboardView from "./views/DashboardView";
import Onboarding from "./views/Onboarding";
import Assessment from "./views/Assessment";
import DiagnosticReport from "./views/DiagnosticReport";
import LearnView from "./views/LearnView";
import PracticeView from "./views/PracticeView";
import ProgressView from "./views/ProgressView";
import ProfileView from "./views/ProfileView";
import LibraryView from "./views/LibraryView";
import LessonModal from "./views/LessonModal";

import { fetchProfile, updateProfile, fetchProgress, fetchStreakActivity } from "./services/api";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [streakDays, setStreakDays] = useState(7);

  // App Navigation & Workflow State
  // Mode: 'landing' | 'onboarding' | 'assessment' | 'diagnostic_report' | 'app'
  const [mode, setMode] = useState("landing");
  // ActiveTab: 'dashboard' | 'learn' | 'practice' | 'progress' | 'profile'
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isSubjectDashboardOpen, setIsSubjectDashboardOpen] = useState(false);
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [onboardingInitialData, setOnboardingInitialData] = useState({});

  // Initial Load
  const loadInitialData = async () => {
    try {
      const pData = await fetchProfile();
      if (pData?.profile) {
        setProfile(pData.profile);
      }

      const [progData, streakData] = await Promise.all([
        fetchProgress().catch(() => null),
        fetchStreakActivity().catch(() => null),
      ]);

      if (progData) setProgress(progData);
      if (streakData?.currentStreak) setStreakDays(streakData.currentStreak);

      // Check URL parameters for explicit view overrides
      const params = new URLSearchParams(window.location.search);
      if (params.get("view") === "app" || params.get("view") === "dashboard") {
        setMode("app");
        setActiveTab("dashboard");
      } else if (params.get("view") === "onboarding") {
        setMode("onboarding");
      } else {
        // Default to landing page for first-time / testing view, or app if requested
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
          category: customData.category || "college",
          domain: customData.domain || (customData.grade === "Class 11" ? "class_11" : "cse_3rd_year"),
          grade: customData.grade || "B.Tech CSE - 3rd Year",
          board: customData.board || "CBSE",
          subject: customData.subject || "Software Engineering",
          topic: customData.topic || "Agile Manifesto & Scrum Framework",
          topicId: customData.topicId || "se_u1_t1",
          exam: customData.category === "entrance" ? "JEE Main" : "",
          preferences: {
            studyTime: customData.preferences?.studyTime || "30 min",
            confidence: "medium",
            struggleArea: "System design & algorithmic trade-offs",
            learningStyle: "Simple intuitive explanations with worked examples",
          },
        };
        const data = await updateProfile(payload);
        setProfile(data.profile);
        const progData = await fetchProgress();
        if (progData) setProgress(progData);
        // Start lessons directly without prerequisite quizzes
        setMode("app");
        setActiveTab("dashboard");
        if (customData?.lessonId || customData?.topicId) {
          setActiveLessonId(customData.lessonId || `lesson_${customData.topicId}`);
        }
      } catch (err) {
        console.error("Direct signup error:", err);
        setMode("app");
        setActiveTab("dashboard");
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
      setActiveTab("dashboard");
    } catch (e) {
      console.warn("Sign in error:", e);
      setMode("app");
      setActiveTab("dashboard");
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
      // Directly start lessons for new learners - do not force quizzes
      setMode("app");
      setActiveTab("dashboard");
      if (newProfile?.topicId) {
        setActiveLessonId(`lesson_${newProfile.topicId}`);
      }
    } catch (err) {
      console.error("Failed to complete onboarding:", err);
      setMode("app");
      setActiveTab("dashboard");
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
    setActiveTab("dashboard");
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
        onExit={() => {
          setMode("app");
          setActiveTab("dashboard");
        }}
        onComplete={handleAssessmentComplete}
      />
    );
  }

  // 3. Post-Assessment Knowledge Gap Report Mode
  if (mode === "diagnostic_report") {
    return (
      <div className="app-shell">
        <Navigation
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setMode("app");
          }}
          onOpenTutor={() => setIsTutorOpen(true)}
          onOpenSubjectDashboard={() => setIsSubjectDashboardOpen(true)}
          onOpenStreakModal={() => setIsStreakModalOpen(true)}
          onViewLandingPage={() => setMode("landing")}
          streakDays={streakDays}
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
      {/* Sidebar Navigation (Matching exact screenshot layout) */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenTutor={() => setIsTutorOpen(true)}
        onOpenSubjectDashboard={() => setIsSubjectDashboardOpen(true)}
        onOpenStreakModal={() => setIsStreakModalOpen(true)}
        onViewLandingPage={() => setMode("landing")}
        streakDays={streakDays}
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

        <main style={{ flex: 1, backgroundColor: "var(--bg-canvas)" }}>
          {/* Dashboard Tab (Exact Replica + Enhanced Informative) */}
          {activeTab === "dashboard" && (
            <DashboardView
              key={profile?.topicId}
              profile={profile}
              progress={progress}
              onStartLesson={(lessonId) => setActiveLessonId(lessonId)}
              onOpenTutor={(ctx) => setIsTutorOpen(true)}
              onOpenStreakModal={() => setIsStreakModalOpen(true)}
              onOpenSubjectDashboard={() => setIsSubjectDashboardOpen(true)}
              onNavigateTo={(tab) => setActiveTab(tab)}
              onStartDiagnostic={() => setMode("assessment")}
            />
          )}

          {activeTab === "library" && (
            <LibraryView
              key={profile?.domain || "library"}
              profile={profile}
              onStartLesson={(lessonId) => setActiveLessonId(lessonId)}
              onOpenTutor={(ctx) => setIsTutorOpen(true)}
              onTopicSwitched={handleTopicSwitched}
            />
          )}

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

      {/* Interactive Lesson Modal */}
      {activeLessonId && (
        <LessonModal
          lessonId={activeLessonId}
          onClose={() => setActiveLessonId(null)}
          onLessonCompleted={() => {
            setActiveLessonId(null);
            loadInitialData();
          }}
        />
      )}

      {/* Tutor & Curriculum Modals */}
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
