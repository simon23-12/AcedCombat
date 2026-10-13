"""Data textures for the real-time renderer (all tileable):

  assets/tex/weather.png  512x512  R: cumulus column height (sea of clouds)  G: scattered cumulus  B: large-scale variation
  assets/tex/noise3d.png  512x512  8x8 atlas of a 64^3 Perlin-Worley volume (R: billows, G: fine erosion)
  assets/tex/ocean_n.png  512x512  ocean wave normal map (FFT Phillips spectrum), RG = normal.xz * .5 + .5, B = foam-ish crest

python3 tools/make_noise.py
"""
import os
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "tex")
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(42)


def fft_noise2(n, beta, seed):
    r = np.random.default_rng(seed)
    f = np.fft.fftfreq(n) * n
    k = np.sqrt(f[:, None] ** 2 + f[None, :] ** 2)
    k[0, 0] = 1
    s = (r.normal(size=(n, n)) + 1j * r.normal(size=(n, n))) / k ** (beta / 2)
    s[0, 0] = 0
    a = np.fft.ifft2(s).real
    return (a - a.min()) / (a.max() - a.min())


def worley2(n, cells, seed):
    """tileable 2D Worley F1 distance, normalised 0..1"""
    r = np.random.default_rng(seed)
    gy, gx = np.meshgrid(np.arange(cells), np.arange(cells), indexing="ij")
    fp = np.stack([gy + r.random((cells, cells)), gx + r.random((cells, cells))], -1)    # feature points (cell units)
    ys, xs = np.mgrid[0:n, 0:n] * (cells / n)
    best = np.full((n, n), 9.0)
    cy, cx = np.floor(ys).astype(int), np.floor(xs).astype(int)
    for oy in (-1, 0, 1):
        for ox in (-1, 0, 1):
            ny, nx = (cy + oy), (cx + ox)
            p = fp[ny % cells, nx % cells]
            py = p[..., 0] + (ny - ny % cells)
            px = p[..., 1] + (nx - nx % cells)
            d = np.sqrt((py - ys) ** 2 + (px - xs) ** 2)
            best = np.minimum(best, d)
    return np.clip(best / 1.2, 0, 1)


def worley3(n, cells, seed):
    r = np.random.default_rng(seed)
    fp = r.random((cells, cells, cells, 3))
    g = np.arange(n) * (cells / n)
    Z, Y, X = np.meshgrid(g, g, g, indexing="ij")
    cz, cy, cx = np.floor(Z).astype(int), np.floor(Y).astype(int), np.floor(X).astype(int)
    best = np.full((n, n, n), 9.0, dtype=np.float32)
    for oz in (-1, 0, 1):
        for oy in (-1, 0, 1):
            for ox in (-1, 0, 1):
                iz, iy, ix = cz + oz, cy + oy, cx + ox
                p = fp[iz % cells, iy % cells, ix % cells]
                d = (p[..., 0] + iz - Z) ** 2 + (p[..., 1] + iy - Y) ** 2 + (p[..., 2] + ix - X) ** 2
                best = np.minimum(best, d)
    return np.clip(np.sqrt(best) / 1.0, 0, 1)


def perlin3(n, freq, seed):
    """tileable value-ish gradient noise via FFT filtering of 3D white noise"""
    r = np.random.default_rng(seed)
    f = np.fft.fftfreq(n) * n
    k = np.sqrt(f[:, None, None] ** 2 + f[None, :, None] ** 2 + f[None, None, :] ** 2)
    k[0, 0, 0] = 1
    s = np.fft.fftn(r.normal(size=(n, n, n))) / k ** 1.4
    s[k > freq * 4] = 0
    s[0, 0, 0] = 0
    a = np.fft.ifftn(s).real
    return (a - a.min()) / (a.max() - a.min())


