import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import { Link } from 'react-router-dom';

import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from 'framer-motion';

import {
    DESTINATIONS,
} from '../../pages/homeContent';

import { EASE_EDITORIAL } from '../../pages/motionTokens';

import { AsiaRouteMap } from './RoutePath';


/*
╔═══════════════════════════════════════════════════════════════════╗
║                         ASIAN STAR HERO                           ║
║                                                                   ║
║  Automatic destination story                                      ║
║                                                                   ║
║  India → Vietnam → Japan → South Korea → India                    ║
║                                                                   ║
║  Every 2 seconds                                                   ║
║                                                                   ║
║  IMAGE                                                            ║
║    ↓                                                              ║
║  DESTINATION                                                       ║
║    ↓                                                              ║
║  TAGLINE                                                          ║
║    ↓                                                              ║
║  DESTINATION RAIL                                                  ║
║                                                                   ║
║  No scroll-dependent layout.                                      ║
║  No hover pause.                                                  ║
║  No content overlap.                                              ║
╚═══════════════════════════════════════════════════════════════════╝
*/


/* ─────────────────────────────────────────────────────────────────
   CHANGE DESTINATION EVERY 2 SECONDS
───────────────────────────────────────────────────────────────── */

const HOLD_MS = 2000;

const SWIPE_THRESHOLD = 56;


/* ─────────────────────────────────────────────────────────────────
   IMAGE ANIMATION
───────────────────────────────────────────────────────────────── */

const IMAGE_VARIANTS = {
    enter: {
        opacity: 0,
        scale: 1.045,
    },

    center: {
        opacity: 1,
        scale: 1,
    },

    exit: {
        opacity: 0,
        scale: 1.015,
    },
};

const IMAGE_TRANSITION = {
    duration: 0.9,
    ease: EASE_EDITORIAL,
};


/* ─────────────────────────────────────────────────────────────────
   TEXT ANIMATION
───────────────────────────────────────────────────────────────── */

const CONTENT_VARIANTS = {
    enter: {
        opacity: 0,
        y: 18,
    },

    center: {
        opacity: 1,
        y: 0,
    },

    exit: {
        opacity: 0,
        y: -14,
    },
};


/* ═══════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════ */

