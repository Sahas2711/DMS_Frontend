import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { PAGE_META } from '../config/site';
import { itemListSchema } from '../config/structuredData';
import { fetchDestinations, resolveMediaUrl } from '../services/api/cms';
import { PageTransition } from '../components/editorial';
import { usePrefersReducedMotion } from '../components/motion/animations';

import indiaImg from '../assets/home/Kerala-Heritage.webp';
import vietnamImg from '../assets/home/tours/hanoi.jpg';
import japanImg from '../assets/home/tours/kyoto.jpg';
import koreaImg from '../assets/home/Korea.webp';

/** Hero image — bundled asset, no external hotlinks. */
import heroImage from '../assets/home/hero-image-home.webp';

const FALLBACK_DESTINATIONS = [
    {
        name: 'India',
        slug: 'india',
        number: '01',
        tagline: 'In all its colour and contrast',
        description: 'Rajasthan\'s palaces, Kerala\'s backwaters, Himalayan serenity — India is not one journey, but a thousand.',
        image: indiaImg,
        imageAlt: 'Kerala backwaters at golden hour, India',
        experiences: ['Royal Heritage', 'Wildlife Safari', 'Spiritual Retreats', 'Culinary Journeys'],
        regions: ['Rajasthan', 'Kerala', 'Ladakh', 'Goa', 'Varanasi'],
        meta: 'NORTH TO SOUTH',
    },
    {
        name: 'Vietnam',
        slug: 'vietnam',
        number: '02',
        tagline: 'Crafted around your curiosity',
        description: 'Atmospheric cities, dramatic coastlines, living traditions and unforgettable food — Vietnam reveals itself slowly, through flavor, warmth, and wonder.',
        image: vietnamImg,
        imageAlt: 'Hanoi old quarter, Vietnam',
        experiences: ['Heritage & Culture', 'Culinary Journeys', 'Coastal Escapes', 'Adventure'],
        regions: ['Hanoi', 'Ha Long Bay', 'Hoi An', 'Ho Chi Minh City', 'Phu Quoc'],
        meta: '1,600 KM OF COAST',
    },
    {
        name: 'Japan',
        slug: 'japan',
        number: '03',
        tagline: 'Where every detail has meaning',
        description: 'Ancient temples meet ultra-modern cities. In Japan, every season tells a different story — from cherry blossoms to golden forests.',
        image: japanImg,
        imageAlt: 'Kyoto temple rooftops, Japan',
        experiences: ['Cultural Immersion', 'Luxury Ryokans', 'Urban Discovery', 'Nature & Scenic'],
        regions: ['Tokyo', 'Kyoto', 'Osaka', 'Hokkaido', 'Okinawa'],
        meta: 'FIVE DISTINCT SEASONS',
    },
    {
        name: 'South Korea',
        slug: 'south-korea',
        number: '04',
        tagline: 'A meeting of tradition and momentum',
        description: 'Seoul\'s energy, Jeju\'s tranquility, ancient palace culture — South Korea blends tradition with cutting-edge innovation.',
        image: koreaImg,
        imageAlt: 'South Korea — traditional palace architecture',
        experiences: ['K-Culture', 'Island Retreats', 'Gastronomy', 'Art & Design'],
        regions: ['Seoul', 'Busan', 'Jeju Island', 'Gyeongju', 'Incheon'],
        meta: 'HANOK TO HANNAM',
    },
];

const DESTINATION_SLUGS = FALLBACK_DESTINATIONS.map((d) => d.slug);

