// Dedicated Topic Quiz Bank & Measurement Engine for LearnNova
// Supports Physics (Class 11 & 12), Computer Networks, Software Engineering, C Programming, Chemistry, and Math

export const TOPIC_QUIZ_BANK = {
  // ==========================================
  // PHYSICS (CLASS 11)
  // ==========================================
  phys11_u1_t1: {
    topicId: "phys11_u1_t1",
    topicName: "Dimensional Analysis & Application",
    subject: "Physics (Class 11)",
    unitTitle: "Unit 1: Physical World & Measurements",
    questions: [
      {
        id: "q_dim_01",
        question: "Which of the following physical quantities has the dimensional formula [M L² T⁻²]?",
        options: [
          { id: "A", text: "Work and Torque", isCorrect: true, feedback: "Spot on! Both Work (Force × distance) and Torque (Force × lever arm) have dimensions [M L T⁻²] × [L] = [M L² T⁻²]." },
          { id: "B", text: "Power and Pressure", isCorrect: false, feedback: "Incorrect. Power is energy per unit time [M L² T⁻³], and Pressure is force per unit area [M L⁻¹ T⁻²]." },
          { id: "C", text: "Momentum and Impulse", isCorrect: false, feedback: "Incorrect. Momentum and impulse have dimensions [M L T⁻¹]." },
          { id: "D", text: "Gravitational constant and Surface tension", isCorrect: false, feedback: "Incorrect. Gravitational constant G is [M⁻¹ L³ T⁻²]." },
        ],
        explanation: "Work = F · d = [M L T⁻²][L] = [M L² T⁻²]. Torque τ = r × F = [L][M L T⁻²] = [M L² T⁻²]. Even though work is a scalar and torque is a pseudo-vector, they share identical dimensional dimensions.",
        hint: "Recall: Work = Force × displacement, and Torque = Force × perpendicular distance.",
      },
      {
        id: "q_dim_02",
        question: "According to the Principle of Homogeneity of dimensions, in an equation A = B + C/D, which condition must hold true?",
        options: [
          { id: "A", text: "[A] = [B] = [C/D]", isCorrect: true, feedback: "Correct! Only physical quantities with identical dimensions can be added or equated." },
          { id: "B", text: "[A] = [B] + [C] / [D]", isCorrect: false, feedback: "Incorrect. Dimensional formulas cannot be algebraically summed (you cannot write [L] + [L] = 2[L])." },
          { id: "C", text: "[C] must equal [D]", isCorrect: false, feedback: "Incorrect. [C] and [D] do not need to be equal; only the quotient [C/D] must match [A] and [B]." },
          { id: "D", text: "[A] must be dimensionless", isCorrect: false, feedback: "Incorrect. [A] can be any dimensional quantity as long as all terms on the right have the same dimensions." },
        ],
        explanation: "The Principle of Homogeneity states that every term added, subtracted, or equated in a valid physical equation must possess the exact same dimensional formula.",
        hint: "Can you add 5 meters to 3 seconds? Physical addition requires matching dimensional units.",
      },
      {
        id: "q_dim_03",
        question: "If velocity v, force F, and time T are chosen as fundamental physical units, what is the dimension of mass M?",
        options: [
          { id: "A", text: "[F v⁻¹ T]", isCorrect: true, feedback: "Brilliant! Force F = m · a = m · (v / T), so m = F · T / v = [F v⁻¹ T]." },
          { id: "B", text: "[F v T⁻¹]", isCorrect: false, feedback: "Incorrect. That would give [M L T⁻²] [L T⁻¹] [T⁻¹] = [M L² T⁻⁴], which is not mass." },
          { id: "C", text: "[F² v⁻¹ T]", isCorrect: false, feedback: "Incorrect. Squaring force introduces M²." },
          { id: "D", text: "[F v T]", isCorrect: false, feedback: "Incorrect. Check the dimensions of F × v × T; it equals energy [M L² T⁻²]." },
        ],
        explanation: "By Newton's second law, F = m · (v / T). Solving for mass yields M = F · T · v⁻¹ = [F v⁻¹ T].",
        hint: "Use F = m(dv/dt) and express mass in terms of F, v, and T.",
      },
    ],
  },

  phys11_u2_t1: {
    topicId: "phys11_u2_t1",
    topicName: "Uniformly Accelerated Motion & Equations",
    subject: "Physics (Class 11)",
    unitTitle: "Unit 2: Kinematics",
    questions: [
      {
        id: "q_kin_01",
        question: "A stone is dropped from a height h above the ground. Simultaneously, a second stone is thrown horizontally from the same height with velocity v. Which stone hits the ground first (neglecting air resistance)?",
        options: [
          { id: "A", text: "Both hit the ground at exactly the same time", isCorrect: true, feedback: "Correct! The vertical and horizontal motions are completely independent. Both start with zero initial vertical velocity (u_y = 0) and accelerate at g downwards, so t = √(2h/g) for both." },
          { id: "B", text: "The dropped stone hits first because its path is shorter", isCorrect: false, feedback: "Incorrect. Although its trajectory is shorter, its vertical acceleration and initial vertical speed are identical to the projectile." },
          { id: "C", text: "The horizontally thrown stone hits first because of added speed", isCorrect: false, feedback: "Incorrect. Horizontal velocity does not accelerate the downward descent." },
          { id: "D", text: "Depends on the mass of the two stones", isCorrect: false, feedback: "Incorrect. Under gravity, all masses fall with identical gravitational acceleration g." },
        ],
        explanation: "Motion along perpendicular axes is decoupled: y(t) = h - 0.5 g t². Since u_y = 0 for both stones, time of fall t = √(2h/g) is identical for both.",
        hint: "Does a bullet fired horizontally take longer or shorter to hit the ground than a bullet dropped from the same height?",
      },
      {
        id: "q_kin_02",
        question: "In a velocity-time (v-t) graph, what physical quantities are represented by the slope of the curve and the area under the curve, respectively?",
        options: [
          { id: "A", text: "Acceleration and Displacement", isCorrect: true, feedback: "Spot on! Slope dv/dt = acceleration a. Area ∫ v dt = displacement Δx." },
          { id: "B", text: "Speed and Distance", isCorrect: false, feedback: "Incorrect. v-t graphs preserve signed vector values, representing acceleration and displacement." },
          { id: "C", text: "Displacement and Acceleration", isCorrect: false, feedback: "Incorrect. You inverted slope and area." },
          { id: "D", text: "Jerk and Total Energy", isCorrect: false, feedback: "Incorrect. Slope of acceleration graph is jerk." },
        ],
        explanation: "Slope = dv/dt = instantaneous acceleration. Area under v-t graph = ∫ v dt = net displacement.",
        hint: "Recall derivative: rate of change of velocity vs integral: product of velocity and time interval.",
      },
      {
        id: "q_kin_03",
        question: "A car accelerates uniformly from rest at 2 m/s² for 5 seconds, then travels at constant speed for 10 seconds. What is the total distance covered?",
        options: [
          { id: "A", text: "125 meters", isCorrect: true, feedback: "Brilliant! Phase 1: s1 = 0.5 × 2 × 5² = 25 m, v = 2 × 5 = 10 m/s. Phase 2: s2 = 10 m/s × 10 s = 100 m. Total s = 25 + 100 = 125 m." },
          { id: "B", text: "100 meters", isCorrect: false, feedback: "Incorrect. You missed the 25 m covered during the initial acceleration phase." },
          { id: "C", text: "150 meters", isCorrect: false, feedback: "Incorrect. Check your calculations for the two phases." },
          { id: "D", text: "75 meters", isCorrect: false, feedback: "Incorrect. Underestimated distance during the constant velocity phase." },
        ],
        explanation: "Phase 1: s1 = ut + 0.5at² = 0 + 0.5(2)(25) = 25 m. Final speed v = u + at = 10 m/s. Phase 2: s2 = v × t = 10 × 10 = 100 m. Total = 25 + 100 = 125 m.",
        hint: "Split the motion into two distinct intervals: accelerating phase and constant speed phase.",
      },
    ],
  },

  phys11_u3_t1: {
    topicId: "phys11_u3_t1",
    topicName: "Newton's Laws & Free-Body Diagrams (FBD)",
    subject: "Physics (Class 11)",
    unitTitle: "Unit 3: Laws of Motion & Friction",
    questions: [
      {
        id: "q_nl_01",
        question: "A book rests horizontally on a table. According to Newton's Third Law, what is the action-reaction pair to the gravitational force exerted by the Earth on the book?",
        options: [
          { id: "A", text: "The gravitational force exerted by the book on the Earth", isCorrect: true, feedback: "Mastery demonstrated! Action-reaction pairs act on different bodies and represent the exact same type of force (gravity ↔ gravity)." },
          { id: "B", text: "The upward normal contact force exerted by the table on the book", isCorrect: false, feedback: "Common trap! Normal force balances gravity for equilibrium on the book, but they act on the same body and have different physical origins (electromagnetic vs gravitational)." },
          { id: "C", text: "The downward contact force of the book on the table", isCorrect: false, feedback: "Incorrect. That forms an action-reaction pair with the normal force from the table." },
          { id: "D", text: "Atmospheric pressure pushing down on the book", isCorrect: false, feedback: "Incorrect. Atmospheric pressure is unrelated to Earth's gravitational pull." },
        ],
        explanation: "Newton's Third Law pairs always act on TWO DIFFERENT bodies and are of the IDENTICAL force type. Earth pulls Book (gravity) ↔ Book pulls Earth (gravity). Normal force from table is electromagnetic contact, pairing with Book pushing Table.",
        hint: "Newton's Third Law pair rule: Force of A on B pairs with Force of B on A.",
      },
      {
        id: "q_nl_02",
        question: "A 5 kg block is suspended by a light inextensible cord in an elevator accelerating upwards at 2 m/s² (take g = 9.8 m/s²). What is the tension in the cord?",
        options: [
          { id: "A", text: "59 N", isCorrect: true, feedback: "Correct! F_net = T - mg = ma ⇒ T = m(g + a) = 5(9.8 + 2.0) = 5(11.8) = 59 N." },
          { id: "B", text: "49 N", isCorrect: false, feedback: "Incorrect. 49 N is the stationary tension T = mg." },
          { id: "C", text: "39 N", isCorrect: false, feedback: "Incorrect. That corresponds to an elevator accelerating downwards at 2 m/s²." },
          { id: "D", text: "10 N", isCorrect: false, feedback: "Incorrect. That is just m × a." },
        ],
        explanation: "From FBD of block: T - mg = ma ⇒ T = m(g + a). Since acceleration is upwards, apparent weight increases: T = 5 × 11.8 = 59 N.",
        hint: "When an elevator jerks upward, do your knees feel heavier or lighter?",
      },
      {
        id: "q_nl_03",
        question: "If the net external force acting on an object is zero, which of the following statements MUST be true?",
        options: [
          { id: "A", text: "Its acceleration is zero and its velocity is constant", isCorrect: true, feedback: "Correct! By Newton's First and Second Law: F_net = 0 ⇔ a = dv/dt = 0, so velocity remains constant in magnitude and direction." },
          { id: "B", text: "The object must be stationary at rest", isCorrect: false, feedback: "Incorrect. The object can be moving in a straight line with uniform non-zero velocity." },
          { id: "C", text: "No forces are acting on the object at all", isCorrect: false, feedback: "Incorrect. Multiple individual forces can act on the object as long as their vector sum equals zero." },
          { id: "D", text: "Its kinetic energy must be zero", isCorrect: false, feedback: "Incorrect. If moving with constant velocity v > 0, kinetic energy 1/2 mv² is constant and non-zero." },
        ],
        explanation: "Newton's First Law: An object continues in its state of rest or uniform motion in a straight line unless acted upon by a net external force. F_net = 0 guarantees zero acceleration, not zero speed.",
        hint: "Think of Voyager 1 traveling through interstellar space with thrusters turned off.",
      },
    ],
  },

  // ==========================================
  // PHYSICS (CLASS 12) - Current Electricity
  // ==========================================
  current_electricity: {
    topicId: "current_electricity",
    topicName: "Electric Current & Drift Velocity",
    subject: "Physics (Class 12)",
    unitTitle: "Unit 1: Current Electricity",
    questions: [
      {
        id: "q_ce_01",
        question: "A steady current flows through a metallic conductor of non-uniform cross-section. Which quantity remains constant along the entire wire?",
        options: [
          { id: "A", text: "Electric current (I)", isCorrect: true, feedback: "Correct! By conservation of electric charge, the rate of charge entering any section must equal the rate leaving it, so current I is identical everywhere." },
          { id: "B", text: "Current density (J)", isCorrect: false, feedback: "Incorrect. J = I/A; as wire narrows, J increases inversely with area." },
          { id: "C", text: "Drift velocity (v_d)", isCorrect: false, feedback: "Incorrect. v_d = I / (n e A). Electrons must drift faster through narrower bottlenecks." },
          { id: "D", text: "Electric field (E)", isCorrect: false, feedback: "Incorrect. Since J = σE, electric field is higher in thinner sections." },
        ],
        explanation: "Electric current is a scalar defined as rate of flow of charge: I = dq/dt. Conservation of charge requires I to be constant across all sections. Both current density J = I/A and drift speed v_d = I/(neA) vary inversely with cross-sectional area.",
        hint: "Think of water flowing through a tapered pipe: what quantity cannot build up inside the pipe?",
      },
      {
        id: "q_ce_02",
        question: "A copper wire of resistance R is stretched uniformly so that its length doubles (L' = 2L) while volume remains constant. What is its new resistance?",
        options: [
          { id: "A", text: "4R", isCorrect: true, feedback: "Brilliant! Volume V = A × L is constant. When length doubles, cross-sectional area halves (A' = A/2). Since R = ρL/A, new resistance R' = ρ(2L)/(A/2) = 4R." },
          { id: "B", text: "2R", isCorrect: false, feedback: "Trap! You only accounted for length increase and forgot that stretching narrows the wire." },
          { id: "C", text: "R / 2", isCorrect: false, feedback: "Incorrect. Both increased length and reduced thickness increase resistance." },
          { id: "D", text: "R", isCorrect: false, feedback: "Incorrect. While resistivity ρ is constant, geometry changes." },
        ],
        explanation: "Resistance R = ρL/A. With constant volume V = A·L, A = V/L, giving R = ρ L² / V. Therefore, R ∝ L². Doubling length multiplies resistance by 2² = 4.",
        hint: "When wire stretches, does its cross-sectional area increase or decrease?",
      },
      {
        id: "q_ce_03",
        question: "How does the electrical resistivity of a typical semiconductor (e.g. Silicon) behave with rising temperature, compared to a metal?",
        options: [
          { id: "A", text: "Semiconductor resistivity decreases exponentially, metal resistivity increases", isCorrect: true, feedback: "Mastery! Semiconductors have negative temperature coefficient (α < 0) because thermal energy creates abundant electron-hole pairs. Metals have positive α due to lattice vibrations." },
          { id: "B", text: "Both increase linearly", isCorrect: false, feedback: "Incorrect. Semiconductors conduct dramatically better at high temperatures." },
          { id: "C", text: "Both decrease exponentially", isCorrect: false, feedback: "Incorrect. Metal resistance rises with heat due to electron scattering." },
          { id: "D", text: "Semiconductor resistivity increases, metal resistivity decreases", isCorrect: false, feedback: "Incorrect. Opposite of experimental physics." },
        ],
        explanation: "Resistivity ρ = m / (n e² τ). In metals, carrier density n is constant, so heating increases lattice vibration and decreases τ, raising ρ. In semiconductors, carrier density n surges exponentially with temperature, dominating over collision time.",
        hint: "Heating silicon breaks covalent bonds, liberating millions of free charge carriers.",
      },
    ],
  },

  // ==========================================
  // COMPUTER SCIENCE (CSE 3RD YEAR)
  // ==========================================
  cn_u1_t1: {
    topicId: "cn_u1_t1",
    topicName: "OSI 7-Layer Reference Model & Protocol Data Units",
    subject: "Computer Networks",
    unitTitle: "Unit 1: Network Architecture & Physical Layer",
    questions: [
      {
        id: "q_cn_01",
        question: "Which OSI layer is responsible for end-to-end reliable transmission, flow control, and port-based multiplexing?",
        options: [
          { id: "A", text: "Transport Layer (Layer 4)", isCorrect: true, feedback: "Spot on! The Transport Layer (TCP/UDP) handles process-to-process communication, port addressing, segmentation, and reliability." },
          { id: "B", text: "Network Layer (Layer 3)", isCorrect: false, feedback: "Incorrect. The Network layer handles logical addressing (IP) and routing between host devices, not port-based process delivery." },
          { id: "C", text: "Data Link Layer (Layer 2)", isCorrect: false, feedback: "Incorrect. Layer 2 handles hop-to-hop framing and MAC addresses across a single link." },
          { id: "D", text: "Session Layer (Layer 5)", isCorrect: false, feedback: "Incorrect. The Session layer manages dialogue control and synchronization checkpoints." },
        ],
        explanation: "Layer 4 (Transport Layer) provides end-to-end communication between application processes. It uses 16-bit port numbers to demultiplex incoming data to the appropriate process and provides flow/error control in TCP.",
        hint: "Think about which layer TCP and UDP protocols belong to.",
      },
      {
        id: "q_cn_02",
        question: "What is the correct Protocol Data Unit (PDU) name at the Data Link Layer, Network Layer, and Transport Layer, respectively?",
        options: [
          { id: "A", text: "Frame, Packet, Segment", isCorrect: true, feedback: "Correct! Data Link = Frame (MAC headers), Network = Packet (IP headers), Transport = Segment (TCP) or Datagram (UDP)." },
          { id: "B", text: "Packet, Frame, Segment", isCorrect: false, feedback: "Incorrect. Packets belong to Network Layer, not Data Link." },
          { id: "C", text: "Bit, Packet, Datagram", isCorrect: false, feedback: "Incorrect. Bits are Physical Layer (Layer 1)." },
          { id: "D", text: "Segment, Frame, Packet", isCorrect: false, feedback: "Incorrect order." },
        ],
        explanation: "As data moves down the protocol stack: Application (Data) → Transport (Segment) → Network (Packet) → Data Link (Frame) → Physical (Bits).",
        hint: "Frames encapsulate packets; packets encapsulate segments.",
      },
      {
        id: "q_cn_03",
        question: "When a router receives an IP packet, up to which OSI layer does it typically process the header before forwarding?",
        options: [
          { id: "A", text: "Layer 3 (Network Layer)", isCorrect: true, feedback: "Brilliant! Standard routers inspect Layer 2 (MAC) to accept the frame, decapsulate to Layer 3 to read destination IP for routing lookup, then re-encapsulate with a new Layer 2 header." },
          { id: "B", text: "Layer 2 (Data Link Layer)", isCorrect: false, feedback: "Incorrect. Layer 2 switches inspect only MAC addresses; routers inspect IP addresses at Layer 3." },
          { id: "C", text: "Layer 4 (Transport Layer)", isCorrect: false, feedback: "Incorrect. Normal routers do not inspect TCP/UDP headers unless running NAT or firewall inspection." },
          { id: "D", text: "Layer 7 (Application Layer)", isCorrect: false, feedback: "Incorrect. That would be an Application Gateway or reverse proxy." },
        ],
        explanation: "Standard IP routers are Layer 3 intermediate systems. They decapsulate the Layer 2 frame, consult their routing table using the destination Layer 3 IP address, decrement TTL, recalculate checksum, and forward via next hop.",
        hint: "Switches are Layer 2; Routers are Layer 3; Gateways can be Layer 7.",
      },
    ],
  },

  se_u1_t1: {
    topicId: "se_u1_t1",
    topicName: "Agile Manifesto & Scrum Framework",
    subject: "Software Engineering",
    unitTitle: "Unit 1: Process Models & Agile",
    questions: [
      {
        id: "q_se_01",
        question: "Which of the following values is explicitly emphasized in the Agile Manifesto over comprehensive documentation?",
        options: [
          { id: "A", text: "Working software", isCorrect: true, feedback: "Correct! The Agile Manifesto values 'Working software over comprehensive documentation'." },
          { id: "B", text: "Contract negotiation", isCorrect: false, feedback: "Incorrect. Agile values 'Customer collaboration over contract negotiation'." },
          { id: "C", text: "Following a fixed plan", isCorrect: false, feedback: "Incorrect. Agile values 'Responding to change over following a plan'." },
          { id: "D", text: "Detailed architecture diagrams", isCorrect: false, feedback: "Incorrect." },
        ],
        explanation: "The 4 core values of Agile are: Individuals & interactions over processes/tools; Working software over comprehensive documentation; Customer collaboration over contract negotiation; Responding to change over following a plan.",
        hint: "What is the ultimate measure of progress in an Agile project?",
      },
      {
        id: "q_se_02",
        question: "In Scrum, who is solely accountable for prioritizing and managing the Product Backlog to maximize business value?",
        options: [
          { id: "A", text: "Product Owner", isCorrect: true, feedback: "Spot on! The Product Owner owns the Product Backlog, represents stakeholders, and sets priorities based on ROI and business value." },
          { id: "B", text: "Scrum Master", isCorrect: false, feedback: "Incorrect. The Scrum Master is a servant-leader who coaches the team and removes impediments." },
          { id: "C", text: "Lead Software Architect", isCorrect: false, feedback: "Incorrect. Technical team members estimate effort, but the PO decides business priority." },
          { id: "D", text: "Project Manager", isCorrect: false, feedback: "Incorrect. Scrum does not have a traditional PM role." },
        ],
        explanation: "The Product Owner is the single person responsible for maximizing product value. They manage backlog ordering, clarify user stories, and decide release criteria.",
        hint: "The role whose title includes 'Owner' of the product.",
      },
      {
        id: "q_se_03",
        question: "What is the primary objective of the Sprint Retrospective event held at the end of each sprint?",
        options: [
          { id: "A", text: "Inspect team performance, interactions, and define process improvements", isCorrect: true, feedback: "Correct! The Retrospective focuses on people, relationships, process, and tools to identify actionable improvements for the next sprint." },
          { id: "B", text: "Demonstrate finished user stories to external stakeholders", isCorrect: false, feedback: "Incorrect. That is the Sprint Review, not the Retrospective." },
          { id: "C", text: "Estimate story points for the next 3 months", isCorrect: false, feedback: "Incorrect. That is backlog refinement/planning." },
          { id: "D", text: "Conduct code reviews and fix bugs", isCorrect: false, feedback: "Incorrect. Code review occurs continuously during the sprint." },
        ],
        explanation: "Sprint Review = inspect increment with stakeholders. Sprint Retrospective = internal team inspection of how the sprint went regarding individuals, collaboration, processes, and tools.",
        hint: "Retrospective = looking backward at how we worked together to improve our next cycle.",
      },
    ],
  },
};

