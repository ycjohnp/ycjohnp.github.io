---
title: ID0
tagline: Robot that makes its own tools
summary: A robot that works out what tool a task needs, designs it, 3D prints it, and mounts it on itself. Built in about 36 hours at YC's RoboHacks.
context: YC RoboHacks, 2026
order: 4
featured: true
cover: ../../assets/projects/id0/robot-and-tools.jpg
coverAlt: The ID0 robot next to a vase holding a flower, with printed tools on the floor
gallery:
  - src: ../../assets/projects/id0/robot-and-tools.jpg
    alt: The ID0 robot next to a vase holding a flower, with printed tools on the floor
    caption: ID0 after finishing a flower arrangement, with its printed tools on the floor
  - src: ../../assets/me/robohacks-team.jpg
    alt: John taking a selfie with the team at their workbench during RoboHacks
    caption: Mid-build at RoboHacks
facts:
  - label: My part
    value: The scene-understanding workflow, and the agentic workflow that generates an end effector from the scene and the mechanical constraints
  - label: Team
    value: Isaac Chan, Ming Jin Yong, Josh Rodriguez, Jack Cappo, and me
  - label: Built in
    value: About 36 hours, with 10+ hardware revisions and 100+ 3D prints
  - label: Stack
    value: Innate MARS robot, Gemini, CadQuery, multicolor 3D printing, AprilTags
---

A software agent can call tools. A hardware agent should be able to make them. That was the idea behind ID0, which we built at Y Combinator's RoboHacks.

## How it works

1. **Look at the task.** The robot scans the scene and works out what it needs to manipulate, what kind of end effector that takes, and whether the one it has is good enough.
2. **Design a tool.** If it isn't, the robot designs a new end effector with programmatic CAD, built on top of a universal tool-changer interface.
3. **Print it.** The tool prints as a single piece. Multicolor printing adds AprilTags, so the robot can find the tool at the printer.
4. **Use it.** The robot picks up the new tool, mounts it, and finishes the task.
5. **Put it away.** Afterward the tool goes back to a garage, so the robot builds up a library of tools it can reuse and decides when each one fits.

## My part

I built the two steps between seeing the task and having a printable tool.

- **Scene understanding.** Gemini looks at the camera image and returns a structured description of the object: what it is, and the grasp constraints a tool would need to meet.
- **Generating the end effector.** Those constraints become the prompt for a model that writes CadQuery code. The mounting interface stays human-designed and trusted. The generated geometry is built on its mating face, inside size limits and keep-out zones, so a bad generation can't break the part that attaches to the robot.

![Plot of the allowed regions for a claw's stationary and moving fingers around a 30 mm cylinder](../../assets/projects/id0/claw-layout.png)
*Working out where a claw's stationary and moving fingers can go to grip a 30 mm cylinder.*

## A fun fact

We built ID0 about two weeks before an Onshape MCP came out that lets Claude work directly inside Onshape. We were a little ahead of the game.

## What's next

Hardware doesn't have to stay fixed. If a robot can make the physical capability a task needs instead of being stuck with the hardware it started with, it can take on far more work on its own. We plan to keep pushing the idea forward.
