/**
 * Homepage content system.
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
const indiaKerala = '/images/home/india-kerala.webp';
const indiaDelhi = '/images/home/india-Delhi.webp';
const indiaJaipur = '/images/home/india-Jaipur.webp';
const indiaHeritage = '/images/home/India-heritage.webp';
const indiaCulture = '/images/home/India-culture.webp';
const indiaCuisine = '/images/home/India-Cousine.webp';
const indiaWildlife = '/images/home/India-wildlife.webp';
const indiaVaranasi = '/images/home/India-Varanasi.png';

const vietnamHanoi = '/images/home/Vietnam-Hanoi.webp';
const vietnamHalong = '/images/home/Vietnam-ha-long-bay.webp';
const vietnamHoian = '/images/home/Vietnam-hoi-an.webp';
const vietnamSaigon = '/images/home/Vietnam-ho-chi-minh-city.webp';
const vietnamCulture = '/images/home/Vietnam-culture.webp';
const vietnamCuisine = '/images/home/Vietnam-Cousin.webp';
const vietnamNature = '/images/home/Vietnam-Nature.webp';

const japanTokyo = '/images/home/Japan-tokyo.webp';
const japanKyoto = '/images/home/Japan-kyota.webp';
const japanOsaka = '/images/home/Japan-osaka.webp';
const japanHeritage = '/images/home/Japan-Heritage.webp';
const japanNature = '/images/home/Japan-Nature.webp';
const japanMountFuji = '/images/home/Japan-mount-fuji.webp';

const koreaSeoul = '/images/home/Korea-Seoul.webp';
const koreaBusan = '/images/home/Korea-busan.webp';
const koreaJeju = '/images/home/Korea-Jeju.png';
const koreaGyeongju = '/images/home/Korea-Gyengo.webp';
const koreaCulture = '/images/home/Korea-Culture.webp';
const koreaNature = '/images/home/Korea-Nature.webp';

const journalFeature = '/images/blogs/travel-journal-section-image.webp';
const journalDispatch = '/images/blogs/editors-dispatch.webp';
const journalDestinations = '/images/blogs/DESTINATIONS.webp';

export const HOME_IMAGES = {
    india: {
        cover: indiaKerala,
        editorial: indiaHeritage,
        gallery: [indiaDelhi, indiaJaipur, indiaCulture, indiaCuisine, indiaWildlife, indiaVaranasi],
    },
    vietnam: {
        cover: vietnamHanoi,
        editorial: vietnamHoian,
        gallery: [vietnamHalong, vietnamSaigon, vietnamCulture, vietnamCuisine, vietnamHanoi],
    },
    japan: {
        cover: japanKyoto,
        editorial: japanTokyo,
        gallery: [japanTokyo, japanOsaka, japanKyoto],
    },
    'south-korea': {
        cover: koreaSeoul,
        editorial: koreaCulture,
        gallery: [koreaSeoul, koreaBusan, koreaJeju, koreaGyeongju, koreaNature],
    },
    journal: { feature: japanMountFuji, dispatch: vietnamCulture, destinations: koreaCulture },
    cta: indiaHeritage,
};

/**
 * The four destinations. Copy follows the existing /destination page;
 * heroRatio marks which assets are portrait (art-directed crops depend on it).
 */
