import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../assets/home/hero-image-home.webp';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';
import { PageTransition } from '../components/editorial';
import { usePrefersReducedMotion } from '../components/motion/animations';

const TRADE_STEPS = [
    {
        number: '01',
        title: 'Send the brief',
        description: 'Use the request-a-quote form with dates, destination, travellers and hotel tier.',
    },
    {
        number: '02',
        title: 'Receive the proposal',
        description: 'A tailored itinerary with net or trade pricing, hotels, transport and experiences.',
    },
    {
        number: '03',
        title: 'Refine together',
        description: 'Adjust hotels, pace and inclusions until it is ready for your client.',
    },
    {
        number: '04',
        title: 'We operate it',
        description: 'Licensed ground handling from confirmation to the final transfer.',
    },
];

const TRADE_SUPPORT = [
    { title: 'Net & Trade Pricing', description: 'Transparent rates designed for tour operators and travel agencies.' },
    { title: '24/7 Ground Support', description: 'On-call operations team during every trip — your clients are never alone.' },
    { title: 'Co-branded Materials', description: 'Custom itineraries, PDFs and proposals under your brand.' },
    { title: 'Dedicated Partner Manager', description: 'A single point of contact who knows your business.' },
];

const PARTNER_TYPES = [
    'Tour Operators',
    'Travel Agencies',
    'Inbound DMCs',
    'MICE Planners',
    'Luxury Concierge',
    'Corporate Travel',
];

const TravelTrade = () => {
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <PageTransition>
            <div className="w-full bg-white">
                <Seo {...PAGE_META['/travel-trade']} path="/travel-trade" />

                <PageHero
                    image={heroImage}
                    alt="Travel trade partnership"
                    title="Travel Trade"
                    eyebrow="Travel Trade"
                    uppercase
                />

                {/* Intro */}
                <section className="py-24 sm:py-32 lg:py-40 bg-[var(--color-ivory)]">
                    <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                            <motion.div
                                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <p className="eyebrow text-[var(--color-bronze)]/60 mb-5">
                                    Partner With Us
                                </p>
                                <h1 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.92] tracking-[-0.03em] text-[var(--color-navy)] mb-8">
                                    A Destination Partner{' '}
                                    <span className="text-[var(--color-gold)]">You Can Build With.</span>
                                </h1>
                                <p className="font-body text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed mb-10">
                                    Your clients expect memorable travel. You need a partner who understands
                                    deadlines, details and the importance of getting every moving part right.
                                    AST works with travel agencies and tour operators to develop practical,
                                    distinctive and well-supported programmes across Asia.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link to="/become-a-partner" className="btn btn--md btn--gold">
                                        Become a Partner
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </Link>
                                    <Link to="/request-quote" className="btn btn--md btn--outline">
                                        Request a Quote
                                    </Link>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    {PARTNER_TYPES.map((type) => (
                                        <div
                                            key={type}
                                            className="p-5 border border-[var(--color-navy)]/6 text-center hover:border-[var(--color-gold)]/30 transition-colors duration-300"
                                        >
                                            <span className="font-display text-base text-[var(--color-navy)]">{type}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section className="py-24 sm:py-32 lg:py-40 bg-[var(--color-cream)]">
                    <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16">
                        <motion.div
                            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="mb-16 lg:mb-20"
                        >
                            <p className="eyebrow text-[var(--color-bronze)]/60 mb-4">How It Works</p>
                            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.92] tracking-[-0.03em] text-[var(--color-navy)]">
                                From Brief to Delivery.{' '}
                                <span className="text-[var(--color-gold)]">Seamlessly.</span>
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                            {TRADE_STEPS.map((step, index) => (
                                <motion.div
                                    key={step.number}
                                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="bg-white p-8 sm:p-10 border border-[var(--color-navy)]/5"
                                >
                                    <span className="text-[var(--color-gold)]/40 text-[11px] font-semibold tracking-[0.2em] block mb-4">
                                        {step.number}
                                    </span>
                                    <h3 className="font-display text-xl sm:text-2xl text-[var(--color-navy)] mb-3 leading-[1.15]">
                                        {step.title}
                                    </h3>
                                    <p className="text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed font-body">
                                        {step.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Support */}
                <section className="py-24 sm:py-32 lg:py-40 bg-[#081634]">
                    <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                            <motion.div
                                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <p className="eyebrow text-[#c5a869]/70 mb-5">Partner Support</p>
                                <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.92] tracking-[-0.03em] text-white mb-8">
                                    What We Provide.
                                </h2>
                            </motion.div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-12">
                                {TRADE_SUPPORT.map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <h3 className="font-display text-xl sm:text-2xl text-white mb-3 leading-[1.15]">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/35 text-sm sm:text-base leading-relaxed font-body">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 sm:py-32 lg:py-40 bg-[var(--color-ivory)]">
                    <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 text-center">
                        <motion.div
                            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)] mb-5">
                                Ready to Work Together?
                            </h2>
                            <p className="text-[var(--color-text-secondary)] text-base mb-10 max-w-lg mx-auto leading-relaxed font-body">
                                Tell us about your business and the destinations you sell.
                                We'll show you how we can support your growth.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link to="/request-quote" className="btn btn--md btn--gold">
                                    Request a Quote
                                </Link>
                                <Link to="/become-a-partner" className="btn btn--md btn--outline">
                                    Become a Partner
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default TravelTrade;
