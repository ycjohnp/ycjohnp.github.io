---
title: Vyz
tagline: Sensory-adaptation headset
summary: A Jetson-powered headset that notices when light and sound get overwhelming, and dims them. It won Best Hardware.
context: LA TechWeek buildathon, 2025
order: 9
cover: ../../assets/projects/vyz/wearable.jpg
coverAlt: The Vyz wearable, a cap fitted with a servo and a flip-down glasses frame
gallery:
  - src: ../../assets/projects/vyz/wearable.jpg
    alt: The Vyz wearable, a cap fitted with a servo and a flip-down glasses frame
    caption: The wearable
  - src: ../../assets/projects/vyz/compute-box.jpg
    alt: The Vyz compute box, with a battery pack and boards wired together in a tray
    caption: The compute box
facts:
  - label: Result
    value: Hardware Project Winner, LA TechWeek AI/ML Buildathon
  - label: Stack
    value: NVIDIA Jetson Orin Nano, Python, OpenCV, SciPy, Flask
---

Vyz detects visual and auditory overstimulation in real time and responds with a servo-driven visor and adaptive lights.

- **Hardware.** I built the wire harnesses and power distribution for the servo visor, LEDs and sensors.
- **Software.** Multithreaded Python with OpenCV brightness tracking, real-time SciPy audio filtering, and a Flask API to external inference.
- **Response.** An intervention engine picks settings, with end-to-end latency under 200 ms.
