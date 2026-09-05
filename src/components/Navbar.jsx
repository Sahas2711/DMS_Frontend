import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useLanguage } from '../context/LanguageContext';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Tours', href: '/tours' },
    {
        label: 'Services',
        href: '/services',
        dropdown: [
            { label: 'Private Tours', href: '/services/private-tours' },
            { label: 'Tailor-Made Tours', href: '/services/tailor-made-tours' },
            { label: 'Airport Fast Track', href: '/services/airport-fast-track' },
            { label: 'Ground Services', href: '/services/ground-services' },
        ]
    },
    { label: 'Destination', href: '/destination' },
    { label: 'About Us', href: '/about' },
    { label: 'Trip', href: '/trip' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },

    // { label: 'Checkout', href: '/checkout' },
    // { label: 'Booking', href: '/booking' },

];

const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const FlagIcon = ({ code, className = "w-5 h-3.5" }) => {
    if (code === 'EN' || code === 'GB') {
        return (
            <svg className={`rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.2)] shrink-0 inline-block align-middle ${className}`} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
                <path fill="#012169" d="M0 0h640v480H0z"/>
                <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 177v62h-80L320 301 81 480H0v-60l239-179L0 64V0h75z"/>
                <path fill="#C8102E" d="m424 288 216 159v33h-44L368 314l56-26zM640 0v10L448 153l-34-45L594 0h46zM0 480v-10l193-144 33 44L46 480H0zm0-480l217 163-56 26L0 49V0z"/>
                <path fill="#FFF" d="M240 0h160v480H240zM0 160h640v160H0z"/>
                <path fill="#C8102E" d="M267 0h106v480H267zM0 187h640v106H0z"/>
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
    if (code === 'KO' || code === 'KR') {
        return (
            <svg className={`rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.15)] border border-gray-200/90 shrink-0 inline-block align-middle ${className}`} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFF" d="M0 0h640v480H0z"/>
                <g transform="translate(320,240)">
                    <path fill="#CD2E3A" d="M0-120a120 120 0 0 1 0 240 60 60 0 0 1 0-120 60 60 0 0 0 0-120z"/>
                    <path fill="#0047A0" d="M0 120a120 120 0 0 1 0-240 60 60 0 0 1 0 120 60 60 0 0 0 0 120z"/>
                    <g fill="#000">
                        <g transform="rotate(-56.31) translate(-190,0)">
                            <rect x="-15" y="-55" width="30" height="110" rx="3" />
                            <rect x="-55" y="-55" width="30" height="110" rx="3" />
                            <rect x="25" y="-55" width="30" height="110" rx="3" />
                        </g>
                        <g transform="rotate(123.69) translate(-190,0)">
                            <rect x="-55" y="-55" width="30" height="50" rx="3" />
                            <rect x="-55" y="5" width="30" height="50" rx="3" />
                            <rect x="-15" y="-55" width="30" height="50" rx="3" />
                            <rect x="-15" y="5" width="30" height="50" rx="3" />
                            <rect x="25" y="-55" width="30" height="50" rx="3" />
                            <rect x="25" y="5" width="30" height="50" rx="3" />
                        </g>
                        <g transform="rotate(56.31) translate(-190,0)">
                            <rect x="-55" y="-55" width="30" height="50" rx="3" />
                            <rect x="-55" y="5" width="30" height="50" rx="3" />
                            <rect x="-15" y="-55" width="30" height="110" rx="3" />
                            <rect x="25" y="-55" width="30" height="50" rx="3" />
                            <rect x="25" y="5" width="30" height="50" rx="3" />
                        </g>
                        <g transform="rotate(-123.69) translate(-190,0)">
                            <rect x="-55" y="-55" width="30" height="110" rx="3" />
                            <rect x="-15" y="-55" width="30" height="50" rx="3" />
                            <rect x="-15" y="5" width="30" height="50" rx="3" />
                            <rect x="25" y="-55" width="30" height="110" rx="3" />
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
    return null;
};

const ChevronDownIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 ml-1 inline transition-transform duration-200 ${className}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const { selectedLang, changeLanguage, languages } = useLanguage();
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isMobileLangDropdownOpen, setIsMobileLangDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isMobileUserDropdownOpen, setIsMobileUserDropdownOpen] = useState(false);
    const navContainerRef = useRef(null);
    const langDropdownRef = useRef(null);
    const userDropdownRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navContainerRef.current && !navContainerRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
                setIsLangDropdownOpen(false);
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDesktopDropdown = (label, e) => {
        if (e) e.preventDefault();
        setActiveDropdown(activeDropdown === label ? null : label);
    };

    const toggleMobileDropdown = (e) => {
        if (e) e.preventDefault();
        setMobileDropdownOpen(!mobileDropdownOpen);
    };

    const handleMobileLinkClick = () => {
        setIsMobileMenuOpen(false);
        setMobileDropdownOpen(false);
        setActiveDropdown(null);
        setIsMobileLangDropdownOpen(false);
        setIsMobileUserDropdownOpen(false);
    };

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
                    <img src={logo} alt="Asian Star Travel Logo" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" />
                </Link>
            </div>

            {/* Desktop Navigation Links */}
            <ul className="hidden xl:flex items-center space-x-5 2xl:space-x-7 text-[13px] 2xl:text-sm font-medium">
                {NAV_LINKS.map((link) => (
                    <li key={link.label} className="relative">
                        {link.dropdown ? (
                            <div className="relative">
                                <button
                                    onClick={(e) => toggleDesktopDropdown(link.label, e)}
                                    className={`flex items-center transition-colors focus:outline-none cursor-pointer py-1 ${activeDropdown === link.label ? 'text-[#C5A869]' : 'hover:text-[#C5A869]'}`}
                                >
                                    {link.label}
                                    <ChevronDownIcon className={activeDropdown === link.label ? 'rotate-180' : ''} />
                                </button>
                                {activeDropdown === link.label && (
                                    <div className="absolute top-full left-0 mt-3 w-52 bg-white text-gray-800 rounded-xl shadow-2xl py-2 overflow-hidden border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <Link
                                            to={link.href}
                                            className="block px-4 py-2.5 font-semibold text-xs text-[#081634] hover:bg-amber-50 hover:text-[#C5A869] transition-colors border-b border-gray-100"
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            All Services Overview &rarr;
                                        </Link>
                                        {link.dropdown.map(dropItem => (
                                            <Link
                                                key={dropItem.label}
                                                to={dropItem.href}
                                                className="block px-4 py-2 hover:bg-gray-50 hover:text-[#C5A869] transition-colors text-xs font-normal text-gray-700"
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                {dropItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to={link.href}
                                className="hover:text-[#C5A869] transition-colors whitespace-nowrap py-1"
                            >
                                {link.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>

            {/* Desktop Actions & Mobile Menu Toggle */}
            <div className="flex items-center space-x-2 md:space-x-3.5 z-50">
                {/* Language Dropdown (Desktop) */}
                <div className="relative" ref={langDropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                        className="hidden sm:flex items-center space-x-2 px-3 md:px-3.5 py-1.5 md:py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer group"
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
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180 text-[#C5A869]' : 'text-gray-300 group-hover:text-white'}`}
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
                                    className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between text-xs transition-colors hover:bg-amber-50/70 cursor-pointer ${selectedLang.code === lang.code ? 'text-[#081634] font-bold bg-amber-50/40' : 'text-gray-700 font-medium'
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
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-[#C5A869]">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* User Dropdown (Desktop) */}
                <div className="relative" ref={userDropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                        className={`hidden sm:flex p-2 md:p-2.5 rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer ${isUserDropdownOpen ? 'bg-white/20 border-white/40 text-[#C5A869]' : 'border-white/20 hover:bg-white/10 text-white'
                            }`}
                        aria-label="User Menu"
                        aria-expanded={isUserDropdownOpen}
                    >
                        <UserIcon />
                    </button>

                    {isUserDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2.5 w-[250px] bg-white text-gray-800 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] p-4 border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            {/* Log In Or Signup Button */}
                            <div className="mb-4">
                                <Link
                                    to="/booking"
                                    onClick={() => setIsUserDropdownOpen(false)}
                                    className="w-full bg-[#004d40] hover:bg-[#00382e] text-white font-bold text-sm py-3 px-5 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ring-4 ring-[#004d40]/15"
                                >
                                    <span>Log In Or Signup</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H3" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Menu Links */}
                            <div className="flex flex-col space-y-1 text-left px-1">
                                {/* Favourites */}
                                <Link
                                    to="/destination"
                                    onClick={() => setIsUserDropdownOpen(false)}
                                    className="flex items-center gap-3.5 py-2.5 px-2 text-[#2d3748] hover:text-[#004d40] hover:bg-gray-50 rounded-xl transition-all duration-200 group text-sm font-medium"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-[#004d40] group-hover:scale-110 transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                    <span>Favourites</span>
                                </Link>

                                {/* Itineraries */}
                                <Link
                                    to="/tours"
                                    onClick={() => setIsUserDropdownOpen(false)}
                                    className="flex items-center gap-3.5 py-2.5 px-2 text-[#2d3748] hover:text-[#004d40] hover:bg-gray-50 rounded-xl transition-all duration-200 group text-sm font-medium"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 text-[#004d40] group-hover:scale-110 transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.69A1.125 1.125 0 003 6.696v11.548c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                                    </svg>
                                    <span>Itineraries</span>
                                </Link>

                                {/* Create Itinerary */}
                                <Link
                                    to="/trip"
                                    onClick={() => setIsUserDropdownOpen(false)}
                                    className="flex items-center gap-3.5 py-2.5 px-2 text-[#2d3748] hover:text-[#004d40] hover:bg-gray-50 rounded-xl transition-all duration-200 group text-sm font-medium"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#004d40] group-hover:scale-110 transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <span>Create Itinerary</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle Button */}
                <button
                    className="xl:hidden p-2 text-white hover:text-[#C5A869] transition-colors focus:outline-none cursor-pointer rounded-lg hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Mobile Menu"
                >
                    {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#0E1C37]/98 backdrop-blur-xl border-t border-white/10 xl:hidden shadow-2xl py-6 px-6 sm:px-10 flex flex-col space-y-4 max-h-[85vh] overflow-y-auto z-40 animate-in fade-in duration-200">
                    <ul className="flex flex-col space-y-3.5 text-base font-medium divide-y divide-white/5">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label} className="pt-2.5 first:pt-0">
                                {link.dropdown ? (
                                    <div className="w-full">
                                        <button
                                            type="button"
                                            onClick={toggleMobileDropdown}
                                            className={`flex items-center justify-between w-full text-left transition-colors focus:outline-none cursor-pointer py-1.5 ${mobileDropdownOpen ? 'text-[#C5A869]' : 'hover:text-[#C5A869]'}`}
                                        >
                                            <span className="font-medium text-white">{link.label}</span>
                                            <ChevronDownIcon className={mobileDropdownOpen ? 'rotate-180' : ''} />
                                        </button>
                                        {mobileDropdownOpen && (
                                            <div className="mt-2.5 ml-2 flex flex-col space-y-2 border-l-2 border-[#C5A869]/60 pl-4 bg-white/5 rounded-r-lg p-3 animate-in slide-in-from-top-1 duration-200">
                                                <Link
                                                    to={link.href}
                                                    className="block text-[#C5A869] font-medium py-1.5 text-sm hover:underline"
                                                    onClick={handleMobileLinkClick}
                                                >
                                                    All Services Overview &rarr;
                                                </Link>
                                                {link.dropdown.map(dropItem => (
                                                    <Link
                                                        key={dropItem.label}
                                                        to={dropItem.href}
                                                        className="block text-gray-300 hover:text-[#C5A869] transition-colors py-1.5 text-sm"
                                                        onClick={handleMobileLinkClick}
                                                    >
                                                        {dropItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to={link.href}
                                        className="block hover:text-[#C5A869] transition-colors py-1 text-sm sm:text-base text-gray-200"
                                        onClick={handleMobileLinkClick}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center space-x-3.5">
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
                                                className={`w-full text-left px-3.5 py-2 flex items-center justify-between text-xs transition-colors hover:bg-amber-50 cursor-pointer ${selectedLang.code === lang.code ? 'text-[#081634] font-bold bg-amber-50/50' : 'text-gray-700'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <FlagIcon code={lang.code} className="w-4.5 h-3" />
                                                    <span className="font-medium text-gray-900">{lang.native}</span>
                                                </div>
                                                {selectedLang.code === lang.code && (
                                                    <span className="text-[#C5A869] text-xs font-bold">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Mobile User Menu */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsMobileUserDropdownOpen(!isMobileUserDropdownOpen)}
                                    className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors cursor-pointer block"
                                    aria-label="User Menu"
                                >
                                    <UserIcon />
                                </button>
                                {isMobileUserDropdownOpen && (
                                    <div className="absolute left-0 bottom-full mb-2 w-56 bg-white text-gray-800 rounded-2xl shadow-2xl p-3 border border-gray-100 z-50 animate-in fade-in duration-200">
                                        <Link
                                            to="/booking"
                                            onClick={handleMobileLinkClick}
                                            className="w-full bg-[#004d40] text-white font-bold text-xs py-2 px-3 rounded-full flex items-center justify-center gap-1.5 mb-2 shadow-sm"
                                        >
                                            <span>Log In Or Signup</span>
                                            <span>&rarr;</span>
                                        </Link>
                                        <div className="flex flex-col space-y-1 text-left">
                                            <Link
                                                to="/destination"
                                                onClick={handleMobileLinkClick}
                                                className="py-1.5 px-2 text-xs font-medium text-gray-700 hover:text-[#004d40] hover:bg-gray-50 rounded-lg flex items-center gap-2"
                                            >
                                                <span>❤️</span>
                                                <span>Favourites</span>
                                            </Link>
                                            <Link
                                                to="/tours"
                                                onClick={handleMobileLinkClick}
                                                className="py-1.5 px-2 text-xs font-medium text-gray-700 hover:text-[#004d40] hover:bg-gray-50 rounded-lg flex items-center gap-2"
                                            >
                                                <span>🗺️</span>
                                                <span>Itineraries</span>
                                            </Link>
                                            <Link
                                                to="/trip"
                                                onClick={handleMobileLinkClick}
                                                className="py-1.5 px-2 text-xs font-medium text-gray-700 hover:text-[#004d40] hover:bg-gray-50 rounded-lg flex items-center gap-2"
                                            >
                                                <span>➕</span>
                                                <span>Create Itinerary</span>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Link
                            to="/booking"
                            onClick={handleMobileLinkClick}
                            className="bg-[#C5A869] text-[#081634] text-xs font-bold px-4 py-2 rounded-full hover:bg-[#b59758] transition-colors uppercase tracking-wider"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
