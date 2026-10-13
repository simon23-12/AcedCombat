"""Cycles equirect HDR sky panoramas: physical sky + volumetric cumulus field (+ ocean for the low presets).

usage: Blender -b -P blender/sky.py -- <preset> [width=4096] [spp=128]
presets: clouds (noon above a cloud sea), sunset (golden hour over the ocean), dawn (pink morning, scattered clouds)
Writes build/sky_<preset>.npy (float16, h x w x 3 scene-linear, top row = zenith) + build/sky_<preset>_preview.png
"""
import sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import *

a = args()
PRESET = a[0] if a else "clouds"
W = int(a[1]) if len(a) > 1 else 4096
SPP = int(a[2]) if len(a) > 2 else 128
H = W // 2

PRESETS = {
    # cam altitude, sun elevation/azimuth (deg), sun strength, sky strength, cloud slab (base, top), coverage, ocean, haze
    "clouds": dict(cam=3400, sun_el=38, sun_az=200, sun=4.2, sky=0.42, base=1500, top=2700, cov=0.52, ocean=True, cirrus=0.6,
                   tint=(1.0, 0.98, 0.95), towers=True),
    "sunset": dict(cam=500, sun_el=2.6, sun_az=250, sun=5.0, sky=0.6, base=1300, top=2600, cov=0.46, ocean=True, cirrus=1.0,
                   tint=(1.0, 0.55, 0.28), towers=False, air=2.2, aer=2.0, near_clear=True),
    "dawn":   dict(cam=900, sun_el=6.0, sun_az=95, sun=3.6, sky=0.55, base=1600, top=2600, cov=0.48, ocean=True, cirrus=0.8,
                   tint=(1.0, 0.70, 0.62), towers=False, air=1.7, aer=1.4, near_clear=True),
    # cover art: sunset above a sea of clouds
    "hero":   dict(cam=3300, sun_el=4.0, sun_az=226, sun=5.5, sky=0.6, base=1300, top=2600, cov=0.62, ocean=True, cirrus=1.0,
                   tint=(1.0, 0.58, 0.3), towers=True, air=2.2, aer=2.0),
}
P = PRESETS[PRESET]

scene = reset()
setup_cycles(scene, W, H, spp=SPP, denoise=True)
c = scene.cycles
c.volume_max_steps = 512
c.volume_step_rate = 4.0
c.volume_bounces = 2
c.max_bounces = 6
c.transparent_max_bounces = 8
c.sample_clamp_indirect = 10
scene.view_settings.view_transform = "Standard"

cd = bpy.data.cameras.new("pano")
cd.type = "PANO"
try:
    cd.panorama_type = "EQUIRECTANGULAR"
except Exception:
    cd.cycles.panorama_type = "EQUIRECTANGULAR"
cd.clip_start = 1.0
cd.clip_end = 300000.0
cam = bpy.data.objects.new("pano", cd)
scene.collection.objects.link(cam)
cam.location = (0, 0, P["cam"])
cam.rotation_euler = (math.radians(90), 0, 0)
scene.camera = cam

