/* eslint-disable react-refresh/only-export-components */
/**
 * Accessible form field primitives shared by the enquiry forms. The visual
 * styling mirrors the design tokens used across the site (rounded inputs,
 * bronze focus rings, small uppercase labels, navy/steel text).
 */

const INPUT_CLASSES =
    'w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-bronze transition';
const INVALID_CLASSES =
    'border-red-400 focus:ring-red-300 bg-red-50/40';

export function fieldClasses({ invalid = false, select = false } = {}) {
    return [
        INPUT_CLASSES,
        select ? 'appearance-none cursor-pointer pr-9' : '',
        invalid ? INVALID_CLASSES : '',
    ]
        .filter(Boolean)
        .join(' ');
}

export function FieldError({ id, children }) {
    if (!children) return null;
    return (
        <p id={id} role="alert" className="mt-1.5 text-xs text-red-600 flex items-start gap-1">
            <span aria-hidden="true">⚠</span>
            <span>{children}</span>
        </p>
    );
}

export function Label({ htmlFor, children, required = false }) {
    return (
        <label htmlFor={htmlFor} className="text-[11px] font-semibold text-navy block mb-1.5">
            {children}
            {required && <span className="text-red-500" aria-hidden="true"> *</span>}
            {required && <span className="sr-only">(required)</span>}
        </label>
    );
}

export function TextInput({
    id,
    name,
    label,
    error,
    required = false,
    hint,
    invalid,
    className = '',
    ...rest
}) {
    const hasError = Boolean(error) || invalid;
    const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;
    return (
        <div className={className}>
            <Label htmlFor={id} required={required}>{label}</Label>
            <input
                id={id}
                name={name}
                aria-invalid={hasError || undefined}
                aria-describedby={describedBy}
                className={fieldClasses({ invalid: hasError })}
                {...rest}
            />
            {hint && !error && <p id={`${id}-hint`} className="mt-1 text-[11px] text-gray-400">{hint}</p>}
            <FieldError id={`${id}-error`}>{error}</FieldError>
        </div>
    );
}

export function SelectInput({
    id,
    name,
    label,
    error,
    required = false,
    hint,
    children,
    className = '',
    ...rest
}) {
    const hasError = Boolean(error);
    const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;
    return (
        <div className={className}>
            <Label htmlFor={id} required={required}>{label}</Label>
            <div className="relative">
                <select
                    id={id}
                    name={name}
                    aria-invalid={hasError || undefined}
                    aria-describedby={describedBy}
                    className={fieldClasses({ invalid: hasError, select: true })}
                    {...rest}
                >
                    {children}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400" aria-hidden="true">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </span>
            </div>
            {hint && !error && <p id={`${id}-hint`} className="mt-1 text-[11px] text-gray-400">{hint}</p>}
            <FieldError id={`${id}-error`}>{error}</FieldError>
        </div>
    );
}

export function TextArea({
    id,
    name,
    label,
    error,
    required = false,
    hint,
    rows = 4,
    className = '',
    ...rest
}) {
    const hasError = Boolean(error);
    const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;
    return (
        <div className={className}>
            <Label htmlFor={id} required={required}>{label}</Label>
            <textarea
                id={id}
                name={name}
                rows={rows}
                aria-invalid={hasError || undefined}
                aria-describedby={describedBy}
                className={`${fieldClasses({ invalid: hasError })} resize-none`}
                {...rest}
            />
            {hint && !error && <p id={`${id}-hint`} className="mt-1 text-[11px] text-gray-400">{hint}</p>}
            <FieldError id={`${id}-error`}>{error}</FieldError>
        </div>
    );
}

export function CheckboxField({
    id,
    name,
    label,
    error,
    checked,
    onChange,
    required = false,
    className = '',
}) {
    return (
        <div className={className}>
            <div className="flex items-start gap-3">
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    checked={Boolean(checked)}
                    onChange={onChange}
                    required={required}
                    aria-invalid={Boolean(error) || undefined}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#731E2A] focus:ring-[#731E2A] shrink-0"
                />
                <label htmlFor={id} className="text-xs text-gray-500 leading-relaxed cursor-pointer select-none">
                    {label}
                </label>
            </div>
            <FieldError id={`${id}-error`}>{error}</FieldError>
        </div>
    );
}

export function SubmitButton({ children, submitting = false, disabled = false, className = '' }) {
    return (
        <button
            type="submit"
            disabled={submitting || disabled}
            className={`bg-[#731E2A] hover:bg-[#5C1822] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow-md ${className}`}
        >
            {submitting && (
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
            )}
            <span>{children}</span>
        </button>
    );
}

export function FormAlert({ tone = 'error', children }) {
    const tones = {
        error: 'bg-red-50 border-red-200 text-red-800',
        success: 'bg-[#E8F5E9] border-[#A5D6A7] text-[#2E7D32]',
        info: 'bg-blue-50 border-blue-200 text-blue-800',
    };
    return (
        <div role={tone === 'error' ? 'alert' : 'status'} className={`p-4 rounded-xl border text-sm leading-relaxed ${tones[tone]}`}>
            {children}
        </div>
    );
}
