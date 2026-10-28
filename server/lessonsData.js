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
};