# ------------------------------------------------------------------ world: art-directed sky gradient
GRADS = {
    # elevation (deg) -> colour, sun side / anti-sun side
    "clouds": ([(-10, (0.55, 0.62, 0.70)), (0, (0.95, 1.02, 1.08)), (4, (0.70, 0.84, 1.00)), (14, (0.42, 0.62, 0.95)),
                (35, (0.22, 0.42, 0.85)), (90, (0.10, 0.25, 0.66))],
               [(-10, (0.55, 0.62, 0.70)), (0, (0.90, 0.98, 1.05)), (4, (0.66, 0.80, 0.98)), (14, (0.40, 0.60, 0.93)),
                (35, (0.22, 0.42, 0.85)), (90, (0.10, 0.25, 0.66))], (1.0, 0.95, 0.85), 1.4),
    "sunset": ([(-10, (0.30, 0.12, 0.05)), (0, (2.4, 0.95, 0.30)), (3, (1.9, 0.75, 0.30)), (9, (1.0, 0.48, 0.32)),
                (20, (0.42, 0.30, 0.42)), (45, (0.12, 0.14, 0.32)), (90, (0.05, 0.07, 0.20))],
               [(-10, (0.16, 0.10, 0.12)), (0, (0.75, 0.42, 0.42)), (3, (0.62, 0.38, 0.46)), (9, (0.42, 0.32, 0.48)),
                (20, (0.24, 0.24, 0.44)), (45, (0.10, 0.13, 0.32)), (90, (0.05, 0.07, 0.20))], (2.6, 1.15, 0.45), 2.5),
    "dawn": ([(-10, (0.25, 0.16, 0.18)), (0, (1.9, 1.05, 0.80)), (4, (1.5, 0.92, 0.85)), (10, (0.95, 0.75, 0.85)),
              (24, (0.45, 0.50, 0.80)), (50, (0.20, 0.30, 0.65)), (90, (0.10, 0.17, 0.45))],
             [(-10, (0.18, 0.16, 0.22)), (0, (0.80, 0.66, 0.80)), (4, (0.68, 0.62, 0.82)), (10, (0.52, 0.55, 0.82)),
              (24, (0.34, 0.42, 0.78)), (50, (0.18, 0.28, 0.62)), (90, (0.10, 0.17, 0.45))], (2.0, 1.2, 0.95), 2.0),
}
w = bpy.data.worlds.new("sky")
scene.world = w
w.use_nodes = True
nt = w.node_tree
nt.nodes.clear()
t = NT(nt)
out = t.N("ShaderNodeOutputWorld")
bg = t.N("ShaderNodeBackground")
tcw = t.N("ShaderNodeTexCoord")
dx, dy, dz = t.sep(tcw.outputs["Generated"])
el = t.mul(t.math("ARCSINE", t.math("MINIMUM", t.math("MAXIMUM", dz, -1.0), 1.0)), 180 / math.pi)
fac = t.math("MINIMUM", t.math("MAXIMUM", t.mul(t.add(el, 10.0), 1 / 100.0), 0.0), 1.0)
sun_el, sun_az = math.radians(P["sun_el"]), math.radians(P["sun_az"])
SD = (math.cos(sun_el) * math.sin(sun_az), math.cos(sun_el) * math.cos(sun_az), math.sin(sun_el))
cosg = t.vmath("DOT_PRODUCT", tcw.outputs["Generated"], SD)


def ramp(stops):
    r = t.N("ShaderNodeValToRGB")
    r.color_ramp.interpolation = "B_SPLINE"
    els = r.color_ramp.elements
    pos = [(e + 10) / 100.0 for e, _ in stops]
    els[0].position, els[0].color = pos[0], (*stops[0][1], 1)
    els[1].position, els[1].color = pos[-1], (*stops[-1][1], 1)
    for p_, (_, col) in zip(pos[1:-1], stops[1:-1]):
        e = els.new(p_)
        e.color = (*col, 1)
    t.L(fac, r.inputs["Fac"])
    return r.outputs["Color"]


gs, ga, glowc, glowk = GRADS["sunset" if PRESET == "hero" else PRESET]
side = t.mul(t.add(cosg, 1.0), 0.5)
side = t.math("POWER", side, 1.6)
col = t.mix(side, ramp(ga), ramp(gs))
# forward-scattering glow around the sun, strongest near the horizon
cg = t.math("MAXIMUM", cosg, 0.0)
glow = t.add(t.mul(t.math("POWER", cg, 6.0), 0.35 * glowk), t.mul(t.math("POWER", cg, 60.0), 1.2 * glowk))
glow = t.mul(glow, t.add(t.mul(t.smooth(25.0, 0.0, el), 0.8), 0.2))
col = t.mix(1.0, col, t.comb(t.mul(glow, glowc[0]), t.mul(glow, glowc[1]), t.mul(glow, glowc[2])), "ADD")
t.L(col, bg.inputs["Color"])
bg.inputs["Strength"].default_value = P["sky"] * 1.8
t.L(bg.outputs[0], out.inputs["Surface"])
sun = add_sun(scene, P["sun_el"], P["sun_az"], P["sun"], 0.55, P["tint"])
# Sky texture rotation is measured differently from our sun lamp: verify by printing both directions
print("sun lamp dir", sun.matrix_world.to_quaternion() @ Vector((0, 0, -1)))

