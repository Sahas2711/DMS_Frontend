import StarIcon from './icons/StarIcon';
import { SITE } from '../config/site';

/**
 * Full-bleed page hero: background image, navy scrim, brand wordmark, gold rule
 * and an eyebrow line. This markup was duplicated across seven page files.
 *
 * @param {string}  image      Imported hero image URL.
 * @param {string}  alt        Alt text. Pass "" when the image is purely decorative
 *                             and the heading already conveys the meaning.
 * @param {string}  title      H1 heading for the page. When omitted the brand
 *                             wordmark is used so every page keeps exactly one
 *                             descriptive H1 (good for SEO).
 * @param {string}  eyebrow    Small line under the gold rule (e.g. "Services / Checkout").
 * @param {boolean} uppercase  Uppercase the eyebrow.
 * @param {'default'|'compact'|'tall'} size  Hero height preset.
 * @param {number}  overlay    Scrim opacity, 0-100.
 * @param {boolean} priority   Set on the first hero of a page load so the browser
 *                             fetches the LCP image eagerly.
 */
const SIZES = {
    compact: 'h-[45vh] md:h-[60vh] lg:min-h-screen',
    default: 'h-[50vh] md:h-[65vh] lg:min-h-screen',
    tall: 'h-[60vh] md:h-[75vh] lg:min-h-screen',
};

const RULES = {
    short: 'w-24 md:w-32',
    wide: 'w-48 md:w-64 opacity-80',
};

const PageHero = ({
    image,
    alt = '',
    title,
    eyebrow,
    uppercase = false,
    size = 'default',
    overlay = 30,
    rule = 'short',
    priority = true,
    children,
}) => (
    <section
        className={`relative w-full ${SIZES[size] ?? SIZES.default} flex items-center justify-center overflow-hidden`}
    >
        <img
            src={image}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover z-0"
            fetchPriority={priority ? 'high' : 'auto'}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
        />

        {/* Navy scrim keeps the heading readable over any photograph */}
        <div
            className="absolute inset-0 bg-navy z-0"
            style={{ opacity: overlay / 100 }}
            aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6 -mt-10">
            <StarIcon />

            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif tracking-widest mb-6">
                {title || SITE.wordmark}
            </h1>

            <div
                className={`${RULES[rule] ?? RULES.short} h-px bg-gold mb-6`}
                aria-hidden="true"
            />

            {eyebrow && (
                <p
                    className={`text-white text-sm md:text-base font-light tracking-wide ${uppercase ? 'uppercase' : ''}`}
                >
                    {eyebrow}
                </p>
            )}

            {children}
        </div>
    </section>
);

export default PageHero;
