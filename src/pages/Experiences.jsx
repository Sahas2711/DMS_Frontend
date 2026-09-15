import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { EXPERIENCE_CATEGORIES } from '../config/enquiry';
import { PAGE_META } from '../config/site';
import { PageTransition } from '../components/editorial';
import { usePrefersReducedMotion } from '../components/motion/animations';

import heroImage from '../assets/home/hero-image-home.webp';
import fitImage from '../assets/home/tours/hoian.jpg';
import groupImage from '../assets/home/tours/halong.jpg';
import miceImage from '../assets/home/tours/saigon.jpg';
import honeymoonImage from '../assets/home/Kerala-Heritage.webp';
import luxuryImage from '../assets/home/tours/tokyo.jpg';

/** Preview image per category (bundled assets — no external hotlinks). */
const CATEGORY_IMAGES = {
    FIT: { src: fitImage, alt: 'Lantern-lit streets of Hoi An, Vietnam' },
    GROUP: { src: groupImage, alt: 'Ha Long Bay limestone karsts, Vietnam' },
    MICE: { src: miceImage, alt: 'Saigon city energy, Vietnam' },
    HONEYMOON: { src: honeymoonImage, alt: 'Kerala backwaters at golden hour, India' },
    LUXURY: { src: luxuryImage, alt: 'Tokyo cityscape at dusk, Japan' },
};

const DESTINATIONS = [
    { name: 'India', slug: 'india' },
    { name: 'Vietnam', slug: 'vietnam' },
    { name: 'Japan', slug: 'japan' },
    { name: 'South Korea', slug: 'south-korea' },
];

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

