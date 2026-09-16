"""PIL-based visual inspector for QA screenshots.
Usage: python qa/qa-grid.py <dir> [grid-size] [filter-prefix]
Prints an ASCII luminance grid + mean per file so composition problems
(blank frames, dead crops, lopsided scenes) are visible. Decoding is done
by Pillow, which is reliable (the old Node decoder produced false black).
"""
import os
import sys

try:
    from PIL import Image
except ImportError:
    print("NO_PIL — pip install pillow")
    raise SystemExit(1)

target = sys.argv[1] if len(sys.argv) > 1 else "qa/scenes-final"
gs = int(sys.argv[2]) if len(sys.argv) > 2 else 10
prefix = sys.argv[3] if len(sys.argv) > 3 else ""

files = sorted(
    f for f in os.listdir(target)
    if f.endswith(".png") and f.startswith(prefix)
) if os.path.isdir(target) else [os.path.basename(target)]

RAMP = " .:-=+*#%@"
for f in files:
    path = os.path.join(target, f)
    im = Image.open(path).convert("RGB")
    w, h = im.size
    total = 0
    print(f"== {f}  {w}x{h}")
    for gy in range(gs):
        row = ""
        for gx in range(gs):
            box = im.crop((gx * w // gs, gy * h // gs, (gx + 1) * w // gs, (gy + 1) * h // gs)).resize((1, 1))
            r, g, b = box.getpixel((0, 0))
            lum = (r * 299 + g * 587 + b * 114) // 1000
            total += lum
            row += RAMP[min(9, lum * 10 // 256)]
        print("   ", row)
    print(f"    mean={total // (gs * gs)}")
