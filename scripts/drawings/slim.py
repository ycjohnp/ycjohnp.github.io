"""Shrink a line-drawing SVG: join segments that meet into longer strokes, simplify them, drop specks,
and round coordinates. Keeps a single <path>. usage: slim.py IN.svg OUT.svg [--eps 0.6] [--minlen 2] [--width 1000]
"""
import argparse
import re
from collections import defaultdict

import cv2
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument('src')
ap.add_argument('out')
ap.add_argument('--eps', type=float, default=0.6)
ap.add_argument('--minlen', type=float, default=2.0)
ap.add_argument('--width', type=float, default=1000, help='rescale so the drawing is this wide')
a = ap.parse_args()

s = open(a.src).read()
raw = []
for d in re.findall(r' d="([^"]+)"', s):
    for sub in re.split(r'(?=M)', d):
        nums = list(map(float, re.findall(r'-?\d+(?:\.\d+)?', sub)))
        if len(nums) >= 4:
            raw.append(list(zip(nums[0::2], nums[1::2])))
# Crop to the drawing itself (with a small margin) and scale it to --width.
allx = [x for pl in raw for x, _ in pl]
ally = [y for pl in raw for _, y in pl]
vx, vy = min(allx), min(ally)
vw, vh = max(allx) - vx, max(ally) - vy
pad = 6
k = (a.width - 2 * pad) / vw
segs = [[((x - vx) * k + pad, (y - vy) * k + pad) for x, y in pl] for pl in raw]

# Join polylines end to end where their endpoints coincide (to half a unit).
key = lambda p: (round(p[0] * 2), round(p[1] * 2))
ends = defaultdict(list)
for i, pl in enumerate(segs):
    ends[key(pl[0])].append(i)
    ends[key(pl[-1])].append(i)
used = [False] * len(segs)


def take(i, at):
    """Return segs[i] oriented to start at endpoint key `at`."""
    pl = segs[i]
    return pl if key(pl[0]) == at else pl[::-1]


chains = []
for i in range(len(segs)):
    if used[i]:
        continue
    used[i] = True
    chain = list(segs[i])
    for direction in (0, 1):
        while True:
            tip = key(chain[-1])
            nxt = [j for j in ends[tip] if not used[j]]
            if not nxt:
                break
            j = nxt[0]
            used[j] = True
            chain += take(j, tip)[1:]
        chain.reverse()
    chains.append(chain)


def length(p):
    d = np.diff(p, axis=0)
    return float(np.hypot(d[:, 0], d[:, 1]).sum())


out = []
for c in chains:
    p = np.array(c, dtype=np.float32)
    if length(p) < a.minlen:
        continue
    p = cv2.approxPolyDP(p.reshape(-1, 1, 2), a.eps, False).reshape(-1, 2)
    r = np.round(p).astype(int)
    # Drop repeated points after rounding.
    keep = np.ones(len(r), bool)
    keep[1:] = np.any(r[1:] != r[:-1], axis=1)
    r = r[keep]
    if len(r) < 2:
        continue
    out.append(f'M{r[0][0]} {r[0][1]}L' + ' '.join(f'{x} {y}' for x, y in r[1:]))

W, H = round(vw * k + 2 * pad), round(vh * k + 2 * pad)
head = re.search(r'<svg[^>]*>', s).group(0)
head = re.sub(r'viewBox="[^"]+"', f'viewBox="0 0 {W} {H}"', head)
style = re.search(r'<style>.*?</style>', s)
svg = head + (style.group(0) if style else '') + f'<path d="{"".join(out)}"/></svg>\n'
open(a.out, 'w').write(svg)
print(f'{a.out.split("/")[-1]}: {len(segs)} pieces -> {len(out)} strokes, {len(svg) // 1024} KB')
