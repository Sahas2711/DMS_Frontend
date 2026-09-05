/**
 * Authentication seam.
 *
 * The UI in `src/components/auth/` is complete and talks only to this module,
 * so wiring a real provider means editing this one file and nothing else.
 *
 * Until a provider is configured every call rejects with AuthNotConfiguredError,
 * which the form renders as a clear notice. That is deliberate: a sign-in form
 * that silently appears to succeed while nothing is stored would be worse than
 * one that says plainly it is not connected yet.
 *
 * To connect a provider (Firebase Auth, Supabase, Auth0, Cognito, or your own
 * API), replace the bodies below. Contract:
 *   - resolve with a user object on success
 *   - reject with an Error whose `.message` is safe to show to the visitor
 *   - never log, persist, or transmit the password anywhere but the provider
 *
 * Note on Google: `signInWithGoogle` must trigger the provider's own OAuth
 * redirect or popup. Never build a form that collects a Google password
 * directly — users must authenticate on accounts.google.com.
 */

export class AuthNotConfiguredError extends Error {
    constructor(action) {
        super(
            `Sign-in is not connected yet. Configure a provider in src/services/auth.js (${action}).`
        );
        this.name = 'AuthNotConfiguredError';
        this.isNotConfigured = true;
    }
}

/** Flip to true once the calls below talk to a real provider. */
export const AUTH_CONFIGURED = false;

/** Message shown to visitors while no provider is wired up. */
export const NOT_CONFIGURED_MESSAGE =
    'Accounts are not available just yet. Please contact us and our team will help you directly.';

export async function signInWithEmail({ email, password }) {
    void email;
    void password;
    throw new AuthNotConfiguredError('signInWithEmail');
}

export async function signUpWithEmail({ fullName, email, password }) {
    void fullName;
    void email;
    void password;
    throw new AuthNotConfiguredError('signUpWithEmail');
}

export async function signInWithGoogle() {
    throw new AuthNotConfiguredError('signInWithGoogle');
}

export async function requestPasswordReset({ email }) {
    void email;
    throw new AuthNotConfiguredError('requestPasswordReset');
}
