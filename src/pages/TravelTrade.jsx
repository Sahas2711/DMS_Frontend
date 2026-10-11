import { Link } from 'react-router-dom';

import Seo from '../components/Seo';

import { PAGE_META } from '../config/site';

import { PageTransition, Rise } from '../components/editorial';

const heroImage =
    '/images/destinations/Ho%20Chi%20Minh%20City.webp';

const TRADE_PILLARS = [
    {
        title: 'Four-country destination focus',
        description:
            'Destination-led planning across India, Vietnam, Japan and South Korea.',
    },
    {
        title: 'Customisable itineraries',
        description:
            'Journeys shaped around your clients, rather than a fixed departure.',
    },
    {
        title: 'FIT, group and corporate travel',
        description:
            'Programme options for private holidays, special-interest groups and corporate incentives.',
    },
    {
        title: 'Destination-led recommendations',
        description:
            'Practical guidance on routing, seasonality, pace and experiences.',
    },
    {
        title: 'Local supplier coordination',
        description:
            'Coordination with relevant local partners for agreed destination arrangements.',
    },
    {
        title: 'A partner-first approach',
        description:
            'Clear communication and enquiry-based proposal development.',
    },
];

const TRADE_STEPS = [
    {
        title: 'Share your enquiry',
        description:
            'Tell us your travel requirements, dates and traveller profile.',
    },
    {
        title: 'Review the possibilities',
        description: 'AST reviews the destination and programme needs.',
    },
    {
        title: 'Shape the proposal',
        description:
            'A tailored itinerary and proposal are prepared for discussion.',
    },
    {
        title: 'Refine and confirm',
        description:
            'Details are refined and arrangements confirmed in writing.',
    },
    {
        title: 'Coordinate the journey',
        description: 'Agreed destination services are coordinated.',
    },
    {
        title: 'Support your programme',
        description:
            'Travel support follows the confirmed programme and service scope.',
    },
];

const TravelTrade = () => {
    return (
        <PageTransition>
            <div className="w-full bg-white">
                <Seo {...PAGE_META['/travel-trade']} path="/travel-trade" />

                {/* =========================================================
                    HERO / ARRIVAL
                ========================================================== */}
                <section className="relative flex min-h-[55vh] w-full items-end overflow-hidden md:min-h-[70vh] lg:min-h-[85vh]">
                    <img
                        src={heroImage}
                        alt="Ho Chi Minh City skyline, Vietnam"
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081634]/85 via-[#081634]/35 to-[#081634]/20" />

                    <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
                        <Rise>
                            <p className="eyebrow mb-5 text-[var(--color-gold)]">
                                Travel Trade
                            </p>
                            <h1 className="mb-6 max-w-4xl font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.94] tracking-[-0.03em] text-white">
                                Your Partner for Thoughtfully Managed Journeys
                                Across Asia
                            </h1>
                            <p className="max-w-2xl font-body text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
                                AST works with travel agencies, tour operators,
                                corporate travel planners and MICE organisers
                                seeking destination knowledge and professional
                                coordination across India, Vietnam, Japan and
                                South Korea.
                            </p>
                        </Rise>
                    </div>
                </section>

                {/* =========================================================
                    PARTNER-FIRST APPROACH
                ========================================================== */}
                <section className="bg-white py-16 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
                        <Rise>
                            <h2 className="mb-5 max-w-3xl font-display text-[clamp(1.8rem,4vw,3rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)]">
                                A collaborative, partner-first approach
                            </h2>
                            <p className="mb-12 max-w-2xl font-body text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                                We aim to understand your client’s
                                requirements, help shape a suitable programme
                                and coordinate the agreed destination
                                arrangements through a clear communication
                                process.
                            </p>
                        </Rise>

                        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                            {TRADE_PILLARS.map((pillar, index) => (
                                <Rise
                                    key={pillar.title}
                                    delay={Math.min(index * 0.04, 0.3)}
                                >
                                    <div className="group h-full border border-[var(--color-border-subtle)] p-6 transition-colors duration-300 hover:border-[var(--color-gold)]/40 sm:p-7">
                                        <h3 className="mb-2 font-display text-lg leading-snug text-[var(--color-navy)] transition-colors duration-300 group-hover:text-[var(--color-gold)] sm:text-xl">
                                            {pillar.title}
                                        </h3>
                                        <p className="font-body text-sm leading-relaxed text-[var(--color-text-secondary)]">
                                            {pillar.description}
                                        </p>
                                    </div>
                                </Rise>
                            ))}
                        </div>

                        <Rise>
                            <Link
                                to="/become-a-partner"
                                className="btn btn--md btn--gold"
                            >
                                Become an AST Partner
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    aria-hidden="true"
                                >
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </Link>
                        </Rise>
                    </div>
                </section>

                {/* =========================================================
                    HOW THE PROCESS WORKS
                ========================================================== */}
                <section className="bg-[var(--color-ivory)] py-16 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
                        <Rise>
                            <p className="eyebrow mb-5">
                                How the process works
                            </p>
                            <h2 className="mb-12 max-w-3xl font-display text-[clamp(1.8rem,4vw,3rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)]">
                                From enquiry to agreed arrangements
                            </h2>
                        </Rise>

                        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                            {TRADE_STEPS.map((step, index) => (
                                <li key={step.title} className="h-full">
                                    <Rise
                                        delay={Math.min(index * 0.04, 0.3)}
                                        className="h-full"
                                    >
                                        <div className="h-full border border-[var(--color-border-subtle)] bg-white p-6 sm:p-7">
                                            <span className="mb-4 block font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-bronze)]">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <h3 className="mb-2 font-display text-lg leading-snug text-[var(--color-navy)] sm:text-xl">
                                                {step.title}
                                            </h3>
                                            <p className="font-body text-sm leading-relaxed text-[var(--color-text-secondary)]">
                                                {step.description}
                                            </p>
                                        </div>
                                    </Rise>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* =========================================================
                    NEXT STEP CTA
                ========================================================== */}
                <section className="relative overflow-hidden bg-[var(--color-navy)] py-20 sm:py-28">
                    <div className="relative z-10 mx-auto max-w-[1400px] px-5 text-center sm:px-8 lg:px-12">
                        <Rise>
                            <p className="eyebrow mb-5 text-[var(--color-gold)]">
                                Next Step
                            </p>
                            <h2 className="mx-auto mb-6 max-w-3xl font-display text-[clamp(1.8rem,4.5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-white">
                                Let’s Create Something Exceptional
                                Together
                            </h2>
                            <p className="mx-auto mb-10 max-w-2xl font-body text-sm leading-relaxed text-white/70 sm:text-base">
                                Whether you are planning a private journey, a
                                family holiday, a multi-city programme or a
                                corporate incentive, AST is ready to help you
                                develop a destination-led proposal tailored to
                                your requirements.
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Link
                                    to="/request-quote"
                                    className="btn btn--md btn--gold"
                                >
                                    Request a Custom Itinerary
                                </Link>
                                <Link
                                    to="/become-a-partner"
                                    className="btn btn--md btn--outline-white"
                                >
                                    Become an AST Partner
                                </Link>
                            </div>
                        </Rise>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default TravelTrade;
