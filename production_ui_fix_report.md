# Production UI & Performance Fix Report

**Project:** Asian Star Travel DMC — FastAPI backend (`DMS_Backend`) + React/Vite frontend (`DMS_Frontend/DMS_frontend`)
**Date:** 2026-09-07
**Scope:** End-to-end pass on the reported admin UI bugs, auth/RBAC hardening, button-system consistency, and backend latency that made the admin dashboard unusably slow (and caused login timeouts).

---

## 1. Executive summary

- **Login "failures"** were latency, not wrong credentials. Both live accounts were verified working at the API level. The primary causes — an **N+1 lazy-load permission graph (~50 round trips)** and an **over-aggressive Argon2id config (~9 s/hash)** over a ~300 ms-per-round-trip Neon connection — are fixed.
- **Dashboard latency** dropped from ~30 s+ (8 sequential list requests, each paying many query round trips) to a **single consolidated `/admin/dashboard` request** (~7–8 s on the first hit, dominated by unavoidable DB round trips).
- **"White" dashboard stat cards** were a Tailwind v4 gradient bug (`in oklab` unsupported in some browsers dropping the background); cards now use solid colors.
- **Tours were visible** — 14 published tours are served on the public API; the "not visible" report was the same timeout/latency issue.
- All fixes verified: backend `ruff` clean, `ruff format` clean, **298 pytest tests pass**, frontend `eslint` clean, **vitest 32/32 pass**, `vite build` succeeds.

---

## 2. Reported issues → root causes

| Report | Root cause | Fix |
| --- | --- | --- |
| Super admin can't log in | Admin login took ~15–24 s (argon2 ~9 s + ~50 lazy permission queries + per-request DB connection handshake) → browser/API timeouts | Argon2id OWASP baseline params; eager-load permission graph; connection pooling; pool warm-up |
| Tours not visible in frontend | Not a data problem (14 PUBLISHED). Frontend fetches timed out under the same latency | Latency fixes above |
| Admin dashboard too slow | 8 sequential list endpoints, each N+1 queries over high-RTT DB | Single aggregated `/admin/dashboard` endpoint |
| Dashboard stat cards white | Tailwind v4 `bg-gradient-to-* ... in oklab` unsupported by the browser → `background-image` dropped | Solid-color card tones (navy / bronze / maroon / light) |
| Routes page very slow | Per-row re-query loop (`for r in routes: select(Route)...`) ≈ 50 queries | Eager-load inside `list_routes()`; removed the loop |

---

## 3. Backend performance work

### 3.1 Diagnosed root causes (in order of impact)

1. **N+1 permission graph.** `_get_user_permissions`/`require_permission` iterated `user.roles → role.permissions → role_permission.permission` with **lazy loading** — ~35–50 individual SQL round trips just to know a user's permissions (login for a super admin with 28 perms took ~15 s; every admin request paid it again via `/me`).
2. **Argon2id over-tuned.** `PasswordHasher(time_cost=3, memory_cost=65536, parallelism=4)` took **~9 s per hash/verify** on this machine. Argon2 stores its own params in the hash, so existing hashes kept the old cost until re-hashed.
3. **Per-route re-query loop** in `GET /admin/routes`: one fresh `SELECT ... WHERE Route.id = r.id` with eager options *per row* (≈ `count + list + 16×3` queries).
4. **No connection pooling.** `.env` defaulted `DB_POOL_ENABLED=false` → `NullPool` → a **new Neon connection per request** (~1.5–2.4 s, plus first-hit TLS handshake ~5 s).
5. **Pool not actually active** — the running server was a stale `uvicorn --reload` worker spawned *before* the `.env` change, so it kept using NullPool. (Also: `--reload` workers only reload on `.py` changes, not `.env`.)
6. **Cold Neon pooler.** First statement per checkout runs slower (~0.6 s vs ~0.3 s steady).

### 3.2 Fixes applied

- **`.env`**: enabled pooling —
  `DB_POOL_ENABLED=true`, `DB_POOL_SIZE=5`, `DB_MAX_OVERFLOW=5`, `DB_POOL_TIMEOUT=30`, `DB_POOL_RECYCLE=300`, `DB_POOL_PRE_PING=true`.
