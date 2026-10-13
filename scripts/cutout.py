"""Cut a CAD render out of its white background, so it sits on the page in both light and dark mode.

Only white connected to the image border is removed, so light-gray parts (brackets, base plates) stay solid.
Edge pixels get partial alpha and are un-blended from white, so there's no white fringe on a dark page.

    python3 scripts/cutout.py src/assets/projects/cove/cad.jpg src/assets/projects/cove/cad-cutout.png
"""

import argparse

import numpy as np
from PIL import Image
from scipy import ndimage

parser = argparse.ArgumentParser()
parser.add_argument('src')
parser.add_argument('out')
parser.add_argument('--white', type=float, default=232, help='at or above this is background white')
parser.add_argument('--edge', type=float, default=150, help='edge pixels at or below this are fully opaque')
args = parser.parse_args()

rgb = np.asarray(Image.open(args.src).convert('RGB')).astype(float)
lum = rgb.min(axis=2)  # the darkest channel: white is 255 in all three, blue parts are low in red

# Background: near-white regions that touch the border.
labels, _ = ndimage.label(lum >= args.white)
border = np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))
background = np.isin(labels, border[border > 0])

# JPEG noise leaves specks just under the threshold out in the background; fold small ones into it.
specks, count = ndimage.label(~background)
sizes = ndimage.sum(np.ones(lum.shape), specks, range(1, count + 1))
background |= np.isin(specks, np.flatnonzero(sizes < 40) + 1)

# A two-pixel band around the background is antialiased edge: fade it by how close to white it is.
band = ndimage.binary_dilation(background, iterations=2) & ~background
alpha = np.ones(lum.shape)
alpha[background] = 0
alpha[band] = np.clip((255 - lum[band]) / (255 - args.edge), 0, 1)

# Un-blend the edge from white: observed = a * color + (1 - a) * 255.
a = alpha[..., None]
color = np.where(a > 0, (rgb - (1 - a) * 255) / np.maximum(a, 1e-6), 0)
out = np.dstack([np.clip(color, 0, 255), alpha * 255]).round().astype(np.uint8)

# Same size as the source, so callout positions given as % of the image still line up.
Image.fromarray(out, 'RGBA').save(args.out, optimize=True)
print(f'{args.out}: {background.mean():.0%} background removed')
