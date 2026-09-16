/* A11y + perf probe: mobile menu open/close semantics and Escape support,
   visible focus after keyboard navigation, and a reliable LCP reading. */
import { spawn } from 'node:child_process';

const PORT = 9228;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + process.env.TEMP + '/qa-a11y-' + Date.now(),
    '--window-size=1440,900', 'about:blank',
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
const evaluate = async (expression, awaitPromise = false) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise });
    return r.result?.value;
};

await send('Page.enable');
await send('Runtime.enable');
await send('Page.navigate', { url: 'http://localhost:4173/' });
await sleep(3200);

/* LCP with timeout guard */
const lcp = await evaluate(`new Promise((res) => {
    let done = false;
    const po = new PerformanceObserver((l) => {
        const e = l.getEntries().at(-1);
        if (e && !done) { done = true; res(Math.round(e.startTime)); }
    });
    po.observe({ type: 'largest-contentful-paint', buffered: true });
    setTimeout(() => { if (!done) res(-1); }, 2500);
})`, true);
console.log('LCP ms:', lcp);

/* Mobile menu a11y */
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await sleep(600);

const menuBtn = await evaluate(`(() => {
    const btns = [...document.querySelectorAll('header button')];
    const b = btns.find(x => (x.getAttribute('aria-label') || '').match(/menu/i) || x.getAttribute('aria-expanded') !== null);
    return b ? { found: true, ariaExpanded: b.getAttribute('aria-expanded'), ariaLabel: b.getAttribute('aria-label') } : { found: false, headers: btns.length };
})()`);
console.log('menu button:', JSON.stringify(menuBtn));

if (menuBtn.found) {
    // click it via CDP-real click on center coords
    const box = await evaluate(`(() => {
        const btns = [...document.querySelectorAll('header button')];
        const b = btns.find(x => (x.getAttribute('aria-label') || '').match(/menu/i) || x.getAttribute('aria-expanded') !== null);
        const r = b.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    })()`);
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: box.x, y: box.y, button: 'left', clickCount: 1 });
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: box.x, y: box.y, button: 'left', clickCount: 1 });
    await sleep(900);
    const open = await evaluate(`(() => {
        const btns = [...document.querySelectorAll('header button')];
        const b = btns.find(x => x.getAttribute('aria-expanded') !== null);
        const dialog = document.querySelector('header [role="dialog"], header nav[aria-hidden="false"], body > div[class*="fixed"]');
        return {
            expanded: b ? b.getAttribute('aria-expanded') : null,
            overlayVisible: !!dialog && getComputedStyle(dialog).display !== 'none',
            focusInOverlay: dialog ? dialog.contains(document.activeElement) || b === document.activeElement : null,
        };
    })()`);
    console.log('menu open state:', JSON.stringify(open));

    // Escape should close
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await sleep(700);
    const closed = await evaluate(`(() => {
        const btns = [...document.querySelectorAll('header button')];
        const b = btns.find(x => x.getAttribute('aria-expanded') !== null);
        return b ? b.getAttribute('aria-expanded') : null;
    })()`);
    console.log('menu aria-expanded after Escape:', closed);
}

/* Keyboard focus visibility: Tab a few times, check focus outline is not none */
await evaluate('window.scrollTo(0, 0)');
await sleep(400);
const focus = await evaluate(`(() => {
    for (let i = 0; i < 5; i += 1) {
        document.activeElement && document.activeElement.blur && document.activeElement.blur();
        // simulate Tab
    }
    return null;
})()`);
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
await sleep(300);
const focusState = await evaluate(`(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return { tag: 'none' };
    const s = getComputedStyle(el);
    return { tag: el.tagName, outline: s.outlineStyle, outlineWidth: s.outlineWidth };
})()`);
console.log('first Tab focus:', JSON.stringify(focusState));

ws.close();
process.exit(0);
