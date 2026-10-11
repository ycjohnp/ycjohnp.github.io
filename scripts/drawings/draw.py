"""Generate two clean technical line drawings as SVG: a meshing gear pair and a 7-DOF arm schematic.

usage: draw.py OUTDIR
Strokes use currentColor. Classes: .dash (construction lines), .center (dash-dot center lines).
"""
import math
import sys

out = sys.argv[1]
f = lambda v: f'{v:.1f}'.rstrip('0').rstrip('.')


def pts(points, close=False):
    d = 'M' + ' L'.join(f'{f(x)} {f(y)}' for x, y in points)
    return d + (' Z' if close else '')


def circle(cx, cy, r, cls=''):
    c = f' class="{cls}"' if cls else ''
    return f'<circle{c} cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}"/>'


def line(x1, y1, x2, y2, cls=''):
    c = f' class="{cls}"' if cls else ''
    return f'<path{c} d="M{f(x1)} {f(y1)} L{f(x2)} {f(y2)}"/>'


def svg(viewbox, body):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" fill="none" stroke="currentColor" '
        f'stroke-width="1" stroke-linecap="round" stroke-linejoin="round">\n{body}\n</svg>\n'
    )


# ---------- Gear pair ----------

def gear_outline(z, m, phase=0.0, alpha=math.radians(20)):
    """Involute spur gear outline, centered at the origin, first tooth centered on angle `phase`."""
    r = m * z / 2
    rb = r * math.cos(alpha)
    ra = r + m
    rf = r - 1.25 * m
    inv = lambda a: math.tan(a) - a
    # Half the tooth's angular thickness at the pitch circle, plus the involute offset to the base circle.
    half = math.pi / (2 * z) + inv(alpha)
    flank = []
    for i in range(9):
        rr = max(rb, rf) + (ra - max(rb, rf)) * i / 8
        a = math.acos(min(1, rb / rr))
        flank.append((rr, half - inv(a)))
    outline = []
    for k in range(z):
        c = phase + 2 * math.pi * k / z
        # root up the left flank, across the tip, down the right flank
        left = [(rr, c - t) for rr, t in flank]
        right = [(rr, c + t) for rr, t in reversed(flank)]
        outline += [(rf, c - flank[0][1] - 0.02)] + left + right + [(rf, c + flank[0][1] + 0.02)]
    return [(rr * math.cos(t), rr * math.sin(t)) for rr, t in outline], r


def gear(cx, cy, z, m, phase, extra):
    outline, r = gear_outline(z, m, phase)
    body = [f'<path d="{pts([(cx + x, cy + y) for x, y in outline], close=True)}"/>']
    body.append(circle(cx, cy, r, 'dash'))  # pitch circle
    body += extra
    # Invisible, but makes the group's bounding box centered on the axle, so CSS can spin it about its center.
    body.append(f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r + 2 * m)}" stroke="none"/>')
    return body, r


m = 7.5
z1, z2 = 13, 22
c1 = (118, 150)
a = m * (z1 + z2) / 2
c2 = (c1[0] + a, c1[1])

# Small gear: plain bore with a keyway.
small_extra = [circle(*c1, 9)]
small_extra.append(f'<path d="M{f(c1[0]-3)} {f(c1[1]-8.5)} L{f(c1[0]-3)} {f(c1[1]-12)} L{f(c1[0]+3)} {f(c1[1]-12)} L{f(c1[0]+3)} {f(c1[1]-8.5)}"/>')

# Large gear: hub, web and six lightening holes.
big_extra = [circle(*c2, 12), circle(*c2, 22), circle(*c2, 58)]
for k in range(6):
    t = 2 * math.pi * k / 6 + math.pi / 6
    big_extra.append(circle(c2[0] + 40 * math.cos(t), c2[1] + 40 * math.sin(t), 9))

g1, r1 = gear(*c1, z1, m, 0.0, small_extra)
# The big gear needs a gap facing the small gear's tooth at the contact point.
g2, r2 = gear(*c2, z2, m, math.pi + math.pi / z2, big_extra)

centers = [
    line(c1[0] - r1 - 22, c1[1], c2[0] + r2 + 22, c2[1], 'center'),
    line(c1[0], c1[1] - r1 - 22, c1[0], c1[1] + r1 + 22, 'center'),
    line(c2[0], c2[1] - r2 - 22, c2[0], c2[1] + r2 + 22, 'center'),
]
body = (
    '<g class="spin">' + ''.join(g1) + '</g>\n'
    + '<g class="spin-back">' + ''.join(g2) + '</g>\n'
    + ''.join(centers)
)
open(f'{out}/gear-pair.svg', 'w').write(svg('30 40 336 220', body))


# ---------- 7-DOF arm schematic ----------

