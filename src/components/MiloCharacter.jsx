import React from "react";

/**
 * MiloCharacter - Original AI Learning Companion
 * Pure vector SVG with 7 expressive states:
 * 1. welcome
 * 2. thinking
 * 3. explaining
 * 4. celebrating
 * 5. encouraging
 * 6. concerned / supportive
 * 7. curious
 */
export default function MiloCharacter({ expression = "welcome", size = 80, className = "" }) {
  // Normalize expression name
  const expr = (expression || "welcome").toLowerCase();

  return (
    <div
      className={`milo-companion milo-expr-${expr} ${className}`}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
      }}
      aria-label={`Milo AI tutor feeling ${expr}`}
      role="img"
    >
      <svg
        viewBox="0 0 160 160"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: "visible",
          filter: "drop-shadow(0 4px 8px rgba(79, 70, 229, 0.12))",
        }}
      >
        <defs>
          {/* Gradients for Milo's pearlescent shell */}
          <linearGradient id="miloBodyGrad" x1="20" y1="20" x2="140" y2="150" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.7" stopColor="#F1F5F9" />
            <stop offset="1" stopColor="#E2E8F0" />
          </linearGradient>

          <linearGradient id="miloBellyGrad" x1="40" y1="90" x2="120" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EEF2FF" />
            <stop offset="1" stopColor="#E0E7FF" />
          </linearGradient>

          <linearGradient id="miloVisorGrad" x1="30" y1="40" x2="130" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E1B4B" />
            <stop offset="1" stopColor="#0F172A" />
          </linearGradient>

          {/* Glowing Learning Orb */}
          <radialGradient id="orbGlow" cx="0.5" cy="0.5" r="0.5" fx="0.3" fy="0.3">
            <stop offset="0%" stopColor="#A5B4FC" />
            <stop offset="40%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4338CA" />
          </radialGradient>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- Antenna & Learning Orb --- */}
        <path
          d={
            expr === "curious"
              ? "M 80 40 Q 86 24 94 14"
              : expr === "concerned"
              ? "M 80 40 Q 74 24 70 16"
              : "M 80 40 L 80 18"
          }
          stroke="#94A3B8"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle
          cx={expr === "curious" ? 94 : expr === "concerned" ? 70 : 80}
          cy={expr === "curious" ? 14 : expr === "concerned" ? 16 : 16}
          r="9"
          fill="url(#orbGlow)"
          filter="url(#glowFilter)"
        />
        <circle
          cx={expr === "curious" ? 92 : expr === "concerned" ? 68 : 78}
          cy={expr === "curious" ? 12 : expr === "concerned" ? 14 : 14}
          r="3"
          fill="#FFFFFF"
          opacity="0.8"
        />

        {/* --- Body Shell --- */}
        <rect
          x="32"
          y="36"
          width="96"
          height="100"
          rx="44"
          fill="url(#miloBodyGrad)"
          stroke="#CBD5E1"
          strokeWidth="2.5"
        />

        {/* Belly plate */}
        <path
          d="M 52 92 C 52 82 108 82 108 92 C 108 122 52 122 52 92 Z"
          fill="url(#miloBellyGrad)"
          stroke="#C7D2FE"
          strokeWidth="1.5"
        />

        {/* Subtle feet / hover boosters */}
        <ellipse cx="60" cy="138" rx="14" ry="7" fill="#CBD5E1" />
        <ellipse cx="100" cy="138" rx="14" ry="7" fill="#CBD5E1" />
        <ellipse cx="60" cy="137" rx="10" ry="4" fill="#94A3B8" />
        <ellipse cx="100" cy="137" rx="10" ry="4" fill="#94A3B8" />

        {/* --- Face Screen Visor --- */}
        <rect
          x="44"
          y="46"
          width="72"
          height="42"
          rx="18"
          fill="url(#miloVisorGrad)"
          stroke="#312E81"
          strokeWidth="1.5"
        />

        {/* Visor specular glass shine */}
        <path
          d="M 48 54 C 58 48 94 48 112 54"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.25"
        />

        {/* --- Dynamic Expressions & Eyes --- */}
        {renderEyesAndMouth(expr)}

        {/* --- Dynamic Arms & Gestures --- */}
        {renderArms(expr)}
      </svg>
    </div>
  );
}

