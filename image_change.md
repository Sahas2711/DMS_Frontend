# Image Change Report — Non-Vietnam Country Images

This document lists all images of countries **other than Vietnam** referenced in the codebase, grouped by country, with the files (and line numbers) where they are used.

---

## 1. India

### Image files (in `images/`)
- `India-hero-image.webp`
- `India-heritage.webp`
- `india-Delhi.webp`
- `india-Jaipur.webp`
- `india-kerala.webp`
- `India-Cousine.webp`
- `India-culture.webp`
- `India-wildlife.webp`
- `India-Varanasi.png`
- `Kerala-Heritage.webp`
- `Himachal-Pradesh.webp`
- `destination_india_banner.webp`

### References in code

| Image | File | Line(s) | Context |
|---|---|---|---|
| `/images/home/india-Delhi.webp` | `src/config/tourImages.js` | 9, 47 | `TOUR_FALLBACK_IMAGES.delhi`, `TOUR_SLUG_FALLBACK_IMAGES['delhi-heritage-walk']` |
| `/images/home/india-Jaipur.webp` | `src/config/tourImages.js` | 10, 49 | `TOUR_FALLBACK_IMAGES.jaipur`, `TOUR_SLUG_FALLBACK_IMAGES['jaipur-royal-rajasthan']` |
| `/images/home/india-kerala.webp` | `src/config/tourImages.js` | 11, 50 | `TOUR_FALLBACK_IMAGES.kerala`, `TOUR_SLUG_FALLBACK_IMAGES['kerala-backwaters-cruise']` |
| `/images/home/India-heritage.webp` | `src/config/tourImages.js` | 12, 48 | `TOUR_FALLBACK_IMAGES['golden-triangle']`, `TOUR_SLUG_FALLBACK_IMAGES['golden-triangle-classic']` |
| `/images/home/India-hero-image.webp` | `src/config/tourImages.js` | 13 | `TOUR_FALLBACK_IMAGES.india` |
| `/images/home/India-heritage.webp` | `src/pages/Experiences.jsx` | 22, 72 | `CATEGORY_IMAGES.CULTURE_HERITAGE` ("Maharashtra, India"), `DESTINATIONS` card "India" |
| `/images/home/india-kerala.webp` | `src/pages/Experiences.jsx` | 42 | `CATEGORY_IMAGES.HONEYMOON_LUXURY` ("Kerala backwaters, India") |
| `/images/home/india-Delhi.webp` | `src/pages/DestinationDetail.jsx` | 17, 36 | `indiaFallback` → `FALLBACK_IMAGES.delhi` |
| `/images/home/india-kerala.webp` | `src/features/home/FinalCTA.jsx` | 12 | Homepage FinalCTA background image |
| `/images/home/Kerala-Heritage.webp` | `src/pages/homeContent.js` | 75–76 | `TRAVEL_STYLES` "Culture & Heritage" card (alt "Kerala, India") |
| `/images/flags/india.svg` | `src/context/LanguageContext.jsx` | 21–22 | English language flag (country: India) |

#### Dead / commented-out India references
| Image | File | Line(s) | Context |
|---|---|---|---|
| `/images/home/india-Delhi.webp` | `src/pages/Destination.jsx` | 13 | `indiaDelhi` const — only used in commented-out `FALLBACK_IMAGE_MAP` |
| `/images/home/India-Cousine.webp` | `src/pages/homeContent.js` | 85 | Commented-out "Culinary" travel style |
| `/images/home/Himachal-Pradesh.webp` | `src/pages/homeContent.js` | 121–122 | Commented-out "Wellness & Slow Travel" style |

---

## 2. Japan

### Image files (in `images/`)
- `Japan-hero-image.webp`
- `Japan-tokyo.webp`
- `Japan-kyota.webp`
- `Japan-osaka.webp`
- `Japan-Heritage.webp`
- `Japan-Nature.webp`
- `Japan-mount-fuji.webp`
- `Japan-tredition.webp`
- `Japan-Cousin.webp`

