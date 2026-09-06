import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '../config/site';
import { initAnalytics, trackPageview } from '../analytics';
import { CONSENT_EVENT, readConsent } from '../consent';

/**
 * Consent-gated analytics. Renders no DOM itself — it mounts the gtag loader
 * and sends a pageview only after the visitor has accepted the cookie banner
 * and a measurement ID is configured. Without a configured ID nothing happens.
 */
const AnalyticsProvider = ({ children }) => {
    const { pathname, search } = useLocation();
    const measurementId = SITE.analytics?.gaMeasurementId || '';

    useEffect(() => {
        if (!measurementId) return undefined;
        if (readConsent() !== 'accept') return undefined;

        initAnalytics(measurementId);
        trackPageview(pathname + search, document.title);

        const onConsent = (event) => {
            if (event.detail?.consent === 'accept') {
                initAnalytics(measurementId);
                trackPageview(pathname + search, document.title);
            }
        };
        window.addEventListener(CONSENT_EVENT, onConsent);
        return () => window.removeEventListener(CONSENT_EVENT, onConsent);
    }, [measurementId, pathname, search]);

    return children;
};

export default AnalyticsProvider;