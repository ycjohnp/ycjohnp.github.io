---
title: Scrambler
tagline: Passive climbing hand for a humanoid
summary: A motorless hand that lets a Unitree G1 drop to all fours and scramble up terrain. I built FlexSense, its camera-based grip sensing. We placed second.
context: Himalaya Robotics Hack, 2026
order: 5
featured: true
cover: ../../assets/projects/scrambler/full-hand.jpg
coverAlt: The Scrambler hand, with ArUco markers on each black finger and a blue wrist cuff
video:
  src: media/scrambler-live-tool.mp4
  poster: media/scrambler-live-tool-poster.jpg
  caption: FlexSense running live, flagging a finger that bends backward
gallery:
  - src: ../../assets/projects/scrambler/full-hand.jpg
    alt: The Scrambler hand, with ArUco markers on each black finger and a blue wrist cuff
    caption: The hand, with markers on every finger
facts:
  - label: My part
    value: FlexSense, the grip-sensing system
  - label: Result
    value: 2nd place, Himalaya Robotics Hack 2026
  - label: Built in
    value: 36 hours
  - label: Stack
    value: Python, OpenCV, NumPy, LeRobot SO-101
links:
  - label: Code on GitHub
    href: https://github.com/ycjohnp/aruco-compliant-hand
---

Scrambler is a fully passive climbing hand for the Unitree G1. It lets the humanoid drop to all fours and scramble up terrain steeper than it can walk, with no added motors, wiring or firmware. TPU Fin Ray fingers turn the robot's weight into grip.

![The hand mounted on a test arm at the hackathon, next to a brick](../../assets/projects/scrambler/test-setup.jpg)
![Side view of one compliant Fin Ray finger](../../assets/projects/scrambler/finger-side-view.png)
*Left: the test setup at the hackathon. Right: one compliant finger from the side.*

## FlexSense: my part

A passive hand has no sensors, so the robot can't tell whether it's actually gripping. FlexSense fixes that with no electronics in the hand at all: ArUco markers on each finger, tracked by a wrist camera, measured against a reference marker on the cuff.

![CAD view from the camera's position, showing numbered markers on each finger and a reference marker on the cuff](../../assets/projects/scrambler/marker-layout.png)
![The real hand seen from the wrist camera](../../assets/projects/scrambler/camera-pov.jpg)
*Left: the marker layout, designed from the camera's point of view. Right: what the camera actually sees.*

- **Pose estimation.** Full 6-DoF marker tracking, with the IPPE pose ambiguity resolved from frame to frame.
- **Calibration.** Calibrating against an animated target on a screen worked better than a printed ChArUco board.
- **Simulation.** A co-rotational Euler-Bernoulli FEM solver with a Yeoh hyperelastic TPU model predicts how a finger bends under load.
- **Live tool.** Classifies each finger as wrapping, neutral, or bending back, and draws the bent CAD over the camera view. 123 unit tests.

![FlexSense live view tracking markers on three fingers, with each finger classified](../../assets/projects/scrambler/hud.png)
*The live tool: each finger's bend angle, with a side-view sketch in the corner.*

![The Scrambler team standing in front of a projected Scrambler slide](../../assets/projects/scrambler/team.jpg)
*The Scrambler team after presenting.*
