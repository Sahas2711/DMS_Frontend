import { API_TIMEOUT_MS, API_V1 } from '../../config/api';

/**
 * Normalized error thrown for every failed request (HTTP error, network
 * failure, timeout). `message` is always safe to show to a visitor.
 */
export class ApiError extends Error {
    constructor(message, options = {}) {
        super(message);
        this.name = 'ApiError';
        this.status = options.status ?? 0; // 0 = no HTTP response (network/timeout)
        this.code = options.code ?? 'NETWORK_ERROR';
        this.details = options.details ?? null;
        /** Map of field name -> message for 422 validation failures. */
        this.fieldErrors = options.fieldErrors ?? null;
        this.retryable = options.retryable ?? false;
    }
}

function isAbortError(error) {
    return error && (error.name === 'AbortError' || error.code === 20 || error.name === 'TimeoutError');
}

function normalizeDetail(detail) {
    if (detail && typeof detail === 'object' && 'error' in detail) {
        return detail.error;
    }
    return null;
}

/**
 * Translate a FastAPI 422 body ({ "detail": [{loc, msg, type}, ...] }) into a
 * field-keyed error map. The last loc segment matches the field name.
 */
function parseValidationErrors(detail) {
    const fieldErrors = {};
    if (!Array.isArray(detail)) return fieldErrors;
    for (const issue of detail) {
        if (!issue || !Array.isArray(issue.loc)) continue;
        const field = String(issue.loc[issue.loc.length - 1]);
        const message =
            typeof issue.msg === 'string' ? issue.msg : 'This value is not valid.';
        if (field && !fieldErrors[field]) {
            fieldErrors[field] = message;
        }
    }
    return fieldErrors;
}

function buildErrorMessage(errorBody, status, statusText) {
    const envelope = normalizeDetail(errorBody);
    if (envelope && envelope.message) return envelope.message;
    if (errorBody && typeof errorBody === 'object' && errorBody.message) {
        return errorBody.message;
    }
    const fallbacks = {
        400: 'The request could not be processed. Please check the form and try again.',
        401: 'Your session has expired. Please sign in again.',
        403: 'You do not have permission to perform this action.',
        404: 'The requested resource could not be found.',
        409: 'There is a conflict with the current state of the resource.',
        422: 'Some of the information you provided is not valid.',
        429: 'Too many requests. Please wait a moment and try again.',
    };
    if (status && fallbacks[status]) return fallbacks[status];
    if (status && status >= 500) {
        return 'Something went wrong on our side. Please try again in a moment.';
    }
    return statusText ? `Request failed (${statusText}).` : 'The request could not be completed.';
}

async function parseBody(response) {
    const text = await response.text();
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        return null;
    }
}

/**
 * Core request helper. Throws ApiError on any failure; resolves with parsed
 * JSON (or null for empty bodies) on 2xx.
 */
export async function request(path, { method = 'GET', body, headers = {}, timeoutMs, signal } = {}) {
    const url = `${API_V1}${path}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs ?? API_TIMEOUT_MS);

    const onAbort = () => signal && signal.aborted && controller.abort();
    signal?.addEventListener('abort', onAbort);

    const requestInit = {
        method,
        headers: { Accept: 'application/json', ...headers },
        signal: controller.signal,
    };
    if (body !== undefined && body !== null) {
        requestInit.headers['Content-Type'] = 'application/json';
        requestInit.body = JSON.stringify(body);
    }

    let response;
    try {
        response = await fetch(url, requestInit);
    } catch (error) {
        if (isAbortError(error)) {
            throw new ApiError(
                'The request timed out. Please check your connection and try again.',
                { retryable: true }
            );
        }
        throw new ApiError(
            'We could not reach the server. Please check your connection and try again.',
            { retryable: true }
        );
    } finally {
        clearTimeout(timeout);
        signal?.removeEventListener('abort', onAbort);
    }

    const parsed = await parseBody(response);

    if (!response.ok) {
        const envelope = normalizeDetail(parsed);
        const code = (envelope && envelope.code) || 'REQUEST_FAILED';
        const details =
            (envelope && envelope.details) ||
            (parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null);

        let fieldErrors = null;
        if (response.status === 422) {
            fieldErrors = parseValidationErrors(parsed && parsed.detail ? parsed.detail : parsed);
        }

        throw new ApiError(buildErrorMessage(parsed, response.status, response.statusText), {
            status: response.status,
            code,
            details,
            fieldErrors,
            retryable: response.status >= 500 || response.status === 429,
        });
    }

    return parsed;
}

export function get(path, options) {
    return request(path, { method: 'GET', ...options });
}

export function post(path, body, options) {
    return request(path, { method: 'POST', body, ...options });
}

/** Short, visitor-safe headline for any thrown error (ApiError or otherwise). */
export function errorMessage(error, fallback = 'Something went wrong. Please try again.') {
    if (error instanceof ApiError) return error.message;
    if (error && error.message) return error.message;
    return fallback;
}
