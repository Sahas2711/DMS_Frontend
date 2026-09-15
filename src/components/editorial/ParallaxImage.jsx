import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ParallaxImage — image with subtle parallax scroll effect.
 * Wraps the image in an overflow-hidden container and translates it on scroll.
 */
export default function ParallaxImage({
    src,
    alt,
    className = '',
    imageClassName = '',
    speed = 0.15,
    aspectRatio = '4/3',
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

    return (
        <div ref={ref} className={`overflow-hidden ${className}`} style={{ aspectRatio }}>
            <motion.img
                src={src}
                alt={alt}
                style={{ y, scale: 1.15 }}
                className={`w-full h-full object-cover ${imageClassName}`}
                loading="lazy"
            />
        </div>
    );
}
