---
title: Karate Kid
tagline: Motion-tracking training wearable
summary: A motion-tracking wearable for martial-arts training, on a custom ESP32 board I designed and assembled.
context: USC Makers, spring 2025
order: 10
cover: ../../assets/projects/karate-kid/pcb.jpg
coverAlt: The Karate Kid board, with an ESP32 Feather, an MPU-6050 IMU and a vibration motor on a USC Makers PCB
gallery:
  - src: ../../assets/projects/karate-kid/pcb.jpg
    alt: The Karate Kid board, with an ESP32 Feather, an MPU-6050 IMU and a vibration motor on a USC Makers PCB
    caption: The board, with the ESP32, IMU and a MOSFET driving the haptic motor
  - src: ../../assets/projects/karate-kid/team.jpg
    alt: The Karate Kid team in USC Makers shirts, holding up the boards
    caption: The Karate Kid team at USC Makers
facts:
  - label: Role
    value: Embedded systems engineer and wireless systems lead
  - label: Stack
    value: ESP32, 6-DoF IMU, KiCad, reflow assembly, Unity
---

Wearable motion trackers stream to a central receiver and drive a 3D skeleton in a training game.

- **PCB.** A two-layer KiCad board with an ESP32, a 6-DoF IMU, and MOSFET-driven haptic motors.
- **Firmware.** Maps IMU quaternions onto a Unity skeleton, with the wearables sending to a central ESP32 receiver.
- **Manufacturing.** BOM, stencil ordering and reflow assembly for the prototype run.
