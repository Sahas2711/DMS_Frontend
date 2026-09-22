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
    tagline: 'Your Trusted Asia DMC Partner',
    description:
        'Asian Star Travel is a B2B destination management company crafting private journeys, FIT and group programs, MICE, honeymoon and luxury experiences across India, Vietnam, Japan and South Korea.',
    email: 'info@asianstartravels.com',
    /** Public telephone (E.164) — used in contact page structured data. */
    telephone: '+842438289999',
    /** Relative path to the brand logo asset — used in Organization schema. */
    logo: '/logo.jpeg',
    locale: 'en_US',
    /** Set to the production origin before deploying (used for canonical + OG URLs). */
    url: 'https://www.asianstartravel.vn',
    /** Registered office — single source of truth, rendered in the footer
     *  and on the contact page. */
    registeredAddress: '7th Floor Kirloskar Tech Park, Godrej Woodsman Estate, Hebbal Kempapura, Bengaluru, Karnataka 560024',
    /** Vietnam offices — shown in the footer. */
    vietnamOffices: [
        'No. 4 Nguyen Thi Minh Khai Street, Sai Gon Ward, Ho Chi Minh City',
        'No. 141 Nguyen Van Cu Street, Bo De Ward, Ha Noi City',
    ],
    /** Enquiry routing mailboxes (mirror the backend per-form recipient lists). */
    enquiryEmails: {
        quote: 'inquiry@asianstartravels.com',
        partner: 'sales@asianstartravels.com',
        contact: 'info@asianstartravels.com',
    },
    /** Functional / forwarding addresses shown in the footer. */
    teamContacts: [
        { name: 'Sales', email: 'sales@asianstartravels.com' },
        { name: 'Operations', email: 'operations@asianstartravels.com' },
        { name: 'Inquiry', email: 'inquiry@asianstartravels.com' },
        { name: 'Info', email: 'info@asianstartravels.com' },
    ],
    /** Social links (footer "Follow us"). Leave empty to hide the button. */
    social: {
        facebook: 'https://www.facebook.com/asianstartravel.vn',
        instagram: '',
    },
    /** Analytics — leave empty to disable all external analytics requests.
     *  Set to a GA4 measurement ID ("G-XXXXXXX") to enable consent-gated
     *  analytics. Nothing loads until a visitor accepts cookies. */
    analytics: {
        gaMeasurementId: '',
    },
};

/** Per-route metadata. Keys match the canonical route paths in App.jsx. */
export const PAGE_META = {
    '/': {
        title: `Your B2B DMC Partner for India, Vietnam, Japan, South Korea | ${SITE.name}`,
        description:
            'Asian Star Travel helps travel agents, tour operators and OTAs design seamless private journeys, FIT and group programs, MICE and luxury travel across India, Vietnam, Japan and South Korea.',
    },
    '/tours': {
        title: `Curated Journeys | ${SITE.name}`,
        description:
            'Curated journeys and experiences across India, Vietnam, Japan and South Korea — FIT, groups, MICE, honeymoon and luxury travel for agents and their clients.',
    },
    '/experiences': {
        title: `Experiences | ${SITE.name}`,
        description:
            'FIT, Groups, MICE, Honeymoon and Luxury — the travel experiences Asian Star Travel designs across India, Vietnam, Japan and South Korea.',
    },
    '/services': {
        title: `Services | ${SITE.name}`,
        description:
            'Tailor-made tours, private transfers, ground services and full DMC support across India, Vietnam, Japan and South Korea.',
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
            'Built for travel agents, agencies and tour operators: FIT and group programs, MICE support and a dedicated trade desk.',
    },
    '/terms': {
        title: `Terms of Use | ${SITE.name}`,
        description: 'The terms that govern your use of the Asian Star Travel website.',
    },
    '/cookie-policy': {
        title: `Cookie Policy | ${SITE.name}`,
        description: 'How Asian Star Travel uses cookies on our website.',
    },
    '/destination': {
        title: `Destinations | ${SITE.name}`,
        description:
            'Four destinations — India, Vietnam, Japan and South Korea. Explore cities, regions and the experiences our DMC designs for travel agents.',
    },
    '/about': {
        title: `About Us | ${SITE.name}`,
        description:
            'A global B2B DMC — the ground partner travel agents trust across India, Vietnam, Japan and South Korea.',
    },
    '/contact': {
        title: `Contact Us | ${SITE.name}`,
        description:
            'Talk to our B2B team about FIT and group programs, MICE support, or how to become a partner. Dedicated trade support across India, Vietnam, Japan and South Korea.',
    },
    '/blog': {
        title: `Travel Journal | ${SITE.name}`,
        description:
            'Destination guides, transit tips and editorial dispatches from our travel specialists.',
    },
    '/privacy-policy': {
        title: `Privacy Policy | ${SITE.name}`,
        description: 'How Asian Star Travel collects, uses and protects your personal data.',
    },
    '/booking': {
        title: `Book Your Journey | ${SITE.name}`,
        description:
            'Request your bespoke journey across India, Vietnam, Japan and South Korea — preferred rates for agents and their travelers.',
    },
    '/checkout': {
        title: `Checkout | ${SITE.name}`,
        description: 'Complete your booking details for your Asian Star Travel journey.',
    },
    '/trip': {
        title: `Trip Reservation | ${SITE.name}`,
        description: 'Reserve your private journey with our destination specialists.',
    },
    '/services/private-tours': {
        title: `Private Tours | ${SITE.name}`,
        description: 'Private, tailor-made tours across India, Vietnam, Japan and South Korea — flexible pacing, dedicated guide and vehicle.',
    },
    '/services/tailor-made-tours': {
        title: `Tailor-Made Tours | ${SITE.name}`,
        description: 'Fully customizable journeys designed around client preferences, timeline and travel style.',
    },
    '/services/ground-services': {
        title: `Ground Services | ${SITE.name}`,
        description: 'Private transfers, experienced drivers and 24/7 ground support across our destinations.',
    },
};
