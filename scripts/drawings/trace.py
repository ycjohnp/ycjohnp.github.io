"""Turn a CAD render, a drawing, or an edge mask (from urdf_render.py) into a stroked SVG line drawing.

usage: trace.py IN OUT.svg --mode light|dark [--thresh N] [--minlen N] [--eps N] [--crop x,y,w,h] [--scale S]
  light: lines are light on a dark background (e.g. a DWG screenshot)
  dark:  lines are dark edge lines on a light render
  edges: thin lines darker than their surroundings (CAD edge lines over shading)
  canny: edge detection on a smoothed image. Fine for clean renders; real photos come out wobbly and noisy
"""
import argparse
import cv2
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument('src')
ap.add_argument('out')
ap.add_argument('--mode', default='dark')
ap.add_argument('--thresh', type=int, default=70)
ap.add_argument('--sat', type=int, default=255, help='max saturation for dark-mode line pixels')
ap.add_argument('--minlen', type=float, default=12)
ap.add_argument('--eps', type=float, default=0.8)
ap.add_argument('--crop', default=None)
ap.add_argument('--scale', type=float, default=1.0)
ap.add_argument('--dilate', type=int, default=0)
ap.add_argument('--lo', type=int, default=60, help='canny low threshold')
ap.add_argument('--hi', type=int, default=150, help='canny high threshold')
ap.add_argument('--maxside', type=int, default=0, help='downscale so the longer side is at most this')
ap.add_argument('--silhouette', type=int, default=0, help='also draw the outline of anything darker than this on a white background')
ap.add_argument('--erase', action='append', default=[], help='x,y,r: blank a circle (e.g. a CAD origin marker)')
a = ap.parse_args()

img = cv2.imread(a.src, cv2.IMREAD_UNCHANGED)
if img.ndim == 2:  # grayscale, e.g. an edge mask
    img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
if img.shape[2] == 4:  # flatten transparency onto white
    alpha = img[:, :, 3:4] / 255.0
    img = (img[:, :, :3] * alpha + 255 * (1 - alpha)).astype(np.uint8)
if a.crop:
    x, y, w, h = map(int, a.crop.split(','))
    img = img[y : y + h, x : x + w]
if a.scale != 1:
    img = cv2.resize(img, None, fx=a.scale, fy=a.scale, interpolation=cv2.INTER_CUBIC)
if a.maxside and max(img.shape[:2]) > a.maxside:
    k = a.maxside / max(img.shape[:2])
    img = cv2.resize(img, None, fx=k, fy=k, interpolation=cv2.INTER_AREA)

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
if a.mode == 'light':
    mask = gray > a.thresh
elif a.mode == 'canny':
    # Photos: smooth away texture while keeping edges, then find the edges.
    smooth = cv2.bilateralFilter(img, 9, 60, 9)
    smooth = cv2.bilateralFilter(smooth, 9, 60, 9)
    mask = cv2.Canny(cv2.cvtColor(smooth, cv2.COLOR_BGR2GRAY), a.lo, a.hi) > 0
elif a.mode == 'edges':
    # Thin lines darker than what's around them, whatever their absolute brightness.
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    mask = cv2.morphologyEx(gray, cv2.MORPH_BLACKHAT, k) > a.thresh
else:
    mask = (gray < a.thresh) & (hsv[:, :, 1] <= a.sat)
