---
title: Modular robots
tagline: Self-assembling delivery robots
summary: Robot modules that find each other, lock together with electromagnets, and reconfigure to move cargo. Built before college to make deliveries more resilient.
context: Independent research, 2022 to 2023
order: 8
featured: true
cover: ../../assets/projects/modular-robots/modules.jpg
coverAlt: Three modular robots, one stacked on top of two others
gallery:
  - src: ../../assets/projects/modular-robots/modules.jpg
    alt: Three modular robots, one stacked on top of two others
  - src: ../../assets/projects/modular-robots/single-module.jpg
    alt: A single module with its gear rings and electronics exposed
facts:
  - label: Hardware
    value: 4-DoF wheeled modules with electromagnetic connectors, ESP32, custom extension PCB
  - label: Control
    value: AprilTags and OpenCV for localization, PID for positioning, ESP-NOW from computer to modules
  - label: Design tools
    value: Fusion 360, EasyEDA
  - label: Results
    value: 339 N connection strength, 0.2 m/s
  - label: Awards
    value: First Award in Embedded Systems at Regeneron ISEF 2023, and a top award at the EU Contest for Young Scientists
links:
  - label: Code and design files
    href: https://github.com/ycjohnp/self-assembling-modular-robots
  - label: Demo video
    href: https://www.youtube.com/watch?v=8HDp2pXij3Y
---

## Why I built it

In spring 2022, Shanghai went into a three-month lockdown. For weeks it was hard to get food or supplies delivered, because the people who run logistics couldn't go to work. I started asking how delivery networks could keep working when that happens.

A lot of what I read pointed to flexibility and adaptability, and modular robots have both. Most modular robotics research was aimed at search and rescue or static structures, so I wanted to see whether robots that solve problems together could make logistics more reliable and less dependent on people.

## How it works

Each module has four degrees of freedom, drives on wheels, and connects to its neighbors with electromagnets. A computer tracks every module with AprilTags and OpenCV and sends commands over ESP-NOW. On each module an ESP32 runs PID control to position it precisely.

![Four modules locked together into one larger robot](../../assets/projects/modular-robots/assembled.jpg)
![CAD render of a single module](../../assets/projects/modular-robots/module-cad.png)
*Left: four modules assembled into one robot. Right: the module in CAD.*

## Drawings and electronics

The frame and gears have full 2D drawings, and a custom extension board carries the module's electronics.

![2D drawing of the center frame](../../assets/projects/modular-robots/center-frame-dwg.png)
![2D drawing of the bevel gear halves](../../assets/projects/modular-robots/gears-dwg.png)
![Front copper layer of the extension board](../../assets/projects/modular-robots/pcb-front.png)
*The center frame, the bevel gear halves, and the extension board's front copper.*

## Testing

I tested how fast the robots move in different assembled configurations, how fast they move carrying cargo, and how strong the connections between modules are. I also built obstacle setups to test whether the system could assemble itself to get through them.

The modules move at 0.2 m/s, and the electromagnetic connections between them hold up to 339 N.

## Awards

The project won First Award in Embedded Systems at Regeneron ISEF in 2023. ISEF then sent me to represent it at the EU Contest for Young Scientists, where the project won a top award.
