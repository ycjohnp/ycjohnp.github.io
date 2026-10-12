"""Redraw the two Lucidchart diagrams on the modular robots page as line drawings: the moving-loads diagram
and the PID positioning diagram. The exports in scripts/drawings/lucid/ (with their embedded module renders
removed) give the layout; src/assets/drawings/module-side.svg, the top-down view of the module, stands in
for each render. Shapes come out as single-weight strokes, the hand-dashed heading lines become .center
(dash-dot) axes, the dashed target path becomes .dash, filled arrowheads become open ones.

usage: diagrams.py OUTDIR   (then finalize.py each file)
"""
import math
import re
import sys
from pathlib import Path

import cv2
import numpy as np

here = Path(__file__).parent
out = Path(sys.argv[1])
f = lambda v: f'{v:.1f}'.rstrip('0').rstrip('.')

IMG_W, IMG_H = 1024, 830  # the render Lucid embeds, and where the module sits in it (its opaque bounds)
IMG_CX, IMG_CY, IMG_MODULE_W = 509.5, 406, 743
MODULE = here.parent.parent / 'src/assets/drawings/module-side.svg'
MOD_VB = (1000, 1138)  # module-side.svg viewBox; the module is drawn with its wheels top and bottom


# ---------- a small SVG path flattener ----------

def flatten(d):
    """Path data -> list of polylines (lists of (x, y)); curves and arcs are sampled."""
    toks = re.findall(r'[MmLlHhVvCcSsAaZz]|-?\d*\.?\d+(?:e-?\d+)?', d)
    polys, cur, pos, start, i, cmd, ctrl = [], [], (0, 0), (0, 0), 0, None, None
    def num():
        nonlocal i
        i += 1
        return float(toks[i - 1])
    while i < len(toks):
        t = toks[i]
        if t.isalpha():
            cmd = t
            i += 1
            if cmd in 'Zz':
                if cur:
                    cur.append(start)
                    polys.append(cur)
                cur, pos = [], start
            continue
        rel = cmd.islower()
        c = cmd.upper()
        if c == 'M':
            x, y = num(), num()
            pos = (pos[0] + x, pos[1] + y) if rel else (x, y)
            if cur:
                polys.append(cur)
            cur, start = [pos], pos
            cmd = 'l' if rel else 'L'
        elif c == 'L':
            x, y = num(), num()
            pos = (pos[0] + x, pos[1] + y) if rel else (x, y)
            cur.append(pos)
        elif c == 'H':
            x = num()
            pos = (pos[0] + x if rel else x, pos[1])
            cur.append(pos)
        elif c == 'V':
            y = num()
            pos = (pos[0], pos[1] + y if rel else y)
            cur.append(pos)
        elif c in 'CS':
            p = [num() for _ in range(6 if c == 'C' else 4)]
            if rel:
                p = [p[k] + pos[k % 2] for k in range(len(p))]
            if c == 'S':  # the first control point mirrors the previous curve's second one
                p = [2 * pos[0] - ctrl[0], 2 * pos[1] - ctrl[1]] + p
            p0, p1, p2, p3 = pos, (p[0], p[1]), (p[2], p[3]), (p[4], p[5])
            ctrl = p2
            for k in range(1, 9):
                u = k / 8
                cur.append(tuple(
                    (1 - u) ** 3 * p0[j] + 3 * (1 - u) ** 2 * u * p1[j] + 3 * (1 - u) * u * u * p2[j] + u ** 3 * p3[j]
                    for j in range(2)))
            pos = p3
        elif c == 'A':
            rx, ry, rot, large, sweep, x, y = [num() for _ in range(7)]
            end = (pos[0] + x, pos[1] + y) if rel else (x, y)
            cur += arc_points(pos, end, rx, ry, math.radians(rot), large, sweep)
            pos = end
        else:
            raise ValueError(cmd)
    if cur:
        polys.append(cur)
    return polys


def arc_points(p0, p1, rx, ry, phi, large, sweep, n=8):
    """SVG arc -> sampled points (endpoint to center conversion from the SVG spec)."""
    cp, sp = math.cos(phi), math.sin(phi)
    dx, dy = (p0[0] - p1[0]) / 2, (p0[1] - p1[1]) / 2
    x1, y1 = cp * dx + sp * dy, -sp * dx + cp * dy
    lam = (x1 / rx) ** 2 + (y1 / ry) ** 2
    if lam > 1:
        rx, ry = rx * math.sqrt(lam), ry * math.sqrt(lam)
    num = max(0, rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1)
    k = math.sqrt(num / (rx * rx * y1 * y1 + ry * ry * x1 * x1)) * (-1 if large == sweep else 1)
    cx1, cy1 = k * rx * y1 / ry, -k * ry * x1 / rx
    cx = cp * cx1 - sp * cy1 + (p0[0] + p1[0]) / 2
    cy = sp * cx1 + cp * cy1 + (p0[1] + p1[1]) / 2
    ang = lambda ux, uy, vx, vy: math.copysign(1, ux * vy - uy * vx) * math.acos(
        max(-1, min(1, (ux * vx + uy * vy) / math.hypot(ux, uy) / math.hypot(vx, vy))))
    t1 = ang(1, 0, (x1 - cx1) / rx, (y1 - cy1) / ry)
    dt = ang((x1 - cx1) / rx, (y1 - cy1) / ry, (-x1 - cx1) / rx, (-y1 - cy1) / ry)
    if not sweep and dt > 0:
        dt -= 2 * math.pi
    if sweep and dt < 0:
        dt += 2 * math.pi
    pts = []
    for k in range(1, n + 1):
        t = t1 + dt * k / n
        ex, ey = rx * math.cos(t), ry * math.sin(t)
        pts.append((cp * ex - sp * ey + cx, sp * ex + cp * ey + cy))
    return pts


