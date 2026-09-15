import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../motion/animations';

/**
 * RevealOnScroll — reliable scroll-triggered reveal that works after SPA navigation.
 * Uses Framer Motion's whileInView which re-evaluates on mount.
 * 
 * @param {string} direction - 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
 * @param {number} delay - delay in seconds
 * @param {number} duration - duration in seconds
 * @param {string} className - additional classes
 */
const variants = {
    up: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    down: {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0 },
    },
    left: {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    },
    right: {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.92 },
        visible: { opacity: 1, scale: 1 },
    },
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
};

export default function RevealOnScroll({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.8,
    className = '',
    amount = 0.2,
    viewportOnce = true,
}) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const v = variants[direction] || variants.up;

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: viewportOnce, amount }}
            variants={v}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * StaggerContainer — reveals children in sequence on scroll.
 */
export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.1,
    initialDelay = 0.1,
    amount = 0.15,
    viewportOnce = true,
}) {
    const prefersReducedMotion = usePrefersReducedMotion();

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: viewportOnce, amount }}
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: staggerDelay, delayChildren: initialDelay } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * StaggerItem — child of StaggerContainer. Each item fades up on scroll.
 */
export function StaggerItem({ children, className = '' }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
