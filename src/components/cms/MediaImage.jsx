import { useState } from 'react';
import { resolveMediaUrl } from '../../services/api/cms';

/**
 * Image that resolves CMS media URLs against the API base and falls back to a
 * styled placeholder when the URL is missing, malformed or fails to load —
 * so a broken/missing image never leaves an empty hole in the layout.
 */
const MediaImage = ({ src, alt = '', fallbackChar = '', className = '' }) => {
    const [failed, setFailed] = useState(false);
    const resolved = resolveMediaUrl(src);
    const showFallback = !resolved || failed;

    if (showFallback) {
        return (
            <div
                role="img"
                aria-label={alt || undefined}
                className={`bg-gradient-to-br from-navy via-navy-light to-[#2c4368] flex items-center justify-center ${className}`}
            >
                {fallbackChar && (
                    <span className="text-white/80 font-serif text-3xl select-none" aria-hidden="true">
                        {fallbackChar}
                    </span>
                )}
            </div>
        );
    }

    return (
        <img
            src={resolved}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className={className}
        />
    );
};

export default MediaImage;
