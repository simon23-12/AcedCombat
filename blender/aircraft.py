"""Aircraft: procedural modelling (lofted fuselages, airfoil wings, canted tails, intakes, nozzles), object-space
paint (camo, panel lines, decals), Cycles bake of albedo / AO / normal / roughness+metal / emission into one
atlas per aircraft, GLB export (body + gear [+ fan door]) with named marker empties.

usage: Blender -b -P blender/aircraft.py -- <kind|all> [res] [--no-bake] [--no-preview]
kinds: f15 f22 f35a f35b b2 bandit ace bomber drone
Outputs build/air/<kind>_*.png, assets/models/<kind>.glb
Axes: front = -Y, up = +Z, pilot's right = -X (glTF: nose = +Z).
"""
import sys, os, math, random
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import *

OUT = os.path.join(BUILD, "air")
MODELS = os.path.join(ASSETS, "models")
DECALS = os.path.join(BUILD, "decals")
os.makedirs(OUT, exist_ok=True)
os.makedirs(MODELS, exist_ok=True)


# ================================================================================================
# geometry primitives
# ================================================================================================
def section(st, seg):
    """superelliptic cross-section. st: y, hw, zc, ht, hb, n (horizontal exp), mt/mb (vertical exps), xo"""
    n = st.get("n", 2.0)
    mt = st.get("mt", st.get("m", 2.0))
    mb = st.get("mb", st.get("m", 2.0))
    xo = st.get("xo", 0.0)
    pts = []
    for k in range(seg):
        a = math.tau * k / seg
        c, s = math.cos(a), math.sin(a)
        x = xo + st["hw"] * sup(n, c)
        z = st["zc"] + (st["ht"] * sup(mt, s) if s >= 0 else st["hb"] * sup(mb, s))
        pts.append((x, st["y"], z))
    return pts


def loft(g, mat, stations, seg=32, mirror=False, cap=True):
    rings = [section(st, seg) for st in stations]
    g.rings_to_faces(mat, rings, cap, cap)
    if mirror:
        rings = [[(-p[0], p[1], p[2]) for p in r][::-1] for r in rings]
        g.rings_to_faces(mat, rings, cap, cap)


def airfoil(nc=12, t=0.05, tu=1.0, tl=1.0):
    xs = [0.5 * (1 - math.cos(math.pi * i / nc)) for i in range(nc + 1)]
    yt = lambda x: 5 * t * (0.2969 * math.sqrt(x) - 0.1260 * x - 0.3516 * x * x + 0.2843 * x ** 3 - 0.1036 * x ** 4)
    top = [(x, yt(x) * tu) for x in reversed(xs)]
    bot = [(x, -yt(x) * tl) for x in xs[1:-1]]
    return top + bot


def surface(g, mat, secs, thick=(0, 0, 1), mirror=True, nc=12):
    """secs: dicts with le=(x,y,z) leading edge point, c chord (along +Y), t thickness ratio, tu/tl upper/lower scale"""
    def build(sx):
        rings = []
        for s in secs:
            lx, ly, lz = s["le"]
            th = Vector((thick[0] * sx, thick[1], thick[2]))
            ring = []
            for xc, zt in airfoil(nc, s.get("t", 0.05), s.get("tu", 1.0), s.get("tl", 1.0)):
                p = Vector((lx * sx, ly + xc * s["c"], lz)) + th * (zt * s["c"])
                ring.append(tuple(p))
            rings.append(ring if sx > 0 else ring[::-1])
        g.rings_to_faces(mat, rings, True, True, smooth=True)
    build(1)
    if mirror:
        build(-1)


def wing(g, mat, pts, t=(0.05, 0.03), dihedral=0.0, mirror=True, tu=1.0, tl=1.0, nc=12):
    """pts: [(x, y_le, chord, z)] root -> tip; thickness interpolated"""
    n = len(pts)
    secs = []
    for i, (x, y, c, z) in enumerate(pts):
        f = i / max(1, n - 1)
        secs.append(dict(le=(x, y, z + (x - pts[0][0]) * math.tan(math.radians(dihedral))), c=c, t=t[0] + (t[1] - t[0]) * f, tu=tu, tl=tl))
    d = math.radians(dihedral)
    surface(g, mat, secs, thick=(-math.sin(d), 0, math.cos(d)), mirror=mirror, nc=nc)


def fin(g, mat, x, z0, root_le, root_c, span, tip_le, tip_c, cant=0.0, t=(0.05, 0.035), mirror=True):
    """vertical tail canted outwards by `cant` degrees (positive = tips apart)."""
    c = math.radians(cant)
    secs = [dict(le=(x, root_le, z0), c=root_c, t=t[0]),
            dict(le=(x + span * math.sin(c), tip_le, z0 + span * math.cos(c)), c=tip_c, t=t[1])]
    surface(g, mat, secs, thick=(math.cos(c), 0, -math.sin(c)), mirror=mirror, nc=10)


def nozzle(g, M, x, y, z, r0, r1, ln, petals=True):
    """round afterburner nozzle, exit at y+ln/2 (rear)."""
    g.cyl(M["nozzle"], (x, y, z), r0, ln, "y", seg=28, r2=r1, cap=False)
    g.cyl(M["dark"], (x, y + ln * 0.1, z), r1 * 0.96, ln * 0.8, "y", seg=24, cap=False)
    g.cyl(M["burner"], (x, y + ln * 0.25, z), r1 * 0.9, 0.02, "y", seg=24)
    if petals:
        for k in range(14):
            a = math.tau * k / 14
            g.box(M["nozzle"], (x + math.cos(a) * r1 * 1.01, y + ln * 0.42, z + math.sin(a) * r1 * 1.01), (0.05, ln * 0.18, 0.02),
                  rot=(0, -a, 0))


def missile(g, M, x, y, z, ln=3.65, r=0.09, kind="aim120"):
    """underwing missile pointing -Y, centre at (x,y,z)."""
    body = M["msl_white"]
    g.cyl(body, (x, y, z), r, ln * 0.82, "y", seg=12)
    g.cyl(M["msl_grey"], (x, y - ln * 0.41 - ln * 0.07, z), r, ln * 0.14, "y", seg=12, r2=0.01)
    g.cyl(M["msl_band"], (x, y - ln * 0.2, z), r * 1.02, 0.08, "y", seg=12)
    for k in range(4):
        a = math.pi / 4 + k * math.pi / 2
        for yy, sz in ((y + ln * 0.36, 0.22), (y - ln * 0.1 if kind == "aim120" else y - ln * 0.32, 0.12)):
            g.box(M["msl_grey"], (x + math.cos(a) * (r + sz / 2), yy, z + math.sin(a) * (r + sz / 2)), (sz, 0.22, 0.012), rot=(0, -a, 0))


def gear_leg(g, M, x, y, z_top, z_wheel, r_wheel=0.38, w_wheel=0.22, twin=False, door=None):
    G = M["gear"]
    g.cyl(G, (x, y, (z_top + z_wheel) / 2), 0.07, z_top - z_wheel, "z", seg=10)
    g.cyl(M["chrome"], (x, y, z_wheel + r_wheel + 0.25), 0.05, 0.5, "z", seg=10)
    g.box(G, (x, y + 0.25, z_wheel + r_wheel * 0.9), (0.06, 0.5, 0.06), rot=(0.6, 0, 0))
    offs = (-w_wheel * 0.6, w_wheel * 0.6) if twin else (0.0,)
    for o in offs:
        g.cyl(M["tire"], (x + o, y, z_wheel), r_wheel, w_wheel, "x", seg=20)
        g.cyl(M["gear"], (x + o + (0.01 if o >= 0 else -0.01), y, z_wheel), r_wheel * 0.55, w_wheel + 0.02, "x", seg=14)
    if door:
        dx, dz, dl, dh = door
        g.box(G, (x + dx, y, z_top - dh / 2 + dz), (0.03, dl, dh))


