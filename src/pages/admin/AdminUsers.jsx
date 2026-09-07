import { useCallback, useEffect, useState } from 'react';
import { Pencil, Plus, ShieldCheck, UserCheck, UserX } from 'lucide-react';
import { useAuth } from '../../context/AdminAuthContext';
import {
    activateUser,
    assignRole,
    createAdminUser,
    deactivateUser,
    fetchAdminUsers,
    fetchRoles,
    revokeRole,
    updateAdminUser,
} from '../../services/api/adminApi';
import { errorMessage } from '../../services/api/client';
import { useAdminList } from './useAdminList';
import {
    Button,
    EmptyState,
    ForbiddenState,
    Input,
    Modal,
    PageHeader,
    Pagination,
    SkeletonRows,
    TableShell,
    Td,
    Th,
} from '../../components/admin/ui';

function RoleChip({ role, onToggle, busy }) {
    const [confirm, setConfirm] = useState(false);
    return (
        <span className="inline-flex items-center gap-1">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold border bg-cream border-gray-200">
                {role}
            </span>
            {!confirm ? (
                <button
                    type="button"
                    onClick={() => setConfirm(true)}
                    disabled={busy}
                    className="text-[10px] text-steel underline hover:text-[#731E2A]"
                    aria-label={`Remove ${role} role`}
                >
                    remove
                </button>
            ) : (
                <button
                    type="button"
                    onClick={onToggle}
                    disabled={busy}
                    className="text-[10px] font-bold text-[#731E2A] underline"
                >
                    confirm remove
                </button>
            )}
        </span>
    );
}

