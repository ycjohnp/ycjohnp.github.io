"""Line drawing of a URDF robot (STL meshes), posed by its joints: renders surface normals and depth with
smoothed normals, then marks creases and depth jumps. Writes an edge mask PNG for trace.py --mode light.

usage: urdf_render.py ROBOT.urdf OUT.png [--az DEG] [--el DEG] [--joint name=rad ...] [--feature DEG] [--px N]
  The package:// mesh paths are resolved against the folder above the urdf/ directory.
  Lines: creases (normals differing by more than --feature), depth jumps where one part passes in front of
  another, and the outline against the background. Normals are smoothed within each surface first, so curved
  parts don't show their triangles.
"""
import argparse
import math
import os
import xml.etree.ElementTree as ET

import numpy as np
import vtk
from vtk.util.numpy_support import vtk_to_numpy

ap = argparse.ArgumentParser()
ap.add_argument('urdf')
ap.add_argument('out')
ap.add_argument('--az', type=float, default=35, help='camera azimuth around the vertical axis, degrees')
ap.add_argument('--el', type=float, default=25, help='camera elevation, degrees')
ap.add_argument('--up', default='z', help='which model axis is up: z (ROS) or y')
ap.add_argument('--joint', action='append', default=[], help='name=angle_in_radians')
ap.add_argument('--feature', type=float, default=35)
ap.add_argument('--depth-jump', type=float, default=0.002, dest='depth_jump')
ap.add_argument('--px', type=int, default=3000, help='render size')
ap.add_argument('--fill', type=float, default=0.5, help='scale on the auto-framed view; smaller zooms in')
ap.add_argument('--skip', action='append', default=[], help='leave out meshes whose file name starts with this (e.g. screws)')
a = ap.parse_args()

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(a.urdf)))
robot = ET.parse(a.urdf).getroot()
angles = {k: float(v) for k, v in (j.split('=') for j in a.joint)}


def rpy_matrix(r, p, y):
    cr, sr, cp, sp, cy, sy = math.cos(r), math.sin(r), math.cos(p), math.sin(p), math.cos(y), math.sin(y)
    return np.array([
        [cy * cp, cy * sp * sr - sy * cr, cy * sp * cr + sy * sr],
        [sy * cp, sy * sp * sr + cy * cr, sy * sp * cr - cy * sr],
        [-sp, cp * sr, cp * cr],
    ])


def origin(el):
    T = np.eye(4)
    if el is not None:
        T[:3, 3] = [float(v) for v in el.get('xyz', '0 0 0').split()]
        T[:3, :3] = rpy_matrix(*[float(v) for v in el.get('rpy', '0 0 0').split()])
    return T


def axis_angle(axis, th):
    x, y, z = axis / np.linalg.norm(axis)
    c, s, C = math.cos(th), math.sin(th), 1 - math.cos(th)
    T = np.eye(4)
    T[:3, :3] = [[c + x * x * C, x * y * C - z * s, x * z * C + y * s],
                 [y * x * C + z * s, c + y * y * C, y * z * C - x * s],
                 [z * x * C - y * s, z * y * C + x * s, c + z * z * C]]
    return T


# Forward kinematics from the root link.
children = {}
for j in robot.findall('joint'):
    children.setdefault(j.find('parent').get('link'), []).append(j)
child_links = {j.find('child').get('link') for j in robot.findall('joint')}
roots = [l.get('name') for l in robot.findall('link') if l.get('name') not in child_links]
world = {r: np.eye(4) for r in roots}
stack = list(roots)
while stack:
    p = stack.pop()
    for j in children.get(p, []):
        T = world[p] @ origin(j.find('origin'))
        if j.get('type') in ('revolute', 'continuous'):
            ax = np.array([float(v) for v in (j.find('axis').get('xyz') if j.find('axis') is not None else '1 0 0').split()])
            T = T @ axis_angle(ax, angles.get(j.get('name'), 0.0))
        c = j.find('child').get('link')
        world[c] = T
        stack.append(c)

# Load every visual mesh, posed in the world frame.
if a.up == 'y':
    to_z_up = np.array([[1, 0, 0, 0], [0, 0, -1, 0], [0, 1, 0, 0], [0, 0, 0, 1.0]])
else:
    to_z_up = np.eye(4)
meshes = []
for link in robot.findall('link'):
    for vis in link.findall('visual'):
        m = vis.find('geometry/mesh')
        if m is None:
            continue
        path = m.get('filename').replace('package://', '')
        path = os.path.join(root_dir, path.split('/', 1)[1])
        if any(os.path.basename(path).startswith(k) for k in a.skip):
            continue
        T = to_z_up @ world.get(link.get('name'), np.eye(4)) @ origin(vis.find('origin'))
        reader = vtk.vtkSTLReader()
        reader.SetFileName(path)
        clean = vtk.vtkCleanPolyData()
        clean.SetInputConnection(reader.GetOutputPort())
        clean.SetTolerance(1e-6)
        tf = vtk.vtkTransform()
        tf.SetMatrix(T.flatten().tolist())
        tfp = vtk.vtkTransformPolyDataFilter()
        tfp.SetTransform(tf)
        tfp.SetInputConnection(clean.GetOutputPort())
        tfp.Update()
        pd = vtk.vtkPolyData()
        pd.DeepCopy(tfp.GetOutput())
        meshes.append(pd)
