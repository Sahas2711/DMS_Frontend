import { useCallback, useState } from 'react';
import { Eye, MailOpen, MailX } from 'lucide-react';
import { useAuth } from '../../context/AdminAuthContext';
import { fetchAdminBookings, fetchAdminBooking, markBookingRead, markBookingUnread, updateBookingStatus } from '../../services/api/adminApi';
import { errorMessage } from '../../services/api/client';
import { useAdminList } from './useAdminList';
import {
    Button,
    EmptyState,
    ForbiddenState,
    Modal,
    PageHeader,
    Pagination,
    SkeletonRows,
    TableShell,
    Td,
    Th,
} from '../../components/admin/ui';

const STATUSES = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];

const STATUS_STYLES = {
    PENDING: 'bg-amber-100 text-amber-800',
    CONFIRMED: 'bg-emerald-100 text-emerald-700',
    CANCELLED: 'bg-red-100 text-red-700',
    COMPLETED: 'bg-sky-100 text-sky-700',
};

const DIRECTION_LABELS = {
    inbound: 'Inbound Arrival',
    outbound: 'Outbound Departure',
};

const SERVICE_LEVEL_LABELS = {
    standard: 'Standard',
    vip: 'VIP',
    lounge: 'Lounge',
    diplomatic: 'Diplomatic',
};

const fmtMoney = (v) =>
    v === undefined || v === null || v === '' ? null : `$${Number(v).toFixed(2)}`;

const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : '—');

const DETAIL_FIELDS = [
    { key: 'full_name', label: 'Traveller' },
    { key: 'email', label: 'Email', map: (v) => String(v) },
    { key: 'phone', label: 'Phone' },
    { key: 'country', label: 'Country' },
    { key: 'transit_direction', label: 'Direction', map: (v) => DIRECTION_LABELS[v] || v },
    { key: 'flight_number', label: 'Flight' },
    { key: 'arrival_date', label: 'Date', map: (v) => fmtDate(v) },
    { key: 'landing_time', label: 'Landing time' },
    { key: 'guest_count', label: 'Guests' },
    { key: 'service_level', label: 'Service level', map: (v) => SERVICE_LEVEL_LABELS[v] || v },
    { key: 'addon_mercedes', label: 'Mercedes add-on', map: (v) => (v ? 'Yes' : 'No') },
    { key: 'addon_lounge', label: 'Lounge add-on', map: (v) => (v ? 'Yes' : 'No') },
    { key: 'base_price', label: 'Base fare', map: (v) => String(fmtMoney(v)) },
    { key: 'porter_price', label: 'Porter', map: (v) => String(fmtMoney(v)) },
    { key: 'addon_mercedes_price', label: 'Mercedes price', map: (v) => String(fmtMoney(v)) },
    { key: 'addon_lounge_price', label: 'Lounge price', map: (v) => String(fmtMoney(v)) },
    { key: 'total_price', label: 'Total', map: (v) => String(fmtMoney(v)) },
    { key: 'placard_notes', label: 'Placard notes' },
];

function FieldGrid({ item, fields }) {
    return (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {fields.map(({ key, label, map }) => {
                const raw = item?.[key];
                const value = raw === undefined || raw === null || raw === '' ? null : (map ? map(raw) : String(raw));
                return (
                    <div key={key} className={String(key).length > 16 ? 'sm:col-span-2' : ''}>
                        <dt className="text-xs text-gray-400 uppercase tracking-wide">{label}</dt>
                        <dd className="text-navy whitespace-pre-wrap">{value ?? '—'}</dd>
                    </div>
                );
            })}
        </dl>
    );
}

