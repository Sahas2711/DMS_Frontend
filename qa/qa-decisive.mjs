/* DECISIVE RENDER TEST — no scrolling at all. Uses Page.captureScreenshot
   with clip + captureBeyondViewport so Chrome re-rasterizes each region fresh
   from layout. If these come out correct, the black frames were a stale
   headless compositor artifact, not a site bug. */
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const PORT = 9239;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
fs.mkdirSync('qa/scenes', { recursive: true });

const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + process.env.TEMP + '/qa-decisive-' + Date.now(),
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

await send('Page.enable'); await send('Runtime.enable');
await send('Page.navigate', { url: 'http://localhost:4173/' });
await sleep(4200);

/* Sample points: section tops + small offset, all derived from live DOM. */
const spots = await evaluate(`(() => {
    const pick = (label, off) => {
        const s = document.querySelector('section[aria-label="' + label + '"]');
        if (!s) return null;
        const r = s.getBoundingClientRect();
        return Math.round(r.top + window.scrollY + off);
    };
    return {
        hero: pick('Editorial hero', 0),
        intro: pick('Editorial statement', 200),
        dest: pick('Destinations', 300),
        experiences: pick('Travel styles', 260),
        trust: pick('Why partners choose us', 260),
        journal: pick('Travel journal', 60),
    };
})()`);
console.log('sample points:', JSON.stringify(spots));

for (const [name, y] of Object.entries(spots)) {
    if (y == null) { console.log('MISS', name); continue; }
    const { data } = await send('Page.captureScreenshot', {
        format: 'png',
        clip: { x: 0, y, width: 1440, height: 900, scale: 1 },
        captureBeyondViewport: true,
    });
    fs.writeFileSync(`qa/scenes/${name}.png`, Buffer.from(data, 'base64'));
    console.log('captured', name, '@y', y);
}

/* Luminance check inline: decode average brightness via canvas-free PNG? Too heavy —
   report file sizes only; visual inspector will grade them. */
ws.close(); process.exit(0);
