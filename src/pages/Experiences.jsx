import { useState } from 'react';

import { Link } from 'react-router-dom';

import { motion, useReducedMotion } from 'framer-motion';

import Seo from '../components/Seo';

import { EXPERIENCE_CATEGORIES } from '../config/enquiry';

import { PAGE_META } from '../config/site';

import { PageTransition, Rise } from '../components/editorial';

const heroImage = '/images/home/hero-image-home.webp';

/**
 * Preview image per category (bundled assets — no external hotlinks).
 */
const CATEGORY_IMAGES = {
    CULTURE_HERITAGE: {
        src: '/images/home/India-heritage.webp',
        alt: 'Heritage architecture in Maharashtra, India',
    },

    FOOD_LOCAL_LIFE: {
        src: '/images/home/Vietnam-Cousin.webp',
        alt: 'Street food scene in Vietnam',
    },

    NATURE_SCENIC: {
        src: '/images/home/Vietnam-ha-long-bay.webp',
        alt: 'Ha Long Bay limestone karsts, Vietnam',
    },

    FAMILY_JOURNEYS: {
        src: '/images/home/Korea-Jeju.png',
        alt: 'Jeju Island landscapes, South Korea',
    },

    HONEYMOON_LUXURY: {
        src: '/images/home/india-kerala.webp',
        alt: 'Kerala backwaters at golden hour, India',
    },

    GROUPS_MICE: {
        src: '/images/home/Vietnam-ho-chi-minh-city.webp',
        alt: 'Saigon city energy, Vietnam',
    },

    WELLNESS_SLOW: {
        src: '/images/home/Japan-kyota.webp',
        alt: 'Kyoto temple gardens, Japan',
    },

    ART_DESIGN: {
        src: '/images/home/Korea-Seoul.webp',
        alt: 'Seoul contemporary architecture, South Korea',
    },
};

/**
 * Destination images.
 *
 * Each country uses a corresponding image from the existing
 * bundled assets already used elsewhere on the page.
 */
const DESTINATIONS = [
    {
        name: 'India',
        slug: 'delhi',
        image: '/images/home/India-heritage.webp',
        alt: 'Heritage architecture and travel in India',
    },

    {
        name: 'Vietnam',
        slug: 'ha-long-bay',
        image: '/images/home/Vietnam-ha-long-bay.webp',
        alt: 'Ha Long Bay in Vietnam',
    },

    {
        name: 'Japan',
        slug: 'tokyo',
        image: '/images/home/Japan-kyota.webp',
        alt: 'Kyoto temple gardens in Japan',
    },

    {
        name: 'South Korea',
        slug: 'seoul',
        image: '/images/home/Korea-Seoul.webp',
        alt: 'Contemporary architecture in Seoul, South Korea',
    },
];

