import { useCallback, useEffect, useState } from 'react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AdminAuthContext';
import {
    archiveTour,
    createTour,
    deleteTour,
    fetchAdminTours,
    publishTour,
    updateTour,
} from '../../services/api/adminApi';
import { fetchDestinations } from '../../services/api/cms';
import { errorMessage } from '../../services/api/client';
import { TRIP_TYPES, TRIP_TYPE_BY_VALUE } from '../../config/enquiry';
import { useAdminList } from './useAdminList';
import { useMediaOptions } from './mediaOptions';
import {
    Button,
    ConfirmDialog,
    EmptyState,
    ForbiddenState,
    Input,
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
    title: '',
    slug: '',
    destination_public_id: '',
    category: 'FIT',
    duration_days: 7,
    duration_nights: '',
    highlights: '',
    summary: '',
    description: '',
    hero_media_id: '',
    display_order: 0,
};

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function splitHighlights(text) {
    return text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
}

function TourEditor({ open, initial, onClose, onSaved }) {
    const isEdit = Boolean(initial?.public_id);
    const [form, setForm] = useState(() => ({
        ...emptyForm,
        ...(initial || {}),
        destination_public_id: initial?.destination?.public_id || '',
        highlights: (initial?.highlights || []).join('\n'),
    }));
    const [seo, setSeo] = useState(initial?.seo_metadata || null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const media = useMediaOptions(true);

    const [destinations, setDestinations] = useState([]);
    useEffect(() => {
        let cancelled = false;
        fetchDestinations({ pageSize: 100 })
            .then((r) => {
                if (!cancelled) setDestinations(r.items || []);
            })
            .catch(() => {
                if (!cancelled) setDestinations([]);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

    const onTitleChange = (value) => {
        setForm((f) => ({
            ...f,
            title: value,
            slug: f.slug === '' || f.slug === slugify(f.title) ? slugify(value) : f.slug,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        const payload = {
            title: form.title.trim(),
            slug: form.slug.trim(),
            destination_public_id: form.destination_public_id || undefined,
            category: form.category,
            duration_days: form.duration_days === '' ? undefined : Number(form.duration_days),
            duration_nights: form.duration_nights === '' ? undefined : Number(form.duration_nights),
            highlights: splitHighlights(form.highlights),
            summary: form.summary?.trim() || undefined,
            description: form.description?.trim() || undefined,
            hero_media_id: form.hero_media_id || undefined,
            display_order: Number(form.display_order) || 0,
            seo_metadata: seo && Object.keys(seo).some((k) => seo[k] !== undefined && seo[k] !== '') ? seo : undefined,
        };

        setSaving(true);
        try {
            if (isEdit) {
                await updateTour(initial.public_id, payload);
            } else {
                await createTour(payload);
            }
            onSaved();
            onClose();
        } catch (err) {
            setError(errorMessage(err, 'Could not save tour.'));
            if (err.fieldErrors) setFieldErrors(err.fieldErrors);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            open={open}
            wide
            title={isEdit ? `Edit tour — ${initial.title}` : 'New tour'}
            onClose={onClose}
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit" form="tour-form" loading={saving}>{saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create tour'}</Button>
                </>
            }
        >
            <form id="tour-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                {error && <EmptyState tone="error" title="Could not save" description={error} />}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <Input id="title" label="Title" required value={form.title} onChange={(e) => onTitleChange(e.target.value)} error={fieldErrors.title} placeholder="Classic Hanoi: culture & charm" />
                    </div>
                    <Input id="slug" label="Slug" required pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$" value={form.slug} onChange={(e) => set('slug', slugify(e.target.value))} error={fieldErrors.slug} hint="Lowercase letters, numbers and hyphens." placeholder="classic-hanoi" />
                    <Select id="category" label="Category" required value={form.category} onChange={(e) => set('category', e.target.value)} error={fieldErrors.category}>
                        {TRIP_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </Select>
                    <Select id="destination_public_id" label="Destination" required value={form.destination_public_id} onChange={(e) => set('destination_public_id', e.target.value)} error={fieldErrors.destination_public_id}>
                        <option value="">Select a destination…</option>
                        {destinations.map((d) => <option key={d.public_id} value={d.public_id}>{d.name} ({d.country})</option>)}
                    </Select>
                    <div className="grid grid-cols-2 gap-4">
                        <Input id="duration_days" label="Duration (days)" type="number" min="1" max="60" value={form.duration_days} onChange={(e) => set('duration_days', e.target.value)} error={fieldErrors.duration_days} />
                        <Input id="duration_nights" label="Nights (optional)" type="number" min="0" max="60" value={form.duration_nights} onChange={(e) => set('duration_nights', e.target.value)} error={fieldErrors.duration_nights} />
                    </div>
                </div>

                <Textarea id="summary" label="Summary" rows={3} maxLength={1000} value={form.summary || ''} onChange={(e) => set('summary', e.target.value)} placeholder="Short teaser used on cards and listings." />
                <Textarea id="description" label="Full description" rows={6} value={form.description || ''} onChange={(e) => set('description', e.target.value)} placeholder="The full itinerary story shown on the public tour page." />
                <Textarea id="highlights" label="Highlights" rows={4} value={form.highlights} onChange={(e) => set('highlights', e.target.value)} hint="One highlight per line — each becomes a bullet on the tour card." placeholder={'Private transfers throughout\nHalong Bay overnight cruise\nLocal food tour with expert guide'} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select id="hero_media_id" label="Hero image" value={form.hero_media_id || ''} onChange={(e) => set('hero_media_id', e.target.value)}>
                        <option value="">No image</option>
                        {media.options.map((m) => (
                            <option key={m.public_id} value={m.public_id}>{m.alt_text || m.url}</option>
                        ))}
                    </Select>
                    <Input id="display_order" label="Display order" type="number" value={form.display_order} onChange={(e) => set('display_order', e.target.value)} />
                </div>

                <SeoFields value={seo} onChange={setSeo} />
            </form>
        </Modal>
    );
}

function AdminTours() {
    const { can } = useAuth();
    const fetcher = useCallback(
        (params) => fetchAdminTours({ ...params, sort: 'display_order' }),
        []
    );
    const list = useAdminList({ fetcher });

    const [editing, setEditing] = useState(null);
    const [editorOpen, setEditorOpen] = useState(false);
    const [detail, setDetail] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [busyAction, setBusyAction] = useState('');

    const canCreate = can('tours.create');
    const canUpdate = can('tours.update');
    const canPublish = can('tours.publish');
    const canArchive = can('tours.archive');

    const openNew = () => {
        setEditing(null);
        setEditorOpen(true);
    };
    const openEdit = (t) => {
        setEditing(t);
        setEditorOpen(true);
    };

    const runMutation = async (fn) => {
        setBusyAction('spin');
        try {
            await fn();
            list.reload();
            setDetail(null);
        } catch (err) {
            window.alert(errorMessage(err, 'The action could not be completed.'));
        } finally {
            setBusyAction('');
        }
    };

    const handleDelete = async () => {
        const target = confirmDelete;
        setConfirmDelete(null);
        await runMutation(() => deleteTour(target.public_id));
    };

    return (
        <div>
            <PageHeader
                title="Tours"
                description="Every tour across categories, with highlights and full descriptions. Save new tours as drafts and publish when ready."
                actions={canCreate ? <Button onClick={openNew}><Plus className="h-4 w-4" aria-hidden="true" /> New tour</Button> : null}
            />

            <div className="flex items-center gap-2 mb-4">
                <label htmlFor="tour-status" className="sr-only">Filter by status</label>
                <select
                    id="tour-status"
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
                list.errorStatus === 403 ? (
                    <ForbiddenState module="tours" />
                ) : (
                    <EmptyState tone="error" title="Could not load tours" description={list.error} action={<Button variant="outline" onClick={list.reload}>Retry</Button>} />
                )
            ) : list.items.length === 0 ? (
                <EmptyState
                    title={list.status ? `No ${list.status.toLowerCase()} tours` : 'No tours yet'}
                    description={canCreate ? 'Create your first tour or change the status filter.' : 'There are no tours to show.'}
                    action={canCreate ? <Button onClick={openNew}><Plus className="h-4 w-4" aria-hidden="true" /> New tour</Button> : null}
                />
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <TableShell ariaLabel="Tours">
                        <thead>
                            <tr>
                                <Th>Title</Th>
                                <Th>Destination</Th>
                                <Th>Category</Th>
                                <Th>Days</Th>
                                <Th>Status</Th>
                                <Th>Updated</Th>
                                <Th className="text-right">Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.items.map((t) => (
                                <tr key={t.public_id} className="hover:bg-cream/60 transition-colors">
                                    <Td>
                                        <button type="button" onClick={() => setDetail(t)} className="text-navy font-semibold hover:text-bronze text-left">
                                            {t.title}
                                        </button>
                                        <span className="block text-xs text-gray-400">/tours/{t.slug}</span>
                                    </Td>
                                    <Td className="text-gray-500">{t.destination?.name || '—'}</Td>
                                    <Td className="text-gray-500">{TRIP_TYPE_BY_VALUE[t.category] || t.category}</Td>
                                    <Td>{t.duration_days || '—'}</Td>
                                    <Td><StatusBadge status={t.status} /></Td>
                                    <Td className="text-xs text-gray-500 whitespace-nowrap">{t.updated_at ? new Date(t.updated_at).toLocaleDateString() : '—'}</Td>
                                    <Td className="text-right whitespace-nowrap">
                                        <div className="inline-flex items-center gap-1">
                                            <Button variant="ghost" size="sm" iconOnly onClick={() => setDetail(t)} aria-label={`View ${t.title}`}><Eye className="h-4 w-4" /></Button>
                                            {canUpdate && <Button variant="ghost" size="sm" iconOnly onClick={() => openEdit(t)} aria-label={`Edit ${t.title}`}><Pencil className="h-4 w-4" /></Button>}
                                            {canPublish && t.status !== 'PUBLISHED' && (
                                                <Button variant="subtle" size="sm" onClick={() => runMutation(() => publishTour(t.public_id))} disabled={!!busyAction}>Publish</Button>
                                            )}
                                            {canArchive && (
                                                <>
                                                    {t.status !== 'ARCHIVED' && <Button variant="outline" size="sm" onClick={() => runMutation(() => archiveTour(t.public_id))} disabled={!!busyAction}>Archive</Button>}
                                                    <Button variant="ghost" size="sm" iconOnly onClick={() => setConfirmDelete(t)} aria-label={`Delete ${t.title}`} disabled={!!busyAction}><Trash2 className="h-4 w-4 text-red-700" /></Button>
                                                </>
                                            )}
                                        </div>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </TableShell>
                    <Pagination page={list.page} total={list.total} pageSize={20} onChange={list.setPage} label="tours" />
                </div>
            )}

            <TourEditor open={editorOpen} initial={editing} onClose={() => setEditorOpen(false)} onSaved={() => list.reload()} />

            <Modal open={Boolean(detail)} title="Tour details" onClose={() => setDetail(null)}>
                {detail && (
                    <div className="space-y-4 text-sm">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Title</dt><dd className="text-navy font-semibold">{detail.title}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Slug</dt><dd>{detail.slug}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Destination</dt><dd>{detail.destination?.name || '—'}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Category</dt><dd>{TRIP_TYPE_BY_VALUE[detail.category] || detail.category}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Duration</dt><dd>{detail.duration_days ? `${detail.duration_days} days${detail.duration_nights ? ` / ${detail.duration_nights} nights` : ''}` : '—'}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Status</dt><dd><StatusBadge status={detail.status} /></dd>
                        </dl>
                        {detail.highlights?.length > 0 && (
                            <div>
                                <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-1">Highlights</h4>
                                <ul className="list-disc pl-5 text-steel space-y-1">
                                    {detail.highlights.map((h, i) => <li key={i}>{h}</li>)}
                                </ul>
                            </div>
                        )}
                        {detail.summary && <p className="text-steel">{detail.summary}</p>}
                        {detail.description && <p className="text-steel">{detail.description}</p>}
                    </div>
                )}
            </Modal>

            <ConfirmDialog
                open={Boolean(confirmDelete)}
                title="Delete tour?"
                message={`"${confirmDelete?.title}" will be soft-deleted and hidden from the site.`}
                confirmLabel="Delete"
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(null)}
            />
        </div>
    );
}

export default AdminTours;