/* Extended captures: remaining scenes + mobile spot-check. */
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const PORT = 9252;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const OUT = 'qa/scenes-final2';
fs.mkdirSync(OUT, { recursive: true });

const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + process.env.TEMP + '/qa-fin2-' + Date.now(),
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

async function keyScroll(targetY) {
    for (let i = 0; i < 90; i += 1) {
        const y = await evaluate('window.scrollY');
        const diff = targetY - y;
        if (Math.abs(diff) < 80) break;
        if (diff > 900) {
            await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'PageDown', code: 'PageDown', windowsVirtualKeyCode: 34 });
            await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'PageDown', code: 'PageDown', windowsVirtualKeyCode: 34 });
            await sleep(420);
        } else {
            await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 });
            await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 });
            await sleep(110);
        }
    }
    await sleep(1300);
}
const truth = `(() => { const el = document.elementFromPoint(720, 450); const s = el && el.closest('section'); return s ? s.getAttribute('aria-label') : null; })()`;
async function capture(name) {
    const t = await evaluate(truth);
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, 'base64'));
    console.log(`${name}: in "${t}"`);
}

await send('Page.enable'); await send('Runtime.enable');
await send('Page.navigate', { url: 'http://localhost:4173/' });
await sleep(4200);

const geo = await evaluate(`(() => {
    const g = {};
    for (const s of document.querySelectorAll('section[aria-label]')) {
        const r = s.getBoundingClientRect();
        g[s.getAttribute('aria-label')] = { top: Math.round(r.top + scrollY), h: Math.round(r.height) };
    }
    return g;
})()`);

/* Trust deeper — content begins after scene padding */
await keyScroll(geo['Why partners choose us'].top + 620);
await capture('07-trust-deep');

/* Journeys mid-rail (sticky horizontal scene) */
const j = geo['Curated journeys'];
await keyScroll(j.top + Math.round((j.h - 804) * 0.45));
await capture('08-journeys-mid');

/* Journal deep + CTA */
await keyScroll(geo['Travel journal'].top + 700);
await capture('09-journal-deep');
await keyScroll(await evaluate('document.documentElement.scrollHeight - innerHeight - 20'));
await capture('10-cta');

/* ── Mobile pass 390x844 ── */
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send('Emulation.setTouchEmulationEnabled', { enabled: true });
await evaluate('window.scrollTo(0, 0)');
await sleep(2000);
await capture('m1-hero');
await keyScroll(geo['Travel styles'].top + 300);
await capture('m2-experiences');
await keyScroll(Math.round(geo['Curated journeys'].top + (geo['Curated journeys'].h - 844) * 0.5));
await capture('m3-journeys');
await keyScroll(await evaluate('document.documentElement.scrollHeight - innerHeight - 20'));
await capture('m4-cta');
const overflow = await evaluate('document.documentElement.scrollWidth - document.documentElement.clientWidth');
console.log('mobile horizontal overflow px:', overflow);

ws.close();
setTimeout(() => process.exit(0), 500);
