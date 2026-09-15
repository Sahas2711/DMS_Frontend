import RevealOnScroll from './RevealOnScroll';

/**
 * EditorialStory — alternating image/text editorial block.
 * Used for About page, destination stories, and long-form content.
 * 
 * @param {string} layout - 'left' | 'right' — image position
 */
export default function EditorialStory({
    image,
    imageAlt,
    imageCaption,
    eyebrow,
    heading,
    text,
    textSecondary,
    layout = 'left',
    className = '',
}) {
    const imageCol = (
        <RevealOnScroll direction={layout === 'left' ? 'left' : 'right'} className="col-span-12 lg:col-span-6">
            <figure className="overflow-hidden">
                <img
                    src={image}
                    alt={imageAlt || heading}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                />
                {imageCaption && (
                    <figcaption className="mt-3 text-sm text-[var(--color-sand)]/50 font-body">
                        {imageCaption}
                    </figcaption>
                )}
            </figure>
        </RevealOnScroll>
    );

    const textCol = (
        <RevealOnScroll direction="up" delay={0.15} className="col-span-12 lg:col-span-6">
            <div className="lg:py-8">
                {eyebrow && (
                    <span className="text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase text-[var(--color-sand)]/60 mb-4 block">
                        {eyebrow}
                    </span>
                )}
                {heading && (
                    <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.08] tracking-[-0.02em] text-[var(--color-navy)] mb-6">
                        {heading}
                    </h2>
                )}
                {text && (
                    <div className="font-body text-[var(--color-sand)]/80 leading-[1.8] space-y-4">
                        {typeof text === 'string' ? <p>{text}</p> : text}
                    </div>
                )}
                {textSecondary && (
                    <div className="font-body text-[var(--color-sand)]/70 leading-[1.8] mt-4 space-y-4">
                        {typeof textSecondary === 'string' ? <p>{textSecondary}</p> : textSecondary}
                    </div>
                )}
            </div>
        </RevealOnScroll>
    );

    return (
        <div className={`grid grid-cols-12 gap-8 lg:gap-12 items-center ${className}`}>
            {layout === 'left' ? (
                <>
                    {imageCol}
                    {textCol}
                </>
            ) : (
                <>
                    {textCol}
                    {imageCol}
                </>
            )}
        </div>
    );
}
