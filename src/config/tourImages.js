/**
 * Destination-specific fallback images for tours.
 * Used when backend doesn't provide hero_media for a tour.
 * Maps destination slug/country to appropriate local image.
 */

export const TOUR_FALLBACK_IMAGES = {
    // India destinations
    delhi: '/images/home/india-Delhi.webp',
    jaipur: '/images/home/india-Jaipur.webp',
    kerala: '/images/home/india-kerala.webp',
    'golden-triangle': '/images/home/India-heritage.webp',
    india: '/images/home/India-hero-image.webp',

    // Vietnam destinations
    hanoi: '/images/home/Vietnam-Hanoi.webp',
    'ha-long-bay': '/images/home/Vietnam-ha-long-bay.webp',
    'hoi-an': '/images/home/Vietnam-hoi-an.webp',
    'da-nang': '/images/home/Vietnam-ha-long-bay.webp',
    'ho-chi-minh-city': '/images/home/Vietnam-ho-chi-minh-city.webp',
    sapa: '/images/home/Vietnam-Nature.webp',
    vietnam: '/images/home/Vietnam-hero-image.webp',

    // Japan destinations
    tokyo: '/images/home/Japan-tokyo.webp',
    kyoto: '/images/home/Japan-kyota.webp',
    osaka: '/images/home/Japan-osaka.webp',
    hiroshima: '/images/home/Japan-Heritage.webp',
    sapporo: '/images/home/Japan-Nature.webp',
    japan: '/images/home/Japan-hero-image.webp',

    // South Korea destinations
    seoul: '/images/home/Korea-Seoul.webp',
    busan: '/images/home/Korea-busan.webp',
    jeju: '/images/home/Korea-Jeju.png',
    gyeongju: '/images/home/Korea-Gyengo.webp',
    korea: '/images/home/South-Korea-hero-image.webp',
    'south-korea': '/images/home/South-Korea-hero-image.webp',
};

/**
 * Tour-slug-specific fallback images for differentiation within same destination.
 * Allows different tours in the same destination to show different images.
 */
export const TOUR_SLUG_FALLBACK_IMAGES = {
    // India tours
    'delhi-heritage-walk': '/images/home/india-Delhi.webp',
    'golden-triangle-classic': '/images/home/India-heritage.webp',
    'jaipur-royal-rajasthan': '/images/home/india-Jaipur.webp',
    'kerala-backwaters-cruise': '/images/home/india-kerala.webp',

    // Vietnam tours
    'hanoi-old-quarter-street-food': '/images/home/Vietnam-Hanoi.webp',
    'ha-long-bay-overnight-cruise': '/images/home/Vietnam-ha-long-bay.webp',
    'hoi-an-riverside-cooking-class': '/images/home/Vietnam-hoi-an.webp',
    'da-nang-marble-mountains-beaches': '/images/home/Vietnam-ha-long-bay.webp',
    'mekong-delta-day-trip': '/images/home/Vietnam-ho-chi-minh-city.webp',
    'hanoi-conference-mice-package': '/images/home/Vietnam-Hanoi.webp',

    // Japan tours
    'tokyo-temples-and-traditions': '/images/home/Japan-tokyo.webp',
    'kyoto-luxury-geisha-cultural-tour': '/images/home/Japan-kyota.webp',
    'osaka-street-food-nightlife-tour': '/images/home/Japan-osaka.webp',
    'sapporo-snow-festival-winter-tour': '/images/home/Japan-Nature.webp',
    'tokyo-mice-corporate-incentive-tour': '/images/home/Japan-tokyo.webp',
    'mt-fuji-hakone-honeymoon-escape': '/images/home/Japan-mount-fuji.webp',
    'osaka-castle-history-draft': '/images/home/Japan-osaka.webp',

    // South Korea tours
    'seoul-busan-korean': '/images/home/Korea-Seoul.webp',
    'jeju-gyeongju': '/images/home/Korea-Jeju.png',
};

/**
 * Get fallback image for a tour based on its destination.
 * @param {string} destinationSlug - The destination slug (e.g., 'delhi', 'hanoi')
 * @param {string} destinationCountry - The destination country (e.g., 'India', 'Vietnam')
 * @returns {string} - Path to fallback image
 */
export function getTourFallbackImage(destinationSlug, destinationCountry) {
    // Try exact destination slug match first
    if (destinationSlug && TOUR_FALLBACK_IMAGES[destinationSlug]) {
        return TOUR_FALLBACK_IMAGES[destinationSlug];
    }

    // Fall back to country-level image
    const countryKey = (destinationCountry || '').toLowerCase();
    if (countryKey && TOUR_FALLBACK_IMAGES[countryKey]) {
        return TOUR_FALLBACK_IMAGES[countryKey];
    }

    // Ultimate fallback
    return '/images/home/hero-image-home.webp';
}

/**
 * Get fallback image for a tour object from API.
 * Checks tour-slug-specific image first, then destination-based fallback.
 * @param {Object} tour - Tour object with destination property
 * @returns {string} - Path to fallback image
 */
export function getTourFallbackImageFromTour(tour) {
    const tourSlug = tour?.slug;
    if (tourSlug && TOUR_SLUG_FALLBACK_IMAGES[tourSlug]) {
        return TOUR_SLUG_FALLBACK_IMAGES[tourSlug];
    }
    const destSlug = tour?.destination?.slug;
    const destCountry = tour?.destination?.country;
    return getTourFallbackImage(destSlug, destCountry);
}