import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useLanguage } from '../hooks/useLanguage';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Tours', href: '/tours' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Destinations', href: '/destination' },
    // { label: 'Experiences', href: '/experiences' },
    // { label: 'Travel Trade', href: '/travel-trade' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
];

const ChevronDownIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 ml-1 inline transition-transform duration-200 ${className}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const FlagIcon = ({ code, className = "w-5 h-3.5" }) => {
    if (code === 'EN' || code === 'GB') {
        return (
            <svg className={`rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.2)] shrink-0 inline-block align-middle ${className}`} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
                <path fill="#012169" d="M0 0h640v480H0z"/>
                <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 177v62h-80L320 301 81 480H0v-60l239-179L0 64V0h75z"/>
                <path fill="#C8102E" d="m424 288 216 159v33h-44L368 314l56-26zM640 0v10L448 153l-34-45L594 0h46zM0 480v-10l193-144 33 44L46 480H0zm0-480l217 163-56 26L0 49V0z"/>
                <path fill="#FFF" d="M240 0h160v480H0zM0 160h640v160H0z"/>
                <path fill="#C8102E" d="M267 0h106v480H0zM0 187h640v106H0z"/>
            </svg>
        );
    }
    if (code === 'JA' || code === 'JP') {
        return (
            <svg className={`rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.15)] border border-gray-200/90 shrink-0 inline-block align-middle ${className}`} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFF" d="M0 0h640v480H0z"/>
                <circle fill="#BC002D" cx="320" cy="240" r="144"/>
            </svg>
        );
    }
    return null;
};

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { selectedLang, changeLanguage, languages } = useLanguage();
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isMobileLangDropdownOpen, setIsMobileLangDropdownOpen] = useState(false);

    const navContainerRef = useRef(null);
    const langDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navContainerRef.current && !navContainerRef.current.contains(event.target)) {
                setIsLangDropdownOpen(false);
            }
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
                setIsLangDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMobileLinkClick = () => {
        setIsMobileMenuOpen(false);
        setIsMobileLangDropdownOpen(false);
    };

    // Escape closes the mobile menu; lock background scroll while it is open.
    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false);
        };
        document.addEventListener('keydown', onKeyDown);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [isMobileMenuOpen]);

    return (
        <nav
            ref={navContainerRef}
            className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-28 py-3.5 md:py-4 text-white relative z-50 select-none"
            style={{ background: 'linear-gradient(90deg, #0E1C37 0%, #1B2A47 100%)' }}
            aria-label="Main Navigation"
        >
            {/* Logo */}
            <div className="flex-shrink-0 z-50">
                <Link to="/" aria-label="Home" onClick={handleMobileLinkClick}>
                    <img src={logo} alt="Asian Star Travel Logo" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" loading="lazy" decoding="async" />
                </Link>
            </div>

            {/* Desktop Navigation Links */}
            <ul className="hidden xl:flex items-center space-x-4 2xl:space-x-6 text-[13px] 2xl:text-sm font-medium">
                {NAV_LINKS.map((link) => (
                    <li key={link.label} className="relative">
                        <Link
                            to={link.href}
                            className="hover:text-gold transition-colors whitespace-nowrap py-1"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Desktop Actions & Mobile Menu Toggle */}
            <div className="flex items-center space-x-2 md:space-x-3.5 z-50">
                {/* Language Dropdown (Desktop) */}
                <div className="relative hidden sm:block" ref={langDropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                        className="flex items-center space-x-2 px-3 md:px-3.5 py-1.5 md:py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
                        aria-label="Change Language"
                        aria-expanded={isLangDropdownOpen}
                    >
                        <FlagIcon code={selectedLang.code} className="w-4.5 h-3" />
                        <span className="font-semibold">{selectedLang.code}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180 text-gold' : 'text-gray-300'}`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>

                    {isLangDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2.5 w-52 bg-white text-gray-800 rounded-xl shadow-2xl py-2 overflow-hidden border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                                Select Language
                            </div>
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    type="button"
                                    onClick={() => {
                                        changeLanguage(lang);
                                        setIsLangDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between text-xs transition-colors hover:bg-amber-50/70 cursor-pointer ${selectedLang.code === lang.code ? 'text-navy font-bold bg-amber-50/40' : 'text-gray-700 font-medium'
                                        }`}
                                >
                                    <div className="flex items-center space-x-2.5">
                                        <FlagIcon code={lang.code} className="w-5 h-3.5" />
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-900 font-semibold">{lang.native}</span>
                                            <span className="text-[10px] text-gray-400 font-normal">{lang.label} ({lang.code})</span>
                                        </div>
                                    </div>
                                    {selectedLang.code === lang.code && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-gold">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Primary CTA */}
                <Link
                    to="/request-quote"
                    className="btn btn--gold btn--md hidden lg:inline-flex"
                >
                    Request a Quote
                </Link>

                {/* Mobile Menu Toggle Button */}
                <button
                    className="xl:hidden p-2 text-white hover:text-gold transition-colors focus:outline-none cursor-pointer rounded-lg hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Mobile Menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#0E1C37]/98 backdrop-blur-xl border-t border-white/10 xl:hidden shadow-2xl py-6 px-6 sm:px-10 flex flex-col space-y-4 max-h-[85vh] overflow-y-auto z-40 animate-in fade-in duration-200">
                    <ul className="flex flex-col space-y-3.5 text-base font-medium divide-y divide-white/5">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label} className="pt-2.5 first:pt-0">
                                <Link
                                    to={link.href}
                                    className="block hover:text-gold transition-colors py-1 text-sm sm:text-base text-gray-200"
                                    onClick={handleMobileLinkClick}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            {/* Mobile Language Selector */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsMobileLangDropdownOpen(!isMobileLangDropdownOpen)}
                                    className="flex items-center space-x-2 px-3.5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-xs font-medium cursor-pointer"
                                >
                                    <FlagIcon code={selectedLang.code} className="w-4 h-2.5" />
                                    <span className="font-semibold">{selectedLang.code}</span>
                                    <ChevronDownIcon className={isMobileLangDropdownOpen ? 'rotate-180' : ''} />
                                </button>
                                {isMobileLangDropdownOpen && (
                                    <div className="absolute left-0 bottom-full mb-2 w-48 bg-white text-gray-800 rounded-xl shadow-2xl py-2 overflow-hidden border border-gray-100 z-50 animate-in fade-in duration-200">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                type="button"
                                                onClick={() => {
                                                    changeLanguage(lang);
                                                    setIsMobileLangDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-3.5 py-2 flex items-center justify-between text-xs transition-colors hover:bg-amber-50 cursor-pointer ${selectedLang.code === lang.code ? 'text-navy font-bold bg-amber-50/50' : 'text-gray-700'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <FlagIcon code={lang.code} className="w-4.5 h-3" />
                                                    <span className="font-medium text-gray-900">{lang.native}</span>
                                                </div>
                                                {selectedLang.code === lang.code && (
                                                    <span className="text-gold text-xs font-bold">&#10003;</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link
                                to="/become-a-partner"
                                onClick={handleMobileLinkClick}
                                className="text-gold text-xs font-semibold hover:underline"
                            >
                                Become a Partner &rarr;
                            </Link>
                        </div>

                        <Link
                            to="/request-quote"
                            onClick={handleMobileLinkClick}
                            className="btn btn--gold btn--md btn--block"
                        >
                            Request a Quote
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
