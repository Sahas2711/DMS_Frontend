/* eslint-disable react-refresh/only-export-components */
/**
 * Shared admin UI primitives. Visual language is the site's design tokens
 * (navy / bronze / champagne), matched to the existing form-field primers so
 * the back-office feels like part of the same product, not a separate app.
 */

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Label, FieldError, fieldClasses } from '../forms/FormFields';

export { Label, FieldError, fieldClasses };

// ── Loading ──────────────────────────────────────────────────────────────

export function Spinner({ label = 'Loading…', className = '' }) {
    return (
        <div className={`flex items-center justify-center gap-3 py-12 ${className}`} role="status" aria-live="polite">
            <svg className="animate-spin h-6 w-6 text-bronze" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span className="text-sm text-steel">{label}</span>
        </div>
    );
}

export function SkeletonRows({ rows = 5, cols = 4 }) {
    return (
        <div className="animate-pulse space-y-3" aria-hidden="true">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4">
                    {Array.from({ length: cols }).map((_, j) => (
                        <div key={j} className="h-4 flex-1 bg-gray-200 rounded" />
                    ))}
                </div>
            ))}
        </div>
    );
}

// ── Buttons ──────────────────────────────────────────────────────────────
//
// The admin button system. All sizes guarantee *stable* dimensions so clicking
// or loading never shifts the layout: fixed min-heights, nowrap text, no
// border that appears/disappears, and explicit icon alignment.

const BTN_BASE =
    'inline-flex items-center justify-center whitespace-nowrap leading-none select-none font-bold tracking-wider uppercase rounded-full transition-colors cursor-pointer ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

const BTN_SIZES = {
    sm: 'min-h-8 px-3 gap-1.5 text-[11px]',
    md: 'min-h-10 px-4 gap-2 text-xs',
    lg: 'min-h-12 px-6 gap-2 text-sm',
};

const BTN_STYLES = {
    primary: 'bg-[#731E2A] hover:bg-[#5C1822] text-white',
    navy: 'bg-navy hover:bg-navy-light text-white',
    outline:
        'bg-white border border-gray-300 hover:border-bronze hover:text-bronze text-navy',
    ghost: 'text-navy hover:bg-gray-100',
    danger: 'bg-red-700 hover:bg-red-800 text-white',
    success: 'bg-green-700 hover:bg-green-800 text-white',
    subtle: 'bg-champagne text-bronze hover:bg-[#f3e6c8]',
    link: 'bg-transparent text-navy underline underline-offset-2 hover:text-bronze rounded-md px-0',
};

function ButtonSpinner({ className = '' }) {
    return (
        <svg
            className={`animate-spin ${className}`}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
    );
}

/**
 * @param {object} props
 * @param {'primary'|'navy'|'outline'|'ghost'|'danger'|'success'|'subtle'|'link'} [props.variant]
 * @param {'sm'|'md'|'lg'} [props.size]           — lg inherits md sizing for text focus balance
 * @param {boolean} [props.loading]               — shows a spinner, keeps dimensions, disables
 * @param {boolean} [props.iconOnly]              — square hit target for icon buttons
 */
export function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    iconOnly = false,
    children,
    className = '',
    disabled,
    ...rest
}) {
    const base = BTN_BASE;
    const sizing = BTN_SIZES[size];
    const iconSizing = iconOnly ? (size === 'sm' ? 'h-8 w-8 min-h-8 !px-0' : 'h-10 w-10 min-h-10 !px-0') : '';
    const styles = BTN_STYLES[variant];
    const isLink = variant === 'link';
    return (
        <button
            type="button"
            disabled={disabled || loading}
            aria-busy={loading || undefined}
            className={`${base} ${isLink ? '' : sizing} ${iconOnly ? iconSizing : ''} ${styles} ${className}`}
            {...rest}
        >
            {loading && <ButtonSpinner className={isLink ? 'h-3 w-3' : 'h-4 w-4 shrink-0'} />}
            {children}
        </button>
    );
}

// ── Badges ───────────────────────────────────────────────────────────────

