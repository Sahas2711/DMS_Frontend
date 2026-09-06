/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEnquirySubmit } from '../../hooks/useEnquirySubmit';
import { submitContactEnquiry } from '../../services/api/enquiries';
import { validateEmail, validatePhoneOptional, validateRequired } from '../../utils/validation';
import {
    CheckboxField,
    FormAlert,
    SubmitButton,
    TextArea,
    TextInput,
} from './FormFields';

const EMPTY = {
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    consent_given: false,
};

export function validateContactForm(formData) {
    const errors = {};

    const nameError = validateRequired(formData.name, 'name');
    if (nameError) errors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const messageText = String(formData.message ?? '').trim();
    if (!messageText) errors.message = 'Please write a short message so we can help you.';
    else if (messageText.length < 10) {
        errors.message = 'Please give us a little more detail (at least 10 characters).';
    }

    const phoneError = validatePhoneOptional(formData.phone);
    if (phoneError) errors.phone = phoneError;

    if (!formData.consent_given) {
        errors.consent_given = 'Please accept the privacy notice so we can reply to you.';
    }
    return errors;
}

const ContactForm = () => {
    const [formData, setFormData] = useState(EMPTY);
    const [clientErrors, setClientErrors] = useState({});
    const { status, message, referenceId, fieldErrors, handleSubmit } = useEnquirySubmit({
        submit: submitContactEnquiry,
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
        const validationErrors = validateContactForm(formData);
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
                    Thank you! Your message has been received.
                </h3>
                <p className="text-sm text-gray-700 max-w-xl mx-auto mb-2 leading-relaxed">
                    Our team will get back to you shortly.
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
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5" data-testid="contact-form">
            {status === 'error' && (
                <FormAlert tone="error">
                    <span className="font-semibold block mb-1">We could not send your message.</span>
                    {message} Your details have been kept — please try again.
                </FormAlert>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <TextInput
                    id="contact-name"
                    name="name"
                    label="Full name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="e.g. Eleanor Vance"
                    autoComplete="name"
                />
                <TextInput
                    id="contact-email"
                    name="email"
                    label="Email address"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="you@example.com"
                    autoComplete="email"
                />
                <TextInput
                    id="contact-company"
                    name="company"
                    label="Company / agency"
                    value={formData.company}
                    onChange={handleChange}
                    error={errors.company}
                    placeholder="Optional"
                    autoComplete="organization"
                />
                <TextInput
                    id="contact-phone"
                    name="phone"
                    label="Phone / WhatsApp"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="Optional"
                    autoComplete="tel"
                />
            </div>

            <TextInput
                id="contact-subject"
                name="subject"
                label="Subject"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                placeholder="e.g. Existing booking question"
            />

            <TextArea
                id="contact-message"
                name="message"
                label="Message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                placeholder="How can we help?"
            />

            <CheckboxField
                id="contact-consent"
                name="consent_given"
                required
                checked={formData.consent_given}
                onChange={handleChange}
                error={errors.consent_given}
                label={
                    <>
                        I agree that Asian Star Travel may use my details to respond to this inquiry in
                        accordance with the{' '}
                        <Link to="/privacy-policy" className="underline text-navy hover:text-bronze">
                            privacy policy
                        </Link>
                        .
                    </>
                }
            />

            <SubmitButton submitting={isSubmitting}>
                {isSubmitting ? 'Sending message…' : 'Send Message'}
            </SubmitButton>
        </form>
    );
};

export default ContactForm;
