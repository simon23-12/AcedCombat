// Arcade flight model shared by the player and the AI, plus the chase camera.
//
// Body axes (three.js, like the glTF models): forward +Z, up +Y, pilot's right -X.
// Assisted mode (default, Ace Combat "standard"): tilt = bank angle target with automatic pull into the turn and
// auto-levelling; expert mode: tilt = roll rate. Pitch input is always a body pitch rate.
import * as THREE from 'three';
import { clamp, lerp } from './util.js';

const _q = new THREE.Quaternion(), _v = new THREE.Vector3(), _v2 = new THREE.Vector3();
const AX = new THREE.Vector3(1, 0, 0), AY = new THREE.Vector3(0, 1, 0), AZ = new THREE.Vector3(0, 0, 1);
const G = 9.81;

export class Plane {
  constructor(def, team = 'blue') {
    this.def = def;
    this.team = team;
    this.pos = new THREE.Vector3();
    this.quat = new THREE.Quaternion();
    this.vel = new THREE.Vector3();
    this.speed = def.cruise || 200;
    this.throttle = 0.55;
    this.hp = def.hp || 100;
    this.maxHp = this.hp;
    this.alive = true;
    this.g = 1;
    this.pitchRate = 0; this.rollRate = 0; this.yawRate = 0;
    this.burner = 0;          // 0..1 afterburner visual
    this.stall = 0;
    this.hover = 0;           // F-35B hover blend
    this.vs = 0;              // hover vertical speed
    this.gearDown = false;
    this.onDeck = null;       // carrier reference when rolling on the deck
    this.radius = def.big ? 22 : 9;
  }

  forward(out = new THREE.Vector3()) { return out.set(0, 0, 1).applyQuaternion(this.quat); }
  up(out = new THREE.Vector3()) { return out.set(0, 1, 0).applyQuaternion(this.quat); }
  right(out = new THREE.Vector3()) { return out.set(-1, 0, 0).applyQuaternion(this.quat); }

  /** bank (+ = right wing down) and pitch angles relative to the horizon */
  attitude() {
    const f = this.forward(_v), r = this.right(_v2);
    const pitch = Math.asin(clamp(f.y, -1, 1));
    const upY = new THREE.Vector3(0, 1, 0).applyQuaternion(this.quat).y;
    const bank = Math.atan2(-r.y, upY);
    return { pitch, bank };
  }

  heading() { const f = this.forward(_v); return Math.atan2(f.x, f.z); }

  setHeading(yaw, pitch = 0, roll = 0) {
    this.quat.setFromEuler(new THREE.Euler(-pitch, yaw, roll, 'YXZ'));
  }

