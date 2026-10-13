"""Ships: the player's carrier CVN-77 'ACED' (Nimitz-like, deck markings + baked AO on a 1024x4096 deck texture)
and the enemy destroyer.

usage: Blender -b -P blender/ships.py -- <carrier|destroyer|all> [--no-bake] [--no-preview]
Outputs build/ships/*, assets/models/{carrier,destroyer}.glb, assets/models/carrier.json
"""
import sys, os, math, json, random
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "tools"))
from lib import *
import aircraft as ac
import carrier_spec as CS

OUT = os.path.join(BUILD, "ships")
MODELS = os.path.join(ASSETS, "models")
os.makedirs(OUT, exist_ok=True)


def hull_mat(name, grey, boot_z=(-0.6, 1.4), decals=(), lines=3.0):
    m = ChanMat(name)
    t = m.t
    tc = t.N("ShaderNodeTexCoord")
    geo = t.N("ShaderNodeNewGeometry")
    o = tc.outputs["Object"]
    ox, oy, oz = t.sep(o)
    col = t.rgb(srgb(grey))
    # rust/salt streaks running down
    st = t.noise(t.vmath("MULTIPLY", o, (0.6, 0.6, 0.06)), 2.0, 4.0, 0.6)
    st2 = t.noise(o, 0.8, 3.0, 0.5)
    col = t.mix(t.mul(t.smooth(0.55, 0.8, st), 0.35), col, t.rgb(srgb(0x5A4636)))
    col = t.mix(t.mul(st2, 0.12), col, t.rgb(srgb(0x30302E)))
    # plate seams
    fy = t.math("FRACT", t.mul(oy, 1 / 6.0))
    fz = t.math("FRACT", t.mul(oz, 1 / lines))
    seam = t.math("MAXIMUM", t.smooth(0.985, 0.995, fy), t.smooth(0.97, 0.99, fz))
    col = t.mix(t.mul(seam, 0.35), col, t.rgb((0, 0, 0)))
    # boot topping + red below the waterline
    boot = t.mul(t.math("GREATER_THAN", oz, boot_z[0]), t.math("LESS_THAN", oz, boot_z[1]))
    col = t.mix(boot, col, t.rgb(srgb(0x161718)))
    col = t.mix(t.math("LESS_THAN", oz, boot_z[0]), col, t.rgb(srgb(0x6E2A22)))
    for d in decals:
        col = ac.decal(t, col, o, geo, d)
    m.color = col
    m.rough = t.add(0.55, t.mul(st2, 0.2))
    m.metal = 0.1
    m.height = t.mul(seam, -1.0)
    m.bump_strength = 0.2
    return m.finish()


def deck_mat():
    m = ChanMat("deck")
    t = m.t
    tc = t.N("ShaderNodeTexCoord")
    im = bpy.data.images.load(os.path.join(BUILD, "deck_markings.png"))
    im.colorspace_settings.name = "sRGB"
    c, a = t.img(im, tc.outputs["UV"], "Linear", "EXTEND")
    m.color = c
    m.rough = 0.85
    m.metal = 0.0
    return m.finish()


def prism(g, top_mat, side_mat, pts, z0, z1, bot_mat=None):
    """extrude polygon pts [(x,y)] from z0 to z1; returns nothing"""
    bt = g.bm(top_mat)
    vt = [bt.verts.new((x, y, z1)) for x, y in pts]
    f = bt.faces.new(vt)
    f.normal_update()
    if f.normal.z < 0:
        f.normal_flip()
    bs = g.bm(side_mat)
    n = len(pts)
    top = [bs.verts.new((x, y, z1)) for x, y in pts]
    bot = [bs.verts.new((x, y, z0)) for x, y in pts]
    for i in range(n):
        j = (i + 1) % n
        bs.faces.new((bot[i], bot[j], top[j], top[i]))
    bb = g.bm(bot_mat or side_mat)
    vb = [bb.verts.new((x, y, z0)) for x, y in pts]
    bb.faces.new(vb[::-1])


