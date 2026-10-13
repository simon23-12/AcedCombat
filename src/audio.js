// WebAudio: streamed music (HTMLAudio -> MediaElementSource, crossfades), decoded SFX samples, live-synthesised
// jet engine / wind / lock tones / missile alert, and radio voice playback with a band-passed "radio" bus.
import { clamp } from './util.js';

const MUSIC = { menu: 'assets/audio/music_menu.mp3', battle: 'assets/audio/music_battle.mp3', ace: 'assets/audio/music_ace.mp3',
  calm: 'assets/audio/music_calm.mp3', win: 'assets/audio/sting_win.mp3', lose: 'assets/audio/sting_lose.mp3' };
const SFX = ['gun', 'msl', 'boom1', 'boom2', 'splash', 'cat', 'trap', 'flare', 'hit'];

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.vol = { music: 0.7, sfx: 0.85, voice: 1.0 };
    this.buf = {};
    this.tracks = {};
    this.cur = null;
    this.ready = false;
  }

  /** call inside a user gesture */
  async start() {
    if (this.ctx) { try { await this.ctx.resume(); } catch (_) {} return; }
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (_) {}
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = this.ctx = new AC({ latencyHint: 'interactive' });
    try { await ctx.resume(); } catch (_) {}
    const b = ctx.createBuffer(1, 1, 22050); const s = ctx.createBufferSource(); s.buffer = b; s.connect(ctx.destination); s.start(0);
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -12; comp.ratio.value = 3.5; comp.attack.value = 0.005; comp.release.value = 0.25;
    comp.connect(ctx.destination);
    this.master = ctx.createGain(); this.master.connect(comp);
    this.musicBus = ctx.createGain(); this.musicBus.gain.value = this.vol.music; this.musicBus.connect(this.master);
    this.duck = ctx.createGain(); this.duck.connect(this.musicBus);
    this.sfx = ctx.createGain(); this.sfx.gain.value = this.vol.sfx; this.sfx.connect(this.master);
    this.voice = ctx.createGain(); this.voice.gain.value = this.vol.voice; this.voice.connect(this.master);
    const nb = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = nb.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    this.noise = nb;
    this._engine();
    this.ready = true;
    SFX.forEach((n) => this.load(n));
    if (!location.search.includes('nopause')) document.addEventListener('visibilitychange', () => { if (document.hidden) ctx.suspend(); else ctx.resume(); });
  }

  async load(name) {
    if (this.buf[name]) return this.buf[name];
    try {
      const ab = await (await fetch(`assets/audio/${name}.${name === 'gun' ? 'wav' : 'mp3'}`)).arrayBuffer();
      this.buf[name] = await new Promise((res, rej) => this.ctx.decodeAudioData(ab, res, rej));
    } catch (e) { console.warn('sfx', name, e); }
    return this.buf[name];
  }

  setVol(k, v) {
    this.vol[k] = v;
    if (!this.ctx) return;
    const node = k === 'music' ? this.musicBus : k === 'sfx' ? this.sfx : this.voice;
    node.gain.setTargetAtTime(v, this.ctx.currentTime, 0.1);
  }

  // ------------------------------------------------------------------ music
  music(name, { loop = true, fade = 1.5 } = {}) {
    if (!this.ctx) return;
    if (this.cur === name) return;
    const t = this.ctx.currentTime;
    if (this.cur && this.tracks[this.cur]) {
      const old = this.tracks[this.cur];
      old.g.gain.cancelScheduledValues(t);
      old.g.gain.setValueAtTime(old.g.gain.value, t);
      old.g.gain.linearRampToValueAtTime(0, t + fade);
      setTimeout(() => { if (this.cur !== old.name) old.el.pause(); }, fade * 1000 + 100);
    }
    this.cur = name;
    if (!name) return;
    let tr = this.tracks[name];
    if (!tr) {
      const el = new Audio(MUSIC[name]);
      el.crossOrigin = 'anonymous'; el.preload = 'auto'; el.loop = loop;
      el.setAttribute('playsinline', '');
      const src = this.ctx.createMediaElementSource(el);
      const g = this.ctx.createGain(); g.gain.value = 0;
      src.connect(g); g.connect(this.duck);
      tr = this.tracks[name] = { name, el, g };
    }
    tr.el.loop = loop;
    try { tr.el.currentTime = 0; } catch (_) {}
    tr.el.play().catch(() => {});
    tr.g.gain.cancelScheduledValues(t);
    tr.g.gain.setValueAtTime(0, t);
    tr.g.gain.linearRampToValueAtTime(1, t + fade * 0.6);
  }

  // ------------------------------------------------------------------ samples
  play(name, { gain = 1, rate = 1, pan = 0, detune = 0 } = {}) {
    if (!this.ready || !this.buf[name]) return null;
    const c = this.ctx;
    const s = c.createBufferSource(); s.buffer = this.buf[name]; s.playbackRate.value = rate; s.detune.value = detune;
    const g = c.createGain(); g.gain.value = gain;
    let out = g;
    if (pan && c.createStereoPanner) { const p = c.createStereoPanner(); p.pan.value = pan; g.connect(p); out = p; }
    s.connect(g); out.connect(this.sfx);
    s.start();
    return { s, g };
  }

  explosion(size = 1, dist = 0) {
    const att = clamp(1 - dist / 9000, 0.05, 1);
    this.play(Math.random() < 0.5 ? 'boom1' : 'boom2', { gain: (0.5 + 0.5 * Math.min(1, size)) * att, rate: 0.85 + Math.random() * 0.2 - (size > 1.4 ? 0.2 : 0) });
  }
  missileLaunch(g = 1) { this.play('msl', { gain: 0.8 * g, rate: 0.95 + Math.random() * 0.1 }); }
  flare() { this.play('flare', { gain: 0.7 }); }
  hit() { this.play('hit', { gain: 0.8, rate: 0.9 + Math.random() * 0.2 }); }

  /** continuous gun: call every frame with firing 0/1 */
  gun(firing) {
    if (!this.ready || !this.buf.gun) return;
    if (firing && !this.gunSrc) {
      const c = this.ctx;
      const s = c.createBufferSource(); s.buffer = this.buf.gun; s.loop = true;
      const g = c.createGain(); g.gain.value = 0.75;
      s.connect(g); g.connect(this.sfx); s.start();
      this.gunSrc = { s, g };
    } else if (!firing && this.gunSrc) {
      const { s, g } = this.gunSrc; const t = this.ctx.currentTime;
      g.gain.setTargetAtTime(0, t, 0.03); s.stop(t + 0.2);
      this.gunSrc = null;
    }
  }

  // ------------------------------------------------------------------ live synthesis
  _engine() {
    const c = this.ctx;
    const g = this.engGain = c.createGain(); g.gain.value = 0; g.connect(this.sfx);
    // turbine roar: filtered noise + low rumble + whine
    this.roar = c.createBufferSource(); this.roar.buffer = this.noise; this.roar.loop = true;
    this.roarLP = c.createBiquadFilter(); this.roarLP.type = 'lowpass'; this.roarLP.frequency.value = 600; this.roarLP.Q.value = 0.7;
    this.roarG = c.createGain(); this.roarG.gain.value = 0.6;
    this.roar.connect(this.roarLP); this.roarLP.connect(this.roarG); this.roarG.connect(g);
    this.rum = c.createOscillator(); this.rum.type = 'sawtooth'; this.rum.frequency.value = 42;
    this.rumLP = c.createBiquadFilter(); this.rumLP.type = 'lowpass'; this.rumLP.frequency.value = 160;
    const rg = c.createGain(); rg.gain.value = 0.22;
    this.rum.connect(this.rumLP); this.rumLP.connect(rg); rg.connect(g);
    this.whine = c.createOscillator(); this.whine.type = 'triangle'; this.whine.frequency.value = 1800;
    this.whineG = c.createGain(); this.whineG.gain.value = 0.0;
    this.whine.connect(this.whineG); this.whineG.connect(g);
    // afterburner crackle
    this.ab = c.createBufferSource(); this.ab.buffer = this.noise; this.ab.loop = true; this.ab.playbackRate.value = 0.5;
    this.abBP = c.createBiquadFilter(); this.abBP.type = 'bandpass'; this.abBP.frequency.value = 180; this.abBP.Q.value = 0.8;
    this.abG = c.createGain(); this.abG.gain.value = 0;
    this.ab.connect(this.abBP); this.abBP.connect(this.abG); this.abG.connect(g);
    // wind
    this.wind = c.createBufferSource(); this.wind.buffer = this.noise; this.wind.loop = true;
    this.windBP = c.createBiquadFilter(); this.windBP.type = 'bandpass'; this.windBP.frequency.value = 900; this.windBP.Q.value = 0.5;
    this.windG = c.createGain(); this.windG.gain.value = 0;
    this.wind.connect(this.windBP); this.windBP.connect(this.windG); this.windG.connect(this.sfx);
    [this.roar, this.rum, this.whine, this.ab, this.wind].forEach((n) => n.start());
    // tone generator for lock / alert
    this.tone = c.createOscillator(); this.tone.type = 'square'; this.tone.frequency.value = 1000;
    this.toneLP = c.createBiquadFilter(); this.toneLP.type = 'lowpass'; this.toneLP.frequency.value = 2400;
    this.toneG = c.createGain(); this.toneG.gain.value = 0;
    this.tone.connect(this.toneLP); this.toneLP.connect(this.toneG); this.toneG.connect(this.sfx);
    this.tone.start();
    this.alert = c.createOscillator(); this.alert.type = 'sawtooth'; this.alert.frequency.value = 900;
    this.alertG = c.createGain(); this.alertG.gain.value = 0;
    const alp = c.createBiquadFilter(); alp.type = 'lowpass'; alp.frequency.value = 2000;
    this.alert.connect(alp); alp.connect(this.alertG); this.alertG.connect(this.sfx);
    this.alert.start();
    this._tt = 0;
  }

  /** per frame. st: { on, speed01, boost, brake, g, lock: 0 none / 1 seeking / 2 locked, alert: 0/1/2 } */
  update(dt, st) {
    if (!this.ready) return;
    const c = this.ctx, t = c.currentTime;
    const on = st.on ? 1 : 0;
    const s = clamp(st.speed01, 0, 1.3);
    this.engGain.gain.setTargetAtTime(on * (0.55 + 0.25 * st.boost), t, 0.15);
    this.roarLP.frequency.setTargetAtTime(380 + s * 900 + st.boost * 1400, t, 0.1);
    this.roarG.gain.setTargetAtTime(0.35 + st.boost * 0.35, t, 0.1);
    this.rum.frequency.setTargetAtTime(36 + s * 22 + st.boost * 10, t, 0.1);
    this.whine.frequency.setTargetAtTime(1500 + s * 900 + st.boost * 500, t, 0.2);
    this.whineG.gain.setTargetAtTime(on * (0.012 + s * 0.012), t, 0.2);
    this.abG.gain.setTargetAtTime(on * st.boost * 0.9, t, 0.08);
    this.windBP.frequency.setTargetAtTime(500 + s * 1600, t, 0.1);
    this.windG.gain.setTargetAtTime(on * (Math.pow(s, 1.6) * 0.18 + clamp((st.g - 3) / 6, 0, 1) * 0.25), t, 0.15);
    // lock tones: seeking = slow beeps, locked = steady high tone
    this._tt += dt;
    let tg = 0, tf = 1000;
    if (st.lock === 1) { tg = (this._tt * 6) % 1 < 0.45 ? 0.05 : 0; tf = 980; }
    else if (st.lock === 2) { tg = 0.055; tf = 1560; }
    this.tone.frequency.setTargetAtTime(tf, t, 0.005);
    this.toneG.gain.setTargetAtTime(tg * on, t, 0.006);
    let ag = 0;
    if (st.alert) { const rate = st.alert === 2 ? 9 : 4.5; ag = (this._tt * rate) % 1 < 0.5 ? 0.07 : 0; this.alert.frequency.setTargetAtTime((this._tt * rate) % 2 < 1 ? 880 : 660, t, 0.004); }
    this.alertG.gain.setTargetAtTime(ag * on, t, 0.005);
  }

  silence() {
    if (!this.ready) return;
    const t = this.ctx.currentTime;
    this.engGain.gain.setTargetAtTime(0, t, 0.2); this.windG.gain.setTargetAtTime(0, t, 0.2);
    this.toneG.gain.setTargetAtTime(0, t, 0.01); this.alertG.gain.setTargetAtTime(0, t, 0.01);
    this.gun(false);
  }

  _blip(freq, dur = 0.06, gain = 0.06, type = 'square') {
    if (!this.ready) return;
    const c = this.ctx, t = c.currentTime;
    const o = c.createOscillator(); o.type = type; o.frequency.value = freq;
    const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(this.sfx); o.start(t); o.stop(t + dur + 0.02);
  }
  click() { this._blip(1400, 0.05, 0.05); }
  select() { this._blip(880, 0.07, 0.06); setTimeout(() => this._blip(1320, 0.09, 0.05), 60); }
  back() { this._blip(660, 0.07, 0.05); }

  // ------------------------------------------------------------------ radio voice
  async voiceLine(url) {
    if (!this.ready) return 0;
    const buf = await this.loadVoice(url);
    if (!buf) return 0;
    const c = this.ctx, t = c.currentTime;
    const s = c.createBufferSource(); s.buffer = buf;
    s.connect(this.voice);
    s.start(t + 0.02);
    // duck the music under the voice
    this.duck.gain.cancelScheduledValues(t);
    this.duck.gain.setTargetAtTime(0.45, t, 0.08);
    this.duck.gain.setTargetAtTime(1.0, t + buf.duration, 0.4);
    return buf.duration;
  }

  async loadVoice(url) {
    this.vcache = this.vcache || new Map();
    if (this.vcache.has(url)) return this.vcache.get(url);
    const p = fetch(url).then((r) => r.arrayBuffer()).then((ab) => new Promise((res, rej) => this.ctx.decodeAudioData(ab, res, rej))).catch(() => null);
    this.vcache.set(url, p);
    return p;
  }
}

