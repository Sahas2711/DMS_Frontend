import { useCallback, useRef, useState } from 'react';
import { ApiError, errorMessage } from '../services/api/client';

/**
 * Drives the submission lifecycle shared by every enquiry form.
 *
 * state.status: idle | submitting | success | error
 *   - success is only ever reached when the server confirmed the submission.
 *   - 422 responses map their field errors onto form fields.
 *   - a ref guard prevents double submission while a request is in flight.
 */
export function useEnquirySubmit({ submit }) {
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const [referenceId, setReferenceId] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});
    const submittingRef = useRef(false);

    const handleSubmit = useCallback(
        async (payload) => {
            if (submittingRef.current) return false;
            submittingRef.current = true;
            setStatus('submitting');
            setMessage('');
            setFieldErrors({});
            try {
                const result = await submit(payload);
                setReferenceId(result?.public_id ?? null);
                setMessage(
                    result?.message || 'Thank you — your enquiry has been received.'
                );
                setStatus('success');
                return true;
            } catch (error) {
                if (error instanceof ApiError && error.fieldErrors) {
                    setFieldErrors(error.fieldErrors);
                }
                setMessage(errorMessage(error));
                setStatus('error');
                return false;
            } finally {
                submittingRef.current = false;
            }
        },
        [submit]
    );

    return { status, message, referenceId, fieldErrors, handleSubmit };
}
