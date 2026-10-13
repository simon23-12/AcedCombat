// AI pilots: lift-vector pursuit, missile / gun employment, missile evasion with flares, ground avoidance.
// Also ship behaviour (AA guns, SAMs).
import * as THREE from 'three';
import { clamp } from './util.js';

const _v = new THREE.Vector3(), _v2 = new THREE.Vector3(), _q = new THREE.Quaternion();

/** steer `plane` towards world point `p`: returns {rollCmd, pitchCmd} for Plane.update(mode 'ai') */
export function steerTo(plane, p, aggr = 1) {
  _q.copy(plane.quat).invert();
  const l = _v.subVectors(p, plane.pos).applyQuaternion(_q);           // body frame: +z fwd, +y up, -x right
  const lx = -l.x, ly = l.y, lz = l.z;
  const off = Math.atan2(Math.hypot(lx, ly), lz);                      // angle off the nose
  let rollCmd, pitchCmd;
  if (off < 0.06) {
    // nearly on the nose: fine aim + level the wings slowly
    const { bank } = plane.attitude();
    rollCmd = clamp(-bank * 0.8 + lx * 0.02, -0.4, 0.4);
    pitchCmd = clamp(ly * 0.01, -0.3, 0.4);
  } else if (off < 0.35 && ly < 0 && Math.abs(lx) < -ly * 1.5) {
    // slightly below the nose: push over instead of rolling inverted
    const { bank } = plane.attitude();
    rollCmd = clamp(-bank * 1.2 + lx * 0.004, -0.6, 0.6);
    pitchCmd = clamp(Math.atan2(ly, lz) * 3, -0.4, 0);
  } else {
    const want = Math.atan2(lx, ly);                                     // roll so the target is "above" the canopy
    rollCmd = clamp(want * 2.2, -1, 1) * aggr;
    const pull = Math.abs(want) < 0.6 ? 1 : Math.abs(want) < 1.4 ? 0.55 : 0.15;
    pitchCmd = clamp(off * 2.2, 0, 1) * pull * aggr;
  }
  return { rollCmd, pitchCmd };
}

export class PilotAI {
  constructor(plane, world, opts = {}) {
    this.p = plane;
    this.world = world;
    this.skill = opts.skill ?? 0.6;
    this.role = opts.role || 'fighter';     // fighter | bomber | drone | escort
    this.state = 'cruise';
    this.target = null;
    this.mslCd = 4 + Math.random() * 6;
    this.gunCd = 0;
    this.evadeT = 0;
    this.flares = opts.flares ?? (this.skill > 0.8 ? 4 : 1);
    this.wp = opts.waypoint ? opts.waypoint.clone() : null;
    this.orbitC = opts.orbit ? opts.orbit.clone() : null;
    this.alt = opts.alt ?? plane.pos.y;
    this.goal = opts.goal || null;          // bombers: entity to attack
    this.aggroDist = opts.aggro ?? 9000;
    this.thinkT = Math.random();
    this.lead = new THREE.Vector3();
    this.ctrl = { mode: 'ai', rollCmd: 0, pitchCmd: 0, yawCmd: 0, boost: false, brake: false, throttle: 0.55 };
  }

  pickTarget() {
    const w = this.world;
    let best = null, bd = Infinity;
    for (const q of w.planes) {
      if (!q.alive || q.team === this.p.team || q.def.ship) continue;
      let d = q.pos.distanceTo(this.p.pos);
      if (q.isPlayer) d *= this.p.team === 'red' ? 0.55 : 1;     // enemies love the player
      if (d < bd) { bd = d; best = q; }
    }
    return best;
  }

