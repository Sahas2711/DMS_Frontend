/* NUDGE TEST — wheel to position, then force full re-raster via a 1px
   device-metrics override swap. If pixels appear after the nudge, the
   black frames are a headless tile-rasterization artifact. */
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const PORT = 9241;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
fs.mkdirSync('qa/scenes', { recursive: true });

const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + process.env.TEMP + '/qa-nudge-' + Date.now(),
    '--window-size=1440,900', '--hide-scrollbars', 'about:blank',
], { stdio: ['ignore', 'ignore', 'ignore'] });
process.on('exit', () => chrome.kill());

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

async function wheelTo(target) {
    for (let i = 0; i < 150; i += 1) {
        const y = await evaluate('window.scrollY');
        if (y >= target - 40) break;
        for (let w = 0; w < 4; w += 1) {
            await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 720, y: 450, deltaX: 0, deltaY: 650 });
            await sleep(70);
        }
        await sleep(300);
    }
    await sleep(1200);
}

await send('Page.enable'); await send('Runtime.enable');
await send('Page.navigate', { url: 'http://localhost:4173/' });
await sleep(4000);

const expY = await evaluate(`(() => { const s = document.querySelector('section[aria-label="Travel styles"]'); return Math.round(s.getBoundingClientRect().top + scrollY + 260); })()`);
console.log('experiences y =', expY);
await wheelTo(expY);
await sleep(1500);

const shot = async (name) => {
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`qa/scenes/${name}.png`, Buffer.from(data, 'base64'));
    console.log('captured', name);
};

await shot('nudge-before');

/* Force re-raster: override metrics to 1441x900 then back */
await send('Emulation.setDeviceMetricsOverride', { width: 1441, height: 900, deviceScaleFactor: 1, mobile: false });
await sleep(700);
await send('Emulation.clearDeviceMetricsOverride');
await sleep(700);
await shot('nudge-after');

/* And the truth probe again, at this exact moment */
const truth = await evaluate(`(() => {
    const el = document.elementFromPoint(720, 450);
    const sec = el && el.closest('section');
    return {
        section: sec ? sec.getAttribute('aria-label') : null,
        bodyBg: getComputedStyle(document.body).backgroundColor,
        secBg: sec ? getComputedStyle(sec).backgroundColor : null,
        text: el ? (el.textContent || '').trim().slice(0, 40) : null,
    };
})()`);
console.log('truth:', JSON.stringify(truth));

ws.close(); process.exit(0);
