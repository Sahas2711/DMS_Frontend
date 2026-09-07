import { useEffect, useMemo, useState } from 'react';
import { errorMessage } from '../../services/api/client';

/**
 * Shared paginated admin-list state (loading/error/items/total + status filter).
 * `fetcher` must resolve to { items, meta: { total } }.
 *
 * Loading is *derived* from a request key rather than set synchronously inside
 * the effect: while the latest fetch is in flight the previous result no longer
 * matches the current key, so callers see the loading state.
 */
export function useAdminList({ fetcher, pageSize = 20, extraKey = '' }) {
    const [result, setResult] = useState({ key: null, items: [], total: 0, error: '', errorStatus: 0 });
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('');
    const [attempt, setAttempt] = useState(0);

    const key = `${status || 'all'}#${page}#${attempt}#${extraKey}`;

    useEffect(() => {
        let cancelled = false;
        fetcher({ page, page_size: pageSize, status: status || undefined })
            .then((data) => {
                if (cancelled) return;
                setResult({
                    key,
                    items: data.items ?? [],
                    total: data.meta?.total ?? 0,
                    error: '',
                    errorStatus: 0,
                });
            })
            .catch((err) => {
                if (cancelled) return;
                setResult({
                    key,
                    items: [],
                    total: 0,
                    error: errorMessage(err, 'Could not load this list.'),
                    errorStatus: err?.status || 0,
                });
            });
        return () => {
            cancelled = true;
        };
    }, [key, fetcher, page, status, attempt, pageSize, extraKey]);

    const loading = result.key !== key;

    return useMemo(
        () => ({
            loading,
            error: result.error,
            errorStatus: result.errorStatus,
            items: result.items,
            total: result.total,
            page,
            status,
            setPage,
            setStatus,
            reload: () => setAttempt((n) => n + 1),
        }),
        [loading, result.error, result.errorStatus, result.items, result.total, page, status]
    );
}