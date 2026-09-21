# UI Fonts Reference

This project uses **2 Google Fonts** loaded via the Google Fonts API.

---

## 1. Fraunces

- **Type:** Serif (Display / Headline)
- **Loaded from:** `https://fonts.googleapis.com`
- **Axes:**
  - `opsz` (Optical Size): 9 – 144
  - `wght` (Weight): 300 – 700
  - `ital` (Italic): 0, 1 (italic 300–600)
- **CSS custom properties:**
  - `--font-serif: 'Fraunces', Georgia, serif`
  - `--font-heading: 'Fraunces', Georgia, serif`
  - `--font-display: 'Fraunces', Georgia, serif`
- **Usage:**
  - All heading elements (`h1`–`h6`)
  - Display / editorial headings (`.display-xl` uses `font-variation-settings: 'opsz' 144`)
  - Page titles, hero text, section headings
- **Fallback stack:** `Georgia, serif`

---

## 2. Inter

- **Type:** Sans-serif (Body / UI)
- **Loaded from:** `https://fonts.googleapis.com`
- **Axes:**
  - `wght` (Weight): 300 – 700
- **CSS custom properties:**
  - `--font-sans: 'Inter', system-ui, -apple-system, sans-serif`
  - `--font-body: 'Inter', system-ui, -apple-system, sans-serif`
- **Usage:**
  - Root `:root` font-family
  - Body text, paragraphs, buttons, forms
  - Navigation, footer, UI components
  - SVG text labels (e.g. route path labels)
- **Fallback stack:** `system-ui, -apple-system, sans-serif`

---

## Font Loading Strategy

```html
<!-- Preconnect for faster loading -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload as stylesheet -->
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Inter:wght@300..700&display=swap">

<!-- Apply stylesheet -->
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&family=Inter:wght@300..700&display=swap">
```

---

## Where Each Font Appears

| Context | Font | Weight Range |
|---|---|---|
| Headings (`h1`–`h6`) | Fraunces | 300–700 |
| Display headings | Fraunces | optical size 144 |
| Body text | Inter | 300–700 |
| Buttons | Inter | 500 |
| Navigation | Inter | 400–600 |
| Eyebrow labels | Inter | 600 |
| Links (`.link-premium`) | Inter | 600 |
| SVG text labels | Inter | 400 |

---

## Tailwind CSS Tokens (v4)

Defined in `src/index.css` under `@theme`:

```
--font-serif   → Fraunces, Georgia, serif
--font-heading → Fraunces, Georgia, serif
--font-display → Fraunces, Georgia, serif
--font-sans    → Inter, system-ui, -apple-system, sans-serif
--font-body    → Inter, system-ui, -apple-system, sans-serif
```

Usage in components via Tailwind: `font-serif`, `font-sans`, etc.

---

## Font Smoothing

```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

Applied on `:root` for crisp rendering on macOS/iOS.
