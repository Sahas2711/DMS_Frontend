import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
    getAccessToken,
    getRefreshToken,
    getStoredProfile,
    clearSession,
    setSession,
    setTokens,
} from '../services/admin/session';
import { SESSION_EXPIRED_EVENT } from '../services/api/admin';
import * as authApi from '../services/api/auth';

/* eslint-disable react-refresh/only-export-components */
/**
 * Admin authentication state. Backed by the backend's JWT auth (access token
 * 15 min, rotating refresh 7 days). The backend is always authoritative — this
 * context only mirrors the session for UI/UX purposes (guards + permission-aware
 * navigation and action buttons).
 */

const AuthContext = createContext(null);

function loadProfile() {
    const stored = getStoredProfile();
    if (stored && stored.user) return stored;
    return null;
}

export function AuthProvider({ children }) {
    const [profile, setProfileState] = useState(loadProfile);
    const [ready, setReady] = useState(() => !getAccessToken());

    const user = profile?.user ?? null;
    const permissions = useMemo(
        () => new Set(profile?.permissions || []),
        [profile]
    );

    // Validate a persisted session on first load (deep link / refresh).
    useEffect(() => {
        let cancelled = false;
        if (!getAccessToken()) {
            return undefined;
        }
        authApi
            .getMe()
            .then((me) => {
                if (cancelled) return;
                setProfileState({
                    user: me,
                    permissions: Array.isArray(me.permissions) ? me.permissions : [],
                });
            })
            .catch(() => {
                if (cancelled) return;
                clearSession();
                setProfileState(null);
            })
            .finally(() => {
                if (!cancelled) setReady(true);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    // A failed refresh anywhere clears the session and redirects to login.
    useEffect(() => {
        const onExpired = () => {
            clearSession();
            setProfileState(null);
            setReady(true);
        };
        window.addEventListener(SESSION_EXPIRED_EVENT, onExpired);
        return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired);
    }, []);

    const login = useCallback(
        async ({ email, password }) => {
            const data = await authApi.login({ email, password });

            // Persist the *new* credentials before hydrating the profile. The
            // authorized client reads tokens from storage, so skipping this
            // step made `/admin/me` authenticate with a stale (or previous
            // user's) token — returning the wrong profile or triggering a
            // spurious refresh/expiry that collapsed the session.
            setTokens({
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
            });

            let me;
            try {
                me = await authApi.getMe();
            } catch {
                me = null;
            }

            if (!me || typeof me !== 'object') {
                // `/admin/me` is temporarily unavailable — keep the login
                // usable from the login payload (which carries identity but no
                // permission list). The backend still enforces every request.
                me = data.user && typeof data.user === 'object' ? data.user : { email };
            }

            const next = {
                user: me,
                permissions: Array.isArray(me.permissions)
                    ? me.permissions
                    : Array.isArray(data.permissions)
                      ? data.permissions
                      : [],
            };
            setSession({
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                user: next.user,
                permissions: next.permissions,
            });
            setProfileState(next);
            return me;
        },
        []
    );

    const logout = useCallback(async () => {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            await authApi.logout(refreshToken).catch(() => {});
        }
        clearSession();
        setProfileState(null);
    }, []);

    const changePassword = useCallback(
        async (payload) => {
            await authApi.changePassword(payload);
        },
        []
    );

    const refreshMe = useCallback(async () => {
        const me = await authApi.getMe();
        setProfileState({
            user: me,
            permissions: Array.isArray(me.permissions) ? me.permissions : [],
        });
        return me;
    }, []);

    const can = useCallback(
        (permission) => {
            if (!user) return false;
            if (user.is_super_admin) return true;
            return permissions.has(permission);
        },
        [user, permissions]
    );

    const value = useMemo(
        () => ({
            user,
            permissions,
            ready,
            login,
            logout,
            changePassword,
            refreshMe,
            can,
        }),
        [user, permissions, ready, login, logout, changePassword, refreshMe, can]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}