/* Micro-probe: is Lenis attached, and do wheel events actually scroll the page?
   Distinguishes a real scroll bug from a headless CDP quirk. */
import fs from 'node:fs';
import { spawn } from 'node:child_process';

const BASE = process.argv[2] || 'http://localhost:4173/';
const PORT = 9224;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/qa-probe-'),
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

const probe = await evaluate(`(() => {
    const html = document.documentElement;
    const lenisLike = [];
    // Lenis adds classes/attrs to <html> and drives window scroll
    for (const attr of html.attributes) lenisLike.push(attr.name + '=' + attr.value);
    return {
        htmlClasses: html.className,
        htmlAttrs: lenisLike,
        bodyOverflow: document.body.style.overflow || '(none)',
        scrollY: window.scrollY,
        hasLenisGlobal: typeof window.lenis !== 'undefined' || typeof window.Lenis !== 'undefined',
    };
})()`);
console.log('probe:', JSON.stringify(probe, null, 2));

// Wheel test with longer settle
const before = await evaluate('window.scrollY');
for (let i = 0; i < 4; i += 1) {
    await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 720, y: 450, deltaX: 0, deltaY: 500 });
    await sleep(200);
}
await sleep(1500);
const after = await evaluate('window.scrollY');
console.log('wheel scroll test: before =', before, ' after =', after, ' moved =', after - before);

// Native scroll sanity
await evaluate('window.scrollTo(0, 2000)');
await sleep(800);
console.log('native scrollTo test: scrollY =', await evaluate('window.scrollY'));

ws.close();
process.exit(0);
