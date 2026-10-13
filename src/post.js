// HDR render target (with depth texture) -> volumetric cloud pass -> transparent FX -> dual-filter bloom ->
// filmic composite (ACES, grade, sun lens flare, CA, grain, vignette, damage / speed effects).
import * as THREE from 'three';

const VERT = /* glsl */`
varying vec2 vUv;
void main(){ vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

function triangle() {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
  return g;
}

export class FullPass {
  constructor(material) {
    this.material = material;
    this.mesh = new THREE.Mesh(FullPass.geo || (FullPass.geo = triangle()), material);
    this.mesh.frustumCulled = false;
    this.scene = new THREE.Scene();
    this.scene.add(this.mesh);
    this.cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  }
  render(renderer, target) {
    renderer.setRenderTarget(target);
    renderer.render(this.scene, this.cam);
  }
}

export const fullMat = (frag, uniforms, extra = {}) => new THREE.ShaderMaterial({
  vertexShader: VERT, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false, toneMapped: false, ...extra,
});

const DOWN = /* glsl */`
precision highp float;
uniform sampler2D tSrc; uniform vec2 texel; uniform float karis; uniform float thresh;
varying vec2 vUv;
vec3 tap(vec2 o){ return texture2D(tSrc, vUv + o * texel).rgb; }
float luma(vec3 c){ return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
vec3 kar(vec3 c){ return c / (1.0 + luma(c)); }
void main(){
  vec3 a = tap(vec2(-2.,2.)), b = tap(vec2(0.,2.)), c = tap(vec2(2.,2.));
  vec3 d = tap(vec2(-2.,0.)), e = tap(vec2(0.,0.)), f = tap(vec2(2.,0.));
  vec3 g = tap(vec2(-2.,-2.)), h = tap(vec2(0.,-2.)), i = tap(vec2(2.,-2.));
  vec3 j = tap(vec2(-1.,1.)), k = tap(vec2(1.,1.)), l = tap(vec2(-1.,-1.)), m = tap(vec2(1.,-1.));
  vec3 col;
  if (karis > 0.5) {
    vec3 g0 = (kar(a)+kar(b)+kar(d)+kar(e)) * 0.25;
    vec3 g1 = (kar(b)+kar(c)+kar(e)+kar(f)) * 0.25;
    vec3 g2 = (kar(d)+kar(e)+kar(g)+kar(h)) * 0.25;
    vec3 g3 = (kar(e)+kar(f)+kar(h)+kar(i)) * 0.25;
    vec3 g4 = (kar(j)+kar(k)+kar(l)+kar(m)) * 0.25;
    col = g0*0.125 + g1*0.125 + g2*0.125 + g3*0.125 + g4*0.5;
    float lm = luma(col);
    col *= smoothstep(thresh * 0.4, thresh, lm / max(1.0 - lm, 0.05));
    col = col / max(1.0 - luma(col), 0.05);
  } else {
    col = e * 0.125 + (a + c + g + i) * 0.03125 + (b + d + f + h) * 0.0625 + (j + k + l + m) * 0.125;
  }
  gl_FragColor = vec4(min(col, vec3(4000.0)), 1.0);
}`;

const UP = /* glsl */`
precision highp float;
uniform sampler2D tSrc; uniform vec2 texel; uniform float radius;
varying vec2 vUv;
void main(){
  vec2 t = texel * radius;
  vec3 c = texture2D(tSrc, vUv).rgb * 4.0;
  c += texture2D(tSrc, vUv + vec2(-t.x, 0.)).rgb * 2.0;
  c += texture2D(tSrc, vUv + vec2( t.x, 0.)).rgb * 2.0;
  c += texture2D(tSrc, vUv + vec2(0., -t.y)).rgb * 2.0;
  c += texture2D(tSrc, vUv + vec2(0.,  t.y)).rgb * 2.0;
  c += texture2D(tSrc, vUv + vec2(-t.x, -t.y)).rgb;
  c += texture2D(tSrc, vUv + vec2( t.x, -t.y)).rgb;
  c += texture2D(tSrc, vUv + vec2(-t.x,  t.y)).rgb;
  c += texture2D(tSrc, vUv + vec2( t.x,  t.y)).rgb;
  gl_FragColor = vec4(c / 16.0, 1.0);
}`;

const COMPOSITE = /* glsl */`
precision highp float;
uniform sampler2D tScene; uniform sampler2D tBloom; uniform sampler2D tDepth; uniform sampler2D tCloud;
uniform float bloomGain; uniform float exposure; uniform float time;
uniform float ca; uniform float vig; uniform float grain; uniform float speed; uniform float flash; uniform float dmg;
uniform vec2 res; uniform float aspect;
uniform vec3 sunUV;          // xy = screen uv of the sun, z = 1 if in front of the camera
uniform vec3 sunCol; uniform float flare;
uniform vec3 lift; uniform vec3 gain; uniform float sat; uniform float white;
uniform float inCloud; uniform float fade;
varying vec2 vUv;

vec3 aces(vec3 x){
  const mat3 inM = mat3(0.59719, 0.07600, 0.02840, 0.35458, 0.90834, 0.13383, 0.04823, 0.01566, 0.83777);
  const mat3 outM = mat3(1.60475, -0.10208, -0.00327, -0.53108, 1.10813, -0.07276, -0.07367, -0.00605, 1.07602);
  vec3 v = inM * x;
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return clamp(outM * (a / b), 0.0, 1.0);
}
float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }

