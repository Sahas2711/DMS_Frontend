import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleIcon from '../icons/GoogleIcon';
import StarIcon from '../icons/StarIcon';
import { SITE } from '../../config/site';
import {
    NOT_CONFIGURED_MESSAGE,
    requestPasswordReset,
    signInWithEmail,
    signInWithGoogle,
    signUpWithEmail,
} from '../../services/auth';
import {
    MIN_PASSWORD_LENGTH,
    passwordStrength,
    validateEmail,
    validateFullName,
    validatePassword,
    validateTerms,
} from '../../utils/validation';

const EMPTY_FORM = { fullName: '', email: '', password: '', acceptTerms: false };

const EyeIcon = ({ open }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.6}
        stroke="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
    >
        {open ? (
            <>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243" />
            </>
        ) : (
            <>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </>
        )}
    </svg>
);

const Spinner = () => (
    <span
        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
        aria-hidden="true"
    />
);

const AuthModal = ({ open, onClose, initialMode = 'signin' }) => {
    const dialogRef = useRef(null);
    const firstFieldRef = useRef(null);
    const fieldId = useId();

    const [mode, setMode] = useState(initialMode);
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [pending, setPending] = useState(null); // 'email' | 'google' | 'reset'
    const [formError, setFormError] = useState('');
    const [notice, setNotice] = useState('');

    const isSignup = mode === 'signup';
    const strength = passwordStrength(form.password);

    const resetState = useCallback(() => {
        setForm(EMPTY_FORM);
        setErrors({});
        setTouched({});
        setShowPassword(false);
        setPending(null);
        setFormError('');
        setNotice('');
    }, []);

    // Drive the native <dialog>. showModal() gives us a real focus trap, an
    // inert background and Escape handling from the platform rather than a
    // hand-rolled version that inevitably misses a case.
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open && !dialog.open) {
            dialog.showModal();
            setMode(initialMode);
            resetState();
            // Focus the first field rather than letting focus land on the close button
            requestAnimationFrame(() => firstFieldRef.current?.focus());
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open, initialMode, resetState]);

    // Escape needs to tell the parent so its state matches the dialog. The
    // browser's own `cancel` event covers this, but we also listen for the key
    // directly: `cancel` is user-agent driven and does not fire for
    // programmatically dispatched key events, which makes the close path
    // untestable and leaves us relying on UA behaviour we cannot verify.
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const handleCancel = (e) => {
            e.preventDefault();
            onClose();
        };
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
        };

        dialog.addEventListener('cancel', handleCancel);
        dialog.addEventListener('keydown', handleKeyDown);
        return () => {
            dialog.removeEventListener('cancel', handleCancel);
            dialog.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    // Lock background scrolling while the dialog is up
    useEffect(() => {
        if (!open) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previous;
        };
    }, [open]);

    const validateField = (name, value, nextForm = form) => {
        switch (name) {
            case 'fullName':
                return isSignup ? validateFullName(value) : null;
            case 'email':
                return validateEmail(value);
            case 'password':
                return validatePassword(value, { isNew: isSignup });
            case 'acceptTerms':
                return isSignup ? validateTerms(value) : null;
            default:
                void nextForm;
                return null;
        }
    };

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        const nextValue = type === 'checkbox' ? checked : value;
        setForm((prev) => ({ ...prev, [name]: nextValue }));
        setFormError('');

        // Only re-validate live once the field has been visited, so the form
        // does not shout at someone still typing their first character.
        if (touched[name]) {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, nextValue) }));
        }
    };

    const handleBlur = (e) => {
        const { name, type, value, checked } = e.target;
        const nextValue = type === 'checkbox' ? checked : value;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, nextValue) }));
    };

    const runValidation = () => {
        const nextErrors = {
            fullName: validateField('fullName', form.fullName),
            email: validateField('email', form.email),
            password: validateField('password', form.password),
            acceptTerms: validateField('acceptTerms', form.acceptTerms),
        };
        setErrors(nextErrors);
        setTouched({ fullName: true, email: true, password: true, acceptTerms: true });
        return Object.values(nextErrors).every((v) => !v);
    };

    const describe = (name) => (errors[name] && touched[name] ? `${fieldId}-${name}-error` : undefined);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setNotice('');
        if (!runValidation()) return;

        setPending('email');
        try {
            if (isSignup) {
                await signUpWithEmail({
                    fullName: form.fullName.trim(),
                    email: form.email.trim(),
                    password: form.password,
                });
            } else {
                await signInWithEmail({ email: form.email.trim(), password: form.password });
            }
            onClose();
        } catch (err) {
            setFormError(err?.isNotConfigured ? NOT_CONFIGURED_MESSAGE : err.message);
        } finally {
            setPending(null);
        }
    };

    const handleGoogle = async () => {
        setFormError('');
        setNotice('');
        setPending('google');
        try {
            await signInWithGoogle();
            onClose();
        } catch (err) {
            setFormError(err?.isNotConfigured ? NOT_CONFIGURED_MESSAGE : err.message);
        } finally {
            setPending(null);
        }
    };

    const handleForgotPassword = async () => {
        setNotice('');
        const emailError = validateEmail(form.email);
        if (emailError) {
            setTouched((prev) => ({ ...prev, email: true }));
            setErrors((prev) => ({ ...prev, email: emailError }));
            setFormError('Enter your email address first and we will send a reset link.');
            return;
        }

        setFormError('');
        setPending('reset');
        try {
            await requestPasswordReset({ email: form.email.trim() });
            setNotice('If that address has an account, a reset link is on its way.');
        } catch (err) {
            setFormError(err?.isNotConfigured ? NOT_CONFIGURED_MESSAGE : err.message);
        } finally {
            setPending(null);
        }
    };

    const switchMode = () => {
        setMode(isSignup ? 'signin' : 'signup');
        setErrors({});
        setTouched({});
        setFormError('');
        setNotice('');
    };

    const busy = pending !== null;

    const fieldClass = (name) =>
        `w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-gold/60 ${
            errors[name] && touched[name]
                ? 'border-red-400 focus:border-red-400'
                : 'border-gray-200 focus:border-gold'
        }`;

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={`${fieldId}-title`}
            // Clicking the backdrop (the dialog element itself, outside the panel) closes
            onClick={(e) => {
                if (e.target === dialogRef.current) onClose();
            }}
            className="auth-dialog m-auto w-[calc(100vw-2rem)] max-w-md rounded-2xl border border-gray-100 bg-white p-0 shadow-2xl backdrop:bg-navy/70 backdrop:backdrop-blur-sm"
        >
            <div className="relative max-h-[85vh] overflow-y-auto px-6 py-8 sm:px-8">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-navy focus:outline-none focus:ring-2 focus:ring-gold"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="mb-7 text-center">
                    <StarIcon className="mx-auto mb-3 h-7 w-7 text-gold" />
                    <h2 id={`${fieldId}-title`} className="font-serif text-2xl text-navy">
                        {isSignup ? 'Create your account' : 'Welcome back'}
                    </h2>
                    <p className="mt-2 text-sm text-steel">
                        {isSignup
                            ? `Save itineraries and track your journeys with ${SITE.name}.`
                            : 'Sign in to pick up where you left off.'}
                    </p>
                </div>

                {/* Google — must go through the provider's own OAuth flow */}
                <button
                    type="button"
                    onClick={handleGoogle}
                    disabled={busy}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {pending === 'google' ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-navy" aria-hidden="true" />
                    ) : (
                        <GoogleIcon />
                    )}
                    <span>Continue with Google</span>
                </button>

                <div className="my-6 flex items-center gap-4" aria-hidden="true">
                    <span className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-400">or</span>
                    <span className="h-px flex-1 bg-gray-200" />
                </div>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    {isSignup && (
                        <div>
                            <label htmlFor={`${fieldId}-fullName`} className="mb-1.5 block text-xs font-semibold text-navy">
                                Full name
                            </label>
                            <input
                                ref={isSignup ? firstFieldRef : null}
                                id={`${fieldId}-fullName`}
                                name="fullName"
                                type="text"
                                autoComplete="name"
                                value={form.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={Boolean(errors.fullName && touched.fullName)}
                                aria-describedby={describe('fullName')}
                                placeholder="Your name"
                                className={fieldClass('fullName')}
                            />
                            {errors.fullName && touched.fullName && (
                                <p id={`${fieldId}-fullName-error`} className="mt-1.5 text-xs text-red-600">
                                    {errors.fullName}
                                </p>
                            )}
                        </div>
                    )}

                    <div>
                        <label htmlFor={`${fieldId}-email`} className="mb-1.5 block text-xs font-semibold text-navy">
                            Email address
                        </label>
                        <input
                            ref={isSignup ? null : firstFieldRef}
                            id={`${fieldId}-email`}
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={Boolean(errors.email && touched.email)}
                            aria-describedby={describe('email')}
                            placeholder="you@example.com"
                            className={fieldClass('email')}
                        />
                        {errors.email && touched.email && (
                            <p id={`${fieldId}-email-error`} className="mt-1.5 text-xs text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <div className="mb-1.5 flex items-baseline justify-between">
                            <label htmlFor={`${fieldId}-password`} className="block text-xs font-semibold text-navy">
                                Password
                            </label>
                            {!isSignup && (
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    disabled={busy}
                                    className="text-xs font-medium text-bronze underline-offset-2 transition hover:text-navy hover:underline focus:outline-none focus:ring-2 focus:ring-gold rounded disabled:opacity-60"
                                >
                                    Forgot password?
                                </button>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                id={`${fieldId}-password`}
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete={isSignup ? 'new-password' : 'current-password'}
                                value={form.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                aria-invalid={Boolean(errors.password && touched.password)}
                                aria-describedby={
                                    [describe('password'), isSignup ? `${fieldId}-password-hint` : null]
                                        .filter(Boolean)
                                        .join(' ') || undefined
                                }
                                placeholder={isSignup ? `At least ${MIN_PASSWORD_LENGTH} characters` : 'Your password'}
                                className={`${fieldClass('password')} pr-12`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                aria-pressed={showPassword}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-400 transition hover:text-navy focus:outline-none focus:ring-2 focus:ring-gold"
                            >
                                <EyeIcon open={showPassword} />
                            </button>
                        </div>

                        {isSignup && form.password && (
                            <div id={`${fieldId}-password-hint`} className="mt-2 flex items-center gap-2">
                                <span className="flex h-1 flex-1 gap-1" aria-hidden="true">
                                    {[1, 2, 3].map((step) => (
                                        <span
                                            key={step}
                                            className={`h-full flex-1 rounded-full ${
                                                step <= strength.score ? strength.tone.split(' ')[0] : 'bg-gray-200'
                                            }`}
                                        />
                                    ))}
                                </span>
                                <span className={`text-[11px] font-semibold ${strength.tone.split(' ')[1]}`}>
                                    {strength.label}
                                </span>
                            </div>
                        )}

                        {errors.password && touched.password && (
                            <p id={`${fieldId}-password-error`} className="mt-1.5 text-xs text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {isSignup && (
                        <div>
                            <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-steel">
                                <input
                                    name="acceptTerms"
                                    type="checkbox"
                                    checked={form.acceptTerms}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-invalid={Boolean(errors.acceptTerms && touched.acceptTerms)}
                                    aria-describedby={describe('acceptTerms')}
                                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 text-navy focus:ring-2 focus:ring-gold"
                                />
                                <span>
                                    I agree to the{' '}
                                    <Link to="/privacy-policy" onClick={onClose} className="font-medium text-bronze underline underline-offset-2 hover:text-navy">
                                        privacy policy
                                    </Link>
                                    .
                                </span>
                            </label>
                            {errors.acceptTerms && touched.acceptTerms && (
                                <p id={`${fieldId}-acceptTerms-error`} className="mt-1.5 text-xs text-red-600">
                                    {errors.acceptTerms}
                                </p>
                            )}
                        </div>
                    )}

                    {formError && (
                        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-700">
                            {formError}
                        </p>
                    )}
                    {notice && (
                        <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs leading-relaxed text-emerald-800">
                            {notice}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={busy}
                        aria-busy={pending === 'email'}
                        className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {pending === 'email' && <Spinner />}
                        <span>{isSignup ? 'Create account' : 'Sign in'}</span>
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-steel">
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        type="button"
                        onClick={switchMode}
                        className="rounded font-semibold text-navy underline underline-offset-2 transition hover:text-bronze focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                        {isSignup ? 'Sign in' : 'Create one'}
                    </button>
                </p>
            </div>
        </dialog>
    );
};

export default AuthModal;
