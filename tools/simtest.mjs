// deterministic simulation tests in the page (no rendering): node tools/simtest.mjs <test>
import puppeteer from 'puppeteer-core';
const test = process.argv[2] || 'bomb';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--use-angle=metal'] , defaultViewport: { width: 390, height: 844 } });
const p = await b.newPage();
p.on('console', (m) => console.log('[page]', m.text().slice(0, 300)));
p.on('pageerror', (e) => console.log('[pageerror]', e.message));
await p.goto('http://localhost:8080/?q=low&fixed=1&nopause&unlock=1');
await p.waitForFunction(() => window.__booted, { timeout: 90000 });
const res = await p.evaluate(async (test) => {
  const a = window.__ac, g = a.game;
  a.renderer.setAnimationLoop(null);
  window.__dbg = 1;
  const M = a.MISSIONS;
  const step = (n, dt = 1 / 30) => { for (let i = 0; i < n; i++) { g.update(dt); } };
  const out = [];
  if (test === 'bomb') {
    const mission = { ...M[3], run: async () => {} };
    await g.start(mission, 'b2');
    const s = await g.spawnShip('destroyer', new a.game.player.pos.constructor(0, 0, 0), 90, { speed: 7 });
    for (const [alt, dist, spd] of [[3800, 4500, 200], [3800, 3000, 200], [2000, 3000, 200], [5000, 6000, 200], [3800, 9000, 200]]) {
      s.alive = true; s.hp = 1e9; s.pos.set(0, 0, 0);
      g.player.pos.set(0, alt, -dist); g.player.setHeading(0, 0, 0); g.player.speed = spd; g.player.vel.set(0, 0, spd);
      g.weapons.clear();
      g.launchPlayer('gpb', s, 0);
      const m = g.weapons.missiles[0];
      let t = 0, minD = 1e9, hpBefore = s.hp;
      while (!m.dead && t < 80) { step(1); t += 1 / 30; minD = Math.min(minD, Math.hypot(m.pos.x - s.pos.x, m.pos.z - s.pos.z)); g.player.pos.y = alt; }
      out.push({ alt, dist, t: t.toFixed(1), impactD: Math.round(Math.hypot(m.pos.x - s.pos.x, m.pos.z - s.pos.z)), dmg: Math.round(hpBefore - s.hp) });
    }
  }
  if (test === 'vtol' || test === 'trap') {
    const vt = test === 'vtol';
    const mission = { ...M[5], run: async () => {} };
    await g.start(mission, vt ? 'f35b' : 'f15');
    const c = g.carrier, pl = g.player;
    g.state = 'air'; pl.onDeck = null; pl.gearDown = true;
    g.beginLanding(true);
    if (vt) {
      c.toWorld(new pl.pos.constructor(c.aim.x - 10, c.deckZ + 60, c.aim.z + 40), pl.pos);
      pl.setHeading(c.heading, 0, 0); pl.speed = 20;
      g.input.hold.brake = 1; g.input.keys.add('ArrowDown');
    } else {
      c.glidePoint(1500, 3.5, pl.pos); pl.setHeading(c.landingYaw(), -0.061, 0); pl.speed = 85;
      g.autoPilot = true;
    }
    let t = 0;
    while (t < 60 && g.state === 'air' && pl.alive) { g.input.update(1 / 30); step(1); t += 1 / 30; if (vt && pl.pos.y - c.deckZ < 8) g.input.keys.delete('ArrowDown'); }
    step(90);
    out.push({ t: t.toFixed(1), state: g.state, alive: pl.alive, hover: pl.hover.toFixed(2), landed: !!g.landed, result: g.result, y: (pl.pos.y - c.deckZ).toFixed(1), touch: g.lastTouch, ap: g.approachInfo && [Math.round(g.approachInfo.along), Math.round(g.approachInfo.lat), Math.round(g.approachInfo.vert)] });
  }
  return out;
}, test);
console.log(JSON.stringify(res, null, 0));
await b.close();
