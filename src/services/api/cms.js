import { API_BASE_URL } from '../../config/api';
import { get } from './client';

const CACHE_TTL_MS = 60_000;
const cache = new Map();

async function cachedGet(url) {
    const hit = cache.get(url);
    if (hit) {
        if (hit.timestamp && Date.now() - hit.timestamp < CACHE_TTL_MS) return hit.promise;
        if (!hit.timestamp) return hit.promise; // still in flight — dedupe
    }
    const promise = get(url)
        .then((data) => {
            cache.set(url, { promise, timestamp: Date.now() });
            return data;
        })
        .catch((err) => {
            cache.delete(url);
            throw err;
        });
    cache.set(url, { promise });
    return promise;
}

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
    return cachedGet(`/destinations${toQuery({ page, page_size: pageSize, sort })}`);
}

/**
 * GET /tours — published tours. `category` is one of
 * FIT | GROUP | MICE | HONEYMOON | LUXURY; `destination` is a destination slug.
 */
export async function fetchTours({ page = 1, pageSize = 100, category, destination, sort } = {}) {
    return cachedGet(
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
    return cachedGet(`/tours/${encodeURIComponent(slug)}`);
}

/** Fetch a single published destination by slug. */
export async function fetchDestinationBySlug(slug) {
    return cachedGet(`/destinations/${encodeURIComponent(slug)}`);
}

/**
 * GET /posts — published blog posts. `category` is one of
 * TRAVEL TIPS | DESTINATIONS | INDIA TRAVEL | VIETNAM TRAVEL | JAPAN TRAVEL | SOUTH KOREA TRAVEL | TRAVEL GUIDES.
 */
export async function fetchPosts({ page = 1, pageSize = 100, category, sort = 'published_at' } = {}) {
    return cachedGet(`/posts${toQuery({ page, page_size: pageSize, category, sort })}`);
}

/** Fetch a single published blog post by slug. */
export async function fetchPostBySlug(slug) {
    return cachedGet(`/posts/${encodeURIComponent(slug)}`);
}

/**
 * GET /special-offers — published hotel special offers (public CMS).
 * Resolves to { items, meta }. Always ordered by display_order ascending so
 * the page renders in the configured sequence.
 */
export async function fetchSpecialOffers({ page = 1, pageSize = 100 } = {}) {
    return cachedGet(`/special-offers${toQuery({ page, page_size: pageSize })}`);
}

/**
 * GET /routes — published journey routes (public CMS).
 * Resolves to { items, meta }. Sorted by display order so the Trip matcher
 * presents curated itineraries, newest configuration first.
 */
export async function fetchRoutes({ page = 1, pageSize = 100, sort = 'display_order' } = {}) {
    return cachedGet(`/routes${toQuery({ page, page_size: pageSize, sort })}`);
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
