// Blender-baked models (aircraft, ships): GLB geometry + albedo / normal / ORM / emissive atlases.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { enableSkyFog } from './fog.js';

const texLoader = new THREE.TextureLoader();
const cache = new Map();

export function loadTex(url, srgb, renderer, size = 0) {
  return new Promise((res, rej) => texLoader.load(url, (t0) => {
    let t = t0;
    if (size && t0.image.width > size) {
      const cv = document.createElement('canvas');
      cv.width = size; cv.height = Math.round(size * t0.image.height / t0.image.width);
      cv.getContext('2d').drawImage(t0.image, 0, 0, cv.width, cv.height);
      t = new THREE.CanvasTexture(cv); t0.dispose();
    }
    t.flipY = false;
    t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    res(t);
  }, undefined, rej));
}

/** returns { kind, parts: {name: geometry}, material, marks: {name: Vector3}, radius } */
export async function loadModel(kind, renderer, { size = 0, emissive = 1.0, envMap = 1.0 } = {}) {
  const key = kind + ':' + size;
  if (cache.has(key)) return cache.get(key);
  const p = (async () => {
    const glb = await new GLTFLoader().loadAsync(`assets/models/${kind}.glb`);
    const parts = {}; const marks = {};
    glb.scene.updateMatrixWorld(true);
    glb.scene.traverse((o) => {
      if (o.isMesh) {
        const g = o.geometry.clone();
        g.applyMatrix4(o.matrixWorld);
        const key = o.name.replace(/_\d+$/, '');
        parts[key] = parts[key] ? mergeGeo(parts[key], g) : g;
      } else if (o.name && o !== glb.scene && o.children.length === 0) {
        marks[o.name] = o.getWorldPosition(new THREE.Vector3());
      }
    });
    const [a, n, orm, e] = await Promise.all([
      loadTex(`assets/models/${kind}_a.webp`, true, renderer, size),
      loadTex(`assets/models/${kind}_n.webp`, false, renderer, size),
      loadTex(`assets/models/${kind}_orm.webp`, false, renderer, size),
      loadTex(`assets/models/${kind}_e.webp`, true, renderer, Math.min(size || 1024, 1024)),
    ]);
    const material = new THREE.MeshStandardMaterial({
      map: a, normalMap: n, roughnessMap: orm, metalnessMap: orm, roughness: 1, metalness: 1,
      emissiveMap: e, emissive: new THREE.Color(1, 1, 1), emissiveIntensity: emissive * 8.0, envMapIntensity: envMap,
    });
    material.normalScale.set(1, -1);
    // nozzle glow (orange emission) follows the throttle: uBurner set per frame
    const burnU = { value: 0.25 };
    material.userData.burner = burnU;
    material.onBeforeCompile = (sh) => {
      sh.uniforms.uBurner = burnU;
      sh.fragmentShader = sh.fragmentShader
        .replace('#include <common>', '#include <common>\nuniform float uBurner;')
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
          { float orange = smoothstep(0.08, 0.3, totalEmissiveRadiance.r - totalEmissiveRadiance.b) * step(totalEmissiveRadiance.g, totalEmissiveRadiance.r * 0.75);
            totalEmissiveRadiance *= mix(1.0, uBurner, orange); }`);
    };
    enableSkyFog(material);
    let radius = 1;
    for (const g of Object.values(parts)) { g.computeBoundingSphere(); radius = Math.max(radius, g.boundingSphere.radius); }
    return { kind, parts, material, marks, radius };
  })();
  cache.set(key, p);
  return p;
}

function mergeGeo(a, b) {
  // tiny merge for meshes split into primitives (same attribute layout)
  const out = new THREE.BufferGeometry();
  for (const name of Object.keys(a.attributes)) {
    const A = a.attributes[name], B = b.attributes[name];
    if (!B) continue;
    const arr = new Float32Array(A.count * A.itemSize + B.count * B.itemSize);
    arr.set(A.array, 0); arr.set(B.array, A.count * A.itemSize);
    out.setAttribute(name, new THREE.BufferAttribute(arr, A.itemSize));
  }
  const ia = a.index ? Array.from(a.index.array) : [...Array(a.attributes.position.count).keys()];
  const ib = b.index ? Array.from(b.index.array) : [...Array(b.attributes.position.count).keys()];
  const off = a.attributes.position.count;
  out.setIndex(ia.concat(ib.map((i) => i + off)));
  return out;
}

/** build a THREE.Group with one mesh per part, sharing the material */
export function instantiate(model, { castShadow = false } = {}) {
  const g = new THREE.Group();
  g.userData.parts = {};
  for (const [name, geo] of Object.entries(model.parts)) {
    const m = new THREE.Mesh(geo, model.material);
    m.name = name;
    m.frustumCulled = true;
    g.add(m);
    g.userData.parts[name] = m;
  }
  return g;
}
