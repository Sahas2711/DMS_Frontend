/**
 * Blog post constants shared by the public journal and the admin CMS.
 * Values mirror the backend PostCreate/PostUpdate schemas exactly.
 */
export const POST_CATEGORIES = [
    { value: 'TRAVEL TIPS', label: 'Travel Tips' },
    { value: 'DESTINATIONS', label: 'Destinations' },
    { value: 'INDIA TRAVEL', label: 'India Travel' },
    { value: 'VIETNAM TRAVEL', label: 'Vietnam Travel' },
    { value: 'JAPAN TRAVEL', label: 'Japan Travel' },
    { value: 'SOUTH KOREA TRAVEL', label: 'South Korea Travel' },
    { value: 'TRAVEL GUIDES', label: 'Travel Guides' },
    { value: 'AIRPORT SERVICES', label: 'Airport Services' },
];

export const POST_CATEGORY_LABEL = Object.fromEntries(
    POST_CATEGORIES.map((c) => [c.value, c.label])
);

export const POST_STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];