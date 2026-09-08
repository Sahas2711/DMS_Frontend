# Frontend ↔ Backend Integration Report

> Generated: 2026-09-09 (refreshed after booking + trip implementation)
> Scope: `DMS_Frontend/DMS_frontend` (React + Vite) ↔ `DMS_Backend` (FastAPI, `/api/v1`)

## 1. Summary

| Area | Status |
|---|---|
| CMS (Destinations / Tours / details) | ✅ Fully wired |
| Enquiry forms (Contact / Request Quote / Partner) | ✅ Fully wired |
| Admin console (auth, CRUD, media, enquiries, audit) | ✅ Fully wired |
| Booking → Checkout flow | ✅ **Wired** — `POST /api/v1/booking-requests` (reservation request; **no payment**) |
| Admin booking management | ✅ **Wired** — `/admin/bookings` list, detail, read/unread, status |
| Trip planner ("Find a match") | ✅ **Wired** — fetches `GET /api/v1/routes` |
| Visitor accounts (Navbar Login / AuthModal) | ➖ **Stubbed by design** — `services/auth.js` rejects until a provider is chosen (see §3) |
| Blog content | ❌ Static local `ARTICLES` array (see §3) |
| Services / About / Terms / Privacy / Experiences pages | ❌ Static (marketing content) |
| Newsletter / Subscribe | ➖ Does not exist (no UI, no endpoint) |

**Key takeaway:** every backend read/write API the site needs is now consumed by the
frontend. The visible "fake" interactions (booking confirm, trip match) now call real
endpoints. Remaining items — visitor accounts and a CMS-driven blog — are product
decisions, not integration gaps.

---

## 2. Static buttons / interactive elements (no backend call)

These components render UI and handle clicks/form input **entirely in the
browser** — nothing is sent to `DMS_Backend`.

| # | Button / element | Page | Current behaviour |
|---|---|---|---|
| 1 | **Book Now → checkout "Confirm Booking"** | `pages/Booking.jsx` → `pages/Checkouts.jsx` | Local price calculation (transit type / porter / Mercedes / lounge add-ons); on confirm, posts a **reservation request** to `POST /api/v1/booking-requests` via `services/api/bookings.js`. Card details never leave the browser. Success panel shows the live reference id. |
| 2 | **Trip "Find a Match"** | `pages/Trip.jsx` | `handleMatch` calls `GET /api/v1/routes` (`services/api/cms.js#fetchRoutes`); shows loading → result count, then renders matched itinerary cards (title, route, duration, image, description). |
| 3 | **Navbar "Login / Sign In"** (AuthModal) | `components/auth/AuthModal.jsx` via `services/auth.js` | Calls `signInWithEmail`/`signInWithGoogle`/`signUpWithEmail`/`requestPasswordReset` → **all reject** (`AUTH_CONFIGURED = false`, `AuthNotConfiguredError`) — deliberate seam, see §3. |
| 4 | **Blog post filter + article cards** | `pages/Blogs.jsx` | Rendered from a hardcoded local `ARTICLES` array. No backend ✓ — see §3 (no blog model exists). |
| 5 | **Blog article "Read more"** | `pages/Blogs.jsx` | Same local array; no detail page in backend. |
| 6 | **Home "Bespoke/Custom" content** | `pages/Home.jsx`, `pages/Tours.jsx`, `pages/Destination.jsx` | Layout values come from **static fallback arrays**; API data replaces them when live. Buttons (e.g. Airport cards "Book") are `Link` to `/booking`. |
| 7 | **All service page CTAs** | `pages/services/*`, `pages/Services.jsx` | Links to `/booking`, `/trip`, `/checkout` — no API on the service pages themselves. |
| 8 | **Footer / Navbar links** | `components/Footer.jsx`, `components/Navbar.jsx` | Route navigation only; no newsletter/subscribe form. |
| 9 | **Destinations/Tours discovery filters** | `pages/Home.jsx` | Filter chips operate on fetched CMS data client-side; no dedicated filter API (server filters exist in `fetchTours` but are not used by Home). |
| 10 | **Admin "Bookings" section** | `pages/admin/AdminBookings.jsx` | List (status filter), detail modal, mark read/unread, status update + admin notes → all backed by `/api/v1/admin/bookings*`. |

### Booking flow detail (§2 row 1)
- `Booking.jsx` — form (date, flight, travelers, service level, add-ons) computes a
  price locally and navigates to `/checkout` (state is not carried across — known
  disconnect; checkout sends `guest_count=1` / `service_level=standard` defaults).
