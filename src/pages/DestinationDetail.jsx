import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { SITE } from '../config/site';
import {
    breadcrumbListSchema,
    touristDestinationSchema,
} from '../config/structuredData';
import { fetchDestinationBySlug, fetchTours, resolveMediaUrl } from '../services/api/cms';
import { errorMessage } from '../services/api/client';
import { PageTransition, Rise } from '../components/editorial';
import { getTourFallbackImageFromTour } from '../config/tourImages';

// Bundled destination imagery — no external hotlinks (project image policy).
const indiaFallback = '/images/home/india-Delhi.webp';
const vietnamFallback = '/images/home/Vietnam-Hanoi.webp';
const japanFallback = '/images/home/Japan-kyota.webp';
const koreaFallback = '/images/home/Korea-Seoul.webp';

const noSeo = {
    meta_title: '',
    meta_description: '',
    canonical_url: '',
    robots: '',
    og_title: '',
    og_description: '',
    og_image_url: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image_url: '',
};

const FALLBACK_IMAGES = {
    delhi: indiaFallback,
    'ha-long-bay': vietnamFallback,
    tokyo: japanFallback,
    seoul: koreaFallback,
};

/** Verified regions per destination (homepage destination content). */
const FALLBACK_REGIONS = {
    'delhi': ['Rajasthan', 'Kerala', 'Ladakh', 'Goa', 'Varanasi'],
    'ha-long-bay': ['Hanoi', 'Ha Long Bay', 'Hoi An', 'Ho Chi Minh City', 'Phu Quoc'],
    'tokyo': ['Tokyo', 'Kyoto', 'Osaka', 'Hokkaido', 'Okinawa'],
    'seoul': ['Seoul', 'Busan', 'Jeju Island', 'Gyeongju', 'Incheon'],
};

