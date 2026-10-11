"""Render the single-path line SVGs made here to a PNG, for checking. usage: svgpng.py IN.svg OUT.png [width_px]"""
import re
import sys

import matplotlib

matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.collections import LineCollection

src, out = sys.argv[1], sys.argv[2]
width = int(sys.argv[3]) if len(sys.argv) > 3 else 1200
s = open(src).read()
vx, vy, vw, vh = map(float, re.search(r'viewBox="([^"]+)"', s).group(1).split())
lines = []
for d in re.findall(r' d="([^"]+)"', s):
    for sub in re.split(r'(?=M)', d):
        nums = list(map(float, re.findall(r'-?\d+(?:\.\d+)?', sub)))
        if len(nums) >= 4:
            lines.append(list(zip(nums[0::2], nums[1::2])))
fig = plt.figure(figsize=(width / 100, width / 100 * vh / vw), dpi=100)
ax = fig.add_axes([0, 0, 1, 1])
ax.add_collection(LineCollection(lines, colors='#111418', linewidths=0.5))
ax.set_xlim(vx, vx + vw)
ax.set_ylim(vy + vh, vy)
ax.axis('off')
fig.savefig(out, facecolor='white')
print(out, len(lines), 'lines')
