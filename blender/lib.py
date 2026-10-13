"""Shared helpers for the ACED COMBAT Blender pipeline (Blender 5.x, Cycles/Metal).

Everything is driven from the command line:
    Blender -b -P blender/<script>.py -- [args]

Same idea as the CYBERTAXI pipeline: every material keeps its PBR channels as node sockets
(albedo / roughness / metal / emission / normal) and a bake pass simply re-links the material
output to an Emission shader reading one channel -> clean, noise-free data maps out of Cycles.
"""
import bpy, bmesh, math, os, sys, random
import numpy as np
from mathutils import Vector, Matrix

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(ROOT, "build")
ASSETS = os.path.join(ROOT, "assets")
os.makedirs(BUILD, exist_ok=True)

EMIT_MAX = 8.0   # emissive maps store strength / EMIT_MAX


def args():
    a = sys.argv
    return a[a.index("--") + 1:] if "--" in a else []


def srgb(r, g=None, b=None):
    """sRGB (0..1 floats or 0xRRGGBB int / tuple) -> linear tuple."""
    if g is None:
        if isinstance(r, int):
            r, g, b = ((r >> 16) & 255) / 255, ((r >> 8) & 255) / 255, (r & 255) / 255
        else:
            r, g, b = r
    f = lambda c: c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    return (f(r), f(g), f(b))


# --------------------------------------------------------------------------------------
# scene / cycles setup
# --------------------------------------------------------------------------------------
def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    ALL_MATS.clear()
    return bpy.context.scene


def setup_cycles(scene, w, h, spp=32, denoise=False, gpu=True):
    scene.render.engine = "CYCLES"
    c = scene.cycles
    if gpu:
        prefs = bpy.context.preferences.addons["cycles"].preferences
        prefs.compute_device_type = "METAL"
        prefs.refresh_devices()
        for d in prefs.devices:
            d.use = d.type == "METAL"
        c.device = "GPU"
    c.samples = spp
    c.use_adaptive_sampling = False
    c.use_denoising = denoise
    if denoise:
        c.denoiser = "OPENIMAGEDENOISE"
    scene.render.resolution_x = w
    scene.render.resolution_y = h
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = False
    scene.view_settings.view_transform = "Standard"
    scene.view_settings.look = "None"
    scene.view_settings.exposure = 0
    scene.view_settings.gamma = 1
    scene.display_settings.display_device = "sRGB"


def view_transforms(scene):
    out = []
    for t in ("AgX", "Filmic", "Standard"):
        try:
            scene.view_settings.view_transform = t
            out.append(t)
        except TypeError:
            pass
    scene.view_settings.view_transform = "Standard"
    return out


def render_png(scene, path, transform="Standard", depth="8", mode="RGB"):
    scene.view_settings.view_transform = transform
    s = scene.render.image_settings
    s.file_format = "PNG"
    s.color_mode = mode
    s.color_depth = depth
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    return path


def render_exr(scene, path):
    s = scene.render.image_settings
    s.file_format = "OPEN_EXR"
    s.color_mode = "RGBA"
    s.color_depth = "16"
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    return path


def pnoise(n, beta=2.0, seed=0, ky=1.0, kx=1.0):
    """Periodic fractal noise in [0,1] (FFT). beta = spectral slope."""
    rng = np.random.default_rng(seed)
    fy = np.fft.fftfreq(n)[:, None] * n * ky
    fx = np.fft.fftfreq(n)[None, :] * n * kx
    f = np.sqrt(fx * fx + fy * fy)
    f[0, 0] = 1
    spec = (rng.normal(size=(n, n)) + 1j * rng.normal(size=(n, n))) / (f ** (beta / 2))
    spec[0, 0] = 0
    a = np.fft.ifft2(spec).real
    lo, hi = np.percentile(a, [1, 99])
    return np.clip((a - lo) / (hi - lo), 0, 1).astype(np.float32)


