/**
 * Blog post constants shared by the public journal and the admin CMS.
 * Values mirror the backend PostCreate/PostUpdate schemas exactly.
 */
export const POST_CATEGORIES = [
    { value: 'TRAVEL TIPS', label: 'Travel Tips' },
    { value: 'DESTINATIONS', label: 'Destinations' },
    { value: 'AIRPORT SERVICES', label: 'Airport Services' },
    { value: 'VIETNAM TRAVEL', label: 'Vietnam Travel' },
    { value: 'TRAVEL GUIDES', label: 'Travel Guides' },
];

export const POST_CATEGORY_LABEL = Object.fromEntries(
    POST_CATEGORIES.map((c) => [c.value, c.label])
);

export const POST_STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];