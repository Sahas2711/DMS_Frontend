import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { JOURNAL_STORIES } from '../homeContent';
import { EASE_EDITORIAL } from '../motionTokens';

/* ═══════════════════════════════════════════════════════════════════
   JOURNAL — "FIELD NOTES"
   A full-bleed magazine cover: the feature photograph runs edge to
   edge, the headline sits ON the image with a kicker chip and a route
   arrow, and two secondary stories run as asymmetric offset rows below
   (no identical cards). Closes on a quiet field-note line.
   ═══════════════════════════════════════════════════════════════════ */

export default function JournalFeature() {
    const reduce = useReducedMotion();
    const [feature, second, third] = JOURNAL_STORIES;

    return (
        <section aria-label="Travel journal" className="relative overflow-hidden bg-warm-white text-navy">
            {/* ── Magazine cover ── */}
            <div className="group relative h-[78vh] overflow-hidden lg:h-[92vh]">
                <motion.img
                    src={feature.image}
                    alt={feature.imageAlt}
                    initial={reduce ? undefined : { scale: 1.12 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.2, ease: EASE_EDITORIAL }}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/15 to-navy-deep/30" />

                {/* Kicker + headline ON the cover */}
                <div className="absolute inset-x-0 bottom-0">
                    <div className="mx-auto max-w-[1500px] px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
                        >
                            <p className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                                <span aria-hidden="true" className="h-px w-10 bg-gold/60" />
                                {feature.kicker} — {feature.date}
                            </p>
                            <h2 className="display-xl mt-4 max-w-4xl font-display text-[clamp(2.4rem,6.5vw,5.8rem)] leading-[0.95] tracking-[-0.03em] text-white">
                                {feature.title}
                            </h2>
                            <p className="mt-4 max-w-xl text-[14px] leading-[1.8] text-white/65">
                                {feature.excerpt}
                            </p>
                            <Link
                                to="/blog"
                                className="group/link mt-7 inline-flex items-center gap-3 border-b border-gold/50 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-gold hover:text-gold"
                            >
                                Read the story
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-1.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ── Secondary stories — asymmetric offset rows ── */}
            <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
                <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
                    {[second, third].map((story, i) => (
                        <motion.article
                            key={story.title}
                            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
                            whileInView={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 0.85, delay: i * 0.1, ease: EASE_EDITORIAL }}
                            className={`group lg:col-span-6 ${i === 1 ? 'lg:col-start-7 lg:mt-24' : ''}`}
                        >
                            <Link to="/blog" className="block">
                                <div className="overflow-hidden">
                                    <img
                                        src={story.image}
                                        alt={story.imageAlt}
                                        className={`w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045] ${
                                            i === 0 ? 'aspect-[16/10]' : 'aspect-[4/3] lg:aspect-[16/11]'
                                        }`}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                                <div className="mt-6 flex items-baseline justify-between gap-4">
                                    <p className="text-[10px] uppercase tracking-[0.24em] text-bronze">
                                        {story.kicker} — {story.date}
                                    </p>
                                    <span
                                        aria-hidden="true"
                                        className="h-px w-10 bg-navy/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-16 group-hover:bg-bronze"
                                    />
                                </div>
                                <h3 className="mt-3 max-w-lg font-display text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1.05] tracking-[-0.015em] transition-colors duration-300 group-hover:text-bronze">
                                    {story.title}
                                </h3>
                                <p className="mt-3 max-w-md text-[13px] leading-[1.75] text-navy/60">
                                    {story.excerpt}
                                </p>
                            </Link>
                        </motion.article>
                    ))}

                    {/* Field-note close */}
                    <div className="flex items-end lg:col-span-12">
                        <p className="mt-4 max-w-md border-l-2 border-gold/60 pl-5 text-[12px] leading-[1.9] tracking-wide text-navy/50">
                            Field notes, destination guides and transit know-how from the
                            specialists who operate these routes every week.
                        </p>
                        <Link
                            to="/blog"
                            className="group ml-auto hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy transition-colors duration-300 hover:text-bronze sm:inline-flex"
                        >
                            All articles
                            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
