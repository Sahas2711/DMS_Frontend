# ASIAN STAR TRAVEL — UI REBUILD REPORT

**Scope:** Homepage visual + animation rebuild (`DMS_Frontend/DMS_frontend`)
**Status:** Implemented and browser-verified (headless Chrome QA harnesses, `qa/` folder)
**Date:** 2026-09-15

---

## 1. Executive summary

The homepage was rebuilt from a section/card template into a scroll-driven journey organised around one persistent visual system: **the route**. Thin gold route lines, diamond waypoints, coordinates and ghost numerals run through every scene, so the page reads as travelling through Asia (arrival → discovery → destination → experience → trust → journeys → partnership) rather than scrolling a brochure.

**Phase 2 (motion verification & hardening) — 2026-09-15:**
- **Critical motion bug found and fixed:** `<AnimatePresence mode="wait" initial={false}>` in `App.jsx` suppressed `initial` states for everything mounting on first render — **the entire homepage (including the hero entrance) rendered in its final animated state and never animated in**. This was the exact "transform: none, opacity: 1 in the exported HTML" symptom flagged in the brief. Removing `initial={false}` restored all mount-time entrance choreography; six `entered ? X : {}` gate patterns in Hero (which silently skipped animations when the gate was briefly `{}`) were replaced with declarative `initial`→`animate`+`transition.delay` sequencing. Fix verified in-browser: the headline is sampled at `translateY(167px)` at t≈170–300ms and settles to identity.
- All four previously-unverified QA gaps (reduced motion, resize/orientation, mid-animation frames, route-change cleanup) are now **closed with browser probes** — see sections 3 and 7.
- LCP improved to **564 ms** (headless local); asset recompression was audited and found to have no safe win (see §5).

The "black sections" reported during QA were **a bug in the QA tooling, not the site**: a hand-rolled Node PNG decoder produced false-black output. Cross-verification with Pillow confirmed every scene renders correctly. The broken decoder was replaced with `qa/qa-grid.py`.

---

## 2. Scene-by-scene composition (what is visually different about each section)

| # | Scene | Background | Compositional idea (not "cards + colour change") |
|---|-------|-----------|--------------------------------------------------|
| 01 | **Hero** — "ASIA, HANDLED." | Deep navy, photographic | Split cinematic composition; edge-aligned display serif; destination selector rendered as a **route map with waypoint nodes and a drawing route line** (signature interaction); programme metadata as floating labels; choreographed entry sequence (image mask → type lines → metadata → CTA) |
| 02 | **EditorialIntro** | Warm ivory | Oversized serif statement that a **full-bleed photographic band crosses through**; image overlaps typography; route strip with coordinates replaces a facts grid. No invented statistics — only verifiable facts (4 destinations) |
| 03 | **DestinationChapters** | Deep navy, full-bleed | Sticky immersive canvas; each scroll step is a **chapter**: giant destination serif over full-screen photography, **ghost numeral** (e.g. 337px "01") behind the type, edge chapter rail, image exits via clip+scale while the next enters via mask. Mobile converts to a vertical story, not a shrunken desktop |
| 04 | **ExperienceScene** | Ivory | **Typography IS the interface** — six oversized serif rows, no cards; the photograph floats free and **tracks the cursor between rows** (desktop) or docks as a tap-to-change plate (mobile) |
| 05 | **B2BTrust** | Deep navy | Magazine-spread sequence: **giant ghost numerals 01–04** with statement swap per capability (Destination-Led Planning / Tailor-Made Programmes / Responsive Communication / Operational Precision); no icon cards, no invented "since 1995" |
| 06 | **JourneyRail** | Stone | The route becomes physical: a **continuous line running behind full-height photography** with diamond nodes between plates; vertical scroll drives horizontal rail movement; route metadata floats around images. Real itineraries only (Golden Triangle, Ha Long & Ninh Binh, …) |
| 07 | **JournalFeature** | Warm white | Publication layout: **one dominant cover story** + asymmetric secondaries with article numbers — not three identical cards |
| 08 | **FinalCTA** | Deep navy | **Signature WebGL moment**: raw-WebGL topographic contour field (~2 KB, no Three.js) with route line drawing toward the CTAs; oversized two-tone statement; REQUEST A QUOTE / BECOME A PARTNER |

**Rhythm:** navy → ivory → navy → ivory → navy → stone → white → navy. No two adjacent scenes share a composition.

---

## 3. Animation inventory — verified status

Every entry below reflects **browser verification via the CDP QA harnesses** (`qa/qa-functional.mjs`, `qa/qa-lenis-probe.mjs`, `qa/qa-final.mjs`, `qa/qa-final2.mjs`), not code inspection alone.

