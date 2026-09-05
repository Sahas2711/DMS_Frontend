import { useCallback, useEffect, useMemo, useState } from 'react';
import { LANGUAGES, LanguageContext } from './language-context';

const STORAGE_KEY = 'app_language';

const readStoredLanguage = () => {
    try {
        const savedCode = localStorage.getItem(STORAGE_KEY);
        return LANGUAGES.find((l) => l.code === savedCode) || LANGUAGES[0];
    } catch {
        // localStorage can throw in private mode or when site data is blocked
        return LANGUAGES[0];
    }
};

export const LanguageProvider = ({ children }) => {
    const [selectedLang, setSelectedLang] = useState(readStoredLanguage);

    useEffect(() => {
        // Hidden container the Google Translate widget mounts into
        if (!document.getElementById('google_translate_element')) {
            const div = document.createElement('div');
            div.id = 'google_translate_element';
            div.style.display = 'none';
            document.body.appendChild(div);
        }

        window.googleTranslateElementInit = () => {
            if (window.google?.translate) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: LANGUAGES.map((l) => l.langKey).join(','),
                        autoDisplay: false
                    },
                    'google_translate_element'
                );
            }
        };

        if (!document.getElementById('google-translate-script')) {
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    const applyTranslation = useCallback((langKey) => {
        const domain = window.location.hostname;
        const cookieValue = `/en/${langKey}`;
        document.cookie = `googtrans=${cookieValue}; path=/;`;
        document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain};`;
        if (domain !== 'localhost') {
            document.cookie = `googtrans=${cookieValue}; path=/; domain=.${domain};`;
        }

        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = langKey;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            return;
        }

        // Widget has not mounted yet - retry once, then fall back to a reload so
        // the googtrans cookie is picked up on the next page load.
        setTimeout(() => {
            const retrySelect = document.querySelector('.goog-te-combo');
            if (retrySelect) {
                retrySelect.value = langKey;
                retrySelect.dispatchEvent(new Event('change', { bubbles: true }));
            } else {
                window.location.reload();
            }
        }, 500);
    }, []);

    const changeLanguage = useCallback((langObj) => {
        setSelectedLang(langObj);
        try {
            localStorage.setItem(STORAGE_KEY, langObj.code);
        } catch {
            // Persisting the choice is best-effort only
        }
        applyTranslation(langObj.langKey);
    }, [applyTranslation]);

    // Re-apply a previously saved non-English language once the widget has loaded
    useEffect(() => {
        const { langKey } = readStoredLanguage();
        if (langKey === 'en') return;

        const timer = setTimeout(() => applyTranslation(langKey), 600);
        return () => clearTimeout(timer);
    }, [applyTranslation]);

    const value = useMemo(
        () => ({ selectedLang, changeLanguage, languages: LANGUAGES }),
        [selectedLang, changeLanguage]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
