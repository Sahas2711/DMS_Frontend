import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services/api/auth';
import { errorMessage } from '../../services/api/client';
import Seo from '../../components/Seo';
import { Button, Input, Notice, Spinner } from '../../components/admin/ui';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        if (!email.trim()) {
            setFieldErrors((f) => ({ ...f, email: 'Enter your email address.' }));
        }
        if (!email.trim()) return;

        setSubmitting(true);
        try {
            await forgotPassword({ email: email.trim() });
            setSent(true);
        } catch (err) {
            setError(errorMessage(err, 'We could not send the reset email. Please try again.'));
            if (err.fieldErrors) setFieldErrors(err.fieldErrors);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-ivory flex items-center justify-center px-6 py-12">
            <Seo title="Forgot Password — Asian Star Travel" noIndex path="/forgot-password" />
            <div className="w-full max-w-md">
                <Link to="/" className="block text-center mb-8">
                    <span className="text-navy font-serif text-3xl font-bold">Asian Star Travel</span>
                    <span className="block text-[10px] tracking-[0.25em] uppercase text-bronze mt-1.5">
                        Admin Console
                    </span>
                </Link>

                {sent ? (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
                        <div>
                            <h1 className="text-navy text-2xl font-serif font-semibold">Check your email</h1>
                            <p className="text-steel text-sm mt-1 leading-relaxed">
                                If an account exists for <strong>{email.trim()}</strong>, a password
                                reset link is on its way. The link expires after a short time.
                            </p>
                        </div>
                        <Notice tone="success">
                            You can close this tab now — follow the link in the email to choose a
                            new password.
                        </Notice>
                        <div className="pt-1 space-y-4">
                            <Button
                                variant="outline"
                                className="w-full py-3"
                                onClick={() => {
                                    setSent(false);
                                    setError('');
                                }}
                            >
                                Request another link
                            </Button>
                            <p className="text-center text-sm">
                                <Link to="/admin/login" className="text-[#731E2A] hover:underline">
                                    Return to sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5"
                    >
                        <div>
                            <h1 className="text-navy text-2xl font-serif font-semibold">Forgot your password?</h1>
                            <p className="text-steel text-sm mt-1 leading-relaxed">
                                Enter the email you use to sign in and we will send a link to reset
                                your password.
                            </p>
                        </div>

                        {error && <Notice tone="error">{error}</Notice>}

                        <Input
                            id="email"
                            label="Email address"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={fieldErrors.email}
                            placeholder="you@asianstartravels.com"
                        />

                        <Button type="submit" className="w-full py-3" disabled={submitting}>
                            {submitting ? <Spinner label="Sending link…" className="py-0" /> : 'Send reset link'}
                        </Button>

                        <p className="text-center text-sm">
                            Remembered it?{' '}
                            <Link to="/admin/login" className="text-[#731E2A] hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;