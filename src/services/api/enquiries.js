import { post } from './client';

/**
 * Enquiry endpoints mirror the backend Pydantic schemas in
 * DMS_Backend/app/schemas/enquiry.py one-to-one. The payload builders below
 * are the single place that maps UI form state onto the wire format.
 */

export const CONSENT_VERSION = '1.0';

const toNullableString = (value) => {
    const trimmed = typeof value === 'string' ? value.trim() : '';
    return trimmed === '' ? null : trimmed;
};

const toNullableInt = (value) => {
    if (value === '' || value === null || value === undefined) return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
};

const stringIfPresent = (value) => {
    if (value === '' || value === null || value === undefined) return undefined;
    return String(value).trim() === '' ? undefined : value;
};

const optional = (key, value) => {
    const present = stringIfPresent(value);
    return present !== undefined ? { [key]: present } : {};
};

/**
 * Build the POST /enquiries/contact body from Contact form state.
 * Field names and optionality match ContactEnquiryRequest exactly.
 */
export function buildContactPayload(formData) {
    return {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        consent_given: Boolean(formData.consent_given),
        ...optional('company', formData.company),
        ...optional('subject', formData.subject),
        ...optional('phone', formData.phone),
        consent_version: CONSENT_VERSION,
    };
}

export function submitContactEnquiry(formData) {
    return post('/enquiries/contact', buildContactPayload(formData));
}

/**
 * Build the POST /enquiries/request-quote body from Request Quote form state.
 * Numeric/date/enum fields are converted/validated here so the server schema
 * is never sent a wrong type.
 */
export function buildRequestQuotePayload(formData) {
    const payload = {
        agency_company: formData.agency_company.trim(),
        agency_country: formData.agency_country.trim(),
        contact_name: formData.contact_name.trim(),
        contact_email: formData.contact_email.trim(),
        trip_type: formData.trip_type,
        consent_given: Boolean(formData.consent_given),
        contact_phone: toNullableString(formData.contact_phone),
        agency_website: toNullableString(formData.agency_website),
        destination: toNullableString(formData.destination),
        travel_dates_start: toNullableString(formData.travel_dates_start),
        travel_dates_end: toNullableString(formData.travel_dates_end),
        duration_days: toNullableInt(formData.duration_days),
        adults: toNullableInt(formData.adults) ?? 1,
        children: toNullableInt(formData.children) ?? 0,
        rooms: toNullableInt(formData.rooms) ?? 1,
        hotel_category: toNullableString(formData.hotel_category),
        rooming_notes: toNullableString(formData.rooming_notes),
        transport_type: toNullableString(formData.transport_type),
        transport_notes: toNullableString(formData.transport_notes),
        experiences_interests: toNullableString(formData.experiences_interests),
        must_see: toNullableString(formData.must_see),
        budget_range: toNullableString(formData.budget_range),
        budget_currency: toNullableString(formData.budget_currency),
        special_requirements: toNullableString(formData.special_requirements),
        consent_version: CONSENT_VERSION,
    };
    // Trim null optionals so the JSON matches the schema's optional fields.
    for (const key of Object.keys(payload)) {
        if (payload[key] === null) delete payload[key];
    }
    return payload;
}

export function submitRequestQuote(formData) {
    return post('/enquiries/request-quote', buildRequestQuotePayload(formData));
}

/**
 * Build the POST /enquiries/partner body from Become a Partner form state.
 */
export function buildPartnerPayload(formData) {
    return {
        company_name: formData.company_name.trim(),
        contact_name: formData.contact_name.trim(),
        email: formData.email.trim(),
        country: formData.country.trim(),
        consent_given: Boolean(formData.consent_given),
        ...optional('phone', formData.phone),
        ...optional('website', formData.website),
        ...optional('business_description', formData.business_description),
        consent_version: CONSENT_VERSION,
    };
}

export function submitPartnerEnquiry(formData) {
    return post('/enquiries/partner', buildPartnerPayload(formData));
}
