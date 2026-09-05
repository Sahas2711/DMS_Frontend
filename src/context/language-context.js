import { createContext } from 'react';

export const LANGUAGES = [
    { code: 'EN', label: 'English', native: 'English', flag: '🇬🇧', langKey: 'en' },
    { code: 'JA', label: 'Japanese', native: '日本語', flag: '🇯🇵', langKey: 'ja' },
    { code: 'KO', label: 'Korean', native: '한국어', flag: '🇰🇷', langKey: 'ko' }
];

export const LanguageContext = createContext(null);
