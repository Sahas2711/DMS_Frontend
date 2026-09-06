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

/** Experience journey categories surfaced publicly (Phase 1). */
export const EXPERIENCE_CATEGORIES = [
    {
        value: 'FIT',
        title: 'FIT',
        tagline: 'Independent & tailor-made',
        description:
            'Private, flexible itineraries for individual travellers and small parties — designed around pace, interests and dates, never off-the-shelf.',
        points: ['Private guides & drivers', 'Hotels matched to your budget tier', 'Day-by-day flexibility'],
    },
    {
        value: 'GROUP',
        title: 'Groups',
        tagline: 'Escorted & shared journeys',
        description:
            'Reliable group logistics across Vietnam, Japan and Australia — from departure briefing to the last transfer home.',
        points: ['Coach & rail logistics', 'Multi-lingual escort guides', 'Group dining & entry planning'],
    },
    {
        value: 'MICE',
        title: 'MICE',
        tagline: 'Meetings, incentives & events',
        description:
            'Full-service support for conferences, incentive programmes and events with venues, transfers and creative team programmes.',
        points: ['Venue sourcing & site checks', 'Gala dinners & team experiences', 'End-to-end event coordination'],
    },
    {
        value: 'HONEYMOON',
        title: 'Honeymoon',
        tagline: 'Once-in-a-lifetime escapes',
        description:
            'Romantic journeys crafted around privacy and surprise — intimate stays, private dinners and carefully choreographed moments.',
        points: ['Romantic room settings', 'Private dining experiences', 'Seamless day-to-day handling'],
    },
    {
        value: 'LUXURY',
        title: 'Luxury',
        tagline: 'Elevated & exclusive',
        description:
            'The finest hotels, private access and bespoke service for clients who expect the exceptional as standard.',
        points: ['Signature & ultra-luxury hotels', 'Private access & experiences', 'Dedicated senior concierge'],
    },
];

export const LAUNCH_COUNTRIES = [
    { name: 'Vietnam', slug: 'vietnam', flag: '🇻🇳', description: 'Ha Long Bay, Hanoi, Hoi An, Ho Chi Minh City & the Mekong.' },
    { name: 'Japan', slug: 'japan', flag: '🇯🇵', description: 'Tokyo, Kyoto, Osaka, Hiroshima and the Hokkaido winter.' },
    { name: 'Australia', slug: 'australia', flag: '🇦🇺', description: 'Sydney, Melbourne, Cairns and the Great Barrier Reef.' },
];
