import { post } from './client';
import { adminGet, adminPost } from './admin';

/**
 * Authentication API. Public endpoints (login) use the plain client; the
 * session endpoints (logout, change-password, me) use the authorized client so
 * a stale access token is transparently refreshed first.
 */

export async function login({ email, password }) {
    return post('/auth/login', { email, password });
}

export async function logout(refreshToken) {
    return adminPost('/auth/logout', { refresh_token: refreshToken });
}

export async function getMe() {
    return adminGet('/admin/me');
}

export async function changePassword({ current_password, new_password }) {
    return adminPost('/auth/change-password', { current_password, new_password });
}

/**
 * Request a password reset. Public endpoint; the server always returns the
 * same generic message so callers cannot enumerate registered accounts.
 */
export async function forgotPassword({ email }) {
    return post('/auth/forgot-password', { email });
}

/** Set a new password using the one-time token from the emailed reset link. */
export async function resetPassword({ token, new_password }) {
    return post('/auth/reset-password', { token, new_password });
}