export const DESTINATIONS = [
    {
        id: 'india',
        name: 'India',
        number: '01',
        tagline: 'In all its colour and contrast',
        copy: 'A country that overwhelms the senses in the best possible way — ancient forts, sacred rivers, chaotic bazaars, and extraordinary warmth.',
        regions: ['Rajasthan', 'Kerala', 'Ladakh', 'Goa', 'Varanasi'],
        chapter: 'Chapter 01 — The Subcontinent',
        meta: [
            { label: 'Regions', value: 'North to South' },
            { label: 'Signature', value: 'Golden Triangle' },
            { label: 'Style', value: 'Heritage & Wild' },
        ],
        image: HOME_IMAGES.india.cover,
        imageAlt: 'Kerala heritage — traditional houseboat on the backwaters, India',
        route: '/destination/delhi',
        heroRatio: 'portrait',
    },
    {
        id: 'vietnam',
        name: 'Vietnam',
        number: '02',
        tagline: 'Crafted around your curiosity',
        copy: 'From Ha Long Bay limestone karsts to lantern-lit streets of Hoi An, Vietnam rewards those who travel slowly and observe closely.',
        regions: ['Hanoi', 'Ha Long Bay', 'Hoi An', 'Ho Chi Minh City', 'Phu Quoc'],
        chapter: 'Chapter 02 — The Long Coast',
        meta: [
            { label: 'Length', value: '1,600 km of coast' },
            { label: 'Signature', value: 'Ha Long & Ninh Binh' },
            { label: 'Style', value: 'Street & Scenic' },
        ],
        image: HOME_IMAGES.vietnam.cover,
        imageAlt: 'Hanoi old quarter, Vietnam',
        route: '/destination/ha-long-bay',
        heroRatio: 'landscape',
    },
    {
        id: 'japan',
        name: 'Japan',
        number: '03',
        tagline: 'Where every detail has meaning',
        copy: 'Precision and beauty in every corner — from temple gardens to ramen stalls, Japan is an exercise in mindful travel.',
        regions: ['Tokyo', 'Kyoto', 'Osaka', 'Hokkaido', 'Okinawa'],
        chapter: 'Chapter 03 — The Archipelago',
        meta: [
            { label: 'Seasons', value: 'Five distinct' },
            { label: 'Signature', value: 'Rail & Ryokan' },
            { label: 'Style', value: 'Craft & Calm' },
        ],
        image: HOME_IMAGES.japan.cover,
        imageAlt: 'Kyoto temple rooftops, Japan',
        route: '/destination/tokyo',
        heroRatio: 'landscape',
    },
    {
        id: 'south-korea',
        name: 'South Korea',
        number: '04',
        tagline: 'A meeting of tradition and momentum',
        copy: 'Korea blends ancient palace culture with modern energy — a destination for food lovers, art enthusiasts, and design-driven travellers.',
        regions: ['Seoul', 'Busan', 'Jeju Island', 'Gyeongju', 'Incheon'],
        chapter: 'Chapter 04 — The Peninsula',
        meta: [
            { label: 'Contrast', value: 'Hanok to Hannam' },
            { label: 'Signature', value: 'Seoul Design Trail' },
            { label: 'Style', value: 'Design & Food' },
        ],
        image: HOME_IMAGES['south-korea'].cover,
        imageAlt: 'South Korea — traditional palace architecture',
        route: '/destination/seoul',
        heroRatio: 'portrait',
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
        image: HOME_IMAGES.india.gallery[3], // indiaCuisine
        imageAlt: 'Heritage architecture in Maharashtra, India',
    },
    {
        id: 'culinary',
        name: 'Culinary',
        line: 'Street food tours, market mornings and private cooking sessions with locals.',
        detail: 'From Hanoi night markets to Osaka alleyways — eaten where it is actually made.',
        tripType: 'FIT',
        image: HOME_IMAGES.vietnam.gallery[1], // vietnamSaigon
        imageAlt: 'Street food scene in Saigon, Vietnam',
    },
    {
        id: 'nature',
        name: 'Nature & Scenic',
        line: 'From Himalayan foothills to Ha Long Bay — landscapes that move you.',
        detail: 'Slow routes, small lodges and the long view, planned around light and season.',
        tripType: 'GROUP',
        image: HOME_IMAGES.vietnam.gallery[0], // vietnamHalong
        imageAlt: 'Ha Long Bay limestone karsts, Vietnam',
    },
    {
        id: 'family',
        name: 'Family Journeys',
        line: 'Thoughtfully paced for families — engaging for all ages, seamless for parents.',
        detail: 'Room logic, rest days and guides who keep teenagers as engaged as grandparents.',
        tripType: 'GROUP',
        image: HOME_IMAGES.japan.gallery[2], // japanKyoto
        imageAlt: 'Temples and gardens in Kyoto, Japan',
    },
    {
        id: 'honeymoon-luxury',
        name: 'Honeymoon & Luxury',
        line: 'Private villas, curated experiences, slow mornings in beautiful places.',
        detail: 'The finest stays across all four destinations, choreographed down to the transfer.',
        tripType: 'HONEYMOON',
        image: HOME_IMAGES.india.gallery[0], // indiaDelhi
        imageAlt: 'Mountain light in Darjeeling, India',
    },
    // {
    //     id: 'wellness',
    //     name: 'Wellness',
    //     line: 'Rituals, retreats, hot springs — and the space to breathe.',
    //     detail: 'Onsen circuits, ashram mornings and coastal silence, at a pace that restores.',
    //     tripType: 'LUXURY',
    //     image: HOME_IMAGES.india.gallery[1], // Himachal
    //     imageAlt: 'Mountain valley in Himachal Pradesh, India',
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
        image: HOME_IMAGES.india.gallery[4], // indiaWildlife
        imageAlt: 'Tea country landscape in Assam, India',
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
        image: HOME_IMAGES.japan.gallery[0], // japanTokyo
        imageAlt: 'Tokyo cityscape at dusk, Japan',
    },
    {
        number: '04',
        title: 'Operational Precision',
        body: 'Meticulous planning and 24/7 ground support — the kind of detail only an on-the-ground operator can provide.',
        image: HOME_IMAGES['south-korea'].gallery[0],
        imageAlt: 'Traditional Korean architecture',
    },
];

