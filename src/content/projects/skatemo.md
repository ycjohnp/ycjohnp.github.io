---
title: SkateMo
tagline: Self-driving skateboard
summary: A self-driving skateboard. I led the six-person team and handled integration across perception, navigation and motor control.
context: USC Makers, 2025 to 2026
order: 7
featured: true
cover: ../../assets/projects/skatemo/team.jpg
coverAlt: The SkateMo team holding the skateboard
gallery:
  - src: ../../assets/projects/skatemo/team.jpg
    alt: The SkateMo team holding the skateboard
    caption: The SkateMo team
facts:
  - label: Role
    value: Technical project lead
  - label: When
    value: August 2025 to May 2026
  - label: Team
    value: Six people across electrical, mechanical and software
  - label: Stack
    value: OpenCV, YOLO, IMU and camera fusion, BLDC motor control
sketches: [makers-rocket, gear-pair]
---

SkateMo is a skateboard that drives itself to a destination you pick, avoiding obstacles along the way.

- **Perception.** OpenCV and YOLO obstacle detection, fused with camera and IMU data.
- **Planning.** A state-machine path planner built around how a skateboard steers.
- **Control.** BLDC motor firmware for speed, current limiting and direction.
- **Safety.** A phone app for start and stop, manual override, and an emergency stop, so a rider can take over at any time.
- **Integration.** I ran design reviews and full-system tests across all the subsystems.
