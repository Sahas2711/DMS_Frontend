import { useCallback, useState } from 'react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AdminAuthContext';
import {
    archiveSpecialOffer,
    createSpecialOffer,
    deleteSpecialOffer,
    fetchAdminSpecialOffers,
    publishSpecialOffer,
    updateSpecialOffer,
} from '../../services/api/adminApi';
import { resolveMediaUrl } from '../../services/api/cms';
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
    Th,
} from '../../components/admin/ui';

const emptyForm = {
    tag: '',
    title: '',
    slug: '',
    location: '',
    image_url: '',
    display_order: 0,
};

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function OfferEditor({ open, initial, onClose, onSaved }) {
    const isEdit = Boolean(initial?.public_id);
    const [form, setForm] = useState(() => ({
        ...emptyForm,
        ...(initial || {}),
        image_url: initial?.image_url || '',
        display_order: initial?.display_order ?? 0,
    }));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const media = useMediaOptions(true);

    const previewUrl = resolveMediaUrl(form.image_url);

    const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

    const onTitleChange = (value) => {
        setForm((f) => ({
            ...f,
            title: value,
            slug: f.slug === '' || f.slug === slugify(f.title) ? slugify(value) : f.slug,
        }));
    };

    const pickMedia = (publicId) => {
        const asset = media.options.find((m) => m.public_id === publicId);
        set('image_url', asset ? asset.url : '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        const payload = {
            tag: form.tag?.trim() || undefined,
            title: form.title.trim(),
            slug: form.slug.trim(),
            location: form.location?.trim() || undefined,
            image_url: form.image_url?.trim() || undefined,
            display_order: Number(form.display_order) || 0,
        };

        setSaving(true);
        try {
            if (isEdit) {
                await updateSpecialOffer(initial.public_id, payload);
            } else {
                await createSpecialOffer(payload);
            }
            onSaved();
            onClose();
        } catch (err) {
            setError(errorMessage(err, 'Could not save special offer.'));
            if (err.fieldErrors) setFieldErrors(err.fieldErrors);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            open={open}
            wide
            title={isEdit ? `Edit offer — ${initial.title}` : 'New special offer'}
            onClose={onClose}
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit" form="offer-form" loading={saving}>{saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create offer'}</Button>
                </>
            }
        >
            <form id="offer-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                {error && <EmptyState tone="error" title="Could not save" description={error} />}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <Input id="title" label="Title" required value={form.title} onChange={(e) => onTitleChange(e.target.value)} error={fieldErrors.title} placeholder="Emirates Palace Abu Dhabi" />
                    </div>
                    <Input id="slug" label="Slug" required pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$" value={form.slug} onChange={(e) => set('slug', slugify(e.target.value))} error={fieldErrors.slug} hint="Lowercase letters, numbers and hyphens." placeholder="emirates-palace-abu-dhabi" />
                    <Input id="display_order" label="Display order" type="number" value={form.display_order} onChange={(e) => set('display_order', e.target.value)} hint="Lower numbers appear first on the page." />
                    <Input id="tag" label="Tag / badge" maxLength={60} value={form.tag || ''} onChange={(e) => set('tag', e.target.value)} hint="Short badge shown on the card, e.g. Stay 4 nights, pay for 3." placeholder="Stay 4 nights, pay for 3" />
                    <Input id="location" label="Location" maxLength={250} value={form.location || ''} onChange={(e) => set('location', e.target.value)} placeholder="Abu Dhabi, United Arab Emirates" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <Select id="image_media" label="Image (media library)" value={form.image_url ? media.options.find((m) => m.url === form.image_url)?.public_id || '' : ''} onChange={(e) => pickMedia(e.target.value)}>
                        <option value="">No image</option>
                        {media.options.map((m) => (
                            <option key={m.public_id} value={m.public_id}>{m.alt_text || m.url}</option>
                        ))}
                    </Select>
                    <Input id="image_url" label="…or paste an image URL" type="url" maxLength={500} value={form.image_url} onChange={(e) => set('image_url', e.target.value)} error={fieldErrors.image_url} placeholder="https://… or /uploads/…" hint="Leave empty to keep the card's bundled image." />
                </div>
                {previewUrl && (
                    <div className="rounded-xl overflow-hidden border border-gray-100">
                        <img src={previewUrl} alt="Offer preview" className="w-full max-h-52 object-cover" />
                    </div>
                )}
            </form>
        </Modal>
    );
}

