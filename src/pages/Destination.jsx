/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { PAGE_META } from '../config/site';
import { itemListSchema } from '../config/structuredData';
import { fetchDestinations, resolveMediaUrl } from '../services/api/cms';
import { PageTransition, Rise } from '../components/editorial';

const indiaImg = '/images/home/India-hero-image.webp';
const indiaDelhi = '/images/home/india-Delhi.webp';
const vietnamImg = '/images/home/Vietnam-Hanoi.webp';
const japanImg = '/images/home/Japan-kyota.webp';
const koreaImg = '/images/home/Korea-Seoul.webp';

/** Hero image — bundled asset, no external hotlinks. */
const heroImage = '/images/home/hero-image-home.webp';

/** Editorial 4-country showcase data */
const EDITORIAL_DESTINATIONS = [
    {
        name: 'India',
        slug: 'delhi',
        number: '01',
        tagline: 'In all its colour and contrast',
        description: 'Rajasthan\'s palaces, Kerala\'s backwaters, Himalayan serenity.',
        image: indiaImg,
        imageAlt: 'Red Fort and Old Delhi skyline, India',
        experiences: ['Royal Heritage', 'Wildlife Safari', 'Spiritual Retreats', 'Culinary Journeys'],
        regions: ['Rajasthan', 'Kerala', 'Ladakh', 'Goa', 'Varanasi'],
        meta: 'NORTH TO SOUTH',
    },
    {
        name: 'Vietnam',
        slug: 'ha-long-bay',
        number: '02',
        tagline: 'Crafted around your curiosity',
        description: 'Atmospheric cities, dramatic coastlines, living traditions and unforgettable food.',
        image: vietnamImg,
        imageAlt: 'Hanoi old quarter, Vietnam',
        experiences: ['Heritage & Culture', 'Culinary Journeys', 'Coastal Escapes', 'Adventure'],
        regions: ['Hanoi', 'Ha Long Bay', 'Hoi An', 'Ho Chi Minh City', 'Phu Quoc'],
        meta: '1,600 KM OF COAST',
    },
    {
        name: 'Japan',
        slug: 'tokyo',
        number: '03',
        tagline: 'Where every detail has meaning',
        description: 'Ancient temples meet ultra-modern cities. Every season tells a different story.',
        image: japanImg,
        imageAlt: 'Kyoto temple rooftops, Japan',
        experiences: ['Cultural Immersion', 'Luxury Ryokans', 'Urban Discovery', 'Nature & Scenic'],
        regions: ['Tokyo', 'Kyoto', 'Osaka', 'Hokkaido', 'Okinawa'],
        meta: 'FIVE DISTINCT SEASONS',
    },
    {
        name: 'South Korea',
        slug: 'seoul',
        number: '04',
        tagline: 'A meeting of tradition and momentum',
        description: 'Seoul\'s energy, Jeju\'s tranquility, ancient palace culture meets innovation.',
        image: koreaImg,
        imageAlt: 'South Korea — traditional palace architecture',
        experiences: ['K-Culture', 'Island Retreats', 'Gastronomy', 'Art & Design'],
        regions: ['Seoul', 'Busan', 'Jeju Island', 'Gyeongju', 'Incheon'],
        meta: 'HANOK TO HANNAM',
    },
];

const EDITORIAL_SLUGS = EDITORIAL_DESTINATIONS.map((d) => d.slug);

const FALLBACK_IMAGE_MAP = {
    delhi: indiaDelhi,
    'ha-long-bay': vietnamImg,
    tokyo: japanImg,
    seoul: koreaImg,
};

const FALLBACK_REGIONS = {
    delhi: ['Rajasthan', 'Kerala', 'Ladakh', 'Goa', 'Varanasi'],
    'ha-long-bay': ['Hanoi', 'Ha Long Bay', 'Hoi An', 'Ho Chi Minh City', 'Phu Quoc'],
    tokyo: ['Tokyo', 'Kyoto', 'Osaka', 'Hokkaido', 'Okinawa'],
    seoul: ['Seoul', 'Busan', 'Jeju Island', 'Gyeongju', 'Incheon'],
    hiroshima: ['Hiroshima', 'Miyajima'],
    sapporo: ['Sapporo', 'Otaru', 'Furano'],
    'hoi-an': ['Hoi An', 'Da Nang', 'My Son'],
    'da-nang': ['Da Nang', 'Hoi An', 'Hue'],
    'ho-chi-minh-city': ['Ho Chi Minh City', 'Mekong Delta', 'Cu Chi'],
    kyoto: ['Kyoto', 'Nara', 'Uji'],
    osaka: ['Osaka', 'Kobe', 'Nara'],
    jaipur: ['Jaipur', 'Pushkar', 'Ranthambore'],
    kerala: ['Kerala', 'Alleppey', 'Munnar', 'Thekkady'],
};

