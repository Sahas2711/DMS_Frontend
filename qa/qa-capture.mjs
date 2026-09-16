/* QA harness: drives headless Chrome over raw CDP (Node 24 built-in WebSocket,
   zero extra deps). Scrolls the real viewport through the page, captures PNGs,
   collects console messages, overflow checks, LCP and resource weights.
   Desktop pass uses synthetic wheel events (Lenis-friendly); mobile uses
   programmatic scrolls (Lenis keeps native touch scrolling). Self-terminating. */
import fs from 'node:fs';
import { spawn } from 'node:child_process';

const BASE = process.argv[2] || 'http://localhost:4173/';
const OUT = 'qa/shots';
fs.mkdirSync(OUT, { recursive: true });

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9223;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + fs.mkdtempSync(process.env.TEMP + '/qa-chrome-'),
    '--window-size=1440,900',
    '--hide-scrollbars',
    'about:blank',
], { stdio: ['ignore', 'ignore', 'ignore'] });

process.on('exit', () => { try { chrome.kill(); } catch { /* noop */ } });

async function getTarget() {
    for (let i = 0; i < 40; i += 1) {
        try {
            const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
            const tabs = await res.json();
            const page = tabs.find((t) => t.type === 'page');
            if (page) return page.webSocketDebuggerUrl;
        } catch { /* chrome not ready yet */ }
        await sleep(250);
    }
    throw new Error('Chrome devtools endpoint never came up');
}

const wsUrl = await getTarget();
const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let msgId = 0;
const pending = new Map();
const consoleMsgs = [];
const exceptions = [];

ws.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    if (data.id && pending.has(data.id)) {
        const { resolve, reject } = pending.get(data.id);
        pending.delete(data.id);
        if (data.error) reject(new Error(data.error.message));
        else resolve(data.result);
    } else if (data.method === 'Runtime.consoleAPICalled') {
        const text = (data.params.args || []).map((a) => a.value ?? a.description ?? '').join(' ');
        consoleMsgs.push({ type: data.params.type, text });
    } else if (data.method === 'Runtime.exceptionThrown') {
        exceptions.push(data.params.exceptionDetails?.exception?.description || data.params.exceptionDetails?.text || 'unknown');
    }
};

function send(method, params = {}) {
    return new Promise((resolve, reject) => {
        msgId += 1;
        pending.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
    });
}

async function evaluate(expression, awaitPromise = false) {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'evaluate failed');
    return r.result.value;
}

async function shot(name) {
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, 'base64'));
}

await send('Page.enable');
await send('Runtime.enable');

/* ───────────────────────── desktop pass ───────────────────────── */
await send('Page.navigate', { url: BASE });
await sleep(3500); // entry choreography + fonts

const desktopReport = { scrollSnapshots: [], shots: [] };
const WHEELS_PER_SHOT = 2;

for (let i = 0; i < 22; i += 1) {
    const before = await evaluate('window.scrollY');
    // wheel like a user (works with Lenis)
    for (let w = 0; w < WHEELS_PER_SHOT; w += 1) {
        await send('Input.dispatchMouseEvent', {
            type: 'mouseWheel', x: 720, y: 450, deltaX: 0, deltaY: 700,
        });
        await sleep(140);
    }
    await sleep(700);
    let y = await evaluate('window.scrollY');
    if (y === before) {
        // fallback: force programmatic scroll (Lenis syncs to native scroll)
        const target = before + 5 * 900;
        await evaluate(`window.scrollTo(0, ${target})`);
        await sleep(700);
        y = await evaluate('window.scrollY');
    }
    const max = await evaluate('document.documentElement.scrollHeight - innerHeight');
    desktopReport.scrollSnapshots.push({ step: i, scrollY: y, max });
    const name = `desktop-${String(i).padStart(2, '0')}`;
    await shot(name);
    desktopReport.shots.push(name);
    if (y >= max - 4) break;
}

desktopReport.layout = await evaluate(`(() => {
    const de = document.documentElement;
    const imgs = [...document.querySelectorAll('img')];
    return {
        title: document.title,
        h1: document.querySelector('h1')?.textContent.trim() || null,
        headings: [...document.querySelectorAll('h1,h2')].map(h => h.tagName + ': ' + h.textContent.trim().slice(0, 80)),
        horizontalOverflow: de.scrollWidth - de.clientWidth,
        docHeight: de.scrollHeight,
        navLinks: [...document.querySelectorAll('nav a, header a')].map(a => a.getAttribute('href')),
        brokenImages: imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.src),
        imgCount: imgs.length,
        buttons: document.querySelectorAll('a[href*="request-quote"], a[href*="become-a-partner"]').length,
    };
})()`);

desktopReport.lcp = await evaluate(`new Promise((res) => {
    const po = new PerformanceObserver((l) => res(l.getEntries().at(-1)?.startTime ?? null));
    po.observe({ type: 'largest-contentful-paint', buffered: true });
    setTimeout(() => res(null), 2000);
})`).catch(() => null);

desktopReport.resources = await evaluate(`(() => {
    const rs = performance.getEntriesByType('resource');
    return {
        count: rs.length,
        bytes: rs.reduce((a, r) => a + (r.transferSize || 0), 0),
        biggest: rs.filter(r => r.transferSize > 100000).map(r => ({ n: r.name.split('/').pop(), kb: Math.round(r.transferSize / 1024) })),
    };
})()`);

/* ───────────────────────── mobile pass ───────────────────────── */
await send('Emulation.setDeviceMetricsOverride', {
    width: 390, height: 844, deviceScaleFactor: 1, mobile: true,
});
await send('Page.navigate', { url: BASE });
await sleep(3500);

const mobileReport = { scrollSnapshots: [], shots: [] };
for (let i = 0; i < 24; i += 1) {
    const before = await evaluate('window.scrollY');
    await evaluate(`window.scrollTo(0, ${before + 700})`);
    await sleep(800);
    const y = await evaluate('window.scrollY');
    const max = await evaluate('document.documentElement.scrollHeight - innerHeight');
    mobileReport.scrollSnapshots.push({ step: i, scrollY: y, max });
    const name = `mobile-${String(i).padStart(2, '0')}`;
    await shot(name);
    mobileReport.shots.push(name);
    if (y >= max - 4) break;
}

mobileReport.layout = await evaluate(`(() => {
    const de = document.documentElement;
    return {
        horizontalOverflow: de.scrollWidth - de.clientWidth,
        docHeight: de.scrollHeight,
        title: document.title,
        h1: document.querySelector('h1')?.textContent.trim() || null,
    };
})()`);

const report = { desktop: desktopReport, mobile: mobileReport, consoleMsgs, exceptions };
fs.writeFileSync('qa/qa-report.json', JSON.stringify(report, null, 2));

console.log('console errors:', consoleMsgs.filter((m) => ['error', 'warning'].includes(m.type)).length);
console.log('exceptions:', exceptions.length);
console.log('desktop overflow px:', desktopReport.layout.horizontalOverflow, '| mobile overflow px:', mobileReport.layout.horizontalOverflow);
console.log('desktop docHeight:', desktopReport.layout.docHeight, '| broken imgs:', desktopReport.layout.brokenImages.length);
console.log('LCP ms:', desktopReport.lcp);
console.log('resources KB:', Math.round(desktopReport.resources.bytes / 1024), '| heavy:', JSON.stringify(desktopReport.resources.biggest));
console.log('headings:', JSON.stringify(desktopReport.layout.headings, null, 1));
console.log('shots desktop:', desktopReport.shots.length, 'mobile:', mobileReport.shots.length);

ws.close();
process.exit(0);