- `Checkouts.jsx` — final contact/billing form; on submit builds the payload via
  `buildBookingPayload(formData, seating)` and posts to `POST /api/v1/booking-requests`
  (rate-limited 10/hr/IP). The pay button shows a spinner while submitting; failures
  render an inline error banner; success renders the reference id.
- **No payment is processed** — by design (no provider). Backend persists the request
  as `PENDING`; admin confirms/cancels/completes it in `/admin/bookings`. Card fields
  are never serialized into the payload.

---

## 3. Backend APIs: built this round (booking) + still-open decisions

### ✅ Booking — implemented (this round)
| Endpoint | File | Notes |
|---|---|---|
| `POST /api/v1/booking-requests` | `app/api/v1/routes/public_bookings.py` | Public, rate-limited 10/hr/IP; stores IP; notifies admins by email. |
| `GET /api/v1/admin/bookings` | `app/api/v1/routes/admin_bookings.py` | Paginated, `sort`/`status`/`is_read` filters — permission `bookings.read`. |
| `GET /api/v1/admin/bookings/{public_id}` | same | Detail for the admin modal. |
| `PATCH /admin/bookings/{id}/read` · `/unread` | same | Read-state toggle (mirrors enquiries). |
| `PATCH /admin/bookings/{id}/status` | same | `PENDING/CONFIRMED/CANCELLED/COMPLETED` + `admin_notes`. |
| Migration | `alembic/versions/007_add_booking_requests.py` | Creates `booking_requests`; seeds `bookings.read` and grants to `SUPER_ADMIN` + `ADMIN`. **Not yet applied to a running DB** (`alembic upgrade head`). |

Admin email on booking reuses the enquiry Jinja template; recipients =
`BOOKING_RECIPIENT` / `BOOKING_RECIPIENT_EMAILS` (falls back to admin notify list).

### ✅ Trip planner — implemented (this round)
`GET /api/v1/routes` was already implemented with **no frontend consumer**; it is now
consumed by `Trip.jsx` via `fetchRoutes()` in `services/api/cms.js` (sorts by
`display_order`). `GET /api/v1/routes/{slug}` remains unused — Trip links matched cards
to the Tours experience page.

### Priority 3 — visitor authentication (stubbed by design, still open)
| Needs | Suggested endpoint | Notes |
|---|---|---|
| Visitor sign-up / login | `POST /api/v1/auth/visitor/signup`, `POST /api/v1/auth/visitor/login` | Replace `services/auth.js` stubs. Existing auth is admin-scoped. Google OAuth optional. **Not built** — booking and enquiry flows intentionally need no account; the seam rejects visibly instead of silently faking success. |

### Priority 4 — blog (product decision, still open)
| Needs | Suggested endpoint | Notes |
|---|---|---|
| Blog list/detail | `GET /api/v1/blog`, `GET /api/v1/blog/{slug}` | Backend has **no blog model**; frontend is a local `ARTICLES` array. Only worth CMS-ifying if editors will write posts. |

### Newsletter
No UI and no endpoint exist. Add only if the site gains a subscribe form.

---

## 4. Backend API endpoints that exist but are NOT used by the frontend

| Method | Path | Backend file | Why unused |
|---|---|---|---|
| `GET` | `/api/v1/routes/{slug}` | `public_routes.py` | List endpoint is wired to `Trip.jsx`; the single-route detail has no public page (Trip cards link to `/tours`). |
| `GET` | `/sitemap.xml` | `public_seo.py` | Served at site root; SEO is client-side (`Seo.jsx`/`JsonLd.jsx`). **Intentionally not fetched by React.** |
| `GET` | `/robots.txt` | `public_seo.py` | Same as above. |
| `GET` | `/api/v1/admin/permissions` | `admin.py` | Frontend derives permissions from the JWT/login profile; endpoint is redundant for now. |

### Verified non-issue
- Admin enquiries paths match: backend `admin_enquiries.py` mounts routes literally as
  `/admin/enquiries/...` (router has no prefix) → full path `/api/v1/admin/enquiries/...`,
  which matches `adminApi.js`. ✅ No mismatch.

---

## 5. Fully wired & working (for reference)

- **Forms → email:** `ContactForm`→`POST /enquiries/contact`, `RequestQuoteForm`→`POST
  /enquiries/request-quote`, `BecomePartnerForm`→`POST /enquiries/partner`
  (all → `email_service.notify_enquiry_received`, rate-limited 10/hr/IP).
