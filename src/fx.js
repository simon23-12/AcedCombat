// Effects: instanced billboard particles (Blender-rendered smoke puffs + explosion flipbook, additive glows/sparks),
// camera-facing ribbon trails (contrails, wingtip vortices, missile smoke) and afterburner flames.
// All of it is drawn on layer 1 (after the clouds) with depth test against the opaque scene.
import * as THREE from 'three';
import { FOG_GLSL, fogUniforms } from './fog.js';
import { clamp } from './util.js';

const LAYER = 1;

// --------------------------------------------------------------------------------------------- particles
const P_VERT = /* glsl */`
attribute vec3 iPos; attribute vec4 iCol; attribute vec3 iSRF;   // size, rotation, frame
varying vec2 vUv; varying vec4 vCol; varying float vFrame; varying vec3 vFogRay; varying vec2 vCorner;
uniform float stretch;
void main(){
  vec4 mv = modelViewMatrix * vec4(iPos, 1.0);
  float c = cos(iSRF.y), s = sin(iSRF.y);
  vec2 q = position.xy;
  vCorner = q;
  vec2 r = vec2(q.x * c - q.y * s, q.x * s + q.y * c) * iSRF.x;
  mv.xy += r;
  vUv = q + 0.5;
  vCol = iCol; vFrame = iSRF.z;
  vFogRay = (vec4(mv.xyz, 0.0) * viewMatrix).xyz;
  gl_Position = projectionMatrix * mv;
}`;

const P_FRAG = /* glsl */`
precision highp float;
uniform sampler2D tMap; uniform float grid; uniform float kind; uniform vec3 light; uniform vec3 sunCol;
varying vec2 vUv; varying vec4 vCol; varying float vFrame; varying vec3 vFogRay; varying vec2 vCorner;
${FOG_GLSL}
void main(){
  vec4 c;
  if (kind < 0.5) {                     // smoke atlas (2x2 variants)
    float f = floor(vFrame + 0.5);
    vec2 cell = vec2(mod(f, grid), grid - 1.0 - floor(f / grid));
    vec4 t = texture2D(tMap, (vUv + cell) / grid);
    c = vec4(t.rgb * vCol.rgb * light, t.a * vCol.a);
  } else if (kind < 1.5) {              // explosion flipbook
    float f = floor(vFrame);
    vec2 cell = vec2(mod(f, grid), grid - 1.0 - floor(f / grid));
    vec4 t = texture2D(tMap, (vUv + cell) / grid);
    float fire = smoothstep(0.02, 0.22, t.r - t.b) * clamp(1.0 - vFrame / 16.0, 0.0, 1.0);
    vec3 rgb = t.rgb * light * 0.9 + t.rgb * fire * 14.0 * vCol.rgb;
    c = vec4(rgb, t.a * vCol.a);
  } else {                              // procedural glow (additive)
    float r2 = dot(vCorner, vCorner) * 4.0;
    float g = exp(-r2 * 4.5) + exp(-r2 * 30.0) * 2.0;
    c = vec4(vCol.rgb * g * vCol.a, 0.0);
  }
  float fd = length(vFogRay);
  float ff = 1.0 - exp(-acFogOD(cameraPosition.y, vFogRay / max(fd, 1e-3), fd));
  if (kind < 1.5) c.rgb = mix(c.rgb, acFogSky(vFogRay / max(fd, 1e-3)), ff);
  else c.rgb *= 1.0 - ff;
  if (kind < 1.5) { gl_FragColor = vec4(c.rgb * c.a, c.a); }    // premultiplied
  else gl_FragColor = vec4(c.rgb, 0.0);
}`;

