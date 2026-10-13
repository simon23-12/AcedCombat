// Ocean: camera-centred polar grid, three scrolling FFT normal maps, Fresnel reflection of the HDR sky panorama
// (roughness via mip level), sun glitter, subsurface tint on crests, cloud shadows from the weather map and
// foaming ship wakes. Fades into the sky with the shared aerial perspective.
import * as THREE from 'three';
import { FOG_GLSL, fogUniforms } from './fog.js';

const VERT = /* glsl */`
varying vec3 vWorld;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;

const FRAG = /* glsl */`
precision highp float;
uniform sampler2D tNormal; uniform sampler2D tSky; uniform float skyLod;
uniform sampler2D tWeather; uniform vec4 cLayer; uniform vec4 cShp; uniform vec3 cWind; uniform float cOn;
uniform vec3 sunDir; uniform vec3 sunCol; uniform float time;
uniform vec3 deepCol; uniform vec3 scatCol;
uniform vec4 ships[6];      // x, z, heading, half length (0 = unused)
varying vec3 vWorld;
${FOG_GLSL}

vec3 skyAt(vec3 d, float lod) {
  vec2 uv = vec2(atan(d.x, -d.z) * 0.15915494 + 0.5, asin(clamp(d.y, -1.0, 1.0)) * 0.31830989 + 0.5);
  return textureLod(tSky, uv, lod).rgb;
}
float cloudShadow(vec3 p) {
  if (cOn < 0.5 || sunDir.y < 0.02) return 1.0;
  float mid = mix(cLayer.x, cLayer.y, 0.3);
  vec3 q = p + sunDir * (mid - p.y) / sunDir.y;
  vec3 w = texture2D(tWeather, (q.xz + cWind.xy) / cLayer.z).rgb;
  float c = mix(w.r, w.g, cShp.x);
  float cov = cLayer.w * (0.8 + 0.4 * w.b);
  float ch = clamp((c - (1.0 - cov)) / max(cov, 0.05), 0.0, 1.0);
  ch = smoothstep(0.02, 0.6, ch) * (0.35 + 0.8 * w.b * w.b);
  return 1.0 - 0.7 * smoothstep(0.05, 0.3, ch);
}

