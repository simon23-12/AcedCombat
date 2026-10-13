import * as THREE from 'three';
import { installFogChunks, makeSceneFog } from './fog.js';
import { Post } from './post.js';
import { Sky } from './sky.js';
import { Clouds } from './clouds.js';
import { Ocean } from './ocean.js';
import { FX, makeAfterburner } from './fx.js';
import { Input } from './input.js';
import { HUD } from './hud.js';
import { AudioEngine, Radio } from './audio.js';
import { Carrier } from './carrier.js';
import { Game } from './game.js';
import { loadModel, instantiate } from './models.js';
import { MISSIONS, rankFor } from './missions.js';
import { PLANES, PLANE_ORDER } from './data.js';
import { clamp } from './util.js';

const $ = (id) => document.getElementById(id);
const TIERS = {
  low:    { name: 'low', dpr: 1.0, msaa: 0, bloomLevels: 4, skyW: 2048, clouds: true, cloudScale: 3.0, cloudSteps: 26, particles: 500, trailPts: 2500, heroTex: 1024, aiTex: 512, shipTex: 1024 },
  medium: { name: 'medium', dpr: 1.5, msaa: 0, bloomLevels: 5, skyW: 2048, clouds: true, cloudScale: 2.6, cloudSteps: 34, particles: 800, trailPts: 4000, heroTex: 2048, aiTex: 1024, shipTex: 2048 },
  high:   { name: 'high', dpr: 2.0, msaa: 0, bloomLevels: 5, skyW: 4096, clouds: true, cloudScale: 2.2, cloudSteps: 42, particles: 1100, trailPts: 5000, heroTex: 2048, aiTex: 1024, shipTex: 2048 },
  ultra:  { name: 'ultra', dpr: 3.0, msaa: 0, bloomLevels: 6, skyW: 4096, clouds: true, cloudScale: 2.0, cloudSteps: 54, particles: 1500, trailPts: 6000, heroTex: 2048, aiTex: 1024, shipTex: 2048 },
};
const ORDER = ['low', 'medium', 'high', 'ultra'];
const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isTouch = navigator.maxTouchPoints > 0;
const qs = new URLSearchParams(location.search);
const LS = {
  get(k, d) { try { const v = localStorage.getItem('aced.' + k); return v == null ? d : JSON.parse(v); } catch (_) { return d; } },
  set(k, v) { try { localStorage.setItem('aced.' + k, JSON.stringify(v)); } catch (_) {} },
};
let tierName = qs.get('q') || LS.get('q', null) || (isIOS ? 'high' : 'high');
if (!TIERS[tierName]) tierName = 'high';
let downgraded = false;
if (LS.get('boot', 0) === 1 && !qs.get('q')) {
  const i = Math.max(0, ORDER.indexOf(tierName) - 1);
  if (i < ORDER.indexOf(tierName)) { tierName = ORDER[i]; downgraded = true; LS.set('q', tierName); }
}
LS.set('boot', 1);
setTimeout(() => LS.set('boot', 0), 15000);
const tier = TIERS[tierName];
const settings = Object.assign({ expert: false, sens: 1, invert: false, music: 0.7, sfx: 0.85, voice: 1, fps: false }, LS.get('settings', {}));
const progress = Object.assign({ cleared: {}, plane: 'f15' }, LS.get('progress', {}));
if (qs.get('unlock')) { MISSIONS.forEach((m) => { progress.cleared[m.id] ||= 'C'; }); }

function fatal(msg) { const f = $('fatal'); f.classList.remove('hidden'); f.textContent = 'ACED COMBAT could not start.\n\n' + msg; }
window.addEventListener('error', (e) => { if (!window.__booted) fatal(String(e.error?.stack || e.message)); });
window.addEventListener('unhandledrejection', (e) => { if (!window.__booted) fatal(String(e.reason?.stack || e.reason)); });
const setLoad = (p, txt) => { $('load-bar').firstElementChild.style.width = (p * 100).toFixed(0) + '%'; if (txt) $('load-txt').textContent = txt; };
const frame = () => new Promise((r) => requestAnimationFrame(() => r()));

