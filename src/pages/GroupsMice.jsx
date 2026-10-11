import { Link } from 'react-router-dom';

import Seo from '../components/Seo';

import { PAGE_META } from '../config/site';

import { PageTransition, Rise } from '../components/editorial';

const heroImage =
    '/images/destinations/Large-Vietnam2024_BrandShoot-034-e1718707274522.webp';

const PROGRAMME_TYPES = [
    'Corporate meetings and incentives',
    'Group leisure travel',
    'Special-interest programmes',
    'Destination celebrations and weddings',
    'Multi-city journeys',
    'Tailored group experiences',
    'Accommodation and transport coordination',
    'Sightseeing and activity coordination',
    'Programme planning support',
];

const GroupsMice = () => {
    return (
        <PageTransition>
            <div className="w-full bg-white">
                <Seo {...PAGE_META['/groups-mice']} path="/groups-mice" />

                {/* =========================================================
                    HERO / ARRIVAL
                ========================================================== */}
                <section className="relative flex min-h-[55vh] w-full items-end overflow-hidden md:min-h-[70vh] lg:min-h-[85vh]">
                    <img
                        src={heroImage}
                        alt="Traditional Vietnamese pagoda gateway"
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081634]/85 via-[#081634]/35 to-[#081634]/20" />

                    <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
                        <Rise>
                            <p className="eyebrow mb-5 text-[var(--color-gold)]">
                                Groups · Meetings · Incentives
                            </p>
                            <h1 className="mb-6 max-w-4xl font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.94] tracking-[-0.03em] text-white">
                                Group Travel &amp; MICE Across Asia
                            </h1>
                            <p className="max-w-2xl font-body text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
                                From group leisure programmes to corporate
                                incentives, meetings and special-interest
                                journeys, AST helps travel partners explore
                                destination options and coordinate travel
                                programmes around their objectives.
                            </p>
                        </Rise>
                    </div>
                </section>

                {/* =========================================================
                    PURPOSE-LED PROGRAMMES
                ========================================================== */}
                <section className="bg-white py-16 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
                        <Rise>
                            <h2 className="mb-5 max-w-3xl font-display text-[clamp(1.8rem,4vw,3rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)]">
                                Purpose-led programmes. Considered
                                coordination.
                            </h2>
                            <p className="mb-12 max-w-2xl font-body text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                                Your objectives, group profile and preferred
                                dates guide the planning process, from the
                                route and accommodation preferences to the
                                experiences that bring people together.
                            </p>
                        </Rise>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                            {PROGRAMME_TYPES.map((type, index) => (
                                <Rise
                                    key={type}
                                    delay={Math.min(index * 0.04, 0.3)}
                                >
                                    <div className="group h-full border border-[var(--color-border-subtle)] bg-[var(--color-ivory)] p-6 transition-colors duration-300 hover:border-[var(--color-gold)]/40 sm:p-7">
                                        <h3 className="font-display text-lg leading-snug text-[var(--color-navy)] transition-colors duration-300 group-hover:text-[var(--color-gold)] sm:text-xl">
                                            {type}
                                        </h3>
                                    </div>
                                </Rise>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =========================================================
                    PLANNING WITH CARE
                ========================================================== */}
                <section className="bg-[var(--color-ivory)] py-16 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
                        <Rise className="max-w-3xl">
                                <p className="eyebrow mb-5">
                                    Planning with care
                                </p>
                                <h2 className="mb-6 font-display text-[clamp(1.8rem,4vw,3rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)]">
                                    The details behind a successful group
                                    journey
                                </h2>
                                <p className="mb-5 font-body text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                                    Share the purpose of your programme, group
                                    size, travel dates, preferred destinations,
                                    accommodation needs and activity interests.
                                    Dietary requirements, accessibility needs,
                                    delegate movements and scheduling
                                    considerations can be reviewed as part of
                                    the brief.
                                </p>
                                <p className="mb-8 font-body text-xs leading-relaxed text-[var(--color-text-muted)] sm:text-sm">
                                    Final service scope depends on destination,
                                    group size, dates and supplier availability.
                                    Venues, transport, activities and specific
                                    arrangements are confirmed only in the
                                    agreed proposal; no capacities or supplier
                                    commitments are guaranteed by this website.
                                </p>

                                <Link to="/request-quote" className="btn btn--md btn--navy">
                                    Discuss a Group Programme
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

export default GroupsMice;
