import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DESTINATIONS } from '../../pages/homeContent';
import { Coordinate } from './RoutePath';

/*
 * ═══════════════════════════════════════════════════════════════════
 * DESTINATION CHAPTERS — HORIZONTAL EDITORIAL RAIL
 *
 * IMPORTANT:
 * - No giant sticky scroll scene
 * - No artificial section-height calculation
 * - No hard-coded transform percentages
 * - No blank viewport regions
 * - Native horizontal rail
 * - Each destination is a complete visual composition
 *
 * Desktop:
 *   image | destination information
 *
 * Mobile:
 *   horizontal snap cards
 *
 * Interaction:
 *   - arrow controls
 *   - native horizontal scrolling
 *   - keyboard accessible
 *   - progress indicator
 * ═══════════════════════════════════════════════════════════════════
 */

const COORDS = {
    india: '20.59° N — 78.96° E',
    vietnam: '14.06° N — 108.28° E',
    japan: '36.20° N — 138.25° E',
    'south-korea': '35.91° N — 127.77° E',
};

export default function DestinationChapters() {
    const railRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollToDestination = (index) => {
        const rail = railRef.current;

        if (!rail) return;

        const cards = rail.querySelectorAll(
            '[data-destination-card]'
        );

        const card = cards[index];

        if (!card) return;

        rail.scrollTo({
            left:
                card.offsetLeft -
                rail.offsetLeft,
            behavior: 'smooth',
        });

        setActiveIndex(index);
    };

    const handleScroll = () => {
        const rail = railRef.current;

        if (!rail) return;

        const cards = rail.querySelectorAll(
            '[data-destination-card]'
        );

        if (!cards.length) return;

        const railCenter =
            rail.scrollLeft +
            rail.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
            const cardCenter =
                card.offsetLeft +
                card.offsetWidth / 2;

            const distance = Math.abs(
                railCenter - cardCenter
            );

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        setActiveIndex(closestIndex);
    };

    const previous = () => {
        scrollToDestination(
            Math.max(0, activeIndex - 1)
        );
    };

    const next = () => {
        scrollToDestination(
            Math.min(
                DESTINATIONS.length - 1,
                activeIndex + 1
            )
        );
    };

    return (
        <section
            aria-label="Destinations"
            className="
                relative
                overflow-hidden
                bg-navy-deep
                text-white
            "
        >
            {/* ═══════════════════════════════════════════
                HEADER
            ═══════════════════════════════════════════ */}

            <header
                className="
                    mx-auto
                    max-w-[1500px]
                    px-5
                    pb-10
                    pt-24
                    sm:px-8
                    lg:px-12
                    lg:pb-12
                    lg:pt-32
                "
            >
                <div
                    className="
                        flex
                        flex-col
                        gap-8
                        lg:flex-row
                        lg:items-end
                        lg:justify-between
                    "
                >
                    <div>
                        <div className="flex items-center gap-4">
                            <span
                                aria-hidden="true"
                                className="
                                    h-px
                                    w-10
                                    bg-gold/50
                                "
                            />

                            <span
                                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.3em]
                                    text-gold/80
                                    sm:text-[11px]
                                "
                            >
                                Destinations
                            </span>
                        </div>

                        <h2
                            className="
                                mt-5
                                font-display
                                text-[clamp(2.7rem,6vw,5.8rem)]
                                leading-[0.92]
                                tracking-[-0.035em]
                            "
                        >
                            Four countries.
                            <br />

                            <span className="italic text-white/50">
                                One ground partner.
                            </span>
                        </h2>
                    </div>

                    <p
                        className="
                            max-w-sm
                            text-[13px]
                            leading-[1.85]
                            text-white/55
                        "
                    >
                        Destination expertise and carefully
                        coordinated programmes across India,
                        Vietnam, Japan and South Korea.
                    </p>
                </div>
            </header>

            {/* ═══════════════════════════════════════════
                DESTINATION RAIL
            ═══════════════════════════════════════════ */}

            <div className="relative">
                {/* Left fade */}
                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        bottom-0
                        left-0
                        top-0
                        z-20
                        hidden
                        w-16
                        bg-gradient-to-r
                        from-navy-deep
                        to-transparent
                        lg:block
                    "
                />

                {/* Right fade */}
                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        bottom-0
                        right-0
                        top-0
                        z-20
                        hidden
                        w-24
                        bg-gradient-to-l
                        from-navy-deep
                        to-transparent
                        lg:block
                    "
                />

                <div
                    ref={railRef}
                    onScroll={handleScroll}
                    className="
                        flex
                        gap-6
                        overflow-x-auto
                        overscroll-x-contain
                        px-5
                        pb-5
                        pt-2
                        snap-x
                        snap-mandatory
                        scroll-smooth
                        sm:gap-8
                        sm:px-8
                        lg:gap-12
                        lg:px-[6vw]
                        lg:pb-8
                        [-ms-overflow-style:none]
                        [scrollbar-width:none]
                        [&::-webkit-scrollbar]:hidden
                    "
                >
                    {DESTINATIONS.map((dest, index) => (
                        <DestinationCard
                            key={dest.id}
                            dest={dest}
                            index={index}
                        />
                    ))}

                    {/* End breathing room */}
                    <div
                        aria-hidden="true"
                        className="
                            w-[5vw]
                            shrink-0
                        "
                    />
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                RAIL CONTROLS
            ═══════════════════════════════════════════ */}

            <div
                className="
                    mx-auto
                    flex
                    max-w-[1500px]
                    items-center
                    justify-between
                    gap-6
                    px-5
                    pb-20
                    pt-7
                    sm:px-8
                    lg:px-12
                    lg:pb-28
                "
            >
                {/* Progress */}
                <div
                    className="
                        flex
                        flex-1
                        items-center
                        gap-3
                    "
                >
                    {DESTINATIONS.map((dest, index) => (
                        <button
                            key={dest.id}
                            type="button"
                            aria-label={`Go to ${dest.name}`}
                            aria-current={
                                activeIndex === index
                                    ? 'true'
                                    : undefined
                            }
                            onClick={() =>
                                scrollToDestination(index)
                            }
                            className="
                                group
                                flex
                                flex-1
                                items-center
                                gap-2
                            "
                        >
                            <span
                                className={`
                                    block
                                    h-px
                                    w-full
                                    transition-all
                                    duration-500
                                    ${
                                        activeIndex === index
                                            ? 'bg-gold'
                                            : 'bg-white/15 group-hover:bg-white/35'
                                    }
                                `}
                            />

                            <span
                                className={`
                                    hidden
                                    text-[9px]
                                    tracking-[0.18em]
                                    sm:block
                                    ${
                                        activeIndex === index
                                            ? 'text-gold'
                                            : 'text-white/25'
                                    }
                                `}
                            >
                                {String(index + 1).padStart(
                                    2,
                                    '0'
                                )}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={previous}
                        disabled={activeIndex === 0}
                        aria-label="Previous destination"
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            border
                            border-white/15
                            text-white/70
                            transition-all
                            duration-300
                            hover:border-gold/60
                            hover:text-gold
                            disabled:pointer-events-none
                            disabled:opacity-25
                        "
                    >
                        <span aria-hidden="true">←</span>
                    </button>

                    <button
                        type="button"
                        onClick={next}
                        disabled={
                            activeIndex ===
                            DESTINATIONS.length - 1
                        }
                        aria-label="Next destination"
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            border
                            border-white/15
                            text-white/70
                            transition-all
                            duration-300
                            hover:border-gold/60
                            hover:text-gold
                            disabled:pointer-events-none
                            disabled:opacity-25
                        "
                    >
                        <span aria-hidden="true">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
}


/* ═══════════════════════════════════════════════════════════════
   DESTINATION CARD
   ═══════════════════════════════════════════════════════════════ */

function DestinationCard({ dest, index }) {
    return (
        <article
            data-destination-card
            className="
                group
                relative
                grid
                h-[min(66vh,620px)]
                w-[88vw]
                max-w-[1180px]
                shrink-0
                snap-center
                grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]
                overflow-hidden
                bg-[#0c1528]
                lg:w-[82vw]
                xl:w-[78vw]
            "
        >
            {/* ═══════════════════════════════════════
                IMAGE
            ═══════════════════════════════════════ */}

            <Link
                to={dest.route}
                aria-label={`Discover ${dest.name}`}
                className="
                    relative
                    block
                    h-full
                    min-h-0
                    overflow-hidden
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-[-3px]
                    focus-visible:outline-gold
                "
            >
                <img
                    src={dest.image}
                    alt={dest.imageAlt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-[1400ms]
                        ease-[cubic-bezier(0.16,1,0.3,1)]
                        group-hover:scale-[1.045]
                    "
                />

                {/* Image treatment */}
                <div
                    aria-hidden="true"
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-transparent
                        via-transparent
                        to-navy-deep/40
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-navy-deep/65
                        via-transparent
                        to-transparent
                    "
                />

                {/* Number */}
                <span
                    className="
                        absolute
                        left-6
                        top-6
                        font-display
                        text-[11px]
                        tracking-[0.2em]
                        text-white/80
                        sm:left-8
                        sm:top-8
                    "
                >
                    {dest.number}
                </span>

                {/* Coordinate */}
                <div
                    className="
                        absolute
                        bottom-6
                        left-6
                        sm:bottom-8
                        sm:left-8
                    "
                >
                    <Coordinate
                        text={COORDS[dest.id]}
                        className="text-white/60"
                    />
                </div>
            </Link>

            {/* ═══════════════════════════════════════
                CONTENT
            ═══════════════════════════════════════ */}

            <div
                className="
                    relative
                    flex
                    min-w-0
                    flex-col
                    justify-center
                    px-7
                    py-8
                    sm:px-10
                    sm:py-10
                    lg:px-12
                    xl:px-16
                "
            >
                {/* Small route marker */}
                <div className="flex items-center gap-4">
                    <span
                        className="
                            font-display
                            text-[11px]
                            tracking-[0.2em]
                            text-gold
                        "
                    >
                        {dest.number}
                    </span>

                    <span
                        aria-hidden="true"
                        className="
                            h-px
                            w-10
                            bg-gold/45
                        "
                    />

                    <Coordinate
                        text={COORDS[dest.id]}
                        className="text-white/35"
                    />
                </div>

                {/* Name */}
                <h3
                    className="
                        mt-6
                        font-display
                        text-[clamp(3.1rem,5.5vw,6.2rem)]
                        leading-[0.82]
                        tracking-[-0.045em]
                        text-white
                    "
                >
                    {dest.name}
                </h3>

                {/* Tagline */}
                <p
                    className="
                        mt-4
                        font-display
                        text-[clamp(1rem,1.5vw,1.35rem)]
                        italic
                        leading-tight
                        text-gold/80
                    "
                >
                    {dest.tagline}
                </p>

                {/* Copy */}
                <p
                    className="
                        mt-5
                        max-w-md
                        text-[12px]
                        leading-[1.85]
                        text-white/55
                    "
                >
                    {dest.copy}
                </p>

                {/* Regions */}
                <div
                    className="
                        mt-6
                        flex
                        flex-wrap
                        gap-x-4
                        gap-y-2
                    "
                >
                    {dest.regions.map((region, regionIndex) => (
                        <span
                            key={region}
                            className={`
                                text-[9px]
                                uppercase
                                tracking-[0.18em]
                                ${
                                    regionIndex === 0
                                        ? 'text-gold'
                                        : 'text-white/40'
                                }
                            `}
                        >
                            {region}
                        </span>
                    ))}
                </div>

                {/* Meta */}
                <div
                    className="
                        mt-6
                        grid
                        grid-cols-2
                        gap-x-5
                        gap-y-4
                        border-t
                        border-white/10
                        pt-5
                    "
                >
                    {dest.meta.map((meta) => (
                        <div key={meta.label}>
                            <p
                                className="
                                    text-[8px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-white/30
                                "
                            >
                                {meta.label}
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-[10px]
                                    text-white/70
                                "
                            >
                                {meta.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <Link
                    to={dest.route}
                    className="
                        group/link
                        mt-7
                        inline-flex
                        w-fit
                        items-center
                        gap-3
                        border-b
                        border-gold/40
                        pb-1.5
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-white
                        transition-colors
                        duration-300
                        hover:border-gold
                        hover:text-gold
                        focus-visible:outline
                        focus-visible:outline-2
                        focus-visible:outline-offset-4
                        focus-visible:outline-gold
                    "
                >
                    Discover {dest.name}

                    <span
                        aria-hidden="true"
                        className="
                            transition-transform
                            duration-500
                            group-hover/link:translate-x-1.5
                        "
                    >
                        →
                    </span>
                </Link>

                {/* Decorative index */}
                <span
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        bottom-[-0.12em]
                        right-4
                        font-display
                        text-[clamp(5rem,12vw,12rem)]
                        leading-none
                        text-white/[0.025]
                    "
                >
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>
        </article>
    );
}