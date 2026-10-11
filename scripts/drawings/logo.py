"""Turn a logo into a line drawing: thick filled shapes become outlines, thin strokes become one centerline.

usage: logo.py IN.png OUT.svg [--up 6] [--thin 0.035] [--blur 1.5] [--thresh 60]
  --thin   strokes up to this thick (as a fraction of the logo's size) are drawn as centerlines
  --thresh how far from white (0-255) a pixel must be to count as part of the logo
"""
import argparse
import os
import subprocess
import sys
import tempfile

import cv2
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument('src')
ap.add_argument('out')
ap.add_argument('--up', type=float, default=6)
ap.add_argument('--thin', type=float, default=0.035)
ap.add_argument('--blur', type=float, default=1.5)
ap.add_argument('--thresh', type=int, default=60)
ap.add_argument('--close', type=int, default=0, help='close gaps (e.g. brush texture) with this kernel size, after upscaling')
ap.add_argument('--eps', type=float, default=1.2)
ap.add_argument('--colors', type=int, default=0,
                help='split the logo into this many color groups first and draw each as centerlines (for logos made of overlapping colored strokes)')
ap.add_argument('--outline', action='store_true',
                help='with --colors: draw each color as its outline (for flat-colored shapes that overlap)')
ap.add_argument('--brush', dest='loops', action='store_true',
                help='with --colors: smooth each stroke and prune skeleton spurs (for textured brush strokes)')
a = ap.parse_args()

img = cv2.imread(a.src, cv2.IMREAD_UNCHANGED)
if img.ndim == 2:
    img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
if img.shape[2] == 4:
    alpha = img[:, :, 3:4] / 255.0
    img = (img[:, :, :3] * alpha + 255 * (1 - alpha)).astype(np.uint8)
img = cv2.resize(img, None, fx=a.up, fy=a.up, interpolation=cv2.INTER_CUBIC)
if a.blur:
    img = cv2.GaussianBlur(img, (0, 0), a.blur * a.up / 2)
# Distance from white, so any colored or dark ink counts.
ink = (255 - img.min(axis=2)) > a.thresh
mask = ink.astype(np.uint8)
if a.close:
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (a.close, a.close)))

H, W = mask.shape
size = max(H, W)
here = os.path.dirname(os.path.abspath(__file__))


def centerlines(m, minlen):
    """The d attribute for the centerlines of a mask, via trace.py."""
    with tempfile.TemporaryDirectory() as tmp:
        mp, op = os.path.join(tmp, 'm.png'), os.path.join(tmp, 'm.svg')
        cv2.imwrite(mp, m * 255)
        subprocess.run([sys.executable, os.path.join(here, 'trace.py'), mp, op, '--mode', 'light', '--thresh', '128',
                        '--minlen', str(int(minlen)), '--eps', str(a.eps)], check=True, capture_output=True)
        return open(op).read().split(' d="', 1)[1].split('"', 1)[0]


def pruned_centerline(m, spur):
    """Centerline of a stroke with brush texture: smooth the shape, take its skeleton, then repeatedly cut
    dead-end branches shorter than `spur`, and round off the result."""
    import re
    width = 2 * np.percentile(cv2.distanceTransform(m, cv2.DIST_L2, 5)[m > 0], 75)
    soft = cv2.GaussianBlur(m.astype(np.float32), (0, 0), max(1.0, width / 6)) > 0.5
    d = centerlines(soft.astype(np.uint8), 0)
    lines = []
    for sub in re.split(r'(?=M)', d):
        nums = list(map(float, re.findall(r'-?\d+(?:\.\d+)?', sub)))
        if len(nums) >= 4:
            lines.append(np.array(list(zip(nums[0::2], nums[1::2]))))
    key = lambda q: (round(q[0] / 3), round(q[1] / 3))
    length = lambda l: float(np.hypot(*np.diff(l, axis=0).T).sum())
    while True:
        deg = {}
        for l in lines:
            for e in (key(l[0]), key(l[-1])):
                deg[e] = deg.get(e, 0) + 1
        cut = [l for l in lines if length(l) < spur and min(deg[key(l[0])], deg[key(l[-1])]) == 1
               and max(deg[key(l[0])], deg[key(l[-1])]) > 1]
        if not cut:
            break
        ids = {id(l) for l in cut}
        lines = [l for l in lines if id(l) not in ids]
    out = ''
    for l in lines:
        if length(l) < spur:
            continue
        # Chaikin corner cutting, twice, for a hand-drawn smoothness.
        for _ in range(2):
            q = l[:-1] * 0.75 + l[1:] * 0.25
            r = l[:-1] * 0.25 + l[1:] * 0.75
            l = np.r_[l[:1], np.c_[q, r].reshape(-1, 2), l[-1:]]
        out += 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in l)
    return out


