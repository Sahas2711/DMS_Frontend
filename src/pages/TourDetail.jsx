import { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { SITE } from '../config/site';
import { breadcrumbListSchema, touristTripSchema } from '../config/structuredData';
import { fetchTourBySlug, fetchTours, resolveMediaUrl } from '../services/api/cms';
import { errorMessage } from '../services/api/client';
import { TRIP_TYPE_BY_VALUE } from '../config/enquiry';
import { PageTransition } from '../components/editorial';

// Bundled fallback imagery — no external hotlinks (project image policy).
const halongFallback = '/images/home/Vietnam-ha-long-bay.webp';

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

function TourDetail() {
    const { slug } = useParams();
    const [state, setState] = useState({ status: 'loading', tour: null, error: null });
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const controller = new AbortController();

        fetchTourBySlug(slug)
            .then((tour) => {
                if (!controller.signal.aborted) setState({ status: 'success', tour, error: null });
            })
            .catch((error) => {
                if (!controller.signal.aborted) {
                    setState({ status: 'error', tour: null, error: errorMessage(error, 'This journey could not be loaded.') });
                }
            });

        return () => controller.abort();
    }, [slug]);

    if (state.status === 'loading') {
        return (
            <div className="min-h-[60vh] flex items-center justify-center" aria-busy="true">
                <div className="text-[var(--color-navy)] text-sm font-semibold tracking-wider uppercase">Loading journey…</div>
            </div>
        );
    }

    if (state.status === 'error') {
        return (
            <PageTransition>
                <div className="min-h-[60vh] bg-[var(--color-cream)] flex items-center justify-center px-6">
                    <div className="bg-white p-8 max-w-md text-center">
                        <Seo title="Journey not found" noIndex path={`/tours/${slug}`} />
                        <h1 className="text-[var(--color-navy)] font-display text-2xl mb-2">Journey not available</h1>
                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-5 font-body">{state.error}</p>
                        <Link to="/tours" className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-navy)] text-white text-sm font-medium tracking-wide hover:bg-[var(--color-navy)]/90 transition-all duration-300">
                            Browse all journeys
                        </Link>
                    </div>
                </div>
            </PageTransition>
        );
    }

    const tour = state.tour;
    const seo = tour.seo_metadata || noSeo;
    const heroImage = tour.hero_media?.url ? resolveMediaUrl(tour.hero_media.url) : halongFallback;
    const description = seo.meta_description || tour.summary || SITE.description;
    const canonical = seo.canonical_url || `/tours/${tour.slug}`;
    const metaTitle = seo.meta_title || `${tour.title} — ${SITE.name}`;
    const days = tour.duration_days;
    const nights = tour.duration_nights;

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
                            { name: 'Curated Journeys', url: '/tours' },
                            { name: tour.title, url: canonical },
                        ]),
                        touristTripSchema({ tour, seo, canonical }),
                    ]}
                />

                {/* Cinematic hero */}
                <section className="relative w-full h-[50vh] md:h-[65vh] lg:min-h-screen flex items-center overflow-hidden">
                    <img
                        src={heroImage}
                        alt={tour.hero_media?.alt_text || tour.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081634]/80 via-[#081634]/20 to-transparent" />

                    <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
                        <motion.div
                            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link
                                to="/tours"
                                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors duration-300 mb-6"
                            >
                                &larr; All Journeys
                            </Link>

                            {tour.category && (
                                <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-[#c5a869]/80 font-medium mb-3">
                                    {TRIP_TYPE_BY_VALUE[tour.category] || tour.category}
                                </span>
                            )}

                            <h1 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.92] tracking-[-0.03em] text-white mb-4">
                                {tour.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm font-body">
                                {days && (
                                    <span>
                                        {nights ? `${days} days / ${nights} nights` : `${days} days`}
                                    </span>
                                )}
                                {tour.destination && (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-white/30" />
                                        <Link
                                            to={`/destination/${tour.destination.slug}`}
                                            className="hover:text-white underline underline-offset-2 transition-colors duration-300"
                                        >
                                            {tour.destination.name}
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Body */}
                <section className="py-20 sm:py-28 lg:py-36 bg-white">
                    <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                            {/* Main content */}
                            <div className="lg:col-span-8">
                                {/* Summary */}
                                {tour.summary && (
                                    <motion.p
                                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="text-[var(--color-navy)] text-lg sm:text-xl font-display leading-relaxed mb-12"
                                    >
                                        {tour.summary}
                                    </motion.p>
                                )}

                                {/* Highlights */}
                                {tour.highlights && tour.highlights.length > 0 && (
                                    <motion.div
                                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="mb-12"
                                    >
                                        <h2 className="font-display text-xl sm:text-2xl text-[var(--color-navy)] mb-6">
                                            Highlights
                                        </h2>
                                        <ul className="space-y-3">
                                            {tour.highlights.map((h, i) => (
                                                <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)] font-body">
                                                    <span className="mt-1 w-5 h-5 rounded-full bg-[var(--color-cream)] flex items-center justify-center shrink-0">
                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2">
                                                            <path d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </span>
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}

                                {/* Route overview */}
                                {tour.route_stops && tour.route_stops.length > 0 && (
                                    <motion.div
                                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="mb-12"
                                    >
                                        <h2 className="font-display text-xl sm:text-2xl text-[var(--color-navy)] mb-6">
                                            Route Overview
                                        </h2>
                                        <div className="flex flex-wrap items-center gap-2">
                                            {tour.route_stops.map((stop, i) => (
                                                <span key={i} className="flex items-center gap-2">
                                                    <span className="bg-[var(--color-cream)] text-[var(--color-navy)] px-4 py-2 text-sm font-body font-medium">
                                                        {stop}
                                                    </span>
                                                    {i < tour.route_stops.length - 1 && (
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" aria-hidden="true">
                                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                                        </svg>
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Day-by-day itinerary */}
                                {tour.itinerary && tour.itinerary.length > 0 && (
                                    <motion.div
                                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="mb-12"
                                    >
                                        <h2 className="font-display text-xl sm:text-2xl text-[var(--color-navy)] mb-6">
                                            Day-by-Day Itinerary
                                        </h2>
                                        <div className="space-y-4">
                                            {tour.itinerary.map((day, i) => (
                                                <div key={i} className="border border-[var(--color-border-subtle)] p-5 sm:p-6">
                                                    <div className="flex items-baseline gap-3 mb-3">
                                                        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)]">
                                                            Day {i + 1}
                                                        </span>
                                                        {day.title && (
                                                            <h3 className="font-display text-lg text-[var(--color-navy)]">
                                                                {day.title}
                                                            </h3>
                                                        )}
                                                    </div>
                                                    <p className="text-[var(--color-text-secondary)] leading-[1.8] font-body text-sm">
                                                        {day.description || day}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Description */}
                                {tour.description && (
                                    <motion.div
                                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="mb-12"
                                    >
                                        <h2 className="font-display text-xl sm:text-2xl text-[var(--color-navy)] mb-6">
                                            About This Journey
                                        </h2>
                                        {tour.description.split('\n\n').map((para, i) => (
                                            <p key={i} className="text-[var(--color-text-secondary)] leading-[1.8] mb-5 font-body">
                                                {para}
                                            </p>
                                        ))}
                                    </motion.div>
                                )}

                                {/* Inclusions / Exclusions */}
                                <motion.div
                                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-8"
                                >
                                    {tour.inclusions && tour.inclusions.length > 0 && (
                                        <div>
                                            <h3 className="font-display text-lg text-[var(--color-navy)] mb-4">What's Included</h3>
                                            <ul className="space-y-2">
                                                {tour.inclusions.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)] font-body">
                                                        <svg className="mt-0.5 shrink-0 text-green-600" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {tour.exclusions && tour.exclusions.length > 0 && (
                                        <div>
                                            <h3 className="font-display text-lg text-[var(--color-navy)] mb-4">What's Not Included</h3>
                                            <ul className="space-y-2">
                                                {tour.exclusions.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)] font-body">
                                                        <svg className="mt-0.5 shrink-0 text-red-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M18 6L6 18M6 6l12 12" />
                                                        </svg>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </motion.div>

                                {/* CTA */}
                                <motion.div
                                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="bg-[var(--color-navy)] p-8 sm:p-10 text-center"
                                >
                                    <h2 className="font-display text-xl sm:text-2xl text-white mb-3">
                                        Plan this journey for your clients
                                    </h2>
                                    <p className="text-white/40 text-sm mb-6 max-w-lg mx-auto leading-relaxed font-body">
                                        This sample can be tailored around dates, hotel tiers and travel style.
                                        Send us your brief and our specialists will design the itinerary.
                                    </p>
                                    <Link
                                        to={`/request-quote?trip_type=${tour.category}`}
                                        className="btn btn--md btn--gold"
                                    >
                                        Request a Quote
                                        <span aria-hidden="true">→</span>
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Sidebar — Quick Facts */}
                            <div className="lg:col-span-4">
                                <div className="lg:sticky lg:top-24">
                                    <motion.div
                                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="bg-[var(--color-cream)] p-6 sm:p-8 border border-[var(--color-border-subtle)]"
                                    >
                                        <h3 className="font-display text-lg text-[var(--color-navy)] mb-5">Quick Facts</h3>
                                        <dl className="space-y-4">
                                            {days && (
                                                <div className="flex justify-between border-b border-[var(--color-border-subtle)] pb-3">
                                                    <dt className="text-sm text-[var(--color-text-muted)] font-body">Duration</dt>
                                                    <dd className="text-sm font-semibold text-[var(--color-navy)] font-body">
                                                        {nights ? `${days} days / ${nights} nights` : `${days} days`}
                                                    </dd>
                                                </div>
                                            )}
                                            {tour.destination && (
                                                <div className="flex justify-between border-b border-[var(--color-border-subtle)] pb-3">
                                                    <dt className="text-sm text-[var(--color-text-muted)] font-body">Destination</dt>
                                                    <dd className="text-sm font-semibold text-[var(--color-navy)] font-body">{tour.destination.name}</dd>
                                                </div>
                                            )}
                                            {tour.group_size && (
                                                <div className="flex justify-between border-b border-[var(--color-border-subtle)] pb-3">
                                                    <dt className="text-sm text-[var(--color-text-muted)] font-body">Group Size</dt>
                                                    <dd className="text-sm font-semibold text-[var(--color-navy)] font-body">{tour.group_size}</dd>
                                                </div>
                                            )}
                                            {tour.accommodation && (
                                                <div className="flex justify-between border-b border-[var(--color-border-subtle)] pb-3">
                                                    <dt className="text-sm text-[var(--color-text-muted)] font-body">Accommodation</dt>
                                                    <dd className="text-sm font-semibold text-[var(--color-navy)] font-body">{tour.accommodation}</dd>
                                                </div>
                                            )}
                                            {tour.meals && (
                                                <div className="flex justify-between border-b border-[var(--color-border-subtle)] pb-3">
                                                    <dt className="text-sm text-[var(--color-text-muted)] font-body">Meals</dt>
                                                    <dd className="text-sm font-semibold text-[var(--color-navy)] font-body">{tour.meals}</dd>
                                                </div>
                                            )}
                                            {tour.category && (
                                                <div className="flex justify-between pb-3">
                                                    <dt className="text-sm text-[var(--color-text-muted)] font-body">Trip Type</dt>
                                                    <dd className="text-sm font-semibold text-[var(--color-navy)] font-body">
                                                        {TRIP_TYPE_BY_VALUE[tour.category] || tour.category}
                                                    </dd>
                                                </div>
                                            )}
                                        </dl>
                                        <Link
                                            to={`/request-quote?trip_type=${tour.category}`}
                                            className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gold px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-deep transition-colors duration-300 hover:bg-gold-light"
                                        >
                                            Request a Quote
                                            <span aria-hidden="true">→</span>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}

export default TourDetail;
