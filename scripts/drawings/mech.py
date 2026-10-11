"""Two more clean mechanism drawings as SVG: a cam with a roller follower, and a four-bar linkage.

usage: mech.py OUTDIR
Same conventions as draw.py: currentColor strokes, .dash construction lines, .center dash-dot lines.
"""
import math
import sys

out = sys.argv[1]
f = lambda v: f'{v:.1f}'.rstrip('0').rstrip('.')


def pts(points, close=False):
    return 'M' + ' L'.join(f'{f(x)} {f(y)}' for x, y in points) + (' Z' if close else '')


def path(points, cls='', close=False):
    c = f' class="{cls}"' if cls else ''
    return f'<path{c} d="{pts(points, close)}"/>'


def circle(cx, cy, r, cls=''):
    c = f' class="{cls}"' if cls else ''
    return f'<circle{c} cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}"/>'


def line(x1, y1, x2, y2, cls=''):
    return path([(x1, y1), (x2, y2)], cls)


def svg(viewbox, body):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" fill="none" stroke="currentColor" '
        f'stroke-width="1" stroke-linecap="round" stroke-linejoin="round">\n' + '\n'.join(body) + '\n</svg>\n'
    )


def fit(body, pad=12):
    """A viewBox around everything drawn: path points, and circles with their radius."""
    import re
    xs, ys = [], []
    for el in body:
        for m in re.finditer(r'cx="([-\d.]+)" cy="([-\d.]+)" r="([-\d.]+)"', el):
            x, y, r = map(float, m.groups())
            xs += [x - r, x + r]
            ys += [y - r, y + r]
        for d in re.findall(r' d="([^"]+)"', el):
            nums = list(map(float, re.findall(r'-?\d+(?:\.\d+)?', d)))
            xs += nums[0::2]
            ys += nums[1::2]
    return f'{f(min(xs) - pad)} {f(min(ys) - pad)} {f(max(xs) - min(xs) + 2 * pad)} {f(max(ys) - min(ys) + 2 * pad)}'


def ground(x1, x2, y, step=10):
    """A fixed support: a line with hatching underneath."""
    b = [line(x1, y, x2, y)]
    x = x1 + 4
    while x < x2:
        b.append(line(x, y + 1.5, x - 7, y + 9))
        x += step
    return b


# ---------- Cam and roller follower, with its displacement diagram ----------

def lift(t):
    """Follower rise over one turn: dwell, cycloidal rise, dwell, cycloidal return. t in [0, 1)."""
    if t < 0.25:
        return 0.0
    if t < 0.5:
        u = (t - 0.25) / 0.25
        return u - math.sin(2 * math.pi * u) / (2 * math.pi)
    if t < 0.65:
        return 1.0
    if t < 0.9:
        u = (t - 0.65) / 0.25
        return 1 - (u - math.sin(2 * math.pi * u) / (2 * math.pi))
    return 0.0


cx, cy = 120, 210
base, rise, roller = 46, 30, 11
# The pitch curve, then the cam profile offset inward by the roller radius (approximately, along the radius).
profile = []
for i in range(361):
    t = i / 360
    th = -math.pi / 2 + 2 * math.pi * t
    r = base + rise * lift(t) - roller
    profile.append((cx + r * math.cos(th), cy + r * math.sin(th)))

b = []
b.append(path(profile, close=True))
b.append(circle(cx, cy, base - roller, 'dash'))  # base circle
b.append(circle(cx, cy, 10))  # shaft
b.append(path([(cx - 3, cy - 9.5), (cx - 3, cy - 13), (cx + 3, cy - 13), (cx + 3, cy - 9.5)]))  # keyway
b.append(line(cx - 80, cy, cx + 80, cy, 'center'))
b.append(line(cx, cy + 80, cx, cy - 160, 'center'))

# Follower in the dwell position: roller resting on the base circle, stem going up through a guide.
fy = cy - base
b.append(circle(cx, fy, roller))
b.append(circle(cx, fy, 2))
b.append(path([(cx - 6, fy - roller), (cx - 6, fy - 120), (cx + 6, fy - 120), (cx + 6, fy - roller)]))
for gy in (fy - 46, fy - 96):  # guide bushings
    b.append(path([(cx - 20, gy), (cx - 9, gy), (cx - 9, gy + 16), (cx - 20, gy + 16)]))
    b.append(path([(cx + 20, gy), (cx + 9, gy), (cx + 9, gy + 16), (cx + 20, gy + 16)]))