# ================================================================================================
# materials
# ================================================================================================
_IMG = {}


def dimg(name):
    if name not in _IMG:
        im = bpy.data.images.load(os.path.join(DECALS, name))
        im.colorspace_settings.name = "sRGB"
        _IMG[name] = im
    return _IMG[name]


def paint_mat(name, P):
    """P: dict(c0, c1, c2=belly, camo=scale|None, camo_th, panel=spacing, metal, rough, patch, decals=[...], ram=bool)"""
    m = ChanMat(name)
    t = m.t
    tc = t.N("ShaderNodeTexCoord")
    geo = t.N("ShaderNodeNewGeometry")
    o = tc.outputs["Object"]
    ox, oy, oz = t.sep(o)
    nx, ny, nz = t.sep(geo.outputs["Normal"])
    col = t.rgb(srgb(P["c0"]))
    if P.get("camo"):
        n1 = t.noise(t.vmath("MULTIPLY", o, (1.0, 0.55, 1.0)), P["camo"], 2.0, 0.5)
        th = P.get("camo_th", 0.5)
        mk = t.smooth(th - 0.012, th + 0.012, n1)
        col = t.mix(mk, col, t.rgb(srgb(P["c1"])))
        if P.get("c3"):
            n2 = t.noise(t.vmath("ADD", o, (13.1, 7.7, 3.3)), P["camo"] * 1.3, 2.0, 0.5)
            mk2 = t.smooth(0.585, 0.6, n2)
            col = t.mix(mk2, col, t.rgb(srgb(P["c3"])))
    if P.get("c2"):
        belly = t.mul(t.smooth(-0.15, -0.55, nz), t.smooth(P.get("belly_z", 0.6), P.get("belly_z", 0.6) - 0.4, oz))
        col = t.mix(belly, col, t.rgb(srgb(P["c2"])))
    # panel-to-panel tone variation (F-35 patchwork look)
    pv = t.voronoi(t.vmath("MULTIPLY", o, (1.0, 0.6, 1.0)), P.get("patch_scale", 0.9), "F1", "Color")
    pvx, _, _ = t.sep(pv)
    patch = P.get("patch", 0.05)
    col = t.mix(1.0, col, t.comb(t.madd(pvx, patch, 1.0 - patch / 2), t.madd(pvx, patch, 1.0 - patch / 2), t.madd(pvx, patch * 0.9, 1.0 - patch / 2)), "MULTIPLY")
    # panel lines: constant-x, constant-y, constant-z lines broken up by blocky masks
    sp = P.get("panel", 1.2)
    w = P.get("line_w", 0.014)

    def lines(coord, spacing, mask_vec, mask_th, seed):
        f = t.math("FRACT", t.mul(t.add(coord, seed), 1.0 / spacing))
        d = t.mul(t.math("ABSOLUTE", t.sub(f, 0.5)), spacing)       # distance to line at f=.5 (m)
        ln = t.sub(1.0, t.smooth(w * 0.4, w, t.sub(spacing * 0.5, d)))
        mn = t.noise(t.add(mask_vec, seed), 0.55, 0.0, 0.5)
        return t.mul(ln, t.smooth(mask_th, mask_th + 0.02, mn))
    ly = lines(oy, sp, t.vmath("MULTIPLY", o, (1.0, 0.0, 1.0)), 0.42, 0.37)
    lx = lines(ox, sp * 1.35, t.vmath("MULTIPLY", o, (0.0, 1.0, 1.0)), 0.48, 1.91)
    lz = lines(oz, sp * 0.8, t.vmath("MULTIPLY", o, (1.0, 1.0, 0.0)), 0.5, 2.71)
    pl = t.math("MAXIMUM", t.math("MAXIMUM", ly, lx), lz)
    # rivet-ish fasteners along lines + small access panels
    lc = P.get("line_dark", 0.55)
    ram = P.get("ram")
    if ram:  # radar-absorbent edge tapes are lighter than the skin
        col = t.mix(t.mul(pl, 0.7), col, t.rgb(srgb(ram)))
    else:
        col = t.mix(t.mul(pl, 1.0 - lc), col, t.rgb((0.0, 0.0, 0.0)))
    # weathering: streaks running aft + soft grime
    gr = t.noise(t.vmath("MULTIPLY", o, (2.0, 0.25, 2.0)), 1.6, 3.0, 0.6)
    gr2 = t.noise(o, 3.5, 5.0, 0.6)
    wear = t.add(t.mul(t.smooth(0.45, 0.8, gr), 0.10 * P.get("dirt", 1.0)), t.mul(gr2, 0.06))
    col = t.mix(wear, col, t.rgb(srgb(0x2A2622)))
    # decals
    for d in P.get("decals", []):
        col = decal(t, col, o, geo, d)
    m.color = col
    rough = t.add(P.get("rough", 0.5), t.add(t.mul(t.sub(gr2, 0.5), 0.15), t.mul(pl, 0.12)))
    m.rough = t.clamp01(rough)
    m.metal = P.get("metal", 0.05)
    m.height = t.mul(pl, -1.0)
    m.bump_strength = 0.35
    m.bump_dist = 0.006
    return m.finish()


def decal(t, col, o, geo, d):
    """d: dict(img, kind='side'|'top'|'bottom', c=(y,z) or (x,y), s=(w,h), xr=(min,max) |x| range for side,
    flip=False). Side decals read correctly from both sides."""
    ox, oy, oz = t.sep(o)
    nx, ny, nz = t.sep(geo.outputs["Normal"])
    im = dimg(d["img"])
    w, h = d["s"]
    if d["kind"] == "side":
        cy, cz = d["c"]
        sgn = t.math("SIGN", ox)
        u = t.madd(t.mul(t.sub(oy, cy), sgn), 1.0 / w, 0.5)
        v = t.madd(t.sub(oz, cz), 1.0 / h, 0.5)
        x0, x1 = d.get("xr", (0.0, 99.0))
        ax = t.math("ABSOLUTE", ox)
        mask = t.mul(t.smooth(0.3, 0.55, t.mul(nx, sgn)), t.mul(t.math("GREATER_THAN", ax, x0), t.math("LESS_THAN", ax, x1)))
    else:
        cx, cy = d["c"]
        top = d["kind"] == "top"
        xx = t.math("ABSOLUTE", ox) if d.get("both", True) else ox
        u = t.madd(t.sub(cx, xx) if top else t.sub(xx, cx), 1.0 / w, 0.5)
        v = t.madd(t.sub(cy, oy), 1.0 / h, 0.5)
        mask = t.smooth(0.3, 0.6, nz) if top else t.smooth(-0.3, -0.6, nz)
        if not d.get("both", True):
            side = d.get("side", 1)
            mask = t.mul(mask, t.math("GREATER_THAN", t.mul(ox, side), 0.0))
    uv = t.comb(u, v, 0.0)
    c, a = t.img(im, uv, "Linear", "CLIP")
    f = t.mul(t.mul(a, mask), d.get("alpha", 0.95))
    return t.mix(f, col, c)


