export const personalInfo = {
  name: "Yik Chun (John) Peng",
  preferredName: "John Peng",
  role: "Electrical & Computer Engineering Student @ USC",
  headline: "Building at the intersection of Embedded Systems, Robotics, and AI.",
  bio: "I am an engineering student and researcher passionate about integrating hardware with intelligent software. From building self-assembling robots and 7-DOF manipulator arms to developing knowledge-graph RAG pipelines for LLMs, I love solving complex problems that bridge the physical and digital worlds.",
  locations: ["Los Angeles, CA", "Chicago, IL"],
  email: "johnpeng@usc.edu",
  phone: "(213) 994-0547",
  github: "https://github.com/ycjohnp",
  linkedin: "https://linkedin.com/in/yc-john-peng",
  education: {
    institution: "University of Southern California",
    location: "Los Angeles, CA",
    degree: "Bachelor of Science, Electrical and Computer Engineering",
    graduationDate: "Expected Dec. 2027",
    gpa: "3.61",
    coursework: [
      "Data Structures and Algorithms",
      "Distributed Systems",
      "IoT",
      "Embedded Systems",
      "Linear Circuits",
      "Proof-Based Linear Algebra",
      "Digital Logic and RTL Design"
    ]
  },
  strengths: [
    {
      title: "Hardware / Software Co-Design",
      description: "Seamless integration across robotics, embedded systems, custom PCBs, firmware, AI prototypes, and full-system validation."
    },
    {
      title: "Ambiguity to Working Prototypes",
      description: "Proven ability to take vague prototype requirements into reliable, functioning systems through rapid debugging, lab testing, documentation, and design iteration."
    },
    {
      title: "Cross-Functional Engineering Leadership",
      description: "Leadership experience orchestrating electrical, embedded, software, mechanical, and product-facing workflows for teams of 6 to 100+ engineers."
    },
    {
      title: "Production & Supply Chain Readiness",
      description: "Practical exposure to early-stage product development, component selection, supply-chain tradeoffs, manufacturability, reliability testing, and production handoff."
    }
  ]
};

export const stats = [
  {
    label: "Kinematics Trials Executed",
    value: "46+",
    description: "OptiTrack IR-marker 3D gait coordination tests"
  },
  {
    label: "RAG Retrieval Relevance Boost",
    value: "+40%",
    description: "With 20% latency reduction via Knowledge Graphs"
  },
  {
    label: "Robotic Manipulator Arm",
    value: "7-DOF",
    description: "CAN-based BLDC control with ROS 2 & E-Stop"
  },
  {
    label: "Sensory System AI Latency",
    value: "<200ms",
    description: "Real-time edge multimodal processing on Jetson"
  }
];