# --------------------------------------------------------------------------------------
# node helper
# --------------------------------------------------------------------------------------
class NT:
    """Terse node-tree builder. Values may be sockets or plain numbers/tuples."""

    def __init__(self, nt):
        self.nt = nt
        self.N = nt.nodes.new
        self.L = nt.links.new

    def _in(self, sock, v):
        if v is None:
            return
        if isinstance(v, bpy.types.NodeSocket):
            self.L(v, sock)
        else:
            if isinstance(v, (tuple, list)) and len(v) == 3 and sock.type == "RGBA":
                v = (*v, 1.0)
            sock.default_value = v

    def math(self, op, a, b=None, c=None, clamp=False):
        m = self.N("ShaderNodeMath"); m.operation = op; m.use_clamp = clamp
        for i, v in enumerate((a, b, c)):
            self._in(m.inputs[i], v)
        return m.outputs[0]

    def add(self, a, b): return self.math("ADD", a, b)
    def sub(self, a, b): return self.math("SUBTRACT", a, b)
    def mul(self, a, b): return self.math("MULTIPLY", a, b)
    def madd(self, a, b, c): return self.math("MULTIPLY_ADD", a, b, c)
    def clamp01(self, a): return self.math("ADD", a, 0.0, clamp=True)
    def smooth(self, e0, e1, x):
        m = self.N("ShaderNodeMapRange"); m.interpolation_type = "SMOOTHSTEP"
        self._in(m.inputs["Value"], x); m.inputs["From Min"].default_value = e0; m.inputs["From Max"].default_value = e1
        return m.outputs["Result"]

    def vmath(self, op, a, b=None, scale=None):
        m = self.N("ShaderNodeVectorMath"); m.operation = op
        self._in(m.inputs[0], a)
        if b is not None:
            self._in(m.inputs[1], b)
        if scale is not None:
            self._in(m.inputs["Scale"], scale)
        return m.outputs["Value"] if op in ("DOT_PRODUCT", "LENGTH", "DISTANCE") else m.outputs["Vector"]

    def sep(self, v):
        s = self.N("ShaderNodeSeparateXYZ"); self._in(s.inputs[0], v)
        return s.outputs["X"], s.outputs["Y"], s.outputs["Z"]

    def comb(self, x, y, z):
        c = self.N("ShaderNodeCombineXYZ")
        self._in(c.inputs["X"], x); self._in(c.inputs["Y"], y); self._in(c.inputs["Z"], z)
        return c.outputs[0]

    def rgb(self, col):
        n = self.N("ShaderNodeRGB"); n.outputs[0].default_value = (*col, 1.0)
        return n.outputs[0]

    def mix(self, fac, a, b, blend="MIX"):
        m = self.N("ShaderNodeMix"); m.data_type = "RGBA"; m.blend_type = blend
        self._in(m.inputs["Factor"], fac); self._in(m.inputs["A"], a); self._in(m.inputs["B"], b)
        return m.outputs["Result"]

    def mixf(self, fac, a, b):
        m = self.N("ShaderNodeMix"); m.data_type = "FLOAT"
        self._in(m.inputs["Factor"], fac); self._in(m.inputs["A"], a); self._in(m.inputs["B"], b)
        return m.outputs["Result"]

    def noise(self, vec, scale, detail=4.0, rough=0.55, dim="3D"):
        n = self.N("ShaderNodeTexNoise"); n.noise_dimensions = dim
        self._in(n.inputs["Vector"], vec)
        n.inputs["Scale"].default_value = scale; n.inputs["Detail"].default_value = detail; n.inputs["Roughness"].default_value = rough
        return n.outputs["Fac"]

    def voronoi(self, vec, scale, feature="F1", out="Distance", rand=1.0):
        n = self.N("ShaderNodeTexVoronoi"); n.voronoi_dimensions = "3D"; n.feature = feature
        self._in(n.inputs["Vector"], vec)
        n.inputs["Scale"].default_value = scale
        n.inputs["Randomness"].default_value = rand
        return n.outputs[out]

    def img(self, image, vec, interp="Linear", ext="CLIP"):
        t = self.N("ShaderNodeTexImage"); t.image = image; t.interpolation = interp; t.extension = ext
        self._in(t.inputs["Vector"], vec)
        return t.outputs["Color"], t.outputs["Alpha"]


