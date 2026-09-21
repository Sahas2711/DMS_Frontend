/**
 * Two-triangle animated star brand icon.
 * Decorative by default — hidden from assistive tech unless given a title.
 * Triangles animate in on mount using CSS keyframes.
 */
const StarIcon = ({ className = 'w-8 h-8 text-white mb-4' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        className={className}
        aria-hidden="true"
        focusable="false"
    >
        <style>{`
            @keyframes tri1 {
                0% { opacity: 0; transform: translateY(8px); }
                100% { opacity: 0.9; transform: translateY(0); }
            }
            @keyframes tri2 {
                0% { opacity: 0; transform: translateX(-8px); }
                100% { opacity: 0.6; transform: translateX(0); }
            }
            .tri1 { animation: tri1 0.6s ease-out 0.2s both; }
            .tri2 { animation: tri2 0.6s ease-out 0.4s both; }
        `}</style>
        {/* Triangle 1 — Large, pointing up */}
        <path
            d="M50 5 L88 78 H12 Z"
            fill="currentColor"
            fillOpacity="0.9"
            className="tri1"
        />
        {/* Triangle 2 — Rotated, overlapping to form 4-pointed star */}
        <path
            d="M30 92 L68 18 L72 22 L34 96 Z"
            fill="currentColor"
            fillOpacity="0.6"
            className="tri2"
        />
    </svg>
);

export default StarIcon;
