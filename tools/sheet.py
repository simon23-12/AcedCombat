"""stack preview renders: python3 tools/sheet.py <kind>... -> build/air/<kind>_sheet.png"""
import sys
from PIL import Image
for k in sys.argv[1:]:
    ims = [Image.open(f'build/air/{k}_prev_{s}.png') for s in ('front', 'top', 'rear')]
    w, h = ims[0].size
    s = Image.new('RGB', (w, h * 3))
    for i, im in enumerate(ims):
        s.paste(im, (0, i * h))
    s.thumbnail((900, 1700))
    s.save(f'build/air/{k}_sheet.png')
