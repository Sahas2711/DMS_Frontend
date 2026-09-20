import { motion, useReducedMotion } from 'framer-motion';
import { HOME_IMAGES } from '../homeContent';
import { RouteLine } from './RoutePath';

/*
 * ═══════════════════════════════════════════════════════════════════
 * EDITORIAL INTRO — CINEMATIC / COMPACT
 *
 * Design intent:
 * - Headline is one visual line on desktop
 * - Supporting copy sits beside the headline
 * - Image begins quickly after the header
 * - Image is the dominant visual element
 * - No unnecessary viewport-height whitespace
 * - Animation enhances the composition without hiding content
 * - Mobile becomes an intentional vertical composition
 * ═══════════════════════════════════════════════════════════════════
 */

const FACTS = [
    {
        value: 'India · Vietnam · Japan · South Korea',
        label: 'Destinations we operate',
    },
    {
        value: 'FIT · Groups · MICE',
        label: 'Programme types',
    },
    {
        value: 'One trade desk',
        label: 'From first brief to final transfer',
    },
];

const EASE = [0.16, 1, 0.3, 1];

export default function EditorialIntro() {
    const reduce = useReducedMotion();

    return (
        <section
            aria-label="Editorial statement"
            className="
                relative
                overflow-hidden
                bg-ivory
                text-navy
            "
        >
            {/* ═════════════════════════════════════════════════════
                HEADER
            ═════════════════════════════════════════════════════ */}

            <div
                className="
                    mx-auto
                    max-w-[1600px]
                    px-5
                    pt-14
                    sm:px-8
                    sm:pt-16
                    lg:px-12
                    lg:pt-20
                "
            >
                {/* Section label */}

                <motion.div
                    initial={
                        reduce
                            ? false
                            : {
                                  opacity: 0,
                                  x: -15,
                              }
                    }
                    whileInView={
                        reduce
                            ? undefined
                            : {
                                  opacity: 1,
                                  x: 0,
                              }
                    }
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: 0.6,
                        ease: EASE,
                    }}
                    className="
                        flex
                        items-center
                        gap-4
                    "
                >
                    <span
                        aria-hidden="true"
                        className="
                            h-px
                            w-10
                            bg-gold/60
                        "
                    />

                    <span
                        className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.32em]
                            text-bronze
                        "
                    >
                        Beyond the surface
                    </span>
                </motion.div>

                {/* ═════════════════════════════════════════════════
                    MAIN EDITORIAL ROW

                    Desktop:
                    headline ←→ supporting copy

                    Mobile:
                    headline
                    supporting copy
                ═════════════════════════════════════════════════ */}

                <div
                    className="
                        mt-6
                        grid
                        items-end
                        gap-7
                        lg:grid-cols-[minmax(0,1fr)_320px]
                        lg:gap-16
                    "
                >
                    {/* HEADLINE */}

                    <h2
                        className="
                            whitespace-nowrap
                            font-display
                            text-[clamp(3rem,6.5vw,7.5rem)]
                            leading-[0.88]
                            tracking-[-0.055em]
                            max-[1100px]:text-[clamp(2.7rem,5.8vw,5.5rem)]
                            max-[767px]:whitespace-normal
                            max-[767px]:text-[clamp(3.1rem,14vw,5.8rem)]
                        "
                    >
                        <motion.span
                            initial={
                                reduce
                                    ? false
                                    : {
                                          opacity: 0,
                                          x: -25,
                                      }
                            }
                            whileInView={
                                reduce
                                    ? undefined
                                    : {
                                          opacity: 1,
                                          x: 0,
                                      }
                            }
                            viewport={{
                                once: true,
                                amount: 0.3,
                            }}
                            transition={{
                                duration: 0.85,
                                ease: EASE,
                            }}
                        >
                            Asia is not
                        </motion.span>

                        {/* SPACE IS INTENTIONAL */}
                        {' '}

                        <motion.span
                            initial={
                                reduce
                                    ? false
                                    : {
                                          opacity: 0,
                                          x: 25,
                                      }
                            }
                            whileInView={
                                reduce
                                    ? undefined
                                    : {
                                          opacity: 1,
                                          x: 0,
                                      }
                            }
                            viewport={{
                                once: true,
                                amount: 0.3,
                            }}
                            transition={{
                                duration: 0.85,
                                delay: reduce ? 0 : 0.08,
                                ease: EASE,
                            }}
                            className="inline-block"
                        >
                            one story
                            <span className="text-gold">
                                .
                            </span>
                        </motion.span>
                    </h2>

                    {/* SUPPORTING COPY */}

                    <motion.p
                        initial={
                            reduce
                                ? false
                                : {
                                      opacity: 0,
                                      y: 15,
                                  }
                        }
                        whileInView={
                            reduce
                                ? undefined
                                : {
                                      opacity: 1,
                                      y: 0,
                                  }
                        }
                        viewport={{
                            once: true,
                            amount: 0.3,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: reduce ? 0 : 0.18,
                            ease: EASE,
                        }}
                        className="
                            max-w-[320px]
                            text-[13px]
                            leading-[1.8]
                            text-navy/60
                            lg:pb-1
                        "
                    >
                        Every destination has its own rhythm,
                        character and way of moving. We build
                        programmes around the details that make
                        each place feel real.
                    </motion.p>
                </div>

                {/* ═════════════════════════════════════════════════
                    ROUTE LINE
                ═════════════════════════════════════════════════ */}

                <motion.div
                    initial={
                        reduce
                            ? false
                            : {
                                  opacity: 0,
                                  scaleX: 0,
                              }
                    }
                    whileInView={
                        reduce
                            ? undefined
                            : {
                                  opacity: 1,
                                  scaleX: 1,
                              }
                    }
                    viewport={{
                        once: true,
                        amount: 0.5,
                    }}
                    transition={{
                        duration: 0.9,
                        delay: reduce ? 0 : 0.15,
                        ease: EASE,
                    }}
                    style={{
                        transformOrigin: 'left center',
                    }}
                    className="
                        mt-6
                        w-full
                        max-w-[640px]
                    "
                >
                    <RouteLine tone="navy" />
                </motion.div>
            </div>

            {/* ═════════════════════════════════════════════════════
                LARGE CINEMATIC IMAGE
            ═════════════════════════════════════════════════════ */}

            <CinematicImage reduce={reduce} />

            {/* ═════════════════════════════════════════════════════
                FACT STRIP
            ═════════════════════════════════════════════════════ */}

            <FactStrip reduce={reduce} />
        </section>
    );
}


