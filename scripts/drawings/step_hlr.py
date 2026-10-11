"""Hidden-line drawing of a STEP model, the way CAD drawing views are made, written out as SVG.

usage: step_hlr.py MODEL.step OUT.svg [--dir x,y,z] [--up x,y,z] [--poly] [--smooth]
  --dir   viewing direction (from the eye toward the model); default is an isometric view
  --poly  use the faster polygonal algorithm on a mesh instead of exact B-rep HLR
  --smooth  also draw smooth (tangent) edges between faces, e.g. where a fillet meets a flat
"""
import argparse
import math
import time

import cadquery as cq
from OCP.BRep import BRep_Tool
from OCP.BRepAdaptor import BRepAdaptor_Curve
from OCP.BRepMesh import BRepMesh_IncrementalMesh
from OCP.GCPnts import GCPnts_QuasiUniformDeflection
from OCP.gp import gp_Ax2, gp_Dir, gp_Pnt
from OCP.HLRAlgo import HLRAlgo_Projector
from OCP.HLRBRep import HLRBRep_Algo, HLRBRep_HLRToShape, HLRBRep_PolyAlgo, HLRBRep_PolyHLRToShape
from OCP.TopAbs import TopAbs_EDGE
from OCP.TopExp import TopExp_Explorer
from OCP.TopoDS import TopoDS

ap = argparse.ArgumentParser()
ap.add_argument('src')
ap.add_argument('out')
ap.add_argument('--dir', default='-1,-1,-1')
ap.add_argument('--up', default='0,0,1')
ap.add_argument('--poly', action='store_true')
ap.add_argument('--smooth', action='store_true')
ap.add_argument('--deflection', type=float, default=0.0)
a = ap.parse_args()

t0 = time.time()
shape = cq.importers.importStep(a.src).val().wrapped
print(f'loaded in {time.time() - t0:.1f}s')

d = [float(v) for v in a.dir.split(',')]
u = [float(v) for v in a.up.split(',')]
# Projector looking along d. The x direction of the 2D view is up x d (so "up" points up on the page).
dx = (u[1] * d[2] - u[2] * d[1], u[2] * d[0] - u[0] * d[2], u[0] * d[1] - u[1] * d[0])
ax = gp_Ax2(gp_Pnt(0, 0, 0), gp_Dir(-d[0], -d[1], -d[2]), gp_Dir(*dx))
projector = HLRAlgo_Projector(ax)

t0 = time.time()
if a.poly:
    BRepMesh_IncrementalMesh(shape, a.deflection or 0.05, False, 0.3, True)
    algo = HLRBRep_PolyAlgo()
    algo.Load(shape)
    algo.Projector(projector)
    algo.Update()
    hlr = HLRBRep_PolyHLRToShape()
    hlr.Update(algo)
else:
    algo = HLRBRep_Algo()
    algo.Add(shape)
    algo.Projector(projector)
    algo.Update()
    algo.Hide()
    hlr = HLRBRep_HLRToShape(algo)
print(f'hidden lines removed in {time.time() - t0:.1f}s')

groups = [hlr.VCompound(), hlr.OutLineVCompound()]
if a.smooth:
    groups.append(hlr.Rg1LineVCompound())

polylines = []
for comp in groups:
    if comp is None or comp.IsNull():
        continue
    exp = TopExp_Explorer(comp, TopAbs_EDGE)
    while exp.More():
        edge = TopoDS.Edge(exp.Current())
        try:
            curve = BRepAdaptor_Curve(edge)
            disc = GCPnts_QuasiUniformDeflection(curve, 0.02)
            if disc.IsDone() and disc.NbPoints() > 1:
                polylines.append([(disc.Value(i).X(), -disc.Value(i).Y()) for i in range(1, disc.NbPoints() + 1)])
        except Exception:
            pass
        exp.Next()

xs = [x for pl in polylines for x, _ in pl]
ys = [y for pl in polylines for _, y in pl]
minx, miny, w, h = min(xs), min(ys), max(xs) - min(xs), max(ys) - min(ys)
# Scale to a 1000-unit-wide canvas so numbers stay short.
k = 1000 / max(w, h)
pad = 10
def fmt(v):
    return f'{v:.1f}'.rstrip('0').rstrip('.')
d_attr = ''.join(
    'M' + ' L'.join(f'{fmt((x - minx) * k + pad)} {fmt((y - miny) * k + pad)}' for x, y in pl) for pl in polylines
)
W, H = w * k + 2 * pad, h * k + 2 * pad
svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fmt(W)} {fmt(H)}" fill="none" stroke="currentColor" '
    f'stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="{d_attr}"/></svg>\n'
)
open(a.out, 'w').write(svg)
print(f'{a.out}: {len(polylines)} edges, {len(svg) // 1024} KB, {fmt(W)}x{fmt(H)}')
