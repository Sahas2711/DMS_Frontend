/**
 * Destination-specific fallback images for tours.
 * Used when backend doesn't provide hero_media for a tour.
 * Maps destination slug/country to appropriate local image.
 * All images sourced from /images/destinations/ (Vietnam).
 */

const D = {
    hanoi: '/images/destinations/Hanoi.webp',
    haLong: '/images/destinations/Ha%20Long%20Bay%20%20Lan%20Ha%20Bay.webp',
    hcmc: '/images/destinations/Ho%20Chi%20Minh%20City.webp',
    hoiAn: '/images/destinations/Vietnam-hoi-an.webp',
    hue: '/images/destinations/Hue.webp',
    sapa: '/images/destinations/Sapa.webp',
    ninhBinh: '/images/destinations/Ninh%20Binh.webp',
    mekong: '/images/destinations/Mekong%20Delta.webp',
    daNang: '/images/destinations/Da-Nang.webp',
    dalat: '/images/destinations/Dalat.webp',
    goldenBridge: '/images/destinations/Golden%20Bridge%20at%20Vietnam%20Sunset.webp',
    sunsetKarsts: '/images/destinations/Sunset%20Karsts%20with%20Lanterns%20and%20Junks.webp',
    mistySapa: '/images/destinations/Misty%20Terraces%20of%20Sapa,%20Vietnam.webp',
    hoiAnJpg: '/images/destinations/Hoi%20An.webp',
    brandShoot: '/images/destinations/Large-Vietnam2024_BrandShoot-034-e1718707274522.webp',
    img175: '/images/destinations/image_1754044694.webp',
    imagesJpg: '/images/destinations/images.webp',
    images1: '/images/destinations/images%20(1).webp',
};

export const TOUR_FALLBACK_IMAGES = {
    // India destinations (replaced with Vietnam destination images)
    delhi: D.hanoi,
    jaipur: D.hue,
    kerala: D.ninhBinh,
    'golden-triangle': D.dalat,
    india: D.hcmc,

    // Vietnam destinations
    hanoi: D.hanoi,
    'ha-long-bay': D.haLong,
    'hoi-an': D.hoiAn,
    'da-nang': D.daNang,
    'ho-chi-minh-city': D.hcmc,
    sapa: D.sapa,
    vietnam: D.goldenBridge,

    // Japan destinations (replaced with Vietnam destination images)
    tokyo: D.haLong,
    kyoto: D.hoiAn,
    osaka: D.daNang,
    hiroshima: D.sapa,
    sapporo: D.mistySapa,
    japan: D.goldenBridge,

    // South Korea destinations (replaced with Vietnam destination images)
    seoul: D.mekong,
    busan: D.sunsetKarsts,
    jeju: D.hoiAnJpg,
    gyeongju: D.brandShoot,
    korea: D.img175,
    'south-korea': D.imagesJpg,
};

/**
 * Tour-slug-specific fallback images for differentiation within same destination.
 * Allows different tours in the same destination to show different images.
 */
export const TOUR_SLUG_FALLBACK_IMAGES = {
    // India tours (replaced with Vietnam destination images)
    'delhi-heritage-walk': D.images1,
    'golden-triangle-classic': D.dalat,
    'jaipur-royal-rajasthan': D.hue,
    'kerala-backwaters-cruise': D.ninhBinh,

    // Vietnam tours
    'hanoi-old-quarter-street-food': D.hanoi,
    'ha-long-bay-overnight-cruise': D.haLong,
    'hoi-an-riverside-cooking-class': D.hoiAn,
    'da-nang-marble-mountains-beaches': D.daNang,
    'mekong-delta-day-trip': D.mekong,
    'hanoi-conference-mice-package': D.brandShoot,

    // Japan tours (replaced with Vietnam destination images)
    'tokyo-temples-and-traditions': D.hcmc,
    'kyoto-luxury-geisha-cultural-tour': D.sunsetKarsts,
    'osaka-street-food-nightlife-tour': D.mekong,
    'sapporo-snow-festival-winter-tour': D.mistySapa,
    'tokyo-mice-corporate-incentive-tour': D.img175,
    'mt-fuji-hakone-honeymoon-escape': D.goldenBridge,
    'osaka-castle-history-draft': D.imagesJpg,

    // South Korea tours (replaced with Vietnam destination images)
    'seoul-busan-korean': D.images1,
    'jeju-gyeongju': D.hoiAnJpg,
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
    return '/images/destinations/Hanoi.webp';
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
