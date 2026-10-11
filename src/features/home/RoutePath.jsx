/**
 * ROUTE SYSTEM — the page-wide signature metaphor.
 * Thin gold route lines that draw themselves between diamond waypoints,
 * plus coordinate micro-labels and ghost numerals. Every major scene
 * borrows this same visual language so the homepage reads as ONE
 * continuous journey rather than stacked sections.
 */

/** Horizontal route line that draws itself when scrolled into view. */

import { motion, useReducedMotion } from 'framer-motion';
export function RouteLine({ className = '', tone = 'gold', delay = 0.15 }) {
    const reduce = useReducedMotion();
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 220 12"
            preserveAspectRatio="none"
            className={`block h-[12px] w-full ${className}`}
        >
            <motion.line
                x1="2" y1="6" x2="218" y2="6"
                stroke={tone === 'gold' ? '#c5a869' : tone === 'navy' ? '#081634' : 'rgba(255,255,255,0.35)'}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                initial={reduce ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 1 }}
                whileInView={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 1 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
                d="M218 1.5 L216.5 6 L218 10.5"
                fill="none"
                stroke={tone === 'gold' ? '#c5a869' : tone === 'navy' ? '#081634' : 'rgba(255,255,255,0.35)'}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                initial={reduce ? { opacity: 0.3 } : { opacity: 0 }}
                whileInView={reduce ? { opacity: 1 } : { opacity: 1 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.5, delay: delay + 1.2 }}
            />
        </svg>
    );
}

/** Vertical route rail with waypoints — used beside lists to express "stops on a journey". `progress` (0..1) fills the line gold. */
export function RouteRail({ stops, activeIndex = 0, progress = 1, className = '' }) {
    return (
        <div className={`relative pl-7 ${className}`} aria-hidden="true">
            {/* Static base line */}
            <span className="absolute bottom-2 left-[3px] top-2 w-px bg-white/12" />
            {/* Gold fill */}
            <motion.span
                className="absolute left-[3px] top-2 w-px bg-gold"
                style={{ height: `${Math.round(Math.min(1, Math.max(0, progress)) * 100)}%`, maxHeight: 'calc(100% - 16px)' }}
            />
            {stops.map((s, i) => (
                <span
                    key={s}
                    className="absolute left-0 flex h-[7px] w-[7px] items-center justify-center"
                    style={{ top: `${(i / Math.max(1, stops.length - 1)) * 100}%`, marginTop: -3 }}
                >
                    <span className={`h-[7px] w-[7px] rotate-45 border transition-colors duration-500 ${i <= activeIndex ? 'border-gold bg-gold/70' : 'border-white/30 bg-navy-deep'}`} />
                </span>
            ))}
        </div>
    );
}

/** Micro coordinate label — e.g. "21.0278° N — 105.8342° E". */
export function Coordinate({ text, className = '' }) {
    return (
        <span className={`font-mono text-[9px] uppercase tracking-[0.22em] opacity-40 ${className}`}>
            {text}
        </span>
    );
}

/** Oversized ghost numeral behind editorial content. */
export function GhostNumeral({ children, className = '' }) {
    const reduce = useReducedMotion();
    return (
        <motion.span
            aria-hidden="true"
            initial={reduce ? { opacity: 0.05 } : { opacity: 0, x: 40 }}
            whileInView={reduce ? { opacity: 0.05 } : { opacity: 0.055, x: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-none select-none font-display leading-none ${className}`}
        >
            {children}
        </motion.span>
    );
}

/**
 * THE HERO SIGNATURE — an abstract route map of Asia as a single SVG.
 * A thin route draws Vietnam as a single waypoint on a stylized coordinate
 * grid; destination node pulses on mount. Pure SVG, no libraries,
 * reduced-motion renders it fully drawn and static.
 */
export function AsiaRouteMap({ className = '' }) {
    const reduce = useReducedMotion();
    // Single waypoint: Vietnam (center, low)
    const ROUTE = 'M60 96 C 60 66, 88 88, 152 78 S 236 34, 236 40';

    const nodes = [
        { x: 152, y: 78, name: 'VIETNAM' },
    ];

    const nodeSequence = reduce ? 0 : 1.9; // seconds after mount before nodes start pulsing in

    return (
        <svg
            role="img"
            aria-label="Route across Asia connecting Vietnam"
            viewBox="0 0 240 130"
            preserveAspectRatio="none"
            className={`block w-full ${className}`}
        >
            <path
                d={ROUTE}
                fill="none"
                stroke="#c5a869"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0.3 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.circle
                cx={152} cy={78} r={6}
                fill="#050e22" stroke="#c5a869" strokeWidth="2.5"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1.15, opacity: 1 }}
                transition={{ duration: 0.6, delay: nodeSequence, ease: [0.16, 1, 0.3, 1] }}
            >
                <animate
                    attributeName="r"
                    values="4;6;4"
                    keyTimes="0;0.5;1"
                    dur="2.2s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="opacity"
                    values="0.5;1;0.5"
                    keyTimes="0;0.5;1"
                    dur="2.2s"
                    repeatCount="indefinite"
                />
            </motion.circle>
            {nodes.map((n, i) => (
                <motion.span
                    key={n.name + i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: nodeSequence + 0.2 + i * 0.15 }}
                    className="absolute left-0 top-0 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-gold whitespace-nowrap pointer-events-none"
                    style={{ transform: 'translateX(-50%) translateY(-100%)', left: n.x, top: n.y }}
                >
                    {n.name}
                </motion.span>
            ))}
        </svg>
    );
}