  /**
   * ctrl: { mode: 'assist'|'expert'|'ai', steer, pitch, boost, brake, rollCmd, pitchCmd, throttle }
   */
  update(dt, ctrl) {
    const d = this.def;
    const { pitch: th, bank } = this.attitude();
    const v = this.speed;
    const spdF = clamp(0.35 + 0.75 * Math.min(1, v / (d.cruise * 0.85)) - Math.max(0, (v - d.cruise * 1.35) / d.maxSpd) * 0.6, 0.25, 1.1);
    let wp = 0, wr = 0, wy = 0;

    // ------------------------------------------------ hover (F-35B STOVL)
    const wantHover = d.vtol && ctrl.brake && v < 46 && !ctrl.boost;
    this.hover = clamp(this.hover + (wantHover || (this.hover > 0.5 && !ctrl.boost) ? dt * 0.9 : -dt * 0.7), 0, 1);
    if (this.hover > 0.02 && d.vtol) {
      // level the jet, yaw with steer, climb/sink with pitch input
      const lev = 2.5;
      wr = clamp((ctrl.steer * 0.25 - bank) * lev, -1.2, 1.2);
      wp = clamp((0.06 - th) * lev, -0.8, 0.8);
      wy = -ctrl.steer * 0.6;
      this.vs = lerp(this.vs, ctrl.pitch * 9, 1 - Math.exp(-dt * 2));
      const tgt = ctrl.brake ? 0 : 25;
      this.speed = Math.max(0, lerp(this.speed, tgt, 1 - Math.exp(-dt * 0.8)));
    } else {
      this.vs = lerp(this.vs, 0, 1 - Math.exp(-dt * 3));
      if (ctrl.mode === 'ai') {
        wr = clamp(ctrl.rollCmd, -1, 1) * d.roll;
        wp = clamp(ctrl.pitchCmd, -0.4, 1) * d.pitch * spdF;
        wy = clamp(ctrl.yawCmd || 0, -1, 1) * (d.yaw || 0.4);
      } else if (ctrl.mode === 'expert') {
        wr = ctrl.steer * d.roll;
        wp = ctrl.pitch * d.pitch * spdF;
        wy = -ctrl.steer * d.yaw * 0.15;
      } else {
        // assisted: bank to an angle, pull automatically into the turn, auto level
        const vertical = Math.abs(th) > 1.15;
        const tgtBank = ctrl.steer * 1.38;
        if (vertical) wr = ctrl.steer * d.roll * 0.6;
        else {
          let e = tgtBank - bank;
          if (e > Math.PI) e -= Math.PI * 2; if (e < -Math.PI) e += Math.PI * 2;
          wr = clamp(e * 4.5, -d.roll, d.roll);
        }
        const pull = Math.abs(Math.sin(bank)) * Math.min(1, Math.abs(ctrl.steer) * 1.4) * 0.75 * (Math.abs(bank) < 1.75 ? 1 : 0);
        wp = clamp(ctrl.pitch + pull, -1, 1) * d.pitch * spdF;
        wy = -ctrl.steer * d.yaw * 0.35 * Math.cos(th);
      }
      // stall: nose drops, controls go mushy
      const stallSpd = d.minSpd * 1.02;
      this.stall = clamp((stallSpd - v) / (stallSpd * 0.3 + 1), 0, 1) * (this.onDeck ? 0 : 1);
      if (this.stall > 0) {
        wp = lerp(wp, -0.6 * Math.cos(bank) * Math.cos(th), this.stall * 0.8);
        wr *= 1 - this.stall * 0.5;
      }
      // throttle / speed
      let tgt = d.cruise;
      if (ctrl.throttle != null) tgt = lerp(d.minSpd * 1.25, d.maxSpd, ctrl.throttle);
      if (ctrl.boost) tgt = d.maxSpd;
      if (ctrl.brake) tgt = Math.max(d.minSpd * 1.1, d.cruise * 0.42);
      const acc = tgt > v ? d.accel * (ctrl.boost ? 1.2 : 0.7) : -d.accel * (ctrl.brake ? 1.4 : 0.5);
      let dv = clamp((tgt - v) * 1.2, -Math.abs(acc), Math.abs(acc));
      dv += -G * Math.sin(th) * 0.85;                    // trade altitude for speed
      dv -= Math.abs(wp) * v * 0.022;                   // turn bleed
      if (this.onDeck) dv = this.deckAccel ?? dv;
      this.speed = clamp(v + dv * dt, 0, d.maxSpd * 1.25);
    }
    this.burner = lerp(this.burner, ctrl.boost ? 1 : ctrl.brake ? 0 : 0.18, 1 - Math.exp(-dt * 5));
    this.throttle = ctrl.boost ? 1 : ctrl.brake ? 0.1 : 0.55;

    // smooth rates (inertia)
    const k = 1 - Math.exp(-dt * 7);
    this.pitchRate += (wp - this.pitchRate) * k;
    this.rollRate += (wr - this.rollRate) * k;
    this.yawRate += (wy - this.yawRate) * k;
    if (this.onDeck && !this.onDeck.launching) { this.pitchRate = Math.max(0, this.pitchRate) * (this.speed > d.minSpd ? 1 : 0); this.rollRate = 0; this.yawRate *= 0.2; }
    _q.setFromAxisAngle(AX, -this.pitchRate * dt); this.quat.multiply(_q);
    _q.setFromAxisAngle(AZ, this.rollRate * dt); this.quat.multiply(_q);
    _q.setFromAxisAngle(AY, this.yawRate * dt); this.quat.multiply(_q);
    this.quat.normalize();

    this.forward(this.vel).multiplyScalar(this.speed);
    if (this.hover > 0) this.vel.y += this.vs * this.hover;
    if (this.stall > 0) this.vel.y -= this.stall * 18;
    // arcade turn rates are high: scale the displayed / effect load factor into a believable 1..9 g
    this.g = clamp(1 + (this.speed * Math.abs(this.pitchRate)) / G * 0.33, -3, 9.5);
    this.pos.addScaledVector(this.vel, dt);
  }
}

// ------------------------------------------------------------------------------------------------------------
export class ChaseCam {
  constructor(camera) {
    this.cam = camera;
    this.pos = new THREE.Vector3();
    this.q = new THREE.Quaternion();
    this.init = false;
    this.shake = 0;
    this.fovBase = 62;
    this.dist = 1;
    this.mode = 'chase';
    this._t = 0;
  }

  update(dt, plane, scale = 1) {
    const c = this.cam;
    this._t += dt;
    const back = (plane.def.bomber ? 62 : 22) * scale, up = (plane.def.bomber ? 13 : 4.6) * scale;
    const off = _v.set(0, up, -back).applyQuaternion(plane.quat);
    const want = _v2.copy(plane.pos).add(off);
    // keep the camera above the water
    want.y = Math.max(want.y, 3);
    if (!this.init) { this.pos.copy(want); this.q.copy(plane.quat); this.init = true; }
    // orientation lags behind the plane -> sense of rotation
    this.q.slerp(plane.quat, 1 - Math.exp(-dt * 6.5));
    const off2 = new THREE.Vector3(0, up, -back).applyQuaternion(this.q);
    this.pos.copy(plane.pos).add(off2);
    this.pos.y = Math.max(this.pos.y, 3);
    c.position.copy(this.pos);
    // look slightly ahead of the plane
    const look = _v.set(0, up * 0.55, 30 * scale).applyQuaternion(this.q).add(plane.pos);
    const upv = _v2.set(0, 1, 0).applyQuaternion(this.q);
    c.up.copy(upv);
    c.lookAt(look);
    if (this.shake > 0) {
      const s = this.shake;
      c.rotateX((Math.random() - 0.5) * 0.012 * s);
      c.rotateY((Math.random() - 0.5) * 0.012 * s);
      this.shake = Math.max(0, s - dt * 3);
    }
    const spd = clamp((plane.speed - plane.def.cruise) / (plane.def.maxSpd - plane.def.cruise + 1), -0.5, 1);
    const fov = this.fovBase + spd * 9 + plane.burner * 2;
    c.fov = lerp(c.fov, fov, 1 - Math.exp(-dt * 3));
    c.updateProjectionMatrix();
  }
}
