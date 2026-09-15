import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../assets/home/plan-your-trip.webp';
import Seo from '../components/Seo';
import RequestQuoteForm from '../components/forms/RequestQuoteForm';
import { PAGE_META } from '../config/site';
import { PageTransition } from '../components/editorial';
import { usePrefersReducedMotion } from '../components/motion/animations';

const PROCESS = [
    {
        step: '01',
        title: 'A specialist reviews your brief',
        text: 'Dates, traveller mix and hotel tier — read by a destination specialist, not a queue.',
    },
    {
        step: '02',
        title: 'You receive a draft proposal',
        text: 'Hotels, transport and experiences laid out day by day, with trade pricing.',
    },
    {
        step: '03',
        title: 'We refine it together',
        text: 'Adjust the programme until it is ready to sell to your client.',
    },
];

const RequestQuote = () => {
    const [searchParams] = useSearchParams();
    const tripType = searchParams.get('trip_type') || '';
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <PageTransition>
            <div className="w-full bg-white">
                <Seo {...PAGE_META['/request-quote']} path="/request-quote" noIndex image={heroImage} />

                {/* ── Arrival — compact cinematic header (conversion page stays direct) ── */}
                <section className="relative w-full h-[46vh] md:h-[56vh] flex items-end overflow-hidden">
                    <img
                        src={heroImage}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover"
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/90 via-[var(--color-navy)]/45 to-[var(--color-navy)]/20" />
                    <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 pb-12 sm:pb-16">
                        <motion.div
                            initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="eyebrow text-[var(--color-gold)]/80 mb-4">Request a Quote</p>
                            <h1 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.94] tracking-[-0.03em] text-white mb-4">
                                Tell us what your clients need.
                            </h1>
                            <p className="text-white/50 text-base sm:text-lg max-w-xl leading-relaxed font-body">
                                Send the trip requirements and we will come back with a tailored,
                                trade-priced proposal — usually within one business day.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ── Process + form ── */}
                <section className="w-full bg-[var(--color-ivory)] py-20 sm:py-28 px-5 sm:px-8 lg:px-16">
                    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        {/* Context column — sticky on desktop */}
                        <div className="lg:col-span-4 lg:sticky lg:top-28">
                            <motion.div
                                initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <p className="eyebrow mb-6">What Happens Next</p>
                                <ol className="border-t border-[var(--color-border-subtle)]">
                                    {PROCESS.map((item) => (
                                        <li key={item.step} className="border-b border-[var(--color-border-subtle)] py-6 flex gap-5">
                                            <span className="font-display text-[11px] tracking-[0.2em] text-[var(--color-gold)]/70 pt-1">
                                                {item.step}
                                            </span>
                                            <div>
                                                <h2 className="font-display text-lg text-[var(--color-navy)] leading-snug mb-1.5">
                                                    {item.title}
                                                </h2>
                                                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-body">
                                                    {item.text}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>

                                <div className="bg-[var(--color-champagne)] p-5 mt-8">
                                    <p className="text-xs text-[var(--color-navy)]/80 leading-relaxed">
                                        Planning for your own trip instead? Our{' '}
                                        <Link to="/contact" className="underline hover:text-[var(--color-gold)] transition-colors">
                                            contact form
                                        </Link>{' '}
                                        or WhatsApp concierge can help you directly.
                                    </p>
                                </div>

                                <p className="text-[11px] text-[var(--color-text-muted)] mt-6 leading-relaxed">
                                    Responses usually arrive within one business day. No payment is
                                    taken at this stage.
                                </p>
                            </motion.div>
                        </div>

                        {/* Form — untouched contract */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="bg-white border border-[var(--color-border-subtle)] shadow-xl p-6 md:p-10"
                            >
                                <RequestQuoteForm initialTripType={tripType} />
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default RequestQuote;
