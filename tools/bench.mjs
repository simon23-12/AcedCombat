// Headless Chrome (Metal) benchmark + screenshots:  node tools/bench.mjs [url-query] [shots]
import puppeteer from 'puppeteer-core';
const q = process.argv[2] || 'q=high&fixed=1&nopause';
const out = process.argv[3] || 'build/bench';
const b = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: process.env.HEADFUL ? false : 'new', args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader=false', '--autoplay-policy=no-user-gesture-required'],
  defaultViewport: { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
});
const p = await b.newPage();
p.on('console', (m) => { const t = m.text(); if (!t.includes('GPU stall')) console.log('[page]', t.slice(0, 300)); });
p.on('pageerror', (e) => console.log('[pageerror]', e.message));
await p.goto('http://localhost:8080/?' + q, { waitUntil: 'load' });
await p.waitForFunction(() => window.__booted, { timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));
const fps = async (label) => {
  const r = await p.evaluate(async () => {
    const t0 = performance.now(); let n = 0;
    await new Promise((res) => { function f() { n++; if (performance.now() - t0 < 3000) requestAnimationFrame(f); else res(); } requestAnimationFrame(f); });
    const a = window.__ac;
    return { fps: n / 3, w: a.state.w, h: a.state.h, calls: a.post.sceneInfo.calls, tri: a.post.sceneInfo.triangles, gpu: (() => { const gl = a.renderer.getContext(); const d = gl.getExtension('WEBGL_debug_renderer_info'); return d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : '?'; })() };
  });
  console.log(label, JSON.stringify(r));
};
await fps('menu');
await p.screenshot({ path: out + '_menu.png' });
if (process.argv[4] === 'fly') {
  await p.evaluate(async () => {
    document.getElementById('press').click();
    await new Promise((r) => setTimeout(r, 500));
    const m = +(new URLSearchParams(location.search).get('m') || 0);
    if (m === 0) document.querySelector('[data-go=training]').click();
    else { document.querySelector('[data-go=campaign]').click(); await new Promise((r) => setTimeout(r, 300)); document.querySelectorAll('.mcard')[m - 1].click(); }
    await new Promise((r) => setTimeout(r, 500));
    document.getElementById('sortie').click();
  });
  await p.waitForFunction(() => window.__ac.game.running && document.getElementById('prompt').textContent !== 'LOADING' || window.__ac.game.state === 'cat', { timeout: 60000 });
  await new Promise((r) => setTimeout(r, +(process.argv[5] || 6000)));
  await fps('flight');
  await p.screenshot({ path: out + '_flight.png' });
}
await b.close();
