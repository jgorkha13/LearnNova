// API Client for LearnNova with graceful fallback & offline persistence

const BASE_URL = "";

export async function fetchCurriculum() {
  try {
    const res = await fetch(`${BASE_URL}/api/curriculum`);
    if (!res.ok) throw new Error("Curriculum fetch failed");
    return await res.json();
  } catch (err) {
    console.warn("Using offline curriculum fallback:", err);
    return null;
  }
}

export async function fetchProfile() {
  try {
    const res = await fetch(`${BASE_URL}/api/profile`);
    if (!res.ok) throw new Error("Profile fetch failed");
    return await res.json();
  } catch (err) {
    console.warn("Using cached profile fallback:", err);
    const cached = localStorage.getItem("learnnova_profile");
    return cached ? { profile: JSON.parse(cached) } : null;
  }
}

export async function updateProfile(profileUpdates) {
  try {
    const res = await fetch(`${BASE_URL}/api/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileUpdates),
    });
    if (!res.ok) throw new Error("Profile update failed");
    const data = await res.json();
    if (data.profile) {
      localStorage.setItem("learnnova_profile", JSON.stringify(data.profile));
    }
    return data;
  } catch (err) {
    console.warn("Updating local profile backup:", err);
    const cached = localStorage.getItem("learnnova_profile");
    const current = cached ? JSON.parse(cached) : {};
    const updated = { ...current, ...profileUpdates };
    localStorage.setItem("learnnova_profile", JSON.stringify(updated));
    return { success: true, profile: updated };
  }
}

export async function fetchTopicsDashboard() {
  const res = await fetch(`${BASE_URL}/api/topics-dashboard`);
  if (!res.ok) throw new Error("Failed to fetch topics dashboard");
  return await res.json();
}

export async function switchTopic({ subject, topic, topicId, grade, board }) {
  const res = await fetch(`${BASE_URL}/api/switch-topic`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, topic, topicId, grade, board }),
  });
  if (!res.ok) throw new Error("Failed to switch topic");
  return await res.json();
}

export async function fetchStreakActivity() {
  const res = await fetch(`${BASE_URL}/api/streak-activity`);
  if (!res.ok) throw new Error("Failed to fetch streak activity");
  return await res.json();
}

export async function startAssessment(topicId) {
  try {
    const res = await fetch(`${BASE_URL}/api/assessment/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topicId }),
    });
    if (!res.ok) throw new Error("Assessment start failed");
    return await res.json();
  } catch (err) {
    console.error("Start assessment error:", err);
    throw err;
  }
}

export async function submitAssessmentAnswer({ questionId, selectedOptionId }) {
  const res = await fetch(`${BASE_URL}/api/assessment/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionId, selectedOptionId }),
  });
  if (!res.ok) throw new Error("Assessment submit failed");
  return await res.json();
}

export async function fetchAssessmentResults() {
  const res = await fetch(`${BASE_URL}/api/assessment/results`);
  if (!res.ok) throw new Error("Failed to fetch assessment results");
  return await res.json();
}

export async function fetchLearningPath() {
  const res = await fetch(`${BASE_URL}/api/learning-path`);
  if (!res.ok) throw new Error("Failed to fetch learning path");
  return await res.json();
}

export async function completeActivity({ activityId, conceptId, score }) {
  const res = await fetch(`${BASE_URL}/api/learning-path/complete-activity`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ activityId, conceptId, score }),
  });
  if (!res.ok) throw new Error("Failed to complete activity");
  return await res.json();
}

export async function fetchLesson(lessonId) {
  const res = await fetch(`${BASE_URL}/api/lesson/${lessonId}`);
  if (!res.ok) throw new Error("Failed to fetch lesson");
  return await res.json();
}

export async function sendLessonAction({ lessonId, actionType }) {
  const res = await fetch(`${BASE_URL}/api/lesson/action`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonId, actionType }),
  });
  if (!res.ok) throw new Error("Failed to execute lesson action");
  return await res.json();
}

export async function fetchPractice() {
  const res = await fetch(`${BASE_URL}/api/practice`);
  if (!res.ok) throw new Error("Failed to fetch practice questions");
  return await res.json();
}

export async function submitPractice({ questionId, selectedOptionId }) {
  const res = await fetch(`${BASE_URL}/api/practice/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionId, selectedOptionId }),
  });
  if (!res.ok) throw new Error("Failed to submit practice question");
  return await res.json();
}

export async function fetchProgress() {
  const res = await fetch(`${BASE_URL}/api/progress`);
  if (!res.ok) throw new Error("Failed to fetch progress metrics");
  return await res.json();
}

export async function sendTutorMessage({ message, context }) {
  const res = await fetch(`${BASE_URL}/api/tutor/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, context }),
  });
  if (!res.ok) throw new Error("Failed to query tutor");
  return await res.json();
}

export async function resetProgress() {
  const res = await fetch(`${BASE_URL}/api/reset`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to reset progress");
  localStorage.removeItem("learnnova_profile");
  return await res.json();
}

export async function fetchDomains() {
  const res = await fetch(`${BASE_URL}/api/curriculum/domains`);
  if (!res.ok) throw new Error("Failed to fetch curriculum domains");
  return await res.json();
}

export async function fetchDomainCurriculum(domainId) {
  const res = await fetch(`${BASE_URL}/api/curriculum/domain/${domainId}`);
  if (!res.ok) throw new Error(`Failed to fetch curriculum for ${domainId}`);
  return await res.json();
}

export async function updateTopicProgress(payload) {
  const res = await fetch(`${BASE_URL}/api/topic-progress/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update topic progress");
  return await res.json();
}

export async function fetchTopicQuiz(topicId, params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/api/topic-quiz/${topicId}${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error("Failed to fetch topic quiz");
  return await res.json();
}

export async function submitTopicQuiz({ topicId, answers, timeSpentSeconds }) {
  const res = await fetch(`${BASE_URL}/api/topic-quiz/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topicId, answers, timeSpentSeconds }),
  });
  if (!res.ok) throw new Error("Failed to submit topic quiz");
  return await res.json();
}