| Animation | Element | Trigger | Library | Status | Verification |
|---|---|---|---|---|---|
| Hero entry sequence (image mask → type → metadata → CTA) | Hero | Mount (deterministic stagger chain) | Framer Motion | **WORKING — entrance verified mid-flight** (headline at translateY(167px) at t≈170–300ms, settles to identity; fixed via `AnimatePresence initial={false}` removal) | rAF-recorder probe `qa-master.mjs` §1 |
| Hero route draw + waypoint activation | RoutePath SVG | Mount + destination select | Framer Motion `pathLength` | **WORKING** | Rendered in captures; route map present in DOM |
| Destination chapter transitions ×4 | DestinationChapters | Scroll position in sticky scene | Framer `AnimatePresence` (clip+scale exit / mask enter) | **WORKING — all four chapters engage** | Probe sampled 5 scroll fractions, observed 4 distinct chapter states |
| Lenis smooth scroll | Window (single instance in `App.jsx`) | — | Lenis | **WORKING** | Wheel-event probe: page scrolled under synthetic wheel |
| CTA topographic WebGL field | TopographicField canvas | IntersectionObserver engage | Raw WebGL (lazy) | **WORKING — live canvas, fallback layer hidden** | DOM probe: canvas present, `data-mode` set, SVG hidden |
| WebGL fallback (reduced motion / no WebGL) | StaticFallback SVG | `data-fallback` attribute on host | CSS swap | **VERIFIED end-to-end under emulated `prefers-reduced-motion`**: host flagged, canvas `display:none`, SVG `display:block` | `qa-master.mjs` §2 |
| Experience image follows cursor | Floating ghost plate | `mousemove` (rAF-free, transform-only) | Direct style writes | **WORKING** | Hover-state probe confirmed interaction live |
| Style row activation (hover/tap/keyboard) | ExperienceScene rows | hover / focus / click | Framer + CSS | **WORKING** | Probe confirmed state change; keyboard focus verified in a11y pass |
| Journey horizontal rail | JourneyRail | Scroll (vertical → horizontal transform) | Framer `useScroll`/`useTransform` | **WORKING** | Captures at rail start/mid show plate movement; scene verified at position |
| Journal / Trust / Intro reveals | RevealText, ImageReveal | `whileInView` | Framer Motion | **WORKING — in-view elements verified visible at every sampled scroll position; below-fold elements correctly hidden pre-reveal** | Scene captures + in-view visibility probe |
| Mobile menu open/close | PremiumNav overlay | Tap / Escape | Framer + focus management | **WORKING** | Probe: full-screen, 8 links, `aria-expanded`, Escape closes, focus moves into dialog |
| Nav scroll-state transformation | PremiumNav | Scroll threshold | CSS class swap | **WORKING** | Visible across captures (transparent over hero → solid below) |

### Verified negative findings (checked, none found)

- **No element renders in final state before its animation** — initial states are declared in JSX (`initial={{...}}`), so first paint is the animation's start state, not the end state.
- **No duplicate Lenis instance / no duplicate RAF loop** — one Lenis in `App.jsx`; all scroll-driven motion reads window scroll through Framer's single loop. The earlier no-op Lenis RAF found in `DestinationChapters` was removed.
- **No setState inside animation loops** — the cursor-tracking ghost image writes `transform` directly to the element (no React state per mousemove).
- **No transform ownership conflicts** — each animated element is owned by exactly one system (Framer for scroll/mount choreography, CSS transitions for hover micro-states, direct style writes only for cursor tracking). GSAP is **not loaded on the homepage at all** (lazy-loaded chunk used only by service/about pages via a registered-flag refresh).
- **No console errors, no exceptions, no broken image requests** across all capture runs.
- **No horizontal overflow** at 1440×900 and 390×844 (0 px).
- **No CLS-risk images** — every content image declares width/height or an aspect-ratio container.

---

## 4. Architecture

```
HomePage (src/pages/Home.jsx — Seo + JsonLd, no duplicate nav/footer)
├── PremiumNav          (fixed routes, a11y mobile overlay)
├── Hero                (route-map signature)
├── EditorialIntro      (statement × full-bleed band)
├── DestinationChapters (sticky scroll scene)
├── ExperienceScene     (typography interface)
├── B2BTrust            (ghost-numeral sequence)
├── JourneyRail         (horizontal cinematic rail)
├── JournalFeature      (magazine cover treatment)
├── FinalCTA            (TopographicField WebGL)
└── Footer              (real routes, real contact data)

Shared: homeContent.js (all real content + local assets),
        motionTokens.js (easing vocabulary),
        homeMotion.jsx (RevealText, ImageReveal, ArrowLink…),
        RoutePath.jsx (route-line primitives),
        lib/lenisRef.js (single Lenis handle)
```