function AdminUsers() {
    const { user: me } = useAuth();
    const fetcher = useCallback((params) => fetchAdminUsers(params), []);
    const list = useAdminList({ fetcher });

    const [roles, setRoles] = useState([]);
    const [adding, setAdding] = useState(false);
    const [editing, setEditing] = useState(null);
    const [busy, setBusy] = useState('');

    useEffect(() => {
        fetchRoles()
            .then((r) => setRoles(r.items || []))
            .catch(() => setRoles([]));
    }, []);

    // Keep the editor's roles/status in sync when the list refreshes, using the
    // "adjust state during render" pattern (no effect, no cascading render).
    if (editing) {
        const fresh = list.items.find((u) => u.public_id === editing.public_id);
        if (fresh && (fresh.roles !== editing.roles || fresh.is_active !== editing.is_active)) {
            setEditing({ ...editing, roles: fresh.roles, is_active: fresh.is_active });
        }
    }

    const toggleActive = async (user) => {
        setBusy(user.public_id);
        try {
            if (user.is_active) await deactivateUser(user.public_id);
            else await activateUser(user.public_id);
            list.reload();
        } catch (err) {
            window.alert(errorMessage(err, 'Could not change account status.'));
        } finally {
            setBusy('');
        }
    };

    const toggleRole = async (user, roleName) => {
        setBusy(`${user.public_id}:${roleName}`);
        try {
            if (user.roles.includes(roleName)) {
                await revokeRole(user.public_id, roleName);
            } else {
                await assignRole(user.public_id, roleName);
            }
            list.reload();
        } catch (err) {
            window.alert(errorMessage(err, 'Could not change the user role.'));
        } finally {
            setBusy('');
        }
    };

    const handleCreate = async (payload) => {
        setBusy('new');
        try {
            await createAdminUser(payload);
            list.reload();
            setAdding(false);
        } catch (err) {
            window.alert(errorMessage(err, 'Could not create the account.'));
        } finally {
            setBusy('');
        }
    };

    const handleUpdate = async (payload) => {
        setBusy('edit');
        try {
            await updateAdminUser(editing.public_id, payload);
            list.reload();
            setEditing(null);
        } catch (err) {
            window.alert(errorMessage(err, 'Could not update the account.'));
        } finally {
            setBusy('');
        }
    };

    return (
        <div>
            <PageHeader
                title="Admin users"
                description="Team members who can sign in to the back office. Users pick their own password via the forgotten-password flow on the public site."
                actions={me?.is_super_admin ? <Button onClick={() => setAdding(true)}><Plus className="h-4 w-4" aria-hidden="true" /> Add admin</Button> : null}
            />

            {list.loading ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6"><SkeletonRows cols={5} /></div>
            ) : list.error ? (
                list.errorStatus === 403 ? (
                    <ForbiddenState module="admin users" />
                ) : (
                    <EmptyState tone="error" title="Could not load users" description={list.error} action={<Button variant="outline" onClick={list.reload}>Retry</Button>} />
                )
            ) : list.items.length === 0 ? (
                <EmptyState title="No admin accounts yet" description="Create an account to let team members sign in." />
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <TableShell ariaLabel="Admin users">
                        <thead>
                            <tr>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Roles</Th>
                                <Th>Status</Th>
                                <Th>Last login</Th>
                                <Th className="text-right">Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.items.map((u) => (
                                <tr key={u.public_id} className="hover:bg-cream/60 transition-colors">
                                    <Td>
                                        <span className="text-navy font-semibold">{u.full_name}</span>
                                        {u.public_id === me?.public_id && <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-cream text-steel">you</span>}
                                        {u.is_super_admin && <ShieldCheck className="ml-1 inline h-3.5 w-3.5 text-bronze" aria-label="Super admin" />}
                                    </Td>
                                    <Td className="text-gray-500">{u.email}</Td>
                                    <Td>
                                        <div className="flex flex-wrap gap-1">
                                            {(u.roles || []).map((r) => (
                                                <span key={r} className="px-2 py-0.5 rounded-full text-xs font-bold border bg-cream border-gray-200">{r}</span>
                                            ))}
                                        </div>
                                    </Td>
                                    <Td>
                                        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${u.is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                            {u.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </Td>
                                    <Td className="text-xs text-gray-500">{u.last_login_at ? new Date(u.last_login_at).toLocaleString() : '—'}</Td>
                                    <Td className="text-right whitespace-nowrap">
                                        <div className="inline-flex items-center gap-1">
                                            {me?.is_super_admin && (
                                                <Button variant="ghost" size="sm" iconOnly onClick={() => setEditing(u)} aria-label={`Edit ${u.full_name}`}><Pencil className="h-4 w-4" /></Button>
                                            )}
                                            {me?.is_super_admin && u.public_id !== me.public_id && (
                                                <Button variant={u.is_active ? 'outline' : 'subtle'} size="sm" iconOnly onClick={() => toggleActive(u)} disabled={!!busy} aria-label={u.is_active ? 'Deactivate account' : 'Activate account'}>
                                                    {u.is_active ? <UserX className="h-4 w-4" aria-hidden="true" /> : <UserCheck className="h-4 w-4" aria-hidden="true" />}
                                                </Button>
                                            )}
                                        </div>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </TableShell>
                    <Pagination page={list.page} total={list.total} pageSize={20} onChange={list.setPage} label="users" />
                </div>
            )}

            <AddUserModal
                key={adding ? 'open' : 'closed'}
                open={adding}
                roles={roles}
                busy={Boolean(busy)}
                onClose={() => setAdding(false)}
                onSubmit={handleCreate}
            />

            {editing && (
                <EditUserModal
                    user={editing}
                    roles={roles}
                    busy={busy}
                    canToggleRoles={me?.is_super_admin}
                    myId={me?.public_id}
                    onRoleToggle={(roleName) => toggleRole(editing, roleName)}
                    onSubmit={handleUpdate}
                    onClose={() => setEditing(null)}
                />
            )}
        </div>
    );
}

function AddUserModal({ open, roles, busy, onClose, onSubmit }) {
    const [form, setForm] = useState({ email: '', full_name: '', selected: new Set(['ADMIN']) });
    const [error, setError] = useState('');

    const toggle = (role) => {
        setForm((f) => {
            const next = new Set(f.selected);
            if (next.has(role)) next.delete(role);
            else next.add(role);
            return { ...f, selected: next };
        });
    };

    const submit = (e) => {
        e.preventDefault();
        setError('');
        if (!form.email.trim() || !form.full_name.trim()) {
            setError('Email and full name are required.');
            return;
        }
        if (form.selected.size === 0) {
            setError('Select at least one role.');
            return;
        }
        onSubmit({ email: form.email.trim(), full_name: form.full_name.trim(), roles: [...form.selected] });
    };

    return (
        <Modal open={open} title="Add admin user" onClose={onClose} footer={<>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" form="add-user-form" loading={Boolean(busy)}>{busy ? 'Creating…' : 'Create account'}</Button>
        </>}>
            <form id="add-user-form" onSubmit={submit} noValidate className="space-y-5">
                {error && <p className="text-sm text-red-700">{error}</p>}
                <Input id="new-email" label="Email" type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                <Input id="new-full_name" label="Full name" required maxLength={100} value={form.full_name} onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))} />
                <fieldset>
                    <legend className="text-xs text-gray-400 uppercase tracking-wide mb-2">Roles</legend>
                    <div className="space-y-2">
                        {roles.map((r) => (
                            <label key={r.name} className="flex items-center gap-2 text-sm text-navy cursor-pointer">
                                <input type="checkbox" checked={form.selected.has(r.name)} onChange={() => toggle(r.name)} className="h-4 w-4 rounded border-gray-300 text-[#731E2A] focus:ring-[#731E2A]" />
                                {r.name}
                                <span className="text-xs text-gray-400">{r.description}</span>
                            </label>
                        ))}
                        {roles.length === 0 && <p className="text-xs text-gray-400">Roles could not be loaded.</p>}
                    </div>
                </fieldset>
                <p className="text-xs text-gray-400">
                    New accounts have no password yet — the user sets one through the &ldquo;forgot password&rdquo; link on the public login page.
                </p>
            </form>
        </Modal>
    );
}

function EditUserModal({ user, roles, busy, canToggleRoles, myId, onRoleToggle, onSubmit, onClose }) {
    const [form, setForm] = useState({ full_name: user.full_name, email: user.email, is_active: user.is_active });
    const [error, setError] = useState('');
    const isMe = user.public_id === myId;

    const submit = (e) => {
        e.preventDefault();
        setError('');
        if (!form.full_name.trim()) {
            setError('Full name is required.');
            return;
        }
        onSubmit({ ...form, full_name: form.full_name.trim() });
    };

    return (
        <Modal open title={`Edit — ${user.full_name}`} onClose={onClose} footer={<>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" form="edit-user-form" loading={busy === 'edit'}>{busy === 'edit' ? 'Saving…' : 'Save changes'}</Button>
        </>}>
            <form id="edit-user-form" onSubmit={submit} noValidate className="space-y-5">
                {error && <p className="text-sm text-red-700">{error}</p>}
                <Input id="edit-full_name" label="Full name" required maxLength={100} value={form.full_name} onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))} />
                <Input id="edit-email" label="Email" type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />

                <div>
                    <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-2">Roles</h4>
                    <div className="flex flex-wrap items-center gap-2">
                        {(user.roles || []).map((r) => (
                            <RoleChip
                                key={r}
                                role={r}
                                busy={Boolean(busy)}
                                onToggle={() => onRoleToggle(r)}
                            />
                        ))}
                        {!canToggleRoles && (
                            <span className="text-xs text-gray-400">Role changes require super-admin rights.</span>
                        )}
                    </div>
                    {canToggleRoles && (
                        <div className="mt-3">
                            <p className="text-xs text-gray-400 mb-1.5">Add a role</p>
                            <div className="flex flex-wrap gap-1.5">
                                {roles.filter((r) => !user.roles.includes(r.name)).map((r) => (
                                    <button
                                        key={r.name}
                                        type="button"
                                        onClick={() => onRoleToggle(r.name)}
                                        disabled={busy}
                                        className="px-2 py-1 rounded-full text-xs font-semibold border border-bronze/40 text-bronze hover:bg-champagne"
                                    >
                                        + {r.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {canToggleRoles && !isMe && (
                    <label className="flex items-center gap-2 text-sm text-navy cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.is_active}
                            onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                            className="h-4 w-4 rounded border-gray-300 text-[#731E2A] focus:ring-[#731E2A]"
                        />
                        Account active (can sign in)
                    </label>
                )}
                {isMe && <p className="text-xs text-gray-400">You cannot deactivate your own account.</p>}
            </form>
        </Modal>
    );
}

export default AdminUsers;