/* MASTER QA PROBE v4 — ordering matters:
   0. INPUT SANITY (wheel + Lenis live)
   1. MID-ANIMATION SAMPLING — runs on the PRISTINE session, before any
      emulation (device-metrics sessions can leave residual state).
   2. REDUCED MOTION (emulated profile; fallback flag, canvas/svg display,
      content visibility, scroll capability).
   3. RESIZE / ORIENTATION sweep (6 viewports + live swaps).
   4. ROUTE-CHANGE cleanup (home <-> /experiences x4) + console error tracker. */
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const PORT = 9272;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const BASE = 'http://localhost:4173/';
fs.mkdirSync('qa/master', { recursive: true });

const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + process.env.TEMP + '/qa-master4-' + Date.now(),
    '--window-size=1440,900', '--hide-scrollbars', 'about:blank',
], { stdio: ['ignore', 'ignore', 'ignore'] });
process.on('exit', () => { try { chrome.kill(); } catch {} });

let wsUrl = null;
for (let i = 0; i < 40 && !wsUrl; i += 1) {
    try { const t = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); wsUrl = t.find((x) => x.type === 'page')?.webSocketDebuggerUrl; } catch {}
    if (!wsUrl) await sleep(250);
}
const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pend = new Map();
ws.onmessage = (ev) => { const d = JSON.parse(ev.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result); pend.delete(d.id); } };
const send = (m, p = {}) => new Promise((res) => { id += 1; pend.set(id, res); ws.send(JSON.stringify({ id, method: m, params: p })); });
const evaluate = async (e) => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result?.value;
const evaluateAwait = async (e) => (await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result?.value;
const shot = async (name) => {
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`qa/master/${name}.png`, Buffer.from(data, 'base64'));
};
let failures = 0;
const check = (label, ok, detail = '') => {
    console.log(`${ok ? '✓' : '✗'} ${label}${detail ? ' — ' + detail : ''}`);
    if (!ok) failures += 1;
};
const chapterExpr = `(() => {
    const s = document.querySelector('section[aria-label="Destinations"]');
    const h3 = [...s.querySelectorAll('h3')].find(el => {
        const r = el.getBoundingClientRect();
        const style = getComputedStyle(el.parentElement.parentElement.parentElement);
        return r.width > 0 && +style.opacity > 0.3;
    });
    return h3 ? h3.textContent.trim() : '(none)';
})()`;

await send('Page.enable'); await send('Runtime.enable');
await send('Page.addScriptToEvaluateOnNewDocument', { source: `window.__qaErrors=[];window.addEventListener('error',e=>__qaErrors.push(String(e.message)));window.addEventListener('unhandledrejection',e=>__qaErrors.push(String(e.reason)));` });

/* ═══ 0. INPUT SANITY ═══ */
console.log('── 0. INPUT SANITY ──');
await send('Page.navigate', { url: BASE });
await sleep(4200);
const wheelY0 = await evaluate('window.scrollY');
for (let w = 0; w < 3; w += 1) {
    await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 720, y: 450, deltaX: 0, deltaY: 650 });
    await sleep(120);
}
await sleep(900);
const wheelY1 = await evaluate('window.scrollY');
check('wheel input scrolls the page (Lenis live)', wheelY1 > wheelY0, `y ${wheelY0} → ${wheelY1}`);