**Scroll architecture:** ONE Lenis instance (App-level) + Framer Motion reading window scroll. No GSAP on the homepage. No multiple smooth-scroll engines.

---

## 5. Performance (measured)

| Metric | Result |
|---|---|
| LCP (headless, local preview) | **564 ms** (phase 2) — was ~830 ms before entrance-animation fix |
| Index chunk | 99.8 kB (27.7 kB gz) |
| GSAP on homepage | **not loaded** |
| Three.js | **not used** (custom ~2 KB WebGL) |
| Console errors (entire QA session incl. 4 route round-trips) | 0 |
| CLS-risk images | 0 |
| Horizontal overflow (6 viewports + live swaps) | 0 px |
| Asset recompression audit | **no safe win** — all ≥200 KB webps already efficiently encoded (q80 re-encode kept only if ≥15% smaller; none qualified) |

---

## 6. Compliance audits

- **Destinations:** India, Vietnam, Japan, South Korea only. No Australia anywhere in homepage code/metadata (remaining reference is an unrelated currency option, out of homepage scope).
- **Air Ticketing / IATA:** zero references in source. Not in nav, sections, CTAs, or metadata.
- **No invented facts:** no fabricated stats, awards, years, clients, or certifications. EditorialIntro states only the four-destination fact; Trust uses the four real differentiators.
- **SEO:** single title/description ("B2B DMC Partner for India, Vietnam, Japan & South Korea" direction), canonical, OG/Twitter, JSON-LD via `Seo.jsx`. No localhost URLs in homepage code (grep-audited).
- **Routes:** nav/footer link only to real routes (`/request-quote`, `/become-a-partner`, `/destination/:slug`, `/blog`, …). Dead legacy `Navbar.jsx` deleted; duplicate nav/footer render removed from Home.

---

## 7. Remaining known limitations (honest)

All previously-flagged QA gaps (reduced motion, resize/orientation, mid-animation frames, route-change cleanup, intermediate breakpoints) are now **closed — verified via `qa/qa-master.mjs` on the rendered site**. What remains:

1. **No responsive image variants** — the ~2.5–3 MB of homepage imagery is served at intrinsic sizes regardless of viewport. Mobile-sized `srcset` variants (e.g. 560px-wide portrait plates) are the next performance win; recompression alone was audited and yields nothing without downscaling.
2. **Guardrail:** `AnimatePresence mode="wait"` in `App.jsx` must **not** get `initial={false}` re-added — it silently disables every mount-time animation on first load (the original "site looks static" bug).
3. **Reduced-motion probe coverage** — intro-scene reveal + CTA fallback are probed under the emulated profile; Trust/Journal use the same `whileInView` primitives but are not individually probed.
4. **No Lighthouse/axe run** — a11y was verified by probes (landmarks, alt, focus, touch targets, contrast of key text) rather than a full automated audit.

---

## 8. QA tooling shipped (reusable)

| File | Purpose |
|---|---|
| `qa/qa-capture.mjs` | Full-page scroll capture + console/network/overflow report (desktop + mobile) |
| `qa/qa-functional.mjs` | Chapter transitions, WebGL state, CLS-risk images |
| `qa/qa-lenis-probe.mjs` | Verifies Lenis responds to real wheel events |
| `qa/qa-final.mjs` / `qa/qa-final2.mjs` | Per-scene capture with DOM ground-truth at capture-moment; mobile pass |
| `qa/qa-master.mjs` | **Phase-2 master probe**: input sanity, mid-animation sampling (rAF recorder), reduced-motion emulation, resize/orientation sweep, route-change cleanup |
| `qa/qa-grid.py` | **PIL-based** ASCII luminance inspector (replaces the broken Node decoder — do not use `qa-visual-inspector.mjs`) |

---

## 9. Acceptance against the 2026 test

- *Could this be any premium travel website?* — The route/waypoint/coordinate system, ghost numerals, typography-as-interface experience index and topographic WebGL field are specific to this build, not template furniture.
- *Card count on homepage:* zero card grids. Cards exist nowhere as the primary pattern; every section uses editorial composition instead.
- *Does the composition communicate movement/destination?* — Route lines draw, chapters advance through full-screen places, the journey rail physically travels horizontally, and the CTA emerges from a topographic field.
