import { SITE } from '../config/site';

/**
 * Per-route document metadata.
 *
 * React 19 hoists <title>, <meta> and <link> rendered anywhere in the tree into
 * <head>, so no helmet library is required. Render one <Seo /> per page.
 */
const Seo = ({ title, description, path, image, noIndex = false }) => {
    const resolvedTitle = title || SITE.name;
    const resolvedDescription = description || SITE.description;
    const canonical = path ? `${SITE.url}${path === '/' ? '' : path}` : undefined;

    return (
        <>
            <title>{resolvedTitle}</title>
            <meta name="description" content={resolvedDescription} />
            {canonical && <link rel="canonical" href={canonical} />}
            {noIndex && <meta name="robots" content="noindex, follow" />}

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE.name} />
            <meta property="og:locale" content={SITE.locale} />
            <meta property="og:title" content={resolvedTitle} />
            <meta property="og:description" content={resolvedDescription} />
            {canonical && <meta property="og:url" content={canonical} />}
            {image && <meta property="og:image" content={`${SITE.url}${image}`} />}

            <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:title" content={resolvedTitle} />
            <meta name="twitter:description" content={resolvedDescription} />
            {image && <meta name="twitter:image" content={`${SITE.url}${image}`} />}
        </>
    );
};

export default Seo;