const FALLBACK_EXPERIENCES = {
    delhi: ['Royal Heritage', 'Wildlife Safari', 'Spiritual Retreats', 'Culinary Journeys'],
    'ha-long-bay': ['Heritage & Culture', 'Culinary Journeys', 'Coastal Escapes', 'Adventure'],
    tokyo: ['Cultural Immersion', 'Luxury Ryokans', 'Urban Discovery', 'Nature & Scenic'],
    seoul: ['K-Culture', 'Island Retreats', 'Gastronomy', 'Art & Design'],
    hiroshima: ['Heritage & Culture', 'Peace Memorial', 'Island Escapes'],
    sapporo: ['Winter Sports', 'Food & Drink', 'Nature & Scenic'],
    'hoi-an': ['Heritage & Culture', 'Culinary Journeys', 'Artisan Crafts'],
    'da-nang': ['Coastal Escapes', 'Adventure', 'Heritage & Culture'],
    'ho-chi-minh-city': ['Heritage & Culture', 'Culinary Journeys', 'Urban Discovery'],
    kyoto: ['Cultural Immersion', 'Luxury Ryokans', 'Nature & Scenic', 'Artisan Crafts'],
    osaka: ['Culinary Journeys', 'Urban Discovery', 'Nightlife'],
    jaipur: ['Royal Heritage', 'Artisan Crafts', 'Wildlife Safari'],
    kerala: ['Wellness & Slow Travel', 'Nature & Scenic', 'Culinary Journeys', 'Artisan Crafts'],
};

const FALLBACK_META = {
    delhi: 'NORTH TO SOUTH',
    'ha-long-bay': '1,600 KM OF COAST',
    tokyo: 'FIVE DISTINCT SEASONS',
    seoul: 'HANOK TO HANNAM',
    hiroshima: 'PEACE & HERITAGE',
    sapporo: 'WINTER WONDERLAND',
    'hoi-an': 'LANTERN-LIT HERITAGE',
    'da-nang': 'COASTAL GATEWAY',
    'ho-chi-minh-city': 'ENERGY & HISTORY',
    kyoto: 'ANCIENT CAPITAL',
    osaka: "JAPAN'S KITCHEN",
    jaipur: 'THE PINK CITY',
    kerala: "GOD'S OWN COUNTRY",
};