/* ═══════════════════════════════════════════════════════════════════
   CINEMATIC IMAGE
   ═══════════════════════════════════════════════════════════════════ */

function CinematicImage({ reduce }) {
    return (
        <div
            className="
                mx-auto
                max-w-[1600px]
                px-5
                pt-6
                sm:px-8
                sm:pt-8
                lg:px-12
                lg:pt-9
            "
        >
            <motion.div
                initial={
                    reduce
                        ? false
                        : {
                              opacity: 0,
                              y: 25,
                          }
                }
                whileInView={
                    reduce
                        ? undefined
                        : {
                              opacity: 1,
                              y: 0,
                          }
                }
                viewport={{
                    once: true,
                    amount: 0.08,
                }}
                transition={{
                    duration: 0.9,
                    ease: EASE,
                }}
                className="
                    group
                    relative
                    h-[58vh]
                    min-h-[420px]
                    max-h-[760px]
                    overflow-hidden
                    sm:h-[62vh]
                    lg:h-[68vh]
                "
            >
                {/* IMAGE */}

                <motion.div
                    initial={
                        reduce
                            ? false
                            : {
                                  scale: 1.1,
                              }
                    }
                    whileInView={
                        reduce
                            ? undefined
                            : {
                                  scale: 1,
                              }
                    }
                    viewport={{
                        once: true,
                        amount: 0.08,
                    }}
                    transition={{
                        duration: 1.8,
                        ease: EASE,
                    }}
                    className="
                        absolute
                        inset-0
                        will-change-transform
                    "
                >
                    <img
                        src={HOME_IMAGES.india.editorial}
                        alt="Heritage architecture in Telangana, India"
                        className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-[1800ms]
                            ease-[cubic-bezier(0.16,1,0.3,1)]
                            group-hover:scale-[1.025]
                        "
                        loading="lazy"
                        decoding="async"
                    />
                </motion.div>

                {/* CINEMATIC GRADIENT */}

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-navy-deep/85
                        via-navy-deep/15
                        to-transparent
                    "
                />

                {/* LEFT DEPTH */}

                <div
                    aria-hidden="true"
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-navy-deep/30
                        via-transparent
                        to-transparent
                    "
                />

                {/* ═══════════════════════════════════════════════
                    IMAGE TOP LABEL
                ═══════════════════════════════════════════════ */}

                <div
                    className="
                        absolute
                        left-5
                        top-5
                        flex
                        items-center
                        gap-3
                        sm:left-7
                        sm:top-7
                        lg:left-9
                        lg:top-9
                    "
                >
                    <span
                        className="
                            font-display
                            text-[12px]
                            tracking-[0.2em]
                            text-white
                        "
                    >
                        01
                    </span>

                    <span
                        aria-hidden="true"
                        className="
                            h-px
                            w-8
                            bg-gold
                        "
                    />

                    <span
                        className="
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.25em]
                            text-white/75
                        "
                    >
                        India
                    </span>
                </div>

                {/* ═══════════════════════════════════════════════
                    RIGHT FIELD NOTE
                ═══════════════════════════════════════════════ */}

                <div
                    className="
                        absolute
                        right-5
                        top-5
                        hidden
                        max-w-[200px]
                        border-l
                        border-gold/60
                        pl-3
                        text-[8px]
                        uppercase
                        leading-[1.7]
                        tracking-[0.2em]
                        text-white/75
                        sm:block
                        sm:right-7
                        sm:top-7
                        lg:right-9
                        lg:top-9
                    "
                >
                    Planned from the ground —
                    from first brief to final transfer.
                </div>

                {/* ═══════════════════════════════════════════════
                    LARGE IMAGE MESSAGE
                ═══════════════════════════════════════════════ */}

                <motion.div
                    initial={
                        reduce
                            ? false
                            : {
                                  opacity: 0,
                                  y: 30,
                              }
                    }
                    whileInView={
                        reduce
                            ? undefined
                            : {
                                  opacity: 1,
                                  y: 0,
                              }
                    }
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 0.9,
                        delay: reduce ? 0 : 0.18,
                        ease: EASE,
                    }}
                    className="
                        absolute
                        bottom-7
                        left-5
                        right-5
                        sm:bottom-9
                        sm:left-7
                        sm:right-7
                        lg:bottom-12
                        lg:left-9
                        lg:right-9
                    "
                >
                    <p
                        className="
                            max-w-[1000px]
                            font-display
                            text-[clamp(1.7rem,3.5vw,3.8rem)]
                            italic
                            leading-[1.02]
                            tracking-[-0.03em]
                            text-white
                        "
                    >
                        Every country has its own rhythm —
                        <br className="hidden md:block" />

                        <span className="text-gold">
                            we build journeys around feeling it,
                        </span>{' '}
                        not just seeing it.
                    </p>
                </motion.div>

                {/* LOCATION */}

                <span
                    className="
                        absolute
                        bottom-4
                        right-5
                        text-[8px]
                        uppercase
                        tracking-[0.2em]
                        text-white/45
                        sm:bottom-6
                        sm:right-7
                    "
                >
                    Telangana · India
                </span>
            </motion.div>
        </div>
    );
}


