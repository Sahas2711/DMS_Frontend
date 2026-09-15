import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { JOURNEYS } from '../homeContent';
import { EASE_EDITORIAL } from '../motionTokens';

/* ═══════════════════════════════════════════════════════════════════
   JOURNEY RAIL — "THE ITINERARY"
   Desktop: the scene pins and scroll drives the rail laterally. A thin
   route line runs the FULL width of the track behind photographs of
   equal aspect ratio — the journeys read as stops along one route.
   Diamond nodes and coordinates sit in the gaps between plates.
   Mobile: snap rail.

   Geometry:
     total rail width = sum(card widths) + sum(gaps)
     scroll distance  = total rail width - viewport width
     progress 0→1    maps to movement 0→-distance
   ═══════════════════════════════════════════════════════════════════ */

export default function JourneyRail() {
    const reduce = useReducedMotion();
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

    const [distance, setDistance] = useState(0);
    useEffect(() => {
        const measure = () => {
            const track = trackRef.current;
            if (!track) return;
            setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    const x = useTransform(scrollYProgress, [0.05, 0.95], ['0px', `${-distance}px`]);

    return (
        <section
            ref={sectionRef}
            aria-label="Curated journeys"
            className="relative bg-stone"
            style={{ height: reduce ? undefined : `${JOURNEYS.length * 60 + 40}vh` }}
        >
            <div className={reduce ? '' : 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden'}>
                {/* Header — always visible, no whileInView */}
                <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-12">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="mb-5 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze">
                                <span aria-hidden="true" className="h-px w-10 bg-gold/60" />
                                Curated journeys
                            </p>
                            <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.6rem)] leading-[0.98] tracking-[-0.03em] text-navy">
                                Itineraries that move
                                <br className="hidden sm:block" />
                                <span className="italic text-navy/55"> through meaning.</span>
                            </h2>
                        </div>
                        <Link
                            to="/tours"
                            className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy transition-colors duration-300 hover:text-bronze"
                        >
                            View all itineraries
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Rail */}
                <div className="relative mt-12 lg:mt-16">
                    {/* THE ROUTE — one continuous line behind every plate (desktop) */}
                    <div aria-hidden="true" className="absolute left-0 right-0 top-[45%] hidden lg:block">
                        <div className="h-px w-full bg-navy/20" />
                        <div className="mx-auto flex w-full max-w-[1500px] justify-between px-12">
                            {['DEL', 'HAN', 'TYO', 'ICN', 'COK', 'HAN'].map((c, i) => (
                                <span key={i} className="relative -top-[7px] flex flex-col items-center">
                                    <span className="h-[6px] w-[6px] rotate-45 border border-bronze bg-stone" />
                                    <span className="mt-2 font-mono text-[8px] tracking-[0.2em] text-navy/35">{c}</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        ref={trackRef}
                        style={reduce ? undefined : { x }}
                        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 sm:px-8 lg:snap-none lg:gap-0 lg:overflow-visible lg:px-12"
                    >
                        {JOURNEYS.map((j, i) => (
                            <JourneyPlate key={j.slug} journey={j} index={i} reduce={reduce} />
                        ))}
                        {/* End plate — conversion handoff */}
                        <div className="flex w-[80vw] flex-none snap-end items-center sm:w-[50vw] lg:w-[34vw] lg:pl-10">
                            <div>
                                <p className="font-display text-[clamp(1.5rem,2.4vw,2.2rem)] leading-snug text-navy">
                                    Every journey here
                                    <br />
                                    <span className="italic text-navy/55">started as a brief.</span>
                                </p>
                                <Link
                                    to="/request-quote"
                                    className="mt-7 inline-flex items-center gap-3 bg-navy px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-navy-light"
                                >
                                    Send yours
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Progress hairline (desktop) */}
                {!reduce && (
                    <div className="mx-auto mt-10 hidden h-px w-full max-w-[1500px] px-12 lg:block">
                        <motion.div
                            aria-hidden="true"
                            style={{ scaleX: scrollYProgress }}
                            className="h-px origin-left bg-bronze/50"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

/* ── Journey plate: consistent geometry, no text-under-image ──
   All cards use the same aspect ratio (4/5 portrait).
   Title sits BELOW the image, never overlapping.
   Explicit z-index layers prevent stacking collisions. */
function JourneyPlate({ journey, index, reduce }) {
    return (
        <motion.article
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ duration: 0.75, delay: Math.min(index * 0.05, 0.25), ease: EASE_EDITORIAL }}
            className="group w-[82vw] flex-none snap-start sm:w-[60vw] lg:relative lg:w-[clamp(400px,32vw,520px)] lg:px-0"
        >
            <Link to={`/tours/${journey.slug}`} className="block">
                {/* Image — consistent 4/5 aspect ratio on all cards */}
                <div className="relative z-10 overflow-hidden aspect-[4/5]">
                    <img
                        src={journey.image}
                        alt={journey.imageAlt}
                        className="h-full w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                        loading="lazy"
                        decoding="async"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/45 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    {/* Duration plate */}
                    <p className="absolute bottom-0 left-0 z-20 bg-stone px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-navy">
                        {journey.days}
                    </p>
                    {/* Index number */}
                    <p className="absolute right-4 top-3 z-20 font-display text-[13px] tracking-[0.14em] text-white/80">
                        {String(index + 1).padStart(2, '0')}
                    </p>
                </div>

                {/* Title — BELOW the image, never overlapping */}
                <div className="relative z-20 mt-4 px-5 lg:px-0">
                    <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.2rem)] leading-[1.02] tracking-[-0.02em] text-navy transition-colors duration-300 group-hover:text-bronze">
                        {journey.title}
                    </h3>
                </div>

                {/* Route stops */}
                <p className="relative z-20 mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-navy/55 lg:px-0">
                    {journey.route.map((stop, i) => (
                        <span key={stop} className="flex items-center gap-2.5">
                            {i > 0 && <span aria-hidden="true" className="h-[4px] w-[4px] rotate-45 border border-bronze/70" />}
                            {stop}
                        </span>
                    ))}
                    <span className="ml-2 font-mono text-[9px] tracking-[0.16em] text-navy/30">
                        {journey.destination}
                    </span>
                </p>

                <p className="relative z-20 mt-3 max-w-md px-5 text-[13px] leading-[1.75] text-navy/60 lg:px-0">{journey.copy}</p>
            </Link>
        </motion.article>
    );
}
