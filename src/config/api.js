/**
 * Central backend API configuration.
 *
 * All network code reads from here — components and services never hardcode a
 * host. Set VITE_API_BASE_URL in an .env file (see .env.example) per
 * environment:
 *
 *   dev     -> http://localhost:8000 (backend: uvicorn app.main:app --reload)
 *   prod    -> left empty (same-origin) — FastAPI serves the built SPA and the
 *              /api/v1, /health and /uploads routes from the same origin
 *
 * Production must be same-origin: the fallback below is intentionally the
 * empty string so API_V1 resolves to "/api/v1" relative to the current host.
 * The dev server reaches the API by setting VITE_API_BASE_URL in .env.
 */
const DEFAULT_API_BASE_URL = '';

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(
    /\/+$/,
    ''
);

/** Base URL for all v1 API routes. */
export const API_V1 = `${API_BASE_URL}/api/v1`;

/** Default request timeout (ms). */
export const API_TIMEOUT_MS = 15000;
