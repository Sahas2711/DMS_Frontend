/**
 * SectionLabel — editorial eyebrow/label component.
 * Small uppercase text above headings, like "THE POINT OF VIEW" or "FOUR WORLDS".
 */
export default function SectionLabel({ children, className = '' }) {
    return (
        <p
            className={`text-[10px] sm:text-xs font-medium tracking-[0.25em] uppercase text-[var(--color-sand)]/60 mb-6 ${className}`}
        >
            {children}
        </p>
    );
}
