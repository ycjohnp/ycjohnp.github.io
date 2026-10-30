"""Draw the link previews: the 1200x630 images that show up when someone pastes a page into LinkedIn, Slack,
Discord or iMessage. Name and a line or two on the left, a real photo on the right, in the site's own type and
colors. Writes src/assets/og/site.jpg (every page that isn't a project) and one per project, named by its id.
Re-run it after adding a project or changing a title, tagline or cover:

    python3 scripts/og-card.py

A project without a card here falls back to its cover photo, cropped (see Base.astro).
"""

from pathlib import Path

import yaml
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).parent.parent
OUT = ROOT / 'src/assets/og'
W, H = 1200, 630
INK, MUTED, ACCENT = '#111418', '#4a505a', '#2347c8'
X = 72

fonts = ROOT / 'node_modules/@fontsource/ibm-plex-sans/files'
font = lambda weight, size: ImageFont.truetype(str(fonts / f'ibm-plex-sans-latin-{weight}-normal.woff'), size)


def wrap(d, text, f, width):
    """Break text into lines that fit width; Pillow doesn't."""
    lines, line = [], ''
    for word in text.split():
        trial = f'{line} {word}'.strip()
        if line and d.textlength(trial, font=f) > width:
            lines.append(line)
            line = word
        else:
            line = trial
    return lines + [line]


def card(photo, title, line, foot, out):
    img = Image.open(photo).convert('RGB')
    # The photo panel follows the photo's shape, so portrait shots aren't cropped to a sliver of the middle.
    pw = round(min(max(H * img.width / img.height, 440), 620))
    c = Image.new('RGB', (W, H), 'white')
    c.paste(ImageOps.fit(img, (pw, H), Image.LANCZOS, centering=(0.5, 0.45)), (W - pw, 0))
    d = ImageDraw.Draw(c)
    d.line([(W - pw - 1, 0), (W - pw - 1, H)], fill=INK, width=2)
    right = W - pw - 64

    # Shrink the title until it fits in two lines.
    size = 84
    while len(wrap(d, title, font(600, size), right - X)) > 2:
        size -= 4
    big = font(600, size)
    y = 110
    for t in wrap(d, title, big, right - X):
        d.text((X, y), t, font=big, fill=INK)
        y += round(size * 1.12)
    y += 28
    body = font(400, 32)
    for t in wrap(d, line, body, right - X)[:3]:
        d.text((X, y), t, font=body, fill=MUTED)
        y += 46

    d.line([(X, 486), (right, 486)], fill=INK, width=2)
    small = font(400, 24)
    d.text((X, 508), foot, font=small, fill=INK)
    d.text((X, 546), 'ycjohnp.github.io', font=small, fill=ACCENT)
    c.save(out, quality=92, optimize=True)
    print(f'wrote {out.relative_to(ROOT)}')


OUT.mkdir(parents=True, exist_ok=True)
card(
    ROOT / 'src/assets/projects/cove/arm-whiteboard.jpg',
    'John Peng',
    'I build robots and the electronics inside them.',
    'Electrical and computer engineering, USC',
    OUT / 'site.jpg',
)
for md in sorted((ROOT / 'src/content/projects').glob('*.md')):
    data = yaml.safe_load(md.read_text().split('---')[1])
    if not data.get('cover'):
        continue
    card(md.parent / data['cover'], data['title'], data['tagline'], data['context'], OUT / f'{md.stem}.jpg')
