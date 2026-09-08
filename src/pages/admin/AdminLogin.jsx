import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AdminAuthContext';
import { errorMessage } from '../../services/api/client';
import Seo from '../../components/Seo';
import { Button, Input, Notice } from '../../components/admin/ui';

function AdminLogin() {
    const { login, user, ready } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/admin/dashboard';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [sessionNotice] = useState(location.state?.reason || '');

    if (ready && user) {
        return <Navigate to={from} replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        if (!email.trim()) {
            setFieldErrors((f) => ({ ...f, email: 'Enter your email address.' }));
        }
        if (!password) {
            setFieldErrors((f) => ({ ...f, password: 'Enter your password.' }));
        }
        if (!email.trim() || !password) return;

        setSubmitting(true);
        try {
            await login({ email: email.trim(), password });
            navigate(from, { replace: true });
        } catch (err) {
            setError(errorMessage(err, 'Sign-in failed. Please try again.'));
            if (err.fieldErrors) setFieldErrors(err.fieldErrors);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-ivory flex items-center justify-center px-6 py-12">
            <Seo title="Admin Login — Asian Star Travel" noIndex path="/admin/login" />
            <div className="w-full max-w-md">
                <Link to="/" className="block text-center mb-8">
                    <span className="text-navy font-serif text-3xl font-bold">Asian Star Travel</span>
                    <span className="block text-[10px] tracking-[0.25em] uppercase text-bronze mt-1.5">
                        Admin Console
                    </span>
                </Link>

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5"
                >
                    <div>
                        <h1 className="text-navy text-2xl font-serif font-semibold">Sign in</h1>
                        <p className="text-steel text-sm mt-1">
                            Access to the back office is restricted to authorised staff.
                        </p>
                    </div>

                    {sessionNotice && <Notice tone="info">{sessionNotice}</Notice>}
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
                    <Input
                        id="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={fieldErrors.password}
                        hint="Your password is used once to obtain a session token."
                    />
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-[#731E2A] focus:ring-[#731E2A]"
                            />
                            Show password
                        </label>
                    </div>

                    <Button type="submit" size="lg" className="w-full" loading={submitting}>
                        {submitting ? 'Signing in' : 'Sign in'}
                    </Button>
                </form>

                <div className="flex items-center justify-between gap-4 mt-6">
                    <p className="text-center text-xs text-gray-400 flex-1">
                        Forgot your password?{' '}
                        <Link to="/forgot-password" className="text-[#731E2A] hover:underline">
                            Reset it here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;