/** queue of radio messages with subtitles; lines: { id, speaker, text, color } */
export class Radio {
  constructor(audio, hud) {
    this.audio = audio; this.hud = hud;
    this.q = []; this.busy = false; this.t = 0;
    this.lines = {};
  }
  async loadManifest() {
    try { this.lines = await (await fetch('assets/audio/voice/lines.json')).json(); } catch (_) { this.lines = {}; }
  }
  prefetch(ids) { if (!this.audio.ready) return; for (const id of ids) if (this.lines[id]) this.audio.loadVoice(this.lines[id].file); }
  say(id, prio = false) {
    const L = this.lines[id];
    if (!L) { console.warn('missing line', id); return; }
    if (prio) this.q.unshift(L); else this.q.push(L);
    if (this.q.length > 4) this.q.splice(1, this.q.length - 4);
  }
  clear() { this.q = []; this.busy = false; this.t = 0; this.hud.subtitle(null); }
  update(dt) {
    if (this.busy) {
      this.t -= dt;
      if (this.t <= 0) { this.busy = false; this.hud.subtitle(null); }
      return;
    }
    const L = this.q.shift();
    if (!L) return;
    this.busy = true;
    this.t = L.dur || 2.5;
    this.hud.subtitle(L.speaker, L.text, L.color);
    this.audio.voiceLine(L.file).then((d) => { if (d) this.t = d + 0.35; });
  }
}