/** Shared rise reveal — the page's only motion vocabulary. */
const Rise = ({ children, delay = 0, className = '' }) => {
    const prefersReducedMotion = usePrefersReducedMotion();
    return (
        <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Destination = () => {
    const [destinations, setDestinations] = useState(FALLBACK_DESTINATIONS);

    useEffect(() => {
        let cancelled = false;
        fetchDestinations({ pageSize: 20 }).then((res) => {
            if (cancelled || !res?.items?.length) return;
            // CMS wins for copy and hero media; verified fallback content fills
            // regions, experiences and metadata the CMS does not provide.
            const mapped = res.items
                .filter((d) => DESTINATION_SLUGS.includes(d.slug))
                .map((d) => {
                    const fallback = FALLBACK_DESTINATIONS.find((f) => f.slug === d.slug);
                    return {
                        ...fallback,
                        name: d.name || fallback.name,
                        tagline: d.short_description?.slice(0, 60) || fallback.tagline,
                        description: d.short_description || fallback.description,
                        image: d.hero_media?.url ? resolveMediaUrl(d.hero_media.url) : fallback.image,
                    };
                });
            if (mapped.length >= 3) {
                setDestinations(DESTINATION_SLUGS.map(
                    (slug) => mapped.find((m) => m.slug === slug) || FALLBACK_DESTINATIONS.find((f) => f.slug === slug)
                ));
            }
        }).catch(() => {});
        return () => { cancelled = true; };
    }, []);

    return (
        <PageTransition>
            <div className="w-full bg-white">
                <Seo {...PAGE_META['/destination']} path="/destination" />
                <JsonLd data={[itemListSchema(destinations)]} />

                {/* ── Arrival ── */}
                <section className="relative w-full h-[50vh] md:h-[65vh] lg:min-h-screen flex items-center overflow-hidden">
                    <img
                        src={heroImage}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover"
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-[var(--color-navy-deep)]/55" aria-hidden="true" />
                    <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="eyebrow text-[var(--color-gold)]/80 mb-5">Destinations — 01 to 04</p>
                            <h1 className="font-display text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.94] tracking-[-0.03em] text-white mb-6">
                                Four countries.
                                <span className="block italic text-[var(--color-gold)]">One way of working.</span>
                            </h1>
                            <p className="font-body text-white/50 text-base sm:text-lg leading-relaxed max-w-xl">
                                India, Vietnam, Japan and South Korea — each managed by local teams with
                                the same care, precision and ground knowledge.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ── Geographic route strip ── */}
                <nav aria-label="Destinations index" className="w-full bg-white border-b border-[var(--color-border-subtle)]">
                    <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16">
                        <ul className="flex flex-col sm:flex-row sm:items-stretch divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border-subtle)]">
                            {destinations.map((dest) => (
                                <li key={dest.slug} className="flex-1">
                                    <a
                                        href={`#chapter-${dest.slug}`}
                                        className="group flex items-baseline gap-3 py-4 sm:justify-center sm:px-6"
                                    >
                                        <span className="font-display text-[11px] tracking-[0.2em] text-[var(--color-gold)]/70">
                                            {dest.number}
                                        </span>
                                        <span className="font-display text-base sm:text-lg text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-300">
                                            {dest.name}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* ── Country chapters — alternating editorial spreads ── */}
                {destinations.map((dest, index) => {
                    const reversed = index % 2 === 1;
                    return (
                        <section
                            key={dest.slug}
                            id={`chapter-${dest.slug}`}
                            className={`w-full scroll-mt-20 ${index % 2 === 0 ? 'bg-[var(--color-ivory)]' : 'bg-white'} py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-16`}
                        >
                            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                                {/* Image column */}
                                <div className={`lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
                                    <Rise>
                                        <div className="relative overflow-hidden group">
                                            <img
                                                src={dest.image}
                                                alt={dest.imageAlt}
                                                className="w-full aspect-[4/3] md:aspect-[16/10] object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                                                loading={index === 0 ? 'eager' : 'lazy'}
                                                decoding="async"
                                            />
                                            <span
                                                aria-hidden="true"
                                                className="absolute -bottom-4 right-4 sm:right-8 font-display italic text-[clamp(4.5rem,10vw,9rem)] leading-none text-white/90 drop-shadow-[0_2px_18px_rgba(8,22,52,0.45)] select-none"
                                            >
                                                {dest.number}
                                            </span>
                                        </div>
                                    </Rise>
                                </div>

                                {/* Text column */}
                                <Rise delay={0.1} className={`lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>
                                    <p className="eyebrow mb-5">
                                        Chapter {dest.number} — {dest.name}
                                    </p>
                                    <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[0.95] tracking-[-0.03em] text-[var(--color-navy)] mb-4">
                                        {dest.name}
                                    </h2>
                                    <p className="font-display italic text-lg sm:text-xl text-[var(--color-bronze)] mb-6">
                                        {dest.tagline}
                                    </p>
                                    <p className="font-body text-[var(--color-text-secondary)] text-base leading-[1.8] mb-8 max-w-md">
                                        {dest.description}
                                    </p>

                                    {/* Regions — metadata line, not chips */}
                                    {dest.regions?.length > 0 && (
                                        <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-text-muted)] mb-3">
                                            {dest.regions.join('  ·  ')}
                                        </p>
                                    )}
                                    <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-gold)]/80 mb-8">
                                        {dest.meta}
                                    </p>

                                    {/* Experience themes — typographic index */}
                                    <ul className="border-t border-[var(--color-border-subtle)] mb-8">
                                        {dest.experiences?.slice(0, 4).map((exp) => (
                                            <li
                                                key={exp}
                                                className="border-b border-[var(--color-border-subtle)] py-2.5 flex items-center gap-3"
                                            >
                                                <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]/60" aria-hidden="true" />
                                                <span className="font-body text-sm text-[var(--color-navy)]/80">{exp}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link to={`/destination/${dest.slug}`} className="btn btn--md btn--navy group">
                                        Explore {dest.name}
                                        <span className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">→</span>
                                    </Link>
                                </Rise>
                            </div>
                        </section>
                    );
                })}

                {/* ── B2B CTA ── */}
                <section className="w-full bg-[var(--color-navy)] py-24 sm:py-32 px-5 sm:px-8 lg:px-16">
                    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        <Rise className="lg:col-span-7">
                            <p className="eyebrow text-[var(--color-gold)]/70 mb-4">Not Sure Which Destination?</p>
                            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-white mb-6">
                                Tell us who is travelling.{' '}
                                <span className="italic text-[var(--color-gold)]">We'll recommend the route.</span>
                            </h2>
                            <p className="font-body text-white/40 text-base leading-relaxed max-w-lg">
                                Send your brief — dates, traveller mix, hotel tier — and receive a tailored
                                proposal from our destination specialists.
                            </p>
                        </Rise>
                        <Rise delay={0.1} className="lg:col-span-5 lg:justify-self-end">
                            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                                <Link to="/request-quote" className="btn btn--lg btn--gold">
                                    Request a Quote
                                </Link>
                                <Link to="/tours" className="btn btn--lg btn--outline-white">
                                    Browse Journeys
                                </Link>
                            </div>
                        </Rise>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Destination;
