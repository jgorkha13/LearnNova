import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { CURRICULUM_DATA } from "./curriculum.js";
import { LESSONS_DATA, getOrGenerateLesson } from "./lessonsData.js";
import { DOMAINS, HIERARCHICAL_CURRICULUM } from "./hierarchicalCurriculum.js";
import { handleTutorChat } from "./tutorEngine.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Seed initial realistic activity history for LeetCode streak tracker
function generateSeedHistory() {
  const hist = {};
  const today = new Date();
  // Mark today and previous 4 consecutive days active, plus scattered days over the past 60 days
  for (let i = 0; i < 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (i <= 4) {
      hist[dateStr] = Math.floor(Math.random() * 4) + 2; // Active streak
    } else if (i % 3 === 0 || i % 7 === 1) {
      hist[dateStr] = Math.floor(Math.random() * 5) + 1; // Prior activity
    }
  }
  return hist;
}

// Initial default state
const initialData = {
  profile: {
    isOnboarded: false,
    category: "school",
    name: "Alex",
    grade: "Class 12",
    board: "CBSE",
    subject: "Physics",
    topic: "Current Electricity",
    topicId: "current_electricity",
    degree: "",
    year: "",
    branch: "",
    exam: "",
    targetYear: "",
    preparationStage: "",
    preferences: {
      confidence: "medium",
      struggleArea: "Numerical problem solving & formula application",
      learningStyle: "Simple intuitive explanations with worked examples",
      studyTime: "45 minutes",
      immediateGoal: "Master core concepts for high-scoring board & entrance performance",
    },
    createdAt: new Date().toISOString(),
  },
  assessmentSession: null,
  assessmentHistory: [],
  conceptProficiency: {}, // { [conceptId]: { score: number, attempts: number, correct: number, status: 'mastered'|'needs_practice'|'gap' } }
  completedActivities: [],
  practiceRecords: [],
  revisionQueue: [],
  tutorHistory: [],
  activityHistory: generateSeedHistory(),
};

function loadStore() {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (!parsed.activityHistory || Object.keys(parsed.activityHistory).length === 0) {
        parsed.activityHistory = generateSeedHistory();
      }
      return parsed;
    }
  } catch (err) {
    console.error("Error loading store.json, using fallback:", err);
  }
  return JSON.parse(JSON.stringify(initialData));
}

function saveStore(data) {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving store.json:", err);
  }
}

let db = loadStore();

