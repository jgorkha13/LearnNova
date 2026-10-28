import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Check, School, GraduationCap, Target } from "lucide-react";
import LumiCharacter from "../components/LumiCharacter";
import MiloSpeech from "../components/MiloSpeech";

export default function Onboarding({ onComplete, curriculum, initialSelections = {}, onExit }) {
  const [step, setStep] = useState(1);

  // Form State initialized with any landing page selections
  const [category, setCategory] = useState(initialSelections.category || "school"); // 'school' | 'college' | 'entrance'
  
  // School details
  const [grade, setGrade] = useState(initialSelections.grade || "Class 12");
  const [board, setBoard] = useState(initialSelections.board || "CBSE");
  const [subject, setSubject] = useState(initialSelections.subject || "Physics");
  const [topic, setTopic] = useState(initialSelections.topic || "Current Electricity");
  const [topicId, setTopicId] = useState(initialSelections.topicId || "current_electricity");

  // College details
  const [degree, setDegree] = useState("B.Tech / B.E.");
  const [year, setYear] = useState("2nd Year");
  const [branch, setBranch] = useState("Computer Science & Engineering");

  // Entrance details
  const [exam, setExam] = useState("JEE Main");
  const [targetYear, setTargetYear] = useState("2026");
  const [prepStage, setPrepStage] = useState("Revision & Practice");

  // Learning preferences
  const [confidence, setConfidence] = useState("medium");
  const [struggleArea, setStruggleArea] = useState("Numerical problem solving & formula application");
  const [learningStyle, setLearningStyle] = useState("Simple intuitive explanations with worked examples");
  const [dailyTime, setDailyTime] = useState(initialSelections.preferences?.studyTime || "45 minutes");

  const totalSteps = 4;
  const progressPercent = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      // Complete Onboarding and pass payload
      onComplete({
        isOnboarded: true,
        category,
        grade,
        board,
        subject,
        topic,
        topicId,
        degree: category === "college" ? degree : "",
        year: category === "college" ? year : "",
        branch: category === "college" ? branch : "",
        exam: category === "entrance" ? exam : "",
        targetYear: category === "entrance" ? targetYear : "",
        preparationStage: category === "entrance" ? prepStage : "",
        preferences: {
          confidence,
          struggleArea,
          learningStyle,
          studyTime: dailyTime,
        },
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-canvas)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 20px",
      }}
    >
      {/* Top Progress & Back Bar */}
      <div
        style={{
          width: "100%",
          maxWidth: 640,
          marginBottom: 32,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {(step > 1 || onExit) && (
          <button
            onClick={step > 1 ? handleBack : onExit}
            className="btn-ghost"
            style={{
              padding: 8,
              borderRadius: "var(--radius-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label={step > 1 ? "Previous step" : "Back to Home"}
          >
            <ArrowLeft size={20} color="var(--text-secondary)" />
          </button>
        )}

        <div
          style={{
            flex: 1,
            height: 10,
            backgroundColor: "var(--border-light)",
            borderRadius: "var(--radius-full)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: "100%",
              backgroundColor: "var(--brand-primary)",
              borderRadius: "var(--radius-full)",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", minWidth: 42, textAlign: "right" }}>
          {step}/{totalSteps}
        </span>
      </div>

      {/* Main Step Container */}
      <div
        style={{
          width: "100%",
          maxWidth: 640,
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-lg)",
          padding: "36px 32px",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Step 1: Who are you? */}
        {step === 1 && (
          <div>
            <MiloSpeech
              expression="welcome"
              message="Hey! I’m Lumi. I’ll help you figure out what you know and build your personalized learning path."
              size={64}
            />

            <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
              Who are you academically?
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24 }}>
              Select the option that best describes your current educational journey:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  id: "school",
                  title: "School Student",
                  desc: "Classes 9–12 preparing for board exams & conceptual foundation",
                  icon: School,
                },
                {
                  id: "college",
                  title: "College Student",
                  desc: "Undergraduate engineering, sciences, and core university curriculum",
                  icon: GraduationCap,
                },
                {
                  id: "entrance",
                  title: "Entrance Exam Aspirant",
                  desc: "JEE Main/Advanced, NEET, CUET, and national competitive exams",
                  icon: Target,
                },
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = category === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setCategory(opt.id)}
                    className={`option-card ${isSelected ? "selected" : ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "18px 20px",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "var(--radius-md)",
                        backgroundColor: isSelected ? "var(--brand-primary)" : "var(--bg-surface-secondary)",
                        color: isSelected ? "#fff" : "var(--brand-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
                        {opt.title}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>
                        {opt.desc}
                      </div>
                    </div>
                    {isSelected && (
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          backgroundColor: "var(--brand-primary)",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Check size={16} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Academic Details */}
        {step === 2 && (
          <div>
            <MiloSpeech
              expression="thinking"
              message="Great! Now let’s pinpoint your exact curriculum so every question and lesson is 100% relevant."
              size={64}
            />

            <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
              {category === "school" ? "School Curriculum Details" : category === "college" ? "Degree & Major Details" : "Target Examination Details"}
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24 }}>
              We tailor diagnostic assessments specifically to this topic:
            </p>

            {category === "school" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: "var(--text-secondary)" }}>
                    CLASS / GRADE
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                    {["Class 9", "Class 10", "Class 11", "Class 12"].map((g) => (
                      <button
                        key={g}
                        onClick={() => setGrade(g)}
                        className={`btn ${grade === g ? "btn-primary" : "btn-secondary"}`}
                        style={{ padding: "10px 0", fontSize: 14 }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: "var(--text-secondary)" }}>
                    BOARD / CURRICULUM
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                    {["CBSE", "ICSE / ISC", "State Board", "Cambridge / IB"].map((b) => (
                      <button
                        key={b}
                        onClick={() => setBoard(b)}
                        className={`btn ${board === b ? "btn-primary" : "btn-secondary"}`}
                        style={{ padding: "12px", fontSize: 14 }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: "var(--text-secondary)" }}>
                    SUBJECT
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                    {["Physics", "Chemistry", "Mathematics", "Biology"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSubject(s)}
                        className={`btn ${subject === s ? "btn-primary" : "btn-secondary"}`}
                        style={{ padding: "12px", fontSize: 14 }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: "var(--text-secondary)" }}>
                    CHAPTER / TOPIC TO MASTER
                  </label>
                  <div
                    onClick={() => {
                      setTopic("Current Electricity");
                      setTopicId("current_electricity");
                    }}
                    className="option-card selected"
                    style={{ padding: "14px 18px" }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
                        Current Electricity
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
                        Ohm's Law, Drift Velocity, Resistor Networks & Kirchhoff's Rules (Flagship Diagnostic Ready)
                      </div>
                    </div>
                    <span style={{ fontSize: 11, backgroundColor: "var(--brand-primary)", color: "#fff", padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>
                      Recommended
                    </span>
                  </div>
                </div>
              </div>
            )}

            {category === "college" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: "var(--text-secondary)" }}>
                    DEGREE PROGRAM
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                    {["B.Tech / B.E.", "B.Sc", "BCA / MCA", "B.Com"].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDegree(d)}
                        className={`btn ${degree === d ? "btn-primary" : "btn-secondary"}`}
                        style={{ padding: "12px", fontSize: 14 }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: "var(--text-secondary)" }}>
                    SUBJECT / COURSE
                  </label>
                  <div
                    onClick={() => {
                      setSubject("Network Analysis & Circuit Theory");
                      setTopic("Current Electricity");
                      setTopicId("current_electricity");
                    }}
                    className="option-card selected"
                    style={{ padding: "14px 18px" }}
                  >
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700 }}>Network Analysis & DC Circuit Laws</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Ohm's Law, Loop Analysis & Energy</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {category === "entrance" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: "var(--text-secondary)" }}>
                    TARGET COMPETITIVE EXAMINATION
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                    {["JEE Main", "JEE Advanced", "NEET (UG)", "CUET (UG)"].map((ex) => (
                      <button
                        key={ex}
                        onClick={() => setExam(ex)}
                        className={`btn ${exam === ex ? "btn-primary" : "btn-secondary"}`}
                        style={{ padding: "12px", fontSize: 14 }}
                      >
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: "var(--text-secondary)" }}>
                    TOPIC FOCUS
                  </label>
                  <div
                    onClick={() => {
                      setSubject("Physics");
                      setTopic("Current Electricity");
                      setTopicId("current_electricity");
                    }}
                    className="option-card selected"
                    style={{ padding: "14px 18px" }}
                  >
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700 }}>Current Electricity (Advanced / Entrance Level)</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>High weightage conceptual & numerical unit</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Learning Preferences */}
        {step === 3 && (
          <div>
            <MiloSpeech
              expression="curious"
              message="Almost ready! Tell me a bit about how you like to learn so I can adjust my explanations."
              size={64}
            />

            <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
              Learning Style & Preferences
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20 }}>
              Optional preferences to fine-tune Lumi's teaching cadence:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: "var(--text-secondary)" }}>
                  WHAT DO YOU STRUGGLE WITH MOST?
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "Numerical problem solving & formula application",
                    "Conceptual intuition & visualizing invisible fields",
                    "Remembering sign conventions and derivations",
                    "Speed & exam pressure under timed conditions",
                  ].map((item) => (
                    <button
                      key={item}
                      onClick={() => setStruggleArea(item)}
                      className={`option-card ${struggleArea === item ? "selected" : ""}`}
                      style={{ padding: "12px 16px", fontSize: 14 }}
                    >
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: "var(--text-secondary)" }}>
                  PREFERRED EXPLANATION STYLE
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    "Simple intuitive explanations with worked examples",
                    "Rigorous mathematical derivations first",
                    "Real-world physical analogies (water pipes/cars)",
                    "Practice-first (learn by solving questions)",
                  ].map((style) => (
                    <button
                      key={style}
                      onClick={() => setLearningStyle(style)}
                      className={`btn ${learningStyle === style ? "btn-primary" : "btn-secondary"}`}
                      style={{ padding: "10px", fontSize: 12, height: "100%", textAlign: "center" }}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 8, color: "var(--text-secondary)" }}>
                  DAILY STUDY TIME TARGET
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  {["20 minutes", "45 minutes", "90 minutes"].map((time) => (
                    <button
                      key={time}
                      onClick={() => setDailyTime(time)}
                      className={`btn ${dailyTime === time ? "btn-primary" : "btn-secondary"}`}
                      style={{ padding: "10px 0", fontSize: 13 }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Character Introduction & Context Summary */}
        {step === 4 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <LumiCharacter expression="celebrating" size={120} floating={true} />
            </div>

            <h2 style={{ fontSize: 26, fontWeight: 800, color: "var(--text-primary)", marginBottom: 12 }}>
              Meet Lumi, Your Personal AI Companion!
            </h2>

            <div
              style={{
                backgroundColor: "var(--bg-canvas)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "20px 24px",
                textAlign: "left",
                margin: "0 auto 28px auto",
                maxWidth: 520,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--brand-primary)", marginBottom: 6, textTransform: "uppercase" }}>
                Your Learning Profile
              </div>
              <p style={{ fontSize: 16, color: "var(--text-primary)", lineHeight: 1.6, margin: 0 }}>
                You’re in <strong>{grade}</strong> ({board}), studying <strong>{subject}</strong>, and you want to master{" "}
                <strong>{topic}</strong>.
              </p>
              <div
                style={{
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: "1px dashed var(--border-light)",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                }}
              >
                Focusing on <em>{struggleArea}</em> with <em>{learningStyle}</em>.
              </div>
            </div>

            <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 28, maxWidth: 500, margin: "0 auto 28px auto" }}>
              Let’s discover which concepts you already understand and where we should start your journey!
            </p>

            <button
              onClick={handleNext}
              className="btn btn-primary"
              style={{
                padding: "16px 36px",
                fontSize: 17,
                fontWeight: 700,
                borderRadius: "var(--radius-full)",
                margin: "0 auto",
                display: "inline-flex",
              }}
            >
              <span>Find my starting level</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* Step Navigation Button (Steps 1–3) */}
        {step < 4 && (
          <div
            style={{
              marginTop: 32,
              paddingTop: 20,
              borderTop: "1px solid var(--border-light)",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={handleNext}
              className="btn btn-primary"
              style={{ padding: "12px 28px", fontSize: 15 }}
            >
              <span>Continue</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
