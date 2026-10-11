# Drawings

The faint line drawings behind the site's pages live in `src/assets/drawings/` and are placed with
`src/components/Sketch.astro`. These scripts make them. They need Python with numpy, scipy, opencv,
matplotlib, VTK and cadquery (which brings OpenCascade).

Use clean sources only: STEP files, URDF meshes, CAD renders, your own drawing or PCB exports. Tracing real
photos gives wobbly, noisy lines that look bad on the site.

## From a STEP file (best)

Exact hidden-line views, the way CAD drawing views are made. The view direction points from the eye toward
the model; `--up` picks which model axis points up on the page.

```bash
python3 scripts/drawings/step_hlr.py model.step raw.svg --poly --dir=-1,-1,1 --up=0,0,1
python3 scripts/drawings/slim.py raw.svg slim.svg --eps 0.6 --minlen 3
python3 scripts/drawings/finalize.py slim.svg src/assets/drawings/NAME.svg
```

The module views came from the modular robot STEP with `--dir=-1,-1,1 --up=0,0,1` (`module`),
`--dir=0,0,-1 --up=0,1,0` (`module-front`) and `--dir=-1,0,0 --up=0,1,0` (`module-side`).

## From a URDF

Poses the robot from its joints, renders it, and marks creases and outlines. The result is an edge mask that
`trace.py` turns into strokes. `--joint name=radians` sets joint angles; `--skip` leaves out meshes by file
name prefix.

```bash
python3 scripts/drawings/urdf_render.py robot/urdf/robot.urdf mask.png --az=35 --el=22 --fill 0.52 --skip M2 --skip _M2
python3 scripts/drawings/trace.py mask.png raw.svg --mode light --thresh 128 --minlen 25 --eps 1.0
python3 scripts/drawings/slim.py raw.svg slim.svg --eps 0.7 --minlen 4
python3 scripts/drawings/finalize.py slim.svg src/assets/drawings/NAME.svg
```

That is how `cove` was made, from the Cove assembly export.

## From a render or a drawing image

`trace.py` has modes for light lines on dark (`light`, e.g. a DWG screenshot), dark edge lines on a light
CAD render (`edges`, add `--silhouette 240` for the outline), and dark lines (`dark`).

```bash
python3 scripts/drawings/trace.py render.png raw.svg --mode edges --thresh 30 --silhouette 240 --minlen 25 --eps 1.0
```

## Drawn from scratch

`draw.py` makes the gear pair and the arm schematic; `mech.py` makes the cam and follower and the four-bar
linkage. Run either with an output folder, then `finalize.py` each file.

## Checking a drawing

`svgpng.py raw.svg preview.png 1200` renders one to a PNG so you can look at it before it goes on the site.
