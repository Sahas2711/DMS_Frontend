import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as translationEngine from '../services/translationEngine';

/* eslint-disable react-refresh/only-export-components */

export const LanguageContext = createContext(null);

export const LANGUAGES = [
    { code: 'en', native: 'English', label: 'English' },
    { code: 'ja', native: '日本語', label: 'Japanese' },
    { code: 'ko', native: '한국어', label: 'Korean' },
];

const DEFAULT_LANGUAGE = LANGUAGES[0];
const STORAGE_KEY = 'ast-lang';

const readStoredCode = () => {
    if (typeof window === 'undefined') return null;
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored && LANGUAGES.some((lang) => lang.code === stored)) return stored;
    } catch {
        // storage unavailable: fall back to the <html lang> attribute
    }
    try {
        const htmlLang = document.documentElement.getAttribute('lang');
        if (htmlLang && LANGUAGES.some((lang) => lang.code === htmlLang)) return htmlLang;
    } catch {
        // no document yet
    }
    return null;
};

const readLanguage = () => {
    const code = readStoredCode();
    return LANGUAGES.find((lang) => lang.code === code) ?? DEFAULT_LANGUAGE;
};

export const LanguageProvider = ({ children }) => {
    const [selectedLang, setSelectedLang] = useState(readLanguage);
    const [ready, setReady] = useState(() => readLanguage().code === 'en');
    const [failed, setFailed] = useState(false);
    const activeLang = useRef(selectedLang);

    const applyLang = useCallback(async (lang) => {
        const ok = await translationEngine.apply(lang.code);
        if (activeLang.current.code !== lang.code) return;
        setFailed(!ok);
    }, []);

    useEffect(() => {
        let cancelled = false;
        const initial = readLanguage();
        activeLang.current = initial;
        if (initial.code !== 'en') {
            applyLang(initial).finally(() => {
                if (!cancelled) setReady(true);
            });
        }
        return () => {
            cancelled = true;
            translationEngine.stop();
        };
    }, [applyLang]);

    // After React re-renders from setSelectedLang, its virtual DOM
    // (English text) overwrites the translated real DOM.  This effect
    // re-applies translations on the next frame so the user never sees
    // the English flash.
    useEffect(() => {
        if (selectedLang.code !== 'en') {
            const raf = requestAnimationFrame(() => {
                translationEngine.apply(selectedLang.code, true);
            });
            return () => cancelAnimationFrame(raf);
        }
    }, [selectedLang]);

    const changeLanguage = useCallback(
        (language) => {
            const next = typeof language === 'string' ? LANGUAGES.find((l) => l.code === language) : language;
            if (!next || next.code === activeLang.current.code) return;
            activeLang.current = next;
            setSelectedLang(next);
            try {
                window.localStorage.setItem(STORAGE_KEY, next.code);
            } catch {
                // storage unavailable: selection is session-only
            }
            setFailed(false);
            applyLang(next);
        },
        [applyLang]
    );

    const value = useMemo(
        () => ({ selectedLang, changeLanguage, languages: LANGUAGES, ready, failed }),
        [selectedLang, changeLanguage, ready, failed]
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};