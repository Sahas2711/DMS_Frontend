import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../assets/aboutus/Aboutus-hero-image.webp';
import aboutSectionImg from '../assets/aboutus/aboutus-section.webp';
import ourStoryImg from '../assets/aboutus/our-story-image.webp';
import tailorMadeImg from '../assets/aboutus/Tailor-Made-Tours.webp';
import privateTransfersImg from '../assets/aboutus/Private-Transfers.webp';
import groundServicesImg from '../assets/aboutus/Ground-Services.webp';
import regionalReachImg from '../assets/aboutus/REGIONAL-REACH-section-image.webp';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';
import { PageTransition } from '../components/editorial';
import { usePrefersReducedMotion } from '../components/motion/animations';

/**
 * Shared reveal transition — one easing vocabulary, motion-guarded.
 * (Framer replaces the page's previous GSAP instance so the site keeps a
 * single animation engine on non-home routes.)
 */
const rise = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const riseImg = {
    hidden: { opacity: 0, scale: 1.06 },
    visible: { opacity: 1, scale: 1 },
};

const Rise = ({ children, delay = 0, className = '' }) => {
    const prefersReducedMotion = usePrefersReducedMotion();
    return (
        <motion.div
            initial={prefersReducedMotion ? {} : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={rise}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/** Cinematic image reveal: mask wipe + settle, motion-guarded. */
const RevealImage = ({ src, alt, className = '', imgClassName = '', children }) => {
    const prefersReducedMotion = usePrefersReducedMotion();
    return (
        <motion.div
            initial={prefersReducedMotion ? {} : 'hidden'}
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

/* ── Verified content (site.js / existing copy — nothing invented) ── */

const DESTINATIONS = [
    { number: '01', name: 'India', note: 'Heritage, wild landscapes and living traditions.' },
    { number: '02', name: 'Vietnam', note: 'The long coast — from Hanoi to the Mekong Delta.' },
    { number: '03', name: 'Japan', note: 'Precision, craft and quiet detail.' },
    { number: '04', name: 'South Korea', note: 'Palace culture meeting contemporary design.' },
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
        number: '01',
        title: 'Independent Travelers (FIT)',
        description: 'Private, flexible itineraries for individuals, couples and families.',
        tag: 'TAILOR-MADE',
    },
    {
        number: '02',
        title: 'Group Travel (GIT)',
        description: 'Coordinated programs and reliable logistics for organized groups.',
        tag: 'LOGISTICS & ESCORTS',
    },
    {
        number: '03',
        title: 'Incentive Groups',
        description: 'Rewarding, well-run experiences for corporate and incentive travel.',
        tag: 'CORPORATE PRECISION',
    },
    {
        number: '04',
        title: 'Travel Partners',
        description: 'Dependable local ground handling for overseas agencies and tour operators.',
        tag: 'B2B INBOUND DMC',
    },
];

const Aboutus = () => (
    <PageTransition>
        <div className="w-full">
            <Seo {...PAGE_META['/about']} path="/about" />

            {/* ── Arrival: full-bleed hero ── */}
            <PageHero image={heroImage} alt="" title="About Us" eyebrow="The ground partner behind Asia" uppercase />

            {/* ── Chapter 01 — Who We Are: editorial split ── */}
            <section className="w-full bg-[var(--color-ivory)] py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-16">
                <div className="max-w-[1400px] mx-auto">
                    <Rise className="max-w-3xl mb-16 lg:mb-20">
                        <p className="eyebrow mb-5">Who We Are</p>
                        <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-[-0.03em] text-[var(--color-navy)] mb-8">
                            A B2B destination management company,{' '}
                            <span className="italic text-[var(--color-gold)]">built around the ground.</span>
                        </h2>
                        <p className="font-body text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed">
                            Asian Star Travel crafts private journeys and reliable ground services across India,
                            Vietnam, Japan and South Korea — planning every detail locally, from the first inquiry
                            to the final departure.
                        </p>
                    </Rise>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        {/* Image column with floating ops card */}
                        <div className="lg:col-span-6">
                            <RevealImage
                                src={aboutSectionImg}
                                alt="Asian Star Travel operations"
                                className="w-full max-w-[560px] shadow-2xl"
                                imgClassName="aspect-[4/3] md:aspect-[16/11]"
                            >
                                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-[var(--color-warm-white)]/95 backdrop-blur-md p-4 shadow-lg flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <span className="text-[9px] sm:text-[10px] font-semibold text-[var(--color-bronze)] tracking-[0.2em] uppercase block">
                                            LOCAL GROUND MANAGEMENT
                                        </span>
                                        <span className="text-xs sm:text-sm font-medium text-[var(--color-navy)] truncate block">
                                            Handling every detail on the ground
                                        </span>
                                    </div>
                                    <span className="hidden sm:grid place-items-center w-10 h-10 rounded-full bg-[var(--color-champagne)] shrink-0" aria-hidden="true">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[var(--color-bronze)]">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.828 9.172-2.121 5.656L7.05 16.95l2.122-5.657 5.656-2.121Z" />
                                        </svg>
                                    </span>
                                </div>
                            </RevealImage>
                        </div>

                        {/* Text column with verified operational facts */}
                        <Rise delay={0.12} className="lg:col-span-6 lg:pl-4">
                            <p className="font-body text-[var(--color-text-secondary)] text-base leading-relaxed mb-8 max-w-lg">
                                We work with independent travelers and with overseas agencies and tour operators
                                who need a dependable partner on the ground across Asia — one trade desk,
                                local teams in every destination.
                            </p>

                            {/* Verified operational metas only (footer/site.js facts) */}
                            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[var(--color-border-subtle)]">
                                <div>
                                    <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-text-muted)] uppercase block mb-1.5">
                                        HQ OPERATIONS
                                    </span>
                                    <span className="text-sm font-medium text-[var(--color-navy)]">Ho Chi Minh City</span>
                                </div>
                                <div>
                                    <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-text-muted)] uppercase block mb-1.5">
                                        SCOPE
                                    </span>
                                    <span className="text-sm font-medium text-[var(--color-navy)]">Nationwide Ground Coverage</span>
                                </div>
                                <div>
                                    <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-text-muted)] uppercase block mb-1.5">
                                        LICENSE
                                    </span>
                                    <span className="text-sm font-medium text-[var(--color-navy)]">Official Tour Operator</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-5 mt-10">
                                <Link to="/contact" className="btn btn--md btn--navy">
                                    Plan Your Trip
                                </Link>
                                <a href="#our-story" className="link-premium">
                                    Read Our Story
                                    <span className="link-arrow" aria-hidden="true">→</span>
                                </a>
                            </div>
                        </Rise>
                    </div>
                </div>
            </section>

            {/* ── Chapter 02 — Our Story: inverted split with quote ── */}
            <section id="our-story" className="w-full bg-white py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-16 scroll-mt-24">
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
                                Asian Star Travel is a destination management company operating across India,
                                Vietnam, Japan and South Korea. We plan and operate private journeys and
                                dependable ground services — handling every detail locally, from the first
                                inquiry to the final departure.
                            </p>
                            <p>
                                We work with independent travelers and with overseas agencies and tour
                                operators who need a reliable partner on the ground across Asia.
                            </p>
                        </div>

                        <figure className="bg-[var(--color-champagne)] border-l-2 border-[var(--color-gold)] p-6 max-w-xl">
                            <blockquote className="font-display text-base sm:text-lg text-[var(--color-navy)] leading-snug italic">
                                “Handling every detail locally, from the first inquiry to the final departure.”
                            </blockquote>
                            <figcaption className="mt-3 text-[11px] tracking-[0.15em] uppercase text-[var(--color-text-muted)]">
                                Direct dispatch from our operational desks across Asia
                            </figcaption>
                        </figure>
                    </Rise>
                </div>
            </section>

            {/* ── Chapter 03 — What we operate: numbered editorial rows ── */}
            <section className="w-full bg-[var(--color-ivory)] py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-16">
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
                                        <span className="absolute top-4 left-4 font-display text-[11px] tracking-[0.2em] text-white/90 bg-[var(--color-navy)]/40 backdrop-blur-sm px-2.5 py-1">
                                            0{index + 1}
                                        </span>
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

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 py-20 md:py-28">
                    <Rise className="max-w-2xl">
                        <p className="eyebrow text-[var(--color-gold)]/80 mb-5">Regional Reach</p>
                        <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-[-0.03em] text-white mb-6">
                            Four destinations. One standard of operation.
                        </h2>
                        <p className="font-body text-white/50 text-base leading-relaxed mb-10 max-w-lg">
                            Local teams and ground networks across Asia — so your clients travel with the same
                            level of care wherever they are.
                        </p>

                        {/* Waypoint strip — editorial index, not cards */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0 mb-10 border-t border-white/10">
                            {DESTINATIONS.map((dest) => (
                                <li key={dest.name} className="border-b border-white/10">
                                    <Link
                                        to={`/destination/${dest.name.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="group flex items-baseline gap-4 py-4"
                                    >
                                        <span className="font-display text-[11px] tracking-[0.2em] text-[var(--color-gold)]/70">
                                            {dest.number}
                                        </span>
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

            {/* ── Chapter 04 — Who we serve: numbered grid, old cards retired ── */}
            <section className="w-full bg-white py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-16">
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
                                    <span className="text-[var(--color-gold)]/60 text-[11px] font-semibold tracking-[0.2em] block mb-6">
                                        {item.number}
                                    </span>
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
            <section className="w-full bg-[var(--color-cream)] py-24 sm:py-32 px-5 sm:px-8 lg:px-16">
                <div className="max-w-[1400px] mx-auto text-center">
                    <Rise>
                        <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[0.98] tracking-[-0.02em] text-[var(--color-navy)] mb-6">
                            Planning journeys across Asia?
                        </h2>
                        <p className="font-body text-[var(--color-text-secondary)] text-base mb-10 max-w-lg mx-auto leading-relaxed">
                            Talk to our destination specialists about FIT, groups, MICE and tailor-made programmes.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/request-quote" className="btn btn--md btn--gold">
                                Request a Quote
                            </Link>
                            <Link to="/become-a-partner" className="btn btn--md btn--outline">
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
