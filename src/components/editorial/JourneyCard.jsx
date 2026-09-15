import { Link } from 'react-router-dom';

/**
 * JourneyCard — editorial card for curated itineraries.
 * Large image, overlay text, hover reveal. Used in CuratedJourneys section and page.
 */
export default function JourneyCard({
    title,
    duration,
    destination,
    slug,
    image,
    category,
    className = '',
}) {
    return (
        <Link
            to={`/tours/${slug}`}
            className={`group relative block overflow-hidden ${className}`}
        >
            <div className="aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Dark overlay that intensifies on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081634]/80 via-[#081634]/20 to-transparent transition-opacity duration-500 group-hover:from-[#081634]/90" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                {category && (
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a869]/80 font-medium mb-2 block">
                        {category}
                    </span>
                )}
                <h3 className="font-display text-xl sm:text-2xl text-white leading-tight mb-1">
                    {title}
                </h3>
                <div className="flex items-center gap-3 text-sm text-white/70">
                    {destination && <span>{destination}</span>}
                    {duration && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-white/40" />
                            <span>{duration}</span>
                        </>
                    )}
                </div>
            </div>

            {/* Hover arrow */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
            </div>
        </Link>
    );
}
