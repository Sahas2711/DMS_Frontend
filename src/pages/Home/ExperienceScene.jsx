import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { TRAVEL_STYLES } from '../homeContent';
import { EASE_EDITORIAL } from '../motionTokens';

/* ═══════════════════════════════════════════════════════════════════
   EXPERIENCE SCENE — "SIX WAYS IN"
   Typography IS the interface: oversized serif rows fill the scene and
   the photograph floats free, tracking the cursor between rows (desktop)
   or docking as a tap-to-change plate (mobile). No cards.
   ═══════════════════════════════════════════════════════════════════ */

export default function ExperienceScene() {
    const reduce = useReducedMotion();
    const [active, setActive] = useState(0);
    const [hovering, setHovering] = useState(false);
    const listRef = useRef(null);
    const ghostRef = useRef(null);
    const style = TRAVEL_STYLES[active];

    /* Cursor-follows-image: one rAF, transform-only, no state churn. */
    const onMove = (e) => {
        if (reduce || !ghostRef.current || !listRef.current) return;
        const rect = listRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = ghostRef.current;
        el.style.transform = `translate(${x - 130}px, ${y - 165}px) rotate(${(x / rect.width - 0.5) * 4}deg)`;
    };

    return (
        <section
            aria-label="Travel styles"
            className="relative overflow-hidden bg-ivory text-navy"
        >
            <div className="relative mx-auto max-w-[1500px] px-5 pb-24 pt-24 sm:px-8 lg:px-12 lg:pb-36 lg:pt-32">
                {/* Scene header — statement, not label */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mb-6 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze"
                        >
                            <span aria-hidden="true" className="h-px w-10 bg-gold/60" />
                            Travel styles
                        </motion.p>
                        <h2 className="font-display text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.98] tracking-[-0.03em] text-navy">
                            One place,
                            <br />
                            <span className="italic text-navy/55">six ways in.</span>
                        </h2>
                    </div>
                    <p className="max-w-xs text-[13px] leading-[1.8] text-navy/55">
                        Every programme is built around an interest, a pace and a priority —
                        never a template.
                    </p>
                </div>

                {/* The index — full-width typography rows */}
                <div
                    ref={listRef}
                    className="relative mt-16 lg:mt-24"
                    onMouseMove={onMove}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                >
                    {/* Floating photograph that follows the cursor (desktop) */}
                    <div
                        ref={ghostRef}
                        aria-hidden="true"
                        className={`pointer-events-none absolute left-0 top-0 z-20 hidden h-[330px] w-[260px] overflow-hidden transition-opacity duration-500 lg:block ${
                            hovering ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ willChange: 'transform' }}
                    >
                        <AnimatePresence initial={false}>
                            <motion.img
                                key={style.id}
                                src={style.image}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover"
                                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
                            />
                        </AnimatePresence>
                        <span aria-hidden="true" className="absolute bottom-2 right-2 font-display text-[11px] tracking-[0.14em] text-navy/85">
                            {String(active + 1).padStart(2, '0')}
                        </span>
                    </div>

                    <ul aria-label="Travel styles" className="relative z-10">
                        {TRAVEL_STYLES.map((s, i) => (
                            <li key={s.id} className="border-t border-navy/10 last:border-b">
                                <StyleRow
                                    item={s}
                                    index={i}
                                    active={i === active}
                                    onSelect={() => setActive(i)}
                                    reduce={reduce}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile docking plate — tap changes it */}
                <div className="mt-12 lg:hidden">
                    <div className="relative aspect-[16/10] overflow-hidden" aria-live="polite">
                        <AnimatePresence initial={false}>
                            <motion.img
                                key={style.id}
                                src={style.image}
                                alt={style.imageAlt}
                                className="absolute inset-0 h-full w-full object-cover"
                                initial={{ opacity: 0, scale: 1.06 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
                                loading="lazy"
                                decoding="async"
                            />
                        </AnimatePresence>
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={style.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
                            className="mt-5"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-bronze">
                                {String(active + 1).padStart(2, '0')} — {style.name}
                            </p>
                            <p className="mt-2 text-[13px] leading-[1.8] text-navy/60">{style.detail}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Active style detail — desktop, beneath the index */}
                <div className="mt-10 hidden lg:block">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={style.id}
                            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                            transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
                            className="flex items-baseline justify-between gap-8"
                        >
                            <p className="max-w-lg text-[13px] leading-[1.8] text-navy/60">{style.detail}</p>
                            <Link
                                to={`/request-quote?trip_type=${style.tripType}`}
                                className="group inline-flex shrink-0 items-center gap-2 border-b border-bronze/40 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy transition-colors duration-300 hover:border-bronze hover:text-bronze"
                            >
                                Plan this style
                                <span aria-hidden="true" className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">&rarr;</span>
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

function StyleRow({ item, index, active, onSelect }) {
    return (
        <button
            type="button"
            onMouseEnter={onSelect}
            onFocus={onSelect}
            onClick={onSelect}
            aria-pressed={active}
            className="group block w-full py-6 text-left lg:py-8"
        >
            <div className="flex items-baseline gap-5 sm:gap-8">
                <span
                    className={`font-display text-[12px] tracking-[0.2em] transition-colors duration-500 ${
                        active ? 'text-bronze' : 'text-navy/30'
                    }`}
                >
                    {String(index + 1).padStart(2, '0')}
                </span>
                <span
                    className={`font-display text-[clamp(1.7rem,4.2vw,3.4rem)] leading-none tracking-[-0.02em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        active ? 'translate-x-3 text-navy' : 'text-navy/35 group-hover:translate-x-1.5 group-hover:text-navy/65'
                    }`}
                >
                    {item.name}
                </span>
                <span
                    aria-hidden="true"
                    className={`ml-auto hidden h-px self-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:block ${
                        active ? 'w-32 bg-bronze/70' : 'w-8 bg-navy/15'
                    }`}
                />
            </div>
            {/* Supporting line always rendered (a11y), brightens when active */}
            <motion.p
                initial={false}                animate={{ opacity: active ? 0.85 : 0.3 }}
                transition={{ duration: 0.4 }}
                className="ml-12 mt-2 max-w-xl text-[12px] leading-relaxed text-navy/55 sm:ml-16">
                {item.line}
            </motion.p>
        </button>
    );
}
