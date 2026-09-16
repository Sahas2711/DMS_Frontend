/* HEADED capture — runs Chrome visibly (real compositor, no headless
   tile-raster artifacts). Opens localhost:4173, wheels to each scene,
   screenshots. Window closes itself at the end. */
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const PORT = 9243;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
fs.mkdirSync('qa/scenes-headed', { recursive: true });

const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + process.env.TEMP + '/qa-headed-' + Date.now(),
    '--window-size=1456,960', '--window-position=40,40',
    '--no-first-run', '--no-default-browser-check',
    'http://localhost:4173/',
], { stdio: ['ignore', 'ignore', 'ignore'] });
process.on('exit', () => { try { chrome.kill(); } catch {} });

let wsUrl = null;
for (let i = 0; i < 60 && !wsUrl; i += 1) {
    try { const t = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); wsUrl = t.find((x) => x.type === 'page' && x.url.includes('localhost:4173'))?.webSocketDebuggerUrl; } catch {}
    if (!wsUrl) await sleep(300);
}
if (!wsUrl) { console.error('no CDP target'); process.exit(1); }
const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pend = new Map();
ws.onmessage = (ev) => { const d = JSON.parse(ev.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result); pend.delete(d.id); } };
const send = (m, p = {}) => new Promise((res) => { id += 1; pend.set(id, res); ws.send(JSON.stringify({ id, method: m, params: p })); });
const evaluate = async (e) => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result?.value;

async function wheelTo(target) {
    for (let i = 0; i < 200; i += 1) {
        const y = await evaluate('window.scrollY');
        if (y >= target - 40) break;
        for (let w = 0; w < 5; w += 1) {
            await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 700, y: 450, deltaX: 0, deltaY: 700 });
            await sleep(55);
        }
        await sleep(280);
    }
    await sleep(1400);
}
const shot = async (name) => {
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`qa/scenes-headed/${name}.png`, Buffer.from(data, 'base64'));
    console.log('captured', name);
};

await send('Page.enable'); await send('Runtime.enable');
await sleep(4500);
await shot('01-hero');

await wheelTo(1500); await shot('02-intro');
await wheelTo(2400); await sleep(800); await shot('03-dest-1');
const dg = await evaluate(`(() => { const s = document.querySelector('section[aria-label="Destinations"]'); const r = s.getBoundingClientRect(); return { top: r.top + scrollY, h: r.height, vh: innerHeight }; })()`);
await wheelTo(Math.round(dg.top + (dg.h - dg.vh) * 0.6)); await sleep(800); await shot('04-dest-3');
const exY = await evaluate(`(() => { const s = document.querySelector('section[aria-label="Travel styles"]'); return Math.round(s.getBoundingClientRect().top + scrollY + 200); })()`);
await wheelTo(exY); await shot('05-experiences');
const trY = await evaluate(`(() => { const s = document.querySelector('section[aria-label="Why partners choose us"]'); return Math.round(s.getBoundingClientRect().top + scrollY + 220); })()`);
await wheelTo(trY); await shot('06-trust');
await wheelTo(await evaluate(`document.documentElement.scrollHeight - innerHeight - 40`)); await sleep(1000); await shot('07-cta');

const truth = await evaluate(`(() => { const el = document.elementFromPoint(700, 450); const s = el && el.closest('section'); return { sec: s && s.getAttribute('aria-label'), bg: s && getComputedStyle(s).backgroundColor }; })()`);
console.log('final truth:', JSON.stringify(truth));

ws.close();
try { await fetch(`http://127.0.0.1:${PORT}/json/close/${(await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find(x => x.type === 'page').id}`); } catch {}
await sleep(500);
process.exit(0);