def build_carrier(g, M):
    H = M["hull"]
    DZ = CS.DECK_Z
    # underwater + side hull
    st = []
    for y, hw, top in ((-168, 0.8, DZ - 2.2), (-163, 5.5, DZ - 2.2), (-150, 12.5, DZ - 2.2), (-125, 17.5, DZ - 2.2), (-90, 20.0, DZ - 2.2),
                       (-40, 20.5, DZ - 2.2), (90, 20.5, DZ - 2.2), (135, 19.6, DZ - 2.2), (160, 18.0, DZ - 2.2), (165, 17.0, DZ - 2.2)):
        bot = -11.0 if -140 < y < 150 else -7.0
        zc = (top + bot) / 2
        st.append(dict(y=y, hw=hw, zc=zc, ht=top - zc, hb=zc - bot, n=5 if y > -150 else 3, mt=8, mb=2.6))
    ac.loft(g, H, st, seg=40)
    # flared bow knuckle under the deck overhang
    ac.loft(g, H, [dict(y=-168.0, hw=1.0, zc=DZ - 4.0, ht=2.0, hb=3.0, n=3, m=3),
                   dict(y=-158.0, hw=10.0, zc=DZ - 4.0, ht=2.0, hb=4.0, n=4, m=3),
                   dict(y=-130.0, hw=19.0, zc=DZ - 4.0, ht=2.0, hb=4.5, n=5, m=3),
                   dict(y=-100.0, hw=21.0, zc=DZ - 4.0, ht=2.0, hb=4.5, n=6, m=3)], seg=28)
    # flight deck slab (top face is the textured deck object)
    prism(g, M["deck"], M["gallery"], CS.OUTLINE, DZ - 2.4, DZ)
    # sponson supports under the overhangs
    for x, y, sx, sy in ((30, 20, 22, 70), (34, 100, 14, 60), (-28, 40, 14, 160), (-26, -80, 10, 60)):
        g.box(H, (x, y, DZ - 5.5), (sx, sy, 6.4))
    # hangar openings
    for sx in (1, -1):
        for y in (-70, 10, 100):
            g.box(M["dark"], (sx * 20.6, y, 10.0), (0.4, 18, 6.0))
    # island
    I = CS.ISLAND
    ix, iy = (I["x0"] + I["x1"]) / 2, (I["y0"] + I["y1"]) / 2
    g.box(H, (ix, iy, DZ + 7), (I["x1"] - I["x0"], I["y1"] - I["y0"], 14), bevel=0.15)
    g.box(H, (ix - 0.3, iy - 3, DZ + 17), (9.0, 26, 6), bevel=0.12)
    g.box(H, (ix - 0.6, iy - 6, DZ + 22.5), (8.0, 14, 5), bevel=0.12)
    # bridge windows
    for z, yy, ln in ((DZ + 18.2, iy - 16.05, 9.0), (DZ + 23.5, iy - 13.05, 8.0)):
        g.box(M["glass"], (ix - 0.3, yy, z), (ln - 0.2, 0.15, 1.3))
    for sx in (I["x0"] - 0.05, I["x1"] + 0.05):
        for k in range(6):
            g.box(M["glass"], (sx, iy - 14 + k * 2.2, DZ + 18.2), (0.15, 1.5, 1.2))
    # phased-array faces + mast
    g.box(M["array"], (ix, iy - 15.6, DZ + 13), (6.0, 0.3, 6.0))
    g.box(M["array"], (ix, iy + 18.2, DZ + 13), (6.0, 0.3, 6.0))
    g.box(H, (ix - 0.5, iy - 2, DZ + 30), (1.6, 1.6, 10))
    g.box(H, (ix - 0.5, iy - 2, DZ + 34), (6.5, 1.0, 0.5))
    g.box(M["dark"], (ix - 0.5, iy - 2, DZ + 37.5), (8.0, 0.6, 1.4))          # radar
    g.cyl(H, (ix - 0.5, iy - 2, DZ + 41), 0.25, 6.0, "z", seg=8)
    g.sphere(M["white"], (ix - 3.5, iy + 4, DZ + 27.5), 1.4)
    g.sphere(M["white"], (ix + 2.5, iy + 4, DZ + 27.5), 1.4)
    g.box(H, (ix, iy + 8, DZ + 26), (6, 6, 1.0))
    # CIWS / RAM on the corner sponsons
    for x, y in ((24, -100), (-24, -112), (33, 150), (-28, 150)):
        g.cyl(H, (x, y, DZ - 4.0), 2.2, 2.5, "z", seg=14)
        g.cyl(M["white"], (x, y, DZ - 1.6), 0.9, 2.2, "z", seg=14)
        g.sphere(M["white"], (x, y, DZ - 0.4), 0.9)
    # catwalk rails along the deck edge
    pts = CS.OUTLINE + [CS.OUTLINE[0]]
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        ln = math.dist((x0, y0), (x1, y1))
        a = math.atan2(y1 - y0, x1 - x0)
        nx, ny = math.sin(a), -math.cos(a)
        g.box(M["gallery"], ((x0 + x1) / 2 + nx * 1.4, (y0 + y1) / 2 + ny * 1.4, DZ - 1.0), (ln, 2.6, 0.2), rot=(0, 0, a))
    # jet blast deflectors (raised) for the waist cats only (bow cats: JBD lowered so you can taxi)
    for (x0, y0), (x1, y1) in CS.CATS[2:]:
        ln = math.dist((x0, y0), (x1, y1))
        ux, uy = (x1 - x0) / ln, (y1 - y0) / ln
        jx, jy = x0 - ux * 9.6, y0 - uy * 9.6
        g.box(M["jbd"], (jx, jy, DZ + 1.6), (12.0, 0.5, 3.6), rot=(-0.85, 0, math.atan2(uy, ux) + math.pi / 2))
    # arresting wires + sheaves
    for (a, b) in CS.wire_points():
        ln = math.dist(a, b)
        ang = math.atan2(b[1] - a[1], b[0] - a[0])
        g.cyl(M["wire"], ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, DZ + 0.12), 0.045, ln, "x", seg=6,
              rot=Matrix.Rotation(ang, 4, "Z"))
        for p in (a, b):
            g.box(M["wire"], (p[0], p[1], DZ + 0.12), (0.5, 0.35, 0.24))
    # Fresnel lens (meatball) housing
    lx, ly, lz = CS.LENS
    g.box(M["dark"], (lx, ly, lz), (0.8, 2.0, 3.2))
    for k in range(5):
        g.box(M["lens_g"], (lx - 0.4, ly + (k - 2) * 1.4, lz + 0.2), (0.1, 0.9, 0.18))
    # bow anchors + stern details
    for sx in (1, -1):
        g.box(M["dark"], (sx * 6.0, -160, 10.0), (0.4, 2.0, 2.0))
    g.box(M["dark"], (0, 165.2, 8), (18, 0.4, 4))
    g.empty("lens", (lx - 0.45, ly, lz + 1.0))


