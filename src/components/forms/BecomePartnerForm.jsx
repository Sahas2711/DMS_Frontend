/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEnquirySubmit } from '../../hooks/useEnquirySubmit';
import { submitPartnerEnquiry } from '../../services/api/enquiries';
import {
    validateEmail,
    validatePhoneOptional,
    validateRequired,
    validateWebsiteOptional,
} from '../../utils/validation';
import {
    CheckboxField,
    FormAlert,
    SubmitButton,
    TextArea,
    TextInput,
} from './FormFields';

const EMPTY = {
    company_name: '',
    contact_name: '',
    email: '',
    country: '',
    phone: '',
    website: '',
    business_description: '',
    consent_given: false,
};

export function validatePartnerForm(formData) {
    const errors = {};

    const companyError = validateRequired(formData.company_name, 'company name');
    if (companyError) errors.company_name = companyError;

    const contactError = validateRequired(formData.contact_name, 'contact name');
    if (contactError) errors.contact_name = contactError;

    const countryError = validateRequired(formData.country, 'country');
    if (countryError) errors.country = countryError;

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const phoneError = validatePhoneOptional(formData.phone);
    if (phoneError) errors.phone = phoneError;

    const websiteError = validateWebsiteOptional(formData.website);
    if (websiteError) errors.website = websiteError;

    if (!formData.consent_given) {
        errors.consent_given = 'Please accept the privacy notice so we can review your application.';
    }
    return errors;
}

const BecomePartnerForm = () => {
    const [formData, setFormData] = useState(EMPTY);
    const [clientErrors, setClientErrors] = useState({});
    const { status, message, referenceId, fieldErrors, handleSubmit } = useEnquirySubmit({
        submit: submitPartnerEnquiry,
    });

    const errors = { ...clientErrors, ...fieldErrors };
    const isSubmitting = status === 'submitting';

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) {
            setClientErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validatePartnerForm(formData);
        setClientErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        await handleSubmit(formData);
    };

    const reset = () => {
        setFormData(EMPTY);
        setClientErrors({});
    };

    if (status === 'success') {
        return (
            <div role="status" className="p-6 md:p-10 bg-[#E8F5E9] border border-[#A5D6A7] rounded-2xl text-center">
                <h3 className="text-[#2E7D32] font-bold text-xl mb-3">
                    Thank you — your application has been received.
                </h3>
                <p className="text-sm text-gray-700 max-w-xl mx-auto mb-2 leading-relaxed">
                    Our partnerships team will review your application and contact you about next steps.
                </p>
                {referenceId && (
                    <p className="text-xs text-gray-600 mb-5">
                        Reference: <span className="font-mono font-semibold">{referenceId}</span>
                    </p>
                )}
                <button
                    type="button"
                    onClick={reset}
                    className="mt-2 bg-[#731E2A] hover:bg-[#5C1822] text-white font-bold py-3 px-6 rounded-lg text-xs tracking-wider uppercase transition-colors"
                >
                    Submit another application
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5" data-testid="partner-form">
            {status === 'error' && (
                <FormAlert tone="error">
                    <span className="font-semibold block mb-1">We could not submit your application.</span>
                    {message} Your details have been kept — please try again.
                </FormAlert>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <TextInput
                    id="partner-company"
                    name="company_name"
                    label="Company name"
                    required
                    value={formData.company_name}
                    onChange={handleChange}
                    error={errors.company_name}
                    placeholder="e.g. Wanderlust Voyages"
                    autoComplete="organization"
                />
                <TextInput
                    id="partner-contact"
                    name="contact_name"
                    label="Contact name"
                    required
                    value={formData.contact_name}
                    onChange={handleChange}
                    error={errors.contact_name}
                    placeholder="e.g. Priya Sharma"
                    autoComplete="name"
                />
                <TextInput
                    id="partner-email"
                    name="email"
                    label="Email address"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="you@agency.com"
                    autoComplete="email"
                />
                <TextInput
                    id="partner-country"
                    name="country"
                    label="Country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    error={errors.country}
                    placeholder="e.g. India, Japan, etc."
                    autoComplete="country-name"
                />
                <TextInput
                    id="partner-phone"
                    name="phone"
                    label="Phone / WhatsApp"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="Optional"
                    autoComplete="tel"
                />
                <TextInput
                    id="partner-website"
                    name="website"
                    label="Website"
                    value={formData.website}
                    onChange={handleChange}
                    error={errors.website}
                    placeholder="https://agency.com"
                    autoComplete="url"
                />
            </div>

            <TextArea
                id="partner-description"
                name="business_description"
                label="About your business"
                rows={5}
                value={formData.business_description}
                onChange={handleChange}
                error={errors.business_description}
                placeholder="Tell us about your agency or operator — markets you serve, segments you sell (FIT, groups, MICE...)."
            />

            <CheckboxField
                id="partner-consent"
                name="consent_given"
                required
                checked={formData.consent_given}
                onChange={handleChange}
                error={errors.consent_given}
                label={
                    <>
                        I consent to Asian Star Travel storing and processing these details to review
                        my partnership application in accordance with the{' '}
                        <Link to="/privacy-policy" className="underline text-navy hover:text-bronze">
                            privacy policy
                        </Link>
                        .
                    </>
                }
            />

            <SubmitButton submitting={isSubmitting}>
                {isSubmitting ? 'Submitting application…' : 'Become a Partner'}
            </SubmitButton>
        </form>
    );
};

export default BecomePartnerForm;
