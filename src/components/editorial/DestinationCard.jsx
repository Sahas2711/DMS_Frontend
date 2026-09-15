import { Link } from 'react-router-dom';

/**
 * DestinationCard — editorial destination card with hover reveal.
 * Used in the editorial DestinationExplorer.
 */
export default function DestinationCard({
    name,
    tagline,
    image,
    slug,
    className = '',
}) {
    return (
        <Link
            to={`/destination/${slug}`}
            className={`group relative block overflow-hidden ${className}`}
        >
            <div className="aspect-[3/4] overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081634]/80 via-transparent to-transparent transition-all duration-500 group-hover:from-[#081634]/90" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight mb-1">
                    {name}
                </h3>
                {tagline && (
                    <p className="text-sm text-white/60 font-body leading-relaxed max-w-xs">
                        {tagline}
                    </p>
                )}
            </div>

            {/* Corner accent */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>
    );
}