- **`app/core/security.py`**: Argon2id → OWASP baseline `time_cost=2, memory_cost=19456, parallelism=1` (~0.06 s verify).
- **`app/services/auth/authentication_service.py`**:
  - Added `USER_PERMISSION_LOAD_OPTIONS` (a `selectinload(User.roles).joinedload(UserRole.role).selectinload(Role.permissions).joinedload(RolePermission.permission)` chain) → permission graph loads in **3 queries instead of ~50**.
  - `get_current_user()` now does a **single plain query** (no graph) — super admin requests avoid the graph entirely.
  - Added `get_user_permission_graph(db, user)` helper used only where permissions are actually needed (`/me`, non-super-admin checks, dashboard gating).
  - Applied eager options to login/refresh user lookups.
- **`app/services/admin/admin_service.py`**: eager-loaded the permission graph in `list_users`, `get_user_by_public_id`, `get_user_by_email`.
- **`app/api/v1/dependencies.py`**: `require_permission` eager-loads the graph **only for non-super-admins** (super admin short-circuits with zero extra queries).
- **`app/services/cms/cms_service.py`**: `list_tours()` eager-loads `Tour.destination` (admin tour list did 16 lazy destination queries).
- **`app/services/cms/route_service.py`**: `list_routes()` now eager-loads origin/end destinations and `selectinload(Route.stops).joinedload(RouteStop.destination)`.
- **`app/api/v1/routes/admin_routes.py`**: removed the per-row re-query loop.
- **`app/main.py`**: `lifespan` pre-warms the DB pool at startup (parallel `check_db_connection()` for `DB_POOL_SIZE` connections) so the first real request doesn't pay the ~5 s connection handshake.
- **New `GET /api/v1/admin/dashboard`** (`app/api/v1/routes/admin.py` + schemas in `admin.py`): single consolidated response — status counts for destinations/tours/routes, tours-by-category, media total, users total/active, unread enquiry counts, 6 recent enquiries (normalized across all three types), 6 recent audit entries. **Each section is permission-gated server-side.**
- **`app/core/database.py`**: docstring updated to reflect the pooling choice (QueuePool vs NullPool).

### 3.3 Measured before → after (live, against Neon pooler in us-east-2)

| Endpoint | Before | After |
| --- | --- | --- |
| `POST /auth/login` (super admin) | ~15–24 s | ~4.8–5.2 s |
| `GET /admin/me` | ~13–14 s | ~3.3 s |
| `GET /admin/routes` | ~10–27 s | ~2.7 s |
| `GET /admin/tours` | ~5.8–10.7 s | ~2.4 s |
| `GET /admin/users` | ~4.4–6.2 s | ~3.6 s |
| `GET /admin/destinations` | ~2.2–6.9 s | ~2.3 s |
| Public `GET /tours` | ~1.5 s | ~1.5 s |
| **Admin dashboard (whole page)** | 8 requests ≈ ~25–35 s | **1 request ≈ ~7–8 s** |

