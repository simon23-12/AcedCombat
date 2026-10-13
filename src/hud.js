// Ace-Combat style HUD drawn on a 2D canvas over the WebGL view: pitch ladder, speed / altitude tapes, heading,
// target boxes with distance, lock reticles, missile warnings, radar, weapon / damage readouts, carrier approach
// guide. DOM handles messages and radio subtitles.
import * as THREE from 'three';
import { clamp } from './util.js';

const GREEN = '#8cff9a', GREEN_D = 'rgba(140,255,154,0.55)', RED = '#ff4a3d', YEL = '#ffd34a', BLUE = '#6fd0ff', WHITE = '#f2f6f8';
const _v = new THREE.Vector3(), _v2 = new THREE.Vector3();
const $ = (id) => document.getElementById(id);

export class HUD {
  constructor() {
    this.cv = $('hudcv');
    this.cx = this.cv.getContext('2d');
    this.msgEl = $('hud-msg');
    this.subEl = $('subs');
    this.objEl = $('obj');
    this.timerEl = $('timer');
    this.scoreEl = $('score');
    this.w = 1; this.h = 1; this.dpr = 1;
    this.msgT = 0;
    this.blink = 0;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.visible = false;
  }

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = window.innerWidth; this.h = window.innerHeight;
    this.cv.width = Math.round(this.w * this.dpr); this.cv.height = Math.round(this.h * this.dpr);
  }

  show(on) { this.visible = on; document.body.classList.toggle('flying', on); if (!on) this.cx.clearRect(0, 0, this.cv.width, this.cv.height); }

  message(text, kind = '', dur = 1.6) {
    const el = this.msgEl;
    el.textContent = text;
    el.className = 'show ' + kind;
    this.msgT = dur;
  }

  objective(text) { this.objEl.innerHTML = text || ''; this.objEl.classList.toggle('hidden', !text); }

  subtitle(speaker, text, color) {
    if (!text) { this.subEl.classList.add('hidden'); return; }
    this.subEl.classList.remove('hidden');
    this.subEl.innerHTML = `<b style="color:${color || BLUE}">${speaker}</b><span>${text}</span>`;
  }

  /** project world point to css px; returns {x,y,behind,on} */
  proj(p, camera) {
    _v.copy(p).project(camera);
    const behind = _v.z > 1;
    return { x: (_v.x * 0.5 + 0.5) * this.w, y: (-_v.y * 0.5 + 0.5) * this.h, behind, on: !behind && Math.abs(_v.x) < 1 && Math.abs(_v.y) < 1 };
  }

  update(dt, s) {
    if (this.msgT > 0) { this.msgT -= dt; if (this.msgT <= 0) this.msgEl.className = ''; }
    if (!this.visible) return;
    this.blink += dt;
    const c = this.cx, W = this.w, H = this.h;
    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    c.clearRect(0, 0, W, H);
    c.lineWidth = 1.4;
    c.font = '600 11px "Chakra Petch", ui-monospace, monospace';
    c.textBaseline = 'middle';
    c.shadowColor = 'rgba(0,0,0,0.65)'; c.shadowBlur = 3;
    const cam = s.camera, pl = s.player;
    const col = pl.hp / pl.maxHp < 0.35 && Math.sin(this.blink * 8) > 0 ? RED : GREEN;
    c.strokeStyle = col; c.fillStyle = col;

    // ------------------------------------------------ flight path marker + pitch ladder (centre)
    const cxp = W / 2, cyp = H * 0.44;
    const fpm = this.proj(_v2.copy(pl.pos).addScaledVector(pl.vel, 3.0), cam);
    if (!fpm.behind) this.fpm(c, fpm.x, fpm.y);
    this.ladder(c, s, cxp, cyp);
    // ------------------------------------------------ tapes
    const kmh = Math.round(pl.speed * 3.6);
    this.tape(c, W * 0.11, cyp, kmh, 50, 'SPEED', true);
    this.tape(c, W * 0.89, cyp, Math.round(pl.pos.y), 100, 'ALT', false);
    c.textAlign = 'center';
    c.font = '600 10px "Chakra Petch", monospace';
    const hd = ((THREE.MathUtils.radToDeg(pl.heading()) % 360) + 360) % 360;
    this.heading(c, W / 2, H * 0.19, hd);
    // G / throttle readouts
    c.textAlign = 'left';
    c.fillText(`G ${pl.g.toFixed(1)}`, W * 0.06, cyp + 92);
    c.fillText(pl.burner > 0.6 ? 'BOOST' : pl.throttle < 0.2 ? 'BRAKE' : 'THR', W * 0.06, cyp + 106);
    if (pl.stall > 0.1 && Math.sin(this.blink * 10) > 0) { c.fillStyle = RED; c.textAlign = 'center'; c.font = '700 15px "Chakra Petch", monospace'; c.fillText('STALL', W / 2, cyp + 70); c.fillStyle = col; }
    if (s.pullUp && Math.sin(this.blink * 10) > 0) { c.fillStyle = RED; c.textAlign = 'center'; c.font = '700 15px "Chakra Petch", monospace'; c.fillText('PULL UP', W / 2, cyp + 52); c.fillStyle = col; }
    if (pl.hover > 0.5) { c.fillStyle = BLUE; c.textAlign = 'center'; c.font = '700 13px "Chakra Petch", monospace'; c.fillText(`HOVER  VS ${pl.vs >= 0 ? '+' : ''}${pl.vs.toFixed(1)}`, W / 2, cyp + 88); c.fillStyle = col; }

    // ------------------------------------------------ targets
    this.targets(c, s, cam);
    // ------------------------------------------------ gun pipper
    if (s.gunPipper) this.pipper(c, s.gunPipper, cam);
    // ------------------------------------------------ weapon & damage readouts
    this.readouts(c, s);
    // ------------------------------------------------ radar
    const rr = Math.min(50, W * 0.12);
    this.radar(c, s, W - rr - 14, s.safeTop + 92 + rr, rr);
    // ------------------------------------------------ missile warning
    if (s.incoming.length) this.warning(c, s, cam);
    // ------------------------------------------------ approach guide
    if (s.approach) this.approachGuide(c, s.approach, cxp, cyp);
    // ------------------------------------------------ boundary
    if (s.outOfArea) {
      if (Math.sin(this.blink * 6) > -0.2) {
        c.fillStyle = RED; c.textAlign = 'center'; c.font = '700 14px "Chakra Petch", monospace';
        c.fillText('RETURN TO THE OPERATIONAL AREA', W / 2, H * 0.27);
        c.fillText(Math.ceil(s.outOfArea).toString(), W / 2, H * 0.27 + 18);
      }
    }
  }

  fpm(c, x, y) {
    c.beginPath(); c.arc(x, y, 6, 0, Math.PI * 2);
    c.moveTo(x - 16, y); c.lineTo(x - 6, y); c.moveTo(x + 6, y); c.lineTo(x + 16, y); c.moveTo(x, y - 6); c.lineTo(x, y - 12);
    c.stroke();
  }

  ladder(c, s, cx, cy) {
    const pl = s.player, cam = s.camera;
    const { pitch, bank } = pl.attitude();
    // horizon-relative ladder rotated by the camera roll
    const camUp = _v.set(0, 1, 0).applyQuaternion(cam.quaternion);
    const camR = _v2.set(1, 0, 0).applyQuaternion(cam.quaternion);
    const roll = Math.atan2(-camR.y, camUp.y);
    const fovPx = this.h / (2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)));
    const camPitch = Math.asin(clamp(new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion).y, -1, 1));
    c.save();
    c.translate(cx, cy);
    c.rotate(roll);
    c.beginPath(); c.rect(-this.w * 0.3, -this.h * 0.22, this.w * 0.6, this.h * 0.44); c.clip();
    c.textAlign = 'left';
    c.font = '600 9px "Chakra Petch", monospace';
    for (let d = -90; d <= 90; d += 10) {
      const y = -(THREE.MathUtils.degToRad(d) - camPitch) * fovPx * 0.98;
      if (Math.abs(y) > this.h * 0.24) continue;
      const w = d === 0 ? this.w * 0.16 : this.w * 0.08, gap = d === 0 ? 30 : 26;
      c.beginPath();
      if (d < 0) c.setLineDash([5, 4]); else c.setLineDash([]);
      c.moveTo(-gap - w, y); c.lineTo(-gap, y); c.moveTo(gap, y); c.lineTo(gap + w, y);
      if (d !== 0) { c.moveTo(-gap - w, y); c.lineTo(-gap - w, y + (d > 0 ? 6 : -6)); c.moveTo(gap + w, y); c.lineTo(gap + w, y + (d > 0 ? 6 : -6)); }
      c.stroke();
      if (d !== 0) c.fillText(Math.abs(d).toString(), gap + w + 4, y);
    }
    c.setLineDash([]);
    c.restore();
    // boresight
    const bs = this.proj(_v.copy(pl.pos).addScaledVector(pl.forward(_v2), 800), cam);
    if (!bs.behind) { c.beginPath(); c.moveTo(bs.x - 9, bs.y); c.lineTo(bs.x - 3, bs.y + 5); c.lineTo(bs.x, bs.y); c.lineTo(bs.x + 3, bs.y + 5); c.lineTo(bs.x + 9, bs.y); c.stroke(); }
  }

  tape(c, x, y, val, step, label, left) {
    const hgt = 150, px = hgt / (step * 6);
    c.save();
    c.beginPath(); c.rect(x - 34, y - hgt / 2, 68, hgt); c.clip();
    c.textAlign = left ? 'right' : 'left';
    c.font = '600 9px "Chakra Petch", monospace';
    const base = Math.floor(val / step) * step;
    for (let k = -4; k <= 4; k++) {
      const v = base + k * step;
      if (v < 0) continue;
      const yy = y - (v - val) * px;
      c.beginPath();
      const big = v % (step * 2) === 0;
      if (left) { c.moveTo(x + 14, yy); c.lineTo(x + 14 - (big ? 10 : 6), yy); } else { c.moveTo(x - 14, yy); c.lineTo(x - 14 + (big ? 10 : 6), yy); }
      c.stroke();
      if (big) c.fillText(v.toString(), left ? x + 1 : x - 1, yy);
    }
    c.restore();
    // value box
    c.font = '700 14px "Chakra Petch", monospace';
    c.textAlign = 'center';
    const bx = left ? x - 8 : x + 8;
    c.strokeRect(bx - 30, y - 11, 60, 22);
    c.fillText(val.toString(), bx, y + 1);
    c.font = '600 9px "Chakra Petch", monospace';
    c.fillText(label, bx, y - hgt / 2 - 10);
  }

  heading(c, x, y, hd) {
    const span = 60, px = this.w * 0.5 / span;
    c.save();
    c.beginPath(); c.rect(x - this.w * 0.25, y - 14, this.w * 0.5, 30); c.clip();
    for (let d = Math.floor((hd - span / 2) / 5) * 5; d <= hd + span / 2; d += 5) {
      const xx = x + (d - hd) * px;
      const n = ((d % 360) + 360) % 360;
      c.beginPath(); c.moveTo(xx, y + 6); c.lineTo(xx, y + (n % 10 === 0 ? -1 : 2)); c.stroke();
      if (n % 30 === 0) c.fillText(n === 0 ? 'N' : n === 90 ? 'E' : n === 180 ? 'S' : n === 270 ? 'W' : (n / 10).toString(), xx, y - 7);
    }
    c.restore();
    c.beginPath(); c.moveTo(x, y + 9); c.lineTo(x - 4, y + 15); c.lineTo(x + 4, y + 15); c.closePath(); c.fill();
  }

  targets(c, s, cam) {
    const pl = s.player;
    c.font = '600 9px "Chakra Petch", monospace';
    for (const t of s.contacts) {
      const e = t.ent;
      const pr = this.proj(e.pos, cam);
      const d = e.pos.distanceTo(pl.pos);
      const isTgt = e === s.target;
      const locked = s.locks.includes(e);
      const enemy = e.team !== pl.team;
      let colr = enemy ? (e.mission ? YEL : RED) : BLUE;
      if (pr.on) {
        const sz = clamp(1400 / Math.max(d, 1), 7, 22) * (e.def?.ship ? 1.6 : 1);
        c.strokeStyle = colr; c.fillStyle = colr;
        c.lineWidth = isTgt ? 2 : 1.3;
        if (enemy) {
          // square brackets
          const k = sz * 0.45;
          c.beginPath();
          c.moveTo(pr.x - sz, pr.y - sz + k); c.lineTo(pr.x - sz, pr.y - sz); c.lineTo(pr.x - sz + k, pr.y - sz);
          c.moveTo(pr.x + sz - k, pr.y - sz); c.lineTo(pr.x + sz, pr.y - sz); c.lineTo(pr.x + sz, pr.y - sz + k);
          c.moveTo(pr.x + sz, pr.y + sz - k); c.lineTo(pr.x + sz, pr.y + sz); c.lineTo(pr.x + sz - k, pr.y + sz);
          c.moveTo(pr.x - sz + k, pr.y + sz); c.lineTo(pr.x - sz, pr.y + sz); c.lineTo(pr.x - sz, pr.y + sz - k);
          c.stroke();
        } else {
          c.beginPath(); c.moveTo(pr.x, pr.y - sz); c.lineTo(pr.x + sz, pr.y); c.lineTo(pr.x, pr.y + sz); c.lineTo(pr.x - sz, pr.y); c.closePath(); c.stroke();
        }
        if (isTgt || d < 4000) {
          c.textAlign = 'left';
          c.fillText(`${Math.round(d)}`, pr.x + sz + 4, pr.y - 5);
          if (e.label) c.fillText(e.label, pr.x + sz + 4, pr.y + 6);
        }
        if (e.mission && enemy) { c.textAlign = 'center'; c.fillText('TGT', pr.x, pr.y - sz - 7); }
        if (isTgt) {
          // lock reticle: closes in as lock builds
          const lk = s.lockProgress;
          const r = locked ? sz + 4 : sz + 4 + (1 - lk) * 26;
          c.strokeStyle = locked ? RED : col2(lk);
          c.lineWidth = 2;
          c.beginPath(); c.moveTo(pr.x, pr.y - r); c.lineTo(pr.x + r, pr.y); c.lineTo(pr.x, pr.y + r); c.lineTo(pr.x - r, pr.y); c.closePath(); c.stroke();
          if (locked && Math.sin(this.blink * 14) > -0.3) { c.fillStyle = RED; c.textAlign = 'center'; c.font = '700 10px "Chakra Petch", monospace'; c.fillText('LOCK', pr.x, pr.y + r + 10); c.font = '600 9px "Chakra Petch", monospace'; }
        } else if (locked) {
          c.strokeStyle = RED; c.lineWidth = 2; c.beginPath(); c.arc(pr.x, pr.y, sz + 6, 0, Math.PI * 2); c.stroke();
        }
        if (e.maxHp && (isTgt || e.def?.ace || e.def?.ship) && e.hp < e.maxHp) {
          const bw = sz * 2;
          c.fillStyle = 'rgba(0,0,0,0.4)'; c.fillRect(pr.x - sz, pr.y + sz + 3, bw, 3);
          c.fillStyle = colr; c.fillRect(pr.x - sz, pr.y + sz + 3, bw * clamp(e.hp / e.maxHp, 0, 1), 3);
        }
      } else if (isTgt) {
        // off-screen arrow towards the target
        let dx = pr.x - this.w / 2, dy = pr.y - this.h * 0.44;
        if (pr.behind) { dx = -dx; dy = -dy; }
        const a = Math.atan2(dy, dx);
        const R = Math.min(this.w, this.h) * 0.3;
        const ax = this.w / 2 + Math.cos(a) * R, ay = this.h * 0.44 + Math.sin(a) * R;
        c.save(); c.translate(ax, ay); c.rotate(a);
        c.fillStyle = colr;
        c.beginPath(); c.moveTo(14, 0); c.lineTo(-6, -9); c.lineTo(-2, 0); c.lineTo(-6, 9); c.closePath(); c.fill();
        c.restore();
        c.fillStyle = colr; c.textAlign = 'center'; c.fillText(`${Math.round(d)}`, ax, ay + 16);
      }
    }
    c.lineWidth = 1.4; c.strokeStyle = GREEN; c.fillStyle = GREEN;
  }

  pipper(c, p, cam) {
    const pr = this.proj(p, cam);
    if (!pr.on) return;
    c.strokeStyle = GREEN;
    c.beginPath(); c.arc(pr.x, pr.y, 13, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.arc(pr.x, pr.y, 1.6, 0, Math.PI * 2); c.fill();
  }

  readouts(c, s) {
    const W = this.w, top = s.safeTop + 54;
    c.textAlign = 'left';
    c.font = '700 12px "Chakra Petch", monospace';
    const pl = s.player;
    const rows = [];
    if (pl.def.gun) rows.push(['GUN', '∞', s.weapon === 'gun']);
    if (s.primary) rows.push([s.primary.name, s.ammo.primary, s.weapon === 'primary']);
    if (s.special) rows.push([s.special.name, s.ammo.sp, s.weapon === 'sp']);
    if (pl.def.flares) rows.push(['FLR', s.ammo.flares, false]);
    rows.forEach(([n, v, on], i) => {
      const y = top + i * 17;
      c.fillStyle = on ? YEL : GREEN_D;
      c.fillText((on ? '▶ ' : '  ') + n.padEnd(5, ' ') + ' ' + v, 12, y);
    });
    // damage
    c.textAlign = 'right';
    const dmg = Math.round((1 - pl.hp / pl.maxHp) * 100);
    c.fillStyle = dmg > 65 ? RED : dmg > 30 ? YEL : GREEN;
    c.fillText(`DMG ${dmg}%`, W - 12, top);
    c.fillStyle = GREEN;
    if (s.reload) {
      c.font = '600 9px "Chakra Petch", monospace';
      s.reload.forEach((r, i) => { c.fillStyle = r >= 1 ? GREEN : GREEN_D; c.fillRect(W - 12 - 28 + i * 16, top + 10, 12 * r, 3); });
    }
  }

  radar(c, s, x, y, R) {
    const pl = s.player;
    const hd = pl.heading();
    const range = s.radarRange || 9000;
    c.save();
    c.globalAlpha = 0.9;
    c.fillStyle = 'rgba(6,24,18,0.45)';
    c.beginPath(); c.arc(x, y, R, 0, Math.PI * 2); c.fill();
    c.strokeStyle = GREEN_D; c.lineWidth = 1;
    c.beginPath(); c.arc(x, y, R, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.arc(x, y, R * 0.5, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.moveTo(x, y - R); c.lineTo(x, y + R); c.moveTo(x - R, y); c.lineTo(x + R, y); c.globalAlpha = 0.35; c.stroke(); c.globalAlpha = 0.9;
    const cs = Math.cos(hd), sn = Math.sin(hd);
    const plot = (p, colr, size, shape = 'dot') => {
      const dx = p.x - pl.pos.x, dz = p.z - pl.pos.z;
      // rotate so that the player's heading points up; screen right = player's right (-X)
      const fx = dx * sn + dz * cs, rx = -(dx * cs - dz * sn);
      let px = rx / range * R, py = -fx / range * R;
      const L = Math.hypot(px, py);
      if (L > R - 3) { px *= (R - 3) / L; py *= (R - 3) / L; }
      c.fillStyle = colr;
      if (shape === 'tri') { c.beginPath(); c.moveTo(x + px, y + py - size); c.lineTo(x + px + size, y + py + size); c.lineTo(x + px - size, y + py + size); c.closePath(); c.fill(); }
      else if (shape === 'sq') c.fillRect(x + px - size, y + py - size, size * 2, size * 2);
      else { c.beginPath(); c.arc(x + px, y + py, size, 0, Math.PI * 2); c.fill(); }
    };
    for (const t of s.contacts) {
      const e = t.ent;
      const enemy = e.team !== pl.team;
      plot(e.pos, enemy ? (e.mission ? YEL : RED) : BLUE, e.def?.ship ? 3.2 : 2.4, e.def?.ship ? 'sq' : enemy ? 'tri' : 'dot');
    }
    for (const m of s.incoming) plot(m.pos, Math.sin(this.blink * 20) > 0 ? RED : WHITE, 1.6);
    if (s.carrier) plot(s.carrier.pos, BLUE, 4, 'sq');
    if (s.waypoint) plot(s.waypoint, WHITE, 3);
    c.fillStyle = GREEN;
    c.beginPath(); c.moveTo(x, y - 5); c.lineTo(x + 4, y + 4); c.lineTo(x - 4, y + 4); c.closePath(); c.fill();
    c.restore();
  }

  warning(c, s, cam) {
    const W = this.w, H = this.h;
    const near = Math.min(...s.incoming.map((m) => m.pos.distanceTo(s.player.pos)));
    const fast = near < 1200;
    if (Math.sin(this.blink * (fast ? 22 : 12)) > -0.2) {
      c.fillStyle = RED; c.textAlign = 'center'; c.font = '700 16px "Chakra Petch", monospace';
      c.fillText('WARNING', W / 2, H * 0.245);
      c.font = '700 12px "Chakra Petch", monospace';
      c.fillText('MISSILE ALERT', W / 2, H * 0.245 + 17);
    }
    // direction arcs
    const pl = s.player;
    c.strokeStyle = RED; c.lineWidth = 3;
    const hd = pl.heading();
    for (const m of s.incoming) {
      const dx = m.pos.x - pl.pos.x, dz = m.pos.z - pl.pos.z;
      const a = Math.atan2(-(dx * Math.cos(hd) - dz * Math.sin(hd)), dx * Math.sin(hd) + dz * Math.cos(hd));
      const R = Math.min(W, H) * 0.36;
      c.beginPath(); c.arc(W / 2, H * 0.44, R, -Math.PI / 2 + a - 0.15, -Math.PI / 2 + a + 0.15); c.stroke();
    }
    c.lineWidth = 1.4;
  }

  approachGuide(c, a, cx, cy) {
    // ILS-style needles + meatball
    const W = this.w;
    c.strokeStyle = YEL; c.fillStyle = YEL;
    const sx = clamp(-a.lat / 40, -1, 1) * 70, sy = clamp(a.vert / 30, -1, 1) * 70;
    c.globalAlpha = 0.9;
    c.beginPath(); c.moveTo(cx + sx, cy - 70); c.lineTo(cx + sx, cy + 70); c.stroke();
    c.beginPath(); c.moveTo(cx - 70, cy + sy); c.lineTo(cx + 70, cy + sy); c.stroke();
    c.strokeRect(cx - 70, cy - 70, 140, 140);
    c.globalAlpha = 1;
    c.textAlign = 'center'; c.font = '700 11px "Chakra Petch", monospace';
    c.fillText(`CVN-77  ${(a.along / 1000).toFixed(1)} km`, cx, cy - 84);
    const hints = [];
    if (a.vert > 12) hints.push('HIGH'); else if (a.vert < -10) hints.push('LOW');
    if (a.lat > 10) hints.push('LEFT ◀'); else if (a.lat < -10) hints.push('▶ RIGHT');
    if (a.fast) hints.push('TOO FAST');
    if (!a.gear) hints.push('GEAR UP');
    c.fillText(hints.join('  ') || 'ON GLIDE PATH', cx, cy + 86);
    // meatball (vertical position = glide path error)
    const mx = W - 26, my = cy;
    c.fillStyle = '#4cff6a';
    c.fillRect(mx - 18, my - 1.5, 10, 3); c.fillRect(mx + 8, my - 1.5, 10, 3);
    const by = my + clamp(-a.vert / 6, -5, 5) * 9;
    c.fillStyle = a.vert < -14 ? RED : '#ffb02e';
    c.beginPath(); c.arc(mx, by, 5, 0, Math.PI * 2); c.fill();
    c.strokeStyle = GREEN; c.fillStyle = GREEN;
  }
}

function col2(k) { return k > 0.66 ? '#ffa23a' : YEL; }