- **Booking:** `Checkouts.jsx`→`POST /booking-requests` → `notify_booking_received`
  (rate-limited 10/hr/IP); admin `AdminBookings.jsx`→`/admin/bookings*`
  (list/detail/read/unread/status). Permission `bookings.read`; super admin bypasses.
- **Trip:** `Trip.jsx` "Match me" → `GET /routes` (public, published only), sorted by
  `display_order`.
- **Public CMS:** Home/Tours/Destination/TourDetail/DestinationDetail →
  `GET /destinations`, `GET /destinations/{slug}`, `GET /tours`, `GET /tours/{slug}`.
- **Admin:** login/refresh/logout, forgot/reset/change password, users+roles, destinations,
  tours, routes, media upload, enquiries (list/detail/read/unread), unread-count, audit logs,
  dashboard — all consumed by `pages/admin/*`.
- **Email provider:** Microsoft 365 SMTP (`smtp.office365.com:587` STARTTLS) — `.env`, code
  defaults, tests, and docs all updated (see §7).

---

## 6. Email sending — Microsoft 365 (changed)

`.env` already pointed at `smtp.office365.com`; the **code, defaults, tests and docs
still said Hostinger**. Updated everything that governs email delivery:

| File | Change |
|---|---|
| `app/core/config.py` | default `smtp_host` → `smtp.office365.com`; comments |
| `app/services/email/email_service.py` | module docstring → Microsoft 365 |
| `.env.example` | `SMTP_HOST`, comments, "app password" guidance |
| `app/tests/test_config.py` | default assertion `smtp.office365.com` |
| `README.md` | SMTP block + email paragraph |
| `docs/development/email.md` | "Mailbox plan (Hostinger)" → Microsoft 365 distribution groups + SMTP AUTH/app-password notes |
| `docs/development/configuration.md` | default value, "Microsoft 365 note", example `.env` |
| `docs/operations/deployment.md` | SMTP setup steps → Microsoft 365 + SPF `include:spf.protection.outlook.com` |

> Hostinger references that remain are **hosting-infrastructure only** (VPS droplet,
> deploy pipeline) — not email.

### Ops checklist before relying on Microsoft 365 delivery
1. Sending mailbox must have **SMTP AUTH enabled** (Exchange admin center → mailbox
   → Mail flow → *Authenticated SMTP submission*). Microsoft disables it by default
   on new tenants.
2. If tenant enforces MFA, use an **app password** for the mailbox in `SMTP_PASSWORD`.
3. Add `include:spf.protection.outlook.com` to the domain SPF record + any MX/DKIM
   (Microsoft Defender 365 → Domain Authentication).
4. Current `.env` routing: SMTP `info@asianstartravels.com`; recipients
   `QUOTE=…0123@gmail.com`, `PARTNER=…1111@gmail.com`, `CONTACT=…1234@gmail.com`,
   `ADMIN_NOTIFY=sahas.p.nagar@gmail.com`. **Rotate these third-party gmail addresses**
   to the functional `@asianstartravels.com` distribution groups when ready.

---

## 7. Action plan (recommended order)

1. **Apply migration 007** (`alembic upgrade head`) in environments — creates
   `booking_requests` + seeds `bookings.read` for `SUPER_ADMIN`/`ADMIN`. Code is done
   and tested; the schema just has not been applied to a running DB.
2. **Enable SMTP AUTH / app password** for the Microsoft 365 mailbox and re-route
   recipients from personal gmail boxes to `@asianstartravels.com` groups (booking
   notifications use `BOOKING_RECIPIENT`/`BOOKING_RECIPIENT_EMAILS`, falling back to
   the admin notify list).
3. **Visitor auth** (Priority 3) if the Navbar login must become real.
4. **Blog backend** only if editorial content should be CMS-driven.

## 8. Test coverage added this round

| Suite | Count | Notes |
|---|---|---|
| `app/tests/test_bookings.py` (new) | 31 | Public submit (validation, IP, no-card-fields, persistence, rate limit), admin list/detail, filters, read/unread, status update, RBAC 401/403, super admin, pagination. |
| `src/services/api/bookings.test.js` (new) | 6 | `buildBookingPayload` mapping + `submitBookingRequest` endpoint/verb. |
| Existing backend suites | updated | `test_models.py` (booking_requests table), `test_postgres_integration.py` (migration head `007`, permission count 29). |
| Full frontend suite | 38 | `vitest run` green; production build passes. |

Deploy checklist reminder: booking endpoints require the `bookings.read` permission to
exist in DB (migration 007 seeds it); before that, non-super-admin role users will get
`403` on `/admin/bookings*`.