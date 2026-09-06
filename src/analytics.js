/**
 * Consent-gated GA4 pageview tracking.
 *
 * All analytics behaviour is driven by the measurement ID in
 * `src/config/site.js` (SITE.analytics.gaMeasurementId). With an empty ID every
 * function below is a safe no-op and NO external script is ever injected — this
 * keeps the default build free of third-party requests and fully GDPR-friendly.
 * The gtag script only loads after the visitor accepts the cookie banner.
 */

let injected = false;

export function initAnalytics(measurementId) {
    if (!measurementId || typeof window === 'undefined') return false;
    if (window.gtag) return true;

    const w = window;
    const d = document;

    w.dataLayer = w.dataLayer || [];
    const gtag = (...args) => {
        w.dataLayer.push(args);
    };
    gtag('js', new Date());
    gtag('config', measurementId, { send_page_view: false });

    w.gtag = w.gtag || gtag;

    if (!injected) {
        injected = true;
        const script = d.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        script.setAttribute('data-consent', 'ad_storage:granted');
        d.head.appendChild(script);
    }

    return true;
}

export function trackPageview(path, title = '') {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
        page_path: path,
        page_title: title,
        page_location: window.location.href,
    });
}