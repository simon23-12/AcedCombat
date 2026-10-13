// Phone tilt (portrait, steering-wheel style) + on-screen combat buttons. Keyboard fallback for desktop.
import { clamp } from './util.js';

const D2R = Math.PI / 180;

export class Input {
  constructor() {
    this.steer = 0; this.pitch = 0;           // -1..1 (right / nose-up positive)
    this.sens = 1.0; this.invert = false;
    this.hasMotion = false;
    this._raw = { steer: 0, elev: 0, ok: false };
    this._neutral = { steer: 0, elev: 35 * D2R };
    this._needCal = true; this._calBuf = [];
    this.keys = new Set();
    this.hold = { gun: 0, boost: 0, brake: 0, msl: 0 };
    this.events = new Set();                   // one-shot: msl, sp, tgt, flare, pause
    this.enabled = true;
    this._bound = false;
  }

  bindButtons() {
    if (this._bound) return;
    this._bound = true;
    const hold = (id, key, ev) => {
      const el = document.getElementById(id);
      if (!el) return;
      const on = (e) => { e.preventDefault(); if (key) this.hold[key] = 1; if (ev) this.events.add(ev); el.classList.add('down'); try { el.setPointerCapture(e.pointerId); } catch (_) {} navigator.vibrate?.(6); };
      const off = (e) => { e.preventDefault(); if (key) this.hold[key] = 0; el.classList.remove('down'); };
      el.addEventListener('pointerdown', on);
      el.addEventListener('pointerup', off);
      el.addEventListener('pointercancel', off);
      el.addEventListener('lostpointercapture', off);
      el.addEventListener('contextmenu', (e) => e.preventDefault());
    };
    hold('b-gun', 'gun');
    hold('b-msl', 'msl', 'msl');
    hold('b-sp', null, 'sp');
    hold('b-tgt', null, 'tgt');
    hold('b-boost', 'boost');
    hold('b-brake', 'brake');
    hold('b-flare', null, 'flare');
    window.addEventListener('keydown', (e) => {
      if (this.keys.has(e.code)) return;
      this.keys.add(e.code);
      const map = { KeyF: 'msl', Enter: 'msl', KeyQ: 'sp', KeyE: 'tgt', KeyR: 'flare', Escape: 'pause', KeyP: 'pause' };
      if (map[e.code]) this.events.add(map[e.code]);
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => { this.keys.clear(); for (const k in this.hold) this.hold[k] = 0; });
  }

  consume(ev) { if (this.events.has(ev)) { this.events.delete(ev); return true; } return false; }
  clearEvents() { this.events.clear(); }

  /** must be called from a user gesture (iOS 13+ permission) */
  async requestMotion() {
    let granted = true;
    try {
      const reqs = [];
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') reqs.push(DeviceOrientationEvent.requestPermission());
      if (reqs.length) granted = (await Promise.all(reqs)).every((r) => r === 'granted');
    } catch (e) { granted = false; }
    this.motionGranted = granted;
    if (granted && !this._orientBound) {
      this._orientBound = true;
      window.addEventListener('deviceorientation', (e) => this._onOrient(e), true);
    }
    return granted;
  }

  _onOrient(e) {
    if (e.beta == null || e.gamma == null) return;
    const b = e.beta * D2R, g = e.gamma * D2R;
    const ux = -Math.sin(g) * Math.cos(b), uy = Math.sin(b), uz = Math.cos(g) * Math.cos(b);
    const r = this._raw;
    r.steer = Math.atan2(-ux, Math.max(uy, 0.05));       // wheel-style rotation about the screen normal
    r.elev = Math.asin(clamp(uz, -1, 1));                 // elevation of the screen normal
    r.ok = true;
    this.hasMotion = true;
  }

  calibrate() { this._needCal = true; this._calBuf = []; }

  update(dt) {
    let steer = 0, pitch = 0;
    const k = this.keys;
    if (this._raw.ok) {
      const r = this._raw;
      if (this._needCal) {
        this._calBuf.push([r.steer, r.elev]);
        if (this._calBuf.length >= 8) {
          let s = 0, e = 0; for (const [a, b] of this._calBuf) { s += a; e += b; }
          this._neutral.steer = s / this._calBuf.length;
          this._neutral.elev = e / this._calBuf.length;
          this._needCal = false;
        }
      }
      const ds = r.steer - this._neutral.steer;
      const de = r.elev - this._neutral.elev;
      const dz = 2.0 * D2R;
      const shape = (x, range) => { const a = Math.max(0, Math.abs(x) - dz) / range; return Math.sign(x) * Math.min(1, Math.pow(a, 1.2)); };
      steer = shape(ds, 28 * D2R / this.sens);
      pitch = shape(de, 24 * D2R / this.sens) * (this.invert ? 1 : -1);
    }
    const kx = (k.has('ArrowRight') || k.has('KeyD') ? 1 : 0) - (k.has('ArrowLeft') || k.has('KeyA') ? 1 : 0);
    const ky = (k.has('ArrowUp') || k.has('KeyW') ? 1 : 0) - (k.has('ArrowDown') || k.has('KeyS') ? 1 : 0);
    if (kx) steer = kx;
    if (ky) pitch = ky;
    if (!this.enabled) { steer = 0; pitch = 0; }
    const a = 1 - Math.exp(-dt * 12);
    this.steer += (steer - this.steer) * a;
    this.pitch += (pitch - this.pitch) * a;
    this.gunV = (this.hold.gun || k.has('Space')) && this.enabled ? 1 : 0;
    this.boostV = (this.hold.boost || k.has('ShiftLeft') || k.has('ShiftRight')) && this.enabled ? 1 : 0;
    this.brakeV = (this.hold.brake || k.has('ControlLeft') || k.has('KeyB')) && this.enabled ? 1 : 0;
  }
}
