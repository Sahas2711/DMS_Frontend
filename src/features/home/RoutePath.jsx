import { motion, useReducedMotion } from 'framer-motion';
import { useId } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   ROUTE SYSTEM — the page-wide signature metaphor.
   Thin gold route lines that draw themselves between diamond waypoints,
   plus coordinate micro-labels and ghost numerals. Every major scene
   borrows this same visual language so the homepage reads as ONE
   continuous journey rather than stacked sections.
   ═══════════════════════════════════════════════════════════════════ */

/** Horizontal route line that draws itself when scrolled into view. */
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

/**
 * Vertical route rail with waypoints — used beside lists to express
 * "stops on a journey". `progress` (0..1) fills the line gold.
 */
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
 * A thin route draws India → Vietnam → Japan → South Korea as one
 * continuous path across a stylized coordinate grid; destination nodes
 * pulse in sequence as the page loads. Pure SVG, ~60 lines, no libraries,
 * reduced-motion renders it fully drawn and static.
 */
export function AsiaRouteMap({ className = '' }) {
    const reduce = useReducedMotion();
    const gid = useId().replace(/:/g, '');
    // One flowing path: India (left, low) → Vietnam (center, low) → Japan (right, mid) → South Korea (right-upper)
    const ROUTE = 'M28 96 C 70 66, 112 88, 152 78 S 210 34, 236 40';

    const nodes = [
        { x: 28, y: 96, name: 'INDIA' },
        { x: 128, y: 84, name: 'VIETNAM' },
        { x: 200, y: 46, name: 'SOUTH KOREA' },
        { x: 236, y: 40, name: 'JAPAN' },
    ];

    const nodeSequence = reduce ? 0 : 1.9; // seconds after mount before nodes start pulsing in

    return (
        <svg
            viewBox="0 0 260 130"
            className={className}
            role="img"
            aria-label="Route across Asia connecting India, Vietnam, South Korea and Japan"
        >
            <title>Asian Star Travel route network</title>
            <defs>
                <pattern id={`grid-${gid}`} width="26" height="26" patternUnits="userSpaceOnUse">
                    <path d="M26 0H0V26" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect width="260" height="130" fill={`url(#grid-${gid})`} />

            {/* Suggested coastline hint — abstract, three quiet strokes */}
            <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1">
                <path d="M12 118 C 40 96, 52 74, 78 66 C 96 60, 108 66, 124 92" />
                <path d="M136 96 C 158 78, 168 62, 192 58" />
                <path d="M206 64 C 222 62, 234 56, 246 44" />
            </g>

            {/* The route — draws itself */}
            <motion.path
                d={ROUTE}
                fill="none"
                stroke="#c5a869"
                strokeWidth="1.25"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={reduce ? { pathLength: 1 } : { pathLength: 1 }}
                transition={{ duration: 2.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Waypoint diamonds enter in sequence */}
            {nodes.map((n, i) => (
                <motion.g
                    key={n.name}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.4 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: nodeSequence + i * 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                >
                    <rect
                        x={n.x - 3.25} y={n.y - 3.25} width="6.5" height="6.5"
                        transform={`rotate(45 ${n.x} ${n.y})`}
                        fill={i === 0 ? '#c5a869' : '#050e22'}
                        stroke="#c5a869"
                        strokeWidth="1"
                    />
                    <text
                        x={n.x} y={n.y - 10}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.55)"
                        fontSize="6.5"
                        letterSpacing="1.5"
                        fontFamily="Inter, sans-serif"
                    >
                        {n.name}
                    </text>
                </motion.g>
            ))}
        </svg>
    );
}
