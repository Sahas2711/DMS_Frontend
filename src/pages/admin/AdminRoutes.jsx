import { useCallback, useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Eye, MapPin, Pencil, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AdminAuthContext';
import {
    archiveRoute,
    createRoute,
    deleteRoute,
    fetchAdminRoutes,
    publishRoute,
    updateRoute,
} from '../../services/api/adminApi';
import { fetchDestinations } from '../../services/api/cms';
import { errorMessage } from '../../services/api/client';
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
    origin_destination_public_id: '',
    end_destination_public_id: '',
    duration_days: '',
    description: '',
    hero_media_id: '',
    display_order: 0,
    stops: [],
};

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function RouteEditor({ open, initial, onClose, onSaved }) {
    const isEdit = Boolean(initial?.public_id);
    const [form, setForm] = useState(() => ({
        ...emptyForm,
        ...(initial || {}),
        origin_destination_public_id: initial?.origin_destination?.public_id || '',
        end_destination_public_id: initial?.end_destination?.public_id || '',
        stops: (initial?.stops || []).map((s, i) => ({
            destination_public_id: s.destination_public_id || '',
            stop_order: s.stop_order ?? i,
            notes: s.notes || '',
        })),
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

    const updateStop = (index, patch) => {
        setForm((f) => ({
            ...f,
            stops: f.stops.map((s, i) => (i === index ? { ...s, ...patch } : s)),
        }));
    };
    const addStop = () => {
        setForm((f) => ({
            ...f,
            stops: [...f.stops, { destination_public_id: '', stop_order: f.stops.length, notes: '' }],
        }));
    };
    const removeStop = (index) => {
        setForm((f) => ({
            ...f,
            stops: f.stops.filter((_, i) => i !== index).map((s, i) => ({ ...s, stop_order: i })),
        }));
    };
    const moveStop = (index, delta) => {
        setForm((f) => {
            const next = [...f.stops];
            const target = index + delta;
            if (target < 0 || target >= next.length) return f;
            [next[index], next[target]] = [next[target], next[index]];
            return { ...f, stops: next.map((s, i) => ({ ...s, stop_order: i })) };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        if (form.origin_destination_public_id && form.origin_destination_public_id === form.end_destination_public_id) {
            setFieldErrors({ end_destination_public_id: 'End destination must differ from the origin.' });
            return;
        }

        const payload = {
            title: form.title.trim(),
            slug: form.slug.trim(),
            origin_destination_public_id: form.origin_destination_public_id || undefined,
            end_destination_public_id: form.end_destination_public_id || undefined,
            duration_days: form.duration_days === '' ? undefined : Number(form.duration_days),
            description: form.description?.trim() || undefined,
            hero_media_id: form.hero_media_id || undefined,
            display_order: Number(form.display_order) || 0,
            stops: form.stops
                .filter((s) => s.destination_public_id)
                .map((s, i) => ({
                    destination_public_id: s.destination_public_id,
                    stop_order: i,
                    notes: s.notes?.trim() || undefined,
                })),
            seo_metadata: seo && Object.keys(seo).some((k) => seo[k] !== undefined && seo[k] !== '') ? seo : undefined,
        };

        setSaving(true);
        try {
            if (isEdit) {
                await updateRoute(initial.public_id, payload);
            } else {
                await createRoute(payload);
            }
            onSaved();
            onClose();
        } catch (err) {
            setError(errorMessage(err, 'Could not save route.'));
            if (err.fieldErrors) setFieldErrors(err.fieldErrors);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            open={open}
            wide
            title={isEdit ? `Edit route — ${initial.title}` : 'New route'}
            onClose={onClose}
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit" form="route-form" loading={saving}>{saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create route'}</Button>
                </>
            }
        >
            <form id="route-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                {error && <EmptyState tone="error" title="Could not save" description={error} />}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <Input id="title" label="Route title" required value={form.title} onChange={(e) => onTitleChange(e.target.value)} error={fieldErrors.title} placeholder="Hanoi — Ha Long — Hanoi" />
                    </div>
                    <Input id="slug" label="Slug" required pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$" value={form.slug} onChange={(e) => set('slug', slugify(e.target.value))} error={fieldErrors.slug} hint="Lowercase letters, numbers and hyphens." placeholder="hanoi-ha-long-hanoi" />
                    <Input id="duration_days" label="Duration (days)" type="number" min="1" max="60" value={form.duration_days} onChange={(e) => set('duration_days', e.target.value)} error={fieldErrors.duration_days} />
                    <Select id="origin" label="Origin city" required value={form.origin_destination_public_id} onChange={(e) => set('origin_destination_public_id', e.target.value)} error={fieldErrors.origin_destination_public_id}>
                        <option value="">Select…</option>
                        {destinations.map((d) => <option key={d.public_id} value={d.public_id}>{d.name}</option>)}
                    </Select>
                    <Select id="end" label="End city" required value={form.end_destination_public_id} onChange={(e) => set('end_destination_public_id', e.target.value)} error={fieldErrors.end_destination_public_id}>
                        <option value="">Select…</option>
                        {destinations.map((d) => <option key={d.public_id} value={d.public_id}>{d.name}</option>)}
                    </Select>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold tracking-wider uppercase text-navy">Intermediate stops</h4>
                        <Button type="button" variant="outline" size="sm" onClick={addStop}><Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add stop</Button>
                    </div>
                    {form.stops.length === 0 ? (
                        <p className="text-xs text-gray-400 py-2">No intermediate stops — this is a direct route.</p>
                    ) : (
                        <ul className="space-y-2">
                            {form.stops.map((stop, index) => (
                                <li key={index} className="flex items-start gap-2 bg-cream/50 rounded-xl p-3 border border-gray-100">
                                    <div className="flex flex-col gap-0.5 mt-1">
                                        <button type="button" onClick={() => moveStop(index, -1)} disabled={index === 0} aria-label="Move stop up" className="text-gray-400 hover:text-navy disabled:opacity-30"><ArrowUp className="h-3.5 w-3.5" /></button>
                                        <button type="button" onClick={() => moveStop(index, 1)} disabled={index === form.stops.length - 1} aria-label="Move stop down" className="text-gray-400 hover:text-navy disabled:opacity-30"><ArrowDown className="h-3.5 w-3.5" /></button>
                                    </div>
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <Select label={`Stop ${index + 1} city`} value={stop.destination_public_id} onChange={(e) => updateStop(index, { destination_public_id: e.target.value })}>
                                            <option value="">Select…</option>
                                            {destinations.map((d) => <option key={d.public_id} value={d.public_id}>{d.name}</option>)}
                                        </Select>
                                        <Input label="Notes (optional)" value={stop.notes || ''} onChange={(e) => updateStop(index, { notes: e.target.value })} placeholder="Overnight stay" />
                                    </div>
                                    <button type="button" onClick={() => removeStop(index)} aria-label="Remove stop" className="mt-5 text-gray-400 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <Textarea id="description" label="Description" rows={3} value={form.description || ''} onChange={(e) => set('description', e.target.value)} placeholder="Ground handling notes shared with the driving team." />

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

function AdminRoutes() {
    const { can } = useAuth();
    const fetcher = useCallback(
        (params) => fetchAdminRoutes({ ...params, sort: 'display_order' }),
        []
    );
    const list = useAdminList({ fetcher });

    const [editing, setEditing] = useState(null);
    const [editorOpen, setEditorOpen] = useState(false);
    const [detail, setDetail] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [busyAction, setBusyAction] = useState('');

    const canCreate = can('routes.create');
    const canUpdate = can('routes.update');
    const canPublish = can('routes.publish');
    const canArchive = can('routes.archive');

    const openNew = () => {
        setEditing(null);
        setEditorOpen(true);
    };
    const openEdit = (r) => {
        setEditing(r);
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
        await runMutation(() => deleteRoute(target.public_id));
    };

    return (
        <div>
            <PageHeader
                title="Routes"
                description="Transfer and itinerary routes between destination cities, with optional intermediate stops."
                actions={canCreate ? <Button onClick={openNew}><Plus className="h-4 w-4" aria-hidden="true" /> New route</Button> : null}
            />

            {list.loading ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6"><SkeletonRows cols={5} /></div>
            ) : list.error ? (
                list.errorStatus === 403 ? (
                    <ForbiddenState module="routes" />
                ) : (
                    <EmptyState tone="error" title="Could not load routes" description={list.error} action={<Button variant="outline" onClick={list.reload}>Retry</Button>} />
                )
            ) : list.items.length === 0 ? (
                <EmptyState
                    title="No routes yet"
                    description="Create a route between two of your destinations."
                    action={canCreate ? <Button onClick={openNew}><Plus className="h-4 w-4" aria-hidden="true" /> New route</Button> : null}
                />
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <TableShell ariaLabel="Routes">
                        <thead>
                            <tr>
                                <Th>Title</Th>
                                <Th>Path</Th>
                                <Th>Stops</Th>
                                <Th>Days</Th>
                                <Th>Status</Th>
                                <Th className="text-right">Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.items.map((r) => (
                                <tr key={r.public_id} className="hover:bg-cream/60 transition-colors">
                                    <Td>
                                        <button type="button" onClick={() => setDetail(r)} className="text-navy font-semibold hover:text-bronze text-left">{r.title}</button>
                                        <span className="block text-xs text-gray-400">/routes/{r.slug}</span>
                                    </Td>
                                    <Td className="text-gray-500 max-w-[220px] truncate">
                                        {r.origin_destination?.name || '…'} → {r.end_destination?.name || '…'}
                                    </Td>
                                    <Td className="text-gray-500">{(r.stops || []).length}</Td>
                                    <Td>{r.duration_days || '—'}</Td>
                                    <Td><StatusBadge status={r.status} /></Td>
                                    <Td className="text-right whitespace-nowrap">
                                        <div className="inline-flex items-center gap-1">
                                            <Button variant="ghost" size="sm" iconOnly onClick={() => setDetail(r)} aria-label={`View ${r.title}`}><Eye className="h-4 w-4" /></Button>
                                            {canUpdate && <Button variant="ghost" size="sm" iconOnly onClick={() => openEdit(r)} aria-label={`Edit ${r.title}`}><Pencil className="h-4 w-4" /></Button>}
                                            {canPublish && r.status !== 'PUBLISHED' && (
                                                <Button variant="subtle" size="sm" onClick={() => runMutation(() => publishRoute(r.public_id))} disabled={!!busyAction}>Publish</Button>
                                            )}
                                            {canArchive && (
                                                <>
                                                    {r.status !== 'ARCHIVED' && <Button variant="outline" size="sm" onClick={() => runMutation(() => archiveRoute(r.public_id))} disabled={!!busyAction}>Archive</Button>}
                                                    <Button variant="ghost" size="sm" iconOnly onClick={() => setConfirmDelete(r)} aria-label={`Delete ${r.title}`} disabled={!!busyAction}><Trash2 className="h-4 w-4 text-red-700" /></Button>
                                                </>
                                            )}
                                        </div>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </TableShell>
                    <Pagination page={list.page} total={list.total} pageSize={20} onChange={list.setPage} label="routes" />
                </div>
            )}

            <RouteEditor open={editorOpen} initial={editing} onClose={() => setEditorOpen(false)} onSaved={() => list.reload()} />

            <Modal open={Boolean(detail)} title="Route details" onClose={() => setDetail(null)}>
                {detail && (
                    <div className="space-y-4 text-sm">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Title</dt><dd className="text-navy font-semibold">{detail.title}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Slug</dt><dd>{detail.slug}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Status</dt><dd><StatusBadge status={detail.status} /></dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Duration</dt><dd>{detail.duration_days ? `${detail.duration_days} days` : '—'}</dd>
                        </dl>
                        {(detail.stops || []).length > 0 ? (
                            <div>
                                <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-2">Itinerary</h4>
                                <ol className="space-y-1.5">
                                    <li className="flex items-center gap-2 text-navy"><MapPin className="h-4 w-4 text-bronze" /> {detail.origin_destination?.name || 'Origin'}</li>
                                    {(detail.stops || []).map((s, i) => (
                                        <li key={`${s.destination_public_id}-${i}`} className="flex items-center gap-2 pl-6 text-steel">
                                            <span className="text-[10px] font-bold text-bronze">STOP {i + 1}</span> {s.notes ? `${s.notes} (city ${s.destination_public_id.slice(0, 8)}…)` : `City ${s.destination_public_id.slice(0, 8)}…`}
                                        </li>
                                    ))}
                                    <li className="flex items-center gap-2 text-navy"><MapPin className="h-4 w-4 text-bronze" /> {detail.end_destination?.name || 'End'}</li>
                                </ol>
                                <p className="text-[11px] text-gray-400 mt-2">Stop city names resolve from the destinations the stops reference.</p>
                            </div>
                        ) : (
                            <p className="text-steel">{detail.origin_destination?.name || 'Origin'} → {detail.end_destination?.name || 'End'} (direct)</p>
                        )}
                        {detail.description && <p className="text-steel">{detail.description}</p>}
                    </div>
                )}
            </Modal>

            <ConfirmDialog
                open={Boolean(confirmDelete)}
                title="Delete route?"
                message={`"${confirmDelete?.title}" will be soft-deleted and hidden from the site.`}
                confirmLabel="Delete"
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(null)}
            />
        </div>
    );
}

export default AdminRoutes;