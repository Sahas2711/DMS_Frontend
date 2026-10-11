/**
 * Single source of truth for brand identity and default SEO metadata.
 *
 * Business contact:
 *   info@asianstartravels.com
 *
 * Offices:
 *   Mumbai Head Office
 *   Ho Chi Minh City
 *   Hanoi
 */

export const SITE = {
    name: 'Asian Star Travel',

    /** Wordmark shown in page heroes. */
    wordmark: 'ASIAN STAR TRAVEL',

    tagline: 'Your Trusted Vietnam DMC Partner',

    description:
        'Asian Star Travel is a B2B destination management company crafting private journeys, FIT and group programs, MICE, honeymoon and luxury experiences across Vietnam.',

    /** Public contact email used throughout the website. */
    email: 'info@asianstartravels.com',

    /** Public telephone used in contact page structured data. */
    telephone: '+842438289999',

    /** Relative path to the brand logo asset. */
    logo: '/logo.jpeg',

    locale: 'en_US',

    /** Production website origin. */
    url: 'https://www.asianstartravel.vn',

    /**
     * Mumbai Head Office.
     * Used as the registeredAddress field by existing components.
     */
    registeredAddress:
        '93 Palladian, 2nd Floor, Unit number 212, Chakala, Andheri (E) - 400093',

    /**
     * Vietnam offices.
     * Office names and addresses are displayed together in the footer.
     */
    vietnamOffices: [
        'Ho Chi Minh City — No. 4 Nguyen Thi Minh Khai Street, Sai Gon Ward, Ho Chi Minh City',
        'Hanoi — No. 141 Nguyen Van Cu Street, Bo De Ward, Ha Noi City',
    ],

    /**
     * All enquiry forms use the same public contact email.
     *
     * Note: If the backend has its own recipient configuration,
     * update that configuration separately.
     */
    enquiryEmails: {
        quote: 'info@asianstartravels.com',
        partner: 'info@asianstartravels.com',
        contact: 'info@asianstartravels.com',
    },

    /** Only the public contact email is displayed in the footer. */
    teamContacts: [
        {
            name: 'Contact',
            email: 'info@asianstartravels.com',
        },
    ],

    /** Social links. Empty values hide the corresponding buttons. */
    social: {
        facebook: 'https://www.facebook.com/asianstartravel.vn',
        instagram: '',
    },

    /**
     * Analytics.
     * Leave empty to disable external analytics requests.
     */
    analytics: {
        gaMeasurementId: '',
    },
};

/** Per-route metadata. Keys match canonical paths in App.jsx. */
export const PAGE_META = {
    '/': {
        title: `Your B2B DMC Partner for Vietnam | ${SITE.name}`,
        description:
            'Asian Star Travel helps travel agents, tour operators and OTAs design seamless private journeys, FIT and group programs, MICE and luxury travel across Vietnam.',
    },

    '/tours': {
        title: `Curated Journeys | ${SITE.name}`,
        description:
            'Curated journeys and experiences across Vietnam — FIT, groups, MICE, honeymoon and luxury travel for agents and their clients.',
    },

    '/experiences': {
        title: `Experiences for Every Travel Style | ${SITE.name}`,
        description:
            'Every traveller has a different reason to explore. AST helps travel partners shape destination programmes around the interests, pace and priorities of their clients.',
    },

    '/groups-mice': {
        title: `Group Travel & MICE | ${SITE.name}`,
        description:
            'From group leisure programmes to corporate incentives, meetings and special-interest journeys, AST helps travel partners explore destination options and coordinate travel programmes around their objectives.',
    },

    '/services': {
        title: `Services | ${SITE.name}`,
        description:
            'Tailor-made tours, private transfers, ground services and full DMC support across Vietnam.',
    },

    '/request-quote': {
        title: `Request a Quote | ${SITE.name}`,
        description:
            'Send your itinerary requirements and receive a tailored proposal from our destination specialists within one business day.',
    },

    '/become-a-partner': {
        title: `Become a Partner | ${SITE.name}`,
        description:
            'Join the Asian Star Travel partner network — preferred rates and dedicated support for travel agencies, tour operators and OTAs.',
    },

    '/travel-trade': {
        title: `Travel Trade | ${SITE.name}`,
        description:
            'AST works with travel agencies, tour operators, corporate travel planners and MICE organisers seeking destination knowledge and professional coordination across India, Vietnam, Japan and South Korea.',
    },

    '/terms': {
        title: `Terms of Use | ${SITE.name}`,
        description:
            'The terms that govern your use of the Asian Star Travel website.',
    },

    '/cookie-policy': {
        title: `Cookie Policy | ${SITE.name}`,
        description:
            'How Asian Star Travel uses cookies on our website.',
    },

    '/destination': {
        title: `Destinations | ${SITE.name}`,
        description:
            "One country, many worlds. Explore Vietnam's destinations — cities, regions and the experiences our DMC designs for travel agents.",
    },

    '/about': {
        title: `About Us | ${SITE.name}`,
        description:
            'A global B2B DMC — the ground partner travel agents trust across Vietnam.',
    },

    '/contact': {
        title: `Contact Us | ${SITE.name}`,
        description:
            'Contact Asian Star Travel at info@asianstartravels.com about FIT and group programs, MICE support, or becoming a partner. Dedicated trade support across Vietnam.',
    },

    '/blog': {
        title: `Travel Journal | ${SITE.name}`,
        description:
            'Destination guides, transit tips and editorial dispatches from our travel specialists.',
    },

    '/privacy-policy': {
        title: `Privacy Policy | ${SITE.name}`,
        description:
            'How Asian Star Travel collects, uses and protects your personal data.',
    },

    '/booking': {
        title: `Book Your Journey | ${SITE.name}`,
        description:
            'Request your bespoke journey across Vietnam — preferred rates for agents and their travelers.',
    },

    '/checkout': {
        title: `Checkout | ${SITE.name}`,
        description:
            'Complete your booking details for your Asian Star Travel journey.',
    },

    '/trip': {
        title: `Trip Reservation | ${SITE.name}`,
        description:
            'Reserve your private journey with our destination specialists.',
    },

    '/services/private-tours': {
        title: `Private Tours | ${SITE.name}`,
        description:
            'Private, tailor-made tours across Vietnam — flexible pacing, dedicated guide and vehicle.',
    },

    '/services/tailor-made-tours': {
        title: `Tailor-Made Tours | ${SITE.name}`,
        description:
            'Fully customizable journeys designed around client preferences, timeline and travel style.',
    },

    '/services/ground-services': {
        title: `Ground Services | ${SITE.name}`,
        description:
            'Private transfers, experienced drivers and 24/7 ground support across Vietnam.',
    },
};