def std_mats(paint, glass=0x10140F, glass_gold=False):
    M = {}
    M["paint"] = paint
    g = ChanMat("glass")
    g.color = srgb(0x3A3218 if glass_gold else glass)
    g.rough, g.metal = 0.06, 0.85
    M["glass"] = g.finish()
    M["dark"] = simple_mat("dark", 0x0A0B0C, 0.85)
    M["intake"] = simple_mat("intake", 0x050506, 0.9)
    nz = ChanMat("nozzle")
    t = nz.t
    tc = t.N("ShaderNodeTexCoord")
    n1 = t.noise(tc.outputs["Object"], 6.0, 4.0, 0.6)
    _, oy, _ = t.sep(tc.outputs["Object"])
    heat = t.math("FRACT", t.mul(oy, 1.7))
    c = t.mix(t.smooth(0.3, 0.7, heat), t.rgb(srgb(0x6C6A66)), t.rgb(srgb(0x5A5E70)))
    c = t.mix(t.mul(n1, 0.5), c, t.rgb(srgb(0x8A7650)))
    nz.color = c
    nz.rough = t.add(t.mul(n1, 0.3), 0.3)
    nz.metal = 0.9
    M["nozzle"] = nz.finish()
    M["burner"] = simple_mat("burner", 0x000000, 0.5, emit=(1.0 * 2.2, 0.45 * 2.2, 0.15 * 2.2))
    M["chrome"] = simple_mat("chrome", 0xB8BCC2, 0.18, 1.0)
    M["gear"] = simple_mat("gear", 0xD8D8D4, 0.45, 0.1)
    M["tire"] = simple_mat("tire", 0x141414, 0.85)
    M["nav_r"] = simple_mat("nav_r", 0x200000, 0.3, emit=(6.0, 0.15, 0.1))
    M["nav_g"] = simple_mat("nav_g", 0x002000, 0.3, emit=(0.1, 6.0, 0.6))
    M["nav_w"] = simple_mat("nav_w", 0x202020, 0.3, emit=(5.0, 5.0, 4.6))
    M["slime"] = simple_mat("slime", 0x0A140A, 0.4, emit=(0.25, 1.2, 0.35))
    M["msl_white"] = simple_mat("msl_white", 0xD9D9D4, 0.4, 0.05)
    M["msl_grey"] = simple_mat("msl_grey", 0x7A7D80, 0.45, 0.2)
    M["msl_band"] = simple_mat("msl_band", 0xB8862A, 0.5)
    M["pylon"] = simple_mat("pylon", 0x7E858B, 0.5, 0.1)
    return M


# ================================================================================================
# aircraft definitions
# ================================================================================================
def canopy(g, M, y0, y1, zb, ztop, hw, frames=()):
    L = y1 - y0
    st = []
    for f, hwf, htf in ((0.0, 0.25, 0.15), (0.12, 0.72, 0.62), (0.3, 0.95, 0.93), (0.5, 1.0, 1.0), (0.72, 0.95, 0.9), (0.9, 0.7, 0.55), (1.0, 0.4, 0.2)):
        st.append(dict(y=y0 + f * L, hw=hw * hwf, zc=zb, ht=(ztop - zb) * htf, hb=0.05, n=2.2, m=2.0))
    loft(g, M["glass"], st, seg=28)
    for fy in frames:
        y = y0 + fy * L
        hh = (ztop - zb) * 0.98
        st = [dict(y=y - 0.04, hw=hw * 1.03, zc=zb, ht=hh * 1.03, hb=0.04, n=2.2, m=2.0), dict(y=y + 0.04, hw=hw * 1.03, zc=zb, ht=hh * 1.03, hb=0.04, n=2.2, m=2.0)]
        loft(g, M["paint"], st, seg=28)


def lights(g, M, wx, wy, wz, tail=None):
    """nav lights: red on the left wingtip (+X), green on the right (-X)."""
    g.sphere(M["nav_r"], (wx, wy, wz), 0.07)
    g.sphere(M["nav_g"], (-wx, wy, wz), 0.07)
    if tail:
        g.sphere(M["nav_w"], tail, 0.06)


def build_f15(g, M):
    P = M["paint"]
    # forward fuselage + spine
    loft(g, P, [
        dict(y=-9.75, hw=0.04, zc=0.42, ht=0.04, hb=0.04),
        dict(y=-9.4, hw=0.22, zc=0.40, ht=0.22, hb=0.21),
        dict(y=-8.7, hw=0.42, zc=0.38, ht=0.42, hb=0.40),
        dict(y=-7.6, hw=0.60, zc=0.38, ht=0.60, hb=0.55, n=2.3),
        dict(y=-6.4, hw=0.70, zc=0.40, ht=0.70, hb=0.62, n=2.6, m=2.3),
        dict(y=-5.0, hw=0.76, zc=0.42, ht=0.78, hb=0.64, n=2.8, m=2.4),
        dict(y=-3.4, hw=0.82, zc=0.48, ht=0.80, hb=0.62, n=3.0),
        dict(y=-1.5, hw=0.86, zc=0.55, ht=0.74, hb=0.50, n=3.0),
        dict(y=1.0, hw=0.90, zc=0.62, ht=0.52, hb=0.42, n=3.2),
        dict(y=4.0, hw=0.78, zc=0.62, ht=0.34, hb=0.34, n=3.2),
        dict(y=6.6, hw=0.50, zc=0.58, ht=0.22, hb=0.22, n=2.6),
        dict(y=8.2, hw=0.22, zc=0.55, ht=0.12, hb=0.12),
    ], seg=36)
    # radome seam
    loft(g, M["pylon"], [dict(y=-8.05, hw=0.53, zc=0.38, ht=0.53, hb=0.49, n=2.2), dict(y=-7.97, hw=0.54, zc=0.38, ht=0.54, hb=0.50, n=2.2)], seg=32)
    # intake trunks running back to the engines
    trunk = [
        dict(y=-5.75, xo=1.52, hw=0.60, zc=0.28, ht=0.62, hb=0.55, n=7, m=7),
        dict(y=-4.6, xo=1.52, hw=0.63, zc=0.30, ht=0.64, hb=0.58, n=6, m=6),
        dict(y=-2.0, xo=1.40, hw=0.66, zc=0.32, ht=0.60, hb=0.60, n=5, m=5),
        dict(y=1.5, xo=1.18, hw=0.70, zc=0.32, ht=0.52, hb=0.62, n=4, m=4),
        dict(y=4.6, xo=0.90, hw=0.66, zc=0.32, ht=0.50, hb=0.58, n=3.2, m=3),
        dict(y=7.0, xo=0.70, hw=0.56, zc=0.32, ht=0.50, hb=0.52, n=2.5, m=2.5),
        dict(y=8.3, xo=0.64, hw=0.50, zc=0.32, ht=0.49, hb=0.49, n=2.1, m=2.1),
    ]
    loft(g, P, trunk, seg=32, mirror=True)
    # raked intake mouth (dark) + ramp lip
    for sx in (1, -1):
        g.box(M["intake"], (sx * 1.52, -5.70, 0.30), (1.08, 0.08, 1.05))
        g.box(P, (sx * 1.52, -5.45, 0.93), (1.24, 0.75, 0.06), rot=(0.12, 0, 0))
        g.box(P, (sx * 2.13, -5.55, 0.32), (0.06, 0.5, 1.2))
    # broad flat upper deck between trunks and wing roots
    loft(g, P, [
        dict(y=-3.2, hw=1.3, zc=0.62, ht=0.18, hb=0.25, n=6, m=3),
        dict(y=-1.0, hw=1.9, zc=0.66, ht=0.2, hb=0.3, n=7, m=3),
        dict(y=4.5, hw=1.85, zc=0.66, ht=0.16, hb=0.3, n=7, m=3),
        dict(y=7.2, hw=1.3, zc=0.6, ht=0.12, hb=0.24, n=5, m=3),
    ], seg=32)
    canopy(g, M, -6.5, -2.3, 0.98, 1.72, 0.50, frames=(0.22,))
    # wings: 45 deg LE, cropped tips, slight anhedral
    wing(g, P, [(1.75, -2.6, 6.6, 0.62), (4.0, -0.35, 4.55, 0.62), (6.55, 2.2, 1.85, 0.62)], t=(0.06, 0.035), dihedral=-1.0)
    # stabilators
    wing(g, P, [(1.3, 6.2, 3.1, 0.32), (4.35, 8.4, 1.25, 0.32)], t=(0.045, 0.03))
    # twin vertical tails
    fin(g, P, 1.32, 0.72, 4.1, 3.7, 3.25, 7.05, 1.45, cant=2, t=(0.05, 0.035))
    for sx in (1, -1):
        g.box(M["pylon"], (sx * 1.38, 7.6, 3.85), (0.12, 1.2, 0.15))     # fin-cap ECM fairing
        nozzle(g, M, sx * 0.64, 8.75, 0.32, 0.52, 0.47, 1.0)
    # wing pylons + AIM-9 / AIM-120
    for sx in (1, -1):
        for x, y in ((3.0, 1.0), (4.6, 2.3)):
            g.box(M["pylon"], (sx * x, y, 0.38), (0.1, 1.6, 0.36))
            missile(g, M, sx * x, y, 0.08, 3.0 if x > 4 else 3.65, 0.075 if x > 4 else 0.09, "aim9" if x > 4 else "aim120")
        for y in (-3.4, 1.4):
            missile(g, M, sx * 1.62, y, -0.48, 3.65, 0.09)
    lights(g, M, 6.55, 3.0, 0.62, tail=(1.42, 8.3, 3.6))
    for sx in (1, -1):
        g.box(M["slime"], (sx * 1.0, -6.0, 0.65), (0.02, 0.9, 0.08), rot=(0, 0, 0))
        g.box(M["slime"], (sx * 1.39, 6.6, 2.2), (0.02, 0.8, 0.07))
    g.empty("nozzle_L", (0.64, 9.3, 0.32)); g.empty("nozzle_R", (-0.64, 9.3, 0.32))
    g.empty("tip_L", (6.6, 3.4, 0.62)); g.empty("tip_R", (-6.6, 3.4, 0.62))
    g.empty("gun", (-2.0, -2.4, 0.8)); g.empty("cockpit", (0, -4.9, 1.45)); g.empty("hook", (0, 7.6, -0.25))
    g.empty("msl_L", (3.0, 0.5, 0.0)); g.empty("msl_R", (-3.0, 0.5, 0.0))


