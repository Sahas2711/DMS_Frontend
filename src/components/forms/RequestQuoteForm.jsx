/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEnquirySubmit } from '../../hooks/useEnquirySubmit';
import { submitRequestQuote } from '../../services/api/enquiries';
import {
    validateCurrencyOptional,
    validateDateOptional,
    validateEmail,
    validateNonNegativeIntegerOptional,
    validatePhoneOptional,
    validatePositiveIntegerOptional,
    validateRequired,
    validateWebsiteOptional,
} from '../../utils/validation';
import {
    BUDGET_RANGES,
    CURRENCIES,
    HOTEL_CATEGORIES,
    TRANSPORT_TYPES,
    TRIP_TYPES,
} from '../../config/enquiry';
import {
    CheckboxField,
    FormAlert,
    SelectInput,
    SubmitButton,
    TextArea,
    TextInput,
} from './FormFields';

const EMPTY = {
    agency_company: '',
    agency_country: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    agency_website: '',
    destination: '',
    travel_dates_start: '',
    travel_dates_end: '',
    duration_days: '',
    adults: '1',
    children: '0',
    rooms: '1',
    trip_type: '',
    hotel_category: '',
    rooming_notes: '',
    transport_type: '',
    transport_notes: '',
    experiences_interests: '',
    must_see: '',
    budget_range: '',
    budget_currency: '',
    special_requirements: '',
    consent_given: false,
};

export function validateQuoteForm(formData) {
    const errors = {};
    const required = (field, label) => {
        const error = validateRequired(formData[field], label);
        if (error) errors[field] = error;
    };

    required('agency_company', 'Agency / company name');
    required('agency_country', 'Country');
    required('contact_name', 'Contact name');
    required('trip_type', 'Trip type');

    const emailError = validateEmail(formData.contact_email);
    if (emailError) errors.contact_email = emailError;

    const phoneError = validatePhoneOptional(formData.contact_phone);
    if (phoneError) errors.contact_phone = phoneError;

    const websiteError = validateWebsiteOptional(formData.agency_website);
    if (websiteError) errors.agency_website = websiteError;

    const startError = validateDateOptional(formData.travel_dates_start);
    if (startError) errors.travel_dates_start = startError;
    const endError = validateDateOptional(formData.travel_dates_end);
    if (endError) {
        errors.travel_dates_end = endError;
    } else if (
        !startError &&
        formData.travel_dates_start &&
        formData.travel_dates_end &&
        formData.travel_dates_end < formData.travel_dates_start
    ) {
        errors.travel_dates_end = 'The end date must be on or after the start date.';
    }

    const durationError = validatePositiveIntegerOptional(formData.duration_days, 'days');
    if (durationError) errors.duration_days = durationError;

    const adultsError = validatePositiveIntegerOptional(formData.adults, 'adults');
    if (adultsError) errors.adults = adultsError;
    const childrenError = validateNonNegativeIntegerOptional(formData.children, 'children');
    if (childrenError) errors.children = childrenError;
    const roomsError = validatePositiveIntegerOptional(formData.rooms, 'rooms');
    if (roomsError) errors.rooms = roomsError;

    const currencyError = validateCurrencyOptional(formData.budget_currency);
    if (currencyError) errors.budget_currency = currencyError;

    if (!formData.consent_given) {
        errors.consent_given = 'Please accept the privacy notice so we can respond to your request.';
    }
    return errors;
}

const SectionTitle = ({ index, children }) => (
    <div className="flex items-center gap-3 col-span-full mt-2 first:mt-0">
        <span className="w-7 h-7 rounded-full bg-cream border border-bronze/30 text-bronze text-xs font-bold flex items-center justify-center shrink-0">
            {index}
        </span>
        <h3 className="text-navy text-base md:text-lg font-serif font-semibold">{children}</h3>
        <span className="flex-1 h-px bg-gray-200" aria-hidden="true" />
    </div>
);

