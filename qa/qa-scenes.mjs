/* Targeted scene capture: reaches each scene with USER-STYLE wheel events
   (Lenis-compatible; programmatic scrollTo fights Lenis), then captures.
   1440x900. */
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const PORT = 9232;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
fs.mkdirSync('qa/scenes', { recursive: true });

const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + process.env.TEMP + '/qa-scene-' + Date.now(),
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
const shot = async (name) => {
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`qa/scenes/${name}.png`, Buffer.from(data, 'base64'));
    console.log('captured', name);
};

/* Wheel toward a target scrollY; Lenis eases along. */
async function wheelTo(target) {
    for (let i = 0; i < 120; i += 1) {
        const y = await evaluate('window.scrollY');
        if (y >= target - 40) break;
        const remaining = target - y;
        const burst = Math.min(6, Math.max(1, Math.round(remaining / 600)));
        for (let w = 0; w < burst; w += 1) {
            await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 720, y: 450, deltaX: 0, deltaY: 650 });
            await sleep(90);
        }
        await sleep(350);
    }
    await sleep(1000); // settle
}

const anchor = (label, offset = 240) =>
    `document.querySelector('section[aria-label="${label}"]').getBoundingClientRect().top + window.scrollY + ${offset}`;

await send('Page.enable'); await send('Runtime.enable');
await send('Page.navigate', { url: 'http://localhost:4173/' });
await sleep(4200);
await shot('01-hero-entry');

await wheelTo(await evaluate(anchor('', 900) === '' ? 0 : `900`)); // just below hero
await sleep(400);
await shot('02-intro-statement');

await wheelTo(await evaluate(`window.scrollY + 700`));
await sleep(400);
await shot('03-intro-band');

// Destination chapters — four positions across the sticky scene
const dg = await evaluate(`(() => { const s = document.querySelector('section[aria-label="Destinations"]'); const r = s.getBoundingClientRect(); return { top: r.top + scrollY, h: r.height, vh: innerHeight }; })()`);
const destScrollable = dg.h - dg.vh;
for (const [i, frac] of [[1, 0.08], [2, 0.36], [3, 0.62], [4, 0.9]]) {
    await wheelTo(Math.round(dg.top + destScrollable * frac));
    await sleep(1200);
    await shot(`04-dest-chapter-${i}`);
}

await wheelTo(await evaluate(anchor('Travel styles', 320)));
await shot('05-experiences');
await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 500, y: 500 });
await sleep(900);
await shot('06-experiences-hover');

await wheelTo(await evaluate(anchor('Why partners choose us', 260)));
await shot('07-trust');

const jg = await evaluate(`(() => { const s = document.querySelector('section[aria-label="Curated journeys"]'); const r = s.getBoundingClientRect(); return { top: r.top + scrollY, h: r.height, vh: innerHeight }; })()`);
await wheelTo(Math.round(jg.top + (jg.h - jg.vh) * 0.5));
await shot('08-journeys-mid');

await wheelTo(await evaluate(anchor('Travel journal', 60)));
await sleep(1200);
await shot('09-journal-cover');

await wheelTo(await evaluate(`document.documentElement.scrollHeight - innerHeight - 40`));
await sleep(1200);
await shot('10-final-cta');

ws.close(); process.exit(0);
