export const resumeText = `YIK CHUN JOHN PENG
Los Angeles, CA | Chicago, IL | (213) 994-0547 | johnpeng@usc.edu
linkedin.com/in/yc-john-peng | github.com/ycjohnp

============================================================
EDUCATION
============================================================
University of Southern California | Los Angeles, CA
Bachelor of Science, Electrical and Computer Engineering
Expected Graduation: Dec. 2027
GPA: 3.61
Relevant Coursework: Data Structures and Algorithms, Distributed Systems, IoT, Embedded Systems, Linear Circuits, Proof-Based Linear Algebra, Digital Logic and RTL Design

============================================================
TECHNICAL SKILLS
============================================================
• Languages: Python, C/C++, Java, MATLAB, Verilog, SQL, C
• Embedded Systems: Linux, embedded systems, firmware debugging, computer architecture, hardware/software integration, RTOS, system validation
• Robotics: ROS, ROS 2, Raspberry Pi, ESP32, NVIDIA Jetson, robotic actuators, joint motors, motion control, PID control, Gazebo, MoveIt
• Communication Protocols: CAN, USB, Ethernet, serial communication, I2C, SPI, UART, TCP/IP, BLE
• AI/ML & Software: PyTorch, LangChain, LLM APIs, vector databases, semantic search, OpenCV, YOLO, Flask, REST APIs, Firebase, Pandas
• Hardware Design: Altium, KiCad, EasyEDA, schematic capture, PCB layout, BOM management, PCBA, component selection, soldering, reflow assembly
• Lab & Debugging: Oscilloscopes, logic analyzers, multimeters, hardware bring-up, board-level verification, test automation, calibration workflows
• Tools & Workflow: Git/GitHub, Docker, Linux shell, Agile/Scrum, sprint planning, documentation, cross-functional technical leadership

============================================================
TECHNICAL EXPERIENCE
============================================================
SRAM | Advanced Development Engineering Intern | Chicago, IL
Jun. 2026 – Aug 2026
• Design compact PCBs in Altium for AC-signal handling, balancing electrical performance, cost, manufacturability, and supply-chain constraints.
• Support PCBA workflows including component selection, prototype assembly, board bring-up, electrical debugging, and design iteration.
• Work across firmware and Android app development for resource-constrained devices, contributing to embedded product functionality and hardware/software integration.
• Help bring an advanced-development product from early prototype work toward production handoff through documentation, manufacturability review, and technical transition materials.

USC Makers | Director of Technical Resources | Los Angeles, CA
May 2026 – Present
• Lead technical resource development for a 100+ member engineering club, organizing materials, tutorials, documentation, and institutional knowledge.
• Build Confluence-inspired databases and knowledge-sharing systems to improve access to club resources, past project information, technical guides, and onboarding materials.
• Index club resources across hardware, software, materials, tutorials, and project documentation to reduce repeated work and improve technical continuity across teams.
• Support company outreach and sponsorship development by aligning club needs with engineering-industry partners and potential sponsors.

USC Makers (SkateMo Autonomous Skateboard) | Technical Project Lead / Project Manager | Los Angeles, CA
Aug. 2025 – May 2026
• Led a multidisciplinary team building an autonomous self-driving skateboard, owning perception, navigation, and embedded-control integration.
• Built real-time obstacle avoidance and path-planning logic using OpenCV and YOLO with camera/IMU fusion.
• Designed skateboard-like steering dynamics and controllable torque/turning geometry for autonomous navigation.
• Coordinated cross-module integration across perception, embedded, electrical, and mechanical systems.
• Ran design reviews and integration testing to align subsystem development, resolve technical issues, and de-risk full-system bring-up.

Manycore Tech | Machine Learning Engineer Intern, LLM/RAG | Hangzhou, China
May 2025 – Jul. 2025
• Built a knowledge-graph-augmented RAG pipeline using Alibaba Bailian and KuzuDB, improving retrieval relevance by 40% and reducing system latency by 20% through optimized graph queries and vector-database integration.
• Developed LangChain agents for KG-driven contextual reasoning and multi-hop retrieval, enabling evidence assembly across graph nodes and semantic search outputs.
• Implemented a high-performance KnowledgeGraph module supporting fast CSV ingestion, schema construction, relationship generation, and efficient traversal operations.
• Engineered a unified retrieval pipeline combining vector search, KG neighbor expansion, semantic filtering, and deduplication.
• Documented system architecture, data flow, retrieval logic, and performance-tuning strategies for scalable deployment.
• Containerized components with Docker for reproducible development and consistent runtime behavior across environments.

Robot Locomotion and Navigation Dynamics Laboratory | Undergraduate Researcher | Los Angeles, CA
Aug. 2024 – Present
• Conduct research on multi-legged robot locomotion, analyzing body-leg phase coordination and controlled leg-obstacle interactions in cluttered or confined environments.
• Redesigned phase-control algorithms by converting degree-based body-leg and leg-leg coordination into normalized phase offsets, improving gait consistency, interpretability, and cross-condition comparability.
• Executed 46 OptiTrack-tracked physical trials with IR-marker 3D kinematics to characterize performance across multiple coordination regimes.
• Built data-processing and validation workflows to analyze 3D kinematic datasets and compare robot behavior across parameter configurations.
• Improved mechanical and system performance by refining servo-mount clearances, gear spacing, cable routing, obstacle-field geometry, and electronics enclosure design.

MFE Education | IoT Systems Intern | Shanghai, China
Jun. 2024 – Jul. 2024
• Developed an IoT device communication library enabling cloud visualization through Huawei Astro Dashboard APIs.
• Reduced setup time by 50% by writing streamlined onboarding documentation focused on usability and clear developer workflows.
• Designed the library to take users from sensor setup to real-time cloud visualization in under 10 lines of code.
• Collaborated with 70+ users to test, refine, and integrate the framework into real-world IoT projects.

============================================================
PROJECT EXPERIENCE
============================================================
Circuit Sensei – AI Hardware Agent for Circuit Design and Verification (Apr. 2026)
• Built an AI hardware agent that transforms a natural-language circuit goal into a physically tested Arduino circuit.
• Developed an AI-in-the-loop workflow using Gemma and Gemini Vision to generate step-by-step breadboard diagrams, verify each component placement through a webcam, and prevent users from progressing until the circuit is assembled correctly.
• Closed the loop between software and hardware by automatically generating Arduino code, uploading it over serial, and performing electrical tests to validate the completed circuit.

Cove – 7-DOF Robotic Arm | Terra Labs, Robotics Engineer (Feb. 2026 – Present)
• Designed control architecture for a 7-DOF robotic arm using ROS 2, Raspberry Pi 5, and CAN-based BLDC actuators.
• Implemented hardware/software integration for ROS 2 control, CAN actuator communication, and robotic arm subsystem bring-up.
• Developed ROS 2 interfaces for /joint_states, /target_joints, and /estop_event, linking high-level software commands to actuator-level control.
• Implemented a hardware/software e-stop system with heartbeat timeout, torque cutoff, and ROS 2 fault monitoring.
• Built robot URDF with joint dynamics, transmission tags, and collision geometry for Gazebo and MoveIt integration.

Vyz – Sensory Adaptation Headset | Winner: Best Hardware Project, LA TechWeek (Oct. 2025)
• Designed and built a Jetson-powered sensory-regulation XR headset that detects and mitigates visual and auditory overstimulation in real time.
• Engineered a multithreaded Python architecture with concurrent OpenCV brightness tracking, SciPy audio filtering, and Flask API.
• Fabricated wire harnesses and managed power distribution for servo visor and adaptive LEDs.
• Implemented an AI-driven intervention engine triggering LLM parameter selection with <200ms latency.

Karate Kid – Interactive Karate-Training Wearable | Wireless Systems Lead (Feb. 2025 – May 2025)
• Designed and laid out custom 2-layer PCB in KiCad integrating ESP32, 6-DoF IMU, and MOSFET-driven haptic motors.
• Conducted component trade studies for thermal efficiency and low-latency actuation.
• Developed firmware to map IMU quaternion data to 3D game skeletons in Unity.
• Managed full PCBA manufacturing process: BOM, stencil ordering, and reflow soldering.

Embedded Temperature Monitor | USC Embedded Systems Project (Spring 2025)
• Built an embedded monitoring system using DS18B20 sensor, LCD interface, RGB LED, rotary encoder, servo, and UART.
• Implemented timer-based control, EEPROM threshold storage, PWM output, and interrupts.

Camshaft-Powered Braille Embosser | Independent Research
• Low-cost (~$160 USD), quiet (<60dB) alternative braille embosser using novel camshaft design, ±0.12mm tolerance.

Self-Assembling Modular Robot System | Independent Research
• 4-DoF autonomous modular robotic platform with electromagnetic coupling, ESP32 PID control, and AprilTags vision.

IoT Smart Room Control System | EE250 Final Project
• Distributed Master-Slave architecture (Raspberry Pi 4 Master + Arduino Uno Slave), YOLOv3-Tiny vision, UART protocol.
`;
