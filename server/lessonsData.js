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
  ],

  electrochemistry: [
    {
      id: "lesson_galvanic_cells_potential",
      conceptId: "galvanic_cells_potential",
      title: "Galvanic Cells & Standard Potentials",
      conceptName: "Galvanic Cells & Potentials",
      duration: "5 min",
      order: 1,
      miloIntro: "Let's discover how spontaneous redox reactions produce a flow of electricity!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "The Galvanic Cell Mechanism",
          content: [
            "Anode = Oxidation electrode (electrons generated: Zn → Zn²⁺ + 2e⁻). Negative polarity in galvanic cells.",
            "Cathode = Reduction electrode (electrons consumed: Cu²⁺ + 2e⁻ → Cu). Positive polarity.",
            "Salt Bridge completes the electrical circuit and maintains electrical neutrality using an agar-agar gel with inert ions (K⁺, NO₃⁻).",
          ],
          formula: "E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}",
          formulaLabels: [
            { symbol: "E°_cell", label: "Standard electromotive force of the cell (Volts)" },
            { symbol: "E°_cathode", label: "Standard reduction potential of cathode" },
            { symbol: "E°_anode", label: "Standard reduction potential of anode" },
          ],
        },
      ],
      interactiveCheck: {
        question: "What happens to the current in an electrochemical cell if the salt bridge is suddenly removed?",
        options: [
          { id: "A", text: "Drops immediately to zero", isCorrect: true, feedback: "Correct! Without the salt bridge, charge accumulation halts ion flow and immediately interrupts the circuit current." },
          { id: "B", text: "Doubles in magnitude", isCorrect: false, feedback: "Incorrect. Removing a circuit element cannot increase current." },
          { id: "C", text: "Remains steady", isCorrect: false, feedback: "Incorrect. Charge accumulation prevents further electron flow." },
          { id: "D", text: "Reverses direction", isCorrect: false, feedback: "Incorrect." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "The Two Bank Accounts Analogy",
          analogyContent: "Think of the anode as an account transferring money (electrons) to the cathode. If the banks don't have a balance transfer wire (salt bridge) to neutralize debt, the transaction freezes immediately!",
        },
        anotherExample: {
          title: "Daniel Cell Standard EMF",
          problem: "Calculate E° for Zn|Zn²⁺ || Ag⁺|Ag given E°(Zn²⁺/Zn) = -0.76 V and E°(Ag⁺/Ag) = +0.80 V.",
          solution: "E°_cell = E°(cathode) - E°(anode) = +0.80 - (-0.76) = +1.56 V.",
        },
        hint: "Salt bridge maintains electrical neutrality; without it, ion accumulation halts the reaction.",
        similarQuestion: {
          question: "Which of the following electrodes always undergoes oxidation?",
          options: [
            { id: "opt_1", text: "Anode", isCorrect: true, feedback: "Correct! 'An Ox' (Anode = Oxidation) and 'Red Cat' (Reduction = Cathode)." },
            { id: "opt_2", text: "Cathode", isCorrect: false, feedback: "Cathode is always reduction." },
            { id: "opt_3", text: "Salt bridge", isCorrect: false, feedback: "Salt bridge does not undergo redox." },
            { id: "opt_4", text: "None", isCorrect: false, feedback: "Incorrect." },
          ],
        },
      },
    },
  ],

  electrostatics: [
    {
      id: "lesson_coulombs_law_fields",
      conceptId: "coulombs_law_fields",
      title: "Coulomb's Law & Principle of Superposition",
      conceptName: "Coulomb's Law",
      duration: "5 min",
      order: 1,
      miloIntro: "Let's examine how electric charges exert invisible forces across space!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "Electrostatic Force Fundamentals",
          content: [
            "Coulomb's Law: The electrostatic force between two stationary point charges is directly proportional to product of charges and inversely proportional to square of distance.",
            "Permittivity: In a medium with dielectric constant K, the force is reduced by a factor of K: F_medium = F_vacuum / K.",
          ],
          formula: "F = \\frac{1}{4 \\pi \\varepsilon_0 K} \\frac{|q_1 q_2|}{r^2}",
          formulaLabels: [
            { symbol: "ε₀", label: "Permittivity of free space = 8.854 × 10⁻¹² C²/(N·m²)" },
            { symbol: "K", label: "Dielectric constant of medium (K = 1 for vacuum, K ≈ 80 for water)" },
          ],
        },
      ],
      interactiveCheck: {
        question: "If two point charges are immersed in water (K = 80) at the same separation, how does the force change?",
        options: [
          { id: "A", text: "Decreases to 1/80 of its value in air", isCorrect: true, feedback: "Correct! Water's high dielectric constant polarizes and screens the electrostatic attraction." },
          { id: "B", text: "Increases by 80 times", isCorrect: false, feedback: "Dielectric materials always screen/reduce electrostatic forces." },
          { id: "C", text: "Remains constant", isCorrect: false, feedback: "Medium matters greatly in electrostatics." },
          { id: "D", text: "Becomes zero", isCorrect: false, feedback: "Force is reduced, not zero." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "Speaking Through a Thick Blanket",
          analogyContent: "Imagine yelling to a friend across a clear room (vacuum). Now hang 80 wool blankets between you (water molecules). The sound (electric force) still passes through, but gets muffled and screened!",
        },
        anotherExample: {
          title: "Equal Charge Repulsion",
          problem: "Two charges of 1 μC are placed 1 m apart in vacuum. What is the repulsion force?",
          solution: "F = 9 × 10⁹ × (10⁻⁶ × 10⁻⁶) / 1² = 9 × 10⁻³ N = 0.009 Newtons.",
        },
        hint: "F_medium = F_vacuum / K.",
        similarQuestion: {
          question: "What is the force if the distance is halved in vacuum?",
          options: [
            { id: "opt_1", text: "4 times greater", isCorrect: true, feedback: "Correct! Inverse square law: halving distance multiplies force by 2² = 4." },
            { id: "opt_2", text: "2 times greater", isCorrect: false, feedback: "Remember the distance is squared." },
            { id: "opt_3", text: "Half as much", isCorrect: false, feedback: "Getting closer increases force." },
            { id: "opt_4", text: "Unchanged", isCorrect: false, feedback: "Incorrect." },
          ],
        },
      },
    },
  ],

  calculus_integrals: [
    {
      id: "lesson_fundamental_theorem_calculus",
      conceptId: "fundamental_theorem_calculus",
      title: "Fundamental Theorem of Calculus",
      conceptName: "Calculus & Integrals",
      duration: "6 min",
      order: 1,
      miloIntro: "Let's connect slopes and areas under curves with the Fundamental Theorem!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "The Inverse Nature of Differentiation & Integration",
          content: [
            "If f(x) is continuous on [a, b] and F(x) is an antiderivative of f(x) (i.e. F'(x) = f(x)), then:",
            "∫ from a to b of f(x) dx = F(b) - F(a).",
            "This computes the exact net signed area enclosed between the curve y = f(x) and the x-axis.",
          ],
          formula: "\\int_a^b f(x) \\, dx = F(b) - F(a)",
          formulaLabels: [
            { symbol: "f(x)", label: "Integrand rate function" },
            { symbol: "F(x)", label: "Antiderivative accumulation function" },
          ],
        },
      ],
      interactiveCheck: {
        question: "What is the value of ∫ from 1 to 3 of 2x dx?",
        options: [
          { id: "A", text: "8", isCorrect: true, feedback: "Correct! Antiderivative of 2x is x². [x²] from 1 to 3 = 3² - 1² = 9 - 1 = 8." },
          { id: "B", text: "6", isCorrect: false, feedback: "Did you multiply 2 by (3-1) without integrating?" },
          { id: "C", text: "9", isCorrect: false, feedback: "Don't forget to subtract F(1) = 1." },
          { id: "D", text: "4", isCorrect: false, feedback: "Incorrect." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "Speedometer to Odometer",
          analogyContent: "The speedometer shows your speed at each instant (derivative). Integrating your speed over 2 hours gives your odometer distance (antiderivative area).",
        },
        anotherExample: {
          title: "Area of a Triangle",
          problem: "Calculate ∫ from 0 to 4 of x dx and compare to triangle area 1/2 × base × height.",
          solution: "[x²/2] from 0 to 4 = 16/2 = 8. Base = 4, height = 4, Area = 1/2 × 4 × 4 = 8. Exact match!",
        },
        hint: "Antiderivative of x^n is x^(n+1) / (n+1).",
        similarQuestion: {
          question: "What is ∫ from 0 to 2 of 3x² dx?",
          options: [
            { id: "opt_1", text: "8", isCorrect: true, feedback: "Correct! Antiderivative is x³. 2³ - 0³ = 8." },
            { id: "opt_2", text: "12", isCorrect: false, feedback: "Check your integration power rule." },
            { id: "opt_3", text: "6", isCorrect: false, feedback: "Incorrect." },
            { id: "opt_4", text: "24", isCorrect: false, feedback: "Incorrect." },
          ],
        },
      },
    },
  ],

  binary_search_trees: [
    {
      id: "lesson_bst_properties_invariant",
      conceptId: "bst_properties_invariant",
      title: "BST Ordering Invariant & Searching",
      conceptName: "Binary Search Trees",
      duration: "5 min",
      order: 1,
      miloIntro: "Let's explore how binary search trees achieve lightning-fast O(log N) searches!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "The Binary Search Tree Property",
          content: [
            "For any node X in a BST: every key in X's left subtree is strictly less than X.key, and every key in X's right subtree is strictly greater than X.key.",
            "Searching starts at root: if target < current, go left; if target > current, go right; else found!",
            "Search and insertion take O(height) time. For a balanced BST, height is O(log N).",
          ],
          formula: "\\text{Left Subtree Keys} < \\text{Node Key} < \\text{Right Subtree Keys}",
          formulaLabels: [
            { symbol: "O(log N)", label: "Balanced BST lookup & insertion efficiency" },
            { symbol: "O(N)", label: "Worst case degenerate linear BST (like a linked list)" },
          ],
        },
      ],
      interactiveCheck: {
        question: "What traversal order on a valid Binary Search Tree produces all elements in strictly ascending sorted order?",
        options: [
          { id: "A", text: "In-order Traversal (Left, Root, Right)", isCorrect: true, feedback: "Spot on! By visiting Left (smaller), then Root, then Right (larger), in-order traversal guarantees sorted output in O(N) time." },
          { id: "B", text: "Pre-order Traversal (Root, Left, Right)", isCorrect: false, feedback: "Pre-order visits the root first, not the smallest element." },
          { id: "C", text: "Post-order Traversal (Left, Right, Root)", isCorrect: false, feedback: "Post-order visits root last, useful for tree deletions, not sorting." },
          { id: "D", text: "Level-order Traversal", isCorrect: false, feedback: "Breadth-first visits level by level, which does not guarantee sorted order." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "Guess the Number Game",
          analogyContent: "When playing 'Guess a number between 1 and 100', your first guess is 50. If too low, you throw away 1-49 and guess 75. A BST is that exact halving strategy frozen into a tree data structure!",
        },
        anotherExample: {
          title: "BST Height Calculation",
          problem: "A balanced BST contains 1,023 elements. How many comparisons at most are needed to find any element?",
          solution: "Since 2¹⁰ - 1 = 1,023, the tree has height 10. You need at most 10 comparisons to search through over 1,000 items!",
        },
        hint: "In-order traversal visits: Left Subtree, then Current Node, then Right Subtree.",
        similarQuestion: {
          question: "Where is the largest element located in a BST?",
          options: [
            { id: "opt_1", text: "Rightmost node", isCorrect: true, feedback: "Correct! Keep following right child pointers to reach the maximum." },
            { id: "opt_2", text: "Leftmost node", isCorrect: false, feedback: "Leftmost node is the minimum." },
            { id: "opt_3", text: "Root node", isCorrect: false, feedback: "Root is intermediate." },
            { id: "opt_4", text: "Any leaf", isCorrect: false, feedback: "Incorrect." },
          ],
        },
      },
    },
  ],

  // ==========================================
  // B.TECH CSE 3RD YEAR CORE LESSONS
  // ==========================================
  cse3_se: [
    {
      id: "lesson_se_agile_scrum",
      conceptId: "agile_scrum_sprints",
      title: "Agile Manifesto & Scrum Framework",
      conceptName: "Agile & Scrum Sprints",
      duration: "6 min",
      order: 1,
      miloIntro: "Let's explore how modern software engineering teams ship reliable value in 2-week agile sprint iterations!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "Agile Values & The Scrum Lifecycle",
          content: [
            "Agile prioritizes working software, customer collaboration, and responding to change over rigid contract negotiation and heavyweight documentation.",
            "In Scrum, work is organized into time-boxed Sprints (usually 2 to 4 weeks) led by a Product Owner, Scrum Master, and cross-functional Engineering Team.",
            "Ceremonies keep teams aligned: Sprint Planning (scope commitment), Daily Standup (15-min blocker sync), Sprint Review (demo to stakeholders), and Sprint Retrospective (continuous team improvement).",
          ],
          formula: "\\text{Velocity} = \\sum \\text{Completed Story Points per Sprint}",
          formulaLabels: [
            { symbol: "Story Points", label: "Relative effort & complexity unit (Fibonacci sequence: 1, 2, 3, 5, 8...)" },
            { symbol: "Burndown Chart", label: "Real-time graph tracking remaining story points vs days in the sprint" },
          ],
        },
        {
          id: "card_2",
          type: "worked_example",
          heading: "Real-World Scenario: Story Point Commitment",
          problem: "A development team has an average historic velocity of 32 story points. In sprint planning, the Product Owner introduces 5 user stories estimated at 8, 5, 8, 13, and 3 points. What should the Scrum team commit to?",
          steps: [
            { step: "Calculate requested total", detail: "8 + 5 + 8 + 13 + 3 = 37 story points total." },
            { step: "Compare with velocity", detail: "37 points exceeds historic average velocity of 32 by 5 points. Overcommitting leads to rushed code and technical debt." },
            { step: "Prune or split", detail: "De-prioritize the 5-point story or split the 13-point story into two smaller stories (8 + 5), committing to 32 points." },
            { step: "Key Takeaway", detail: "Agile velocity is an empirical capacity measurement, not a deadline quota." },
          ],
        },
      ],
      interactiveCheck: {
        question: "Which Scrum ceremony is specifically dedicated to analyzing team workflow friction and implementing process improvements for the NEXT sprint?",
        options: [
          { id: "A", text: "Sprint Retrospective", isCorrect: true, feedback: "Spot on! The Sprint Retrospective is the team's internal inspect-and-adapt meeting focused purely on how the team collaborated, tooling issues, and actionable improvements." },
          { id: "B", text: "Sprint Review", isCorrect: false, feedback: "Sprint Review focuses on demonstrating the product increment to stakeholders, not internal team processes." },
          { id: "C", text: "Daily Scrum", isCorrect: false, feedback: "Daily Scrum is a daily tactical blocker check, not deep retrospective analysis." },
          { id: "D", text: "Backlog Refinement", isCorrect: false, feedback: "Backlog refinement clarifies upcoming user stories." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "The Food Truck vs Grand Hotel Banquet",
          analogyContent: "Waterfall is like planning a 500-guest hotel banquet 6 months in advance without tasting dishes along the way. Agile is like running a food truck: you cook small batches daily, hear customer reactions immediately, and adjust the recipe within hours!",
        },
        anotherExample: {
          title: "User Story Formatting",
          problem: "How should a payment gateway integration requirement be drafted in standard Agile User Story format?",
          solution: "Format: 'As a [registered shopper], I want to [pay with Apple Pay / UPI in one click] so that [I can complete checkout in under 10 seconds without typing card numbers]'. Includes clear Acceptance Criteria (Given / When / Then).",
        },
        hint: "Review is for the PRODUCT with external stakeholders. Retrospective is for the PROCESS with the internal team.",
        similarQuestion: {
          question: "Who holds the ultimate authority to prioritize items in the Product Backlog in Scrum?",
          options: [
            { id: "opt_1", text: "Product Owner", isCorrect: true, feedback: "Correct! The Product Owner owns the vision, business value, and priority order of backlog items." },
            { id: "opt_2", text: "Scrum Master", isCorrect: false, feedback: "Scrum Master coaches process, but does not dictate business priorities." },
            { id: "opt_3", text: "Lead Architect", isCorrect: false, feedback: "Architect advises on feasibility, but PO decides business value." },
            { id: "opt_4", text: "Project Manager", isCorrect: false, feedback: "Scrum replaces traditional PMs with PO and Scrum Master roles." },
          ],
        },
      },
    },
    {
      id: "lesson_se_design_patterns",
      conceptId: "solid_design_principles",
      title: "SOLID Principles & Architectural Patterns",
      conceptName: "SOLID Principles in Software Design",
      duration: "7 min",
      order: 2,
      miloIntro: "Let's master the 5 SOLID engineering principles that separate spaghetti code from maintainable enterprise systems!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "The 5 SOLID Pillars",
          content: [
            "S - Single Responsibility Principle (SRP): A class should have one, and only one, reason to change.",
            "O - Open/Closed Principle (OCP): Software entities should be open for extension, but closed for modification (achieved via interfaces and polymorphism).",
            "L - Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types without altering program correctness.",
            "I - Interface Segregation Principle (ISP): Clients should never be forced to depend on methods they do not use (prefer small, role-specific interfaces).",
            "D - Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules; both should depend on abstractions (Dependency Injection).",
          ],
          formula: "\\text{High-Level Business Logic} \\longrightarrow [\\text{Interface}] \\longleftarrow \\text{Concrete Low-Level Service}",
          formulaLabels: [
            { symbol: "DIP", label: "Inverts dependency arrow using abstract interfaces" },
            { symbol: "Coupling", label: "Low coupling + High cohesion = clean maintainable codebase" },
          ],
        },
      ],
      interactiveCheck: {
        question: "A Developer has a `PaymentProcessor` class. When adding Bitcoin support, they modify the core `process()` method with a new `else if (type == 'BTC')` branch. Which SOLID principle is being directly violated?",
        options: [
          { id: "A", text: "Open/Closed Principle (OCP)", isCorrect: true, feedback: "Outstanding! OCP states that classes should be open for extension (e.g. creating a new `BitcoinPaymentStrategy` implementing `IPaymentMethod`) but CLOSED for modification of existing working classes." },
          { id: "B", text: "Single Responsibility Principle (SRP)", isCorrect: false, feedback: "While related, adding if-else branches directly to modify existing behavior violates OCP." },
          { id: "C", text: "Interface Segregation Principle", isCorrect: false, feedback: "ISP concerns bloated interface method signatures." },
          { id: "D", text: "Liskov Substitution Principle", isCorrect: false, feedback: "LSP concerns inheritance polymorphism contracts." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "The Wall Outlet Plug Analogy",
          analogyContent: "Your home electrical wall socket is an Interface. It provides standard AC power. When you invent a brand new lamp or laptop charger, you don't break open the wall to rewire the building (that would violate Open/Closed)! You simply design your plug to match the standard socket. That is Open/Closed and Dependency Inversion in action.",
        },
        anotherExample: {
          title: "Refactoring Violation with Strategy Pattern",
          problem: "How do you refactor `if (type == 'CreditCard') ... else if (type == 'PayPal')`?",
          solution: "Define interface `PaymentMethod { void pay(double amount); }`. Implement `CreditCardPayment` and `PayPalPayment`. Pass the desired implementation to the constructor via Dependency Injection.",
        },
        hint: "Open for extension (adding new plugins), closed for modification (never editing tested core files).",
        similarQuestion: {
          question: "If a `Square` subclass inherits from `Rectangle` and setting `square.setWidth(10)` unexpectedly changes `square.height`, which principle is violated?",
          options: [
            { id: "opt_1", text: "Liskov Substitution Principle (LSP)", isCorrect: true, feedback: "Correct! The Square violates the behavior expected of a generic Rectangle." },
            { id: "opt_2", text: "Single Responsibility", isCorrect: false, feedback: "Incorrect." },
            { id: "opt_3", text: "Dependency Inversion", isCorrect: false, feedback: "Incorrect." },
            { id: "opt_4", text: "Interface Segregation", isCorrect: false, feedback: "Incorrect." },
          ],
        },
      },
    },
  ],

  cse3_cn: [
    {
      id: "lesson_cn_osi_tcpip",
      conceptId: "osi_7_layer_model",
      title: "OSI 7 Layers vs TCP/IP Architecture",
      conceptName: "OSI 7-Layer Reference Model",
      duration: "6 min",
      order: 1,
      miloIntro: "Let's demystify how your browser's HTTP request journeys down through operating system packets, network frames, and physical electrical pulses!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "The 7 Layers & Protocol Data Units (PDUs)",
          content: [
            "Layer 7 (Application): HTTP, DNS, SMTP — human-computer interaction.",
            "Layer 6 (Presentation): TLS encryption, ASCII, JSON formatting.",
            "Layer 5 (Session): Authentication & session persistence (RPC).",
            "Layer 4 (Transport): TCP/UDP — Port numbers, end-to-end reliability, segment PDU.",
            "Layer 3 (Network): IPv4/IPv6 — Logical IP addressing, routers, packet PDU.",
            "Layer 2 (Data Link): Ethernet, MAC addresses, switches, framing, CRC, frame PDU.",
            "Layer 1 (Physical): Cables, fiber optics, radio waves, voltage bits (0s and 1s).",
          ],
          formula: "\\text{Data} \\xrightarrow{\\text{L4}} [\\text{TCP} | \\text{Data}] \\xrightarrow{\\text{L3}} [\\text{IP} | \\text{TCP} | \\text{Data}] \\xrightarrow{\\text{L2}} [\\text{MAC} | \\text{IP} | \\text{TCP} | \\text{Data} | \\text{CRC}]",
          formulaLabels: [
            { symbol: "Encapsulation", label: "Each layer prepends its own header and hands it down" },
            { symbol: "Decapsulation", label: "Receiving host strips headers as data climbs up the stack" },
          ],
        },
      ],
      interactiveCheck: {
        question: "At which layer of the OSI model does an Ethernet Switch primarily operate to forward frames using hardware MAC addresses?",
        options: [
          { id: "A", text: "Layer 2 (Data Link Layer)", isCorrect: true, feedback: "Spot on! Traditional Layer-2 switches inspect source and destination MAC addresses in frame headers to build forwarding MAC tables." },
          { id: "B", text: "Layer 3 (Network Layer)", isCorrect: false, feedback: "Routers operate at Layer 3 using IP addresses, not switches using MAC." },
          { id: "C", text: "Layer 4 (Transport Layer)", isCorrect: false, feedback: "Layer 4 manages port numbers and TCP connections." },
          { id: "D", text: "Layer 1 (Physical Layer)", isCorrect: false, feedback: "Hubs operate at Layer 1 by blindly repeating electrical signals." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "The International Postal Mail Analogy",
          analogyContent: "Layer 7 is the letter you write. Layer 6 is translating it to French. Layer 5 is keeping correspondence order. Layer 4 is choosing Express Certified Delivery with tracking number (TCP). Layer 3 is writing the Street, City, and Country on the envelope (IP Address). Layer 2 is the postal van driving to the distribution hub (Local MAC route). Layer 1 is the asphalt road under the wheels!",
        },
        anotherExample: {
          title: "Port vs IP Address",
          problem: "Why are both an IP address AND a Port number required to deliver a message?",
          solution: "The IP address delivers the packet to the correct computer in the world (like an apartment building address). The Port number delivers the segment to the specific application running inside that computer, like Chrome tab or Spotify (like the apartment room number).",
        },
        hint: "Mnemonic from bottom to top: Please Do Not Throw Sausage Pizza Away (Physical, Data Link, Network, Transport, Session, Presentation, Application).",
        similarQuestion: {
          question: "Which Protocol Data Unit (PDU) corresponds specifically to Layer 3 (Network Layer)?",
          options: [
            { id: "opt_1", text: "Packet", isCorrect: true, feedback: "Correct! Layer 3 PDU is a Packet (Layer 2 is Frame, Layer 4 is Segment)." },
            { id: "opt_2", text: "Frame", isCorrect: false, feedback: "Frame is Layer 2." },
            { id: "opt_3", text: "Segment", isCorrect: false, feedback: "Segment is Layer 4." },
            { id: "opt_4", text: "Bit", isCorrect: false, feedback: "Bit is Layer 1." },
          ],
        },
      },
    },
    {
      id: "lesson_cn_routing_cidr",
      conceptId: "ipv4_subnetting_cidr",
      title: "IPv4 Subnetting & CIDR Notation",
      conceptName: "Classless Inter-Domain Routing (CIDR)",
      duration: "7 min",
      order: 2,
      miloIntro: "Let's master binary subnet masks, network IDs, and host calculation with foolproof shortcuts!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "Anatomy of an IPv4 Subnet",
          content: [
            "An IPv4 address consists of 32 bits divided into 4 octets (e.g. 192.168.1.50).",
            "CIDR notation `/N` indicates that the first N bits represent the Network ID, leaving (32 - N) bits for Host addresses.",
            "Total IP addresses in `/N` subnet = 2^(32 - N). Usable host addresses = 2^(32 - N) - 2 (subtracting Network ID where all host bits are 0, and Broadcast ID where all host bits are 1).",
          ],
          formula: "\\text{Usable Hosts} = 2^{(32 - N)} - 2",
          formulaLabels: [
            { symbol: "/24", label: "256 total IPs, 254 usable hosts (Mask: 255.255.255.0)" },
            { symbol: "/28", label: "16 total IPs, 14 usable hosts (Mask: 255.255.255.240)" },
          ],
        },
      ],
      interactiveCheck: {
        question: "For a subnet allocated with CIDR block `192.168.10.64/26`, how many USABLE host IP addresses can be assigned to devices on this subnet?",
        options: [
          { id: "A", text: "62 usable hosts", isCorrect: true, feedback: "Correct! Host bits = 32 - 26 = 6 bits. Total IPs = 2^6 = 64. Usable hosts = 64 - 2 = 62. Network ID is .64 and Broadcast is .127." },
          { id: "B", text: "64 usable hosts", isCorrect: false, feedback: "You forgot to subtract Network ID (.64) and Broadcast ID (.127)." },
          { id: "C", text: "30 usable hosts", isCorrect: false, feedback: "That would be a /27 subnet (32 - 27 = 5 bits)." },
          { id: "D", text: "126 usable hosts", isCorrect: false, feedback: "That would be a /25 subnet." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "Area Codes and Phone Extensions",
          analogyContent: "The Network portion of an IP is like a city area code (+1-415). It gets your call to San Francisco. The Host portion is the local 7-digit number that rings your specific desk phone.",
        },
        anotherExample: {
          title: "Finding Subnet Mask for /27",
          problem: "What is the dotted-decimal subnet mask for /27?",
          solution: "27 bits = 8 + 8 + 8 + 3 bits. First three octets = 255.255.255. Fourth octet has 3 leading ones: 128 + 64 + 32 = 224. Subnet Mask = 255.255.255.224.",
        },
        hint: "Always calculate host bits h = 32 - N, then usable hosts = 2^h - 2.",
        similarQuestion: {
          question: "What is the broadcast address for `10.0.0.0/30`?",
          options: [
            { id: "opt_1", text: "10.0.0.3", isCorrect: true, feedback: "Correct! /30 has 4 IPs: .0 (Network), .1 and .2 (Usable), .3 (Broadcast)." },
            { id: "opt_2", text: "10.0.0.4", isCorrect: false, feedback: "Incorrect." },
            { id: "opt_3", text: "10.0.0.255", isCorrect: false, feedback: "That would be for /24." },
            { id: "opt_4", text: "10.0.0.1", isCorrect: false, feedback: "That is the first usable host." },
          ],
        },
      },
    },
  ],

  cse3_dbms: [
    {
      id: "lesson_dbms_normalization",
      conceptId: "dbms_normalization_bcnf",
      title: "Database Normalization (1NF to BCNF)",
      conceptName: "Database Normalization & Functional Dependencies",
      duration: "7 min",
      order: 1,
      miloIntro: "Let's explore why database normalization is essential to eradicate insertion, deletion, and update anomalies!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "The Normal Forms Progression",
          content: [
            "1NF (First Normal Form): Every column contains strictly atomic (single-valued) attributes. No repeating groups or comma-separated lists.",
            "2NF: Relation is in 1NF AND no non-prime attribute is partially dependent on any proper subset of a candidate key.",
            "3NF: Relation is in 2NF AND no non-prime attribute is transitively dependent on a candidate key (For X → Y, either X is a superkey OR Y is a prime attribute).",
            "BCNF (Boyce-Codd): Strictly requires that for EVERY non-trivial functional dependency X → Y, X MUST be a superkey.",
          ],
          formula: "1\\text{NF} \\subset 2\\text{NF} \\subset 3\\text{NF} \\subset \\text{BCNF} \\subset 4\\text{NF}",
          formulaLabels: [
            { symbol: "Prime Attribute", label: "An attribute that forms part of ANY candidate key" },
            { symbol: "BCNF", label: "Eliminates all redundancy based on functional dependencies" },
          ],
        },
      ],
      interactiveCheck: {
        question: "Consider relation R(A, B, C, D) with candidate key (A, B) and functional dependency C → D. If C is not a candidate key and D is not a prime attribute, what is the HIGHEST normal form R satisfies?",
        options: [
          { id: "A", text: "Second Normal Form (2NF)", isCorrect: true, feedback: "Spot on! Both A and B are prime. C and D are non-prime. Since C → D is a dependency between two non-prime attributes, it is a TRANSITIVE dependency (A,B → C and C → D). Transitive dependencies violate 3NF, but because C is not a proper subset of candidate key (A, B), it does NOT violate 2NF!" },
          { id: "B", text: "Third Normal Form (3NF)", isCorrect: false, feedback: "C → D violates 3NF because C is neither a superkey nor is D prime." },
          { id: "C", text: "First Normal Form (1NF) only", isCorrect: false, feedback: "There is no partial dependency on A or B alone, so it satisfies 2NF." },
          { id: "D", text: "BCNF", isCorrect: false, feedback: "BCNF is much stricter." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "The Address Book Spreadsheet",
          analogyContent: "Imagine an Excel sheet where every time an employee buys a product, you type their full home address, manager name, and department budget. If they move homes, you must update 50 rows (Update Anomaly). If you delete their only purchase, you accidentally delete their home address too (Delete Anomaly). Normalization splits this into an Employees table and an Orders table linked by EmployeeID.",
        },
        anotherExample: {
          title: "Testing for 3NF",
          problem: "Given R(EmpID, DeptID, DeptName) with key EmpID and FDs: EmpID → DeptID, DeptID → DeptName. Why is this not in 3NF?",
          solution: "DeptID is not a superkey, and DeptName is not prime. Therefore DeptID → DeptName is a transitive dependency that violates 3NF. Splitting into R1(EmpID, DeptID) and R2(DeptID, DeptName) solves it.",
        },
        hint: "For 3NF: In X → Y, X must be a superkey OR Y must be prime. In BCNF: X MUST be a superkey.",
        similarQuestion: {
          question: "Can a table in 3NF violate BCNF?",
          options: [
            { id: "opt_1", text: "Yes, when overlapping candidate keys exist and a functional dependency has a prime attribute on the right-hand side", isCorrect: true, feedback: "Correct! If X is not a superkey, but Y is prime, 3NF allows it, but BCNF strictly forbids it." },
            { id: "opt_2", text: "No, 3NF and BCNF are identical", isCorrect: false, feedback: "BCNF is strictly stronger." },
            { id: "opt_3", text: "Only in NoSQL databases", isCorrect: false, feedback: "Irrelevant." },
            { id: "opt_4", text: "No, BCNF is weaker than 3NF", isCorrect: false, feedback: "BCNF is stronger." },
          ],
        },
      },
    },
  ],

  cse3_os: [
    {
      id: "lesson_os_process_scheduling",
      conceptId: "os_process_scheduling_cpu",
      title: "Process Lifecycle & CPU Scheduling",
      conceptName: "Process Management & CPU Scheduling",
      duration: "6 min",
      order: 1,
      miloIntro: "Let's explore how the operating system kernel coordinates processes, handles context switches, and schedules CPU execution!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "The Process Lifecycle & PCB",
          content: [
            "A Process is a program in execution containing Text (code), Data (globals), Heap (dynamically allocated memory), and Stack (local variables and call frames).",
            "State transitions: New → Ready (in ready queue) → Running (dispatched to CPU) → Waiting (blocked on I/O or event) → Terminated.",
            "The Process Control Block (PCB) maintains process state, PID, Program Counter, CPU registers, memory limits, and open file descriptors.",
          ],
          formula: "\\text{Turnaround Time} = \\text{Completion Time} - \\text{Arrival Time} \\quad | \\quad \\text{Waiting Time} = \\text{Turnaround Time} - \\text{Burst Time}",
          formulaLabels: [
            { symbol: "Context Switch", label: "Saving state of running process into PCB and restoring state of newly scheduled process" },
            { symbol: "Preemptive", label: "OS kernel can interrupt a running process (e.g. Round Robin, SRTF)" },
          ],
        },
      ],
      interactiveCheck: {
        question: "In CPU scheduling, which algorithm is mathematically proven to produce the MINIMUM average waiting time for a given set of processes?",
        options: [
          { id: "A", text: "Shortest Job First (SJF / SRTF)", isCorrect: true, feedback: "Correct! Shortest Job First (and its preemptive version Shortest Remaining Time First) is provably optimal because scheduling short bursts earlier drastically lowers the cumulative wait time for all subsequent processes." },
          { id: "B", text: "First-Come First-Served (FCFS)", isCorrect: false, feedback: "FCFS suffers from the Convoy Effect where short processes get trapped behind long ones." },
          { id: "C", text: "Round Robin with large quantum", isCorrect: false, feedback: "Round Robin balances fairness, but does not minimize average waiting time." },
          { id: "D", text: "Priority Scheduling without aging", isCorrect: false, feedback: "Priority scheduling risks indefinite starvation." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "Supermarket Express Checkout Lane",
          analogyContent: "If a person with 1 carton of milk gets stuck behind 3 shoppers with 100 groceries each (FCFS), their wait time is 45 minutes! If the cashier serves the 1-item person first (Shortest Job First), they leave in 30 seconds, dropping the average wait time across all shoppers significantly.",
        },
        anotherExample: {
          title: "Calculating Round Robin Turnaround",
          problem: "Two processes P1 (burst 4) and P2 (burst 2) arrive at time 0. Time quantum = 2. Find completion times.",
          solution: "Time 0-2: P1 runs (remaining 2). Time 2-4: P2 runs (burst 2, finishes at 4!). Time 4-6: P1 runs and finishes at 6. P2 turnaround = 4, P1 turnaround = 6.",
        },
        hint: "Waiting Time = Turnaround Time minus Burst Time.",
        similarQuestion: {
          question: "What serious issue can occur in Shortest Job First scheduling if a continuous stream of short processes keeps arriving?",
          options: [
            { id: "opt_1", text: "Starvation (Indefinite blocking) of long processes", isCorrect: true, feedback: "Correct! Long processes will never be dispatched. This is solved using 'Aging'." },
            { id: "opt_2", text: "Deadlock", isCorrect: false, feedback: "Scheduling starvation is distinct from circular deadlock." },
            { id: "opt_3", text: "Thrashing", isCorrect: false, feedback: "Thrashing is a virtual memory paging issue." },
            { id: "opt_4", text: "Convoy effect", isCorrect: false, feedback: "Convoy effect occurs in FCFS, not SJF." },
          ],
        },
      },
    },
  ],

  cse3_daa: [
    {
      id: "lesson_daa_dynamic_programming",
      conceptId: "dynamic_programming_knapsack",
      title: "Dynamic Programming vs Greedy Strategy",
      conceptName: "Dynamic Programming Foundations",
      duration: "7 min",
      order: 1,
      miloIntro: "Let's uncover the deep mechanics of Dynamic Programming: how remembering past subproblems turns exponential O(2^N) brute-force into lightning fast O(N·W) polynomial algorithms!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "When to use Dynamic Programming",
          content: [
            "Dynamic Programming (DP) applies when a problem exhibits two critical properties: (1) Optimal Substructure (optimal solution to the problem contains optimal solutions to subproblems), and (2) Overlapping Subproblems (the same subproblems are computed repeatedly).",
            "Top-Down (Memoization): Solve recursively and store results in a hash table or array cache.",
            "Bottom-Up (Tabulation): Solve base cases first and fill an iterative lookup table sequentially.",
            "Why Greedy Fails in 0/1 Knapsack: In 0/1 Knapsack, you cannot take fractions of an item. A greedy choice based on value/weight ratio can leave empty knapsack capacity that could have been filled with higher total value.",
          ],
          formula: "dp[i][w] = \\max\\big(dp[i-1][w], \\; \\text{val}[i] + dp[i-1][w - \\text{wt}[i]]\\big)",
          formulaLabels: [
            { symbol: "dp[i][w]", label: "Maximum value achievable using a subset of first i items with weight capacity w" },
            { symbol: "O(N · W)", label: "Pseudo-polynomial time complexity based on item count N and weight capacity W" },
          ],
        },
      ],
      interactiveCheck: {
        question: "In the 0/1 Knapsack problem with knapsack capacity W = 5, and items: (Weight: 2, Value: 3), (Weight: 3, Value: 4), (Weight: 4, Value: 5), what is the maximum value that can be achieved?",
        options: [
          { id: "A", text: "Value = 7 (Items with weight 2 and 3)", isCorrect: true, feedback: "Correct! Items 1 (wt 2, val 3) and 2 (wt 3, val 4) sum to weight 5 and yield value 3 + 4 = 7. Choosing item 3 (wt 4, val 5) yields only 5 because no other item fits in the remaining capacity of 1." },
          { id: "B", text: "Value = 5", isCorrect: false, feedback: "Selecting only item 3 wastes available capacity." },
          { id: "C", text: "Value = 8", isCorrect: false, feedback: "Total weight would exceed capacity 5." },
          { id: "D", text: "Value = 6", isCorrect: false, feedback: "Incorrect calculation." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "Writing on a Scratchpad",
          analogyContent: "Imagine someone asks you: 'What is 1 + 1 + 1 + 1 + 1?'. You count and say '5'. Then they write another '+ 1' on the right and ask: 'What is it now?'. You instantly say '6' because you remembered the previous 5 without recalculating from scratch! That is what Dynamic Programming does.",
        },
        anotherExample: {
          title: "Fibonacci Complexity Reduction",
          problem: "How does DP transform naive Fibonacci recursion?",
          solution: "Naive recursion computes F(N-1) + F(N-2), repeating calculations in O(2^N) time. Memoizing previously computed values reduces the runtime to strictly O(N) linear time and O(N) space.",
        },
        hint: "Check both options at each item: either exclude it (dp[i-1][w]), or include it (val[i] + dp[i-1][w-wt[i]]). Take the maximum.",
        similarQuestion: {
          question: "Can Fractional Knapsack be solved optimally using a Greedy algorithm?",
          options: [
            { id: "opt_1", text: "Yes, by sorting items by Value/Weight ratio in descending order", isCorrect: true, feedback: "Spot on! Fractional knapsack allows taking continuous fractions, so greedy value-density sorting is provably optimal." },
            { id: "opt_2", text: "No, it requires DP", isCorrect: false, feedback: "Only 0/1 knapsack requires DP." },
            { id: "opt_3", text: "Only if all weights are equal", isCorrect: false, feedback: "Greedy works for all positive weights." },
            { id: "opt_4", text: "Only with negative weights", isCorrect: false, feedback: "Incorrect." },
          ],
        },
      },
    },
  ],

  cse1_pps: [
    {
      id: "lesson_c_pointers_memory",
      conceptId: "c_pointers_memory_allocation",
      title: "Pointers & Dynamic Memory Allocation in C",
      conceptName: "C Pointers & Memory Management",
      duration: "6 min",
      order: 1,
      miloIntro: "Let's demystify memory addresses, pointer dereferencing, and dynamic heap allocation in C!",
      cards: [
        {
          id: "card_1",
          type: "concept",
          heading: "Pointers, Addresses & Heap Memory",
          content: [
            "Every variable resides at a physical memory address in RAM accessed via the address-of operator `&var`.",
            "A pointer `int *ptr = &var;` stores this memory address. Dereferencing `*ptr` accesses or modifies the value stored at that address.",
            "`malloc(size)` allocates contiguous bytes on the Heap and returns a `void*` pointer. `calloc(n, size)` allocates and zero-initializes. Always call `free(ptr)` to prevent memory leaks!",
          ],
          formula: "\\text{int } *p = (\\text{int}*) \\text{malloc}(N \\times \\text{sizeof}(\\text{int})); \\quad \\text{free}(p);",
          formulaLabels: [
            { symbol: "malloc()", label: "Heap allocation, uninitialized garbage memory" },
            { symbol: "free()", label: "Releases heap memory back to OS to prevent memory exhaustion" },
          ],
        },
      ],
      interactiveCheck: {
        question: "What is the danger of using a pointer after calling `free(ptr)` on it without setting `ptr = NULL`?",
        options: [
          { id: "A", text: "It becomes a Dangling Pointer, leading to undefined behavior or security vulnerabilities", isCorrect: true, feedback: "Spot on! A dangling pointer still points to freed memory that may be reallocated for something else. Dereferencing it causes memory corruption or security exploits (Use-After-Free)." },
          { id: "B", text: "It causes an immediate compile-time syntax error", isCorrect: false, feedback: "The compiler cannot detect dangling pointer dereferences at compile time." },
          { id: "C", text: "The memory is automatically reallocated", isCorrect: false, feedback: "Memory is never automatically reallocated." },
          { id: "D", text: "The variable is promoted to static", isCorrect: false, feedback: "Incorrect." },
        ],
      },
      tutorExtensions: {
        simplify: {
          analogyTitle: "The Locker Number Note",
          analogyContent: "A variable is the gym locker holding your shoes. The memory address is the locker number (e.g. Locker #245). A pointer is a small sticky note in your pocket with '245' written on it. Dereferencing (*ptr) means using that sticky note to unlock Locker #245 and pick up your shoes!",
        },
        anotherExample: {
          title: "Pointer Arithmetic",
          problem: "If an integer pointer `int *p = 1000` on a 64-bit machine where `sizeof(int) = 4`, what is the value of `p + 2`?",
          solution: "Pointer arithmetic scales by data type size: `p + 2 = 1000 + 2 × sizeof(int) = 1000 + 8 = 1008`.",
        },
        hint: "& gives the address (where is it?), * gives the value (what is inside?).",
        similarQuestion: {
          question: "What does `sizeof(char*)` return on a 64-bit operating system?",
          options: [
            { id: "opt_1", text: "8 bytes", isCorrect: true, feedback: "Correct! On a 64-bit system, ALL pointer variables (char*, int*, double*) take 8 bytes to hold a 64-bit memory address." },
            { id: "opt_2", text: "1 byte", isCorrect: false, feedback: "char is 1 byte, but a pointer to char is an address requiring 8 bytes." },
            { id: "opt_3", text: "4 bytes", isCorrect: false, feedback: "4 bytes is on 32-bit systems." },
            { id: "opt_4", text: "16 bytes", isCorrect: false, feedback: "Too large." },
          ],
        },
      },
    },
  ],
};

