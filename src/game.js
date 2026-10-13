// The flying part of the game: world state, entities, player weapons & lock-on, damage, carrier operations,
// mission scripting API (async scripts with wait / until).
import * as THREE from 'three';
import { Plane, ChaseCam } from './flight.js';
import { PilotAI, ShipAI, steerTo } from './ai.js';
import { Weapons, WEAPON, shipHit } from './weapons.js';
import { makeAfterburner } from './fx.js';
import { loadModel, instantiate } from './models.js';
import { PLANES, ENEMIES, ENVS } from './data.js';
import { CLOUD_PRESETS } from './clouds.js';
import { fogU } from './fog.js';
import { clamp, lerp } from './util.js';

const _v = new THREE.Vector3(), _v2 = new THREE.Vector3(), _q = new THREE.Quaternion();
const D2R = Math.PI / 180;

class Abort extends Error {}

export class Game {
  constructor(ctx) {
    Object.assign(this, ctx);   // scene, camera, renderer, post, sky, clouds, ocean, fx, audio, radio, hud, input, tier, settings
    this.weapons = new Weapons(this.scene, this.fx, this.audio);
    this.chase = new ChaseCam(this.camera);
    this.sunLight = new THREE.DirectionalLight(0xffffff, 3);
    this.sunLight.position.set(0, 1, 0);
    this.scene.add(this.sunLight, this.sunLight.target);
    this.planes = []; this.ships = []; this.rings = [];
    this.running = false;
    this.paused = false;
    this.difficultyMissile = 0.95;
    this.maxIncoming = 2;
    this.views = new Set();
  }

  // ================================================================================== setup
  async setEnv(envKey, cloudKey) {
    const env = ENVS[envKey];
    this.env = env;
    if (this.envKey !== envKey) {
      await this.sky.load(env.sky, this.tier);
      this.envKey = envKey;
    }
    fogU.fogP.value.x = env.fog[0]; fogU.fogP.value.y = env.fog[1]; fogU.fogP.value.z = env.fog[2];
    const light = { sunDir: this.sky.sunDir, cloudSun: new THREE.Color(...env.cloudSun), ambTop: new THREE.Color(...env.ambTop), ambBot: new THREE.Color(...env.ambBot) };
    this.clouds.setPreset(CLOUD_PRESETS[cloudKey] || null, light);
    this.ocean.setEnv(this.sky, this.clouds);
    this.sunLight.color.copy(this.sky.sunCol);
    this.sunLight.intensity = env.sunI;
    this.sunLight.position.copy(this.sky.sunDir).multiplyScalar(1000);
    const g = env.grade, u = this.post.u;
    u.lift.value.set(...g.lift); u.gain.value.set(...g.gain); u.sat.value = g.sat; u.exposure.value = g.exposure;
    u.sunCol.value.copy(this.sky.sunCol);
    this.fx.setLight(env);
  }

  async start(mission, planeKey) {
    this.clear();
    this.mission = mission;
    this.planeKey = planeKey;
    this.time = 0; this.kills = 0; this.score = 0; this.hits = 0; this.shots = 0;
    this.result = null;
    this.timers = []; this.waits = [];
    this.abortToken = { aborted: false };
    this.outT = 0; this.alertCd = 0; this.chatCd = 6; this.hitCd = 0;
    this.maxIncoming = mission.maxIncoming || 1;
    this.difficultyMissile = mission.missileSkill || 0.92;
    await this.setEnv(mission.env, mission.clouds);
    // carrier
    this.carrier = null;
    if (mission.carrier) {
      this.carrier = this.carrierObj;
      this.carrier.place(mission.carrier.x ?? 0, mission.carrier.z ?? 0, (mission.carrier.heading ?? 0) * D2R, mission.carrier.speed ?? 9);
      this.carrier.group.visible = true;
      this.carrier.alive = true; this.carrier.hp = this.carrier.maxHp;
      this.ships.push(this.carrier);
      this.carrier.label = 'CVN-77';
    } else if (this.carrierObj) this.carrierObj.group.visible = false;
    // player
    const def = PLANES[planeKey];
    const p = new Plane(def, 'blue');
    p.isPlayer = true; p.label = '';
    p.maxHp = p.hp = def.hp;
    this.player = p;
    this.ammo = { primary: def.primary ? def.primary.count : def.msl, sp: def.sp ? def.sp.count : 0, flares: def.flares || 0 };
    this.primary = def.primary || (def.msl ? { id: 'MSL', name: 'MSL', kind: 'aam', multi: 1, range: 3600 } : null);
    this.special = def.sp || null;
    this.weapon = 'primary';
    this.pylonCd = [0, 0];
    this.spCd = 0;
    this.target = null; this.lockProgress = 0; this.locks = []; this.lockT = new Map();
    this.gunT = 0;
    await this.addPlaneView(p, def.model, true);
    this.planes.push(p);
    if (mission.start === 'carrier' && this.carrier) this.placeOnCatapult(0);
    else {
      const s = mission.startPos || { x: 0, y: 2500, z: -8000, heading: 0 };
      p.pos.set(s.x, s.y, s.z); p.setHeading((s.heading || 0) * D2R); p.speed = def.cruise;
      p.gearDown = false;
      this.state = 'air';
    }
    this.chase.init = false;
    this.running = true;
    this.paused = false;
    this.hud.show(true);
    this.hud.objective('');
    this.radio.clear();
    this.radio.prefetch(mission.voice || []);
    // music
    this.audio.music(mission.music || 'battle');
    // run the script
    const tok = this.abortToken;
    Promise.resolve().then(() => mission.run(this)).catch((e) => { if (!(e instanceof Abort)) console.error(e); });
    return tok;
  }