# Return spring between the guides.
spring = [(cx, fy - 50)]
for k in range(1, 9):
    spring.append((cx + (13 if k % 2 else -13), fy - 50 - k * 4.5))
spring.append((cx, fy - 50 - 9 * 4.5))
b.append(path(spring))

# Displacement diagram: lift against cam angle.
dx0, dy0, dw, dh = 230, 170, 200, rise * 2
b.append(line(dx0, dy0, dx0 + dw, dy0))
b.append(line(dx0, dy0, dx0, dy0 - dh - 14))
for k in range(1, 5):
    b.append(line(dx0 + dw * k / 4, dy0, dx0 + dw * k / 4, dy0 - dh - 4, 'dash'))
b.append(path([(dx0 + dw * i / 200, dy0 - dh * lift(i / 200 if i < 200 else 0.999)) for i in range(201)]))
b.append(line(dx0, dy0 - dh, dx0 + dw, dy0 - dh, 'dash'))

open(f'{out}/cam-follower.svg', 'w').write(svg(fit(b), b))


# ---------- Four-bar linkage with its coupler curve ----------

A = (90.0, 210.0)  # crank pivot
D = (250.0, 210.0)  # rocker pivot
a, bl, c = 44.0, 150.0, 110.0  # crank, coupler, rocker lengths
P_off, P_ang = 95.0, math.radians(-32)  # coupler point, relative to the coupler


def solve(th):
    """Positions of B (crank end), C (coupler/rocker joint) and the coupler point for crank angle th."""
    B = (A[0] + a * math.cos(th), A[1] + a * math.sin(th))
    dx, dy = D[0] - B[0], D[1] - B[1]
    d = math.hypot(dx, dy)
    if d > bl + c or d < abs(bl - c):
        return None
    x = (bl * bl - c * c + d * d) / (2 * d)
    h = math.sqrt(max(0.0, bl * bl - x * x))
    ux, uy = dx / d, dy / d
    C = (B[0] + ux * x + uy * h, B[1] + uy * x - ux * h)  # the branch above the pivots
    ang = math.atan2(C[1] - B[1], C[0] - B[0]) + P_ang
    P = (B[0] + P_off * math.cos(ang), B[1] + P_off * math.sin(ang))
    return B, C, P


def link(p, q, w=8):
    """A link drawn as a slot: two parallel sides with rounded ends."""
    ang = math.atan2(q[1] - p[1], q[0] - p[0])
    nx, ny = -math.sin(ang), math.cos(ang)
    side1 = [(p[0] + nx * w, p[1] + ny * w), (q[0] + nx * w, q[1] + ny * w)]
    cap_q = [(q[0] + w * math.cos(ang + math.pi / 2 - t), q[1] + w * math.sin(ang + math.pi / 2 - t)) for t in [k * math.pi / 12 for k in range(13)]]
    side2 = [(q[0] - nx * w, q[1] - ny * w), (p[0] - nx * w, p[1] - ny * w)]
    cap_p = [(p[0] + w * math.cos(ang - math.pi / 2 - t), p[1] + w * math.sin(ang - math.pi / 2 - t)) for t in [k * math.pi / 12 for k in range(13)]]
    return path(side1 + cap_q + side2 + cap_p, close=True)


b = []
curve = [s[2] for s in (solve(2 * math.pi * i / 240) for i in range(241)) if s]
b.append(path(curve, 'dash'))
B, C, P = solve(math.radians(-110))
ghost = solve(math.radians(-30))

# A second position of the linkage, dashed.
gB, gC, gP = ghost
b.append(line(*A, *gB, 'dash'))
b.append(path([gB, gP, gC], 'dash', close=True))
b.append(line(*D, *gC, 'dash'))

b.append(link(A, B))
b.append(link(D, C))
# The coupler is a triangular plate carrying the coupler point.
b.append(path([B, C, P], close=True))
for p in (A, B, C, D):
    b.append(circle(*p, 3.5))
b.append(circle(*P, 2.5))
# Fixed pivots: a small triangle on hatched ground.
for p in (A, D):
    b.append(path([p, (p[0] - 11, p[1] + 18), (p[0] + 11, p[1] + 18)], close=True))
    b += ground(p[0] - 20, p[0] + 20, p[1] + 18)
b.append(line(A[0] - 30, A[1], D[0] + 30, D[1], 'center'))

open(f'{out}/linkage.svg', 'w').write(svg(fit(b), b))
print('wrote cam-follower.svg and linkage.svg')
