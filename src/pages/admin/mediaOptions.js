import { useEffect, useState } from 'react';
import { fetchMediaAssets } from '../../services/api/adminApi';

/**
 * Loads the media asset list (for hero-image pickers in the CMS editors).
 * Root errors degrade to an empty list — the field is optional.
 */
export function useMediaOptions(enabled = true) {
    const [options, setOptions] = useState([]);
    const [loadedKey, setLoadedKey] = useState(null);

    const key = `media-options#${enabled ? 'on' : 'off'}`;
    const loading = enabled && loadedKey !== key;

    useEffect(() => {
        if (!enabled) return undefined;
        let cancelled = false;
        fetchMediaAssets({ page_size: 100 })
            .then((r) => {
                if (!cancelled) {
                    setOptions(r.items || []);
                    setLoadedKey(key);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setOptions([]);
                    setLoadedKey(key);
                }
            });
        return () => {
            cancelled = true;
        };
    }, [enabled, key]);

    return { options, loading };
}

export function mediaLabel(media) {
    if (!media) return '';
    return media.alt_text || media.caption || media.url;
}