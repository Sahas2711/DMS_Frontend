# Homepage Visual Failure — Forensic Audit Report

**Scope:** Read-only code analysis of 8 homepage sections in `src/pages/Home/`
**Date:** 2026-09-16
**Status:** Analysis complete — no code changes made

---

## PHASE 1 — Component Inventory

| # | Section | File | Height Strategy | Scroll Architecture | Animation Entry |
|---|---------|------|-----------------|--------------------|-----------------| 
| 1 | Hero | `Hero.jsx` | `lg:h-[100svh]` | Framer Motion `useScroll` on `sectionRef` | `animate` (immediate) |
| 2 | Editorial Intro | `EditorialIntro.jsx` | Content-driven (~120vh) | Framer Motion `useScroll` on `ref` | `whileInView` |
| 3 | Destination Chapters | `DestinationChapters.jsx` | `total * 100vh` (400vh) | Native `getBoundingClientRect` + `requestAnimationFrame` | `AnimatePresence` keyed on `progress` |
| 4 | Experience Scene | `ExperienceScene.jsx` | Content-driven (~100vh) | None (static) | `whileInView` + hover state |
| 5 | B2B Trust | `B2BTrust.jsx` | Content-driven (~100vh) | None (static) | `whileInView` + `AnimatePresence mode="wait"` |
| 6 | Journey Rail | `JourneyRail.jsx` | `JOURNEYS.length * 60 + 40vh` (400vh) | Framer Motion `useScroll` on `sectionRef` | `whileInView` |
| 7 | Journal Feature | `JournalFeature.jsx` | Cover: `h-[78vh] lg:h-[92vh]` | None (static) | `whileInView` |
| 8 | Final CTA | `FinalCTA.jsx` | `min-h-[95svh]` | Framer Motion `useScroll` on `ref` | `whileInView` |

**Root App (`App.jsx`):** Lenis singleton, destroyed on mobile/touch/reduced-motion/admin. RAF loop at `duration: 0.9`. Body forced `position: static !important; top: 0px !important` to override any Lenis CSS side-effects.

**Motion primitives (`homeMotion.jsx`):**
- `RevealText`: `<span class="overflow-hidden"><motion.span y: 110% → 0% whileInView /></span>`
- `ImageReveal`: clipPath `inset(0 0 100% 0)` → `inset(0 0 0% 0)` whileInView
- `ParallaxImage`: `useScroll` + `useTransform` for vertical parallax

---

## PHASE 2 — Reproduction Path

The recording shows 6 distinct visual failures (labelled A–F). Each is traced below through the exact code path that produces it.

---

## PHASE 3 — Specific Failure Analysis

### (A) EXPERIENCE SCENE — "six ways in"

**Symptoms:** Low contrast inactive text, image overlapping rows, excessive blank space, absolute positioning issues.

#### A1: Inactive text contrast FAILURE — `ExperienceScene.jsx:187-199`

```jsx
// Active state (line 194):
active ? 'translate-x-3 text-navy' : 'text-navy/35 group-hover:translate-x-1.5 group-hover:text-navy/65'
```