void main(){
  vec3 V = cameraPosition - vWorld;
  float dist = length(V);
  V /= dist;
  vec2 p = vWorld.xz;
  float fade = 1.0 / (1.0 + dist / 2500.0);
  vec4 n1 = texture2D(tNormal, p / 230.0 + time * vec2(0.011, 0.004));
  vec4 n2 = texture2D(tNormal, p / 61.0 + time * vec2(-0.017, 0.021));
  vec4 n3 = texture2D(tNormal, p / 1300.0 + time * vec2(0.002, -0.0015));
  vec2 nxz = (n1.rg * 2.0 - 1.0) * 1.0 + (n2.rg * 2.0 - 1.0) * 0.7 * fade + (n3.rg * 2.0 - 1.0) * 0.9;
  vec3 N = normalize(vec3(nxz.x, 1.6 + dist / 4000.0, nxz.y));
  float crest = clamp(n1.b * 0.7 + n2.b * 0.5 * fade, 0.0, 1.0);

  float NdV = max(dot(N, V), 0.0);
  float F = 0.02 + 0.98 * pow(1.0 - NdV, 5.0);
  vec3 R = reflect(-V, N);
  R.y = abs(R.y);
  float lod = clamp(1.5 + log2(1.0 + dist / 800.0), 0.0, skyLod);
  vec3 refl = skyAt(R, lod);
  float sh = cloudShadow(vWorld);
  float sunUp = clamp(sunDir.y * 3.0, 0.0, 1.0);
  vec3 skyAmb = skyAt(vec3(0.0, 1.0, 0.0), skyLod);
  vec3 body = deepCol * (skyAmb * 0.55 + sunCol * sunUp * 0.12 * sh);
  float sss = pow(max(dot(-V, sunDir) * 0.5 + 0.5, 0.0), 3.0) * crest;
  body += scatCol * sunCol * sss * 0.25 * sh;
  vec3 col = mix(body, refl, F);
  // sun glitter
  vec3 H = normalize(V + sunDir);
  float nh = max(dot(N, H), 0.0);
  col += sunCol * (pow(nh, 900.0) * 30.0 + pow(nh, 120.0) * 0.8) * sh * smoothstep(-0.02, 0.05, sunDir.y);
  // ship wakes
  float foam = 0.0;
  for (int i = 0; i < 6; i++) {
    vec4 s = ships[i];
    if (s.w <= 0.0) continue;
    vec2 d = p - s.xy;
    vec2 fw = vec2(sin(s.z), cos(s.z));
    float along = dot(d, fw);
    float lat = dot(d, vec2(fw.y, -fw.x));
    float behind = -along - s.w * 0.85;
    if (behind > -s.w * 0.4 && behind < 2200.0) {
      float wid = 9.0 + s.w * 0.08 + behind * 0.06;
      float core = smoothstep(wid, wid * 0.35, abs(lat)) * exp(-max(behind, 0.0) / 900.0);
      float kelvin = smoothstep(4.0, 0.0, abs(abs(lat) - (s.w * 0.15 + max(behind, 0.0) * 0.36))) * exp(-max(behind, 0.0) / 500.0);
      foam = max(foam, core * (0.55 + 0.45 * n2.b) + kelvin * 0.5 * n1.b);
    }
    // bow wave
    float bow = along - s.w * 0.8;
    if (bow > -s.w * 0.6 && bow < 30.0) foam = max(foam, smoothstep(s.w * 0.17, s.w * 0.11, abs(lat)) * smoothstep(-s.w * 0.6, 0.0, bow) * 0.5 * n2.b * 2.0);
  }
  col = mix(col, (skyAmb * 0.85 + sunCol * sunUp * 0.35 * sh), clamp(foam, 0.0, 1.0) * 0.85);

  float ff = 1.0 - exp(-acFogOD(cameraPosition.y, -V, dist));
  col = mix(col, acFogSky(-V), ff);
  gl_FragColor = vec4(col, 1.0);
}`;

function polarGrid(rings = 90, segs = 96, r0 = 6, rMax = 90000) {
  const pos = [0, 0, 0];
  const k = Math.pow(rMax / r0, 1 / (rings - 1));
  for (let i = 0; i < rings; i++) {
    const r = r0 * Math.pow(k, i);
    for (let j = 0; j < segs; j++) {
      const a = (j / segs) * Math.PI * 2;
      pos.push(Math.cos(a) * r, 0, Math.sin(a) * r);
    }
  }
  const idx = [];
  for (let j = 0; j < segs; j++) idx.push(0, 1 + ((j + 1) % segs), 1 + j);
  for (let i = 0; i < rings - 1; i++) {
    for (let j = 0; j < segs; j++) {
      const a = 1 + i * segs + j, b = 1 + i * segs + ((j + 1) % segs);
      const c = a + segs, d = b + segs;
      idx.push(a, b, c, b, d, c);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  return g;
}

export class Ocean {
  constructor(scene) {
    this.u = {
      tNormal: { value: null }, tSky: { value: null }, skyLod: { value: 8 },
      tWeather: { value: null }, cLayer: { value: new THREE.Vector4() }, cShp: { value: new THREE.Vector4() }, cWind: { value: new THREE.Vector3() }, cOn: { value: 0 },
      sunDir: { value: new THREE.Vector3(0, 1, 0) }, sunCol: { value: new THREE.Color(1, 1, 1) }, time: { value: 0 },
      deepCol: { value: new THREE.Color(0.012, 0.045, 0.07) }, scatCol: { value: new THREE.Color(0.05, 0.35, 0.32) },
      ships: { value: Array.from({ length: 6 }, () => new THREE.Vector4(0, 0, 0, 0)) },
      ...fogUniforms(),
    };
    this.mesh = new THREE.Mesh(polarGrid(), new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: this.u, side: THREE.DoubleSide }));
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = -10;
    scene.add(this.mesh);
  }

  async load() {
    const t = await new THREE.TextureLoader().loadAsync('assets/tex/ocean_n.png');
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.colorSpace = THREE.NoColorSpace;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.anisotropy = 4;
    this.u.tNormal.value = t;
  }

  setEnv(sky, clouds) {
    this.u.tSky.value = sky.rt.texture;
    this.u.skyLod.value = Math.log2(sky.rt.width) - 2;
    this.u.sunDir.value.copy(sky.sunDir);
    this.u.sunCol.value.copy(sky.sunCol);
    const cu = clouds.u;
    this.u.tWeather.value = cu.tWeather.value;
    this.u.cLayer.value = cu.layer.value;
    this.u.cShp.value = cu.shp.value;
    this.u.cWind.value = cu.wind.value;
    this.u.cOn.value = clouds.preset ? 1 : 0;
  }

  update(dt, camera) {
    this.u.time.value += dt;
    this.mesh.position.set(camera.position.x, 0, camera.position.z);
  }
}