# --------------------------------------------------------------------------------------
# channel material: PBR principled + flat channel views for baking
# --------------------------------------------------------------------------------------
ALL_MATS = []


class ChanMat:
    """Build with: m = ChanMat(name); then set m.color / m.rough / m.metal / m.emit (sockets or values),
    m.height (bump height socket, optional) and call m.finish()."""

    def __init__(self, name):
        self.name = name
        mat = bpy.data.materials.new(name)
        mat.use_nodes = True
        self.mat = mat
        nt = mat.node_tree
        nt.nodes.clear()
        self.t = NT(nt)
        self.nt = nt
        self.color = (0.5, 0.5, 0.5)
        self.rough = 0.5
        self.metal = 0.0
        self.emit = None
        self.height = None
        self.bump_strength = 0.3
        self.bump_dist = 0.004
        self.alpha = None
        self.transmission = 0.0
        ALL_MATS.append(self)

    def finish(self):
        t = self.t
        out = t.N("ShaderNodeOutputMaterial")
        bsdf = t.N("ShaderNodeBsdfPrincipled")
        self.out, self.bsdf = out, bsdf
        col = self.color if isinstance(self.color, bpy.types.NodeSocket) else t.rgb(self.color)
        rough = self.rough if isinstance(self.rough, bpy.types.NodeSocket) else t.add(self.rough, 0.0)
        metal = self.metal if isinstance(self.metal, bpy.types.NodeSocket) else t.add(self.metal, 0.0)
        bev = t.N("ShaderNodeBevel"); bev.samples = 6; bev.inputs["Radius"].default_value = 0.012
        nrm = bev.outputs["Normal"]
        if self.height is not None:
            bump = t.N("ShaderNodeBump")
            bump.inputs["Strength"].default_value = self.bump_strength
            bump.inputs["Distance"].default_value = self.bump_dist
            t.L(nrm, bump.inputs["Normal"])
            t._in(bump.inputs["Height"], self.height)
            nrm = bump.outputs["Normal"]
        t.L(col, bsdf.inputs["Base Color"])
        t.L(rough, bsdf.inputs["Roughness"])
        t.L(metal, bsdf.inputs["Metallic"])
        t.L(nrm, bsdf.inputs["Normal"])
        if self.transmission:
            bsdf.inputs["Transmission Weight"].default_value = self.transmission
        emit = None
        if self.emit is not None:
            emit = self.emit if isinstance(self.emit, bpy.types.NodeSocket) else t.rgb(self.emit)
            t.L(emit, bsdf.inputs["Emission Color"])
            bsdf.inputs["Emission Strength"].default_value = 1.0
        t.L(bsdf.outputs["BSDF"], out.inputs["Surface"])
        self.flat = t.N("ShaderNodeEmission")
        self.ch = {
            "albedo": col,
            "rough": t.comb(rough, rough, rough),
            "meta": t.comb(metal, metal, metal),
            "emit": t.mix(1.0, emit, t.rgb((1 / EMIT_MAX,) * 3), "MULTIPLY") if emit is not None else t.rgb((0, 0, 0)),
        }
        self.normal = nrm
        return self

    def set_mode(self, mode):
        t = self.t
        for l in list(self.out.inputs["Surface"].links):
            self.nt.links.remove(l)
        if mode == "beauty":
            t.L(self.bsdf.outputs["BSDF"], self.out.inputs["Surface"])
            return
        for l in list(self.flat.inputs["Color"].links):
            self.nt.links.remove(l)
        t.L(self.ch[mode], self.flat.inputs["Color"])
        t.L(self.flat.outputs["Emission"], self.out.inputs["Surface"])


def set_all_modes(mode):
    for m in ALL_MATS:
        m.set_mode(mode)


def simple_mat(name, color, rough=0.5, metal=0.0, emit=None):
    m = ChanMat(name)
    m.color = srgb(color) if color is not None else (0, 0, 0)
    m.rough, m.metal = rough, metal
    if emit is not None:
        m.emit = emit
    return m.finish()


# --------------------------------------------------------------------------------------
# geometry collector: one bmesh per material
# --------------------------------------------------------------------------------------
def sup(n, t):
    return math.copysign(abs(t) ** (2.0 / n), t)


