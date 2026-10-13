"""Paint-shop decals (insignia, tail art, stencils) as RGBA PNGs for the Blender bakes.

python3 tools/make_decals.py  ->  build/decals/*.png
"""
import os, math
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "build", "decals")
os.makedirs(OUT, exist_ok=True)
FS = "/System/Library/Fonts/Supplemental/"
DIN = FS + "DIN Condensed Bold.ttf"
DINA = FS + "DIN Alternate Bold.ttf"
IMPACT = FS + "Impact.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


def star_pts(cx, cy, r, rot=-90):
    pts = []
    for i in range(10):
        a = math.radians(rot + i * 36)
        rr = r if i % 2 == 0 else r * 0.382
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    return pts


def star_and_bar(path, col, col2, W=1024, outline=None):
    """US national insignia (low-vis style)."""
    H = W // 2
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    cx, cy, r = W / 2, H / 2, H * 0.46
    bw, bh = W * 0.47, H * 0.30
    if outline:
        o = W * 0.012
        d.rectangle([cx - bw - o, cy - bh / 2 - o, cx + bw + o, cy + bh / 2 + o], fill=outline)
        d.ellipse([cx - r - o, cy - r - o, cx + r + o, cy + r + o], fill=outline)
    d.rectangle([cx - bw, cy - bh / 2, cx + bw, cy + bh / 2], fill=col)
    d.rectangle([cx - bw * 0.95, cy - bh * 0.13, cx + bw * 0.95, cy + bh * 0.13], fill=col2)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col)
    d.polygon(star_pts(cx, cy, r * 0.97), fill=col2)
    im.save(os.path.join(OUT, path))


def text_img(path, lines, W, H, col, align="center", bg=None):
    """lines: [(text, fontpath, size_px, y_px)]"""
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0) if bg is None else bg)
    d = ImageDraw.Draw(im)
    for txt, fp, sz, y, *rest in lines:
        c = rest[0] if rest else col
        f = font(fp, sz)
        bb = d.textbbox((0, 0), txt, font=f)
        tw = bb[2] - bb[0]
        x = (W - tw) / 2 - bb[0] if align == "center" else 8 - bb[0]
        d.text((x, y - bb[1]), txt, font=f, fill=c)
    im.save(os.path.join(OUT, path))


def tail_art(path, code, serial, band, col, W=512, H=512, extra=None):
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    # squadron band on top
    if band:
        kind, c1, c2 = band
        if kind == "check":
            n = 8
            s = W / n
            for i in range(n):
                for j in range(2):
                    d.rectangle([i * s, j * s * 0.5, (i + 1) * s, (j + 1) * s * 0.5], fill=c1 if (i + j) % 2 else c2)
        else:
            d.rectangle([0, 0, W, H * 0.1], fill=c1)
            d.rectangle([0, H * 0.1, W, H * 0.13], fill=c2)
    f = font(DIN, int(H * 0.42))
    bb = d.textbbox((0, 0), code, font=f)
    d.text(((W - (bb[2] - bb[0])) / 2 - bb[0], H * 0.24 - bb[1]), code, font=f, fill=col)
    f2 = font(DIN, int(H * 0.11))
    bb = d.textbbox((0, 0), serial, font=f2)
    d.text(((W - (bb[2] - bb[0])) / 2 - bb[0], H * 0.74 - bb[1]), serial, font=f2, fill=col)
    if extra:
        f3 = font(DIN, int(H * 0.07))
        bb = d.textbbox((0, 0), extra, font=f3)
        d.text(((W - (bb[2] - bb[0])) / 2 - bb[0], H * 0.88 - bb[1]), extra, font=f3, fill=col)
    im.save(os.path.join(OUT, path))


def enemy_roundel(path, W=512):
    im = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    c = W / 2
    d.ellipse([W * 0.04, W * 0.04, W * 0.96, W * 0.96], fill=(20, 20, 22, 255))
    d.ellipse([W * 0.10, W * 0.10, W * 0.90, W * 0.90], fill=(196, 28, 32, 255))
    # downward chevron / arrowhead
    d.polygon([(c, W * 0.78), (W * 0.22, W * 0.30), (W * 0.40, W * 0.30), (c, W * 0.55), (W * 0.60, W * 0.30), (W * 0.78, W * 0.30)],
              fill=(235, 230, 220, 255))
    im.save(os.path.join(OUT, path))


def stripes(path, c1, c2, W=512, H=128, n=6):
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    s = W / n
    for i in range(n):
        d.polygon([(i * s, H), (i * s + s / 2, 0), (i * s + s, 0), (i * s + s / 2, H)], fill=c1)
    im.save(os.path.join(OUT, path))


if __name__ == "__main__":
    DG = (66, 72, 78, 255)        # low-vis dark grey
    DG2 = (96, 103, 110, 255)
    BL = (24, 26, 30, 255)
    star_and_bar("star_f15.png", DG, DG2)
    star_and_bar("star_dark.png", (30, 33, 37, 255), (48, 52, 57, 255))
    star_and_bar("star_color.png", (24, 44, 104, 255), (240, 240, 240, 255), outline=(170, 30, 40, 255))
    text_img("usaf.png", [("U.S. AIR FORCE", DIN, 150, 30)], 1024, 220, DG)
    text_img("usaf_dark.png", [("U.S. AIR FORCE", DIN, 150, 30)], 1024, 220, (34, 37, 41, 255))
    text_img("marines.png", [("MARINES", DIN, 170, 20)], 1024, 220, (34, 37, 41, 255))
    tail_art("tail_f15.png", "AC", "AF 85 077", ("check", (20, 22, 26, 255), (230, 190, 40, 255)), DG, extra="1st TFW")
    tail_art("tail_f22.png", "AC", "AF 09 4191", ("band", (150, 22, 28, 255), (20, 20, 22, 255)), (40, 44, 49, 255))
    tail_art("tail_f35a.png", "AC", "AF 15 5077", ("band", (40, 44, 49, 255), (40, 44, 49, 255)), (34, 37, 41, 255))
    tail_art("tail_f35b.png", "VM", "BuNo 169077", None, (34, 37, 41, 255), extra="VMFA-077")
    tail_art("tail_b2.png", "", "AF 88 0332", None, (34, 37, 41, 255))
    text_img("b2_name.png", [("SPIRIT OF ACE", DIN, 120, 20)], 1024, 160, (40, 44, 48, 255))
    enemy_roundel("enemy_roundel.png")
    text_img("enemy_num.png", [("07", IMPACT, 330, 40)], 512, 420, (210, 48, 40, 255))
    text_img("ace_num.png", [("01", IMPACT, 330, 40)], 512, 420, (230, 190, 40, 255))
    text_img("bomber_num.png", [("15", IMPACT, 330, 40)], 512, 420, (190, 30, 34, 255))
    text_img("hull77.png", [("77", DIN, 820, 40)], 1024, 900, (238, 238, 232, 255))
    text_img("drone_txt.png", [("TARGET", DIN, 150, 30)], 1024, 220, (20, 20, 20, 255))
    stripes("drone_str.png", (20, 20, 20, 255), None)
    print("decals ->", OUT, sorted(os.listdir(OUT)))
