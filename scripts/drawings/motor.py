"""The big actuator used in Cove and Tether, face on: redrawn from the vendor's dimensioned drawing as clean
geometry rather than traced, so the circles are true circles. Dimensions in mm, from that drawing: a Ø120 body,
ten spokes with pockets between them, ten M4 holes on Ø106, twelve rim screws, and a hub with nine M5 holes
and three Ø5 dowels around a Ø28 bore. Dimension lines and arrows are kept, without text.

usage: motor.py OUT.svg
Same conventions as draw.py: currentColor strokes, .center for dash-dot center lines and pitch circles.
"""
import math
import sys

import cv2
import numpy as np

out = sys.argv[1]
S = 8  # drawing units per mm
f = lambda v: f'{v:.1f}'.rstrip('0').rstrip('.')
parts = []


def polar(r, deg):
    """Point at radius r (mm) and angle deg (counterclockwise from +x, y up), in drawing units with y down."""
    a = math.radians(deg)
    return r * math.cos(a) * S, -r * math.sin(a) * S


def circle(x, y, r, cls=''):
    parts.append(f'<circle{f" class=\"{cls}\"" if cls else ""} cx="{f(x)}" cy="{f(y)}" r="{f(r * S)}"/>')


def path(points, cls='', close=False):
    d = 'M' + ' L'.join(f'{f(x)} {f(y)}' for x, y in points) + (' Z' if close else '')
    parts.append(f'<path{f" class=\"{cls}\"" if cls else ""} d="{d}"/>')


def arrow(tip, toward):
    """An open arrowhead at `tip`, pointing away from `toward`."""
    v = np.subtract(tip, toward)
    v = v / (np.linalg.norm(v) + 1e-9)
    w = np.array([-v[1], v[0]])
    tip = np.asarray(tip)
    path([tip - v * 9 + w * 3, tip, tip - v * 9 - w * 3])


def screw(x, y, r=2.5):
    """A socket screw head from above: the head and a six-lobe drive."""
    circle(x, y, r)
    path([(x + (1.35 if k % 2 == 0 else 0.8) * S * math.cos(math.pi * k / 6),
           y + (1.35 if k % 2 == 0 else 0.8) * S * math.sin(math.pi * k / 6)) for k in range(12)], close=True)


# Body, the Ø106 pitch circle, and the hub.
circle(0, 0, 60)
circle(0, 0, 53, 'center')
circle(0, 0, 29.6)
circle(0, 0, 28.8)

# Twelve rim screws, every 30 degrees.
for k in range(12):
    screw(*polar(57.8, k * 30))

# Ten spokes at 18 + 36k degrees, each with an M4 hole on the Ø106 circle.
for k in range(10):
    circle(*polar(53, 18 + k * 36), 1.7)

# The pockets between the spokes: an annulus minus 8 mm spokes and a screw boss on each pocket's inner edge,
# with rounded corners. Built as a fine raster and traced, since there's no geometry library here.
R = 20  # px per mm for the raster
half = 56
yy, xx = np.mgrid[-half * R:half * R, -half * R:half * R] / R
rr = np.hypot(xx, yy)
th = np.degrees(np.arctan2(-yy, xx))
mask = (rr > 38.5) & (rr < 50.8)
for k in range(10):
    a = math.radians(18 + k * 36)
    # Distance from the spoke's center line, on its outward half.
    along = xx * math.cos(a) - yy * math.sin(a)
    across = np.abs(xx * math.sin(a) + yy * math.cos(a))
    mask &= ~((across < 4) & (along > 0))
for k in range(10):
    bx, by = 37.6 * math.cos(math.radians(k * 36)), -37.6 * math.sin(math.radians(k * 36))
    mask &= np.hypot(xx - bx, yy - by) > 5.2
m = mask.astype(np.uint8) * 255
fillet = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * 2 * R + 1, 2 * 2 * R + 1))
m = cv2.morphologyEx(m, cv2.MORPH_OPEN, fillet)
m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * R + 1, 2 * R + 1)))
contours, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
for c in contours:
    c = cv2.approxPolyDP(c, 0.6, True)[:, 0, :].astype(float)
    path([((x / R - half) * S, (y / R - half) * S) for x, y in c], close=True)

# A screw in each pocket's boss.
for k in range(10):
    screw(*polar(37.6, k * 36))

# Hub: the Ø36 bolt circle with nine M5 holes, three Ø5 dowels at r 19.5, and the Ø28 bore.
circle(0, 0, 18, 'center')
for k in range(12):
    x, y = polar(18, k * 30)
    if k % 4 == 0:
        x, y = polar(19.5, k * 30)
        circle(x, y, 3.2)
        circle(x, y, 2.1)
    else:
        circle(x, y, 2.3)
        circle(x, y, 1.8)
for r in (14, 13, 8.5, 7.5):
    circle(0, 0, r)

# Center lines.
path([(-68 * S, 0), (68 * S, 0)], 'center')
path([(0, -68 * S), (0, 68 * S)], 'center')

# Dimensions. The dowel offset across the top: extension lines up from the center and from the dowel.
dx = 19.5 * S
for x in (0, dx):
    path([(x, -61 * S), (x, -66 * S)])
path([(0, -64 * S), (dx, -64 * S)])
arrow((0, -64 * S), (dx, -64 * S))
arrow((dx, -64 * S), (0, -64 * S))

# The Ø106 pitch circle, measured across a diameter.
a, b = polar(53, 40), polar(53, 220)
path([a, b])
arrow(a, b)
arrow(b, a)

# The 30 and 60 degree hole spacing, as arcs off to the lower right with extension lines.
path([polar(62, 0), polar(78, 0)])
for deg, r in ((-30, 66), (-60, 74)):
    path([polar(21, deg), polar(r + 4, deg)])
    arc = [polar(r, t) for t in np.linspace(0, deg, 40)]
    path(arc)
    arrow(arc[0], arc[3])
    arrow(arc[-1], arc[-4])

# Fit the view box to everything drawn.
nums = [float(v) for v in __import__('re').findall(r'-?\d+\.?\d*', ' '.join(p.split('d="')[-1] if 'd="' in p else '' for p in parts))]
xs, ys = nums[0::2], nums[1::2]
pad = 12
x0, y0 = min(min(xs), -60 * S) - pad, min(min(ys), -60 * S) - pad
x1, y1 = max(max(xs), 60 * S) + pad, max(max(ys), 60 * S) + pad
svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(x0)} {f(y0)} {f(x1 - x0)} {f(y1 - y0)}" fill="none" '
    f'stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">' + ''.join(parts) + '</svg>\n'
)
open(out, 'w').write(svg)
print(f'{out}: {len(contours)} pockets')
