import { API_BASE_URL } from '../../config/api';
import { get } from './client';

function toQuery(params) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') search.set(key, String(value));
    });
    const query = search.toString();
    return query ? `?${query}` : '';
}

/**
 * GET /destinations — published destinations (public CMS).
 * Resolves to { items, meta }.
 */
export async function fetchDestinations({ page = 1, pageSize = 100, sort } = {}) {
    return get(`/destinations${toQuery({ page, page_size: pageSize, sort })}`);
}

/**
 * GET /tours — published tours. `category` is one of
 * FIT | GROUP | MICE | HONEYMOON | LUXURY; `destination` is a destination slug.
 */
export async function fetchTours({ page = 1, pageSize = 100, category, destination, sort } = {}) {
    return get(
        `/tours${toQuery({
            page,
            page_size: pageSize,
            category,
            destination,
            sort,
        })}`
    );
}

/** Fetch a single published tour by slug. */
export async function fetchTourBySlug(slug) {
    return get(`/tours/${encodeURIComponent(slug)}`);
}

/** Fetch a single published destination by slug. */
export async function fetchDestinationBySlug(slug) {
    return get(`/destinations/${encodeURIComponent(slug)}`);
}

/**
 * Resolve a media URL returned by the API into one the browser can load.
 * Absolute URLs (e.g. seeded picsum placeholders or an object-storage CDN) are
 * passed through; relative URLs are prefixed with the API base URL.
 */
export function resolveMediaUrl(url) {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    if (url.startsWith('/')) return `${API_BASE_URL}${url}`;
    return url;
}

/** Best-effort alt text for a media asset object. */
export function mediaAlt(media, fallback = '') {
    if (media && media.alt_text) return media.alt_text;
    return fallback;
}
