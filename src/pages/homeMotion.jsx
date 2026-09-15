import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { EASE_EDITORIAL } from './motionTokens';

/* ═══════════════════════════════════════════════════════════════════
   HOME MOTION PRIMITIVES
   One easing vocabulary, one scroll architecture (Lenis in App.jsx +
   Framer Motion reading window scroll). No GSAP on the landing page,
   no second RAF loop, no duplicated reveal code per section.
   ═══════════════════════════════════════════════════════════════════ */

/** Serif line that rises out of an overflow mask on first view.
    Static-first: reduced-motion shows content immediately (no opacity:0 gate). */
export function RevealText({ children, as = 'span', delay = 0, duration = 1.1, className = '' }) {
    const reduce = useReducedMotion();
    const Tag = motion[as] || motion.span;
    return (
        <span className="block overflow-hidden">
            <Tag
                className={`block ${className}`}
                initial={reduce ? undefined : { y: '110%' }}
                whileInView={reduce ? undefined : { y: '0%' }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: EASE_EDITORIAL }}
            >
                {children}
            </Tag>
        </span>
    );
}

/** Image inside an overflow-hidden frame; wipes open on first view.
    Static-first: reduced-motion shows content immediately. */
export function ImageReveal({ src, alt = '', className = '', imgClassName = '', delay = 0, priority = false, ratio }) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            className={`overflow-hidden ${className}`}
            style={ratio ? { aspectRatio: ratio } : undefined}
            initial={reduce ? undefined : { clipPath: 'inset(0 0 100% 0)' }}
            whileInView={reduce ? undefined : { clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: reduce ? 0 : 1.3, delay: reduce ? 0 : delay, ease: EASE_EDITORIAL }}
        >
            <img
                src={src}
                alt={alt}
                className={`h-full w-full object-cover ${imgClassName}`}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : 'auto'}
                decoding="async"
            />
        </motion.div>
    );
}

/** Subtle scroll parallax for an image inside a fixed frame. */
export function ParallaxImage({ src, alt = '', className = '', amount = 10, priority = false }) {
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.img
                src={src}
                alt={alt}
                style={reduce ? undefined : { y }}
                className="h-[120%] w-full -mt-[10%] object-cover"
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
            />
        </div>
    );
}

/** Section label — tracked micro type with a hairline. */
export function SectionLabel({ children, tone = 'light', className = '' }) {
    const line = tone === 'light' ? 'bg-gold/40' : 'bg-navy/20';
    const text = tone === 'light' ? 'text-gold/70' : 'text-bronze';
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
            className={`flex items-center gap-4 ${className}`}
        >
            <span className={`h-px w-10 ${line}`} aria-hidden="true" />
            <span className={`text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-[11px] ${text}`}>
                {children}
            </span>
        </motion.div>
    );
}

/** Text link with animated arrow. */
export function ArrowLink({ to, children, tone = 'light', className = '', onClick }) {
    const color = tone === 'light' ? 'text-white/60 hover:text-gold' : 'text-navy hover:text-bronze';
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${color} ${className}`}
        >
            <span>{children}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
        </Link>
    );
}

/** Thin gold rule that draws itself horizontally on first view. */
export function DrawnRule({ tone = 'light', className = '', delay = 0 }) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            aria-hidden="true"
            initial={reduce ? { opacity: 0 } : { scaleX: 0 }}
            whileInView={reduce ? { opacity: 1 } : { scaleX: 1 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: reduce ? 0.4 : 1.4, delay: reduce ? 0 : delay, ease: EASE_EDITORIAL }}
            className={`h-px origin-left ${tone === 'light' ? 'bg-gold/30' : 'bg-navy/15'} ${className}`}
        />
    );
}
