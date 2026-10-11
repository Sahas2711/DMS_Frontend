/* eslint-disable react-refresh/only-export-components */

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {},
});

function getInitialTheme() {
    try {
        return localStorage.getItem('theme') === 'dark'
            ? 'dark'
            : 'light';
    } catch {
        return 'light';
    }
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;

        root.setAttribute('data-theme', theme);
        root.style.colorScheme = theme;

        try {
            localStorage.setItem('theme', theme);
        } catch {
            // Storage may be unavailable.
        }
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((current) =>
            current === 'dark' ? 'light' : 'dark'
        );
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);