// Generic Intelligent Generator for any topic in the curriculum that isn't hardcoded above
export function getOrGenerateTopicQuiz(topicId, requestedTopicName = "", subjectName = "", unitTitle = "", concepts = []) {
  if (TOPIC_QUIZ_BANK[topicId]) {
    return TOPIC_QUIZ_BANK[topicId];
  }

  const cleanName = requestedTopicName || topicId.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const cleanSubject = subjectName || "Core Curriculum";
  const cleanUnit = unitTitle || "Conceptual Diagnostic Unit";

  if (Array.isArray(concepts) && concepts.length) {
    const quizConcepts = concepts.slice(0, 3);
    return {
      topicId,
      topicName: cleanName,
      subject: cleanSubject,
      unitTitle: cleanUnit,
      questions: quizConcepts.map((concept, index) => {
        const correctOptionId = ["B", "D", "C"][index % 3];
        const choices = [
          { id: "A", text: "Skip checking the assumptions and constraints", isCorrect: false },
          { id: "B", text: concept, isCorrect: true },
          { id: "C", text: "Rely on a memorized result without understanding why it works", isCorrect: false },
          { id: "D", text: "Treat the topic as disconnected from its worked examples", isCorrect: false },
        ].map((option) => ({
          ...option,
          isCorrect: option.id === correctOptionId,
          feedback: option.id === correctOptionId ? `Correct. ${concept}` : `Review this lesson objective: ${concept}`,
        }));
        choices.find((option) => option.id === correctOptionId).text = concept;
        return {
        id: `q_${topicId}_${String(index + 1).padStart(2, "0")}`,
        question: [
          `Which core idea is included in ${cleanName}?`,
          `Which skill should you use when working on ${cleanName}?`,
          `Which learning objective belongs to ${cleanName}?`,
        ][index % 3],
        options: choices,
        explanation: `This question checks the lesson objective: ${concept}`,
        hint: `Review the section on ${concept}.`,
        };
      }),
    };
  }

  return {
    topicId,
    topicName: cleanName,
    subject: cleanSubject,
    unitTitle: cleanUnit,
    questions: [
      {
        id: `q_${topicId}_01`,
        question: `What fundamental principle or invariant forms the foundation of ${cleanName}?`,
        options: [
          {
            id: "A",
            text: `Core conservation and mathematical definition governing ${cleanName}`,
            isCorrect: true,
            feedback: `Excellent! You grasped the foundational invariant of ${cleanName}. Understanding the core definition avoids early conceptual missteps.`,
          },
          {
            id: "B",
            text: `An approximation that holds true only under extreme asymptotic conditions`,
            isCorrect: false,
            feedback: `Notice that asymptotic approximations do not define the general foundation of ${cleanName}. Review the baseline boundary criteria.`,
          },
          {
            id: "C",
            text: `A superficial empirical heuristic with no underlying theoretical mechanism`,
            isCorrect: false,
            feedback: `Misconception: ${cleanName} is grounded in verified formal theory, not just ad-hoc observation.`,
          },
          {
            id: "D",
            text: `A reversed relationship where dependent and independent variables are inverted`,
            isCorrect: false,
            feedback: `Careful with inverse relationships! Verify which variable acts as the driver versus the observed response.`,
          },
        ],
        explanation: `In ${cleanName}, the governing invariant dictates how system components relate and behave. Mastering the base definition allows you to deduce edge cases and complex problem formulations.`,
        hint: `Focus on the exact formal definition introduced in standard textbook derivations.`,
      },
      {
        id: `q_${topicId}_02`,
        question: `When applying ${cleanName} to analyze system changes, which trade-off or constraint must be respected?`,
        options: [
          {
            id: "A",
            text: `Linear scaling without any boundary limits or saturation effects`,
            isCorrect: false,
            feedback: `Real physical and computational systems always exhibit boundaries and threshold constraints.`,
          },
          {
            id: "B",
            text: `Conservation laws, boundary conditions, and invariant structural constraints`,
            isCorrect: true,
            feedback: `Spot on! Any rigorous application of ${cleanName} requires balancing boundary constraints and invariant laws.`,
          },
          {
            id: "C",
            text: `Random non-deterministic variation that cannot be modeled mathematically`,
            isCorrect: false,
            feedback: `Incorrect. The underlying mechanisms follow deterministic principles that yield predictable outcomes.`,
          },
          {
            id: "D",
            text: `Complete independence from external parameters and environment variables`,
            isCorrect: false,
            feedback: `Incorrect. Environmental variables and input parameters directly modulate the behavior.`,
          },
        ],
        explanation: `Every analytical model for ${cleanName} operates within well-defined operational envelopes. Identifying constraints prevents invalid extrapolation.`,
        hint: `Consider what happens when input variables approach limiting extremes.`,
      },
      {
        id: `q_${topicId}_03`,
        question: `In standard examination and technical interview scenarios, what is the most common pitfall when solving problems in ${cleanName}?`,
        options: [
          {
            id: "A",
            text: `Failing to verify dimensional consistency or neglecting secondary dimensional coupling`,
            isCorrect: true,
            feedback: `Mastery demonstrated! Neglecting secondary couplings or dimensional constraints is the #1 reason students lose marks in ${cleanName}.`,
          },
          {
            id: "B",
            text: `Calculating values too accurately without using rough estimations`,
            isCorrect: false,
            feedback: `Precision is rewarded; rough estimation is only a check, not the core pitfall.`,
          },
          {
            id: "C",
            text: `Using standard international SI units instead of arbitrary local units`,
            isCorrect: false,
            feedback: `Using standard SI units is standard best practice, not an error.`,
          },
          {
            id: "D",
            text: `Assuming that energy or information is conserved throughout the interaction`,
            isCorrect: false,
            feedback: `Conservation principles are universally valid and must always be honored.`,
          },
        ],
        explanation: `When analyzing problems in ${cleanName}, students frequently overlook coupled parameters (e.g. wire thickness changing during stretching, or network packets requiring headers). Rigorous verification of secondary variables resolves these traps.`,
        hint: `Ask yourself: when you alter one primary parameter, what implicit dependent parameter changes alongside it?`,
      },
    ],
  };
}
