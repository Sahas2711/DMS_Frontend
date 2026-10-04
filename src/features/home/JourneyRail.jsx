import { Link } from 'react-router-dom';
import { JOURNEYS } from '../../pages/homeContent';

/* ═══════════════════════════════════════════════════════════════════
   JOURNEY RAIL — STATIC FIRST FOUNDATION

   Rules:
   1. No scroll-dependent horizontal movement
   2. Natural document flow for mobile
   3. All cards visible immediately
   4. No fixed heights causing blank space
   5. Consistent aspect ratios for all images
   6. CTA sits as the 6th grid item on desktop
   ═══════════════════════════════════════════════════════════════════ */

export default function JourneyRail() {
    return (
        <section
            aria-label="Curated journeys"
            className="relative bg-stone"
        >
            <div
                className="
                    mx-auto
                    max-w-[1500px]
                    px-5
                    py-16
                    sm:px-8
                    sm:py-20
                    lg:px-12
                    lg:py-24
                "
            >

                {/* ═══════════════════════════════════════════════════════
                    SECTION HEADER
                ═══════════════════════════════════════════════════════ */}

                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <p
                            className="
                                mb-5
                                flex
                                items-center
                                gap-4
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.3em]
                                text-bronze
                            "
                        >
                            <span
                                aria-hidden="true"
                                className="h-px w-10 bg-gold/60"
                            />

                            Curated journeys
                        </p>

                        <h2
                            className="
                                font-display
                                text-[clamp(2.2rem,5.5vw,4.6rem)]
                                leading-[0.98]
                                tracking-[-0.03em]
                                text-navy
                            "
                        >
                            Itineraries that move

                            <br className="hidden sm:block" />

                            <span className="italic text-navy/55">
                                {' '}through meaning.
                            </span>
                        </h2>
                    </div>


                    {/* View all itineraries */}
                    <Link
                        to="/tours"
                        className="
                            group
                            inline-flex
                            items-center
                            gap-3
                            text-[11px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-navy
                            transition-colors
                            duration-300
                            hover:text-bronze
                        "
                    >
                        View all itineraries

                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            aria-hidden="true"
                            className="
                                transition-transform
                                duration-500
                                ease-[cubic-bezier(0.16,1,0.3,1)]
                                group-hover:translate-x-1.5
                            "
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>


                {/* ═══════════════════════════════════════════════════════
                    JOURNEY GRID
                ═══════════════════════════════════════════════════════ */}

                <div className="mt-10 lg:mt-14">

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-8
                            sm:grid-cols-2
                            lg:grid-cols-3
                        "
                    >

                        {/* ─────────────────────────────────────────────
                            JOURNEY CARDS
                        ───────────────────────────────────────────── */}

                        {JOURNEYS.slice(0, 5).map((journey) => (
                            <JourneyCard
                                key={journey.slug}
                                journey={journey}
                            />
                        ))}


                        {/* ═════════════════════════════════════════════
                            6TH GRID ITEM — CTA
                            
                            Desktop:
                            Row 2 / Column 3
                            
                            Mobile:
                            Appears naturally after card 5
                            ═════════════════════════════════════════════ */}

                        <div
                            className="
                                flex
                                min-h-[280px]
                                flex-col
                                justify-end
                                border-t
                                border-navy/20
                                pt-8
                                lg:min-h-0
                                lg:border-t-0
                                lg:border-l
                                lg:pl-8
                                lg:pt-0
                            "
                        >

                            <div className="max-w-sm">

                                <p
                                    className="
                                        font-display
                                        text-[clamp(1.5rem,2.4vw,2.2rem)]
                                        leading-snug
                                        text-navy
                                    "
                                >
                                    Every journey here

                                    <br />

                                    <span className="italic text-navy/55">
                                        started as a brief.
                                    </span>
                                </p>


                                <Link
                                    to="/request-quote"
                                    className="
                                        mt-7
                                        inline-flex
                                        items-center
                                        gap-3
                                        bg-navy
                                        px-7
                                        py-3.5
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.2em]
                                        text-white
                                        transition-colors
                                        duration-300
                                        hover:bg-navy-light
                                    "
                                >
                                    Send yours

                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        aria-hidden="true"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}


/* ═══════════════════════════════════════════════════════════════════
   JOURNEY CARD
   Consistent geometry for every journey
   ═══════════════════════════════════════════════════════════════════ */

function JourneyCard({ journey }) {
    return (
        <article className="group">

            <Link
                to={`/tours/${journey.slug}`}
                className="block"
            >

                {/* ═══════════════════════════════════════════════════
                    IMAGE
                ═══════════════════════════════════════════════════ */}

                <div className="relative aspect-[4/5] overflow-hidden">

                    <img
                        src={journey.image}
                        alt={journey.imageAlt}
                        className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-[1.5s]
                            ease-[cubic-bezier(0.16,1,0.3,1)]
                            group-hover:scale-[1.05]
                        "
                        loading="lazy"
                        decoding="async"
                    />

                    {/* Hover gradient */}
                    <div
                        aria-hidden="true"
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-navy-deep/45
                            via-transparent
                            to-transparent
                            opacity-0
                            transition-opacity
                            duration-700
                            group-hover:opacity-100
                        "
                    />

                    {/* Duration plate */}
                    <p
                        className="
                            absolute
                            bottom-0
                            left-0
                            bg-stone
                            px-4
                            py-2
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.22em]
                            text-navy
                        "
                    >
                        {journey.days}
                    </p>

                </div>


                {/* ═══════════════════════════════════════════════════
                    TITLE
                ═══════════════════════════════════════════════════ */}

                <div className="mt-4">

                    <h3
                        className="
                            font-display
                            text-[clamp(1.4rem,2vw,1.8rem)]
                            leading-[1.02]
                            tracking-[-0.02em]
                            text-navy
                            transition-colors
                            duration-300
                            group-hover:text-bronze
                        "
                    >
                        {journey.title}
                    </h3>

                </div>


                {/* ═══════════════════════════════════════════════════
                    ROUTE STOPS
                ═══════════════════════════════════════════════════ */}

                <p
                    className="
                        mt-3
                        flex
                        flex-wrap
                        items-center
                        gap-x-2.5
                        gap-y-1
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-navy/60
                    "
                >

                    {journey.route.map((stop, i) => (
                        <span
                            key={stop}
                            className="flex items-center gap-2.5"
                        >

                            {i > 0 && (
                                <span
                                    aria-hidden="true"
                                    className="
                                        h-[4px]
                                        w-[4px]
                                        rotate-45
                                        border
                                        border-bronze/70
                                    "
                                />
                            )}

                            {stop}

                        </span>
                    ))}

                    <span
                        className="
                            ml-2
                            font-mono
                            text-[9px]
                            tracking-[0.16em]
                            text-navy/40
                        "
                    >
                        {journey.destination}
                    </span>

                </p>


                {/* ═══════════════════════════════════════════════════
                    DESCRIPTION
                ═══════════════════════════════════════════════════ */}

                <p
                    className="
                        mt-3
                        max-w-md
                        text-[13px]
                        leading-[1.75]
                        text-navy/60
                    "
                >
                    {journey.copy}
                </p>

            </Link>

        </article>
    );
}