def build_destroyer(g, M):
    H = M["hull"]
    st = []
    for y, hw, top, bot in ((-76, 0.4, 9.5, 4.0), (-70, 4.0, 9.2, -3.5), (-55, 7.5, 8.6, -5.0), (-30, 9.6, 8.2, -5.5), (10, 10.0, 8.0, -5.5),
                            (50, 9.4, 8.0, -5.0), (70, 8.2, 8.0, -3.5), (74, 7.6, 8.0, -1.5)):
        zc = (top + bot) / 2
        st.append(dict(y=y, hw=hw, zc=zc, ht=top - zc, hb=zc - bot, n=3.5 if y > -60 else 2.4, mt=8, mb=2.4))
    ac.loft(g, H, st, seg=32)
    g.box(M["deckgrey"], (0, 0, 8.05), (18.5, 120, 0.1))
    # forward gun
    g.cyl(H, (0, -50, 9.2), 2.2, 2.2, "z", seg=16)
    g.box(H, (0, -50.5, 10.6), (3.4, 4.6, 1.8), bevel=0.4)
    g.cyl(M["dark"], (0, -56, 10.8), 0.18, 7.0, "y", seg=8)
    # VLS
    for k in range(4):
        for j in range(2):
            g.box(M["dark"], (-2.5 + j * 5.0, -40 + k * 3.0, 8.3), (4.2, 2.6, 0.5))
    # superstructure + bridge
    g.box(H, (0, -18, 13), (14, 22, 10), bevel=0.3)
    g.box(H, (0, -22, 19), (12, 12, 4), bevel=0.3)
    g.box(M["glass"], (0, -28.1, 19.5), (11, 0.2, 1.4))
    g.box(M["array"], (0, -29.1, 14.5), (5, 0.3, 5))
    for sx in (1, -1):
        g.box(M["array"], (sx * 7.05, -18, 14.5), (0.3, 5, 5))
    # mast
    g.cyl(H, (0, -16, 26), 0.9, 12, "z", seg=8, r2=0.4)
    g.box(H, (0, -16, 28.5), (7, 0.6, 0.5))
    g.box(M["dark"], (0, -16, 31.5), (5, 0.5, 1.2))
    # funnels
    for y in (2, 14):
        g.box(H, (0, y, 13), (7, 6, 10), bevel=0.8)
        g.box(M["dark"], (0, y, 18.1), (5.5, 4.5, 0.4))
    # hangar + flight deck
    g.box(H, (0, 32, 11.5), (14, 16, 7), bevel=0.3)
    g.box(M["deckgrey"], (0, 56, 8.1), (16, 32, 0.15))
    g.box(M["white"], (0, 56, 8.2), (0.3, 26, 0.05))
    # CIWS
    for y in (-27, 38):
        g.cyl(M["white"], (0, y, 17.2 if y < 0 else 15.4), 0.9, 2.0, "z", seg=12)
        g.sphere(M["white"], (0, y, 18.4 if y < 0 else 16.6), 0.9)
    g.empty("gun", (0, -59, 10.8)); g.empty("ciws_f", (0, -27, 18.5)); g.empty("ciws_a", (0, 38, 16.6))
    g.empty("funnel", (0, 2, 18.5))


