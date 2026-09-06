export const CONSENT_STORAGE_KEY = 'ast-cookie-consent';
export const CONSENT_EVENT = 'ast:consent-change';

export function readConsent() {
    try {
        const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
        return value === 'accept' || value === 'decline' ? value : null;
    } catch {
        return null;
    }
}