if a.colors:
    # Each color is its own stroke. Where a stroke passes under another, its mask has a gap, so its line
    # breaks there too, which keeps the over-and-under look.
    pts = img[mask > 0].astype(np.float32)
    crit = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 50, 0.5)
    _, lab, _ = cv2.kmeans(pts, a.colors, None, crit, 5, cv2.KMEANS_PP_CENTERS)
    groups = np.full(mask.shape, -1)
    groups[mask > 0] = lab.ravel()
    paths = []
    for g in range(a.colors):
        m = (groups == g).astype(np.uint8)
        m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
        # Blended pixels where two colors meet can land in a third group, leaving notches; close them up.
        k = int(size * 0.012) | 1 if a.outline else 9
        m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k)))
        if a.outline:
            # Where this shape passes under another, its outline closes along the edge of the one on top.
            contours, _ = cv2.findContours(m, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
            for c in contours:
                if cv2.arcLength(c, True) < size * 0.05:
                    continue
                c = cv2.approxPolyDP(c, a.eps, True).reshape(-1, 2)
                paths.append('M' + ' L'.join(f'{x} {y}' for x, y in np.r_[c, c[:1]]))  # closed by repeating the start, which slim.py keeps
        else:
            paths.append(pruned_centerline(m, size * 0.03) if a.loops else centerlines(m, size * 0.08))
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" fill="none" stroke="currentColor" '
        f'stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="{"".join(paths)}"/></svg>\n'
    )
    open(a.out, 'w').write(svg)
    print(f'{os.path.basename(a.out)}: {a.colors} color strokes, {W}x{H}')
    sys.exit()
n, lab, stats, _ = cv2.connectedComponentsWithStats(mask, connectivity=8)
dist = cv2.distanceTransform(mask, cv2.DIST_L2, 5)
thin = np.zeros_like(mask)
thick = np.zeros_like(mask)
for i in range(1, n):
    if stats[i, cv2.CC_STAT_AREA] < (size * 0.004) ** 2:
        continue  # specks
    comp = lab == i
    # A shape's thickness is about twice its typical inner distance; use a high percentile, not the max,
    # so one blob where strokes cross doesn't make a whole ring count as thick.
    thickness = 2 * np.percentile(dist[comp], 90)
    (thin if thickness <= a.thin * size else thick)[comp] = 1

paths = []
# Thick shapes: their outlines, smoothed and simplified.
contours, _ = cv2.findContours(thick, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
for c in contours:
    if cv2.arcLength(c, True) < size * 0.02:
        continue
    c = cv2.approxPolyDP(c, a.eps, True).reshape(-1, 2)
    paths.append('M' + ' L'.join(f'{x} {y}' for x, y in np.r_[c, c[:1]]))  # closed by repeating the start, which slim.py keeps

# Thin strokes: centerlines.
if thin.any():
    paths.append(centerlines(thin, size * 0.03))

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" fill="none" stroke="currentColor" '
    f'stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="{"".join(paths)}"/></svg>\n'
)
open(a.out, 'w').write(svg)
print(f'{os.path.basename(a.out)}: {int(thick.any()) and len(contours)} outlines, centerlines: {bool(thin.any())}, {W}x{H}')
