// Real-time volumetric cloud layer: low-resolution raymarch through a slab whose cumulus columns come from a
// tileable weather map (column height) eroded by a 64^3 Perlin-Worley volume. Single-scattering sun light with a
// two-tap shadow ray, dual-lobe phase (silver lining), powder term, height ambient, aerial perspective into the
// Blender sky. Output: premultiplied inscatter (rgb) + transmittance (a), composited into the HDR target.
import * as THREE from 'three';
import { FullPass } from './post.js';
import { FOG_GLSL, fogUniforms } from './fog.js';
import { loadImage, clamp } from './util.js';

const VERT = /* glsl */`
varying vec2 vUv;
void main(){ vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const FRAG = /* glsl */`
precision highp float;
precision highp sampler3D;
uniform sampler2D tDepth; uniform sampler2D tWeather; uniform sampler3D tNoise;
uniform mat4 invProj; uniform mat4 camWorld; uniform vec3 camPos;
uniform vec4 layer;     // base, top, tile size, coverage
uniform vec4 shp;       // channel mix (0 = sea, 1 = scattered), density, noise scale, erosion
uniform vec3 wind;      // xz offset (m), time
uniform vec3 sunDir; uniform vec3 sunCol; uniform vec3 ambTop; uniform vec3 ambBot;
uniform float maxDist; uniform float steps; uniform float ext; uniform float pixAng;
float gLodW = 0.0, gLodN = 0.0;
varying vec2 vUv;
${FOG_GLSL}

float colHeight(vec2 xz) {
  vec3 w = textureLod(tWeather, (xz + wind.xy) / layer.z, gLodW).rgb;
  float c = mix(w.r, w.g, shp.x);
  float cov = layer.w * (0.8 + 0.4 * w.b);
  float h = clamp((c - (1.0 - cov)) / max(cov, 0.05), 0.0, 1.0);
  // towers where the large-scale field is high, low flat sheets elsewhere
  // dome-shaped columns (sqrt turns the cone of a distance field into a rounded top)
  return smoothstep(0.02, 0.6, h) * (0.35 + 0.8 * w.b * w.b);
}

float shape(vec3 p) {
  float h = (p.y - layer.x) / (layer.y - layer.x);
  if (h < 0.0 || h > 1.0) return 0.0;
  float ch = colHeight(p.xz);
  return smoothstep(0.0, 0.1, h) * smoothstep(0.0, 0.2, ch - h);
}

float density(vec3 p, float detail, float far) {
  float h = (p.y - layer.x) / (layer.y - layer.x);
  if (h < 0.0 || h > 1.0) return 0.0;
  vec3 q = (p + vec3(wind.x * 0.6, wind.z * 3.0, wind.y * 0.6)) / shp.z;
  vec2 nn = textureLod(tNoise, q * 0.37, gLodN + 0.5).rg;
  // domain-warp the column field so the cloud sides billow instead of forming vertical curtains
  vec2 warp = (nn - 0.5) * shp.z * 0.55 * (1.0 - far);
  float ch = colHeight(p.xz + warp);
  float s = smoothstep(0.0, 0.1, h) * smoothstep(0.0, 0.2, ch - h);
  if (s <= 0.002) return 0.0;
  float n = mix(textureLod(tNoise, q, gLodN).r, 0.62, far);
  float d = s - (1.0 - n) * shp.w * (1.0 - 0.5 * s);
  if (detail > 0.5 && d > 0.0 && d < 0.35) d -= (1.0 - textureLod(tNoise, q * 4.3, gLodN + 2.1).g) * 0.12;
  return max(d, 0.0) * shp.y;
}

float hg(float mu, float g) { float g2 = g * g; return (1.0 - g2) / pow(1.0 + g2 - 2.0 * g * mu, 1.5); }
float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }

void main() {
  // farthest depth of the 2x2 full-res footprint: silhouettes of near objects are handled by the composite
  vec2 hp = vec2(dFdx(vUv.x), dFdy(vUv.y)) * 0.3;
  float dz = max(max(texture2D(tDepth, vUv + vec2(-hp.x, -hp.y)).r, texture2D(tDepth, vUv + vec2(hp.x, -hp.y)).r),
                 max(texture2D(tDepth, vUv + vec2(-hp.x, hp.y)).r, texture2D(tDepth, vUv + vec2(hp.x, hp.y)).r));
  vec4 vp = invProj * vec4(vUv * 2.0 - 1.0, dz * 2.0 - 1.0, 1.0);
  vp /= vp.w;
  float sceneDist = dz >= 0.99999 ? 1e9 : length(vp.xyz);
  vec3 dir = normalize((camWorld * vec4(vp.xyz, 0.0)).xyz);
  float dy = abs(dir.y) < 1e-5 ? 1e-5 : dir.y;
  float tb = (layer.x - camPos.y) / dy, tt = (layer.y - camPos.y) / dy;
  float t0 = max(min(tb, tt), 0.0), t1 = max(tb, tt);
  if (camPos.y > layer.x && camPos.y < layer.y) t0 = 0.0;
  t1 = min(t1, min(sceneDist, maxDist));
  if (t1 <= t0) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); return; }

  float mu = dot(dir, sunDir);
  float phase = mix(1.0, hg(mu, 0.62) * 0.9 + hg(mu, -0.2) * 0.1, 0.4);
  float span = t1 - t0;
  float coarse = max(span / steps, 45.0);
  float dt = coarse;
  float t = t0 + dt * ign(gl_FragCoord.xy);
  float T = 1.0;
  vec3 L = vec3(0.0);
  vec3 fogC = acFogSky(dir);
  bool fine = false;
  float empty = 0.0;
  for (int i = 0; i < 110; i++) {
    if (float(i) >= steps * 2.2 || t > t1 || T < 0.02) break;
    vec3 p = camPos + dir * t;
    float fp = t * pixAng * 2.0;
    gLodW = log2(max(fp / (layer.z / 512.0), 1.0));
    gLodN = log2(max(fp / (shp.z / 64.0), 1.0));
    if (!fine) {
      if (shape(p) > 0.0) { fine = true; t = max(t0, t - dt); dt = clamp(t * 0.004, 8.0, 90.0); empty = 0.0; continue; }
      t += dt; dt = max(coarse, t * 0.02);
      continue;
    }
    float far = smoothstep(7000.0, 18000.0, t);
    float den = density(p, t < 5000.0 ? 1.0 : 0.0, far);
    if (den > 0.0) {
      empty = 0.0;
      float dl1 = density(p + sunDir * 60.0, 0.0, far);
      float dl2 = density(p + sunDir * 220.0, 0.0, far);
      float od = (dl1 * 60.0 + dl2 * 160.0) * ext;
      float beer = max(exp(-od), exp(-od * 0.25) * 0.45);
      float h = clamp((p.y - layer.x) / (layer.y - layer.x), 0.0, 1.0);
      vec3 amb = mix(ambBot, ambTop, smoothstep(0.0, 0.8, h));
      float powder = 1.0 - exp(-den * ext * 140.0);
      vec3 S = sunCol * beer * phase * mix(0.5, 1.0, powder) + amb * (0.6 + 0.4 * powder);
      float a = 1.0 - exp(-den * ext * dt);
      float ff = 1.0 - exp(-acFogOD(camPos.y, dir, t));
      S = mix(S, fogC, ff);
      L += T * S * a;
      T *= 1.0 - a;
    } else {
      empty += 1.0;
      if (empty > 6.0 && shape(p) <= 0.0) { fine = false; dt = max(coarse, t * 0.02); }
    }
    t += dt;
    if (fine) dt = clamp(t * 0.004, 8.0, 90.0) * (den > 0.0 ? 1.0 : 1.5);
  }
  gl_FragColor = vec4(L, T);
}`;

export const CLOUD_PRESETS = {
  none: null,
  sea:       { mix: 0, base: 1500, top: 2800, tile: 26000, cov: 0.5, density: 1.0, noise: 760, erosion: 0.72 },
  scattered: { mix: 1, base: 1400, top: 2300, tile: 42000, cov: 0.7, density: 1.0, noise: 700, erosion: 0.62 },
  broken:    { mix: 0, base: 1700, top: 3000, tile: 24000, cov: 0.36, density: 1.0, noise: 760, erosion: 0.7 },
};

export class Clouds {
  constructor(tier) {
    this.tier = tier;
    this.enabled = false;
    this.scale = tier.cloudScale;
    this.u = {
      tDepth: { value: null }, tWeather: { value: null }, tNoise: { value: null },
      invProj: { value: new THREE.Matrix4() }, camWorld: { value: new THREE.Matrix4() }, camPos: { value: new THREE.Vector3() },
      layer: { value: new THREE.Vector4(1500, 2700, 26000, 0.6) }, shp: { value: new THREE.Vector4(0, 1, 1000, 0.6) },
      wind: { value: new THREE.Vector3() }, sunDir: { value: new THREE.Vector3(0, 1, 0) }, sunCol: { value: new THREE.Color(3, 3, 3) },
      ambTop: { value: new THREE.Color(0.6, 0.7, 0.9) }, ambBot: { value: new THREE.Color(0.3, 0.32, 0.36) },
      maxDist: { value: 42000 }, pixAng: { value: 0.0015 }, steps: { value: tier.cloudSteps }, ext: { value: 0.03 },
      ...fogUniforms(),
    };
    this.pass = new FullPass(new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: this.u, depthTest: false, depthWrite: false }));
    this.rt = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, format: THREE.RGBAFormat, minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter, depthBuffer: false, generateMipmaps: false, colorSpace: THREE.LinearSRGBColorSpace });
    this.preset = null;
    this.windV = new THREE.Vector2(6, 2);
  }

  async load() {
    const [wimg, nimg] = await Promise.all([loadImage('assets/tex/weather.png'), loadImage('assets/tex/noise3d.png')]);
    const wt = new THREE.Texture(wimg);
    wt.wrapS = wt.wrapT = THREE.RepeatWrapping;
    wt.minFilter = THREE.LinearMipmapLinearFilter; wt.magFilter = THREE.LinearFilter;
    wt.colorSpace = THREE.NoColorSpace; wt.needsUpdate = true;
    this.u.tWeather.value = wt;
    // CPU copy of the weather map for gameplay queries
    const cv = document.createElement('canvas'); cv.width = wimg.width; cv.height = wimg.height;
    const cx = cv.getContext('2d', { willReadFrequently: true }); cx.drawImage(wimg, 0, 0);
    this.wdata = cx.getImageData(0, 0, cv.width, cv.height).data; this.wsize = cv.width;
    // 64^3 volume from the 8x8 atlas
    const cv2 = document.createElement('canvas'); cv2.width = nimg.width; cv2.height = nimg.height;
    const c2 = cv2.getContext('2d', { willReadFrequently: true }); c2.drawImage(nimg, 0, 0);
    const src = c2.getImageData(0, 0, 512, 512).data;
    const N = 64, vol = new Uint8Array(N * N * N * 2);
    for (let z = 0; z < N; z++) {
      const ox = (z % 8) * 64, oy = Math.floor(z / 8) * 64;
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const si = ((oy + y) * 512 + ox + x) * 4, di = ((z * N + y) * N + x) * 2;
        vol[di] = src[si]; vol[di + 1] = src[si + 1];
      }
    }
    const nt = new THREE.Data3DTexture(vol, N, N, N);
    nt.format = THREE.RGFormat; nt.type = THREE.UnsignedByteType;
    nt.wrapS = nt.wrapT = nt.wrapR = THREE.RepeatWrapping;
    nt.minFilter = THREE.LinearMipmapLinearFilter; nt.magFilter = THREE.LinearFilter; nt.generateMipmaps = true;
    nt.unpackAlignment = 1; nt.needsUpdate = true;
    this.u.tNoise.value = nt;
  }

  /** p: CLOUD_PRESETS entry (or null), light: { sunDir, sunCol, ambTop, ambBot } */
  setPreset(p, light) {
    this.preset = p;
    this.enabled = !!p && this.tier.clouds;
    if (!p) return;
    this.u.layer.value.set(p.base, p.top, p.tile, p.cov);
    this.u.maxDist.value = p.maxDist || 70000;
    this.u.shp.value.set(p.mix, p.density, p.noise, p.erosion);
    this.u.sunDir.value.copy(light.sunDir);
    this.u.sunCol.value.copy(light.cloudSun);
    this.u.ambTop.value.copy(light.ambTop);
    this.u.ambBot.value.copy(light.ambBot);
  }

  resize(w, h) {
    this.rt.setSize(Math.max(8, Math.round(w / this.scale)), Math.max(8, Math.round(h / this.scale)));
  }

  update(dt) {
    const w = this.u.wind.value;
    w.x += this.windV.x * dt; w.y += this.windV.y * dt; w.z += dt;
  }

  render(renderer, camera, depthTex) {
    const u = this.u;
    u.tDepth.value = depthTex;
    u.invProj.value.copy(camera.projectionMatrixInverse);
    u.camWorld.value.copy(camera.matrixWorld);
    u.camPos.value.setFromMatrixPosition(camera.matrixWorld);
    u.pixAng.value = THREE.MathUtils.degToRad(camera.fov) / this.rt.height;
    this.pass.render(renderer, this.rt);
  }

  /** approximate cloud density (0..1) at a world position, no detail noise - for gameplay / camera effects */
  densityAt(p) {
    const pr = this.preset;
    if (!pr || !this.wdata) return 0;
    const h = (p.y - pr.base) / (pr.top - pr.base);
    if (h < 0 || h > 1) return 0;
    const n = this.wsize, w = this.u.wind.value;
    let u = ((p.x + w.x) / pr.tile) % 1, v = ((p.z + w.y) / pr.tile) % 1;
    if (u < 0) u += 1; if (v < 0) v += 1;
    // texture v runs bottom -> top in GL; image rows top -> bottom
    const ix = Math.floor(u * n) % n, iy = (n - 1 - Math.floor(v * n) % n);
    const i = (iy * n + ix) * 4, d = this.wdata;
    const c = (pr.mix ? d[i + 1] : d[i]) / 255, big = d[i + 2] / 255;
    const cov = pr.cov * (0.8 + 0.4 * big);
    let ch = clamp((c - (1 - cov)) / Math.max(cov, 0.05), 0, 1);
    ch = (ch < 0.02 ? 0 : ch > 0.6 ? 1 : ((ch - 0.02) / 0.58) ** 2 * (3 - 2 * (ch - 0.02) / 0.58)) * (0.35 + 0.8 * big * big);
    const sm = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
    return sm(0, 0.1, h) * sm(0, 0.2, ch - h) * (1 - pr.erosion * 0.45);
  }
}