mask = mask.astype(np.uint8)
if a.silhouette:
    body = (gray < a.silhouette).astype(np.uint8)
    body = cv2.morphologyEx(body, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    mask |= cv2.morphologyEx(body, cv2.MORPH_GRADIENT, np.ones((3, 3), np.uint8))
for e in a.erase:
    x, y, r = map(int, e.split(','))
    cv2.circle(mask, (x, y), r, 0, -1)
if a.dilate:
    mask = cv2.dilate(mask, np.ones((a.dilate, a.dilate), np.uint8))
# Drop specks: connected blobs smaller than --minlen pixels.
n, lab, stats, _ = cv2.connectedComponentsWithStats(mask, connectivity=8)
keep = np.zeros(n, bool)
keep[1:] = stats[1:, cv2.CC_STAT_AREA] >= a.minlen
mask = keep[lab].astype(np.uint8)
cv2.imwrite(a.out.replace('.svg', '-mask.png'), mask * 255)


def thin(m):
    """Zhang-Suen thinning down to a one-pixel skeleton."""
    m = np.pad(m.copy(), 1)
    while True:
        changed = False
        for step in (0, 1):
            P = m
            p2, p3, p4 = P[:-2, 1:-1], P[:-2, 2:], P[1:-1, 2:]
            p5, p6, p7 = P[2:, 2:], P[2:, 1:-1], P[2:, :-2]
            p8, p9 = P[1:-1, :-2], P[:-2, :-2]
            nb = [p2, p3, p4, p5, p6, p7, p8, p9]
            B = sum(n.astype(int) for n in nb)
            A = sum(((nb[i] == 0) & (nb[(i + 1) % 8] == 1)).astype(int) for i in range(8))
            if step == 0:
                c = (p2 * p4 * p6 == 0) & (p4 * p6 * p8 == 0)
            else:
                c = (p2 * p4 * p8 == 0) & (p2 * p6 * p8 == 0)
            rm = (P[1:-1, 1:-1] == 1) & (B >= 2) & (B <= 6) & (A == 1) & c
            if rm.any():
                m[1:-1, 1:-1][rm] = 0
                changed = True
        if not changed:
            return m[1:-1, 1:-1]


sk = thin(mask)
H, W = sk.shape
pts = set(zip(*np.nonzero(sk)))
OFF = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]


def nbrs(p):
    """m-adjacency: a diagonal neighbor only counts if no shared 4-neighbor links the two already,
    so staircase corners in the skeleton don't look like junctions."""
    y, x = p
    out = []
    for dy, dx in OFF:
        q = (y + dy, x + dx)
        if q not in pts:
            continue
        if dy and dx and ((y + dy, x) in pts or (y, x + dx) in pts):
            continue
        out.append(q)
    return out


deg = {p: len(nbrs(p)) for p in pts}
seen = set()


def walk(a0, b0):
    path = [a0, b0]
    seen.add(frozenset((a0, b0)))
    prev, cur = a0, b0
    while deg[cur] == 2:
        nxt = [n for n in nbrs(cur) if n != prev and frozenset((cur, n)) not in seen]
        if not nxt:
            break
        prev, cur = cur, nxt[0]
        seen.add(frozenset((prev, cur)))
        path.append(cur)
    return path


lines = []
for p in sorted(pts, key=lambda p: deg[p] == 2):  # endpoints and junctions first, then loops
    for n in nbrs(p):
        if frozenset((p, n)) not in seen:
            lines.append(walk(p, n))


def length(poly):
    d = np.diff(poly, axis=0)
    return float(np.sum(np.hypot(d[:, 0], d[:, 1])))


paths = []
total = 0
for ln in lines:
    poly = np.array([[x, y] for y, x in ln], dtype=np.float32)
    if len(poly) < 2:
        continue
    simp = cv2.approxPolyDP(poly.reshape(-1, 1, 2), a.eps, False).reshape(-1, 2)
    total += len(simp)
    rest = ' '.join(f'{x:.0f} {y:.0f}' for x, y in simp[1:])
    paths.append(f'M{simp[0][0]:.0f} {simp[0][1]:.0f}L{rest}')

d = ''.join(paths)
svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" fill="none" stroke="currentColor" '
    f'stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="{d}"/></svg>\n'
)
open(a.out, 'w').write(svg)

prev = np.full((H, W), 255, np.uint8)
for ln in lines:
    poly = np.array([[x, y] for y, x in ln], dtype=np.int32)
    if len(poly) >= 2:
        cv2.polylines(prev, [poly], False, 0, 1, cv2.LINE_AA)
cv2.imwrite(a.out.replace('.svg', '-preview.png'), prev)
print(f'{a.out}: {len(paths)} paths, {total} points, {len(svg) // 1024} KB, {W}x{H}')