def ship_mats(kind):
    M = {}
    if kind == "carrier":
        M["hull"] = hull_mat("hull", 0x747C82, decals=[dict(img="hull77.png", kind="side", c=(-147.0, 12.5), s=(13.0, 11.4), xr=(5.0, 30.0)),
                                                       dict(img="hull77.png", kind="side", c=(14.0, 31.0), s=(8.0, 7.0), xr=(25.0, 40.0))])
    else:
        M["hull"] = hull_mat("hull", 0x66717A, decals=[dict(img="bomber_num.png", kind="side", c=(-60.0, 5.5), s=(5.0, 4.1), xr=(3.0, 12.0))])
    M["deck"] = deck_mat() if kind == "carrier" else simple_mat("deckx", 0x404346, 0.8)
    M["deckgrey"] = simple_mat("deckgrey", 0x45484B, 0.85)
    M["gallery"] = simple_mat("gallery", 0x5E666B, 0.7, 0.1)
    M["dark"] = simple_mat("dark", 0x101213, 0.8)
    M["glass"] = simple_mat("glass", 0x0B1418, 0.08, 0.6)
    M["array"] = simple_mat("array", 0x4F565C, 0.5, 0.2)
    M["white"] = simple_mat("white", 0xD8DADA, 0.5)
    M["jbd"] = simple_mat("jbd", 0x5C5F61, 0.6, 0.3)
    M["wire"] = simple_mat("wire", 0x2A2C2E, 0.4, 0.8)
    M["lens_g"] = simple_mat("lens_g", 0x001000, 0.3, emit=(0.2, 6.0, 0.6))
    return M


def deck_uv(ob):
    me = ob.data
    uv = me.uv_layers.new(name="UVMap") if not me.uv_layers else me.uv_layers[0]
    for poly in me.polygons:
        for li in poly.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            uv.data[li].uv = ((co.x - CS.DECK_X[0]) / (CS.DECK_X[1] - CS.DECK_X[0]), (co.y - CS.DECK_Y[0]) / (CS.DECK_Y[1] - CS.DECK_Y[0]))


