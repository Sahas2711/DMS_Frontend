import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CAPABILITIES } from '../homeContent';
import { RevealText } from '../homeMotion';
import { EASE_EDITORIAL } from '../motionTokens';

/* ═══════════════════════════════════════════════════════════════════
   TRUST — "THE PARTNERSHIP"
   Dark editorial sequence. Each capability is a magazine spread: a
   giant ghost numeral, an oversized serif statement that swaps with a
   masked rise, and a body column. A thin progress rail ties the four
   spreads into one continuous run. No icon cards, no invented stats.
   ═══════════════════════════════════════════════════════════════════ */

export default function B2BTrust() {
    const reduce = useReducedMotion();
    const [active, setActive] = useState(0);
    const cap = CAPABILITIES[active];

    return (
        <section aria-label="Why partners choose us" className="relative overflow-hidden bg-navy-deep text-white">
            <div className="relative mx-auto max-w-[1500px] px-5 pb-28 pt-24 sm:px-8 lg:px-12 lg:pb-40 lg:pt-36">
                {/* Scene header */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mb-6 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/70"
                        >
                            <span aria-hidden="true" className="h-px w-10 bg-gold/50" />
                            The partnership
                        </motion.p>
                        <h2 className="font-display text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.98] tracking-[-0.03em] text-white">
                            <RevealText>Local knowledge.</RevealText>
                            <RevealText delay={0.12}>
                                <span className="italic text-gold">Global standards.</span>
                            </RevealText>
                        </h2>
                    </div>
                    <p className="max-w-xs text-[13px] leading-[1.8] text-white/40">
                        Your clients expect memorable travel. You need deadlines met, details
                        right and a partner who answers. That is the job.
                    </p>
                </div>

                {/* Magazine spreads */}
                <div className="mt-16 grid grid-cols-12 gap-8 lg:mt-24">
                    {/* Ghost numeral spread */}
                    <div className="col-span-12 lg:col-span-5">
                        <div className="relative flex h-[240px] items-center overflow-hidden lg:h-[340px]">
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span
                                    key={cap.number}
                                    initial={reduce ? { opacity: 0.06 } : { opacity: 0, y: 60 }}
                                    animate={{ opacity: 0.1, y: 0 }}
                                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -60 }}
                                    transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
                                    className="display-xl font-display text-[clamp(11rem,26vh,20rem)] italic leading-none text-white"
                                >
                                    {cap.number}
                                </motion.span>
                            </AnimatePresence>
                            {/* Small plate nested on the numeral's corner */}
                            <div className="absolute bottom-2 right-2 w-28 overflow-hidden sm:w-36">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.img
                                        key={cap.image}
                                        src={cap.image}
                                        alt={cap.imageAlt}
                                        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={reduce ? { opacity: 0 } : { opacity: 0 }}
                                        transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
                                        className="aspect-[4/5] w-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Progress rail — one line through all four spreads */}
                        <div className="mt-8 flex gap-2" role="tablist" aria-label="Partnership principles">
                            {CAPABILITIES.map((c, i) => (
                                <button
                                    key={c.number}
                                    type="button"
                                    role="tab"
                                    aria-selected={i === active}
                                    aria-label={c.title}
                                    onClick={() => setActive(i)}
                                    onMouseEnter={() => setActive(i)}
                                    className="group flex-1 py-3"
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`block h-px w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                            i === active ? 'bg-gold' : 'bg-white/20 group-hover:bg-white/45'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Statement + body */}
                    <div className="col-span-12 flex flex-col justify-center lg:col-span-7 lg:pl-10">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={cap.number}
                                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
                                transition={{ duration: 0.55, ease: EASE_EDITORIAL }}
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
                                    className="group mt-9 inline-flex items-center gap-3 border-b border-gold/40 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 transition-colors duration-300 hover:border-gold hover:text-gold"
                                >
                                    How we work with the trade
                                    <span aria-hidden="true" className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">&rarr;</span>
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
