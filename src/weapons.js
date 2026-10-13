// Guns (instanced tracers), guided missiles (proportional navigation), guided / heavy bombs, flares.
import * as THREE from 'three';
import { clamp } from './util.js';
import { enableSkyFog } from './fog.js';

const _v = new THREE.Vector3(), _v2 = new THREE.Vector3(), _v3 = new THREE.Vector3(), _m = new THREE.Matrix4(), _q = new THREE.Quaternion();
const Z = new THREE.Vector3(0, 0, 1), UP = new THREE.Vector3(0, 1, 0);

function missileGeometry() {
  const parts = [];
  const body = new THREE.CylinderGeometry(0.1, 0.1, 3.0, 10); body.rotateX(Math.PI / 2); parts.push(body);
  const nose = new THREE.ConeGeometry(0.1, 0.55, 10); nose.rotateX(Math.PI / 2); nose.translate(0, 0, 1.77); parts.push(nose);
  for (let k = 0; k < 4; k++) {
    const f = new THREE.BoxGeometry(0.02, 0.42, 0.36); f.translate(0, 0.25, -1.3); f.rotateZ(k * Math.PI / 2 + Math.PI / 4); parts.push(f);
    const c = new THREE.BoxGeometry(0.02, 0.22, 0.25); c.translate(0, 0.15, 0.6); c.rotateZ(k * Math.PI / 2 + Math.PI / 4); parts.push(c);
  }
  return merge(parts);
}
function bombGeometry() {
  const parts = [];
  const b = new THREE.CylinderGeometry(0.22, 0.18, 2.4, 10); b.rotateX(Math.PI / 2); parts.push(b);
  const n = new THREE.SphereGeometry(0.22, 10, 6); n.translate(0, 0, 1.2); parts.push(n);
  for (let k = 0; k < 4; k++) { const f = new THREE.BoxGeometry(0.02, 0.5, 0.4); f.translate(0, 0.3, -1.05); f.rotateZ(k * Math.PI / 2); parts.push(f); }
  return merge(parts);
}
function merge(geos) {
  let n = 0; for (const g of geos) n += g.index ? g.index.count : g.attributes.position.count;
  const pos = [], nor = [];
  for (const g of geos) {
    const gi = g.index ? g.toNonIndexed() : g;
    pos.push(...gi.attributes.position.array); nor.push(...gi.attributes.normal.array);
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  return out;
}

export const WEAPON = {
  aam: { speed: 620, accel: 260, turn: 2.6, life: 7, dmg: 100, fuse: 14, air: true },
  sam: { speed: 500, accel: 190, turn: 1.6, life: 9, dmg: 26, fuse: 13, air: true },
  eaam: { speed: 540, accel: 220, turn: 1.5, life: 6.5, dmg: 26, fuse: 12, air: true },
  agm: { speed: 480, accel: 200, turn: 2.0, life: 12, dmg: 210, fuse: 20, air: false },
  gpb: { speed: 0, accel: 0, turn: 0.9, life: 40, dmg: 260, fuse: 26, air: false, bomb: true },
  mop: { speed: 0, accel: 0, turn: 0.6, life: 40, dmg: 900, fuse: 30, air: false, bomb: true, radius: 260 },
};

export class Weapons {
  constructor(scene, fx, audio) {
    this.scene = scene; this.fx = fx; this.audio = audio;
    this.missiles = []; this.bullets = []; this.flares = [];
    // missiles + bombs
    const mm = enableSkyFog(new THREE.MeshStandardMaterial({ color: 0xdedcd6, roughness: 0.45, metalness: 0.15 }));
    this.mslMesh = new THREE.InstancedMesh(missileGeometry(), mm, 96);
    this.mslMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mslMesh.frustumCulled = false; this.mslMesh.count = 0;
    scene.add(this.mslMesh);
    const bm = enableSkyFog(new THREE.MeshStandardMaterial({ color: 0x4a4f48, roughness: 0.6, metalness: 0.2 }));
    this.bombMesh = new THREE.InstancedMesh(bombGeometry(), bm, 64);
    this.bombMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.bombMesh.frustumCulled = false; this.bombMesh.count = 0;
    scene.add(this.bombMesh);
    // tracers (additive, layer 1)
    const tg = new THREE.CylinderGeometry(0.09, 0.05, 9, 5, 1, true); tg.rotateX(Math.PI / 2);
    const tm = new THREE.MeshBasicMaterial({ color: new THREE.Color(6, 3.6, 1.4), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
    this.tracer = new THREE.InstancedMesh(tg, tm, 480);
    this.tracer.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.tracer.frustumCulled = false; this.tracer.count = 0;
    this.tracer.layers.set(1);
    scene.add(this.tracer);
    this.etracer = new THREE.InstancedMesh(tg, new THREE.MeshBasicMaterial({ color: new THREE.Color(5, 1.2, 0.8), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }), 480);
    this.etracer.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.etracer.frustumCulled = false; this.etracer.count = 0;
    this.etracer.layers.set(1);
    scene.add(this.etracer);
  }

  clear() {
    for (const m of this.missiles) if (m.trail) m.trail.dead = true;
    this.missiles = []; this.bullets = []; this.flares = [];
  }

  /** fire a gun round from `shooter` (plane) at muzzle position */
  gun(shooter, muzzle, spread = 0.004, team = shooter.team) {
    const dir = shooter.forward(_v).clone();
    dir.x += (Math.random() - 0.5) * spread; dir.y += (Math.random() - 0.5) * spread; dir.z += (Math.random() - 0.5) * spread;
    dir.normalize();
    const vel = dir.multiplyScalar(1050).add(shooter.vel);
    this.bullets.push({ pos: muzzle.clone(), prev: muzzle.clone(), vel, life: 1.35, team, owner: shooter, dmg: shooter.isPlayer ? 7 : 1.6 });
  }

  /** AA gun round from a ship */
  flak(from, dir, team) {
    const vel = dir.clone().multiplyScalar(900);
    this.bullets.push({ pos: from.clone(), prev: from.clone(), vel, life: 2.6, team, owner: null, dmg: 1.4, flak: true });
  }

  launch(kind, owner, from, target, opts = {}) {
    const W = WEAPON[kind];
    const fwd = owner ? owner.forward(new THREE.Vector3()) : (opts.dir || UP.clone());
    const m = {
      kind, W, owner, team: owner ? owner.team : opts.team, target, pos: from.clone(), life: 0,
      vel: owner ? owner.vel.clone() : fwd.clone().multiplyScalar(80),
      speed: owner ? owner.speed : 80, dead: false, trail: null, armed: 0, dmgMul: opts.dmgMul ?? 1, decoyed: false,
      bomb: !!W.bomb, puffT: 0,
    };
    if (m.bomb) {
      m.vel.y -= 4;
    } else {
      m.vel.addScaledVector(fwd, 8);
      m.trail = this.fx.trails.create({ width: 1.6, grow: 3.2, life: kind === 'sam' ? 6 : 4.5, alpha: 0.55, minDist: 7 });
    }
    this.missiles.push(m);
    if (owner?.isPlayer) this.audio?.missileLaunch();
    else if (kind === 'sam') this.audio?.missileLaunch(0.5);
    return m;
  }

  flare(plane) {
    for (let i = 0; i < 4; i++) {
      const d = new THREE.Vector3((Math.random() - 0.5) * 2, -0.6 - Math.random(), -1).applyQuaternion(plane.quat).normalize();
      const f = { pos: plane.pos.clone(), vel: plane.vel.clone().multiplyScalar(0.6).addScaledVector(d, 40), life: 3.2, trail: this.fx.trails.create({ width: 1.2, grow: 2.2, life: 2.2, alpha: 0.5 }) };
      this.flares.push(f);
    }
    // decoy missiles chasing this plane
    for (const m of this.missiles) if (m.target === plane && !m.bomb && Math.random() < 0.85) { m.decoyed = true; m.target = null; }
    this.audio?.flare();
  }

  update(dt, world) {
    const fx = this.fx;
    // ---------------------------------------------------------------- missiles & bombs
    let nm = 0, nb = 0;
    for (const m of this.missiles) {
      if (m.dead) continue;
      m.life += dt;
      const W = m.W;
      if (m.bomb) {
        m.vel.y -= 9.81 * dt;
        m.vel.multiplyScalar(Math.exp(-0.02 * dt));
        if (m.target && m.target.alive) {
          // glide-steer horizontally towards the target
          const tp = m.target.pos;
          const tFall = Math.max(0.5, (m.pos.y - tp.y) / Math.max(5, -m.vel.y));
          const want = _v.set((tp.x + (m.target.vel?.x || 0) * tFall - m.pos.x) / tFall, 0, (tp.z + (m.target.vel?.z || 0) * tFall - m.pos.z) / tFall);
          m.vel.x += clamp(want.x - m.vel.x, -40 * dt * W.turn, 40 * dt * W.turn);
          m.vel.z += clamp(want.z - m.vel.z, -40 * dt * W.turn, 40 * dt * W.turn);
        }
      } else {
        // boost then coast, proportional navigation
        m.speed = Math.min(W.speed + (m.owner ? m.owner.speed * 0.5 : 0), m.speed + W.accel * dt);
        if (m.life > W.life * 0.75) m.speed *= Math.exp(-0.5 * dt);
        const dir = _v2.copy(m.vel).normalize();
        if (m.target && m.target.alive && m.life > 0.18) {
          const tp = m.target.pos, tv = m.target.vel || _v3.set(0, 0, 0);
          const rel = _v.copy(tp).sub(m.pos);
          const dist = rel.length();
          const tgo = dist / Math.max(100, m.speed);
          const aim = rel.addScaledVector(tv, tgo * 0.9).normalize();
          const turn = W.turn * (m.target.isPlayer ? world.difficultyMissile : 1) * (m.life < 0.6 ? 0.5 : 1);
          const ang = dir.angleTo(aim);
          if (ang > 1e-4) {
            const k = Math.min(1, (turn * dt) / ang);
            dir.lerp(aim, k).normalize();
          }
          // overshoot -> lose track
          if (ang > 1.45 && m.life > 1.0) m.target = null;
        } else if (m.decoyed) {
          dir.y -= dt * 0.4; dir.normalize();
        }
        m.vel.copy(dir).multiplyScalar(m.speed);
        // exhaust glow + smoke
        fx.flash(_v3.copy(m.pos).addScaledVector(dir, -1.8), 4.5, [7, 4.2, 2.2], 0.05);
        if (m.trail) fx.trails.push(m.trail, _v3.copy(m.pos).addScaledVector(dir, -2.0));
      }
      m.pos.addScaledVector(m.vel, dt);
      // hit tests
      let hit = null;
      if (!m.bomb) {
        if (m.target && m.target.alive && m.pos.distanceTo(m.target.pos) < W.fuse + (m.target.radius || 8) * 0.6) {
          // arcade end-game: a hard-turning player shakes off enemy missiles
          if (m.target.isPlayer && m.team !== 'blue') {
            const g = m.target.g || 1;
            const pMiss = clamp(0.3 + (g - 2) * 0.12 + (m.target.burner > 0.6 ? 0.05 : 0), 0.25, 0.8);
            if (Math.random() < pMiss) { m.target = null; m.decoyed = true; world.hudMsg('MISSILE EVADED', 'ok'); }
            else hit = m.target;
          } else hit = m.target;
        }
      } else if (m.pos.y <= (m.target?.pos.y ?? 0) + (m.target?.def?.ship ? 4 : 1) || m.pos.y < 0.5) {
        hit = 'ground';
      }
      if (hit) this.detonate(m, hit, world);
      else if (m.life > W.life || m.pos.y < 0) {
        if (m.pos.y < 0) fx.splash(m.pos, m.bomb ? 1.6 : 0.6);
        else fx.explosion(m.pos, 0.35);
        m.dead = true;
      }
      if (!m.dead) {
        const mesh = m.bomb ? this.bombMesh : this.mslMesh;
        const idx = m.bomb ? nb++ : nm++;
        if (idx < mesh.instanceMatrix.count) {
          _q.setFromUnitVectors(Z, _v.copy(m.vel).normalize());
          _m.compose(m.pos, _q, _v2.set(m.kind === 'mop' ? 2.2 : 1, m.kind === 'mop' ? 2.2 : 1, m.kind === 'mop' ? 2.2 : 1));
          mesh.setMatrixAt(idx, _m);
        }
      } else if (m.trail) { m.trail.emit = false; m.trail.dead = true; }
    }
    this.missiles = this.missiles.filter((m) => !m.dead);
    this.mslMesh.count = nm; this.mslMesh.instanceMatrix.needsUpdate = true;
    this.bombMesh.count = nb; this.bombMesh.instanceMatrix.needsUpdate = true;

    // ---------------------------------------------------------------- flares
    for (const f of this.flares) {
      f.life -= dt;
      f.vel.y -= 9.81 * dt * 0.4;
      f.vel.multiplyScalar(Math.exp(-1.2 * dt));
      f.pos.addScaledVector(f.vel, dt);
      fx.flash(f.pos, 9, [9, 6, 3], 0.06);
      fx.trails.push(f.trail, f.pos);
      if (f.life <= 0) { f.trail.emit = false; f.trail.dead = true; }
    }
    this.flares = this.flares.filter((f) => f.life > 0);

    // ---------------------------------------------------------------- bullets
    let nt = 0, ne = 0;
    const targets = world.planes;
    for (const b of this.bullets) {
      b.life -= dt;
      b.prev.copy(b.pos);
      b.vel.y -= 9.81 * dt;
      b.pos.addScaledVector(b.vel, dt);
      // segment vs sphere
      for (const p of targets) {
        if (!p.alive || p.team === b.team) continue;
        const r = (p.radius || 8) * (b.owner?.isPlayer ? 1.15 : 0.7);
        if (segSphere(b.prev, b.pos, p.pos, r)) { world.damage(p, b.dmg, b.owner, 'gun', b.pos); b.life = 0; fx.flash(b.pos, 4, [6, 4, 2], 0.08); break; }
      }
      if (b.life > 0 && b.team !== 'red') {
        for (const s of world.ships) {
          if (!s.alive || s.team === b.team) continue;
          if (shipHit(s, b.pos)) { world.damage(s, b.dmg * 0.7, b.owner, 'gun', b.pos); b.life = 0; fx.flash(b.pos, 5, [6, 4, 2], 0.08); break; }
        }
      }
      if (b.pos.y < 0) { if (Math.random() < 0.25) fx.puff(b.pos, { size: 2, size1: 7, life: 0.8, color: [1.2, 1.2, 1.25], alpha: 0.6, vel: new THREE.Vector3(0, 8, 0) }); b.life = 0; }
      if (b.life <= 0) continue;
      const mesh = b.team === 'red' ? this.etracer : this.tracer;
      const idx = b.team === 'red' ? ne++ : nt++;
      if (idx < 480) {
        _q.setFromUnitVectors(Z, _v.copy(b.vel).normalize());
        _m.compose(b.pos, _q, _v2.set(b.flak ? 2 : 1, b.flak ? 2 : 1, 1));
        mesh.setMatrixAt(idx, _m);
      }
    }
    this.bullets = this.bullets.filter((b) => b.life > 0);
    this.tracer.count = nt; this.tracer.instanceMatrix.needsUpdate = true;
    this.etracer.count = ne; this.etracer.instanceMatrix.needsUpdate = true;
  }

  detonate(m, hit, world) {
    m.dead = true;
    const fx = this.fx;
    if (hit === 'ground') {
      // bombs: area damage around the impact point
      const R = m.W.radius || 70;
      let any = false;
      for (const s of world.ships) {
        if (!s.alive) continue;
        const d = Math.hypot(s.pos.x - m.pos.x, s.pos.z - m.pos.z) - (s.def.ship ? 35 : 5);
        if (d < R) { world.damage(s, m.W.dmg * m.dmgMul * clamp(1.3 - d / R, 0.3, 1), m.owner, m.kind, m.pos); any = true; }
      }
      if (m.pos.y < 2) fx.splash(m.pos, m.kind === 'mop' ? 4 : 2);
      fx.explosion(new THREE.Vector3(m.pos.x, Math.max(m.pos.y, 6), m.pos.z), m.kind === 'mop' ? 3.2 : 1.5);
      this.audio?.explosion(m.kind === 'mop' ? 1.5 : 1, world.camDist(m.pos));
      if (!any && m.owner?.isPlayer) world.hudMsg('MISS', 'miss');
      return;
    }
    fx.explosion(m.pos, 0.6, hit.vel);
    world.damage(hit, m.W.dmg * m.dmgMul, m.owner, m.kind, m.pos);
    this.audio?.explosion(0.6, world.camDist(m.pos));
  }

  /** missiles currently homing on `plane` */
  incoming(plane) { return this.missiles.filter((m) => !m.dead && !m.bomb && m.target === plane); }
}

function segSphere(a, b, c, r) {
  const ab = _v.subVectors(b, a), ac = _v2.subVectors(c, a);
  const t = clamp(ac.dot(ab) / Math.max(ab.lengthSq(), 1e-6), 0, 1);
  const px = a.x + ab.x * t - c.x, py = a.y + ab.y * t - c.y, pz = a.z + ab.z * t - c.z;
  return px * px + py * py + pz * pz < r * r;
}

export function shipHit(s, p) {
  // capsule along the ship axis
  const L = s.half || 70;
  const fx = Math.sin(s.heading), fz = Math.cos(s.heading);
  const dx = p.x - s.pos.x, dz = p.z - s.pos.z;
  const along = clamp(dx * fx + dz * fz, -L, L);
  const qx = dx - fx * along, qz = dz - fz * along;
  return qx * qx + qz * qz < (s.beam || 12) ** 2 && p.y < (s.height || 25) && p.y > -5;
}
