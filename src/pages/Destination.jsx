import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { PAGE_META } from '../config/site';
import { itemListSchema } from '../config/structuredData';
import { fetchDestinations, resolveMediaUrl, filterVietnamDestinations } from '../services/api/cms';
import { PageTransition, Rise } from '../components/editorial';

/** Hero image — bundled asset, no external hotlinks. */
const heroImage = '/images/home/hero-image-home.webp';
const ctaImage = '/images/services/Travel-on-your-terms.webp';

/** Bundled Vietnam fallback images for destinations without CMS hero media. */
const VIETNAM_FALLBACK_IMAGES = {
    'ha-long-bay': '/images/destinations/Ha%20Long%20Bay%20%20Lan%20Ha%20Bay.webp',
    'hoi-an': '/images/destinations/Vietnam-hoi-an.webp',
    'da-nang': '/images/destinations/Da-Nang.webp',
    'ho-chi-minh-city': '/images/destinations/Ho%20Chi%20Minh%20City.webp',
    hanoi: '/images/destinations/Hanoi.webp',
    sapa: '/images/destinations/Sapa.webp',
    hue: '/images/destinations/Hue.webp',
    'ninh-binh': '/images/destinations/Ninh%20Binh.webp',
    'mekong-delta': '/images/destinations/Mekong%20Delta.webp',
    dalat: '/images/destinations/Dalat.webp',
};
const DEFAULT_VIETNAM_IMAGE = '/images/destinations/Golden%20Bridge%20at%20Vietnam%20Sunset.webp';

const VIETNAM_FALLBACK_META = {
    'ha-long-bay': '1,600 KM OF COAST',
    'hoi-an': 'LANTERN-LIT HERITAGE',
    'da-nang': 'COASTAL GATEWAY',
    'ho-chi-minh-city': 'ENERGY & HISTORY',
    hanoi: 'OLD QUARTER capital',
    sapa: 'TERRACED HIGHLANDS',
    hue: 'IMPERIAL CITY',
    'ninh-binh': 'HA LONG ON LAND',
    'mekong-delta': 'RIVER LIFE SOUTH',
    dalat: 'CENTRAL HIGHLANDS',
};

const VIETNAM_FALLBACK_EXPERIENCES = [
    'Heritage & Culture',
    'Culinary Journeys',
    'Nature & Scenic',
    'Coastal Escapes',
];

const VIETNAM_REGIONS = ['Hanoi', 'Ha Long Bay', 'Hoi An', 'Ho Chi Minh City', 'Phu Quoc'];

function toCard(d) {
    return {
        name: d.name,
        slug: d.slug,
        tagline: d.short_description?.slice(0, 80) || 'Crafted around your curiosity',
        description: d.short_description || 'Atmospheric cities, dramatic coastlines, living traditions and unforgettable food.',
        image: d.hero_media?.url
            ? resolveMediaUrl(d.hero_media.url)
            : (VIETNAM_FALLBACK_IMAGES[d.slug] || DEFAULT_VIETNAM_IMAGE),
        imageAlt: d.hero_media?.alt_text || d.name,
        regions: d.regions?.length ? d.regions : VIETNAM_REGIONS,
        experiences: VIETNAM_FALLBACK_EXPERIENCES,
        meta: VIETNAM_FALLBACK_META[d.slug] || 'VIETNAM',
    };
}

