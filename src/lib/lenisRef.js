/**
 * Shared reference to the single Lenis instance created in App.jsx.
 *
 * The landing page's sticky scroll scenes need Lenis' animated scroll position
 * (smoothed), not the raw window value. Instead of a second RAF loop or a
 * second smooth-scroll engine, they read from this ref — App.jsx owns the
 * lifecycle (create/destroy) and everyone else just reads.
 */
export const lenisRef = { current: null };
