import { useState } from 'react';
import { ShieldCheck, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AdminAuthContext';
import { errorMessage } from '../../services/api/client';
import { Button, Input, Notice, PageHeader } from '../../components/admin/ui';

function AdminAccount() {
    const { user, changePassword } = useAuth();
    const [form, setForm] = useState({ current_password: '', new_password: '', confirm: '' });
    const [fieldErrors, setFieldErrors] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [saving, setSaving] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setFieldErrors({});

        if (!form.current_password) {
            setFieldErrors((f) => ({ ...f, current_password: 'Enter your current password.' }));
        }
        if (!form.new_password) {
            setFieldErrors((f) => ({ ...f, new_password: 'Enter a new password.' }));
        } else if (form.new_password.length < 8) {
            setFieldErrors((f) => ({ ...f, new_password: 'New password must be at least 8 characters.' }));
        }
        if (form.new_password !== form.confirm) {
            setFieldErrors((f) => ({ ...f, confirm: 'Passwords do not match.' }));
        }
        if (form.new_password !== form.confirm || !form.current_password || !form.new_password || form.new_password.length < 8) return;

        setSaving(true);
        try {
            await changePassword({ current_password: form.current_password, new_password: form.new_password });
            setSuccess('Password changed. Use the new password next time you sign in.');
            setForm({ current_password: '', new_password: '', confirm: '' });
        } catch (err) {
            setError(errorMessage(err, 'Could not change the password.'));
            if (err.fieldErrors) setFieldErrors(err.fieldErrors);
        } finally {
            setSaving(false);
        }
    };

    if (!user) return null;

    return (
        <div className="max-w-2xl">
            <PageHeader title="Account" description="Your profile and sign-in details." />

            <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
                <h2 className="text-navy font-serif text-lg font-semibold mb-4 flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-bronze" aria-hidden="true" /> Profile
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div><dt className="text-xs text-gray-400 uppercase tracking-wide">Name</dt><dd className="text-navy font-semibold">{user.full_name}</dd></div>
                    <div><dt className="text-xs text-gray-400 uppercase tracking-wide">Email</dt><dd>{user.email}</dd></div>
                    <div>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">Roles</dt>
                        <dd className="flex flex-wrap gap-1 mt-1">
                            {(user.roles || []).map((r) => (
                                <span key={r} className="px-2 py-0.5 rounded-full text-xs font-bold border bg-cream border-gray-200">{r}</span>
                            ))}
                            {user.is_super_admin && <ShieldCheck className="h-4 w-4 text-bronze" aria-label="Super admin" />}
                        </dd>
                    </div>
                    <div><dt className="text-xs text-gray-400 uppercase tracking-wide">Last login</dt><dd>{user.last_login_at ? new Date(user.last_login_at).toLocaleString() : '—'}</dd></div>
                </dl>
            </section>

            <section className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-navy font-serif text-lg font-semibold mb-4">Change password</h2>
                <form onSubmit={submit} noValidate className="space-y-4">
                    {error && <Notice tone="error">{error}</Notice>}
                    {success && <Notice tone="success">{success}</Notice>}
                    <Input id="pw-current" label="Current password" type="password" autoComplete="current-password" required value={form.current_password} onChange={(e) => setForm((f) => ({ ...f, current_password: e.target.value }))} error={fieldErrors.current_password} />
                    <Input id="pw-new" label="New password" type="password" autoComplete="new-password" required value={form.new_password} onChange={(e) => setForm((f) => ({ ...f, new_password: e.target.value }))} error={fieldErrors.new_password} hint="At least 8 characters." />
                    <Input id="pw-confirm" label="Confirm new password" type="password" autoComplete="new-password" required value={form.confirm} onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))} error={fieldErrors.confirm} />
                    <Button type="submit" loading={saving}>{saving ? 'Updating…' : 'Update password'}</Button>
                </form>
            </section>
        </div>
    );
}

export default AdminAccount;