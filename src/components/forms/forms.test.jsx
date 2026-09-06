import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ContactForm, { validateContactForm } from './ContactForm';
import BecomePartnerForm, { validatePartnerForm } from './BecomePartnerForm';
import RequestQuoteForm, { validateQuoteForm } from './RequestQuoteForm';
import * as enquiries from '../../services/api/enquiries';
import * as client from '../../services/api/client';

beforeEach(() => {
    vi.restoreAllMocks();
});

const renderWithRouter = (ui) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

describe('validateContactForm', () => {
    it('flags missing required fields', () => {
        const errors = validateContactForm({
            name: '',
            email: '',
            message: '',
            phone: '',
            consent_given: false,
        });
        expect(errors.name).toBeTruthy();
        expect(errors.email).toBeTruthy();
        expect(errors.message).toBeTruthy();
        expect(errors.consent_given).toBeTruthy();
    });

    it('requires a message of at least 10 characters', () => {
        const errors = validateContactForm({
            name: 'Jane Doe',
            email: 'jane@x.com',
            message: 'too short',
            phone: '',
            consent_given: true,
        });
        expect(errors.message).toMatch(/more detail/i);
    });

    it('rejects malformed email', () => {
        const errors = validateContactForm({
            name: 'Jane Doe',
            email: 'not-an-email',
            message: 'A message that is long enough to pass',
            phone: '',
            consent_given: true,
        });
        expect(errors.email).toMatch(/valid email/i);
    });
});

describe('validatePartnerForm', () => {
    it('flags missing required fields', () => {
        const errors = validatePartnerForm({
            company_name: '',
            contact_name: '',
            email: '',
            country: '',
            consent_given: false,
        });
        expect(errors.company_name).toBeTruthy();
        expect(errors.contact_name).toBeTruthy();
        expect(errors.email).toBeTruthy();
        expect(errors.country).toBeTruthy();
        expect(errors.consent_given).toBeTruthy();
    });

    it('passes a fully valid form', () => {
        const errors = validatePartnerForm({
            company_name: 'Wanderlust',
            contact_name: 'Priya',
            email: 'priya@x.com',
            country: 'Australia',
            consent_given: true,
        });
        expect(errors).toEqual({});
    });
});

describe('validateQuoteForm', () => {
    it('flags missing required fields', () => {
        const errors = validateQuoteForm({
            agency_company: '',
            agency_country: '',
            contact_name: '',
            contact_email: '',
            trip_type: '',
            consent_given: false,
        });
        expect(errors.agency_company).toBeTruthy();
        expect(errors.agency_country).toBeTruthy();
        expect(errors.contact_name).toBeTruthy();
        expect(errors.trip_type).toBeTruthy();
        expect(errors.consent_given).toBeTruthy();
    });

    it('validates consent and email on a quote form', () => {
        const errors = validateQuoteForm({
            agency_company: 'Lotus',
            agency_country: 'UK',
            contact_name: 'Sarah',
            contact_email: 'bad',
            trip_type: 'GROUP',
            consent_given: false,
        });
        expect(errors.contact_email).toMatch(/valid email/i);
        expect(errors.consent_given).toBeTruthy();
    });

    it('rejects an end date before the start date', () => {
        const errors = validateQuoteForm({
            agency_company: 'Lotus',
            agency_country: 'UK',
            contact_name: 'Sarah',
            contact_email: 'sarah@x.com',
            trip_type: 'GROUP',
            consent_given: true,
            travel_dates_start: '2026-03-10',
            travel_dates_end: '2026-03-01',
        });
        expect(errors.travel_dates_end).toMatch(/on or after/i);
    });
});