const Destination = () => {
    const [destinations, setDestinations] = useState([]);
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        let cancelled = false;
        fetchDestinations({ pageSize: 100, sort: 'display_order' })
            .then((res) => {
                if (cancelled) return;
                const vietnam = filterVietnamDestinations(res?.items).map(toCard);
                setDestinations(vietnam);
                setStatus('success');
            })
            .catch(() => {
                if (!cancelled) setStatus('error');
            });
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
                    <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="eyebrow text-[var(--color-gold)]/80 mb-5">
                                Destinations
                            </p>
                            <h1 className="font-display text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.94] tracking-[-0.03em] text-white mb-6">
                                Vietnam.
                                <span className="block italic text-[var(--color-gold)]">One country. Many worlds.</span>
                            </h1>
                            <p className="font-body text-white/50 text-base sm:text-lg leading-relaxed max-w-xl">
                                From Ha Long Bay to the Mekong Delta — explore every Vietnam destination
                                we operate, each managed by local teams on the ground.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ── Geographic route strip ── */}
                {destinations.length > 0 && (
                    <nav aria-label="Destinations index" className="w-full bg-white border-b border-[var(--color-border-subtle)]">
                        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                            <ul className="flex flex-col sm:flex-row sm:items-stretch divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border-subtle)] overflow-x-auto">
                                {destinations.map((dest) => (
                                    <li key={dest.slug} className="flex-1 shrink-0">
                                        <a
                                            href={`#chapter-${dest.slug}`}
                                            className="group flex items-baseline gap-3 py-4 sm:justify-center sm:px-6"
                                        >
                                            <span className="font-display text-base sm:text-lg text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-300 whitespace-nowrap">
                                                {dest.name}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                )}

                {/* ── Vietnam destination chapters ── */}
                {status === 'loading' && (
                    <div className="min-h-[30vh] flex items-center justify-center bg-[var(--color-ivory)]" aria-busy="true">
                        <div className="text-[var(--color-navy)] text-sm font-semibold tracking-wider uppercase">Loading destinations…</div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="min-h-[30vh] flex items-center justify-center bg-[var(--color-ivory)] px-6">
                        <p className="text-[var(--color-text-secondary)] text-sm">Destinations could not be loaded.</p>
                    </div>
                )}

                {status === 'success' && destinations.length === 0 && (
                    <div className="min-h-[30vh] flex items-center justify-center bg-[var(--color-ivory)] px-6">
                        <p className="text-[var(--color-text-secondary)] text-sm">No Vietnam destinations available yet.</p>
                    </div>
                )}

                {destinations.map((dest, index) => {
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
                                        </div>
                                    </Rise>
                                </div>

                                {/* Text column */}
                                <Rise delay={0.1} className={`lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>
                                    <p className="eyebrow mb-5">
                                        {dest.meta}
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

                                    {dest.regions?.length > 0 && (
                                        <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-text-muted)] mb-3">
                                            {dest.regions.join('  ·  ')}
                                        </p>
                                    )}
                                    <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--color-gold)]/80 mb-8">
                                        {dest.meta}
                                    </p>

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

                {/* ── All Vietnam destinations — grid ── */}
                {destinations.length > 0 && (
                    <section className="w-full bg-[var(--color-ivory)] py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12">
                        <div className="max-w-[1400px] mx-auto">
                            <Rise className="mb-12 lg:mb-16">
                                <p className="eyebrow mb-3">All Destinations</p>
                                <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)]">
                                    {destinations.length} destinations across Vietnam.
                                </h2>
                            </Rise>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                                {destinations.map((dest, index) => (
                                    <motion.div
                                        key={dest.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <Link to={`/destination/${dest.slug}`} className="group block bg-white border border-[var(--color-border-subtle)] overflow-hidden transition-all duration-300 hover:border-[var(--color-gold)]/50 hover:shadow-lg h-full">
                                            <div className="relative aspect-[4/3] overflow-hidden">
                                                <img
                                                    src={dest.image}
                                                    alt={dest.imageAlt}
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                        </div>
                    </section>
                )}

                {/* ── B2B CTA ── */}
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
                        lg:py-32
                    "
                    style={{
                        backgroundImage: `url(${ctaImage})`,
                    }}
                >
                    <div
                        aria-hidden="true"
                        className="
                            absolute
                            inset-0
                            bg-[var(--color-navy)]/65
                        "
                    />
                    <div
                        aria-hidden="true"
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-r
                            from-[var(--color-navy)]/80
                            via-[var(--color-navy)]/55
                            to-[var(--color-navy)]/40
                        "
                    />
                    <div
                        className="
                            relative
                            z-10
                            mx-auto
                            grid
                            max-w-[1400px]
                            grid-cols-1
                            items-center
                            gap-10
                            lg:grid-cols-12
                            lg:gap-16
                        "
                    >
                        <Rise className="lg:col-span-7">
                            <p
                                className="
                                    eyebrow
                                    mb-4
                                    text-[var(--color-gold)]
                                "
                            >
                                Not Sure Which Destination?
                            </p>
                            <h2
                                className="
                                    mb-6
                                    max-w-4xl
                                    font-display
                                    text-[clamp(2rem,4.5vw,3.5rem)]
                                    leading-[0.95]
                                    tracking-[-0.02em]
                                    text-white
                                "
                            >
                                Tell us who is travelling.{' '}
                                <span className="italic text-[var(--color-gold)]">
                                    We'll recommend the route.
                                </span>
                            </h2>
                            <p
                                className="
                                    max-w-lg
                                    font-body
                                    text-base
                                    leading-relaxed
                                    text-white/75
                                "
                            >
                                Send your brief — dates, traveller mix, hotel tier —
                                and receive a tailored proposal from our destination
                                specialists.
                            </p>
                        </Rise>
                        <Rise
                            delay={0.1}
                            className="
                                lg:col-span-5
                                lg:justify-self-end
                            "
                        >
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-4
                                    sm:flex-row
                                    lg:flex-col
                                "
                            >
                                <Link
                                    to="/tours"
                                    className="
                                        btn
                                        btn--lg
                                        btn--outline-white
                                        backdrop-blur-sm
                                    "
                                >
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