export const experiences = [
  {
    id: "sram",
    role: "Advanced Development Engineering Intern",
    company: "SRAM",
    location: "Chicago, IL",
    period: "Jun. 2026 – Aug. 2026",
    type: "Industry Internship",
    featured: true,
    skills: ["Altium", "PCB Design", "PCBA", "Firmware", "Android", "Hardware Bring-up", "AC Signals"],
    summary: "Worked on next-generation advanced development products, designing custom PCBs, bringing up PCBA prototypes, and bridging firmware and Android applications.",
    bulletPoints: [
      "Design compact PCBs in Altium for AC-signal handling, balancing electrical performance, cost, manufacturability, and supply-chain constraints.",
      "Support PCBA workflows including component selection, prototype assembly, board bring-up, electrical debugging, and design iteration.",
      "Work across firmware and Android app development for resource-constrained devices, contributing to embedded product functionality and hardware/software integration.",
      "Help bring an advanced-development product from early prototype work toward production handoff through documentation, manufacturability review, and technical transition materials."
    ]
  },
  {
    id: "usc-makers-director",
    role: "Director of Technical Resources",
    company: "USC Makers",
    location: "Los Angeles, CA",
    period: "May 2026 – Present",
    type: "Leadership",
    featured: true,
    skills: ["Technical Leadership", "Knowledge Base", "Documentation", "Resource Management", "Sponsorship"],
    summary: "Leading technical resource architecture and institutional knowledge systems for USC's premier 100+ member engineering prototyping club.",
    bulletPoints: [
      "Lead technical resource development for a 100+ member engineering club, organizing materials, tutorials, documentation, and institutional knowledge.",
      "Build Confluence-inspired databases and knowledge-sharing systems to improve access to club resources, past project information, technical guides, and onboarding materials.",
      "Index club resources across hardware, software, materials, tutorials, and project documentation to reduce repeated work and improve technical continuity across teams.",
      "Support company outreach and sponsorship development by aligning club needs with engineering-industry partners and potential sponsors."
    ]
  },
  {
    id: "skatemo-lead",
    role: "Technical Project Lead / Project Manager",
    company: "USC Makers (SkateMo Autonomous Skateboard)",
    location: "Los Angeles, CA",
    period: "Aug. 2025 – May 2026",
    type: "Project Leadership",
    featured: true,
    skills: ["OpenCV", "YOLO", "Sensor Fusion", "BLDC Motor Control", "FSM Planning", "Team Leadership"],
    summary: "Led a 6-member cross-functional engineering team building SkateMo, an autonomous self-driving skateboard, owning perception, navigation, and embedded control.",
    bulletPoints: [
      "Led a multidisciplinary team building an autonomous self-driving skateboard, owning perception, navigation, and embedded-control integration.",
      "Built real-time obstacle avoidance and path-planning logic using OpenCV and YOLO with camera/IMU sensor fusion.",
      "Designed skateboard-like steering dynamics and controllable torque/turning geometry for autonomous navigation.",
      "Coordinated cross-module integration across perception, embedded, electrical, and mechanical systems.",
      "Ran design reviews and integration testing to align subsystem development, resolve technical issues, and de-risk full-system bring-up."
    ]
  },
  {
    id: "manycore",
    role: "Machine Learning Engineer Intern (LLM / RAG)",
    company: "Manycore Tech",
    location: "Hangzhou, China",
    period: "May 2025 – Jul. 2025",
    type: "Industry Internship",
    featured: true,
    skills: ["Knowledge Graphs", "KuzuDB", "LangChain", "Alibaba Bailian", "RAG", "Vector DB", "Docker", "Python"],
    summary: "Architected a high-performance Knowledge-Graph-augmented RAG pipeline and multi-hop reasoning agents for production search workloads.",
    bulletPoints: [
      "Built a knowledge-graph-augmented RAG pipeline using Alibaba Bailian and KuzuDB, improving retrieval relevance by 40% and reducing system latency by 20% through optimized graph queries and vector-database integration.",
      "Developed LangChain agents for KG-driven contextual reasoning and multi-hop retrieval, enabling evidence assembly across graph nodes and semantic search outputs.",
      "Implemented a high-performance KnowledgeGraph module supporting fast CSV ingestion, schema construction, relationship generation, and efficient traversal operations.",
      "Engineered a unified retrieval pipeline combining vector search, KG neighbor expansion, semantic filtering, and deduplication.",
      "Documented system architecture, data flow, retrieval logic, and performance-tuning strategies for scalable deployment.",
      "Containerized components with Docker for reproducible development and consistent runtime behavior across environments."
    ]
  },
  {
    id: "usc-robotics-lab",
    role: "Undergraduate Researcher",
    company: "Robot Locomotion and Navigation Dynamics Laboratory (USC)",
    location: "Los Angeles, CA",
    period: "Aug. 2024 – Present",
    type: "Academic Research",
    featured: true,
    skills: ["Robotics Research", "OptiTrack Kinematics", "Locomotion Algorithms", "Gait Control", "Mechanical Iteration", "CAD"],
    summary: "Conducting cutting-edge research on multi-legged robot locomotion, body-leg phase coordination, and physical obstacle interactions.",
    bulletPoints: [
      "Conduct research on multi-legged robot locomotion, analyzing body-leg phase coordination and controlled leg-obstacle interactions in cluttered or confined environments.",
      "Redesigned phase-control algorithms by converting degree-based body-leg and leg-leg coordination into normalized phase offsets, improving gait consistency, interpretability, and cross-condition comparability.",
      "Executed 46 OptiTrack-tracked physical trials with IR-marker 3D kinematics to characterize performance across multiple coordination regimes.",
      "Built data-processing and validation workflows to analyze 3D kinematic datasets and compare robot behavior across parameter configurations.",
      "Improved mechanical and system performance by refining servo-mount clearances, gear spacing, cable routing, obstacle-field geometry, and electronics enclosure design."
    ]
  },
  {
    id: "mfe-education",
    role: "IoT Systems Intern",
    company: "MFE Education",
    location: "Shanghai, China",
    period: "Jun. 2024 – Jul. 2024",
    type: "Industry Internship",
    featured: false,
    skills: ["IoT", "Huawei Cloud", "API Design", "Developer Onboarding", "Python / C++"],
    summary: "Engineered an IoT device communication library enabling instant cloud dashboard visualization in under 10 lines of code.",
    bulletPoints: [
      "Developed an IoT device communication library enabling cloud visualization through Huawei Astro Dashboard APIs.",
      "Reduced setup time by 50% by writing streamlined onboarding documentation focused on usability and clear developer workflows.",
      "Designed the library to take users from sensor setup to real-time cloud visualization in under 10 lines of code.",
      "Collaborated with 70+ users to test, refine, and integrate the framework into real-world IoT projects."
    ]
  }
];