# ---------- geometry helpers ----------

def apply(M, p):
    a, b, c, d, e, g = M
    return (a * p[0] + c * p[1] + e, b * p[0] + d * p[1] + g)


def attr(tag, name):
    m = re.search(rf'\b{name}="([^"]*)"', tag)
    return m.group(1) if m else None


def length(poly):
    return sum(math.dist(poly[k], poly[k + 1]) for k in range(len(poly) - 1))


def pts(points, close=False):
    return 'M' + ' L'.join(f'{f(x)} {f(y)}' for x, y in points) + (' Z' if close else '')


def path(points, cls='', close=False):
    c = f' class="{cls}"' if cls else ''
    return f'<path{c} d="{pts(points, close)}"/>'


def circle(cx, cy, r):
    return f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}"/>'


def arrowhead(tip, frm, size=11, half=math.radians(24)):
    """An open arrowhead at `tip`, pointing away from `frm`."""
    a = math.atan2(tip[1] - frm[1], tip[0] - frm[0])
    wings = [(tip[0] - size * math.cos(a + s * half), tip[1] - size * math.sin(a + s * half)) for s in (1, -1)]
    return path([wings[0], tip, wings[1]])


def clip_outside(poly, box):
    """The parts of a polyline outside a convex polygon (so a box drawn over the module hides it)."""
    n = len(box)
    def inside(p):
        return all((box[(k + 1) % n][0] - box[k][0]) * (p[1] - box[k][1])
                   - (box[(k + 1) % n][1] - box[k][1]) * (p[0] - box[k][0]) >= 0 for k in range(n))
    if not inside(box[0]):  # make the edges wind the same way inside() expects
        box = box[::-1]
        n = len(box)
    out, cur = [], []
    for a, b in zip(poly, poly[1:]):
        # Parameters along a->b where it crosses each edge's line; keep the parts outside.
        t_in, t_out = 0.0, 1.0
        for k in range(n):
            ex, ey = box[(k + 1) % n][0] - box[k][0], box[(k + 1) % n][1] - box[k][1]
            fa = ex * (a[1] - box[k][1]) - ey * (a[0] - box[k][0])
            fb = ex * (b[1] - box[k][1]) - ey * (b[0] - box[k][0])
            if fa < 0 and fb < 0:
                t_in, t_out = 1.0, 0.0  # fully outside this edge: no part is inside the box
                break
            if fa < 0:  # enters across this edge
                t_in = max(t_in, fa / (fa - fb))
            elif fb < 0:  # leaves across this edge
                t_out = min(t_out, fa / (fa - fb))
        lerp = lambda t: (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)
        if t_in >= t_out:  # entirely outside
            if not cur:
                cur.append(a)
            cur.append(b)
            continue
        if t_in > 0:
            if not cur:
                cur.append(a)
            cur.append(lerp(t_in))
        if cur:
            out.append(cur)
            cur = []
        if t_out < 1:
            cur = [lerp(t_out), b]
    if cur:
        out.append(cur)
    return out


def simplify(poly, eps):
    if len(poly) < 3:
        return poly
    arr = np.array(poly, np.float32).reshape(-1, 1, 2)
    return [tuple(p) for p in cv2.approxPolyDP(arr, eps, False).reshape(-1, 2)]


# ---------- the module ----------

def module_polys():
    s = MODULE.read_text()
    polys = []
    for d in re.findall(r' d="([^"]+)"', s):
        polys += flatten(d)
    return polys


MOD = module_polys()


def place_module(rect, M, scale, covers):
    """The module drawing inside Lucid's image rect (x, y, w, h) under the element's transform matrix M,
    turned a quarter turn so its wheels sit left and right as in the render."""
    x, y, w, h = rect
    k = IMG_MODULE_W / MOD_VB[1]  # drawing units -> render pixels, after the quarter turn
    sx, sy = w / IMG_W, h / IMG_H
    cx, cy = MOD_VB[0] / 2, MOD_VB[1] / 2
    body = []
    for poly in MOD:
        pl = []
        for px, py in poly:
            rx, ry = -(py - cy), px - cx  # rotate 90 degrees about the drawing's center
            ix, iy = IMG_CX + k * rx, IMG_CY + k * ry
            pl.append(scale(apply(M, (x + sx * ix, y + sy * iy))))
        pieces = [simplify(pl, 0.5)]
        for box in covers:
            pieces = [q for pc in pieces for q in clip_outside(pc, box)]
        body += [path(pc) for pc in pieces if length(pc) >= 4]
    return body