def gear_f15(g, M):
    gear_leg(g, M, 0, -6.6, 0.0, -1.5, 0.3, 0.18)
    for sx in (1, -1):
        gear_leg(g, M, sx * 1.55, 0.8, -0.2, -1.42, 0.42, 0.24, door=(sx * 0.35, 0, 1.1, 0.9))
    g.box(M["gear"], (0, 7.9, -0.35), (0.07, 1.4, 0.07), rot=(0.35, 0, 0))     # hook


def build_f22(g, M):
    P = M["paint"]
    loft(g, P, [
        dict(y=-9.45, hw=0.04, zc=0.34, ht=0.04, hb=0.04, n=2, m=1.2),
        dict(y=-9.0, hw=0.24, zc=0.33, ht=0.18, hb=0.16, n=2, m=1.15),
        dict(y=-8.1, hw=0.48, zc=0.32, ht=0.36, hb=0.32, n=2, m=1.1),
        dict(y=-6.9, hw=0.70, zc=0.32, ht=0.52, hb=0.44, n=2, m=1.05),
        dict(y=-5.5, hw=0.86, zc=0.34, ht=0.66, hb=0.50, n=2, m=1.05),
        dict(y=-4.0, hw=1.02, zc=0.36, ht=0.74, hb=0.52, n=2, m=1.1),
        dict(y=-2.0, hw=1.25, zc=0.40, ht=0.70, hb=0.55, n=2.2, m=1.2),
        dict(y=0.5, hw=1.45, zc=0.42, ht=0.56, hb=0.55, n=2.4, m=1.3),
        dict(y=3.5, hw=1.55, zc=0.40, ht=0.45, hb=0.50, n=2.6, m=1.3),
        dict(y=6.2, hw=1.35, zc=0.38, ht=0.36, hb=0.40, n=3.0, m=1.4),
        dict(y=7.4, hw=1.15, zc=0.38, ht=0.30, hb=0.32, n=3.5, m=1.6),
    ], seg=40)
    # caret intakes merging into the body
    for sx in (1,):
        loft(g, P, [
            dict(y=-4.6, xo=1.45, hw=0.55, zc=0.22, ht=0.55, hb=0.52, n=3.5, m=1.3),
            dict(y=-3.2, xo=1.50, hw=0.62, zc=0.24, ht=0.58, hb=0.56, n=3.5, m=1.3),
            dict(y=-0.5, xo=1.50, hw=0.66, zc=0.30, ht=0.52, hb=0.56, n=3.2, m=1.3),
            dict(y=3.0, xo=1.25, hw=0.62, zc=0.34, ht=0.42, hb=0.50, n=3.0, m=1.3),
            dict(y=6.6, xo=0.75, hw=0.55, zc=0.38, ht=0.32, hb=0.40, n=3.0, m=1.5),
        ], seg=32, mirror=True)
    for sx in (1, -1):
        g.box(M["intake"], (sx * 1.47, -4.58, 0.22), (1.0, 0.06, 0.95), rot=(0, 0, sx * -0.38))
        g.box(P, (sx * 2.02, -4.4, 0.22), (0.05, 0.6, 1.05), rot=(0, 0, sx * -0.38))
    canopy(g, M, -7.4, -2.5, 0.92, 1.58, 0.52)
    # diamond wing with LERX
    wing(g, P, [(1.1, -3.2, 8.2, 0.42), (2.0, -1.9, 6.8, 0.42), (6.75, 2.55, 1.2, 0.42)], t=(0.045, 0.03), dihedral=-3.25)
    wing(g, P, [(1.15, 5.2, 3.3, 0.36), (4.35, 7.6, 1.05, 0.36)], t=(0.04, 0.03))
    fin(g, P, 1.45, 0.82, 3.5, 3.8, 2.85, 5.75, 1.45, cant=28, t=(0.045, 0.03))
    # 2D thrust-vectoring nozzles
    for sx in (1, -1):
        g.box(M["nozzle"], (sx * 0.62, 7.95, 0.38), (1.0, 1.2, 0.62), bevel=0.06)
        g.box(M["dark"], (sx * 0.62, 8.5, 0.38), (0.86, 0.2, 0.42))
        g.box(M["burner"], (sx * 0.62, 8.42, 0.38), (0.8, 0.04, 0.34))
        g.box(M["nozzle"], (sx * 0.62, 8.62, 0.66), (1.02, 0.6, 0.06), rot=(-0.12, 0, 0))
        g.box(M["nozzle"], (sx * 0.62, 8.62, 0.10), (1.02, 0.6, 0.06), rot=(0.12, 0, 0))
    lights(g, M, 6.75, 2.9, 0.15)
    for sx in (1, -1):
        g.box(M["slime"], (sx * 0.9, -5.5, 0.82), (0.02, 0.8, 0.07), rot=(0, 0.6 * sx, 0))
    g.empty("nozzle_L", (0.62, 8.9, 0.38)); g.empty("nozzle_R", (-0.62, 8.9, 0.38))
    g.empty("tip_L", (6.8, 3.5, 0.15)); g.empty("tip_R", (-6.8, 3.5, 0.15))
    g.empty("gun", (-1.6, -2.0, 0.9)); g.empty("cockpit", (0, -5.5, 1.35)); g.empty("hook", (0, 7.0, -0.2))
    g.empty("msl_L", (1.0, -1.0, -0.3)); g.empty("msl_R", (-1.0, -1.0, -0.3))


