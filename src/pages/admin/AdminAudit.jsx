import { useEffect, useState } from 'react';
import { ShieldQuestion } from 'lucide-react';
import { fetchAuditLogs } from '../../services/api/adminApi';
import {
    Button,
    EmptyState,
    ForbiddenState,
    Input,
    Modal,
    PageHeader,
    Pagination,
    Select,
    SkeletonRows,
    TableShell,
    Td,
    Th,
} from '../../components/admin/ui';

const ENTITY_TYPES = [
    'user', 'role', 'destination', 'tour', 'route', 'media', 'enquiry', 'auth',
];

function actionLabel(action) {
    return action.replace(/_/g, ' ');
}

function AuditMeta({ metadata }) {
    if (!metadata || Object.keys(metadata).length === 0) return '—';
    return (
        <pre className="text-[11px] text-steel bg-cream rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(metadata, null, 2)}
        </pre>
    );
}

function AdminAudit() {
    const [filters, setFilters] = useState({ actor_id: '', entity_type: '', success: '' });
    const [page, setPage] = useState(1);
    const [loadedKey, setLoadedKey] = useState(null);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState('');
    const [errorStatus, setErrorStatus] = useState(null);
    const [attempt, setAttempt] = useState(0);
    const [row, setRow] = useState(null);

    const key = `audit#${page}#${attempt}#${filters.actor_id}#${filters.entity_type}#${filters.success}`;
    const loading = loadedKey !== key;

    useEffect(() => {
        let cancelled = false;
        const params = { page, page_size: 20 };
        if (filters.actor_id.trim()) params.actor_id = filters.actor_id.trim();
        if (filters.entity_type) params.entity_type = filters.entity_type;
        if (filters.success !== '') params.success = filters.success === 'true';
        fetchAuditLogs(params)
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
                setError(err.message || 'Could not load audit logs.');
                setErrorStatus(err.status || null);
                setItems([]);
                setTotal(0);
                setLoadedKey(key);
            });
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps -- key encodes the inputs
    }, [key]);

    const applyFilters = () => {
        setPage(1);
        setAttempt((n) => n + 1);
    };

    return (
        <div>
            <PageHeader
                title="Audit log"
                description="Every admin action is recorded here with the actor and outcome."
            />

            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Input
                    id="audit-actor"
                    label="Actor"
                    value={filters.actor_id}
                    onChange={(e) => setFilters((f) => ({ ...f, actor_id: e.target.value }))}
                    placeholder="Public user id or email"
                />
                <Select id="audit-entity" label="Entity type" value={filters.entity_type} onChange={(e) => setFilters((f) => ({ ...f, entity_type: e.target.value }))}>
                    <option value="">All</option>
                    {ENTITY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </Select>
                <Select id="audit-success" label="Outcome" value={filters.success} onChange={(e) => setFilters((f) => ({ ...f, success: e.target.value }))}>
                    <option value="">All</option>
                    <option value="true">Success</option>
                    <option value="false">Failure</option>
                </Select>
                <div className="flex items-end">
                    <Button onClick={applyFilters} variant="outline" className="w-full">Apply filters</Button>
                </div>
            </div>

            {loading ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6"><SkeletonRows cols={5} /></div>
            ) : error ? (
                errorStatus === 403 ? (
                    <ForbiddenState module="audit log" />
                ) : (
                    <EmptyState tone="error" title="Could not load audit logs" description={error} action={<Button variant="outline" onClick={() => setAttempt((n) => n + 1)}>Retry</Button>} />
                )
            ) : items.length === 0 ? (
                <EmptyState title="No matching entries" description={<span className="inline-flex items-center gap-1.5"><ShieldQuestion className="h-4 w-4" aria-hidden="true" /> Try clearing the filters.</span>} />
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <TableShell ariaLabel="Audit log">
                        <thead>
                            <tr>
                                <Th>Time</Th>
                                <Th>Actor</Th>
                                <Th>Action</Th>
                                <Th>Entity</Th>
                                <Th>Outcome</Th>
                                <Th className="text-right">Details</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((log) => (
                                <tr key={log.id} className="hover:bg-cream/60 transition-colors">
                                    <Td className="whitespace-nowrap text-xs text-gray-500">{log.created_at ? new Date(log.created_at).toLocaleString() : '—'}</Td>
                                    <Td className="text-xs text-navy">{log.actor_id || 'system'}</Td>
                                    <Td className="text-navy font-semibold text-xs uppercase tracking-wide">{actionLabel(log.action)}</Td>
                                    <Td className="text-xs">
                                        <span className="text-gray-400">{log.entity_type}</span>
                                        <span className="text-gray-500"> · {log.entity_id}</span>
                                    </Td>
                                    <Td>
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${log.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                            {log.success ? 'Success' : 'Failure'}
                                        </span>
                                    </Td>
                                    <Td className="text-right">
                                        <Button variant="ghost" size="sm" onClick={() => setRow(log)} aria-label="View entry details">View</Button>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </TableShell>
                    <Pagination page={page} total={total} pageSize={20} onChange={setPage} label="entries" />
                </div>
            )}

            <Modal open={Boolean(row)} title="Audit entry" onClose={() => setRow(null)}>
                {row && (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">Action</dt><dd className="text-navy font-semibold uppercase text-xs">{actionLabel(row.action)}</dd>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">Outcome</dt><dd>{row.success ? 'Success' : 'Failure'}</dd>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">Entity</dt><dd>{row.entity_type} · {row.entity_id}</dd>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">Actor</dt><dd>{row.actor_id || 'system'}</dd>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">Time</dt><dd>{row.created_at ? new Date(row.created_at).toLocaleString() : '—'}</dd>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide sm:col-span-2">IP</dt><dd className="sm:col-span-2">{row.ip_address || '—'}</dd>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide sm:col-span-2">Metadata</dt>
                        <dd className="sm:col-span-2"><AuditMeta metadata={row.metadata} /></dd>
                    </dl>
                )}
            </Modal>
        </div>
    );
}

export default AdminAudit;