/**
 * Special offer constants shared by the public tours page and the admin CMS.
 *
 * The backend seeds the original offers with a NULL image_url, so the public
 * page renders the existing bundled cover art keyed by slug (mirroring how the
 * blog renders bundled cover images). Admins can attach a Media upload or an
 * absolute URL, which takes priority over the bundled art.
 */
import { resolveMediaUrl } from '../services/api/cms';
import abuDhabiCityImg from '../assets/home/Abu-Dhabi-City-Tour.webp';
import yasIslandImg from '../assets/home/Yas-Island-Guided-Tour.webp';
import discoverVietnamImg from '../assets/home/Discover-vietnam.webp';
import europeImg from '../assets/home/Europe.webp';
import koreaImg from '../assets/home/Korea.webp';
import hanoiImg from '../assets/home/tours/hanoi.jpg';
import sydneyImg from '../assets/home/tours/sydney.jpg';
import cairnsImg from '../assets/home/tours/cairns.jpg';
import kyotoImg from '../assets/home/tours/kyoto.jpg';

export const SPECIAL_OFFER_STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

export const DEFAULT_SPECIAL_OFFER_IMAGE = europeImg;

/** Bundled art keyed by the seeded special offer slugs. */
export const SPECIAL_OFFER_IMAGE_BY_SLUG = {
    'emirates-palace-abu-dhabi': yasIslandImg,
    'oneandonly-aesthesis': europeImg,
    'oneandonly-one-zaabeel': abuDhabiCityImg,
    'conrad-singapore-marina-bay': discoverVietnamImg,
    'rosewood-hotel-georgia': sydneyImg,
    'corinthia-hotel-london': kyotoImg,
    'fairmont-copley-plaza-boston': cairnsImg,
    'shangri-la-the-shard-london': europeImg,
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