  update(dt) {
    const p = this.p, w = this.world, c = this.ctrl;
    if (!p.alive) return;
    this.thinkT -= dt;
    if (this.thinkT <= 0) {
      this.thinkT = 0.5 + Math.random() * 0.4;
      if (this.role === 'fighter' || this.role === 'escort') {
        if (!this.target || !this.target.alive || Math.random() < 0.1) this.target = this.pickTarget();
      }
    }
    // incoming missile? break!
    const inc = w.weapons.incoming(p);
    if (inc.length && this.role !== 'drone') {
      const m = inc[0];
      const d = m.pos.distanceTo(p.pos);
      if (d < 1800 && this.evadeT <= 0 && !m.evadeRolled) {
        m.evadeRolled = true;
        if (Math.random() > 0.2 + this.skill * 0.45) return this.fly(dt);
        this.evadeT = 2.2 + Math.random() * 1.5;
        this.evadeDir = Math.random() < 0.5 ? -1 : 1;
        if (this.flares > 0 && d < 1100 && Math.random() < 0.15 + this.skill * 0.45) { this.flares--; w.weapons.flare(p); }
      }
    }
    this.fly(dt);
  }

  fly(dt) {
    const p = this.p, w = this.world, c = this.ctrl;
    let tgtPoint = null, aggr = 0.6 + this.skill * 0.4;
    c.boost = false; c.brake = false; c.throttle = 0.55;
    if (this.evadeT > 0) {
      this.evadeT -= dt;
      // hard break turn perpendicular to the threat
      c.rollCmd = this.evadeDir * 1; c.pitchCmd = 1; c.boost = true;
      const { bank } = p.attitude();
      if (Math.abs(bank) > 1.3) c.rollCmd = -Math.sign(bank) * 0.3;
    } else if (this.role === 'bomber' || this.role === 'drone' || this.role === 'cruise') {
      if (this.goal && this.goal.alive !== false) {
        tgtPoint = _v2.copy(this.goal.pos); tgtPoint.y = this.alt;
      } else if (this.orbitC) {
        const a = Math.atan2(p.pos.z - this.orbitC.z, p.pos.x - this.orbitC.x) + 0.35;
        const R = this.orbitR || 1500;
        tgtPoint = _v2.set(this.orbitC.x + Math.cos(a) * R, this.alt, this.orbitC.z + Math.sin(a) * R);
      } else if (this.wp) tgtPoint = this.wp;
      aggr = 0.45;
    } else if (this.target) {
      const t = this.target;
      const dist = t.pos.distanceTo(p.pos);
      if (dist > this.aggroDist && this.orbitC) {
        const a = Math.atan2(p.pos.z - this.orbitC.z, p.pos.x - this.orbitC.x) + 0.4;
        tgtPoint = _v2.set(this.orbitC.x + Math.cos(a) * 1800, this.alt, this.orbitC.z + Math.sin(a) * 1800);
      } else {
        // lead pursuit
        const tof = clamp(dist / 900, 0, 1.5);
        this.lead.copy(t.pos).addScaledVector(t.vel, tof * (0.5 + this.skill * 0.5));
        tgtPoint = this.lead;
        if (dist > 2500) c.boost = true;
        if (dist < 500) c.brake = true;
        const fwd = p.forward(_v);
        const toT = _v2.subVectors(t.pos, p.pos).normalize();
        const off = Math.acos(clamp(fwd.dot(toT), -1, 1));
        // weapons
        this.mslCd -= dt; this.gunCd -= dt;
        const stealthMul = t.def.stealth ? t.def.stealth : 1;
        if (p.def.msl && this.mslCd <= 0 && dist < 3000 && dist > 450 && off < 0.4 && w.missilesAt(t) < (t.isPlayer ? w.maxIncoming : 2) && (!t.isPlayer || w.playerMslCd <= 0)) {
          if (t.isPlayer) w.playerMslCd = w.maxIncoming > 1 ? 3.5 : 6;
          if (Math.random() < 0.6 * stealthMul + 0.25) {
            const kind = t.isPlayer || t.team === 'blue' ? 'eaam' : 'aam';
            w.weapons.launch(kind, p, p.pos.clone().addScaledVector(fwd, 6).add(_v.set(0, -1.5, 0)), t, { dmgMul: p.team === 'blue' ? 0.45 : 1 });
            if (t.isPlayer) w.missileAlert();
          }
          this.mslCd = (this.skill > 0.8 ? 5 : 8) + Math.random() * 6;
        }
        if (p.def.gun && dist < 850 && off < 0.09 && this.gunCd <= 0) {
          this.gunCd = 0.07;
          if (Math.random() < 0.6) w.weapons.gun(p, p.pos.clone().addScaledVector(fwd, 9), 0.02);
        }
      }
    } else if (this.orbitC) {
      const a = Math.atan2(p.pos.z - this.orbitC.z, p.pos.x - this.orbitC.x) + 0.4;
      tgtPoint = _v2.set(this.orbitC.x + Math.cos(a) * 1600, this.alt, this.orbitC.z + Math.sin(a) * 1600);
    } else {
      tgtPoint = _v2.copy(p.pos).addScaledVector(p.forward(_v), 1000); tgtPoint.y = this.alt;
    }
    if (tgtPoint) {
      const s = steerTo(p, tgtPoint, aggr);
      c.rollCmd = s.rollCmd; c.pitchCmd = s.pitchCmd;
    }
    // ground / sea avoidance overrides everything
    const f = p.forward(_v);
    const minAlt = this.role === 'bomber' ? 400 : 260;
    if (p.pos.y < minAlt + Math.max(0, -f.y) * 900) {
      const up = _v2.copy(p.pos).addScaledVector(f.setY(0).normalize(), 600); up.y = p.pos.y + 500;
      const s = steerTo(p, up, 1);
      c.rollCmd = s.rollCmd; c.pitchCmd = Math.max(s.pitchCmd, 0.8);
    }
    // ceiling
    if (p.pos.y > 9000) c.pitchCmd = Math.min(c.pitchCmd, -0.2);
    p.update(dt, c);
  }
}