# ---------- one diagram ----------

def diagram(src, width):
    s = Path(src).read_text()
    tx, ty = map(float, re.search(r'translate\((-?[\d.]+) (-?[\d.]+)\)', s).groups())
    sc = width / float(attr(s, 'width'))
    scale = lambda p: ((p[0] + tx) * sc, (p[1] + ty) * sc)
    body, lines, heads, modules = [], [], [], []  # lines: (polyline, class); heads: arrow tip triangles
    boxes = []  # the cargo boxes, which hide whatever module is under them
    for tag in re.findall(r'<path[^>]*/>', s):
        d, stroke = attr(tag, 'd'), attr(tag, 'stroke')
        fill = attr(tag, 'fill') or '#000'  # no fill attribute means SVG's default, filled black
        sw = float(attr(tag, 'stroke-width') or 1)
        if d.startswith('M0 0h1760') or fill == '#fff' or sw < 0.5:
            continue  # page background, Lucid's white end caps, the tiny tail caps on arrows
        if fill and fill.startswith('url('):
            x, y, hc, w, h = re.match(r'M([\d.]+) ([\d.]+)([hH])([\d.]+)[vV]([\d.]+)', d).groups()
            x, y, w, h = float(x), float(y), float(w), float(h)
            if hc == 'H':  # absolute: the value is the right edge, not the width
                w -= x
            M = tuple(map(float, attr(tag, 'transform')[7:-1].split(',')))
            modules.append(((x, y, w, h), M))
            continue
        polys = [[scale(p) for p in pl] for pl in flatten(d)]
        polys = [pl for pl in polys if length(pl) > 4 * sc]
        if fill and fill != 'none' and len(polys) == 1 and len(polys[0]) == 4:
            heads.append(polys[0][:3])  # a filled triangle: an arrowhead
            continue
        if fill and fill != 'none':  # the cargo boxes and the start and goal dots
            xs, ys = [p[0] for p in polys[0]], [p[1] for p in polys[0]]
            w, h = max(xs) - min(xs), max(ys) - min(ys)
            if abs(w - h) < 2 and w < 30 * sc:
                r = w / 2
                body.append(circle(min(xs) + r, min(ys) + r, r))
                if fill == '#cc4e00':  # the goal: a target
                    body.append(circle(min(xs) + r, min(ys) + r, r / 3))
            else:
                body.append(path(polys[0], close=True))
                boxes.append(polys[0])
            continue
        short = lambda pl: len(pl) == 2 and length(pl) < 60 * sc
        dashes = [pl for pl in polys if short(pl)]
        if len(dashes) >= 3:  # a line Lucid drew dash by dash
            cls = 'center' if stroke == '#000' else 'dash'
            lines.append(([dashes[0][0], dashes[-1][-1]], cls))
            polys = [pl for pl in polys if not short(pl)]
        lines += [(pl, '') for pl in polys]
    for rect, M in modules:
        body = place_module(rect, M, scale, boxes) + body  # modules go under everything else
    # Attach each arrowhead to the nearest line end, extending the line to the tip.
    for tri in heads:
        best = None
        for li, (pl, _) in enumerate(lines):
            for end in (0, -1):
                dmin = min(math.dist(pl[end], v) for v in tri)
                if best is None or dmin < best[0]:
                    best = (dmin, li, end)
        _, li, end = best
        pl, cls = lines[li]
        tip = min(tri, key=lambda v: math.dist(*[u for u in tri if u != v]))  # opposite the short side
        size = sum(math.dist(tip, u) for u in tri if u != tip) / 2
        if math.dist(pl[end], tip) < size / 2:  # the line already runs to the tip
            pl[end] = tip
        elif end == 0:
            pl.insert(0, tip)
        else:
            pl.append(tip)
        body.append(arrowhead(tip, pl[1] if end == 0 else pl[-2]))
    for pl, cls in lines:
        body.append(path(simplify(pl, 0.3), cls))
    return body


def fit(body, pad=12):
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


def svg(body):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{fit(body)}" fill="none" stroke="currentColor" '
        f'stroke-width="1" stroke-linecap="round" stroke-linejoin="round">\n' + '\n'.join(body) + '\n</svg>\n'
    )


for name, width in [('moving-loads', 1000), ('pid-control', 1000)]:
    (out / f'{name}.svg').write_text(svg(diagram(here / 'lucid' / f'{name}.svg', width)))
    print(name)
