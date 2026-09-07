import { useEffect, useRef, useState } from 'react';
import { ImageOff, Trash2, Upload } from 'lucide-react';
import { useAuth } from '../../context/AdminAuthContext';
import { deleteMediaAsset, fetchMediaAssets, uploadMediaAsset } from '../../services/api/adminApi';
import { errorMessage } from '../../services/api/client';
import {
    Button,
    ConfirmDialog,
    EmptyState,
    ForbiddenState,
    Input,
    PageHeader,
    Pagination,
    SkeletonRows,
} from '../../components/admin/ui';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function fileSize(bytes) {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function AdminMedia() {
    const { can } = useAuth();
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loadedKey, setLoadedKey] = useState(null);
    const [error, setError] = useState('');
    const [errorStatus, setErrorStatus] = useState(null);
    const [attempt, setAttempt] = useState(0);

    const [toUpload, setToUpload] = useState(null);
    const [altText, setAltText] = useState('');
    const [caption, setCaption] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    const [confirmDelete, setConfirmDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const fileInputRef = useRef(null);

    const canCreate = can('media.create');
    const canDelete = can('media.delete');

    const key = `media#${page}#${attempt}`;
    const loading = loadedKey !== key;

    useEffect(() => {
        let cancelled = false;
        fetchMediaAssets({ page, page_size: 24 })
            .then((data) => {
                if (cancelled) return;
                setItems(data.items || []);
                setTotal(data.meta?.total || 0);
                setError('');
                setErrorStatus(null);
                setLoadedKey(key);
            })
            .catch((err) => {
                if (cancelled) return;
                setItems([]);
                setError(errorMessage(err, 'Could not load media.'));
                setErrorStatus(err.status || null);
                setLoadedKey(key);
            });
        return () => {
            cancelled = true;
        };
    }, [key, page, attempt]);

    const pickFile = (file) => {
        setUploadError('');
        if (!file) return;
        if (!ACCEPTED_TYPES.includes(file.type)) {
            setUploadError('Only JPEG, PNG and WebP images are accepted.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('The maximum upload size is 5 MB.');
            return;
        }
        setToUpload(file);
        setAltText(file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '));
        setCaption('');
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!toUpload) return;
        setUploading(true);
        setUploadError('');
        try {
            await uploadMediaAsset({ file: toUpload, alt_text: altText.trim() || undefined, caption: caption.trim() || undefined });
            setToUpload(null);
            setAltText('');
            setCaption('');
            setPage(1);
            setAttempt((n) => n + 1);
        } catch (err) {
            setUploadError(errorMessage(err, 'Upload failed.'));
        } finally {
            setUploading(false);
            fileInputRef.current.value = '';
        }
    };

    const handleDelete = async () => {
        const target = confirmDelete;
        setConfirmDelete(null);
        setDeleting(true);
        try {
            await deleteMediaAsset(target.public_id);
            setAttempt((n) => n + 1);
        } catch (err) {
            window.alert(errorMessage(err, 'Could not delete the asset.'));
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div>
            <PageHeader
                title="Media library"
                description="Images used across the site as hero shots and card art. JPEG, PNG and WebP up to 5 MB."
                actions={
                    canCreate ? (
                        <Button onClick={() => fileInputRef.current?.click()}><Upload className="h-4 w-4" aria-hidden="true" /> Upload image</Button>
                    ) : null
                }
            />

            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                aria-hidden="true"
                onChange={(e) => pickFile(e.target.files?.[0])}
            />

            {toUpload && (
                <form onSubmit={handleUpload} className="bg-white rounded-2xl border border-bronze/40 p-5 mb-6 space-y-4">
                    <div className="flex items-start gap-4">
                        {toUpload.type?.startsWith('image/') && (
                            <img src={URL.createObjectURL(toUpload)} alt="Preview" className="h-20 w-28 object-cover rounded-lg border border-gray-100" />
                        )}
                        <div className="text-xs text-gray-500">
                            <p className="font-semibold text-navy text-sm">{toUpload.name}</p>
                            <p>{fileSize(toUpload.size)} · {toUpload.type}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input id="media-alt" label="Alt text" maxLength={500} value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Describe the image for screen-readers and SEO" />
                        <Input id="media-caption" label="Caption" maxLength={1000} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Optional caption" />
                    </div>
                    {uploadError && <p className="text-sm text-red-700">{uploadError}</p>}
                    <div className="flex gap-2">
                        <Button type="submit" loading={uploading}>{uploading ? 'Uploading…' : 'Upload image'}</Button>
                        <Button type="button" variant="outline" onClick={() => { setToUpload(null); fileInputRef.current.value = ''; }}>Cancel</Button>
                    </div>
                </form>
            )}

            {loading ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6"><SkeletonRows cols={3} rows={6} /></div>
            ) : error ? (
                errorStatus === 403 ? (
                    <ForbiddenState module="media" />
                ) : (
                    <EmptyState tone="error" title="Could not load media" description={error} action={<Button variant="outline" onClick={() => setAttempt((n) => n + 1)}>Retry</Button>} />
                )
            ) : items.length === 0 ? (
                <EmptyState
                    title="No images yet"
                    description={canCreate ? 'Upload the first image and it will appear here for use across the site.' : 'There are no images to show.'}
                    action={canCreate ? <Button onClick={() => fileInputRef.current?.click()}><Upload className="h-4 w-4" aria-hidden="true" /> Upload image</Button> : null}
                />
            ) : (
                <>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {items.map((m) => (
                            <li key={m.public_id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                                <div className="relative aspect-[4/3] bg-cream">
                                    {m.url ? (
                                        <img src={m.url} alt={m.alt_text || m.caption || 'Media asset'} loading="lazy" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-gray-300"><ImageOff className="h-8 w-8" aria-hidden="true" /></div>
                                    )}
                                    {canDelete && (
                                        <button
                                            type="button"
                                            onClick={() => setConfirmDelete(m)}
                                            disabled={deleting}
                                            className="absolute top-2 right-2 p-2 rounded-lg bg-white/90 text-red-700 shadow-sm opacity-100 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100 transition-opacity"
                                            aria-label={`Delete ${m.alt_text || 'this image'}`}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                                <div className="p-3">
                                    <p className="text-xs font-semibold text-navy truncate">{m.alt_text || 'Untitled'}</p>
                                    <p className="text-[11px] text-gray-400 truncate">
                                        {m.mime_type || 'image'} {m.width && m.height ? `· ${m.width}×${m.height}` : ''} {m.file_size ? `· ${fileSize(m.file_size)}` : ''}
                                    </p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">{m.caption || ''}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Pagination page={page} total={total} pageSize={24} onChange={setPage} label="images" />
                </>
            )}

            <ConfirmDialog
                open={Boolean(confirmDelete)}
                title="Delete this image?"
                message={deleting ? 'Deleting…' : `"${confirmDelete?.alt_text || 'Untitled'}" will be permanently removed and removed from any content item that references it.`}
                confirmLabel="Delete"
                confirmDisabled={deleting}
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(null)}
            />
        </div>
    );
}

export default AdminMedia;