  clear() {
    if (this.abortToken) this.abortToken.aborted = true;
    for (const w of this.waits || []) w.reject(new Abort());
    this.waits = [];
    for (const e of [...this.planes, ...this.ships]) this.removeView(e);
    this.planes = []; this.ships = [];
    for (const r of this.rings) this.scene.remove(r.mesh);
    this.rings = [];
    this.weapons.clear();
    this.running = false;
    this.waypointPos = null;
    if (this.landing) for (const g of this.landing.gates) this.scene.remove(g.mesh);
    this.landing = null;
  }

  // ================================================================================== entities
  async addPlaneView(e, modelKey, player = false) {
    const model = await loadModel(modelKey, this.renderer, { size: player ? this.tier.heroTex : this.tier.aiTex });
    const g = instantiate(model);
    e.view = g; e.model = model;
    e.radius = Math.max(e.radius, model.radius * 0.55);
    g.userData.parts.gear && (g.userData.parts.gear.visible = false);
    // afterburners
    e.burners = [];
    if (e.def.burner !== 0) {
      for (const name of (e.def.engines || ['nozzle_L', 'nozzle_R'])) {
        const m = model.marks[name];
        if (!m) continue;
        const r = (e.def.nozzleScale || 1) * (modelKey === 'bomber' ? 0.55 : 0.5);
        const ab = makeAfterburner(r, (modelKey === 'bomber' ? 6 : 7.5) * (e.def.burner || 1));
        ab.position.copy(m);
        g.add(ab);
        e.burners.push(ab);
      }
    }
    e.tips = [model.marks.tip_L, model.marks.tip_R].filter(Boolean);
    e.vortex = null;
    this.scene.add(g);
    this.views.add(e);
    return e;
  }

  removeView(e) {
    if (e.view && e !== this.carrier) { this.scene.remove(e.view); }
    if (e.vortex) e.vortex.forEach((t) => { t.dead = true; t.emit = false; });
    if (e.smokeTrail) { e.smokeTrail.dead = true; e.smokeTrail.emit = false; }
    this.views.delete(e);
  }

  /** spawn an AI plane. type: ENEMIES key (red) or PLANES key (blue ally) */
  async spawnPlane(type, pos, heading = 0, opts = {}) {
    const ally = !!PLANES[type] && opts.team !== 'red';
    const base = ally ? PLANES[type] : ENEMIES[type];
    const def = { ...base, hp: opts.hp ?? base.hp, cruise: base.cruise, maxSpd: base.maxSpd, minSpd: base.minSpd ?? 60, accel: base.accel ?? 40,
      pitch: base.pitch, roll: base.roll, yaw: base.yaw ?? 0.4, msl: base.msl, gun: base.gun };
    const p = new Plane(def, ally ? 'blue' : 'red');
    p.pos.copy(pos); p.setHeading(heading * D2R); p.speed = def.cruise;
    p.kind = type; p.label = opts.label || ''; p.mission = !!opts.mission; p.score = base.score || 200;
    p.radius = def.big ? 24 : 10;
    await this.addPlaneView(p, base.model);
    p.ai = new PilotAI(p, this, { skill: opts.skill ?? (base.ace ? 0.95 : 0.55), role: opts.role || (type === 'bomber' ? 'bomber' : type === 'drone' ? 'drone' : 'fighter'),
      orbit: opts.orbit, alt: opts.alt ?? pos.y, goal: opts.goal, aggro: opts.aggro, waypoint: opts.waypoint });
    if (opts.orbitR) p.ai.orbitR = opts.orbitR;
    this.planes.push(p);
    return p;
  }

  async spawnShip(type, pos, heading = 0, opts = {}) {
    const base = ENEMIES[type];
    const model = await loadModel(base.model, this.renderer, { size: this.tier.shipTex });
    const g = instantiate(model);
    const s = { def: { ...base }, pos: pos.clone().setY(0), heading: heading * D2R, speed: opts.speed ?? 6, vel: new THREE.Vector3(), hp: opts.hp ?? base.hp, maxHp: opts.hp ?? base.hp,
      alive: true, team: opts.team || 'red', view: g, half: 76, beam: 10, height: 22, radius: 70, mission: !!opts.mission, label: opts.label || '', score: base.score, kind: type };
    s.ai = new ShipAI(s, this);
    this.scene.add(g);
    this.ships.push(s);
    this.views.add(s);
    return s;
  }

