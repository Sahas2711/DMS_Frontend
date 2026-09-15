import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { DESTINATIONS, HERO_CAPABILITIES } from '../../pages/homeContent';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const EASE = [0.16, 1, 0.3, 1];

const NAV_LINKS = [
    { label: 'Destinations', path: '/destination', panel: 'destinations' },
    { label: 'Experiences', path: '/experiences' },
    { label: 'Itineraries', path: '/tours' },
    { label: 'Journal', path: '/blog' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
];

export default function PremiumNav() {
    const reduce = useReducedMotion();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(() => window.scrollY > 40);
    const [panelOpen, setPanelOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const closeTimer = useRef(null);
    const menuButtonRef = useRef(null);
    const panelRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const isHome = location.pathname === '/';
    const overlay = isHome && !scrolled && !panelOpen && !mobileOpen;

    /* Scroll state — one passive listener; no animation library here. */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* Close everything when navigation happens. Derived-reset pattern: no
       effect needed, so there is no cascading render on route change. */
    const [navKey, setNavKey] = useState(location.pathname);
    if (navKey !== location.pathname) {
        setNavKey(location.pathname);
        setPanelOpen(false);
        setMobileOpen(false);
    }

    /* Body scroll lock while the mobile menu is open (Lenis-safe: native). */
    useEffect(() => {
        if (mobileOpen) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = prev; };
        }
        return undefined;
    }, [mobileOpen]);

    /* Escape + focus return for the mobile menu. */
    useEffect(() => {
        if (!mobileOpen) return undefined;
        const onKey = (e) => { if (e.key === 'Escape') { setMobileOpen(false); menuButtonRef.current?.focus(); } };
        document.addEventListener('keydown', onKey);
        // Move focus into the dialog for keyboard/screen-reader users.
        const focusTimer = window.setTimeout(() => mobileMenuRef.current?.focus(), 60);
        return () => {
            document.removeEventListener('keydown', onKey);
            window.clearTimeout(focusTimer);
        };
    }, [mobileOpen]);

    const openPanel = useCallback(() => {
        window.clearTimeout(closeTimer.current);
        setPanelOpen(true);
    }, []);
    const schedulePanelClose = useCallback(() => {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = window.setTimeout(() => setPanelOpen(false), 120);
    }, []);

    const panelLinkProps = {
        onMouseEnter: openPanel,
        onFocus: openPanel,
        onMouseLeave: schedulePanelClose,
        onBlur: schedulePanelClose,
    };

    const dark = !overlay;

    return (
        <>
            <a
                href="#home-main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-navy-deep"
            >
                Skip to content
            </a>

            <header
                className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${dark
                    ? 'bg-[rgba(5,14,34,0.92)] shadow-[0_1px_0_rgba(197,168,105,0.12)] backdrop-blur-md'
                    : 'bg-transparent'}`}
                onMouseLeave={schedulePanelClose}
            >
                <nav
                    aria-label="Primary"
                    className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-16 lg:px-12"
                >
                    {/* Wordmark */}
                    <Link to="/" className="group flex items-center gap-3" aria-label="Asian Star Travel — home">
                        <span
                            aria-hidden="true"
                            className="grid h-8 w-8 place-items-center bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4 text-navy-deep" fill="currentColor">
                                <path d="M12 2l1.8 6.5L20 10l-6.2 1.5L12 18l-1.8-6.5L4 10l6.2-1.5L12 2z" />
                            </svg>
                        </span>
                        <span className="leading-none">
                            <span className="block text-[11px] font-semibold uppercase tracking-[0.32em] text-white/85">
                                Asian Star
                            </span>
                            <span className="mt-1 block text-[8px] font-medium uppercase tracking-[0.3em] text-white/35">
                                Travel DMC
                            </span>
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden items-center gap-9 lg:flex">
                        {NAV_LINKS.map((link) => (
                            <div key={link.path} {...(link.panel ? panelLinkProps : {})}>
                                <Link
                                    to={link.path}
                                    className="link-underline py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 transition-colors duration-300 hover:text-white"
                                    aria-haspopup={link.panel ? 'true' : undefined}
                                    aria-expanded={link.panel ? panelOpen : undefined}
                                >
                                    {link.label}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="hidden items-center gap-5 lg:flex">
                        <LanguageSwitcher variant="desktop" />
                        <Link
                            to="/request-quote"
                            className="link-underline py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45 transition-colors duration-300 hover:text-gold"
                        >
                            Request a Quote
                        </Link>
                        <Link
                            to="/become-a-partner"
                            className="border border-white/25 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-navy-deep"
                        >
                            Become a Partner
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        ref={menuButtonRef}
                        type="button"
                        onClick={() => setMobileOpen((v) => !v)}
                        className="relative z-50 -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                    >
                        <motion.span animate={mobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="block h-px w-6 bg-white/80" />
                        <motion.span animate={mobileOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="block h-px w-6 bg-white/80" />
                        <motion.span animate={mobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="block h-px w-6 bg-white/80" />
                    </button>
                </nav>

                {/* Destinations panel (desktop) */}
                <AnimatePresence>
                    {panelOpen && (
                        <motion.div
                            ref={panelRef}
                            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                            transition={{ duration: 0.45, ease: EASE }}
                            className="absolute inset-x-0 top-full hidden border-t border-white/[0.06] bg-[rgba(5,14,34,0.97)] backdrop-blur-xl lg:block"
                            onMouseEnter={openPanel}
                        >
                            <div className="mx-auto grid max-w-[1440px] grid-cols-4 gap-10 px-12 py-10">
                                {DESTINATIONS.map((d) => (
                                    <Link
                                        key={d.id}
                                        to={d.route}
                                        className="group/dest block"
                                        onClick={() => setPanelOpen(false)}
                                    >
                                        <div className="relative mb-4 aspect-[4/3] overflow-hidden">
                                            <img
                                                src={d.image}
                                                alt=""
                                                aria-hidden="true"
                                                loading="lazy"
                                                decoding="async"
                                                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/dest:scale-[1.06]"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
                                        </div>
                                        <div className="flex items-baseline justify-between">
                                            <span className="font-display text-lg text-white transition-colors duration-300 group-hover/dest:text-gold">
                                                {d.name}
                                            </span>
                                            <span className="text-[10px] tracking-[0.2em] text-white/30">{d.number}</span>
                                        </div>
                                        <p className="mt-1 text-[11px] leading-relaxed text-white/35">{d.tagline}</p>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Mobile full-screen menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        ref={mobileMenuRef}
                        tabIndex={-1}
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu"
                        initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
                        animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
                        exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="fixed inset-0 z-40 flex flex-col bg-navy-deep lg:hidden"
                    >
                        <div className="flex-1 overflow-y-auto px-6 pb-10 pt-24 sm:px-10">
                            <nav aria-label="Mobile" className="flex flex-col">
                                {NAV_LINKS.map((link, i) => (
                                    <motion.div
                                        key={link.path}
                                        initial={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
                                        animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: EASE }}
                                        className="border-b border-white/[0.07]"
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-baseline gap-4 py-4"
                                        >
                                            <span className="text-[10px] tracking-[0.2em] text-gold/50">0{i + 1}</span>
                                            <span className="font-display text-[28px] leading-none text-white/85 transition-colors duration-300 hover:text-white">
                                                {link.label}
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="mt-8 flex flex-wrap gap-2"
                            >
                                {HERO_CAPABILITIES.map((c) => (
                                    <span key={c} className="border border-white/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">
                                        {c}
                                    </span>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.55 }}
                                className="mt-6"
                            >
                                <LanguageSwitcher variant="mobile" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
                                className="mt-10 flex flex-col gap-3"
                            >
                                <Link
                                    to="/request-quote"
                                    onClick={() => setMobileOpen(false)}
                                    className="bg-gold py-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-deep"
                                >
                                    Request a Quote
                                </Link>
                                <Link
                                    to="/become-a-partner"
                                    onClick={() => setMobileOpen(false)}
                                    className="border border-white/15 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70"
                                >
                                    Become a Partner
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
