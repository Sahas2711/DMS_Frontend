const ENDPOINT = 'https://translate.googleapis.com/translate_a/single';
const SOURCE = 'en';
const MAX_CHUNK = 60;
const MAX_NODE_LEN = 1500;
const CONCURRENCY = 3;
const DEBOUNCE_MS = 250;
const SHOW_TEXT = 4;
const FILTER_ACCEPT = 1;
const FILTER_REJECT = 2;
const NO_TRANSLATE = '[translate="no"], [data-no-translate]';
const SKIP_SELECTOR = 'script,style,noscript,code,pre,textarea,select,template,svg,math,option';
const ATTR_NAMES = ['aria-label', 'placeholder', 'title', 'alt'];

const cache = new Map();
const textRecords = new Map();
const attrRecords = new Map();

let current = null;
let observer = null;
let timer = null;
let runId = 0;

const keyOf = (lang, value) => `${lang}\u0000${value}`;

const hasLetters = (value) => /\p{L}/u.test(value);

const chunk = (items, size) => {
    const out = [];
    for (let i = 0; i < items.length; i += size) {
        out.push(items.slice(i, i + size));
    }
    return out;
};

async function runPool(items, size, fn) {
    let index = 0;
    const workers = Array.from({ length: Math.min(size, items.length) }, async () => {
        while (index < items.length) {
            const item = items[index++];
            try {
                await fn(item);
            } catch {
                // keep the remaining batches going
            }
        }
    });
    await Promise.all(workers);
}

