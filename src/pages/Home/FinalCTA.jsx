import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { HOME_IMAGES } from '../homeContent';
import { RevealText } from '../homeMotion';
import { EASE_EDITORIAL } from '../motionTokens';
import TopographicField from './TopographicField';

/* ═══════════════════════════════════════════════════════════════════
   FINAL CTA — "THE BRIEF"
   The journey ends where work begins: the topographic field breathes
   over a photographic base, a route line draws toward the conversion
   moment, and the position statement lands in oversized two-tone serif.
   Built on the client's own B2B positioning.
   ═══════════════════════════════════════════════════════════════════ */

export default function FinalCTA() {
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });

    const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-10%', '0%']);
    const fieldOpacity = useTransform(scrollYProgress, [0, 0.5], [0.15, 0.8]);

    return (
        <section
            ref={ref}
            aria-label="Start a partnership"
            className="relative flex min-h-[95svh] items-end overflow-hidden bg-navy-deep text-white"
        >
            {/* Photographic base with parallax */}
            <motion.div style={{ y: imgY }} className="absolute inset-0" aria-hidden="true">
                <img
                    src={HOME_IMAGES.cta}
                    alt=""
                    className="h-[115%] w-full object-cover opacity-25"
                    loading="lazy"
                    decoding="async"
                />
            </motion.div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-navy-deep/40" />

            {/* Signature 3D field (SVG fallback without WebGL) */}
            <motion.div style={{ opacity: fieldOpacity }} className="absolute inset-0">
                <TopographicField />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/80"
                >
                    <span aria-hidden="true" className="h-px w-10 bg-gold/60" />
                    Your brief. Our ground.
                </motion.p>

                <h2 className="display-xl font-display text-[clamp(2.8rem,7vw,6.8rem)] leading-[0.95] tracking-[-0.03em]">
                    <RevealText>Your clients expect</RevealText>
                    <RevealText delay={0.12}>
                        <span className="italic text-gold">memorable.</span>
                        <span className="text-white/85"> We handle the rest.</span>
                    </RevealText>
                </h2>

                {/* Route line draws toward conversion */}
                <motion.div
                    initial={reduce ? { opacity: 0.4 } : { scaleX: 0 }}
                    whileInView={reduce ? { opacity: 0.4 } : { scaleX: 1 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 1.3, delay: 0.5, ease: EASE_EDITORIAL }}
                    aria-hidden="true"
                    className="mt-12 h-px w-full max-w-3xl origin-left bg-gradient-to-r from-gold/70 via-gold/30 to-transparent"
                />

                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.55, ease: EASE_EDITORIAL }}
                    className="mt-8 max-w-lg text-[14px] leading-[1.85] text-white/55"
                >
                    Deadlines, details, flawless execution on the ground. Send the brief —
                    a destination specialist replies within one business day.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7, ease: EASE_EDITORIAL }}
                    className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
                >
                    <Link
                        to="/request-quote"
                        className="group inline-flex items-center justify-center gap-3 bg-gold px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-deep transition-colors duration-300 hover:bg-gold-light"
                    >
                        Request a Quote
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <Link
                        to="/become-a-partner"
                        className="inline-flex items-center justify-center border border-white/30 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition-colors duration-300 hover:border-gold/70 hover:text-gold"
                    >
                        Become a Partner
                    </Link>
                </motion.div>

                {/* Quiet trade-coordination footnote */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.9 }}
                    className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[9px] uppercase tracking-[0.26em] text-white/30"
                >
                    <span>24/7 ground support</span>
                    <span aria-hidden="true" className="h-[3px] w-[3px] rotate-45 bg-gold/50" />
                    <span>One trade desk</span>
                    <span aria-hidden="true" className="h-[3px] w-[3px] rotate-45 bg-gold/50" />
                    <span>India · Vietnam · Japan · South Korea</span>
                </motion.p>
            </div>
        </section>
    );
}
