"""ArUco markers in 3D, as line drawings: real DICT_5X5_100 markers seen through a perspective camera, black
cells hatched, with the pose estimate drawn on top: x and y axes, the z normal, and a dashed pose box.

usage: aruco.py OUTDIR
Writes aruco-pose.svg (one tilted marker), aruco-board.svg (a board of markers, like a calibration view),
aruco-finger.svg (markers along a bending finger, each with its own normal, like FlexSense), and
apriltags.svg (real AprilTag 36h11 tags lying flat, no pose).
Same conventions as draw.py: currentColor strokes, .dash for construction lines.
"""
import math
import sys

import cv2
import numpy as np

out = sys.argv[1]
DICT = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_5X5_100)
f = lambda v: f'{v:.1f}'.rstrip('0').rstrip('.')


APRIL = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_APRILTAG_36h11)


def bits(marker_id, dictionary=DICT):
    """The marker's cells (data plus the black border); True is black. 7x7 for 5x5 ArUco, 8x8 for AprilTag 36h11."""
    n = dictionary.markerSize + 2
    img = cv2.aruco.generateImageMarker(dictionary, marker_id, n * 10)
    return img.reshape(n, 10, n, 10).mean(axis=(1, 3)) < 128


def rot(rx, ry, rz):
    """Rotation from Euler angles in degrees, applied x, then y, then z."""
    rx, ry, rz = map(math.radians, (rx, ry, rz))
    X = np.array([[1, 0, 0], [0, math.cos(rx), -math.sin(rx)], [0, math.sin(rx), math.cos(rx)]])
    Y = np.array([[math.cos(ry), 0, math.sin(ry)], [0, 1, 0], [-math.sin(ry), 0, math.cos(ry)]])
    Z = np.array([[math.cos(rz), -math.sin(rz), 0], [math.sin(rz), math.cos(rz), 0], [0, 0, 1]])
    return Z @ Y @ X


class Camera:
    """A pinhole camera at the origin looking down +z, image y pointing down."""

    def __init__(self, focal=900):
        self.f = focal

    def project(self, P):
        P = np.atleast_2d(P)
        return np.c_[self.f * P[:, 0] / P[:, 2], self.f * P[:, 1] / P[:, 2]]


class FlatCamera:
    """Straight-on, no perspective: for markers drawn flat on the page."""

    def project(self, P):
        P = np.atleast_2d(P)
        return P[:, :2].copy()


class Drawing:
    def __init__(self):
        self.parts = []  # (class, [points])

    def line(self, pts, cls=''):
        self.parts.append((cls, np.asarray(pts, dtype=float)))

    def svg(self, pad=16):
        allp = np.concatenate([p for _, p in self.parts])
        mn = allp.min(axis=0) - pad
        size = allp.max(axis=0) + pad - mn
        body = []
        for cls in sorted({c for c, _ in self.parts}):
            d = ''.join('M' + ' L'.join(f'{f(x - mn[0])} {f(y - mn[1])}' for x, y in p) for c, p in self.parts if c == cls)
            body.append(f'<path{f" class=\"{cls}\"" if cls else ""} d="{d}"/>')
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(size[0])} {f(size[1])}" fill="none" '
            f'stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">'
            + ''.join(body) + '</svg>\n'
        )


