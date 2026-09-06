/**
 * Client-side form validation.
 *
 * This is a convenience for the visitor, not a security control — whatever
 * backend eventually receives these values must validate them again.
 */

// Deliberately permissive: the only reliable proof an address works is sending
// to it, and over-strict patterns reject valid real-world addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const WEBSITE_PATTERN = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;
const PHONE_PATTERN = /^[+()\d\s.-]{6,}$/;
const CURRENCY_PATTERN = /^[A-Za-z]{3}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

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

// ── Generic field validators shared by enquiry forms ─────────────────────

export function validateRequired(value, label = 'This field') {
    const text = String(value ?? '').trim();
    if (!text) return `Please enter ${/^[aeiou]/i.test(label) ? 'an' : 'a'} ${label.toLowerCase()}.`;
    return null;
}

export function validatePhoneOptional(value) {
    const text = String(value ?? '').trim();
    if (!text) return null;
    if (!PHONE_PATTERN.test(text)) {
        return 'Please enter a valid phone number (digits, spaces, +, - or parentheses).';
    }
    return null;
}

export function validateWebsiteOptional(value) {
    const text = String(value ?? '').trim();
    if (!text) return null;
    if (!WEBSITE_PATTERN.test(text)) return 'Please enter a valid website URL, e.g. https://agency.com.';
    return null;
}

export function validateCurrencyOptional(value) {
    const text = String(value ?? '').trim();
    if (!text) return null;
    if (!CURRENCY_PATTERN.test(text)) return 'Please enter a 3-letter currency code, e.g. USD.';
    return null;
}

export function validatePositiveIntegerOptional(value, label = 'value') {
    const text = String(value ?? '').trim();
    if (!text) return null;
    const parsed = Number(text);
    if (!Number.isInteger(parsed) || parsed < 1) return `Please enter a whole number of at least 1 for ${label}.`;
    return null;
}

export function validateNonNegativeIntegerOptional(value, label = 'value') {
    const text = String(value ?? '').trim();
    if (!text) return null;
    const parsed = Number(text);
    if (!Number.isInteger(parsed) || parsed < 0) return `Please enter a whole number of at least 0 for ${label}.`;
    return null;
}

export function validateDateOptional(value) {
    const text = String(value ?? '').trim();
    if (!text) return null;
    if (!DATE_PATTERN.test(text)) return 'Please pick a valid date.';
    const [year, month, day] = text.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (
        date.getUTCFullYear() !== year ||
        date.getUTCMonth() !== month - 1 ||
        date.getUTCDate() !== day
    ) {
        return 'Please pick a valid date.';
    }
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
