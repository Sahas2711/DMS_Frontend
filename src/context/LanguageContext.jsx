import { createContext, useContext, useState, useEffect } from 'react';

const LANGUAGES = [
    { code: 'EN', label: 'English', native: 'English', flag: '🇬🇧', langKey: 'en' },
    { code: 'JA', label: 'Japanese', native: '日本語', flag: '🇯🇵', langKey: 'ja' },
    { code: 'KO', label: 'Korean', native: '한국어', flag: '🇰🇷', langKey: 'ko' }
];

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [selectedLang, setSelectedLang] = useState(() => {
        const savedCode = localStorage.getItem('app_language');
        const found = LANGUAGES.find(l => l.code === savedCode);
        return found || LANGUAGES[0];
    });

    useEffect(() => {
        // Add Google Translate element container if not present
        if (!document.getElementById('google_translate_element')) {
            const div = document.createElement('div');
            div.id = 'google_translate_element';
            div.style.display = 'none';
            document.body.appendChild(div);
        }

        // Define the global translate init callback
        window.googleTranslateElementInit = () => {
            if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'en,ja,ko',
                        autoDisplay: false
                    },
                    'google_translate_element'
                );
            }
        };

        // Inject the Google Translate script if not already present
        if (!document.getElementById('google-translate-script')) {
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    // Function to trigger Google Translate
    const applyTranslation = (langKey) => {
        // Set translation cookies
        const domain = window.location.hostname;
        const cookieValue = `/en/${langKey}`;
        document.cookie = `googtrans=${cookieValue}; path=/;`;
        document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain};`;
        if (domain !== 'localhost') {
            document.cookie = `googtrans=${cookieValue}; path=/; domain=.${domain};`;
        }

        // Attempt to change the combo box value if present
        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = langKey;
            select.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
            // If combo box is not yet rendered, retry after a short delay
            setTimeout(() => {
                const retrySelect = document.querySelector('.goog-te-combo');
                if (retrySelect) {
                    retrySelect.value = langKey;
                    retrySelect.dispatchEvent(new Event('change', { bubbles: true }));
                } else {
                    // Fallback to reload if necessary
                    window.location.reload();
                }
            }, 500);
        }
    };

    const changeLanguage = (langObj) => {
        setSelectedLang(langObj);
        localStorage.setItem('app_language', langObj.code);
        applyTranslation(langObj.langKey);
    };

    // Apply saved language on mount
    useEffect(() => {
        if (selectedLang.langKey !== 'en') {
            const timer = setTimeout(() => {
                applyTranslation(selectedLang.langKey);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <LanguageContext.Provider value={{ selectedLang, changeLanguage, languages: LANGUAGES }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
