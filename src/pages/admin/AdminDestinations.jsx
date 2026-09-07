import { useCallback, useState } from 'react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AdminAuthContext';
import {
    archiveDestination,
    createDestination,
    deleteDestination,
    fetchAdminDestinations,
    publishDestination,
    updateDestination,
} from '../../services/api/adminApi';
import { errorMessage } from '../../services/api/client';
import { useAdminList } from './useAdminList';
import { useMediaOptions } from './mediaOptions';
import {
    Button,
    ConfirmDialog,
    EmptyState,
    Input,
    InlineError,
    Modal,
    PageHeader,
    Pagination,
    Select,
    SkeletonRows,
    StatusBadge,
    TableShell,
    Td,
    Textarea,
    Th,
} from '../../components/admin/ui';
import { SeoFields } from '../../components/admin/SeoFields';

const emptyForm = {
    name: '',
    country: '',
    code: '',
    slug: '',
    short_description: '',
    description: '',
    hero_media_id: '',
    display_order: 0,
};

function DestinationEditor({ open, initial, onClose, onSaved }) {
    const isEdit = Boolean(initial?.public_id);
    const [form, setForm] = useState({ ...emptyForm, ...initial });
    const [seo, setSeo] = useState(initial?.seo_metadata || null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const media = useMediaOptions(true);

    const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        const payload = {
            name: form.name.trim(),
            country: form.country.trim(),
            code: form.code?.trim() || undefined,
            slug: form.slug.trim(),
            short_description: form.short_description?.trim() || undefined,
            description: form.description?.trim() || undefined,
            hero_media_id: form.hero_media_id || undefined,
            display_order: Number(form.display_order) || 0,
            seo_metadata: seo && Object.keys(seo).some((k) => seo[k] !== undefined && seo[k] !== '') ? seo : undefined,
        };

        setSaving(true);
        try {
            if (isEdit) {
                await updateDestination(initial.public_id, payload);
            } else {
                await createDestination(payload);
            }
            onSaved();
            onClose();
        } catch (err) {
            setError(errorMessage(err, 'Could not save destination.'));
            if (err.fieldErrors) setFieldErrors(err.fieldErrors);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            open={open}
            wide
            title={isEdit ? `Edit destination — ${initial.name}` : 'New destination'}
            onClose={onClose}
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit" form="destination-form" loading={saving}>{saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create destination'}</Button>
                </>
            }
        >
            <form id="destination-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                {error && <EmptyState tone="error" title="Could not save" description={error} />}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input id="name" label="Name" required value={form.name} onChange={(e) => set('name', e.target.value)} error={fieldErrors.name} placeholder="Hanoi & the Red River Delta" />
                    <Input id="country" label="Country" required value={form.country} onChange={(e) => set('country', e.target.value)} error={fieldErrors.country} placeholder="Vietnam" />
                    <Input id="code" label="Country code (optional)" maxLength={10} value={form.code} onChange={(e) => set('code', e.target.value)} placeholder="VN" />
                    <Input id="slug" label="Slug" required value={form.slug} onChange={(e) => set('slug', e.target.value)} error={fieldErrors.slug} hint="Lowercase letters, numbers and hyphens." placeholder="hanoi-red-river-delta" />
                    <Input id="display_order" label="Display order" type="number" value={form.display_order} onChange={(e) => set('display_order', e.target.value)} />
                </div>
                <Textarea id="short_description" label="Short description" rows={3} maxLength={1000} value={form.short_description || ''} onChange={(e) => set('short_description', e.target.value)} placeholder="One or two sentences shown on cards." />
                <Textarea id="description" label="Full description" rows={6} value={form.description || ''} onChange={(e) => set('description', e.target.value)} placeholder="The destination guide shown on the public detail page." />
                <Select id="hero_media_id" label="Hero image" value={form.hero_media_id || ''} onChange={(e) => set('hero_media_id', e.target.value)}>
                    <option value="">No image</option>
                    {media.options.map((m) => (
                        <option key={m.public_id} value={m.public_id}>{m.alt_text || m.url}</option>
                    ))}
                </Select>
                <SeoFields value={seo} onChange={setSeo} />
            </form>
        </Modal>
    );
}