function planeUnlocked(k) { const u = PLANES[k].unlock; return !u || !!progress.cleared[u]; }
function missionUnlocked(i) { return i === 0 || i === 1 || !!progress.cleared[MISSIONS[i - 1].id]; }

async function boot() {
  const canvas = $('gl');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance', stencil: false, depth: false });
  } catch (e) { return fatal('WebGL 2 is not available on this device/browser.\n' + e.message); }
  if (!renderer.capabilities.isWebGL2) return fatal('WebGL 2 is required.');
  renderer.info.autoReset = false;
  renderer.setClearColor(0x05080d, 1);
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  const hdrOK = renderer.extensions.has('EXT_color_buffer_float') || renderer.extensions.has('EXT_color_buffer_half_float');
  if (!hdrOK) return fatal('This device does not support half-float render targets.');
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    const i = Math.max(0, ORDER.indexOf(tier.name) - 1); LS.set('q', ORDER[i]);
    fatal('The GPU ran out of memory (WebGL context lost). Reload the page - the graphics level was lowered automatically.');
  });

  installFogChunks();
  const scene = new THREE.Scene();
  scene.fog = makeSceneFog();
  const camera = new THREE.PerspectiveCamera(62, 1, 1.0, 120000);
  scene.add(camera);
  const post = new Post(renderer, { msaa: tier.msaa, bloomLevels: tier.bloomLevels });
  const clouds = new Clouds(tier);

  // ------------------------------------------------------------------ resolution
  const state = { scale: isIOS ? 0.8 : 1.0, minScale: 0.5, lock: 0, w: 0, h: 0, fixed: qs.has('fixed') };
  if (state.fixed) state.scale = +qs.get('fixed') || 1;
  function applySize(force = false) {
    const dpr = Math.min(window.devicePixelRatio || 1, tier.dpr) * state.scale;
    const w = Math.max(64, Math.floor(window.innerWidth * dpr)), h = Math.max(64, Math.floor(window.innerHeight * dpr));
    if (!force && w === state.w && h === state.h) return;
    state.w = w; state.h = h;
    renderer.setPixelRatio(1);
    renderer.setSize(w, h, false);
    post.resize(w, h);
    clouds.resize(w, h);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  const checkOrientation = () => $('rotate').classList.toggle('hidden', !(window.innerWidth > window.innerHeight * 1.15 && isTouch && window.innerWidth < 1100));
  window.addEventListener('resize', () => { applySize(); checkOrientation(); });
  applySize(true);
  checkOrientation();

  // ------------------------------------------------------------------ loading
  setLoad(0.05, 'SKY');
  const sky = new Sky(renderer, scene);
  const ocean = new Ocean(scene);
  const fx = new FX(scene, tier);
  const audio = new AudioEngine();
  const hud = new HUD();
  const radio = new Radio(audio, hud);
  const input = new Input();
  input.sens = settings.sens; input.invert = settings.invert;
  const steps = [
    ['CLOUDS', () => clouds.load()],
    ['OCEAN', () => ocean.load()],
    ['EFFECTS', () => fx.load()],
    ['RADIO', () => radio.loadManifest()],
  ];
  let k = 0;
  for (const [name, fn] of steps) { setLoad(0.08 + 0.3 * (k++ / steps.length), name); await fn(); }
  setLoad(0.4, 'CARRIER');
  const carrier = new Carrier(scene);
  const parked = await loadModel('f35a', renderer, { size: 1024 });
  await carrier.load(renderer, tier, parked);
  carrier.group.visible = false;
  setLoad(0.65, 'AIRCRAFT');
  await loadModel(progress.plane in PLANES ? PLANES[progress.plane].model : 'f15', renderer, { size: tier.heroTex });

  const game = new Game({ scene, camera, renderer, post, sky, clouds, ocean, fx, audio, radio, hud, input, tier, settings });
  game.carrierObj = carrier;
  game.autoPilot = qs.has('auto');
  setLoad(0.8, 'SKY');
  await game.setEnv(qs.get('env') || 'sunset', qs.get('cl') || 'sea');
  setLoad(1, 'READY');
  await frame();

  // ------------------------------------------------------------------ showcase (menu background)
  const show = { group: null, key: null, t: 0, pos: new THREE.Vector3(0, 3350, 0), quat: new THREE.Quaternion(), burners: [], vortex: null };
  async function showPlane(key) {
    const m = await loadModel(PLANES[key].model, renderer, { size: tier.heroTex });
    if (show.group) scene.remove(show.group);
    show.group = instantiate(m);
    show.group.userData.parts.gear && (show.group.userData.parts.gear.visible = false);
    show.burners = [];
    if (PLANES[key].burner !== 0) for (const n of PLANES[key].engines) {
      if (!m.marks[n]) continue;
      const ab = makeAfterburner(0.5 * (PLANES[key].nozzleScale || 1), 7.5);
      ab.position.copy(m.marks[n]); show.group.add(ab); show.burners.push(ab);
    }
    show.model = m; show.key = key;
    scene.add(show.group);
  }
  await showPlane(progress.plane in PLANES && planeUnlocked(progress.plane) ? progress.plane : 'f15');

  function updateShowcase(dt) {
    if (!show.key) return;
    show.t += dt;
    const d = PLANES[show.key];
    const spd = d.cruise;
    show.pos.z += spd * dt;
    if (show.pos.z > 60000) show.pos.z = -60000;
    const bank = Math.sin(show.t * 0.25) * 0.35, pitch = Math.sin(show.t * 0.17) * 0.06;
    show.quat.setFromEuler(new THREE.Euler(-pitch, Math.sin(show.t * 0.11) * 0.08, bank, 'YXZ'));
    show.pos.y = 3350 + Math.sin(show.t * 0.17) * 30;
    if (show.group) {
      show.group.position.copy(show.pos);
      show.group.quaternion.copy(show.quat);
      for (const ab of show.burners) { ab.material.uniforms.power.value = 0.35 + 0.15 * Math.sin(show.t * 0.5); ab.material.uniforms.time.value += dt; }
    }
    const R = d.bomber ? 75 : 27;
    const a = show.t * 0.12 + 2.2;
    const camOff = new THREE.Vector3(Math.sin(a) * R, R * 0.18 + Math.sin(show.t * 0.2) * R * 0.08, Math.cos(a) * R);
    camera.position.copy(show.pos).add(camOff);
    camera.up.set(0, 1, 0);
    camera.lookAt(show.pos.clone().add(new THREE.Vector3(0, R * 0.12, 0)));
    camera.fov = 52; camera.updateProjectionMatrix();
    ocean.update(dt, camera);
    clouds.update(dt);
  }

  // ------------------------------------------------------------------ UI
  let mode = 'title';
  const screens = ['title', 'menu', 'campaign', 'briefing', 'hangar', 'settings', 'pause', 'debrief'];
  let prevScreen = 'menu';
  function showScreen(name) {
    for (const s of screens) $(s).classList.toggle('hidden', s !== name);
    if (name !== 'settings' && name !== 'pause') prevScreen = name;
  }
  document.querySelectorAll('.back').forEach((b) => b.addEventListener('click', () => {
    audio.back();
    const cur = screens.find((s) => !$(s).classList.contains('hidden'));
    if (cur === 'settings' && mode === 'paused') { showScreen('pause'); return; }
    if (cur === 'briefing') { showScreen(selMission === 0 ? 'menu' : 'campaign'); radio.clear(); audio.music('menu'); return; }
    showScreen('menu');
    audio.music('menu');
  }));

  $('press').addEventListener('click', async () => {
    await audio.start();
    audio.setVol('music', settings.music); audio.setVol('sfx', settings.sfx); audio.setVol('voice', settings.voice);
    const granted = await input.requestMotion();
    input.bindButtons();
    audio.music('menu');
    audio.select();
    mode = 'menu';
    showScreen('menu');
    $('menu-foot').textContent = `GRAPHICS ${tier.name.toUpperCase()} · ${granted ? 'TILT READY' : 'TILT UNAVAILABLE'}${!isTouch ? ' · DESKTOP: ARROWS/WASD, SPACE GUN, F MISSILE, Q SP, E TARGET, SHIFT BOOST, B BRAKE' : ''}`;
    if (!granted && isIOS) hud.message('ENABLE MOTION: SETTINGS › SAFARI › MOTION', 'warn', 5);
    try { screen.orientation?.lock?.('portrait').catch(() => {}); } catch (_) {}
  });

  // main menu
  document.querySelectorAll('.mi').forEach((b) => b.addEventListener('click', () => {
    audio.select();
    const go = b.dataset.go;
    if (go === 'campaign') { buildCampaign(); showScreen('campaign'); }
    else if (go === 'training') openBriefing(0);
    else if (go === 'hangar') { hangarI = Math.max(0, PLANE_ORDER.indexOf(show.key)); updateHangar(); showScreen('hangar'); audio.music('calm'); }
    else if (go === 'settings') { syncSettings(); showScreen('settings'); }
  }));

  function buildCampaign() {
    const el = $('mission-list');
    el.innerHTML = '';
    MISSIONS.forEach((m, i) => {
      if (i === 0) return;
      const unlocked = missionUnlocked(i);
      const b = document.createElement('button');
      b.className = 'mcard' + (unlocked ? '' : ' locked');
      b.innerHTML = `<span class="code">${m.code}</span><span class="tt">${m.title}</span><span class="rk">${progress.cleared[m.id] || (unlocked ? '' : 'LOCKED')}</span>`;
      if (unlocked) b.addEventListener('click', () => { audio.select(); openBriefing(i); });
      el.appendChild(b);
    });
  }

  let selMission = 0, selPlane = 'f15', planeChoices = [];
  function openBriefing(i) {
    selMission = i;
    const m = MISSIONS[i];
    $('br-code').textContent = m.code;
    $('br-title').textContent = m.title;
    $('br-text').textContent = m.brief;
    planeChoices = m.planes.filter(planeUnlocked);
    if (!planeChoices.length) planeChoices = [m.planes[0]];
    selPlane = planeChoices.includes(progress.plane) ? progress.plane : planeChoices[0];
    updateBriefPlane();
    showScreen('briefing');
    audio.music('calm');
    radio.clear();
    if (m.briefVoice) radio.say(m.briefVoice);
  }
  function statsHTML(d) {
    const L = { speed: 'SPEED', mobility: 'MOBILITY', stability: 'STABILITY', air: 'AIR-TO-AIR', ground: 'AIR-TO-GND', defense: 'DEFENSE' };
    return Object.entries(L).map(([k, n]) => `<span>${n}</span><i><b style="width:${Math.round(d.stats[k] * 100)}%"></b></i>`).join('');
  }
  function updateBriefPlane() {
    const d = PLANES[selPlane];
    $('ac-name').textContent = d.name;
    $('ac-role').textContent = d.role + (planeChoices.length > 1 ? `  ·  ${planeChoices.indexOf(selPlane) + 1}/${planeChoices.length}` : '');
    $('ac-stats').innerHTML = statsHTML(d) + `<span>WEAPONS</span><span style="color:#e9f1f6">${d.gun ? 'GUN · ' : ''}${d.primary ? d.primary.name : 'MSL'} · ${d.sp.name}${d.flares ? ' · FLARES' : ''}</span>`;
    if (show.key !== selPlane) showPlane(selPlane);
  }
  $('ac-prev').addEventListener('click', () => { const i = planeChoices.indexOf(selPlane); selPlane = planeChoices[(i - 1 + planeChoices.length) % planeChoices.length]; audio.click(); updateBriefPlane(); });
  $('ac-next').addEventListener('click', () => { const i = planeChoices.indexOf(selPlane); selPlane = planeChoices[(i + 1) % planeChoices.length]; audio.click(); updateBriefPlane(); });
  $('sortie').addEventListener('click', () => { audio.select(); progress.plane = selPlane; LS.set('progress', progress); startMission(selMission, selPlane); });

  let hangarI = 0;
  function updateHangar() {
    const key = PLANE_ORDER[hangarI], d = PLANES[key], un = planeUnlocked(key);
    $('hg-name').textContent = d.name;
    $('hg-name').classList.toggle('locked', !un);
    const unm = d.unlock ? MISSIONS.find((m) => m.id === d.unlock) : null;
    $('hg-role').textContent = un ? d.role : `LOCKED · CLEAR ${unm.code} "${unm.title}"`;
    $('hg-desc').textContent = d.desc;
    $('hg-stats').innerHTML = statsHTML(d);
    showPlane(key);
  }
  $('hg-prev').addEventListener('click', () => { hangarI = (hangarI - 1 + PLANE_ORDER.length) % PLANE_ORDER.length; audio.click(); updateHangar(); });
  $('hg-next').addEventListener('click', () => { hangarI = (hangarI + 1) % PLANE_ORDER.length; audio.click(); updateHangar(); });

  // settings
  function syncSettings() {
    document.querySelectorAll('#q-chips button').forEach((b) => b.classList.toggle('on', b.dataset.q === tier.name));
    document.querySelectorAll('#c-chips button').forEach((b) => b.classList.toggle('on', (b.dataset.c === 'expert') === settings.expert));
    document.querySelectorAll('#i-chips button').forEach((b) => b.classList.toggle('on', (b.dataset.i === '1') === settings.invert));
    document.querySelectorAll('#f-chips button').forEach((b) => b.classList.toggle('on', (b.dataset.f === '1') === settings.fps));
    $('s-sens').value = settings.sens; $('s-music').value = settings.music; $('s-sfx').value = settings.sfx; $('s-voice').value = settings.voice;
  }
  const saveSettings = () => LS.set('settings', settings);
  document.querySelectorAll('#q-chips button').forEach((b) => b.addEventListener('click', () => { if (b.dataset.q !== tier.name) { LS.set('q', b.dataset.q); location.reload(); } }));
  document.querySelectorAll('#c-chips button').forEach((b) => b.addEventListener('click', () => { settings.expert = b.dataset.c === 'expert'; saveSettings(); syncSettings(); audio.click(); }));
  document.querySelectorAll('#i-chips button').forEach((b) => b.addEventListener('click', () => { settings.invert = b.dataset.i === '1'; input.invert = settings.invert; saveSettings(); syncSettings(); audio.click(); }));
  document.querySelectorAll('#f-chips button').forEach((b) => b.addEventListener('click', () => { settings.fps = b.dataset.f === '1'; $('fps').classList.toggle('hidden', !settings.fps); saveSettings(); syncSettings(); audio.click(); }));
  $('s-sens').addEventListener('input', (e) => { settings.sens = +e.target.value; input.sens = settings.sens; saveSettings(); });
  $('s-music').addEventListener('input', (e) => { settings.music = +e.target.value; audio.setVol('music', settings.music); saveSettings(); });
  $('s-sfx').addEventListener('input', (e) => { settings.sfx = +e.target.value; audio.setVol('sfx', settings.sfx); saveSettings(); });
  $('s-voice').addEventListener('input', (e) => { settings.voice = +e.target.value; audio.setVol('voice', settings.voice); saveSettings(); });
  $('fps').classList.toggle('hidden', !settings.fps);

  // ------------------------------------------------------------------ flight
  async function startMission(i, planeKey) {
    const m = MISSIONS[i];
    selMission = i; selPlane = planeKey;
    radio.clear();
    showScreen(null);
    $('flight').classList.remove('hidden');
    $('prompt').textContent = 'LOADING'; $('prompt').classList.remove('hidden');
    document.body.classList.toggle('b2', !!PLANES[planeKey].bomber);
    $('b-flare').classList.toggle('hidden', !PLANES[planeKey].flares);
    $('b-skip').classList.add('hidden');
    if (show.group) { scene.remove(show.group); show.group = null; show.key = null; }
    mode = 'loading';
    game.onEnd = (res) => endMission(res);
    game.godMode = false; game.landed = false; game.skipLanding = false;
    await game.start(m, planeKey);
    $('prompt').classList.add('hidden');
    input.calibrate();
    input.clearEvents();
    input.enabled = true;
    mode = 'flight';
  }

  function endMission(res) {
    mode = 'debrief';
    hud.show(false);
    audio.silence();
    $('flight').classList.add('hidden');
    const m = MISSIONS[selMission];
    $('db-res').textContent = res.ok ? 'MISSION ACCOMPLISHED' : 'MISSION FAILED';
    $('db-res').classList.toggle('bad', !res.ok);
    $('db-title').textContent = `${m.code} · ${m.title}${res.ok ? '' : ' · ' + res.reason}`;
    const mm = Math.floor(res.time / 60), ss = Math.floor(res.time % 60);
    $('db-time').textContent = `${mm}:${String(ss).padStart(2, '0')}`;
    $('db-kills').textContent = res.kills;
    $('db-score').textContent = res.score;
    const rank = res.ok ? rankFor(res.score) : '-';
    $('db-rank').textContent = rank;
    let extra = res.bonusText || '';
    if (res.ok) {
      const before = PLANE_ORDER.filter(planeUnlocked);
      const old = progress.cleared[m.id];
      if (!old || 'SABC'.indexOf(rank) < 'SABC'.indexOf(old)) progress.cleared[m.id] = rank;
      LS.set('progress', progress);
      const now = PLANE_ORDER.filter(planeUnlocked);
      const fresh = now.filter((k) => !before.includes(k));
      if (fresh.length) extra += (extra ? ' · ' : '') + 'NEW AIRCRAFT: ' + fresh.map((k) => PLANES[k].short).join(', ');
    }
    $('db-extra').textContent = extra;
    $('db-next').textContent = res.ok ? 'CONTINUE' : 'BACK TO MENU';
    showScreen('debrief');
    game.clear();
    carrier.group.visible = false;
  }
  $('db-next').addEventListener('click', async () => {
    audio.select();
    await backToMenu();
    if (selMission > 0) { buildCampaign(); showScreen('campaign'); }
  });
  $('db-retry').addEventListener('click', () => { audio.select(); startMission(selMission, selPlane); });

  async function backToMenu() {
    game.clear();
    hud.show(false);
    audio.silence();
    $('flight').classList.add('hidden');
    carrier.group.visible = false;
    mode = 'menu';
    showScreen('menu');
    audio.music('menu');
    await game.setEnv('sunset', 'sea');
    await showPlane(progress.plane && planeUnlocked(progress.plane) ? progress.plane : 'f15');
  }

  // pause
  const pause = () => {
    if (mode !== 'flight') return;
    mode = 'paused'; game.paused = true; audio.silence(); audio.ctx?.suspend?.();
    showScreen('pause');
  };
  const resume = () => { mode = 'flight'; game.paused = false; audio.ctx?.resume?.(); showScreen(null); input.clearEvents(); };
  $('b-pause').addEventListener('click', pause);
  $('p-resume').addEventListener('click', () => { audio.click(); resume(); });
  $('p-cal').addEventListener('click', () => { input.calibrate(); hud.message('TILT RECENTERED', 'info', 1.2); resume(); });
  $('p-restart').addEventListener('click', () => { audio.ctx?.resume?.(); game.paused = false; startMission(selMission, selPlane); });
  $('p-settings').addEventListener('click', () => { syncSettings(); showScreen('settings'); });
  $('p-quit').addEventListener('click', async () => { audio.ctx?.resume?.(); game.paused = false; await backToMenu(); });
  $('b-skip').addEventListener('click', () => { game.skipLanding = true; $('b-skip').classList.add('hidden'); });
  if (!qs.has('nopause')) document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });

  // title is ready
  $('load').classList.add('hidden');
  $('press').classList.remove('hidden');
  window.__booted = true;
  if (downgraded) hud.message('GRAPHICS LOWERED TO ' + tier.name.toUpperCase(), 'warn', 4);
  window.__ac = { game, renderer, scene, camera, post, clouds, sky, ocean, fx, audio, input, state, tier, show, carrier, MISSIONS };

  // ------------------------------------------------------------------ main loop
  let last = performance.now(), acc = 0, frames = 0, msAcc = 0, probeAt = 0, uiT = 0;
  function loop(now) {
    let dt = (now - last) / 1000; last = now;
    if (dt > 0.25) dt = 0.25;
    const dtc = Math.min(dt, 1 / 20);
    input.update(dtc);
    if (mode === 'flight' || mode === 'paused' || mode === 'loading') {
      if (mode === 'flight') {
        if (input.consume('pause')) pause();
        game.update(dtc);
      }
      if (game.player) {
        game.render(mode === 'flight' ? dtc : 0);
        camera.updateMatrixWorld(true);
        sky.update(camera);
        fx.update(mode === 'flight' ? dtc : 0, camera);
        if (mode === 'flight') {
          const st = game.hudState();
          hud.update(dtc, st);
          radio.update(dtc);
          const p = game.player;
          const lockState = game.locks.length ? 2 : game.lockProgress > 0.05 ? 1 : 0;
          const nearest = st.incoming.length ? Math.min(...st.incoming.map((m) => m.pos.distanceTo(p.pos))) : 1e9;
          audio.update(dtc, { on: p.alive, speed01: p.speed / p.def.maxSpd, boost: p.burner > 0.5 ? p.burner : 0, g: p.g, lock: p.alive ? lockState : 0, alert: st.incoming.length ? (nearest < 1200 ? 2 : 1) : 0 });
          // post effects driven by the flight
          const u = post.u;
          u.speed.value = clamp((p.speed - p.def.cruise) / (p.def.maxSpd - p.def.cruise + 1), 0, 1) * 0.6 * p.burner;
          u.flash.value *= Math.exp(-dtc * 6);
          u.dmg.value = clamp(1 - p.hp / p.maxHp - 0.45, 0, 0.55) * 1.6;
          const cd = clouds.densityAt(camera.position);
          u.inCloud.value += (clamp(cd * 3, 0, 1) - u.inCloud.value) * (1 - Math.exp(-dtc * 4));
          uiT -= dt;
          if (uiT <= 0) {
            uiT = 0.2;
            const t = game.time;
            $('timer').textContent = `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
            $('score').textContent = game.score;
            const w = game.curWeapon();
            $('msl-label').textContent = w ? w.name : 'MSL';
            const pr = $('prompt');
            if (game.state === 'cat') { pr.textContent = 'HOLD BOOST TO LAUNCH'; pr.classList.remove('hidden'); }
            else if (pr.textContent !== 'LOADING') pr.classList.add('hidden');
            if (game.landing && !game.landed && !game.skipLanding && game.landing.optional) $('b-skip').classList.remove('hidden');
            else $('b-skip').classList.add('hidden');
          }
        }
      }
    } else {
      updateShowcase(dtc);
      camera.updateMatrixWorld(true);
      sky.update(camera);
      fx.update(dtc, camera);
      hud.update(dtc, null);
      radio.update(dtc);
      post.u.speed.value = 0; post.u.dmg.value = 0; post.u.inCloud.value = 0; post.u.flash.value = 0;
    }
    // sun for the lens flare
    const sp = camera.position.clone().addScaledVector(sky.sunDir, 10000).project(camera);
    post.u.sunUV.value.set(sp.x * 0.5 + 0.5, sp.y * 0.5 + 0.5, sp.z < 1 && Math.abs(sp.x) < 1.3 && Math.abs(sp.y) < 1.3 ? 1 : 0);
    post.u.time.value = now / 1000;
    renderer.info.reset();
    post.render(scene, camera, clouds);

    // stats + adaptive resolution
    frames++; acc += dt; msAcc += dt * 1000;
    if (acc >= 0.5) {
      const avgMs = msAcc / frames;
      if (settings.fps) $('fps').textContent = `${Math.round(frames / acc)} FPS · ${avgMs.toFixed(1)} MS · ${state.w}×${state.h} · ${post.sceneInfo.calls} DC · ${tier.name.toUpperCase()}`;
      if (now > state.lock && mode !== 'loading' && !state.fixed) {
        if (avgMs > 20 && state.scale > state.minScale) { state.scale = Math.max(state.minScale, state.scale - 0.08); applySize(); state.lock = now + 2500; state.upLock = (state.upLock || 0) + 1; }
        else if (avgMs < 17.2 && state.scale < 1 && now > probeAt) { state.scale = Math.min(1, state.scale + 0.04); applySize(); state.lock = now + 4000; probeAt = now + 6000 * (1 + (state.upLock || 0)); }
      }
      acc = 0; frames = 0; msAcc = 0;
    }
  }
  renderer.setAnimationLoop(loop);
}

boot().catch((e) => fatal(String(e?.stack || e)));
