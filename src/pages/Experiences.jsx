import { Link } from 'react-router-dom';

import Seo from '../components/Seo';

import { PAGE_META } from '../config/site';

import { PageTransition, Rise } from '../components/editorial';

const heroImage =
    '/images/destinations/Ha%20Long%20Bay%20%20Lan%20Ha%20Bay.webp';

/**
 * Travel-style cards — copy and order mirror the reference site.
 * Every card uses a unique Vietnam image from public/images/destinations.
 */
const TRAVEL_STYLES = [
    {
        title: 'FIT & Private Travel',
        description:
            'Private programmes built around personal interests, preferred pace and flexible routing.',
        style: 'FIT',
        image: '/images/destinations/Hanoi.webp',
        alt: 'Cityscape of Hanoi, Vietnam',
    },

    {
        title: 'Family Holidays',
        description:
            'Thoughtful journeys balancing shared discoveries, age-appropriate activities and time to relax.',
        style: 'Family',
        image: '/images/destinations/Da-Nang.webp',
        alt: 'Da Nang coastline, Vietnam',
    },

    {
        title: 'Honeymoons & Romantic Escapes',
        description:
            'Celebratory journeys with scenic stays, quieter moments and personalised arrangements.',
        style: 'Honeymoon',
        image: '/images/destinations/Dalat.webp',
        alt: 'Highlands of Da Lat, Vietnam',
    },

    {
        title: 'Luxury & Premium Journeys',
        description:
            'Considered accommodation choices and distinctive experiences shaped around individual preferences.',
        style: 'Luxury',
        image: '/images/destinations/Ho%20Chi%20Minh%20City.webp',
        alt: 'Ho Chi Minh City skyline, Vietnam',
    },

    {
        title: 'Groups & Special Interest Tours',
        description:
            'Group programmes that connect shared interests with practical transport and daily coordination.',
        style: 'Groups',
        image: '/images/destinations/Hue.webp',
        alt: 'Imperial architecture in Hue, Vietnam',
    },

    {
        title: 'Culture & Heritage',
        description:
            'Historic landmarks, living traditions and regional stories brought together in destination-led itineraries.',
        style: 'Culture',
        image: '/images/destinations/image_1754044694.webp',
        alt: 'Historic heritage gate in Vietnam',
    },

    {
        title: 'Food & Local Experiences',
        description:
            'Explore regional cuisine, markets and local food traditions through carefully planned experiences.',
        style: 'Food',
        image: '/images/destinations/Vietnam-hoi-an.webp',
        alt: 'Hoi An ancient town, Vietnam',
    },

    {
        title: 'Nature & Scenic Escapes',
        description:
            'Mountain scenery, limestone bays and island landscapes with time to experience the surroundings.',
        style: 'Nature',
        image:
            '/images/destinations/Misty%20Terraces%20of%20Sapa,%20Vietnam.webp',
        alt: 'Misty terraces of Sapa, Vietnam',
    },

    {
        title: 'Beach & Leisure',
        description:
            'Coastal extensions and relaxed island stays that complement a wider destination programme.',
        style: 'Beach',
        image: '/images/destinations/images%20(1).webp',
        alt: 'Coastal cliffs and turquoise sea in Vietnam',
    },

    {
        title: 'Wellness & Slow Travel',
        description:
            'Gentler pacing, restorative surroundings and wellness interests considered in your brief.',
        style: 'Wellness',
        image: '/images/destinations/Ninh%20Binh.webp',
        alt: 'Sunrise over the karst landscape of Ninh Binh, Vietnam',
    },

    {
        title: 'Destination Weddings',
        description:
            'Destination celebrations developed around the occasion, guest profile and agreed local arrangements.',
        style: 'Wedding',
        image: '/images/destinations/Mekong_Delta.webp',
        alt: 'River life in the Mekong Delta, Vietnam',
    },

    {
        title: 'MICE & Incentives',
        description:
            'Corporate programmes that combine business objectives with engaging destination experiences.',
        style: 'MICE',
        image:
            '/images/destinations/Sunset%20Karsts%20with%20Lanterns%20and%20Junks.webp',
        alt: 'Sunset karsts with lanterns and junks, Vietnam',
    },
];

const Experiences = () => {
    return (
        <PageTransition>
            <div className="w-full bg-white">
                <Seo
                    {...PAGE_META['/experiences']}
                    path="/experiences"
                />

                {/* =========================================================
                    HERO / ARRIVAL
                ========================================================== */}
                <section className="relative flex min-h-[55vh] w-full items-end overflow-hidden md:min-h-[70vh] lg:min-h-[85vh]">
                    <img
                        src={heroImage}
                        alt="Ha Long Bay and Lan Ha Bay, Vietnam"
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081634]/85 via-[#081634]/35 to-[#081634]/20" />

                    <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
                        <Rise>
                            <p className="eyebrow mb-5 text-[var(--color-gold)]">
                                Travel Your Way
                            </p>
                            <h1 className="mb-6 max-w-4xl font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.94] tracking-[-0.03em] text-white">
                                Experiences for Every Travel Style
                            </h1>
                            <p className="max-w-2xl font-body text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
                                Every traveller has a different reason to
                                explore. AST helps travel partners shape
                                destination programmes around the interests,
                                pace and priorities of their clients.
                            </p>
                        </Rise>
                    </div>
                </section>

                {/* =========================================================
                    TRAVEL STYLES GRID
                ========================================================== */}
                <section className="bg-white py-16 sm:py-24 lg:py-28">
                    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
                            {TRAVEL_STYLES.map((item, index) => (
                                <Rise
                                    key={item.title}
                                    delay={Math.min(index * 0.05, 0.4)}
                                >
                                    <article className="group flex h-full flex-col border border-[var(--color-border-subtle)] bg-white transition-colors duration-300 hover:border-[var(--color-gold)]/40">
                                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.alt}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col p-6 sm:p-7">
                                            <h3 className="mb-3 font-display text-xl leading-tight tracking-[-0.02em] text-[var(--color-navy)] transition-colors duration-300 group-hover:text-[var(--color-gold)] sm:text-2xl">
                                                {item.title}
                                            </h3>

                                            <p className="mb-6 font-body text-sm leading-relaxed text-[var(--color-text-secondary)]">
                                                {item.description}
                                            </p>

                                            <Link
                                                to={`/request-quote?style=${item.style}`}
                                                className="mt-auto inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-bronze)] transition-colors duration-300 hover:text-[var(--color-gold)]"
                                            >
                                                Plan this experience
                                                <span aria-hidden="true">
                                                    →
                                                </span>
                                            </Link>
                                        </div>
                                    </article>
                                </Rise>
                            ))}
                        </div>
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

export default Experiences;