- **Active text:** `text-navy` = `#1f2737` on `bg-ivory` (#fbf9f4) → contrast ratio **≈12.5:1** ✓ WCAG AAA
- **Inactive text:** `text-navy/35` = rgba(31,39,55,0.35) on #fbf9f4 → contrast ratio **≈1.8:1** ✗ FAILS WCAG AA (4.5:1 minimum)
- **Hover text:** `text-navy/65` = rgba(31,39,55,0.65) on #fbf9f4 → contrast ratio **≈3.2:1** ✗ Still fails AA

The inactive rows are nearly invisible. The style name, the supporting line (`text-navy/55` at line 211), and the index number (`text-navy/30` at line 188) all fall below WCAG AA.

#### A2: Ghost image positioning — `ExperienceScene.jsx:22-30, 72-95`

```jsx
const onMove = (e) => {
    const rect = listRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.transform = `translate(${x - 130}px, ${y - 165}px) rotate(...)`;
};
```

- Ghost image is `absolute left-0 top-0 z-20` with hardcoded `h-[330px] w-[260px]`
- The offset `x - 130, y - 165` is calibrated for a 260×330 image centered on the cursor
- **Problem:** The ghost image sits in the list container's coordinate space (`listRef`). When the cursor is near the top or left edge of the list, the ghost image extends above/left of the list boundary — but the outer section has `overflow-hidden`, so the image gets clipped at the section boundary
- **Problem:** The ghost image (`z-20`) overlaps the list rows (`z-10`). The active row's `translate-x-3` (12px) is subtle against a 260px-wide floating image. The inactive rows' text (`text-navy/35`) becomes even harder to read when the ghost image hovers over them

#### A3: Hover-only visibility — `ExperienceScene.jsx:75-77`

```jsx
className={`... ${hovering ? 'opacity-100' : 'opacity-0'}`}
```

- Ghost image is **completely invisible** until the user hovers over the list area
- On mobile (`hidden lg:block`), the ghost image never appears at all
- The section relies entirely on the mobile docking plate (`mt-12 lg:hidden`) for mobile visual feedback — the desktop and mobile experiences are completely different

#### A4: Excessive blank space

The section's vertical padding:
- Mobile: `pt-24 pb-24` = 192px total padding
- Desktop: `pt-32 pb-36` = 272px total padding
- Plus `mt-16 lg:mt-24` gap between header and list (64-96px)

The list rows: 6 rows × `py-6 lg:py-8` = 288-384px of row padding alone.

This is within normal editorial bounds, but the combination of generous padding + invisible ghost image + low-contrast inactive text makes the section feel sparse and empty.

---

### (B) B2B TRUST / PRINCIPLES — "THE PARTNERSHIP"

**Symptom:** A huge empty navy region before principle content becomes visible.

#### B1: `whileInView` animation chain — `B2BTrust.jsx:27-36`

```jsx
<motion.p
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="mb-6 ... text-gold/70"
>
    The partnership
</motion.p>
```

The kicker text starts at `opacity: 0`. It only becomes visible when IntersectionObserver fires.

#### B2: `RevealText` heading — `B2BTrust.jsx:37-42`

```jsx
<h2>
    <RevealText>Local knowledge.</RevealText>
    <RevealText delay={0.12}>
        <span className="italic text-gold">Global standards.</span>
    </RevealText>
</h2>
```

`RevealText` (from `homeMotion.jsx:14-30`):
```jsx
<span className="block overflow-hidden">
    <Tag
        initial={reduce ? { opacity: 0 } : { y: '110%' }}
        whileInView={reduce ? { opacity: 1 } : { y: '0%' }}
        viewport={{ once: true, margin: '-8% 0px' }}
        ...
    >
        {children}
    </Tag>
</span>
```

- The heading text starts at `y: '110%'` — fully translated below its `overflow-hidden` parent
- **The text is completely invisible** until `whileInView` triggers
- The `-8%` viewport margin means the element must scroll 8% INTO the viewport before triggering

#### B3: ROOT CAUSE of "huge empty navy region"

The section has `bg-navy-deep` (dark navy). The content hierarchy:
1. Kicker text (`opacity: 0` → `whileInView`)
2. Heading (`y: 110%` → `whileInView`)
3. Subtitle text (static, `text-white/40` — low contrast but visible)
4. Ghost numeral (`opacity: 0.1` — barely visible)
5. Principle content (`AnimatePresence`)

**When `whileInView` hasn't triggered yet, the entire top half of the section is invisible.** The user sees:
- A large navy rectangle
- The ghost numeral at 10% opacity (nearly invisible)
- The progress rail at the bottom
- The subtitle at `text-white/40` (very low contrast)

This creates the "huge empty navy region" appearance.

#### B4: Why `whileInView` might delay

The `viewport={{ once: true, margin: '-8% 0px' }}` on `RevealText` means the element must be 8% inside the viewport before triggering. With Lenis smooth scrolling, the scroll position updates gradually. If the user scrolls quickly past the section, the IntersectionObserver might not fire until the user stops scrolling.

Additionally, the section's generous padding (`pt-24 lg:pt-36` = 96-144px) means the content is positioned well below the section's top edge. The user must scroll past the section's top padding before the content enters the viewport.

#### B5: Ghost numeral overflow — `B2BTrust.jsx:54, 62`

```jsx
<div className="relative flex h-[240px] items-center overflow-hidden lg:h-[340px]">
    <motion.span
        className="display-xl ... text-[clamp(11rem,26vh,20rem)]"
    >
```

- Mobile: container is 240px tall, but `clamp(11rem, 26vh, 20rem)` at 26vh on a 900px viewport = 234px. On a shorter viewport (600px), 26vh = 156px. On a taller viewport (1200px), 26vh = 312px — **overflows the 340px container on desktop**
- Desktop: container is 340px, `clamp(11rem, 26vh, 20rem)` at 26vh on 900px = 234px ✓. At 1400px viewport, 26vh = 364px — **overflows the 340px container**
- The `overflow-hidden` on the container clips the overflow, but the image plate (`absolute bottom-2 right-2 w-28`) might be clipped incorrectly

---

### (C) PRINCIPLE TRANSITIONS

**Symptom:** Principle 01 disappears before Principle 02 becomes visible — a long blank interpolation state.

#### C1: `AnimatePresence mode="wait"` — `B2BTrust.jsx:112`

```jsx
<AnimatePresence mode="wait" initial={false}>
    <motion.div
        key={cap.number}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.55, ease: EASE_EDITORIAL }}
    >
```

With `mode="wait"`:
1. Old content exits: `opacity: 1 → 0`, `y: 0 → -20` over **0.55s**
2. **Blank gap: ~0ms** (exit completes before enter starts)
3. New content enters: `opacity: 0 → 1`, `y: 30 → 0` over **0.55s**

Total visible blank time: **~0.55s** (the exit duration, during which content fades out, followed by the enter start which begins at opacity: 0)

#### C2: Interaction-triggered transitions

```jsx
<button onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}>
```

The principles switch on BOTH click AND hover. On hover, the 0.55s exit + 0.55s enter = **1.1s total transition**. On a fast mouse movement across the progress rail, the user triggers multiple rapid transitions. Each transition queues behind the previous one (AnimatePresence mode="wait" serializes them), causing:
- Principle 01 exits (0.55s)
- Principle 02 enters (0.55s)
- User has already moved to Principle 03
- Principle 02 exits (0.55s)
- Principle 03 enters (0.55s)

The visual result is a **stuttering cascade** where content flickers in and out.

#### C3: Ghost numeral transition — `B2BTrust.jsx:55-66`

```jsx
<AnimatePresence mode="popLayout" initial={false}>
    <motion.span
        key={cap.number}
        initial={reduce ? { opacity: 0.06 } : { opacity: 0, y: 60 }}
        animate={{ opacity: 0.1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -60 }}
        transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
    >
```

The ghost numeral uses `mode="popLayout"` (different from the statement's `mode="wait"`). This means the old numeral exits while the new one enters simultaneously. But the numeral is at `opacity: 0.1` — barely visible. The transition is decorative, not functional.

---

### (D) JOURNEY RAIL — "CURATED JOURNALS"

**Symptom:** Overlapping images, hidden text, inconsistent card geometry, horizontal rail math issues.

#### D1: Section height calculation — `JourneyRail.jsx:42`

```jsx
style={{ height: reduce ? undefined : `${JOURNEYS.length * 60 + 40}vh` }}
```

- `JOURNEYS.length` = 6 (from homeContent.js)
- Height: `6 * 60 + 40 = 400vh`
- Sticky container: `h-screen` (100vh)
- Scroll range for animation: 300vh (400vh - 100vh)

The `useScroll` offset: `['start start', 'end end']`
- Starts tracking when section top hits viewport top
- Stops tracking when section bottom hits viewport bottom
- `scrollYProgress` ranges from 0 to 1 over 300vh of scroll

#### D2: Horizontal rail math — `JourneyRail.jsx:21, 28, 35`

```jsx
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
// ...
setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
// ...
const x = useTransform(scrollYProgress, [0.05, 0.95], ['0px', `${-distance}px`]);
```

- `distance` = `track.scrollWidth - window.innerWidth`
- Track contains 6 journey cards + 1 end plate
- Card widths: `w-[82vw]` mobile, `w-[clamp(400px,32vw,520px)]` desktop
- Gap: `gap-6` mobile (24px), `lg:gap-0` desktop (0px)
- Padding: `px-5 sm:px-8 lg:px-12` (20-48px)

**Desktop calculation (1440px viewport):**
- 6 cards × 32vw = 6 × 460px = 2760px
- 1 end plate × 34vw = 490px
- Padding: 48px × 2 = 96px
- Total track width: ~3346px
- Distance: 3346 - 1440 = 1906px

The `x` transform maps `[0.05, 0.95]` → `['0px', '-1906px']`. This means:
- At 5% scroll (15vh): rail starts moving
- At 95% scroll (285vh): rail stops moving
- 30vh of dead scroll at the edges

#### D3: Card geometry issues — `JourneyRail.jsx:140, 149-173`

```jsx
const HEIGHTS = ['aspect-[4/5]', 'aspect-[3/4] lg:aspect-[16/11] lg:mt-24', 'aspect-[4/5]', 'aspect-[3/4] lg:aspect-[16/11] lg:mt-24'];
```

Alternating cards:
- Cards 0, 2: `aspect-[4/5]` — tall portrait
- Cards 1, 3: `aspect-[3/4]` mobile, `aspect-[16/11]` desktop + `lg:mt-24` (96px offset)

**Problem:** The `lg:mt-24` creates a 96px vertical offset. Combined with `overflow-hidden` on the sticky container, cards with `mt-24` might be partially clipped at the top or bottom.

#### D4: Title overlap — `JourneyRail.jsx:172-177`

```jsx
<h3 className="-mt-8 px-5 font-display ...">
    <span className="bg-stone/95 px-2 py-1 box-decoration-clone">
        {journey.title}
    </span>
</h3>
```

- The title has `-mt-8` (-32px), pulling it UP into the image container
- The image container has `overflow-hidden` — but the title is OUTSIDE the image container (sibling, not child)
- The `-mt-8` makes the title visually overlap the image's bottom edge
- The `bg-stone/95` background creates a "floating label" effect over the image
- **Problem:** The `box-decoration-clone` ensures the background extends across the full width of the span, but the title's `px-5` padding means the background doesn't reach the image edges

#### D5: Route line positioning — `JourneyRail.jsx:80-91`

```jsx
<div className="absolute left-0 right-0 top-[58%] hidden lg:block">
    <div className="h-px w-full bg-navy/20" />
```

The route line is positioned at `top: 58%` of the rail container. The cards with `lg:mt-24` are offset 96px downward. If the rail container is ~400px tall (center of 100vh viewport), the route line is at 232px. The offset cards' images might not align with the route line as intended.

---

### (E) JOURNAL FEATURE — "FIELD NOTES"

**Symptom:** Large blank white region before the journal heading/content appears.

#### E1: Cover image loading — `JournalFeature.jsx:22-32`

```jsx
<div className="group relative h-[78vh] overflow-hidden lg:h-[92vh]">
    <motion.img
        src={feature.image}
        initial={reduce ? undefined : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: EASE_EDITORIAL }}
        loading="lazy"
    />
```

- The image is loaded `lazy` — it only loads when the user scrolls near it
- The cover container is `bg-warm-white` (#fdfcfa) — nearly white
- If the image hasn't loaded yet, the user sees a **78-92vh white rectangle**
- The `scale: 1.12 → 1` animation is `whileInView` — it only starts when the image enters the viewport
- But the image itself might not have loaded yet, so the user sees a white box that gradually scales... nothing

#### E2: Content positioning — `JournalFeature.jsx:36-65`

```jsx
<div className="absolute inset-x-0 bottom-0">
    <div className="mx-auto max-w-[1500px] px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
        >
```

The header content (kicker, headline, excerpt, link) is positioned at `absolute inset-x-0 bottom-0` with `pb-12 lg:pb-16`. This places it at the bottom of the cover.

**Problem:** If the cover image hasn't loaded, the content appears at the bottom of a white rectangle. The content itself uses `whileInView` — so it also needs to enter the viewport before becoming visible.

The `margin: '-10% 0px'` means the content must be 10% inside the viewport before triggering. Combined with the cover's 78-92vh height, the content is near the bottom of the cover. On a 900px viewport, the content is at ~700-830px from the top of the section. The user must scroll until this position is 10% inside the viewport (810px from the top of the viewport).

#### E3: Secondary stories — `JournalFeature.jsx:69-126`

```jsx
<div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
    <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        {[second, third].map((story, i) => (
            <motion.article
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
                whileInView={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                className={`group lg:col-span-6 ${i === 1 ? 'lg:col-start-7 lg:mt-24' : ''}`}
            >
```

The secondary stories have `py-20 lg:py-28` (80-112px padding) above them. The second story has `lg:mt-24` (96px offset). This creates significant vertical space between the cover and the secondary stories.

**Combined effect:** After the JourneyRail (400vh), the user scrolls into JournalFeature. They see:
1. A large cover image (78-92vh) — potentially white if image hasn't loaded
2. Content at the bottom of the cover — may be invisible due to `whileInView`
3. After the cover: `py-20 lg:py-28` padding (80-112px)
4. Then the secondary stories

The "large blank white region" is the cover image area before it loads + the padding before the secondary stories.

---

### (F) CTA / FOOTER

**Symptom:** Excessive vertical space, composition problem.

#### F1: FinalCTA height — `FinalCTA.jsx:29`

```jsx
className="relative flex min-h-[95svh] items-end overflow-hidden bg-navy-deep text-white"
```

- `min-h-[95svh]` = 95% of small viewport height
- Content is positioned at `items-end` — pushed to the bottom
- Top padding: `pt-32` (128px) for the content container

The section is designed to be nearly full-screen with content at the bottom. This is intentional editorial design. But the `pt-32` + content + `pb-16 lg:pb-24` creates ~400px of content height within a 95svh container. The top ~60% of the section is photographic + WebGL overlay.

#### F2: Footer height — `Footer.jsx:39`

```jsx
<div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
```

- `py-16 lg:py-20` = 64-80px vertical padding
- Content: masthead + 5-column link grid + legal row
- Estimated total height: ~500-600px

#### F3: Composition between FinalCTA and Footer

The FinalCTA has `bg-navy-deep` and the Footer has `bg-navy-deep`. They share the same background color, creating a seamless dark section. But the FinalCTA has `min-h-[95svh]` while the Footer is content-driven (~500px).

**Potential issue:** If the FinalCTA's content is pushed to the very bottom (`items-end`), there's a large photographic area above the content. After the JournalFeature's secondary stories, the user scrolls into a nearly full-screen dark section. The transition from `bg-warm-white` (JournalFeature) to `bg-navy-deep` (FinalCTA) is abrupt.

The gradient overlay on FinalCTA:
```jsx
<div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-navy-deep/40" />
```

This gradient goes from opaque navy at the bottom to 40% navy at the top. The photographic base is at `opacity-25`. The TopographicField WebGL canvas is at `fieldOpacity` (0.15 to 0.8 based on scroll).

---

## PHASE 4 — CSS Geometry Audit

### 4.1 Container widths

| Section | Container Width | Padding |
|---------|----------------|---------|
| Hero | Full bleed | `px-5 sm:px-8 lg:px-12` |
| EditorialIntro | `max-w-[1500px]` | `px-5 sm:px-8 lg:px-12` |
| DestinationChapters | Full bleed (sticky) | `px-12` |
| ExperienceScene | `max-w-[1500px]` | `px-5 sm:px-8 lg:px-12` |
| B2BTrust | `max-w-[1500px]` | `px-5 sm:px-8 lg:px-12` |
| JourneyRail | `max-w-[1500px]` (header) | `px-5 sm:px-8 lg:px-12` |
| JournalFeature | `max-w-[1500px]` (content) | `px-5 sm:px-8 lg:px-12` |
| FinalCTA | `max-w-[1500px]` | `px-5 sm:px-8 lg:px-12` |
| Footer | `max-w-[1440px]` | `px-5 sm:px-8 lg:px-12` |

**Inconsistency:** Footer uses `max-w-[1440px]` while all homepage sections use `max-w-[1500px]`. This creates a 60px width difference at the widest breakpoint.

### 4.2 Section vertical rhythm

| Section | Top Padding | Bottom Padding | Total Vertical |
|---------|------------|----------------|----------------|
| Hero | N/A (flex) | N/A | 100svh |
| EditorialIntro | `pt-24 lg:pt-36` | `pb-24 lg:pb-32` | 192-272px |
| DestinationChapters | N/A (sticky) | N/A | 400vh |
| ExperienceScene | `pt-24 lg:pt-32` | `pb-24 lg:pb-36` | 192-272px |
| B2BTrust | `pt-24 lg:pt-36` | `pb-28 lg:pb-40` | 208-304px |
| JourneyRail | N/A (sticky) | N/A | 400vh |
| JournalFeature | N/A (cover) | `py-20 lg:py-28` (secondary) | 80-112px |
| FinalCTA | `pt-32` | `pb-16 lg:pb-24` | 176-224px |

**Inconsistency:** B2BTrust has `pb-28 lg:pb-40` (112-160px bottom padding) while ExperienceScene has `pb-24 lg:pb-36` (96-144px). The extra 16px on B2BTrust creates a noticeable gap before JourneyRail.

### 4.3 Sticky container heights

| Section | Sticky Height | Section Height | Scroll Range |
|---------|--------------|----------------|--------------|
| DestinationChapters | `h-screen` (100vh) | `total * 100vh` (400vh) | 300vh |
| JourneyRail | `h-screen` (100vh) | `JOURNEYS.length * 60 + 40vh` (400vh) | 300vh |

Both sticky sections have identical scroll ranges. This is consistent.

---

## PHASE 5 — Animation Ownership Audit

### 5.1 Transform conflicts

| Element | CSS Transform | Framer Motion Transform | Conflict? |
|---------|--------------|------------------------|-----------|
| Hero image | None | `scale: imgScale` (1 → 1.12) | No |
| EditorialIntro band | None | `x: bandX`, `scale: bandScale` | No |
| DestinationChapters image | None | `scale: 1.12 → 1.02` | No |
| ExperienceScene ghost | `translate(...)` via JS | `opacity` via FM | No (different axes) |
| JourneyRail track | None | `x` (scroll-driven) | No |
| JourneyRail card img | `group-hover:scale-[1.05]` | None | No (CSS only) |
| FinalCTA image | None | `y: imgY` (-10% → 0%) | No |
| FinalCTA TopographicField | None | `opacity: fieldOpacity` | No |

**No transform conflicts found.** Each element has a single animation owner.

### 5.2 Scroll ownership

| Section | Scroll Owner | Mechanism | Lenis-compatible? |
|---------|-------------|-----------|-------------------|
| Hero | Framer Motion `useScroll` | `window.scrollY` | ✓ (Lenis updates `window.scrollY`) |
| EditorialIntro | Framer Motion `useScroll` | `window.scrollY` | ✓ |
| DestinationChapters | Custom `getBoundingClientRect` | `window.scrollY` via listener | ✓ |
| ExperienceScene | None | Static | N/A |
| B2BTrust | None | Static | N/A |
| JourneyRail | Framer Motion `useScroll` | `window.scrollY` | ✓ |
| JournalFeature | None | Static | N/A |
| FinalCTA | Framer Motion `useScroll` | `window.scrollY` | ✓ |

**Critical note on DestinationChapters:** Uses raw `getBoundingClientRect` with `requestAnimationFrame` debouncing. This reads the native scroll position directly. Lenis updates `window.scrollY` via `window.scrollTo()`, so `getBoundingClientRect` should return the correct value. However, there might be a 1-frame lag between Lenis updating the scroll position and `getBoundingClientRect` reflecting it.

---

## PHASE 6 — Performance Audit

### 6.1 RAF loops

| Component | RAF Source | Frequency | Pause Condition |
|-----------|-----------|-----------|-----------------|
| App.jsx (Lenis) | `requestAnimationFrame(raf)` | Every frame | Destroyed on mobile/touch/reduced-motion |
| DestinationChapters | `requestAnimationFrame(measure)` | On scroll event | Cleaned up on unmount |
| TopographicField | `requestAnimationFrame(frame)` | Every frame | IntersectionObserver + visibilitychange |
| JourneyRail | None (FM handles) | N/A | N/A |

### 6.2 IntersectionObserver usage

| Component | Purpose | rootMargin |
|-----------|---------|------------|
| TopographicField | Pause WebGL when offscreen | Default |
| All `whileInView` elements | Trigger animations | `-8% 0px` (RevealText), `-10% 0px` (others) |

### 6.3 Image loading

| Section | Loading Strategy | Impact |
|---------|-----------------|--------|
| Hero (active) | `eager` + `fetchPriority="high"` | Fast first paint |
| Hero (inactive) | `lazy` | Deferred |
| DestinationChapters | `lazy` | Deferred until scroll |
| ExperienceScene ghost | `lazy` (inside AnimatePresence) | Deferred |
| B2BTrust | `lazy` | Deferred |
| JourneyRail cards | `lazy` | Deferred |
| JournalFeature cover | `lazy` | **Defers cover image** |
| FinalCTA | `lazy` | Deferred |

**Performance risk:** JournalFeature's cover image is `lazy`-loaded. The cover is `h-[78vh] lg:h-[92vh]` — nearly full viewport. If the image hasn't loaded when the user scrolls into view, they see a white rectangle for the duration of the load.

---

## PHASE 7 — Compliance / Content Audit

### 7.1 Unverified claims

| File | Line | Claim | Status |
|------|------|-------|--------|
| `FinalCTA.jsx` | 122 | "24/7 ground support" | NOT VERIFIED |
| `Services.jsx` | 32 | "Dedicated 24/7 on-trip concierge" | NOT VERIFIED |
| `Services.jsx` | 80 | "24/7 dedicated operations control center" | NOT VERIFIED |
| `Services.jsx` | 101 | "24/7 Live Monitoring" | NOT VERIFIED |
| `TravelTrade.jsx` | 33 | "24/7 Ground Support" | NOT VERIFIED |
| `Checkouts.jsx` | 1023 | "24/7 Operations Desk" | NOT VERIFIED |

### 7.2 Out-of-scope content

| File | Line | Content | Issue |
|------|------|---------|-------|
| `Checkouts.jsx` | 34 | Australia country code (+61) | Allowed destinations: India, Vietnam, Japan, South Korea only |
| `forms.test.jsx` | 77, 192 | "Australia" in test data | Test-only, low risk |

---

## ROOT CAUSES — Ranked by Severity

### 1. B2BTrust "empty navy region" — ANIMATION GATING (Critical)

**File:** `B2BTrust.jsx:27-42`, `homeMotion.jsx:14-30`
**Root cause:** Kicker (`opacity: 0`) and heading (`y: 110%` via RevealText) are invisible until `whileInView` triggers. The section's `bg-navy-deep` makes invisible content appear as empty navy space.
**Fix:** Either (a) make the initial content visible and only animate the decorative elements, or (b) reduce the `viewport.margin` so animations trigger earlier, or (c) add a CSS fallback that shows content when JS hasn't triggered yet.

### 2. ExperienceScene contrast — ACCESSIBILITY FAILURE (Critical)

**File:** `ExperienceScene.jsx:187-199, 208-213`
**Root cause:** `text-navy/35` on `bg-ivory` = ~1.8:1 contrast ratio. Fails WCAG AA (4.5:1).
**Fix:** Increase inactive opacity to at least `text-navy/70` (~5.5:1) for WCAG AA compliance.

### 3. B2BTrust principle transitions — BLANK GAP (High)

**File:** `B2BTrust.jsx:112-137`
**Root cause:** `AnimatePresence mode="wait"` serializes exit (0.55s) before enter (0.55s). Total visible blank: ~0.55-1.1s.
**Fix:** Change to `mode="sync"` or `mode="popLayout"` to overlap exit/enter animations.

### 4. JournalFeature cover lazy loading — WHITE FLASH (High)

**File:** `JournalFeature.jsx:22-32`
**Root cause:** Cover image `loading="lazy"` on a 78-92vh container. Image may not load until user is already viewing the section.
**Fix:** Change to `loading="eager"` for the cover image, or add a `fetchPriority="high"`.

### 5. ExperienceScene ghost image — HOVER-ONLY (Medium)

**File:** `ExperienceScene.jsx:75-77`
**Root cause:** Ghost image visibility depends on `hovering` state. Invisible on non-hover desktop, invisible on all mobile.
**Fix:** Consider showing the ghost image at reduced opacity by default, or add a touch-friendly alternative.

### 6. DestinationChapters scroll tracking — RAW getBoundingClientRect (Medium)

**File:** `DestinationChapters.jsx:30-52`
**Root cause:** Uses `window.addEventListener('scroll')` + `getBoundingClientRect` instead of Framer Motion's `useScroll`. This creates a separate scroll tracking system that may have different timing characteristics.
**Fix:** Migrate to Framer Motion's `useScroll` for consistency.

### 7. JourneyRail card geometry — lg:mt-24 CLIPPING (Medium)

**File:** `JourneyRail.jsx:140, 153`
**Root cause:** Alternating cards with `lg:mt-24` (96px offset) inside an `overflow-hidden` sticky container. Cards may be partially clipped.
**Fix:** Verify card visibility at all viewport heights. Consider reducing the offset or adding explicit top padding to the sticky container.

### 8. Footer container width — INCONSISTENCY (Low)

**File:** `Footer.jsx:39`
**Root cause:** Footer uses `max-w-[1440px]` while all homepage sections use `max-w-[1500px]`.
**Fix:** Standardize to `max-w-[1500px]` or document the intentional difference.

### 9. Unverified "24/7" claims — COMPLIANCE (Low)

**Files:** `FinalCTA.jsx:122`, `Services.jsx:32,80,101`, `TravelTrade.jsx:33`, `Checkouts.jsx:1023`
**Root cause:** Multiple "24/7" claims not verified by client.
**Fix:** Confirm with client or remove until verified.

---

## RECOMMENDED REPAIR ORDER

1. **B2BTrust animation gating** — Make kicker/heading visible by default; animate decorative elements only
2. **ExperienceScene contrast** — Increase inactive text opacity to WCAG AA compliant levels
3. **B2BTrust principle transitions** — Change `mode="wait"` to `mode="sync"` or `mode="popLayout"`
4. **JournalFeature cover loading** — Change `loading="lazy"` to `loading="eager"` on cover image
5. **ExperienceScene ghost image** — Add default visibility or touch alternative
6. **DestinationChapters scroll tracking** — Migrate to Framer Motion `useScroll`
7. **JourneyRail card geometry** — Verify and adjust `lg:mt-24` offset
8. **Footer container width** — Standardize to `max-w-[1500px]`
9. **Compliance claims** — Confirm or remove "24/7" claims

---

## Summary

The homepage has **2 critical**, **2 high**, **3 medium**, and **2 low** severity issues. The critical issues are:
1. B2BTrust content invisible due to `whileInView` animation gating on dark background
2. ExperienceScene inactive text fails WCAG AA contrast requirements

No transform conflicts, no GSAP remnants, no scroll architecture bugs that would cause complete failures. The issues are primarily animation-state and accessibility problems.
