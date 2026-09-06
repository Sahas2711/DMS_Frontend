import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
    buildContactPayload,
    buildRequestQuotePayload,
    buildPartnerPayload,
    CONSENT_VERSION,
} from './enquiries';
import * as client from './client';

describe('buildContactPayload', () => {
    it('maps required fields and consent', () => {
        const payload = buildContactPayload({
            name: '  Jane Doe ',
            email: 'jane@agency.com',
            message: '  Hello there  ',
            consent_given: true,
            company: '',
            subject: '',
            phone: '',
        });
        expect(payload).toEqual({
            name: 'Jane Doe',
            email: 'jane@agency.com',
            message: 'Hello there',
            consent_given: true,
            consent_version: CONSENT_VERSION,
        });
    });

    it('omits empty optional fields', () => {
        const payload = buildContactPayload({
            name: 'Jane',
            email: 'jane@agency.com',
            message: 'Hello',
            consent_given: false,
            company: '',
            subject: '  ',
            phone: null,
        });
        expect(payload).not.toHaveProperty('company');
        expect(payload).not.toHaveProperty('subject');
        expect(payload).not.toHaveProperty('phone');
        expect(payload.consent_given).toBe(false);
    });

    it('includes optional fields when present', () => {
        const payload = buildContactPayload({
            name: 'Jane',
            email: 'jane@agency.com',
            message: 'Hello',
            consent_given: true,
            company: 'Lotus Travel',
            subject: 'Existing booking',
            phone: '+44 20 1234 5678',
        });
        expect(payload.company).toBe('Lotus Travel');
        expect(payload.subject).toBe('Existing booking');
        expect(payload.phone).toBe('+44 20 1234 5678');
    });
});

describe('buildPartnerPayload', () => {
    it('maps required fields and consent', () => {
        const payload = buildPartnerPayload({
            company_name: 'Wanderlust',
            contact_name: 'Priya',
            email: 'priya@wanderlust.com',
            country: 'Australia',
            consent_given: true,
            phone: '',
            website: '',
            business_description: '',
        });
        expect(payload).toEqual({
            company_name: 'Wanderlust',
            contact_name: 'Priya',
            email: 'priya@wanderlust.com',
            country: 'Australia',
            consent_given: true,
            consent_version: CONSENT_VERSION,
        });
    });

    it('includes optional fields when present', () => {
        const payload = buildPartnerPayload({
            company_name: 'Wanderlust',
            contact_name: 'Priya',
            email: 'priya@wanderlust.com',
            country: 'Australia',
            consent_given: true,
            phone: '+61 400 000 000',
            website: 'https://wanderlust.com',
            business_description: 'FIT and group operator',
        });
        expect(payload.phone).toBe('+61 400 000 000');
        expect(payload.website).toBe('https://wanderlust.com');
        expect(payload.business_description).toBe('FIT and group operator');
    });
});

describe('buildRequestQuotePayload', () => {
    const base = {
        agency_company: '  Lotus Travel ',
        agency_country: 'United Kingdom',
        contact_name: 'Sarah',
        contact_email: 'sarah@lotus.com',
        trip_type: 'GROUP',
        consent_given: true,
        contact_phone: '',
        agency_website: '',
        destination: '',
        travel_dates_start: '',
        travel_dates_end: '',
        duration_days: '',
        adults: '2',
        children: '1',
        rooms: '1',
        hotel_category: '',
        rooming_notes: '',
        transport_type: '',
        transport_notes: '',
        experiences_interests: '',
        must_see: '',
        budget_range: '',
        budget_currency: '',
        special_requirements: '',
    };

    it('maps required fields and trims strings', () => {
        const payload = buildRequestQuotePayload(base);
        expect(payload.agency_company).toBe('Lotus Travel');
        expect(payload.consent_given).toBe(true);
        expect(payload.consent_version).toBe(CONSENT_VERSION);
    });

    it('defaults traveller counts when blank', () => {
        const payload = buildRequestQuotePayload({ ...base, adults: '', children: '', rooms: '' });
        expect(payload.adults).toBe(1);
        expect(payload.children).toBe(0);
        expect(payload.rooms).toBe(1);
    });

    it('converts numeric strings to integers', () => {
        const payload = buildRequestQuotePayload({ ...base, duration_days: '10' });
        expect(payload.duration_days).toBe(10);
    });

    it('drops keys whose value is null', () => {
        const payload = buildRequestQuotePayload(base);
        expect(payload).not.toHaveProperty('destination');
        expect(payload).not.toHaveProperty('duration_days');
        expect(payload).not.toHaveProperty('budget_currency');
        expect(payload).not.toHaveProperty('hotel_category');
    });

    it('keeps blank contact_phone as null (dropped)', () => {
        const payload = buildRequestQuotePayload(base);
        expect(payload).not.toHaveProperty('contact_phone');
    });
});

describe('submit functions', () => {
    beforeEach(() => {
        vi.spyOn(client, 'post').mockResolvedValue({ public_id: 'REQ-1' });
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('submitContactEnquiry posts to the contact endpoint', async () => {
        const { submitContactEnquiry } = await import('./enquiries');
        const formData = {
            name: 'Jane',
            email: 'jane@x.com',
            message: 'Hello',
            consent_given: true,
        };
        await submitContactEnquiry(formData);
        expect(client.post).toHaveBeenCalledWith('/enquiries/contact', expect.objectContaining({ name: 'Jane' }));
    });

    it('submitRequestQuote posts to the request-quote endpoint', async () => {
        const { submitRequestQuote } = await import('./enquiries');
        const formData = {
            agency_company: 'Lotus',
            agency_country: 'UK',
            contact_name: 'Sarah',
            contact_email: 'sarah@x.com',
            trip_type: 'GROUP',
            consent_given: true,
        };
        await submitRequestQuote(formData);
        expect(client.post).toHaveBeenCalledWith('/enquiries/request-quote', expect.any(Object));
    });

    it('submitPartnerEnquiry posts to the partner endpoint', async () => {
        const { submitPartnerEnquiry } = await import('./enquiries');
        const formData = {
            company_name: 'Wanderlust',
            contact_name: 'Priya',
            email: 'priya@x.com',
            country: 'Australia',
            consent_given: true,
        };
        await submitPartnerEnquiry(formData);
        expect(client.post).toHaveBeenCalledWith('/enquiries/partner', expect.objectContaining({ email: 'priya@x.com' }));
    });
});
