import { motion, useReducedMotion } from 'framer-motion';

export default function Hero() {
    const reduce = useReducedMotion();
    const heroImage = '/images/home/hro-image-1.webp';

    return (
        <section
            id="home-main"
            aria-label="Asian Star Travels"
            className="
                relative isolate flex w-full
                h-[calc(100svh-72px)]
                min-h-[480px] max-h-[900px]
                items-center justify-center
                overflow-hidden bg-navy-deep
                sm:min-h-[560px]
                lg:min-h-[650px]
            "
        >
            {/* Existing WebP background with its original star */}
            <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: reduce ? 0 : 0.9,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
                className="absolute inset-0 -z-20"
            >
                <img
                    src={heroImage}
                    alt=""
                    aria-hidden="true"
                    className="
                        h-full w-full
                        object-cover object-center
                    "
                    decoding="async"
                    loading="eager"
                    fetchPriority="high"
                />
            </motion.div>

            {/* Subtle overlay for readable text */}
            <div
                aria-hidden="true"
                className="
                    absolute inset-0 -z-10
                    bg-gradient-to-b
                    from-transparent
                    via-navy-deep/5
                    to-navy-deep/40
                "
            />

            {/* Brand text positioned below the existing star */}
            <motion.div
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: reduce ? 0 : 0.9,
                    delay: reduce ? 0 : 0.15,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="
                    relative mx-auto flex w-full max-w-7xl
                    flex-col items-center text-center
                    px-4
                    pt-28
                    sm:px-8 sm:pt-36
                    md:pt-40
                    lg:pt-44
                "
            >
                {/* Company name */}
                <h1
                    className="
                        max-w-full
                        font-display font-normal
                        uppercase text-white
                        leading-[1.05]
                        tracking-[0.09em]
                        drop-shadow-[0_3px_14px_rgba(0,0,0,0.45)]
                        text-[clamp(1.15rem,5.1vw,4.8rem)]
                    "
                >
                    Asian Star Travel
                </h1>

                {/* Tagline */}
                <div
                    className="
                        mt-5 flex w-full max-w-3xl
                        items-center justify-center
                        gap-2.5
                        sm:mt-6 sm:gap-5
                        md:mt-7
                    "
                >
                    <span
                        aria-hidden="true"
                        className="h-px w-6 shrink-0 bg-white/75 sm:w-14 md:w-20"
                    />

                    <p
                        className="
                            max-w-[80%]
                            text-[9px] font-medium uppercase
                            leading-relaxed tracking-[0.12em]
                            text-white
                            drop-shadow-md
                            sm:text-xs sm:tracking-[0.2em]
                            md:text-base md:tracking-[0.24em]
                        "
                    >
                        Journeys That Bring Us Closer
                    </p>

                    <span
                        aria-hidden="true"
                        className="h-px w-6 shrink-0 bg-white/75 sm:w-14 md:w-20"
                    />
                </div>
            </motion.div>
        </section>
    );
}
