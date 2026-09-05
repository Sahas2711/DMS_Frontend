import { useContext } from 'react';
import { LanguageContext } from '../context/language-context';

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error('useLanguage must be used inside a <LanguageProvider>');
    }
    return ctx;
};