const Experiences = () => {
    const [active, setActive] = useState(
        EXPERIENCE_CATEGORIES[0]?.value
    );

    const activeCategory =
        EXPERIENCE_CATEGORIES.find(
            (category) => category.value === active
        ) || EXPERIENCE_CATEGORIES[0];

    const prefersReducedMotion = useReducedMotion();

    return (
        <PageTransition>
            <div className="w-full bg-white">
                <Seo
                    {...PAGE_META['/experiences']}
                    path="/experiences"
                />

                {/* =========================================================
                    HERO / ARRIVAL
                ========================================================== */}
                <section className="relative flex h-[50vh] w-full items-center overflow-hidden md:h-[65vh] lg:min-h-screen">
                    <img
                        src={heroImage}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover"
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                    />

                    <div
                        className="absolute inset-0 bg-[var(--color-navy-deep)]/55"
                        aria-hidden="true"
                    />

                    <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
                        <motion.div
                            initial={
                                prefersReducedMotion
                                    ? {}
                                    : {
                                          opacity: 0,
                                          y: 24,
                                      }
                            }
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.9,
                                delay: 0.15,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <p className="eyebrow mb-5 text-[var(--color-gold)]/80">
                                Experiences
                            </p>

                            <h1 className="mb-6 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.94] tracking-[-0.03em] text-white">
                                Travel by interest,
                                <span className="block italic text-[var(--color-gold)]">
                                    not by template.
                                </span>
                            </h1>

                            <p className="max-w-xl font-body text-base leading-relaxed text-white/50 sm:text-lg">
                                The most memorable journeys are shaped by what
                                matters to the traveller. Choose a theme — we
                                build the programme around it.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* =========================================================
                    EXPERIENCE INDEX
                ========================================================== */}
                <section className="w-full bg-[var(--color-ivory)] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                    <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">

                        {/* =================================================
                            INDEX ROWS
                        ================================================== */}
                        <div className="order-2 lg:col-span-7 lg:order-1">
                            <Rise className="mb-8">
                                <p className="eyebrow mb-4">
                                    The Index
                                </p>

                                <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)]">
                                    Eight ways we design travel.
                                </h2>
                            </Rise>

                            <div className="border-t border-[var(--color-border-subtle)]">
                                {EXPERIENCE_CATEGORIES.map((category) => {
                                    const isActive =
                                        category.value === active;

                                    return (
                                        <div
                                            key={category.value}
                                            className="border-b border-[var(--color-border-subtle)]"
                                        >
                                            <button
                                                type="button"
                                                aria-expanded={isActive}
                                                aria-controls={`experience-panel-${category.value}`}
                                                onMouseEnter={() =>
                                                    setActive(
                                                        category.value
                                                    )
                                                }
                                                onFocus={() =>
                                                    setActive(
                                                        category.value
                                                    )
                                                }
                                                onClick={() =>
                                                    setActive(
                                                        category.value
                                                    )
                                                }
                                                className="group flex w-full items-baseline gap-4 py-5 text-left focus-visible:-outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] sm:gap-6 sm:py-6"
                                            >
                                                <span
                                                    className={`font-display text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.02] tracking-[-0.02em] transition-colors duration-300 ${
                                                        isActive
                                                            ? 'text-[var(--color-navy)]'
                                                            : 'text-[var(--color-navy)]/50 group-hover:text-[var(--color-navy)]/80'
                                                    }`}
                                                >
                                                    {category.title}
                                                </span>

                                                <span className="hidden font-display text-sm italic text-[var(--color-bronze)]/80 sm:block">
                                                    {category.tagline}
                                                </span>

                                                <span
                                                    aria-hidden="true"
                                                    className={`ml-auto text-lg transition-all duration-300 ${
                                                        isActive
                                                            ? 'rotate-90 text-[var(--color-gold)]'
                                                            : 'text-[var(--color-navy)]/30'
                                                    }`}
                                                >
                                                    →
                                                </span>
                                            </button>

                                            {/* Expanded detail */}
                                            <div
                                                id={`experience-panel-${category.value}`}
                                                hidden={!isActive}
                                                className="pb-7 pl-9 sm:pl-12"
                                            >
                                                <p className="mb-5 max-w-xl font-body text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                                                    {category.description}
                                                </p>

                                                <ul className="mb-5 flex flex-wrap gap-x-6 gap-y-2">
                                                    {category.points.map(
                                                        (point) => (
                                                            <li
                                                                key={point}
                                                                className="flex items-center gap-2 text-xs font-body text-[var(--color-text-muted)]"
                                                            >
                                                                <span
                                                                    className="h-1 w-1 rounded-full bg-[var(--color-gold)]"
                                                                    aria-hidden="true"
                                                                />

                                                                {point}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>

                                                <div className="flex flex-wrap items-center gap-4">
                                                    <Link
                                                        to={`/tours?category=${category.value}`}
                                                        className="link-premium text-[var(--color-navy)]/50 hover:text-[var(--color-gold)]"
                                                    >
                                                        View{' '}
                                                        {category.title.toLowerCase()}{' '}
                                                        journeys

                                                        <span
                                                            className="link-arrow"
                                                            aria-hidden="true"
                                                        >
                                                            →
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* =================================================
                            STICKY IMAGE PREVIEW
                        ================================================== */}
                        <div className="order-1 lg:col-span-5 lg:order-2">
                            <div className="lg:sticky lg:top-28">
                                <Rise>
                                    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-navy)] lg:aspect-[3/4]">

                                        {EXPERIENCE_CATEGORIES.map(
                                            (category) => {
                                                const img =
                                                    CATEGORY_IMAGES[
                                                        category.value
                                                    ];

                                                const isVisible =
                                                    category.value === active;

                                                return (
                                                    <img
                                                        key={
                                                            category.value
                                                        }
                                                        src={img.src}
                                                        alt={
                                                            isVisible
                                                                ? img.alt
                                                                : ''
                                                        }
                                                        aria-hidden={
                                                            !isVisible
                                                        }
                                                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                                            isVisible
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        }`}
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                );
                                            }
                                        )}

                                        {/* Image metadata */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-navy-deep)]/85 to-transparent p-5">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)]/90">
                                                {activeCategory.title}
                                            </p>

                                            <p className="mt-1 font-display text-sm italic text-white/80">
                                                {activeCategory.tagline}
                                            </p>
                                        </div>
                                    </div>
                                </Rise>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================================
                    DESTINATIONS
                ========================================================== */}
                <section className="w-full bg-[var(--color-cream)] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                    <div className="mx-auto max-w-[1400px]">

                        <Rise className="mb-9">
                            <p className="eyebrow mb-4 text-[var(--color-bronze)]">
                                Explore by Destination
                            </p>

                            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)]">
                                Where will your clients go?
                            </h2>
                        </Rise>

                        {/* =================================================
                            COUNTRY IMAGE CARDS
                        ================================================== */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                            {DESTINATIONS.map((dest, index) => (
                                <Rise
                                    key={dest.slug}
                                    delay={index * 0.06}
                                >
                                    <Link
                                        to={`/destination/${dest.slug}`}
                                        className="group relative block aspect-[4/5] overflow-hidden"
                                    >
                                        {/* Country image */}
                                        <img
                                            src={dest.image}
                                            alt={dest.alt}
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                            loading="lazy"
                                            decoding="async"
                                        />

                                        {/* Readability overlay */}
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/85 via-[var(--color-navy-deep)]/20 to-transparent"
                                        />

                                        {/* Subtle hover overlay */}
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-0 bg-[var(--color-navy)]/0 transition-colors duration-500 group-hover:bg-[var(--color-navy)]/10"
                                        />

                                        {/* Country name */}
                                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="font-display text-2xl tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-[var(--color-gold)] sm:text-3xl">
                                                    {dest.name}
                                                </span>

                                                <span
                                                    className="text-lg text-white/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-gold)]"
                                                    aria-hidden="true"
                                                >
                                                    →
                                                </span>
                                            </div>
                                        </div>
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
