"""Cover art: F-22 and F-15 banking above a sea of clouds at sunset (Cycles, volumetric clouds from sky.py).

usage: Blender -b -P blender/hero.py -- <og|title> [spp=96] [scale=1.0]
og    -> build/og.png    1200x630  (link preview)
title -> build/title.png 1170x2532 (title screen while loading)
"""
import sys, os, math
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
a = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
SHOT = a[0] if a else "og"
SPP = int(a[1]) if len(a) > 1 else 96
SCALE = float(a[2]) if len(a) > 2 else 1.0

# build sky + clouds + ocean + sun with the panorama script, without rendering it
sys.argv = [sys.argv[0], "--", "hero", "256", str(SPP), "--norender"]
G = {"__file__": os.path.join(HERE, "sky.py"), "__name__": "sky_exec"}
exec(compile(open(os.path.join(HERE, "sky.py")).read(), os.path.join(HERE, "sky.py"), "exec"), G)
from lib import *
import aircraft as ac

scene = bpy.context.scene
W, H = (1200, 630) if SHOT == "og" else (1170, 2532)
W, H = int(W * SCALE), int(H * SCALE)
setup_cycles(scene, W, H, spp=SPP, denoise=True)
c = scene.cycles
c.volume_max_steps = 512
c.volume_step_rate = 2.0
c.volume_bounces = 2
c.max_bounces = 8
c.sample_clamp_indirect = 8
scene.render.film_transparent = False


def plane(kind, loc, pitch, roll, yaw, contrails=True):
    cfg = ac.KINDS[kind]
    paint = ac.paint_mat(f"paint_{kind}", cfg["scheme"]())
    M = ac.std_mats(paint, glass_gold=cfg["gold"])
    g = Geo()
    cfg["fn"](g, M)
    ob = make_object(g, kind)
    ob.rotation_mode = "XYZ"
    ob.rotation_euler = (math.radians(pitch), math.radians(roll), math.radians(yaw))
    ob.location = loc
    marks = dict(g.empties)
    # afterburner glow + wingtip vortices
    fm = bpy.data.materials.new(f"burn_{kind}")
    fm.use_nodes = True
    nt = fm.node_tree; nt.nodes.clear()
    em = nt.nodes.new("ShaderNodeEmission"); em.inputs["Color"].default_value = (1.0, 0.45, 0.2, 1); em.inputs["Strength"].default_value = 25
    out = nt.nodes.new("ShaderNodeOutputMaterial"); nt.links.new(em.outputs[0], out.inputs["Surface"])
    vm = bpy.data.materials.new(f"vapor_{kind}")
    vm.use_nodes = True
    vt = vm.node_tree; vt.nodes.clear()
    tr = vt.nodes.new("ShaderNodeBsdfTranslucent"); tr.inputs["Color"].default_value = (1, 1, 1, 1)
    tp = vt.nodes.new("ShaderNodeBsdfTransparent")
    mx = vt.nodes.new("ShaderNodeMixShader"); mx.inputs[0].default_value = 0.18
    vo = vt.nodes.new("ShaderNodeOutputMaterial")
    vt.links.new(tp.outputs[0], mx.inputs[1]); vt.links.new(tr.outputs[0], mx.inputs[2]); vt.links.new(mx.outputs[0], vo.inputs["Surface"])
    for name, p in marks.items():
        if name.startswith("nozzle"):
            bpy.ops.mesh.primitive_cone_add(radius1=0.42, radius2=0.05, depth=4.5, location=(p[0], p[1] + 2.3, p[2]), rotation=(math.radians(90), 0, 0))
            cn = bpy.context.active_object
            cn.data.materials.append(fm)
            cn.parent = ob
        if name.startswith("tip") and contrails:
            bpy.ops.mesh.primitive_cone_add(radius1=0.04, radius2=0.9, depth=45, location=(p[0], p[1] + 22.5, p[2]), rotation=(math.radians(-90), 0, 0))
            cv = bpy.context.active_object
            cv.data.materials.append(vm)
            cv.parent = ob
    return ob


# nose = -Y in model space; yaw 180 -> flying towards +Y
f22 = plane("f22", (0, 0, 3200), 6, -28, 180)
f15 = plane("f15", (-30, -52, 3201), 4, -18, 182)

cd = bpy.data.cameras.new("hero")
cam = bpy.data.objects.new("hero", cd)
scene.collection.objects.link(cam)
scene.camera = cam
cd.clip_start = 0.5
cd.clip_end = 200000
if SHOT == "og":
    cd.lens = 38
    cam.location = (19, 27, 3194.5)
    look_at(cam, (-7, -9, 3199.5))
else:
    cd.lens = 30
    cam.location = (22, -46, 3206)
    look_at(cam, (-2, 30, 3196))
cd.dof.use_dof = True
cd.dof.focus_object = f22
cd.dof.aperture_fstop = 11

vts = view_transforms(scene)
scene.view_settings.view_transform = "AgX" if "AgX" in vts else "Filmic" if "Filmic" in vts else "Standard"
try:
    scene.view_settings.look = "AgX - Medium High Contrast"
except TypeError:
    pass
scene.view_settings.exposure = -0.35
print('LOOKS', [l.identifier for l in scene.view_settings.bl_rna.properties['look'].enum_items][:12])
out = os.path.join(BUILD, f"{SHOT}.png")
render_png(scene, out, transform=scene.view_settings.view_transform)
print("hero ->", out, flush=True)
