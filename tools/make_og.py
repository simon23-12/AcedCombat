"""Grade the Blender cover renders and compose the link preview / title art / app icons.

python3 tools/make_og.py   (needs build/og.png, optional build/title.png)
-> assets/ui/og.jpg (1200x630), assets/ui/title.jpg, assets/ui/icon-180.png, assets/ui/icon-512.png
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UI = os.path.join(ROOT, "assets", "ui")
os.makedirs(UI, exist_ok=True)
FS = "/System/Library/Fonts/Supplemental/"


def grade(im, sun=None, warm=1.0):
    a = np.asarray(im.convert("RGB")).astype(np.float32) / 255.0
    h, w = a.shape[:2]
    # filmic S-curve + saturation + split toning (teal shadows, amber highlights)
    l = a[..., 0] * 0.2126 + a[..., 1] * 0.7152 + a[..., 2] * 0.0722
    a = a + (a - l[..., None]) * 0.35
    a = np.clip(a, 0, 1)
    a = a * a * (3 - 2 * a) * 0.55 + a * 0.45
    l = a[..., 0] * 0.2126 + a[..., 1] * 0.7152 + a[..., 2] * 0.0722
    sh = (1 - np.clip(l / 0.45, 0, 1))[..., None]
    hi = np.clip((l - 0.55) / 0.45, 0, 1)[..., None]
    a = a * (1 - sh * 0.25) + sh * 0.25 * a * np.array([0.78, 0.95, 1.12])
    a = a * (1 - hi * 0.3 * warm) + hi * 0.3 * warm * a * np.array([1.12, 0.98, 0.82])
    if sun:
        sx, sy, r = sun
        yy, xx = np.mgrid[0:h, 0:w]
        d = np.sqrt(((xx - sx * w) / w) ** 2 + ((yy - sy * h) / w) ** 2)
        glow = np.exp(-d * 9) * 0.55 + np.exp(-d * 40) * 0.6 + np.exp(-(d / r) ** 2) * 1.2
        streak = np.exp(-np.abs(yy - sy * h) / (h * 0.006)) * np.exp(-np.abs(xx - sx * w) / (w * 0.35)) * 0.35
        g = (glow + streak)[..., None] * np.array([1.0, 0.78, 0.5])
        a = 1 - (1 - a) * (1 - np.clip(g, 0, 1))      # screen blend
    yy, xx = np.mgrid[0:h, 0:w]
    v = ((xx / w - 0.5) ** 2 + (yy / h - 0.5) ** 2) * 2
    a *= (1 - 0.35 * np.clip(v - 0.15, 0, 1))[..., None]
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))


def logo(img, x, y, size, tag=None):
    d = ImageDraw.Draw(img)
    f1 = ImageFont.truetype(FS + "DIN Alternate Bold.ttf", size)
    sh = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ds = ImageDraw.Draw(sh)
    for dx, dy in ((2, 2), (3, 3)):
        ds.text((x + dx, y + dy), "ACED", font=f1, fill=(0, 0, 0, 120))
        ds.text((x + dx, y + size * 0.86 + dy), "COMBAT", font=f1, fill=(0, 0, 0, 120))
    img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(4)))
    d.text((x, y), "ACED", font=f1, fill=(255, 255, 255, 255))
    d.text((x, y + size * 0.86), "COMBAT", font=f1, fill=(0, 0, 0, 0), stroke_width=max(2, size // 34), stroke_fill=(255, 255, 255, 255))
    if tag:
        f2 = ImageFont.truetype(FS + "DIN Alternate Bold.ttf", int(size * 0.2))
        d.text((x + 3, y + size * 1.86), tag, font=f2, fill=(255, 200, 120, 255))


og = Image.open(os.path.join(ROOT, "build", "og.png")).convert("RGB").resize((1200, 630), Image.LANCZOS)
og = grade(og, sun=(0.08, 0.705, 0.012)).convert("RGBA")
logo(og, 820, 400, 74, "TILT  /  LOCK  /  FOX TWO")
og.convert("RGB").save(os.path.join(UI, "og.jpg"), quality=86, optimize=True, progressive=True)
print("og.jpg", os.path.getsize(os.path.join(UI, "og.jpg")))

tp = os.path.join(ROOT, "build", "title.png")
if os.path.exists(tp):
    t = Image.open(tp).convert("RGB")
    t = grade(t)
    t.save(os.path.join(UI, "title.jpg"), quality=82, optimize=True, progressive=True)
    print("title.jpg", t.size)

# app icon: F-22 crop from the cover + red-orange rim
src = Image.open(os.path.join(ROOT, "build", "og.png")).convert("RGB").resize((1200, 630), Image.LANCZOS)
src = grade(src)
cx, cy, s = 560, 240, 420
ic = src.crop((cx - s // 2, cy - s // 2, cx + s // 2, cy + s // 2)).resize((512, 512), Image.LANCZOS).convert("RGBA")
d = ImageDraw.Draw(ic)
f = ImageFont.truetype(FS + "DIN Alternate Bold.ttf", 120)
d.text((34, 360), "AC", font=f, fill=(255, 255, 255, 235), stroke_width=3, stroke_fill=(0, 0, 0, 120))
ic.convert("RGB").save(os.path.join(UI, "icon-512.png"))
ic.convert("RGB").resize((180, 180), Image.LANCZOS).save(os.path.join(UI, "icon-180.png"))
print("icons done")
