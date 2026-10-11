"""A braille word as a technical drawing: cells at standard spacing (2.5 mm between dots, 6 mm between cells),
raised dots as domes, empty positions as small ticks, a section through the top row showing the embossed
bumps in the paper, and dimension lines for the dot and cell pitch.

usage: braille.py OUT.svg [WORD]
"""
import sys

out = sys.argv[1]
word = (sys.argv[2] if len(sys.argv) > 2 else 'braille').lower()

# Dots numbered 1-3 down the left column, 4-6 down the right.
LETTERS = {
    'a': '1', 'b': '12', 'c': '14', 'd': '145', 'e': '15', 'f': '124', 'g': '1245', 'h': '125', 'i': '24',
    'j': '245', 'k': '13', 'l': '123', 'm': '134', 'n': '1345', 'o': '135', 'p': '1234', 'q': '12345',
    'r': '1235', 's': '234', 't': '2345', 'u': '136', 'v': '1236', 'w': '2456', 'x': '1346', 'y': '13456',
    'z': '1356', ' ': '',
}
S = 12  # drawing units per mm
DOT, CELL, R = 2.5 * S, 6.0 * S, 0.75 * S
f = lambda v: f'{v:.1f}'.rstrip('0').rstrip('.')
parts = []


def circle(x, y, r, cls=''):
    parts.append(f'<circle{f" class=\"{cls}\"" if cls else ""} cx="{f(x)}" cy="{f(y)}" r="{f(r)}"/>')


def path(d, cls=''):
    parts.append(f'<path{f" class=\"{cls}\"" if cls else ""} d="{d}"/>')


def arrow_dim(x0, x1, y, tick=6):
    """A horizontal dimension line from x0 to x1 with arrowheads and extension ticks."""
    path(f'M{f(x0)} {f(y)} L{f(x1)} {f(y)}')
    for x, s in ((x0, 1), (x1, -1)):
        path(f'M{f(x + s * 7)} {f(y - 2.5)} L{f(x)} {f(y)} L{f(x + s * 7)} {f(y + 2.5)}')
        path(f'M{f(x)} {f(y - tick)} L{f(x)} {f(y + tick)}')


x0, y0 = 30, 40
for k, ch in enumerate(word):
    dots = LETTERS.get(ch, '')
    cx = x0 + k * CELL
    for n in range(1, 7):
        col, row = (0, n - 1) if n <= 3 else (1, n - 4)
        x, y = cx + col * DOT, y0 + row * DOT
        if str(n) in dots:
            circle(x, y, R)          # the dot's footprint
            circle(x, y, R * 0.45)   # and its crown
        else:
            path(f'M{f(x - 2)} {f(y)} L{f(x + 2)} {f(y)}')

# Section through the top row of dots: the paper, with a dome wherever a dot is raised.
sy = y0 + 2 * DOT + 4 * S
xs = x0 - 1.5 * S
xe = x0 + (len(word) - 1) * CELL + DOT + 1.5 * S
top = [f'M{f(xs)} {f(sy)}']
for k, ch in enumerate(word):
    dots = LETTERS.get(ch, '')
    for col, n in ((0, '1'), (1, '4')):
        if n in dots:
            x = x0 + k * CELL + col * DOT
            top.append(f'L{f(x - R)} {f(sy)} A{f(R)} {f(R * 0.8)} 0 0 1 {f(x + R)} {f(sy)}')
top.append(f'L{f(xe)} {f(sy)}')
path(' '.join(top))
path(f'M{f(xs)} {f(sy + 0.4 * S)} L{f(xe)} {f(sy + 0.4 * S)}')  # underside of the paper
# Section cut line through the top row.
path(f'M{f(xs - 10)} {f(y0)} L{f(xe + 10)} {f(y0)}', 'center')

# Dimensions: dot pitch within a cell, and cell pitch.
arrow_dim(x0, x0 + DOT, y0 - 2 * S)
arrow_dim(x0, x0 + CELL, sy + 2.5 * S)

W = xe + 40
H = sy + 3.5 * S
svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(W)} {f(H)}" fill="none" stroke="currentColor" '
    f'stroke-width="1" stroke-linecap="round" stroke-linejoin="round">' + ''.join(parts) + '</svg>\n'
)
open(out, 'w').write(svg)
print(f'{out}: "{word}"')