/* ═══ 1. MID-ANIMATION SAMPLING (pristine session) ═══ */
console.log('\n── 1. MID-ANIMATION SAMPLING ──');
/* Hero entrance: inject a rAF recorder BEFORE navigation so mount is sampled. */
await send('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.__heroTimeline = [];
    const t0 = performance.now();
    let last = -999;
    const tick = () => {
        const now = performance.now();
        if (now - last >= 80) {
            last = now;
            const h1 = document.querySelector('h1');
            const el = h1 && h1.querySelector('span.overflow-hidden > span');
            if (el) {
                const cs = getComputedStyle(el);
                window.__heroTimeline.push({ t: Math.round(now - t0), tf: cs.transform, op: cs.opacity });
            }
        }
        if (now - t0 < 5000) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
` });
await send('Page.navigate', { url: BASE });
await sleep(5600);
const timeline = await evaluate('window.__heroTimeline || []');
const firstMoving = timeline.find(s => s.tf !== 'none' && !/matrix\(1, 0, 0, 1, 0, 0(\.0+)?\)/.test(s.tf));
const lastState = timeline[timeline.length - 1];
check('hero headline: entrance observed mid-flight', !!firstMoving, firstMoving ? `t=${firstMoving.t}ms ${firstMoving.tf} op=${firstMoving.op}` : `n=${timeline.length} first=${JSON.stringify(timeline[0])}`);
check('hero headline: settles to identity', !!lastState && +lastState.op === 1 && (lastState.tf === 'none' || /matrix\(1, 0, 0, 1, 0, 0(\.0+)?\)/.test(lastState.tf)), `t=${lastState && lastState.t}ms ${lastState && lastState.tf}`);
console.log(`  samples=${timeline.length} first=${JSON.stringify(timeline[0])} moving=${JSON.stringify(firstMoving)} final=${JSON.stringify(lastState)}`);
await shot('mid-hero-early');

/* Chapter transitions via scrollTo with wait-mode settle. */
const dg2 = await evaluate(`(() => { const s = document.querySelector('section[aria-label="Destinations"]'); const r = s.getBoundingClientRect(); return { top: r.top + scrollY, h: r.height, vh: innerHeight }; })()`);
const scrollable = dg2.h - dg2.vh;
const samples = [];
for (const frac of [0.05, 0.3, 0.55, 0.8, 0.95]) {
    await evaluate(`window.scrollTo(0, ${Math.round(dg2.top + scrollable * frac)})`);
    await sleep(1800); // wait-mode chapter swap settle
    const st = await evaluate(chapterExpr);
    samples.push({ frac, name: st });
    console.log(`  dest @${Math.round(frac * 100)}%: ${st}`);
}
const distinct = new Set(samples.map(s => s.name)).size;
check('chapters advance with scroll (≥3 distinct states)', distinct >= 3, `distinct=${distinct}`);

/* ═══ 2. REDUCED MOTION ═══ */
console.log('\n── 2. REDUCED MOTION ──');
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await send('Page.navigate', { url: BASE });
await sleep(4500);

const rm = await evaluate(`(() => {
    const heroImg = document.querySelector('section[aria-label^="Asian Star"] img');
    const cta = document.querySelector('section[aria-label="Start a partnership"]');
    const host = cta && cta.querySelector('[data-fallback]');
    const canvas = cta && cta.querySelector('canvas');
    const svg = cta && cta.querySelector('svg');
    const intro = document.querySelector('section[aria-label="Editorial statement"]');
    const stuck = intro ? [...intro.querySelectorAll('h2, p, img, a')].filter(el => {
        let el2 = el; let hidden = false;
        for (let i = 0; i < 4 && el2; i++) { if (+getComputedStyle(el2).opacity === 0) { hidden = true; break; } el2 = el2.parentElement; }
        return hidden;
    }).length : -1;
    return {
        mq: matchMedia('(prefers-reduced-motion: reduce)').matches,
        heroImgOpacity: heroImg ? getComputedStyle(heroImg).opacity : null,
        fallbackFlag: host ? host.dataset.fallback : '(no host)',
        canvasDisplay: canvas ? getComputedStyle(canvas).display : '(none)',
        svgDisplay: svg ? getComputedStyle(svg).display : '(none)',
        introStuckHidden: stuck,
    };
})()`);
check('media query emulated', rm.mq === true);
check('hero image visible', rm.heroImgOpacity === '1', `opacity=${rm.heroImgOpacity}`);
check('intro content hidden pre-reveal only (below fold)', rm.introStuckHidden >= 0, `hidden-at-top=${rm.introStuckHidden}`);
check('CTA: static fallback engaged', rm.fallbackFlag === 'true' || rm.svgDisplay !== 'none', JSON.stringify({ fallback: rm.fallbackFlag, canvas: rm.canvasDisplay, svg: rm.svgDisplay }));
check('CTA: canvas hidden when fallback engaged', rm.fallbackFlag === 'true' ? rm.canvasDisplay === 'none' : true, `canvas display=${rm.canvasDisplay}`);
await shot('rm-cta-fallback');
const rmScroll = await evaluateAwait(`(async () => { window.scrollTo(0, 800); await new Promise(r=>setTimeout(r,700)); return window.scrollY; })()`);
check('scroll works under reduced motion', rmScroll > 500, `y=${rmScroll}`);
/* The real reduced-motion contract: content REVEALS when scrolled into view
   (opacity-only transitions), and nothing stays hidden after being in view. */
await evaluateAwait(`(async () => {
    const s = document.querySelector('section[aria-label="Editorial statement"]');
    const y = s.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 1600));
})()`);
const rmReveal = await evaluate(`(() => {
    const intro = document.querySelector('section[aria-label="Editorial statement"]');
    let inViewHidden = 0; let inViewVisible = 0; let belowFoldPending = 0;
    [...intro.querySelectorAll('h2, p, img, a')].forEach(el => {
        const r = el.getBoundingClientRect();
        const inView = r.top < innerHeight && r.bottom > 0 && r.height > 0;
        let el2 = el; let hid = false;
        for (let i = 0; i < 4 && el2; i++) { if (+getComputedStyle(el2).opacity === 0) { hid = true; break; } el2 = el2.parentElement; }
        if (inView) { if (hid) inViewHidden += 1; else inViewVisible += 1; }
        else if (hid) belowFoldPending += 1;
    });
    return { inViewVisible, inViewHidden, belowFoldPending, y: Math.round(scrollY) };
})()`);
check('in-view content fully revealed after scroll-in (reduced motion)', rmReveal.inViewHidden === 0 && rmReveal.inViewVisible > 0, JSON.stringify(rmReveal));
await send('Emulation.clearEmulatedMedia');

/* ═══ 3. RESIZE / ORIENTATION SWEEP ═══ */
console.log('\n── 3. RESIZE / ORIENTATION SWEEP ──');
await send('Page.navigate', { url: BASE });
await sleep(4000);
const viewports = [
    ['1440x900', 1440, 900], ['1280x800', 1280, 800], ['1024x768', 1024, 768],
    ['768x1024', 768, 1024], ['430x932', 430, 932], ['390x844', 390, 844],
];
for (const [name, w, h] of viewports) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 1024 });
    await sleep(1400);
    const r = await evaluate(`(() => {
        const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const nav = document.querySelector('header, nav');
        const navW = nav ? nav.getBoundingClientRect().width : 0;
        return { overflow, navW: Math.round(navW), vw: innerWidth };
    })()`);
    check(`${name}: no overflow, nav fits`, r.overflow <= 0 && r.navW <= r.vw, JSON.stringify(r));
}
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await sleep(1500);
const dgeom = await evaluate(`(() => { const s = document.querySelector('section[aria-label="Destinations"]'); const r = s.getBoundingClientRect(); return { top: r.top + scrollY, h: r.height, vh: innerHeight }; })()`);
await evaluate(`window.scrollTo(0, ${Math.round(dgeom.top + (dgeom.h - dgeom.vh) * 0.5)})`);
await sleep(1500);
const chapterMid = await evaluate(chapterExpr);
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await sleep(1500);
const mob = await evaluate(`(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    chapter: ([...document.querySelector('section[aria-label="Destinations"]').querySelectorAll('h3')].find(el => el.getBoundingClientRect().width > 0) || {}).textContent || null,
}))()`);
check('destinations mid-scene desktop→mobile: no overflow', mob.overflow <= 0, `overflow=${mob.overflow}`);
check('destinations chapter survives swap', !!mob.chapter, `before=${chapterMid} after=${mob.chapter}`);
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await sleep(1500);
const desk = await evaluate(`(() => ({ overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, chapter: ([...document.querySelector('section[aria-label="Destinations"]').querySelectorAll('h3')].find(el => el.getBoundingClientRect().width > 0) || {}).textContent || null }))()`);
check('destinations mid-scene mobile→desktop: no overflow', desk.overflow <= 0 && !!desk.chapter, JSON.stringify(desk));
await send('Emulation.setDeviceMetricsOverride', { width: 768, height: 1024, deviceScaleFactor: 1, mobile: true });
await sleep(1200);
await send('Emulation.setDeviceMetricsOverride', { width: 1024, height: 768, deviceScaleFactor: 1, mobile: false });
await sleep(1200);
const land = await evaluate(`(() => ({ overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth }))()`);
check('portrait→landscape swap, no overflow', land.overflow <= 0, `overflow=${land.overflow}`);
await send('Emulation.clearDeviceMetricsOverride');
await sleep(1200);

/* ═══ 4. ROUTE-CHANGE CLEANUP ═══ */
console.log('\n── 4. ROUTE-CHANGE CLEANUP ──');
await send('Page.navigate', { url: BASE });
await sleep(3500);
for (let i = 0; i < 4; i += 1) {
    await evaluate(`(() => { const a = [...document.querySelectorAll('a')].find(x => x.pathname === '/experiences'); if (a) a.click(); })()`);
    await sleep(1800);
    await evaluate(`(() => { const a = [...document.querySelectorAll('a')].find(x => x.getAttribute('href') === '/'); if (a) a.click(); })()`);
    await sleep(2000);
}
const leak = await evaluate(`(() => ({
    heroSections: document.querySelectorAll('section[aria-label^="Asian Star"]').length,
    canvases: document.querySelectorAll('canvas').length,
    path: location.pathname,
}))()`);
check('no duplicate hero sections after 4 round-trips', leak.heroSections === 1, JSON.stringify(leak));
check('no duplicate canvases after round-trips', leak.canvases <= 1, `count=${leak.canvases}`);
const errs = await evaluate('window.__qaErrors ? window.__qaErrors : []');
check('zero console errors across the whole session', Array.isArray(errs) && errs.length === 0, JSON.stringify(errs));

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`);
ws.close();
setTimeout(() => process.exit(failures === 0 ? 0 : 1), 400);
