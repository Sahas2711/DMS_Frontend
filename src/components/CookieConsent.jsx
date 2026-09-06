import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONSENT_EVENT, CONSENT_STORAGE_KEY, readConsent } from '../consent';

const writeConsent = (value) => {
    try {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
        window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { consent: value } }));
    } catch {
        // Storage unavailable (private mode / disabled): leave the banner state
        // in memory for this session only.
    }
};

/**
 * Lightweight consent banner. This site sets only functional/preference
 * storage (language choice, consent choice). Optional analytics is loaded only
 * after acceptance and only when a measurement ID is configured — the choice
 * is remembered in localStorage.
 */
const CookieConsent = () => {
    const [consent, setConsent] = useState(() => readConsent());

    const choose = (value) => {
        writeConsent(value);
        setConsent(value);
    };

    if (consent !== null) return null;

    return (
        <div
            role="region"
            aria-label="Cookie consent"
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-xl z-[90] bg-navy text-gray-200 rounded-2xl shadow-2xl border border-white/10 p-5 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
            <p className="text-xs md:text-sm leading-relaxed mb-4">
                We use a small amount of browser storage so the site works as you expect — for
                example remembering your language and your cookie choice. Optional site
                analytics, if we choose to run it, loads only after you accept. See our{' '}
                <Link to="/privacy-policy" className="text-gold underline underline-offset-2 hover:text-white">
                    privacy policy
                </Link>{' '}
                for details.
            </p>
            <div className="flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    onClick={() => choose('accept')}
                    className="bg-gold hover:bg-[#b59758] text-navy font-bold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                    Accept
                </button>
                <button
                    type="button"
                    onClick={() => choose('decline')}
                    className="border border-white/25 hover:bg-white/10 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                    Decline non-essential
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