### References in code

| Image | File | Line(s) | Context |
|---|---|---|---|
| `/images/home/Japan-tokyo.webp` | `src/config/tourImages.js` | 25, 61, 65 | `TOUR_FALLBACK_IMAGES.tokyo`, slug fallbacks for Tokyo tours |
| `/images/home/Japan-kyota.webp` | `src/config/tourImages.js` | 26, 62 | `TOUR_FALLBACK_IMAGES.kyoto`, `'kyoto-luxury-geisha-cultural-tour'` |
| `/images/home/Japan-osaka.webp` | `src/config/tourImages.js` | 27, 63, 67 | `TOUR_FALLBACK_IMAGES.osaka`, Osaka tour slug fallbacks |
| `/images/home/Japan-Heritage.webp` | `src/config/tourImages.js` | 28 | `TOUR_FALLBACK_IMAGES.hiroshima` |
| `/images/home/Japan-Nature.webp` | `src/config/tourImages.js` | 29, 64 | `TOUR_FALLBACK_IMAGES.sapporo`, `'sapporo-snow-festival-winter-tour'` |
| `/images/home/Japan-hero-image.webp` | `src/config/tourImages.js` | 30 | `TOUR_FALLBACK_IMAGES.japan` |
| `/images/home/Japan-mount-fuji.webp` | `src/config/tourImages.js` | 66 | `'mt-fuji-hakone-honeymoon-escape'` |
| `/images/home/Japan-kyota.webp` | `src/pages/Experiences.jsx` | 52, 86 | `CATEGORY_IMAGES.WELLNESS_SLOW` ("Kyoto temple gardens, Japan"), `DESTINATIONS` card "Japan" |
| `/images/home/tours/kyoto.webp` | `src/config/specialOffers.js` | 18, 31 | `kyotoImg` → slug `corinthia-hotel-london` |
| `/images/flags/japanese-flag.svg` | `src/context/LanguageContext.jsx` | 28–29 | Japanese language flag (country: Japan) |

---

## 3. South Korea

### Image files (in `images/`)
- `South-Korea-hero-image.webp`
- `Korea-Seoul.webp`
- `Korea-busan.webp`
- `Korea-Jeju.png`
- `Korea-Gyengo.webp`
- `Korea-Nature.webp`
- `Korea-Modern-Korea.webp`
- `Korea-Culture.webp`
- `Korea-Cousin.webp`

### References in code

| Image | File | Line(s) | Context |
|---|---|---|---|
| `/images/home/Korea-Seoul.webp` | `src/config/tourImages.js` | 33, 70 | `TOUR_FALLBACK_IMAGES.seoul`, `'seoul-busan-korean'` |
| `/images/home/Korea-busan.webp` | `src/config/tourImages.js` | 34 | `TOUR_FALLBACK_IMAGES.busan` |
| `/images/home/Korea-Jeju.png` | `src/config/tourImages.js` | 35, 71 | `TOUR_FALLBACK_IMAGES.jeju`, `'jeju-gyeongju'` |
| `/images/home/Korea-Gyengo.webp` | `src/config/tourImages.js` | 36 | `TOUR_FALLBACK_IMAGES.gyeongju` |
| `/images/home/South-Korea-hero-image.webp` | `src/config/tourImages.js` | 37, 38 | `TOUR_FALLBACK_IMAGES.korea`, `TOUR_FALLBACK_IMAGES['south-korea']` |
| `/images/home/Korea-Jeju.png` | `src/pages/Experiences.jsx` | 37 | `CATEGORY_IMAGES.FAMILY_JOURNEYS` ("Jeju Island, South Korea") |
| `/images/home/Korea-Seoul.webp` | `src/pages/Experiences.jsx` | 57, 93 | `CATEGORY_IMAGES.ART_DESIGN` ("Seoul, South Korea"), `DESTINATIONS` card "South Korea" |
| `/images/home/Korea-Seoul.webp` | `src/config/specialOffers.js` | 14, 35 | `koreaImg` → slug `sofitel-legend-the-grand-amsterdam` |
| `/images/flags/south-korea.svg` | `src/context/LanguageContext.jsx` | 35–36 | Korean language flag (country: South Korea) |

