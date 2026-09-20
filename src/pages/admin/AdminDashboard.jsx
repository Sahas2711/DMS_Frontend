import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AdminAuthContext';
import { fetchAdminDashboard } from '../../services/api/adminApi';
import { errorMessage } from '../../services/api/client';
import {
    Button,
    EmptyState,
    PageHeader,
    ReadBadge,
    Spinner,
    TableShell,
    Td,
    Th,
} from '../../components/admin/ui';
import { TRIP_TYPE_BY_VALUE } from '../../config/enquiry';

const ENQUIRY_LABELS = {
    'request-quote': 'Request Quote',
    partner: 'Become a Partner',
    contact: 'Contact',
};

function StatCard({ label, value, to, toLabel, tone = 'navy', sub }) {
    const tones = {
        navy: 'bg-navy text-white',
        bronze: 'bg-[#8c7a53] text-white',
        dark: 'bg-[#731E2A] text-white',
        light: 'bg-white text-navy border border-gray-100',
    };
    return (
        <div className={`rounded-2xl p-5 shadow-sm flex flex-col gap-1 ${tones[tone]}`}>
            <span className="text-[10px] font-bold tracking-wider uppercase opacity-70">{label}</span>
            <span className="text-3xl font-serif font-bold">{value}</span>
            {sub && <p className="text-xs opacity-80 mt-1">{sub}</p>}
            {to && (
                <Link to={to} className="text-xs font-bold uppercase tracking-wider underline underline-offset-2 mt-3 hover:opacity-80">
                    {toLabel || 'View'}
                </Link>
            )}
        </div>
    );
}

const EMPTY_COUNTS = { published: 0, draft: 0, archived: 0 };

const EMPTY = {
    loading: true,
    error: null,
    destinations: EMPTY_COUNTS,
    tours: EMPTY_COUNTS,
    routes: EMPTY_COUNTS,
    tours_by_category: {},
    media_total: 0,
    users_total: 0,
    active_users: 0,
    unread_request_quote: 0,
    unread_partner: 0,
    unread_contact: 0,
    unread_total: 0,
    recent_enquiries: [],
    recent_audit: [],
};

const totalOf = (counts) => counts.published + counts.draft + counts.archived;

