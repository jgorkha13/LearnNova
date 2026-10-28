import React from "react";

/**
 * Formula - Renders clean mathematical and physical formulas with symbols and labels
 */
export default function Formula({ formula, labels = [], inline = false }) {
  if (!formula) return null;

  // Format basic LaTeX-style notations into readable unicode math
  const formatMath = (str) => {
    return str
      .replace(/\\cdot/g, " · ")
      .replace(/\\times/g, " × ")
      .replace(/\\rho/g, "ρ")
      .replace(/\\sigma/g, "σ")
      .replace(/\\tau/g, "τ")
      .replace(/\\Delta/g, "Δ")
      .replace(/\\sum/g, "Σ")
      .replace(/\\quad/g, "   ")
      .replace(/\\text\{([^}]+)\}/g, "$1")
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "($1 / $2)")
      .replace(/\^2/g, "²")
      .replace(/\^4/g, "⁴")
      .replace(/\^\{([^}]+)\}/g, "^($1)")
      .replace(/_d/g, "d")
      .replace(/_total/g, "total")
      .replace(/_eq/g, "eq");
  };

  if (inline) {
    return (
      <code
        style={{
          fontFamily: "var(--font-mono)",
          background: "var(--bg-surface-secondary)",
          padding: "2px 6px",
          borderRadius: 4,
          fontSize: "0.95em",
          color: "var(--brand-primary-hover)",
        }}
      >
        {formatMath(formula)}
      </code>
    );
  }

  return (
    <div
      style={{
        background: "#F8FAFC",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-md)",
        padding: "16px 20px",
        margin: "12px 0",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 18,
          fontWeight: 600,
          color: "var(--brand-primary)",
          letterSpacing: "0.02em",
          textAlign: "center",
          padding: "8px 0",
        }}
      >
        {formatMath(formula)}
      </div>

      {labels && labels.length > 0 && (
        <div
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: "1px dashed var(--border-light)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 8,
            fontSize: 13,
            color: "var(--text-secondary)",
          }}
        >
          {labels.map((item, idx) => (
            <div key={idx} style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <strong style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
                {item.symbol}:
              </strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
