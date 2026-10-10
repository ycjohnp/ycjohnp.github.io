---
title: Circuit Sensei
tagline: AI tutor for breadboard builds
summary: An AI agent that walks you through a breadboard build and won't let you move on until a webcam confirms each part is in the right place.
context: LA Hacks, 2026
order: 6
featured: true
cover: ../../assets/projects/circuit-sensei/app.png
coverAlt: Circuit Sensei showing a breadboard layout, assembly instructions and the agent chat
gallery:
  - src: ../../assets/projects/circuit-sensei/app.png
    alt: Circuit Sensei showing a breadboard layout, assembly instructions and the agent chat
    caption: Building and testing an LED circuit step by step
facts:
  - label: Event
    value: LA Hacks 2026
  - label: Stack
    value: Gemini 2.5, FastAPI and WebSockets, React, ElevenLabs, Arduino Uno
---

Describe a circuit in plain language, and Circuit Sensei walks you to a working Arduino build.

- **Plan and guide.** Generates a build plan and draws step-by-step breadboard diagrams.
- **Verify.** Checks each part through a webcam with Gemini Vision, and won't continue until the step is right.
- **Test.** Generates Arduino code, uploads it over serial, and runs electrical tests on the finished circuit. Build and test steps alternate, so mistakes show up where they happen.

The Arduino runs a small JSON command interpreter over USB serial, which is how the agent drives the tests.

![Flow diagram of the Circuit Sensei agent, from the user's request through planning, verification and testing](../../assets/projects/circuit-sensei/architecture.png)
*How the agent moves from a request to a tested circuit.*
