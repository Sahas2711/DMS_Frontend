import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { DESTINATIONS, HERO_CAPABILITIES } from '../../pages/homeContent';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useTheme } from '../../context/ThemeContext';

const EASE = [0.16, 1, 0.3, 1];

const NAV_LINKS = [
    {
        label: 'Home',
        path: '/',
    },
    {
        label: 'Tours',
        path: '/tours',
    },
    {
        label: 'Services',
        path: '/services',
        children: [
            {
                label: 'Private Transfer',
                path: '/services/ground-services',
            },
            {
                label: 'Relaxation / Wellness',
                path: '/experiences',
            },
        ],
    },
    {
        label: 'Destinations',
        path: '/destination',
        panel: 'destinations',
    },
    {
        label: 'About Us',
        path: '/about',
    },
    {
        label: 'Contact',
        path: '/contact',
    },
    {
        label: 'Blog',
        path: '/blog',
    },
];

export default function PremiumNav() {
    const reduce = useReducedMotion();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    const [panelOpen, setPanelOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const closeTimer = useRef(null);
    const menuButtonRef = useRef(null);
    const panelRef = useRef(null);
    const mobileMenuRef = useRef(null);

    /*
     * ================================================================
     * NAVBAR SCROLL
     * ================================================================
     *
     * Top:
     *   transparent + dark logo
     *
     * After 30px:
     *   solid navy + light logo
     */
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    /*
     * ================================================================
     * CLOSE MENUS ON ROUTE CHANGE
     * ================================================================
     */
    useEffect(() => {
        setPanelOpen(false);
        setMobileOpen(false);
    }, [location.pathname]);

    /*
     * ================================================================
     * ESCAPE KEY
     * ================================================================
     */
    useEffect(() => {
        if (!mobileOpen) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setMobileOpen(false);

                window.setTimeout(() => {
                    menuButtonRef.current?.focus();
                }, 0);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [mobileOpen]);

    /*
     * ================================================================
     * DESTINATION PANEL
     * ================================================================
     */
    const openPanel = useCallback(() => {
        window.clearTimeout(closeTimer.current);
        setPanelOpen(true);
    }, []);

    const schedulePanelClose = useCallback(() => {
        window.clearTimeout(closeTimer.current);

        closeTimer.current = window.setTimeout(() => {
            setPanelOpen(false);
        }, 120);
    }, []);

    useEffect(() => {
        return () => {
            window.clearTimeout(closeTimer.current);
        };
    }, []);

    const panelLinkProps = {
        onMouseEnter: openPanel,
        onFocus: openPanel,
        onMouseLeave: schedulePanelClose,
        onBlur: schedulePanelClose,
    };

    /*
     * ================================================================
     * MOBILE MENU TOGGLE
     * ================================================================
     */
    const toggleMobileMenu = () => {
        setMobileOpen((current) => !current);
    };

    const closeMobileMenu = () => {
        setMobileOpen(false);
    };

    return (
        <>
            {/* ========================================================
                SKIP NAVIGATION
                ======================================================== */}
            <a
                href="#home-main"
                className="
                    sr-only
                    focus:not-sr-only
                    focus:fixed
                    focus:left-4
                    focus:top-4
                    focus:z-[100]
                    focus:bg-gold
                    focus:px-4
                    focus:py-2
                    focus:text-xs
                    focus:font-semibold
                    focus:text-navy-deep
                "
            >
                Skip to content
            </a>

            {/* ========================================================
                NAVBAR
                ======================================================== */}
            <header
                className={`
                    fixed
                    inset-x-0
                    top-0
                    z-50
                    transition-all
                    duration-500
                    ${
                        scrolled || mobileOpen
                            ? 'bg-[rgba(5,14,34,0.96)] shadow-[0_1px_0_rgba(197,168,105,0.12)] backdrop-blur-md'
                            : 'bg-transparent'
                    }
                `}
                onMouseLeave={schedulePanelClose}
            >
                <nav
                    aria-label="Primary"
                    className="
                        mx-auto
                        flex
                        h-16
                        max-w-[1440px]
                        items-center
                        justify-between
                        px-5
                        sm:px-8
                        lg:px-12
                    "
                >
                    {/* ==================================================
                        LOGO
                        ================================================== */}
                    <Link
                        to="/"
                        className="group flex items-center"
                        aria-label="Asian Star Travel — home"
                        onClick={closeMobileMenu}
                    >
                        <img
                            src={
                                scrolled || mobileOpen
                                    ? '/logo-light.svg'
                                    : '/logo-dark.svg'
                            }
                            alt="Asian Star Travel"
                            className="
                                h-10
                                w-auto
                                object-contain
                                transition-all
                                duration-300
                                ease-out
                                group-hover:scale-105
                            "
                            width="120"
                            height="80"
                        />
                    </Link>

                    {/* ==================================================
                        DESKTOP NAVIGATION
                        ================================================== */}
                    <div className="hidden items-center gap-9 lg:flex">
                        {NAV_LINKS.map((link) => (
                            <div
                                key={link.path}
                                className="relative group"
                                {...(link.panel
                                    ? panelLinkProps
                                    : {})}
                            >
                                <Link
                                    to={link.path}
                                    className="
                                        link-underline
                                        py-2
                                        text-[11px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.18em]
                                        text-white/75
                                        transition-colors
                                        duration-300
                                        hover:text-white
                                    "
                                    aria-haspopup={
                                        link.panel || link.children
                                            ? 'true'
                                            : undefined
                                    }
                                    aria-expanded={
                                        link.panel
                                            ? panelOpen
                                            : undefined
                                    }
                                >
                                    {link.label}
                                </Link>

                                {/* SERVICES DROPDOWN */}
                                {link.children && (
                                    <div className="absolute left-0 top-full z-50 hidden pt-2 group-hover:block">
                                        <div
                                            className="
                                                min-w-[220px]
                                                border-t
                                                border-white/[0.06]
                                                bg-[rgba(5,14,34,0.97)]
                                                py-3
                                                shadow-xl
                                                backdrop-blur-xl
                                            "
                                        >
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.path}
                                                    to={child.path}
                                                    className="
                                                        block
                                                        px-6
                                                        py-2.5
                                                        text-[11px]
                                                        font-medium
                                                        tracking-[0.12em]
                                                        text-white/55
                                                        transition-colors
                                                        duration-300
                                                        hover:bg-white/5
                                                        hover:text-white
                                                    "
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ==================================================
                        DESKTOP ACTIONS
                        ================================================== */}
                    <div className="hidden items-center gap-5 lg:flex">
                        <LanguageSwitcher variant="desktop" />

                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="theme-toggle"
                            aria-label={
                                theme === 'dark'
                                    ? 'Switch to light mode'
                                    : 'Switch to dark mode'
                            }
                        >
                            {theme === 'dark' ? '☀' : '☾'}
                        </button>

                        <Link
                            to="/request-quote"
                            className="
                                link-underline
                                py-1
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.22em]
                                text-white/60
                                transition-colors
                                duration-300
                                hover:text-gold
                            "
                        >
                            Request a Quote
                        </Link>

                        <Link
                            to="/become-a-partner"
                            className="
                                border
                                border-white/25
                                px-5
                                py-2.5
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.22em]
                                text-white
                                transition-colors
                                duration-300
                                hover:border-gold
                                hover:bg-gold
                                hover:text-navy-deep
                            "
                        >
                            Become a Partner
                        </Link>
                    </div>

                    {/* ==================================================
                        MOBILE HAMBURGER
                        ================================================== */}
                    <button
                        ref={menuButtonRef}
                        type="button"
                        onClick={toggleMobileMenu}
                        className="
                            relative
                            z-[60]
                            -mr-2
                            flex
                            h-11
                            w-11
                            flex-col
                            items-center
                            justify-center
                            gap-[5px]
                            lg:hidden
                        "
                        aria-label={
                            mobileOpen
                                ? 'Close menu'
                                : 'Open menu'
                        }
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                    >
                        <motion.span
                            animate={
                                mobileOpen
                                    ? {
                                          rotate: 45,
                                          y: 3.5,
                                      }
                                    : {
                                          rotate: 0,
                                          y: 0,
                                      }
                            }
                            transition={{
                                duration: 0.4,
                                ease: EASE,
                            }}
                            className="block h-px w-6 bg-white/80"
                        />

                        <motion.span
                            animate={
                                mobileOpen
                                    ? {
                                          opacity: 0,
                                          x: -6,
                                      }
                                    : {
                                          opacity: 1,
                                          x: 0,
                                      }
                            }
                            transition={{
                                duration: 0.25,
                            }}
                            className="block h-px w-6 bg-white/80"
                        />

                        <motion.span
                            animate={
                                mobileOpen
                                    ? {
                                          rotate: -45,
                                          y: -3.5,
                                      }
                                    : {
                                          rotate: 0,
                                          y: 0,
                                      }
                            }
                            transition={{
                                duration: 0.4,
                                ease: EASE,
                            }}
                            className="block h-px w-6 bg-white/80"
                        />
                    </button>
                </nav>

                {/* ========================================================
                    DESKTOP DESTINATIONS PANEL
                    ======================================================== */}
                <AnimatePresence>
                    {panelOpen && (
                        <motion.div
                            ref={panelRef}
                            initial={{
                                opacity: 0,
                                y: -8,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -8,
                            }}
                            transition={{
                                duration: reduce ? 0 : 0.25,
                                ease: EASE,
                            }}
                            className="
                                absolute
                                left-0
                                right-0
                                top-16
                                z-40
                                hidden
                                border-t
                                border-white/[0.06]
                                bg-[rgba(5,14,34,0.98)]
                                shadow-2xl
                                backdrop-blur-xl
                                lg:block
                            "
                            onMouseEnter={openPanel}
                            onMouseLeave={schedulePanelClose}
                        >
                            <div
                                className="
                                    mx-auto
                                    grid
                                    max-w-[1440px]
                                    grid-cols-2
                                    gap-8
                                    px-8
                                    py-8
                                    lg:grid-cols-4
                                    lg:px-12
                                "
                            >
                                {DESTINATIONS?.map((destination, index) => (
                                    <Link
                                        key={
                                            destination.id ||
                                            destination.slug ||
                                            destination.path ||
                                            index
                                        }
                                        to={
                                            destination.path ||
                                            `/destination/${destination.slug || destination.id}`
                                        }
                                        className="
                                            group
                                            block
                                            overflow-hidden
                                            border
                                            border-white/[0.08]
                                            bg-white/[0.02]
                                            transition-all
                                            duration-300
                                            hover:-translate-y-1
                                            hover:border-gold/40
                                            hover:bg-white/[0.04]
                                        "
                                    >
                                        {destination.image && (
                                            <div className="aspect-[16/9] overflow-hidden">
                                                <img
                                                    src={destination.image}
                                                    alt={
                                                        destination.name ||
                                                        destination.title ||
                                                        'Destination'
                                                    }
                                                    className="
                                                        h-full
                                                        w-full
                                                        object-cover
                                                        transition-transform
                                                        duration-700
                                                        group-hover:scale-105
                                                    "
                                                />
                                            </div>
                                        )}

                                        <div className="p-4">
                                            <h3
                                                className="
                                                    text-sm
                                                    font-semibold
                                                    uppercase
                                                    tracking-[0.12em]
                                                    text-white
                                                "
                                            >
                                                {destination.name ||
                                                    destination.title}
                                            </h3>

                                            {destination.description && (
                                                <p
                                                    className="
                                                        mt-2
                                                        line-clamp-2
                                                        text-xs
                                                        leading-relaxed
                                                        text-white/45
                                                    "
                                                >
                                                    {
                                                        destination.description
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ============================================================
                MOBILE MENU

                IMPORTANT:
                This is the ONLY mobile scroll container.

                No:
                - body overflow hidden
                - nested overflow-y-auto
                - 100dvh
                - touchAction
                - overscrollBehavior
                ============================================================ */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        ref={mobileMenuRef}
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation"
                        tabIndex={-1}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: reduce ? 0 : 0.25,
                        }}
                        className="
                            fixed
                            inset-0
                            z-40
                            overflow-y-auto
                            bg-navy-deep
                            lg:hidden
                        "
                    >
                        {/* ==================================================
                            MOBILE CONTENT

                            The parent above handles scrolling.
                            This content simply grows naturally.
                            ================================================== */}
                        <div className="min-h-screen px-6 pb-16 pt-24 sm:px-10">
                            {/* MOBILE NAV LINKS */}
                            <div className="space-y-1">
                                {NAV_LINKS.map((link, index) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{
                                            opacity: 0,
                                            y: 12,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay: reduce
                                                ? 0
                                                : index * 0.035,
                                            duration: 0.35,
                                            ease: EASE,
                                        }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={closeMobileMenu}
                                            className="
                                                flex
                                                min-h-[54px]
                                                items-center
                                                border-b
                                                border-white/[0.07]
                                                text-xl
                                                font-medium
                                                tracking-[-0.01em]
                                                text-white/90
                                                transition-colors
                                                duration-300
                                                hover:text-gold
                                            "
                                        >
                                            {link.label}
                                        </Link>

                                        {/* MOBILE SERVICES CHILDREN */}
                                        {link.children && (
                                            <div className="border-b border-white/[0.07] pb-2">
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.path}
                                                        to={child.path}
                                                        onClick={
                                                            closeMobileMenu
                                                        }
                                                        className="
                                                            flex
                                                            min-h-[44px]
                                                            items-center
                                                            pl-5
                                                            text-sm
                                                            font-medium
                                                            tracking-wide
                                                            text-white/45
                                                            transition-colors
                                                            duration-300
                                                            hover:text-gold
                                                        "
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* ==================================================
                                MOBILE CAPABILITIES
                                ================================================== */}
                            {Array.isArray(HERO_CAPABILITIES) &&
                                HERO_CAPABILITIES.length > 0 && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 15,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay: reduce ? 0 : 0.25,
                                            duration: 0.4,
                                            ease: EASE,
                                        }}
                                        className="mt-10"
                                    >
                                        <p
                                            className="
                                                mb-4
                                                text-[10px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.25em]
                                                text-gold/80
                                            "
                                        >
                                            Our Capabilities
                                        </p>

                                        <div className="grid grid-cols-1 gap-2">
                                            {HERO_CAPABILITIES.map(
                                                (capability, index) => (
                                                    <div
                                                        key={
                                                            capability.id ||
                                                            capability.title ||
                                                            capability.name ||
                                                            index
                                                        }
                                                        className="
                                                            border
                                                            border-white/[0.07]
                                                            bg-white/[0.02]
                                                            px-4
                                                            py-3
                                                        "
                                                    >
                                                        <p className="text-sm text-white/70">
                                                            {capability.title ||
                                                                capability.name ||
                                                                capability.label ||
                                                                capability}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                            {/* ==================================================
                                MOBILE LANGUAGE + THEME
                                ================================================== */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 15,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: reduce ? 0 : 0.3,
                                    duration: 0.4,
                                    ease: EASE,
                                }}
                                className="
                                    mt-10
                                    flex
                                    flex-col
                                    gap-4
                                    border-t
                                    border-white/[0.07]
                                    pt-6
                                "
                            >
                                <LanguageSwitcher variant="mobile" />

                                <button
                                    type="button"
                                    onClick={toggleTheme}
                                    className="
                                        flex
                                        min-h-[48px]
                                        items-center
                                        justify-between
                                        border
                                        border-white/[0.08]
                                        px-4
                                        text-left
                                        text-sm
                                        text-white/70
                                        transition-colors
                                        duration-300
                                        hover:border-gold/40
                                        hover:text-white
                                    "
                                >
                                    <span>
                                        {theme === 'dark'
                                            ? 'Switch to light mode'
                                            : 'Switch to dark mode'}
                                    </span>

                                    <span className="text-lg">
                                        {theme === 'dark' ? '☀' : '☾'}
                                    </span>
                                </button>
                            </motion.div>

                            {/* ==================================================
                                MOBILE CTA
                                ================================================== */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 15,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: reduce ? 0 : 0.35,
                                    duration: 0.4,
                                    ease: EASE,
                                }}
                                className="
                                    mt-8
                                    grid
                                    grid-cols-1
                                    gap-3
                                    sm:grid-cols-2
                                "
                            >
                                <Link
                                    to="/request-quote"
                                    onClick={closeMobileMenu}
                                    className="
                                        flex
                                        min-h-[52px]
                                        items-center
                                        justify-center
                                        border
                                        border-gold/50
                                        bg-gold
                                        px-5
                                        text-center
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.2em]
                                        text-navy-deep
                                        transition-all
                                        duration-300
                                        hover:bg-transparent
                                        hover:text-gold
                                    "
                                >
                                    Request a Quote
                                </Link>

                                <Link
                                    to="/become-a-partner"
                                    onClick={closeMobileMenu}
                                    className="
                                        flex
                                        min-h-[52px]
                                        items-center
                                        justify-center
                                        border
                                        border-white/20
                                        px-5
                                        text-center
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.2em]
                                        text-white
                                        transition-all
                                        duration-300
                                        hover:border-gold
                                        hover:bg-gold
                                        hover:text-navy-deep
                                    "
                                >
                                    Become a Partner
                                </Link>
                            </motion.div>

                            {/* Bottom breathing space */}
                            <div className="h-8" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}