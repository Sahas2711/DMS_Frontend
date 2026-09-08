import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../services/api/auth';
import { errorMessage } from '../../services/api/client';
import Seo from '../../components/Seo';
import { Button, Input, Notice, Spinner } from '../../components/admin/ui';

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') || '';

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        const next = {};
        if (password.length < 8) next.password = 'Use at least 8 characters.';
        if (confirm !== password) next.confirm = 'Passwords do not match.';
        if (Object.keys(next).length > 0) {
            setFieldErrors(next);
            return;
        }

        setSubmitting(true);
        try {
            await resetPassword({ token, new_password: password });
            setDone(true);
        } catch (err) {
            if (err.status === 400) {
                setError('This reset link is invalid or has expired. Please request a new one.');
            } else {
                setError(errorMessage(err, 'We could not reset your password. Please try again.'));
            }
            if (err.fieldErrors) setFieldErrors(err.fieldErrors);
        } finally {
            setSubmitting(false);
        }
    };

    const brand = (
        <Link to="/" className="block text-center mb-8">
            <span className="text-navy font-serif text-3xl font-bold">Asian Star Travel</span>
            <span className="block text-[10px] tracking-[0.25em] uppercase text-bronze mt-1.5">
                Admin Console
            </span>
        </Link>
    );

    if (done) {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {brand}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
                        <div>
                            <h1 className="text-navy text-2xl font-serif font-semibold">Password updated</h1>
                            <p className="text-steel text-sm mt-1 leading-relaxed">
                                Your password has been reset. You can now sign in with the new one.
                            </p>
                        </div>
                        <Notice tone="success">All signed out sessions stay ended until you sign in again.</Notice>
                        <Button
                            variant="primary"
                            className="w-full py-3"
                            onClick={() => (window.location.href = '/admin/login')}
                        >
                            Sign in
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (!token) {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {brand}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
                        <div>
                            <h1 className="text-navy text-2xl font-serif font-semibold">Invalid reset link</h1>
                            <p className="text-steel text-sm mt-1 leading-relaxed">
                                This link is missing its token. Please request a new one and open the
                                email again.
                            </p>
                        </div>
                        <Link
                            to="/forgot-password"
                            className="inline-flex items-center justify-center w-full py-3 text-xs font-bold tracking-wider uppercase px-4 rounded-full bg-[#731E2A] hover:bg-[#5C1822] text-white"
                        >
                            Request a new link
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory flex items-center justify-center px-6 py-12">
            <Seo title="Reset Password — Asian Star Travel" noIndex path="/reset-password" />
            <div className="w-full max-w-md">
                {brand}
                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5"
                >
                    <div>
                        <h1 className="text-navy text-2xl font-serif font-semibold">Choose a new password</h1>
                        <p className="text-steel text-sm mt-1 leading-relaxed">
                            Use at least 8 characters. This replaces your current password everywhere.
                        </p>
                    </div>

                    {error && <Notice tone="error">{error}</Notice>}

                    <Input
                        id="password"
                        label="New password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={fieldErrors.password}
                        hint="Minimum 8 characters."
                    />
                    <Input
                        id="confirm"
                        label="Confirm new password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        error={fieldErrors.confirm}
                    />
                    <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-[#731E2A] focus:ring-[#731E2A]"
                        />
                        Show password
                    </label>

                    <Button type="submit" className="w-full py-3" disabled={submitting}>
                        {submitting ? <Spinner label="Saving…" className="py-0" /> : 'Update password'}
                    </Button>

                    <p className="text-center text-sm">
                        Remembered it?{' '}
                        <Link to="/admin/login" className="text-[#731E2A] hover:underline">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;