/**
 * Curated journeys — titles/durations carried from the existing homepage and
 * Tours.jsx fallback data. slugs map to real /tours/:slug detail pages.
 */
export const JOURNEYS = [
    {
        slug: 'golden-triangle-rajasthan',
        title: 'The Golden Triangle',
        destination: 'India',
        days: '10 days',
        route: ['Delhi', 'Agra', 'Jaipur'],
        copy: 'The classic route reimagined with private access and curated moments.',
        image: HOME_IMAGES.india.cover,
        imageAlt: 'Kerala backwaters at golden hour, India',
    },
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
        slug: 'japan-rail-ryokan',
        title: 'Rail & Ryokan',
        destination: 'Japan',
        days: '11 days',
        route: ['Tokyo', 'Hakone', 'Kyoto'],
        copy: 'Bullet trains, mountain ryokans and the art of slow travel through Japan.',
        image: HOME_IMAGES.japan.gallery[2],
        imageAlt: 'Temple gardens in Kyoto, Japan',
    },
    {
        slug: 'seoul-busan-korean',
        title: 'Seoul Design Trail',
        destination: 'South Korea',
        days: '7 days',
        route: ['Seoul', 'Gyeongju', 'Busan'],
        copy: 'Hanok villages, contemporary galleries and the creative pulse of Seoul.',
        image: HOME_IMAGES['south-korea'].gallery[0],
        imageAlt: 'Traditional Korean palace architecture',
    },
    {
        slug: 'kerala-backwaters',
        title: 'Kerala Backwaters',
        destination: 'India',
        days: '8 days',
        route: ['Kochi', 'Alleppey', 'Munnar'],
        copy: 'Houseboat journeys, spice plantations and the quiet green of southern India.',
        image: HOME_IMAGES.india.cover,
        imageAlt: 'Kerala backwaters, India',
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
];

/**
 * Journal — editorial stories. Titles come from the existing homepage /
 * journal content; every entry links to the live /blog index.
 */
export const JOURNAL_STORIES = [
    {
        slug: null, // editorial feature — links to /blog
        title: 'The Art of Slow Travel in Japan',
        kicker: 'Journal — 01',
        excerpt: 'Why the best journeys take their time: temple mornings, onsen afternoons, and the beauty of unhurried days.',
        date: 'March 2026',
        image: HOME_IMAGES.journal.feature,
        imageAlt: 'Travel journal — slow travel through Japan',
    },
    {
        slug: null,
        title: 'Vietnam Beyond the Guidebook',
        kicker: 'Journal — 02',
        excerpt: 'Hidden villages, family-run eateries, and the moments that turn a trip into a story.',
        date: 'February 2026',
        image: HOME_IMAGES.journal.destinations,
        imageAlt: 'Vietnam destination editorial',
    },
    {
        slug: null,
        title: 'Design-Led Seoul: A Creative Guide',
        kicker: 'Journal — 03',
        excerpt: 'From Bukchon hanok to Gangnam galleries — the spaces shaping Korea’s visual culture.',
        date: 'January 2026',
        image: HOME_IMAGES['south-korea'].gallery[0],
        imageAlt: 'Seoul design guide — traditional hanok architecture',
    },
];

/** Real B2B capabilities surfaced in the hero metadata rail (from /experiences). */
export const HERO_CAPABILITIES = ['FIT', 'Groups', 'MICE', 'Honeymoon', 'Luxury'];
