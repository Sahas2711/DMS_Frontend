/* Functional probe: sticky destination chapters must advance with scroll;
   the CTA topographic canvas must be live WebGL (not the SVG fallback);
   JournalFeature images must declare aspect ratios (CLS safety). */
import { spawn } from 'node:child_process';

const PORT = 9227;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + process.env.TEMP + '/qa-fn-' + Date.now(),
    '--window-size=1440,900', '--hide-scrollbars', 'about:blank',
], { stdio: ['ignore', 'ignore', 'ignore'] });
process.on('exit', () => chrome.kill());

let wsUrl = null;
for (let i = 0; i < 40 && !wsUrl; i += 1) {
    try {
        const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
        wsUrl = tabs.find((t) => t.type === 'page')?.webSocketDebuggerUrl;
    } catch { /* retry */ }
    if (!wsUrl) await sleep(250);
}
const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pend = new Map();
ws.onmessage = (ev) => { const d = JSON.parse(ev.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result); pend.delete(d.id); } };
const send = (m, p = {}) => new Promise((res) => { id += 1; pend.set(id, res); ws.send(JSON.stringify({ id, method: m, params: p })); });
const evaluate = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true });
    return r.result?.value;
};

await send('Page.enable');
await send('Runtime.enable');
await send('Page.navigate', { url: 'http://localhost:4173/' });
await sleep(3200);

/* Destination chapter progression — derive geometry from the live DOM */
const destGeom = await evaluate(`(() => {
    const sec = document.querySelector('section[aria-label="Destinations"]');
    const r = sec.getBoundingClientRect();
    return { top: Math.round(r.top + window.scrollY), h: Math.round(r.height), vh: window.innerHeight };
})()`);
const destSectionTop = destGeom.top;
const destSectionH = destGeom.h;
const scrollable = destSectionH - (destGeom.vh || 804);
const seen = new Set();
for (const frac of [0.05, 0.3, 0.55, 0.75, 0.95]) {
    const y = Math.round(destSectionTop + scrollable * frac);
    await evaluate(`window.scrollTo(0, ${y})`);
    await sleep(1500); // mode="wait" chapter swap: exit + enter ≈ 1.2s
    const name = await evaluate(`(() => {
        const sec = document.querySelector('section[aria-label="Destinations"]');
        const h3 = sec && [...sec.querySelectorAll('h3')].find(el => {
            const r = el.getBoundingClientRect();
            const style = getComputedStyle(el.parentElement.parentElement.parentElement);
            return r.width > 0 && +style.opacity > 0.3;
        });
        return h3 ? h3.textContent.trim() : '(none)';
    })()`);
    seen.add(name);
    console.log(`dest @${Math.round(frac * 100)}%:`, name);
}
console.log(seen.size >= 4 ? '✓ all four chapters engage' : `⚠ only ${seen.size} distinct chapter(s) seen`);

/* WebGL state on the CTA scene */
await evaluate('window.scrollTo(0, document.documentElement.scrollHeight - 1800)');
await sleep(900);
const topo = await evaluate(`(() => {
    const canvas = document.querySelector('section[aria-label="Start a partnership"] canvas');
    const svg = document.querySelector('section[aria-label="Start a partnership"] svg');
    return {
        canvasPresent: !!canvas,
        canvasMode: canvas ? (canvas.dataset.mode || '(unset)') : null,
        canvasSize: canvas ? canvas.width + 'x' + canvas.height : null,
        svgPresent: !!svg,
        svgDisplay: svg ? getComputedStyle(svg).display : null,
        canvasDisplay: canvas ? getComputedStyle(canvas).display : null,
    };
})()`);
console.log('topographic field:', JSON.stringify(topo));

/* CLS safety: every content img should have intrinsic ratio via width/height or aspect class */
const clsRisk = await evaluate(`(() => {
    const risky = [];
    document.querySelectorAll('main img').forEach((img) => {
        const hasW = img.hasAttribute('width') && img.hasAttribute('height');
        let hasAspect = false;
        let el = img;
        for (let i = 0; i < 3 && el; i += 1) {
            const cls = el.className || '';
            if (/aspect-|w-\\d|h-full|object-cover|absolute/.test(String(cls))) { hasAspect = true; break; }
            el = el.parentElement;
        }
        if (!hasW && !hasAspect) risky.push(img.src.split('/').pop());
    });
    return risky;
})()`);
console.log('CLS-risk images:', clsRisk.length === 0 ? 'none ✓' : JSON.stringify(clsRisk));

ws.close();
process.exit(0);
