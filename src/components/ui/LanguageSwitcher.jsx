import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';

const EASE = [0.16, 1, 0.3, 1];

export default function LanguageSwitcher({ variant = 'desktop' }) {
    const { selectedLang, changeLanguage, languages } = useLanguage();
    const [open, setOpen] = useState(false);
    const reduce = useReducedMotion();
    const ref = useRef(null);

    useEffect(() => {
        if (!open) return undefined;
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        const handleKey = (e) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKey);
        };
    }, [open]);

    const isDesktop = variant === 'desktop';

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`flex items-center gap-1.5 transition-colors duration-300 ${
                    isDesktop
                        ? 'py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45 hover:text-gold'
                        : 'py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50'
                }`}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={`Current language: ${selectedLang.label}. Change language`}
            >
                <svg viewBox="0 0 24 24" className={`${isDesktop ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
                </svg>
                {selectedLang.native}
                <svg viewBox="0 0 12 12" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''} ${isDesktop ? 'h-2.5 w-2.5' : 'h-3 w-3'}`} fill="currentColor">
                    <path d="M2 4.5l4 4 4-4" />
                </svg>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        role="listbox"
                        aria-label="Select language"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: EASE }}
                        className={`absolute right-0 z-50 min-w-[140px] overflow-hidden border border-white/10 bg-[rgba(5,14,34,0.97)] shadow-xl backdrop-blur-xl ${
                            isDesktop ? 'mt-2' : 'mt-1'
                        }`}
                    >
                        {languages.map((lang) => (
                            <li
                                key={lang.code}
                                role="option"
                                aria-selected={selectedLang.code === lang.code}
                                onClick={() => {
                                    changeLanguage(lang.code);
                                    setOpen(false);
                                }}
                                className={`flex cursor-pointer items-center gap-2 px-4 py-2.5 text-[11px] font-medium tracking-wide transition-colors duration-200 ${
                                    selectedLang.code === lang.code
                                        ? 'bg-gold/10 text-gold'
                                        : 'text-white/55 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <span className="font-semibold">{lang.native}</span>
                                <span className="text-[9px] uppercase tracking-[0.15em] text-white/25">{lang.label}</span>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
