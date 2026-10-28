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
            { id: "calculus_integrals", name: "Calculus & Integrals", recommended: true },
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

  // Granular concept trees for specific subjects
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

    electrochemistry: [
      {
        id: "galvanic_cells_potential",
        name: "Galvanic Cells & Standard Reduction Potentials",
        description: "Anode (oxidation), cathode (reduction), salt bridge, and cell EMF E°_cell = E°_cathode - E°_anode",
        level: "Foundational",
        weight: 1,
      },
      {
        id: "nernst_equation",
        name: "Nernst Equation & Equilibrium Constant",
        description: "Dependence of cell potential on concentration and temperature: E = E° - (0.0591/n) log Q",
        level: "Intermediate",
        weight: 2,
      },
      {
        id: "kohlrausch_conductivity",
        name: "Kohlrausch's Law of Independent Migration",
        description: "Molar conductivity at infinite dilution and degree of dissociation for weak electrolytes",
        level: "Intermediate",
        weight: 2,
      },
      {
        id: "faraday_electrolysis",
        name: "Faraday's Laws of Electrolysis",
        description: "Mass deposited m = Z·I·t = (M·I·t)/(n·F) where F = 96,485 C/mol",
        level: "Advanced",
        weight: 3,
      },
    ],

    electrostatics: [
      {
        id: "coulombs_law_fields",
        name: "Coulomb's Law & Principle of Superposition",
        description: "Electrostatic force F = k|q1 q2|/r² in vector form and electric field due to point charges",
        level: "Foundational",
        weight: 1,
      },
      {
        id: "gauss_law_flux",
        name: "Electric Flux & Gauss's Law Applications",
        description: "Net electric flux through closed surface Φ = ∮ E · dA = q_enclosed / ε₀",
        level: "Intermediate",
        weight: 2,
      },
      {
        id: "capacitance_dielectrics",
        name: "Capacitance & Dielectric Slabs",
        description: "Parallel plate capacitor C = ε₀A/d and insertion of dielectric of constant K: C' = KC₀",
        level: "Advanced",
        weight: 3,
      },
    ],

    calculus_integrals: [
      {
        id: "fundamental_theorem_calculus",
        name: "Fundamental Theorem of Calculus & Standard Forms",
        description: "Antiderivatives, definite integrals as limits of Riemann sums, and standard integration rules",
        level: "Foundational",
        weight: 1,
      },
      {
        id: "integration_substitution",
        name: "Method of Substitution (u-substitution)",
        description: "Transforming integrals of form ∫ f(g(x)) g'(x) dx into ∫ f(u) du",
        level: "Intermediate",
        weight: 2,
      },
      {
        id: "integration_by_parts",
        name: "Integration by Parts (ILATE Rule)",
        description: "Formula ∫ u dv = u v - ∫ v du and selection priority Inverse, Log, Algebraic, Trig, Exponential",
        level: "Advanced",
        weight: 3,
      },
    ],

    binary_search_trees: [
      {
        id: "bst_properties_invariant",
        name: "BST Ordering Invariant & Searching",
        description: "Left subtree keys < Node key < Right subtree keys; O(h) search and insertion",
        level: "Foundational",
        weight: 1,
      },
      {
        id: "bst_traversals",
        name: "In-order, Pre-order & Post-order Traversals",
        description: "In-order traversal produces strictly ascending sorted keys in O(N) time",
        level: "Intermediate",
        weight: 2,
      },
      {
        id: "bst_deletion_balancing",
        name: "Node Deletion & In-order Successor",
        description: "Deleting nodes with 0, 1, or 2 children; replacing with in-order successor (min of right subtree)",
        level: "Advanced",
        weight: 3,
      },
    ],
  },

  // Diagnostic questions indexed by topic
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
    ],

    electrochemistry: [
      {
        id: "diag_ec_01",
        conceptId: "galvanic_cells_potential",
        conceptName: "Galvanic Cells & Standard Reduction Potentials",
        difficulty: 1,
        question: "Given standard reduction potentials E°(Zn²⁺/Zn) = -0.76 V and E°(Cu²⁺/Cu) = +0.34 V, what is the standard EMF of the Daniel Cell under standard conditions?",
        options: [
          { id: "A", text: "+1.10 V", isCorrect: true, feedback: "Correct! E°_cell = E°_cathode - E°_anode = +0.34 V - (-0.76 V) = +1.10 V. Zinc is oxidized at the anode, and Copper is reduced at the cathode." },
          { id: "B", text: "+0.42 V", isCorrect: false, feedback: "Incorrect. You subtracted 0.34 - 0.76 instead of taking minus of negative 0.76 V." },
          { id: "C", text: "-1.10 V", isCorrect: false, feedback: "Incorrect. A spontaneous galvanic cell must have a positive standard cell EMF." },
          { id: "D", text: "+0.55 V", isCorrect: false, feedback: "Incorrect arithmetic." },
        ],
        explanation: "In a galvanic cell, oxidation occurs at anode (lower reduction potential: Zn) and reduction at cathode (higher reduction potential: Cu). E°_cell = E°_cathode - E°_anode = 0.34 - (-0.76) = +1.10 V.",
        hint: "Cathode minus Anode: the more positive potential acts as the cathode.",
      },
      {
        id: "diag_ec_02",
        conceptId: "nernst_equation",
        conceptName: "Nernst Equation & Cell Potential",
        difficulty: 2,
        question: "According to the Nernst equation at 298 K, if the concentration of Zn²⁺ at the anode is increased by a factor of 10 while keeping Cu²⁺ constant, what happens to the cell potential E_cell?",
        options: [
          { id: "A", text: "Decreases by approximately 0.0295 V", isCorrect: true, feedback: "Spot on! E = E° - (0.0591/n) log ([Zn²⁺]/[Cu²⁺]). Since n = 2 for Zn-Cu, a 10-fold increase in product [Zn²⁺] increases log Q by 1, subtracting 0.0591/2 ≈ 0.0295 V." },
          { id: "B", text: "Increases by 0.0591 V", isCorrect: false, feedback: "Incorrect. Increasing anode product concentration opposes forward reaction, lowering cell voltage." },
          { id: "C", text: "Remains strictly constant", isCorrect: false, feedback: "Incorrect. Cell potential varies with ion concentration according to the Nernst equation." },
          { id: "D", text: "Decreases by 0.0591 V", isCorrect: false, feedback: "Don't forget that 2 electrons are transferred (n = 2) in Daniel cell." },
        ],
        explanation: "E = E° - (0.0591/2) log(Q). When [Zn²⁺] increases by 10, ΔE = -(0.0591/2) log(10) = -0.0295 V.",
        hint: "Does adding more reaction products make the battery produce more or less voltage?",
      },
      {
        id: "diag_ec_03",
        conceptId: "kohlrausch_conductivity",
        conceptName: "Kohlrausch's Law of Independent Migration",
        difficulty: 2,
        question: "Why does molar conductivity (Λ_m) of a weak electrolyte (like acetic acid, CH₃COOH) increase sharply on steep dilution, whereas a strong electrolyte (KCl) increases only marginally?",
        options: [
          { id: "A", text: "Dilution sharply increases the degree of dissociation (α) of the weak electrolyte", isCorrect: true, feedback: "Correct! By Ostwald's dilution law, for weak electrolytes, dilution drastically increases the fraction of molecules ionized into conducting ions." },
          { id: "B", text: "Dilution changes the molecular mass of the electrolyte", isCorrect: false, feedback: "Incorrect. Molar mass is a fixed physical constant." },
          { id: "C", text: "Strong electrolytes undergo covalent bonding on dilution", isCorrect: false, feedback: "Incorrect. Strong electrolytes are already 100% dissociated even at moderate concentrations." },
          { id: "D", text: "The temperature of the solution doubles on dilution", isCorrect: false, feedback: "Incorrect. Dilution is carried out isothermally." },
        ],
        explanation: "Strong electrolytes are already completely ionized (α ≈ 1), so dilution only reduces interionic friction. In weak electrolytes, dilution shifts dissociation equilibrium forward: α = √(K_a / c), causing a massive surge in free ions.",
        hint: "Recall Ostwald's Dilution Law: how does dissociation α behave when concentration c approaches 0?",
      },
    ],

    electrostatics: [
      {
        id: "diag_es_01",
        conceptId: "coulombs_law_fields",
        conceptName: "Coulomb's Law & Principle of Superposition",
        difficulty: 1,
        question: "Two identical point charges separated by distance r in vacuum exert an electrostatic force F on each other. If the distance between them is doubled (2r) and the medium is replaced with water (dielectric constant K = 80), what is the new force?",
        options: [
          { id: "A", text: "F / 320", isCorrect: true, feedback: "Outstanding! F' = F / (K · (r'/r)²) = F / (80 × 2²) = F / 320." },
          { id: "B", text: "F / 160", isCorrect: false, feedback: "Remember that distance is squared: (2)² = 4, so 80 × 4 = 320." },
          { id: "C", text: "4F / 80", isCorrect: false, feedback: "Increasing distance reduces force, not increases." },
          { id: "D", text: "F / 80", isCorrect: false, feedback: "You only accounted for the dielectric constant, ignoring distance doubling." },
        ],
        explanation: "By Coulomb's Law: F = (1 / 4πε₀K) · (q₁q₂ / r²). When distance doubles, factor is 1/4. Dielectric water reduces it by factor 1/80. Total factor = 1/(80 × 4) = 1/320.",
        hint: "Force is inversely proportional to both dielectric constant K and distance squared r².",
      },
      {
        id: "diag_es_02",
        conceptId: "gauss_law_flux",
        conceptName: "Electric Flux & Gauss's Law Applications",
        difficulty: 2,
        question: "A closed cubical Gaussian surface of edge length a encloses an electric dipole consisting of charges +q and -q separated by distance d. What is the net electric flux passing through the cube?",
        options: [
          { id: "A", text: "Zero", isCorrect: true, feedback: "Correct! By Gauss's Law, Φ_net = q_enclosed / ε₀. For an electric dipole, q_net = (+q) + (-q) = 0, so total outgoing flux is exactly zero." },
          { id: "B", text: "2q / ε₀", isCorrect: false, feedback: "Charges have opposite signs and cancel algebraically inside the Gaussian surface." },
          { id: "C", text: "q / (6ε₀)", isCorrect: false, feedback: "That applies to a single monopole charge through one cube face, not a dipole." },
          { id: "D", text: "q · d / ε₀", isCorrect: false, feedback: "qd is dipole moment, but flux depends on total enclosed charge." },
        ],
        explanation: "Gauss's law states that total electric flux equals algebraic sum of enclosed charges divided by ε₀: Φ = Σ q_in / ε₀. Since (+q) + (-q) = 0, net flux is 0.",
        hint: "What is the net total charge of an electric dipole?",
      },
    ],

    calculus_integrals: [
      {
        id: "diag_int_01",
        conceptId: "fundamental_theorem_calculus",
        conceptName: "Fundamental Theorem of Calculus & Standard Forms",
        difficulty: 1,
        question: "Evaluate the definite integral ∫ from 0 to π/2 of cos(x) dx.",
        options: [
          { id: "A", text: "1", isCorrect: true, feedback: "Correct! The antiderivative of cos(x) is sin(x). Evaluating from 0 to π/2 gives sin(π/2) - sin(0) = 1 - 0 = 1." },
          { id: "B", text: "0", isCorrect: false, feedback: "sin(π/2) is 1, not 0." },
          { id: "C", text: "-1", isCorrect: false, feedback: "Derivative of cos is -sin, but integral of cos is +sin." },
          { id: "D", text: "π / 2", isCorrect: false, feedback: "Incorrect. Review standard trigonometric antiderivatives." },
        ],
        explanation: "∫ cos(x) dx = sin(x) + C. [sin(x)] from 0 to π/2 = sin(π/2) - sin(0) = 1 - 0 = 1.",
        hint: "Whose derivative is cos(x)?",
      },
      {
        id: "diag_int_02",
        conceptId: "integration_by_parts",
        conceptName: "Integration by Parts (ILATE Rule)",
        difficulty: 2,
        question: "When integrating ∫ x · e^(2x) dx using integration by parts (∫ u dv = u v - ∫ v du), what is the best choice for u according to the ILATE rule?",
        options: [
          { id: "A", text: "u = x (Algebraic before Exponential)", isCorrect: true, feedback: "Spot on! In ILATE (Inverse, Log, Algebraic, Trig, Exponential), Algebraic x precedes Exponential e^(2x). Differentiating u gives du = dx, which simplifies the remaining integral." },
          { id: "B", text: "u = e^(2x)", isCorrect: false, feedback: "Choosing u = e^(2x) would force integrating x to x²/2, making the power higher instead of simpler." },
          { id: "C", text: "u = 2x", isCorrect: false, feedback: "2x is inside the exponent, not a factor of the product." },
          { id: "D", text: "u = 1", isCorrect: false, feedback: "Incorrect." },
        ],
        explanation: "ILATE priority: Algebraic (A: x) comes before Exponential (E: e^(2x)). Set u = x ⇒ du = dx, and dv = e^(2x)dx ⇒ v = e^(2x)/2. Result = (x/2)e^(2x) - (1/4)e^(2x) + C.",
        hint: "Choose u so that differentiating it reduces its degree.",
      },
    ],

    binary_search_trees: [
      {
        id: "diag_bst_01",
        conceptId: "bst_properties_invariant",
        conceptName: "BST Ordering Invariant & Searching",
        difficulty: 1,
        question: "In a valid Binary Search Tree (BST) containing unique integer keys, where is the minimum element always located?",
        options: [
          { id: "A", text: "The leftmost node in the tree", isCorrect: true, feedback: "Correct! By the BST invariant, left child keys are always smaller than the parent. Repeatedly following left child pointers until reaching a node with no left child leads directly to the minimum key." },
          { id: "B", text: "The root node", isCorrect: false, feedback: "The root is between its left and right subtrees, not the minimum." },
          { id: "C", text: "The rightmost leaf", isCorrect: false, feedback: "The rightmost node contains the maximum key." },
          { id: "D", text: "Any leaf node at random", isCorrect: false, feedback: "BSTs are strictly ordered, so min location is deterministic." },
        ],
        explanation: "BST property: for every node X, all keys in left subtree are < key(X). Therefore, traveling left from the root until left is null guarantees finding the absolute minimum in O(height) time.",
        hint: "If left children are always smaller, keep walking left!",
      },
    ],
  },
};
