import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const BASE_HTML = `
    <h1>Hello</h1>
    <p>A paragraph<b> bold</b></p>
    <input placeholder="Email address">
    <div aria-label="Contact us"></div>
    <span translate="no">Keep me</span>
    <script>var keep = true;</script>
`;

const prefix = (lang) => `${lang.toUpperCase()}|`;

function mockFetch() {
    const calls = [];
    const fn = vi.fn(async (url) => {
        const parsed = new URL(url);
        const target = parsed.searchParams.get('tl');
        const lines = (parsed.searchParams.get('q') ?? '').split('\n');
        calls.push(lines);
        const segments = lines.map((line) => [`${prefix(target)}${line}`, line, null, null, 3]);
        return { ok: true, json: async () => [segments, 'en', null, null, null, null, []] };
    });
    vi.stubGlobal('fetch', fn);
    return { calls, fn };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('translationEngine', () => {
    let engine;

    beforeEach(async () => {
        engine = await import('./translationEngine');
        engine.reset();
        document.body.innerHTML = BASE_HTML;
        document.documentElement.lang = 'en';
    });

    afterEach(() => {
        engine.stop();
        vi.unstubAllGlobals();
    });

    it('translates visible text and attributes and sets the html lang', async () => {
        mockFetch();
        const ok = await engine.apply('ja');

        expect(ok).toBe(true);
        expect(document.documentElement.lang).toBe('ja');
        expect(document.querySelector('h1').textContent).toBe('JA|Hello');
        expect(document.querySelector('p').textContent).toBe('JA|A paragraphJA| bold');
        expect(document.querySelector('input').getAttribute('placeholder')).toBe('JA|Email address');
        expect(document.querySelector('div[aria-label]').getAttribute('aria-label')).toBe('JA|Contact us');
        expect(document.querySelector('span[translate="no"]').textContent).toBe('Keep me');
        expect(document.querySelector('script').textContent).toBe('var keep = true;');
    });

    it('restores the original content and lang on apply(en)', async () => {
        mockFetch();
        await engine.apply('ja');
        await engine.apply('en');

        expect(document.documentElement.lang).toBe('en');
        expect(document.querySelector('h1').textContent).toBe('Hello');
        expect(document.querySelector('p').textContent).toBe('A paragraph bold');
        expect(document.querySelector('input').getAttribute('placeholder')).toBe('Email address');
    });

    it('reuses the cache when the same content is translated again', async () => {
        const { fn } = mockFetch();
        await engine.apply('ja');
        await engine.apply('en');
        await engine.apply('ja');
        await engine.apply('en');

        expect(fn).toHaveBeenCalledTimes(2);
    });

    it('cross-translates the currently visible text when switching languages', async () => {
        mockFetch();
        await engine.apply('ja');
        expect(document.querySelector('h1').textContent).toBe('JA|Hello');

        await engine.apply('ko');
        expect(document.querySelector('h1').textContent).toBe('KO|Hello');

        await engine.apply('en');
        expect(document.querySelector('h1').textContent).toBe('Hello');
    });

    it('batches lines into a single request per chunk', async () => {
        const { calls, fn } = mockFetch();
        await engine.apply('ja');

        expect(fn).toHaveBeenCalledTimes(2);
        expect(calls[0]).toEqual(expect.arrayContaining(['Hello', 'A paragraph', ' bold']));
        expect(calls[0]).not.toEqual(expect.arrayContaining(['Keep me']));
        expect(calls[1]).toEqual(expect.arrayContaining(['Email address', 'Contact us']));
    });

    it('auto-translates content added while a language is active', async () => {
        const { fn } = mockFetch();
        await engine.apply('ja');

        const fresh = document.createElement('p');
        fresh.textContent = 'Fresh note';
        document.body.appendChild(fresh);

        await sleep(400);
        expect(fresh.textContent).toBe('JA|Fresh note');
        expect(fn).toHaveBeenCalledTimes(3);
    });
});