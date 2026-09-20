/* ═══════════════════════════════════════════════════════════════════
   TOPOGRAPHIC FIELD — STATIC SVG
   
   Static-first: No WebGL, no RAF loops, just a decorative SVG.
   This ensures reliable rendering across all devices and browsers.
   ═══════════════════════════════════════════════════════════════════ */

export default function TopographicField({ className = '' }) {
    const lines = Array.from({ length: 13 }, (_, index) => index);

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        >
            <svg
                className="h-full w-full opacity-70"
                viewBox="0 0 1200 600"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <linearGradient
                        id="topographic-fade"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                    >
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="35%" stopColor="white" stopOpacity="0.8" />
                        <stop offset="70%" stopColor="white" stopOpacity="0.65" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                </defs>

                <g fill="none" strokeLinecap="round" opacity="0.7">
                    {lines.map((i) => {
                        const y = 60 + i * 44;

                        return (
                            <path
                                key={i}
                                d={`
                                    M -80 ${y}
                                    C 120 ${y - 65},
                                      250 ${y + 55},
                                      430 ${y - 10}
                                    S 760 ${y - 70},
                                      930 ${y + 5}
                                    S 1110 ${y + 55},
                                      1280 ${y - 25}
                                `}
                                stroke={
                                    i % 4 === 1
                                        ? 'rgba(197,168,105,0.34)'
                                        : 'rgba(255,255,255,0.10)'
                                }
                                strokeWidth="1"
                            />
                        );
                    })}
                </g>
            </svg>
        </div>
    );
}