// sun visibility: sample depth (far plane = sky) and cloud transmittance around the sun position
float sunVis() {
  if (sunUV.z < 0.5) return 0.0;
  float v = 0.0;
  for (int i = 0; i < 5; i++) {
    vec2 o = vec2(float(i - 2) * 0.006, float((i * 3) % 5 - 2) * 0.006 * aspect);
    vec2 uv = sunUV.xy + o;
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) continue;
    float d = texture2D(tDepth, uv).r;
    float T = texture2D(tCloud, uv).a;
    v += (d > 0.99999 ? 1.0 : 0.0) * T;
  }
  return v / 5.0;
}

vec3 lensFlare(vec2 uv, float vis) {
  vec2 c = vec2(0.5);
  vec2 s = sunUV.xy;
  vec2 dv = c - s;
  vec3 col = vec3(0.0);
  vec2 asp = vec2(1.0, 1.0 / aspect);
  // ghosts along the sun -> centre axis
  for (int i = 0; i < 6; i++) {
    float k = float(i);
    float t = 0.35 + k * 0.32 - (k > 2.5 ? 0.25 : 0.0);
    vec2 gp = s + dv * t * 2.0;
    float r = 0.012 + mod(k * 0.037, 0.07);
    float d = length((uv - gp) / asp);
    float ring = smoothstep(r, r * 0.85, d) * (0.35 + 0.65 * smoothstep(r * 0.4, r, d));
    vec3 tint = vec3(0.6 + 0.4 * sin(k * 1.7), 0.6 + 0.4 * sin(k * 1.7 + 2.1), 0.6 + 0.4 * sin(k * 1.7 + 4.2));
    col += tint * ring * 0.06;
  }
  // halo ring around the centre
  float dh = length((uv - (s + dv * 2.0 * 0.85)) / asp);
  col += vec3(0.4, 0.6, 1.0) * smoothstep(0.03, 0.0, abs(dh - 0.22)) * 0.035;
  // anamorphic streak + starburst at the sun
  vec2 ds = (uv - s) / asp;
  float streak = exp(-abs(ds.y) * 260.0) * exp(-abs(ds.x) * 3.0);
  float ang = atan(ds.y, ds.x);
  float star = pow(abs(cos(ang * 4.0 + 0.3)), 30.0) * exp(-length(ds) * 9.0);
  col += sunCol * (streak * 0.18 + star * 0.35);
  return col * vis * flare;
}