class Geo:
    def __init__(self):
        self.bms = {}
        self.empties = []

    def bm(self, mat):
        if mat not in self.bms:
            self.bms[mat] = bmesh.new()
        return self.bms[mat]

    def empty(self, name, loc):
        self.empties.append((name, tuple(loc)))

    def rings_to_faces(self, mat, rings, cap0=True, cap1=True, closed=True, smooth=True):
        bm = self.bm(mat)
        vr = [[bm.verts.new(p) for p in ring] for ring in rings]
        seg = len(rings[0])
        faces = []
        for i in range(len(vr) - 1):
            rng_ = range(seg) if closed else range(seg - 1)
            for k in rng_:
                a, b = vr[i][k], vr[i][(k + 1) % seg]
                c, d = vr[i + 1][(k + 1) % seg], vr[i + 1][k]
                try:
                    faces.append(bm.faces.new((a, b, c, d)))
                except ValueError:
                    pass
        if cap0 and closed:
            faces.append(bm.faces.new(vr[0][::-1]))
        if cap1 and closed:
            faces.append(bm.faces.new(vr[-1]))
        for f in faces:
            f.smooth = smooth
        return faces

    def box(self, mat, c, s, rot=(0, 0, 0), bevel=0.0):
        bm = self.bm(mat)
        M = (Matrix.Translation(c) @ Matrix.Rotation(rot[2], 4, "Z") @ Matrix.Rotation(rot[1], 4, "Y")
             @ Matrix.Rotation(rot[0], 4, "X") @ Matrix.Diagonal((*s, 1.0)))
        res = bmesh.ops.create_cube(bm, size=1.0, matrix=M)
        b = min(bevel, min(s) * 0.45)
        if b > 0.002:
            edges = list({e for v in res["verts"] for e in v.link_edges})
            bmesh.ops.bevel(bm, geom=edges, offset=b, segments=2, affect="EDGES")

    def cyl(self, mat, c, r, depth, axis="y", seg=20, r2=None, cap=True, smooth=True, rot=None):
        bm = self.bm(mat)
        M = Matrix.Translation(c)
        if rot is not None:
            M = M @ rot
        if axis == "y":
            M = M @ Matrix.Rotation(math.radians(-90), 4, "X")
        elif axis == "x":
            M = M @ Matrix.Rotation(math.radians(90), 4, "Y")
        res = bmesh.ops.create_cone(bm, cap_ends=cap, cap_tris=False, segments=seg, radius1=r, radius2=r if r2 is None else r2,
                                    depth=depth, matrix=M)
        for f in {f for v in res["verts"] for f in v.link_faces}:
            f.smooth = smooth
        return res

    def sphere(self, mat, c, r, seg=16, rings=10, scale=(1, 1, 1)):
        bm = self.bm(mat)
        M = Matrix.Translation(c) @ Matrix.Diagonal((*scale, 1.0))
        res = bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, radius=r, matrix=M)
        for f in {f for v in res["verts"] for f in v.link_faces}:
            f.smooth = True


def make_object(g, name, split_names=None):
    """Join all bmeshes into one object with material slots. split_names: {mat: objname} -> faces of those
    materials are separated into their own objects *after* unwrap/bake (see separate_by_material)."""
    bm_all = bmesh.new()
    me = bpy.data.meshes.new(name)
    mats = list(g.bms.keys())
    for i, m in enumerate(mats):
        bm = g.bms[m]
        tmp = bpy.data.meshes.new("tmp")
        bm.to_mesh(tmp)
        bm.free()
        n_prev = len(bm_all.faces)
        bm_all.from_mesh(tmp)
        bm_all.faces.ensure_lookup_table()
        for f in list(bm_all.faces)[n_prev:]:
            f.material_index = i
        bpy.data.meshes.remove(tmp)
    bmesh.ops.remove_doubles(bm_all, verts=bm_all.verts, dist=1e-5)
    bmesh.ops.recalc_face_normals(bm_all, faces=bm_all.faces)
    bm_all.to_mesh(me)
    bm_all.free()
    for m in mats:
        me.materials.append(m.mat)
    ob = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(ob)
    return ob


