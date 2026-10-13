"""Carrier flight-deck markings (1024x4096) -> build/deck_markings.png (sRGB albedo, used by blender/ships.py and
multiplied with the Blender-baked deck AO by tools/pack_ships.py)."""
import os, sys, math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from carrier_spec import *

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "build")
SS = 2                                   # supersampling
W, H = TEX_W * SS, TEX_H * SS
rng = np.random.default_rng(3)


def P(x, y):
    u, v = to_px(x, y)
    return u * SS, v * SS


def pnoise(h, w, beta, seed):
    r = np.random.default_rng(seed)
    fy = np.fft.fftfreq(h)[:, None] * h
    fx = np.fft.fftfreq(w)[None, :] * w * (h / w)
    f = np.sqrt(fx * fx + fy * fy); f[0, 0] = 1
    s = (r.normal(size=(h, w)) + 1j * r.normal(size=(h, w))) / f ** (beta / 2); s[0, 0] = 0
    a = np.fft.ifft2(s).real
    lo, hi = np.percentile(a, [1, 99])
    return np.clip((a - lo) / (hi - lo), 0, 1)


# ---------------------------------------------------------------- base non-skid surface
h0, w0 = TEX_H, TEX_W
n1 = pnoise(h0, w0, 2.6, 1)
n2 = pnoise(h0, w0, 1.0, 2)
base = np.array([0.255, 0.262, 0.27]) * 255
img = np.zeros((h0, w0, 3))
img[:] = base
img *= (0.86 + 0.2 * n1[..., None] + 0.08 * (n2[..., None] - 0.5))
# deck plating seams
for yy in range(0, h0, 48):
    img[yy:yy + 1, :, :] *= 0.85
for xx in range(0, w0, 64):
    img[:, xx:xx + 1, :] *= 0.9
# rubber / exhaust streaks along the landing area
streak = np.zeros((h0, w0))
fx, fy = LAND_DIR
ys, xs = np.mgrid[0:h0, 0:w0]
X = DECK_X[0] + (xs + 0.5) / w0 * (DECK_X[1] - DECK_X[0])
Y = DECK_Y[0] + (1 - (ys + 0.5) / h0) * (DECK_Y[1] - DECK_Y[0])
ox, oy = LAND_ORIGIN
s = (X - ox) * fx + (Y - oy) * fy
d = (X - ox) * -fy + (Y - oy) * fx
lane = np.exp(-(d / 6.0) ** 2) * np.clip(1 - np.abs(s - 70) / 75, 0, 1)
tex = pnoise(h0, w0, 2.0, 7)
sk = lane * (0.4 + 0.6 * tex)
img *= (1 - 0.45 * sk[..., None])
# cat-launch soot behind the JBDs
for (x0, y0), (x1, y1) in CATS:
    blob = np.exp(-(((X - x0) / 6) ** 2 + ((Y - (y0 + 8)) / 9) ** 2))
    img *= (1 - 0.35 * blob[..., None])
# oil stains
for i in range(140):
    cx, cy = rng.uniform(0, w0), rng.uniform(0, h0)
    r = rng.uniform(3, 14)
    m = np.exp(-(((xs - cx) / r) ** 2 + ((ys - cy) / (r * rng.uniform(0.6, 1.6))) ** 2))
    img *= (1 - 0.18 * m[..., None])
base_img = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).resize((W, H), Image.BILINEAR)

# ---------------------------------------------------------------- markings layer
lay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
dr = ImageDraw.Draw(lay)
WHITE = (232, 232, 226, 235)
YEL = (226, 186, 42, 235)
RED = (190, 40, 36, 235)
px_m = SS * TEX_H / (DECK_Y[1] - DECK_Y[0])


def line(a, b, col, w=0.45):
    dr.line([P(*a), P(*b)], fill=col, width=max(1, int(w * px_m)))