def gear_f22(g, M):
    gear_leg(g, M, 0, -5.9, -0.05, -1.55, 0.3, 0.18)
    for sx in (1, -1):
        gear_leg(g, M, sx * 1.75, 1.6, -0.1, -1.47, 0.40, 0.24, door=(sx * 0.3, 0, 1.1, 0.8))
    g.box(M["gear"], (0, 7.2, -0.3), (0.07, 1.3, 0.07), rot=(0.35, 0, 0))


def build_f35(g, M, variant="a"):
    P = M["paint"]
    loft(g, P, [
        dict(y=-7.85, hw=0.04, zc=0.46, ht=0.04, hb=0.04, n=2, m=1.3),
        dict(y=-7.4, hw=0.26, zc=0.45, ht=0.22, hb=0.20, n=2, m=1.2),
        dict(y=-6.5, hw=0.52, zc=0.44, ht=0.44, hb=0.40, n=2, m=1.15),
        dict(y=-5.3, hw=0.76, zc=0.45, ht=0.62, hb=0.55, n=2.1, m=1.1),
        dict(y=-3.9, hw=1.02, zc=0.48, ht=0.80, hb=0.64, n=2.2, m=1.2),
        dict(y=-2.2, hw=1.40, zc=0.52, ht=0.92, hb=0.72, n=2.4, m=1.4),
        dict(y=0.0, hw=1.72, zc=0.52, ht=0.88, hb=0.78, n=2.6, m=1.6),
        dict(y=2.4, hw=1.66, zc=0.50, ht=0.78, hb=0.78, n=2.6, m=1.7),
        dict(y=4.4, hw=1.20, zc=0.48, ht=0.66, hb=0.68, n=2.3, m=1.9),
        dict(y=5.7, hw=0.80, zc=0.47, ht=0.60, hb=0.60, n=2.0, m=2.0),
        dict(y=6.4, hw=0.64, zc=0.47, ht=0.56, hb=0.56, n=2.0, m=2.0),
    ], seg=40)
    # DSI intakes
    loft(g, P, [
        dict(y=-3.9, xo=1.28, hw=0.42, zc=0.66, ht=0.52, hb=0.40, n=3.0, m=1.6),
        dict(y=-3.0, xo=1.36, hw=0.48, zc=0.66, ht=0.56, hb=0.45, n=3.0, m=1.6),
        dict(y=-0.8, xo=1.35, hw=0.50, zc=0.62, ht=0.52, hb=0.5, n=3.0, m=1.6),
        dict(y=1.6, xo=1.15, hw=0.48, zc=0.56, ht=0.45, hb=0.5, n=2.6, m=1.6),
    ], seg=28, mirror=True)
    for sx in (1, -1):
        g.box(M["intake"], (sx * 1.34, -3.86, 0.66), (0.72, 0.06, 0.85), rot=(0, 0, sx * -0.3))
        g.sphere(P, (sx * 0.98, -3.6, 0.72), 0.38, scale=(0.45, 1.6, 0.9))   # DSI bump
    canopy(g, M, -6.0, -2.3, 1.0, 1.66, 0.52, frames=(0.62,) if variant == "a" else (0.55,))
    if variant == "b":
        # lift-fan door outline (separate hinged object, see split) & aux inlet
        g.box(M["dark"], (0, -1.3, 1.32), (1.12, 2.1, 0.02))
        g.box(M["paint"], (0, 1.6, 1.30), (0.9, 1.0, 0.04), rot=(0.05, 0, 0))
    wing(g, P, [(1.6, -0.9, 5.9, 0.62), (5.35, 1.65, 1.75, 0.62)], t=(0.05, 0.035), dihedral=-1.5)
    wing(g, P, [(1.05, 4.3, 2.8, 0.5), (3.3, 5.9, 1.05, 0.5)], t=(0.04, 0.03))
    fin(g, P, 1.0, 1.12, 2.9, 2.9, 2.05, 4.35, 1.15, cant=25, t=(0.045, 0.032))
    if variant == "a":
        nozzle(g, M, 0, 6.95, 0.47, 0.62, 0.55, 1.1)
    else:
        nozzle(g, M, 0, 6.85, 0.47, 0.62, 0.56, 0.9, petals=False)
        for sx in (1, -1):
            g.box(M["dark"], (sx * 4.0, 2.4, 0.5), (0.4, 0.5, 0.04))  # roll-post outlets
    lights(g, M, 5.4, 2.6, 0.55)
    for sx in (1, -1):
        g.box(M["slime"], (sx * 0.95, -4.5, 1.12), (0.02, 0.7, 0.06), rot=(0, 0.7 * sx, 0))
    if variant == "a":
        g.box(M["dark"], (1.25, -2.6, 1.18), (0.12, 0.6, 0.06))       # gun port
    else:
        g.cyl(P, (0, -0.8, -0.38), 0.22, 3.2, "y", seg=16)                 # gun pod
        g.cyl(P, (0, -2.4, -0.38), 0.22, 0.4, "y", seg=16, r2=0.06)
    g.empty("nozzle_C", (0, 7.55, 0.47))
    g.empty("tip_L", (5.4, 2.6, 0.55)); g.empty("tip_R", (-5.4, 2.6, 0.55))
    g.empty("gun", (1.25, -2.8, 1.18) if variant == "a" else (0, -2.6, -0.38))
    g.empty("cockpit", (0, -4.5, 1.45)); g.empty("hook", (0, 6.2, -0.2))
    g.empty("msl_L", (1.0, -0.5, -0.4)); g.empty("msl_R", (-1.0, -0.5, -0.4))
    if variant == "b":
        g.empty("fan", (0, -1.3, 1.3)); g.empty("hinge", (0, -0.25, 1.33))


def gear_f35(g, M):
    gear_leg(g, M, 0, -5.0, 0.0, -1.38, 0.28, 0.17, twin=True)
    for sx in (1, -1):
        gear_leg(g, M, sx * 1.35, 1.1, -0.1, -1.32, 0.38, 0.22, door=(sx * 0.25, 0, 1.0, 0.8))
    g.box(M["gear"], (0, 6.3, -0.25), (0.07, 1.2, 0.07), rot=(0.35, 0, 0))