function AdminDestinations() {
    const { can } = useAuth();
    const fetcher = useCallback(
        (params) => fetchAdminDestinations({ ...params, sort: 'display_order' }),
        []
    );
    const list = useAdminList({ fetcher });

    const [editing, setEditing] = useState(null);
    const [editorOpen, setEditorOpen] = useState(false);
    const [detail, setDetail] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [busyAction, setBusyAction] = useState('');

    const canCreate = can('destinations.create');
    const canUpdate = can('destinations.update');
    const canPublish = can('destinations.publish');
    const canArchive = can('destinations.archive');

    const openNew = () => {
        setEditing(null);
        setEditorOpen(true);
    };
    const openEdit = (d) => {
        setEditing({ ...d, seo_metadata: d.seo_metadata || null });
        setEditorOpen(true);
    };

    const runMutation = async (fn, done) => {
        setBusyAction('x');
        try {
            await fn();
            list.reload();
            setDetail(null);
        } catch (err) {
            setBusyAction('');
            window.alert(errorMessage(err, 'The action could not be completed.'));
        } finally {
            setBusyAction('');
            done?.();
        }
    };

    const handleDelete = async () => {
        const target = confirmDelete;
        setConfirmDelete(null);
        await runMutation(() => deleteDestination(target.public_id));
    };

    const detailRow = detail && (
        <div className="bg-champagne/40 border border-bronze/20 rounded-xl px-4 py-3 text-xs text-navy space-y-1">
            <p className="font-bold text-sm">{detail.name} <span className="text-gray-500 font-normal">· {detail.country}</span></p>
            <p><span className="font-semibold">Slug:</span> /destination/{detail.slug}</p>
            <p><span className="font-semibold">Status:</span> {detail.status} · <span className="font-semibold">Order:</span> {detail.display_order}</p>
            <p className="text-gray-500">{detail.short_description}</p>
        </div>
    );

    return (
        <div>
            <PageHeader
                title="Destinations"
                description="All destination guides — published, drafts and archived. New destinations are saved as drafts until published."
                actions={canCreate ? <Button onClick={openNew}><Plus className="h-4 w-4" aria-hidden="true" /> New destination</Button> : null}
            />

            <div className="flex items-center gap-2 mb-4">
                <label htmlFor="dest-status" className="sr-only">Filter by status</label>
                <select
                    id="dest-status"
                    value={list.status}
                    onChange={(e) => { list.setPage(1); list.setStatus(e.target.value); }}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-navy bg-white"
                >
                    <option value="">All statuses</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                    <option value="ARCHIVED">Archived</option>
                </select>
            </div>

            {list.loading ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6"><SkeletonRows cols={5} /></div>
            ) : list.error ? (
                <InlineError message={list.error} onRetry={list.reload} />
            ) : list.items.length === 0 ? (
                <EmptyState
                    title={list.status ? `No ${list.status.toLowerCase()} destinations` : 'No destinations yet'}
                    description={canCreate ? 'Create your first destination guide or change the status filter.' : 'There are no destinations to show.'}
                    action={canCreate ? <Button onClick={openNew}><Plus className="h-4 w-4" aria-hidden="true" /> New destination</Button> : null}
                />
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <TableShell ariaLabel="Destinations">
                        <thead>
                            <tr>
                                <Th>Name</Th>
                                <Th>Country</Th>
                                <Th>Code</Th>
                                <Th>Status</Th>
                                <Th>Updated</Th>
                                <Th className="text-right">Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.items.map((d) => (
                                <tr key={d.public_id} className="hover:bg-cream/60 transition-colors">
                                    <Td>
                                        <button type="button" onClick={() => setDetail(d)} className="text-navy font-semibold hover:text-bronze text-left">
                                            {d.name}
                                        </button>
                                        <span className="block text-xs text-gray-400">/destination/{d.slug}</span>
                                    </Td>
                                    <Td>{d.country}</Td>
                                    <Td className="text-gray-500">{d.code || '—'}</Td>
                                    <Td><StatusBadge status={d.status} /></Td>
                                    <Td className="text-xs text-gray-500 whitespace-nowrap">{d.updated_at ? new Date(d.updated_at).toLocaleDateString() : '—'}</Td>
                                    <Td className="text-right whitespace-nowrap">
                                        <div className="inline-flex items-center gap-1">
                                            <Button variant="ghost" size="sm" iconOnly onClick={() => setDetail(d)} aria-label={`View ${d.name}`}><Eye className="h-4 w-4" /></Button>
                                            {canUpdate && <Button variant="ghost" size="sm" iconOnly onClick={() => openEdit(d)} aria-label={`Edit ${d.name}`}><Pencil className="h-4 w-4" /></Button>}
                                            {canPublish && d.status !== 'PUBLISHED' && (
                                                <Button variant="subtle" size="sm" onClick={() => runMutation(() => publishDestination(d.public_id))} disabled={!!busyAction}>Publish</Button>
                                            )}
                                            {canArchive && (
                                                <>
                                                    {d.status !== 'ARCHIVED' && <Button variant="outline" size="sm" onClick={() => runMutation(() => archiveDestination(d.public_id))} disabled={!!busyAction}>Archive</Button>}
                                                    <Button variant="ghost" size="sm" iconOnly onClick={() => setConfirmDelete(d)} aria-label={`Delete ${d.name}`} disabled={!!busyAction}><Trash2 className="h-4 w-4 text-red-700" /></Button>
                                                </>
                                            )}
                                        </div>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </TableShell>
                    {detailRow}
                    <Pagination page={list.page} total={list.total} pageSize={20} onChange={list.setPage} label="destinations" />
                </div>
            )}

            <DestinationEditor
                open={editorOpen}
                initial={editing}
                onClose={() => setEditorOpen(false)}
                onSaved={() => list.reload()}
            />

            <Modal open={Boolean(detail)} title="Destination details" onClose={() => setDetail(null)}>
                {detail && (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">Name</dt><dd className="text-navy font-semibold">{detail.name}</dd>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">Country</dt><dd>{detail.country}</dd>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">Code</dt><dd>{detail.code || '—'}</dd>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">Slug</dt><dd>/destination/{detail.slug}</dd>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">Status</dt><dd><StatusBadge status={detail.status} /></dd>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">Display order</dt><dd>{detail.display_order}</dd>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">Created</dt><dd>{detail.created_at ? new Date(detail.created_at).toLocaleString() : '—'}</dd>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">Updated</dt><dd>{detail.updated_at ? new Date(detail.updated_at).toLocaleString() : '—'}</dd>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">Description</dt><dd className="sm:col-span-2 text-steel">{detail.description || '—'}</dd>
                    </dl>
                )}
            </Modal>

            <ConfirmDialog
                open={Boolean(confirmDelete)}
                title="Delete destination?"
                message={`"${confirmDelete?.name}" will be soft-deleted and hidden from the site. This can be reversed from the archives.`}
                confirmLabel="Delete"
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(null)}
            />
        </div>
    );
}

export default AdminDestinations;