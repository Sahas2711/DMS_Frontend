# DMS Frontend — React + Vite

React 19 SPA for the Global B2B DMC / Tours & Travel platform (launch
destinations: Vietnam, Japan, Australia). In production the build is served by
the FastAPI backend from the same origin — no reverse proxy or separate CDN
is needed.

## Tech stack

React 19, react-router-dom 7, Tailwind CSS 4, Vite 8, vitest 5 (unit + integration),
ESLint 10.

## Development setup

```bash
npm ci
cp .env .env            # ensure VITE_API_BASE_URL=http://localhost:8000
npm run dev             # http://localhost:5173 (Vite HMR; backend runs on :8000)
```

The backend is started separately (`uvicorn app.main:app --reload` in the
backend repo). CORS is open on `localhost:5173/4173` by default.

## Environment variables

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Backend API base. **Dev:** `http://localhost:8000` (set in `.env`). **Production:** leave **empty** — `src/config/api.js` defaults to same-origin and `API_V1` resolves to `/api/v1`. The committed `.env.production` enforces the empty value so a dev-only localhost fallback never leaks into the build. |

Never hardcode a host in application code — `src/services/api/` reads from
`src/config/api.js`.

## Build & preview

```bash
npm run build           # outputs to dist/ (VITE_API_BASE_URL overridden by .env.production)
npm run preview         # static preview on http://localhost:4173
```

## Testing

```bash
npm run test -- --run         # unit tests (vitest)
npm run test:integration      # integration tests (requires backend running on :8000)
```

## Production

The backend Docker image embeds the `dist/` output from this build. The
single-container architecture serves both the SPA and the API from the same
origin, so the API client (`src/config/api.js`) stays relative — no
`VITE_API_BASE_URL` override is needed in production (`.env.production`
already forces the empty default).