print(f'{len(meshes)} meshes, {sum(m.GetNumberOfCells() for m in meshes):,} triangles')

# Smooth normals across facets, split at real creases, so curved surfaces don't show their tessellation.
ren = vtk.vtkRenderer()
ren.SetBackground(0, 0, 0)
win = vtk.vtkRenderWindow()
win.SetOffScreenRendering(1)
win.SetMultiSamples(0)
win.AddRenderer(ren)
for pd in meshes:
    nf = vtk.vtkPolyDataNormals()
    nf.SetInputData(pd)
    nf.SetFeatureAngle(a.feature)
    nf.SplittingOn()
    nf.ConsistencyOn()
    nf.Update()
    out = nf.GetOutput()
    N = vtk_to_numpy(out.GetPointData().GetNormals())
    rgb = ((N + 1) / 2 * 255).clip(0, 255).astype(np.uint8)
    colors = vtk.vtkUnsignedCharArray()
    colors.SetNumberOfComponents(3)
    colors.SetName('n')
    for c in rgb:
        colors.InsertNextTuple3(*c)
    out.GetPointData().SetScalars(colors)
    mapper = vtk.vtkPolyDataMapper()
    mapper.SetInputData(out)
    mapper.SetColorModeToDirectScalars()
    mapper.ScalarVisibilityOn()
    actor = vtk.vtkActor()
    actor.SetMapper(mapper)
    actor.GetProperty().LightingOff()
    ren.AddActor(actor)

bounds = np.array(ren.ComputeVisiblePropBounds())
center = (bounds[0::2] + bounds[1::2]) / 2
az, el = math.radians(a.az), math.radians(a.el)
view = np.array([math.cos(el) * math.cos(az), math.cos(el) * math.sin(az), math.sin(el)])
cam = ren.GetActiveCamera()
cam.ParallelProjectionOn()
cam.SetFocalPoint(*center)
cam.SetPosition(*(center + view * 10))
cam.SetViewUp(0, 0, 1)
win.SetSize(a.px, a.px)
ren.ResetCamera()
# ResetCamera frames the bounding sphere, which leaves a wide margin; tighten to the projected extent.
cam.SetParallelScale(cam.GetParallelScale() * a.fill)
win.Render()

grab = vtk.vtkWindowToImageFilter()
grab.SetInput(win)
grab.SetInputBufferTypeToRGB()
grab.ReadFrontBufferOff()
grab.Update()
img = grab.GetOutput()
W, H, _ = img.GetDimensions()
C = vtk_to_numpy(img.GetPointData().GetScalars()).reshape(H, W, 3)[::-1].astype(np.float32)
zbuf = vtk.vtkFloatArray()
win.GetZbufferData(0, 0, W - 1, H - 1, zbuf)
Z = vtk_to_numpy(zbuf).reshape(H, W)[::-1]

bg = Z >= 1.0
Nrm = C / 255 * 2 - 1
Nrm /= np.linalg.norm(Nrm, axis=2, keepdims=True) + 1e-6

# Creases: neighboring pixels whose normals differ by more than --feature degrees.
cos_t = math.cos(math.radians(a.feature))
crease = np.zeros((H, W), bool)
for dy, dx in ((0, 1), (1, 0)):
    a1 = Nrm[: H - dy, : W - dx]
    b1 = Nrm[dy:, dx:]
    dot = (a1 * b1).sum(axis=2)
    m = (dot < cos_t) & ~bg[: H - dy, : W - dx] & ~bg[dy:, dx:]
    crease[: H - dy, : W - dx] |= m
# Depth jumps (one part in front of another), and the outline against the background.
zr = Z.copy()
zr[bg] = 1.0
jump = np.zeros((H, W), bool)
for dy, dx in ((0, 1), (1, 0)):
    d = np.abs(zr[: H - dy, : W - dx] - zr[dy:, dx:])
    jump[: H - dy, : W - dx] |= d > a.depth_jump
outline = bg ^ np.roll(bg, 1, 0) | bg ^ np.roll(bg, 1, 1)
edges = (crease | jump | outline) & ~(bg & np.roll(bg, 1, 0) & np.roll(bg, 1, 1))
import cv2
cv2.imwrite(a.out, (edges * 255).astype(np.uint8))
print(f'{a.out}: {W}x{H}, {int(edges.sum()):,} edge pixels')