const AdminDashboard = () => {
    const { user, can } = useAuth();
    const [data, setData] = useState(EMPTY);
    const [attempt, setAttempt] = useState(0);

    // Requests are keyed so loading is derived (previous result no longer
    // matches the in-flight key) instead of set synchronously in the effect.
    const key = `dash#${attempt}`;

    useEffect(() => {
        let cancelled = false;

        fetchAdminDashboard()
            .then((result) => {
                if (cancelled) return;
                setData({ ...EMPTY, ...(result || {}), key, loading: false });
            })
            .catch((err) => {
                if (cancelled) return;
                setData({ ...EMPTY, key, loading: false, error: errorMessage(err, 'Dashboard could not be loaded.') });
            });

        return () => {
            cancelled = true;
        };
    }, [key]);

    const loading = data.loading || data.key !== key;

    const categoryBreakdown = useMemo(
        () => Object.entries(data.tours_by_category || {}).sort((a, b) => b[1] - a[1]),
        [data.tours_by_category]
    );

    const activeUsers = data.active_users || 0;

    if (loading) {
        return (
            <div className="py-16">
                <Spinner label="Loading dashboard…" />
            </div>
        );
    }

    const destTotal = totalOf(data.destinations);
    const tourTotal = totalOf(data.tours);
    const routeTotal = totalOf(data.routes);
    const hasAny = Boolean(
        destTotal || tourTotal || routeTotal || data.media_total || data.users_total || data.recent_enquiries.length || data.recent_audit.length
    );
    const pipelineRows = [
        { label: 'Destinations', counts: data.destinations, to: '/admin/destinations', read: can('destinations.read') },
        { label: 'Tours', counts: data.tours, to: '/admin/tours', read: can('tours.read') },
        { label: 'Routes', counts: data.routes, to: '/admin/routes', read: can('routes.read') },
    ].filter((r) => r.read);

    return (
        <div>
            <PageHeader
                title={`Welcome back, ${user?.full_name?.split(' ')[0] || 'Admin'}`}
                description="Content and enquiry overview."
                actions={
                    <>
                        <Link to="/admin/destinations"><Button variant="outline">Manage content</Button></Link>
                        <Link to="/admin/enquiries"><Button>Enquiry inbox</Button></Link>
                    </>
                }
            />

            {!hasAny && (can('destinations.read') || can('tours.read') || can('routes.read') || can('media.read')) && (
                <EmptyState
                    title="Nothing published yet"
                    description="Add destinations, tours and media to get started."
                />
            )}
            {data.error && (
                <div className="mb-6">
                    <EmptyState tone="error" title="Some sections failed to load" description={data.error} action={<Button variant="outline" onClick={() => setAttempt((n) => n + 1)}>Retry</Button>} />
                </div>
            )}

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard label="Destinations" value={can('destinations.read') ? destTotal : '—'} to={can('destinations.read') ? '/admin/destinations' : undefined} sub={`${data.destinations.published} published`} tone="navy" />
                <StatCard label="Tours" value={can('tours.read') ? tourTotal : '—'} to={can('tours.read') ? '/admin/tours' : undefined} sub={`${data.tours.published} published`} tone="bronze" />
                <StatCard label="Routes" value={can('routes.read') ? routeTotal : '—'} to={can('routes.read') ? '/admin/routes' : undefined} sub={`${data.routes.published} published`} tone="dark" />
                <StatCard label="Media assets" value={can('media.read') ? data.media_total : '—'} to={can('media.read') ? '/admin/media' : undefined} sub={can('enquiries.read') ? `${data.unread_total || 0} unread enquiries` : undefined} tone="light" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* CMS pipeline */}
                <section className="bg-white rounded-2xl border border-gray-100 p-6 lg:col-span-1">
                    <h2 className="text-navy font-serif text-lg font-semibold mb-4">Content pipeline</h2>
                    {can('destinations.read') || can('tours.read') || can('routes.read') ? (
                        <dl className="space-y-3 text-sm">
                            {pipelineRows.map((row) => (
                                <div key={row.label} className="flex items-center justify-between gap-3">
                                    <Link to={row.to} className="text-navy font-semibold hover:text-bronze">{row.label}</Link>
                                    <span className="flex items-center gap-2 text-xs">
                                        <span className="text-green-700 font-semibold">{row.counts.published}</span>
                                        <span className="text-gray-500">published</span>
                                        <span className="text-gray-400">·</span>
                                        <span className="text-gray-600">{row.counts.draft} draft</span>
                                        <span className="text-gray-400">·</span>
                                        <span className="text-amber-700">{row.counts.archived} archived</span>
                                    </span>
                                </div>
                            ))}
                        </dl>
                    ) : (
                        <p className="text-sm text-gray-400">No access.</p>
                    )}
                </section>

                {/* Category distribution */}
                <section className="bg-white rounded-2xl border border-gray-100 p-6 lg:col-span-1">
                    <h2 className="text-navy font-serif text-lg font-semibold mb-4">Tours by category</h2>
                    {can('tours.read') && categoryBreakdown.length ? (
                        <ul className="space-y-3">
                            {categoryBreakdown.map(([cat, count]) => (
                                <li key={cat} className="flex items-center gap-3">
                                    <span className="w-28 text-sm text-steel truncate">{TRIP_TYPE_BY_VALUE[cat] || cat}</span>
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-bronze rounded-full" style={{ width: `${(count / tourTotal) * 100}%` }} />
                                    </div>
                                    <span className="text-xs font-bold text-navy w-6 text-right">{count}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-400">No tours yet.</p>
                    )}
                </section>

                {/* Users */}
                <section className="bg-white rounded-2xl border border-gray-100 p-6 lg:col-span-1">
                    <h2 className="text-navy font-serif text-lg font-semibold mb-4">Admin team</h2>
                    {can('users.read') ? (
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-3xl font-serif font-bold text-navy">{data.users_total}</p>
                                <p className="text-xs text-gray-500">accounts</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-green-700">{activeUsers}</p>
                                <p className="text-xs text-gray-500">active</p>
                            </div>
                            <Link to="/admin/users" className="text-xs font-bold uppercase tracking-wider text-bronze hover:text-navy">Manage →</Link>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400">No access.</p>
                    )}
                    {can('enquiries.read') && (
                        <div className="mt-5 pt-5 border-t border-gray-100">
                            <p className="text-xs text-gray-500 mb-2">Inbox</p>
                            <div className="flex gap-3 text-sm">
                                <span className="font-semibold text-[#731E2A]">{data.unread_request_quote} quotes</span>
                                <span className="text-gray-300">·</span>
                                <span className="font-semibold text-[#731E2A]">{data.unread_partner} partners</span>
                                <span className="text-gray-300">·</span>
                                <span className="font-semibold text-[#731E2A]">{data.unread_contact} contacts</span>
                            </div>
                        </div>
                    )}
                </section>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent enquiries */}
                {can('enquiries.read') && (
                    <section className="bg-white rounded-2xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-navy font-serif text-lg font-semibold">Recent enquiries</h2>
                            <Link to="/admin/enquiries" className="text-xs font-bold uppercase tracking-wider text-bronze hover:text-navy">View all →</Link>
                        </div>
                        {data.recent_enquiries.length ? (
                            <TableShell ariaLabel="Recent enquiries">
                                <thead>
                                    <tr>
                                        <Th>Type</Th>
                                        <Th>Contact</Th>
                                        <Th>Received</Th>
                                        <Th>Status</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.recent_enquiries.map((e) => (
                                        <tr key={e.public_id}>
                                            <Td className="whitespace-nowrap">{ENQUIRY_LABELS[e.kind] || e.kind}</Td>
                                            <Td className="max-w-[180px] truncate">{e.contact || '—'}</Td>
                                            <Td className="whitespace-nowrap text-xs text-gray-500">
                                                {e.created_at ? new Date(e.created_at).toLocaleDateString() : '—'}
                                            </Td>
                                            <Td><ReadBadge isRead={e.is_read} /></Td>
                                        </tr>
                                    ))}
                                </tbody>
                            </TableShell>
                        ) : (
                            <p className="text-sm text-gray-400 py-4">No enquiries yet.</p>
                        )}
                    </section>
                )}

                {/* Recent audit activity */}
                {can('audit.read') ? (
                    <section className="bg-white rounded-2xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-navy font-serif text-lg font-semibold">Recent activity</h2>
                            <Link to="/admin/audit" className="text-xs font-bold uppercase tracking-wider text-bronze hover:text-navy">View all →</Link>
                        </div>
                        {data.recent_audit.length ? (
                            <ul className="divide-y divide-gray-50 text-sm">
                                {data.recent_audit.slice(0, 6).map((log) => (
                                    <li key={log.public_id} className="py-2.5 flex items-center justify-between gap-3">
                                        <span className="text-navy font-semibold text-xs uppercase tracking-wide">{log.action.replace(/_/g, ' ')}</span>
                                        <span className="text-xs text-gray-400 whitespace-nowrap">
                                            {log.created_at ? new Date(log.created_at).toLocaleString() : '—'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-400 py-4">No activity yet.</p>
                        )}
                    </section>
                ) : (
                    can('enquiries.read') && <div className="hidden lg:block" />
                )}

                {/* Fallback panel when audit is hidden */}
                {!can('audit.read') && (
                    <section className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h2 className="text-navy font-serif text-lg font-semibold mb-4">Quick actions</h2>
                        <div className="flex flex-wrap gap-3">
                            {can('destinations.create') && <Link to="/admin/destinations"><Button variant="subtle">New destination</Button></Link>}
                            {can('tours.create') && <Link to="/admin/tours"><Button variant="subtle">New tour</Button></Link>}
                            {can('routes.create') && <Link to="/admin/routes"><Button variant="subtle">New route</Button></Link>}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;