# ------------------------------------------------------------------ weather map
N = 512
big = fft_noise2(N, 3.2, 1)
mid = fft_noise2(N, 2.2, 2)
w1 = 1 - worley2(N, 10, 3)
w2 = 1 - worley2(N, 22, 4)
w3 = 1 - worley2(N, 46, 5)
cells = np.clip(w1 * 0.55 + w2 * 0.35 + w3 * 0.2, 0, 1)
sea = np.clip((cells * 0.75 + mid * 0.45 + big * 0.2 - 0.62) * 2.2, 0, 1) ** 0.8              # dense cloud sea, few gaps
scat = np.clip((w2 * 0.6 + w3 * 0.3 + mid * 0.35 + big * 0.35 - 0.92) * 2.6, 0, 1) ** 0.9       # scattered cumulus
W = np.dstack([sea, scat, big])
Image.fromarray((W * 255).astype(np.uint8)).save(os.path.join(OUT, "weather.png"))
print("weather", sea.mean(), scat.mean())

# ------------------------------------------------------------------ 3D noise
n3 = 64
pw = perlin3(n3, 4, 7)
wa = 1 - worley3(n3, 4, 8)
wb = 1 - worley3(n3, 8, 9)
wc = 1 - worley3(n3, 16, 10)
billow = np.clip(pw * 0.45 + (wa * 0.55 + wb * 0.3 + wc * 0.15) * 0.75, 0, 1)
billow = (billow - billow.min()) / (billow.max() - billow.min())
fine = np.clip(wb * 0.5 + wc * 0.35 + (1 - worley3(n3, 32, 11)) * 0.15, 0, 1)
fine = (fine - fine.min()) / (fine.max() - fine.min())
atlas = np.zeros((512, 512, 3), dtype=np.uint8)
for z in range(n3):
    r_, c_ = divmod(z, 8)
    atlas[r_ * 64:(r_ + 1) * 64, c_ * 64:(c_ + 1) * 64, 0] = (billow[z] * 255).astype(np.uint8)
    atlas[r_ * 64:(r_ + 1) * 64, c_ * 64:(c_ + 1) * 64, 1] = (fine[z] * 255).astype(np.uint8)
Image.fromarray(atlas).save(os.path.join(OUT, "noise3d.png"))
print("noise3d done")

# ------------------------------------------------------------------ ocean normal map (Phillips spectrum)
M = 512
L = 220.0                       # tile size in metres
wind = np.array([1.0, 0.35]); wind /= np.linalg.norm(wind)
V = 18.0
g = 9.81
kx = 2 * np.pi * np.fft.fftfreq(M, L / M)
KX, KY = np.meshgrid(kx, kx)
k = np.sqrt(KX ** 2 + KY ** 2); k[0, 0] = 1e-6
Lw = V * V / g
ph = np.exp(-1 / (k * Lw) ** 2) / k ** 4 * ((KX * wind[0] + KY * wind[1]) / k) ** 2 * np.exp(-(k * 0.4) ** 2)
ph[0, 0] = 0
h0 = (rng.normal(size=(M, M)) + 1j * rng.normal(size=(M, M))) * np.sqrt(ph / 2)
h = np.fft.ifft2(h0).real
h /= np.abs(h).max()
dx = (np.roll(h, -1, 1) - np.roll(h, 1, 1))
dy = (np.roll(h, -1, 0) - np.roll(h, 1, 0))
s = 6.0
nx, ny = -dx * s, -dy * s
nz = np.ones_like(nx)
ln = np.sqrt(nx ** 2 + ny ** 2 + nz ** 2)
nx, ny = nx / ln, ny / ln
crest = np.clip((h - 0.35) * 2.5, 0, 1)
O = np.dstack([nx * 0.5 + 0.5, ny * 0.5 + 0.5, crest])
Image.fromarray((np.clip(O, 0, 1) * 255).astype(np.uint8)).save(os.path.join(OUT, "ocean_n.png"))
print("ocean done")