def marker(dr, cam, marker_id, R, t, side, axes=True, box=True, hatch=0.3, dictionary=DICT):
    """Draw one marker of edge length `side`, centered at t with orientation R (its normal is R's z column,
    pointing back toward the camera)."""
    B = bits(marker_id, dictionary)
    N = len(B)
    cell = side / N

    def to3d(u, v):
        """Marker-plane coordinates (cells, from the top-left corner) to camera space."""
        local = np.c_[(np.asarray(u) - N / 2) * cell, (np.asarray(v) - N / 2) * cell, np.zeros(np.size(u))]
        return local @ R.T + t

    def seg2d(u0, v0, u1, v1):
        return cam.project(to3d([u0, u1], [v0, v1]))

    black = lambda i, j: 0 <= i < N and 0 <= j < N and B[j, i]
    # Outlines: every cell edge with black on exactly one side. The outer square comes out of this too.
    for j in range(N + 1):
        for i in range(N):
            if black(i, j - 1) != black(i, j):
                dr.line(seg2d(i, j, i + 1, j))
    for i in range(N + 1):
        for j in range(N):
            if black(i - 1, j) != black(i, j):
                dr.line(seg2d(i, j, i, j + 1))
    # Hatching across the black cells, at 45 degrees in the marker's own plane, `hatch` cells apart.
    for c in np.arange(-N + hatch / 2, N, hatch * 2 ** 0.5):
        s = np.linspace(0, N, 900)
        u, v = s, s + c  # the line v = u + c
        inside = (v >= 0) & (v < N)
        on = np.zeros(len(s), bool)
        on[inside] = B[v[inside].astype(int).clip(0, N - 1), u[inside].astype(int).clip(0, N - 1)]
        # Each run of black becomes one hatch segment.
        edges = np.flatnonzero(np.diff(np.r_[0, on.astype(int), 0]))
        for a0, a1 in zip(edges[0::2], edges[1::2] - 1):
            if a1 > a0:
                dr.line(seg2d(u[a0], v[a0], u[a1], v[a1]))
    n = R[:, 2]
    if box:
        corners = [to3d(0, 0)[0], to3d(N, 0)[0], to3d(N, N)[0], to3d(0, N)[0]]
        top = [c - n * side * 0.6 for c in corners]
        for k in range(4):
            dr.line(cam.project(np.array([top[k], top[(k + 1) % 4]])), 'dash')
            dr.line(cam.project(np.array([corners[k], top[k]])), 'dash')
    if axes:
        L = side * 0.85
        for direction in (R[:, 0], -R[:, 1], -n):  # x right, y up the marker, z out of the marker
            a, b = cam.project(np.array([t, t + direction * L]))
            dr.line([a, b])
            v = b - a
            v /= np.linalg.norm(v) + 1e-9
            w = np.array([-v[1], v[0]])
            dr.line([b - v * 9 + w * 3.5, b, b - v * 9 - w * 3.5])
        dr.line(cam.project(np.array([t])) + np.array([[-3, 0], [3, 0]]))
        dr.line(cam.project(np.array([t])) + np.array([[0, -3], [0, 3]]))


cam = Camera(900)

# One tilted marker with its full pose.
dr = Drawing()
marker(dr, cam, 7, rot(-50, 28, 12), np.array([0, 0, 600.0]), 160, hatch=0.22)
open(f'{out}/aruco-pose.svg', 'w').write(dr.svg())

# A board of markers on a tilted plane, like a calibration view: markers in a checker pattern with
# empty squares between, each with its own axes.
dr = Drawing()
Rb = rot(-58, 0, 8)
pitch = 70
ids = iter([0, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 14])
for r in range(4):
    for c in range(5):
        if (r + c) % 2:
            continue
        center = np.array([(c - 2) * pitch, (r - 1.5) * pitch, 0]) @ Rb.T + np.array([0, 20, 520.0])
        marker(dr, cam, next(ids), Rb, center, pitch * 0.8, box=(r + c) % 4 == 0)
open(f'{out}/aruco-board.svg', 'w').write(dr.svg())

# Markers along a finger bending through 70 degrees, each with its normal.
dr = Drawing()
seg = 64
pos = np.array([-120.0, 40, 560])
angle = 0.0
joints = [pos.copy()]
for k, mid in enumerate([3, 9, 13, 21]):
    Rk = rot(-35, 0, 0) @ rot(0, angle, 0)
    u = Rk[:, 0]
    center = pos + u * seg / 2
    marker(dr, cam, mid, Rk, center, seg * 0.72, box=False)
    pos = pos + u * seg
    joints.append(pos.copy())
    angle += 23
# The finger itself: a thin strip under the markers, drawn as its two long edges.
for side in (-1, 1):
    edge = []
    angle = 0.0
    p = np.array([-120.0, 40, 560])
    for k in range(5):
        Rk = rot(-35, 0, 0) @ rot(0, min(angle, 69), 0)
        edge.append(p + Rk[:, 1] * side * seg * 0.48)
        if k < 4:
            p = p + Rk[:, 0] * seg
            angle += 23
    dr.line(cam.project(np.array(edge)), 'dash')
open(f'{out}/aruco-finger.svg', 'w').write(dr.svg())

# Real AprilTag 36h11 tags, flat on the page, scattered at slight angles like printed tags on a table.
dr = Drawing()
flat = FlatCamera()
for tag, x, y, side, turn in [(0, 0, 0, 150, -8), (5, 190, 40, 120, 11), (12, 70, 175, 105, 4), (23, 255, 200, 90, -14)]:
    marker(dr, flat, tag, rot(0, 0, turn), np.array([x, y, 0.0]), side, axes=False, box=False, hatch=0.32,
           dictionary=APRIL)
open(f'{out}/apriltags.svg', 'w').write(dr.svg())
print('wrote aruco-pose.svg, aruco-board.svg, aruco-finger.svg, apriltags.svg')

