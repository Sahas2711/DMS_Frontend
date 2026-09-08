import { post } from './client';

/**
 * Booking endpoints mirror the backend Pydantic schemas in
 * DMS_Backend/app/schemas/booking.py one-to-one. The payload builder is the
 * single place that maps checkout form state onto the wire format.
 *
 * Card details never travel to the API: the reservation request carries only
 * traveller contact, flight schedule and optional upgrades. Payment remains a
 * manual/on-arrival step handled by the operations desk.
 */

const toNullableString = (value) => {
    const trimmed = typeof value === 'string' ? value.trim() : '';
    return trimmed === '' ? null : trimmed;
};

const toNumber = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

/**
 * Build the POST /booking-requests body from checkout state.
 * Field names and optionality match BookingRequestCreate exactly.
 */
export function buildBookingPayload(formData, seating) {
    const phone = `${formData.phonePrefix || ''} ${formData.phone || ''}`.trim();
    const addonAll =
        seating.addons && typeof seating.addons === 'object' ? seating.addons : {};
    const prices = {
        base_price: toNumber(seating.basePrice),
        porter_price: toNumber(seating.porterPrice),
        addon_mercedes_price: toNumber(seating.mercedesPrice),
        addon_lounge_price: toNumber(seating.loungePrice),
        total_price: toNumber(seating.totalPrice),
    };

    const payload = {
        full_name: (formData.fullName || '').trim(),
        email: (formData.email || '').trim(),
        phone,
        country: toNullableString(formData.country),
        transit_direction: seating.transitDirection === 'outbound' ? 'outbound' : 'inbound',
        flight_number: (formData.flightNumber || '').trim().toUpperCase(),
        arrival_date: toNullableString(formData.arrivalDate),
        landing_time: toNullableString(formData.landingTime),
        guest_count: toNumber(seating.guestCount, 1),
        service_level: seating.serviceLevel || 'standard',
        addon_mercedes: Boolean(addonAll.mercedes),
        addon_lounge: Boolean(addonAll.lounge),
        total_price: prices.total_price,
        ...prices,
        placard_notes: toNullableString(formData.placardNotes),
    };

    // Trim null optionals so the JSON matches the schema's optional fields.
    for (const key of Object.keys(payload)) {
        if (payload[key] === null) delete payload[key];
    }
    return payload;
}

export function submitBookingRequest(formData, seating) {
    return post('/booking-requests', buildBookingPayload(formData, seating));
}