export const projects = [
  {
    id: "circuit-sensei",
    title: "Circuit Sensei",
    subtitle: "AI Hardware Agent for Circuit Design & Verification",
    period: "Apr. 2026",
    category: "ai-vision",
    categories: ["ai-vision", "embedded", "robotics"],
    badge: "AI Hardware Agent",
    award: null,
    featured: true,
    tech: ["Gemini Vision", "Gemma", "Arduino", "Python", "Serial Comm", "Computer Vision", "Closed-Loop Verification"],
    image: null,
    demoLink: null,
    githubLink: "https://github.com/ycjohnp",
    description: "An intelligent AI hardware agent that transforms natural-language circuit specifications into verified, physically working Arduino circuits through closed-loop computer vision and automated electrical tests.",
    details: [
      "Transforms high-level natural-language circuit goals into full schematic designs and step-by-step breadboard assembly diagrams.",
      "Developed an AI-in-the-loop workflow using Gemma and Gemini Vision to observe breadboard assembly via webcam in real-time, verifying individual component and wire placement before allowing progression.",
      "Closed the physical loop by automatically generating validated Arduino C++ firmware, compiling and flashing it over serial, and executing electrical validation routines to confirm complete hardware functionality."
    ],
    highlights: [
      { label: "Vision Models", value: "Gemini Vision & Gemma" },
      { label: "Verification", value: "Closed-Loop Webcam & Serial" },
      { label: "Target Platform", value: "Arduino / Breadboard Circuits" }
    ]
  },
  {
    id: "cove-robotic-arm",
    title: "Cove — 7-DOF Robotic Arm",
    subtitle: "Robotics Control Architecture & Safety Systems",
    period: "Feb. 2026 – Present",
    category: "robotics",
    categories: ["robotics", "embedded"],
    badge: "Terra Labs",
    award: null,
    featured: true,
    tech: ["ROS 2", "CAN Bus", "Raspberry Pi 5", "BLDC Actuators", "Gazebo", "MoveIt", "URDF", "E-Stop Safety"],
    image: null,
    demoLink: null,
    githubLink: "https://github.com/ycjohnp",
    description: "Complete control and safety architecture for a 7-DOF robotic manipulator arm integrating ROS 2, Raspberry Pi 5, and CAN-based BLDC actuators with simulation and motion planning.",
    details: [
      "Designed control architecture for a 7-DOF robotic arm utilizing ROS 2, Raspberry Pi 5, and CAN-based BLDC actuators.",
      "Implemented hardware/software integration for ROS 2 control, CAN actuator communication, and robotic arm subsystem bring-up.",
      "Developed ROS 2 interfaces for /joint_states, /target_joints, and /estop_event, linking high-level software commands to actuator-level control.",
      "Implemented a comprehensive hardware/software e-stop system with heartbeat timeout, torque cutoff, and ROS 2 fault monitoring.",
      "Built complete robot URDF with joint dynamics, transmission tags, and collision geometry for Gazebo simulation and MoveIt motion planning integration."
    ],
    highlights: [
      { label: "Degrees of Freedom", value: "7-DOF Manipulator" },
      { label: "Control Bus", value: "CAN-based BLDC Actuators" },
      { label: "Safety System", value: "Hardware & Software E-Stop" },
      { label: "Simulation", value: "URDF, MoveIt, Gazebo" }
    ]
  },
  {
    id: "vyz-headset",
    title: "Vyz — AI Sensory Adaptation Headset",
    subtitle: "Real-Time Sensory Regulation for Neurodivergent Individuals",
    period: "Oct. 2025",
    category: "ai-vision",
    categories: ["ai-vision", "embedded", "robotics"],
    badge: "🏆 Hackathon Winner",
    award: "Best Hardware Project — LA TechWeek Good Vibes Only / AI/ML Buildathon",
    featured: true,
    tech: ["NVIDIA Jetson Orin Nano", "OpenCV", "SciPy", "Flask API", "Multithreading", "Servo Control", "Adaptive LEDs", "GPT-3.5"],
    image: "https://raw.githubusercontent.com/RakshetaK/GVO-Repo/main/Images/vyz-physical-wearable.JPG",
    secondaryImage: "https://raw.githubusercontent.com/RakshetaK/GVO-Repo/main/Images/vyz-compute-box.JPG",
    demoLink: null,
    githubLink: "https://github.com/RakshetaK/GVO-Repo",
    description: "Award-winning Jetson-powered sensory-regulation XR headset that monitors visual and auditory environments in real time to adaptively tint visor servos, filter audio, and modulate ambient lighting.",
    details: [
      "Engineered a multithreaded Python architecture on NVIDIA Jetson Orin Nano with concurrent OpenCV brightness tracking, SciPy-based real-time audio filtering/compression, and a Flask API layer.",
      "Fabricated custom wire harnesses and managed power distribution between a high-power servo visor, adaptive LED arrays, and sensitive sensor subsystems.",
      "Implemented an AI-driven intervention engine that fuses sensor data and triggers LLM parameter selection, achieving under 200 ms latency through shared-state designs optimized for responsiveness."
    ],
    highlights: [
      { label: "Award", value: "Best Hardware Project (LA TechWeek)" },
      { label: "Latency", value: "< 200 ms End-to-End" },
      { label: "Edge Compute", value: "NVIDIA Jetson Orin Nano" }
    ]
  },
  {
    id: "skatemo",
    title: "SkateMo: Autonomous Self-Driving Skateboard",
    subtitle: "Perception, Path Planning & BLDC Motor Firmware",
    period: "Aug. 2025 – May 2026",
    category: "robotics",
    categories: ["robotics", "embedded", "ai-vision"],
    badge: "Project Manager & Lead",
    award: null,
    featured: true,
    tech: ["OpenCV", "YOLO", "Sensor Fusion", "BLDC Motor Control", "FSM Path Planning", "IMU", "Firmware"],
    image: null,
    demoLink: null,
    githubLink: "https://github.com/ycjohnp",
    description: "An autonomous electric skateboard built by a 6-member engineering team featuring real-time vision-based obstacle avoidance, IMU sensor fusion, and custom BLDC motor control firmware.",
    details: [
      "Led full-system architecture and cross-module integration across perception, embedded, electrical, and mechanical sub-teams.",
      "Built real-time obstacle avoidance and path-planning logic using OpenCV and YOLO object detection fused with 6-DoF IMU data.",
      "Designed a Finite State Machine (FSM) tailored to skateboard steering kinematics, handling lean angle, speed regulation, and turning radius.",
      "Developed BLDC motor control firmware with active current limiting, smooth acceleration curves, and fail-safe braking."
    ],
    highlights: [
      { label: "Team Size", value: "6 Multidisciplinary Engineers" },
      { label: "Perception", value: "YOLO + OpenCV + IMU Fusion" },
      { label: "Firmware", value: "Custom BLDC Speed & Torque Control" }
    ]
  },
  {
    id: "modular-robot",
    title: "Self-Assembling Modular Robot System",
    subtitle: "Swarm Robotics & Autonomous Mechanical Reconfiguration",
    period: "Independent Research",
    category: "robotics",
    categories: ["robotics", "embedded"],
    badge: "Independent Research",
    award: null,
    featured: true,
    tech: ["ESP32", "PID Control", "AprilTags", "Computer Vision", "Electromagnets", "4-DoF Kinematics", "Swarm Logic"],
    image: "https://raw.githubusercontent.com/john02px/modular-robot/main/modular-robot/Project%20Photos/Multi%20Module.JPG",
    youtubeId: "8HDp2pXij3Y",
    demoLink: "https://www.youtube.com/watch?v=8HDp2pXij3Y",
    githubLink: "https://github.com/john02px/modular-robot",
    description: "A fully autonomous modular robotic platform where individual 4-DoF units locate, attach, and reconfigure themselves using electromagnetic connection interfaces and AprilTag computer vision.",
    details: [
      "Engineered 4-DoF robotic module mechanisms equipped with dynamic electromagnetic coupling interfaces for active latching and detachment.",
      "Implemented closed-loop PID control on ESP32 microcontrollers for precise multi-axis joint positioning and docking alignment.",
      "Developed AprilTag-based fiducial computer vision algorithms for autonomous inter-module relative localization, approach trajectories, and self-assembly."
    ],
    highlights: [
      { label: "Degrees of Freedom", value: "4-DoF Per Module" },
      { label: "Docking Interface", value: "Electromagnetic Coupling" },
      { label: "Localization", value: "AprilTags + Real-Time Vision" }
    ]
  },
  {
    id: "karate-kid",
    title: "Karate Kid: Interactive Training Wearable",
    subtitle: "Custom PCB, Motion Tracking & Real-Time Haptic Feedback",
    period: "Feb. 2025 – May 2025",
    category: "embedded",
    categories: ["embedded", "hardware"],
    badge: "Wireless Systems Lead",
    award: null,
    featured: true,
    tech: ["KiCad", "Custom PCB", "ESP32", "MPU6050 IMU", "Unity 3D", "UDP/TCP", "PCBA", "MOSFET Haptics"],
    image: null,
    demoLink: null,
    githubLink: "https://github.com/ycjohnp",
    description: "A wireless motion-tracking wearable with custom PCB design, ultra-low-latency wireless communication, and real-time haptic feedback mapped into Unity 3D skeletons for martial arts training.",
    details: [
      "Designed and routed a custom 2-layer PCB in KiCad integrating ESP32, 6-DoF MPU6050 IMU, and MOSFET-driven vibration motor circuits.",
      "Conducted detailed component trade studies selecting power regulators and switching MOSFETs optimized for thermal performance and minimal latency.",
      "Developed firmware streaming quaternion data over UDP/TCP mapped directly to 3D game skeletons in Unity.",
      "Managed complete prototype PCBA manufacturing workflow: BOM sourcing, stencil ordering, and reflow soldering."
    ],
    highlights: [
      { label: "PCB Design", value: "Custom 2-Layer Board in KiCad" },
      { label: "Sensors", value: "6-DoF IMU (MPU6050)" },
      { label: "Feedback", value: "MOSFET-Driven Haptics" }
    ]
  },
  {
    id: "iot-smart-room",
    title: "IoT Smart Room Control System",
    subtitle: "Distributed Master-Slave Vision & Actuation Architecture",
    period: "EE250 Final Project",
    category: "embedded",
    categories: ["embedded", "ai-vision"],
    badge: "EE250 Course Project",
    award: null,
    featured: false,
    tech: ["Raspberry Pi 4", "Arduino Uno", "YOLOv3-Tiny", "UART Protocol", "Python", "Web Dashboard", "IoT"],
    image: "https://raw.githubusercontent.com/NamithGang/EE250FinalProject/refs/heads/main/overall_diagram.png",
    demoLink: null,
    githubLink: "https://github.com/NamithGang/EE250FinalProject",
    description: "An automated environment management system utilizing a distributed Master-Slave architecture combining edge computer vision and embedded actuation.",
    details: [
      "Architected a distributed system pairing Raspberry Pi 4 (Master/Vision Node) with Arduino Uno (Slave/Actuator Node) via custom UART messaging.",
      "Deployed YOLOv3-Tiny for real-time human occupancy and room zone tracking.",
      "Created an interactive web dashboard for monitoring occupancy stats and overriding environment controls."
    ],
    highlights: [
      { label: "Architecture", value: "Distributed Master-Slave" },
      { label: "Vision", value: "YOLOv3-Tiny Edge Detection" },
      { label: "Communication", value: "Custom UART Protocol" }
    ]
  },
  {
    id: "braille-embosser",
    title: "Camshaft-Powered Braille Embosser",
    subtitle: "Low-Cost, Ultra-Quiet Assistive Technology",
    period: "Independent Research",
    category: "hardware",
    categories: ["hardware", "embedded"],
    badge: "Independent Research",
    award: null,
    featured: false,
    tech: ["Camshaft Kinematics", "Mechanical Prototyping", "Embedded Control", "Acoustic Engineering", "Cost Optimization"],
    image: "https://raw.githubusercontent.com/john02px/braille-embosser/main/Project%20Images%20and%20Diagrams/Machine%20Picture%20(with%20banana%20for%20scale).jpg",
    demoLink: null,
    githubLink: "https://github.com/john02px/braille-embosser",
    description: "A novel camshaft-driven braille embosser providing a high-precision, ultra-quiet (<60dB) alternative to expensive commercial embossers at ~90% cost reduction.",
    details: [
      "Engineered a novel camshaft stamping mechanism drastically reducing acoustic noise below 60 dB compared to loud solenoid embossers.",
      "Achieved consistent dot height tolerance of ±0.12 mm meeting international braille standards.",
      "Reduced total bill of materials cost to ~$160 USD, compared to $2,000+ commercial solutions, dramatically improving accessibility."
    ],
    highlights: [
      { label: "Cost Reduction", value: "~$160 USD (vs $2,000+ commercial)" },
      { label: "Acoustic Level", value: "< 60 dB Quiet Operation" },
      { label: "Dot Height Precision", value: "±0.12 mm Tolerance" }
    ]
  },
  {
    id: "temp-monitor",
    title: "Embedded Temperature Monitor",
    subtitle: "Bare-Metal Sensor Interfacing & Interrupt Alerts",
    period: "Spring 2025",
    category: "embedded",
    categories: ["embedded", "hardware"],
    badge: "USC Embedded Project",
    award: null,
    featured: false,
    tech: ["C/C++", "DS18B20", "EEPROM", "PWM", "Timers & Interrupts", "UART", "LCD Interface", "Rotary Encoder"],
    image: null,
    demoLink: null,
    githubLink: "https://github.com/ycjohnp",
    description: "A comprehensive embedded monitoring system featuring 1-Wire temperature acquisition, EEPROM threshold persistence, PWM servo actuation, and interrupt-driven alerts.",
    details: [
      "Interfaced DS18B20 digital temperature sensor, LCD alphanumeric display, rotary encoder, RGB LED, and servo motor.",
      "Implemented hardware timer interrupts, non-volatile EEPROM storage for high/low thresholds, and PWM-based alerts.",
      "Structured bare-metal modular C code with UART serial command interface for configuration."
    ],
    highlights: [
      { label: "Sensor", value: "DS18B20 1-Wire Digital" },
      { label: "Memory", value: "EEPROM Persistent Thresholds" },
      { label: "Peripherals", value: "PWM, Timers, Interrupts, UART" }
    ]
  }
];

