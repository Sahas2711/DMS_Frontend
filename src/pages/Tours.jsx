import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';
import { fetchTours } from '../services/api/cms';
import { errorMessage } from '../services/api/client';
import { TRIP_TYPE_BY_VALUE } from '../config/enquiry';
import MediaImage from '../components/cms/MediaImage';
import toursHeroImg from '../assets/home/Tourspage-hero section.webp';

const CATEGORIES = [
    { value: '', label: 'All journeys' },
    { value: 'FIT', label: 'FIT' },
    { value: 'GROUP', label: 'Groups' },
    { value: 'MICE', label: 'MICE' },
    { value: 'HONEYMOON', label: 'Honeymoon' },
    { value: 'LUXURY', label: 'Luxury' },
];

const VALID_CATEGORIES = CATEGORIES.slice(1).map((c) => c.value);

function durationLabel(tour) {
    const days = tour?.duration_days;
    if (!days) return 'Flexible duration';
    const nights = tour?.duration_nights;
    return nights ? `${days} days / ${nights} nights` : `${days} days`;
}

const TourCard = ({ tour }) => {
    const destination = tour.destination;
    const image = tour.hero_media?.url;
    return (
        <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100/90 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <MediaImage
                src={image}
                alt={tour.hero_media?.alt_text || tour.title}
                fallbackChar={tour.title?.charAt(0)}
                className="w-full h-52 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow text-left">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-champagne text-bronze px-2.5 py-1 rounded-full">
                        {TRIP_TYPE_BY_VALUE[tour.category] || tour.category}
                    </span>
                    {destination && (
                        <span className="text-[10px] font-semibold tracking-wide text-gray-500">
                            {destination.country} · {destination.name}
                        </span>
                    )}
                </div>
                <h3 className="text-navy font-serif text-lg font-bold mb-2 leading-snug">
                    {tour.title}
                </h3>
                {tour.summary && (
                    <p className="text-steel text-sm leading-relaxed mb-4 flex-grow">{tour.summary}</p>
                )}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500 font-medium">{durationLabel(tour)}</span>
                    <Link
                        to={`/request-quote?trip_type=${tour.category}`}
                        className="text-bronze hover:text-navy text-xs font-bold transition-colors"
                    >
                        Request a quote →
                    </Link>
                </div>
            </div>
        </article>
    );
};

const EMPTY_RESULT = { key: null, status: 'loading', items: [], error: null };

const TourCatalog = ({ category }) => {
    const [result, setResult] = useState(EMPTY_RESULT);
    const [attempt, setAttempt] = useState(0);
    // Current request key — while a new fetch is in flight the previous result
    // no longer matches, so the UI shows the loading state again.
    const key = `${category || 'all'}#${attempt}`;

    useEffect(() => {
        const controller = new AbortController();

        fetchTours({ category: category || undefined, pageSize: 100, sort: 'display_order' })
            .then((data) => {
                if (!controller.signal.aborted) {
                    setResult({ key, status: 'success', items: data.items ?? [], error: null });
                }
            })
            .catch((error) => {
                if (!controller.signal.aborted) {
                    setResult({
                        key,
                        status: 'error',
                        items: [],
                        error: errorMessage(error, 'We could not load the journeys right now.'),
                    });
                }
            });

        return () => controller.abort();
    }, [key, category, attempt]);

    const state = result.key === key ? result : EMPTY_RESULT;

    if (state.status === 'loading') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-2xl bg-white border border-gray-100 p-0 overflow-hidden animate-pulse">
                        <div className="w-full h-52 bg-gray-200" />
                        <div className="p-6 space-y-3">
                            <div className="h-3 w-24 bg-gray-200 rounded" />
                            <div className="h-5 w-3/4 bg-gray-200 rounded" />
                            <div className="h-3 w-full bg-gray-100 rounded" />
                            <div className="h-3 w-2/3 bg-gray-100 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (state.status === 'error') {
        return (
            <div className="w-full bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                <p className="text-red-800 text-sm font-semibold mb-2">Could not load journeys</p>
                <p className="text-red-700/80 text-xs mb-5 max-w-md mx-auto leading-relaxed">{state.error}</p>
                <button
                    type="button"
                    onClick={() => setAttempt((n) => n + 1)}
                    className="bg-[#731E2A] hover:bg-[#5C1822] text-white font-bold text-xs tracking-wider uppercase py-2.5 px-6 rounded-full transition-colors"
                >
                    Try again
                </button>
            </div>
        );
    }

    if (state.items.length === 0) {
        return (
            <div className="w-full bg-cream border border-gray-100 rounded-2xl p-10 text-center">
                <h3 className="text-navy text-xl font-serif font-semibold mb-2">No journeys published yet</h3>
                <p className="text-steel text-sm leading-relaxed max-w-md mx-auto mb-5">
                    We are adding new journeys to this collection. Meanwhile, tell us what your
                    clients need and we will design it for you.
                </p>
                <Link
                    to={`/request-quote${category ? `?trip_type=${category}` : ''}`}
                    className="inline-block bg-[#731E2A] hover:bg-[#5C1822] text-white font-bold text-xs tracking-wider uppercase py-3 px-8 rounded-full transition-colors"
                >
                    Request a custom journey
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.items.map((tour) => (
                <TourCard key={tour.public_id || tour.slug} tour={tour} />
            ))}
        </div>
    );
};