function AdminBookings() {
    const { can } = useAuth();
    const [detail, setDetail] = useState(null);
    const [busyId, setBusyId] = useState('');
    const [saving, setSaving] = useState(false);
    const [editStatus, setEditStatus] = useState('PENDING');
    const [editNotes, setEditNotes] = useState('');

    const fetcher = useCallback((params) => fetchAdminBookings(params), []);
    const list = useAdminList({ fetcher });

    const formatReceived = (iso) => (iso ? new Date(iso).toLocaleString() : '—');

    const openDetail = async (id) => {
        setBusyId(id);
        try {
            const row = await fetchAdminBooking(id);
            setDetail(row);
            setEditStatus(row.status);
            setEditNotes(row.admin_notes ?? '');
            list.reload();
        } catch (err) {
            window.alert(errorMessage(err, 'Could not open the booking request.'));
        } finally {
            setBusyId('');
        }
    };

    const toggleRead = async (row) => {
        try {
            if (row.is_read) {
                await markBookingUnread(row.public_id);
            } else {
                await markBookingRead(row.public_id);
            }
            list.reload();
        } catch (err) {
            window.alert(errorMessage(err, 'Could not update read status.'));
        }
    };

    const saveStatus = async () => {
        setSaving(true);
        try {
            const updated = await updateBookingStatus(detail.public_id, { status: editStatus, admin_notes: editNotes || null });
            setDetail(updated);
            list.reload();
        } catch (err) {
            window.alert(errorMessage(err, 'Could not update the booking status.'));
        } finally {
            setSaving(false);
        }
    };

    const columns = [
        { label: 'Traveller', build: (b) => `${b.full_name} · ${b.email}` },
        { label: 'Flight', build: (b) => `${b.flight_number} · ${fmtDate(b.arrival_date)}${b.landing_time ? ` ${b.landing_time}` : ''}` },
        { label: 'Direction', build: (b) => DIRECTION_LABELS[b.transit_direction] || b.transit_direction },
        { label: 'Total', build: (b) => fmtMoney(b.total_price) },
    ];

    return (
        <div>
            <PageHeader
                title="Reservation requests"
                description="Fast Track bookings submitted through the checkout form."
            />

            <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex gap-1 bg-cream rounded-xl p-1">
                    {[{ value: '', label: 'All' }, ...STATUSES.map((s) => ({ value: s, label: s[0] + s.slice(1).toLowerCase() }))].map((opt) => (
                        <button
                            key={opt.value || 'all'}
                            type="button"
                            onClick={() => list.setStatus(opt.value)}
                            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${list.status === opt.value ? 'bg-white text-navy shadow-sm' : 'text-steel hover:text-navy'}`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {list.loading ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6"><SkeletonRows cols={5} /></div>
            ) : list.error ? (
                list.errorStatus === 403 ? (
                    <ForbiddenState module="bookings" />
                ) : (
                    <EmptyState tone="error" title="Could not load bookings" description={list.error} action={<Button variant="outline" onClick={list.reload}>Retry</Button>} />
                )
            ) : list.items.length === 0 ? (
                <EmptyState title="No booking requests yet" description="Reservations from the checkout form will appear here." />
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <TableShell ariaLabel="Booking requests">
                        <thead>
                            <tr>
                                {columns.map((c) => <Th key={c.label}>{c.label}</Th>)}
                                <Th>Received</Th>
                                <Th>Status</Th>
                                <Th className="text-right">Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.items.map((b) => (
                                <tr key={b.public_id} className={`hover:bg-cream/60 transition-colors ${b.is_read ? '' : 'font-semibold'}`}>
                                    {columns.map((c) => (
                                        <Td key={c.label} className="max-w-[240px] truncate">{c.build(b)}</Td>
                                    ))}
                                    <Td className="text-xs text-gray-500 whitespace-nowrap">{formatReceived(b.created_at)}</Td>
                                    <Td>
                                        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${STATUS_STYLES[b.status] || 'bg-gray-100 text-gray-600'}`}>
                                            {b.status}
                                        </span>
                                    </Td>
                                    <Td className="text-right whitespace-nowrap">
                                        <div className="inline-flex items-center gap-1">
                                            <Button variant="ghost" size="sm" iconOnly onClick={() => openDetail(b.public_id)} disabled={!!busyId} aria-label="Open booking"><Eye className="h-4 w-4" /></Button>
                                            {can('bookings.update') && (
                                                <Button variant="ghost" size="sm" iconOnly onClick={() => toggleRead(b)} aria-label={b.is_read ? 'Mark as unread' : 'Mark as read'}>
                                                    {b.is_read ? <MailX className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                                                </Button>
                                            )}
                                        </div>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </TableShell>
                    <Pagination page={list.page} total={list.total} pageSize={20} onChange={list.setPage} label="bookings" />
                </div>
            )}

            <Modal open={Boolean(detail)} title="Reservation details" onClose={() => setDetail(null)}>
                {detail && (
                    <div className="space-y-5">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Received {formatReceived(detail.created_at)}</span>
                            <span className={`px-2 py-0.5 rounded-full ${detail.is_read ? 'bg-gray-100 text-gray-500' : 'bg-[#731E2A]/10 text-[#731E2A]'}`}>
                                {detail.is_read ? 'Read' : 'New'}
                            </span>
                        </div>
                        <FieldGrid item={detail} fields={DETAIL_FIELDS} />
                        {can('bookings.update') && (
                            <div className="border-t border-gray-100 pt-5 space-y-4">
                                <div className="flex items-center gap-3">
                                    <label htmlFor="booking-status" className="text-xs font-semibold text-gray-600 uppercase tracking-wide shrink-0">Status</label>
                                    <select
                                        id="booking-status"
                                        value={editStatus}
                                        onChange={(e) => setEditStatus(e.target.value)}
                                        className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-bronze/40"
                                    >
                                        {STATUSES.map((s) => <option key={s} value={s}>{s[0] + s.slice(1).toLowerCase()}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="booking-notes" className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Admin notes</label>
                                    <textarea
                                        id="booking-notes"
                                        rows={3}
                                        value={editNotes}
                                        onChange={(e) => setEditNotes(e.target.value)}
                                        placeholder="Internal notes shared with your dispatch team…"
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-bronze/40 resize-none"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button onClick={saveStatus} disabled={saving}>
                                        {saving ? 'Saving…' : 'Update status'}
                                    </Button>
                                </div>
                            </div>
                        )}
                        {detail.ip_address && <p className="text-[11px] text-gray-400">IP: {detail.ip_address}</p>}
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default AdminBookings;