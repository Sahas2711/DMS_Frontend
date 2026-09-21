import { motion, useReducedMotion } from 'framer-motion';


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


export default function Hero() {
    const reduce = useReducedMotion();

    const heroImage = '/images/home/Landing_page_wih_star1.webp';


    return (
        <section
            aria-label="Asian Star Travel — B2B DMC for India"

            className="
                relative
                w-full
                overflow-hidden
                bg-navy-deep
                text-white
            "
        >

            {/* ═══════════════════════════════════════════════════════
                BACKGROUND IMAGE
            ═══════════════════════════════════════════════════════ */}

            <div
                className="
                    relative
                    w-full
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
                        will-change-transform
                    "
                >

                    <img
                        src={heroImage}
                        alt="Asian Star Travels — Journeys That Bring Us Closer"
                        className="
                            block
                            h-auto
                            w-full
                        "
                        decoding="async"
                        loading="eager"
                    />

                </motion.div>

            </div>


            {/* ═══════════════════════════════════════════════════════
                SCROLL INDICATOR
            ═══════════════════════════════════════════════════════ */}

            <div
                className="
                    absolute
                    right-5
                    bottom-8
                    z-20
                    hidden
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
