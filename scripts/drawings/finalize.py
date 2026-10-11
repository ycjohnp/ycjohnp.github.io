"""Prepare a line-drawing SVG for src/assets/drawings/: set the ink color and embed the line styles.

The site shows drawings with <img> (see src/components/Sketch.astro), so page CSS can't reach inside them;
each file carries its own stroke color, non-scaling 1px strokes, the dashed (.dash) and dash-dot (.center)
line types, and the slow turn used by the gear pair (.spin, .spin-back).

usage: finalize.py IN.svg OUT.svg
"""
import re
import sys

STYLE = (
    '<style>path,circle{vector-effect:non-scaling-stroke}.dash{stroke-dasharray:4 3}'
    '.center{stroke-dasharray:14 3 2 3}.spin,.spin-back{transform-box:fill-box;transform-origin:center}'
    '@media (prefers-reduced-motion:no-preference){.spin{animation:t 40s linear infinite}'
    '.spin-back{animation:t 67.7s linear infinite reverse}}@keyframes t{to{transform:rotate(360deg)}}</style>'
)

src, out = sys.argv[1], sys.argv[2]
s = open(src).read().replace('stroke="currentColor"', 'stroke="#111418"')
if '<style>' not in s:
    s = re.sub(r'(<svg[^>]*>)', r'\1' + STYLE, s, count=1)
open(out, 'w').write(s)
