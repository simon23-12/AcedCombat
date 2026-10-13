"""Effect sprites rendered with Cycles volumes (transparent film, orthographic camera):

  explosion : 6x6 flipbook of a fireball turning into a smoke ball  -> build/fx/explosion.png (1536x1536 RGBA)
  smoke     : 2x2 variants of a lit smoke puff (sun from upper left) -> build/fx/smoke.png (1024x1024 RGBA)

usage: Blender -b -P blender/fx.py -- <explosion|smoke|all> [spp]
"""
import sys, os, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import *

OUT = os.path.join(BUILD, "fx")
os.makedirs(OUT, exist_ok=True)
a = args()
WHAT = a[0] if a else "all"
SPP = int(a[1]) if len(a) > 1 else 96


def base_scene(res, ortho=2.2):
    scene = reset()
    setup_cycles(scene, res, res, spp=SPP, denoise=True)
    scene.render.film_transparent = True
    c = scene.cycles
    c.volume_max_steps = 256
    c.volume_step_rate = 0.5
    c.volume_bounces = 1
    cd = bpy.data.cameras.new("c")
    cd.type = "ORTHO"
    cd.ortho_scale = ortho
    co = bpy.data.objects.new("c", cd)
    scene.collection.objects.link(co)
    co.location = (0, -10, 0)
    co.rotation_euler = (math.radians(90), 0, 0)
    scene.camera = co
    w = bpy.data.worlds.new("w")
    scene.world = w
    w.use_nodes = True
    w.node_tree.nodes["Background"].inputs["Color"].default_value = (0.35, 0.42, 0.55, 1)
    w.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.6
    return scene


def puff_material(name, seed, t, fire):
    """t = 0..1 life time; fire = 1 for the explosion (emission), 0 for plain smoke."""
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    T = NT(nt)
    out = T.N("ShaderNodeOutputMaterial")
    vol = T.N("ShaderNodeVolumePrincipled")
    tc = T.N("ShaderNodeTexCoord")
    p = tc.outputs["Object"]
    r = T.vmath("LENGTH", p)
    # billowy displacement of the radius
    n1 = T.noise(T.vmath("ADD", p, (seed * 3.1, seed * 1.7, seed * 2.3)), 1.5, 6.0, 0.62)
    n2 = T.noise(T.vmath("ADD", T.vmath("MULTIPLY", p, (1.0, 1.0, 1.0)), (seed, 5.0 + seed, 2.0)), 6.0, 4.0, 0.55)
    grow = 0.5 + 0.55 * (1 - (1 - t) ** 3.0) if fire else 0.86
    edge = T.sub(T.add(grow, T.mul(T.add(T.mul(n1, 0.8), T.mul(n2, 0.3)), 0.6)), T.add(r, 0.62))
    dens = T.mul(T.smooth(0.0, 0.18, edge), (10.0 * (1.0 - t) ** 1.3 + 0.4 if fire else 3.5))
    # internal wisps
    dens = T.mul(dens, T.add(0.55, T.mul(n2, 0.9)))
    T.L(dens, vol.inputs["Density"])
    if fire:
        smoke_col = (0.22, 0.2, 0.18) if t > 0.3 else (0.32, 0.24, 0.16)
        vol.inputs["Color"].default_value = (*smoke_col, 1)
        # hot core fades out over the life time
        core = T.smooth(0.0, 0.35, edge)
        heat = max(0.0, 1.0 - t * 2.1)
        temp = T.add(T.mul(T.mul(core, n1), 2600.0 * heat), 1100.0 + 900 * heat)
        T.L(temp, vol.inputs["Temperature"])
        vol.inputs["Blackbody Intensity"].default_value = 7.0 * heat ** 1.2
        vol.inputs["Absorption Color"].default_value = (0.0, 0.0, 0.0, 1)
    else:
        vol.inputs["Color"].default_value = (0.92, 0.92, 0.94, 1)
        vol.inputs["Anisotropy"].default_value = 0.3
    T.L(vol.outputs[0], out.inputs["Volume"])
    return m


def puff_object(mat):
    bpy.ops.mesh.primitive_cube_add(size=2.2, location=(0, 0, 0))
    o = bpy.context.active_object
    o.data.materials.append(mat)
    return o


def render_frame(scene, path):
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"
    scene.view_settings.view_transform = "Standard"
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)


def explosion(n=6, res=256):
    frames = []
    for i in range(n * n):
        t = i / (n * n - 1)
        scene = base_scene(res)
        add_sun(scene, 50, 200, 2.0)
        o = puff_object(puff_material(f"ex{i}", 3.0 + t * 0.6, t, True))
        o.rotation_euler = (0, t * 0.6, 0)
        p = os.path.join(OUT, f"ex_{i:02d}.png")
        render_frame(scene, p)
        frames.append(p)
    sheet(frames, n, res, os.path.join(OUT, "explosion.png"))


def smoke(n=2, res=512):
    frames = []
    for i in range(n * n):
        scene = base_scene(res, 1.45)
        add_sun(scene, 45, 230, 6.0)
        puff_object(puff_material(f"sm{i}", 11.0 + i * 7.3, 0.5, False))
        p = os.path.join(OUT, f"sm_{i}.png")
        render_frame(scene, p)
        frames.append(p)
    sheet(frames, n, res, os.path.join(OUT, "smoke.png"))


def sheet(paths, n, res, out):
    big = np.zeros((n * res, n * res, 4), dtype=np.float32)
    for i, p in enumerate(paths):
        im = bpy.data.images.load(p)
        px = np.array(im.pixels[:], dtype=np.float32).reshape(res, res, 4)[::-1]
        r, c = divmod(i, n)
        big[r * res:(r + 1) * res, c * res:(c + 1) * res] = px
    img = bpy.data.images.new("sheet", n * res, n * res, alpha=True)
    img.pixels.foreach_set(big[::-1].ravel())
    img.filepath_raw = out
    img.file_format = "PNG"
    img.save()
    print("[sheet]", out, flush=True)


if WHAT in ("explosion", "all"):
    explosion()
if WHAT in ("smoke", "all"):
    smoke()