# ------------------------------------------------------------------ cloud slab
R = 120000.0
NOCLOUDS = "--noclouds" in sys.argv
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, (P["base"] + P["top"]) / 2))
slab = bpy.context.active_object
slab.scale = (2 * R, 2 * R, P["top"] - P["base"])
m = bpy.data.materials.new("clouds")
m.use_nodes = True
mt = NT(m.node_tree)
m.node_tree.nodes.clear()
mo = mt.N("ShaderNodeOutputMaterial")
vol = mt.N("ShaderNodeVolumePrincipled")
vol.inputs["Color"].default_value = (1, 1, 1, 1)
vol.inputs["Anisotropy"].default_value = 0.55
tc = mt.N("ShaderNodeTexCoord")
pos = tc.outputs["Object"]                 # -0.5..0.5 in the slab box
gx, gy, gz = mt.sep(pos)
h = mt.add(gz, 0.5)                        # 0..1 through the slab
wpos = mt.vmath("MULTIPLY", pos, (2 * R, 2 * R, P["top"] - P["base"]))
# coverage (large scale), towers, detail
cov = mt.noise(mt.vmath("MULTIPLY", wpos, (1 / 9000.0, 1 / 9000.0, 0.0)), 1.0, 3.0, 0.5)
cov2 = mt.noise(mt.vmath("MULTIPLY", wpos, (1 / 2600.0, 1 / 2600.0, 1 / 2600.0)), 1.0, 4.0, 0.55)
col_h = mt.add(mt.mul(mt.smooth(1.0 - P["cov"] - 0.08, 1.0 - P["cov"] + 0.25, mt.add(mt.mul(cov, 0.55), mt.mul(cov2, 0.55))), 1.0), 0.0)
if P["towers"]:
    tw = mt.noise(mt.vmath("MULTIPLY", wpos, (1 / 5000.0, 1 / 5000.0, 0.0)), 1.0, 2.0, 0.5)
    col_h = mt.math("MAXIMUM", mt.mul(col_h, 0.75), mt.mul(mt.smooth(0.62, 0.72, tw), 1.0))
else:
    col_h = mt.mul(col_h, 0.8)
# cumulus profile: flat base, rounded top
prof = mt.mul(mt.smooth(0.0, 0.08, h), mt.smooth(0.0, 0.22, mt.sub(col_h, h)))
det = mt.noise(mt.vmath("MULTIPLY", wpos, (1 / 380.0, 1 / 380.0, 1 / 300.0)), 1.0, 6.0, 0.6)
det2 = mt.noise(mt.vmath("MULTIPLY", wpos, (1 / 90.0, 1 / 90.0, 1 / 90.0)), 1.0, 3.0, 0.55)
dens = mt.sub(prof, mt.mul(mt.add(mt.mul(det, 0.7), mt.mul(det2, 0.3)), mt.sub(1.15, prof)))
dens = mt.mul(mt.math("MAXIMUM", dens, 0.0), 0.12)
# fade to nothing far away so the slab has no visible edge
rr = mt.vmath("LENGTH", mt.vmath("MULTIPLY", pos, (2.0, 2.0, 0.0)))
dens = mt.mul(dens, mt.smooth(1.0, 0.75, rr))
if P.get("near_clear"):
    # the game renders the near clouds in real time: keep only the distant cloud bands in the panorama
    hd = mt.vmath("LENGTH", mt.vmath("MULTIPLY", pos, (2 * R, 2 * R, 0.0)))
    dens = mt.mul(dens, mt.smooth(16000.0, 28000.0, hd))
mt.L(dens, vol.inputs["Density"])
mt.L(vol.outputs[0], mo.inputs["Volume"])
slab.data.materials.append(m)
if NOCLOUDS:
    bpy.data.objects.remove(slab)