def build_b2(g, M):
    P = M["paint"]
    TE = [(0, 10.5), (6.6, 6.22), (12.6, 10.12), (19.0, 5.95), (26.2, 10.62)]

    def te(x):
        for (x0, y0), (x1, y1) in zip(TE, TE[1:]):
            if x <= x1 + 1e-6:
                return y0 + (y1 - y0) * (x - x0) / (x1 - x0)
        return TE[-1][1]
    le = lambda x: -10.5 + 0.649 * x
    xs = [0.0, 1.4, 3.0, 4.8, 6.6, 8.6, 10.6, 12.6, 14.8, 17.0, 19.0, 21.5, 24.0, 26.2]
    thick = lambda x: 0.13 - 0.07 * min(1, x / 14.0) - 0.012 * max(0, (x - 14) / 12)
    secs = []
    for x in [-v for v in reversed(xs[1:])] + xs:
        ax = abs(x)
        c = te(ax) - le(ax)
        z = 0.0 - ax * 0.012
        secs.append(dict(le=(x, le(ax), z), c=c, t=thick(ax), tu=1.25, tl=0.55))
    surface(g, P, secs, thick=(0, 0, 1), mirror=False, nc=16)
    # cockpit hump and engine humps
    loft(g, P, [
        dict(y=-10.2, hw=0.3, zc=0.05, ht=0.1, hb=0.05),
        dict(y=-9.0, hw=1.8, zc=0.25, ht=0.65, hb=0.2, n=2.4, m=2.0),
        dict(y=-7.4, hw=2.5, zc=0.30, ht=1.25, hb=0.2, n=2.6, m=2.0),
        dict(y=-5.5, hw=2.7, zc=0.32, ht=1.45, hb=0.2, n=2.6, m=2.2),
        dict(y=-2.0, hw=2.6, zc=0.32, ht=1.30, hb=0.2, n=2.4, m=2.2),
        dict(y=2.0, hw=2.1, zc=0.30, ht=0.95, hb=0.2, n=2.2, m=2.2),
        dict(y=6.0, hw=1.4, zc=0.25, ht=0.55, hb=0.2, n=2.0, m=2.0),
        dict(y=9.0, hw=0.6, zc=0.15, ht=0.2, hb=0.1),
    ], seg=36)
    for sx in (1,):
        loft(g, P, [
            dict(y=-4.6, xo=4.7, hw=1.2, zc=0.15, ht=0.75, hb=0.2, n=2.6, m=1.8),
            dict(y=-3.0, xo=4.7, hw=1.7, zc=0.15, ht=1.05, hb=0.2, n=2.6, m=2.0),
            dict(y=0.5, xo=4.7, hw=1.7, zc=0.12, ht=0.95, hb=0.2, n=2.6, m=2.0),
            dict(y=3.5, xo=4.6, hw=1.4, zc=0.08, ht=0.6, hb=0.2, n=2.6, m=2.0),
            dict(y=5.3, xo=4.5, hw=0.9, zc=0.05, ht=0.25, hb=0.15, n=2.4, m=2.0),
        ], seg=32, mirror=True)
    for sx in (1, -1):
        # serrated intakes on top of the engine humps
        for k in range(2):
            g.box(M["intake"], (sx * (4.0 + k * 1.4), -3.2, 0.95), (1.2, 0.06, 0.5), rot=(0.9, 0, sx * (0.35 if k else -0.35)))
        # exhaust troughs
        g.box(M["dark"], (sx * 4.5, 6.4, 0.12), (2.2, 3.2, 0.06))
        g.box(M["burner"], (sx * 4.5, 5.2, 0.13), (1.8, 0.1, 0.03))
        g.box(M["nozzle"], (sx * 4.5, 7.2, 0.09), (2.3, 1.6, 0.03))
    # cockpit windows
    for sx in (1, -1):
        for k, (x, w) in enumerate(((0.42, 0.62), (1.12, 0.55))):
            g.box(M["glass"], (sx * x, -7.35 + k * 0.25, 1.25), (w, 0.04, 0.42), rot=(-0.95, 0, sx * (0.12 + k * 0.25)))
    lights(g, M, 26.2, 8.0, -0.3)
    g.empty("nozzle_L", (4.5, 7.8, 0.1)); g.empty("nozzle_R", (-4.5, 7.8, 0.1))
    g.empty("tip_L", (26.2, 9.0, -0.3)); g.empty("tip_R", (-26.2, 9.0, -0.3))
    g.empty("cockpit", (0, -7.2, 1.6)); g.empty("bay", (0, 0.0, -0.6))
    g.empty("msl_L", (2.0, 0.0, -0.6)); g.empty("msl_R", (-2.0, 0.0, -0.6))


def build_bandit(g, M):
    P = M["paint"]
    loft(g, P, [
        dict(y=-11.0, hw=0.04, zc=0.25, ht=0.04, hb=0.04),
        dict(y=-10.5, hw=0.26, zc=0.22, ht=0.26, hb=0.25),
        dict(y=-9.4, hw=0.50, zc=0.18, ht=0.50, hb=0.48),
        dict(y=-8.0, hw=0.68, zc=0.18, ht=0.68, hb=0.62),
        dict(y=-6.2, hw=0.78, zc=0.22, ht=0.82, hb=0.66, n=2.2),
        dict(y=-4.0, hw=0.92, zc=0.30, ht=0.78, hb=0.60, n=2.4),
        dict(y=-1.0, hw=1.25, zc=0.36, ht=0.55, hb=0.45, n=3.2, m=1.8),
        dict(y=3.0, hw=1.45, zc=0.36, ht=0.38, hb=0.32, n=4.0, m=1.6),
        dict(y=7.0, hw=0.9, zc=0.36, ht=0.26, hb=0.25, n=3.0, m=1.6),
        dict(y=9.8, hw=0.35, zc=0.38, ht=0.18, hb=0.18),
        dict(y=10.4, hw=0.12, zc=0.4, ht=0.08, hb=0.08),
    ], seg=36)
    # under-slung engine nacelles
    loft(g, P, [
        dict(y=-3.2, xo=1.35, hw=0.62, zc=-0.42, ht=0.42, hb=0.48, n=6, m=6),
        dict(y=-1.8, xo=1.35, hw=0.64, zc=-0.40, ht=0.48, hb=0.52, n=5, m=5),
        dict(y=2.0, xo=1.30, hw=0.64, zc=-0.30, ht=0.62, hb=0.55, n=3.0, m=3),
        dict(y=6.0, xo=1.25, hw=0.6, zc=-0.15, ht=0.62, hb=0.55, n=2.3, m=2.3),
        dict(y=8.6, xo=1.22, hw=0.55, zc=-0.10, ht=0.55, hb=0.55, n=2.0, m=2.0),
    ], seg=28, mirror=True)
    for sx in (1, -1):
        g.box(M["intake"], (sx * 1.35, -3.18, -0.42), (1.15, 0.06, 0.8), rot=(0.3, 0, 0))
        nozzle(g, M, sx * 1.22, 9.1, -0.1, 0.55, 0.5, 1.0)
    canopy(g, M, -7.9, -4.3, 0.85, 1.48, 0.46, frames=(0.18,))
    # LERX + wings
    wing(g, P, [(0.9, -5.4, 10.2, 0.3), (2.0, -0.6, 5.6, 0.3), (7.3, 3.9, 1.6, 0.3)], t=(0.05, 0.03), dihedral=-2.0)
    wing(g, P, [(1.9, 6.8, 3.2, -0.1), (4.4, 8.9, 1.3, -0.1)], t=(0.045, 0.03))
    fin(g, P, 2.05, 0.55, 4.7, 3.6, 3.4, 7.5, 1.6, cant=0, t=(0.05, 0.035))
    for sx in (1, -1):
        g.cyl(M["pylon"], (sx * 7.42, 4.3, 0.17), 0.08, 2.4, "y", seg=10)     # wingtip rails
        missile(g, M, sx * 7.42, 4.4, 0.0, 2.9, 0.085, "aim9")
    lights(g, M, 7.4, 5.6, 0.2)
    g.empty("nozzle_L", (1.22, 9.6, -0.1)); g.empty("nozzle_R", (-1.22, 9.6, -0.1))
    g.empty("tip_L", (7.4, 5.0, 0.15)); g.empty("tip_R", (-7.4, 5.0, 0.15))
    g.empty("gun", (-1.5, -3.5, 0.6)); g.empty("cockpit", (0, -6.5, 1.25))


