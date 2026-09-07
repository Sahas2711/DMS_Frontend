/**
 * Admin session storage (private to the admin area).
 *
 * Access + refresh tokens and the profile snapshot are kept in localStorage so
 * a hard refresh or deep link keeps the admin signed in. Token values are only
 * ever sent to the same-origin API (dev: the configured VITE_API_BASE_URL).
 */

const ACCESS_KEY = 'dms_admin_access_token';
const REFRESH_KEY = 'dms_admin_refresh_token';
const PROFILE_KEY = 'dms_admin_profile';

export function getAccessToken() {
    try {
        return window.localStorage.getItem(ACCESS_KEY) || '';
    } catch {
        return '';
    }
}

export function getRefreshToken() {
    try {
        return window.localStorage.getItem(REFRESH_KEY) || '';
    } catch {
        return '';
    }
}

export function getStoredProfile() {
    try {
        const raw = window.localStorage.getItem(PROFILE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function setSession({ accessToken, refreshToken, user = null, permissions = [] }) {
    try {
        if (accessToken) window.localStorage.setItem(ACCESS_KEY, accessToken);
        if (refreshToken) window.localStorage.setItem(REFRESH_KEY, refreshToken);
        if (user !== null) {
            window.localStorage.setItem(PROFILE_KEY, JSON.stringify({ user, permissions }));
        }
    } catch {
        /* storage unavailable (e.g. blocked third-party context) — session is
           valid for this tab only and refresh will re-read tokens. */
    }
}

export function setTokens({ accessToken, refreshToken }) {
    try {
        if (accessToken) window.localStorage.setItem(ACCESS_KEY, accessToken);
        if (refreshToken) window.localStorage.setItem(REFRESH_KEY, refreshToken);
    } catch {
        /* no-op */
    }
}

export function clearSession() {
    try {
        window.localStorage.removeItem(ACCESS_KEY);
        window.localStorage.removeItem(REFRESH_KEY);
        window.localStorage.removeItem(PROFILE_KEY);
    } catch {
        /* no-op */
    }
}