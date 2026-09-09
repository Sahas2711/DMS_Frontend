import travelJournalImg from '../assets/blogs/travel-journal-section-image.webp';
import editorsDispatchImg from '../assets/blogs/editors-dispatch.webp';
import vietnamTravelImg from '../assets/blogs/VIETNAM-TRAVEL.webp';
import destinationsImg from '../assets/blogs/DESTINATIONS.webp';
import travelTipsImg from '../assets/blogs/TRAVEL-TIPS.webp';
import { resolveMediaUrl } from '../services/api/cms';

// The seeded posts ship without a cover_image_url; map their slugs to the
// bundled cover art the static journal historically used. Newly created CMS
// posts render their own cover_image_url (media library or absolute URL).
export const POST_IMAGE_BY_SLUG = {
    'timeless-waters-navigating-the-karst-labyrinths-in-indochine-grandeur': travelJournalImg,
    'the-connoisseurs-guide-to-seamless-international-transit-at-hanoi-noi-bai': editorsDispatchImg,
    'hanois-hidden-french-colonial-cafes-architectural-walking-guide': vietnamTravelImg,
    'chasing-the-golden-season-mu-cang-chais-terraced-highlands': destinationsImg,
    'essential-vietnam-visa-on-arrival-fast-track-protocol-2025': travelTipsImg,
};

export const DEFAULT_POST_IMAGE = editorsDispatchImg;

/** Resolve the cover for a post: uploaded/absolute URL first, bundled art by slug. */
export function postImage(post) {
    return resolveMediaUrl(post?.cover_image_url) || POST_IMAGE_BY_SLUG[post?.slug] || DEFAULT_POST_IMAGE;
}