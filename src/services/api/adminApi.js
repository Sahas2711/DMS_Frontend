import { adminDelete, adminGet, adminPatch, adminPost, adminPut } from './admin';

/**
 * Admin API resource access. Every function maps 1:1 to a backend endpoint in
 * app/api/v1/routes/*. The backend enforces permissions; the UI only *hides*
 * entry points when the profile lacks the matching permission.
 */

// ---------------------------------------------------------------------------
// Current admin profile
// ---------------------------------------------------------------------------

export const fetchCurrentAdmin = () => adminGet('/admin/me');

// ---------------------------------------------------------------------------
// Dashboard (single consolidated request)
// ---------------------------------------------------------------------------

// Dedupe identical GETs racing on mount (React StrictMode double-fires effects
// in dev; layout + page may also request the same aggregate together). Callers
// share one in-flight promise instead of issuing duplicate requests.
const inflightGet = new Map();

function dedupe(key, load) {
    if (inflightGet.has(key)) return inflightGet.get(key);
    const promise = load().finally(() => inflightGet.delete(key));
    inflightGet.set(key, promise);
    return promise;
}

export const fetchAdminDashboard = () => dedupe('GET /admin/dashboard', () => adminGet('/admin/dashboard'));

// ---------------------------------------------------------------------------
// Users & roles
// ---------------------------------------------------------------------------

export const fetchAdminUsers = (params) => adminGet('/admin/users', { query: params });
export const fetchAdminUser = (publicId) => adminGet(`/admin/users/${publicId}`);
export const createAdminUser = (payload) => adminPost('/admin/users', payload);
export const updateAdminUser = (publicId, payload) => adminPut(`/admin/users/${publicId}`, payload);
export const activateUser = (publicId) => adminPatch(`/admin/users/${publicId}/activate`);
export const deactivateUser = (publicId) => adminPatch(`/admin/users/${publicId}/deactivate`);
export const assignRole = (publicId, roleName) =>
    adminPost(`/admin/users/${publicId}/roles`, { role_name: roleName });
export const revokeRole = (publicId, roleName) =>
    adminDelete(`/admin/users/${publicId}/roles/${encodeURIComponent(roleName)}`);
export const fetchRoles = () => adminGet('/admin/roles');

// ---------------------------------------------------------------------------
// Destinations
// ---------------------------------------------------------------------------

export const fetchAdminDestinations = (params) => adminGet('/admin/destinations', { query: params });
export const fetchAdminDestination = (publicId) => adminGet(`/admin/destinations/${publicId}`);
export const createDestination = (payload) => adminPost('/admin/destinations', payload);
export const updateDestination = (publicId, payload) => adminPut(`/admin/destinations/${publicId}`, payload);
export const publishDestination = (publicId) => adminPatch(`/admin/destinations/${publicId}/publish`);
export const archiveDestination = (publicId) => adminPatch(`/admin/destinations/${publicId}/archive`);
export const deleteDestination = (publicId) => adminDelete(`/admin/destinations/${publicId}`);

// ---------------------------------------------------------------------------
// Tours
// ---------------------------------------------------------------------------

export const fetchAdminTours = (params) => adminGet('/admin/tours', { query: params });
export const fetchAdminTour = (publicId) => adminGet(`/admin/tours/${publicId}`);
export const createTour = (payload) => adminPost('/admin/tours', payload);
export const updateTour = (publicId, payload) => adminPut(`/admin/tours/${publicId}`, payload);
export const publishTour = (publicId) => adminPatch(`/admin/tours/${publicId}/publish`);
export const archiveTour = (publicId) => adminPatch(`/admin/tours/${publicId}/archive`);
export const deleteTour = (publicId) => adminDelete(`/admin/tours/${publicId}`);

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------

export const fetchAdminPosts = (params) => adminGet('/admin/posts', { query: params });
export const fetchAdminPost = (publicId) => adminGet(`/admin/posts/${publicId}`);
export const createPost = (payload) => adminPost('/admin/posts', payload);
export const updatePost = (publicId, payload) => adminPut(`/admin/posts/${publicId}`, payload);
export const publishPost = (publicId) => adminPatch(`/admin/posts/${publicId}/publish`);
export const archivePost = (publicId) => adminPatch(`/admin/posts/${publicId}/archive`);
export const deletePost = (publicId) => adminDelete(`/admin/posts/${publicId}`);

// ---------------------------------------------------------------------------
// Special offers
// ---------------------------------------------------------------------------

