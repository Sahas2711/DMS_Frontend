import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('analytics gating', () => {
    beforeEach(() => {
        vi.resetModules();
        document.head.innerHTML = '';
        vi.stubGlobal('window', { location: { href: 'https://www.asianstartravel.vn/' } });
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('is a no-op when no measurement ID is configured (no script, no gtag)', async () => {
        const { initAnalytics, trackPageview } = await import('./analytics');
        expect(initAnalytics('')).toBe(false);
        trackPageview('/about');
        expect(document.head.querySelector('script[src*="googletagmanager"]')).toBeNull();
        expect(window.dataLayer).toBeUndefined();
    });

    it('injects gtag and initialises the config once an ID is provided', async () => {
        const { initAnalytics } = await import('./analytics');
        const ok = initAnalytics('G-TEST123');
        expect(ok).toBe(true);
        expect(document.head.querySelector('script[src*="gtag/js?id=G-TEST123"]')).not.toBeNull();
        expect(window.gtag).toBeTypeOf('function');
        expect(window.dataLayer).toBeInstanceOf(Array);
    });

    it('does not inject duplicate scripts on repeated init', async () => {
        const { initAnalytics } = await import('./analytics');
        initAnalytics('G-TEST123');
        initAnalytics('G-TEST123');
        expect(document.head.querySelectorAll('script[src*="googletagmanager"]').length).toBe(1);
    });

    it('trackPageview is a safe no-op before gtag is loaded', async () => {
        const { trackPageview } = await import('./analytics');
        expect(() => trackPageview('/contact')).not.toThrow();
    });
});

describe('analytics with configured MeasureID pushes a page_view event', () => {
    beforeEach(() => {
        vi.resetModules();
        document.head.innerHTML = '';
        vi.stubGlobal('window', { location: { href: 'https://www.asianstartravel.vn/request-quote' } });
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('gtag push captures page_view upon route change', async () => {
        const { initAnalytics, trackPageview } = await import('./analytics');
        initAnalytics('G-TEST123');
        trackPageview('/blog', 'Blog');
        const views = window.dataLayer.filter(
            (entry) => typeof entry === 'object' && entry[0] === 'event' && entry[1] === 'page_view',
        );
        expect(views.length).toBe(1);
        expect(views[0][2].page_path).toBe('/blog');
    });
});