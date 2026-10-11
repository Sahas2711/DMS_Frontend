/**
 * Special offer constants shared by the public tours page and the admin CMS.
 *
 * The backend seeds the original offers with a NULL image_url, so the public
 * page renders the existing bundled cover art keyed by slug (mirroring how the
 * blog renders bundled cover images). Admins can attach a Media upload or an
 * absolute URL, which takes priority over the bundled art.
 */
import { resolveMediaUrl } from '../services/api/cms';

// All images sourced from /images/destinations/ (Vietnam) — one unique image per offer.
const abuDhabiCityImg = '/images/destinations/Hanoi.webp';
const yasIslandImg = '/images/destinations/Hue.webp';
const discoverVietnamImg = '/images/destinations/Vietnam-hoi-an.webp';
const europeImg = '/images/destinations/Ha%20Long%20Bay%20%20Lan%20Ha%20Bay.webp';
const koreaImg = '/images/destinations/Ninh%20Binh.webp';
const hanoiImg = '/images/destinations/Ho%20Chi%20Minh%20City.webp';
const sydneyImg = '/images/destinations/Dalat.webp';
const cairnsImg = '/images/destinations/Mekong%20Delta.webp';
const kyotoImg = '/images/destinations/Da-Nang.webp';

export const SPECIAL_OFFER_STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

export const DEFAULT_SPECIAL_OFFER_IMAGE = '/images/destinations/Golden%20Bridge%20at%20Vietnam%20Sunset.webp';

/** Bundled art keyed by the seeded special offer slugs — unique image per slug. */
export const SPECIAL_OFFER_IMAGE_BY_SLUG = {
    'emirates-palace-abu-dhabi': yasIslandImg,
    'oneandonly-aesthesis': '/images/destinations/Sapa.webp',
    'oneandonly-one-zaabeel': abuDhabiCityImg,
    'conrad-singapore-marina-bay': discoverVietnamImg,
    'rosewood-hotel-georgia': sydneyImg,
    'corinthia-hotel-london': kyotoImg,
    'fairmont-copley-plaza-boston': cairnsImg,
    'shangri-la-the-shard-london': '/images/destinations/Sunset%20Karsts%20with%20Lanterns%20and%20Junks.webp',
    'the-fifth-avenue-hotel': hanoiImg,
    'sofitel-legend-the-grand-amsterdam': koreaImg,
    'conservatorium-amsterdam': europeImg,
};

/**
 * Resolve the image to render for a special offer:
 *   1. an admin-set image_url (Media upload or absolute URL),
 *   2. a pre-bundled static offer's `image` (offline fallback),
 *   3. bundled art keyed by the seeded slug,
 *   4. the default offer image.
 */
export function specialOfferImage(offer) {
    return (
        resolveMediaUrl(offer?.image_url) ||
        offer?.image ||
        SPECIAL_OFFER_IMAGE_BY_SLUG[offer?.slug] ||
        DEFAULT_SPECIAL_OFFER_IMAGE
    );
}
