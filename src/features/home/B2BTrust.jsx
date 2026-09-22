import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { CAPABILITIES } from '../../pages/homeContent';
import { Map, Compass, MessageSquare, Settings } from 'lucide-react';

const ICONS = {
    '01': Map,
    '02': Compass,
    '03': MessageSquare,
    '04': Settings,
};

export default function B2BTrust() {
    const reduce = useReducedMotion();

    return (
        <section aria-label="Why travel with Asian Star Travel" className="relative overflow-hidden bg-[var(--color-ivory)]">
            <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                    <motion.p
                        initial={reduce ? {} : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-bronze)]"
                    >
                        Why Travel with Asian Star Travel
                    </motion.p>
                    <motion.h2
                        initial={reduce ? {} : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-navy)]"
                    >
                        Local knowledge.
                        <br />
                        <span className="italic text-[var(--color-navy)]/60">Global standards.</span>
                    </motion.h2>
                    <motion.p
                        initial={reduce ? {} : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-6 text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
                    >
                        Your clients expect memorable travel. You need a partner who understands
                        deadlines, details and the importance of getting every moving part right.
                    </motion.p>
                </div>

                {/* Feature cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    {CAPABILITIES.map((cap, index) => {
                        const Icon = ICONS[cap.number] || Map;
                        return (
                            <motion.div
                                key={cap.number}
                                initial={reduce ? {} : { opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative bg-white border border-[var(--color-border-subtle)] p-8 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[var(--color-gold)]/30"
                            >
                                <div className="mb-6 flex h-12 w-12 items-center justify-center border border-[var(--color-border-subtle)] transition-colors duration-300 group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-gold)]/5">
                                    <Icon className="h-5 w-5 text-[var(--color-navy)]/60 transition-colors duration-300 group-hover:text-[var(--color-gold)]" strokeWidth={1.5} />
                                </div>
                                <span className="block text-[10px] font-semibold tracking-[0.2em] text-[var(--color-bronze)]/60 mb-3">
                                    {cap.number}
                                </span>
                                <h3 className="font-display text-xl text-[var(--color-navy)] mb-3 leading-snug">
                                    {cap.title}
                                </h3>
                                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                                    {cap.body}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    initial={reduce ? {} : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <Link
                        to="/travel-trade"
                        className="group inline-flex items-center gap-3 border-b border-[var(--color-navy)]/30 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)] transition-colors duration-300 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                    >
                        How we work with the trade
                        <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
