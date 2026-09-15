/**
 * DisplayHeading — oversized editorial typography for hero/section headings.
 * Uses Playfair Display at large scale with tight leading.
 * @param {string} as - heading level: 'h1' | 'h2' | 'h3'
 * @param {string} size - 'hero' | 'xl' | 'lg' | 'md'
 */
const sizeClasses = {
    hero: 'text-[clamp(2.5rem,7vw,6rem)] leading-[0.92] tracking-[-0.03em]',
    xl: 'text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]',
    lg: 'text-[clamp(1.75rem,4vw,3rem)] leading-[1.0] tracking-[-0.02em]',
    md: 'text-[clamp(1.25rem,3vw,2rem)] leading-[1.1] tracking-[-0.01em]',
};

export default function DisplayHeading({
    children,
    as: Tag = 'h2',
    size = 'lg',
    className = '',
    light = false,
}) {
    return (
        <Tag
            className={`font-display ${sizeClasses[size]} ${light ? 'text-white' : 'text-[var(--color-navy)]'} ${className}`}
        >
            {children}
        </Tag>
    );
}