export const fetchAdminSpecialOffers = (params) =>
    adminGet('/admin/special-offers', { query: params });
export const fetchAdminSpecialOffer = (publicId) => adminGet(`/admin/special-offers/${publicId}`);
export const createSpecialOffer = (payload) => adminPost('/admin/special-offers', payload);
export const updateSpecialOffer = (publicId, payload) =>
    adminPut(`/admin/special-offers/${publicId}`, payload);
export const publishSpecialOffer = (publicId) =>
    adminPatch(`/admin/special-offers/${publicId}/publish`);
export const archiveSpecialOffer = (publicId) =>
    adminPatch(`/admin/special-offers/${publicId}/archive`);
export const deleteSpecialOffer = (publicId) =>
    adminDelete(`/admin/special-offers/${publicId}`);

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

export const fetchAdminRoutes = (params) => adminGet('/admin/routes', { query: params });
export const fetchAdminRoute = (publicId) => adminGet(`/admin/routes/${publicId}`);
export const createRoute = (payload) => adminPost('/admin/routes', payload);
export const updateRoute = (publicId, payload) => adminPut(`/admin/routes/${publicId}`, payload);
export const publishRoute = (publicId) => adminPatch(`/admin/routes/${publicId}/publish`);
export const archiveRoute = (publicId) => adminPatch(`/admin/routes/${publicId}/archive`);
export const deleteRoute = (publicId) => adminDelete(`/admin/routes/${publicId}`);

// ---------------------------------------------------------------------------
// Media
// ---------------------------------------------------------------------------

export const fetchMediaAssets = (params) => adminGet('/admin/media', { query: params });
export const uploadMediaAsset = ({ file, alt_text, caption, onProgress }) => {
    const formData = new FormData();
    formData.append('file', file);
    // Progress is not available for this same-origin POST; onProgress kept for API parity.
    void onProgress;
    return adminPost('/admin/media', null, {
        formData,
        query: { alt_text: alt_text || undefined, caption: caption || undefined },
    });
};
export const deleteMediaAsset = (publicId) => adminDelete(`/admin/media/${publicId}`);

// ---------------------------------------------------------------------------
// Bookings
// ---------------------------------------------------------------------------

export const fetchAdminBookings = (params) => adminGet('/admin/bookings', { query: params });
export const fetchAdminBooking = (publicId) => adminGet(`/admin/bookings/${publicId}`);
export const markBookingRead = (publicId) => adminPatch(`/admin/bookings/${publicId}/read`);
export const markBookingUnread = (publicId) => adminPatch(`/admin/bookings/${publicId}/unread`);
export const updateBookingStatus = (publicId, payload) => adminPatch(`/admin/bookings/${publicId}/status`, payload);

// ---------------------------------------------------------------------------
// Enquiries
// ---------------------------------------------------------------------------

const ENQUIRY_TYPES = {
    'request-quote': {
        list: (params) => adminGet('/admin/enquiries/request-quote', { query: params }),
        detail: (id) => adminGet(`/admin/enquiries/request-quote/${id}`),
        markRead: (id) => adminPatch(`/admin/enquiries/request-quote/${id}/read`),
        markUnread: (id) => adminPatch(`/admin/enquiries/request-quote/${id}/unread`),
    },
    partner: {
        list: (params) => adminGet('/admin/enquiries/partner', { query: params }),
        detail: (id) => adminGet(`/admin/enquiries/partner/${id}`),
        markRead: (id) => adminPatch(`/admin/enquiries/partner/${id}/read`),
        markUnread: (id) => adminPatch(`/admin/enquiries/partner/${id}/unread`),
    },
    contact: {
        list: (params) => adminGet('/admin/enquiries/contact', { query: params }),
        detail: (id) => adminGet(`/admin/enquiries/contact/${id}`),
        markRead: (id) => adminPatch(`/admin/enquiries/contact/${id}/read`),
        markUnread: (id) => adminPatch(`/admin/enquiries/contact/${id}/unread`),
    },
};

export const fetchUnreadEnquiryCounts = () =>
    dedupe('GET /admin/enquiries/unread-count', () => adminGet('/admin/enquiries/unread-count'));

export function enquiryApi(type) {
    return ENQUIRY_TYPES[type] || ENQUIRY_TYPES['request-quote'];
}

// ---------------------------------------------------------------------------
// Audit logs
// ---------------------------------------------------------------------------

export const fetchAuditLogs = (params) => adminGet('/admin/audit-logs', { query: params });