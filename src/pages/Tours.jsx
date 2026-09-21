import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { PAGE_META } from '../config/site';
import { itemListSchema } from '../config/structuredData';
import { fetchTours, resolveMediaUrl } from '../services/api/cms';
import { PageTransition } from '../components/editorial';

const maharashtraImg = '/images/home/India-heritage.webp';
const halongImg = '/images/home/Vietnam-ha-long-bay.webp';
const osakaImg = '/images/home/Japan-osaka.webp';
const koreaImg = '/images/home/Korea-Seoul.webp';
const keralaImg = '/images/home/india-kerala.webp';
const hoianImg = '/images/home/Vietnam-hoi-an.webp';
const kyotoImg = '/images/home/Japan-kyota.webp';
const danangImg = '/images/home/Vietnam-ha-long-bay.webp';
const heroImage = '/images/home/Vietnam-ha-long-bay.webp';

const FALLBACK_TOURS = [
    {
        title: 'Golden Triangle & Rajasthan Heritage',
        slug: 'golden-triangle-rajasthan',
        summary: 'A 10-day journey through Delhi, Agra, Jaipur and the palaces of Rajasthan — where every day brings a new colour.',
        duration: '10 Days / 9 Nights',
        destination_name: 'India',
        image: maharashtraImg,
        imageAlt: 'Heritage architecture in Maharashtra, India',
        category: 'Culture & Heritage',
    },
    {
        title: 'Ha Long Bay & Hoi An Lantern Walk',
        slug: 'ha-long-bay-hoi-an',
        summary: 'Cruise emerald waters and wander lantern-lit streets — Vietnam at its most poetic.',
        duration: '8 Days / 7 Nights',
        destination_name: 'Vietnam',
        image: halongImg,
        imageAlt: 'Ha Long Bay limestone karsts, Vietnam',
        category: 'Nature & Scenic',
    },
    {
        title: 'Kyoto Temples & Osaka Food Trail',
        slug: 'kyoto-osaka-food',
        summary: 'Ancient temples, tea ceremonies, and the best street food in Japan — a journey for the senses.',
        duration: '9 Days / 8 Nights',
        destination_name: 'Japan',
        image: osakaImg,
        imageAlt: 'Osaka street scene, Japan',
        category: 'Food & Local Life',
    },
    {
        title: 'Seoul to Busan: Korean Discovery',
        slug: 'seoul-busan-korean',
        summary: 'From K-culture hotspots to coastal temples — the pulse of South Korea, curated.',
        duration: '7 Days / 6 Nights',
        destination_name: 'South Korea',
        image: koreaImg,
        imageAlt: 'Traditional Korean palace architecture',
        category: 'Culture & Heritage',
    },
    {
        title: 'Kerala Backwaters & Spice Hills',
        slug: 'kerala-backwaters',
        summary: 'Houseboat nights, spice plantations, and the tranquil green of Kerala.',
        duration: '8 Days / 7 Nights',
        destination_name: 'India',
        image: keralaImg,
        imageAlt: 'Kerala backwaters at golden hour, India',
        category: 'Nature & Scenic',
    },
    {
        title: 'Sapa Trekking & Homestay',
        slug: 'sapa-trekking',
        summary: 'Trek through terraced rice fields and stay with local families in northern Vietnam.',
        duration: '6 Days / 5 Nights',
        destination_name: 'Vietnam',
        image: hoianImg,
        imageAlt: 'Lantern-lit streets of Hoi An, Vietnam',
        category: 'Nature & Scenic',
    },
    {
        title: 'Japan Rail & Ryokan',
        slug: 'japan-rail-ryokan',
        summary: 'Bullet trains, mountain ryokans, and the art of slow travel through Japan.',
        duration: '11 Days / 10 Nights',
        destination_name: 'Japan',
        image: kyotoImg,
        imageAlt: 'Kyoto temple rooftops, Japan',
        category: 'Culture & Heritage',
    },
    {
        title: 'Jeju Island & Gyeongju Heritage',
        slug: 'jeju-gyeongju',
        summary: 'Volcanic landscapes and ancient tombs — the quieter side of South Korea.',
        duration: '6 Days / 5 Nights',
        destination_name: 'South Korea',
        image: danangImg,
        imageAlt: 'Coastal Vietnam scenery',
        category: 'Heritage & Culture',
    },
];

const CATEGORIES = [
    { label: 'All', value: 'all' },
    { label: 'India', value: 'india' },
    { label: 'Vietnam', value: 'vietnam' },
    { label: 'Japan', value: 'japan' },
    { label: 'South Korea', value: 'south-korea' },
];

