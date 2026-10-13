"""Pack ship bakes: build/ships/<k>_*.png -> assets/models/<k>_{a,n,orm,e}.webp, deck markings x AO -> carrier_deck.webp"""
import os, sys
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import pack_models as pm

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "build", "ships")
for k in ("carrier", "destroyer"):
    if os.path.exists(os.path.join(SRC, f"{k}_albedo.png")):
        pm.pack(SRC, k)
mk = np.asarray(Image.open(os.path.join(ROOT, "build", "deck_markings.png")).convert("RGB")).astype(np.float32)
ao_p = os.path.join(SRC, "carrier_deck_ao.png")
if os.path.exists(ao_p):
    ao = Image.open(ao_p).convert("L").resize((mk.shape[1], mk.shape[0]), Image.BILINEAR)
    ao = np.asarray(ao).astype(np.float32) / 255.0
    lin = pm.lin(mk) * (0.25 + 0.75 * ao ** 1.3)[..., None]
    out = pm.srgb(lin)
else:
    out = mk
Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save(os.path.join(ROOT, "assets", "models", "carrier_deck.webp"), quality=88, method=6)
print("deck packed")