---

## 4. Abu Dhabi / UAE

### Image files (in `images/`)
- `Abu-Dhabi-City-Tour.webp`
- `Yas-Island-Guided-Tour.webp`

### References in code

| Image | File | Line(s) | Context |
|---|---|---|---|
| `/images/home/Abu-Dhabi-City-Tour.webp` | `src/config/specialOffers.js` | 10, 28 | `abuDhabiCityImg` → slug `oneandonly-one-zaabeel` |
| `/images/home/Yas-Island-Guided-Tour.webp` | `src/config/specialOffers.js` | 11, 26 | `yasIslandImg` → slug `emirates-palace-abu-dhabi` |

---

## 5. Europe

### Image files (in `images/`)
- `Europe.webp`

### References in code

| Image | File | Line(s) | Context |
|---|---|---|---|
| `/images/home/Europe.webp` | `src/config/specialOffers.js` | 13, 27, 33, 36 | `europeImg` → slugs `oneandonly-aesthesis`, `shangri-la-the-shard-london`, `conservatorium-amsterdam` |
| `/images/home/Europe.webp` | `src/config/specialOffers.js` | 22 | **`DEFAULT_SPECIAL_OFFER_IMAGE`** — fallback for ALL special offers |

---

## 6. Australia (Sydney / Cairns)

### Image files (in `images/home/tours/`)
- `sydney.webp`
- `cairns.png`

### References in code

| Image | File | Line(s) | Context |
|---|---|---|---|
| `/images/home/tours/sydney.webp` | `src/config/specialOffers.js` | 16, 30 | `sydneyImg` → slug `rosewood-hotel-georgia` |
| `/images/home/tours/cairns.png` | `src/config/specialOffers.js` | 17, 32 | `cairnsImg` → slug `fairmont-copley-plaza-boston` |

---

## 7. Misleading variable names (point to Vietnam images but named after other countries)

| File | Line(s) | Variable | Actual image |
|---|---|---|---|
| `src/pages/Destination.jsx` | 12, 15, 16 | `indiaImg`, `japanImg`, `koreaImg` | All set to `Vietnam-Hanoi.webp` |
| `src/pages/DestinationDetail.jsx` | 19, 20 | `japanFallback`, `koreaFallback` | Both set to `Vietnam-Hanoi.webp` |

---

## Summary

| Country | Unique image files | Active code references |
|---|---|---|
| India | 12 | 16 (active) + 3 (dead/commented) |
| Japan | 9 | 19 |
| South Korea | 9 | 14 |
| Abu Dhabi / UAE | 2 | 2 |
| Europe | 1 | 5 |
| Australia | 2 | 2 |

**Key files containing non-Vietnam image references:**
1. `src/config/tourImages.js` — India, Japan, South Korea destination/tour fallbacks
2. `src/config/specialOffers.js` — Abu Dhabi, Europe, Korea, Sydney, Cairns, Kyoto
3. `src/pages/Experiences.jsx` — India, Japan, South Korea category & destination cards
4. `src/pages/DestinationDetail.jsx` — India fallback
5. `src/pages/homeContent.js` — Kerala (India) travel style card
6. `src/features/home/FinalCTA.jsx` — India (Kerala) background image
7. `src/context/LanguageContext.jsx` — India, Japan, South Korea flag icons

**Note:** `src/config/specialOffers.js` appears to be orphaned (not imported by runtime code); tours pages use CMS `image_url` instead. `src/config/tourImages.js` IS live, imported by `Tours.jsx`, `TourDetail.jsx`, and `DestinationDetail.jsx`.