void main(){
  vec2 uv = vUv;
  vec2 d = uv - 0.5;
  float r2 = dot(d, d);
  vec2 dir = d * (0.010 * speed);
  float caAmt = ca * (0.6 + r2 * 3.0) + speed * 0.0012 + dmg * 0.004;
  vec3 acc = vec3(0.0);
  for (int i = 0; i < 3; i++) {
    float k = float(i) / 2.0;
    vec2 o = -dir * k;
    acc.r += texture2D(tScene, uv + o + d * caAmt).r;
    acc.g += texture2D(tScene, uv + o).g;
    acc.b += texture2D(tScene, uv + o - d * caAmt).b;
  }
  vec3 col = acc / 3.0;
  col += texture2D(tBloom, uv).rgb * bloomGain;
  float vis = sunVis();
  col += lensFlare(uv, vis);
  col *= exposure;
  col += flash * vec3(1.0, 0.85, 0.7);
  // grade
  float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(l), col, sat);
  col = col * gain + lift * (1.0 - smoothstep(0.0, 0.4, l));
  col = aces(col * white);
  col = pow(col, vec3(1.0 / 2.2));
  // damage: red edge pulse + desaturate
  float edge = smoothstep(0.08, 0.5, r2 * 2.2);
  col = mix(col, vec3(dot(col, vec3(0.33))), dmg * 0.35);
  col += vec3(0.55, 0.0, 0.0) * edge * dmg * (0.6 + 0.4 * sin(time * 9.0));
  // in-cloud veil + vignette
  col = mix(col, vec3(0.85, 0.88, 0.92), inCloud * 0.08 * edge);
  col *= 1.0 - vig * smoothstep(0.2, 0.9, r2 * 2.0);
  float g = hash(uv * res + fract(time * 7.0)) - 0.5;
  col += g * (grain + 1.0 / 255.0);
  col *= fade;
  gl_FragColor = vec4(col, 1.0);
}`;

const CLOUD_COMP = /* glsl */`
precision highp float;
uniform sampler2D tCloud; uniform vec2 texel; varying vec2 vUv;
void main(){
  // 4 bilinear taps = soft 4x4 tent: hides the low-res raymarch dither
  vec2 o = texel * 1.0;
  vec4 c = texture2D(tCloud, vUv + vec2(-o.x, -o.y)) + texture2D(tCloud, vUv + vec2(o.x, -o.y))
         + texture2D(tCloud, vUv + vec2(-o.x, o.y)) + texture2D(tCloud, vUv + vec2(o.x, o.y));
  gl_FragColor = c * 0.25;
}`;

export class Post {
  constructor(renderer, opts) {
    this.renderer = renderer;
    this.opts = opts;
    this.w = 4; this.h = 4;
    this.levels = [];
    this.u = {
      bloomGain: { value: 0.32 }, exposure: { value: 1.0 }, time: { value: 0 }, ca: { value: 0.0018 },
      vig: { value: 0.45 }, grain: { value: 0.018 }, speed: { value: 0 }, flash: { value: 0 }, dmg: { value: 0 },
      res: { value: new THREE.Vector2(1, 1) }, aspect: { value: 1 },
      sunUV: { value: new THREE.Vector3(0, 0, 0) }, sunCol: { value: new THREE.Color(1, 0.9, 0.7) }, flare: { value: 1.0 },
      lift: { value: new THREE.Vector3(0.0, 0.004, 0.012) }, gain: { value: new THREE.Vector3(1, 1, 1) }, sat: { value: 1.08 },
      white: { value: 1.0 }, inCloud: { value: 0 }, fade: { value: 1 },
      tDepth: { value: null }, tCloud: { value: null },
    };
    this.down = new FullPass(fullMat(DOWN, { tSrc: { value: null }, texel: { value: new THREE.Vector2() }, karis: { value: 0 }, thresh: { value: 2.6 } }));
    this.up = new FullPass(fullMat(UP, { tSrc: { value: null }, texel: { value: new THREE.Vector2() }, radius: { value: 1.0 } },
      { blending: THREE.AdditiveBlending, transparent: true }));
    this.comp = new FullPass(fullMat(COMPOSITE, { tScene: { value: null }, tBloom: { value: null }, ...this.u }));
    // premultiplied cloud composite: dst = cloud.rgb + dst * cloud.a
    // near geometry (the player's jet) sits in front of the clouds: the composite quad is drawn at the depth of a
    // plane 350 m in front of the camera with depth test, so it never covers anything nearer -> crisp jet edges
    const CVERT = `uniform float zNdc; varying vec2 vUv; void main(){ vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, zNdc, 1.0); }`;
    this.cloudComp = new FullPass(new THREE.ShaderMaterial({ vertexShader: CVERT, fragmentShader: CLOUD_COMP,
      uniforms: { tCloud: { value: null }, zNdc: { value: 0.99 }, texel: { value: new THREE.Vector2() } },
      depthTest: true, depthWrite: false, depthFunc: THREE.LessEqualDepth, toneMapped: false,
      transparent: true, blending: THREE.CustomBlending, blendEquation: THREE.AddEquation,
      blendSrc: THREE.OneFactor, blendDst: THREE.SrcAlphaFactor,
    }));
    this.hdr = null;
    this.whiteTex = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
    this.whiteTex.needsUpdate = true;
  }

  rtOpts(extra = {}) {
    return { type: THREE.HalfFloatType, format: THREE.RGBAFormat, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
      depthBuffer: false, generateMipmaps: false, colorSpace: THREE.LinearSRGBColorSpace, ...extra };
  }

  resize(w, h) {
    this.w = w; this.h = h;
    this.u.res.value.set(w, h);
    this.u.aspect.value = w / h;
    this.hdr?.dispose();
    const dt = new THREE.DepthTexture(w, h);
    dt.type = THREE.UnsignedIntType;
    this.hdr = new THREE.WebGLRenderTarget(w, h, this.rtOpts({ depthBuffer: true, samples: this.opts.msaa, depthTexture: dt }));
    this.levels.forEach((l) => l.dispose());
    this.levels = [];
    let lw = Math.max(2, w >> 1), lh = Math.max(2, h >> 1);
    for (let i = 0; i < this.opts.bloomLevels; i++) {
      this.levels.push(new THREE.WebGLRenderTarget(lw, lh, this.rtOpts()));
      lw = Math.max(2, lw >> 1); lh = Math.max(2, lh >> 1);
    }
  }

  /** layers: 0 = opaque world, 1 = transparent effects (drawn after the clouds) */
  render(scene, camera, clouds) {
    const r = this.renderer;
    r.setRenderTarget(this.hdr);
    r.autoClear = true;
    camera.layers.set(0);
    r.render(scene, camera);
    const i0 = { calls: r.info.render.calls, triangles: r.info.render.triangles };
    let cloudTex = this.whiteTex;
    if (clouds && clouds.enabled) {
      clouds.render(r, camera, this.hdr.depthTexture);
      cloudTex = clouds.rt.texture;
      this.cloudComp.material.uniforms.tCloud.value = cloudTex;
      const cu = this.cloudComp.material.uniforms;
      cu.texel.value.set(1 / clouds.rt.width, 1 / clouds.rt.height);
      const n = camera.near, f = camera.far, z = 350;
      cu.zNdc.value = (f + n) / (f - n) - (2 * f * n) / ((f - n) * z);
      r.autoClear = false;
      this.cloudComp.render(r, this.hdr);
    }
    r.setRenderTarget(this.hdr);
    r.autoClear = false;
    camera.layers.set(1);
    r.render(scene, camera);
    camera.layers.set(0);
    r.autoClear = true;
    this.sceneInfo = { calls: r.info.render.calls, triangles: r.info.render.triangles, opaque: i0 };
    // bloom chain
    const dm = this.down.material.uniforms;
    const um = this.up.material.uniforms;
    let src = this.hdr.texture;
    let sw = this.w, sh = this.h;
    for (let i = 0; i < this.levels.length; i++) {
      dm.tSrc.value = src;
      dm.texel.value.set(1 / sw, 1 / sh);
      dm.karis.value = i === 0 ? 1 : 0;
      this.down.render(r, this.levels[i]);
      src = this.levels[i].texture;
      sw = this.levels[i].width; sh = this.levels[i].height;
    }
    r.autoClear = false;
    for (let i = this.levels.length - 1; i > 0; i--) {
      um.tSrc.value = this.levels[i].texture;
      um.texel.value.set(1 / this.levels[i].width, 1 / this.levels[i].height);
      this.up.render(r, this.levels[i - 1]);
    }
    r.autoClear = true;
    const cm = this.comp.material.uniforms;
    cm.tScene.value = this.hdr.texture;
    cm.tBloom.value = this.levels[0].texture;
    cm.tDepth.value = this.hdr.depthTexture;
    cm.tCloud.value = cloudTex;
    this.comp.render(r, null);
  }
}