Notes:
- Each individual DB round trip to Neon's pooler in us-east-2 costs ~0.3 s from this network; several endpoints are now effectively at the network floor.
- If the app is deployed closer to the database (or on Neon's same region), these numbers drop further with zero code changes.

### 3.4 How to run the backend (important)

Do **not** run with `--reload` for a production-ish live check, and always restart after changing `.env`:

```
cd DMS_Backend
.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

The pool warms at startup (~10–15 s), so give it a moment before the first request.

---

## 4. Frontend work

### 4.1 Auth / session (root-cause fixes)
- `services/api/admin.js` — refresh guard refactored: `SESSION_EXPIRED` is only treated as fatal on a **non-retryable** request. Avoids duplicate-refresh token-rotation races.
- `AdminAuthContext.jsx` — access/refresh tokens are persisted **before** `getMe()` is called (previously a race could leave an empty token). Fixed a lint issue (`let me = null` → `let me`).

### 4.2 Admin pages (RBAC + UX consistency)
- `AdminTours`, `AdminRoutes`, `AdminMedia`, `AdminUsers`, `AdminAudit`, `AdminAccount`:
  - `403` → `ForbiddenState` (no misleading redirect), consistent with the existing handling.
  - Save/submit buttons show `Spinner` + short `loading` label, disabled during requests, stable size (no scale).
  - Compact row actions (`size="sm" iconOnly`), touch-friendly always-visible delete in `AdminMedia`, `errorStatus` tracking added where shapes changed.
  - `AdminUsers`: loading states on modal saves (and fixed a stray `{bulldogNull}` token).
  - `AdminAccount`: Spinner import trimmed; save button loading.
- `AdminDashboard` (see §5 for the rewrite).

### 4.3 Admin dashboard rewrite
- Now calls **`fetchAdminDashboard()` → `GET /admin/dashboard`** (one request) instead of up to 8 parallel list endpoints.
- Stat cards use solid colors (fixes the white-card/gradient rendering issue).
- Pipeline rows, category breakdown, user/unit counters, unread figures, recent enquiries and recent activity all read from the aggregated payload.
- Rendering is still permission-aware on the client (`can(...)`), while the server independently gates each section.

### 4.4 Button / CTA consistency (public site)
- `.btn` utility: radius changed from `9999px` (pill) to `0.5rem`, `letter-spacing: 0.05em`, still uppercase.
- Converted ad-hoc styled anchors to the shared `.btn` utility across **Home, Navbar (desktop + mobile), TravelTrade, Aboutus, Destination, DestinationDetail, Tours, TourDetail, Experiences, ErrorBoundary, NotFound, CookieConsent**.
- Removed `whileTap`/`active:scale` on buttons everywhere (Inertia/Motion no longer shrinks buttons on click).
- Shared `SubmitButton` (forms) already conformed and was left unchanged.

### 4.5 Other
- `Blogs.jsx`: replaced emoji with lucide icons (`CalendarDays`, `Clock`), added `aria-pressed` on filter pills, empty-filtered state ("No stories in this category yet" + "View all stories"), CTA now `btn btn--gold btn--lg`.
- `cms.js`: TTL cache (60 s) + in-flight request dedupe (`cachedGet`) for destinations/tours by slug and lists, so the public pages stop re-fetching identical data on every render.
- `AdminLayout`: mobile drawer closes on `Escape` and focuses the close button after closing; public `Navbar` mobile menu gets the same Escape handling + body scroll lock.

---

## 5. Verification performed

| Check | Result |
| --- | --- |
| `ruff check app/` (backend) | Passed |
| `ruff format --check app/` (backend) | Passed |
| `pytest` (backend, full suite incl. Postgres integration) | 298 passed |
| `npm run lint` (frontend) | Passed |
| `npm run test` (frontend, vitest) | 32 passed |
| `npm run build` (frontend, vite) | Passed — code-split: `vendor-gsap` 44 kB / `vendor-motion` 42 kB gzip |
| Live API: both logins | 200 OK, JWTs valid (super admin 28 perms / ADMIN 12 perms) |
| Live API: `/admin/dashboard` | 200 for both roles |
| Public `/tours` | 14 published items |
| Live DB pooling | `QueuePool`, size 5, overflow 5 (verified) |

Credentials were re-verified and re-hashed in place with the new (cheaper) Argon2 params — **passwords unchanged** (`see creds_login.md`).

---

## 6. Known limitations / follow-ups

- **Network round-trip floor**: ~0.3 s per query to Neon's us-east-2 pooler from this machine. Each remaining endpoint pays ~2–3 s because it needs several queries. Deploying in the DB region, or moving more of the admin read-path onto aggregate queries, buys more.
- **`pool_pre_ping`** adds one ~0.3 s health-check per request checkout. Kept on for correctness; can be disabled if a handful of rare stale-connection errors per day is acceptable.
- **Rate limiter** (login, 5/min/IP) is intentional and unchanged.
- The user's dev **Vite server (port 5173)** picks up the dashboard change via HMR; a hard refresh is needed once for the new bundle.
- Any future password set via `create_super_admin` uses the new Argon2 baseline automatically; credentials in `creds_login.md` remain valid.

---

## 7. Round 2 — dashboard still slow + dashboard scroll freeze (2026-09-07)

Two new reports after the first round: the dashboard still "took much time" to load, and after a certain point on the page the screen stopped scrolling. Both were reproduced and root-caused rather than optimized blindly.

### 7.1 Dashboard latency — root cause & fix

**Reproduction / measurement (live, super admin):**
- Baseline: `GET /admin/dashboard` = **6.8–7.0 s**; the page also fired a separate unread-count request ≈ **2.1 s** → ~9 s total waterfall.
- Trace showed **16 sequential SQL round trips** inside the endpoint (permission graph 3 + status counts 3 + category 1 + media 1 + users 2 + unreads 3 + recent enquiries 3 + audit 1), each ~0.3–0.7 s RTT to Neon's us-east-2 pooler. That network round trip — not rows returned (all queries are `COUNT(*)`s) — *was* the bottleneck.

**Fixes applied (`app/api/v1/routes/admin.py`):**
1. **Super admins skip the role→permission graph** (3 round trips saved; `get_user_permission_graph` runs only for non-super-admin roles).
2. **Count queries now run in parallel** on separate pool Sessions via a bounded `ThreadPoolExecutor` (`max_workers = min(jobs, DB_POOL_SIZE)`). The jobs are read-only and independent; each runs on its **own** `SessionLocal()` because a single Session is not thread-safe. This turned ~12 serialized round trips into ~2 parallel waves.
3. **Unread counts for all three inboxes merged into one `UNION ALL`** statement (`_unread_counts_job`) — 3 round trips → 1.
4. **Recent enquiries merged into one `UNION ALL`** statement (`_recent_enquiries_job`) — 3 round trips → 1 (then sorted/sliced in Python).
5. **Users total + active merged** into one `COUNT (...) FILTER (WHERE is_active)` query.

**Before → after (live measurements):**

| Measurement | Before | After |
| --- | --- | --- |
| `GET /admin/dashboard` (super) | 6.77 / 6.96 / 6.96 s | 3.64 / 3.10 / 3.18 s |
| `GET /admin/dashboard` (ops, after warm) | — | 4.15 s |
| Unread-count request (badge) | 2.07 s ×every page | **eliminated on dashboard** (payload already carries it) |
| Perceived dashboard load (full waterfall) | ≈ 9 s (2 requests) | ≈ 4 s (1 request; StrictMode dedupe) |

**Frontend waterfall/duplicate-call fixes:**
- **Duplicate GETs deduped** (`src/services/api/adminApi.js`): in-flight promise cache `dedupe()` for `fetchAdminDashboard` and `fetchUnreadEnquiryCounts`. React StrictMode double-fires effects in dev; login→dashboard mount also raced layout + page — both used to issue a second request. Now concurrent callers share one promise.
- **AdminLayout** (`src/pages/admin/AdminLayout.jsx`) no longer fires `fetchUnreadEnquiryCounts()` while on `/admin/dashboard` (the dashboard response already includes those counts — duplicate data over ~2 s of round trips).

### 7.2 Scroll freeze — root cause & fix

**Root cause:** The page-wide **Lenis smooth-scroll driver was active on admin routes too.** `App.jsx` instantiated Lenis globally (it wraps every route, including `/admin`), so the admin console never scrolled natively: Lenis intercepted wheel events and drove `window.scrollY` with its own rAF lerp, while `html { scroll-behavior: smooth }` and the `overflow-x: hidden` layout wrappers fought it. The result was a scroller that stalled partway ("unable to scroll after a certain point"). Mobile/touch users were not affected (Lenis self-disables there), which is why it looked dashboard-specific — the dashboard is the tallest admin page.

**Fix (root-cause level, no JS scroll-lock residue):**
1. `src/App.jsx` — `SmoothScroll` now **`lenis.stop()` on `/admin*` routes** and `start()` again on public routes (Lenis `stop()` returns native scrolling; verified in lenis v1.3.26 source: `internalStop()` → `reset()` + `isStopped=true`, no `overflow` mutation unless `autoToggle`). Route-change scroll reset is now a plain `window.scrollTo(0, 0)`.
2. `src/index.css` — native `scroll-behavior: smooth` is scoped to `html:not(.lenis)` (Lenis adds the `lenis` class to `<html>`, verified in dist lines 1041–1051), removing the `scroll-behavior` ↔ Lenis fight on public pages too. Reduced-motion → `scroll-behavior: auto`.
3. Audited the other scroll-lock sites for leaked locks: public Navbar mobile menu and the admin `Modal` both restore `document.body.style.overflow` correctly in cleanup (incl. Escape), so no persistent lock remains.

### 7.3 Verification (round 2)

| Check | Result |
| --- | --- |
| `ruff check app/` + `ruff format --check app/` | Passed (103 files) |
| Full backend `pytest` | **298 passed** (incl. RBAC/admin) |
| Frontend `eslint` | Passed |
| Frontend `vitest` | 32/32 passed |
| Frontend `vite build` | Passed (2.96 s) |
| Live: both dashboards (super & ops roles) | 200, correct counts (unreads `(8,7,7)`, 6 recent enquiries, 5 tv categories) |
| Live: unread/enquiry UNION statements | Row values match the prior separate-query endpoints |

Backend running without `--reload` on `127.0.0.1:8000`; Vite dev server on `5173`.

### 7.4 Remaining notes

- The residual ~3.1 s is the network floor: 2 parallel query waves at ~0.3–0.7 s/statement plus per-request middleware/token overhead. It drops further if the app is deployed in the DB region (Postgres is a bare `COUNT` — data size is irrelevant).
- Dashboard *counts* were never fetching datasets to display them; the previous round's aggregate endpoint already fixed that. This round removed the redundant re-reading of the same tables.
## 8. Round 4 - Slow public endpoints (read-heavy) -> in-process TTL cache

### 8.1 Symptom / root cause

`GET /api/v1/tours`, `/tours/{slug}`, `/destinations`, `/destinations/{slug}` each paid 1-3 Neon pooler round-trips per request. Warm round-trip floor is ~0.29s; cold sockets (a Neon dev-tier idle-timeout property) spike single queries to ~3-5s. The query work itself is instant - latency is hosting/network, not SQL. Result: public list/detail pages ~1.2-1.5s warm, 2.5-3s on cold.

### 8.2 Fix

- `app/core/cache.py` (new): dependency-free, thread-safe `TTLCache` (RLock + OrderedDict LRU) with `get/set/invalidate`. Settings-gated:
  - `PUBLIC_CACHE_ENABLED` (default true)
  - `PUBLIC_CACHE_TTL_SECONDS` (default 120)
- `app/api/v1/routes/public_cms.py`: the four public list/detail endpoints read-through the cache, keyed on their full query-string signature (page/page_size/filter/sort/slug).
- `app/core/database.py`: cache invalidation wired to the ORM transaction lifecycle - `after_flush` marks the session when any flushed/deleted/dirtied object has `__tablename__` in {tours, destinations}; `after_commit` consumes the flag and clears the public cache; `after_rollback` clears it. Covers every CMS write endpoint and service-layer writes; no per-route edits needed.
- Tests: `app/tests/conftest.py` disables `public_cache_enabled` so the suite always reads fresh DB data.

### 8.3 Before / after (live, same dev server fresh restart)

| Case | Before | After (first miss) | After (cached) |
|---|---|---|---|
| GET /tours | ~2.5s (cold pool) | 1.17s | 0.03s |
| GET /destinations | ~1.5s | 1.13s | 0.03s |
| GET /tours after CMS write | - | 1.17s (auto re-fetch) | 0.03s |

Invalidation verified live: update a tour via the admin API -> next public GET dropped from cached 0.03s to 1.17s and returned the new summary; a revert propagated the same way. 298/298 tests pass, ruff clean.

Note: cache is single-process and in-memory. Invalidates only for ORM writes through a Session (raw SQL/bulk writes to tours/destinations would not fire it). If the app ever runs multiple uvicorn workers, move to a shared cache (Redis) or per-worker TTL.