/** ships: drive straight, shoot AA at enemy planes in range, launch SAMs */
export class ShipAI {
  constructor(ship, world) {
    this.s = ship; this.world = world;
    this.aaT = 0; this.samT = 5 + Math.random() * 6;
    this.burst = 0;
  }
  update(dt) {
    const s = this.s, w = this.world;
    if (!s.alive) return;
    s.pos.x += Math.sin(s.heading) * s.speed * dt;
    s.pos.z += Math.cos(s.heading) * s.speed * dt;
    s.vel.set(Math.sin(s.heading) * s.speed, 0, Math.cos(s.heading) * s.speed);
    // nearest hostile plane
    let tgt = null, bd = 6500;
    for (const q of w.planes) {
      if (!q.alive || q.team === s.team) continue;
      const d = q.pos.distanceTo(s.pos);
      if (d < bd) { bd = d; tgt = q; }
    }
    if (!tgt) return;
    this.aaT -= dt; this.samT -= dt;
    if (bd < 2600 && this.aaT <= 0) {
      this.burst = this.burst > 0 ? this.burst - 1 : 8;
      this.aaT = this.burst > 0 ? 0.09 : 1.2 + Math.random();
      const from = _v.copy(s.pos); from.y += 18;
      const tof = bd / 900;
      const aim = _v2.copy(tgt.pos).addScaledVector(tgt.vel, tof).sub(from).normalize();
      aim.x += (Math.random() - 0.5) * 0.05; aim.y += (Math.random() - 0.5) * 0.05; aim.z += (Math.random() - 0.5) * 0.05;
      w.weapons.flak(from, aim.normalize(), s.team);
    }
    if (s.def.sam !== false && bd < 6000 && bd > 900 && this.samT <= 0 && w.missilesAt(tgt) < (tgt.isPlayer ? w.maxIncoming : 1)) {
      this.samT = 9 + Math.random() * 8;
      const from = _v.copy(s.pos); from.y += 14;
      w.weapons.launch('sam', null, from, tgt, { team: s.team, dir: new THREE.Vector3(0, 1, 0) });
      if (tgt.isPlayer) w.missileAlert();
    }
  }
}