def build_bomber(g, M):
    P = M["paint"]
    loft(g, P, [
        dict(y=-20.5, hw=0.05, zc=0.4, ht=0.05, hb=0.05),
        dict(y=-19.5, hw=0.55, zc=0.35, ht=0.6, hb=0.55),
        dict(y=-17.0, hw=1.25, zc=0.3, ht=1.25, hb=1.2),
        dict(y=-13.0, hw=1.65, zc=0.3, ht=1.6, hb=1.45, n=2.2),
        dict(y=-6.0, hw=1.8, zc=0.3, ht=1.65, hb=1.55, n=2.3),
        dict(y=8.0, hw=1.75, zc=0.35, ht=1.55, hb=1.4, n=2.3),
        dict(y=15.0, hw=1.1, zc=0.8, ht=1.0, hb=0.9),
        dict(y=19.5, hw=0.35, zc=1.3, ht=0.4, hb=0.35),
        dict(y=20.3, hw=0.1, zc=1.4, ht=0.1, hb=0.1),
    ], seg=36)
    canopy(g, M, -18.0, -15.0, 1.1, 2.15, 0.95, frames=(0.3, 0.6))
    # glove + swept wings
    wing(g, P, [(1.5, -9.0, 14.0, 0.2), (5.0, -2.0, 8.0, 0.2), (21.0, 9.5, 3.0, -0.3)], t=(0.08, 0.05), dihedral=-1.0)
    fin(g, P, 0.0, 1.5, 9.5, 8.5, 7.5, 15.5, 4.0, cant=0, t=(0.07, 0.05), mirror=False)
    wing(g, P, [(0.2, 13.5, 5.5, 5.4), (8.5, 17.8, 2.4, 5.4)], t=(0.06, 0.04))
    # paired engine nacelles under the glove
    for sx in (1, -1):
        for k in range(2):
            x = sx * (3.0 + k * 1.35)
            loft(g, P, [
                dict(y=-0.5, xo=x, hw=0.62, zc=-1.6, ht=0.62, hb=0.6, n=5, m=5),
                dict(y=4.0, xo=x, hw=0.66, zc=-1.6, ht=0.66, hb=0.62, n=3, m=3),
                dict(y=8.0, xo=x, hw=0.6, zc=-1.6, ht=0.6, hb=0.6),
            ], seg=24)
            g.box(M["intake"], (x, -0.52, -1.6), (1.1, 0.05, 1.1))
            nozzle(g, M, x, 8.4, -1.6, 0.58, 0.52, 0.9)
        g.box(P, (sx * 3.7, 2.0, -0.7), (2.8, 6.0, 0.6))
    lights(g, M, 21.0, 11.0, -0.4, tail=(0, 19.0, 9.5))
    g.empty("nozzle_L", (3.0, 9.0, -1.6)); g.empty("nozzle_R", (-3.0, 9.0, -1.6))
    g.empty("tip_L", (21.0, 11.0, -0.4)); g.empty("tip_R", (-21.0, 11.0, -0.4))


def build_drone(g, M):
    P = M["paint"]
    loft(g, P, [
        dict(y=-2.9, hw=0.04, zc=0, ht=0.04, hb=0.04),
        dict(y=-2.5, hw=0.22, zc=0, ht=0.22, hb=0.22),
        dict(y=-1.6, hw=0.34, zc=0, ht=0.34, hb=0.34),
        dict(y=1.6, hw=0.34, zc=0, ht=0.34, hb=0.34),
        dict(y=2.7, hw=0.2, zc=0.02, ht=0.2, hb=0.2),
    ], seg=24)
    wing(g, P, [(0.3, -0.4, 1.0, 0.0), (1.9, -0.2, 0.7, 0.0)], t=(0.08, 0.06))
    for sx in (1, -1):
        fin(g, P, 0.15 * sx, 0.15, 1.7, 0.9, 0.8, 2.2, 0.5, cant=40 * sx, t=(0.07, 0.05), mirror=False)
    g.cyl(P, (0, 0.8, -0.48), 0.18, 1.6, "y", seg=16)
    g.cyl(M["burner"], (0, 1.62, -0.48), 0.12, 0.02, "y", seg=12)
    g.sphere(M["nav_r"], (1.9, 0.0, 0.0), 0.05)
    g.sphere(M["nav_g"], (-1.9, 0.0, 0.0), 0.05)
    g.empty("nozzle_C", (0, 1.7, -0.48))
    g.empty("tip_L", (1.9, 0.3, 0)); g.empty("tip_R", (-1.9, 0.3, 0))


# ================================================================================================
# paint schemes
# ================================================================================================
def S_f15():
    return dict(c0=0x8E979E, c1=0x6C757C, c2=0x9EA6AC, camo=0.33, camo_th=0.5, panel=1.25, rough=0.55, metal=0.05, patch=0.04, line_dark=0.32,
                decals=[dict(img="star_f15.png", kind="side", c=(-3.6, 0.25), s=(1.5, 0.75), xr=(1.7, 2.3)),
                        dict(img="usaf.png", kind="side", c=(-6.0, 0.1), s=(1.6, 0.34), xr=(0.3, 1.0)),
                        dict(img="tail_f15.png", kind="side", c=(6.1, 2.55), s=(1.9, 1.9), xr=(1.2, 1.6)),
                        dict(img="star_f15.png", kind="top", c=(4.6, 1.0), s=(1.4, 0.7), both=False, side=1),
                        dict(img="star_f15.png", kind="bottom", c=(4.6, 1.0), s=(1.4, 0.7), both=False, side=-1)])


def S_f22():
    return dict(c0=0x7B848B, c1=0x5F676E, c2=None, camo=0.11, camo_th=0.5, panel=1.6, rough=0.42, metal=0.35, patch=0.05, line_dark=0.18,
                dirt=0.5,
                decals=[dict(img="star_dark.png", kind="side", c=(-0.8, 0.45), s=(1.4, 0.7), xr=(1.4, 2.4), alpha=0.8),
                        dict(img="tail_f22.png", kind="side", c=(4.85, 2.2), s=(1.6, 1.6), xr=(1.3, 3.0)),
                        dict(img="star_dark.png", kind="top", c=(4.2, 1.5), s=(1.3, 0.65), both=False, side=1, alpha=0.7)])


def S_f35(variant):
    tail = "tail_f35a.png" if variant == "a" else "tail_f35b.png"
    txt = "usaf_dark.png" if variant == "a" else "marines.png"
    return dict(c0=0x4C5257, c1=0x4C5257, c2=None, camo=None, panel=1.15, rough=0.55, metal=0.08, patch=0.09, patch_scale=1.3, line_dark=0.2,
                ram=0x5E656B, dirt=0.6,
                decals=[dict(img="star_dark.png", kind="side", c=(-1.2, 0.55), s=(1.3, 0.65), xr=(1.3, 2.2), alpha=0.85),
                        dict(img=txt, kind="side", c=(1.6, 0.35), s=(1.5, 0.32), xr=(1.2, 2.0), alpha=0.85),
                        dict(img=tail, kind="side", c=(3.75, 2.15), s=(1.3, 1.3), xr=(1.0, 2.2)),
                        dict(img="star_dark.png", kind="top", c=(3.6, 1.7), s=(1.2, 0.6), both=False, side=1, alpha=0.7)])


def S_b2():
    return dict(c0=0x555A60, c1=0x555A60, c2=None, camo=None, panel=2.2, rough=0.6, metal=0.05, patch=0.03, patch_scale=0.5, line_dark=0.12,
                ram=0x60656B, dirt=0.4,
                decals=[dict(img="star_dark.png", kind="top", c=(14.0, 1.8), s=(1.8, 0.9), both=False, side=1, alpha=0.6),
                        dict(img="b2_name.png", kind="side", c=(-6.4, 0.65), s=(3.0, 0.47), xr=(2.3, 2.8), alpha=0.7)])