function DestinationDetail() {
    const { slug } = useParams();
    const [state, setState] = useState({ status: 'loading', destination: null, error: null });
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        fetchDestinationBySlug(slug)
            .then((destination) => {
                if (controller.signal.aborted) return;
                setState({ status: 'success', destination, error: null });
                return fetchTours({ destination: destination.slug, pageSize: 100, sort: 'display_order' })
                    .then((data) => {
                        if (!controller.signal.aborted) setTours(data.items || []);
                    })
                    .catch(() => {});
            })
            .catch((error) => {
                if (!controller.signal.aborted) {
                    setState({ status: 'error', destination: null, error: errorMessage(error, 'This destination could not be loaded.') });
                }
            });

        return () => controller.abort();
    }, [slug]);

    if (state.status === 'loading') {
        return (
            <div className="min-h-[60vh] flex items-center justify-center" aria-busy="true">
                <div className="text-[var(--color-navy)] text-sm font-semibold tracking-wider uppercase">Loading destination…</div>
            </div>
        );
    }

    if (state.status === 'error') {
        return (
            <PageTransition>
                <div className="min-h-[60vh] bg-[var(--color-cream)] flex items-center justify-center px-6">
                    <div className="bg-white p-8 max-w-md text-center">
                        <Seo title="Destination not found" noIndex path={`/destination/${slug}`} />
                        <h1 className="text-[var(--color-navy)] font-display text-2xl mb-2">Destination not available</h1>
                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-5 font-body">{state.error}</p>
                        <Link to="/destination" className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-navy)] text-white text-sm font-medium tracking-wide hover:bg-[var(--color-navy)]/90 transition-all duration-300">
                            Browse destinations
                        </Link>
                    </div>
                </div>
            </PageTransition>
        );
    }

    const dest = state.destination;
    const seo = dest.seo_metadata || noSeo;
    const heroImage = dest.hero_media?.url ? resolveMediaUrl(dest.hero_media.url) : FALLBACK_IMAGES[dest.slug];
    const description = seo.meta_description || dest.short_description || SITE.description;
    const canonical = seo.canonical_url || `/destination/${dest.slug}`;
    const regions = dest.regions?.length ? dest.regions : (FALLBACK_REGIONS[dest.slug] || []);
    const metaTitle = seo.meta_title || `${dest.name} — ${SITE.name}`;

    return (
        <PageTransition>
            <div className="w-full flex flex-col">
                <Seo
                    title={metaTitle}
                    description={description}
                    path={canonical}
                    image={seo.og_image_url || heroImage}
                    noIndex={Boolean(seo.robots && seo.robots.toLowerCase().includes('noindex'))}
                    robots={seo.robots || undefined}
                    ogTitle={seo.og_title || undefined}
                    ogDescription={seo.og_description || undefined}
                    twitterTitle={seo.twitter_title || undefined}
                    twitterDescription={seo.twitter_description || undefined}
                    twitterImage={seo.twitter_image_url || undefined}
                />
                <JsonLd
                    data={[
                        breadcrumbListSchema([
                            { name: 'Home', url: '/' },
                            { name: 'Destinations', url: '/destination' },
                            { name: dest.name, url: canonical },
                        ]),
                        touristDestinationSchema({ destination: dest, seo }),
                    ]}
                />

                {/* Cinematic hero */}
                <section className="relative w-full h-[50vh] md:h-[65vh] lg:min-h-screen flex items-end overflow-hidden">
                    <img
                        src={heroImage}
                        alt={dest.hero_media?.alt_text || dest.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/80 via-[var(--color-navy-deep)]/20 to-transparent" />

                    <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link
                                to="/destination"
                                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors duration-300 mb-6"
                            >
                                &larr; All Destinations
                            </Link>
                            <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.92] tracking-[-0.03em] text-white mb-4">
                                {dest.name}
                            </h1>
                            {dest.short_description && (
                                <p className="text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed font-body">
                                    {dest.short_description}
                                </p>
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* Body */}
                <section className="py-20 sm:py-28 lg:py-36 bg-white">
                    <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                        <div className="max-w-4xl mx-auto">
                            {dest.description && (
                                <Rise className="mb-16">
                                    {dest.description.split('\n\n').map((para, i) => (
                                        <p key={i} className="text-[var(--color-text-secondary)] leading-[1.8] mb-5 font-body text-base sm:text-lg">
                                            {para}
                                        </p>
                                    ))}
                                </Rise>
                            )}

                            {/* Regions — geographic waypoint index (verified fallback data) */}
                            {regions.length > 0 && (
                                <Rise className="mb-16">
                                    <p className="eyebrow mb-4">Regions We Operate</p>
                                    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[var(--color-border-subtle)] border border-[var(--color-border-subtle)]">
                                        {regions.map((region) => (
                                            <li key={region} className="bg-white px-4 py-5 text-center">
                                                <span className="font-display text-sm sm:text-base text-[var(--color-navy)]">{region}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Rise>
                            )}

                            {/* Sample journeys */}
                            {tours.length > 0 && (
                                <Rise>
                                    <p className="text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase text-[var(--color-text-muted)] mb-4">
                                        Sample Journeys
                                    </p>
                                    <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.0] tracking-[-0.02em] text-[var(--color-navy)] mb-8">
                                        Curated for {dest.name}
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                                        {tours.map((tour) => (
                                            <Link
                                                key={tour.public_id || tour.slug}
                                                to={`/tours/${tour.slug}`}
                                                className="group block"
                                            >
                                                <div className="aspect-[4/3] overflow-hidden mb-4">
                                                    {tour.hero_media?.url ? (
                                                        <img
                                                            src={resolveMediaUrl(tour.hero_media.url)}
                                                            alt={tour.hero_media.alt_text || tour.title}
                                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={getTourFallbackImageFromTour(tour)}
                                                            alt={tour.title}
                                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                            loading="lazy"
                                                        />
                                                    )}
                                                </div>
                                                <h3 className="font-display text-lg sm:text-xl text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-300">
                                                    {tour.title}
                                                </h3>
                                                {tour.summary && (
                                                    <p className="text-[var(--color-text-secondary)] text-sm mt-1 line-clamp-2 font-body">
                                                        {tour.summary}
                                                    </p>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                </Rise>
                            )}

                            {/* CTA */}
                            <Rise className="mt-16 bg-[var(--color-navy)] p-8 sm:p-10 text-center">
                                <h2 className="font-display text-xl sm:text-2xl text-white mb-3">
                                    Design a journey to {dest.name}
                                </h2>
                                <p className="text-white/40 text-sm mb-6 max-w-lg mx-auto leading-relaxed font-body">
                                    Tell us the dates, hotel tier and group size — we'll tailor every detail.
                                </p>
                                <Link
                                    to={`/request-quote?destination=${dest.slug}`}
                                    className="btn btn--md btn--gold"
                                >
                                    Request a Quote
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </Link>
                            </Rise>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}

export default DestinationDetail;