# ------------------------------------------------------------------ high cirrus sheet
if P["cirrus"] > 0:
    bpy.ops.mesh.primitive_plane_add(size=2 * R, location=(0, 0, 9500))
    ci = bpy.context.active_object
    cm = bpy.data.materials.new("cirrus")
    cm.use_nodes = True
    ct = NT(cm.node_tree)
    cm.node_tree.nodes.clear()
    co = ct.N("ShaderNodeOutputMaterial")
    tcc = ct.N("ShaderNodeTexCoord")
    p2 = ct.vmath("MULTIPLY", tcc.outputs["Object"], (R / 1800.0, R / 9000.0, 1.0))
    wv = ct.N("ShaderNodeTexWave")
    wv.wave_type = "BANDS"
    wv.inputs["Scale"].default_value = 1.0
    wv.inputs["Distortion"].default_value = 9.0
    wv.inputs["Detail"].default_value = 6.0
    wv.inputs["Detail Roughness"].default_value = 0.65
    ct.L(p2, wv.inputs["Vector"])
    n1 = ct.noise(ct.vmath("MULTIPLY", tcc.outputs["Object"], (R / 12000.0, R / 12000.0, 1.0)), 1.0, 2.0, 0.5)
    a1 = ct.mul(ct.mul(ct.smooth(0.55, 0.95, wv.outputs["Fac"]), ct.smooth(0.45, 0.7, n1)), 0.55 * P["cirrus"])
    rr2 = ct.vmath("LENGTH", ct.vmath("MULTIPLY", tcc.outputs["Object"], (2.0, 2.0, 0.0)))
    a1 = ct.mul(a1, ct.smooth(1.0, 0.6, rr2))
    tr = ct.N("ShaderNodeBsdfTranslucent"); tr.inputs["Color"].default_value = (1, 1, 1, 1)
    df = ct.N("ShaderNodeBsdfDiffuse"); df.inputs["Color"].default_value = (1, 1, 1, 1)
    ad = ct.N("ShaderNodeAddShader"); ct.L(tr.outputs[0], ad.inputs[0]); ct.L(df.outputs[0], ad.inputs[1])
    tp = ct.N("ShaderNodeBsdfTransparent")
    mx = ct.N("ShaderNodeMixShader")
    ct.L(a1, mx.inputs[0]); ct.L(tp.outputs[0], mx.inputs[1]); ct.L(ad.outputs[0], mx.inputs[2])
    ct.L(mx.outputs[0], co.inputs["Surface"])
    ci.data.materials.append(cm)
    ci.visible_shadow = False

# ------------------------------------------------------------------ ocean
if P["ocean"]:
    bpy.ops.mesh.primitive_plane_add(size=2 * R, location=(0, 0, 0))
    sea = bpy.context.active_object
    sm = bpy.data.materials.new("sea")
    sm.use_nodes = True
    st = NT(sm.node_tree)
    sm.node_tree.nodes.clear()
    so = st.N("ShaderNodeOutputMaterial")
    b = st.N("ShaderNodeBsdfPrincipled")
    b.inputs["Base Color"].default_value = (*srgb(0x0B2233), 1)
    b.inputs["Roughness"].default_value = 0.07
    b.inputs["IOR"].default_value = 1.333
    tcs = st.N("ShaderNodeTexCoord")
    wn = st.N("ShaderNodeTexWave")
    wn.inputs["Scale"].default_value = 0.004
    wn.inputs["Distortion"].default_value = 6
    wn.inputs["Detail"].default_value = 8
    st.L(tcs.outputs["Object"], wn.inputs["Vector"])
    bump = st.N("ShaderNodeBump"); bump.inputs["Strength"].default_value = 0.15; bump.inputs["Distance"].default_value = 0.4
    st.L(wn.outputs["Fac"], bump.inputs["Height"])
    st.L(bump.outputs[0], b.inputs["Normal"])
    st.L(b.outputs[0], so.inputs["Surface"])
    sea.data.materials.append(sm)

# ------------------------------------------------------------------ render
if "--norender" not in sys.argv:
    scene.render.image_settings.file_format = "OPEN_EXR"
    scene.render.image_settings.color_depth = "16"
    scene.render.image_settings.color_mode = "RGB"
    exr = os.path.join(BUILD, f"sky_{PRESET}.exr")
    scene.render.filepath = exr
    bpy.ops.render.render(write_still=True)
    img = bpy.data.images.load(exr)
    px = np.array(img.pixels[:], dtype=np.float32).reshape(img.size[1], img.size[0], img.channels)[::-1, :, :3]
    np.save(os.path.join(BUILD, f"sky_{PRESET}.npy"), px.astype(np.float16))
    print("saved", px.shape, "mean", float(px.mean()), "max", float(px.max()), flush=True)
