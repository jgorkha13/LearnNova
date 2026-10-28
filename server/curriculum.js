// Curriculum and Diagnostic Question Bank for LearnNova

export const CURRICULUM_DATA = {
  learnerCategories: [
    {
      id: "school",
      label: "School Student",
      description: "Classes 9–12 preparing for board exams & conceptual foundation",
      icon: "graduation-cap",
    },
    {
      id: "college",
      label: "College Student",
      description: "Undergraduate engineering, sciences, and foundational courses",
      icon: "building-2",
    },
    {
      id: "entrance",
      label: "Entrance Exam Aspirant",
      description: "JEE Main/Advanced, NEET, CUET, and national competitive exams",
      icon: "target",
    },
  ],

  academicOptions: {
    school: {
      grades: ["Class 9", "Class 10", "Class 11", "Class 12"],
      boards: ["CBSE", "ICSE / ISC", "State Board", "Cambridge / IB"],
      subjects: {
        "Class 12": ["Physics", "Chemistry", "Mathematics", "Biology"],
        "Class 11": ["Physics", "Chemistry", "Mathematics", "Biology"],
        "Class 10": ["Science", "Mathematics", "Social Science"],
        "Class 9": ["Science", "Mathematics", "Social Science"],
      },
      chapters: {
        "Class 12": {
          Physics: [
            { id: "current_electricity", name: "Current Electricity", recommended: true },
            { id: "electrostatics", name: "Electric Charges & Fields", recommended: false },
            { id: "magnetism", name: "Moving Charges & Magnetism", recommended: false },
            { id: "optics", name: "Ray Optics & Optical Instruments", recommended: false },
          ],
          Chemistry: [
            { id: "electrochemistry", name: "Electrochemistry", recommended: true },
            { id: "chemical_kinetics", name: "Chemical Kinetics", recommended: false },
            { id: "solutions", name: "Solutions", recommended: false },
          ],
          Mathematics: [
            { id: "calculus_integrals", name: "Integrals", recommended: true },
            { id: "matrices", name: "Matrices & Determinants", recommended: false },
          ],
        },
      },
    },
    college: {
      degrees: ["B.Tech / B.E.", "B.Sc", "BCA / MCA", "B.Com"],
      years: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      branches: ["Computer Science & Engineering", "Electronics & Comm.", "Mechanical Engg.", "Basic Sciences"],
      subjects: {
        "Computer Science & Engineering": ["Data Structures & Algorithms", "Digital Logic Design", "Operating Systems"],
        "Electronics & Comm.": ["Network Analysis & Circuit Theory", "Analog Electronics", "Signals & Systems"],
      },
      chapters: {
        "Data Structures & Algorithms": [
          { id: "binary_search_trees", name: "Binary Search Trees", recommended: true },
          { id: "graph_algorithms", name: "Graph Traversal & Shortest Paths", recommended: false },
          { id: "dynamic_programming", name: "Dynamic Programming Fundamentals", recommended: false },
        ],
        "Network Analysis & Circuit Theory": [
          { id: "current_electricity", name: "DC Circuit Laws & Thevenin's Theorem", recommended: true },
        ],
      },
    },
    entrance: {
      exams: [
        { id: "jee_main", name: "JEE Main", subjects: ["Physics", "Chemistry", "Mathematics"] },
        { id: "jee_adv", name: "JEE Advanced", subjects: ["Physics", "Chemistry", "Mathematics"] },
        { id: "neet", name: "NEET (UG)", subjects: ["Physics", "Chemistry", "Biology"] },
        { id: "cuet", name: "CUET (UG)", subjects: ["Physics", "Chemistry", "Mathematics", "General Test"] },
      ],
      targetYears: ["2026", "2027", "2028"],
      stages: ["Foundational (Concept Building)", "Revision & Practice", "Final Lap (Mocks & Weakness Fixing)"],
      chapters: {
        Physics: [
          { id: "current_electricity", name: "Current Electricity (JEE/NEET Level)", recommended: true },
          { id: "electrostatics", name: "Electrostatics & Capacitors", recommended: false },
          { id: "rotational_motion", name: "Rotational Dynamics", recommended: false },
        ],
      },
    },
  },

  // Granular concept tree for Current Electricity
  concepts: {
    current_electricity: [
      {
        id: "electric_current_drift",
        name: "Electric Current & Drift Velocity",
        description: "Charge flow, current density J = I/A, and relation I = n e A v_d",
        level: "Foundational",
        weight: 1,
      },
      {
        id: "ohms_law_resistance",
        name: "Ohm's Law & Resistivity Factors",
        description: "V = IR, microscopic Ohm's law J = σE, and R = ρL/A dependence on geometry and material",
        level: "Foundational",
        weight: 1,
      },
      {
        id: "temp_dependence_resistance",
        name: "Temperature Coefficient of Resistance",
        description: "Variation of resistance with temperature: R(T) = R_0(1 + αΔT) for metals, alloys, and semiconductors",
        level: "Intermediate",
        weight: 2,
      },
      {
        id: "resistor_combinations",
        name: "Series & Parallel Resistor Networks",
        description: "Equivalent resistance calculations and current/voltage divider formulas",
        level: "Intermediate",
        weight: 2,
      },
      {
        id: "emf_internal_resistance",
        name: "EMF, Terminal Voltage & Internal Resistance",
        description: "Relationship V = E - Ir during discharge and V = E + Ir during charging of a cell",
        level: "Intermediate",
        weight: 2,
      },
      {
        id: "kirchhoff_laws",
        name: "Kirchhoff's Junction & Loop Rules",
        description: "Conservation of charge (KCL: ΣI = 0) and conservation of energy (KVL: ΣΔV = 0)",
        level: "Advanced",
        weight: 3,
      },
      {
        id: "wheatstone_bridge",
        name: "Wheatstone Bridge Principle",
        description: "Balanced bridge condition P/Q = R/S and null deflection in galvanometer",
        level: "Advanced",
        weight: 3,
      },
      {
        id: "electric_power_energy",
        name: "Electrical Energy, Power & Maximum Power Transfer",
        description: "Joule's heating law H = I²Rt, P = VI, and condition R_load = r for maximum power",
        level: "Advanced",
        weight: 3,
      },
    ],
  },

  // Diagnostic questions for Class 12 CBSE / JEE Current Electricity
  diagnosticQuestions: {
    current_electricity: [
      {
        id: "diag_ce_01",
        conceptId: "electric_current_drift",
        conceptName: "Electric Current & Drift Velocity",
        difficulty: 1,
        question: "A steady current flows through a metallic conductor of non-uniform cross-section. Which of the following quantities remains constant along the conductor?",
        options: [
          { id: "A", text: "Electric current only", isCorrect: true, feedback: "Correct! By conservation of charge, the rate of charge entering any section must equal the rate leaving it, so current I remains constant regardless of cross-section." },
          { id: "B", text: "Current density only", isCorrect: false, feedback: "Incorrect. Current density J = I/A. Since area A varies, J also changes inversely with area." },
          { id: "C", text: "Drift velocity only", isCorrect: false, feedback: "Incorrect. Drift speed v_d = I / (n e A). As the wire narrows, electrons must drift faster to carry the same current." },
          { id: "D", text: "Both electric field and current density", isCorrect: false, feedback: "Incorrect. Since J = σE, both current density and electric field increase where the wire becomes thinner." },
        ],
        explanation: "Electric current is a scalar defined as the rate of flow of charge: I = dq/dt. By the continuity equation (conservation of charge), the total charge flowing per second through any cross-section is identical. However, J = I/A and v_d = I/(neA) vary inversely with cross-sectional area A.",
        hint: "Think about conservation of charge: can electric charges accumulate inside the wire in a steady state?",
      },
      {
        id: "diag_ce_02",
        conceptId: "ohms_law_resistance",
        conceptName: "Ohm's Law & Resistivity Factors",
        difficulty: 1,
        question: "A cylindrical copper wire of length L and resistance R is stretched uniformly until its length becomes 2L. If the density and volume remain unchanged, what is its new resistance?",
        options: [
          { id: "A", text: "2R", isCorrect: false, feedback: "Misconception alert! Stretching a wire increases length while simultaneously reducing its cross-sectional area. You only accounted for length." },
          { id: "B", text: "4R", isCorrect: true, feedback: "Brilliant! Volume V = A × L is constant. When length doubles (L' = 2L), area halves (A' = A/2). Since R = ρL/A, R' = ρ(2L)/(A/2) = 4R." },
          { id: "C", text: "R / 2", isCorrect: false, feedback: "Incorrect. Stretching a wire makes it longer and thinner, both of which increase resistance." },
          { id: "D", text: "R (unchanged because resistivity is constant)", isCorrect: false, feedback: "Incorrect. While resistivity ρ is a material property that stays constant, geometric resistance R = ρL/A depends directly on dimensions." },
        ],
        explanation: "Resistance is given by R = ρL/A. When wire is stretched uniformly without adding mass, volume V = A · L remains constant, so A = V/L. Substituting gives R = ρ(L²)/V. Thus, R ∝ L². Doubling length multiplies resistance by 2² = 4.",
        hint: "When you pull dough into a longer string, what happens to its thickness?",
      },
      {
        id: "diag_ce_03",
        conceptId: "temp_dependence_resistance",
        conceptName: "Temperature Coefficient of Resistance",
        difficulty: 2,
        question: "As temperature increases, how does the electrical resistivity of a typical pure semiconductor (e.g., Silicon) behave compared to a metallic conductor (e.g., Copper)?",
        options: [
          { id: "A", text: "Semiconductor resistivity decreases exponentially, while metal resistivity increases approximately linearly", isCorrect: true, feedback: "Spot on! In metals, increased lattice vibrations increase electron scattering (reducing relaxation time τ). In semiconductors, thermal excitation creates free electron-hole pairs so charge carrier density n surges exponentially, overpowering scattering." },
          { id: "B", text: "Both semiconductor and metal resistivity increase at the same rate", isCorrect: false, feedback: "Incorrect. Pure semiconductors have a negative temperature coefficient of resistance (α < 0), whereas metals have α > 0." },
          { id: "C", text: "Semiconductor resistivity increases, while metal resistivity decreases", isCorrect: false, feedback: "Incorrect. This is the exact opposite of observed physics. Metals conduct worse at high temperatures." },
          { id: "D", text: "Both resistivities decrease because electrons gain thermal kinetic energy", isCorrect: false, feedback: "Incorrect. In metals, higher thermal agitation causes frequent collisions, impeding net drift." },
        ],
        explanation: "Resistivity is ρ = m / (n e² τ). In metals, free carrier density n is virtually constant, so as T increases, lattice vibrations increase, relaxation time τ decreases, and ρ rises. In semiconductors, carrier density n increases exponentially with T: n(T) ∝ exp(-E_g / 2k_BT), causing ρ to drop sharply.",
        hint: "Recall whether heating a semiconductor liberates covalent bond electrons into the conduction band.",
      },
      {
        id: "diag_ce_04",
        conceptId: "resistor_combinations",
        conceptName: "Series & Parallel Resistor Networks",
        difficulty: 2,
        question: "Three identical resistors, each of resistance R = 12 Ω, are connected in parallel. This combination is then connected in series with a 4 Ω resistor across a 24 V ideal battery. What current is drawn from the battery?",
        options: [
          { id: "A", text: "1.5 A", isCorrect: false, feedback: "Incorrect. Check your parallel calculation: 1/R_p = 1/12 + 1/12 + 1/12 = 3/12, so R_p = 4 Ω." },
          { id: "B", text: "3.0 A", isCorrect: true, feedback: "Excellent! The three 12 Ω resistors in parallel have equivalent resistance 12/3 = 4 Ω. In series with the 4 Ω resistor, total resistance R_total = 4 + 4 = 8 Ω. By Ohm's law: I = V / R_total = 24 V / 8 Ω = 3.0 A." },
          { id: "C", text: "6.0 A", isCorrect: false, feedback: "Incorrect. Did you forget to add the 4 Ω series resistor to the equivalent parallel resistance?" },
          { id: "D", text: "0.67 A", isCorrect: false, feedback: "Incorrect. If all four resistors were in series, R would be 40 Ω giving 0.6 A, but three are in parallel." },
        ],
        explanation: "Step 1: Calculate equivalent of parallel group: R_p = 12 Ω / 3 = 4 Ω. Step 2: Total circuit resistance: R_total = R_p + R_series = 4 Ω + 4 Ω = 8 Ω. Step 3: Current from battery: I = V / R_total = 24 V / 8 Ω = 3 A.",
        hint: "For N identical resistors in parallel, R_p = R / N.",
      },
      {
        id: "diag_ce_05",
        conceptId: "emf_internal_resistance",
        conceptName: "EMF, Terminal Voltage & Internal Resistance",
        difficulty: 2,
        question: "A battery has an electromotive force (EMF) of E = 10 V and an internal resistance of r = 1 Ω. When connected to an external load resistor of R = 4 Ω, what is the terminal potential difference across the battery terminals?",
        options: [
          { id: "A", text: "10 V", isCorrect: false, feedback: "Incorrect. 10 V is the open-circuit EMF. Once current flows, potential is dropped across the internal resistance." },
          { id: "B", text: "8 V", isCorrect: true, feedback: "Perfect! Current I = E / (R + r) = 10 / (4 + 1) = 2 A. Terminal voltage V = E - Ir = 10 - (2 × 1) = 8 V (or V = I × R = 2 × 4 = 8 V)." },
          { id: "C", text: "2 V", isCorrect: false, feedback: "Incorrect. 2 V is the 'lost volts' (Ir = 2 A × 1 Ω = 2 V) dropped internally inside the electrolyte, not the terminal output." },
          { id: "D", text: "6 V", isCorrect: false, feedback: "Incorrect. Review the terminal voltage equation V = E - I·r." },
        ],
        explanation: "Terminal voltage is the potential difference between cell terminals during discharge: V = E - Ir. Total circuit current is I = E / (R + r) = 10 / 5 = 2 A. The internal voltage drop is Ir = 2 V, leaving terminal voltage V = 10 - 2 = 8 V.",
        hint: "Terminal voltage V equals the voltage that actually appears across external load R: V = I × R.",
      },
      {
        id: "diag_ce_06",
        conceptId: "kirchhoff_laws",
        conceptName: "Kirchhoff's Junction & Loop Rules",
        difficulty: 3,
        question: "Kirchhoff's first rule (Junction Rule, ΣI = 0) and second rule (Loop Rule, ΣΔV = 0) are direct consequences of which fundamental conservation laws, respectively?",
        options: [
          { id: "A", text: "Conservation of charge and Conservation of energy", isCorrect: true, feedback: "Mastery demonstrated! The Junction Rule states no charge can accumulate at a node (conservation of charge). The Loop Rule states that the net work done moving a test charge around any closed loop in an electrostatic conservative field must be zero (conservation of energy)." },
          { id: "B", text: "Conservation of energy and Conservation of momentum", isCorrect: false, feedback: "Incorrect. Junction rule reflects charge conservation, not energy or momentum." },
          { id: "C", text: "Conservation of momentum and Conservation of charge", isCorrect: false, feedback: "Incorrect. Momentum conservation is not relevant to steady circuit current loops." },
          { id: "D", text: "Conservation of mass and Conservation of angular momentum", isCorrect: false, feedback: "Incorrect. Neither rule relies on mass or angular momentum." },
        ],
        explanation: "KCL (Kirchhoff's Current Law / Junction Rule): Total current in = total current out at a node, derived from the law of Conservation of Electric Charge. KVL (Kirchhoff's Voltage Law / Loop Rule): Around any closed path, the algebraic sum of potential changes is zero, derived from the law of Conservation of Energy in a conservative electric field.",
        hint: "What can never be created or destroyed at an electrical intersection, and what conservative property determines work around a closed loop?",
      },
      {
        id: "diag_ce_07",
        conceptId: "wheatstone_bridge",
        conceptName: "Wheatstone Bridge Principle",
        difficulty: 3,
        question: "In a Wheatstone bridge ABCD, four resistors P = 10 Ω, Q = 20 Ω, R = 15 Ω, and S are arranged in arms AB, BC, AD, and DC. A sensitive galvanometer is connected between B and D. What must be the value of S for the galvanometer to show null deflection?",
        options: [
          { id: "A", text: "30 Ω", isCorrect: true, feedback: "Outstanding! At balance, no current flows through galvanometer BD: P / Q = R / S. Therefore, S = (Q × R) / P = (20 × 15) / 10 = 30 Ω." },
          { id: "B", text: "7.5 Ω", isCorrect: false, feedback: "Incorrect. Check the ratio: P/Q = 10/20 = 1/2. For balance, R/S must also equal 1/2. If R = 15, S must be twice that." },
          { id: "C", text: "25 Ω", isCorrect: false, feedback: "Incorrect. That would give 15/25 = 0.6, which does not match 10/20 = 0.5." },
          { id: "D", text: "13.3 Ω", isCorrect: false, feedback: "Incorrect. You may have inverted the bridge formula." },
        ],
        explanation: "The condition for a balanced Wheatstone bridge is V_B = V_D, which means no current passes through the galvanometer arm. This occurs when P/Q = R/S. Solving for S: S = R · (Q/P) = 15 Ω × (20 Ω / 10 Ω) = 15 × 2 = 30 Ω.",
        hint: "The bridge is balanced when opposite products are equal: P · S = Q · R.",
      },
      {
        id: "diag_ce_08",
        conceptId: "electric_power_energy",
        conceptName: "Electrical Energy, Power & Maximum Power Transfer",
        difficulty: 3,
        question: "A power source with fixed EMF E and internal resistance r is connected to a variable external load resistance R. Under what condition is maximum electrical power delivered to the external load R?",
        options: [
          { id: "A", text: "When load resistance equals internal resistance (R = r)", isCorrect: true, feedback: "Superb! By the Maximum Power Transfer Theorem, power to the load P(R) = [E/(R+r)]² · R. Differentiating dP/dR and setting to 0 yields R = r, giving maximum power P_max = E² / (4r)." },
          { id: "B", text: "When load resistance approaches zero (R → 0)", isCorrect: false, feedback: "Incorrect. When R → 0 (short circuit), current is maximum, but voltage across load is 0, so power P = I²R = 0." },
          { id: "C", text: "When load resistance approaches infinity (R → ∞)", isCorrect: false, feedback: "Incorrect. When R → ∞ (open circuit), voltage across load is E, but current is 0, so power delivered is 0." },
          { id: "D", text: "When load resistance is twice internal resistance (R = 2r)", isCorrect: false, feedback: "Incorrect. R = r provides the exact balance between current and terminal voltage." },
        ],
        explanation: "Power delivered to load is P = I²R = [E / (R + r)]² R. To find the maximum, set dP/dR = 0: d/dR [ R / (R + r)² ] = [(R+r)² - 2R(R+r)] / (R+r)⁴ = 0 ⇒ (R + r) - 2R = 0 ⇒ R = r. At this matching condition, maximum power transferred is P_max = E² / (4r).",
        hint: "Consider what happens to power at the two extremes: when R is tiny (short circuit) and when R is huge (open circuit). Where is the peak?",
      },
    ],
  },
};
