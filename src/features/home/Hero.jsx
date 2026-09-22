import { motion, useReducedMotion } from 'framer-motion';

export default function Hero() {
    const reduce = useReducedMotion();
    const heroImage = '/images/home/Landing_page_wih_star1.webp';

    return (
        <section
            id="home-main"
            aria-label="Asian Star Travel — B2B DMC for India, Vietnam, Japan & South Korea"
            className="relative w-full bg-navy-deep"
        >
            <motion.div
                initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={reduce ? { duration: 0 } : { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <img
                    src={heroImage}
                    alt="Asian Star Travel"
                    className="block w-full h-auto object-contain"
                    decoding="async"
                    loading="eager"
                />
            </motion.div>
        </section>
    );
}
