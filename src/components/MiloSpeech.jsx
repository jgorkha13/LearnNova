import React from "react";
import LumiCharacter from "./LumiCharacter";

/**
 * LumiSpeech - Character paired with contextual speech bubble
 */
export default function MiloSpeech({
  expression = "welcome",
  message = "",
  size = 72,
  characterPosition = "left", // 'left' | 'top'
  extra = null,
  className = "",
  name = "Lumi",
  floating = false,
}) {
  return (
    <div
      className={`lumi-speech-container ${characterPosition === "top" ? "flex-col items-center text-center" : "flex-row items-start"} ${className}`}
      style={{
        display: "flex",
        flexDirection: characterPosition === "top" ? "column" : "row",
        alignItems: characterPosition === "top" ? "center" : "flex-start",
        gap: 16,
        margin: "12px 0 20px 0",
      }}
    >
      <LumiCharacter expression={expression} size={size} floating={floating} interactive />

      <div
        className="speech-bubble"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-lg)",
          padding: "16px 20px",
          boxShadow: "var(--shadow-subtle)",
          position: "relative",
          maxWidth: 620,
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--brand-primary)",
            }}
          >
            {name} AI Companion
          </span>
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#10B981",
            }}
            title="Online"
          />
        </div>

        <p
          style={{
            fontSize: 15,
            color: "var(--text-primary)",
            lineHeight: 1.5,
            margin: 0,
            whiteSpace: "pre-line",
          }}
        >
          {message}
        </p>

        {extra && <div style={{ marginTop: 12 }}>{extra}</div>}
      </div>
    </div>
  );
}
