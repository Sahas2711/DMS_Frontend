import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
const heroImage = '/images/aboutus/Aboutus-hero-image.webp';
const aboutSectionImg = '/images/services/Travel-on-your-terms.webp';
const ourStoryImg = '/images/home/plan-your-trip.webp';
const tailorMadeImg = '/images/aboutus/Tailor-Made-Tours.webp';
const privateTransfersImg = '/images/aboutus/Private-Transfers.webp';
const groundServicesImg = '/images/aboutus/Ground-Services.webp';
const regionalReachImg = '/images/home/India-hero-image.webp';
const travelCTAImg = '/images/aboutus/LAnding_page_2.webp';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';
import { PageTransition, Rise } from '../components/editorial';

const riseImg = {
    hidden: { opacity: 0, scale: 1.06 },
    visible: { opacity: 1, scale: 1 },
};

const RevealImage = ({ src, alt, className = '', imgClassName = '', children }) => {
    const reduce = useReducedMotion();
    return (
        <motion.div
            initial={reduce ? {} : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={riseImg}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative overflow-hidden ${className}`}
        >
            <img src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} loading="lazy" decoding="async" />
            {children}
        </motion.div>
    );
};

const DESTINATIONS = [
    { name: 'India', slug: 'delhi', note: 'Heritage, wild landscapes and living traditions.' },
    { name: 'Vietnam', slug: 'ha-long-bay', note: 'The long coast — from Hanoi to the Mekong Delta.' },
    { name: 'Japan', slug: 'tokyo', note: 'Precision, craft and quiet detail.' },
    { name: 'South Korea', slug: 'seoul', note: 'Palace culture meeting contemporary design.' },
];

const SERVICES = [
    {
        title: 'Tailor-Made Tours',
        description: 'Private itineraries designed around your pace, interests and travel dates — never off-the-shelf.',
        image: tailorMadeImg,
        link: '/services/tailor-made-tours',
    },
    {
        title: 'Private Transfers',
        description: 'Private cars with professional local drivers between every destination — comfortable and on time.',
        image: privateTransfersImg,
        link: '/services/private-tours',
    },
    {
        title: 'Ground Services',
        description: 'Full DMC support — guides, transfers, permits, bookings, and on-trip assistance across every destination.',
        image: groundServicesImg,
        link: '/services/ground-services',
    },
];

const WHO_WE_SERVE = [
    {
        title: 'Independent Travelers (FIT)',
        description: 'Private, flexible itineraries for individuals, couples and families.',
        tag: 'TAILOR-MADE',
    },
    {
        title: 'Group Travel (GIT)',
        description: 'Coordinated programs and reliable logistics for organized groups.',
        tag: 'LOGISTICS & ESCORTS',
    },
    {
        title: 'Incentive Groups',
        description: 'Rewarding, well-run experiences for corporate and incentive travel.',
        tag: 'CORPORATE PRECISION',
    },
    {
        title: 'Travel Partners',
        description: 'Dependable local ground handling for overseas agencies and tour operators.',
        tag: 'B2B INBOUND DMC',
    },
];

const Aboutus = () => (
    <PageTransition>
        <div className="w-full">
            <Seo {...PAGE_META['/about']} path="/about" />

            <PageHero image={heroImage} alt="" title="About Us" eyebrow="The ground partner behind Asia" uppercase />

            {/* ── Chapter 01 — Who We Are: editorial split ── */}
         <section
    className="
        w-full
        bg-[var(--color-ivory)]
        px-5
        py-14
        sm:px-8
        sm:py-18
        lg:px-12
        lg:py-20
    "
>
    <div className="mx-auto max-w-[1400px]">

        {/* ═══════════════════════════════════════════════════════════
            INTRO
        ═══════════════════════════════════════════════════════════ */}

        <Rise className="mb-10 lg:mb-12">

            <p className="eyebrow mb-4">
                Who We Are
            </p>

            <h2
                className="
                    mb-6
                    max-w-[1150px]
                    font-display
                    text-[clamp(2.2rem,4.5vw,4rem)]
                    leading-[0.95]
                    tracking-[-0.03em]
                    text-[var(--color-navy)]
                "
            >
                A B2B destination management company,{' '}
                <span className="italic text-[var(--color-gold)]">
                    built around the ground.
                </span>
            </h2>

            <p
                className="
                    max-w-3xl
                    font-body
                    text-base
                    leading-relaxed
                    text-[var(--color-text-secondary)]
                    sm:text-lg
                "
            >
                Private journeys and reliable ground services across India,
                Vietnam, Japan and South Korea.
            </p>

        </Rise>


        {/* ═══════════════════════════════════════════════════════════
            IMAGE + OPERATIONS INFO
        ═══════════════════════════════════════════════════════════ */}

        <div
            className="
                grid
                grid-cols-1
                items-center
                gap-8
                lg:grid-cols-12
                lg:gap-12
            "
        >

            {/* ───────────────────────────────────────────────────────
                IMAGE
            ─────────────────────────────────────────────────────── */}

            <div className="lg:col-span-6">

                <RevealImage
                    src={aboutSectionImg}
                    alt="Asian Star Travel operations"
                    className="
                        w-full
                        max-w-[560px]
                        shadow-xl
                    "
                    imgClassName="
                        aspect-[4/3]
                        md:aspect-[16/11]
                    "
                >

                    <div
                        className="
                            absolute
                            bottom-4
                            left-4
                            right-4
                            flex
                            items-center
                            justify-between
                            gap-3
                            bg-[var(--color-warm-white)]/95
                            p-4
                            shadow-lg
                            backdrop-blur-md
                            sm:bottom-6
                            sm:left-6
                            sm:right-6
                        "
                    >

                        <div className="min-w-0">

                            <span
                                className="
                                    mb-1
                                    block
                                    text-[9px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.2em]
                                    text-[var(--color-bronze)]
                                    sm:text-[10px]
                                "
                            >
                                LOCAL GROUND MANAGEMENT
                            </span>

                            <span
                                className="
                                    block
                                    truncate
                                    text-xs
                                    font-medium
                                    text-[var(--color-navy)]
                                    sm:text-sm
                                "
                            >
                                Handling every detail on the ground
                            </span>

                        </div>


                        <span
                            className="
                                hidden
                                h-10
                                w-10
                                shrink-0
                                place-items-center
                                rounded-full
                                bg-[var(--color-champagne)]
                                sm:grid
                            "
                            aria-hidden="true"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-5 w-5 text-[var(--color-bronze)]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                                />

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.828 9.172-2.121 5.656L7.05 16.95l2.122-5.657 5.656-2.121Z"
                                />
                            </svg>
                        </span>

                    </div>

                </RevealImage>

            </div>


            {/* ───────────────────────────────────────────────────────
                OPERATIONS CONTENT
            ─────────────────────────────────────────────────────── */}

            <Rise
                delay={0.12}
                className="
                    lg:col-span-6
                    lg:pl-4
                "
            >

                <p
                    className="
                        mb-6
                        max-w-lg
                        font-body
                        text-base
                        leading-relaxed
                        text-[var(--color-text-secondary)]
                    "
                >
                    One trade desk, local teams in every destination —
                    handling every detail from inquiry to departure.
                </p>


                {/* Details */}
                <div
                    className="
                        grid
                        w-full
                        grid-cols-1
                        gap-5
                        border-t
                        border-[var(--color-border-subtle)]
                        pt-6
                        sm:grid-cols-3
                    "
                >

                    <div>
                        <span
                            className="
                                mb-1.5
                                block
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-[var(--color-text-muted)]
                            "
                        >
                            HQ OPERATIONS
                        </span>

                        <span
                            className="
                                text-sm
                                font-medium
                                text-[var(--color-navy)]
                            "
                        >
                            Ho Chi Minh City
                        </span>
                    </div>


                    <div>
                        <span
                            className="
                                mb-1.5
                                block
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-[var(--color-text-muted)]
                            "
                        >
                            SCOPE
                        </span>

                        <span
                            className="
                                text-sm
                                font-medium
                                text-[var(--color-navy)]
                            "
                        >
                            Nationwide Ground Coverage
                        </span>
                    </div>


                    <div>
                        <span
                            className="
                                mb-1.5
                                block
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-[var(--color-text-muted)]
                            "
                        >
                            LICENSE
                        </span>

                        <span
                            className="
                                text-sm
                                font-medium
                                text-[var(--color-navy)]
                            "
                        >
                            Official Tour Operator
                        </span>
                    </div>

                </div>


                {/* Actions */}
                <div
                    className="
                        mt-7
                        flex
                        flex-wrap
                        items-center
                        gap-5
                    "
                >

                    <Link
                        to="/contact"
                        className="btn btn--md btn--navy"
                    >
                        Plan Your Trip
                    </Link>

                    <a
                        href="#our-story"
                        className="link-premium"
                    >
                        Read Our Story

                        <span
                            className="link-arrow"
                            aria-hidden="true"
                        >
                            →
                        </span>
                    </a>

                </div>

            </Rise>

        </div>

    </div>
</section>

            {/* ── Chapter 02 — Our Story: inverted split with quote ── */}
            <section id="our-story" className="w-full bg-white py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12 scroll-mt-24">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    <Rise className="lg:col-span-5 order-2 lg:order-1">
                        <RevealImage
                            src={ourStoryImg}
                            alt="Asian Star Travel ground hospitality"
                            className="w-full max-w-[460px] mx-auto lg:mx-0 shadow-xl"
                            imgClassName="aspect-[4/5]"
                        />
                    </Rise>

                    <Rise delay={0.12} className="lg:col-span-7 order-1 lg:order-2 lg:pl-4">
                        <p className="eyebrow mb-4">Our Story</p>
                        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.0] tracking-[-0.02em] text-[var(--color-navy)] mb-8">
                            Crafting private journeys &amp; ground hospitality.
                        </h2>
                        <div className="font-body text-[var(--color-text-secondary)] text-base leading-[1.8] space-y-5 max-w-xl mb-10">
                            <p>
                                A destination management company operating across India, Vietnam, Japan and South Korea — handling every detail locally.
                            </p>
                        </div>

                        <figure className="bg-[var(--color-champagne)] border-l-2 border-[var(--color-gold)] p-6 max-w-xl">
                            <blockquote className="font-display text-base sm:text-lg text-[var(--color-navy)] leading-snug italic">
                                "Handling every detail locally, from the first inquiry to the final departure."
                            </blockquote>
                            <figcaption className="mt-3 text-[11px] tracking-[0.15em] uppercase text-[var(--color-text-muted)]">
                                Direct dispatch from our operational desks across Asia
                            </figcaption>
                        </figure>
                    </Rise>
                </div>
            </section>

            {/* ── Chapter 03 — What we operate: numbered editorial rows ── */}
            <section className="w-full bg-[var(--color-ivory)] py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <Rise className="mb-14 lg:mb-16">
                        <p className="eyebrow mb-4">Our Services</p>
                        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)]">
                            What we operate for travel agents.
                        </h2>
                    </Rise>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                        {SERVICES.map((service, index) => (
                            <Rise key={service.title} delay={index * 0.1}>
                                <Link
                                    to={service.link}
                                    className="group block bg-white border border-[var(--color-border-subtle)] h-full"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                    <div className="p-6 sm:p-7">
                                        <h3 className="font-display text-xl sm:text-2xl text-[var(--color-navy)] mb-3 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                        <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                            {service.description}
                                        </p>
                                        <span className="link-premium">
                                            Explore
                                            <span className="link-arrow" aria-hidden="true">→</span>
                                        </span>
                                    </div>
                                </Link>
                            </Rise>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Regional reach — full-bleed navy scene ── */}
            <section className="relative w-full overflow-hidden min-h-[420px] md:min-h-[520px] flex items-center">
                <img
                    src={regionalReachImg}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy-deep)]/95 via-[var(--color-navy)]/80 to-[var(--color-navy)]/30" />

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-20 md:py-28">
                    <Rise className="max-w-2xl">
                        <p className="eyebrow text-[var(--color-gold)]/80 mb-5">Regional Reach</p>
                        <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-[-0.03em] text-white mb-6">
                            Four destinations. One standard of operation.
                        </h2>
                        <p className="font-body text-white/50 text-base leading-relaxed mb-10 max-w-lg">
                            Local teams and ground networks across Asia — so your clients travel with the same
                            level of care wherever they are.
                        </p>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0 mb-10 border-t border-white/10">
                            {DESTINATIONS.map((dest) => (
                                <li key={dest.name} className="border-b border-white/10">
                                    <Link
                                        to={`/destination/${dest.slug}`}
                                        className="group flex items-baseline gap-4 py-4"
                                    >
                                        <span className="font-display text-lg sm:text-xl text-white group-hover:text-[var(--color-gold)] transition-colors duration-300 min-w-[7.5rem]">
                                            {dest.name}
                                        </span>
                                        <span className="hidden sm:block font-body text-xs text-white/40 leading-snug">
                                            {dest.note}
                                        </span>
                                        <span
                                            className="ml-auto text-white/30 group-hover:text-[var(--color-gold)] group-hover:translate-x-1 transition-all duration-300"
                                            aria-hidden="true"
                                        >
                                            →
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <Link to="/destination" className="btn btn--md btn--gold">
                            Explore Destinations
                        </Link>
                    </Rise>
                </div>
            </section>

            {/* ── Chapter 04 — Who we serve: numbered grid ── */}
            <section className="w-full bg-white py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <Rise className="mb-14 lg:mb-16">
                        <p className="eyebrow mb-4">Who We Serve</p>
                        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)]">
                            Tailored to how you travel.
                        </h2>
                    </Rise>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                        {WHO_WE_SERVE.map((item, index) => (
                            <Rise key={item.title} delay={index * 0.08}>
                                <div className="h-full bg-[var(--color-ivory)] border border-[var(--color-border-subtle)] p-7 sm:p-8 flex flex-col">
                                    <h3 className="font-display text-lg sm:text-xl text-[var(--color-navy)] mb-3 leading-[1.15]">
                                        {item.title}
                                    </h3>
                                    <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed mb-8">
                                        {item.description}
                                    </p>
                                    <span className="mt-auto text-[10px] font-semibold tracking-[0.18em] text-[var(--color-bronze)] uppercase">
                                        {item.tag}
                                    </span>
                                </div>
                            </Rise>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Closing CTA ── */}
         <section
    className="
        relative
        w-full
        overflow-hidden
        bg-[var(--color-navy)]
        bg-cover
        bg-center
        bg-no-repeat
        px-5
        py-20
        sm:px-8
        sm:py-28
        lg:px-12
        lg:py-36
    "
    style={{
        backgroundImage: `url(${travelCTAImg})`,
    }}
>
    {/* Dark overlay for text readability */}
    <div
        aria-hidden="true"
        className="
            absolute
            inset-0
            bg-[var(--color-navy)]/55
        "
    />

    {/* Content */}
    <div className="relative z-10 mx-auto max-w-[1400px] text-center">
        <Rise>

            <h2
                className="
                    mb-6
                    font-display
                    text-[clamp(1.9rem,4.5vw,3.2rem)]
                    leading-[0.98]
                    tracking-[-0.02em]
                    text-white
                "
            >
                Planning journeys across Asia?
            </h2>

            <p
                className="
                    mx-auto
                    mb-10
                    max-w-lg
                    font-body
                    text-base
                    leading-relaxed
                    text-white/80
                "
            >
                Talk to our destination specialists about FIT, groups,
                MICE and tailor-made programmes.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
                {/* 
                <Link
                    to="/request-quote"
                    className="btn btn--md btn--gold"
                >
                    Request a Quote
                </Link>
                */}

                <Link
                    to="/become-a-partner"
                    className="
                        btn
                        btn--md
                        border
                        border-white/60
                        bg-white/10
                        text-white
                        backdrop-blur-sm
                        transition-all
                        duration-300
                        hover:border-white
                        hover:bg-white
                        hover:text-[var(--color-navy)]
                    "
                >
                    Become a Partner
                </Link>
            </div>

        </Rise>
    </div>
</section>
        </div>
    </PageTransition>
);

export default Aboutus;
