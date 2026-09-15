import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { DESTINATIONS, HERO_CAPABILITIES } from '../homeContent';
import { EASE_EDITORIAL, EASE_CINEMATIC } from '../motionTokens';
import { AsiaRouteMap } from './RoutePath';

/* ═══════════════════════════════════════════════════════════════════
   HERO — "ARRIVAL"  ·  full-bleed cinematic
   The photograph IS the background — edge to edge — while typography
   sits directly on it, breaking out of any column. The signature
   interaction: an abstract Asia route map draws itself in the lower
   right as the page loads, and the hero's destination selector doubles
   as the route: the active waypoint sits on the drawn line.
   ═══════════════════════════════════════════════════════════════════ */

const HOLD_MS = 7000;

export default function Hero() {
    const reduce = useReducedMotion();
    const sectionRef = useRef(null);
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const touchX = useRef(null);

    const dest = DESTINATIONS[active];

    /* Autoplay holds only while visible; pauses on hover/tab-hide. */
    useEffect(() => {
        if (reduce || paused || document.hidden) return undefined;
        const id = window.setInterval(() => setActive((p) => (p + 1) % DESTINATIONS.length), HOLD_MS);
        return () => window.clearInterval(id);
    }, [reduce, paused, active]);

    /* Keyboard left/right moves between destinations. */
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight') setActive((p) => (p + 1) % DESTINATIONS.length);
            if (e.key === 'ArrowLeft') setActive((p) => (p - 1 + DESTINATIONS.length) % DESTINATIONS.length);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const onTouchStart = useCallback((e) => { touchX.current = e.touches[0].clientX; }, []);
    const onTouchEnd = useCallback((e) => {
        if (touchX.current == null) return;
        const dx = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(dx) > 56) {
            setActive((p) => (dx > 0 ? p + 1 : p - 1 + DESTINATIONS.length) % DESTINATIONS.length);
        }
        touchX.current = null;
    }, []);

    /* Entrance choreography is declared declaratively: initial -> animate with
       per-element transition delays (no gate state). An `entered ? X : {}` gate
       would skip the animation when animate is briefly an empty object. */
    /* Scroll exit: type lifts, image deepens — the page "moves on". */
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
    const contentY = useTransform(scrollYProgress, [0, 0.7], ['0%', '18%']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
    const mapY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-30%']);

    const goTo = (i) => setActive(i);

    return (
        <section
            ref={sectionRef}
            aria-label="Asian Star Travel — B2B DMC for India, Vietnam, Japan and South Korea"
            className="relative flex min-h-[640px] flex-col overflow-hidden bg-navy-deep lg:h-[100svh] lg:min-h-[720px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {/* ── FULL-BLEED PHOTOGRAPH (the background) ─────────────── */}
            <div className="absolute inset-0" aria-live="polite">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={dest.id}
                        className="absolute inset-0"
                        initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 0 100%)' }}
                        animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0 0%)' }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0.3, scale: 1.03, transition: { duration: 1.0, ease: EASE_CINEMATIC } }}
                        transition={{ duration: 1.2, ease: EASE_EDITORIAL }}
                    >
                        <motion.img
                            src={dest.image}
                            alt={dest.imageAlt}
                            className="h-full w-full object-cover"
                            style={{ scale: imgScale }}
                            initial={reduce ? undefined : { scale: 1.15 }}
                            animate={reduce ? undefined : { scale: 1.02 }}
                            transition={{ duration: reduce ? 0 : 8, ease: 'linear' }}
                            decoding="async"
                            fetchPriority={active === 0 ? 'high' : 'auto'}
                            loading={active === 0 ? 'eager' : 'lazy'}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Cinematic scrims — heavier left for type legibility */}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy-deep/40 to-navy-deep/20" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/25 to-navy-deep/30" />
            </div>

            {/* ── TYPOGRAPHY FIELD (over the image, not beside it) ───── */}
            <motion.div
                style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : contentOpacity }}
                className="relative z-10 flex h-full flex-1 flex-col justify-between px-5 pb-8 pt-24 sm:px-8 lg:h-full lg:px-12 lg:pb-9 lg:pt-[80px]"
            >
                {/* Micro header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.9 }}
                    className="flex items-center justify-between"
                >
                    <span className="text-[9px] font-semibold uppercase tracking-[0.34em] text-white/35 sm:text-[10px]">
                        B2B Destination Management
                    </span>
                    <span className="hidden text-[9px] uppercase tracking-[0.3em] text-white/25 sm:block">
                        21.0278° N — 105.8342° E
                    </span>
                </motion.div>

                {/* Headline — oversized, overlapping the photo edge */}
                <div className="mt-10 lg:mt-0">
                    <h1 className="relative">
                        <span className="sr-only">
                            Asian Star Travel — B2B DMC partner for India, Vietnam, Japan and South Korea
                        </span>
                        <span aria-hidden="true" className="block overflow-hidden">
                            <motion.span
                                className="display-xl block font-display text-[clamp(4rem,12.5vw,11.5rem)] leading-[0.84] tracking-[-0.04em] text-white"
                                initial={reduce ? { opacity: 0 } : { y: '112%' }}
                                animate={reduce ? { opacity: 1 } : { y: '0%' }}
                                transition={{ duration: 1.25, delay: 0.2, ease: EASE_EDITORIAL }}
                            >
                                ASIA,
                            </motion.span>
                        </span>
                        <span aria-hidden="true" className="block overflow-hidden pl-[6%]">
                            <motion.span
                                className="display-xl block font-display text-[clamp(4rem,12.5vw,11.5rem)] italic leading-[0.92] tracking-[-0.03em] text-gold"
                                initial={reduce ? { opacity: 0 } : { y: '112%' }}
                                animate={reduce ? { opacity: 1 } : { y: '0%' }}
                                transition={{ duration: 1.25, delay: 0.42, ease: EASE_EDITORIAL }}
                            >
                                handled.
                            </motion.span>
                        </span>
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.95, ease: EASE_EDITORIAL }}
                        className="mt-8 flex flex-col gap-7 lg:mt-10 lg:flex-row lg:items-end lg:gap-12"
                    >
                        <p className="max-w-md text-[13px] leading-[1.85] text-white/55 sm:text-sm">
                            Private journeys, group programmes and MICE across India, Vietnam,
                            Japan and South Korea — designed for travel professionals who
                            need deadlines met and details handled.
                        </p>
                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                to="/request-quote"
                                className="group inline-flex items-center gap-3 bg-gold px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-deep transition-colors duration-300 hover:bg-gold-light"
                            >
                                Request a Quote
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                to="/become-a-partner"
                                className="border border-white/25 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 transition-colors duration-300 hover:border-gold/60 hover:text-gold"
                            >
                                Become a Partner
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* ── BOTTOM RAIL: route selector + route map ─────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0, delay: 1.15, ease: EASE_EDITORIAL }}
                    className="mt-10 flex flex-col gap-6 lg:mt-0 lg:flex-row lg:items-end lg:justify-between"
                >
                    {/* Destination selector — the hero route */}
                    <div className="w-full max-w-xl">
                        <div role="tablist" aria-label="Choose a destination" className="flex gap-1.5 sm:gap-3">
                            {DESTINATIONS.map((d, i) => (
                                <button
                                    key={d.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={i === active}
                                    aria-label={d.name}
                                    onClick={() => goTo(i)}
                                    className="group relative flex-1 py-2"
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`block h-px w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                            i === active ? 'bg-gold' : 'bg-white/25 group-hover:bg-white/50'
                                        }`}
                                    />
                                    <span
                                        aria-hidden="true"
                                        className={`absolute left-0 top-1/2 h-[5px] w-[5px] -translate-y-1/2 rotate-45 border transition-colors duration-500 ${
                                            i === active ? 'border-gold bg-gold' : 'border-white/40 bg-transparent group-hover:border-white/70'
                                        }`}
                                    />
                                    <span
                                        className={`mt-3 block text-left text-[9px] font-semibold uppercase tracking-[0.22em] transition-colors duration-500 sm:text-[10px] ${
                                            i === active ? 'text-white' : 'text-white/35 group-hover:text-white/65'
                                        }`}
                                    >
                                        {d.number} {d.name}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Active destination info strip */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={dest.id}
                                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                                transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
                                className="mt-5 flex items-baseline justify-between gap-4 border-t border-white/10 pt-3"
                            >
                                <p className="font-display text-sm italic text-white/70">{dest.tagline}</p>
                                <p className="hidden text-[9px] uppercase tracking-[0.26em] text-white/30 sm:block">
                                    {dest.meta[1]?.value}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Signature: abstract Asia route map (desktop only) */}
                    <motion.div
                        style={{ y: reduce ? 0 : mapY }}
                        className="hidden w-[300px] shrink-0 xl:block"
                    >
                        <AsiaRouteMap className="h-auto w-full opacity-90" />
                    </motion.div>

                    {/* Capability tags replace map on smaller desktops */}
                    <ul aria-label="Programme types" className="hidden flex-wrap gap-x-5 gap-y-2 xl:hidden lg:flex">
                        {HERO_CAPABILITIES.map((c) => (
                            <li key={c} className="border-t border-white/15 pt-1.5 text-[9px] font-semibold uppercase tracking-[0.26em] text-white/35">
                                {c}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>

            {/* Scroll cue — vertical, right edge */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.5 }}
                className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
                aria-hidden="true"
            >
                <motion.span
                    animate={reduce ? {} : { y: [0, 8, 0] }}
                    transition={reduce ? {} : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="block h-14 w-px bg-gradient-to-b from-gold/60 to-transparent"
                />
            </motion.div>
        </section>
    );
}
