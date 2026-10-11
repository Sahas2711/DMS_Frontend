/**
 * Homepage content system.
 *
 *
 * SOURCES OF TRUTH:
 *  - Business facts (destinations, trip types, emails, address) come from
 *    src/config/site.js and src/config/enquiry.js — never invented here.
 *  - Copy is carried over from the existing homepage / destination pages.
 *  - Imagery uses the project's bundled assets (src/assets/...). No external
 *    hotlinks: Unsplash URLs from the previous build were removed.
 *
 * Nothing in this file may claim certifications, statistics or partnerships
 * that the rest of the project does not already state.
 */
const vietnamHanoi = '/images/home/Vietnam-Hanoi.webp';
const vietnamHalong = '/images/home/Vietnam-ha-long-bay.webp';
const vietnamHoian = '/images/home/Vietnam-hoi-an.webp';
const vietnamSaigon = '/images/home/Vietnam-ho-chi-minh-city.webp';
const vietnamCulture = '/images/home/Vietnam-culture.webp';
const vietnamCuisine = '/images/home/Vietnam-Cousin.webp';

// const landingHero = '/images/home/vietnam-Hanoi.webp';
// const landingPage2 = '/images/home/LAnding_page_2.webp';
// const landingPage3 = '/images/home/Landing_page_3.webp';

export const HOME_IMAGES = {    landing: {
        hero: vietnamHanoi,
        page2: vietnamHalong,
        page3: vietnamHoian,
    },    vietnam: {
        cover: vietnamHanoi,
        editorial: vietnamHoian,
        gallery: [vietnamHalong, vietnamSaigon, vietnamCulture, vietnamCuisine, vietnamHanoi],
    },    journal: { feature: vietnamHoian, dispatch: vietnamCulture, destinations: vietnamHalong },
    cta: vietnamHanoi,
};

/**
 * The only destination displayed on the site. Every other destination data has
 * been commented out (not deleted) per the brief.
 */
export const DESTINATIONS = [
    {
        id: 'vietnam',
        name: 'Vietnam',
        tagline: 'Crafted around your curiosity',
        copy: 'From Ha Long Bay limestone karsts to lantern-lit streets of Hoi An, Vietnam rewards those who travel slowly and observe closely.',
        regions: ['Hanoi', 'Ha Long Bay', 'Hoi An', 'Ho Chi Minh City', 'Phu Quoc'],
        chapter: 'Chapter 02 — The Long Coast',
        meta: [
            { label: 'Length', value: '1,600 km of coast' },
            { label: 'Signature', value: 'Ha Long & Ninh Binh' },
            { label: 'Style', value: 'Street & Scenic' },
        ],
        image: '/images/home/Vietnam-hero-image.webp',
        imageAlt: 'Vietnam — Ha Long Bay limestone karsts',
        route: '/destination/ha-long-bay',
        heroRatio: 'landscape',
    },
];

/**
 * Travel styles — the six experience themes from the brief, which map onto the
 * enquiry form's trip types (FIT, GROUP, MICE, HONEYMOON, LUXURY) plus the
 * content themes used across the existing site. Each pairs with an image and a
 * supporting line drawn from existing homepage copy.
 */
export const TRAVEL_STYLES = [
    {
        id: 'culture',
        name: 'Culture & Heritage',
        line: 'Temples, palaces and living traditions — travel with context and meaning.',
        detail: 'Private access, historians and guides who read a site the way locals do.',
        tripType: 'FIT',
        image: '/images/destinations/Hue.webp',
        imageAlt: 'Heritage architecture in Hue, Vietnam',
    },
    // Indian cuisine entry removed — only Vietnam is active.
    {
        id: 'culinary',
        name: 'Culinary',
        line: 'Street food tours, market mornings and private cooking sessions with locals.',
        detail: 'From Hanoi night markets to Osaka alleyways — eaten where it is actually made.',
        tripType: 'FIT',
        image: '/images/home/Mekong_Delta.webp',
        imageAlt: 'Indian cuisine and culinary experiences',
    },
    {
        id: 'nature',
        name: 'Nature & Scenic',
        line: 'From Himalayan foothills to Ha Long Bay — landscapes that move you.',
        detail: 'Slow routes, small lodges and the long view, planned around light and season.',
        tripType: 'GROUP',
        image: '/images/home/Vietnam-Nature.webp',
        imageAlt: 'Lush green landscapes in Vietnam',
    },
    {
        id: 'family',
        name: 'Family Journeys',
        line: 'Thoughtfully paced for families — engaging for all ages, seamless for parents.',
        detail: 'Room logic, rest days and guides who keep teenagers as engaged as grandparents.',
        tripType: 'GROUP',
        image: '/images/home/Family-Stays.webp',
        imageAlt: 'Family-friendly travel experiences',
    },
    // {
    //     id: 'honeymoon-luxury',
    //     name: 'Honeymoon & Luxury',
    //     line: 'Private villas, curated experiences, slow mornings in beautiful places.',
    //     detail: 'The finest stays across all four destinations, choreographed down to the transfer.',
    //     tripType: 'HONEYMOON',
    //     image: '/images/home/Honey-Moon.webp',
    //     imageAlt: 'Romantic honeymoon with cherry blossoms and Mount Fuji',
    // },
    // {
    //     id: 'wellness',
    //     name: 'Wellness & Slow Travel',
    //     line: 'Rituals, retreats, hot springs — and the space to breathe.',
    //     detail: 'Onsen circuits, ashram mornings and coastal silence, at a pace that restores.',
    //     tripType: 'LUXURY',
    //     image: '/images/home/Himachal-Pradesh.webp',
    //     imageAlt: 'Mountain wellness retreat in Himachal Pradesh, India',
    // },
];

