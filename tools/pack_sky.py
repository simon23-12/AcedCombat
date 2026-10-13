"""build/sky_<preset>.npy (float16 HDR equirect) -> assets/sky/<preset>.webp (log encoded, see src/sky.js) + preview.

python3 tools/pack_sky.py <preset> [quality]
"""
import os, sys, json
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A, M = 0.02, 64.0
name = sys.argv[1]
q = int(sys.argv[2]) if len(sys.argv) > 2 else 92
a = np.load(os.path.join(ROOT, "build", f"sky_{name}.npy")).astype(np.float32)
a = np.nan_to_num(a, nan=0.0, posinf=M, neginf=0.0)
print("shape", a.shape, "mean", a.mean(), "max", a.max(), "p99", np.percentile(a, 99))
y = np.log1p(np.clip(a, 0, M) / A) / np.log1p(M / A)
rng = np.random.default_rng(1)
y8 = np.clip(y * 255 + rng.uniform(-0.5, 0.5, y.shape), 0, 255).astype(np.uint8)
os.makedirs(os.path.join(ROOT, "assets", "sky"), exist_ok=True)
Image.fromarray(y8).save(os.path.join(ROOT, "assets", "sky", f"{name}.webp"), quality=q, method=6)
print("webp bytes", os.path.getsize(os.path.join(ROOT, "assets", "sky", f"{name}.webp")))
t = a * 1.0
t = (t * (2.51 * t + 0.03)) / (t * (2.43 * t + 0.59) + 0.14)
t = np.clip(t, 0, 1) ** (1 / 2.2)
Image.fromarray((t * 255).astype(np.uint8)).save(os.path.join(ROOT, "build", f"sky_{name}_preview.png"))