async function rawBatch(lines, target) {
    const res = await fetch(
        `${ENDPOINT}?client=gtx&sl=${SOURCE}&tl=${target}&dt=t&q=${encodeURIComponent(lines.join('\n'))}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const segments = Array.isArray(data) && Array.isArray(data[0]) ? data[0] : null;
    if (!segments) return null;
    const got = segments.map((segment) => {
        const translated = Array.isArray(segment) ? segment[0] : null;
        return typeof translated === 'string' ? translated : '';
    });
    if (got.length !== lines.length) return null;
    return got.map((line, i) => (i < got.length - 1 ? line.replace(/\n+$/, '') : line));
}

async function fetchMissing(lines, target) {
    const uniq = [...new Set(lines)];
    await runPool(chunk(uniq, MAX_CHUNK), CONCURRENCY, async (batch) => {
        const result = await rawBatch(batch, target);
        if (result) {
            batch.forEach((line, i) => cache.set(keyOf(target, line), result[i]));
            return;
        }
        for (const line of batch) {
            const single = await rawBatch([line], target);
            if (single) cache.set(keyOf(target, line), single[0]);
        }
    });
}

async function translateValues(values, target) {
    const uniq = [...new Set(values)].filter((value) => value.trim() !== '');
    const resolved = new Map();
    const missingLines = [];
    const pending = [];

    for (const value of uniq) {
        const key = keyOf(target, value);
        if (cache.has(key)) {
            resolved.set(value, cache.get(key));
            continue;
        }
        const lines = value.split('\n');
        const parts = lines.map((line) => {
            if (line === '') return '';
            const hit = cache.get(keyOf(target, line));
            if (hit != null) return hit;
            missingLines.push(line);
            return null;
        });
        pending.push({ value, key, lines, parts });
    }

    await fetchMissing(missingLines, target);
    if (current !== target) return resolved;

    for (const { value, key, lines, parts } of pending) {
        for (let i = 0; i < parts.length; i++) {
            if (parts[i] !== null) continue;
            parts[i] = cache.get(keyOf(target, lines[i])) ?? lines[i];
        }
        const merged = parts.join('\n');
        cache.set(key, merged);
        resolved.set(value, merged);
    }
    return resolved;
}

function collectTextNodes(root) {
    const found = [];
    const walker = document.createTreeWalker(root, SHOW_TEXT, {
        acceptNode(node) {
            const parent = node.parentElement;
            if (!parent) return FILTER_REJECT;
            if (parent.closest(NO_TRANSLATE)) return FILTER_REJECT;
            if (parent.matches(SKIP_SELECTOR)) return FILTER_REJECT;
            const value = node.nodeValue;
            if (value == null || value.length === 0 || value.length > MAX_NODE_LEN) {
                return FILTER_REJECT;
            }
            if (!hasLetters(value)) return FILTER_REJECT;
            return FILTER_ACCEPT;
        },
    });
    let node;
    while ((node = walker.nextNode())) found.push(node);
    return found;
}

function collectAttrTargets(root) {
    const found = [];
    root.querySelectorAll('*').forEach((el) => {
        if (el.closest(NO_TRANSLATE)) return;
        if (el.matches(SKIP_SELECTOR)) return;
        for (const name of ATTR_NAMES) {
            const value = el.getAttribute(name);
            if (value == null || value.trim() === '' || value.length > MAX_NODE_LEN) continue;
            if (!hasLetters(value)) continue;
            found.push({ el, name, value });
        }
    });
    return found;
}

function ensureTextRecord(node) {
    const record = textRecords.get(node);
    if (record) {
        if (record.applied !== null && node.nodeValue !== record.applied && node.nodeValue !== record.orig) {
            record.orig = node.nodeValue;
        }
        return record;
    }
    const next = { orig: node.nodeValue, applied: null, lang: null };
    textRecords.set(node, next);
    return next;
}

function ensureAttrRecord(el) {
    let record = attrRecords.get(el);
    if (!record) {
        record = { orig: {}, applied: {} };
        attrRecords.set(el, record);
    }
    return record;
}

async function translateBody(target) {
    const candidates = collectTextNodes(document.body).filter((node) => {
        const record = textRecords.get(node);
        return !(record && record.applied !== null && record.lang === target && node.nodeValue === record.applied);
    });
    if (candidates.length) {
        const map = await translateValues(candidates.map((node) => node.nodeValue), target);
        if (current !== target) return true;

        for (const node of candidates) {
            const translated = map.get(node.nodeValue);
            if (translated == null) continue;
            const next = ensureTextRecord(node);
            if (node.nodeValue !== translated) node.nodeValue = translated;
            next.applied = translated;
            next.lang = target;
        }
    }

    const attrCandidates = collectAttrTargets(document.body).filter(({ el, name, value }) => {
        const record = attrRecords.get(el);
        return !(record && record.applied[name] && record.applied[name].lang === target && record.applied[name].value === value);
    });
    if (attrCandidates.length) {
        const attrMap = await translateValues(attrCandidates.map((attr) => attr.value), target);
        if (current !== target) return true;

        for (const { el, name, value } of attrCandidates) {
            const translated = attrMap.get(value);
            if (translated == null) continue;
            const record = ensureAttrRecord(el);
            if (record.orig[name] == null) record.orig[name] = value;
            if (el.getAttribute(name) !== translated) el.setAttribute(name, translated);
            record.applied[name] = { value: translated, lang: target };
        }
    }

    return candidates.length > 0 || attrCandidates.length > 0;
}

function onChange() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (current && current !== 'en') translateBody(current);
    }, DEBOUNCE_MS);
}

function startObserver() {
    if (observer || typeof MutationObserver === 'undefined') return;
    observer = new MutationObserver(onChange);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}

function restore() {
    for (const [node, record] of textRecords) {
        if (record.orig != null && node.nodeValue !== record.orig) {
            node.nodeValue = record.orig;
        }
        record.applied = null;
        record.lang = null;
    }
    for (const [el, record] of attrRecords) {
        for (const name in record.orig) {
            el.setAttribute(name, record.orig[name]);
        }
        record.applied = {};
    }
    if (typeof document !== 'undefined') document.documentElement.lang = SOURCE;
}

export async function apply(target) {
    if (target === 'en') {
        stop();
        restore();
        current = null;
        return true;
    }
    if (target === current) return true;
    if (typeof document === 'undefined' || !document.body) return true;

    const id = ++runId;
    current = target;
    document.documentElement.lang = target;

    const ok = await translateBody(target).catch(() => false);
    if (id !== runId) return true;
    if (!ok) {
        if (current === target) {
            restore();
            current = null;
        }
        return false;
    }
    startObserver();
    return true;
}

export function stop() {
    runId += 1;
    clearTimeout(timer);
    timer = null;
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}