def roll(x, y, ang, w=20, h=11):
    """A roll joint: a small box along the link."""
    c, s = math.cos(ang), math.sin(ang)
    corners = [(-w / 2, -h / 2), (w / 2, -h / 2), (w / 2, h / 2), (-w / 2, h / 2)]
    return f'<path d="{pts([(x + u * c - v * s, y + u * s + v * c) for u, v in corners], close=True)}"/>'


def pitch(x, y):
    """A pitch joint: a circle with its axle, seen end-on."""
    return circle(x, y, 9) + circle(x, y, 1.6)


def arm(points, cls=''):
    """Links between joints, broken around each joint so the symbols stay clean. The last point is the
    free end, where the gripper attaches, so the last link runs all the way to it."""
    out = []
    last = len(points) - 2
    for i, ((x1, y1), (x2, y2)) in enumerate(zip(points, points[1:])):
        d = math.hypot(x2 - x1, y2 - y1)
        ux, uy = (x2 - x1) / d, (y2 - y1) / d
        end = 0 if i == last else 9
        out.append(line(x1 + ux * 9, y1 + uy * 9, x2 - ux * end, y2 - uy * end, cls))
    return out


def gripper(x, y, ang, cls=''):
    c, s = math.cos(ang), math.sin(ang)
    P = lambda u, v: (x + u * c - v * s, y + u * s + v * c)
    cl = f' class="{cls}"' if cls else ''
    # A palm across the end of the link, and two fingers with their tips turned in.
    return (
        f'<path{cl} d="{pts([P(18, -8), P(4, -8), P(0, -11), P(0, 11), P(4, 8), P(18, 8)])}"/>'
        f'<path{cl} d="{pts([P(18, -8), P(21, -5)])}"/>'
        f'<path{cl} d="{pts([P(18, 8), P(21, 5)])}"/>'
    )


def pose(base, lengths, angles):
    """Forward kinematics in the drawing plane: joint positions for the pitch joints."""
    x, y = base
    out = [(x, y)]
    t = 0.0
    for L, a in zip(lengths, angles):
        t += a
        x, y = x + L * math.cos(t), y + L * math.sin(t)
        out.append((x, y))
    return out, t


ground_y = 286
base_top = (120, 246)
shoulder = (120, 206)
lengths = [112, 104, 46]
main, t_end = pose(shoulder, lengths, [math.radians(-52), math.radians(66), math.radians(48)])
ghost, t_ghost = pose(shoulder, lengths, [math.radians(-78), math.radians(70), math.radians(40)])

b = []
# Ground with hatching, and the base with its vertical yaw axis.
b.append(line(48, ground_y, 196, ground_y))
for k in range(10):
    x0 = 54 + k * 14
    b.append(line(x0, ground_y + 2, x0 - 9, ground_y + 11))
b.append(f'<path d="{pts([(98, ground_y), (98, 262), (142, 262), (142, ground_y)])}"/>')
b.append(roll(120, 254, math.pi / 2, 16, 30))
b.append(line(120, 300, 120, 228, 'center'))
b.append(line(120, 246, 120, shoulder[1] + 9))

# The ghost pose first, so the solid arm draws over it.
b += arm(ghost, 'dash')
b += [circle(x, y, 9, 'dash') for x, y in ghost[1:-1]]
b.append(gripper(*ghost[-1], t_ghost, 'dash'))

# The arm itself: pitch joints at the shoulder, elbow and wrist, roll joints along the links.
b += arm(main)
b += [pitch(x, y) for x, y in main[:-1]]
for (x1, y1), (x2, y2) in zip(main[:2], main[1:3]):
    b.append(roll((x1 + x2) / 2, (y1 + y2) / 2, math.atan2(y2 - y1, x2 - x1)))
b.append(roll(*((main[2][0] + main[3][0]) / 2, (main[2][1] + main[3][1]) / 2), t_end, 14, 9))
b.append(gripper(*main[-1], t_end))

# Range-of-motion arc at the shoulder, between the two poses, with arrowheads.
r = 34
a0, a1 = math.radians(-78), math.radians(-52)
arc = [(shoulder[0] + r * math.cos(a0 + (a1 - a0) * i / 20), shoulder[1] + r * math.sin(a0 + (a1 - a0) * i / 20)) for i in range(21)]
b.append(f'<path class="dash" d="{pts(arc)}"/>')
for end, sign in ((a0, 1), (a1, -1)):
    ex, ey = shoulder[0] + r * math.cos(end), shoulder[1] + r * math.sin(end)
    tx, ty = -math.sin(end) * sign, math.cos(end) * sign  # tangent pointing into the arc
    nx, ny = math.cos(end), math.sin(end)
    b.append(f'<path d="{pts([(ex + 6 * tx + 2.5 * nx, ey + 6 * ty + 2.5 * ny), (ex, ey), (ex + 6 * tx - 2.5 * nx, ey + 6 * ty - 2.5 * ny)])}"/>')

open(f'{out}/arm-schematic.svg', 'w').write(svg('34 56 330 252', '\n'.join(b)))
print('wrote gear-pair.svg and arm-schematic.svg')
