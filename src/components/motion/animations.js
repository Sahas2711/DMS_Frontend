import { useEffect, useState, useRef, useCallback } from 'react';

/* ─── Hooks ─── */

export function usePrefersReducedMotion() {
    const [prefersReduced, setPrefersReduced] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handler = (e) => setPrefersReduced(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);
    return prefersReduced;
}

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return isMobile;
}

export function useScrollProgress(ref) {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setProgress(entry.intersectionRatio);
                });
            },
            { threshold: Array.from({ length: 20 }, (_, i) => i / 20) }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);
    return progress;
}

/* ─── Easings ─── */
const E = {
    editorial: [0.16, 1, 0.3, 1],
    cinematic: [0.45, 0, 0.15, 1],
    decelerate: [0, 0, 0.2, 1],
    heavy: [0.22, 1, 0.36, 1],
};

/* ─── Basic Variants ─── */
export const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: E.editorial } },
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: E.editorial } },
};

export const slideUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: E.editorial } },
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: E.editorial } },
};

export const scaleReveal = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: E.editorial } },
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: E.editorial } },
};

export const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: E.editorial } },
};

/* ─── Cinematic / Editorial Variants ─── */

/** Text reveal via clip-path — slides in from left */
export const textReveal = {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1, ease: E.editorial } },
};

/** Text reveal from bottom */
export const textRevealUp = {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    visible: { clipPath: 'inset(0% 0% 0% 0)', transition: { duration: 1, ease: E.editorial } },
};

/** Image reveal via clip-path — wipes from bottom */
export const imageReveal = {
    hidden: { clipPath: 'inset(0 0 100% 0)' },
    visible: { clipPath: 'inset(0 0% 0% 0)', transition: { duration: 1.2, ease: E.editorial } },
};

/** Image reveal from left */
export const imageRevealLeft = {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: { clipPath: 'inset(0 0% 0% 0)', transition: { duration: 1.2, ease: E.editorial } },
};

/** Scale-in with subtle zoom */
export const scaleIn = {
    hidden: { opacity: 0, scale: 1.08 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: E.cinematic } },
};

/** Slow cinematic zoom */
export const cinematicZoom = {
    hidden: { scale: 1 },
    visible: { scale: 1.08, transition: { duration: 8, ease: 'linear' } },
};

export const slideInFromBottom = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: E.editorial } },
};

export const staggerFast = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Cinematic stagger — slower, more deliberate */
export const staggerCinematic = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

/** Line-by-line text reveal for headlines */
export const lineReveal = {
    hidden: { y: '110%', rotateX: -20 },
    visible: { y: '0%', rotateX: 0, transition: { duration: 1, ease: E.editorial } },
};

/** Parallax slide */
export const parallaxSlide = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: E.decelerate } },
};

/** Clip-path cinematic wipe */
export const clipReveal = {
    hidden: { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
    visible: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', transition: { duration: 1.4, ease: E.editorial } },
};

/** Horizontal slide */
export const slideInFromLeft = {
    hidden: { x: -80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1, ease: E.editorial } },
};

/** Slow stagger for sections */
export const staggerSlow = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

/** Destination chapter reveal */
export const chapterReveal = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: E.editorial } },
};

export const chapterExit = {
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40, transition: { duration: 0.5, ease: E.editorial } },
};

/* ─── Magnetic Button Hook ─── */
export function useMagnetic(strength = 0.3) {
    const ref = useRef(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setOffset({ x: x * strength, y: y * strength });
    }, [strength]);

    const handleMouseLeave = useCallback(() => {
        setOffset({ x: 0, y: 0 });
    }, []);

    return { ref, offset, handleMouseMove, handleMouseLeave };
}
