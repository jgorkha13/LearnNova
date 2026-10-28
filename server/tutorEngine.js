// Context-aware AI Tutor engine for Lumi companion

import { CURRICULUM_DATA } from "./curriculum.js";
import { LESSONS_DATA } from "./lessonsData.js";

export async function handleTutorChat({ message, context = {}, history = [] }) {
  const {
    studentProfile = {},
    currentTopic = "current_electricity",
    assessmentResults = null,
    weakConcepts = [],
    masteredConcepts = [],
    activeLesson = null,
  } = context;

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (apiKey) {
    try {
      const response = await callGeminiTutor({
        apiKey,
        message,
        context: {
          studentProfile,
          currentTopic,
          assessmentResults,
          weakConcepts,
          masteredConcepts,
          activeLesson,
        },
        history,
      });
      if (response) return response;
    } catch (err) {
      console.warn("Gemini API call failed, falling back to local Socratic tutor engine:", err.message);
    }
  }

  // Local pedagogically sound Socratic tutor engine
  return generateLocalSocraticResponse({
    message,
    studentProfile,
    currentTopic,
    assessmentResults,
    weakConcepts,
    masteredConcepts,
    activeLesson,
    history,
  });
}

async function callGeminiTutor({ apiKey, message, context, history }) {
  const { studentProfile, currentTopic, weakConcepts, masteredConcepts } = context;

  const systemInstruction = `You are Lumi, an encouraging, razor-sharp, and warm AI learning companion on LearnNova.
You are helping a ${studentProfile.grade || "student"} studying ${studentProfile.subject || "Physics"} - ${studentProfile.topic || "Current Electricity"} (${studentProfile.board || "CBSE/Competitive"}).

Key Student Context:
- Demonstrated Masteries: ${masteredConcepts.length > 0 ? masteredConcepts.join(", ") : "Diagnostic pending"}
- Identified Knowledge Gaps / Weaknesses: ${weakConcepts.length > 0 ? weakConcepts.join(", ") : "None identified yet"}
- Learning Style Preference: ${studentProfile.preferences?.learningStyle || "Interactive with analogies and worked examples"}

Behavior Rules:
1. Speak in Lumi's voice: friendly, concise, encouraging, and pedagogically sound.
2. Socratic Guidance: Never dump raw final answers immediately when asked for homework or test problems. Guide through intuition, step-by-step clues, or analogies.
3. Keep responses structured and digestible: use short paragraphs, bullet points, and clean formulas.
4. If the student asks why their answer was wrong or about a weak concept, address the specific underlying physics misconception.
5. Max length: 2-3 short paragraphs or clean bullet points.`;

  const contents = [
    { role: "user", parts: [{ text: systemInstruction }] },
    ...history.slice(-6).map((h) => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.content }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 600,
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Gemini status ${res.status}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty candidate response");

  return {
    reply: text,
    expression: determineExpression(text),
    source: "gemini",
  };
}

function generateLocalSocraticResponse({
  message,
  studentProfile,
  currentTopic,
  assessmentResults,
  weakConcepts,
  masteredConcepts,
  activeLesson,
}) {
  const text = message.toLowerCase().trim();

  // 1. Why was my answer wrong?
  if (text.includes("wrong") || text.includes("incorrect") || text.includes("mistake") || text.includes("why did i get")) {
    if (weakConcepts && weakConcepts.length > 0) {
      const topWeak = weakConcepts[0];
      return {
        reply: `Looking at your diagnostic log, the main challenge was in **${topWeak.name || topWeak}**.\n\nOften students assume geometric changes only affect length, or forget that current takes the path of least resistance in parallel! In physics, whenever wire dimensions change, **volume stays constant**, so cross-sectional area changes too. Would you like me to walk you through a quick 2-step example?`,
        expression: "explaining",
        suggestedActions: ["Show me a worked example", "Explain with an analogy", "Test me with a quick question"],
      };
    }
    return {
      reply: "Whenever an answer doesn't land, it usually comes down to one subtle assumption! Tell me which question or formula you're pondering, and we'll break down the reasoning together step by step.",
      expression: "supportive",
      suggestedActions: ["Explain drift velocity", "Explain Ohm's Law stretching", "Explain Kirchhoff's laws"],
    };
  }

  // 2. Explain simply / analogy
  if (text.includes("simply") || text.includes("simple") || text.includes("analogy") || text.includes("basic") || text.includes("intuition")) {
    return {
      reply: `Here is the simplest way to picture **Current Electricity**:\n\n* **Voltage (V)** is the water pump pressure pushing charge.\n* **Current (I)** is the flow rate of water gallons per second.\n* **Resistance (R)** is pebbles and narrow pipes choking the flow.\n* **Internal Resistance (r)** is friction inside the water pump itself!\n\nWhen you ask the pump for maximum water, its own internal friction eats some pressure before the water ever leaves the spout. Does that visual click?`,
      expression: "explaining",
      suggestedActions: ["Explain Drift Velocity", "Give me a practice problem", "Why does wire stretching multiply by 4?"],
    };
  }

  // 3. Give me a hint / clue
  if (text.includes("hint") || text.includes("clue") || text.includes("stuck")) {
    return {
      reply: `💡 **Lumi's Guiding Clue:**\n\n1. Always start by identifying what stays **constant** (e.g., in series: Current is constant; in parallel: Potential difference is constant; in stretching: Volume is constant).\n2. Write down the fundamental relation first ($I = n e A v_d$ or $R = \\rho L/A$).\n3. What parameter is being doubled or halved in your problem? Substitute that directly into your ratio!`,
      expression: "thinking",
      suggestedActions: ["Show worked calculation", "Test my understanding"],
    };
  }

  // 4. Test me / Quiz me
  if (text.includes("test me") || text.includes("quiz") || text.includes("challenge") || text.includes("question")) {
    return {
      reply: `Here's a quick checkpoint challenge for you:\n\n**Question:** A wire of resistance 10 Ω is cut into 5 equal pieces, and all 5 pieces are connected in parallel. What is the equivalent resistance of this combination?\n\nTake a moment to solve it! (Hint: What is the resistance of each piece first?)`,
      expression: "curious",
      suggestedActions: ["Is it 0.4 Ω?", "Is it 2 Ω?", "Give me a hint!"],
    };
  }

  // 5. Answer to the quiz check
  if (text.includes("0.4") || text.includes("0.4 ohm") || text.includes("0.4Ω")) {
    return {
      reply: `🎉 **Spot on! Incredible work!**\n\nHere is why your thinking was perfect:\n1. Each piece has length L/5, so each piece has resistance R' = 10 / 5 = 2 Ω.\n2. When 5 such 2 Ω resistors are put in parallel: $R_{\\text{eq}} = 2 / 5 = 0.4\\ \\Omega$.\n\nYou just combined series division and parallel combination seamlessly!`,
      expression: "celebrating",
      suggestedActions: ["Take full diagnostic", "Review weak concepts", "Next topic lesson"],
    };
  }

  // 6. Drift Velocity specific
  if (text.includes("drift") || text.includes("drift velocity")) {
    return {
      reply: `**Drift Velocity ($v_d$) in 60 seconds:**\n\n* Even though thermal motion is chaotic and fast (~10⁵ m/s), net progress is zero until a voltage creates an electric field.\n* The steady drift velocity is surprisingly slow: typically **0.1 mm per second**!\n* Key formula: **$I = n \\cdot e \\cdot A \\cdot v_d$**\n* Notice: If a wire narrows (A decreases), electrons must drift faster ($v_d$ increases) to maintain steady current!`,
      expression: "explaining",
      suggestedActions: ["Show worked example", "Explain Ohm's Law", "Give me a hint"],
    };
  }

  // 7. Kirchhoff's Laws
  if (text.includes("kirchhoff") || text.includes("kcl") || text.includes("kvl") || text.includes("junction") || text.includes("loop")) {
    return {
      reply: `**Kirchhoff's Rules are just two fundamental physics laws in disguise:**\n\n1. **Junction Rule (KCL)**: $\\sum I = 0$. Whatever charge flows into a wire crossroad MUST flow out. That's simply **Conservation of Electric Charge**.\n2. **Loop Rule (KVL)**: $\\sum \\Delta V = 0$. If you walk in a complete circuit loop and return to where you started, net electrostatic potential change is zero. That's **Conservation of Energy**!\n\nMastering the sign conventions makes any complex multi-battery circuit easy to crack.`,
      expression: "explaining",
      suggestedActions: ["How do I choose loop signs?", "Try a Kirchhoff question"],
    };
  }

  // 8. General Encouraging Tutor Fallback
  return {
    reply: `Hey ${studentProfile.name || "friend"}! I'm tracking your progress in **${studentProfile.topic || "Current Electricity"}**.\n\nYou have strong momentum! What would you like to tackle right now?\n\n* **Clarify a concept** that feels fuzzy\n* **Break down a formula** step-by-step\n* **Try an interactive question** to test your exam readiness`,
    expression: "encouraging",
    suggestedActions: [
      "Explain this concept simply",
      "Why does stretching a wire increase R by 4?",
      "Test me with a quick question",
      "Explain Kirchhoff's loop rule",
    ],
  };
}

function determineExpression(text) {
  const lower = text.toLowerCase();
  if (lower.includes("congrat") || lower.includes("great job") || lower.includes("spot on") || lower.includes("perfect") || lower.includes("celebrat")) {
    return "celebrating";
  }
  if (lower.includes("don't worry") || lower.includes("that's okay") || lower.includes("let's step back") || lower.includes("common misconception")) {
    return "supportive";
  }
  if (lower.includes("?") || lower.includes("solve") || lower.includes("challenge") || lower.includes("what if")) {
    return "curious";
  }
  if (lower.includes("formula") || lower.includes("step 1") || lower.includes("means") || lower.includes("concept")) {
    return "explaining";
  }
  return "encouraging";
}