class ParticlePool {
  constructor(scene, max, kind, tex, grid, blending) {
    this.max = max; this.kind = kind; this.n = 0;
    this.p = []; // particle objects
    const g = new THREE.InstancedBufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0], 3));
    g.setIndex([0, 1, 2, 0, 2, 3]);
    this.aPos = new THREE.InstancedBufferAttribute(new Float32Array(max * 3), 3).setUsage(THREE.DynamicDrawUsage);
    this.aCol = new THREE.InstancedBufferAttribute(new Float32Array(max * 4), 4).setUsage(THREE.DynamicDrawUsage);
    this.aSRF = new THREE.InstancedBufferAttribute(new Float32Array(max * 3), 3).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('iPos', this.aPos); g.setAttribute('iCol', this.aCol); g.setAttribute('iSRF', this.aSRF);
    g.instanceCount = 0;
    this.u = { tMap: { value: tex }, grid: { value: grid }, kind: { value: kind }, light: { value: new THREE.Color(1, 1, 1) },
      sunCol: { value: new THREE.Color(1, 1, 1) }, stretch: { value: 0 }, ...fogUniforms() };
    const m = new THREE.ShaderMaterial({
      vertexShader: P_VERT, fragmentShader: P_FRAG, uniforms: this.u, transparent: true, depthWrite: false,
      blending: THREE.CustomBlending, blendSrc: THREE.OneFactor,
      blendDst: blending === 'add' ? THREE.OneFactor : THREE.OneMinusSrcAlphaFactor,
    });
    this.mesh = new THREE.Mesh(g, m);
    this.mesh.frustumCulled = false;
    this.mesh.layers.set(LAYER);
    this.mesh.renderOrder = kind === 2 ? 20 : 10;
    scene.add(this.mesh);
    this.geo = g;
  }

  spawn(o) {
    if (this.p.length >= this.max) this.p.shift();
    const q = { x: o.pos.x, y: o.pos.y, z: o.pos.z, vx: o.vel?.x || 0, vy: o.vel?.y || 0, vz: o.vel?.z || 0,
      life: 0, max: o.life || 2, s0: o.size || 5, s1: o.size1 ?? (o.size || 5) * 2, rot: o.rot ?? Math.random() * 6.28,
      vr: o.vr ?? (Math.random() - 0.5) * 0.6, r: o.color?.[0] ?? 1, g: o.color?.[1] ?? 1, b: o.color?.[2] ?? 1, a: o.alpha ?? 1,
      frame: o.frame ?? Math.floor(Math.random() * 4), drag: o.drag ?? 0.6, rise: o.rise ?? 0, fadeIn: o.fadeIn ?? 0.08, frames: o.frames || 0 };
    this.p.push(q);
    return q;
  }

  update(dt) {
    const P = this.p;
    let w = 0;
    for (let i = 0; i < P.length; i++) {
      const q = P[i];
      q.life += dt;
      if (q.life >= q.max) continue;
      const dr = Math.exp(-q.drag * dt);
      q.vx *= dr; q.vy = q.vy * dr + q.rise * dt; q.vz *= dr;
      q.x += q.vx * dt; q.y += q.vy * dt; q.z += q.vz * dt;
      q.rot += q.vr * dt;
      P[w++] = q;
    }
    P.length = w;
    const n = Math.min(w, this.max);
    const ap = this.aPos.array, ac = this.aCol.array, as = this.aSRF.array;
    for (let i = 0; i < n; i++) {
      const q = P[i], t = q.life / q.max;
      ap[i * 3] = q.x; ap[i * 3 + 1] = q.y; ap[i * 3 + 2] = q.z;
      const fin = Math.min(1, q.life / q.fadeIn);
      const a = q.a * fin * (this.kind === 1 ? 1 - smoothT(0.75, 1, t) : (1 - t) * (1 - t * 0.3));
      ac[i * 4] = q.r; ac[i * 4 + 1] = q.g; ac[i * 4 + 2] = q.b; ac[i * 4 + 3] = a;
      as[i * 3] = q.s0 + (q.s1 - q.s0) * (1 - (1 - t) * (1 - t));
      as[i * 3 + 1] = q.rot;
      as[i * 3 + 2] = this.kind === 1 ? Math.min(q.frames - 1, t * q.frames) : q.frame;
    }
    this.geo.instanceCount = n;
    this.aPos.needsUpdate = this.aCol.needsUpdate = this.aSRF.needsUpdate = true;
  }
}
const smoothT = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

