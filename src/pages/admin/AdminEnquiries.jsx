import { useCallback, useEffect, useState } from 'react';
import { Eye, MailOpen, MailX } from 'lucide-react';
import { useAuth } from '../../context/AdminAuthContext';
import { enquiryApi, fetchUnreadEnquiryCounts } from '../../services/api/adminApi';
import { errorMessage } from '../../services/api/client';
import { TRIP_TYPE_BY_VALUE, HOTEL_CATEGORIES, TRANSPORT_TYPES } from '../../config/enquiry';
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

const TABS = [
    { type: 'request-quote', label: 'Request Quote' },
    { type: 'partner', label: 'Become a Partner' },
    { type: 'contact', label: 'Contact' },
];

const HOTEL_BY_VALUE = Object.fromEntries(HOTEL_CATEGORIES.map((h) => [h.value, h.label]));
const TRANSPORT_BY_VALUE = Object.fromEntries(TRANSPORT_TYPES.map((t) => [t.value, t.label]));

const RQ_FIELDS = [
    { key: 'agency_company', label: 'Agency / company' },
    { key: 'contact_name', label: 'Contact name' },
    { key: 'contact_email', label: 'Email' },
    { key: 'contact_phone', label: 'Phone' },
    { key: 'agency_country', label: 'Country' },
    { key: 'agency_website', label: 'Website' },
    { key: 'trip_type', label: 'Trip type', map: (v) => TRIP_TYPE_BY_VALUE[v] || v },
    { key: 'destination', label: 'Destination' },
    { key: 'travel_dates_start', label: 'Travel dates (from)', map: (v) => (v ? new Date(v).toLocaleDateString() : v) },
    { key: 'travel_dates_end', label: 'Travel dates (to)', map: (v) => (v ? new Date(v).toLocaleDateString() : v) },
    { key: 'duration_days', label: 'Duration (days)' },
    { key: 'adults', label: 'Adults' },
    { key: 'children', label: 'Children' },
    { key: 'rooms', label: 'Rooms' },
    { key: 'hotel_category', label: 'Hotel category', map: (v) => HOTEL_BY_VALUE[v] || v },
    { key: 'rooming_notes', label: 'Rooming notes' },
    { key: 'transport_type', label: 'Transport', map: (v) => TRANSPORT_BY_VALUE[v] || v },
    { key: 'transport_notes', label: 'Transport notes' },
    { key: 'experiences_interests', label: 'Experiences / interests' },
    { key: 'must_see', label: 'Must see' },
    { key: 'budget_range', label: 'Budget range' },
    { key: 'budget_currency', label: 'Currency' },
    { key: 'special_requirements', label: 'Special requirements' },
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

function AdminEnquiries() {
    const { can } = useAuth();
    const [activeType, setActiveType] = useState('request-quote');
    const [unread, setUnread] = useState({ request_quote: 0, partner: 0, contact: 0 });
    const [detail, setDetail] = useState(null);
    const [busyId, setBusyId] = useState('');

    const fetcher = useCallback((params) => enquiryApi(activeType).list(params), [activeType]);
    const list = useAdminList({ fetcher, extraKey: activeType });

    const loadUnread = useCallback(() => {
        fetchUnreadEnquiryCounts()
            .then((u) => setUnread(u))
            .catch(() => {});
    }, []);

    useEffect(() => {
        loadUnread();
    }, [loadUnread, list.reload]);

    const openDetail = async (id) => {
        setBusyId(id);
        try {
            const row = await enquiryApi(activeType).detail(id);
            setDetail({ ...row, type: activeType, id });
            list.reload();
        } catch (err) {
            window.alert(errorMessage(err, 'Could not open the enquiry.'));
        } finally {
            setBusyId('');
        }
    };

    const toggleRead = async (row) => {
        try {
            if (row.is_read) {
                await enquiryApi(activeType).markUnread(row.public_id);
            } else {
                await enquiryApi(activeType).markRead(row.public_id);
            }
            list.reload();
            loadUnread();
        } catch (err) {
            window.alert(errorMessage(err, 'Could not update read status.'));
        }
    };

    const formatDate = (iso) => (iso ? new Date(iso).toLocaleString() : '—');

    const columns = {
        'request-quote': [
            { label: 'Agency', build: (e) => e.agency_company },
            { label: 'Contact', build: (e) => `${e.contact_name} · ${e.contact_email}` },
            { label: 'Trip type', build: (e) => TRIP_TYPE_BY_VALUE[e.trip_type] || e.trip_type },
            { label: 'Destination', build: (e) => e.destination || '—' },
        ],
        partner: [
            { label: 'Company', build: (e) => e.company_name },
            { label: 'Contact', build: (e) => `${e.contact_name} · ${e.email}` },
            { label: 'Country', build: (e) => e.country },
            { label: 'Website', build: (e) => e.website || '—' },
        ],
        contact: [
            { label: 'Name', build: (e) => e.name },
            { label: 'Email', build: (e) => e.email },
            { label: 'Subject', build: (e) => e.subject || '—' },
            { label: 'Message', build: (e) => `${(e.message || '').slice(0, 60)}${e.message?.length > 60 ? '…' : ''}` },
        ],
    };

    const detailFields = {
        'request-quote': RQ_FIELDS,
        partner: [
            { key: 'company_name', label: 'Company' },
            { key: 'contact_name', label: 'Contact name' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'country', label: 'Country' },
            { key: 'website', label: 'Website' },
            { key: 'business_description', label: 'About the business' },
        ],
        contact: [
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'company', label: 'Company' },
            { key: 'subject', label: 'Subject' },
            { key: 'message', label: 'Message' },
        ],
    };

    return (
        <div>
            <PageHeader
                title="Enquiry inbox"
                description="Trade and consumer enquiries submitted through the public forms."
            />

            <div role="tablist" aria-label="Enquiry type" className="inline-flex bg-cream rounded-xl p-1 mb-6 gap-1">
                {TABS.map((tab) => (
                    <button
                        key={tab.type}
                        role="tab"
                        aria-selected={activeType === tab.type}
                        onClick={() => { setActiveType(tab.type); setDetail(null); }}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeType === tab.type ? 'bg-white text-navy shadow-sm' : 'text-steel hover:text-navy'}`}
                    >
                        {tab.label}
                        {unread[tab.type.replace('-', '_')] > 0 && (
                            <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-[#731E2A] text-white text-[10px] font-bold">
                                {unread[tab.type.replace('-', '_')]}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {list.loading ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6"><SkeletonRows cols={5} /></div>
            ) : list.error ? (
                list.errorStatus === 403 ? (
                    <ForbiddenState module="enquiries" />
                ) : (
                    <EmptyState tone="error" title="Could not load enquiries" description={list.error} action={<Button variant="outline" onClick={list.reload}>Retry</Button>} />
                )
            ) : list.items.length === 0 ? (
                <EmptyState title="No enquiries yet" description="Submissions from the public forms will appear here." />
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <TableShell ariaLabel={`${activeType} enquiries`}>
                        <thead>
                            <tr>
                                {columns[activeType].map((c) => <Th key={c.label}>{c.label}</Th>)}
                                <Th>Received</Th>
                                <Th>Status</Th>
                                <Th className="text-right">Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.items.map((e) => (
                                <tr key={e.public_id} className={`hover:bg-cream/60 transition-colors ${e.is_read ? '' : 'font-semibold'}`}>
                                    {columns[activeType].map((c) => (
                                        <Td key={c.label} className="max-w-[220px] truncate">{c.build(e)}</Td>
                                    ))}
                                    <Td className="text-xs text-gray-500 whitespace-nowrap">{formatDate(e.created_at)}</Td>
                                    <Td>
                                        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${e.is_read ? 'bg-gray-100 text-gray-500' : 'bg-[#731E2A]/10 text-[#731E2A]'}`}>
                                            {e.is_read ? 'Read' : 'New'}
                                        </span>
                                    </Td>
                                    <Td className="text-right whitespace-nowrap">
                                        <div className="inline-flex items-center gap-1">
                                            <Button variant="ghost" size="sm" iconOnly onClick={() => openDetail(e.public_id)} disabled={!!busyId} aria-label="Open enquiry"><Eye className="h-4 w-4" /></Button>
                                            {can('enquiries.update') && (
                                                <Button variant="ghost" size="sm" iconOnly onClick={() => toggleRead(e)} aria-label={e.is_read ? 'Mark as unread' : 'Mark as read'}>
                                                    {e.is_read ? <MailX className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                                                </Button>
                                            )}
                                        </div>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </TableShell>
                    <Pagination page={list.page} total={list.total} pageSize={20} onChange={list.setPage} label="enquiries" />
                </div>
            )}

            <Modal open={Boolean(detail)} title={detail?.id ? 'Enquiry details' : ''} onClose={() => setDetail(null)}>
                {detail && (
                    <div className="space-y-5">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Received {formatDate(detail.created_at)}</span>
                            <span className={`px-2 py-0.5 rounded-full ${detail.is_read ? 'bg-gray-100 text-gray-500' : 'bg-[#731E2A]/10 text-[#731E2A]'}`}>
                                {detail.is_read ? 'Read' : 'New'}
                            </span>
                        </div>
                        <FieldGrid item={detail} fields={detailFields[detail.type] || detailFields.contact} />
                        {detail.ip_address && <p className="text-[11px] text-gray-400">IP: {detail.ip_address}</p>}
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default AdminEnquiries;