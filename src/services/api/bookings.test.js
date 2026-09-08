import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { buildBookingPayload, submitBookingRequest } from './bookings';
import * as client from './client';

const baseForm = {
    fullName: '  Jane Doe ',
    email: ' jane@example.com ',
    phonePrefix: '+84 (VNM)',
    phone: '912 345 678',
    country: 'Vietnam',
    flightNumber: 'sq192',
    arrivalDate: '2026-09-15',
    arrivalDateDisplay: '15 Sep 2026',
    landingTime: '14:35',
    placardNotes: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
};

const baseSeating = {
    transitDirection: 'inbound',
    guestCount: 1,
    serviceLevel: 'standard',
    addons: { mercedes: false, lounge: false },
    basePrice: 33.9,
    porterPrice: 14.1,
    mercedesPrice: 0,
    loungePrice: 0,
    totalPrice: 48.0,
};

describe('buildBookingPayload', () => {
    it('maps contact, flight and pricing fields', () => {
        const payload = buildBookingPayload(baseForm, baseSeating);
        expect(payload.full_name).toBe('Jane Doe');
        expect(payload.email).toBe('jane@example.com');
        expect(payload.phone).toBe('+84 (VNM) 912 345 678');
        expect(payload.country).toBe('Vietnam');
        expect(payload.flight_number).toBe('SQ192');
        expect(payload.arrival_date).toBe('2026-09-15');
        expect(payload.landing_time).toBe('14:35');
        expect(payload.transit_direction).toBe('inbound');
        expect(payload.guest_count).toBe(1);
        expect(payload.service_level).toBe('standard');
        expect(payload.addon_mercedes).toBe(false);
        expect(payload.addon_lounge).toBe(false);
        expect(payload.base_price).toBe(33.9);
        expect(payload.porter_price).toBe(14.1);
        expect(payload.total_price).toBe(48.0);
    });

    it('marks optional fields when present', () => {
        const payload = buildBookingPayload(
            { ...baseForm, placardNotes: 'Ms. Vance' },
            baseSeating
        );
        expect(payload.placard_notes).toBe('Ms. Vance');
    });

    it('omits empty optional fields', () => {
        const payload = buildBookingPayload(
            { ...baseForm, landingTime: '', placardNotes: '' },
            baseSeating
        );
        expect(payload).not.toHaveProperty('placard_notes');
        expect(payload).not.toHaveProperty('landing_time');
    });

    it('maps outbound direction and add-ons', () => {
        const payload = buildBookingPayload(baseForm, {
            ...baseSeating,
            transitDirection: 'outbound',
            addons: { mercedes: true, lounge: true },
            mercedesPrice: 62,
            loungePrice: 38,
            totalPrice: 148,
        });
        expect(payload.transit_direction).toBe('outbound');
        expect(payload.addon_mercedes).toBe(true);
        expect(payload.addon_lounge).toBe(true);
        expect(payload.addon_mercedes_price).toBe(62);
        expect(payload.addon_lounge_price).toBe(38);
        expect(payload.total_price).toBe(148);
    });

    it('never includes card details', () => {
        const payload = buildBookingPayload(
            { ...baseForm, cardNumber: '4242 4242 4242 4242', cardCvv: '123' },
            baseSeating
        );
        expect(payload).not.toHaveProperty('cardNumber');
        expect(payload).not.toHaveProperty('cardCvv');
        expect(payload).not.toHaveProperty('cardExpiry');
        expect(payload).not.toHaveProperty('cardName');
    });
});

describe('submitBookingRequest', () => {
    beforeEach(() => {
        vi.spyOn(client, 'post').mockResolvedValue({ public_id: 'BK-1', status: 'PENDING' });
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('posts to the booking-requests endpoint', async () => {
        const result = await submitBookingRequest(baseForm, baseSeating);
        expect(client.post).toHaveBeenCalledWith(
            '/booking-requests',
            expect.objectContaining({ flight_number: 'SQ192', total_price: 48.0 })
        );
        expect(result).toEqual({ public_id: 'BK-1', status: 'PENDING' });
    });
});