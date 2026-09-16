/* FINAL COMBINED HARNESS — per shot: reach position via keyboard (native
   PageDown/ArrowDown; avoids wheel-event plumbing), VERIFY the section +
   computed bg at the moment of capture, wiggle 2px to force fresh tiles,
   capture. Prints {shot, section, bg} per frame so black frames can be
   judged against ground truth. Works headless; pass HEADED=1 for headed. */
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const PORT = 9245;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const HEADED = process.env.HEADED === '1';
const OUT = HEADED ? 'qa/scenes-final-hd' : 'qa/scenes-final';
fs.mkdirSync(OUT, { recursive: true });

const args = HEADED
    ? [`--remote-debugging-port=${PORT}`,
       '--user-data-dir=' + process.env.TEMP + '/qa-fin-' + Date.now(),
       '--window-size=1456,960', '--window-position=40,40',
       '--no-first-run', '--no-default-browser-check', 'about:blank']
    : ['--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`,
       '--user-data-dir=' + process.env.TEMP + '/qa-fin-' + Date.now(),
       '--window-size=1440,900', '--hide-scrollbars', 'about:blank'];
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', args, { stdio: ['ignore', 'ignore', 'ignore'] });
process.on('exit', () => { try { chrome.kill(); } catch {} });

let wsUrl = null;
for (let i = 0; i < 60 && !wsUrl; i += 1) {
    try { const t = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); wsUrl = t.find((x) => x.type === 'page')?.webSocketDebuggerUrl; } catch {}
    if (!wsUrl) await sleep(300);
}
const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pend = new Map();
ws.onmessage = (ev) => { const d = JSON.parse(ev.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result); pend.delete(d.id); } };
const send = (m, p = {}) => new Promise((res) => { id += 1; pend.set(id, res); ws.send(JSON.stringify({ id, method: m, params: p })); });
const evaluate = async (e) => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result?.value;

/* Keyboard scroll: PageDown repeats; ArrowDown for fine approach. */
async function keyScroll(targetY) {
    for (let i = 0; i < 80; i += 1) {
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
            await sleep(120);
        }
    }
    await sleep(1300); // Lenis + section transitions settle
}

const truth = `(() => { const el = document.elementFromPoint(720, 450); const s = el && el.closest('section'); return { sec: s ? s.getAttribute('aria-label') : null, bg: s ? getComputedStyle(s).backgroundColor : null, y: Math.round(scrollY) }; })()`;

async function capture(name, label) {
    /* wiggle: force fresh tile raster */
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 });
    await sleep(700);
    const t = await evaluate(truth);
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, 'base64'));
    console.log(`${name}: section="${t.sec}" bg=${t.bg} y=${t.y} (want: ${label})`);
}

await send('Page.enable'); await send('Runtime.enable');
await send('Page.navigate', { url: 'http://localhost:4173/' });
await sleep(HEADED ? 5000 : 4200);

const geo = await evaluate(`(() => {
    const g = {};
    for (const s of document.querySelectorAll('section[aria-label]')) {
        const r = s.getBoundingClientRect();
        g[s.getAttribute('aria-label')] = Math.round(r.top + scrollY);
    }
    return g;
})()`);
console.log('sections:', JSON.stringify(geo));

await capture('01-hero', 'hero');
for (const [name, label] of [
    ['02-intro', 'Editorial statement'],
    ['03-dest', 'Destinations'],
    ['04-experiences', 'Travel styles'],
    ['05-trust', 'Why partners choose us'],
    ['06-journal', 'Travel journal'],
]) {
    const y = geo[label] != null ? geo[label] + 220 : null;
    if (y == null) { console.log(name, ': label not found'); continue; }
    await keyScroll(y);
    await capture(name, label);
}
ws.close();
setTimeout(() => process.exit(0), 600);
