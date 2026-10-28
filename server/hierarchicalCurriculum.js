// Comprehensive Hierarchical Curriculum Tree for LearnNova
// Supporting Class 11th, B.Tech CSE 1st Year, B.Tech CSE 3rd Year, Class 12th & Entrance

export const DOMAINS = [
  {
    id: "class_11",
    name: "Class 11th",
    category: "Senior Secondary (School)",
    level: "School",
    badge: "Grade 11 CBSE / State",
    description: "Foundational science, mathematics, and computer science syllabus for senior secondary students.",
    icon: "GraduationCap",
  },
  {
    id: "cse_1st_year",
    name: "B.Tech CSE - 1st Year",
    category: "College Engineering",
    level: "College (Freshman)",
    badge: "1st & 2nd Semester",
    description: "Core foundational engineering courses: C programming, engineering calculus, basic electronics, and physics.",
    icon: "Code",
  },
  {
    id: "cse_3rd_year",
    name: "B.Tech CSE - 3rd Year",
    category: "Core Computer Science",
    level: "College (Junior)",
    badge: "5th & 6th Semester",
    description: "Industry-standard core subjects: Software Engineering, Computer Networks, DBMS, Operating Systems, and DAA.",
    icon: "Cpu",
  },
  {
    id: "class_12",
    name: "Class 12th",
    category: "Board Exam & Entrance",
    level: "School",
    badge: "Grade 12 CBSE / State",
    description: "Senior secondary graduation syllabus covering advanced mechanics, electrodynamics, organic chemistry, and calculus.",
    icon: "BookOpen",
  },
  {
    id: "entrance",
    name: "Entrance Exams (JEE / NEET)",
    category: "Competitive Entrance",
    level: "Aspirant",
    badge: "National Competitive Exams",
    description: "In-depth problem solving, rapid concept application, and shortcut techniques for JEE Main/Adv and NEET.",
    icon: "Target",
  },
];

