import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Map,
    Compass,
    Route as RouteIcon,
    Newspaper,
    BadgePercent,
    Image,
    Inbox,
    CalendarCheck,
    Users,
    ScrollText,
    LogOut,
    ExternalLink,
    Menu,
    X,
} from 'lucide-react';
import { useAuth } from '../../context/AdminAuthContext';
import Seo from '../../components/Seo';
import { fetchUnreadEnquiryCounts } from '../../services/api/adminApi';
import { Spinner } from '../../components/admin/ui';

const navGroup = (items) => items;

function AdminLayout() {
    const { user, ready, logout, can } = useAuth();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [unread, setUnread] = useState({ total: 0 });
    const drawerCloseRef = useRef(null);

    // Move focus into the drawer and support Escape to close.
    useEffect(() => {
        if (!menuOpen) return;
        drawerCloseRef.current?.focus();
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [menuOpen]);

    // Close the mobile drawer when navigating between sections. Implemented
    // with the "adjust state during render" pattern (no effect required).
    const [prevPath, setPrevPath] = useState(location.pathname);
    if (prevPath !== location.pathname) {
        setPrevPath(location.pathname);
        setMenuOpen(false);
    }

    // Refresh the unread badge whenever the admin navigates. On the dashboard
    // the payload already carries those counts, so skip the redundant request.
    useEffect(() => {
        if (!user || !can('enquiries.read')) return;
        if (location.pathname === '/admin/dashboard') return;
        fetchUnreadEnquiryCounts()
            .then(setUnread)
            .catch(() => {});
    }, [location.pathname, user, can]);

    const items = useMemo(
        () =>
            navGroup([
                { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, perm: null },
                { to: '/admin/destinations', label: 'Destinations', icon: Map, perm: 'destinations.read' },
                { to: '/admin/tours', label: 'Tours', icon: Compass, perm: 'tours.read' },
                { to: '/admin/routes', label: 'Routes', icon: RouteIcon, perm: 'routes.read' },
                { to: '/admin/posts', label: 'Blog Posts', icon: Newspaper, perm: 'posts.read' },
                { to: '/admin/special-offers', label: 'Special Offers', icon: BadgePercent, perm: 'special-offers.read' },
                { to: '/admin/media', label: 'Media', icon: Image, perm: 'media.read' },
                {
                    to: '/admin/enquiries',
                    label: 'Enquiries',
                    icon: Inbox,
                    perm: 'enquiries.read',
                    badge: unread.total > 0 ? unread.total : null,
                },
                { to: '/admin/bookings', label: 'Bookings', icon: CalendarCheck, perm: 'bookings.read' },
                { to: '/admin/users', label: 'Admin Users', icon: Users, perm: 'users.read' },
                { to: '/admin/audit', label: 'Audit Logs', icon: ScrollText, perm: 'audit.read' },
            ]),
        [unread.total]
    );

    if (!ready) {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center">
                <Spinner label="Checking session…" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
    }

    const visible = items.filter((item) => !item.perm || can(item.perm));

    const sidebar = (
        <nav aria-label="Admin sections" className="flex flex-col flex-1 px-3 py-6 gap-1">
            {visible.map((item) => {
                const Icon = item.icon;
                return (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/admin/dashboard'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                                isActive
                                    ? 'bg-navy text-white'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-navy'
                            }`
                        }
                    >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span className="flex-1">{item.label}</span>
                        {item.badge ? (
                            <span className="inline-flex items-center justify-center min-w-[1.4rem] px-1.5 h-5 rounded-full bg-[#731E2A] text-white text-[10px] font-bold">
                                {item.badge}
                            </span>
                        ) : null}
                    </NavLink>
                );
            })}
        </nav>
    );

    return (
        <div className="min-h-screen bg-ivory flex">
            <Seo title="Admin Console | Asian Star Travel" noIndex />
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-gray-100 sticky top-0 h-screen">
                <Link to="/admin/dashboard" className="px-6 py-6 border-b border-gray-100 block">
                    <img
                        src="/logo.jpeg"
                        alt="Asian Star Travel"
                        className="h-10 w-auto mb-2"
                        width="108"
                        height="92"
                    />
                    <span className="text-navy font-serif text-xl font-bold">Asian Star Travel</span>
                    <span className="block text-[10px] tracking-[0.2em] uppercase text-bronze mt-1">Admin Console</span>
                </Link>
                {sidebar}
                <div className="px-4 py-4 border-t border-gray-100 mt-auto">
                    <Link to="/" className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-navy transition-colors">
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        Back to website
                    </Link>
                </div>
            </aside>

            {/* Mobile drawer */}
            {menuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Admin navigation">
                    <div className="fixed inset-0 bg-navy/50" aria-hidden="true" onClick={() => setMenuOpen(false)} />
                    <aside className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl flex flex-col z-10">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <div>
                                <img
                                    src="/logo.jpeg"
                                    alt="Asian Star Travel"
                                    className="h-8 w-auto mb-1"
                                    width="86"
                                    height="73"
                                />
                                <span className="text-navy font-serif text-lg font-bold">Asian Star Travel</span>
                            </div>
                            <button type="button" ref={drawerCloseRef} onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-gray-400 hover:text-navy">
                                <X className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                        {sidebar}
                        <div className="px-4 py-4 border-t border-gray-100">
                            <Link to="/" className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-navy">
                                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> Back to website
                            </Link>
                        </div>
                    </aside>
                </div>
            )}

            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100">
                    <div className="flex items-center gap-3 px-4 md:px-8 py-3">
                        <button
                            type="button"
                            onClick={() => setMenuOpen(true)}
                            aria-label="Open menu"
                            className="lg:hidden text-navy p-1.5 -ml-1.5"
                        >
                            <Menu className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <div className="flex-1" />
                        <Link to="/admin/account" className="flex items-center gap-2 text-sm text-navy font-semibold hover:text-bronze transition-colors">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy text-white text-xs font-bold">
                                {user.full_name?.charAt(0) || user.email?.charAt(0) || 'A'}
                            </span>
                            <span className="hidden sm:inline max-w-[180px] truncate">{user.full_name || user.email}</span>
                        </Link>
                        <span className="hidden md:inline text-[10px] tracking-wider uppercase text-gray-400">
                            {user.is_super_admin ? 'Super Admin' : 'Admin'}
                        </span>
                        <button
                            type="button"
                            onClick={() => logout()}
                            title="Log out"
                            aria-label="Log out"
                            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#731E2A] transition-colors px-2 py-1.5"
                        >
                            <LogOut className="h-4 w-4" aria-hidden="true" />
                            <span className="hidden sm:inline">Log out</span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 px-4 md:px-8 py-8 max-w-7xl w-full mx-auto min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;