import React, { useState } from "react";
import { User, Settings, RefreshCw, AlertTriangle, Check, BookOpen, Clock, Heart } from "lucide-react";
import MiloCharacter from "../components/MiloCharacter";
import { updateProfile, resetProgress } from "../services/api";

export default function ProfileView({ profile, onProfileUpdated, onResetAll }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "Alex",
    grade: profile?.grade || "Class 12",
    board: profile?.board || "CBSE",
    subject: profile?.subject || "Physics",
    topic: profile?.topic || "Current Electricity",
    preferences: {
      struggleArea: profile?.preferences?.struggleArea || "Numerical problem solving & formula application",
      learningStyle: profile?.preferences?.learningStyle || "Simple intuitive explanations with worked examples",
      studyTime: profile?.preferences?.studyTime || "45 minutes",
    },
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = await updateProfile(formData);
      onProfileUpdated(data.profile);
      setSavedSuccess(true);
      setEditing(false);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error("Save profile error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmReset = async () => {
    try {
      await resetProgress();
      setShowResetConfirm(false);
      onResetAll();
    } catch (err) {
      console.error("Reset error:", err);
    }
  };

  return (
    <div className="page-container">
      {/* Profile Header */}
      <div
        className="card"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "24px 32px",
          marginBottom: 32,
        }}
      >
        <MiloCharacter expression="welcome" size={80} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
              {formData.name}'s Academic Profile
            </h2>
            <span
              style={{
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--brand-primary-tint)",
                color: "var(--brand-primary)",
                fontWeight: 700,
              }}
            >
              Active Learner
            </span>
          </div>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
            {formData.grade} • {formData.board} • {formData.subject}
          </p>
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="btn btn-secondary"
            style={{ padding: "10px 18px", fontSize: 14 }}
          >
            Edit Settings
          </button>
        ) : (
          <button
            onClick={() => setEditing(false)}
            className="btn btn-ghost"
            style={{ padding: "10px 18px", fontSize: 14 }}
          >
            Cancel
          </button>
        )}
      </div>

      {savedSuccess && (
        <div
          style={{
            padding: "12px 18px",
            backgroundColor: "var(--success-bg)",
            border: "1px solid var(--success-border)",
            borderRadius: "var(--radius-md)",
            color: "var(--success-text)",
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Check size={18} />
          <span>Profile and academic preferences updated successfully!</span>
        </div>
      )}

      {/* Profile Details or Edit Form */}
      {!editing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Academic Focus Card */}
          <div className="card">
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
              Curriculum & Target Topic
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              <div style={{ padding: "14px 16px", backgroundColor: "var(--bg-canvas)", borderRadius: "var(--radius-md)" }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Class / Grade
                </span>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginTop: 2 }}>
                  {formData.grade}
                </div>
              </div>

              <div style={{ padding: "14px 16px", backgroundColor: "var(--bg-canvas)", borderRadius: "var(--radius-md)" }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Board / Curriculum
                </span>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginTop: 2 }}>
                  {formData.board}
                </div>
              </div>

              <div style={{ padding: "14px 16px", backgroundColor: "var(--bg-canvas)", borderRadius: "var(--radius-md)" }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Subject
                </span>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginTop: 2 }}>
                  {formData.subject}
                </div>
              </div>

              <div style={{ padding: "14px 16px", backgroundColor: "var(--bg-canvas)", borderRadius: "var(--radius-md)" }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Current Chapter
                </span>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--brand-primary)", marginTop: 2 }}>
                  {formData.topic}
                </div>
              </div>
            </div>
          </div>

          {/* Learning Style Preferences */}
          <div className="card">
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
              Personalized Learning Preferences
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <AlertTriangle size={18} color="#D97706" style={{ marginTop: 2 }} />
                <div>
                  <strong style={{ fontSize: 14, color: "var(--text-primary)" }}>Identified Struggle Area:</strong>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>
                    {formData.preferences.struggleArea}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <BookOpen size={18} color="var(--brand-primary)" style={{ marginTop: 2 }} />
                <div>
                  <strong style={{ fontSize: 14, color: "var(--text-primary)" }}>Explanation Style:</strong>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>
                    {formData.preferences.learningStyle}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Clock size={18} color="#10B981" style={{ marginTop: 2 }} />
                <div>
                  <strong style={{ fontSize: 14, color: "var(--text-primary)" }}>Daily Study Target:</strong>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>
                    {formData.preferences.studyTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reset App State for Evaluators */}
          <div
            className="card"
            style={{
              border: "1px dashed var(--error-border)",
              backgroundColor: "#FFFBFB",
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--error-text)", marginBottom: 6 }}>
              Reset Platform Data & Onboarding
            </h3>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 16px 0" }}>
              Want to experience the complete first-time onboarding flow and diagnostic assessment again from scratch?
            </p>

            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="btn btn-secondary"
                style={{
                  color: "var(--error-solid)",
                  borderColor: "var(--error-border)",
                  fontSize: 13,
                }}
              >
                <RefreshCw size={14} />
                <span>Reset All Progress</span>
              </button>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  onClick={handleConfirmReset}
                  className="btn"
                  style={{
                    backgroundColor: "var(--error-solid)",
                    color: "#fff",
                    fontSize: 13,
                    padding: "8px 16px",
                  }}
                >
                  Yes, Reset Everything
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="btn btn-ghost"
                  style={{ fontSize: 13 }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="card">
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>
            Edit Academic Profile
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 6 }}>
                STUDENT NAME
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-medium)",
                  fontSize: 14,
                }}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 6 }}>
                  CLASS / GRADE
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-medium)",
                    fontSize: 14,
                    backgroundColor: "#fff",
                  }}
                >
                  <option value="Class 12">Class 12</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 10">Class 10</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 6 }}>
                  BOARD / CURRICULUM
                </label>
                <select
                  value={formData.board}
                  onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-medium)",
                    fontSize: 14,
                    backgroundColor: "#fff",
                  }}
                >
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE / ISC">ICSE / ISC</option>
                  <option value="State Board">State Board</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 6 }}>
                  SUBJECT
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-medium)",
                    fontSize: 14,
                    backgroundColor: "#fff",
                  }}
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 6 }}>
                  TOPIC / CHAPTER
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value, topicId: "current_electricity" })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-medium)",
                    fontSize: 14,
                    backgroundColor: "#fff",
                  }}
                >
                  <option value="Current Electricity">Current Electricity</option>
                  <option value="Electric Charges & Fields">Electric Charges & Fields</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 6 }}>
                DAILY STUDY TARGET
              </label>
              <select
                value={formData.preferences.studyTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferences: { ...formData.preferences, studyTime: e.target.value },
                  })
                }
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-medium)",
                  fontSize: 14,
                  backgroundColor: "#fff",
                }}
              >
                <option value="20 minutes">20 minutes</option>
                <option value="45 minutes">45 minutes</option>
                <option value="90 minutes">90 minutes</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: "12px 24px" }}>
                <span>{saving ? "Saving..." : "Save Preferences"}</span>
              </button>
              <button type="button" onClick={() => setEditing(false)} className="btn btn-ghost">
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
