/**
 * Option lists for the enquiry forms. Values are the exact strings the backend
 * Pydantic schemas accept (see DMS_Backend/app/schemas/enquiry.py).
 */

export const TRIP_TYPES = [
    { value: 'FIT', label: 'FIT (Independent travellers)' },
    { value: 'GROUP', label: 'Groups' },
    { value: 'MICE', label: 'MICE (Meetings & incentives)' },
    { value: 'HONEYMOON', label: 'Honeymoon' },
    { value: 'LUXURY', label: 'Luxury' },
];

export const TRIP_TYPE_BY_VALUE = Object.fromEntries(TRIP_TYPES.map((t) => [t.value, t.label]));

export const HOTEL_CATEGORIES = [
    { value: '3_STAR', label: '3 Star' },
    { value: '4_STAR', label: '4 Star' },
    { value: '5_STAR', label: '5 Star' },
    { value: 'LUXURY', label: 'Luxury / Ultra-luxury' },
];

export const TRANSPORT_TYPES = [
    { value: 'PRIVATE', label: 'Private car / van' },
    { value: 'COACH', label: 'Coach (group)' },
    { value: 'SELF_DRIVE', label: 'Self-drive' },
    { value: 'OTHER', label: 'Other' },
];

export const BUDGET_RANGES = [
    { value: '', label: 'Please select a range' },
    { value: '< 1,000', label: 'Under 1,000' },
    { value: '1,000 - 2,500', label: '1,000 – 2,500' },
    { value: '2,500 - 5,000', label: '2,500 – 5,000' },
    { value: '5,000 - 10,000', label: '5,000 – 10,000' },
    { value: '> 10,000', label: 'Over 10,000' },
    { value: 'per person', label: 'I need help estimating' },
];

export const CURRENCIES = [
    { value: 'USD', label: 'USD — US Dollar' },
    { value: 'EUR', label: 'EUR — Euro' },
    { value: 'GBP', label: 'GBP — British Pound' },
    { value: 'AUD', label: 'AUD — Australian Dollar' },
    { value: 'JPY', label: 'JPY — Japanese Yen' },
    { value: 'SGD', label: 'SGD — Singapore Dollar' },
    { value: 'CAD', label: 'CAD — Canadian Dollar' },
    { value: 'VND', label: 'VND — Vietnamese Dong' },
    { value: 'INR', label: 'INR — Indian Rupee' },
];

/** Experience journey categories — 8 interest-based themes per spec. */
export const EXPERIENCE_CATEGORIES = [
    {
        value: 'CULTURE_HERITAGE',
        title: 'Culture & Heritage',
        tagline: 'Temples, palaces & living traditions',
        description:
            'Private access to historic sites, historians and guides who read a place the way locals do — temples, palaces, rituals and the stories behind them.',
        points: ['Private historian guides', 'Sacred site access', 'Living cultural encounters'],
    },
    {
        value: 'FOOD_LOCAL_LIFE',
        title: 'Food & Local Life',
        tagline: 'Street food, markets & cooking sessions',
        description:
            'From Hanoi night markets to Osaka alleyways, eat where locals eat — street food tours, market mornings and private cooking sessions.',
        points: ['Street food walks', 'Market-to-table experiences', 'Private cooking classes'],
    },
    {
        value: 'NATURE_SCENIC',
        title: 'Nature & Scenic',
        tagline: 'Landscapes that move you',
        description:
            'From Himalayan foothills to Ha Long Bay — slow routes, small lodges and the long view, planned around light and season.',
        points: ['Scenic drives & treks', 'National park guides', 'Seasonal light planning'],
    },
    {
        value: 'FAMILY_JOURNEYS',
        title: 'Family Journeys',
        tagline: 'Engaging for all ages',
        description:
            'Thoughtfully paced for families — room logic, rest days and guides who keep teenagers as engaged as grandparents.',
        points: ['Family-friendly pacing', 'Multi-generational room logic', 'Kid-safe activities'],
    },
    {
        value: 'HONEYMOON_LUXURY',
        title: 'Honeymoon & Luxury',
        tagline: 'Once-in-a-lifetime escapes',
        description:
            'The finest hotels, private access and bespoke service — romantic journeys crafted around privacy, surprise and exception.',
        points: ['Signature hotels', 'Private dining experiences', 'Dedicated concierge'],
    },
    {
        value: 'GROUPS_MICE',
        title: 'Groups & MICE',
        tagline: 'Conferences, incentives & events',
        description:
            'Full-service support for conferences, incentive programmes and group travel — venues, transfers, gala dinners and creative team experiences.',
        points: ['Venue sourcing & site checks', 'Gala dinners & team building', 'End-to-end coordination'],
    },
    {
        value: 'WELLNESS_SLOW',
        title: 'Wellness & Slow Travel',
        tagline: 'Rituals, retreats & space to breathe',
        description:
            'Onsen circuits, ashram mornings and coastal silence — journeys designed to restore, at a pace that lets you arrive feeling different.',
        points: ['Spa & wellness retreats', 'Meditation & yoga', 'Slow-paced itineraries'],
    },
    {
        value: 'ART_DESIGN',
        title: 'Art & Design',
        tagline: 'Galleries, architecture & creative culture',
        description:
            'From Seoul design trails to Tokyo galleries — journeys for art lovers, architecture enthusiasts and design-driven travellers.',
        points: ['Gallery & museum access', 'Architecture tours', 'Design district walks'],
    },
];

export const LAUNCH_COUNTRIES = [
    { name: 'India', slug: 'india', flag: '🇮🇳', description: 'Rajasthan, Kerala, Ladakh, Goa and the Himalayan north.' },
    { name: 'Vietnam', slug: 'vietnam', flag: '🇻🇳', description: 'Ha Long Bay, Hanoi, Hoi An, Ho Chi Minh City & the Mekong.' },
    { name: 'Japan', slug: 'japan', flag: '🇯🇵', description: 'Tokyo, Kyoto, Osaka, Hiroshima and the Hokkaido winter.' },
    { name: 'South Korea', slug: 'south-korea', flag: '🇰🇷', description: 'Seoul, Busan, Jeju Island and Gyeongju.' },
];
