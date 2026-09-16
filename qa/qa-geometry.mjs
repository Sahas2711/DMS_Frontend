/* Section geometry probe: measures each homepage section's box, plus
   visible-content coverage across the scroll range — catches dead zones
   (long stretches where nothing but background is on screen). */
import fs from 'node:fs';
import { spawn } from 'node:child_process';

const BASE = process.argv[2] || 'http://localhost:4173/';
const PORT = 9225;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/qa-geo-'),
    '--window-size=1440,900', 'about:blank',
], { stdio: ['ignore', 'ignore', 'ignore'] });
process.on('exit', () => { try { chrome.kill(); } catch { /* noop */ } });

let wsUrl = null;
for (let i = 0; i < 40 && !wsUrl; i += 1) {
    try {
        const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
        const tabs = await res.json();
        wsUrl = tabs.find((t) => t.type === 'page')?.webSocketDebuggerUrl;
    } catch { /* retry */ }
    if (!wsUrl) await sleep(250);
}
const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let msgId = 0;
const pending = new Map();
ws.onmessage = (ev) => {
    const d = JSON.parse(ev.data);
    if (d.id && pending.has(d.id)) {
        const { resolve, reject } = pending.get(d.id);
        pending.delete(d.id);
        d.error ? reject(new Error(d.error.message)) : resolve(d.result);
    }
};
const send = (method, params = {}) => new Promise((resolve, reject) => {
    msgId += 1; pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params }));
});
const evaluate = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'eval failed');
    return r.result.value;
};

await send('Page.enable');
await send('Runtime.enable');
await send('Page.navigate', { url: BASE });
await sleep(3500);

/* Section boxes */
const sections = await evaluate(`(() => {
    const out = [];
    document.querySelectorAll('main > *').forEach((el) => {
        const r = el.getBoundingClientRect();
        const top = r.top + window.scrollY;
        out.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className || '').toString().slice(0, 60),
            label: el.getAttribute('aria-label') || '',
            top: Math.round(top),
            h: Math.round(r.height),
        });
    });
    return out;
})()`);
console.log('SECTION MAP (desktop 1440x900):');
let cursor = 0;
for (const s of sections) {
    const gap = s.top - cursor;
    console.log(`  y=${String(s.top).padStart(6)}  h=${String(s.h).padStart(5)}  ${s.tag}${s.label ? ' [' + s.label + ']' : ''}${gap > 40 ? '  ⚠ GAP ' + gap + 'px' : ''}`);
    cursor = s.top + s.h;
}
const docH = await evaluate('document.documentElement.scrollHeight');
console.log('  docHeight:', docH, '| last section ends at:', cursor, cursor >= docH - 40 ? '' : '⚠ trailing gap');

/* Visible content coverage while scrolling */
const max = docH - 900;
const deadZones = [];
let prevHadContent = true;
for (let y = 0; y <= max; y += 450) {
    await evaluate(`window.scrollTo(0, ${y})`);
    await sleep(350);
    const cov = await evaluate(`(() => {
        // Elements carrying meaningful content visible in viewport
        let nodes = 0, text = 0, imgs = 0;
        document.querySelectorAll('main h1, main h2, main h3, main p, main a, main button, main img, main li, main span').forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.bottom < 0 || r.top > 900 || r.width < 4 || r.height < 4) return;
            const style = getComputedStyle(el);
            if (style.visibility === 'hidden' || style.display === 'none' || +style.opacity < 0.05) return;
            nodes += 1;
            if (el.tagName === 'IMG') imgs += 1;
            const t = (el.textContent || '').trim();
            if (t) text += t.length;
        });
        return { nodes, text, imgs };
    })()`);
    const alive = cov.nodes > 6 && (cov.text > 80 || cov.imgs > 0);
    if (!alive) deadZones.push({ y, ...cov });
}
console.log('\nDEAD-ZONE SCAN (sampled every 450px):');
console.log(deadZones.length === 0 ? '  none — every sampled viewport has live content ✓' : JSON.stringify(deadZones, null, 1));

/* Horizontal overflow scan across full scroll (sticky transforms can overflow) */
const overflow = await evaluate(`(() => {
    document.querySelectorAll('main *').forEach(() => {});
    const bad = [];
    document.querySelectorAll('main *').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.right > 1441 || r.left < -1)) {
            const cls = (el.className || '').toString();
            if (!cls.includes('lenis') && !el.closest('[aria-hidden]')) {
                bad.push({ tag: el.tagName, cls: cls.slice(0, 50), left: Math.round(r.left), right: Math.round(r.right) });
            }
        }
    });
    return bad.slice(0, 12);
})()`);
console.log('\nOVERFLOWING ELEMENTS (viewport-relative):', overflow.length === 0 ? 'none ✓' : JSON.stringify(overflow, null, 1));

ws.close();
process.exit(0);