// Universal Dynamic Lesson Generator for any topic across the entire curriculum
export function getOrGenerateLesson(lessonId, requestedTopic = null) {
  // 1. Search existing static lessons across all collections
  for (const key of Object.keys(LESSONS_DATA)) {
    const list = LESSONS_DATA[key];
    if (Array.isArray(list)) {
      const found = list.find((l) => l.id === lessonId);
      if (found) return found;
    }
  }

  // 2. Synthesize comprehensive dynamic lesson for any topic
  const cleanTitle = (requestedTopic?.name || lessonId.replace(/^lesson_/, "").replace(/_/g, " "))
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const concepts = requestedTopic?.concepts || [
    "Core conceptual principles and mathematical / architectural foundations",
    "Step-by-step problem solving walkthrough and common traps",
    "Practical real-world industry application and exam benchmarks"
  ];
  const firstConcept = concepts[0] || `the core principles of ${cleanTitle}`;

  return {
    id: lessonId,
    conceptId: requestedTopic?.id || lessonId,
    title: cleanTitle,
    conceptName: cleanTitle,
    duration: requestedTopic?.duration || "15 min",
    order: 1,
    miloIntro: `Welcome! Let's learn ${cleanTitle}. Focus on the key ideas, then I’ll quiz you on this topic.`,
    cards: [
      {
        id: "card_1",
        type: "concept",
        heading: `Foundations of ${cleanTitle}`,
        content: [
          `${cleanTitle} is an important part of your course. Start by understanding the terms and assumptions used in this topic.`,
          `Key idea: ${firstConcept}`,
          `Also learn: ${concepts[1] || "How to apply the idea to a worked example and check the result."}`,
        ],
        formula: null,
      },
      {
        id: "card_2",
        type: "worked_example",
        heading: `Worked Example: Analyzing ${cleanTitle}`,
        problem: `Apply the principles of ${cleanTitle} to evaluate a standard benchmark problem and identify the optimal resolution.`,
        steps: [
          { step: "Step 1: Identify Knowns and Constraints", detail: "List all given quantities, boundary constraints, and target unknowns." },
          { step: "Step 2: Apply Governing Theorem", detail: `Formulate the equations and state transitions specific to ${cleanTitle}.` },
          { step: "Step 3: Solve and Verify Invariants", detail: "Substitute values, perform dimensional/complexity checks, and verify edge cases." },
          { step: "Key Takeaway", detail: "Always verify boundary conditions to avoid common sign or indexing errors." },
        ],
      },
    ],
    interactiveCheck: {
      question: `Which idea should you remember when studying ${cleanTitle}?`,
      options: [
        { id: "A", text: firstConcept, isCorrect: true, feedback: `Correct. ${firstConcept}` },
        { id: "B", text: "Ignore the assumptions and constraints in the question.", isCorrect: false, feedback: `Revisit the key idea: ${firstConcept}` },
        { id: "C", text: "Choose a memorized answer without checking the reasoning.", isCorrect: false, feedback: `Reasoning matters. Start from: ${firstConcept}` },
        { id: "D", text: "Treat every problem as unrelated to the concepts in this lesson.", isCorrect: false, feedback: `Connect the problem to: ${firstConcept}` },
      ],
    },
    tutorExtensions: {
      simplify: {
        analogyTitle: `Intuitive Real-World Analogy for ${cleanTitle}`,
        analogyContent: `Think of ${cleanTitle} like a well-regulated transit system: every component has a designated lane, clear traffic signals, and checks to prevent collisions or bottlenecks. When each part follows its rule, the entire system flows smoothly.`,
      },
      anotherExample: {
        title: `Alternative Problem Setup: ${cleanTitle}`,
        problem: `Consider an edge case where input conditions fluctuate by 20%. How do the governing equations respond?`,
        solution: `By analyzing sensitivity and partial derivatives, we observe that the response is proportional and stable within standard tolerance bounds.`,
      },
      hint: `Recall the core definitions of ${cleanTitle} and look for invariants that remain constant throughout the process.`,
      similarQuestion: {
        question: `What is the primary benefit of mastering ${cleanTitle}?`,
        options: [
          { id: "opt_1", text: "Building robust conceptual intuition to solve complex multi-step problems rapidly", isCorrect: true, feedback: "Correct! Deep intuition enables quick problem-solving without memorization." },
          { id: "opt_2", text: "Eliminating the need to understand subsequent units", isCorrect: false, feedback: "Units build upon each other sequentially." },
          { id: "opt_3", text: "Avoiding all practical testing", isCorrect: false, feedback: "Incorrect." },
          { id: "opt_4", text: "None of the above", isCorrect: false, feedback: "Incorrect." },
        ],
      },
    },
  };
}