const Experiences = () => {
    const [active, setActive] = useState(EXPERIENCE_CATEGORIES[0]?.value);
    const activeCategory = EXPERIENCE_CATEGORIES.find((c) => c.value === active) || EXPERIENCE_CATEGORIES[0];

    return (
        <PageTransition>
            <div className="w-full bg-white">
                <Seo {...PAGE_META['/experiences']} path="/experiences" />

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
                            <p className="eyebrow text-[var(--color-gold)]/80 mb-5">Experiences</p>
                            <h1 className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.94] tracking-[-0.03em] text-white mb-6">
                                Travel by interest,
                                <span className="block italic text-[var(--color-gold)]">not by template.</span>
                            </h1>
                            <p className="font-body text-white/50 text-base sm:text-lg leading-relaxed max-w-xl">
                                The most memorable journeys are shaped by what matters to the traveller.
                                Choose a theme — we build the programme around it.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ── Typography-as-interface index ── */}
                <section className="w-full bg-[var(--color-ivory)] py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-16">
                    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                        {/* Index rows */}
                        <div className="lg:col-span-7 order-2 lg:order-1">
                            <Rise className="mb-10">
                                <p className="eyebrow mb-4">The Index</p>
                                <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)]">
                                    Five ways we design travel.
                                </h2>
                            </Rise>

                            <div className="border-t border-[var(--color-border-subtle)]">
                                {EXPERIENCE_CATEGORIES.map((category, index) => {
                                    const isActive = category.value === active;
                                    return (
                                        <div key={category.value} className="border-b border-[var(--color-border-subtle)]">
                                            <button
                                                type="button"
                                                aria-expanded={isActive}
                                                aria-controls={`experience-panel-${category.value}`}
                                                onMouseEnter={() => setActive(category.value)}
                                                onFocus={() => setActive(category.value)}
                                                onClick={() => setActive(category.value)}
                                                className="w-full text-left py-6 sm:py-7 flex items-baseline gap-4 sm:gap-6 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:-outline-offset-2"
                                            >
                                                <span
                                                    className={`font-display text-[11px] tracking-[0.2em] transition-colors duration-300 ${isActive ? 'text-[var(--color-gold)]' : 'text-[var(--color-text-muted)]'}`}
                                                >
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                <span
                                                    className={`font-display text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.02] tracking-[-0.02em] transition-colors duration-300 ${isActive ? 'text-[var(--color-navy)]' : 'text-[var(--color-navy)]/50 group-hover:text-[var(--color-navy)]/80'}`}
                                                >
                                                    {category.title}
                                                </span>
                                                <span className="hidden sm:block font-display italic text-sm text-[var(--color-bronze)]/80">
                                                    {category.tagline}
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    className={`ml-auto text-lg transition-all duration-300 ${isActive ? 'text-[var(--color-gold)] rotate-90' : 'text-[var(--color-navy)]/30'}`}
                                                >
                                                    →
                                                </span>
                                            </button>

                                            {/* Expanded detail — works on every viewport */}
                                            <div
                                                id={`experience-panel-${category.value}`}
                                                hidden={!isActive}
                                                className="pb-8 pl-9 sm:pl-12"
                                            >
                                                <p className="font-body text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed max-w-xl mb-5">
                                                    {category.description}
                                                </p>
                                                <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                                                    {category.points.map((point) => (
                                                        <li
                                                            key={point}
                                                            className="text-xs font-body text-[var(--color-text-muted)] flex items-center gap-2"
                                                        >
                                                            <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="flex flex-wrap items-center gap-4">
                                                    <Link
                                                        to={`/request-quote?trip_type=${category.value}`}
                                                        className="btn btn--sm btn--navy"
                                                    >
                                                        Request a Quote
                                                    </Link>
                                                    <Link
                                                        to={`/tours?category=${category.value}`}
                                                        className="link-premium text-[var(--color-navy)]/50 hover:text-[var(--color-gold)]"
                                                    >
                                                        View {category.title.toLowerCase()} journeys
                                                        <span className="link-arrow" aria-hidden="true">→</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Sticky preview — image follows selection */}
                        <div className="lg:col-span-5 order-1 lg:order-2">
                            <div className="lg:sticky lg:top-28">
                                <Rise>
                                    <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden bg-[var(--color-navy)]/5">
                                        {EXPERIENCE_CATEGORIES.map((category) => {
                                            const img = CATEGORY_IMAGES[category.value];
                                            const isVisible = category.value === active;
                                            return (
                                                <img
                                                    key={category.value}
                                                    src={img.src}
                                                    alt={isVisible ? img.alt : ''}
                                                    aria-hidden={!isVisible}
                                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                            );
                                        })}
                                        {/* Metadata bar */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-navy-deep)]/85 to-transparent p-5">
                                            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--color-gold)]/90">
                                                {String(EXPERIENCE_CATEGORIES.indexOf(activeCategory) + 1).padStart(2, '0')}
                                                {' — '}
                                                {activeCategory.title}
                                            </p>
                                            <p className="font-display italic text-white/80 text-sm mt-1">
                                                {activeCategory.tagline}
                                            </p>
                                        </div>
                                    </div>
                                </Rise>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Destinations — waypoint strip ── */}
                <section className="w-full bg-[var(--color-navy)] py-20 sm:py-28 px-5 sm:px-8 lg:px-16">
                    <div className="max-w-[1400px] mx-auto">
                        <Rise className="mb-12">
                            <p className="eyebrow text-[var(--color-gold)]/70 mb-4">Explore by Destination</p>
                            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-white">
                                Where will your clients go?
                            </h2>
                        </Rise>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/10">
                            {DESTINATIONS.map((dest, index) => (
                                <Rise key={dest.slug} delay={index * 0.06}>
                                    <Link
                                        to={`/destination/${dest.slug}`}
                                        className="group flex items-baseline gap-4 py-5 border-b border-white/10 pr-4"
                                    >
                                        <span className="font-display text-[11px] tracking-[0.2em] text-[var(--color-gold)]/60">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="font-display text-xl sm:text-2xl text-white/85 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                                            {dest.name}
                                        </span>
                                        <span
                                            className="ml-auto text-white/25 group-hover:text-[var(--color-gold)] group-hover:translate-x-1 transition-all duration-300"
                                            aria-hidden="true"
                                        >
                                            →
                                        </span>
                                    </Link>
                                </Rise>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Experiences;
