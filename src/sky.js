// Blender-rendered sky panorama: log-encoded 8-bit WebP -> half-float HDR render target, used as
// (1) sky dome with an analytic sun disc, (2) PMREM environment for the aircraft, (3) fog colour source.
import * as THREE from 'three';
import { FullPass } from './post.js';
import { fogU } from './fog.js';

const A = 0.02, M = 64.0;   // must match tools/pack_sky.py

const DECODE_V = `varying vec2 vUv; void main(){ vUv = position.xy*0.5+0.5; gl_Position = vec4(position.xy,0.,1.); }`;
const DECODE_F = /* glsl */`
precision highp float;
uniform sampler2D tSrc; varying vec2 vUv;
const float A = ${A.toFixed(5)}; const float M = ${M.toFixed(3)};
void main(){
  vec3 y = texture2D(tSrc, vUv).rgb;
  gl_FragColor = vec4(A * (exp(y * log(1.0 + M / A)) - 1.0), 1.0);
}`;
const BLUR_F = /* glsl */`
precision highp float;
uniform sampler2D tSrc; uniform float lod; varying vec2 vUv;
void main(){ gl_FragColor = vec4(textureLod(tSrc, vUv, lod).rgb, 1.0); }`;

const DOME_V = /* glsl */`
varying vec3 vDir;
void main(){
  vDir = position;
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}`;
const DOME_F = /* glsl */`
precision highp float;
uniform sampler2D tSky; uniform float gain; uniform vec3 sunDir; uniform vec3 sunCol; uniform float sunSize;
varying vec3 vDir;
void main(){
  vec3 d = normalize(vDir);
  float u1 = atan(d.x, -d.z) * 0.15915494 + 0.5;
  float u2 = fract(u1 + 0.5) - 0.5;
  float v = asin(clamp(d.y, -1.0, 1.0)) * 0.31830989 + 0.5;
  float du = min(fwidth(u1), fwidth(u2));
  vec3 c = textureGrad(tSky, vec2(u1, v), vec2(du, dFdx(v)), vec2(du, dFdy(v))).rgb * gain;
  float s = dot(d, sunDir);
  float disc = smoothstep(cos(sunSize), cos(sunSize * 0.8), s);
  float horizon = smoothstep(-0.01, 0.02, d.y);
  c += sunCol * (disc * 60.0 + pow(max(s, 0.0), 900.0) * 6.0) * horizon;
  gl_FragColor = vec4(c, 1.0);
}`;

export class Sky {
  constructor(renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;
    this.rt = null;
    this.sunDir = new THREE.Vector3(0, 1, 0);
    this.sunCol = new THREE.Color(1, 1, 1);
  }

  /** preset: { url, sunEl, sunAz (Blender degrees), sunCol:[r,g,b], gain } */
  async load(preset, tier) {
    const tex = await new Promise((res, rej) => new THREE.TextureLoader().load(preset.url, res, undefined, rej));
    tex.colorSpace = THREE.NoColorSpace;
    tex.generateMipmaps = false;
    tex.minFilter = tex.magFilter = THREE.LinearFilter;
    tex.wrapS = THREE.RepeatWrapping;
    const r = this.renderer;
    const w = Math.min(tex.image.width, tier.skyW), h = w / 2;
    this.dispose();
    this.rt = new THREE.WebGLRenderTarget(w, h, {
      type: THREE.HalfFloatType, format: THREE.RGBAFormat, colorSpace: THREE.LinearSRGBColorSpace,
      minFilter: THREE.LinearMipmapLinearFilter, magFilter: THREE.LinearFilter, generateMipmaps: true, depthBuffer: false,
      wrapS: THREE.RepeatWrapping,
    });
    const dec = new FullPass(new THREE.ShaderMaterial({ vertexShader: DECODE_V, fragmentShader: DECODE_F, uniforms: { tSrc: { value: tex } }, depthTest: false, depthWrite: false }));
    dec.render(r, this.rt);
    tex.dispose();
    dec.material.dispose();

    this.fogRT = new THREE.WebGLRenderTarget(256, 128, {
      type: THREE.HalfFloatType, format: THREE.RGBAFormat, colorSpace: THREE.LinearSRGBColorSpace,
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, generateMipmaps: false, depthBuffer: false, wrapS: THREE.RepeatWrapping,
    });
    const blur = new FullPass(new THREE.ShaderMaterial({ vertexShader: DECODE_V, fragmentShader: BLUR_F,
      uniforms: { tSrc: { value: this.rt.texture }, lod: { value: Math.log2(w / 256) + 0.7 } }, depthTest: false, depthWrite: false }));
    blur.render(r, this.fogRT);
    blur.material.dispose();
    fogU.tFogSky.value = this.fogRT.texture;
    fogU.fogP.value.w = preset.fogGain ?? 1.0;

    // sun direction: Blender (cos el sin az, cos el cos az, sin el) -> three (x, z, -y)
    const el = THREE.MathUtils.degToRad(preset.sunEl), az = THREE.MathUtils.degToRad(preset.sunAz);
    this.sunDir.set(Math.cos(el) * Math.sin(az), Math.sin(el), -Math.cos(el) * Math.cos(az)).normalize();
    this.sunCol.setRGB(...preset.sunCol);
    fogU.fogSun.value.copy(this.sunDir);
    fogU.fogSunCol.value.copy(this.sunCol).multiplyScalar(preset.hazeSun ?? 0.35);

    const g = new THREE.SphereGeometry(1, 48, 32);
    const m = new THREE.ShaderMaterial({
      vertexShader: DOME_V, fragmentShader: DOME_F, side: THREE.BackSide, depthWrite: false, depthTest: false,
      uniforms: { tSky: { value: this.rt.texture }, gain: { value: preset.gain ?? 1.0 }, sunDir: { value: this.sunDir }, sunCol: { value: this.sunCol },
        sunSize: { value: THREE.MathUtils.degToRad(preset.sunSize ?? 0.55) } },
      toneMapped: false,
    });
    this.dome = new THREE.Mesh(g, m);
    this.dome.frustumCulled = false;
    this.dome.renderOrder = -1000;
    this.scene.add(this.dome);

    const pm = new THREE.PMREMGenerator(r);
    this.rt.texture.mapping = THREE.EquirectangularReflectionMapping;
    this.env = pm.fromEquirectangular(this.rt.texture);
    pm.dispose();
    this.scene.environment = this.env.texture;
    this.scene.environmentIntensity = preset.envGain ?? 1.0;
    return this;
  }

  dispose() {
    if (this.dome) { this.scene.remove(this.dome); this.dome.geometry.dispose(); this.dome.material.dispose(); this.dome = null; }
    this.rt?.dispose(); this.fogRT?.dispose(); this.env?.dispose();
    this.rt = null;
  }

  update(camera) {
    if (!this.dome) return;
    this.dome.position.copy(camera.position);
    this.dome.scale.setScalar(camera.far * 0.9);
  }
}
