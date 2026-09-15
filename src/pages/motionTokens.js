/* Shared easing vocabulary for the home experience. Kept in a
   constants-only module so component files stay fast-refresh friendly. */

/** Editorial ease — long settle, no bounce. Default for reveals. */
export const EASE_EDITORIAL = [0.16, 1, 0.3, 1];

/** Cinematic ease — heavier start, used for scene-level moves. */
export const EASE_CINEMATIC = [0.45, 0, 0.15, 1];