export const HIERARCHICAL_CURRICULUM = {
  // ==========================================
  // 1. CLASS 11TH (ALL SUBJECTS + UNITS + TOPICS)
  // ==========================================
  class_11: {
    id: "class_11",
    title: "Class 11th Curriculum",
    subjects: [
      {
        id: "phys_11",
        name: "Physics (Class 11)",
        code: "PHY-11",
        color: "#4F46E5",
        bgTint: "#EEF2FF",
        icon: "Atom",
        description: "Mechanics, kinematics, laws of motion, gravitation, and thermodynamics.",
        units: [
          {
            id: "phys11_u1",
            unitNumber: 1,
            title: "Physical World & Measurements",
            description: "System of units, dimensions, and error analysis.",
            topics: [
              {
                id: "phys11_u1_t1",
                name: "Dimensional Analysis & Application",
                duration: "15m",
                difficulty: "Beginner",
                lessonId: "lesson_phys11_dimensions",
                concepts: ["Dimensions of physical quantities", "Principle of homogeneity", "Deriving formula using dimensions"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "20m", questionsSolved: "6/6", accuracy: "100%", lastActive: "Yesterday" }
              },
              {
                id: "phys11_u1_t2",
                name: "Significant Figures & Error Propagation",
                duration: "15m",
                difficulty: "Beginner",
                lessonId: "lesson_phys11_errors",
                concepts: ["Absolute, relative & percentage error", "Combination of errors (sum, product, powers)", "Rounding off rules"],
                trackReport: { status: "in_progress", percent: 60, mastery: "Learning", timeSpent: "10m", questionsSolved: "3/5", accuracy: "80%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "phys11_u2",
            unitNumber: 2,
            title: "Kinematics",
            description: "Motion in 1D and 2D, vectors, relative velocity, and projectiles.",
            topics: [
              {
                id: "phys11_u2_t1",
                name: "Uniformly Accelerated Motion & Equations",
                duration: "20m",
                difficulty: "Beginner",
                lessonId: "lesson_phys11_kinematics",
                concepts: ["Velocity-time graphs", "Equations of motion (v = u + at, s = ut + 1/2at²)", "Free fall under gravity"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "25m", questionsSolved: "8/8", accuracy: "95%", lastActive: "2 days ago" }
              },
              {
                id: "phys11_u2_t2",
                name: "Vectors & 2D Motion (Resolution & Dot/Cross)",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_phys11_vectors",
                concepts: ["Vector addition (Triangle & Parallelogram law)", "Scalar (Dot) and Vector (Cross) product", "Unit vectors & 3D components"],
                trackReport: { status: "in_progress", percent: 45, mastery: "Learning", timeSpent: "15m", questionsSolved: "4/7", accuracy: "75%", lastActive: "Today" }
              },
              {
                id: "phys11_u2_t3",
                name: "Projectile Motion & Trajectory Analysis",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_phys11_projectile",
                concepts: ["Time of flight T = 2u sinθ / g", "Maximum height H = u² sin²θ / 2g", "Horizontal range R = u² sin2θ / g", "Equation of trajectory"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          },
          {
            id: "phys11_u3",
            unitNumber: 3,
            title: "Laws of Motion & Friction",
            description: "Newton's laws, inertia, momentum, free body diagrams, and friction.",
            topics: [
              {
                id: "phys11_u3_t1",
                name: "Newton's Laws & Free-Body Diagrams (FBD)",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_phys11_newton_laws",
                concepts: ["Second Law F = dp/dt = ma", "Action-reaction pairs", "Tension in strings & pulley systems"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "30m", questionsSolved: "10/10", accuracy: "90%", lastActive: "3 days ago" }
              },
              {
                id: "phys11_u3_t2",
                name: "Static, Limiting & Kinetic Friction",
                duration: "20m",
                difficulty: "Intermediate",
                lessonId: "lesson_phys11_friction",
                concepts: ["Friction laws fs ≤ μs N", "Angle of repose & angle of friction", "Motion on inclined rough plane"],
                trackReport: { status: "in_progress", percent: 50, mastery: "Learning", timeSpent: "12m", questionsSolved: "3/6", accuracy: "70%", lastActive: "Yesterday" }
              },
              {
                id: "phys11_u3_t3",
                name: "Circular Motion Dynamics & Banking of Tracks",
                duration: "20m",
                difficulty: "Advanced",
                lessonId: "lesson_phys11_circular",
                concepts: ["Centripetal force Fc = mv²/r", "Optimum banking speed v = √(rg tanθ)", "Maximum safe velocity on banked road"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          },
          {
            id: "phys11_u4",
            unitNumber: 4,
            title: "Work, Energy & Power",
            description: "Kinetic & potential energy, work-energy theorem, and collisions.",
            topics: [
              {
                id: "phys11_u4_t1",
                name: "Work-Energy Theorem & Variable Forces",
                duration: "20m",
                difficulty: "Intermediate",
                lessonId: "lesson_phys11_work_energy",
                concepts: ["W = ∫ F · dx", "Work-energy theorem W_net = ΔK", "Conservative forces & potential energy U = -∫ F · dr"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              },
              {
                id: "phys11_u4_t2",
                name: "Elastic & Inelastic Collisions",
                duration: "25m",
                difficulty: "Advanced",
                lessonId: "lesson_phys11_collisions",
                concepts: ["Conservation of linear momentum", "Coefficient of restitution e", "Head-on elastic collision velocities"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          },
          {
            id: "phys11_u5",
            unitNumber: 5,
            title: "Thermodynamics & Kinetic Theory",
            description: "Heat, thermodynamic laws, PV indicator diagrams, and Carnot engine.",
            topics: [
              {
                id: "phys11_u5_t1",
                name: "First Law of Thermodynamics & Processes",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_phys11_first_law_thermo",
                concepts: ["dQ = dU + dW", "Isothermal (PV = C), Adiabatic (PV^γ = C), Isobaric, Isochoric", "Work done in expansion"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              },
              {
                id: "phys11_u5_t2",
                name: "Second Law & Carnot Engine Efficiency",
                duration: "20m",
                difficulty: "Intermediate",
                lessonId: "lesson_phys11_carnot",
                concepts: ["Efficiency η = 1 - T2/T1", "Carnot cycle 4 steps", "Clausius & Kelvin-Planck statements"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          }
        ]
      },
      {
        id: "chem_11",
        name: "Chemistry (Class 11)",
        code: "CHM-11",
        color: "#059669",
        bgTint: "#ECFDF5",
        icon: "FlaskConical",
        description: "Mole concept, atomic structure, periodic trends, chemical bonding, and organic basics.",
        units: [
          {
            id: "chem11_u1",
            unitNumber: 1,
            title: "Some Basic Concepts of Chemistry",
            description: "Mole concept, stoichiometry, and empirical formulas.",
            topics: [
              {
                id: "chem11_u1_t1",
                name: "Mole Concept & Stoichiometric Calculations",
                duration: "20m",
                difficulty: "Beginner",
                lessonId: "lesson_chem11_mole_concept",
                concepts: ["Avogadro's constant NA = 6.022 × 10²³", "Molar mass & molar volume at STP (22.4 L)", "Limiting reagent identification"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "25m", questionsSolved: "7/7", accuracy: "100%", lastActive: "3 days ago" }
              },
              {
                id: "chem11_u1_t2",
                name: "Empirical & Molecular Formula Determination",
                duration: "15m",
                difficulty: "Beginner",
                lessonId: "lesson_chem11_formulas",
                concepts: ["Percentage composition of elements", "Empirical formula mass ratio", "Molecular formula = n × Empirical formula"],
                trackReport: { status: "in_progress", percent: 50, mastery: "Learning", timeSpent: "10m", questionsSolved: "2/4", accuracy: "75%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "chem11_u2",
            unitNumber: 2,
            title: "Structure of Atom",
            description: "Quantum model, de Broglie, Heisenberg uncertainty, and orbitals.",
            topics: [
              {
                id: "chem11_u2_t1",
                name: "Bohr's Model & Hydrogen Line Spectrum",
                duration: "20m",
                difficulty: "Intermediate",
                lessonId: "lesson_chem11_bohr_spectrum",
                concepts: ["Postulates: quantized angular momentum L = nh/2π", "Rydberg equation 1/λ = R_H (1/n1² - 1/n2²)", "Lyman, Balmer, Paschen series"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "22m", questionsSolved: "5/5", accuracy: "90%", lastActive: "Yesterday" }
              },
              {
                id: "chem11_u2_t2",
                name: "Quantum Numbers & Electronic Configuration",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_chem11_quantum_numbers",
                concepts: ["n (principal), l (azimuthal), m (magnetic), s (spin)", "Aufbau principle (n+l rule)", "Pauli exclusion & Hund's rule of maximum multiplicity"],
                trackReport: { status: "in_progress", percent: 70, mastery: "Learning", timeSpent: "18m", questionsSolved: "6/8", accuracy: "85%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "chem11_u3",
            unitNumber: 3,
            title: "Chemical Bonding & Molecular Structure",
            description: "Lewis structures, VSEPR theory, hybridization, and MOT.",
            topics: [
              {
                id: "chem11_u3_t1",
                name: "VSEPR Theory & Molecular Geometry",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_chem11_vsepr",
                concepts: ["Bond pair vs lone pair repulsions", "Linear, Trigonal Planar, Tetrahedral, Bent geometries", "Dipole moments of symmetrical vs non-symmetrical molecules"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              },
              {
                id: "chem11_u3_t2",
                name: "Hybridization (sp, sp², sp³) & Shapes",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_chem11_hybridization",
                concepts: ["Mixing of atomic orbitals", "Steric number formula", "Sigma (σ) vs Pi (π) bonds in ethene and ethyne"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          },
          {
            id: "chem11_u4",
            unitNumber: 4,
            title: "Organic Chemistry - Basic Principles",
            description: "IUPAC nomenclature, electronic displacements, and reaction mechanisms.",
            topics: [
              {
                id: "chem11_u4_t1",
                name: "IUPAC Nomenclature & Functional Groups",
                duration: "30m",
                difficulty: "Beginner",
                lessonId: "lesson_chem11_iupac",
                concepts: ["Priority order of functional groups", "Root word, primary & secondary suffixes", "Substituted cycloalkanes and aromatics"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              },
              {
                id: "chem11_u4_t2",
                name: "Inductive, Resonance & Hyperconjugation Effects",
                duration: "30m",
                difficulty: "Intermediate",
                lessonId: "lesson_chem11_effects",
                concepts: ["+I and -I groups", "Resonance structures, delocalization, stability rules", "Carbocation, carbanion, and free radical stability"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          }
        ]
      },
      {
        id: "math_11",
        name: "Mathematics (Class 11)",
        code: "MTH-11",
        color: "#D97706",
        bgTint: "#FEF3C7",
        icon: "BookOpen",
        description: "Sets, relations, trigonometric identities, complex numbers, and limits.",
        units: [
          {
            id: "math11_u1",
            unitNumber: 1,
            title: "Sets, Relations & Functions",
            description: "Set operations, Cartesian product, domain, range, and injectivity.",
            topics: [
              {
                id: "math11_u1_t1",
                name: "Sets, Subsets & Venn Diagrams",
                duration: "15m",
                difficulty: "Beginner",
                lessonId: "lesson_math11_sets",
                concepts: ["Union, intersection, set difference", "De Morgan's laws", "Cardinality of finite sets"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "20m", questionsSolved: "6/6", accuracy: "100%", lastActive: "4 days ago" }
              },
              {
                id: "math11_u1_t2",
                name: "Domain, Range & Special Real Functions",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_math11_functions",
                concepts: ["Modulus |x|, Greatest Integer [x], Signum function", "Finding domain of radical and rational functions", "One-one (injective) and onto (surjective)"],
                trackReport: { status: "in_progress", percent: 40, mastery: "Learning", timeSpent: "14m", questionsSolved: "3/7", accuracy: "70%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "math11_u2",
            unitNumber: 2,
            title: "Trigonometric Functions",
            description: "Compound angle formulas, transformation identities, and graphs.",
            topics: [
              {
                id: "math11_u2_t1",
                name: "Compound Angles & Transformation Identities",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_math11_trig_identities",
                concepts: ["sin(A ± B), cos(A ± B), tan(A ± B)", "Double and triple angle formulas (sin2A, cos2A, tan2A)", "Sum to product formulas"],
                trackReport: { status: "in_progress", percent: 60, mastery: "Learning", timeSpent: "18m", questionsSolved: "5/8", accuracy: "80%", lastActive: "Yesterday" }
              }
            ]
          },
          {
            id: "math11_u3",
            unitNumber: 3,
            title: "Limits and Derivatives",
            description: "Intuitive limits, standard trigonometric limits, and first principles.",
            topics: [
              {
                id: "math11_u3_t1",
                name: "Limits of Functions & Standard Forms",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_math11_limits",
                concepts: ["Left hand vs Right hand limit", "lim x→0 (sin x / x) = 1", "Factorization, rationalization & L'Hôpital introduction"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              },
              {
                id: "math11_u3_t2",
                name: "First Principle of Derivatives & Quotient Rule",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_math11_derivatives",
                concepts: ["f'(x) = lim h→0 [f(x+h) - f(x)] / h", "Product rule (u·v)' = u'v + uv'", "Quotient rule (u/v)' = (u'v - uv') / v²"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          }
        ]
      },
      {
        id: "cs_11",
        name: "Computer Science - Python (Class 11)",
        code: "CS-11",
        color: "#2563EB",
        bgTint: "#EFF6FF",
        icon: "Binary",
        description: "Computational thinking, Python data structures, algorithms, and cyber ethics.",
        units: [
          {
            id: "cs11_u1",
            unitNumber: 1,
            title: "Python Programming Fundamentals",
            description: "Variables, expressions, branching, and iterative loops.",
            topics: [
              {
                id: "cs11_u1_t1",
                name: "Variables, Data Types & Operators",
                duration: "20m",
                difficulty: "Beginner",
                lessonId: "lesson_cs11_python_basics",
                concepts: ["Immutable vs Mutable types", "Arithmetic, Relational & Logical Operators", "Typecasting and dynamic typing"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "25m", questionsSolved: "8/8", accuracy: "100%", lastActive: "Today" }
              },
              {
                id: "cs11_u1_t2",
                name: "Conditionals & Loops (for, while, range)",
                duration: "25m",
                difficulty: "Beginner",
                lessonId: "lesson_cs11_loops",
                concepts: ["if-elif-else construct", "while loops with break, continue, else", "Nested loops for pattern printing"],
                trackReport: { status: "in_progress", percent: 75, mastery: "Learning", timeSpent: "20m", questionsSolved: "6/8", accuracy: "88%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "cs11_u2",
            unitNumber: 2,
            title: "Strings, Lists & Dictionaries",
            description: "Sequences, mutability, slicing, and key-value mapping.",
            topics: [
              {
                id: "cs11_u2_t1",
                name: "Strings & Slicing Operations",
                duration: "20m",
                difficulty: "Beginner",
                lessonId: "lesson_cs11_strings",
                concepts: ["Indexing & slicing [start:stop:step]", "String methods: split(), join(), strip(), find()", "Immutability in Python strings"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              },
              {
                id: "cs11_u2_t2",
                name: "Lists vs Tuples vs Dictionaries",
                duration: "30m",
                difficulty: "Intermediate",
                lessonId: "lesson_cs11_data_structures",
                concepts: ["List append, extend, insert, pop, sort", "Tuple packing/unpacking and hashing", "Dictionary lookup O(1), keys(), values(), items()"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // 2. B.TECH CSE - 1ST YEAR (ALL SUBJECTS + UNITS + TOPICS)
  // ==========================================
  cse_1st_year: {
    id: "cse_1st_year",
    title: "B.Tech CSE - 1st Year (Freshman Engineering)",
    subjects: [
      {
        id: "cse1_pps",
        name: "Programming for Problem Solving (C)",
        code: "CSE-101",
        color: "#2563EB",
        bgTint: "#EFF6FF",
        icon: "Code2",
        description: "Foundational programming in C: memory addresses, pointers, dynamic allocation, recursion, and file I/O.",
        units: [
          {
            id: "pps_u1",
            unitNumber: 1,
            title: "Algorithm Design & Compilation Pipeline",
            description: "Flowcharts, pseudocode, GCC compilation stages (preprocessor, compiler, assembler, linker).",
            topics: [
              {
                id: "pps_u1_t1",
                name: "Algorithm Design, Flowcharts & Pseudo-code",
                duration: "15m",
                difficulty: "Beginner",
                lessonId: "lesson_c_algorithms",
                concepts: ["Algorithm correctness & time/space intuition", "Standard flowchart symbols", "Dry-running step-by-step logic"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "18m", questionsSolved: "5/5", accuracy: "100%", lastActive: "Yesterday" }
              },
              {
                id: "pps_u1_t2",
                name: "C Compilation Stages & Memory Segments",
                duration: "20m",
                difficulty: "Intermediate",
                lessonId: "lesson_c_compilation",
                concepts: [".c -> .i (Preprocessor) -> .s (Assembly) -> .o (Object) -> a.out", "Code, Data, BSS, Heap, and Stack memory layout"],
                trackReport: { status: "in_progress", percent: 50, mastery: "Learning", timeSpent: "12m", questionsSolved: "3/5", accuracy: "80%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "pps_u2",
            unitNumber: 2,
            title: "C Syntax, Operators & Control Structures",
            description: "Primitive data types, bitwise operators, conditionals, and iteration loops.",
            topics: [
              {
                id: "pps_u2_t1",
                name: "Data Types, Storage Classes & Bitwise Operators",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_c_data_types",
                concepts: ["auto, register, static, extern scope and lifetime", "Bitwise &, |, ^, ~, <<, >> tricks (checking odd/even, power of 2)", "Integer overflow and two's complement"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "24m", questionsSolved: "7/7", accuracy: "92%", lastActive: "2 days ago" }
              },
              {
                id: "pps_u2_t2",
                name: "Loops, Branching & Loop Invariants",
                duration: "20m",
                difficulty: "Beginner",
                lessonId: "lesson_c_control_flow",
                concepts: ["while, for, do-while nuances", "switch-case jump tables and break fallthrough", "Loop invariant verification"],
                trackReport: { status: "in_progress", percent: 70, mastery: "Learning", timeSpent: "16m", questionsSolved: "5/6", accuracy: "85%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "pps_u3",
            unitNumber: 3,
            title: "Pointers & Dynamic Memory Allocation",
            description: "Pointer arithmetic, double pointers, heap management, malloc, and free.",
            topics: [
              {
                id: "pps_u3_t1",
                name: "Pointers, Memory Addresses & Dereferencing",
                duration: "30m",
                difficulty: "Intermediate",
                lessonId: "lesson_c_pointers_memory",
                concepts: ["Address-of (&) and dereference (*) operators", "Pointer arithmetic: ptr + 1 increments by sizeof(type)", "Pointers to arrays and array decaying"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "35m", questionsSolved: "9/9", accuracy: "96%", lastActive: "Today" }
              },
              {
                id: "pps_u3_t2",
                name: "Dynamic Memory: malloc, calloc, realloc & free",
                duration: "30m",
                difficulty: "Advanced",
                lessonId: "lesson_c_dynamic_allocation",
                concepts: ["Heap allocation vs Stack allocation", "malloc() vs calloc() zero-initialization", "Dangling pointers, memory leaks, and segmentation faults"],
                trackReport: { status: "in_progress", percent: 60, mastery: "Learning", timeSpent: "20m", questionsSolved: "4/7", accuracy: "75%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "pps_u4",
            unitNumber: 4,
            title: "Functions, Recursion & Structures",
            description: "Modular design, pass by value/reference, stack frames, and struct padding.",
            topics: [
              {
                id: "pps_u4_t1",
                name: "Pass by Value vs Reference & Call Stack Frames",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_c_functions",
                concepts: ["Simulating pass-by-reference with pointers", "Stack frame activation records", "Tail recursion optimization"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              },
              {
                id: "pps_u4_t2",
                name: "Structures, Unions & File I/O Operations",
                duration: "30m",
                difficulty: "Intermediate",
                lessonId: "lesson_c_structs_files",
                concepts: ["struct byte alignment and padding", "Union shared memory", "fopen(), fread(), fwrite(), fclose() stream handling"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          }
        ]
      },
      {
        id: "cse1_math1",
        name: "Engineering Mathematics - I",
        code: "MAT-101",
        color: "#D97706",
        bgTint: "#FEF3C7",
        icon: "BookOpen",
        description: "Differential calculus, Taylor series, partial derivatives, matrices, rank, and eigenvalues.",
        units: [
          {
            id: "math1_u1",
            unitNumber: 1,
            title: "Differential Calculus & Mean Value Theorems",
            description: "Rolle's Theorem, Lagrange's MVT, Cauchy's MVT, and Maclaurin expansions.",
            topics: [
              {
                id: "math1_u1_t1",
                name: "Mean Value Theorems (Rolle's & Lagrange)",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_math1_mvt",
                concepts: ["Geometric interpretation of tangents parallel to secants", "f'(c) = [f(b) - f(a)] / (b - a)", "Taylor's expansion with remainder"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "28m", questionsSolved: "7/7", accuracy: "94%", lastActive: "3 days ago" }
              }
            ]
          },
          {
            id: "math1_u2",
            unitNumber: 2,
            title: "Linear Algebra & Matrices",
            description: "Rank of matrix, echelon form, consistency of linear systems, eigenvalues.",
            topics: [
              {
                id: "math1_u2_t1",
                name: "Rank of Matrix & Echelon Form",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_math1_rank_matrix",
                concepts: ["Row elementary transformations", "Row reduced echelon form (RREF)", "Rank determination via non-zero rows"],
                trackReport: { status: "in_progress", percent: 75, mastery: "Learning", timeSpent: "22m", questionsSolved: "6/8", accuracy: "88%", lastActive: "Yesterday" }
              },
              {
                id: "math1_u2_t2",
                name: "Eigenvalues, Eigenvectors & Cayley-Hamilton",
                duration: "30m",
                difficulty: "Advanced",
                lessonId: "lesson_math1_matrices_eigen",
                concepts: ["Characteristic equation |A - λI| = 0", "Properties of eigenvalues: sum = Trace, product = Det", "Cayley-Hamilton theorem: every square matrix satisfies its own characteristic equation"],
                trackReport: { status: "in_progress", percent: 50, mastery: "Learning", timeSpent: "18m", questionsSolved: "4/7", accuracy: "80%", lastActive: "Today" }
              }
            ]
          }
        ]
      },
      {
        id: "cse1_beee",
        name: "Basic Electrical & Electronics Engg",
        code: "BEE-101",
        color: "#059669",
        bgTint: "#ECFDF5",
        icon: "Zap",
        description: "DC network theorems, AC circuits, transformers, and semiconductor diodes.",
        units: [
          {
            id: "beee_u1",
            unitNumber: 1,
            title: "DC Circuit Network Theorems",
            description: "KCL, KVL, Thevenin's, Norton's, and Maximum Power Transfer theorems.",
            topics: [
              {
                id: "beee_u1_t1",
                name: "Thevenin's & Norton's Equivalent Circuits",
                duration: "30m",
                difficulty: "Intermediate",
                lessonId: "lesson_beee_circuit_theorems",
                concepts: ["Thevenin voltage V_th (open circuit) & resistance R_th", "Norton current I_n (short circuit) & Norton resistance", "Source transformation between Thevenin and Norton"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "32m", questionsSolved: "8/8", accuracy: "90%", lastActive: "Yesterday" }
              },
              {
                id: "beee_u1_t2",
                name: "Maximum Power Transfer Theorem",
                duration: "20m",
                difficulty: "Intermediate",
                lessonId: "lesson_beee_mpt",
                concepts: ["Condition R_L = R_th for DC circuits", "Maximum power formula P_max = V_th² / 4R_th", "Efficiency at maximum power transfer = 50%"],
                trackReport: { status: "in_progress", percent: 50, mastery: "Learning", timeSpent: "14m", questionsSolved: "3/5", accuracy: "75%", lastActive: "Today" }
              }
            ]
          }
        ]
      },
      {
        id: "cse1_physics",
        name: "Engineering Physics (Semiconductors & Optics)",
        code: "PHY-101",
        color: "#4F46E5",
        bgTint: "#EEF2FF",
        icon: "Atom",
        description: "Band theory of solids, Hall effect, wave optics, and lasers.",
        units: [
          {
            id: "engphys_u1",
            unitNumber: 1,
            title: "Semiconductor Physics & Band Theory",
            description: "Energy bands, intrinsic vs extrinsic, Fermi level, and Hall effect.",
            topics: [
              {
                id: "engphys_u1_t1",
                name: "Fermi Level & Carrier Concentration",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_engphys_fermi",
                concepts: ["Fermi-Dirac distribution function", "Fermi level position in n-type vs p-type", "Temperature dependence of Fermi energy"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              },
              {
                id: "engphys_u1_t2",
                name: "Hall Effect & Mobility Determination",
                duration: "25m",
                difficulty: "Advanced",
                lessonId: "lesson_engphys_hall_effect",
                concepts: ["Lorentz force on moving charge carriers in magnetic field", "Hall voltage V_H and Hall coefficient R_H = 1/(n·q)", "Determining carrier type and carrier density"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          }
        ]
      },
      {
        id: "cse1_python",
        name: "Python for Engineers & Data Basics",
        code: "CSE-102",
        color: "#0284C7",
        bgTint: "#F0F9FF",
        icon: "Binary",
        description: "Python scripting, vectorized NumPy calculations, and Pandas tabular analysis.",
        units: [
          {
            id: "engpy_u1",
            unitNumber: 1,
            title: "Scientific Computing with NumPy & Pandas",
            description: "Arrays, multidimensional slicing, vectorization, and dataframes.",
            topics: [
              {
                id: "engpy_u1_t1",
                name: "NumPy Arrays, Slicing & Vectorized Operations",
                duration: "25m",
                difficulty: "Beginner",
                lessonId: "lesson_py_numpy_arrays",
                concepts: ["ndarray memory buffer vs Python lists", "Broadcasting rules across differing shapes", "Matrix dot products and linear algebra (np.linalg)"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "25m", questionsSolved: "6/6", accuracy: "100%", lastActive: "Today" }
              },
              {
                id: "engpy_u1_t2",
                name: "Pandas DataFrames: Filtering, Indexing & GroupBy",
                duration: "30m",
                difficulty: "Intermediate",
                lessonId: "lesson_py_pandas_dataframes",
                concepts: ["loc vs iloc indexing", "Boolean series masking", "Split-Apply-Combine groupby operations"],
                trackReport: { status: "in_progress", percent: 65, mastery: "Learning", timeSpent: "18m", questionsSolved: "4/6", accuracy: "85%", lastActive: "Today" }
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // 3. B.TECH CSE - 3RD YEAR (ALL SUBJECTS + UNITS + TOPICS)
  // [Software Engineering, Computer Networks, DBMS, OS, DAA]
  // ==========================================
  cse_3rd_year: {
    id: "cse_3rd_year",
    title: "B.Tech CSE - 3rd Year (Junior Core Curriculum)",
    subjects: [
      {
        id: "cse3_se",
        name: "Software Engineering",
        code: "CS-501",
        color: "#4F46E5",
        bgTint: "#EEF2FF",
        icon: "Layers",
        description: "Agile, SDLC process models, SRS requirement engineering, UML modeling, SOLID architecture, and automated QA testing.",
        units: [
          {
            id: "se_u1",
            unitNumber: 1,
            title: "Software Process Models & Agile Methodologies",
            description: "Waterfall, Spiral, V-Model, Agile Manifesto, Scrum sprints, user stories, and Kanban.",
            topics: [
              {
                id: "se_u1_t1",
                name: "Agile Manifesto, Principles & Scrum Framework",
                duration: "25m",
                difficulty: "Beginner",
                lessonId: "lesson_se_agile_scrum",
                concepts: ["Individuals & interactions over processes & tools", "Scrum ceremonies: Sprint Planning, Daily Standup, Review, Retrospective", "Product Backlog, Sprint Backlog & Burndown charts"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "30m", questionsSolved: "9/9", accuracy: "96%", lastActive: "Today" }
              },
              {
                id: "se_u1_t2",
                name: "Traditional SDLC Models: Waterfall vs Spiral",
                duration: "20m",
                difficulty: "Beginner",
                lessonId: "lesson_se_sdlc_models",
                concepts: ["Phase gate model in Waterfall & late testing risks", "Risk-driven Spiral model (Boehm) with 4 quadrants", "When to choose Plan-driven vs Iterative approaches"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "22m", questionsSolved: "6/6", accuracy: "90%", lastActive: "Yesterday" }
              },
              {
                id: "se_u1_t3",
                name: "Kanban, WIP Limits & Velocity Metrics",
                duration: "20m",
                difficulty: "Intermediate",
                lessonId: "lesson_se_kanban_velocity",
                concepts: ["Visualizing flow on Kanban boards", "Work-In-Progress (WIP) constraints to prevent bottlenecks", "Story points estimation & velocity tracking"],
                trackReport: { status: "in_progress", percent: 65, mastery: "Learning", timeSpent: "15m", questionsSolved: "4/6", accuracy: "80%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "se_u2",
            unitNumber: 2,
            title: "Requirement Engineering & UML Modeling",
            description: "Functional/non-functional requirements, IEEE 830 SRS standards, and UML structural/behavioral diagrams.",
            topics: [
              {
                id: "se_u2_t1",
                name: "Functional vs Non-Functional Requirements & SRS",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_se_srs_requirements",
                concepts: ["Functional behavior vs non-functional constraints (Performance, Security, Availability)", "IEEE 830 SRS document standards", "Requirement ambiguity, consistency & traceability matrix (RTM)"],
                trackReport: { status: "in_progress", percent: 50, mastery: "Learning", timeSpent: "14m", questionsSolved: "3/6", accuracy: "75%", lastActive: "Yesterday" }
              },
              {
                id: "se_u2_t2",
                name: "UML Class & Use Case Diagrams",
                duration: "30m",
                difficulty: "Intermediate",
                lessonId: "lesson_se_uml_class_usecase",
                concepts: ["Use cases, actors, <<include>> vs <<extend>> relationships", "Class diagrams: Association, Aggregation (hollow diamond), Composition (filled diamond)", "Multiplicity constraints (1..*, 0..1)"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              },
              {
                id: "se_u2_t3",
                name: "Sequence & Activity Behavioral Diagrams",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_se_sequence_activity",
                concepts: ["Lifelines, synchronous vs asynchronous messages", "Activity swimlanes, fork, join, and decision nodes", "Modeling end-to-end API workflows"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          },
          {
            id: "se_u3",
            unitNumber: 3,
            title: "Architecture & SOLID Design Patterns",
            description: "Microservices vs monoliths, MVC architecture, SOLID principles, and Gang of Four patterns.",
            topics: [
              {
                id: "se_u3_t1",
                name: "SOLID Principles for Robust Software Design",
                duration: "35m",
                difficulty: "Advanced",
                lessonId: "lesson_se_design_patterns",
                concepts: ["Single Responsibility Principle (SRP)", "Open/Closed Principle (OCP)", "Liskov Substitution Principle (LSP)", "Interface Segregation Principle (ISP)", "Dependency Inversion Principle (DIP)"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "40m", questionsSolved: "10/10", accuracy: "95%", lastActive: "Today" }
              },
              {
                id: "se_u3_t2",
                name: "Architectural Styles: Monoliths vs Microservices",
                duration: "30m",
                difficulty: "Intermediate",
                lessonId: "lesson_se_microservices",
                concepts: ["Single deployment artifact vs distributed autonomous services", "API Gateways, service discovery, database-per-service pattern", "Network latency, eventual consistency, and trade-offs"],
                trackReport: { status: "in_progress", percent: 55, mastery: "Learning", timeSpent: "16m", questionsSolved: "4/7", accuracy: "82%", lastActive: "Today" }
              },
              {
                id: "se_u3_t3",
                name: "Creational & Behavioral Design Patterns (GoF)",
                duration: "30m",
                difficulty: "Advanced",
                lessonId: "lesson_se_gof_patterns",
                concepts: ["Singleton pattern & thread safety", "Factory Method vs Abstract Factory", "Observer pattern for event-driven decoupled systems", "Strategy pattern for pluggable algorithms"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          },
          {
            id: "se_u4",
            unitNumber: 4,
            title: "Software Testing, QA & Verification",
            description: "Basis path testing, cyclomatic complexity, black-box testing, CI/CD automated pipelines.",
            topics: [
              {
                id: "se_u4_t1",
                name: "White-Box Testing & Cyclomatic Complexity",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_se_whitebox_testing",
                concepts: ["Control Flow Graph (CFG) construction", "McCabe's Cyclomatic Complexity V(G) = E - N + 2P", "Basis path testing and branch/statement coverage"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              },
              {
                id: "se_u4_t2",
                name: "Black-Box Testing: Equivalence & Boundary Values",
                duration: "20m",
                difficulty: "Beginner",
                lessonId: "lesson_se_blackbox_testing",
                concepts: ["Equivalence class partitioning (valid & invalid partitions)", "Boundary Value Analysis (BVA: min, min+, nom, max-, max)", "Robustness testing"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              },
              {
                id: "se_u4_t3",
                name: "CI/CD Pipelines & Automated Testing Pyramid",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_se_cicd_pyramid",
                concepts: ["Testing pyramid: Unit (70%), Integration (20%), E2E (10%)", "Continuous Integration triggers & automated regression suites", "Continuous Delivery vs Continuous Deployment to staging/production"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          },
          {
            id: "se_u5",
            unitNumber: 5,
            title: "Project Estimation & Maintenance",
            description: "COCOMO estimation models, function points, risk management, and refactoring technical debt.",
            topics: [
              {
                id: "se_u5_t1",
                name: "COCOMO Model & Function Point Analysis (FPA)",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_se_cocomo_fpa",
                concepts: ["Basic, Intermediate, and Detailed COCOMO equations", "Organic, Semidetached, and Embedded project modes", "Function point components: External Inputs, Outputs, Inquiries, Internal/External Files"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              },
              {
                id: "se_u5_t2",
                name: "Refactoring, Technical Debt & Maintenance Types",
                duration: "20m",
                difficulty: "Intermediate",
                lessonId: "lesson_se_maintenance",
                concepts: ["Corrective, Adaptive, Perfective, and Preventive maintenance", "Recognizing code smells (Long Method, God Class, Feature Envy)", "Managing interest on technical debt"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          }
        ]
      },
      {
        id: "cse3_cn",
        name: "Computer Networks",
        code: "CS-502",
        color: "#2563EB",
        bgTint: "#EFF6FF",
        icon: "Network",
        description: "OSI 7 layers, TCP/IP protocol suite, CRC error checking, sliding window, IPv4/IPv6, CIDR routing, TCP flow/congestion control, and TLS.",
        units: [
          {
            id: "cn_u1",
            unitNumber: 1,
            title: "Network Architecture & Physical Layer",
            description: "OSI vs TCP/IP models, layer encapsulation, network topologies, and bandwidth-delay product.",
            topics: [
              {
                id: "cn_u1_t1",
                name: "OSI 7-Layer Reference Model & Protocol Data Units",
                duration: "30m",
                difficulty: "Beginner",
                lessonId: "lesson_cn_osi_tcpip",
                concepts: ["Physical (bits), Data Link (frames), Network (packets), Transport (segments), Session, Presentation, Application (data)", "Encapsulation & Decapsulation with headers/trailers", "Peer-to-peer logical communication"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "35m", questionsSolved: "10/10", accuracy: "98%", lastActive: "Today" }
              },
              {
                id: "cn_u1_t2",
                name: "TCP/IP 4-Layer Suite & Transmission Media",
                duration: "25m",
                difficulty: "Beginner",
                lessonId: "lesson_cn_tcpip_media",
                concepts: ["Link, Internet, Transport, Application mapping to OSI", "Guided (Twisted Pair, Coaxial, Optical Fiber) vs Wireless", "Bandwidth-Delay Product (BDP) and pipe capacity"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "25m", questionsSolved: "7/7", accuracy: "93%", lastActive: "Yesterday" }
              }
            ]
          },
          {
            id: "cn_u2",
            unitNumber: 2,
            title: "Data Link Layer & MAC Protocols",
            description: "Framing, CRC error detection, sliding window protocols (GBN, SR), and CSMA/CD Ethernet.",
            topics: [
              {
                id: "cn_u2_t1",
                name: "Error Detection: Cyclic Redundancy Check (CRC)",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_cn_crc_error",
                concepts: ["Modulo-2 polynomial division using XOR", "Generator polynomial G(x) properties", "Appended remainder checksum verification"],
                trackReport: { status: "in_progress", percent: 65, mastery: "Learning", timeSpent: "18m", questionsSolved: "4/6", accuracy: "80%", lastActive: "Today" }
              },
              {
                id: "cn_u2_t2",
                name: "Sliding Window: Go-Back-N vs Selective Repeat",
                duration: "30m",
                difficulty: "Advanced",
                lessonId: "lesson_cn_sliding_window",
                concepts: ["Sender and Receiver window size limits (GBN: W_s = 2^k - 1, W_r = 1; SR: W_s = W_r = 2^(k-1))", "Cumulative vs Individual Acknowledgments", "Channel utilization efficiency η = N / (1 + 2a)"],
                trackReport: { status: "in_progress", percent: 40, mastery: "Learning", timeSpent: "14m", questionsSolved: "3/7", accuracy: "70%", lastActive: "Today" }
              },
              {
                id: "cn_u2_t3",
                name: "Multiple Access: CSMA/CD & Ethernet Collisions",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_cn_csmacd",
                concepts: ["Carrier Sense Multiple Access with Collision Detection", "Minimum frame size condition: T_fr ≥ 2 × T_prop", "Binary Exponential Backoff algorithm"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          },
          {
            id: "cn_u3",
            unitNumber: 3,
            title: "Network Layer & IP Routing",
            description: "IPv4/IPv6 addressing, subnetting, CIDR, Distance Vector, and OSPF link-state routing.",
            topics: [
              {
                id: "cn_u3_t1",
                name: "IPv4 Subnetting, CIDR Notation & Supernetting",
                duration: "35m",
                difficulty: "Intermediate",
                lessonId: "lesson_cn_routing_cidr",
                concepts: ["Classful addressing (Class A, B, C) vs Classless Inter-Domain Routing (CIDR /24, /28)", "Calculating Network ID, Broadcast ID, Usable Host Range", "Variable Length Subnet Masking (VLSM)"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "40m", questionsSolved: "12/12", accuracy: "100%", lastActive: "Yesterday" }
              },
              {
                id: "cn_u3_t2",
                name: "Routing Algorithms: Distance Vector vs Link State",
                duration: "30m",
                difficulty: "Advanced",
                lessonId: "lesson_cn_routing_algorithms",
                concepts: ["Bellman-Ford equation in Distance Vector & Count-to-Infinity problem", "Split horizon and poison reverse solutions", "Dijkstra's shortest path algorithm in OSPF Link-State Advertisements (LSA)"],
                trackReport: { status: "in_progress", percent: 50, mastery: "Learning", timeSpent: "16m", questionsSolved: "4/8", accuracy: "78%", lastActive: "Today" }
              },
              {
                id: "cn_u3_t3",
                name: "Network Protocols: ARP, DHCP & ICMP",
                duration: "20m",
                difficulty: "Beginner",
                lessonId: "lesson_cn_arp_dhcp",
                concepts: ["Address Resolution Protocol (ARP): IP-to-MAC resolution with broadcast request", "Dynamic Host Configuration Protocol (DHCP) DORA process: Discover, Offer, Request, Ack", "ICMP Ping & Traceroute TTL expiration"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          },
          {
            id: "cn_u4",
            unitNumber: 4,
            title: "Transport Layer Protocols (TCP & UDP)",
            description: "Sockets, TCP 3-way handshake, sliding window flow control, and Tahoe/Reno congestion control.",
            topics: [
              {
                id: "cn_u4_t1",
                name: "TCP 3-Way Handshake & Connection Teardown",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_cn_tcp_handshake",
                concepts: ["SYN, SYN-ACK, ACK sequence number synchronization", "TIME_WAIT state rationale (2MSL timer)", "TCP vs UDP header overhead comparison (20 bytes vs 8 bytes)"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "28m", questionsSolved: "8/8", accuracy: "94%", lastActive: "Today" }
              },
              {
                id: "cn_u4_t2",
                name: "TCP Congestion Control: Slow Start, AIMD, Tahoe vs Reno",
                duration: "35m",
                difficulty: "Advanced",
                lessonId: "lesson_cn_congestion_control",
                concepts: ["Congestion Window (cwnd) vs Receiver Window (rwnd)", "Slow Start exponential growth up to ssthresh threshold", "Additive Increase Multiplicative Decrease (AIMD)", "Tahoe (reset cwnd=1 on timeout/3dupACK) vs Reno (Fast Recovery on 3 dup ACKs)"],
                trackReport: { status: "in_progress", percent: 60, mastery: "Learning", timeSpent: "20m", questionsSolved: "5/8", accuracy: "82%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "cn_u5",
            unitNumber: 5,
            title: "Application Layer & Network Security",
            description: "DNS, HTTP/1.1 vs HTTP/2/3, TLS/SSL cryptographic handshake, and firewalls.",
            topics: [
              {
                id: "cn_u5_t1",
                name: "DNS Resolution & HTTP/1.1 vs HTTP/2 (Multiplexing)",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_cn_dns_http",
                concepts: ["Recursive vs Iterative DNS resolution", "HTTP/1.1 head-of-line blocking and keep-alive", "HTTP/2 binary framing & multiplexed streams over single TCP", "HTTP/3 over QUIC/UDP"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              },
              {
                id: "cn_u5_t2",
                name: "TLS/SSL Handshake & Public Key Cryptography",
                duration: "30m",
                difficulty: "Advanced",
                lessonId: "lesson_cn_tls_crypto",
                concepts: ["Diffie-Hellman ephemeral key exchange", "Symmetric encryption (AES) for data + Asymmetric (RSA) for session setup", "Digital Certificates and Certificate Authority (CA) chain of trust"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          }
        ]
      },
      {
        id: "cse3_dbms",
        name: "Database Management Systems (DBMS)",
        code: "CS-503",
        color: "#059669",
        bgTint: "#ECFDF5",
        icon: "Database",
        description: "Relational models, complex SQL, normalization (1NF-BCNF), ACID transactions, 2PL concurrency, and B+ Tree indexing.",
        units: [
          {
            id: "dbms_u1",
            unitNumber: 1,
            title: "Relational Data Model & ER Diagrams",
            description: "Entity sets, keys, cardinality constraints, and relational algebra operations.",
            topics: [
              {
                id: "dbms_u1_t1",
                name: "ER Modeling, Cardinality & Schema Mapping",
                duration: "25m",
                difficulty: "Beginner",
                lessonId: "lesson_dbms_er_modeling",
                concepts: ["Strong vs Weak entity sets", "1:1, 1:N, M:N relationship mapping to relational tables", "Foreign keys and referential integrity"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "30m", questionsSolved: "8/8", accuracy: "95%", lastActive: "3 days ago" }
              },
              {
                id: "dbms_u1_t2",
                name: "Relational Algebra: Select, Project, Join, Division",
                duration: "30m",
                difficulty: "Intermediate",
                lessonId: "lesson_dbms_relational_algebra",
                concepts: ["Selection (σ) and Projection (π) operators", "Natural join (⋈), Theta join, Outer joins", "Division operator (÷) for 'for all' queries"],
                trackReport: { status: "in_progress", percent: 70, mastery: "Learning", timeSpent: "20m", questionsSolved: "5/7", accuracy: "85%", lastActive: "Yesterday" }
              }
            ]
          },
          {
            id: "dbms_u2",
            unitNumber: 2,
            title: "SQL & Advanced Query Optimization",
            description: "DDL, DML, multi-table joins, correlated subqueries, window functions, and views.",
            topics: [
              {
                id: "dbms_u2_t1",
                name: "Complex Joins, Aggregation & HAVING Clauses",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_dbms_sql_joins",
                concepts: ["INNER JOIN vs LEFT/RIGHT/FULL OUTER JOIN", "GROUP BY with aggregate functions (COUNT, SUM, AVG)", "WHERE vs HAVING filtering conditions"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "25m", questionsSolved: "7/7", accuracy: "90%", lastActive: "Today" }
              },
              {
                id: "dbms_u2_t2",
                name: "Correlated Subqueries & Window Functions",
                duration: "30m",
                difficulty: "Advanced",
                lessonId: "lesson_dbms_subqueries_window",
                concepts: ["Correlated subquery row-by-row execution", "OVER (PARTITION BY ... ORDER BY ...)", "ROW_NUMBER(), RANK(), DENSE_RANK() difference"],
                trackReport: { status: "in_progress", percent: 50, mastery: "Learning", timeSpent: "15m", questionsSolved: "3/6", accuracy: "75%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "dbms_u3",
            unitNumber: 3,
            title: "Database Normalization (1NF to BCNF)",
            description: "Functional dependencies, Armstrong's axioms, 1NF, 2NF, 3NF, BCNF, and lossless joins.",
            topics: [
              {
                id: "dbms_u3_t1",
                name: "Functional Dependencies & Armstrong's Axioms",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_dbms_fd_axioms",
                concepts: ["Reflexivity, Augmentation, Transitivity axioms", "Attribute closure X+ calculation", "Candidate key identification algorithm"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "28m", questionsSolved: "8/8", accuracy: "96%", lastActive: "Yesterday" }
              },
              {
                id: "dbms_u3_t2",
                name: "1NF, 2NF, 3NF & Boyce-Codd Normal Form (BCNF)",
                duration: "35m",
                difficulty: "Advanced",
                lessonId: "lesson_dbms_normalization",
                concepts: ["1NF: Atomic values", "2NF: Elimination of partial dependency on prime attributes", "3NF: Elimination of transitive dependencies (X → Y, X is superkey or Y is prime)", "BCNF: For every X → Y, X must be a superkey", "Lossless-join decomposition vs Dependency preservation trade-offs"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "45m", questionsSolved: "12/12", accuracy: "100%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "dbms_u4",
            unitNumber: 4,
            title: "Transactions & Concurrency Control",
            description: "ACID properties, serializability, conflict graphs, 2PL, and deadlock handling.",
            topics: [
              {
                id: "dbms_u4_t1",
                name: "ACID Properties & Conflict Serializability",
                duration: "30m",
                difficulty: "Intermediate",
                lessonId: "lesson_dbms_acid_serializability",
                concepts: ["Atomicity, Consistency, Isolation, Durability", "Conflicting operations (read-write, write-write on same item)", "Precedence (Serialization) Graph cycle testing"],
                trackReport: { status: "in_progress", percent: 65, mastery: "Learning", timeSpent: "18m", questionsSolved: "5/7", accuracy: "84%", lastActive: "Today" }
              },
              {
                id: "dbms_u4_t2",
                name: "Two-Phase Locking (2PL) & Deadlock Handling",
                duration: "30m",
                difficulty: "Advanced",
                lessonId: "lesson_dbms_2pl_deadlocks",
                concepts: ["Growing phase (acquire locks) vs Shrinking phase (release locks)", "Strict 2PL prevents cascading rollbacks", "Wait-Die vs Wound-Wait timestamp deadlock prevention schemes"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          },
          {
            id: "dbms_u5",
            unitNumber: 5,
            title: "Storage Structures & Indexing",
            description: "B-Trees, B+ Trees, dense vs sparse index, and query evaluation plans.",
            topics: [
              {
                id: "dbms_u5_t1",
                name: "B-Trees & B+ Trees for Disk Indexing",
                duration: "30m",
                difficulty: "Advanced",
                lessonId: "lesson_dbms_b_plus_trees",
                concepts: ["Why disk I/O needs shallow broad search trees", "B+ Tree properties: all keys in leaf nodes + linked list sequence", "Insertion overflow splits & deletion underflow borrowing"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          }
        ]
      },
      {
        id: "cse3_os",
        name: "Operating Systems",
        code: "CS-504",
        color: "#D97706",
        bgTint: "#FEF3C7",
        icon: "Cpu",
        description: "Process management, CPU scheduling, semaphores/mutex, Banker's deadlock algorithm, virtual memory paging, and file systems.",
        units: [
          {
            id: "os_u1",
            unitNumber: 1,
            title: "OS Architecture & Process Management",
            description: "Dual-mode kernel execution, PCB, context switching, fork(), and inter-process communication.",
            topics: [
              {
                id: "os_u1_t1",
                name: "Process Lifecycle, PCB & Context Switching",
                duration: "25m",
                difficulty: "Beginner",
                lessonId: "lesson_os_process_scheduling",
                concepts: ["New, Ready, Running, Waiting, Terminated states", "Process Control Block (PCB) state storage", "Context switch overhead and register swapping"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "30m", questionsSolved: "8/8", accuracy: "95%", lastActive: "Today" }
              },
              {
                id: "os_u1_t2",
                name: "Process Creation: fork(), exec(), wait() & IPC",
                duration: "30m",
                difficulty: "Intermediate",
                lessonId: "lesson_os_fork_ipc",
                concepts: ["fork() return value (0 to child, child PID to parent)", "Zombie vs Orphan processes", "Pipes, Shared Memory, and Message Passing mechanisms"],
                trackReport: { status: "in_progress", percent: 60, mastery: "Learning", timeSpent: "16m", questionsSolved: "4/6", accuracy: "80%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "os_u2",
            unitNumber: 2,
            title: "CPU Scheduling & Synchronization",
            description: "Preemptive scheduling, Round Robin, critical section, mutex, and semaphores.",
            topics: [
              {
                id: "os_u2_t1",
                name: "CPU Scheduling: FCFS, SJF, SRTF & Round Robin",
                duration: "30m",
                difficulty: "Intermediate",
                lessonId: "lesson_os_cpu_scheduling",
                concepts: ["Turnaround Time (Completion - Arrival) & Waiting Time", "Convoy effect in FCFS", "Shortest Remaining Time First (SRTF) optimality", "Round Robin time quantum selection"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "32m", questionsSolved: "9/9", accuracy: "92%", lastActive: "Yesterday" }
              },
              {
                id: "os_u2_t2",
                name: "Synchronization: Race Conditions, Mutex & Semaphores",
                duration: "35m",
                difficulty: "Advanced",
                lessonId: "lesson_os_synchronization",
                concepts: ["Critical Section: Mutual Exclusion, Progress, Bounded Waiting", "Peterson's algorithm for two processes", "wait() (P) and signal() (V) semaphore atomic primitives", "Producer-Consumer bounded buffer solution"],
                trackReport: { status: "in_progress", percent: 50, mastery: "Learning", timeSpent: "18m", questionsSolved: "4/7", accuracy: "75%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "os_u3",
            unitNumber: 3,
            title: "Deadlocks & Recovery",
            description: "Coffman conditions, resource allocation graphs, Banker's algorithm, and detection.",
            topics: [
              {
                id: "os_u3_t1",
                name: "Coffman Conditions & Banker's Algorithm",
                duration: "30m",
                difficulty: "Advanced",
                lessonId: "lesson_os_bankers_deadlock",
                concepts: ["Mutual exclusion, Hold and wait, No preemption, Circular wait", "Allocation, Max, Available, and Need matrices (Need = Max - Allocation)", "Banker's Safety Algorithm to find safe execution sequences"],
                trackReport: { status: "in_progress", percent: 70, mastery: "Learning", timeSpent: "25m", questionsSolved: "6/8", accuracy: "86%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "os_u4",
            unitNumber: 4,
            title: "Memory Management & Virtual Memory",
            description: "Paging, page tables, TLB, demand paging, and FIFO/LRU replacement algorithms.",
            topics: [
              {
                id: "os_u4_t1",
                name: "Paging Architecture, Page Tables & TLB",
                duration: "30m",
                difficulty: "Intermediate",
                lessonId: "lesson_os_paging_tlb",
                concepts: ["Logical address: Page Number (p) + Offset (d)", "Frame allocation in physical memory & avoiding external fragmentation", "Translation Lookaside Buffer (TLB) hit ratio & Effective Access Time (EAT)"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              },
              {
                id: "os_u4_t2",
                name: "Page Replacement Algorithms: FIFO, LRU, Optimal",
                duration: "30m",
                difficulty: "Advanced",
                lessonId: "lesson_os_page_replacement",
                concepts: ["Page fault handling sequence", "Bélády's anomaly in FIFO page replacement", "Least Recently Used (LRU) stack/counter implementation", "Working set model and thrashing prevention"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          },
          {
            id: "os_u5",
            unitNumber: 5,
            title: "File Systems & Storage Management",
            description: "Inodes, file allocation methods, disk arm scheduling (SCAN/LOOK), and RAID levels.",
            topics: [
              {
                id: "os_u5_t1",
                name: "Inode Structure & Disk Scheduling (SSTF, SCAN)",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_os_disk_scheduling",
                concepts: ["Unix Inode pointers: direct, single indirect, double indirect", "Shortest Seek Time First (SSTF) starvation risk", "Elevator algorithms: SCAN, C-SCAN, LOOK", "RAID 0 (striping), RAID 1 (mirroring), RAID 5 (distributed parity)"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          }
        ]
      },
      {
        id: "cse3_daa",
        name: "Design and Analysis of Algorithms",
        code: "CS-505",
        color: "#7C3AED",
        bgTint: "#F5F3FF",
        icon: "Binary",
        description: "Asymptotic notation, Divide & Conquer, Dynamic Programming, Greedy algorithms, Graph algorithms, and NP-Completeness.",
        units: [
          {
            id: "daa_u1",
            unitNumber: 1,
            title: "Asymptotic Complexity & Recurrence Relations",
            description: "Big-O, Omega, Theta, Master Theorem, and recursion trees.",
            topics: [
              {
                id: "daa_u1_t1",
                name: "Asymptotic Notations & Master Theorem",
                duration: "25m",
                difficulty: "Beginner",
                lessonId: "lesson_daa_asymptotic_master",
                concepts: ["O(g(n)), Ω(g(n)), Θ(g(n)) formal definitions", "Master Theorem: T(n) = a T(n/b) + f(n) across 3 cases", "Recursion tree level-by-level work summation"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "28m", questionsSolved: "8/8", accuracy: "100%", lastActive: "Yesterday" }
              }
            ]
          },
          {
            id: "daa_u2",
            unitNumber: 2,
            title: "Divide & Conquer Algorithms",
            description: "Merge Sort, Quick Sort analysis, and Strassen's matrix multiplication.",
            topics: [
              {
                id: "daa_u2_t1",
                name: "Merge Sort vs Quick Sort Complexity",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_daa_sorting_analysis",
                concepts: ["Merge sort guaranteed O(N log N) & auxiliary memory requirement", "Quick sort best O(N log N) vs worst case O(N²) on sorted input", "Randomized partition pivot selection to defeat worst case"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "30m", questionsSolved: "7/7", accuracy: "90%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "daa_u3",
            unitNumber: 3,
            title: "Greedy Strategy & Dynamic Programming",
            description: "Fractional Knapsack, Huffman, 0/1 Knapsack, LCS, and Matrix Chain Multiplication.",
            topics: [
              {
                id: "daa_u3_t1",
                name: "Dynamic Programming vs Greedy Strategy",
                duration: "35m",
                difficulty: "Advanced",
                lessonId: "lesson_daa_dynamic_programming",
                concepts: ["Greedy choice property & local optimality failure in 0/1 knapsack", "Optimal substructure and overlapping subproblems", "Memoization (top-down) vs Tabulation (bottom-up)", "0/1 Knapsack DP table state transition dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-wt[i]])"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "42m", questionsSolved: "11/11", accuracy: "95%", lastActive: "Today" }
              },
              {
                id: "daa_u3_t2",
                name: "Longest Common Subsequence (LCS)",
                duration: "30m",
                difficulty: "Intermediate",
                lessonId: "lesson_daa_lcs",
                concepts: ["LCS recurrence: if X[i] == Y[j] then 1 + c[i-1, j-1] else max(c[i-1, j], c[i, j-1])", "Table reconstruction to print the actual string", "Space optimization from O(mn) to O(min(m, n))"],
                trackReport: { status: "in_progress", percent: 60, mastery: "Learning", timeSpent: "18m", questionsSolved: "4/6", accuracy: "80%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "daa_u4",
            unitNumber: 4,
            title: "Graph Algorithms & Minimum Spanning Trees",
            description: "Dijkstra's shortest paths, Bellman-Ford, Prim's and Kruskal's MST.",
            topics: [
              {
                id: "daa_u4_t1",
                name: "Single-Source Shortest Paths: Dijkstra vs Bellman-Ford",
                duration: "30m",
                difficulty: "Advanced",
                lessonId: "lesson_daa_shortest_paths",
                concepts: ["Dijkstra greedy relaxation with priority queue O((V + E) log V)", "Why Dijkstra fails with negative edge weights", "Bellman-Ford dynamic programming V-1 relaxations and negative cycle detection"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              },
              {
                id: "daa_u4_t2",
                name: "Minimum Spanning Trees: Prim vs Kruskal",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_daa_mst",
                concepts: ["Cut property & Cycle property", "Kruskal edge sorting + Disjoint Set Union (Union-Find with path compression)", "Prim's vertex growing algorithm"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          },
          {
            id: "daa_u5",
            unitNumber: 5,
            title: "NP-Completeness & Complexity Classes",
            description: "P vs NP, polynomial reductions, Cook's theorem, and 3-SAT.",
            topics: [
              {
                id: "daa_u5_t1",
                name: "P, NP, NP-Complete & Reductions",
                duration: "30m",
                difficulty: "Advanced",
                lessonId: "lesson_daa_np_completeness",
                concepts: ["Deterministic polynomial verification (NP)", "Cook-Levin Theorem: SAT is NP-Complete", "Polynomial reduction A ≤p B: if B is polynomial then A is polynomial"],
                trackReport: { status: "not_started", percent: 0, mastery: "Untested", timeSpent: "0m", questionsSolved: "0/0", accuracy: "—", lastActive: "Not started" }
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // 4. CLASS 12TH (Physics, Chemistry, Math, CS)
  // ==========================================
  class_12: {
    id: "class_12",
    title: "Class 12th Board & Entrance",
    subjects: [
      {
        id: "phys_12",
        name: "Physics (Class 12)",
        code: "PHY-12",
        color: "#4F46E5",
        bgTint: "#EEF2FF",
        icon: "Atom",
        description: "Electrostatics, current electricity, magnetism, electromagnetic induction, optics.",
        units: [
          {
            id: "phys12_u1",
            unitNumber: 1,
            title: "Current Electricity",
            description: "Drift speed, Ohm's law, temperature dependence, Kirchhoff's laws, potentiometer.",
            topics: [
              {
                id: "current_electricity",
                name: "Electric Current & Drift Velocity",
                duration: "15m",
                difficulty: "Beginner",
                lessonId: "lesson_electric_current_drift",
                concepts: ["Current density J = I/A", "Microscopic relation I = n e A v_d", "Relaxation time and drift speed"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "25m", questionsSolved: "8/8", accuracy: "95%", lastActive: "Today" }
              },
              {
                id: "ohms_law_resistance",
                name: "Ohm's Law & Resistivity Factors",
                duration: "20m",
                difficulty: "Beginner",
                lessonId: "lesson_ohms_law_resistance",
                concepts: ["V = IR", "Resistivity R = ρL/A", "Dependence on wire drawing and stretching"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "22m", questionsSolved: "7/7", accuracy: "90%", lastActive: "Yesterday" }
              },
              {
                id: "temp_dependence_resistance",
                name: "Temperature Factors & Combinations",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_resistor_combinations",
                concepts: ["R(T) = R0(1 + αΔT)", "Series & parallel resistor networks", "Power dissipation P = V²/R"],
                trackReport: { status: "in_progress", percent: 55, mastery: "Learning", timeSpent: "16m", questionsSolved: "4/7", accuracy: "75%", lastActive: "Today" }
              }
            ]
          },
          {
            id: "phys12_u2",
            unitNumber: 2,
            title: "Electrostatics & Fields",
            description: "Coulomb's law, electric flux, Gauss's law, and capacitors.",
            topics: [
              {
                id: "electrostatics",
                name: "Electric Charges & Coulomb's Law",
                duration: "20m",
                difficulty: "Beginner",
                lessonId: "lesson_electrostatics_coulomb",
                concepts: ["Coulomb's Law F = k q1 q2 / r²", "Electric field due to point and dipole", "Gauss's theorem Applications"],
                trackReport: { status: "in_progress", percent: 60, mastery: "Learning", timeSpent: "18m", questionsSolved: "5/8", accuracy: "82%", lastActive: "Today" }
              }
            ]
          }
        ]
      },
      {
        id: "chem_12",
        name: "Chemistry (Class 12)",
        code: "CHM-12",
        color: "#059669",
        bgTint: "#ECFDF5",
        icon: "FlaskConical",
        description: "Electrochemistry, chemical kinetics, solutions, and coordination compounds.",
        units: [
          {
            id: "chem12_u1",
            unitNumber: 1,
            title: "Electrochemistry",
            description: "Galvanic cells, Nernst equation, Gibbs free energy, and Kohlrausch's law.",
            topics: [
              {
                id: "electrochemistry",
                name: "Galvanic Cells & Nernst Equation",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_electrochemistry_nernst",
                concepts: ["Standard electrode potential E°", "Nernst equation E = E° - (0.0591/n) log Q", "Relationship between ΔG° and E° cell"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "30m", questionsSolved: "8/8", accuracy: "92%", lastActive: "Today" }
              }
            ]
          }
        ]
      },
      {
        id: "math_12",
        name: "Mathematics (Class 12)",
        code: "MTH-12",
        color: "#D97706",
        bgTint: "#FEF3C7",
        icon: "BookOpen",
        description: "Definite integrals, differential equations, matrices, vectors, and 3D geometry.",
        units: [
          {
            id: "math12_u1",
            unitNumber: 1,
            title: "Calculus & Integrals",
            description: "Definite integration, substitution, integration by parts (ILATE), and area under curves.",
            topics: [
              {
                id: "calculus_integrals",
                name: "Definite Integrals & Integration by Parts",
                duration: "25m",
                difficulty: "Intermediate",
                lessonId: "lesson_calculus_integrals",
                concepts: ["Fundamental theorem of calculus", "ILATE priority rule for parts", "Properties of definite integrals ∫ f(x)dx = ∫ f(a+b-x)dx"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "35m", questionsSolved: "9/9", accuracy: "96%", lastActive: "Today" }
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // 5. ENTRANCE EXAMS (JEE / NEET)
  // ==========================================
  entrance: {
    id: "entrance",
    title: "Entrance Examinations (JEE Main/Adv & NEET)",
    subjects: [
      {
        id: "ent_physics",
        name: "Physics (JEE / NEET Level)",
        code: "ENT-PHY",
        color: "#4F46E5",
        bgTint: "#EEF2FF",
        icon: "Atom",
        description: "High-yield competitive problem solving: multi-concept questions and shortcut tricks.",
        units: [
          {
            id: "ent_u1",
            unitNumber: 1,
            title: "High-Yield Electrodynamics & Circuits",
            description: "Symmetry methods, nodal analysis, delta-wye transformations, and RC transient circuits.",
            topics: [
              {
                id: "ent_current_circuit",
                name: "Circuit Laws & Symmetry Techniques",
                duration: "30m",
                difficulty: "Advanced",
                lessonId: "lesson_electric_current_drift",
                concepts: ["Cube resistor network symmetry", "Infinite ladder equivalent resistance", "RC charging and discharging transients"],
                trackReport: { status: "completed", percent: 100, mastery: "Mastered", timeSpent: "35m", questionsSolved: "10/10", accuracy: "94%", lastActive: "Today" }
              }
            ]
          }
        ]
      }
    ]
  }
};
