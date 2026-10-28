// Interactive structured lessons with dynamic tutoring controls (simplify, example, hint, retry)

export const LESSONS_DATA = {
  current_electricity: [
    {
      id: "lesson_electric_current_drift",
      conceptId: "electric_current_drift",
      title: "Electric Current & Drift Velocity",
      conceptName: "Electric Current & Drift Velocity",
      duration: "5 min",
      order: 1,
      miloIntro: "Let's explore how trillions of electrons create a smooth, steady electric current!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "What really moves inside a wire?",
          content: [
            "Electric current is the net flow rate of electric charge through any cross-section of a conductor: I = ΔQ / Δt (Amperes, A = C/s).",
            "Inside a metal, free conduction electrons bounce randomly at high thermal speeds (~10⁵ m/s), but their net displacement is zero without an applied field.",
            "When a battery applies a potential difference, an electric field E = V/L pushes electrons with a slow, coordinated drift velocity v_d (~10⁻⁴ m/s — slower than a snail!).",
          ],
          formula: "I = n \\cdot e \\cdot A \\cdot v_d",
          formulaLabels: [
            { symbol: "n", label: "Free electron number density (m⁻³)" },
            { symbol: "e", label: "Elementary charge = 1.6 × 10⁻¹⁹ C" },
            { symbol: "A", label: "Cross-sectional area of wire (m²)" },
            { symbol: "v_d", label: "Drift velocity of electrons (m/s)" },
          ],
        },
        {
          id: "card_2",
          type: "worked_example",
          heading: "Worked Example: Calculating Drift Speed",
          problem: "A copper wire of cross-sectional area 1.0 × 10⁻⁶ m² carries a steady current of 1.6 A. If the free electron density in copper is n = 8.5 × 10²⁸ m⁻³, find the drift velocity of the conduction electrons.",
          steps: [
            { step: "Formula setup", detail: "Rearrange I = n e A v_d for drift speed: v_d = I / (n e A)" },
            { step: "Substitute values", detail: "v_d = 1.6 / [(8.5 × 10²⁸) × (1.6 × 10⁻¹⁹) × (1.0 × 10⁻⁶)]" },
            { step: "Simplify denominator", detail: "Denominator = 8.5 × 1.6 × 10³ = 13.6 × 10³ = 1.36 × 10⁴" },
            { step: "Final Result", detail: "v_d ≈ 1.18 × 10⁻⁴ m/s = 0.118 mm/s! Even though electrons move so slowly, the electric field propagates at nearly light speed, which is why the bulb lights up instantly." },
          ],
        },
      ],
      interactiveCheck: {
        question: "If a wire is replaced with another wire of the SAME material and length, but with HALF the cross-sectional area, carrying the SAME current, what happens to the drift velocity v_d?",
        options: [
          { id: "A", text: "v_d doubles", isCorrect: true, feedback: "Spot on! From v_d = I / (n e A), drift speed is inversely proportional to cross-sectional area. Halving area forces electrons to drift twice as fast to carry identical current." },
          { id: "B", text: "v_d halves", isCorrect: false, feedback: "Not quite. Think about a crowd squeezing through a narrow doorway: to maintain the same throughput, they must move faster, not slower." },
          { id: "C", text: "v_d remains unchanged", isCorrect: false, feedback: "Incorrect. Area directly affects carrier throughput." },
          { id: "D", text: "v_d quadruples", isCorrect: false, feedback: "Incorrect. The relationship is inverse linear (1/A), not inverse square." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "The Marble Pipe Analogy",
          analogyContent: "Imagine a long pipe packed completely full of marbles end-to-end. When you push one single marble into the left side, a marble immediately pops out the right side! The 'signal' travels almost instantly, but individual marbles only nudge forward a few millimeters. Electrons in a wire behave like those packed marbles.",
        },
        anotherExample: {
          title: "Current Density Variation",
          problem: "A tapered wire has radius r₁ = 2 mm at one end and r₂ = 1 mm at the other end. If current I = 2 A passes through, what is the ratio of current density J₂ / J₁?",
          solution: "Since J = I / (πr²), J₂ / J₁ = (r₁ / r₂)² = (2 / 1)² = 4. The current density is 4 times higher in the narrower section!",
        },
        hint: "Drift velocity is inversely proportional to cross-sectional area A: v_d ∝ 1/A when current I and material density n are constant.",
        similarQuestion: {
          question: "Two wires made of the same metal carry identical currents. Wire A has radius r and Wire B has radius 2r. What is the ratio of drift speed in Wire A to Wire B (v_A / v_B)?",
          options: [
            { id: "opt_1", text: "4 : 1", isCorrect: true, feedback: "Correct! Area is proportional to r². Area of B is 4 times Area of A, so v_A = 4 × v_B." },
            { id: "opt_2", text: "2 : 1", isCorrect: false, feedback: "Remember that cross-sectional area depends on the square of the radius (πr²)." },
            { id: "opt_3", text: "1 : 2", isCorrect: false, feedback: "Wire A is narrower, so electrons must move faster in Wire A." },
            { id: "opt_4", text: "1 : 4", isCorrect: false, feedback: "Inverted ratio." },
          ],
        },
      },
    },

    {
      id: "lesson_ohms_law_resistance",
      conceptId: "ohms_law_resistance",
      title: "Ohm's Law & Resistivity Factors",
      conceptName: "Ohm's Law & Resistivity Factors",
      duration: "6 min",
      order: 2,
      miloIntro: "Let's uncover why resistance depends on what a wire is made of and how it is shaped!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "Macroscopic vs Microscopic Ohm's Law",
          content: [
            "Macroscopic form: V = I · R (Potential difference across conductor is proportional to current, under constant physical conditions).",
            "Microscopic vector form: J = σ · E (Current density J is proportional to electric field E, where σ is electrical conductivity).",
            "Resistance R depends on geometry and material resistivity ρ (where ρ = 1/σ): R = ρ · (L / A).",
          ],
          formula: "R = \\rho \\frac{L}{A} \\quad \\text{and} \\quad \\rho = \\frac{m}{n \\, e^2 \\, \\tau}",
          formulaLabels: [
            { symbol: "R", label: "Electrical resistance in Ohms (Ω)" },
            { symbol: "ρ", label: "Material resistivity (Ω·m)" },
            { symbol: "L", label: "Length of the conductor (m)" },
            { symbol: "A", label: "Cross-sectional area (m²)" },
            { symbol: "τ", label: "Average relaxation time between collisions (s)" },
          ],
        },
        {
          id: "card_2",
          type: "worked_example",
          heading: "Worked Example: Wire Stretching",
          problem: "A wire of resistance 5 Ω is drawn out through a die so that its radius is halved. Assuming uniform density and volume, calculate its new resistance.",
          steps: [
            { step: "Volume conservation", detail: "V = A · L = πr² · L = constant. When radius r' = r/2, new area A' = π(r/2)² = A/4." },
            { step: "Find new length", detail: "Since A' · L' = A · L ⇒ (A/4) · L' = A · L ⇒ L' = 4L. The wire is 4 times longer!" },
            { step: "Calculate new resistance", detail: "R' = ρ (L' / A') = ρ (4L / (A/4)) = 16 × (ρL/A) = 16 R." },
            { step: "Numerical answer", detail: "R' = 16 × 5 Ω = 80 Ω! Notice how shrinking radius affects resistance to the 4th power: R ∝ 1/r⁴." },
          ],
        },
      ],
      interactiveCheck: {
        question: "Two wires X and Y of equal length and equal resistance are made of materials with resistivities ρ_X and ρ_Y where ρ_X = 4 ρ_Y. What is the ratio of their cross-sectional areas A_X / A_Y?",
        options: [
          { id: "A", text: "4 : 1", isCorrect: true, feedback: "Correct! R = ρL/A. For equal R and L, ρ/A must be equal: ρ_X / A_X = ρ_Y / A_Y ⇒ A_X / A_Y = ρ_X / ρ_Y = 4." },
          { id: "B", text: "1 : 4", isCorrect: false, feedback: "Incorrect. The material with 4x higher resistivity needs 4x larger area to achieve the same low resistance." },
          { id: "C", text: "2 : 1", isCorrect: false, feedback: "Incorrect. Area scales linearly with resistivity for fixed resistance." },
          { id: "D", text: "16 : 1", isCorrect: false, feedback: "Incorrect. Check your cross-multiplication." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "Water Hose Analogy",
          analogyContent: "Imagine water flowing through a garden hose. A longer hose (higher L) creates more friction and slows down water. A wider hose (higher A) lets water gush through easily. The roughness of the inner rubber is the resistivity (ρ). Together, Resistance = (Roughness × Length) / Width.",
        },
        anotherExample: {
          title: "Conductivity Calculation",
          problem: "A silver wire has resistivity ρ = 1.6 × 10⁻⁸ Ω·m. What is its electrical conductivity σ?",
          solution: "Conductivity σ = 1 / ρ = 1 / (1.6 × 10⁻⁸) = 6.25 × 10⁷ S/m (Siemens per meter). High conductivity makes silver the best electrical conductor among pure elements.",
        },
        hint: "When volume is constant, R ∝ L² and R ∝ 1/A² and R ∝ 1/r⁴.",
        similarQuestion: {
          question: "If a wire is stretched such that its length increases by 10% (L' = 1.1 L), by approximately what percentage does its resistance increase?",
          options: [
            { id: "opt_1", text: "21%", isCorrect: true, feedback: "Correct! R' = R × (1.1)² = 1.21 R, representing a 21% increase." },
            { id: "opt_2", text: "10%", isCorrect: false, feedback: "That accounts for length increase only, ignoring area reduction." },
            { id: "opt_3", text: "20%", isCorrect: false, feedback: "Very close, but (1.1)² = 1.21, exactly 21%." },
            { id: "opt_4", text: "100%", isCorrect: false, feedback: "Too large." },
          ],
        },
      },
    },

    {
      id: "lesson_resistor_combinations",
      conceptId: "resistor_combinations",
      title: "Series & Parallel Resistor Networks",
      conceptName: "Series & Parallel Resistor Networks",
      duration: "7 min",
      order: 3,
      miloIntro: "Master how voltages divide in series and how currents split in parallel!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "Series vs Parallel Rules",
          content: [
            "In Series: Current through each resistor is IDENTICAL. Potential difference divides: V_total = V₁ + V₂. Equivalent resistance: R_s = R₁ + R₂ + ... + R_n.",
            "In Parallel: Potential difference across each branch is IDENTICAL. Current divides: I_total = I₁ + I₂. Equivalent resistance: 1/R_p = 1/R₁ + 1/R₂.",
            "Key shortcut for two parallel resistors: R_p = (R₁ · R₂) / (R₁ + R₂). Equivalent resistance in parallel is ALWAYS smaller than the smallest branch resistor!",
          ],
          formula: "R_{\\text{series}} = \\sum R_i \\quad \\text{and} \\quad \\frac{1}{R_{\\text{parallel}}} = \\sum \\frac{1}{R_i}",
          formulaLabels: [
            { symbol: "R_s", label: "Series equivalent (always increases resistance)" },
            { symbol: "R_p", label: "Parallel equivalent (always provides bypass paths)" },
          ],
        },
        {
          id: "card_2",
          type: "worked_example",
          heading: "Worked Example: Current Divider",
          problem: "Two resistors R₁ = 6 Ω and R₂ = 12 Ω are connected in parallel across a total incoming current of 6 A. Find the current flowing through R₁.",
          steps: [
            { step: "Find equivalent parallel resistance", detail: "R_p = (6 × 12) / (6 + 12) = 72 / 18 = 4 Ω." },
            { step: "Find common voltage across branches", detail: "V = I_total × R_p = 6 A × 4 Ω = 24 V." },
            { step: "Find current through R₁", detail: "I₁ = V / R₁ = 24 V / 6 Ω = 4 A." },
            { step: "Current divider shortcut", detail: "I₁ = I_total × [R₂ / (R₁ + R₂)] = 6 × [12 / 18] = 4 A. Notice the smaller resistor carries the larger share of current!" },
          ],
        },
      ],
      interactiveCheck: {
        question: "You are given n identical resistors each of resistance R. What is the ratio of their maximum equivalent resistance (all in series) to their minimum equivalent resistance (all in parallel)?",
        options: [
          { id: "A", text: "n²", isCorrect: true, feedback: "Outstanding! R_max = nR (series) and R_min = R/n (parallel). Ratio = (nR) / (R/n) = n²." },
          { id: "B", text: "n", isCorrect: false, feedback: "Incorrect. Series is n times R and parallel is 1/n times R." },
          { id: "C", text: "1 / n²", isCorrect: false, feedback: "Incorrect. You took the reciprocal (min to max)." },
          { id: "D", text: "2n", isCorrect: false, feedback: "Incorrect. Combination scaling depends on n²." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "Toll Booth Lanes Analogy",
          analogyContent: "Cars on a highway are like electrons. If all cars must pass through booth 1, then booth 2, then booth 3 (Series), traffic slows down as delays add up. But if three toll booths open side-by-side (Parallel), cars distribute across lanes, reducing total congestion. More parallel paths = lower overall resistance!",
        },
        anotherExample: {
          title: "Symmetric Bridge Reduction",
          problem: "Find equivalent resistance between terminals A and B of a cube formed by 12 identical resistors R along its edges across body diagonals.",
          solution: "By symmetry, currents divide: (1/3 I) on 3 edges entering node A, then each splits into (1/6 I) on 6 middle edges, then merge into (1/3 I) on 3 exit edges. Total voltage V = (I/3)R + (I/6)R + (I/3)R = (5/6) I R. Therefore, R_eq = (5/6) R.",
        },
        hint: "In parallel, reciprocal values sum up: 1/R_p = 1/R₁ + 1/R₂. For two resistors: Product over Sum.",
        similarQuestion: {
          question: "What is the equivalent resistance between A and B when two 10 Ω resistors in parallel are connected in series with a 5 Ω resistor?",
          options: [
            { id: "opt_1", text: "10 Ω", isCorrect: true, feedback: "Correct! Parallel pair = 10/2 = 5 Ω. Series addition: 5 + 5 = 10 Ω." },
            { id: "opt_2", text: "25 Ω", isCorrect: false, feedback: "All in series would be 25 Ω, but two are in parallel." },
            { id: "opt_3", text: "15 Ω", isCorrect: false, feedback: "Check your parallel calculation." },
            { id: "opt_4", text: "5 Ω", isCorrect: false, feedback: "Too low." },
          ],
        },
      },
    },

    {
      id: "lesson_emf_internal_resistance",
      conceptId: "emf_internal_resistance",
      title: "EMF, Terminal Voltage & Internal Resistance",
      conceptName: "EMF, Terminal Voltage & Internal Resistance",
      duration: "6 min",
      order: 4,
      miloIntro: "Why does battery voltage drop when high current is drawn? Let's inspect the inside of a real cell!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "The Real Cell Model",
          content: [
            "Electromotive Force (EMF, E): The maximum potential difference between cell terminals when NO current is drawn (open circuit). It is the chemical work done per unit positive charge: E = W / Q.",
            "Internal Resistance (r): Opposition to charge flow offered by the electrolyte and electrodes inside the cell itself.",
            "Terminal Voltage (V): The actual voltage available across external circuit terminals.",
          ],
          formula: "V = E - I \\cdot r \\quad (\\text{Discharging}) \\quad \\text{and} \\quad V = E + I \\cdot r \\quad (\\text{Charging})",
          formulaLabels: [
            { symbol: "E", label: "Cell Electromotive Force (Volts)" },
            { symbol: "r", label: "Internal resistance of the cell (Ω)" },
            { symbol: "V", label: "Terminal potential difference across load (Volts)" },
            { symbol: "I", label: "Current flowing through circuit: I = E / (R + r)" },
          ],
        },
      ],
      interactiveCheck: {
        question: "When a storage battery is being charged by an external DC charger with current I, how does its terminal voltage V compare to its internal EMF E?",
        options: [
          { id: "A", text: "V > E", isCorrect: true, feedback: "Correct! During charging, external current enters the positive terminal against the cell's EMF. The charger must overcome both EMF and internal resistance drop: V = E + Ir." },
          { id: "B", text: "V < E", isCorrect: false, feedback: "Incorrect. V < E occurs during discharging (normal operation) when V = E - Ir." },
          { id: "C", text: "V = E", isCorrect: false, feedback: "Incorrect. Only true if internal resistance r = 0 or when current I = 0." },
          { id: "D", text: "V = 0", isCorrect: false, feedback: "Incorrect." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "Salary vs Take-Home Pay Analogy",
          analogyContent: "Think of EMF as your Gross Salary on paper (e.g. $1000). The internal resistance drop (Ir) is income tax deducted directly from source ($200). Terminal Voltage V is your actual Take-Home Pay that reaches your wallet ($800). When you spend more energy, internal friction takes its cut first!",
        },
        anotherExample: {
          title: "Short Circuit Current Calculation",
          problem: "A car battery has E = 12 V and r = 0.05 Ω. What is the maximum current if terminals are accidentally short-circuited (R = 0)?",
          solution: "I_short = E / r = 12 V / 0.05 Ω = 240 Amperes! This massive current dissipates huge heat (P = I²r = 2880 W) instantly, explaining why short-circuiting batteries causes dangerous sparks.",
        },
        hint: "During discharge: V = E - Ir. During charging: V = E + Ir.",
        similarQuestion: {
          question: "A cell of EMF 2.0 V and internal resistance 0.5 Ω gives a current of 1.0 A. What is the terminal potential difference?",
          options: [
            { id: "opt_1", text: "1.5 V", isCorrect: true, feedback: "Correct! V = E - Ir = 2.0 - (1.0 × 0.5) = 1.5 V." },
            { id: "opt_2", text: "2.5 V", isCorrect: false, feedback: "You added Ir instead of subtracting during discharge." },
            { id: "opt_3", text: "2.0 V", isCorrect: false, feedback: "You ignored internal resistance drop." },
            { id: "opt_4", text: "0.5 V", isCorrect: false, feedback: "0.5 V is the lost voltage, not terminal voltage." },
          ],
        },
      },
    },

    {
      id: "lesson_kirchhoff_laws",
      conceptId: "kirchhoff_laws",
      title: "Kirchhoff's Rules for Complex Networks",
      conceptName: "Kirchhoff's Junction & Loop Rules",
      duration: "8 min",
      order: 5,
      miloIntro: "When circuits cannot be simplified by simple series-parallel reductions, Kirchhoff's laws solve any loop!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "The Two Golden Rules of Circuits",
          content: [
            "1. Junction Rule (KCL): At any junction node in an electrical circuit, the sum of currents entering equals the sum of currents leaving: Σ I_in = Σ I_out. Based on Conservation of Electric Charge.",
            "2. Loop Rule (KVL): The algebraic sum of changes in potential around any closed loop must equal zero: Σ ΔV = 0. Based on Conservation of Energy.",
            "Sign convention: Moving along current through resistor gives -IR drop. Moving against current gives +IR gain. Moving from - to + terminal of battery gives +E gain.",
          ],
          formula: "\\sum_{\\text{junction}} I = 0 \\quad \\text{and} \\quad \\sum_{\\text{closed loop}} \\Delta V = 0",
          formulaLabels: [
            { symbol: "KCL", label: "Charge cannot accumulate or vanish at a wire node" },
            { symbol: "KVL", label: "Total net electrostatic work around any closed path is zero" },
          ],
        },
      ],
      interactiveCheck: {
        question: "In a junction, four currents meet: 3 A and 5 A flow into the junction, while 2 A flows out along a third wire. What is the current flowing in the fourth wire?",
        options: [
          { id: "A", text: "6 A flowing out of the junction", isCorrect: true, feedback: "Correct! Total in = 3 + 5 = 8 A. Total out must equal 8 A. With 2 A already flowing out, the fourth wire must carry 8 - 2 = 6 A outwards." },
          { id: "B", text: "6 A flowing into the junction", isCorrect: false, feedback: "Incorrect. If it flowed into the junction, total in would be 14 A and out only 2 A, violating charge conservation." },
          { id: "C", text: "10 A flowing out", isCorrect: false, feedback: "Incorrect arithmetic." },
          { id: "D", text: "4 A flowing out", isCorrect: false, feedback: "Incorrect calculation." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "River Junction & Roller Coaster Loop",
          analogyContent: "KCL is like three streams joining into one river: whatever gallons per second flow in must flow out. KVL is like riding a roller coaster: you climb hills (batteries) and descend slopes (resistor drops). When you return to the starting platform, your net height change is exactly zero!",
        },
        anotherExample: {
          title: "Loop Traversal Example",
          problem: "Traverse a loop with battery 12 V in series with resistors 4 Ω and 2 Ω. If current I = 2 A flows clockwise, verify loop sum.",
          solution: "Start at negative battery terminal: +12 V (through battery) - (2 A × 4 Ω) - (2 A × 2 Ω) = 12 - 8 - 4 = 0 V. KVL is fully satisfied!",
        },
        hint: "Sum of currents entering node = Sum of currents leaving node.",
        similarQuestion: {
          question: "If 10 A enters a node and branches into three paths carrying 2 A, 5 A, and I_3, what is I_3?",
          options: [
            { id: "opt_1", text: "3 A", isCorrect: true, feedback: "Correct! 10 = 2 + 5 + I_3 ⇒ I_3 = 3 A." },
            { id: "opt_2", text: "7 A", isCorrect: false, feedback: "2 + 5 = 7 A is the sum of the other two branches." },
            { id: "opt_3", text: "5 A", isCorrect: false, feedback: "Incorrect." },
            { id: "opt_4", text: "1 A", isCorrect: false, feedback: "Incorrect." },
          ],
        },
      },
    },
  ],
};