export default function Hero() {
    const reduce = useReducedMotion();

    const [active, setActive] = useState(0);

    const touchX = useRef(null);

    const total = DESTINATIONS.length;

    const destination = DESTINATIONS[active];


    /* ═══════════════════════════════════════════════════════════════
       PRELOAD ALL DESTINATION IMAGES

       This is important because the transition happens every
       2 seconds. We don't want the animation waiting for network.
    ═══════════════════════════════════════════════════════════════ */

    useEffect(() => {
        DESTINATIONS.forEach((item) => {
            if (!item.image) return;

            const image = new Image();

            image.decoding = 'async';
            image.src = item.image;
        });
    }, []);


    /* ═══════════════════════════════════════════════════════════════
       CHANGE DESTINATION
    ═══════════════════════════════════════════════════════════════ */

    const goTo = useCallback(
        (index) => {
            if (!total) return;

            const next =
                ((index % total) + total) % total;

            setActive(next);
        },
        [total]
    );


    const nextDestination = useCallback(() => {
        setActive((current) => (
            (current + 1) % total
        ));
    }, [total]);


    const previousDestination = useCallback(() => {
        setActive((current) => (
            (current - 1 + total) % total
        ));
    }, [total]);


    /* ═══════════════════════════════════════════════════════════════
       AUTOMATIC 2 SECOND ROTATION

       IMPORTANT:
       This intentionally does NOT depend on `active`.

       Therefore there is exactly one timer continuously rotating
       through the destinations.
    ═══════════════════════════════════════════════════════════════ */

    useEffect(() => {
        if (
            reduce ||
            total <= 1
        ) {
            return undefined;
        }

        const timer = window.setInterval(() => {
            setActive((current) => (
                (current + 1) % total
            ));
        }, HOLD_MS);

        return () => {
            window.clearInterval(timer);
        };
    }, [reduce, total]);


    /* ═══════════════════════════════════════════════════════════════
       KEYBOARD NAVIGATION
    ═══════════════════════════════════════════════════════════════ */

    useEffect(() => {
        const handleKeyDown = (event) => {
            const target = event.target;

            if (
                target instanceof HTMLElement &&
                (
                    target.isContentEditable ||
                    target.tagName === 'INPUT' ||
                    target.tagName === 'TEXTAREA' ||
                    target.tagName === 'SELECT'
                )
            ) {
                return;
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                nextDestination();
            }

            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                previousDestination();
            }
        };

        window.addEventListener(
            'keydown',
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                'keydown',
                handleKeyDown
            );
        };
    }, [
        nextDestination,
        previousDestination,
    ]);


    /* ═══════════════════════════════════════════════════════════════
       MOBILE SWIPE
    ═══════════════════════════════════════════════════════════════ */

    const handleTouchStart = useCallback((event) => {
        touchX.current =
            event.touches?.[0]?.clientX ?? null;
    }, []);


    const handleTouchEnd = useCallback(
        (event) => {
            if (touchX.current == null) {
                return;
            }

            const endX =
                event.changedTouches?.[0]?.clientX;

            if (typeof endX !== 'number') {
                touchX.current = null;
                return;
            }

            const distance =
                touchX.current - endX;

            if (
                Math.abs(distance) >
                SWIPE_THRESHOLD
            ) {
                if (distance > 0) {
                    nextDestination();
                } else {
                    previousDestination();
                }
            }

            touchX.current = null;
        },
        [
            nextDestination,
            previousDestination,
        ]
    );


    if (!destination) {
        return null;
    }


    return (
        <section
            aria-label="Asian Star Travel — B2B DMC for India, Vietnam, Japan and South Korea"

            className="
                relative
                min-h-[760px]
                overflow-hidden
                bg-navy-deep
                text-white

                lg:h-[calc(100svh-84px)]
                lg:min-h-[760px]
            "

            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >

            {/* ═══════════════════════════════════════════════════════
                BACKGROUND IMAGE
            ═══════════════════════════════════════════════════════ */}

            <div
                className="
                    absolute
                    inset-0
                    overflow-hidden
                "
                aria-hidden="true"
            >

                <AnimatePresence
                    initial={false}
                    mode="sync"
                >

                    <motion.div
                        key={destination.id}

                        variants={
                            reduce
                                ? undefined
                                : IMAGE_VARIANTS
                        }

                        initial={
                            reduce
                                ? {
                                      opacity: 1,
                                      scale: 1,
                                  }
                                : 'enter'
                        }

                        animate={
                            reduce
                                ? {
                                      opacity: 1,
                                      scale: 1,
                                  }
                                : 'center'
                        }

                        exit={
                            reduce
                                ? {
                                      opacity: 0,
                                  }
                                : 'exit'
                        }

                        transition={
                            reduce
                                ? {
                                      duration: 0,
                                  }
                                : IMAGE_TRANSITION
                        }

                        className="
                            absolute
                            inset-0
                            will-change-transform
                        "
                    >

                        <img
                            src={destination.image}
                            alt=""
                            className="
                                h-full
                                w-full
                                object-cover
                            "
                            decoding="async"
                            loading="eager"
                        />

                    </motion.div>

                </AnimatePresence>


                {/* Main dark treatment */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-navy-deep/90
                        via-navy-deep/48
                        to-navy-deep/15
                    "
                />


                {/* Bottom readability */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-navy-deep
                        via-navy-deep/20
                        to-navy-deep/30
                    "
                />


                {/* Very subtle vignette */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-[radial-gradient(circle_at_65%_45%,transparent_0%,rgba(3,12,32,0.05)_50%,rgba(3,12,32,0.35)_100%)]
                    "
                />

            </div>


            {/* ═══════════════════════════════════════════════════════
                CONTENT

                IMPORTANT:
                There is now enough top spacing so the navbar can
                never collide with the coordinates/meta.
            ═══════════════════════════════════════════════════════ */}

            <div
                className="
                    relative
                    z-10
                    flex
                    min-h-[760px]
                    flex-col

                    px-5
                    pb-6
                    pt-28

                    sm:px-8
                    sm:pt-28

                    lg:h-full
                    lg:min-h-0
                    lg:px-12
                    lg:pb-7
                    lg:pt-8
                "
            >

                {/* ═════════════════════════════════════════════════
                    TOP META
                ═════════════════════════════════════════════════ */}

<div
    className="
        flex
        shrink-0
        items-start
        justify-between
    "
>
    {/* Left metadata */}
    {/* <span
        className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.34em]
            text-white/70
            sm:text-[10px]
        "
    >
    //    B2B Destination Management
    </span> */}

    {/* Right destination coordinates */}
    <div
        className="
            flex
            flex-col
            items-end
            gap-2
            pt-7
            sm:pt-8
        "
    >
        {/* <span
            className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-gold/70
            "
        >
            {destination.name}
        </span> */}

        <AnimatePresence
            initial={false}
            mode="wait"
        >
            <motion.span
                key={destination.id}
                initial={
                    reduce
                        ? false
                        : {
                              opacity: 0,
                              y: 8,
                          }
                }
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                exit={
                    reduce
                        ? undefined
                        : {
                              opacity: 0,
                              y: -8,
                          }
                }
                transition={{
                    duration: 0.35,
                    ease: EASE_EDITORIAL,
                }}
                className="
                    text-[8px]
                    uppercase
                    tracking-[0.3em]
                    text-white/45
                    sm:text-[9px]
                "
            >
                {destination.coordinates ??
                    '21.0278° N — 105.8342° E'}
            </motion.span>
        </AnimatePresence>
    </div>
</div>


                {/* ═════════════════════════════════════════════════
                    MAIN HERO CONTENT
                ═════════════════════════════════════════════════ */}

                <div
                    className="
                        flex
                        flex-1
                        flex-col
                        justify-center

                        lg:pb-5
                    "
                >

                    {/* Destination indicator */}

                    <AnimatePresence
                        initial={false}
                        mode="wait"
                    >

                        <motion.div
                            key={`indicator-${destination.id}`}

                            variants={CONTENT_VARIANTS}

                            initial={
                                reduce
                                    ? false
                                    : 'enter'
                            }

                            animate="center"

                            exit={
                                reduce
                                    ? undefined
                                    : 'exit'
                            }

                            transition={{
                                duration: 0.55,
                                ease: EASE_EDITORIAL,
                            }}

                            className="
                                mb-4
                                flex
                                items-center
                                gap-4
                            "
                        >

                            <span
                                className="
                                    text-[9px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.28em]
                                    text-white/65
                                "
                            >
                                {destination.name}
                            </span>

                        </motion.div>

                    </AnimatePresence>


                </div>


                {/* ═════════════════════════════════════════════════
                    CENTERED ANIMATED TEXT
                ═════════════════════════════════════════════════ */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: EASE_EDITORIAL }}
                        className="text-center"
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: EASE_EDITORIAL }}
                            className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.35em] text-gold/80 mb-3"
                        >
                            Asian Star Travels
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.7, ease: EASE_EDITORIAL }}
                            className="font-display text-[clamp(1.8rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-white max-w-2xl px-6"
                        >
                            Journeys That Bring Us Closer
                        </motion.h2>
                    </motion.div>
                </div>


                {/* ═════════════════════════════════════════════════
                    BOTTOM DESTINATION RAIL

                    This is deliberately separated from the main
                    content so it can never collide with the CTA.
                ═════════════════════════════════════════════════ */}

                <div
                    className="
                        shrink-0
                        border-t
                        border-white/15
                        pt-4
                    "
                >

                    <div
                        className="
                            flex
                            items-end
                            justify-between
                            gap-8
                        "
                    >

                        {/* Destination rail */}

                        <div
                            className="
                                w-full
                                max-w-[760px]
                            "
                        >

                            <div
                                role="tablist"
                                aria-label="Choose a destination"

                                className="
                                    grid
                                    grid-cols-4
                                    gap-2
                                    sm:gap-4
                                "
                            >

                                {DESTINATIONS.map(
                                    (item, index) => {
                                        const selected =
                                            index === active;

                                        return (
                                            <button
                                                key={item.id}

                                                type="button"

                                                role="tab"

                                                aria-selected={
                                                    selected
                                                }

                                                aria-label={
                                                    `Show ${item.name}`
                                                }

                                                onClick={() =>
                                                    goTo(index)
                                                }

                                                className="
                                                    group
                                                    relative
                                                    min-w-0
                                                    py-2
                                                    text-left
                                                "
                                            >

                                                {/* Active line */}

                                                <span
                                                    aria-hidden="true"
                                                    className={`
                                                        block
                                                        h-px
                                                        w-full
                                                        transition-all
                                                        duration-500
                                                        ${
                                                            selected
                                                                ? 'bg-gold'
                                                                : 'bg-white/25 group-hover:bg-white/50'
                                                        }
                                                    `}
                                                />


                                                {/* Diamond waypoint */}

                                                <span
                                                    aria-hidden="true"
                                                    className={`
                                                        absolute
                                                        left-0
                                                        top-1/2
                                                        h-[6px]
                                                        w-[6px]
                                                        -translate-y-1/2
                                                        rotate-45
                                                        border
                                                        transition-all
                                                        duration-500
                                                        ${
                                                            selected
                                                                ? 'border-gold bg-gold'
                                                                : 'border-white/45 bg-transparent group-hover:border-white/70'
                                                        }
                                                    `}
                                                />


                                                <span
                                                    className={`
                                                        mt-3
                                                        block
                                                        truncate
                                                        text-[8px]
                                                        font-semibold
                                                        uppercase
                                                        tracking-[0.18em]
                                                        transition-colors
                                                        duration-500
                                                        sm:text-[9px]
                                                        ${
                                                            selected
                                                                ? 'text-white'
                                                                : 'text-white/45 group-hover:text-white/70'
                                                        }
                                                    `}
                                                >
                                                    {item.number}{' '}
                                                    {item.name}
                                                </span>

                                            </button>
                                        );
                                    }
                                )}

                            </div>


                            {/* Active destination information */}

                            <div
                                className="
                                    mt-1
                                    flex
                                    min-h-[25px]
                                    items-center
                                    justify-between
                                    gap-4
                                "
                            >

                                <AnimatePresence
                                    initial={false}
                                    mode="wait"
                                >

                                    <motion.p
                                        key={`rail-${destination.id}`}

                                        initial={
                                            reduce
                                                ? false
                                                : {
                                                      opacity: 0,
                                                      x: -8,
                                                  }
                                        }

                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                        }}

                                        exit={
                                            reduce
                                                ? undefined
                                                : {
                                                      opacity: 0,
                                                      x: 8,
                                                  }
                                        }

                                        transition={{
                                            duration: 0.4,
                                            ease: EASE_EDITORIAL,
                                        }}

                                        className="
                                            font-display
                                            text-xs
                                            italic
                                            text-white/70
                                        "
                                    >
                                        {destination.tagline}
                                    </motion.p>

                                </AnimatePresence>


                                <span
                                    className="
                                        hidden
                                        text-[8px]
                                        uppercase
                                        tracking-[0.24em]
                                        text-white/35
                                        sm:block
                                    "
                                >
                                    {destination.meta?.[1]?.value ?? ''}
                                </span>

                            </div>

                        </div>


                        {/* Route map */}

                        <div
                            className="
                                hidden
                                w-[220px]
                                shrink-0
                                opacity-80
                                xl:block
                                2xl:w-[260px]
                            "
                        >
                            <AsiaRouteMap
                                className="
                                    h-auto
                                    w-full
                                "
                            />
                        </div>

                    </div>

                </div>

            </div>


            {/* ═══════════════════════════════════════════════════════
                SCROLL INDICATOR
            ═══════════════════════════════════════════════════════ */}

            <div
                className="
                    absolute
                    right-5
                    top-1/2
                    z-20
                    hidden
                    -translate-y-1/2
                    flex-col
                    items-center
                    gap-3
                    lg:flex
                "
                aria-hidden="true"
            >

                <span
                    className="
                        block
                        h-14
                        w-px
                        bg-gradient-to-b
                        from-gold/70
                        to-transparent
                    "
                />

                <span
                    className="
                        text-[7px]
                        uppercase
                        tracking-[0.25em]
                        text-white/35
                        [writing-mode:vertical-rl]
                    "
                >
                    Scroll
                </span>

            </div>

        </section>
    );
}