function AdminSpecialOffers() {
    const { can } = useAuth();
    const fetcher = useCallback(
        (params) => fetchAdminSpecialOffers({ ...params, sort: 'display_order' }),
        []
    );
    const list = useAdminList({ fetcher, extraKey: 'special-offers' });

    const [editing, setEditing] = useState(null);
    const [editorOpen, setEditorOpen] = useState(false);
    const [detail, setDetail] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [busyAction, setBusyAction] = useState('');

    const canCreate = can('special-offers.create');
    const canUpdate = can('special-offers.update');
    const canPublish = can('special-offers.publish');
    const canArchive = can('special-offers.archive');

    const openNew = () => {
        setEditing(null);
        setEditorOpen(true);
    };
    const openEdit = (p) => {
        setEditing(p);
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
        await runMutation(() => deleteSpecialOffer(target.public_id));
    };

    return (
        <div>
            <PageHeader
                title="Special Offers"
                description="Hotel offers shown on the tours page, in display order. Draft, edit and publish — seeds already include the eleven static offers."
                actions={canCreate ? <Button onClick={openNew}><Plus className="h-4 w-4" aria-hidden="true" /> New offer</Button> : null}
            />

            <div className="flex flex-wrap items-center gap-2 mb-4">
                <label htmlFor="offer-status" className="sr-only">Filter by status</label>
                <select
                    id="offer-status"
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
                    <ForbiddenState module="special offers" />
                ) : (
                    <EmptyState tone="error" title="Could not load special offers" description={list.error} action={<Button variant="outline" onClick={list.reload}>Retry</Button>} />
                )
            ) : list.items.length === 0 ? (
                <EmptyState
                    title={list.status ? 'No matching offers' : 'No special offers yet'}
                    description={canCreate ? 'Create your first special offer or change the filters.' : 'There are no special offers to show.'}
                    action={canCreate ? <Button onClick={openNew}><Plus className="h-4 w-4" aria-hidden="true" /> New offer</Button> : null}
                />
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <TableShell ariaLabel="Special offers">
                        <thead>
                            <tr>
                                <Th>Title</Th>
                                <Th>Tag</Th>
                                <Th>Location</Th>
                                <Th>Order</Th>
                                <Th>Status</Th>
                                <Th>Updated</Th>
                                <Th className="text-right">Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.items.map((p) => (
                                <tr key={p.public_id} className="hover:bg-cream/60 transition-colors">
                                    <Td>
                                        <button type="button" onClick={() => setDetail(p)} className="text-navy font-semibold hover:text-bronze text-left">
                                            {p.title}
                                        </button>
                                        <span className="block text-xs text-gray-400">/{p.slug}</span>
                                    </Td>
                                    <Td className="text-gray-500">{p.tag || '—'}</Td>
                                    <Td className="text-gray-500">{p.location || '—'}</Td>
                                    <Td className="text-gray-500">{p.display_order}</Td>
                                    <Td><StatusBadge status={p.status} /></Td>
                                    <Td className="text-xs text-gray-500 whitespace-nowrap">{p.updated_at ? new Date(p.updated_at).toLocaleDateString() : '—'}</Td>
                                    <Td className="text-right whitespace-nowrap">
                                        <div className="inline-flex items-center gap-1">
                                            <Button variant="ghost" size="sm" iconOnly onClick={() => setDetail(p)} aria-label={`View ${p.title}`}><Eye className="h-4 w-4" /></Button>
                                            {canUpdate && <Button variant="ghost" size="sm" iconOnly onClick={() => openEdit(p)} aria-label={`Edit ${p.title}`}><Pencil className="h-4 w-4" /></Button>}
                                            {canPublish && p.status !== 'PUBLISHED' && (
                                                <Button variant="subtle" size="sm" onClick={() => runMutation(() => publishSpecialOffer(p.public_id))} disabled={!!busyAction}>Publish</Button>
                                            )}
                                            {canArchive && (
                                                <>
                                                    {p.status !== 'ARCHIVED' && <Button variant="outline" size="sm" onClick={() => runMutation(() => archiveSpecialOffer(p.public_id))} disabled={!!busyAction}>Archive</Button>}
                                                    <Button variant="ghost" size="sm" iconOnly onClick={() => setConfirmDelete(p)} aria-label={`Delete ${p.title}`} disabled={!!busyAction}><Trash2 className="h-4 w-4 text-red-700" /></Button>
                                                </>
                                            )}
                                        </div>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </TableShell>
                    <Pagination page={list.page} total={list.total} pageSize={20} onChange={list.setPage} label="special offers" />
                </div>
            )}

            <OfferEditor open={editorOpen} initial={editing} onClose={() => setEditorOpen(false)} onSaved={() => list.reload()} />

            <Modal open={Boolean(detail)} title="Special offer details" onClose={() => setDetail(null)}>
                {detail && (
                    <div className="space-y-4 text-sm">
                        {detail.image_url && (
                            <div className="rounded-xl overflow-hidden border border-gray-100">
                                <img src={resolveMediaUrl(detail.image_url)} alt="" className="w-full max-h-48 object-cover" />
                            </div>
                        )}
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Title</dt><dd className="text-navy font-semibold">{detail.title}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Slug</dt><dd>/{detail.slug}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Tag</dt><dd>{detail.tag || '—'}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Location</dt><dd>{detail.location || '—'}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Display order</dt><dd>{detail.display_order}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Status</dt><dd><StatusBadge status={detail.status} /></dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Published</dt><dd>{detail.published_at ? new Date(detail.published_at).toLocaleDateString() : '—'}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Updated</dt><dd>{detail.updated_at ? new Date(detail.updated_at).toLocaleDateString() : '—'}</dd>
                        </dl>
                    </div>
                )}
            </Modal>

            <ConfirmDialog
                open={Boolean(confirmDelete)}
                title="Delete special offer?"
                message={`"${confirmDelete?.title}" will be soft-deleted and hidden from the site.`}
                confirmLabel="Delete"
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(null)}
            />
        </div>
    );
}

export default AdminSpecialOffers;