def make_empties(g):
    out = []
    for nm, loc in g.empties:
        e = bpy.data.objects.new(nm, None)
        e.empty_display_type = "PLAIN_AXES"
        e.location = loc
        bpy.context.scene.collection.objects.link(e)
        out.append(e)
    return out


def select_only(ob):
    bpy.ops.object.select_all(action="DESELECT")
    ob.select_set(True)
    bpy.context.view_layer.objects.active = ob


def unwrap(ob, margin=0.003, angle=60):
    select_only(ob)
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.uv.smart_project(angle_limit=math.radians(angle), island_margin=margin, area_weight=0.7, scale_to_bounds=False)
    bpy.ops.object.mode_set(mode="OBJECT")


def bake_channels(ob, name, res, margin, outdir, samples_ao=128, chans=("albedo", "rough", "meta", "emit", "ao", "normal")):
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 16
    scene.cycles.use_denoising = False
    bk = scene.render.bake
    bk.margin = margin
    bk.margin_type = "EXTEND"
    bk.use_clear = True
    mats = [m for m in ob.data.materials]
    nodes = []
    for mat in mats:
        nt = mat.node_tree
        n = nt.nodes.new("ShaderNodeTexImage")
        nt.nodes.active = n
        n.select = True
        nodes.append(n)

    def run(ch, bake_type, mode, srgb_space, **kw):
        img = bpy.data.images.new(f"{name}_{ch}", res, res, alpha=False, float_buffer=False)
        img.colorspace_settings.name = "sRGB" if srgb_space else "Non-Color"
        for n in nodes:
            n.image = img
        set_all_modes(mode)
        select_only(ob)
        bpy.ops.object.bake(type=bake_type, margin=margin, margin_type="EXTEND", use_clear=True, **kw)
        path = os.path.join(outdir, f"{name}_{ch}.png")
        img.filepath_raw = path
        img.file_format = "PNG"
        img.save()
        print("[bake]", ch, path, flush=True)

    for ch in chans:
        if ch in ("albedo", "emit"):
            run(ch, "EMIT", ch, True)
        elif ch in ("rough", "meta"):
            run(ch, "EMIT", ch, False)
        elif ch == "ao":
            scene.cycles.samples = samples_ao
            run("ao", "AO", "beauty", False)
            scene.cycles.samples = 16
        elif ch == "normal":
            scene.cycles.samples = 24
            run("normal", "NORMAL", "beauty", False, normal_space="TANGENT")
            scene.cycles.samples = 16
    for mat, n in zip(mats, nodes):
        mat.node_tree.nodes.remove(n)
    set_all_modes("beauty")


def export_glb(objs, path):
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.export_scene.gltf(filepath=path, export_format="GLB", use_selection=True, export_apply=True, export_yup=True,
                              export_materials="NONE", export_texcoords=True, export_normals=True, export_cameras=False,
                              export_lights=False)
    print("[glb]", path, os.path.getsize(path), flush=True)


def look_at(ob, target, up="Y"):
    d = Vector(target) - ob.location
    ob.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()


def add_sun(scene, direction_elev_deg, azim_deg, strength=4.0, angle_deg=0.6, color=(1, 1, 1), name="sun"):
    ld = bpy.data.lights.new(name, "SUN")
    ld.energy = strength
    ld.angle = math.radians(angle_deg)
    ld.color = color
    lo = bpy.data.objects.new(name, ld)
    scene.collection.objects.link(lo)
    el, az = math.radians(direction_elev_deg), math.radians(azim_deg)
    d = Vector((math.cos(el) * math.sin(az), math.cos(el) * math.cos(az), math.sin(el)))   # towards the sun
    lo.rotation_euler = (-d).to_track_quat("-Z", "Y").to_euler()
    return lo


def sky_node_types():
    w = bpy.data.worlds.new("_probe")
    w.use_nodes = True
    n = w.node_tree.nodes.new("ShaderNodeTexSky")
    items = [i.identifier for i in n.bl_rna.properties["sky_type"].enum_items]
    bpy.data.worlds.remove(w)
    return items