const Tours = () => {
    const [tours, setTours] = useState(FALLBACK_TOURS);
    const [activeFilter, setActiveFilter] = useState('all');
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        let cancelled = false;
        fetchTours({ pageSize: 100 })
            .then((data) => {
                if (cancelled) return;
                const items = data?.items || [];
                if (items.length >= 3) {
                    setTours(
                        items.map((t) => ({
                            title: t.title,
                            slug: t.slug,
                            summary: t.summary || '',
                            duration: t.duration || '',
                            destination_name: t.destination_name || '',
                            image: t.hero_media?.url
                                ? resolveMediaUrl(t.hero_media.url)
                                : (FALLBACK_TOURS.find((f) => f.slug === t.slug)?.image || FALLBACK_TOURS[0].image),
                            imageAlt: t.hero_media?.alt_text || t.title,
                            category: t.category || '',
                        }))
                    );
                }
            })
            .catch(() => {});
        return () => { cancelled = true; };
    }, []);

    const filteredTours =
        activeFilter === 'all'
            ? tours
            : tours.filter((t) => {
                const destSlug = t.destination_name?.toLowerCase().replace(/\s+/g, '-');
                return destSlug === activeFilter;
            });

    return (
        <PageTransition>
            <div className="w-full flex flex-col">
                <Seo {...PAGE_META['/tours']} path="/tours" />
                <JsonLd data={[itemListSchema(tours)]} />

                {/* ── Arrival ── */}
                <section className="relative w-full h-[50vh] md:h-[65vh] lg:min-h-screen flex items-center overflow-hidden">
                    <img
                        src={heroImage}
                        alt="Ha Long Bay limestone karsts, Vietnam"
                        className="absolute inset-0 w-full h-full object-cover"
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/85 via-[var(--color-navy)]/25 to-transparent" />
                    <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
                        <motion.div
                            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="eyebrow text-[var(--color-gold)]/80 mb-4">
                                Curated Journeys — 01 to 08
                            </p>
                            <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.92] tracking-[-0.03em] text-white mb-4">
                                Start with a story.
                            </h1>
                            <p className="text-white/50 text-base sm:text-lg max-w-xl leading-relaxed font-body">
                                Sample itineraries across India, Vietnam, Japan and South Korea.
                                Every journey is customisable — tell us what you need.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ── Filters + Journey index ── */}
                <section className="py-20 sm:py-28 lg:py-36 bg-[var(--color-ivory)]">
                    <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                        {/* Destination filter — editorial tabs */}
                        <motion.div
                            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-wrap gap-x-8 gap-y-3 mb-12 lg:mb-16 border-b border-[var(--color-border-subtle)]"
                            role="group"
                            aria-label="Filter journeys by destination"
                        >
                            {CATEGORIES.map((cat) => {
                                const isActive = activeFilter === cat.value;
                                return (
                                    <button
                                        key={cat.value}
                                        onClick={() => setActiveFilter(cat.value)}
                                        aria-pressed={isActive}
                                        className={`relative pb-4 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:-outline-offset-4 ${isActive ? 'text-[var(--color-navy)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-navy)]'}`}
                                    >
                                        {cat.label}
                                        <span
                                            aria-hidden="true"
                                            className={`absolute left-0 bottom-0 h-px w-full bg-[var(--color-gold)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
                                        />
                                    </button>
                                );
                            })}
                        </motion.div>

                        {/* Journeys grid — numbered editorial cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 lg:gap-x-8">
                            {filteredTours.map((tour, index) => (
                                <motion.div
                                    key={tour.slug}
                                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.06,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    <Link to={`/tours/${tour.slug}`} className="group block">
                                        <div className="relative aspect-[3/4] overflow-hidden mb-5">
                                            <img
                                                src={tour.image}
                                                alt={tour.imageAlt || tour.title}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <span
                                                aria-hidden="true"
                                                className="absolute bottom-3 right-3 font-display italic text-3xl text-white/90 drop-shadow-[0_1px_10px_rgba(8,22,52,0.5)]"
                                            >
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                        {tour.category && (
                                            <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-bronze)]/70 font-medium mb-1.5 block">
                                                {tour.category}
                                            </span>
                                        )}
                                        <h3 className="font-display text-lg sm:text-xl text-[var(--color-navy)] leading-tight mb-1.5 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                                            {tour.title}
                                        </h3>
                                        <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
                                            {tour.destination_name && <span>{tour.destination_name}</span>}
                                            {tour.duration && (
                                                <>
                                                    <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]/60" aria-hidden="true" />
                                                    <span>{tour.duration}</span>
                                                </>
                                            )}
                                        </div>
                                        {tour.summary && (
                                            <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed mt-2.5 line-clamp-2 font-body">
                                                {tour.summary}
                                            </p>
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Empty state — filter with no matches */}
                        {filteredTours.length === 0 && (
                            <p className="text-center text-[var(--color-text-secondary)] py-16 font-body">
                                No journeys listed for this destination yet — ask us; we operate there.
                            </p>
                        )}

                        {/* CTA — navy band */}
                        <motion.div
                            initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-20 sm:mt-24 bg-[var(--color-navy)] px-8 sm:px-12 py-14 sm:py-16 text-center"
                        >
                            <p className="eyebrow text-[var(--color-gold)]/70 mb-4 justify-center">Bespoke Journeys</p>
                            <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.0] tracking-[-0.02em] text-white mb-4">
                                Looking for something specific? We design it from scratch.
                            </h2>
                            <p className="text-white/40 text-sm mb-8 max-w-md mx-auto leading-relaxed font-body">
                                Send your brief and receive a tailored proposal within one business day.
                            </p>
                            <Link to="/request-quote" className="btn btn--md btn--gold">
                                Request a Custom Journey
                                <span aria-hidden="true">→</span>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Tours;
