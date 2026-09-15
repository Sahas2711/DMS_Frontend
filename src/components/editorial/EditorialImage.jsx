import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../motion/animations';

/**
 * EditorialImage — cinematic image with optional caption.
 * Supports full-bleed, inset, or asymmetric layouts.
 */
export default function EditorialImage({
    src,
    alt,
    caption,
    layout = 'full', // 'full' | 'inset' | 'asymmetric'
    className = '',
}) {
    const prefersReducedMotion = usePrefersReducedMotion();

    const layoutClasses = {
        full: 'w-full',
        inset: 'w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
        asymmetric: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    };

    const imageVariants = prefersReducedMotion
        ? {}
        : {
              hidden: { opacity: 0, scale: 1.08 },
              visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
          };

    return (
        <figure className={`${layoutClasses[layout]} ${className}`}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={imageVariants}
                className="overflow-hidden"
            >
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                />
            </motion.div>
            {caption && (
                <figcaption className="mt-3 text-sm text-[var(--color-sand)]/60 font-body">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
