import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { HOME_IMAGES } from '../homeContent';
import { RevealText } from '../homeMotion';
import { EASE_EDITORIAL } from '../motionTokens';
import { RouteLine } from './RoutePath';

/* ═══════════════════════════════════════════════════════════════════
   EDITORIAL INTRO — "ASIA REVEALS ITSELF"
   Ivory whitespace, then an oversized two-line serif statement that a
   FULL-BLEED photographic band crosses through — the type overlaps the
   image instead of sitting above it. A thin route line draws beneath
   the statement; honest facts sit as one quiet route-strip, not a
   boxed facts grid.
   ═══════════════════════════════════════════════════════════════════ */

const FACTS = [
    { value: 'India · Vietnam · Japan · South Korea', label: 'Destinations we operate' },
    { value: 'FIT · Groups · MICE', label: 'Programme types' },
    { value: 'One trade desk', label: 'From first brief to final transfer' },
];

export default function EditorialIntro() {
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

    const bandX = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-14%', '10%']);
    const bandScale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.12, 1.04, 1.1]);
    const statementY = useTransform(scrollYProgress, [0.2, 0.7], reduce ? [0, 0] : [40, -40]);

    return (
        <section ref={ref} aria-label="Editorial statement" className="relative overflow-hidden bg-ivory text-navy">
            {/* ── Statement part ─────────────────────────────────────── */}
            <div className="relative mx-auto max-w-[1500px] px-5 pb-10 pt-24 sm:px-8 lg:px-12 lg:pt-36">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze"
                >
                    <span aria-hidden="true" className="h-px w-10 bg-gold/50" />
                    Beyond the surface
                </motion.p>

                <motion.h2
                    style={{ y: reduce ? 0 : statementY }}
                    className="relative z-10 font-display text-[clamp(2.9rem,7.5vw,7.5rem)] leading-[0.98] tracking-[-0.035em]"
                >
                    <RevealText delay={0}>Asia is not</RevealText>
                    <RevealText delay={0.12} className="pl-[10%]">
                        one story<span className="text-gold">.</span>
                    </RevealText>
                </motion.h2>

                {/* Route line draws under the statement */}
                <div className="mt-10 max-w-[520px]">
                    <RouteLine tone="navy" />
                </div>
            </div>

            {/* ── Full-bleed photographic band, type crosses it ──────── */}
            <div className="relative mt-6 h-[54vh] overflow-hidden sm:h-[62vh] lg:mt-2 lg:h-[76vh]">
                <motion.div style={{ x: bandX, scale: bandScale }} className="absolute inset-y-0 left-0 w-[130%]">
                    <img
                        src={HOME_IMAGES.india.editorial}
                        alt="Heritage architecture in Telangana, India"
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                </motion.div>
                <div aria-hidden="true" className="absolute inset-0 bg-navy-deep/25" />

                {/* The statement's second act rides ON the band */}
                <div className="absolute inset-0 flex items-center">
                    <p className="mx-auto w-full max-w-[1500px] px-5 font-display text-[clamp(1.5rem,3.4vw,3.1rem)] italic leading-snug tracking-[-0.015em] text-white sm:px-8 lg:px-12">
                        <RevealText delay={0.25}>
                            Every country has its own rhythm — we build journeys
                        </RevealText>
                        <RevealText delay={0.4} className="text-gold">
                            around feeling it, not just seeing it.
                        </RevealText>
                    </p>
                </div>

                {/* Floating field note on the band */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute bottom-5 right-5 max-w-[220px] border-l border-gold/50 pl-3 text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/70 sm:right-8 lg:bottom-8 lg:right-12"
                >
                    Planned from the ground — from first brief to final transfer
                </motion.p>
            </div>

            {/* ── Facts as a quiet route strip ───────────────────────── */}
            <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-14 sm:px-8 lg:px-12 lg:pb-32">
                <motion.ol
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
                    className="flex flex-col gap-6 border-l-2 border-gold/60 pl-6 sm:flex-row sm:gap-0 sm:pl-0 sm:[&>li]:flex-1"
                >
                    {FACTS.map((f) => (
                        <li key={f.label} className="sm:pl-8">
                            <p className="text-[13px] font-semibold leading-snug tracking-wide text-navy">{f.value}</p>
                            <p className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-bronze/80">{f.label}</p>
                        </li>
                    ))}
                </motion.ol>
            </div>
        </section>
    );
}