const Tours = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const rawCategory = (searchParams.get('category') || '').toUpperCase();
    const category = VALID_CATEGORIES.includes(rawCategory) ? rawCategory : '';

    const selectCategory = useCallback(
        (value) => {
            if (value) setSearchParams({ category: value }, { replace: true });
            else setSearchParams({}, { replace: true });
        },
        [setSearchParams]
    );

    return (
        <div className="w-full flex flex-col">
            <Seo {...PAGE_META['/tours']} path="/tours" />

            {/* Hero Section */}
            <section className="relative w-full h-[55vh] md:h-[65vh] lg:min-h-[520px] flex items-center justify-center overflow-hidden">
                <img
                    src={toursHeroImg}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    fetchPriority="high"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-navy/35 z-0" aria-hidden="true" />
                <div className="relative z-10 flex flex-col items-center text-center px-6">
                    <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif tracking-wide mb-4">
                        Journeys &amp; Experiences
                    </h1>
                    <div className="w-24 md:w-40 h-px bg-gold mb-6" aria-hidden="true" />
                    <p className="text-gray-100 text-sm md:text-base max-w-2xl leading-relaxed">
                        Sample journeys our DMC designs across Vietnam, Japan and Australia. Every
                        journey shown can be tailored — or built from scratch around your brief.
                    </p>
                </div>
            </section>

            {/* Catalog */}
            <section className="w-full bg-white py-14 md:py-20 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="w-full max-w-7xl flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <h2 className="text-navy text-2xl md:text-3xl font-serif font-normal">
                            {category ? TRIP_TYPE_BY_VALUE[category] : 'All journeys'}
                        </h2>
                        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter journeys by experience type">
                            {CATEGORIES.map((cat) => {
                                const active = (cat.value || '') === category;
                                return (
                                    <button
                                        key={cat.value || 'all'}
                                        type="button"
                                        role="tab"
                                        aria-selected={active}
                                        onClick={() => selectCategory(cat.value)}
                                        className={`text-xs font-semibold px-4 py-2 rounded-full border transition-colors cursor-pointer ${
                                            active
                                                ? 'bg-navy text-white border-navy'
                                                : 'bg-white text-navy border-gray-200 hover:border-bronze hover:text-bronze'
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <motion.div
                        key={category || 'all'}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <TourCatalog category={category} />
                    </motion.div>

                    <p className="text-center text-steel text-xs md:text-sm mt-12 max-w-xl mx-auto leading-relaxed">
                        Looking for a specific journey, dates or hotel tier?{' '}
                        <Link to="/request-quote" className="text-navy underline hover:text-bronze font-semibold">
                            Request a quote
                        </Link>{' '}
                        and our specialists will tailor it around your brief.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Tours;
