"""Pack baked maps (build/<dir>/<k>_*.png) into assets/models/<k>_{a,n,orm,e}.webp

python3 tools/pack_models.py <dir> [kinds...]      e.g.  python3 tools/pack_models.py air f15 f22
"""
import os, sys
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DST = os.path.join(ROOT, "assets", "models")


def lin(c):
    c = c / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def srgb(c):
    c = np.clip(c, 0, 1)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * np.power(c, 1 / 2.4) - 0.055) * 255.0


def ld(src, k, n):
    return np.asarray(Image.open(os.path.join(src, f"{k}_{n}.png")).convert("RGB")).astype(np.float32)


def pack(src, k):
    alb, ao, rough, meta, emit, nrm = (ld(src, k, n) for n in ("albedo", "ao", "rough", "meta", "emit", "normal"))
    aoc = 0.3 + 0.7 * (ao[..., 0] / 255.0) ** 1.1
    A = srgb(lin(alb) * aoc[..., None])
    ORM = np.dstack([ao[..., 0], rough[..., 0], meta[..., 0]])
    for name, arr, q in (("a", A, 90), ("n", nrm, 92), ("orm", ORM, 88), ("e", emit, 90)):
        Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).save(os.path.join(DST, f"{k}_{name}.webp"), quality=q, method=5)
    print("packed", k)


if __name__ == "__main__":
    src = os.path.join(ROOT, "build", sys.argv[1])
    ks = sys.argv[2:] or sorted({f.rsplit("_", 1)[0] for f in os.listdir(src) if f.endswith("_albedo.png")})
    for k in ks:
        pack(src, k)
