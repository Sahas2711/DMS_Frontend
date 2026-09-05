/**
 * Single source of truth for brand identity and default SEO metadata.
 *
 * NOTE: the page heroes previously rendered the literal text "ASMALLWORLD",
 * which is a different company's brand and did not match the footer
 * ("Asian Star Travel") or the document title ("Asian Travels"). All three now
 * read from BRAND below — change it here if the legal/marketing name differs.
 */
export const SITE = {
    name: 'Asian Star Travel',
    /** Wordmark shown in page heroes — letter-spaced uppercase treatment. */
    wordmark: 'ASIAN STAR TRAVEL',
    tagline: 'Discover Vietnam: Timeless Charm!',
    description:
        'Asian Star Travel is a Vietnam-based inbound travel company and DMC, crafting private journeys, tailor-made tours, airport fast track and reliable ground services.',
    email: 'info@asianstartravel.vn',
    locale: 'en_US',
    /** Set to the production origin before deploying (used for canonical + OG URLs). */
    url: 'https://www.asianstartravel.vn',
};

/** Per-route metadata. Keys match the canonical route paths in App.jsx. */
export const PAGE_META = {
    '/': {
        title: `${SITE.name} — Private Tours, Transfers & Ground Services in Vietnam`,
        description: SITE.description,
    },
    '/tours': {
        title: `Tours & Itineraries | ${SITE.name}`,
        description:
            'Curated private tours and multi-day itineraries across Vietnam, India and Asia, designed around your pace and travel dates.',
    },
    '/services': {
        title: `Travel Services | ${SITE.name}`,
        description:
            'Tailor-made tours, private transfers, airport fast track, car rental and corporate incentive travel from a licensed Vietnamese DMC.',
    },
    '/services/private-tours': {
        title: `Private Tours & Transfers | ${SITE.name}`,
        description:
            'Comfortable, punctual private cars with professional local drivers between every destination on your itinerary.',
    },
    '/services/tailor-made-tours': {
        title: `Tailor-Made Tours | ${SITE.name}`,
        description:
            'Bespoke private itineraries built around your interests, pace and dates — never off-the-shelf.',
    },
    '/services/airport-fast-track': {
        title: `Airport Fast Track & VIP Clearance | ${SITE.name}`,
        description:
            'Skip the queues with expedited immigration, porter service and VIP assistance on arrival and departure at Hanoi Noi Bai and beyond.',
    },
    '/services/ground-services': {
        title: `Ground Services in India | ${SITE.name}`,
        description:
            'Coordinated terminal support, chauffeur transfers and 24-hour on-duty managers across Indian gateways.',
    },
    '/destination': {
        title: `Destinations | ${SITE.name}`,
        description:
            'Explore our destination portfolio across Vietnam, India, Korea, Europe and the Gulf.',
    },
    '/about': {
        title: `About Us | ${SITE.name}`,
        description:
            'A Vietnam-based inbound travel company and DMC with regional reach, licensed by the Vietnam National Administration of Tourism.',
    },
    '/contact': {
        title: `Contact Us | ${SITE.name}`,
        description:
            'Talk to our team about a private itinerary, airport fast track or ground services. 24/7 dedicated support.',
    },
    '/blog': {
        title: `Travel Journal | ${SITE.name}`,
        description:
            'Destination guides, transit tips and editorial dispatches from our travel specialists.',
    },
    '/trip': {
        title: `Plan Your Trip | ${SITE.name}`,
        description: 'Tell us how you travel and we will match you with the right journey.',
    },
    '/booking': {
        title: `Booking | ${SITE.name}`,
        description: 'Reserve your transfer, fast track or tour with Asian Star Travel.',
    },
    '/checkout': {
        title: `Checkout | ${SITE.name}`,
        description: 'Complete your Asian Star Travel booking.',
        noIndex: true,
    },
    '/privacy-policy': {
        title: `Privacy Policy | ${SITE.name}`,
        description: 'How Asian Star Travel collects, uses and protects your personal data.',
    },
};
