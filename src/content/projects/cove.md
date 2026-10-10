---
title: Cove
tagline: 7-DOF robotic arm
summary: A 7-DOF arm that a student team at Terra Labs built from scratch in 10 weeks. I designed the control architecture and did the hardware/software integration.
context: Terra Labs, spring 2026
order: 1
cover: ../../assets/projects/cove/arm-whiteboard.jpg
coverAlt: The assembled Cove arm in front of a whiteboard of planning sketches
video:
  src: media/cove.mp4
  poster: media/cove-poster.jpg
  caption: Cove moving under ROS 2 control
gallery:
  - src: ../../assets/projects/cove/arm-whiteboard.jpg
    alt: The assembled Cove arm in front of a whiteboard of planning sketches
  - src: ../../assets/projects/cove/cad.jpg
    alt: CAD render of Cove showing the actuator modules and base plate
facts:
  - label: Role
    value: Software and electrical engineer
  - label: When
    value: February to May 2026, a 10-week build
  - label: Stack
    value: ROS 2, Raspberry Pi 5, Waveshare CAN HAT, Damiao BLDC actuators, MoveIt 2, AprilTags
  - label: Specs
    value: About 50 Nm of torque, 7 kg payload at full reach, 8 aluminum parts milled from $308 of stock
  - label: Outcome
    value: Shown at Terra Labs Demo Day to 200+ people
links:
  - label: Code on GitHub
    href: https://github.com/ycjohnp/cove_motion_moveit2
---

Cove was built to grab a wine bottle and pour it. The end effector cradles the bottle, and the rest of the arm is seven BLDC actuators joined by milled aluminum brackets.

![CAD model of the gripper cradling a bottle](../../assets/projects/cove/gripper-cad.jpg)
![The arm fully extended in a living room, wired up for testing](../../assets/projects/cove/arm-extended.jpg)
*Left: the gripper in CAD. Right: the arm extended during testing.*

## What I owned

- **Control architecture.** ROS 2 on a Raspberry Pi 5, commanding CAN-based BLDC actuators through a Waveshare CAN HAT.
- **Actuator bring-up.** CAN communication with seven Damiao actuators in position-velocity mode.
- **Safety.** A hardware and software e-stop with a heartbeat timeout, torque cutoff, and ROS 2 fault monitoring.
- **Robot model.** A URDF with joint dynamics, transmission tags, and collision geometry that matches the real arm, for MoveIt 2.

## How it fits together

MoveIt 2 plans a motion, using AprilTags to find its target, and publishes joint targets on `/target_joints`. The control node on the Pi talks to the seven actuators over CAN through a Waveshare CAN HAT. The actuators report back, and the Pi publishes `/joint_states`. If the heartbeat stops, torque is cut and `/estop_event` tells every other node.

![Terminal output from the ROS 2 controller next to RViz](../../assets/projects/cove/ros-rviz.jpg)
![Whiteboard sketch of the arm's joints, link lengths and joint limits](../../assets/projects/cove/kinematics-sketch.jpg)
![Camera feed with a calibration grid overlaid](../../assets/projects/cove/camera-calibration.jpg)
*The ROS 2 controller running alongside RViz, working out link lengths and joint limits on the whiteboard, and calibrating the camera.*

## Building it

![Three machined aluminum brackets on a workbench](../../assets/projects/cove/brackets.jpg)
![Close-up of a bracket plate with bolts](../../assets/projects/cove/bracket-closeup.jpg)
*Machined aluminum brackets, and a bracket plate up close.*

![John taking a selfie while a teammate works on the arm's electronics at a desk](../../assets/projects/cove/me-and-teammate.jpg)
![Three team members working on the arm standing upright](../../assets/projects/cove/team-with-arm.jpg)
*Working on the arm with the team.*

## Decisions

**Position-velocity control.** Each actuator gets a target position and the speed to move there at, so MoveIt 2's joint targets go straight to the motors.

**E-stop in hardware and software.** A heartbeat timeout cuts torque when the control link goes quiet, and ROS 2 fault monitoring publishes the event so every node knows.

**Get the URDF right.** We didn't lean on simulation, so the model had to match the real arm. I put a lot of work into getting the link lengths, joint limits, dynamics and collision geometry accurate, because MoveIt 2 plans from that model and any error shows up as a bad motion on the real arm.

## What broke

The base threads stripped under load. The failure broke four actuators and damaged fuses and CAN ports. I helped bring the arm back: rewired it, rebuilt it, and redid the wireless system. We replaced the hardware with rated stainless fasteners and torqued every one to spec.

![Actuator internals and cabling during a rebuild](../../assets/projects/cove/actuator-cabling.jpg)
![The arm standing upright with its wiring exposed](../../assets/projects/cove/arm-vertical-wiring.jpg)
*Inside an actuator, and the arm with its wiring exposed.*

## What came next

Cove became the starting point for [Tether](../tether/), a 7-DOF inchworm robot made of three wireless modules.
