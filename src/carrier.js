// CVN-77: moving carrier with deck collision, catapult launches, arrested landings (wires / bolter / crash),
// glide-slope guidance for the HUD and parked aircraft on deck.
//
// Spec coordinates (assets/models/carrier.json) are Blender (x, y) with bow = -y; three.js local = (x, -y).
import * as THREE from 'three';
import { loadModel, instantiate } from './models.js';
import { clamp } from './util.js';

const _v = new THREE.Vector3(), _v2 = new THREE.Vector3();

export class Carrier {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.pos = new THREE.Vector3();
    this.heading = 0;
    this.speed = 9;
    this.alive = true;
    this.team = 'blue';
    this.hp = 3000; this.maxHp = 3000;
    this.def = { ship: true, name: 'CVN-77', hp: 3000 };
    this.half = 165; this.beam = 30; this.height = 60;
    this.radius = 170;
    this.vel = new THREE.Vector3();
  }

  async load(renderer, tier, planeModel) {
    const [model, spec] = await Promise.all([
      loadModel('carrier', renderer, { size: tier.shipTex }),
      fetch('assets/models/carrier.json').then((r) => r.json()),
    ]);
    this.model = model;
    this.spec = spec;
    this.deckZ = spec.deckZ;
    this.outline = spec.outline.map(([x, y]) => [x, -y]);
    this.cats = spec.cats.map(([[x0, y0], [x1, y1]]) => ({ a: new THREE.Vector3(x0, 0, -y0), b: new THREE.Vector3(x1, 0, -y1) }));
    this.wires = spec.wires.map(([[x0, y0], [x1, y1]]) => ({ a: new THREE.Vector3(x0, 0, -y0), b: new THREE.Vector3(x1, 0, -y1) }));
    const ld = spec.land;
    this.landDir = new THREE.Vector3(ld.dir[0], 0, -ld.dir[1]).normalize();          // stern -> bow along the angled deck
    this.landOrigin = new THREE.Vector3(ld.origin[0], 0, -ld.origin[1]);
    this.landHalf = ld.half;
    // touchdown aim point: between wire 2 and 3
    const w2 = this.wires[1], w3 = this.wires[2];
    this.aim = new THREE.Vector3().addVectors(w2.a, w2.b).add(w3.a).add(w3.b).multiplyScalar(0.25);
    this.aim.y = this.deckZ;
    const I = spec.island;
    this.island = { x0: I.x0, x1: I.x1, z0: -I.y1, z1: -I.y0, top: this.deckZ + 45 };

    const g = instantiate(model);
    this.group.add(g);
    const deckMesh = g.userData.parts.deck;
    if (deckMesh) {
      // deck: markings * Blender AO, no normal map
      const L = new THREE.TextureLoader();
      const t = await L.loadAsync('assets/models/carrier_deck.webp');
      t.colorSpace = THREE.SRGBColorSpace; t.flipY = false; t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter;
      const dm = new THREE.MeshStandardMaterial({ map: t, roughness: 0.82, metalness: 0.0, envMapIntensity: 0.6 });
      const { enableSkyFog } = await import('./fog.js');
      enableSkyFog(dm);
      deckMesh.material = dm;
    }
    // parked jets near the island
    if (planeModel) {
      const body = planeModel.parts.body, gear = planeModel.parts.gear;
      const spots = [[-24, -40, 2.4], [-24, -24, 2.4], [-23, -8, 2.3], [-24, 50, 2.5], [-23, 66, 2.4], [22, 110, -0.6], [26, 128, -0.7]];
      const im = new THREE.InstancedMesh(body, planeModel.material, spots.length);
      const ig = gear ? new THREE.InstancedMesh(gear, planeModel.material, spots.length) : null;
      const m = new THREE.Matrix4(), q = new THREE.Quaternion();
      spots.forEach(([x, z, yaw], i) => {
        q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
        m.compose(new THREE.Vector3(x, this.deckZ + 1.66, z), q, new THREE.Vector3(1, 1, 1));
        im.setMatrixAt(i, m); ig?.setMatrixAt(i, m);
      });
      this.group.add(im); if (ig) this.group.add(ig);
    }
    this.scene.add(this.group);
    return this;
  }

  place(x, z, heading, speed = 9) {
    this.pos.set(x, 0, z);
    this.heading = heading;
    this.speed = speed;
    this.sync();
  }

  fwd(out = new THREE.Vector3()) { return out.set(Math.sin(this.heading), 0, Math.cos(this.heading)); }

  sync() {
    this.group.position.copy(this.pos);
    this.group.rotation.set(0, this.heading, 0);
    this.group.updateMatrixWorld(true);
    this.fwd(this.vel).multiplyScalar(this.speed);
  }

  update(dt) {
    this.pos.addScaledVector(this.fwd(_v), this.speed * dt);
    this.sync();
  }

  toLocal(p, out = new THREE.Vector3()) {
    const c = Math.cos(this.heading), s = Math.sin(this.heading);
    const dx = p.x - this.pos.x, dz = p.z - this.pos.z;
    return out.set(dx * c - dz * s, p.y, dx * s + dz * c);
  }
  toWorld(l, out = new THREE.Vector3()) {
    const c = Math.cos(this.heading), s = Math.sin(this.heading);
    return out.set(this.pos.x + l.x * c + l.z * s, l.y, this.pos.z - l.x * s + l.z * c);
  }
  dirToWorld(l, out = new THREE.Vector3()) {
    const c = Math.cos(this.heading), s = Math.sin(this.heading);
    return out.set(l.x * c + l.z * s, l.y, -l.x * s + l.z * c);
  }

  onDeck(l) {
    // point in polygon (local x,z)
    const P = this.outline;
    let inside = false;
    for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
      const [xi, zi] = P[i], [xj, zj] = P[j];
      if ((zi > l.z) !== (zj > l.z) && l.x < ((xj - xi) * (l.z - zi)) / (zj - zi) + xi) inside = !inside;
    }
    return inside;
  }

  /** solid parts below / beside the deck (hull, island). Returns true if p collides. */
  collides(p) {
    const l = this.toLocal(p, _v);
    if (Math.abs(l.z) > 175 || Math.abs(l.x) > 50) return false;
    const I = this.island;
    if (l.x > I.x0 - 1 && l.x < I.x1 + 1 && l.z > I.z0 - 1 && l.z < I.z1 + 1 && l.y < I.top) return true;
    if (l.y < this.deckZ - 0.5 && l.y > -12 && this.onDeck(l)) return true;
    return false;
  }

  /** heading (world yaw) of a catapult */
  catYaw(i) {
    const c = this.cats[i];
    const d = _v.subVectors(c.b, c.a);
    return this.heading + Math.atan2(d.x, d.z);
  }

  landingYaw() { return this.heading + Math.atan2(this.landDir.x, this.landDir.z); }

  /** world position of a point on the glide path `dist` metres before the aim point (3.5 deg slope) */
  glidePoint(dist, slope = 3.5, out = new THREE.Vector3()) {
    const l = _v2.copy(this.aim).addScaledVector(this.landDir, -dist);
    l.y = this.deckZ + Math.tan(THREE.MathUtils.degToRad(slope)) * dist;
    return this.toWorld(l, out);
  }

  /** approach info for the HUD: distance along the path, lateral and vertical error (m) */
  approach(p) {
    const l = this.toLocal(p, _v);
    const rel = _v2.subVectors(l, this.aim);
    const along = -(rel.x * this.landDir.x + rel.z * this.landDir.z);       // metres before the aim point
    const lat = rel.x * this.landDir.z - rel.z * this.landDir.x;           // + = right of centreline (port side)
    const ideal = this.deckZ + Math.tan(THREE.MathUtils.degToRad(3.5)) * Math.max(along, 0);
    return { along, lat, vert: l.y - ideal, local: l };
  }

  /** index of the wire crossed when touching down at local point l (or -1) */
  wireAt(l) {
    for (let i = 0; i < this.wires.length; i++) {
      const w = this.wires[i];
      const mid = _v2.addVectors(w.a, w.b).multiplyScalar(0.5);
      const d = (l.x - mid.x) * this.landDir.x + (l.z - mid.z) * this.landDir.z;
      if (d > -3 && d < 14) {
        const lat = Math.abs((l.x - mid.x) * this.landDir.z - (l.z - mid.z) * this.landDir.x);
        if (lat < this.landHalf) return i;
      }
    }
    return -1;
  }
}