def dashed(a, b, col, w=0.45, on=6.0, off=6.0):
    L = math.dist(a, b)
    n = int(L // (on + off)) + 1
    for i in range(n):
        t0 = i * (on + off) / L
        t1 = min(1.0, (i * (on + off) + on) / L)
        if t0 >= 1:
            break
        line((a[0] + (b[0] - a[0]) * t0, a[1] + (b[1] - a[1]) * t0), (a[0] + (b[0] - a[0]) * t1, a[1] + (b[1] - a[1]) * t1), col, w)


# deck edge line
pts = OUTLINE + [OUTLINE[0]]
for a, b in zip(pts, pts[1:]):
    line(a, b, WHITE, 0.35)
# landing area
L_END = 225.0
line(land_xy(0, -LAND_HALF), land_xy(L_END, -LAND_HALF), WHITE, 0.5)
line(land_xy(0, LAND_HALF), land_xy(138, LAND_HALF), WHITE, 0.5)
dashed(land_xy(2, 0), land_xy(200, 0), WHITE, 0.6, 7.0, 5.0)
# ramp stripes at the stern
for i in range(12):
    a = land_xy(0.5, -LAND_HALF + i * 2.2)
    b = land_xy(4.5, -LAND_HALF + i * 2.2 + 1.1)
    dr.polygon([P(*land_xy(0.5, -LAND_HALF + i * 2.2)), P(*land_xy(0.5, -LAND_HALF + i * 2.2 + 1.1)),
                P(*land_xy(4.5, -LAND_HALF + i * 2.2 + 1.1)), P(*land_xy(4.5, -LAND_HALF + i * 2.2))], fill=WHITE if i % 2 else RED)
# touchdown target box between wire 2 and 3
for (a, b) in wire_points():
    line(a, b, YEL, 0.35)
# foul line (starboard edge of the landing area extended forward)
dashed(land_xy(L_END * 0.5, -LAND_HALF - 0.9), land_xy(L_END, -LAND_HALF - 0.9), RED, 0.35, 3, 3)
# catapults: shuttle slot + edge markers + start box
for i, ((x0, y0), (x1, y1)) in enumerate(CATS):
    line((x0, y0), (x1, y1), (20, 20, 20, 255), 0.35)
    ln = math.dist((x0, y0), (x1, y1))
    ux, uy = (x1 - x0) / ln, (y1 - y0) / ln
    for k in range(0, int(ln), 10):
        cx, cy = x0 + ux * k, y0 + uy * k
        line((cx - uy * 1.2, cy + ux * 1.2), (cx + uy * 1.2, cy - ux * 1.2), WHITE, 0.25)
    # yellow taxi lead-in
    line((x0 - ux * 18, y0 - uy * 18), (x0, y0), YEL, 0.45)
    # JBD outline
    jx, jy = x0 - ux * 9, y0 - uy * 9
    dr.polygon([P(jx - uy * 6, jy + ux * 6), P(jx + uy * 6, jy - ux * 6), P(jx + uy * 6 - ux * 1.2, jy - ux * 6 - uy * 1.2),
                P(jx - uy * 6 - ux * 1.2, jy + ux * 6 - uy * 1.2)], outline=YEL, width=int(0.3 * px_m))
# taxi lines: bow area centre line + arcs to the island
dashed((0, -150), (0, -70), YEL, 0.4, 4, 3)
for r in (22, 34):
    bb = [P(-6 - r, -10 - r)[0], P(0, -10 - r)[1], P(-6 + r, -10 + r)[0], P(0, -10 + r)[1]]
    dr.arc([min(bb[0], bb[2]), min(bb[1], bb[3]), max(bb[0], bb[2]), max(bb[1], bb[3])], 200, 300, fill=YEL, width=int(0.35 * px_m))
# elevators
for ex, ey, side in ELEVATORS:
    w2, h2 = 8.5, 11.0
    x0, x1 = (ex - w2, ex + w2)
    for k in range(10):
        t0, t1 = k / 10, (k + 1) / 10
        col = YEL if k % 2 == 0 else (25, 25, 25, 235)
        line((x0 + (x1 - x0) * t0, ey - h2), (x0 + (x1 - x0) * t1, ey - h2), col, 0.45)
        line((x0 + (x1 - x0) * t0, ey + h2), (x0 + (x1 - x0) * t1, ey + h2), col, 0.45)
        line((x0, ey - h2 + 2 * h2 * t0), (x0, ey - h2 + 2 * h2 * t1), col, 0.45)
        line((x1, ey - h2 + 2 * h2 * t0), (x1, ey - h2 + 2 * h2 * t1), col, 0.45)
# safe parking line along the island side
dashed((-26, -110), (-26, 150), WHITE, 0.25, 2, 2)


def big_number(txt, cx, cy, h_m, angle=180, col=WHITE):
    f = ImageFont.truetype("/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf", int(h_m * px_m * 1.35))
    tmp = Image.new("RGBA", (int(h_m * px_m * 2.2), int(h_m * px_m * 1.6)), (0, 0, 0, 0))
    td = ImageDraw.Draw(tmp)
    bb = td.textbbox((0, 0), txt, font=f)
    td.text(((tmp.width - (bb[2] - bb[0])) / 2 - bb[0], (tmp.height - (bb[3] - bb[1])) / 2 - bb[1]), txt, font=f, fill=col)
    tmp = tmp.rotate(angle, expand=True, resample=Image.BICUBIC)
    x, y = P(cx, cy)
    lay.alpha_composite(tmp, (int(x - tmp.width / 2), int(y - tmp.height / 2)))


big_number("77", 0, -140, 16, 180)
big_number("77", *land_xy(28, 0), 13, 180 - 9)
mk = lay.filter(ImageFilter.GaussianBlur(0.6))
# wear the paint
wear = pnoise(H // 4, W // 4, 2.2, 11)
wear = np.array(Image.fromarray((wear * 255).astype(np.uint8)).resize((W, H), Image.BILINEAR)) / 255.0
a = np.array(mk).astype(np.float32)
a[..., 3] *= np.clip(0.55 + 0.6 * wear, 0, 1)
mk = Image.fromarray(a.astype(np.uint8))
out = base_img.convert("RGBA")
out.alpha_composite(mk)
out = out.convert("RGB").resize((TEX_W, TEX_H), Image.LANCZOS)
out.save(os.path.join(OUT, "deck_markings.png"))
print("deck ->", os.path.join(OUT, "deck_markings.png"))
