/**
 * Central backend API configuration.
 *
 * All network code reads from here — components and services never hardcode a
 * host. Set VITE_API_BASE_URL in an .env file (see .env.example) per
 * environment:
 *
 *   dev     -> http://localhost:8000 (backend: uvicorn app.main:app --reload)
 *   prod    -> https://api.your-domain.com (or a relative proxy path)
 *
 * The fallback below exists so the dev server works out of the box; it is not
 * a production value.
 */
const DEFAULT_API_BASE_URL = 'http://localhost:8000';

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(
    /\/+$/,
    ''
);

/** Base URL for all v1 API routes. */
export const API_V1 = `${API_BASE_URL}/api/v1`;

/** Default request timeout (ms). */
export const API_TIMEOUT_MS = 15000;
