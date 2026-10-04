import { useCallback, useEffect, useState } from 'react';
import { fetchMediaAssets } from '../../services/api/adminApi';

/**
 * Loads the media asset list (for hero-image pickers in the CMS editors).
 * Root errors degrade to an empty list — the field is optional.
 * `reload()` refetches the list (call it after uploading a new asset).
 */
export function useMediaOptions(enabled = true) {
    const [options, setOptions] = useState([]);
    const [loadedKey, setLoadedKey] = useState(null);
    const [attempt, setAttempt] = useState(0);

    const key = `media-options#${enabled ? 'on' : 'off'}#${attempt}`;
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

    const reload = useCallback(() => setAttempt((n) => n + 1), []);

    return { options, loading, reload };
}

export function mediaLabel(media) {
    if (!media) return '';
    return media.alt_text || media.caption || media.url;
}