const RequestQuoteForm = ({ initialTripType = '' }) => {
    const [formData, setFormData] = useState({ ...EMPTY, trip_type: initialTripType || '' });
    const [clientErrors, setClientErrors] = useState({});
    const { status, message, referenceId, fieldErrors, handleSubmit } = useEnquirySubmit({
        submit: submitRequestQuote,
    });

    const errors = { ...clientErrors, ...fieldErrors };
    const isSubmitting = status === 'submitting';

    const setField = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setClientErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setField(name, type === 'checkbox' ? checked : value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateQuoteForm(formData);
        setClientErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        await handleSubmit(formData);
    };

    const reset = () => {
        setFormData({ ...EMPTY, trip_type: initialTripType || '' });
        setClientErrors({});
    };

    if (status === 'success') {
        return (
            <div role="status" className="p-6 md:p-10 bg-[#E8F5E9] border border-[#A5D6A7] rounded-2xl text-center">
                <h3 className="text-[#2E7D32] font-bold text-xl mb-3">
                    Thank you — your quote request has been received.
                </h3>
                <p className="text-sm text-gray-700 max-w-xl mx-auto mb-2 leading-relaxed">
                    A destination specialist will review your requirements and come back to you
                    with a tailored proposal, usually within one business day.
                </p>
                {referenceId && (
                    <p className="text-xs text-gray-600 mb-5">
                        Reference: <span className="font-mono font-semibold">{referenceId}</span>
                    </p>
                )}
                <button
                    type="button"
                    onClick={reset}
                    className="btn btn--md btn--navy mt-2"
                >
                    Send another request
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5" data-testid="request-quote-form">
            {status === 'error' && (
                <FormAlert tone="error">
                    <span className="font-semibold block mb-1">We could not submit your request.</span>
                    {message} Your details have been kept — please correct the highlighted fields or try again.
                </FormAlert>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <SectionTitle index={1}>Agency details</SectionTitle>

                <TextInput
                    id="agency_company"
                    name="agency_company"
                    label="Agency / company name"
                    required
                    value={formData.agency_company}
                    onChange={handleChange}
                    error={errors.agency_company}
                    placeholder="e.g. Lotus Travel Co."
                    autoComplete="organization"
                />
                <TextInput
                    id="agency_country"
                    name="agency_country"
                    label="Country"
                    required
                    value={formData.agency_country}
                    onChange={handleChange}
                    error={errors.agency_country}
                    placeholder="e.g. United Kingdom"
                    autoComplete="country-name"
                />
                <TextInput
                    id="contact_name"
                    name="contact_name"
                    label="Contact name"
                    required
                    value={formData.contact_name}
                    onChange={handleChange}
                    error={errors.contact_name}
                    placeholder="e.g. Sarah Whitfield"
                    autoComplete="name"
                />
                <TextInput
                    id="contact_email"
                    name="contact_email"
                    label="Email address"
                    type="email"
                    required
                    value={formData.contact_email}
                    onChange={handleChange}
                    error={errors.contact_email}
                    placeholder="you@agency.com"
                    autoComplete="email"
                />
                <TextInput
                    id="contact_phone"
                    name="contact_phone"
                    label="Phone / WhatsApp"
                    value={formData.contact_phone}
                    onChange={handleChange}
                    error={errors.contact_phone}
                    placeholder="+44 ... or +1 ..."
                    autoComplete="tel"
                />
                <TextInput
                    id="agency_website"
                    name="agency_website"
                    label="Website"
                    value={formData.agency_website}
                    onChange={handleChange}
                    error={errors.agency_website}
                    placeholder="https://agency.com"
                    autoComplete="url"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <SectionTitle index={2}>Trip details</SectionTitle>
                <SelectInput
                    id="trip_type"
                    name="trip_type"
                    label="Trip type"
                    required
                    value={formData.trip_type}
                    onChange={handleChange}
                    error={errors.trip_type}
                >
                    <option value="" disabled>Select trip type</option>
                    {TRIP_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                </SelectInput>
                <TextInput
                    id="destination"
                    name="destination"
                    label="Destination"
                    value={formData.destination}
                    onChange={handleChange}
                    error={errors.destination}
                    placeholder="e.g. India / Vietnam / Japan / South Korea"
                />
                <TextInput
                    id="travel_dates_start"
                    name="travel_dates_start"
                    label="Start date (approx.)"
                    type="date"
                    value={formData.travel_dates_start}
                    onChange={handleChange}
                    error={errors.travel_dates_start}
                />
                <TextInput
                    id="travel_dates_end"
                    name="travel_dates_end"
                    label="End date (approx.)"
                    type="date"
                    value={formData.travel_dates_end}
                    onChange={handleChange}
                    error={errors.travel_dates_end}
                />
                <TextInput
                    id="duration_days"
                    name="duration_days"
                    label="Duration (days)"
                    type="number"
                    min="1"
                    value={formData.duration_days}
                    onChange={handleChange}
                    error={errors.duration_days}
                    placeholder="e.g. 10"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <SectionTitle index={3}>Travellers</SectionTitle>
                <TextInput
                    id="adults"
                    name="adults"
                    label="Adults"
                    type="number"
                    min="1"
                    value={formData.adults}
                    onChange={handleChange}
                    error={errors.adults}
                />
                <TextInput
                    id="children"
                    name="children"
                    label="Children"
                    type="number"
                    min="0"
                    value={formData.children}
                    onChange={handleChange}
                    error={errors.children}
                />
                <TextInput
                    id="rooms"
                    name="rooms"
                    label="Rooms"
                    type="number"
                    min="1"
                    value={formData.rooms}
                    onChange={handleChange}
                    error={errors.rooms}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <SectionTitle index={4}>Hotels</SectionTitle>
                <SelectInput
                    id="hotel_category"
                    name="hotel_category"
                    label="Preferred category"
                    value={formData.hotel_category}
                    onChange={handleChange}
                    error={errors.hotel_category}
                >
                    <option value="">Select category (optional)</option>
                    {HOTEL_CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                </SelectInput>
                <TextInput
                    id="rooming_notes"
                    name="rooming_notes"
                    label="Rooming notes"
                    value={formData.rooming_notes}
                    onChange={handleChange}
                    error={errors.rooming_notes}
                    placeholder="e.g. 10 twins, ground-floor rooms for two seniors"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <SectionTitle index={5}>Transport</SectionTitle>
                <SelectInput
                    id="transport_type"
                    name="transport_type"
                    label="Transport type"
                    value={formData.transport_type}
                    onChange={handleChange}
                    error={errors.transport_type}
                >
                    <option value="">Select transport (optional)</option>
                    {TRANSPORT_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                </SelectInput>
                <TextInput
                    id="transport_notes"
                    name="transport_notes"
                    label="Transport notes"
                    value={formData.transport_notes}
                    onChange={handleChange}
                    error={errors.transport_notes}
                    placeholder="e.g. airport transfers + day touring"
                />
            </div>

            <div className="grid grid-cols-1 gap-5">
                <SectionTitle index={6}>Experiences &amp; interests</SectionTitle>
                <TextArea
                    id="experiences_interests"
                    name="experiences_interests"
                    label="Interests &amp; experiences you would like included"
                    value={formData.experiences_interests}
                    onChange={handleChange}
                    error={errors.experiences_interests}
                    placeholder="e.g. Culture & heritage, food tours, Halong Bay cruise, Kyoto tea ceremony, Jeju Island..."
                />
                <TextArea
                    id="must_see"
                    name="must_see"
                    label="Must-see highlights"
                    value={formData.must_see}
                    onChange={handleChange}
                    error={errors.must_see}
                    placeholder="Anything your clients specifically asked for"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <SectionTitle index={7}>Budget</SectionTitle>
                <SelectInput
                    id="budget_range"
                    name="budget_range"
                    label="Budget range (per person)"
                    value={formData.budget_range}
                    onChange={handleChange}
                    error={errors.budget_range}
                >
                    {BUDGET_RANGES.map((b) => (
                        <option key={b.value} value={b.value}>{b.label}</option>
                    ))}
                </SelectInput>
                <SelectInput
                    id="budget_currency"
                    name="budget_currency"
                    label="Currency"
                    value={formData.budget_currency}
                    onChange={handleChange}
                    error={errors.budget_currency}
                >
                    <option value="">Select currency (optional)</option>
                    {CURRENCIES.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                </SelectInput>
            </div>

            <div className="grid grid-cols-1 gap-5">
                <SectionTitle index={8}>Special needs</SectionTitle>
                <TextArea
                    id="special_requirements"
                    name="special_requirements"
                    label="Dietary, mobility, VIP or other requirements"
                    value={formData.special_requirements}
                    onChange={handleChange}
                    error={errors.special_requirements}
                    placeholder="e.g. halal dining, wheelchair access, VIP lounge needs"
                />
            </div>

            <div className="flex flex-col gap-4 pt-2">
                <CheckboxField
                    id="consent_given"
                    name="consent_given"
                    required
                    checked={formData.consent_given}
                    onChange={handleChange}
                    error={errors.consent_given}
                    label={
                        <>
                            I consent to Asian Star Travel using the details above to prepare and
                            respond to my request in accordance with the{' '}
                            <Link to="/privacy-policy" className="underline text-navy hover:text-bronze">
                                privacy policy
                            </Link>
                            .
                        </>
                    }
                />
                <SubmitButton submitting={isSubmitting}>
                    {isSubmitting ? 'Sending request…' : 'Request a Quote'}
                </SubmitButton>
                <p className="text-[11px] text-gray-400 text-center">
                    Responses usually arrive within one business day. No payment is taken at this stage.
                </p>
            </div>
        </form>
    );
};

export default RequestQuoteForm;
