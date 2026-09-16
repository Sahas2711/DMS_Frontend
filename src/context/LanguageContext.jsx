import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import * as translationEngine from '../services/translationEngine';

/* eslint-disable react-refresh/only-export-components */

export const LanguageContext = createContext(null);

export const LANGUAGES = [
    {
        code: 'en',
        native: 'English',
        label: 'English',
    },
    {
        code: 'ja',
        native: '日本語',
        label: 'Japanese',
    },
    {
        code: 'ko',
        native: '한국어',
        label: 'Korean',
    },
];

const DEFAULT_LANGUAGE = LANGUAGES[0];

const STORAGE_KEY = 'ast-lang';

/* ---------------------------------------------------------------
   Read stored language safely
---------------------------------------------------------------- */

function readStoredLanguage() {
    if (typeof window === 'undefined') {
        return DEFAULT_LANGUAGE;
    }

    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);

        const found = LANGUAGES.find(
            (language) => language.code === stored
        );

        if (found) {
            return found;
        }
    } catch {
        // Ignore storage failures.
    }

    return DEFAULT_LANGUAGE;
}

/* ---------------------------------------------------------------
   Provider
---------------------------------------------------------------- */

export const LanguageProvider = ({ children }) => {
    const [selectedLang, setSelectedLang] =
        useState(readStoredLanguage);

    const [ready, setReady] = useState(false);

    const [failed, setFailed] = useState(false);

    /*
     * Every language change receives a unique request id.
     *
     * This prevents:
     *
     * English → Japanese → Korean
     *
     * from allowing the older Japanese operation to overwrite
     * the newer Korean operation.
     */
    const requestIdRef = useRef(0);

    const mountedRef = useRef(false);

    /* -----------------------------------------------------------
       Apply translation
    ----------------------------------------------------------- */

    const applyLanguage = useCallback(async (language) => {
        const requestId = ++requestIdRef.current;

        /*
         * Stop any previous translation operation if the engine
         * supports it.
         */
        try {
            translationEngine.stop?.();
        } catch {
            // Ignore engine cleanup failures.
        }

        if (language.code === 'en') {
            /*
             * English is the source language.
             *
             * If your translation engine has a reset/restore
             * method, use it here.
             */
            try {
                translationEngine.stop?.();
            } catch {
                // Ignore.
            }

            if (mountedRef.current) {
                setFailed(false);
                setReady(true);
            }

            return;
        }

        try {
            const result = await translationEngine.apply(
                language.code
            );

            /*
             * Ignore stale translation operations.
             */
            if (requestId !== requestIdRef.current) {
                return;
            }

            if (!mountedRef.current) {
                return;
            }

            setFailed(!result);
            setReady(true);
        } catch (error) {
            /*
             * Ignore errors from stale requests.
             */
            if (requestId !== requestIdRef.current) {
                return;
            }

            console.error(
                '[Language] Translation failed:',
                error
            );

            if (mountedRef.current) {
                setFailed(true);
                setReady(true);
            }
        }
    }, []);

    /* -----------------------------------------------------------
       Initialisation
    ----------------------------------------------------------- */

    useEffect(() => {
        mountedRef.current = true;

        const initialLanguage = readStoredLanguage();

        /*
         * Make sure React state matches the stored value.
         */
        setSelectedLang(initialLanguage);

        if (initialLanguage.code === 'en') {
            setReady(true);
        } else {
            applyLanguage(initialLanguage);
        }

        return () => {
            mountedRef.current = false;

            try {
                translationEngine.stop?.();
            } catch {
                // Ignore cleanup errors.
            }
        };
    }, [applyLanguage]);

    /* -----------------------------------------------------------
       Language change
    ----------------------------------------------------------- */

    const changeLanguage = useCallback(
        (language) => {
            const next =
                typeof language === 'string'
                    ? LANGUAGES.find(
                          (item) => item.code === language
                      )
                    : language;

            if (!next) {
                return;
            }

            if (next.code === selectedLang.code) {
                return;
            }

            /*
             * Increment immediately.
             *
             * This invalidates any translation operation that is
             * currently running.
             */
            requestIdRef.current += 1;

            setFailed(false);
            setReady(next.code === 'en');

            /*
             * Update React immediately.
             */
            setSelectedLang(next);

            /*
             * Persist preference.
             */
            try {
                window.localStorage.setItem(
                    STORAGE_KEY,
                    next.code
                );
            } catch {
                // Session-only if storage is unavailable.
            }

            /*
             * Start exactly one translation operation.
             *
             * DO NOT call translationEngine.apply() from another
             * selectedLang effect.
             */
            if (next.code === 'en') {
                try {
                    translationEngine.stop?.();
                } catch {
                    // Ignore.
                }

                return;
            }

            applyLanguage(next);
        },
        [applyLanguage, selectedLang.code]
    );

    const value = useMemo(
        () => ({
            selectedLang,
            languages: LANGUAGES,
            changeLanguage,
            ready,
            failed,
        }),
        [
            selectedLang,
            changeLanguage,
            ready,
            failed,
        ]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};