// --------------------------------------------------------------------------------------------- ribbon trails
const T_VERT = /* glsl */`
attribute vec3 side; attribute vec2 wa;   // side = offset direction (world), wa = (width, alpha)
varying float vA; varying vec3 vFogRay; varying float vS;
uniform float tw;
void main(){
  vec3 p = position + side * wa.x;
  vA = wa.y;
  vS = sign(dot(side, side) > 0.0 ? 1.0 : 0.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vFogRay = (vec4(mv.xyz, 0.0) * viewMatrix).xyz;
  gl_Position = projectionMatrix * mv;
}`;
const T_FRAG = /* glsl */`
precision highp float;
uniform vec3 tint; uniform vec3 light;
varying float vA; varying vec3 vFogRay;
${FOG_GLSL}
void main(){
  float fd = length(vFogRay);
  vec3 d = vFogRay / max(fd, 1e-3);
  float ff = 1.0 - exp(-acFogOD(cameraPosition.y, d, fd));
  vec3 c = mix(tint * light, acFogSky(d), ff);
  float a = vA * (1.0 - ff * 0.7);
  gl_FragColor = vec4(c * a, a);
}`;

export class Trails {
  constructor(scene, maxPts = 6000) {
    this.max = maxPts;
    this.trails = new Set();
    const g = new THREE.BufferGeometry();
    this.pos = new Float32Array(maxPts * 2 * 3);
    this.side = new Float32Array(maxPts * 2 * 3);
    this.wa = new Float32Array(maxPts * 2 * 2);
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('side', new THREE.BufferAttribute(this.side, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('wa', new THREE.BufferAttribute(this.wa, 2).setUsage(THREE.DynamicDrawUsage));
    this.idx = new Uint32Array(maxPts * 6);
    g.setIndex(new THREE.BufferAttribute(this.idx, 1).setUsage(THREE.DynamicDrawUsage));
    this.u = { tint: { value: new THREE.Color(1, 1, 1) }, light: { value: new THREE.Color(1, 1, 1) }, ...fogUniforms() };
    const m = new THREE.ShaderMaterial({ vertexShader: T_VERT, fragmentShader: T_FRAG, uniforms: this.u, transparent: true, depthWrite: false,
      side: THREE.DoubleSide, blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor });
    this.mesh = new THREE.Mesh(g, m);
    this.mesh.frustumCulled = false;
    this.mesh.layers.set(LAYER);
    this.mesh.renderOrder = 5;
    scene.add(this.mesh);
    this.geo = g;
  }

  /** create a trail: { width, life (s), alpha, grow (width growth per s), minDist } */
  create(o = {}) {
    const t = { pts: [], width: o.width ?? 1, life: o.life ?? 2, alpha: o.alpha ?? 0.5, grow: o.grow ?? 0, minDist: o.minDist ?? 6, dead: false, emit: true };
    this.trails.add(t);
    return t;
  }

  push(t, p, strength = 1) {
    if (!t.emit) return;
    const pts = t.pts, last = pts[pts.length - 1];
    if (last && last.p.distanceToSquared(p) < t.minDist * t.minDist) {
      // keep the head attached
      if (pts.length > 1) { last.p.copy(p); last.s = strength; }
      return;
    }
    pts.push({ p: p.clone(), age: 0, s: strength });
    if (pts.length > 160) pts.shift();
  }

  update(dt, camPos) {
    let v = 0, ii = 0;
    const P = this.pos, S = this.side, W = this.wa, I = this.idx;
    const dir = new THREE.Vector3(), toCam = new THREE.Vector3(), sd = new THREE.Vector3();
    for (const t of this.trails) {
      const pts = t.pts;
      for (const q of pts) q.age += dt;
      while (pts.length && pts[0].age > t.life) pts.shift();
      if (t.dead && pts.length < 2) { this.trails.delete(t); continue; }
      if (pts.length < 2) continue;
      if (v + pts.length * 2 > this.max * 2) break;
      const base = v;
      for (let i = 0; i < pts.length; i++) {
        const q = pts[i];
        const a = pts[Math.max(0, i - 1)].p, b = pts[Math.min(pts.length - 1, i + 1)].p;
        dir.subVectors(b, a).normalize();
        toCam.subVectors(camPos, q.p).normalize();
        sd.crossVectors(dir, toCam).normalize();
        const k = q.age / t.life;
        const w = (t.width + t.grow * q.age) * 0.5;
        const al = t.alpha * q.s * (1 - k) * (1 - k) * Math.min(1, i / 2) * (i === pts.length - 1 ? 0.6 : 1);
        for (let s = -1; s <= 1; s += 2) {
          P[v * 3] = q.p.x; P[v * 3 + 1] = q.p.y; P[v * 3 + 2] = q.p.z;
          S[v * 3] = sd.x * s; S[v * 3 + 1] = sd.y * s; S[v * 3 + 2] = sd.z * s;
          W[v * 2] = w; W[v * 2 + 1] = al;
          v++;
        }
      }
      for (let i = 0; i < pts.length - 1; i++) {
        const a = base + i * 2;
        I[ii++] = a; I[ii++] = a + 1; I[ii++] = a + 2;
        I[ii++] = a + 1; I[ii++] = a + 3; I[ii++] = a + 2;
      }
    }
    const g = this.geo;
    g.setDrawRange(0, ii);
    g.attributes.position.needsUpdate = g.attributes.side.needsUpdate = g.attributes.wa.needsUpdate = true;
    g.index.needsUpdate = true;
  }
}

// --------------------------------------------------------------------------------------------- afterburner
const AB_VERT = /* glsl */`
varying vec2 vUv; varying vec3 vN; varying vec3 vV;
void main(){
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;
const AB_FRAG = /* glsl */`
precision highp float;
uniform float power; uniform float time; uniform vec3 hot; uniform vec3 cool;
varying vec2 vUv; varying vec3 vN; varying vec3 vV;
void main(){
  float x = vUv.y;                          // 0 at nozzle, 1 at the tip
  float rim = pow(abs(dot(vN, vV)), 1.5);
  float diamonds = 0.65 + 0.35 * sin(x * 38.0 - time * 70.0);
  float flick = 0.85 + 0.15 * sin(time * 91.0 + x * 13.0);
  float core = (1.0 - x) * (1.0 - x);
  vec3 c = mix(cool, hot, core) * (core * 1.6 + 0.25) * diamonds * flick * rim;
  float a = power * (1.0 - smoothstep(0.55, 1.0, x));
  gl_FragColor = vec4(c * a, 0.0);
}`;

export function makeAfterburner(radius, length) {
  const g = new THREE.CylinderGeometry(radius * 0.25, radius * 0.95, length, 16, 1, true);
  g.translate(0, -length / 2, 0);
  g.rotateX(-Math.PI / 2);        // tip points to -Z (behind the plane)
  const uv = g.attributes.uv;
  const pos = g.attributes.position;
  for (let i = 0; i < uv.count; i++) uv.setY(i, clamp(-pos.getZ(i) / length, 0, 1));
  const m = new THREE.ShaderMaterial({
    vertexShader: AB_VERT, fragmentShader: AB_FRAG, transparent: true, depthWrite: false, side: THREE.DoubleSide,
    blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor,
    uniforms: { power: { value: 0 }, time: { value: 0 }, hot: { value: new THREE.Color(3.2, 2.6, 2.4) }, cool: { value: new THREE.Color(1.6, 0.55, 0.9) } },
  });
  const mesh = new THREE.Mesh(g, m);
  mesh.layers.set(LAYER);
  mesh.frustumCulled = false;
  mesh.renderOrder = 30;
  return mesh;
}

// --------------------------------------------------------------------------------------------- facade
export class FX {
  constructor(scene, tier) {
    this.scene = scene;
    this.tier = tier;
    this.time = 0;
  }

  async load() {
    const L = new THREE.TextureLoader();
    const [sm, ex] = await Promise.all([L.loadAsync('assets/fx/smoke.webp'), L.loadAsync('assets/fx/explosion.webp')]);
    for (const t of [sm, ex]) { t.colorSpace = THREE.SRGBColorSpace; t.premultiplyAlpha = false; }
    const s = this.tier.particles;
    this.smoke = new ParticlePool(this.scene, s, 0, sm, 2, 'alpha');
    this.explo = new ParticlePool(this.scene, Math.round(s / 6), 1, ex, 6, 'alpha');
    this.glow = new ParticlePool(this.scene, Math.round(s / 2), 2, null, 1, 'add');
    this.trails = new Trails(this.scene, this.tier.trailPts);
  }

  setLight(env) {
    // smoke is pre-lit in Blender; scale it to the scene's light level
    const l = new THREE.Color(...env.ambTop).multiplyScalar(0.55).add(new THREE.Color(...env.cloudSun).multiplyScalar(0.28));
    this.smoke.u.light.value.copy(l);
    this.explo.u.light.value.copy(l).multiplyScalar(0.9);
    this.trails.u.light.value.copy(l).multiplyScalar(1.1);
  }

  puff(pos, o = {}) { return this.smoke.spawn({ pos, ...o }); }
  flash(pos, size, color, life = 0.15, vel) { return this.glow.spawn({ pos, vel, size, size1: size * 1.3, color, life, alpha: 1, fadeIn: 0.001, drag: 0 }); }

  explosion(pos, size = 1, vel) {
    const v = vel ? vel.clone().multiplyScalar(0.25) : new THREE.Vector3();
    for (let i = 0; i < 3; i++) {
      const o = new THREE.Vector3((Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)).multiplyScalar(14 * size);
      this.explo.spawn({ pos: pos.clone().add(o), vel: v, size: 22 * size, size1: 46 * size, life: 2.6 + Math.random() * 0.8, frames: 36, rise: 4, drag: 0.8,
        color: [1, 1, 1], alpha: 1, fadeIn: 0.02 });
    }
    this.flash(pos, 90 * size, [8, 5, 2.4], 0.35);
    for (let i = 0; i < 10 * size; i++) {
      const d = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.2, Math.random() - 0.5).normalize().multiplyScalar(60 + Math.random() * 120);
      this.glow.spawn({ pos: pos.clone(), vel: d.add(v), size: 3, size1: 1, color: [6, 3, 1.2], life: 0.6 + Math.random() * 0.6, drag: 1.5, fadeIn: 0.001 });
    }
    for (let i = 0; i < 5; i++) {
      this.smoke.spawn({ pos: pos.clone().add(new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30)),
        vel: v, size: 30 * size, size1: 70 * size, life: 6 + Math.random() * 3, color: [0.45, 0.42, 0.4], alpha: 0.7, rise: 2, drag: 0.4 });
    }
  }

  splash(pos, size = 1) {
    for (let i = 0; i < 8; i++) {
      this.smoke.spawn({ pos: pos.clone().add(new THREE.Vector3((Math.random() - 0.5) * 10 * size, 0, (Math.random() - 0.5) * 10 * size)),
        vel: new THREE.Vector3((Math.random() - 0.5) * 10, 25 + Math.random() * 35 * size, (Math.random() - 0.5) * 10),
        size: 10 * size, size1: 34 * size, life: 2.5, color: [1.1, 1.15, 1.2], alpha: 0.85, rise: -16, drag: 0.5 });
    }
  }

  update(dt, camera) {
    this.time += dt;
    this.smoke.update(dt);
    this.explo.update(dt);
    this.glow.update(dt);
    this.trails.update(dt, camera.position);
  }
}
