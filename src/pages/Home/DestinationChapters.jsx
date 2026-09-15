import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { DESTINATIONS } from '../homeContent';
import { EASE_EDITORIAL, EASE_CINEMATIC } from '../motionTokens';
import { GhostNumeral, Coordinate } from './RoutePath';

/* ═══════════════════════════════════════════════════════════════════
   DESTINATION CHAPTERS — "THE ROUTE"
   Full-screen immersion: each chapter is the whole viewport. Destination
   names set at 16vw sit BEHIND the region route rail and OVER the
   photograph; a ghost numeral anchors the composition; an edge chapter
   rail shows the journey's position. Scroll = travelling the route.
   Mobile: vertical story panels with the same art direction.
   ═══════════════════════════════════════════════════════════════════ */

const COORDS = {
    india: '20.59° N — 78.96° E',
    vietnam: '14.06° N — 108.28° E',
    japan: '36.20° N — 138.25° E',
    'south-korea': '35.91° N — 127.77° E',
};

export default function DestinationChapters() {
    const reduce = useReducedMotion();
    const isDesktop = useIsDesktop();
    const sectionRef = useRef(null);

    const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (!isDesktop || reduce) return undefined;
        let raf = 0;
        const measure = () => {
            raf = 0;
            const el = sectionRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const scrollable = rect.height - window.innerHeight;
            if (scrollable <= 0) return;
            const p = Math.min(1, Math.max(0, -rect.top / scrollable));
            setProgress(p);
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
        measure();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            if (raf) cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [isDesktop, reduce]);

    const total = DESTINATIONS.length;
    const active = Math.min(total - 1, Math.floor(progress * total * 0.999));
    const dest = DESTINATIONS[active];

    /* ── MOBILE: vertical story ── */
    if (!isDesktop) {
        return (
            <section aria-label="Destinations" className="relative bg-navy-deep">
                <MobileHeader />
                <div className="flex flex-col">
                    {DESTINATIONS.map((d) => (
                        <MobileChapter key={d.id} dest={d} />
                    ))}
                </div>
            </section>
        );
    }

    /* ── DESKTOP: full-screen chapter scene ── */
    return (
        <section
            ref={sectionRef}
            aria-label="Destinations"
            className="relative bg-navy-deep"
            style={{ height: `${total * 100}vh` }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* ── Photography: full-bleed, mask-wipe between chapters ── */}
                <div className="absolute inset-0" aria-live="polite">
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={dest.id}
                            className="absolute inset-0"
                            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 0 100%)' }}
                            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0 0%)' }}
                            exit={reduce ? { opacity: 0 } : { opacity: 0.3, scale: 1.04, transition: { duration: 0.85, ease: EASE_CINEMATIC } }}
                            transition={{ duration: 1.1, ease: EASE_EDITORIAL }}
                        >
                            <motion.img
                                src={dest.image}
                                alt={dest.imageAlt}
                                className="h-full w-full object-cover"
                                initial={reduce ? undefined : { scale: 1.12 }}
                                animate={reduce ? undefined : { scale: 1.02 }}
                                transition={{ duration: 1.6, ease: EASE_EDITORIAL }}
                                loading="lazy"
                                decoding="async"
                            />
                        </motion.div>
                    </AnimatePresence>
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-navy-deep/25 to-navy-deep/45" />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-navy-deep/35" />
                </div>

                {/* ── Ghost numeral ── */}
                <GhostNumeral className="absolute -right-6 top-1/2 -translate-y-1/2 font-display text-[42vh] italic text-white">
                    {dest.number}
                </GhostNumeral>

                {/* ── Chapter typography layer ── */}
                <div className="relative z-10 flex h-full flex-col justify-between px-12 pb-10 pt-24">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={dest.id}
                            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
                            animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -28 }}
                            transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
                            className="max-w-3xl"
                        >
                            <div className="flex items-center gap-4">
                                <span className="font-display text-[13px] tracking-[0.2em] text-gold">{dest.number}</span>
                                <span aria-hidden="true" className="h-px w-14 bg-gold/50" />
                                <Coordinate text={COORDS[dest.id]} className="text-white/50" />
                            </div>
                            {/* Giant name — the composition itself */}
                            <h3 className="display-xl -ml-1 font-display text-[clamp(3.6rem,10vw,9.5rem)] leading-[0.9] tracking-[-0.035em] text-white">
                                {dest.name}
                            </h3>
                            <p className="mt-2 font-display text-[clamp(1.1rem,1.8vw,1.5rem)] italic text-white/60">
                                {dest.tagline}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* ── Bottom zone: region route + copy + link ── */}
                    <div className="grid grid-cols-12 items-end gap-8">
                        {/* Region route rail */}
                        <div className="col-span-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={dest.id}
                                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={reduce ? { opacity: 0 } : { opacity: 0, x: -10 }}
                                    transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
                                    className="flex gap-5"
                                >
                                    <RouteRailMini stops={dest.regions} progress={((progress * total) % 1)} />
                                    <ul className="flex flex-col gap-3 pt-1">
                                        {dest.regions.map((r, i) => (
                                            <li
                                                key={r}
                                                className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ${
                                                    i === 0 ? 'text-gold' : 'text-white/45'
                                                }`}
                                            >
                                                {r}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Copy + link */}
                        <div className="col-span-5 col-start-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={dest.id}
                                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                                    transition={{ duration: 0.55, ease: EASE_EDITORIAL }}
                                >
                                    <p className="max-w-md text-[13px] leading-[1.85] text-white/55">
                                        {dest.copy}
                                    </p>
                                    <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
                                        {dest.meta.map((m) => (
                                            <div key={m.label}>
                                                <p className="text-[9px] uppercase tracking-[0.24em] text-white/30">{m.label}</p>
                                                <p className="mt-0.5 text-[12px] font-medium text-white/75">{m.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <Link
                                        to={dest.route}
                                        className="group mt-7 inline-flex items-center gap-3 border-b border-gold/40 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-gold hover:text-gold"
                                    >
                                        Discover {dest.name}
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Edge chapter rail */}
                        <div className="col-span-3 col-start-10 flex items-end justify-end gap-3" aria-hidden="true">
                            {DESTINATIONS.map((d, i) => (
                                <div key={d.id} className="flex flex-col items-center gap-2">
                                    <span className={`text-[9px] tracking-[0.14em] transition-colors duration-500 ${i === active ? 'text-gold' : 'text-white/25'}`}>
                                        {d.number}
                                    </span>
                                    <span className={`w-px transition-all duration-500 ${i === active ? 'h-10 bg-gold' : 'h-5 bg-white/20'}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── Mini route rail for the region list ── */
function RouteRailMini({ stops, progress }) {
    return (
        <div className="relative w-px self-stretch bg-white/12" aria-hidden="true">
            <motion.span
                className="absolute left-0 top-0 w-px bg-gold"
                style={{ height: `${Math.round(Math.min(1, Math.max(0, progress)) * 100)}%` }}
            />
            {stops.map((s, i) => (
                <span
                    key={s}
                    className="absolute left-0 h-[5px] w-[5px] -translate-x-1/2 rotate-45 border border-gold/60 bg-navy-deep"
                    style={{ top: `${(i / Math.max(1, stops.length - 1)) * 100}%` }}
                />
            ))}
        </div>
    );
}

/* ── Mobile header ── */
function MobileHeader() {
    return (
        <div className="px-5 pt-20 sm:px-8">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
                className="flex items-center gap-4"
            >
                <span aria-hidden="true" className="h-px w-10 bg-gold/40" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/70 sm:text-[11px]">
                    Destinations
                </span>
            </motion.div>
            <h2 className="mt-5 font-display text-[clamp(2rem,9vw,3.4rem)] leading-[1.02] tracking-[-0.02em] text-white">
                Four countries.
                <br />
                One ground partner.
            </h2>
        </div>
    );
}

/* ── Mobile chapter panel ── */
function MobileChapter({ dest }) {
    const reduce = useReducedMotion();
    return (
        <motion.article
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 0.85, ease: EASE_EDITORIAL }}
            className="relative mt-14"
        >
            {/* Image plate with the name pulled over its edge */}
            <div className="relative">
                <div className="relative overflow-hidden">
                    <img
                        src={dest.image}
                        alt={dest.imageAlt}
                        className="aspect-[4/5] w-full object-cover sm:aspect-[16/10]"
                        loading="lazy"
                        decoding="async"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/10 to-transparent" />
                </div>
                {/* Name overlaps the plate's bottom edge */}
                <h3 className="display-xl -mt-[0.62em] px-5 font-display text-[clamp(3.2rem,15vw,5.5rem)] leading-[0.85] tracking-[-0.03em] text-white sm:px-8">
                    {dest.name}
                </h3>
                <p className="mt-1 px-5 font-display text-base italic text-gold/85 sm:px-8">{dest.tagline}</p>
            </div>

            <div className="px-5 sm:px-8">
                <p className="mt-4 max-w-md text-[13px] leading-[1.8] text-white/50">{dest.copy}</p>
                <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1">
                    {dest.regions.map((r, i) => (
                        <span key={r} className={`text-[10px] uppercase tracking-[0.18em] ${i === 0 ? 'text-gold' : 'text-white/35'}`}>
                            {r}{i < dest.regions.length - 1 && <span className="text-gold/40"> ·</span>}
                        </span>
                    ))}
                </div>
                <Link
                    to={dest.route}
                    className="mt-5 inline-flex items-center gap-2 border-b border-gold/40 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                    Discover {dest.name}
                    <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>
        </motion.article>
    );
}

/* ── Desktop media query hook ── */
function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
    );
    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const onChange = (e) => setIsDesktop(e.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);
    return isDesktop;
}