/**
 * B2B capability presentation. The four pillars are the project's real
 * messaging (TravelTrade.jsx / Aboutus.jsx): destination-led planning,
 * tailor-made programmes, responsive communication, operational precision.
 */
export const CAPABILITIES = [
    {
        number: '01',
        title: 'Destination-Led Planning',
        body: 'Programmes begin with the place, not the price list. Local teams in every destination — embedded partners who know every road and relationship.',
        // image: HOME_IMAGES.india.gallery[4], // indiaWildlife
        // imageAlt: 'Tea country landscape in Assam, India',
    },
    {
        number: '02',
        title: 'Tailor-Made Programmes',
        body: 'Every itinerary is built from scratch. No templates, no shortcuts — your clients get a journey designed exclusively for them.',
        image: HOME_IMAGES.vietnam.gallery[3], // vietnamCuisine
        imageAlt: 'Lantern-lit streets of Hoi An, Vietnam',
    },
    {
        number: '03',
        title: 'Responsive Communication',
        body: 'One trade desk, one business day. A single point of contact who knows your business, from first brief to final transfer.',
        image: HOME_IMAGES.vietnam.gallery[0],
        imageAlt: 'Ha Long Bay limestone karsts, Vietnam',
    },
    {
        number: '04',
        title: 'Operational Precision',
        body: 'Meticulous planning and 24/7 ground support — the kind of detail only an on-the-ground operator can provide.',
        image: HOME_IMAGES.vietnam.gallery[1],
        imageAlt: 'Ho Chi Minh City skyline, Vietnam',
    },
];

/**
 * Curated journeys — titles/durations carried from the existing homepage and
 * Tours.jsx fallback data. slugs map to real /tours/:slug detail pages.
 */
export const JOURNEYS = [
    {
        slug: 'ha-long-bay-hoi-an',
        title: 'Ha Long & Hoi An',
        destination: 'Vietnam',
        days: '8 days',
        route: ['Hanoi', 'Ha Long', 'Hoi An'],
        copy: 'Emerald waters, hidden caves and lantern-lit evenings — Vietnam at its most poetic.',
        image: HOME_IMAGES.vietnam.gallery[0],
        imageAlt: 'Ha Long Bay limestone karsts, Vietnam',
    },
    {
        slug: 'sapa-trekking',
        title: 'Sapa & The Highlands',
        destination: 'Vietnam',
        days: '6 days',
        route: ['Hanoi', 'Sapa'],
        copy: 'Terraced rice fields and homestays with local families in northern Vietnam.',
        image: HOME_IMAGES.vietnam.gallery[4],
        imageAlt: 'Hanoi old quarter, Vietnam',
    },
    {
        slug: 'vietnam-hanoi-hoian',
        title: 'North to Central Vietnam',
        destination: 'Vietnam',
        days: '10 days',
        route: ['Hanoi', 'Ha Long', 'Hue', 'Hoi An'],
        copy: 'From the Old Quarter to the ancient town — Vietnam’s cultural spine in one journey.',
        image: HOME_IMAGES.vietnam.gallery[2],
        imageAlt: 'Hanoi old quarter, Vietnam',
    },
    {
        slug: 'mekong-delta',
        title: 'Mekong Delta & Saigon',
        destination: 'Vietnam',
        days: '7 days',
        route: ['Ho Chi Minh City', 'Mekong Delta'],
        copy: 'Floating markets, river life and the southern energy of Vietnam — a world away from the north.',
        image: HOME_IMAGES.vietnam.gallery[1],
        imageAlt: 'Ho Chi Minh City skyline, Vietnam',
    },
];

/**
 * Journal — editorial stories. Titles come from the existing homepage /
 * journal content; every entry links to the live /blog index.
 */
export const JOURNAL_STORIES = [
    {
        slug: null,
        title: 'Vietnam Beyond the Guidebook',
        kicker: 'Journal — 02',
        excerpt: 'Hidden villages, family-run eateries, and the moments that turn a trip into a story.',
        date: 'February 2026',
        image: HOME_IMAGES.journal.destinations,
        imageAlt: 'Vietnam destination editorial',
    },
];

/**
 * Real B2B capabilities surfaced in the hero metadata rail (from /experiences).
 */
export const HERO_CAPABILITIES = ['FIT', 'Groups', 'MICE', 'Honeymoon', 'Luxury'];