/* ═══════════════════════════════════════════════════════════════════
   FACT STRIP
   ═══════════════════════════════════════════════════════════════════ */

function FactStrip({ reduce }) {
    return (
        <div
            className="
                mx-auto
                max-w-[1600px]
                px-5
                pb-14
                pt-7
                sm:px-8
                lg:px-12
                lg:pb-16
                lg:pt-8
            "
        >
            <ol
                className="
                    grid
                    grid-cols-1
                    border-t
                    border-navy/15
                    sm:grid-cols-3
                "
            >
                {FACTS.map((fact, index) => (
                    <motion.li
                        key={fact.label}
                        initial={
                            reduce
                                ? false
                                : {
                                      opacity: 0,
                                      y: 10,
                                  }
                        }
                        whileInView={
                            reduce
                                ? undefined
                                : {
                                      opacity: 1,
                                      y: 0,
                                  }
                        }
                        viewport={{
                            once: true,
                            amount: 0.25,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: reduce
                                ? 0
                                : index * 0.07,
                            ease: EASE,
                        }}
                        className="
                            relative
                            border-b
                            border-navy/15
                            py-5
                            sm:border-b-0
                            sm:border-r
                            sm:px-7
                            sm:first:pl-0
                            sm:last:border-r-0
                        "
                    >
                        <span
                            aria-hidden="true"
                            className="
                                absolute
                                left-0
                                top-0
                                h-px
                                w-8
                                bg-gold
                                sm:left-7
                            "
                        />

                        <p
                            className="
                                text-[12px]
                                font-semibold
                                leading-[1.5]
                                tracking-wide
                                text-navy
                            "
                        >
                            {fact.value}
                        </p>

                        <p
                            className="
                                mt-1.5
                                text-[9px]
                                uppercase
                                tracking-[0.2em]
                                text-bronze/75
                            "
                        >
                            {fact.label}
                        </p>
                    </motion.li>
                ))}
            </ol>
        </div>
    );
}