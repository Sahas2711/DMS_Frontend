import { useCallback, useEffect, useMemo, useState } from 'react';
import { LANGUAGES, LanguageContext } from './language-context';

const STORAGE_KEY = 'app_language';
const WIDGET_SCRIPT_ID = 'google-translate-script';
const WIDGET_SCRIPT_SRC =
    'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
const RELOAD_GUARD_KEY = 'gt_reload_ts';

const readStoredLanguage = () => {
    try {
        const savedCode = localStorage.getItem(STORAGE_KEY);
        return LANGUAGES.find((l) => l.code === savedCode) || LANGUAGES[0];
    } catch {
        // localStorage can throw in private mode or when site data is blocked
        return LANGUAGES[0];
    }
};

/**
 * Set the googtrans cookie Google Translate reads on a fresh page load. The
 * cookie must be scoped to the exact host, the bare domain and the dotted
 * domain so it survives redirects (www -> apex and back) in production.
 */
const writeGoogCookie = (langKey) => {
    const domain = window.location.hostname;
    const value = `/en/${langKey}`;
    document.cookie = `googtrans=${value}; path=/; max-age=86400;`;
    if (domain !== 'localhost' && domain !== '127.0.0.1') {
        document.cookie = `googtrans=${value}; path=/; domain=${domain}; max-age=86400;`;
        document.cookie = `googtrans=${value}; path=/; domain=.${domain}; max-age=86400;`;
    }
};

const injectWidgetScript = () => {
    if (document.getElementById(WIDGET_SCRIPT_ID)) {
        return { script: null, alreadyLoaded: true };
    }

    const script = document.createElement('script');
    script.id = WIDGET_SCRIPT_ID;
    script.src = WIDGET_SCRIPT_SRC;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onerror = () => {
        // Logged for visibility; the UI still allows re-selecting EN.
        // console.debug('[i18n] Google Translate widget failed to load.');
    };
    document.body.appendChild(script);
    return { script, alreadyLoaded: false };
};

const mountWidgetElement = (targetContainer) => {
    if (window.google && typeof window.google.translate?.TranslateElement === 'function') {
        const container = targetContainer || document.getElementById('google_translate_element');
        if (!container) return;
        try {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: LANGUAGES.map((l) => l.langKey).join(','),
                    autoDisplay: false,
                },
                container
            );
        } catch {
            // Widget can throw when the script is still warming up — retried by the poll below.
        }
    }
};

const waitFor = (timeoutMs, intervalMs = 200) =>
    new Promise((resolve) => {
        const deadline = Date.now() + timeoutMs;
        const poll = () => {
            if (
                window.google &&
                typeof window.google.translate?.TranslateElement === 'function' &&
                document.querySelector('.goog-te-combo')
            ) {
                resolve(true);
                return;
            }
            if (Date.now() >= deadline) {
                resolve(false);
                return;
            }
            // Keep trying to mount the widget if the script finished but the
            // element never initialised (common on slow connections).
            if (window.google && typeof window.google.translate?.TranslateElement === 'function') {
                mountWidgetElement();
            }
            window.setTimeout(poll, intervalMs);
        };
        poll();
    });

const dispatchToWidget = (langKey) => {
    const select = document.querySelector('.goog-te-combo');
    if (!select) return false;
    const supported = Array.from(select.querySelectorAll('option')).some(
        (option) => option.value === langKey
    );
    if (!supported) return false;
    select.value = langKey;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
};

export const LanguageProvider = ({ children }) => {
    const [selectedLang, setSelectedLang] = useState(readStoredLanguage);
    const [ready, setReady] = useState(false);
    const [failed, setFailed] = useState(false);

    // Mount the widget once. Registering a global init callback is still how
    // the element script bootstraps the widget on every page load.
    useEffect(() => {
        if (!document.getElementById('google_translate_element')) {
            const div = document.createElement('div');
            div.id = 'google_translate_element';
            div.style.display = 'none';
            document.body.appendChild(div);
        }

        const prevInit = window.googleTranslateElementInit;
        window.googleTranslateElementInit = () => {
            mountWidgetElement(document.getElementById('google_translate_element'));
        };

        const { script } = injectWidgetScript();

        return () => {
            if (script) {
                // StrictMode remounts in dev; keep the host alive across the
                // remount by only restoring the previous callback.
                script.onerror = null;
            }
            window.googleTranslateElementInit = prevInit;
        };
    }, []);

    // When the widget is available, pre-warm it so the first language change
    // has a mounted, listening <select>. The widget needs a tick after the
    // element script finishes before the combo exists.
    useEffect(() => {
        let cancelled = false;
        waitFor(4000).then((ok) => {
            if (cancelled) return;
            setReady(ok);
            if (!ok) setFailed(true);
        });

        // Re-apply a previously saved non-English language on a fresh page load.
        const { langKey } = readStoredLanguage();
        if (langKey !== 'en') {
            writeGoogCookie(langKey);
            setTimeout(() => {
                if (!cancelled) {
                    window.document.documentElement.lang = langKey;
                    if (!dispatchToWidget(langKey)) setFailed(true);
                }
            }, 600);
        }

        return () => {
            cancelled = true;
        };
    }, []);

    const applyTranslation = useCallback(
        async (langKey) => {
            writeGoogCookie(langKey);
            window.document.documentElement.lang = langKey;

            if (dispatchToWidget(langKey)) {
                setFailed(false);
                return;
            }

            // The widget may not have mounted yet — wait for it, then dispatch.
            const ok = await waitFor(3500);
            if (ok) {
                dispatchToWidget(langKey);
                setFailed(false);
                setReady(true);
                return;
            }

            setFailed(true);

            // Last resort: a hard reload. Google re-reads the googtrans cookie on
            // load, so the persisted language applies even on top-level domains
            // where the widget refuses a client-side dispatch. Guarded so a stuck
            // widget can never trigger a reload loop.
            try {
                const lastReload = Number(sessionStorage.getItem(RELOAD_GUARD_KEY) || 0);
                const now = Date.now();
                if (now - lastReload > 4000) {
                    sessionStorage.setItem(RELOAD_GUARD_KEY, String(now));
                    window.location.reload();
                }
            } catch {
                // sessionStorage unavailable — never reload in that case.
            }
        },
        []
    );

    const changeLanguage = useCallback(
        (langObj) => {
            setSelectedLang(langObj);
            try {
                localStorage.setItem(STORAGE_KEY, langObj.code);
            } catch {
                // Persisting the choice is best-effort only
            }
            applyTranslation(langObj.langKey);
        },
        [applyTranslation]
    );

    const value = useMemo(
        () => ({ selectedLang, changeLanguage, languages: LANGUAGES, ready, failed }),
        [selectedLang, changeLanguage, ready, failed]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};