function renderEyesAndMouth(expr) {
  switch (expr) {
    case "celebrating":
      return (
        <g>
          {/* Joyful arch eyes */}
          <path d="M 56 65 Q 64 56 72 65" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 88 65 Q 96 56 104 65" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          {/* Open happy smile */}
          <path d="M 74 74 Q 80 81 86 74" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Sparkles around visor */}
          <polygon points="40,32 42,36 46,38 42,40 40,44 38,40 34,38 38,36" fill="#FACC15" />
          <polygon points="120,30 122,34 126,36 122,38 120,42 118,38 114,36 118,34" fill="#FACC15" />
        </g>
      );

    case "thinking":
      return (
        <g>
          {/* Looking up-right */}
          <circle cx="66" cy="62" r="5" fill="#38BDF8" />
          <circle cx="68" cy="60" r="1.5" fill="#FFFFFF" />
          <circle cx="98" cy="62" r="5" fill="#38BDF8" />
          <circle cx="100" cy="60" r="1.5" fill="#FFFFFF" />
          {/* Pensive mouth line */}
          <path d="M 77 74 Q 81 72 84 74" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          {/* Mini thought bubble sparkle */}
          <circle cx="118" cy="46" r="3" fill="#818CF8" />
          <circle cx="125" cy="38" r="4.5" fill="#A5B4FC" />
        </g>
      );

    case "explaining":
      return (
        <g>
          {/* Wide focused smart eyes */}
          <circle cx="64" cy="66" r="5.5" fill="#38BDF8" />
          <circle cx="62" cy="64" r="2" fill="#FFFFFF" />
          <circle cx="96" cy="66" r="5.5" fill="#38BDF8" />
          <circle cx="94" cy="64" r="2" fill="#FFFFFF" />
          {/* Explaining active smile */}
          <path d="M 75 75 Q 80 79 85 75" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      );

    case "concerned":
    case "supportive":
      return (
        <g>
          {/* Gentle, sympathetic eyes */}
          <path d="M 56 68 Q 64 63 72 68" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 88 68 Q 96 63 104 68" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Small comforting smile */}
          <path d="M 76 76 Q 80 78 84 76" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      );

    case "curious":
      return (
        <g>
          {/* One eye slightly larger with curious slant */}
          <circle cx="63" cy="65" r="4.5" fill="#38BDF8" />
          <circle cx="65" cy="63" r="1.5" fill="#FFFFFF" />
          <circle cx="97" cy="65" r="6.5" fill="#38BDF8" />
          <circle cx="99" cy="63" r="2.5" fill="#FFFFFF" />
          {/* Quizzical mouth */}
          <circle cx="80" cy="75" r="2" fill="#38BDF8" />
        </g>
      );

    case "encouraging":
      return (
        <g>
          {/* Warm wink or friendly bright eyes */}
          <circle cx="64" cy="65" r="5.5" fill="#38BDF8" />
          <circle cx="62" cy="63" r="2" fill="#FFFFFF" />
          <path d="M 90 66 Q 96 61 102 66" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          {/* Warm smile */}
          <path d="M 75 74 Q 80 80 85 74" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      );

    case "welcome":
    default:
      return (
        <g>
          {/* Big happy rounded eyes */}
          <circle cx="64" cy="65" r="6" fill="#38BDF8" />
          <circle cx="62" cy="63" r="2.2" fill="#FFFFFF" />
          <circle cx="96" cy="65" r="6" fill="#38BDF8" />
          <circle cx="94" cy="63" r="2.2" fill="#FFFFFF" />
          {/* Friendly warm smile */}
          <path d="M 75 75 Q 80 81 85 75" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      );
  }
}

function renderArms(expr) {
  switch (expr) {
    case "welcome":
      return (
        <g>
          {/* Left arm resting */}
          <path d="M 34 85 Q 24 95 30 105" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          {/* Right arm waving high */}
          <path d="M 126 80 Q 140 65 144 50" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          <circle cx="145" cy="48" r="6" fill="#94A3B8" />
        </g>
      );

    case "celebrating":
      return (
        <g>
          {/* Both arms raised joyfully */}
          <path d="M 34 78 Q 20 58 18 42" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          <circle cx="17" cy="40" r="6" fill="#94A3B8" />
          <path d="M 126 78 Q 140 58 142 42" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          <circle cx="143" cy="40" r="6" fill="#94A3B8" />
        </g>
      );

    case "thinking":
      return (
        <g>
          {/* Hand under chin */}
          <path d="M 34 85 Q 26 95 32 105" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          <path d="M 126 88 Q 116 100 100 95" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          <circle cx="98" cy="94" r="6" fill="#94A3B8" />
        </g>
      );

    case "explaining":
      return (
        <g>
          {/* Left arm resting */}
          <path d="M 34 85 Q 24 95 30 105" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          {/* Right arm holding glowing pointer */}
          <path d="M 126 85 Q 138 90 144 85" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          <line x1="144" y1="85" x2="156" y2="70" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />
          <circle cx="156" cy="70" r="3" fill="#A5B4FC" />
        </g>
      );

    case "encouraging":
      return (
        <g>
          {/* Left arm resting */}
          <path d="M 34 85 Q 24 95 30 105" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          {/* Right arm giving thumbs up */}
          <path d="M 126 85 Q 136 82 142 80" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          <circle cx="142" cy="78" r="6" fill="#94A3B8" />
          <path d="M 142 78 L 142 70" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" />
        </g>
      );

    case "concerned":
    case "supportive":
      return (
        <g>
          {/* Supportive posture, hand on chest */}
          <path d="M 34 85 Q 46 95 56 94" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          <circle cx="58" cy="94" r="5.5" fill="#94A3B8" />
          <path d="M 126 85 Q 136 95 130 105" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
        </g>
      );

    case "curious":
    default:
      return (
        <g>
          {/* Resting arms with slight forward lean */}
          <path d="M 34 85 Q 24 95 32 105" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
          <path d="M 126 85 Q 136 95 128 105" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
        </g>
      );
  }
}