const STATUS_STYLES = {
    PUBLISHED: 'bg-green-100 text-green-800 border-green-200',
    DRAFT: 'bg-gray-100 text-gray-600 border-gray-200',
    ARCHIVED: 'bg-amber-100 text-amber-800 border-amber-200',
};

export function StatusBadge({ status }) {
    return (
        <span className={`inline-block px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase ${STATUS_STYLES[status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
            {status || '—'}
        </span>
    );
}

export function ReadBadge({ isRead }) {
    return isRead ? (
        <span className="inline-block px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50 text-[10px] font-bold tracking-wider uppercase text-gray-500">Read</span>
    ) : (
        <span className="inline-block px-2.5 py-1 rounded-full border border-[#731E2A]/30 bg-[#731E2A]/5 text-[10px] font-bold tracking-wider uppercase text-[#731E2A]">New</span>
    );
}

// ── Page header ──────────────────────────────────────────────────────────

export function PageHeader({ title, description, actions }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
                <h1 className="text-navy text-2xl md:text-3xl font-serif">{title}</h1>
                {description && <p className="text-steel text-sm mt-1.5 max-w-2xl">{description}</p>}
            </div>
            {actions && <div className="flex flex-wrap items-center gap-3 shrink-0">{actions}</div>}
        </div>
    );
}

// ── Form controls ────────────────────────────────────────────────────────

export function Input({ id, label, error, hint, required, className = '', ...rest }) {
    return (
        <div className={className}>
            <Label htmlFor={id} required={required}>{label}</Label>
            <input
                id={id}
                name={id}
                aria-invalid={Boolean(error) || undefined}
                aria-describedby={[error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined}
                className={fieldClasses({ invalid: Boolean(error) })}
                {...rest}
            />
            {hint && !error && <p id={`${id}-hint`} className="mt-1 text-[11px] text-gray-400">{hint}</p>}
            <FieldError id={`${id}-error`}>{error}</FieldError>
        </div>
    );
}

export function Textarea({ id, label, error, hint, required, rows = 4, className = '', ...rest }) {
    return (
        <div className={className}>
            <Label htmlFor={id} required={required}>{label}</Label>
            <textarea
                id={id}
                name={id}
                rows={rows}
                aria-invalid={Boolean(error) || undefined}
                aria-describedby={[error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined}
                className={`${fieldClasses({ invalid: Boolean(error) })} resize-y`}
                {...rest}
            />
            {hint && !error && <p id={`${id}-hint`} className="mt-1 text-[11px] text-gray-400">{hint}</p>}
            <FieldError id={`${id}-error`}>{error}</FieldError>
        </div>
    );
}

export function Select({ id, label, error, hint, required, children, className = '', ...rest }) {
    return (
        <div className={className}>
            <Label htmlFor={id} required={required}>{label}</Label>
            <div className="relative">
                <select
                    id={id}
                    name={id}
                    aria-invalid={Boolean(error) || undefined}
                    aria-describedby={[error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined}
                    className={fieldClasses({ invalid: Boolean(error), select: true })}
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

// ── Empty / error states ─────────────────────────────────────────────────

export function EmptyState({ title, description, action, tone = 'muted' }) {
    const tones = {
        muted: 'bg-cream border-gray-100',
        error: 'bg-red-50 border-red-200',
    };
    return (
        <div className={`w-full border rounded-2xl p-10 text-center ${tones[tone]}`}>
            <h3 className="text-navy text-lg font-serif font-semibold mb-2">{title}</h3>
            {description && <p className="text-steel text-sm leading-relaxed max-w-md mx-auto mb-5">{description}</p>}
            {action}
        </div>
    );
}

export function InlineError({ message, onRetry }) {
    return (
        <EmptyState
            tone="error"
            title="Something went wrong"
            description={message}
            action={onRetry && <Button variant="outline" onClick={onRetry}>Try again</Button>}
        />
    );
}

/**
 * Shown when the authenticated user lacks the permission for a module. This is
 * deliberately distinct from an *empty* result ("no content") and from a
 * server *error* — an unauthorized user must never be told the database is
 * empty.
 */
export function ForbiddenState({ module = 'this module', action }) {
    return (
        <EmptyState
            title={`You don't have permission to view ${module}.`}
            description="Your account is signed in, but does not have access to this section. Ask a super admin if you think this is a mistake."
            action={action || <Link className="text-xs font-bold uppercase tracking-wider text-bronze underline underline-offset-2 hover:text-navy" to="/admin/dashboard">Go to dashboard</Link>}
        />
    );
}

export function Notice({ tone = 'info', children }) {
    const tones = {
        info: 'bg-blue-50 border-blue-200 text-blue-900',
        success: 'bg-[#E8F5E9] border-[#A5D6A7] text-[#2E7D32]',
        error: 'bg-red-50 border-red-200 text-red-900',
        warning: 'bg-amber-50 border-amber-200 text-amber-900',
    };
    return (
        <div role={tone === 'error' ? 'alert' : tone === 'success' ? 'status' : undefined} className={`p-4 rounded-xl border text-sm leading-relaxed ${tones[tone]}`}>
            {children}
        </div>
    );
}

// ── Pagination ───────────────────────────────────────────────────────────

export function Pagination({ page, total, pageSize, onChange, label = 'items' }) {
    const pages = Math.max(1, Math.ceil(total / (pageSize || 1)));
    if (pages <= 1) {
        return (
            <p className="text-xs text-gray-400 py-4 text-center">
                {total} {label}
            </p>
        );
    }
    const from = (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, total);
    return (
        <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4" aria-label="Pagination">
            <p className="text-xs text-gray-500">
                Showing {from}–{to} of {total} {label}
            </p>
            <div className="flex items-center gap-2">
                <Button variant="outline" disabled={page <= 1} onClick={() => onChange(page - 1)}>Previous</Button>
                <span className="text-xs font-semibold text-navy px-2">Page {page} of {pages}</span>
                <Button variant="outline" disabled={page >= pages} onClick={() => onChange(page + 1)}>Next</Button>
            </div>
        </nav>
    );
}

// ── Modal ────────────────────────────────────────────────────────────────

export function Modal({ open, title, onClose, children, footer, wide = false }) {
    const closeRef = useRef(null);
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => {
            if (e.key === 'Escape') {
                e.stopPropagation();
                onClose();
                return;
            }
            if (e.key === 'Tab' && dialogRef.current) {
                const focusables = dialogRef.current.querySelectorAll(
                    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );
                if (!focusables.length) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
            <div className="fixed inset-0 bg-navy/60" aria-hidden="true" onClick={onClose} />
            <div ref={dialogRef} className={`relative mt-8 sm:mt-14 mb-8 w-full ${wide ? 'max-w-3xl' : 'max-w-xl'} bg-white rounded-2xl shadow-2xl`}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-navy text-lg font-serif font-semibold">{title}</h2>
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close dialog"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-navy transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">{children}</div>
                {footer && <div className="px-6 py-4 border-t border-gray-100 flex flex-wrap justify-end gap-3">{footer}</div>}
            </div>
        </div>
    );
}

export function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', confirmDisabled = false, onConfirm, onCancel }) {
    return (
        <Modal
            open={open}
            title={title}
            onClose={onCancel}
            footer={
                <>
                    <Button variant="outline" onClick={onCancel} disabled={confirmDisabled}>Cancel</Button>
                    <Button variant="danger" onClick={onConfirm} disabled={confirmDisabled}>{confirmLabel}</Button>
                </>
            }
        >
            <p className="text-sm text-steel leading-relaxed">{message}</p>
        </Modal>
    );
}

// ── Table helpers ────────────────────────────────────────────────────────

export function TableShell({ children, ariaLabel }) {
    return (
        <div className="overflow-x-auto -mx-4 px-4">
            <table className="min-w-full text-left text-sm" aria-label={ariaLabel}>{children}</table>
        </div>
    );
}

export function Th({ children, className = '' }) {
    return (
        <th className={`px-4 py-3 text-[10px] font-bold tracking-wider uppercase text-gray-500 border-b border-gray-100 whitespace-nowrap ${className}`}>
            {children}
        </th>
    );
}

export function Td({ children, className = '' }) {
    return <td className={`px-4 py-3 border-b border-gray-50 align-top ${className}`}>{children}</td>;
}