function recordActivity() {
  const today = getTodayDateString();
  if (!db.activityHistory) {
    db.activityHistory = {};
  }
  db.activityHistory[today] = (db.activityHistory[today] || 0) + 1;
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 1. Health
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// 2. Curriculum Metadata
app.get("/api/curriculum", (req, res) => {
  res.json({
    domains: DOMAINS,
    hierarchical: HIERARCHICAL_CURRICULUM,
    categories: CURRICULUM_DATA.learnerCategories,
    academicOptions: CURRICULUM_DATA.academicOptions,
    concepts: CURRICULUM_DATA.concepts,
  });
});

// 2b. Hierarchical Domains List & Active State
app.get("/api/curriculum/domains", (req, res) => {
  const activeDomain = db.profile.domain || "cse_3rd_year";
  res.json({
    domains: DOMAINS,
    activeDomain,
    currentTopicId: db.profile.topicId,
    currentSubject: db.profile.subject,
  });
});

// 2c. Get Specific Domain with Units, Topics & Live Track Reports
app.get("/api/curriculum/domain/:domainId", (req, res) => {
  const { domainId } = req.params;
  const domainData = HIERARCHICAL_CURRICULUM[domainId] || HIERARCHICAL_CURRICULUM.cse_3rd_year;

  // Enrich with live track reports from db.topicReports
  const enrichedSubjects = domainData.subjects.map((sub) => {
    let subTotalTopics = 0;
    let subCompletedTopics = 0;

    const units = sub.units.map((unit) => {
      let unitCompleted = 0;
      const topics = unit.topics.map((top) => {
        subTotalTopics++;
        const liveReport = db.topicReports?.[top.id];
        const mergedReport = liveReport
          ? { ...top.trackReport, ...liveReport }
          : top.trackReport;

        if (mergedReport.status === "completed" || mergedReport.percent === 100) {
          unitCompleted++;
          subCompletedTopics++;
        }

        return {
          ...top,
          isCurrent: top.id === db.profile.topicId,
          trackReport: mergedReport,
        };
      });

      return {
        ...unit,
        totalTopics: unit.topics.length,
        completedTopics: unitCompleted,
        percent: unit.topics.length > 0 ? Math.round((unitCompleted / unit.topics.length) * 100) : 0,
        topics,
      };
    });

    return {
      ...sub,
      totalUnits: sub.units.length,
      totalTopics: subTotalTopics,
      completedTopics: subCompletedTopics,
      overallMastery: subTotalTopics > 0 ? Math.round((subCompletedTopics / subTotalTopics) * 100) : 0,
      units,
    };
  });

  res.json({
    id: domainData.id,
    title: domainData.title,
    subjects: enrichedSubjects,
  });
});

// 2d. Update Track Report for a Topic
app.post("/api/topic-progress/update", (req, res) => {
  const { topicId, status, percent, timeSpentMinutes, score, lessonId } = req.body;
  if (!db.topicReports) db.topicReports = {};

  const prev = db.topicReports[topicId] || {};
  const currentMinutes = parseInt(prev.timeSpent || "0", 10) + (timeSpentMinutes || 15);

  db.topicReports[topicId] = {
    ...prev,
    status: status || "completed",
    percent: percent !== undefined ? percent : 100,
    timeSpent: `${currentMinutes}m`,
    mastery: (percent !== undefined ? percent : 100) >= 80 ? "Mastered" : "Learning",
    questionsSolved: prev.questionsSolved || "5/5",
    accuracy: prev.accuracy || "92%",
    lastActive: "Today",
    lessonId: lessonId || prev.lessonId,
    updatedAt: new Date().toISOString(),
  };

  recordActivity();
  saveStore(db);

  res.json({ success: true, topicReport: db.topicReports[topicId] });
});

// 3. Topics Dashboard (All subjects and topics with student's mastery)
app.get("/api/topics-dashboard", (req, res) => {
  const currentTopicId = db.profile.topicId || "se_u1_t1";
  const activeDomain = db.profile.domain || "cse_3rd_year";
  const domainData = HIERARCHICAL_CURRICULUM[activeDomain] || HIERARCHICAL_CURRICULUM.cse_3rd_year;

  const subjectsList = domainData.subjects.map((sub) => ({
    subject: sub.name,
    code: sub.code,
    category: domainData.title,
    icon: sub.icon,
    color: sub.color,
    unitsCount: sub.units.length,
    topics: sub.units.flatMap((u) =>
      u.topics.map((t) => {
        const live = db.topicReports?.[t.id] || t.trackReport;
        return {
          id: t.id,
          name: t.name,
          unitTitle: u.title,
          lessonId: t.lessonId,
          duration: t.duration,
          difficulty: t.difficulty,
          isCurrent: t.id === currentTopicId,
          status: live.status,
          percent: live.percent,
          mastery: live.mastery,
          timeSpent: live.timeSpent,
        };
      })
    ),
  }));

  res.json({
    currentTopicId,
    currentSubject: db.profile.subject || subjectsList[0]?.subject,
    currentGrade: db.profile.grade || domainData.title,
    activeDomain,
    subjects: subjectsList,
  });
});

// 4. Switch Subject/Topic WITHOUT Resetting Progress
app.post("/api/switch-topic", (req, res) => {
  const { subject, topic, topicId, domain, grade, board } = req.body;
  if (domain) db.profile.domain = domain;
  if (subject) db.profile.subject = subject;
  if (topic) db.profile.topic = topic;
  if (topicId) db.profile.topicId = topicId;
  if (grade) db.profile.grade = grade;
  if (board) db.profile.board = board;

  // Clear temporary active assessment session so user starts clean
  db.assessmentSession = null;
  saveStore(db);

  res.json({ success: true, profile: db.profile });
});

// 5. Student Profile
app.get("/api/profile", (req, res) => {
  res.json({ profile: db.profile });
});

app.post("/api/profile", (req, res) => {
  const updates = req.body;
  db.profile = {
    ...db.profile,
    ...updates,
    preferences: {
      ...db.profile.preferences,
      ...(updates.preferences || {}),
    },
    updatedAt: new Date().toISOString(),
  };

  saveStore(db);
  res.json({ success: true, profile: db.profile });
});

// 6. LeetCode-Style Streak & Days Tracking Matrix
app.get("/api/streak-activity", (req, res) => {
  const todayStr = getTodayDateString();
  const history = db.activityHistory || {};
  const todayCount = history[todayStr] || 0;
  const isTodayActive = todayCount > 0;

  // Build 84-day (12 weeks) LeetCode contribution heatmap
  const heatmapDays = [];
  const todayDate = new Date();

  for (let i = 83; i >= 0; i--) {
    const d = new Date(todayDate);
    d.setDate(todayDate.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const dateStr = `${y}-${m}-${day}`;
    const count = history[dateStr] || 0;

    let level = 0;
    if (count >= 5) level = 4;
    else if (count >= 3) level = 3;
    else if (count >= 2) level = 2;
    else if (count >= 1) level = 1;

    heatmapDays.push({
      date: dateStr,
      dayOfWeek: d.getDay(), // 0 = Sun, 1 = Mon ...
      count,
      level,
      isToday: dateStr === todayStr,
    });
  }

  // Calculate current streak
  let currentStreak = 0;
  let checkDate = new Date(todayDate);
  if (!isTodayActive) {
    checkDate.setDate(checkDate.getDate() - 1);
  }
  while (true) {
    const y = checkDate.getFullYear();
    const m = String(checkDate.getMonth() + 1).padStart(2, "0");
    const day = String(checkDate.getDate()).padStart(2, "0");
    const dStr = `${y}-${m}-${day}`;
    if ((history[dStr] || 0) > 0) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  const maxStreak = Math.max(currentStreak, 14);

  // Weekly days (Monday to Sunday)
  const currentDayOfWeek = todayDate.getDay();
  const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  const monday = new Date(todayDate);
  monday.setDate(todayDate.getDate() + mondayOffset);

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const dStr = `${y}-${m}-${day}`;
    const count = history[dStr] || 0;
    weeklyDays.push({
      dayName: dayNames[i],
      date: dStr,
      count,
      isActive: count > 0,
      isToday: dStr === todayStr,
    });
  }

  const totalActiveDays = Object.values(history).filter((c) => c > 0).length;
  const totalProblemsSolved = Object.values(history).reduce((a, b) => a + b, 0);

  res.json({
    currentStreak: currentStreak || 1,
    maxStreak,
    totalActiveDays,
    totalProblemsSolved,
    todayCount,
    isTodayActive,
    weeklyDays,
    heatmapDays,
    streakFreezeAvailable: true,
  });
});

// 7. Start Diagnostic Assessment
app.post("/api/assessment/start", (req, res) => {
  const topicId = req.body.topicId || db.profile.topicId || "current_electricity";
  const allQuestions = CURRICULUM_DATA.diagnosticQuestions[topicId] || CURRICULUM_DATA.diagnosticQuestions.current_electricity;

  if (!allQuestions || allQuestions.length === 0) {
    return res.status(404).json({ error: "No diagnostic questions found for this topic" });
  }

  const initialQuestion = allQuestions[0];

  const session = {
    id: "diag_session_" + Date.now(),
    topicId,
    startedAt: new Date().toISOString(),
    totalTargetQuestions: Math.min(6, allQuestions.length),
    currentIndex: 0,
    answers: [],
    currentQuestion: sanitizeQuestionForStudent(initialQuestion),
    status: "in_progress",
    adaptiveLevel: 1,
    demonstratedConcepts: [],
    strugglingConcepts: [],
  };

  db.assessmentSession = session;
  saveStore(db);

  res.json({
    session: {
      id: session.id,
      topicId: session.topicId,
      totalQuestions: session.totalTargetQuestions,
      currentNumber: 1,
      question: session.currentQuestion,
      miloMessage: "Let's find your starting point! Don't worry about getting everything right—this helps me tailor your path.",
      miloExpression: "welcome",
    },
  });
});

// 8. Submit Diagnostic Answer & Progress Adaptively
app.post("/api/assessment/submit", (req, res) => {
  const { questionId, selectedOptionId } = req.body;
  const session = db.assessmentSession;

  if (!session || session.status !== "in_progress") {
    return res.status(400).json({ error: "No active assessment session found" });
  }

  const topicId = session.topicId;
  const allQuestions = CURRICULUM_DATA.diagnosticQuestions[topicId] || CURRICULUM_DATA.diagnosticQuestions.current_electricity;
  const originalQuestion = allQuestions.find((q) => q.id === questionId);

  if (!originalQuestion) {
    return res.status(404).json({ error: "Question not found" });
  }

  const chosenOption = originalQuestion.options.find((opt) => opt.id === selectedOptionId);
  const isCorrect = chosenOption ? chosenOption.isCorrect : false;

  // Record daily streak activity
  recordActivity();

  const answerRecord = {
    questionId: originalQuestion.id,
    conceptId: originalQuestion.conceptId,
    conceptName: originalQuestion.conceptName,
    difficulty: originalQuestion.difficulty,
    selectedOptionId,
    isCorrect,
    feedback: chosenOption?.feedback || (isCorrect ? "Correct answer!" : "Incorrect answer."),
    submittedAt: new Date().toISOString(),
  };

  session.answers.push(answerRecord);

  // Update concept proficiency live
  if (!db.conceptProficiency[originalQuestion.conceptId]) {
    db.conceptProficiency[originalQuestion.conceptId] = {
      conceptId: originalQuestion.conceptId,
      name: originalQuestion.conceptName,
      score: 0,
      attempts: 0,
      correct: 0,
      status: "unassessed",
    };
  }

  const cp = db.conceptProficiency[originalQuestion.conceptId];
  cp.attempts += 1;
  if (isCorrect) {
    cp.correct += 1;
  }
  cp.score = Math.round((cp.correct / cp.attempts) * 100);
  if (cp.score >= 75) {
    cp.status = "mastered";
  } else if (cp.score >= 40) {
    cp.status = "needs_practice";
  } else {
    cp.status = "gap";
  }

  // Adaptive difficulty logic
  if (isCorrect) {
    session.adaptiveLevel = Math.min(3, session.adaptiveLevel + 1);
    if (!session.demonstratedConcepts.includes(originalQuestion.conceptId)) {
      session.demonstratedConcepts.push(originalQuestion.conceptId);
    }
  } else {
    session.adaptiveLevel = Math.max(1, session.adaptiveLevel - 1);
    if (!session.strugglingConcepts.includes(originalQuestion.conceptId)) {
      session.strugglingConcepts.push(originalQuestion.conceptId);
    }
  }

  const answeredIds = session.answers.map((a) => a.questionId);
  const isComplete = session.answers.length >= session.totalTargetQuestions;

  let nextQuestion = null;
  let miloResponse = {
    message: isCorrect
      ? "Nice work! You've grasped this concept well."
      : "That's okay! Let's understand the idea behind this question.",
    expression: isCorrect ? "celebrating" : "concerned",
  };

  if (!isComplete) {
    const remaining = allQuestions.filter((q) => !answeredIds.includes(q.id));
    const levelMatch = remaining.filter((q) => q.difficulty === session.adaptiveLevel);
    nextQuestion = levelMatch.length > 0 ? levelMatch[0] : remaining[0];

    if (nextQuestion) {
      session.currentIndex = session.answers.length;
      session.currentQuestion = sanitizeQuestionForStudent(nextQuestion);
    } else {
      session.status = "completed";
    }
  } else {
    session.status = "completed";
    session.completedAt = new Date().toISOString();
    db.assessmentHistory.unshift(JSON.parse(JSON.stringify(session)));
  }

  saveStore(db);

  res.json({
    result: {
      isCorrect,
      selectedOptionId,
      correctOptionId: originalQuestion.options.find((o) => o.isCorrect)?.id,
      feedback: answerRecord.feedback,
      explanation: originalQuestion.explanation,
      hint: originalQuestion.hint,
      miloMessage: miloResponse.message,
      miloExpression: miloResponse.expression,
    },
    isComplete: session.status === "completed",
    nextQuestion: session.status === "completed" ? null : session.currentQuestion,
    currentNumber: session.answers.length + 1,
    totalQuestions: session.totalTargetQuestions,
  });
});

// 9. Complete / Get Diagnostic Report
app.get("/api/assessment/results", (req, res) => {
  const session = db.assessmentSession;
  if (!session || session.answers.length === 0) {
    return res.json({ hasResults: false });
  }

  const totalAnswered = session.answers.length;
  const correctCount = session.answers.filter((a) => a.isCorrect).length;
  const overallScore = Math.round((correctCount / totalAnswered) * 100);

  const topicId = session.topicId || db.profile.topicId || "current_electricity";
  const allTopicConcepts = CURRICULUM_DATA.concepts[topicId] || [];

  const conceptBreakdown = allTopicConcepts.map((c) => {
    const prof = db.conceptProficiency[c.id] || { score: 0, attempts: 0, correct: 0, status: "unassessed" };
    return {
      id: c.id,
      name: c.name,
      description: c.description,
      level: c.level,
      attempts: prof.attempts,
      correct: prof.correct,
      score: prof.score,
      status: prof.status,
    };
  });

  const mastered = conceptBreakdown.filter((c) => c.status === "mastered");
  const needsPractice = conceptBreakdown.filter((c) => c.status === "needs_practice");
  const criticalGaps = conceptBreakdown.filter((c) => c.status === "gap");

  res.json({
    hasResults: true,
    sessionId: session.id,
    topicId,
    overallScore,
    totalAnswered,
    correctCount,
    conceptBreakdown,
    summary: {
      masteredCount: mastered.length,
      needsPracticeCount: needsPractice.length,
      criticalGapsCount: criticalGaps.length,
      topRecommendation: criticalGaps.length > 0 ? criticalGaps[0] : (needsPractice[0] || allTopicConcepts[0]),
    },
    miloGuidance: overallScore >= 70
      ? "You have a solid foundation! Let's polish your tricky application concepts."
      : "We've pinpointed exactly where the friction is. Starting with focused interactive lessons will give you clarity quickly!",
  });
});

// 10. Personalized Learning Path
app.get("/api/learning-path", (req, res) => {
  const topicId = db.profile.topicId || "current_electricity";
  const topicLessons = LESSONS_DATA[topicId] || LESSONS_DATA.current_electricity || [];
  const topicConcepts = CURRICULUM_DATA.concepts[topicId] || [];

  const pathNodes = topicLessons.map((lesson, idx) => {
    const concept = topicConcepts.find((c) => c.id === lesson.conceptId) || {};
    const prof = db.conceptProficiency[lesson.conceptId] || { status: "unassessed", score: 0 };
    const isCompleted = db.completedActivities.includes(lesson.id);

    let state = "ready";
    if (isCompleted) {
      state = "completed";
    } else if (prof.status === "gap") {
      state = "recommended";
    } else if (prof.status === "needs_practice") {
      state = "needs_practice";
    } else if (prof.status === "mastered") {
      state = "completed";
    } else if (idx === 0) {
      state = "recommended";
    }

    return {
      id: lesson.id,
      conceptId: lesson.conceptId,
      title: lesson.title,
      conceptName: lesson.conceptName,
      duration: lesson.duration,
      order: lesson.order,
      level: concept.level || "Foundational",
      state,
      score: prof.score,
      whyItMatters: getWhyItMatters(lesson.conceptId, prof.status),
    };
  });

  const nextActivity = pathNodes.find((n) => n.state === "recommended") ||
                       pathNodes.find((n) => n.state === "needs_practice") ||
                       pathNodes.find((n) => n.state === "ready") ||
                       pathNodes[0];

  res.json({
    topicId,
    pathNodes,
    nextActivity,
    completedCount: db.completedActivities.filter((id) => topicLessons.some((l) => l.id === id)).length,
    totalNodes: pathNodes.length,
  });
});

// 11. Complete an Activity / Lesson
app.post("/api/learning-path/complete-activity", (req, res) => {
  const { activityId, conceptId, score = 100 } = req.body;

  recordActivity();

  if (activityId && !db.completedActivities.includes(activityId)) {
    db.completedActivities.push(activityId);
  }

  if (conceptId) {
    if (!db.conceptProficiency[conceptId]) {
      db.conceptProficiency[conceptId] = {
        conceptId,
        name: conceptId,
        score: 0,
        attempts: 0,
        correct: 0,
        status: "unassessed",
      };
    }
    const cp = db.conceptProficiency[conceptId];
    cp.attempts += 1;
    cp.correct += 1;
    cp.score = Math.max(cp.score, score);
    cp.status = cp.score >= 75 ? "mastered" : "needs_practice";

    const nextRevisionDate = new Date();
    nextRevisionDate.setDate(nextRevisionDate.getDate() + 3);
    const existingRev = db.revisionQueue.find((r) => r.conceptId === conceptId);
    if (!existingRev) {
      db.revisionQueue.push({
        conceptId,
        scheduledFor: nextRevisionDate.toISOString(),
        intervalDays: 3,
      });
    }
  }

  saveStore(db);
  res.json({ success: true, completedActivities: db.completedActivities });
});

// 12. Get Specific Lesson
app.get("/api/lesson/:id", (req, res) => {
  const { id } = req.params;
  const lesson = getOrGenerateLesson(id);

  if (!lesson) {
    return res.status(404).json({ error: "Lesson not found" });
  }

  recordActivity();
  res.json({ lesson });
});

// 13. Lesson Dynamic Action
app.post("/api/lesson/action", (req, res) => {
  const { lessonId, actionType } = req.body;
  const lesson = getOrGenerateLesson(lessonId);

  if (!lesson || !lesson.tutorExtensions) {
    return res.status(404).json({ error: "Lesson extensions not found" });
  }

  const extensions = lesson.tutorExtensions;

  switch (actionType) {
    case "simplify":
      return res.json({
        type: "simplify",
        data: extensions.simplify,
        miloExpression: "explaining",
        miloMessage: "Here's an intuitive real-world analogy to make this crystal clear!",
      });
    case "another_example":
      return res.json({
        type: "another_example",
        data: extensions.anotherExample,
        miloExpression: "thinking",
        miloMessage: "Let's walk through another calculation step by step.",
      });
    case "hint":
      return res.json({
        type: "hint",
        data: { hint: extensions.hint },
        miloExpression: "curious",
        miloMessage: "Here is the key clue you need to solve this!",
      });
    case "similar_question":
      return res.json({
        type: "similar_question",
        data: extensions.similarQuestion,
        miloExpression: "curious",
        miloMessage: "Give this challenge question a shot to lock in your understanding!",
      });
    default:
      return res.status(400).json({ error: "Unknown action type" });
  }
});

// 14. Practice Section
app.get("/api/practice", (req, res) => {
  const topicId = db.profile.topicId || "current_electricity";
  const allQuestions = CURRICULUM_DATA.diagnosticQuestions[topicId] || CURRICULUM_DATA.diagnosticQuestions.current_electricity;

  const weakConceptIds = Object.values(db.conceptProficiency)
    .filter((cp) => cp.status === "gap" || cp.status === "needs_practice")
    .map((cp) => cp.conceptId);

  let practiceQuestions = [];
  if (weakConceptIds.length > 0) {
    practiceQuestions = allQuestions.filter((q) => weakConceptIds.includes(q.conceptId));
  }
  if (practiceQuestions.length === 0) {
    practiceQuestions = allQuestions.slice(0, 5);
  }

  res.json({
    weakConcepts: weakConceptIds.map((id) => {
      const c = (CURRICULUM_DATA.concepts[topicId] || []).find((x) => x.id === id);
      return { id, name: c ? c.name : id };
    }),
    practiceQuestions: practiceQuestions.map(sanitizeQuestionForStudent),
    spacedRevision: db.revisionQueue,
  });
});

// 15. Submit Practice Question
app.post("/api/practice/submit", (req, res) => {
  const { questionId, selectedOptionId } = req.body;
  const topicId = db.profile.topicId || "current_electricity";
  const allQuestions = CURRICULUM_DATA.diagnosticQuestions[topicId] || CURRICULUM_DATA.diagnosticQuestions.current_electricity;
  const q = allQuestions.find((item) => item.id === questionId);

  if (!q) {
    return res.status(404).json({ error: "Question not found" });
  }

  recordActivity();

  const opt = q.options.find((o) => o.id === selectedOptionId);
  const isCorrect = opt ? opt.isCorrect : false;

  db.practiceRecords.push({
    questionId,
    conceptId: q.conceptId,
    isCorrect,
    selectedOptionId,
    timestamp: new Date().toISOString(),
  });

  if (db.conceptProficiency[q.conceptId]) {
    const cp = db.conceptProficiency[q.conceptId];
    cp.attempts += 1;
    if (isCorrect) {
      cp.correct += 1;
      cp.score = Math.min(100, cp.score + 15);
      if (cp.score >= 70) cp.status = "mastered";
    }
  }

  saveStore(db);

  res.json({
    isCorrect,
    selectedOptionId,
    correctOptionId: q.options.find((o) => o.isCorrect)?.id,
    feedback: opt?.feedback || "",
    explanation: q.explanation,
    miloMessage: isCorrect
      ? "Great job! Practicing this concept is paying off."
      : "Keep at it! Review the explanation and try again.",
    miloExpression: isCorrect ? "celebrating" : "encouraging",
  });
});

// 16. Progress Analytics
app.get("/api/progress", (req, res) => {
  const topicId = db.profile.topicId || "current_electricity";
  const topicConcepts = CURRICULUM_DATA.concepts[topicId] || [];

  const proficiencies = topicConcepts.map((c) => {
    const prof = db.conceptProficiency[c.id] || { score: 0, attempts: 0, correct: 0, status: "unassessed" };
    return {
      conceptId: c.id,
      name: c.name,
      level: c.level,
      score: prof.score,
      status: prof.status,
      attempts: prof.attempts,
    };
  });

  const masteredList = proficiencies.filter((p) => p.status === "mastered");
  const gapList = proficiencies.filter((p) => p.status === "gap");
  const practiceList = proficiencies.filter((p) => p.status === "needs_practice");

  const totalAttempts = Object.values(db.conceptProficiency).reduce((sum, c) => sum + (c.attempts || 0), 0);
  const totalCorrect = Object.values(db.conceptProficiency).reduce((sum, c) => sum + (c.correct || 0), 0);
  const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  res.json({
    proficiencies,
    masteredCount: masteredList.length,
    gapsCount: gapList.length,
    needsPracticeCount: practiceList.length,
    completedLessonsCount: db.completedActivities.length,
    totalConcepts: topicConcepts.length,
    totalAttempts,
    overallAccuracy,
    streak: calculateStreak(db.completedActivities, db.practiceRecords),
    revisionQueue: db.revisionQueue,
    recentActivity: db.practiceRecords.slice(-5).reverse(),
  });
});

// 17. AI Tutor Chat
app.post("/api/tutor/chat", async (req, res) => {
  const { message, context = {} } = req.body;

  const topicId = db.profile.topicId || "current_electricity";
  const topicConcepts = CURRICULUM_DATA.concepts[topicId] || [];

  const weakConcepts = topicConcepts.filter((c) => {
    const prof = db.conceptProficiency[c.id];
    return prof && (prof.status === "gap" || prof.status === "needs_practice");
  });

  const masteredConcepts = topicConcepts
    .filter((c) => db.conceptProficiency[c.id]?.status === "mastered")
    .map((c) => c.name);

  const fullContext = {
    studentProfile: db.profile,
    currentTopic: db.profile.topic,
    assessmentResults: db.assessmentSession,
    weakConcepts,
    masteredConcepts,
    activeLesson: context.activeLesson || null,
  };

  try {
    const result = await handleTutorChat({
      message,
      context: fullContext,
      history: db.tutorHistory,
    });

    db.tutorHistory.push({ role: "user", content: message });
    db.tutorHistory.push({ role: "assistant", content: result.reply });
    saveStore(db);

    res.json(result);
  } catch (err) {
    console.error("Tutor handler error:", err);
    res.status(500).json({
      reply: "I hit a temporary hiccup processing that, but let's break down the core concept together!",
      expression: "encouraging",
      suggestedActions: ["Explain simply", "Give me a hint", "Show worked example"],
    });
  }
});

// 18. Reset Profile & Progress
app.post("/api/reset", (req, res) => {
  db = JSON.parse(JSON.stringify(initialData));
  saveStore(db);
  res.json({ success: true, message: "Progress reset successfully" });
});

// Helpers
function sanitizeQuestionForStudent(q) {
  return {
    id: q.id,
    conceptId: q.conceptId,
    conceptName: q.conceptName,
    difficulty: q.difficulty,
    question: q.question,
    options: q.options.map((o) => ({ id: o.id, text: o.text })),
    hint: q.hint,
  };
}

function getWhyItMatters(conceptId, status) {
  if (status === "gap") return "Identified as a critical knowledge gap in your diagnostic assessment.";
  if (status === "needs_practice") return "Strengthening this builds the foundation for advanced circuit problems.";
  if (status === "mastered") return "Mastered in diagnostic! Click anytime for a quick refresher.";
  return "Fundamental building block for competitive exams and board mastery.";
}

function calculateStreak(completedActivities, practiceRecords) {
  const count = (completedActivities?.length || 0) + (practiceRecords?.length || 0);
  if (count === 0) return 1;
  return Math.min(count + 2, 7);
}

app.listen(PORT, () => {
  console.log(`LearnNova Educational API Server running at http://localhost:${PORT}`);
});
