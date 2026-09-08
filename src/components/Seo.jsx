import { SITE } from '../config/site';

const hasScheme = (value) => /^https?:\/\//i.test(value);

const absoluteUrl = (value) => {
    if (!value) return undefined;
    if (hasScheme(value)) return value;
    if (value.startsWith('//')) return value;
    const normalized = value.startsWith('/') ? value : `/${value}`;
    return `${SITE.url}${normalized}`;
};

const robotsContent = ({ noIndex, robots }) => {
    if (robots) return robots;
    if (noIndex) return 'noindex, follow';
    return undefined;
};

/**
 * Per-route document metadata.
 *
 * React 19 hoists <title>, <meta> and <link> rendered anywhere in the tree into
 * <head>, so no helmet library is required. Render one <Seo /> per page.
 */
const Seo = ({
    title,
    description,
    path,
    image,
    noIndex = false,
    robots,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
}) => {
    const resolvedTitle = title || SITE.name;
    const resolvedDescription = description || SITE.description;
    const resolvedOgTitle = ogTitle || resolvedTitle;
    const resolvedOgDescription = ogDescription || resolvedDescription;
    const robotsMeta = robotsContent({ noIndex, robots });
    // Noindex pages must not advertise a canonical (a canonical + noindex mix
    // is contradictory and can confuse crawlers into indexing).
    const isNoIndex = typeof robotsMeta === 'string' && robotsMeta.toLowerCase().includes('noindex');
    const canonical = path && !isNoIndex ? absoluteUrl(path === '/' ? SITE.url : path) : undefined;
    const resolvedImage = absoluteUrl(ogImage || image);
    const resolvedTwitterImage = absoluteUrl(twitterImage || ogImage || image);

    return (
        <>
            <title>{resolvedTitle}</title>
            <meta name="description" content={resolvedDescription} />
            {robotsMeta && <meta name="robots" content={robotsMeta} />}
            {canonical && <link rel="canonical" href={canonical} />}

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE.name} />
            <meta property="og:locale" content={SITE.locale} />
            <meta property="og:title" content={resolvedOgTitle} />
            <meta property="og:description" content={resolvedOgDescription} />
            {canonical && <meta property="og:url" content={canonical} />}
            {resolvedImage && <meta property="og:image" content={resolvedImage} />}

            <meta
                name="twitter:card"
                content={resolvedImage ? 'summary_large_image' : 'summary'}
            />
            <meta name="twitter:title" content={twitterTitle || resolvedTitle} />
            <meta name="twitter:description" content={twitterDescription || resolvedDescription} />
            {resolvedTwitterImage && (
                <meta name="twitter:image" content={resolvedTwitterImage} />
            )}
        </>
    );
};

export default Seo;