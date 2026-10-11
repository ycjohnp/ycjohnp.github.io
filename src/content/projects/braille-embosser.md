---
title: Braille embosser
tagline: Quiet, low-cost camshaft design
summary: Built before college. A braille embosser that costs about $160 in parts and uses a camshaft instead of loud solenoids.
context: Independent research
order: 11
featured: false
cover: ../../assets/projects/braille-embosser/machine.jpg
coverAlt: The braille embosser, with a banana for scale
gallery:
  - src: ../../assets/projects/braille-embosser/machine.jpg
    alt: The braille embosser, with a banana for scale
    caption: The embosser, with a banana for scale
facts:
  - label: Cost
    value: About $160 in parts, compared with $2,000+ for commercial embossers
  - label: Performance
    value: Designed for under 60 dB. Dots average 0.32 mm tall, ±0.12 mm
links:
  - label: Code and design files
    href: https://github.com/ycjohnp/novel-camshaft-braille-embosser
sketches: [embosser, braille, cam-follower]
---

Commercial braille embossers cost $2,000 to $5,000 and rely on loud linear solenoids. This design uses a camshaft instead.

## How it works

A 360° servo turns a camshaft with two cams. Two print pins sit directly under the cams, and the cams are shaped so that every combination of the two pins, dot or no dot, comes up at some angle. To print a column of a braille cell, the servo turns to that angle and the head presses down.

The rest of the machine is three axes:

- **X.** A belt drive moves the printhead left and right along a line.
- **Y.** Rollers feed the paper in, advance it one line at a time, and push it out.
- **Z.** A lead screw lowers the printhead so the pins press dots into the paper.

![The embosser's frame with the X, Y and Z axes labeled](../../assets/projects/braille-embosser/axes.jpg)
![Close-up of the printhead, with the camshaft above two brass print pins](../../assets/projects/braille-embosser/printhead.jpg)
*Left: the three axes. Right: the printhead, with the camshaft above the two pins.*

## Testing

I printed "abcdwxyz" five times and measured the dots. They averaged 0.32 mm tall, within ±0.12 mm. After four rounds of durability testing, each dot lost about 0.028 mm of height on average. I also built a four-pin printhead to find the most pins the cams could drive while keeping that accuracy.

![Braille dots embossed into paper by the machine](../../assets/projects/braille-embosser/embossed.jpg)
*"abcdwxyz", embossed by the machine.*
