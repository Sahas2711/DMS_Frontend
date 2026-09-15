import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Shared reveal primitive for all inner pages.
 * Rises from below with a fade — fires once per element.
 * Every page imports this instead of defining its own Rise.
 */
export default function Rise({ children, delay = 0, className = '', as = 'div' }) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            as={as}
            initial={reduce ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay, ease: EASE }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
