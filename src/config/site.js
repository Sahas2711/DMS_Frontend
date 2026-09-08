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
    tagline: 'Your Trusted B2B DMC across Vietnam, Japan & Australia',
    description:
        'Asian Star Travel is a global B2B DMC, crafting private journeys, FIT and group programs, MICE, honeymoon and luxury experiences for travel agents and tour operators across Vietnam, Japan and Australia.',
    email: 'info@asianstartravels.com',
    /** Public telephone (E.164) — used in contact page structured data. */
    telephone: '+842438289999',
    /** Relative path to the brand logo asset — used in Organization schema. */
    logo: '/favicon.svg',
    locale: 'en_US',
    /** Set to the production origin before deploying (used for canonical + OG URLs). */
    url: 'https://www.asianstartravel.vn',
    /** Registered office — single source of truth, rendered in the footer
     *  and on the contact page. */
    registeredAddress: '7th Floor Kirloskar Tech Park, Godrej Woodsman Estate, Hebbal Kempapura, Bengaluru, Karnataka 560024',
    /** Enquiry routing mailboxes (mirror the backend per-form recipient lists). */
    enquiryEmails: {
        quote: 'inquiry@asianstartravels.com',
        partner: 'sales@asianstartravels.com',
        contact: 'info@asianstartravels.com',
    },
    /** Named team contacts shown in the footer — individual mailboxes. */
    teamContacts: [
        { name: 'Manal', email: 'manal@asianstartravels.com' },
        { name: 'Nikhil', email: 'nikhil@asianstartravels.com' },
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
        title: `${SITE.name} — B2B DMC Partner for Vietnam, Japan & Australia`,
        description: SITE.description,
    },
    '/tours': {
        title: `Journeys & Experiences | ${SITE.name}`,
        description:
            'Tours and experiences across Vietnam, Japan and Australia — FIT, groups, MICE, honeymoon and luxury journeys for travel agents and their clients.',
    },
    '/experiences': {
        title: `Experiences | ${SITE.name}`,
        description:
            'FIT, Groups, MICE, Honeymoon and Luxury — the travel experiences Asian Star Travel designs across Vietnam, Japan and Australia.',
    },
    '/services': {
        title: `Services | ${SITE.name}`,
        description:
            'Tailor-made tours, private transfers, airport fast track and full ground services across Vietnam, Japan and Australia — operated by a B2B DMC.',
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
    '/destination': {
        title: `Destinations | ${SITE.name}`,
        description:
            'Launch destinations: Vietnam, Japan and Australia. Explore cities, regions and the experiences our DMC designs for travel agents.',
    },
    '/about': {
        title: `About Us | ${SITE.name}`,
        description:
            'A global B2B DMC — the ground partner travel agents trust across Vietnam, Japan and Australia.',
    },
    '/contact': {
        title: `Contact Us | ${SITE.name}`,
        description:
            'Talk to our B2B team about FIT and group programs, MICE support, or how to become a partner. Dedicated trade support across Vietnam, Japan and Australia.',
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
};
