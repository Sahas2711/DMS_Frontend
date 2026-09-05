/**
 * Client-side form validation.
 *
 * This is a convenience for the visitor, not a security control — whatever
 * backend eventually receives these values must validate them again.
 */

// Deliberately permissive: the only reliable proof an address works is sending
// to it, and over-strict patterns reject valid real-world addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MIN_PASSWORD_LENGTH = 8;

export function validateFullName(value) {
    const name = value.trim();
    if (!name) return 'Please enter your full name.';
    if (name.length < 2) return 'Please enter your full name.';
    return null;
}

export function validateEmail(value) {
    const email = value.trim();
    if (!email) return 'Please enter your email address.';
    if (!EMAIL_PATTERN.test(email)) return 'Please enter a valid email address.';
    return null;
}

export function validatePassword(value, { isNew = false } = {}) {
    if (!value) return 'Please enter your password.';
    if (isNew && value.length < MIN_PASSWORD_LENGTH) {
        return `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
    }
    return null;
}

export function validateTerms(accepted) {
    if (!accepted) return 'Please accept the privacy policy to continue.';
    return null;
}

/**
 * Rough strength signal for the sign-up field. Length matters far more than
 * character-class rules, so it is weighted that way.
 */
export function passwordStrength(value) {
    if (!value) return { score: 0, label: '', tone: '' };

    let score = 0;
    if (value.length >= MIN_PASSWORD_LENGTH) score += 1;
    if (value.length >= 12) score += 1;
    if (/[^A-Za-z0-9]/.test(value) || (/[A-Za-z]/.test(value) && /[0-9]/.test(value))) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', tone: 'bg-red-500 text-red-600' };
    if (score === 2) return { score: 2, label: 'Good', tone: 'bg-amber-500 text-amber-600' };
    return { score: 3, label: 'Strong', tone: 'bg-emerald-600 text-emerald-700' };
}