def S_bandit():
    return dict(c0=0x7E9BB6, c1=0x557694, c2=0xB9C8D4, c3=0x9DB6CA, camo=0.13, camo_th=0.5, panel=1.3, rough=0.5, metal=0.05, patch=0.04,
                belly_z=0.4, line_dark=0.3,
                decals=[dict(img="enemy_roundel.png", kind="side", c=(5.8, 2.2), s=(1.3, 1.3), xr=(1.8, 2.4)),
                        dict(img="enemy_num.png", kind="side", c=(-8.0, 0.2), s=(0.9, 0.74), xr=(0.3, 0.9)),
                        dict(img="enemy_roundel.png", kind="top", c=(5.3, 2.4), s=(1.2, 1.2))])


def S_ace():
    return dict(c0=0x1A1B1E, c1=0x2A2C30, c2=0x8E1E22, camo=0.2, camo_th=0.6, panel=1.3, rough=0.4, metal=0.25, patch=0.05, belly_z=0.4,
                line_dark=0.25, ram=0x34363A,
                decals=[dict(img="enemy_roundel.png", kind="side", c=(5.8, 2.2), s=(1.3, 1.3), xr=(1.8, 2.4)),
                        dict(img="ace_num.png", kind="side", c=(-8.0, 0.2), s=(0.9, 0.74), xr=(0.3, 0.9)),
                        dict(img="enemy_roundel.png", kind="top", c=(5.3, 2.4), s=(1.2, 1.2))])


def S_bomber():
    return dict(c0=0xD6D8D6, c1=0xC3C6C6, c2=0xE6E6E2, camo=0.06, camo_th=0.55, panel=1.8, rough=0.45, metal=0.05, patch=0.04, line_dark=0.25,
                decals=[dict(img="enemy_roundel.png", kind="side", c=(13.0, 6.0), s=(2.6, 2.6), xr=(0.0, 1.0)),
                        dict(img="bomber_num.png", kind="side", c=(-15.0, 0.4), s=(1.4, 1.15), xr=(1.0, 1.9)),
                        dict(img="enemy_roundel.png", kind="top", c=(14.0, 5.0), s=(2.6, 2.6))])


def S_drone():
    return dict(c0=0xE8622A, c1=0xEDEDE6, camo=None, c2=0xEDEDE6, belly_z=0.1, panel=0.9, rough=0.45, metal=0.0, patch=0.02, line_dark=0.25,
                decals=[dict(img="drone_txt.png", kind="side", c=(0.0, 0.0), s=(1.6, 0.34), xr=(0.2, 0.5))])


KINDS = {
    "f15":    dict(fn=build_f15, gear=gear_f15, scheme=S_f15, res=2048, margin=12, gold=False),
    "f22":    dict(fn=build_f22, gear=gear_f22, scheme=S_f22, res=2048, margin=12, gold=True),
    "f35a":   dict(fn=lambda g, M: build_f35(g, M, "a"), gear=gear_f35, scheme=lambda: S_f35("a"), res=2048, margin=12, gold=True),
    "f35b":   dict(fn=lambda g, M: build_f35(g, M, "b"), gear=gear_f35, scheme=lambda: S_f35("b"), res=2048, margin=12, gold=True),
    "b2":     dict(fn=build_b2, gear=None, scheme=S_b2, res=2048, margin=12, gold=False),
    "bandit": dict(fn=build_bandit, gear=None, scheme=S_bandit, res=1024, margin=8, gold=False),
    "ace":    dict(fn=build_bandit, gear=None, scheme=S_ace, res=1024, margin=8, gold=True),
    "bomber": dict(fn=build_bomber, gear=None, scheme=S_bomber, res=1024, margin=8, gold=False),
    "drone":  dict(fn=build_drone, gear=None, scheme=S_drone, res=512, margin=6, gold=False),
}


# ================================================================================================
def split_off(ob, mat_names, name):
    """move faces that use the given materials into a new object (keeps UVs)."""
    select_only(ob)
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="DESELECT")
    bpy.ops.object.mode_set(mode="OBJECT")
    idx = {i for i, m in enumerate(ob.data.materials) if m and m.name in mat_names}
    n = 0
    for p in ob.data.polygons:
        p.select = p.material_index in idx
        n += p.select
    if not n:
        return None
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.separate(type="SELECTED")
    bpy.ops.object.mode_set(mode="OBJECT")
    new = [o for o in bpy.context.selected_objects if o is not ob][0]
    new.name = name
    return new


def render_preview(objs, name, res=1000, dist=None):
    scene = bpy.context.scene
    setup_cycles(scene, res, int(res * 0.62), spp=64, denoise=True)
    set_all_modes("beauty")
    w = bpy.data.worlds.new("w")
    scene.world = w
    w.use_nodes = True
    sky = w.node_tree.nodes.new("ShaderNodeTexSky")
    sky.sky_type = "MULTIPLE_SCATTERING"
    sky.sun_elevation = math.radians(35)
    sky.sun_rotation = math.radians(140)
    bg = w.node_tree.nodes["Background"]
    w.node_tree.links.new(sky.outputs[0], bg.inputs["Color"])
    bg.inputs["Strength"].default_value = 0.08
    add_sun(scene, 35, 140, 1.3)
    bb = [Vector(c) for o in objs if o.type == "MESH" for c in o.bound_box]
    size = max(max(v.x for v in bb) - min(v.x for v in bb), max(v.y for v in bb) - min(v.y for v in bb))
    d = dist or size * 1.75
    cd = bpy.data.cameras.new("c")
    cd.lens = 50
    cd.clip_end = 2000
    co = bpy.data.objects.new("c", cd)
    scene.collection.objects.link(co)
    scene.camera = co
    for suffix, loc in (("front", (-0.65, -0.75, 0.32)), ("top", (0.02, 0.12, 1.0)), ("rear", (0.55, 0.9, 0.3))):
        co.location = Vector(loc).normalized() * d
        look_at(co, (0, 0, 0.3), "Z")
        render_png(scene, os.path.join(OUT, f"{name}_prev_{suffix}.png"), transform="AgX" if "AgX" in view_transforms(scene) else "Standard")


def build_kind(kind, bake=True, res=None, preview=True):
    cfg = KINDS[kind]
    scene = reset()
    _IMG.clear()
    setup_cycles(scene, 512, 512, spp=16)
    paint = paint_mat("paint", cfg["scheme"]())
    M = std_mats(paint, glass_gold=cfg["gold"])
    g = Geo()
    cfg["fn"](g, M)
    if cfg["gear"]:
        cfg["gear"](g, M)
        M["gear"].mat.name = "gearpaint"
    ob = make_object(g, kind)
    empties = make_empties(g)
    unwrap(ob, margin=0.004)
    print(f"[{kind}] tris", sum(len(p.vertices) - 2 for p in ob.data.polygons), flush=True)
    if bake:
        bake_channels(ob, kind, res or cfg["res"], cfg["margin"], OUT)
    objs = [ob]
    if cfg["gear"]:
        gear = split_off(ob, {"gearpaint", "tire", "chrome"}, "gear")
        if gear:
            objs.append(gear)
    ob.name = "body"
    export_glb(objs + empties, os.path.join(MODELS, f"{kind}.glb"))
    if preview:
        render_preview(objs, kind)


if __name__ == "__main__":
    a = [x for x in args() if not x.startswith("--")]
    flags = [x for x in args() if x.startswith("--")]
    kinds = list(KINDS) if a[0] == "all" else a[0].split(",")
    res = int(a[1]) if len(a) > 1 else None
    for k in kinds:
        build_kind(k, bake="--no-bake" not in flags, res=res, preview="--no-preview" not in flags)