export const skillCategories = [
  {
    name: "Languages",
    icon: "Code",
    description: "Core programming and hardware description languages",
    skills: ["Python", "C/C++", "C", "Java", "MATLAB", "Verilog", "SQL", "Shell / Bash"]
  },
  {
    name: "Hardware & PCB Design",
    icon: "Cpu",
    description: "EDA tools, board layout, and prototype manufacturing",
    skills: ["Altium Designer", "KiCad", "EasyEDA", "Schematic Capture", "PCB Layout", "BOM Management", "PCBA", "Component Selection", "SMD Soldering", "Reflow Assembly"]
  },
  {
    name: "Embedded Systems & Firmware",
    icon: "Microchip",
    description: "Microcontrollers, RTOS, and low-level firmware engineering",
    skills: ["Embedded Linux", "Firmware Debugging", "Computer Architecture", "Hardware/Software Integration", "RTOS", "System Validation", "BLDC Motor Control", "PID Control", "ESP32", "Arduino", "Raspberry Pi 5", "NVIDIA Jetson"]
  },
  {
    name: "Robotics & Controls",
    icon: "Bot",
    description: "Kinematics, dynamics, motion planning, and robot middleware",
    skills: ["ROS", "ROS 2", "Gazebo", "MoveIt", "URDF", "Robotic Actuators / Joint Motors", "Motion Control", "OptiTrack Kinematics", "AprilTags"]
  },
  {
    name: "Communication Protocols",
    icon: "Network",
    description: "Industrial, serial, and networking protocols",
    skills: ["CAN Bus", "USB", "Ethernet", "I2C", "SPI", "UART", "TCP/IP", "UDP", "BLE (Bluetooth Low Energy)"]
  },
  {
    name: "AI/ML, Vision & Software",
    icon: "Brain",
    description: "Deep learning, LLMs, knowledge graphs, and computer vision",
    skills: ["PyTorch", "LangChain", "LLM APIs (Gemini, GPT)", "Vector Databases", "Knowledge Graph RAG (KuzuDB)", "Semantic Search", "OpenCV", "YOLO", "Flask", "REST APIs", "Firebase", "Pandas", "SciPy"]
  },
  {
    name: "Lab, Debugging & Instrumentation",
    icon: "Wrench",
    description: "Bench testing tools and verification workflows",
    skills: ["Oscilloscopes", "Logic Analyzers", "Multimeters", "Hardware Bring-up", "Board-Level Verification", "Test Automation", "Calibration Workflows"]
  },
  {
    name: "Tools & Leadership",
    icon: "GitBranch",
    description: "Engineering workflows and organizational execution",
    skills: ["Git / GitHub", "Docker", "Linux Shell", "Agile / Scrum", "Sprint Planning", "Technical Documentation", "Cross-Functional Technical Leadership"]
  }
];

export const projectFilters = [
  { id: "all", label: "All Projects" },
  { id: "robotics", label: "Robotics & Controls" },
  { id: "embedded", label: "Embedded & PCB" },
  { id: "ai-vision", label: "AI & Vision" },
  { id: "hardware", label: "Hardware & Mechanical" }
];
