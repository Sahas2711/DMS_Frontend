import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CAPABILITIES } from '../homeContent';
import { EASE_EDITORIAL } from '../motionTokens';

/* ═══════════════════════════════════════════════════════════════════
   TRUST — "THE PARTNERSHIP"
   Scroll-driven editorial sequence. Each capability is a magazine
   spread: a giant ghost numeral, an oversized serif statement that
   crossfades via scroll progress, and a body column. A thin progress
   rail ties the four spreads into one continuous run.

   Architecture:
     SECTION (height = TOTAL × 100vh)
       └── STICKY SCENE (h-screen, pinned)
            ├── header (always visible)
            ├── progress rail
            └── principle content (crossfade by scroll progress)

   The first principle is visible immediately. Transitions overlap so
   no principle ever reaches opacity 0 simultaneously with all others.
   ═══════════════════════════════════════════════════════════════════ */

const TOTAL = CAPABILITIES.length;

export default function B2BTrust() {
    const reduce = useReducedMotion();
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    /* ── Reduced motion: static layout, no scroll dependency ── */
    if (reduce) {
        return (
            <section aria-label="Why partners choose us" className="relative bg-navy-deep text-white">
                <div className="mx-auto max-w-[1500px] px-5 pb-28 pt-24 sm:px-8 lg:px-12 lg:pb-40 lg:pt-36">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="mb-6 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/70">
                                <span aria-hidden="true" className="h-px w-10 bg-gold/50" />
                                The partnership
                            </p>
                            <h2 className="font-display text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.98] tracking-[-0.03em] text-white">
                                Local knowledge.
                                <br />
                                <span className="italic text-gold">Global standards.</span>
                            </h2>
                        </div>
                        <p className="max-w-xs text-[13px] leading-[1.8] text-white/40">
                            Your clients expect memorable travel. You need deadlines met, details
                            right and a partner who answers. That is the job.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-12 gap-8 lg:mt-24">
                        <div className="col-span-12 lg:col-span-5">
                            <div className="relative flex h-[240px] items-center overflow-hidden lg:h-[340px]">
                                <span className="display-xl font-display text-[clamp(11rem,26vh,20rem)] italic leading-none text-white/10">
                                    {CAPABILITIES[0].number}
                                </span>
                                <div className="absolute bottom-2 right-2 w-28 overflow-hidden sm:w-36">
                                    <img
                                        src={CAPABILITIES[0].image}
                                        alt={CAPABILITIES[0].imageAlt}
                                        className="aspect-[4/5] w-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            </div>
                            <div className="mt-8 flex gap-2" role="tablist" aria-label="Partnership principles">
                                {CAPABILITIES.map((c, i) => (
                                    <span key={c.number} className="flex-1 py-3" role="tab" aria-selected={i === 0} aria-label={c.title}>
                                        <span className={`block h-px w-full ${i === 0 ? 'bg-gold' : 'bg-white/20'}`} />
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-12 flex flex-col justify-center lg:col-span-7 lg:pl-10">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/70">
                                {CAPABILITIES[0].number} — Principle
                            </p>
                            <h3 className="display-xl mt-4 font-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.02] tracking-[-0.02em] text-white">
                                {CAPABILITIES[0].title}
                            </h3>
                            <p className="mt-6 max-w-xl text-[14px] leading-[1.9] text-white/50">
                                {CAPABILITIES[0].body}
                            </p>
                            <Link
                                to="/travel-trade"
                                className="mt-9 inline-flex items-center gap-3 border-b border-gold/40 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 transition-colors duration-300 hover:border-gold hover:text-gold"
                            >
                                How we work with the trade
                                <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    /* ── Animated: scroll-driven crossfading ── */
    return (
        <section
            ref={sectionRef}
            aria-label="Why partners choose us"
            className="relative bg-navy-deep text-white"
            style={{ height: `${TOTAL * 100}vh` }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="relative mx-auto flex h-full max-w-[1500px] flex-col px-5 sm:px-8 lg:px-12">
                    {/* Header — always visible, never animated */}
                    <div className="flex shrink-0 flex-col gap-6 sm:flex-row sm:items-end sm:justify-between pt-24 lg:pt-36">
                        <div>
                            <p className="mb-6 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/70">
                                <span aria-hidden="true" className="h-px w-10 bg-gold/50" />
                                The partnership
                            </p>
                            <h2 className="font-display text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.98] tracking-[-0.03em] text-white">
                                Local knowledge.
                                <br />
                                <span className="italic text-gold">Global standards.</span>
                            </h2>
                        </div>
                        <p className="max-w-xs text-[13px] leading-[1.8] text-white/40">
                            Your clients expect memorable travel. You need deadlines met, details
                            right and a partner who answers. That is the job.
                        </p>
                    </div>

                    {/* Progress rail — always visible, driven by scroll */}
                    <div className="shrink-0 mt-8 flex gap-2" role="tablist" aria-label="Partnership principles">
                        {CAPABILITIES.map((c, i) => (
                            <ProgressSegment key={c.number} index={i} scrollProgress={scrollYProgress} />
                        ))}
                    </div>

                    {/* Principle content area */}
                    <div className="relative flex-1 min-h-0 pb-28 lg:pb-40">
                        <div className="relative h-full lg:grid lg:grid-cols-12 lg:gap-8">
                            {/* Left: ghost numeral + image plate */}
                            <div className="lg:col-span-5">
                                <div className="relative flex h-[200px] items-center overflow-hidden lg:h-[300px]">
                                    {CAPABILITIES.map((cap, i) => (
                                        <GhostNumeral key={cap.number} cap={cap} index={i} scrollProgress={scrollYProgress} />
                                    ))}
                                    {/* Image plate fades with the active principle */}
                                    {CAPABILITIES.map((cap, i) => (
                                        <ImagePlate key={cap.image} cap={cap} index={i} scrollProgress={scrollYProgress} />
                                    ))}
                                </div>
                            </div>

                            {/* Right: principle statements */}
                            <div className="relative lg:col-span-7 lg:pl-10">
                                {CAPABILITIES.map((cap, i) => (
                                    <PrincipleStatement key={cap.number} cap={cap} index={i} scrollProgress={scrollYProgress} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── Progress segment: opacity tracks which principle is active ── */
function ProgressSegment({ index, scrollProgress }) {
    const segmentSize = 1 / TOTAL;
    const s = index * segmentSize;
    const e = (index + 1) * segmentSize;

    const opacity = useTransform(
        scrollProgress,
        [s, s + segmentSize * 0.3, e - segmentSize * 0.3, e],
        [0.2, 1, 1, 0.2],
    );

    return (
        <button type="button" role="tab" aria-selected={false} aria-label={`Principle ${index + 1}`} className="group flex-1 py-3" tabIndex={-1}>
            <motion.span aria-hidden="true" className="block h-px w-full bg-gold" style={{ opacity }} />
        </button>
    );
}

/* ── Ghost numeral: fades in/out with scroll ── */
function GhostNumeral({ cap, index, scrollProgress }) {
    const segmentSize = 1 / TOTAL;
    const s = index * segmentSize;
    const e = (index + 1) * segmentSize;
    const t = segmentSize * 0.35;

    const opacity = useTransform(scrollProgress, [s, s + t, e - t, e], [0, 0.1, 0.1, 0]);
    const y = useTransform(scrollProgress, [s, s + t, e - t, e], [40, 0, 0, -40]);

    return (
        <motion.span
            aria-hidden="true"
            className="display-xl absolute font-display text-[clamp(11rem,26vh,20rem)] italic leading-none text-white"
            style={{ opacity, y }}
        >
            {cap.number}
        </motion.span>
    );
}

/* ── Image plate: crossfades with scroll ── */
function ImagePlate({ cap, index, scrollProgress }) {
    const segmentSize = 1 / TOTAL;
    const s = index * segmentSize;
    const e = (index + 1) * segmentSize;
    const t = segmentSize * 0.35;

    const opacity = useTransform(scrollProgress, [s, s + t, e - t, e], [0, 1, 1, 0]);

    return (
        <motion.div className="absolute bottom-2 right-2 w-28 overflow-hidden sm:w-36" style={{ opacity }}>
            <img
                src={cap.image}
                alt={cap.imageAlt}
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
                decoding="async"
            />
        </motion.div>
    );
}

/* ── Principle statement: crossfades with scroll ── */
function PrincipleStatement({ cap, index, scrollProgress }) {
    const segmentSize = 1 / TOTAL;
    const s = index * segmentSize;
    const e = (index + 1) * segmentSize;
    const t = segmentSize * 0.35;

    const opacity = useTransform(scrollProgress, [s, s + t, e - t, e], [0, 1, 1, 0]);
    const y = useTransform(scrollProgress, [s, s + t, e - t, e], [20, 0, 0, -12]);

    return (
        <motion.div
            className="absolute inset-0 flex flex-col justify-center"
            style={{ opacity, y, pointerEvents: 'none' }}
        >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/70">
                {cap.number} — Principle
            </p>
            <h3 className="display-xl mt-4 font-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.02] tracking-[-0.02em] text-white">
                {cap.title}
            </h3>
            <p className="mt-6 max-w-xl text-[14px] leading-[1.9] text-white/50">
                {cap.body}
            </p>
            <Link
                to="/travel-trade"
                className="mt-9 inline-flex w-fit items-center gap-3 border-b border-gold/40 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
                How we work with the trade
                <span aria-hidden="true" className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">&rarr;</span>
            </Link>
        </motion.div>
    );
}