def bake_deck_ao(deck, others):
    scene = bpy.context.scene
    scene.cycles.samples = 256
    img = bpy.data.images.new("deck_ao", CS.TEX_W // 2, CS.TEX_H // 2, alpha=False)
    img.colorspace_settings.name = "Non-Color"
    mat = deck.data.materials[0]
    n = mat.node_tree.nodes.new("ShaderNodeTexImage")
    n.image = img
    mat.node_tree.nodes.active = n
    set_all_modes("beauty")
    select_only(deck)
    bpy.ops.object.bake(type="AO", margin=4, use_clear=True)
    img.filepath_raw = os.path.join(OUT, "carrier_deck_ao.png")
    img.file_format = "PNG"
    img.save()
    mat.node_tree.nodes.remove(n)
    print("[bake] deck ao", flush=True)


def render_preview(objs, name):
    scene = bpy.context.scene
    setup_cycles(scene, 1200, 700, spp=64, denoise=True)
    set_all_modes("beauty")
    w = bpy.data.worlds.new("w")
    scene.world = w
    w.use_nodes = True
    sky = w.node_tree.nodes.new("ShaderNodeTexSky")
    sky.sky_type = "MULTIPLE_SCATTERING"
    sky.sun_elevation = math.radians(30)
    sky.sun_rotation = math.radians(120)
    bg = w.node_tree.nodes["Background"]
    w.node_tree.links.new(sky.outputs[0], bg.inputs["Color"])
    bg.inputs["Strength"].default_value = 0.08
    add_sun(scene, 30, 120, 1.3)
    # sea plane
    bpy.ops.mesh.primitive_plane_add(size=3000, location=(0, 0, 0))
    sea = bpy.context.active_object
    sm = bpy.data.materials.new("sea"); sm.use_nodes = True
    b = sm.node_tree.nodes["Principled BSDF"]; b.inputs["Base Color"].default_value = (0.01, 0.03, 0.05, 1); b.inputs["Roughness"].default_value = 0.15
    sea.data.materials.append(sm)
    bb = [Vector(c) for o in objs if o.type == "MESH" for c in o.bound_box]
    size = max(max(v.y for v in bb) - min(v.y for v in bb), 30)
    cd = bpy.data.cameras.new("c"); cd.lens = 45; cd.clip_end = 5000
    co = bpy.data.objects.new("c", cd); scene.collection.objects.link(co); scene.camera = co
    for suffix, loc in (("a", (0.6, 0.9, 0.45)), ("b", (-0.7, -0.6, 0.3))):
        co.location = Vector(loc).normalized() * size * 1.1
        look_at(co, (0, 0, 10))
        render_png(scene, os.path.join(OUT, f"{name}_prev_{suffix}.png"), transform="AgX" if "AgX" in view_transforms(scene) else "Standard")


def build(kind, bake=True, preview=True):
    scene = reset()
    ac._IMG.clear()
    setup_cycles(scene, 512, 512, spp=16)
    M = ship_mats(kind)
    g = Geo()
    (build_carrier if kind == "carrier" else build_destroyer)(g, M)
    ob = make_object(g, kind)
    empties = make_empties(g)
    deck = None
    if kind == "carrier":
        deck = ac.split_off(ob, {"deck"}, "deck")
        deck_uv(deck)
    unwrap(ob, margin=0.002, angle=55)
    print(f"[{kind}] tris", sum(len(p.vertices) - 2 for p in ob.data.polygons), flush=True)
    if bake:
        bake_channels(ob, kind, 2048 if kind == "carrier" else 1024, 8, OUT, samples_ao=128)
        if deck:
            bake_deck_ao(deck, [ob])
    ob.name = "body"
    objs = [ob] + ([deck] if deck else [])
    export_glb(objs + empties, os.path.join(MODELS, f"{kind}.glb"))
    if kind == "carrier":
        spec = dict(deckZ=CS.DECK_Z, outline=CS.OUTLINE, cats=CS.CATS, wires=CS.wire_points(), lens=CS.LENS,
                    land=dict(origin=CS.LAND_ORIGIN, dir=CS.LAND_DIR, half=CS.LAND_HALF, angle=math.degrees(CS.ANG)),
                    island=CS.ISLAND, deckRect=dict(x=CS.DECK_X, y=CS.DECK_Y))
        with open(os.path.join(MODELS, "carrier.json"), "w") as f:
            json.dump(spec, f, indent=1)
    if preview:
        render_preview(objs, kind)


if __name__ == "__main__":
    a = [x for x in args() if not x.startswith("--")]
    flags = [x for x in args() if x.startswith("--")]
    kinds = ["carrier", "destroyer"] if a[0] == "all" else a[0].split(",")
    for k in kinds:
        build(k, bake="--no-bake" not in flags, preview="--no-preview" not in flags)
