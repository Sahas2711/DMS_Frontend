import { SITE } from './site';

const absolute = (value) => {
    if (!value) return undefined;
    if (/^https?:\/\//i.test(value)) return value;
    if (value.startsWith('//')) return value;
    const normalized = value.startsWith('/') ? value : `/${value}`;
    return `${SITE.url}${normalized}`;
};

/** Legacy reuse guard — keep the canonical brand origin for all schemas. */
const origin = SITE.url.replace(/\/+$/, '');

export const organizationSchema = (extra = {}) => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: SITE.name,
    url: origin,
    logo: {
        '@type': 'ImageObject',
        url: absolute(SITE.logo),
    },
    email: SITE.email,
    telephone: SITE.telephone,
    address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.registeredAddress,
        addressCountry: 'IN',
    },
    ...extra,
});

export const websiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: origin,
    name: SITE.name,
    description: SITE.description,
    inLanguage: 'en',
    publisher: { '@id': `${origin}/#organization` },
});

export const breadcrumbListSchema = (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, url }, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        item: absolute(url),
    })),
});

export const itemListSchema = (items) => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items
        .filter((item) => item && item.url)
        .map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            url: absolute(item.url),
            ...(item.image ? { image: absolute(item.image) } : {}),
        })),
});

export const touristTripSchema = ({ tour, seo, canonical }) => ({
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: seo?.meta_title || `${tour.title} — ${SITE.name}`,
    description: seo?.meta_description || tour.summary || SITE.description,
    url: absolute(canonical),
    ...(tour.hero_media?.url ? { image: [absolute(tour.hero_media.url)] } : {}),
    touristType: tour.category ? [tour.category] : undefined,
    provider: { '@id': `${origin}/#organization` },
});

export const touristDestinationSchema = ({ destination, seo }) => ({
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: seo?.meta_title || `${destination.name} — ${SITE.name}`,
    description: seo?.meta_description || destination.short_description || SITE.description,
    url: absolute(`/destination/${destination.slug}`),
    ...(destination.hero_media?.url ? { image: absolute(destination.hero_media.url) } : {}),
    address: {
        '@type': 'PostalAddress',
        addressCountry: destination.country,
    },
});

/**
 * BlogPosting for a single published article. Only real CMS values are used:
 * dates come from `published_at` (omitted when absent), the author falls back
 * to the company name and every image is a real URL — never fabricated.
 */
export const blogPostingSchema = ({ post, seo, canonical, image }) => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        ...(seo?.meta_description || post.excerpt ? { description: seo?.meta_description || post.excerpt } : {}),
        inLanguage: 'en',
        url: absolute(canonical),
        mainEntityOfPage: absolute(canonical),
        ...(image && !image.startsWith('data:') ? { image: [absolute(image)] } : {}),
        author: {
            '@type': 'Person',
            name: post.author || SITE.name,
        },
        publisher: { '@id': `${origin}/#organization` },
        ...(post.published_at ? { datePublished: post.published_at } : {}),
    };
    // JSON-LD must stay free of undefined values.
    Object.keys(schema).forEach((key) => {
        if (schema[key] === undefined) delete schema[key];
    });
    return schema;
};

export default {
    organizationSchema,
    websiteSchema,
    breadcrumbListSchema,
    itemListSchema,
    touristTripSchema,
    touristDestinationSchema,
    blogPostingSchema,
};