const Destination = () => {
    const [editorialDestinations, setEditorialDestinations] = useState(EDITORIAL_DESTINATIONS);
    const [allDestinations, setAllDestinations] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const PAGE_SIZE = 12;

    // Fetch editorial 4 destinations (enrich with API data)
    useEffect(() => {
        let cancelled = false;
        fetchDestinations({ pageSize: 20 }).then((res) => {
            if (cancelled || !res?.items?.length) return;
            const mapped = res.items
                .filter((d) => EDITORIAL_SLUGS.includes(d.slug))
                .map((d) => {
                    const fallback = EDITORIAL_DESTINATIONS.find((f) => f.slug === d.slug);
                    return {
                        ...fallback,
                        name: d.name || fallback.name,
                        tagline: d.short_description?.slice(0, 60) || fallback.tagline,
                        description: d.short_description || fallback.description,
                        image: d.hero_media?.url ? resolveMediaUrl(d.hero_media.url) : fallback.image,
                    };
                });
            if (mapped.length >= 3) {
                setEditorialDestinations(EDITORIAL_SLUGS.map(
                    (slug) => mapped.find((m) => m.slug === slug) || EDITORIAL_DESTINATIONS.find((f) => f.slug === slug)
                ));
            }
        }).catch(() => {});
        return () => { cancelled = true; };
    }, []);

    // Fetch all destinations for paginated list
    const fetchAllDestinations = useCallback(async (pageNum = 1) => {
        try {
            const res = await fetchDestinations({ page: pageNum, pageSize: PAGE_SIZE, sort: 'display_order' });
            if (res?.items) {
                const enriched = res.items.map((d) => {
                    const isEditorial = EDITORIAL_SLUGS.includes(d.slug);
                    const fallback = isEditorial ? EDITORIAL_DESTINATIONS.find((f) => f.slug === d.slug) : null;
                    return {
                        name: d.name,
                        slug: d.slug,
                        number: isEditorial ? fallback?.number : String(EDITORIAL_DESTINATIONS.length + 1).padStart(2, '0'),
                        tagline: d.short_description?.slice(0, 80) || 'Explore this destination',
                        description: d.short_description || 'Discover curated journeys and local expertise.',
                        image: d.hero_media?.url ? resolveMediaUrl(d.hero_media.url) : FALLBACK_IMAGE_MAP[d.slug] || '/images/home/hero-image-home.webp',
                        imageAlt: d.hero_media?.alt_text || d.name,
                        regions: d.regions?.length ? d.regions : (FALLBACK_REGIONS[d.slug] || []),
                        experiences: fallback?.experiences || FALLBACK_EXPERIENCES[d.slug] || ['Culture & Heritage', 'Culinary Journeys', 'Nature & Scenic'],
                        meta: fallback?.meta || FALLBACK_META[d.slug] || 'DESTINATION',
                        isEditorial,
                    };
                });
            setAllDestinations(enriched);
            setTotalCount(res.meta?.total || enriched.length);
            setTotalPages(res.meta?.total_pages || 1);
            }
        } catch (err) {
            console.error('Failed to fetch destinations:', err);
        }
    }, [PAGE_SIZE]);

    // Initial fetch - use a ref to track if we've already fetched
    const hasFetchedRef = useRef(false);
    useEffect(() => {
        if (!hasFetchedRef.current) {
            hasFetchedRef.current = true;
            fetchAllDestinations(1);
        }
    }, [fetchAllDestinations]);

    // Fetch on page change
    useEffect(() => {
        fetchAllDestinations(page);
    }, [page, fetchAllDestinations]);

    const goToPage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const totalEditorial = EDITORIAL_DESTINATIONS.length;

    return (
        <PageTransition>
            <div className="w-full bg-white">
                <Seo {...PAGE_META['/destination']} path="/destination" />
                <JsonLd data={[itemListSchema(editorialDestinations)]} />

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
                    <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="eyebrow text-[var(--color-gold)]/80 mb-5">
                                Destinations — 01 to {String(totalEditorial).padStart(2, '0')}
                            </p>
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
                    <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                        <ul className="flex flex-col sm:flex-row sm:items-stretch divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border-subtle)]">
                            {editorialDestinations.map((dest) => (
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
                {editorialDestinations.map((dest, index) => {
                    const reversed = index % 2 === 1;
                    return (
                        <section
                            key={dest.slug}
                            id={`chapter-${dest.slug}`}
                            className={`w-full scroll-mt-20 ${index % 2 === 0 ? 'bg-[var(--color-ivory)]' : 'bg-white'} py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12`}
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

                {/* ── All Destinations — Paginated List ── */}
                <section className="w-full bg-[var(--color-ivory)] py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-16">
                            <Rise>
                                <p className="eyebrow mb-3">All Destinations</p>
                                <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)]">
                                    {totalCount} destinations across Asia.
                                </h2>
                            </Rise>
                            {!showAll && (
                                <Rise delay={0.1} className="sm:ml-auto">
                                    <button
                                        onClick={() => setShowAll(true)}
                                        className="btn btn--md btn--navy"
                                    >
                                        View All Destinations
                                        <span aria-hidden="true">→</span>
                                    </button>
                                </Rise>
                            )}
                        </div>

                        {showAll && (
                            <>
                                {/* Destinations Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12">
                                    {allDestinations.map((dest, index) => (
                                        <motion.div
                                            key={dest.slug}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <Link to={`/destination/${dest.slug}`} className="group block bg-white border border-[var(--color-border-subtle)] overflow-hidden transition-all duration-300 hover:border-[var(--color-gold)]/50 hover:shadow-lg">
                                                <div className="relative aspect-[4/3] overflow-hidden">
                                                    <img
                                                        src={dest.image}
                                                        alt={dest.imageAlt}
                                                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute bottom-3 right-3 font-display italic text-2xl text-white/90 drop-shadow-[0_1px_10px_rgba(8,22,52,0.5)]"
                                                    >
                                                        {dest.number}
                                                    </span>
                                                </div>
                                                <div className="p-5 sm:p-6">
                                                    <h3 className="font-display text-lg sm:text-xl text-[var(--color-navy)] leading-tight mb-2 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                                                        {dest.name}
                                                    </h3>
                                                    <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4 line-clamp-2 font-body">
                                                        {dest.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {dest.regions?.slice(0, 3).map((region) => (
                                                            <span key={region} className="text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--color-gold)]/70 bg-[var(--color-gold)]/10 px-2.5 py-1 rounded">
                                                                {region}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-subtle)]">
                                                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]/80">
                                                            {dest.meta}
                                                        </span>
                                                        <span className="text-[11px] font-medium text-[var(--color-navy)]/60 group-hover:text-[var(--color-gold)] transition-colors">
                                                            Explore →
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <Rise className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => goToPage(page - 1)}
                                            disabled={page === 1}
                                            className="btn btn--sm btn--outline-navy disabled:opacity-50 disabled:pointer-events-none"
                                            aria-label="Previous page"
                                        >
                                            ← Previous
                                        </button>
                                        <span className="px-4 text-sm font-medium text-[var(--color-navy)]">
                                            Page {page} of {totalPages}
                                        </span>
                                        <button
                                            onClick={() => goToPage(page + 1)}
                                            disabled={page === totalPages}
                                            className="btn btn--sm btn--outline-navy disabled:opacity-50 disabled:pointer-events-none"
                                            aria-label="Next page"
                                        >
                                            Next →
                                        </button>
                                    </Rise>
                                )}

                                <Rise className="mt-10 text-center">
                                    <button
                                        onClick={() => { setShowAll(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)] hover:text-[var(--color-navy)] transition-colors"
                                    >
                                        Back to Featured Destinations
                                    </button>
                                </Rise>
                            </>
                        )}
                    </div>
                </section>

                {/* ── B2B CTA ── */}
                <section className="w-full bg-[var(--color-navy)] py-24 sm:py-32 px-5 sm:px-8 lg:px-12">
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