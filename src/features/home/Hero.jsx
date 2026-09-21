import { motion, useReducedMotion } from 'framer-motion';

import { HOME_IMAGES } from '../../pages/homeContent';


/*
╔═══════════════════════════════════════════════════════════════════╗
║                         ASIAN STAR HERO                           ║
║                                                                   ║
║  Static hero banner — single image                                ║
║                                                                   ║
║  IMAGE                                                            ║
║    ↓                                                              ║
║  CENTERED TEXT                                                    ║
╚═══════════════════════════════════════════════════════════════════╝
*/


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
    ease: [0.25, 0.1, 0.25, 1],
};


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


export default function Hero() {
    const reduce = useReducedMotion();

    const heroImage = HOME_IMAGES.landing.hero;


    return (
        <section
            aria-label="Asian Star Travel — B2B DMC for India"

            className="
                relative
                min-h-[760px]
                overflow-hidden
                bg-navy-deep
                text-white

                lg:h-[calc(100svh-84px)]
                lg:min-h-[760px]
            "
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

                <motion.div
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
                        src={heroImage}
                        alt="Asian Star Travels — Journeys That Bring Us Closer"
                        className="
                            h-full
                            w-full
                            object-cover
                        "
                        decoding="async"
                        loading="eager"
                    />

                </motion.div>


                {/* Bottom readability */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-navy-deep/80
                        via-transparent
                        to-navy-deep/40
                    "
                />


                {/* Very subtle vignette */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(3,12,32,0.2)_70%,rgba(3,12,32,0.5)_100%)]
                    "
                />

            </div>


            {/* ═══════════════════════════════════════════════════════
                CENTERED TEXT OVERLAY
            ═══════════════════════════════════════════════════════ */}


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