  ring(pos, yaw = 0, pitch = 0, r = 45) {
    const geo = new THREE.TorusGeometry(r, 1.6, 8, 48);
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.4, 2.2, 3.0), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    const m = new THREE.Mesh(geo, mat);
    m.position.copy(pos);
    m.rotation.set(-pitch * D2R, yaw * D2R, 0, 'YXZ');
    m.layers.set(1);
    this.scene.add(m);
    const n = new THREE.Vector3(0, 0, 1).applyEuler(m.rotation);
    const rg = { mesh: m, pos: pos.clone(), n, r, passed: false, prevSide: null, team: 'ring', alive: true, ring: true, def: {} };
    this.rings.push(rg);
    return rg;
  }

  // ================================================================================== scripting API
  wait(s) {
    const tok = this.abortToken;
    return new Promise((resolve, reject) => { this.waits.push({ t: this.time + s, resolve, reject, tok }); });
  }
  until(fn, timeout = Infinity) {
    const tok = this.abortToken;
    return new Promise((resolve, reject) => { this.waits.push({ fn, t: this.time + timeout, resolve, reject, tok }); });
  }
  say(id) { this.radio.say(id); }
  objective(t) { this.hud.objective(t); }
  waypoint(p) { this.waypointPos = p ? p.clone() : null; }
  alive(list) { return list.filter((e) => e.alive); }
  allDead(list) { return list.every((e) => !e.alive); }
  get enemies() { return [...this.planes, ...this.ships].filter((e) => e.alive && e.team === 'red'); }

  complete(bonusText) {
    if (this.result) return;
    this.result = { ok: true, time: this.time, score: this.score + Math.max(0, Math.round(3000 - this.time * 5)), kills: this.kills, bonusText };
    this.hud.message('MISSION ACCOMPLISHED', 'big ok', 4);
    this.audio.music('win', { loop: false, fade: 0.8 });
    this.endT = 4.5;
  }
  fail(reason = 'MISSION FAILED') {
    if (this.result) return;
    this.result = { ok: false, time: this.time, score: this.score, kills: this.kills, reason };
    this.hud.message(reason, 'big bad', 4);
    this.audio.music('lose', { loop: false, fade: 0.8 });
    this.endT = 4.5;
  }

  hudMsg(t, kind) { this.hud.message(t, kind, 1.3); }
  camDist(p) { return this.camera.position.distanceTo(p); }
  missilesAt(t) { let n = 0; for (const m of this.weapons.missiles) if (m.target === t && !m.dead && !m.bomb) n++; return n; }
  missileAlert() {
    if (this.alertCd <= 0) { this.alertCd = 14; if (Math.random() < 0.6) this.radio.say(Math.random() < 0.5 ? 'awacs_missile' : 'wing_missile'); }
  }

  // ================================================================================== damage
  damage(e, dmg, by, kind, at) {
    if (!e.alive) return;
    if (e.isPlayer) {
      if (this.godMode) return;
      e.hp -= dmg;
      this.post.u.flash.value = Math.max(this.post.u.flash.value, kind === 'gun' || kind === 'flak' ? 0.05 : 0.25);
      this.chase.shake = Math.max(this.chase.shake, kind === 'gun' ? 0.6 : 2.5);
      this.audio.hit();
      navigator.vibrate?.(kind === 'gun' ? 15 : 80);
      if (kind !== 'gun' && this.hitCd <= 0) { this.hitCd = 10; this.radio.say(e.hp > 40 ? 'wing_hit' : 'awacs_damage'); }
      if (e.hp <= 0) this.killPlayer('SHOT DOWN');
      return;
    }
    e.hp -= dmg;
    if (by?.isPlayer) { this.hits++; if (kind !== 'gun' && e.hp > 0) this.hudMsg('HIT', 'hit'); }
    if (e.hp <= 0) this.kill(e, by);
  }

  kill(e, by) {
    e.alive = false;
    const big = e.def.ship ? 2.6 : e.def.big ? 1.6 : 1;
    this.fx.explosion(e.pos, big, e.vel);
    this.audio.explosion(big, this.camDist(e.pos));
    if (by?.isPlayer) {
      this.kills++;
      this.score += e.score || 300;
      this.hudMsg('DESTROYED', 'kill');
      this.chase.shake = Math.max(this.chase.shake, 0.4);
      if (this.chatCd <= 0 && this.mission.chatter !== false) {
        this.chatCd = 9 + Math.random() * 6;
        const pool = e.def.ship ? ['awacs_ship', 'wing_nice'] : e.def.ace ? ['awacs_ace_down'] : ['wing_splash', 'awacs_splash', 'wing_nice', 'awacs_good'];
        this.radio.say(pool[Math.floor(Math.random() * pool.length)]);
      }
    }
    if (e.def.ship) {
      e.sinkT = 0;
    } else {
      e.wreckT = 0;
      e.wreckSpin = (Math.random() - 0.5) * 3;
      e.vel.y -= 10;
    }
  }

  killPlayer(reason) {
    const p = this.player;
    if (!p.alive) return;
    p.alive = false;
    this.fx.explosion(p.pos, 1.2, p.vel);
    this.audio.explosion(1.5, 0);
    this.audio.silence();
    p.wreckT = 0; p.wreckSpin = 2;
    navigator.vibrate?.([100, 60, 200]);
    this.fail(reason);
  }

  // ================================================================================== carrier ops
  placeOnCatapult(i) {
    const c = this.carrier, p = this.player, cat = c.cats[i];
    this.state = 'cat';
    this.catI = i; this.catT = 0; this.catHold = 0;
    p.gearDown = true; p.speed = 0; p.onDeck = c; p.hover = 0;
    const l = cat.a.clone(); l.y = c.deckZ + p.def.gearH;
    this.deckLocal = l;
    c.toWorld(l, p.pos);
    p.setHeading(c.catYaw(i), 0, 0);
  }

  beginLanding(optional = true) {
    this.landing = { optional, attempts: 0, done: false, gates: [] };
    // holographic approach gates along the 3.5 deg glide path (they move with the carrier)
    for (const d of [5200, 4200, 3300, 2500, 1800, 1200, 750, 400]) {
      const geo = new THREE.TorusGeometry(d > 2000 ? 34 : 24, 0.9, 6, 40);
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.4, 1.9, 0.5), transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false });
      const m = new THREE.Mesh(geo, mat);
      m.layers.set(1);
      this.scene.add(m);
      this.landing.gates.push({ d, mesh: m });
    }
    this.state = this.state === 'cat' ? 'cat' : 'air';
    document.getElementById('b-skip')?.classList.toggle('hidden', !optional);
  }

  updateCarrierOps(dt) {
    const c = this.carrier, p = this.player, inp = this.input;
    if (this.state === 'cat' || this.state === 'launch') {
      const cat = c.cats[this.catI];
      const L = cat.a.distanceTo(cat.b);
      const dirL = _v.subVectors(cat.b, cat.a).normalize();
      if (this.state === 'cat') {
        this.catHold = inp.boostV || this.autoPilot ? this.catHold + dt : 0;
        p.burner = lerp(p.burner, inp.boostV ? 1 : 0.15, 1 - Math.exp(-dt * 4));
        if (Math.random() < dt * 10) { const s = c.toWorld(_v2.copy(cat.a).addScaledVector(dirL, Math.random() * L).setY(c.deckZ + 0.5)); this.fx.puff(s, { size: 3, size1: 12, life: 1.6, color: [1.2, 1.2, 1.25], alpha: 0.35, rise: 3, vel: c.vel.clone() }); }
        if (this.catHold > 0.5) { this.state = 'launch'; this.catT = 0; this.audio.play('cat', { gain: 0.9 }); this.radio.say('cat_shoot'); }
        this.deckLocal.copy(cat.a).setY(c.deckZ + p.def.gearH);
      } else {
        const T = 2.3, a = 2 * L / (T * T);
        this.catT += dt;
        const s = Math.min(L, 0.5 * a * this.catT * this.catT);
        this.deckLocal.copy(cat.a).addScaledVector(dirL, s).setY(c.deckZ + p.def.gearH);
        p.burner = 1;
        for (let k = 0; k < 2; k++) this.fx.puff(c.toWorld(_v2.copy(this.deckLocal).setY(c.deckZ + 0.6)), { size: 4, size1: 16, life: 1.4, color: [1.2, 1.2, 1.25], alpha: 0.45, rise: 2, vel: c.vel.clone() });
        this.chase.shake = 0.5;
        if (s >= L - 0.01) {
          // airborne
          this.state = 'air';
          p.onDeck = null;
          p.speed = a * T + c.speed;
          p.setHeading(c.catYaw(this.catI), 7 * D2R, 0);
          this.gearUpT = 3;
          this.radio.say('tower_airborne');
          return;
        }
      }
      c.toWorld(this.deckLocal, p.pos);
      p.setHeading(c.catYaw(this.catI), 0, 0);
      p.vel.copy(c.vel);
      return true;
    }
    if (this.state === 'trap' || this.state === 'deck') {
      // rolling out on the deck (arrested or vertical landing)
      this.trapV = Math.max(0, this.trapV - dt * (this.state === 'trap' ? 34 : 12));
      this.deckLocal.addScaledVector(this.deckDir, this.trapV * dt);
      c.toWorld(this.deckLocal, p.pos);
      p.vel.copy(c.vel);
      p.burner = lerp(p.burner, 0, 1 - Math.exp(-dt * 3));
      p.speed = this.trapV;
      if (this.trapV <= 0.1 && !this.landing.done) {
        this.landing.done = true;
        this.score += 2500;
        this.hud.message(this.state === 'trap' ? `TRAPPED - WIRE ${this.wireN}` : 'LANDED', 'big ok', 3);
        this.radio.say(this.state === 'trap' ? 'lso_trap' : 'lso_vtol');
        this.landed = true;
      }
      return true;
    }
    return false;
  }

  checkTouchdown(dt) {
    const c = this.carrier, p = this.player;
    if (!c || this.state !== 'air') return;
    const l = c.toLocal(p.pos, _v);
    if (Math.abs(l.x) > 60 || Math.abs(l.z) > 180) return;
    const gearY = p.pos.y - (p.gearDown ? p.def.gearH : 1.0);
    if (gearY > c.deckZ + 0.4) return;
    if (!c.onDeck(l)) return;                                        // below deck level outside the outline -> hull check handles it
    const { pitch, bank } = p.attitude();
    const vs = p.vel.y - (p.hover > 0.5 ? 0 : 0);
    const relSpd = p.speed;
    const ok = p.gearDown && Math.abs(bank) < 0.45 && pitch > -0.22 && pitch < 0.35 && vs > -11;
    this.lastTouch = { bank: +bank.toFixed(2), pitch: +pitch.toFixed(2), vs: +vs.toFixed(1), spd: Math.round(relSpd), gear: p.gearDown };
    if (!ok) { this.killPlayer(p.gearDown ? 'CRASHED ON DECK' : 'GEAR UP LANDING'); return; }
    this.deckLocal = l.clone(); this.deckLocal.y = c.deckZ + p.def.gearH;
    const f = p.forward(_v2);
    this.deckDir = new THREE.Vector3(f.x, 0, f.z).normalize();
    // into carrier frame
    const cs = Math.cos(c.heading), sn = Math.sin(c.heading);
    this.deckDir.set(this.deckDir.x * cs - this.deckDir.z * sn, 0, this.deckDir.x * sn + this.deckDir.z * cs);
    if (p.hover > 0.5 || (p.def.vtol && relSpd < 70)) {
      this.state = 'deck'; this.trapV = Math.max(0, relSpd - c.speed); p.onDeck = c;
      return;
    }
    const w = c.wireAt(l);
    if (w >= 0 && p.def.hook && relSpd < 125) {
      this.state = 'trap'; this.wireN = w + 1; this.trapV = Math.max(0, relSpd - c.speed); p.onDeck = c;
      this.audio.play('trap', { gain: 1 });
      this.chase.shake = 1.5;
      navigator.vibrate?.(120);
      return;
    }
    // bolter / touch-and-go
    if (this.landing) this.landing.attempts++;
    this.hud.message(relSpd >= 125 ? 'TOO FAST - BOLTER' : 'BOLTER', 'warn', 2.5);
    this.radio.say('lso_bolter', true);
    p.pos.y = c.deckZ + p.def.gearH + 0.6;
    if (pitch < 0.05) p.setHeading(p.heading(), 0.08, 0);
  }

  // ================================================================================== player weapons
  curWeapon() { return this.weapon === 'sp' ? this.special : this.primary; }

  candidates(kind) {
    const out = [];
    const ground = kind === 'gpb' || kind === 'mop' || kind === 'agm';
    for (const e of this.planes) if (e.alive && e.team === 'red' && !ground) out.push(e);
    for (const e of this.ships) if (e.alive && e.team === 'red') out.push(e);
    return out;
  }

  updateTargeting(dt) {
    const p = this.player, w = this.curWeapon();
    const kind = w ? w.kind : 'aam';
    const cands = this.candidates(kind);
    const fwd = p.forward(_v);
    const score = (e) => {
      const d = e.pos.distanceTo(p.pos);
      const dir = _v2.subVectors(e.pos, p.pos).normalize();
      const ang = Math.acos(clamp(dir.dot(fwd), -1, 1));
      return d * (0.4 + ang * 1.6) * (e.mission ? 0.7 : 1);
    };
    if (this.input.consume('tgt') && cands.length) {
      const sorted = cands.slice().sort((a, b) => score(a) - score(b));
      const i = sorted.indexOf(this.target);
      this.target = sorted[(i + 1) % sorted.length];
      this.lockProgress = 0; this.locks = []; this.lockT.clear();
      this.audio.click();
    }
    if (!this.target || !this.target.alive || !cands.includes(this.target)) {
      this.target = cands.length ? cands.reduce((a, b) => (score(a) < score(b) ? a : b)) : null;
      this.lockProgress = 0;
    }
    // lock cone
    const range = w ? w.range || 3600 : 3600;
    const ground = kind === 'gpb' || kind === 'mop';
    const inCone = (e) => {
      const d = e.pos.distanceTo(p.pos);
      if (d > range * (e.def.ship && !ground ? 1.2 : 1)) return false;
      if (ground) {
        // bombs: target ahead and below, within a wide cone around the velocity vector projected down
        const flat = _v2.subVectors(e.pos, p.pos); flat.y = 0;
        const fl = flat.length();
        const ff = _v.copy(p.forward(_v)); ff.y = 0; ff.normalize();
        return fl < range && flat.normalize().dot(ff) > 0.55 && p.pos.y - e.pos.y > 150;
      }
      const dir = _v2.subVectors(e.pos, p.pos).normalize();
      return dir.dot(p.forward(_v)) > Math.cos(33 * D2R);
    };
    const multi = w?.multi || 1;
    if (multi > 1) {
      const inc = cands.filter(inCone).sort((a, b) => score(a) - score(b)).slice(0, multi);
      for (const e of inc) this.lockT.set(e, Math.min(1, (this.lockT.get(e) || 0) + dt / 0.4));
      for (const [e, v] of this.lockT) if (!inc.includes(e)) this.lockT.set(e, Math.max(0, v - dt * 2));
      this.locks = inc.filter((e) => this.lockT.get(e) >= 1);
      this.lockProgress = this.target ? (this.lockT.get(this.target) || 0) : 0;
    } else {
      const t = this.target;
      if (t && inCone(t)) this.lockProgress = Math.min(1, this.lockProgress + dt / 0.45);
      else this.lockProgress = Math.max(0, this.lockProgress - dt * 2.5);
      this.locks = t && this.lockProgress >= 1 ? [t] : [];
    }
  }

  firePlayer(dt) {
    const p = this.player, inp = this.input;
    this.pylonCd[0] -= dt; this.pylonCd[1] -= dt; this.spCd -= dt;
    if (inp.consume('sp') && this.special) {
      this.weapon = this.weapon === 'sp' ? 'primary' : 'sp';
      this.locks = []; this.lockT.clear(); this.lockProgress = 0;
      this.audio.select();
      this.hudMsg(this.curWeapon().name, 'info');
    }
    if (inp.consume('flare') && p.def.flares) {
      if (this.ammo.flares > 0) { this.ammo.flares--; this.weapons.flare(p); } else this.hudMsg('NO FLARES', 'warn');
    }
    // gun
    let firing = false;
    if (p.def.gun && inp.gunV && this.state === 'air') {
      firing = true;
      this.gunT -= dt;
      while (this.gunT <= 0) {
        this.gunT += 1 / 22;
        const gm = p.model.marks.gun || new THREE.Vector3(-1.5, 0.5, 3);
        const muzzle = _v.copy(gm).applyQuaternion(p.quat).add(p.pos);
        this.weapons.gun(p, muzzle, 0.0035);
        this.shots++;
        if (Math.random() < 0.5) this.fx.flash(muzzle.clone().addScaledVector(p.forward(_v2), 3), 3.2, [6, 4, 2], 0.03, p.vel);
      }
      this.chase.shake = Math.max(this.chase.shake, 0.18);
    }
    this.audio.gun(firing);
    // missiles / bombs
    if (inp.consume('msl') && this.state === 'air') {
      const w = this.curWeapon();
      if (!w) return;
      const isSp = this.weapon === 'sp';
      const left = isSp ? this.ammo.sp : this.ammo.primary;
      if (left <= 0) { this.hudMsg('NO AMMO', 'warn'); return; }
      if (isSp) {
        if (this.spCd > 0) return;
        const tgts = w.multi > 1 ? this.locks.slice(0, Math.min(w.multi, left)) : [this.locks[0] || null];
        if (w.multi > 1 && !tgts.length) tgts.push(null);
        tgts.forEach((t, i) => setTimeout(() => this.launchPlayer(w.kind, t, i), i * 90));
        this.ammo.sp -= Math.max(1, tgts.length);
        this.spCd = w.kind === 'mop' ? 6 : 4.5;
      } else {
        const pi = this.pylonCd[0] <= 0 ? 0 : this.pylonCd[1] <= 0 ? 1 : -1;
        if (pi < 0) return;
        this.pylonCd[pi] = w.kind === 'gpb' ? 1.1 : 2.2;
        this.launchPlayer(w.kind, this.locks[0] || null, pi);
        this.ammo.primary--;
      }
    }
  }

  launchPlayer(kind, target, side) {
    const p = this.player;
    if (!p.alive) return;
    const m = p.model.marks;
    let from;
    if (kind === 'gpb' || kind === 'mop') from = _v.copy(m.bay || new THREE.Vector3(0, -1.2, 0)).applyQuaternion(p.quat).add(p.pos);
    else from = _v.copy((side % 2 ? m.msl_R : m.msl_L) || new THREE.Vector3(side % 2 ? -2 : 2, -0.6, 0)).applyQuaternion(p.quat).add(p.pos);
    const k = kind === 'aam' && target?.def?.ship ? 'agm' : kind;
    this.weapons.launch(k, p, from.clone(), target, { dmgMul: kind === 'aam' && target?.def?.ship ? 0.5 : 1 });
  }

  /** debug autopilot (?auto): chase the current target, fire when locked, land when asked */
  autoCtrl(dt) {
    const p = this.player;
    let tp;
    const ring = this.rings.find((r) => !r.passed);
    if (ring) tp = ring.pos;
    else if (this.landing && this.carrier) {
      const a = this.carrier.approach(p.pos);
      if (a.along > 5600 || Math.abs(a.lat) > 900) tp = this.carrier.glidePoint(6000).setY(Math.max(500, this.carrier.glidePoint(6000).y));
      else tp = this.carrier.glidePoint(Math.max(-60, a.along - Math.max(250, a.along * 0.25)));
    } else if (this.target && this.target.alive) {
      tp = this.target.pos.clone();
      if (this.target.def.ship) tp.y = Math.max(900, p.pos.y);
    } else tp = p.pos.clone().add(new THREE.Vector3(0, 0, 3000));
    if (tp.y < 600 && !this.landing) tp.y = 600;
    if (this.landing) {
      this.input.hold.gun = 0;
      const l = _v.subVectors(tp, p.pos).applyQuaternion(_q.copy(p.quat).invert());
      return { mode: 'assist', steer: clamp(Math.atan2(-l.x, l.z) * 2.5, -1, 1), pitch: clamp(Math.atan2(l.y, l.z) * 5, -1, 1), boost: false, brake: p.speed > 82 };
    }
    const s = steerTo(p, tp, 1);
    const inc = this.weapons.incoming(p);
    if (inc.length && inc[0].pos.distanceTo(p.pos) < 1500) { s.rollCmd = 1; s.pitchCmd = 1; const { bank } = p.attitude(); if (Math.abs(bank) > 1.4) s.rollCmd = -0.3; }
    if (p.pos.y < 300 && !this.landing) s.pitchCmd = 1;
    this.autoFireT = (this.autoFireT || 0) - dt;
    if (this.locks.length && this.autoFireT <= 0) { this.input.events.add('msl'); this.autoFireT = 1.2; }
    this.input.hold.gun = this.target && this.target.alive && !this.target.def.ship && this.target.pos.distanceTo(p.pos) < 700 ? 1 : 0;
    return { mode: 'ai', rollCmd: s.rollCmd, pitchCmd: s.pitchCmd, yawCmd: 0, boost: !this.landing && this.target && this.target.pos.distanceTo(p.pos) > 3000, brake: !!this.landing };
  }

  // ================================================================================== per frame
  update(dt) {
    if (!this.running || this.paused) return;
    this.time += dt;
    const p = this.player, inp = this.input;
    // scripts
    for (const w of this.waits.slice()) {
      if (w.tok.aborted) continue;
      if ((w.fn && w.fn()) || this.time >= w.t) { this.waits.splice(this.waits.indexOf(w), 1); w.resolve(true); }
    }
    this.alertCd -= dt; this.chatCd -= dt; this.hitCd -= dt; this.playerMslCd = (this.playerMslCd || 0) - dt;

    // ------------------------------------------------ carrier
    if (this.carrier) this.carrier.update(dt);

    // ------------------------------------------------ player
    if (p.alive) {
      const onDeck = this.carrier && this.updateCarrierOps(dt);
      if (!onDeck) {
        let ctrl = { mode: this.settings.expert ? 'expert' : 'assist', steer: inp.steer, pitch: inp.pitch, boost: !!inp.boostV, brake: !!inp.brakeV };
        if (this.autoPilot) ctrl = this.autoCtrl(dt);
        if (p.hover > 0.5 && this.carrier) {
          const l = this.carrier.toLocal(p.pos, _v);
          if (this.carrier.onDeck(l) && l.y - this.carrier.deckZ < 12 && ctrl.pitch > -0.3) ctrl.pitch = -0.3;
        }
        p.update(dt, ctrl);
        this.checkTouchdown(dt);
      }
      // gear: auto up after launch, auto down on approach
      if (this.gearUpT > 0) { this.gearUpT -= dt; if (this.gearUpT <= 0) p.gearDown = false; }
      if (this.landing && this.state === 'air') {
        const a = this.carrier.approach(p.pos);
        this.approachInfo = (a.along > -100 && a.along < 9000 && Math.abs(a.lat) < 2500) ? { ...a, gear: p.gearDown, fast: p.speed > 115 && !p.def.vtol } : null;
        if (this.approachInfo && a.along < 4500 && p.pos.y < 900 && !p.gearDown) { p.gearDown = true; this.hudMsg('GEAR DOWN', 'info'); }
        if (p.gearDown && p.pos.y > 1400) p.gearDown = false;
        if (p.def.vtol && Math.abs(a.lat) < 300 && a.along < 1500) this.approachInfo = { ...a, gear: p.gearDown, fast: false };
      } else this.approachInfo = null;
      // collisions
      const groundY = 1.0;
      if (this.state === 'air' && p.pos.y < groundY + (p.gearDown ? p.def.gearH * 0.5 : 0)) {
        if (!this.carrier || !this.carrier.onDeck(this.carrier.toLocal(p.pos, _v))) { this.fx.splash(p.pos, 2); this.killPlayer('CRASHED'); }
      }
      if (this.state === 'air' && this.carrier && this.carrier.collides(p.pos)) this.killPlayer('CRASHED INTO CVN-77');
      for (const s of this.ships) if (s !== this.carrier && s.alive && shipHit(s, p.pos)) this.killPlayer('CRASHED');
      // boundary
      const area = this.mission.area || 30000;
      const c0 = this.mission.center || { x: 0, z: 0 };
      if (Math.hypot(p.pos.x - c0.x, p.pos.z - c0.z) > area || p.pos.y > 13000) {
        this.outT = (this.outT || 10) - dt;
        if (this.outT <= 0) this.killPlayer('LEFT THE OPERATIONAL AREA');
      } else this.outT = 0;
      if (this.state === 'air') { this.updateTargeting(dt); this.firePlayer(dt); }
      else { this.audio.gun(false); this.locks = []; }
    }

    // ------------------------------------------------ AI
    for (const e of this.planes) {
      if (e.alive) e.ai?.update(dt);
      else if (e.wreckT != null) this.updateWreck(e, dt);
    }
    for (const s of this.ships) {
      if (s === this.carrier) continue;
      if (s.alive) s.ai.update(dt);
      else if (s.sinkT != null) {
        s.sinkT += dt;
        s.pos.y -= dt * (0.6 + s.sinkT * 0.08);
        s.tilt = (s.tilt || 0) + dt * 0.02;
        if (Math.random() < dt * 3) this.fx.puff(_v.copy(s.pos).add(new THREE.Vector3((Math.random() - 0.5) * 80, 14, (Math.random() - 0.5) * 20)), { size: 18, size1: 60, life: 8, color: [0.3, 0.28, 0.27], alpha: 0.7, rise: 6 });
        if (s.sinkT < 3 && Math.random() < dt * 4) this.fx.explosion(_v.copy(s.pos).add(new THREE.Vector3((Math.random() - 0.5) * 100, 15, (Math.random() - 0.5) * 20)), 1.1);
        if (s.sinkT > 25) { this.removeView(s); s.sinkT = null; }
      }
    }
    this.planes = this.planes.filter((e) => e.alive || e.wreckT != null || e === p);
    this.ships = this.ships.filter((s) => s.alive || s.sinkT != null || s === this.carrier);

    // rings
    for (const r of this.rings) {
      if (r.passed) continue;
      r.mesh.rotation.z += dt * 0.6;
      const rel = _v.subVectors(p.pos, r.pos);
      const side = Math.sign(rel.dot(r.n));
      if (r.prevSide != null && side !== r.prevSide && rel.length() < r.r * 1.15) {
        r.passed = true; r.mesh.material.color.setRGB(0.6, 3, 0.8); this.audio.select(); this.hudMsg('GOOD', 'ok');
        setTimeout(() => { this.scene.remove(r.mesh); }, 400);
      }
      r.prevSide = side;
    }

    // ------------------------------------------------ weapons, fx
    this.weapons.update(dt, this);
    this.clouds.update(dt);

    // ------------------------------------------------ result timer
    if (this.result && this.endT > 0) {
      this.endT -= dt;
      if (this.endT <= 0) this.onEnd?.(this.result);
    }
  }

  updateWreck(e, dt) {
    e.wreckT += dt;
    e.vel.y -= 9.81 * dt;
    e.pos.addScaledVector(e.vel, dt);
    _q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), e.wreckSpin * dt); e.quat.multiply(_q);
    if (!e.smokeTrail) e.smokeTrail = this.fx.trails.create({ width: 3, grow: 6, life: 5, alpha: 0.6, minDist: 10 });
    this.fx.trails.push(e.smokeTrail, e.pos);
    if (Math.random() < dt * 20) this.fx.flash(e.pos, 10, [6, 3, 1], 0.1);
    if (e.pos.y < 0 || e.wreckT > 9) {
      if (e.pos.y < 0) this.fx.splash(e.pos, 1.5);
      e.wreckT = null;
      if (e !== this.player) this.removeView(e);
      else e.view.visible = false;
    }
  }

  /** sync meshes, trails, camera; called every frame (also while paused for the camera) */
  render(dt) {
    const p = this.player;
    for (const e of this.views) {
      if (!e.view) continue;
      if (e.def.ship) {
        if (e !== this.carrier) { e.view.position.copy(e.pos); e.view.rotation.set(e.tilt || 0, e.heading, (e.tilt || 0) * 0.5); }
        continue;
      }
      e.view.position.copy(e.pos);
      e.view.quaternion.copy(e.quat);
      const gear = e.view.userData.parts.gear;
      if (gear) gear.visible = !!e.gearDown;
      if (e.isPlayer && e.model.material.userData.burner) e.model.material.userData.burner.value = 0.02 + Math.max(0, e.burner - 0.25) * 1.3;
      if (e.alive && e.burner > 0.4 && e.burners.length && this.camera.position.distanceToSquared(e.pos) < 1500 * 1500) {
        const k = (e.burner - 0.4) / 0.6;
        for (const ab of e.burners) this.fx.flash(_v.copy(ab.position).add(_v2.set(0, 0, -1.2)).applyQuaternion(e.quat).add(e.pos), 2.2 + 3.5 * k, [2.6 * k, 1.5 * k, 1.2 * k], 0.03, e.vel);
      }
      for (const ab of e.burners) { ab.material.uniforms.power.value = e.alive ? clamp((e.burner - 0.22) * 1.35, 0, 1) : 0; ab.material.uniforms.time.value += dt; ab.scale.setScalar(0.6 + 0.5 * e.burner); }
      // wingtip vortices / vapour at high g
      if (e.alive && e.tips.length && this.camera.position.distanceToSquared(e.pos) < 2500 * 2500) {
        const k = clamp((e.g - 3.5) / 3.5, 0, 1) * clamp(e.speed / 150, 0, 1);
        if (!e.vortex && k > 0.05) e.vortex = e.tips.map(() => this.fx.trails.create({ width: 0.5, grow: 0.6, life: 1.4, alpha: 0.6, minDist: 4 }));
        if (e.vortex) e.tips.forEach((tp, i) => this.fx.trails.push(e.vortex[i], _v.copy(tp).applyQuaternion(e.quat).add(e.pos), k));
        if (k > 0.5 && e.isPlayer && Math.random() < dt * 30) {
          this.fx.puff(_v.set(0, 1.2, -2).applyQuaternion(e.quat).add(e.pos), { size: 4, size1: 9, life: 0.35, color: [1.3, 1.3, 1.35], alpha: 0.35 * k, vel: e.vel.clone().multiplyScalar(0.9), drag: 0 });
        }
      }
      // damage smoke
      if (e.alive && e.hp < e.maxHp * 0.5 && Math.random() < dt * 25) {
        this.fx.puff(_v.set(0, 0.5, -4).applyQuaternion(e.quat).add(e.pos), { size: 3, size1: 14, life: 2.2, color: [0.35, 0.33, 0.32], alpha: 0.6, vel: e.vel.clone().multiplyScalar(0.2) });
      }
    }
    // camera
    if (p) {
      this.chase.update(dt, p, p.def.bomber ? 1 : 1);
      if (!p.alive) {
        // orbit the wreck
        this.camera.lookAt(p.pos);
      }
    }
    if (this.landing && this.carrier) {
      const yaw = this.carrier.landingYaw(), pitch = THREE.MathUtils.degToRad(3.5);
      const a = this.player ? this.carrier.approach(this.player.pos).along : 1e9;
      for (const g of this.landing.gates) {
        this.carrier.glidePoint(g.d, 3.5, g.mesh.position);
        g.mesh.rotation.set(-pitch, yaw, 0, 'YXZ');
        g.mesh.visible = !this.landed && g.d < a + 50;
      }
    }
    this.ocean.update(dt, this.camera);
    // ocean wakes
    const sh = this.ocean.u.ships.value;
    let i = 0;
    for (const s of this.ships) {
      if (i >= sh.length) break;
      if (!s.alive && s !== this.carrier) continue;
      sh[i++].set(s.pos.x, s.pos.z, s.heading, s === this.carrier ? 165 : 75);
    }
    for (; i < sh.length; i++) sh[i].w = 0;
  }

  /** HUD state */
  hudState() {
    const p = this.player;
    const contacts = [];
    for (const e of this.planes) if (e.alive && e !== p && e.pos.distanceTo(p.pos) < 24000) contacts.push({ ent: e });
    for (const s of this.ships) if (s.alive && s !== this.carrier && s.pos.distanceTo(p.pos) < 30000) contacts.push({ ent: s });
    for (const r of this.rings) if (!r.passed) contacts.push({ ent: { pos: r.pos, team: 'blue', def: {}, label: 'GATE' } });
    if (this.landing && this.carrier && !this.landed) contacts.push({ ent: { pos: this.carrier.toWorld(this.carrier.aim, new THREE.Vector3()), team: 'blue', def: {}, label: 'CVN-77' } });
    const incoming = this.weapons.incoming(p);
    // gun pipper on the target when in gun range
    let gunPipper = null;
    const t = this.target;
    if (p.def.gun && t && t.alive && !t.def.ship) {
      const d = t.pos.distanceTo(p.pos);
      if (d < 1200) {
        const tof = d / 1050;
        gunPipper = _v2.copy(t.pos).addScaledVector(t.vel, tof).addScaledVector(p.vel, -tof * 0.0);
      }
    }
    return {
      camera: this.camera, player: p, contacts, target: this.target, locks: this.locks, lockProgress: this.lockProgress,
      incoming, gunPipper: gunPipper ? gunPipper.clone() : null, weapon: this.weapon, primary: this.primary, special: this.special, ammo: this.ammo,
      reload: [clamp(1 - this.pylonCd[0] / 2.2, 0, 1), clamp(1 - this.pylonCd[1] / 2.2, 0, 1)],
      carrier: this.carrier, waypoint: this.waypointPos, approach: this.approachInfo, outOfArea: this.outT > 0 ? this.outT : 0,
      pullUp: p.pos.y < 400 && p.forward(_v).y < -0.25 && p.alive && this.state === 'air' && !this.approachInfo, safeTop: this.safeTop || 0,
      radarRange: 9000,
    };
  }
}
