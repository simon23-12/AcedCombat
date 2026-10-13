// Aerial perspective: exponential height fog that fades distant geometry into the Blender-rendered sky panorama,
// with forward-scattered sun glare. Every material that wants it calls enableSkyFog(material).
import * as THREE from 'three';

export const fogU = {
  tFogSky: { value: null },
  // x: density at sea level (1/m)  y: 1/scale height  z: constant haze (1/m)  w: sky colour gain
  fogP: { value: new THREE.Vector4(1 / 26000, 1 / 2600, 1 / 160000, 1.0) },
  fogSun: { value: new THREE.Vector3(0, 1, 0) },
  fogSunCol: { value: new THREE.Color(1, 0.9, 0.7) },
};

/** GLSL shared by the fog chunks and the custom shaders (clouds, ocean, particles) */
export const FOG_GLSL = /* glsl */`
  uniform sampler2D tFogSky;
  uniform vec4 fogP;
  uniform vec3 fogSun;
  uniform vec3 fogSunCol;
  vec3 acFogSky(vec3 d) {
    vec2 uv = vec2(atan(d.x, -d.z) * 0.15915494 + 0.5, asin(clamp(d.y, -1.0, 1.0)) * 0.31830989 + 0.5);
    vec3 c = texture2D(tFogSky, uv).rgb * fogP.w;
    float s = max(dot(d, fogSun), 0.0);
    return c + fogSunCol * (pow(s, 10.0) * 0.55 + pow(s, 80.0) * 0.8);
  }
  // optical depth from the camera (height camY) along unit dir d over distance dist
  float acFogOD(float camY, vec3 d, float dist) {
    float b = fogP.y;
    float a = clamp(b * d.y * dist, -30.0, 30.0);
    float t = abs(a) < 1e-4 ? 1.0 : (1.0 - exp(-a)) / a;
    return fogP.x * exp(-b * max(camY, -50.0)) * dist * t + fogP.z * dist;
  }
`;

export function installFogChunks() {
  const C = THREE.ShaderChunk;
  C.fog_pars_vertex = /* glsl */`
#ifdef USE_FOG
  varying vec3 vFogRay;
#endif`;
  C.fog_vertex = /* glsl */`
#ifdef USE_FOG
  vFogRay = (vec4(mvPosition.xyz, 0.0) * viewMatrix).xyz;
#endif`;
  C.fog_pars_fragment = /* glsl */`
#ifdef USE_FOG
  varying vec3 vFogRay;
  ${FOG_GLSL}
#endif`;
  C.fog_fragment = /* glsl */`
#ifdef USE_FOG
  {
    float fdist = length(vFogRay);
    vec3 fdir = vFogRay / max(fdist, 1e-3);
    float ff = 1.0 - exp(-acFogOD(cameraPosition.y, fdir, fdist));
    gl_FragColor.rgb = mix(gl_FragColor.rgb, acFogSky(fdir), ff);
  }
#endif`;
}

export function makeSceneFog() { return new THREE.Fog(0x000000, 1, 2); }

export function enableSkyFog(material) {
  const prev = material.onBeforeCompile;
  material.onBeforeCompile = (sh, r) => {
    prev?.(sh, r);
    sh.uniforms.tFogSky = fogU.tFogSky;
    sh.uniforms.fogP = fogU.fogP;
    sh.uniforms.fogSun = fogU.fogSun;
    sh.uniforms.fogSunCol = fogU.fogSunCol;
  };
  material.fog = true;
  return material;
}

/** uniforms object for custom ShaderMaterials that include FOG_GLSL */
export const fogUniforms = () => ({ tFogSky: fogU.tFogSky, fogP: fogU.fogP, fogSun: fogU.fogSun, fogSunCol: fogU.fogSunCol });
