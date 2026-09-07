import { API_TIMEOUT_MS, API_V1 } from '../../config/api';
import { ApiError } from './client';

/**
 * Authorized request helper for the admin area.
 *
 * Adds the Bearer token, and transparently refreshes a rotated session when the
 * API answers 401 (access tokens live 15 min). If the refresh token is also
 * invalid/expired the session is cleared and a SESSION_EXPIRED_EVENT is fired so
 * route guards can redirect to the login screen.
 *
 * Multipart uploads pass `formData` (the browser sets the boundary header).
 * JSON bodies pass `body` (an object that gets serialized).
 */

export const SESSION_EXPIRED_EVENT = 'dms:admin:session-expired';

let refreshPromise = null;

function emitSessionExpired() {
    try {
        window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT));
    } catch {
        /* non-DOM environment (tests) */
    }
}

function buildQuery(params) {
    const search = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') search.set(key, String(value));
    });
    const q = search.toString();
    return q ? `?${q}` : '';
}

function parseBody(response) {
    return response.text().then((text) => {
        if (!text) return null;
        try {
            return JSON.parse(text);
        } catch {
            return null;
        }
    });
}

async function doRefresh() {
    const { getRefreshToken } = await import('../admin/session');
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        const err = new ApiError('Your session has expired. Please sign in again.', {
            status: 401,
            code: 'SESSION_EXPIRED',
        });
        throw err;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
    let response;
    try {
        response = await fetch(`${API_V1}/auth/refresh`, {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken }),
            signal: controller.signal,
        });
    } catch {
        throw new ApiError('Could not reach the server. Please check your connection.', {
            status: 0,
            code: 'NETWORK_ERROR',
            retryable: true,
        });
    } finally {
        clearTimeout(timeout);
    }

    const parsed = await parseBody(response);
    if (!response.ok) {
        throw new ApiError(
            'Your session has expired. Please sign in again.',
            { status: 401, code: 'SESSION_EXPIRED' }
        );
    }

    const { setTokens } = await import('../admin/session');
    setTokens({ accessToken: parsed.access_token, refreshToken: parsed.refresh_token });
    return parsed.access_token;
}

function requestRefresh() {
    if (!refreshPromise) {
        refreshPromise = doRefresh().finally(() => {
            refreshPromise = null;
        });
    }
    return refreshPromise;
}

async function rawFetch(path, { method, body, formData, query, headers = {} } = {}) {
    const { getAccessToken } = await import('../admin/session');
    const token = getAccessToken();
    if (!token) {
        const err = new ApiError('Your session has expired. Please sign in again.', {
            status: 401,
            code: 'SESSION_EXPIRED',
        });
        emitSessionExpired();
        throw err;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

    const requestHeaders = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        ...headers,
    };
    if (formData) {
        // Let the browser set multipart/form-data with its boundary.
        delete requestHeaders['Content-Type'];
    } else if (body !== undefined) {
        requestHeaders['Content-Type'] = 'application/json';
    }

    let response;
    try {
        response = await fetch(`${API_V1}${path}${buildQuery(query)}`, {
            method,
            headers: requestHeaders,
            body: formData || (body !== undefined ? JSON.stringify(body) : undefined),
            signal: controller.signal,
        });
    } catch (error) {
        const aborted = error && (error.name === 'AbortError' || error.code === 20);
        throw new ApiError(
            aborted
                ? 'The request timed out. Please check your connection and try again.'
                : 'Could not reach the server. Please check your connection.',
            { status: 0, code: aborted ? 'TIMEOUT' : 'NETWORK_ERROR', retryable: true }
        );
    } finally {
        clearTimeout(timeout);
    }

    return response;
}

/**
 * Perform an authenticated request. Resolves to the parsed JSON body (null for
 * 204s) or throws ApiError. A 401 triggers exactly one session refresh + retry.
 */
export async function adminRequest(path, options = {}) {
    let response = await rawFetch(path, options);

    if (response.status === 401) {
        let newToken;
        try {
            newToken = await requestRefresh();
        } catch (refreshError) {
            // A genuine auth failure (invalid/expired refresh token) ends the
            // session. A transient network/timeout during refresh must NOT
            // clear the session — the caller retries or shows a network error.
            if (!refreshError.retryable) {
                emitSessionExpired();
            }
            throw refreshError;
        }
        const { setTokens } = await import('../admin/session');
        setTokens({ accessToken: newToken });
        response = await rawFetch(path, options);
    }

    const parsed = await parseBody(response);

    if (!response.ok) {
        const defaultMessage = {
            400: 'The request could not be processed. Please check the form and try again.',
            401: 'Your session has expired. Please sign in again.',
            403: 'You do not have permission to perform this action.',
            404: 'The requested resource could not be found.',
            409: 'There is a conflict with the current state of the resource.',
            413: 'That file is too large. Please choose a smaller image.',
            415: 'That file type is not supported.',
            422: 'Some of the information you provided is not valid.',
            429: 'Too many requests. Please wait a moment and try again.',
        };
        const envelope = parsed && parsed.error ? parsed.error : null;
        const message =
            (envelope && envelope.message) ||
            (parsed && parsed.message) ||
            defaultMessage[response.status] ||
            (response.status >= 500 ? 'Something went wrong on our side. Please try again.' : 'The request could not be completed.');

        let fieldErrors = null;
        if (response.status === 422 && Array.isArray(parsed?.detail)) {
            fieldErrors = {};
            for (const issue of parsed.detail) {
                const field = issue.loc ? String(issue.loc[issue.loc.length - 1]) : null;
                if (field && !fieldErrors[field]) fieldErrors[field] = issue.msg || 'This value is not valid.';
            }
        }

        throw new ApiError(message, {
            status: response.status,
            code: (envelope && envelope.code) || 'REQUEST_FAILED',
            details: (envelope && envelope.details) || null,
            fieldErrors,
            retryable: response.status >= 500 || response.status === 429,
        });
    }

    return parsed;
}

export function adminGet(path, options) {
    return adminRequest(path, { ...options, method: 'GET' });
}

export function adminPost(path, body, options) {
    return adminRequest(path, { ...options, method: 'POST', body });
}

export function adminPut(path, body, options) {
    return adminRequest(path, { ...options, method: 'PUT', body });
}

export function adminPatch(path, body, options) {
    return adminRequest(path, { ...options, method: 'PATCH', body });
}

export function adminDelete(path, options) {
    return adminRequest(path, { ...options, method: 'DELETE' });
}