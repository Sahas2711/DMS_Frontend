import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../motion/animations';

/**
 * EditorialCTA — premium call-to-action block with subtle hover animation.
 * Two variants: 'primary' (gold button) and 'secondary' (ghost/outline).
 */
export default function EditorialCTA({
    text,
    href,
    variant = 'primary', // 'primary' | 'secondary' | 'ghost'
    className = '',
}) {
    const prefersReducedMotion = usePrefersReducedMotion();

    const base =
        'inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300';

    const variants = {
        primary:
            'bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold)]/90 hover:shadow-lg hover:shadow-[var(--color-gold)]/20',
        secondary:
            'border border-[var(--color-navy)]/20 text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white',
        ghost:
            'text-[var(--color-navy)] border-b border-[var(--color-navy)]/30 hover:border-[var(--color-navy)] pb-0.5',
    };

    if (prefersReducedMotion) {
        return (
            <Link to={href} className={`${base} ${variants[variant]} ${className}`}>
                {text}
                {variant !== 'ghost' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                )}
            </Link>
        );
    }

    return (
        <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
            <Link to={href} className={`${base} ${variants[variant]} ${className}`}>
                {text}
                {variant !== 'ghost' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                )}
            </Link>
        </motion.div>
    );
}
