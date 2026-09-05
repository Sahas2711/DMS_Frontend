/**
 * Shown while a lazily-loaded route chunk is downloading. Sized to roughly the
 * height of a page hero so the layout does not jump when the page mounts.
 */
const RouteFallback = () => (
    <div
        className="w-full min-h-[60vh] flex items-center justify-center bg-ivory"
        role="status"
        aria-live="polite"
    >
        <span className="sr-only">Loading page</span>
        <span
            className="w-8 h-8 rounded-full border-2 border-navy/15 border-t-gold animate-spin"
            aria-hidden="true"
        />
    </div>
);

export default RouteFallback;