describe('ContactForm submission lifecycle', () => {
    it('calls the API on a valid submission and shows success with reference', async () => {
        const user = userEvent.setup();
        const submitSpy = vi
            .spyOn(enquiries, 'submitContactEnquiry')
            .mockResolvedValue({ public_id: 'CON-123', message: 'Received' });

        renderWithRouter(<ContactForm />);

        await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
        await user.type(screen.getByLabelText(/email address/i), 'jane@x.com');
        await user.type(screen.getByLabelText(/^message/i), 'A longer message that passes validation.');
        await user.click(screen.getByLabelText(/privacy policy/i));
        await user.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(submitSpy).toHaveBeenCalledTimes(1);
        });
        expect(await screen.findByRole('heading', { name: /message has been received/i })).toBeInTheDocument();
        expect(screen.getByText(/CON-123/i)).toBeInTheDocument();
    });

    it('does not call the API and blocks submission with empty invalid fields', async () => {
        const user = userEvent.setup();
        const submitSpy = vi.spyOn(enquiries, 'submitContactEnquiry');

        renderWithRouter(<ContactForm />);
        await user.click(screen.getByRole('button', { name: /send message/i }));

        expect(submitSpy).not.toHaveBeenCalled();
        expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
    });

    it('surfaces an API error message without a success state', async () => {
        const user = userEvent.setup();
        const apiError = new client.ApiError('Server unavailable', { status: 500 });
        vi.spyOn(enquiries, 'submitContactEnquiry').mockRejectedValue(apiError);

        renderWithRouter(<ContactForm />);
        await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
        await user.type(screen.getByLabelText(/email address/i), 'jane@x.com');
        await user.type(screen.getByLabelText(/^message/i), 'A longer message that passes validation.');
        await user.click(screen.getByLabelText(/privacy policy/i));
        await user.click(screen.getByRole('button', { name: /send message/i }));

        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent(/server unavailable/i);
        });
        expect(screen.queryByRole('heading', { name: /message has been received/i })).not.toBeInTheDocument();
    });
});

describe('BecomePartnerForm submission', () => {
    it('calls the API on a valid submission and shows the success state', async () => {
        const user = userEvent.setup();
        const submitSpy = vi
            .spyOn(enquiries, 'submitPartnerEnquiry')
            .mockResolvedValue({ public_id: 'PART-9' });

        renderWithRouter(<BecomePartnerForm />);
        await user.type(screen.getByLabelText(/company name/i), 'Wanderlust Voyages');
        await user.type(screen.getByLabelText(/contact name/i), 'Priya Sharma');
        await user.type(screen.getByLabelText(/email address/i), 'priya@x.com');
        await user.type(screen.getByLabelText(/^country/i), 'Australia');
        await user.click(screen.getByLabelText(/partnership application/i));
        await user.click(screen.getByRole('button', { name: /become a partner/i }));

        await waitFor(() => expect(submitSpy).toHaveBeenCalledTimes(1));
        expect(await screen.findByRole('heading', { name: /application has been received/i })).toBeInTheDocument();
    });
});

describe('RequestQuoteForm', () => {
    it('renders the quote form with required fields and does not submit when invalid', async () => {
        const user = userEvent.setup();
        const submitSpy = vi.spyOn(enquiries, 'submitRequestQuote');

        renderWithRouter(<RequestQuoteForm />);
        expect(screen.getByTestId('request-quote-form')).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: /request a quote/i }));

        expect(submitSpy).not.toHaveBeenCalled();
    });

    it('calls the API on a valid submission and shows success', async () => {
        const user = userEvent.setup();
        const submitSpy = vi
            .spyOn(enquiries, 'submitRequestQuote')
            .mockResolvedValue({ public_id: 'REQ-42' });

        renderWithRouter(<RequestQuoteForm />);
        await user.type(screen.getByLabelText(/agency \/ company name/i), 'Lotus Travel');
        await user.type(screen.getByLabelText(/^country/i), 'United Kingdom');
        await user.type(screen.getByLabelText(/contact name/i), 'Sarah Whitfield');
        await user.type(screen.getByLabelText(/email address/i), 'sarah@lotus.com');
        await user.selectOptions(screen.getByLabelText(/trip type/i), 'GROUP');
        await user.click(screen.getByLabelText(/consent to asian star travel/i));
        await user.click(screen.getByRole('button', { name: /request a quote/i }));

        await waitFor(() => expect(submitSpy).toHaveBeenCalledTimes(1));
        expect(await screen.findByRole('heading', { name: /quote request has been received/i })).toBeInTheDocument();
    });
});
