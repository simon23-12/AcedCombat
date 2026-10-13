// automated playtest: node tools/playtest.mjs <mission> <plane> <seconds> [shots]
import puppeteer from 'puppeteer-core';
const [m = '1', plane = 'f15', secs = '60', shots = '4', q = 'high'] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: process.env.HEADFUL ? false : 'new',
  args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'], defaultViewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true } });
const p = await b.newPage();
p.on('pageerror', (e) => console.log('[pageerror]', e.message));
p.on('console', (msg) => { const t = msg.text(); if (/error|warn|missing/i.test(t) && !/icon|404|GPU stall/.test(t)) console.log('[page]', t.slice(0, 200)); });
await p.goto(`http://localhost:8080/?q=${q}&fixed=1&nopause&auto&unlock=1`);
await p.waitForFunction(() => window.__booted, { timeout: 90000 });
await p.evaluate(async (m, plane) => {
  document.getElementById('press').click();
  await new Promise((r) => setTimeout(r, 400));
  const a = window.__ac;
  window.__log = [];
  const g = a.game;
  const oh = g.hudMsg.bind(g); g.hudMsg = (t, k) => { window.__log.push((g.time || 0).toFixed(1) + ' MSG ' + t); oh(t, k); };
  const or = a.game.radio.say.bind(a.game.radio); a.game.radio.say = (id, pr) => { window.__log.push((g.time || 0).toFixed(1) + ' SAY ' + id); or(id, pr); };
  const od = g.damage.bind(g); g.damage = (e, dmg, by, kind, at) => { if (e.isPlayer) window.__log.push((g.time || 0).toFixed(1) + ` DMG ${kind} ${Math.round(dmg)} by ${by ? (by.kind || (by.isPlayer ? 'player' : '?')) + '/' + by.team : 'null'}`); od(e, dmg, by, kind, at); };
  const ok = g.killPlayer.bind(g); g.killPlayer = (r) => { window.__log.push((g.time || 0).toFixed(1) + ' KILLPLAYER ' + r); ok(r); };

  document.querySelector('[data-go=campaign]').click();
  await new Promise((r) => setTimeout(r, 200));
  if (+m === 0) { document.querySelector('[data-go=training]').click(); }
  else document.querySelectorAll('.mcard')[+m - 1].click();
  await new Promise((r) => setTimeout(r, 300));
  // choose plane
  for (let i = 0; i < 6 && !document.getElementById('ac-name').textContent.includes(plane.toUpperCase().replace('F', 'F-').replace('B2', 'B-2').slice(0, 4)); i++) document.getElementById('ac-next').click();
  document.getElementById('sortie').click();
}, m, plane);
const n = +shots;
await new Promise((r) => setTimeout(r, 3000));
if (process.env.LANDTEST) {
  await p.waitForFunction(() => window.__ac.game.state === 'air', { timeout: 60000 });
  await p.evaluate(() => {
    const g = window.__ac.game, c = g.carrier, pl = g.player;
    for (const e of g.planes) if (e !== pl && e.team === 'red') { e.alive = false; g.removeView(e); }
    g.beginLanding(true);
    c.glidePoint(+(new URLSearchParams(location.search).get('ld') || 5000), 3.5, pl.pos);
    pl.setHeading(c.landingYaw(), -0.04, 0); pl.speed = 110;
    window.__log.push('TELEPORT');
  });
}
for (let i = 0; i < n; i++) {
  await new Promise((r) => setTimeout(r, (+secs * 1000) / n));
  const st = await p.evaluate(() => { const g = window.__ac.game; const pl = g.player; const ap = g.approachInfo; return { ap: ap ? [Math.round(ap.along), Math.round(ap.lat), Math.round(ap.vert)] : null, landed: !!g.landed, t: (g.time || 0).toFixed(1), state: g.state, hp: pl ? Math.round(pl.hp) : null, alt: pl ? Math.round(pl.pos.y) : null, spd: pl ? Math.round(pl.speed * 3.6) : null, kills: g.kills, enemies: g.enemies.length, result: g.result, log: window.__log.splice(0) }; });
  console.log(JSON.stringify(st));
  await p.screenshot({ path: `build/pt_m${m}_${i}.png` });
}
await b.close();
