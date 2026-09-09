import { useCallback, useState } from 'react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AdminAuthContext';
import {
    archivePost,
    createPost,
    deletePost,
    fetchAdminPosts,
    publishPost,
    updatePost,
} from '../../services/api/adminApi';
import { resolveMediaUrl } from '../../services/api/cms';
import { errorMessage } from '../../services/api/client';
import { POST_CATEGORIES, POST_CATEGORY_LABEL } from '../../config/posts';
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
    category: 'TRAVEL GUIDES',
    tag: '',
    excerpt: '',
    body: '',
    cover_image_url: '',
    author: '',
    author_role: '',
    read_time_minutes: '',
    is_featured: false,
    display_order: 0,
};

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function PostEditor({ open, initial, onClose, onSaved }) {
    const isEdit = Boolean(initial?.public_id);
    const [form, setForm] = useState(() => ({
        ...emptyForm,
        ...(initial || {}),
        cover_image_url: initial?.cover_image_url || '',
        read_time_minutes: initial?.read_time_minutes ?? '',
        display_order: initial?.display_order ?? 0,
    }));
    const [seo, setSeo] = useState(initial?.seo_metadata || null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const media = useMediaOptions(true);

    const previewUrl = resolveMediaUrl(form.cover_image_url);

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
        set('cover_image_url', asset ? asset.url : '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        const payload = {
            title: form.title.trim(),
            slug: form.slug.trim(),
            category: form.category,
            tag: form.tag?.trim() || undefined,
            excerpt: form.excerpt?.trim() || undefined,
            body: form.body?.trim() || undefined,
            cover_image_url: form.cover_image_url?.trim() || undefined,
            author: form.author?.trim() || undefined,
            author_role: form.author_role?.trim() || undefined,
            read_time_minutes: form.read_time_minutes === '' || form.read_time_minutes == null ? undefined : Number(form.read_time_minutes),
            is_featured: Boolean(form.is_featured),
            display_order: Number(form.display_order) || 0,
            seo_metadata: seo && Object.keys(seo).some((k) => seo[k] !== undefined && seo[k] !== '') ? seo : undefined,
        };

        setSaving(true);
        try {
            if (isEdit) {
                await updatePost(initial.public_id, payload);
            } else {
                await createPost(payload);
            }
            onSaved();
            onClose();
        } catch (err) {
            setError(errorMessage(err, 'Could not save post.'));
            if (err.fieldErrors) setFieldErrors(err.fieldErrors);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            open={open}
            wide
            title={isEdit ? `Edit post — ${initial.title}` : 'New post'}
            onClose={onClose}
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit" form="post-form" loading={saving}>{saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create post'}</Button>
                </>
            }
        >
            <form id="post-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                {error && <EmptyState tone="error" title="Could not save" description={error} />}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <Input id="title" label="Title" required value={form.title} onChange={(e) => onTitleChange(e.target.value)} error={fieldErrors.title} placeholder="Hanoi's hidden cafés & architecture" />
                    </div>
                    <Input id="slug" label="Slug" required pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$" value={form.slug} onChange={(e) => set('slug', slugify(e.target.value))} error={fieldErrors.slug} hint="Lowercase letters, numbers and hyphens." placeholder="hanois-hidden-cafes" />
                    <Select id="category" label="Category" required value={form.category} onChange={(e) => set('category', e.target.value)} error={fieldErrors.category}>
                        {POST_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </Select>
                    <Input id="tag" label="Tag / badge" maxLength={60} value={form.tag || ''} onChange={(e) => set('tag', e.target.value)} hint="Short uppercase badge shown on the card, e.g. EDITOR'S DISPATCH." placeholder="EDITOR'S DISPATCH" />
                    <div className="grid grid-cols-2 gap-4">
                        <Input id="read_time_minutes" label="Read time (min)" type="number" min="1" max="600" value={form.read_time_minutes} onChange={(e) => set('read_time_minutes', e.target.value)} error={fieldErrors.read_time_minutes} />
                        <Input id="display_order" label="Display order" type="number" value={form.display_order} onChange={(e) => set('display_order', e.target.value)} />
                    </div>
                </div>

                <Textarea id="excerpt" label="Excerpt" rows={3} maxLength={1000} value={form.excerpt || ''} onChange={(e) => set('excerpt', e.target.value)} hint="Short teaser shown on cards and search results." placeholder="A few sentences that make readers want to open the story." />
                <Textarea id="body" label="Body" rows={10} value={form.body || ''} onChange={(e) => set('body', e.target.value)} hint="Separate paragraphs with a blank line. Plain text only." placeholder={'First paragraph…\n\nSecond paragraph…'} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <Select id="cover_media" label="Cover image (media library)" value={form.cover_image_url ? media.options.find((m) => m.url === form.cover_image_url)?.public_id || '' : ''} onChange={(e) => pickMedia(e.target.value)}>
                        <option value="">No image</option>
                        {media.options.map((m) => (
                            <option key={m.public_id} value={m.public_id}>{m.alt_text || m.url}</option>
                        ))}
                    </Select>
                    <Input id="cover_image_url" label="…or paste an image URL" type="url" maxLength={500} value={form.cover_image_url} onChange={(e) => set('cover_image_url', e.target.value)} error={fieldErrors.cover_image_url} placeholder="https://… or /uploads/…" />
                </div>
                {previewUrl && (
                    <div className="rounded-xl overflow-hidden border border-gray-100">
                        <img src={previewUrl} alt="Cover preview" className="w-full max-h-52 object-cover" />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input id="author" label="Author" maxLength={100} value={form.author || ''} onChange={(e) => set('author', e.target.value)} placeholder="Byline, e.g. Cultural Desk" />
                    <Input id="author_role" label="Author role" maxLength={100} value={form.author_role || ''} onChange={(e) => set('author_role', e.target.value)} placeholder="e.g. Content Editor" />
                </div>

                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={Boolean(form.is_featured)}
                        onChange={(e) => set('is_featured', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-[#731E2A] focus:ring-[#731E2A]"
                    />
                    Feature this story on the journal cover
                </label>

                <SeoFields value={seo} onChange={setSeo} />
            </form>
        </Modal>
    );
}

function AdminBlogs() {
    const { can } = useAuth();
    const [categoryFilter, setCategoryFilter] = useState('');
    const fetcher = useCallback(
        (params) => fetchAdminPosts({ ...params, sort: 'display_order', category: categoryFilter || undefined }),
        [categoryFilter]
    );
    const list = useAdminList({ fetcher, extraKey: 'posts' });

    const [editing, setEditing] = useState(null);
    const [editorOpen, setEditorOpen] = useState(false);
    const [detail, setDetail] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [busyAction, setBusyAction] = useState('');

    const canCreate = can('posts.create');
    const canUpdate = can('posts.update');
    const canPublish = can('posts.publish');
    const canArchive = can('posts.archive');

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
        await runMutation(() => deletePost(target.public_id));
    };

    const refreshWithFilters = () => {
        list.setPage(1);
        list.reload();
    };

    return (
        <div>
            <PageHeader
                title="Blog Posts"
                description="Every story across the travel journal. Draft, edit and publish — seeds already include the five static editorial features."
                actions={canCreate ? <Button onClick={openNew}><Plus className="h-4 w-4" aria-hidden="true" /> New post</Button> : null}
            />

            <div className="flex flex-wrap items-center gap-2 mb-4">
                <label htmlFor="post-status" className="sr-only">Filter by status</label>
                <select
                    id="post-status"
                    value={list.status}
                    onChange={(e) => { list.setPage(1); list.setStatus(e.target.value); }}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-navy bg-white"
                >
                    <option value="">All statuses</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                    <option value="ARCHIVED">Archived</option>
                </select>

                <label htmlFor="post-category" className="sr-only">Filter by category</label>
                <select
                    id="post-category"
                    value={categoryFilter}
                    onChange={(e) => { setCategoryFilter(e.target.value); refreshWithFilters(); }}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-navy bg-white"
                >
                    <option value="">All categories</option>
                    {POST_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
            </div>

            {list.loading ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6"><SkeletonRows cols={5} /></div>
            ) : list.error ? (
                list.errorStatus === 403 ? (
                    <ForbiddenState module="blog posts" />
                ) : (
                    <EmptyState tone="error" title="Could not load posts" description={list.error} action={<Button variant="outline" onClick={list.reload}>Retry</Button>} />
                )
            ) : list.items.length === 0 ? (
                <EmptyState
                    title={list.status || categoryFilter ? 'No matching posts' : 'No posts yet'}
                    description={canCreate ? 'Create your first post or change the filters.' : 'There are no posts to show.'}
                    action={canCreate ? <Button onClick={openNew}><Plus className="h-4 w-4" aria-hidden="true" /> New post</Button> : null}
                />
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <TableShell ariaLabel="Blog posts">
                        <thead>
                            <tr>
                                <Th>Title</Th>
                                <Th>Category</Th>
                                <Th>Featured</Th>
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
                                        <span className="block text-xs text-gray-400">/blog/{p.slug}</span>
                                    </Td>
                                    <Td className="text-gray-500">{POST_CATEGORY_LABEL[p.category] || p.category}</Td>
                                    <Td>{p.is_featured ? <span className="text-bronze font-bold">★ Featured</span> : '—'}</Td>
                                    <Td><StatusBadge status={p.status} /></Td>
                                    <Td className="text-xs text-gray-500 whitespace-nowrap">{p.updated_at ? new Date(p.updated_at).toLocaleDateString() : '—'}</Td>
                                    <Td className="text-right whitespace-nowrap">
                                        <div className="inline-flex items-center gap-1">
                                            <Button variant="ghost" size="sm" iconOnly onClick={() => setDetail(p)} aria-label={`View ${p.title}`}><Eye className="h-4 w-4" /></Button>
                                            {canUpdate && <Button variant="ghost" size="sm" iconOnly onClick={() => openEdit(p)} aria-label={`Edit ${p.title}`}><Pencil className="h-4 w-4" /></Button>}
                                            {canPublish && p.status !== 'PUBLISHED' && (
                                                <Button variant="subtle" size="sm" onClick={() => runMutation(() => publishPost(p.public_id))} disabled={!!busyAction}>Publish</Button>
                                            )}
                                            {canArchive && (
                                                <>
                                                    {p.status !== 'ARCHIVED' && <Button variant="outline" size="sm" onClick={() => runMutation(() => archivePost(p.public_id))} disabled={!!busyAction}>Archive</Button>}
                                                    <Button variant="ghost" size="sm" iconOnly onClick={() => setConfirmDelete(p)} aria-label={`Delete ${p.title}`} disabled={!!busyAction}><Trash2 className="h-4 w-4 text-red-700" /></Button>
                                                </>
                                            )}
                                        </div>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </TableShell>
                    <Pagination page={list.page} total={list.total} pageSize={20} onChange={list.setPage} label="posts" />
                </div>
            )}

            <PostEditor open={editorOpen} initial={editing} onClose={() => setEditorOpen(false)} onSaved={() => list.reload()} />

            <Modal open={Boolean(detail)} title="Post details" onClose={() => setDetail(null)}>
                {detail && (
                    <div className="space-y-4 text-sm">
                        {detail.cover_image_url && (
                            <div className="rounded-xl overflow-hidden border border-gray-100">
                                <img src={resolveMediaUrl(detail.cover_image_url)} alt="" className="w-full max-h-48 object-cover" />
                            </div>
                        )}
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Title</dt><dd className="text-navy font-semibold">{detail.title}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Slug</dt><dd>/blog/{detail.slug}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Category</dt><dd>{POST_CATEGORY_LABEL[detail.category] || detail.category}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Tag</dt><dd>{detail.tag || '—'}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Status</dt><dd><StatusBadge status={detail.status} /></dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Featured</dt><dd>{detail.is_featured ? 'Yes' : 'No'}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Author</dt><dd>{detail.author || '—'}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Role</dt><dd>{detail.author_role || '—'}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Read time</dt><dd>{detail.read_time_minutes ? `${detail.read_time_minutes} min` : '—'}</dd>
                            <dt className="text-xs text-gray-400 uppercase tracking-wide">Published</dt><dd>{detail.published_at ? new Date(detail.published_at).toLocaleDateString() : '—'}</dd>
                        </dl>
                        {detail.excerpt && <p className="text-steel">{detail.excerpt}</p>}
                        {detail.body && <p className="text-steel whitespace-pre-line">{detail.body}</p>}
                    </div>
                )}
            </Modal>

            <ConfirmDialog
                open={Boolean(confirmDelete)}
                title="Delete post?"
                message={`"${confirmDelete?.title}" will be soft-deleted and hidden from the site.`}
                confirmLabel="Delete"
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(null)}
            />
        </div>
    );
}

export default AdminBlogs;