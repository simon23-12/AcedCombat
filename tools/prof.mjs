import puppeteer from 'puppeteer-core';
const q = process.argv[2] || 'q=high&fixed=1&nopause';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: process.env.HEADFUL ? false : 'new',
  args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'], defaultViewport: { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true } });
const p = await b.newPage();
p.on('pageerror', (e) => console.log('[pageerror]', e.message));
await p.goto('http://localhost:8080/?' + q);
await p.waitForFunction(() => window.__booted, { timeout: 60000 });
await new Promise((r) => setTimeout(r, 1000));
const r = await p.evaluate(async () => {
  const a = window.__ac; const r = a.renderer; const gl = r.getContext();
  a.renderer.setAnimationLoop(null);
  const sync = (rt) => { const b = new Uint16Array(4); if (rt) r.readRenderTargetPixels(rt, 0, 0, 1, 1, b); else gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4)); };
  const T = (fn, rt, n = 5) => { fn(); sync(rt); const t = performance.now(); for (let i = 0; i < n; i++) fn(); sync(rt); return +((performance.now() - t) / n).toFixed(1); };
  const res = {};
  res.empty = T(() => {}, null);
  res.full = T(() => a.post.render(a.scene, a.camera, a.clouds), null);
  res.scene = T(() => { r.setRenderTarget(a.post.hdr); r.render(a.scene, a.camera); }, a.post.hdr);
  res.clouds = T(() => a.clouds.render(r, a.camera, a.post.hdr.depthTexture), a.clouds.rt);
  const st = a.clouds.u.steps.value;
  a.clouds.u.steps.value = 8; res.clouds8 = T(() => a.clouds.render(r, a.camera, a.post.hdr.depthTexture), a.clouds.rt); a.clouds.u.steps.value = st;
  res.comp = T(() => a.post.comp.render(r, null), null);
  res.down0 = T(() => { const dm = a.post.down.material.uniforms; dm.tSrc.value = a.post.hdr.texture; dm.karis.value = 1; a.post.down.render(r, a.post.levels[0]); }, a.post.levels[0]);
  res.size = [a.state.w, a.state.h, a.clouds.rt.width, a.clouds.rt.height, a.tier.msaa];
  return res;
});
console.log(JSON.stringify(r));
await b.close();
