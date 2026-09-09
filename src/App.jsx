import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import RouteFallback from './components/RouteFallback';
import CookieConsent from './components/CookieConsent';
import AnalyticsProvider from './components/AnalyticsProvider';
import { AuthProvider } from './context/AdminAuthContext';
import Home from './pages/Home';

// Every route other than the landing page is code-split, so a visitor arriving
// at /contact no longer downloads the checkout flow, the tours carousel and
// every other page before the site becomes interactive.
const Tours = lazy(() => import('./pages/Tours'));
const TourDetail = lazy(() => import('./pages/TourDetail'));
const Services = lazy(() => import('./pages/services/Services'));
const ServicesPrivateTours = lazy(() => import('./pages/services/ServicesPrivateTours'));
const ServicesTailorMadeTours = lazy(() => import('./pages/services/ServicesTailorMadeTours'));
const ServicesAirportFastTrack = lazy(() => import('./pages/services/ServicesAirportFastTrack'));
const GroundServices = lazy(() => import('./pages/services/GroundServices'));
const Destination = lazy(() => import('./pages/Destination'));
const DestinationDetail = lazy(() => import('./pages/DestinationDetail'));
const Aboutus = lazy(() => import('./pages/Aboutus'));
const Contactus = lazy(() => import('./pages/Contactus'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Experiences = lazy(() => import('./pages/Experiences'));
const RequestQuote = lazy(() => import('./pages/RequestQuote'));
const BecomePartner = lazy(() => import('./pages/BecomePartner'));
const TravelTrade = lazy(() => import('./pages/TravelTrade'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Booking = lazy(() => import('./pages/Booking'));
const Checkouts = lazy(() => import('./pages/Checkouts'));
const Trip = lazy(() => import('./pages/Trip'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin console (protected shell + routes). Login sits outside the shell so an
// unauthenticated visitor can reach it.
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const ForgotPassword = lazy(() => import('./pages/admin/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/admin/ResetPassword'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminDestinations = lazy(() => import('./pages/admin/AdminDestinations'));
const AdminTours = lazy(() => import('./pages/admin/AdminTours'));
const AdminRoutes = lazy(() => import('./pages/admin/AdminRoutes'));
const AdminBlogs = lazy(() => import('./pages/admin/AdminBlogs'));
const AdminSpecialOffers = lazy(() => import('./pages/admin/AdminSpecialOffers'));
const AdminMedia = lazy(() => import('./pages/admin/AdminMedia'));
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries'));
const AdminBookings = lazy(() => import('./pages/admin/AdminBookings'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminAudit = lazy(() => import('./pages/admin/AdminAudit'));
const AdminAccount = lazy(() => import('./pages/admin/AdminAccount'));

/**
 * Legacy and alternate URLs redirect to a single canonical path per page rather
 * than rendering the same content at several addresses.
 */
const ROUTE_ALIASES = [
    ['/itineraries', '/tours'],
    ['/itinerary', '/tours'],
    // Former consumer service sub-pages with no live page of their own hand off
    // to the Phase-1 enquiry workflow. (The canonical service pages below are
    // real routes now — see the Routes block.)
    ['/services/private-transfers', '/request-quote'],
    ['/services/tailor-made', '/request-quote'],
    ['/services/fast-track', '/request-quote'],
    ['/services/services-airport-fast-track', '/request-quote'],
    ['/services/ground-services-india', '/request-quote'],
    ['/destinations', '/destination'],
    ['/about-us', '/about'],
    ['/contact-us', '/contact'],
    ['/blogs', '/blog'],
    // Alternate spellings of the live booking/checkout/trip flows.
    ['/bookings', '/booking'],
    ['/checkouts', '/checkout'],
    ['/trips', '/trip'],
];

function SmoothScroll() {
    const { pathname } = useLocation();
    const lenisRef = useRef(null);

    // The admin console is a tool and must scroll natively. Lenis must be
    // *destroyed* there, not just stopped: a stopped Lenis instance still
    // preventDefaults wheel/touch events (lenis v1.3.26 wheel handler), which
    // freezes scrolling on the page entirely.
    const isAdmin = pathname.startsWith('/admin');

    useEffect(() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isMobile = window.innerWidth < 1024;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Touch devices keep native momentum scrolling, visitors who ask for
        // reduced motion should not get hijacked scrolling at all, and admin
        // routes scroll natively.
        if (isAdmin || isTouch || isMobile || prefersReducedMotion) {
            return undefined;
        }

        const lenis = new Lenis({
            duration: 0.9,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            syncTouch: false,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.0,
            infinite: false,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
        });

        lenisRef.current = lenis;

        let animationFrameId;
        function raf(time) {
            lenis.raf(time);
            animationFrameId = requestAnimationFrame(raf);
        }
        animationFrameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(animationFrameId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [isAdmin]);

    // Reset scroll position on route change (native; immediate)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <Router>
            <AnalyticsProvider>
                <AuthProvider>
                    <SmoothScroll />
                    <div className="min-h-screen bg-gray-100 flex flex-col w-full max-w-full relative">   
                        {/* overflow clipping is handled globally in index.css via
                            `overflow-x: clip` so Lenis keeps control of the scroller. */}
                        <a
                            href="#main-content"
                            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-navy focus:text-white focus:text-sm"
                        >
                            Skip to main content
                        </a>

                        <Navbar />

                        <main id="main-content" className="flex-grow w-full max-w-full">
                            <ErrorBoundary>
                                <Suspense fallback={<RouteFallback />}>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/tours" element={<Tours />} />
                                        <Route path="/tours/:slug" element={<TourDetail />} />
                                        <Route path="/services" element={<Services />} />
                                        <Route path="/services/private-tours" element={<ServicesPrivateTours />} />
                                        <Route path="/services/tailor-made-tours" element={<ServicesTailorMadeTours />} />
                                        <Route path="/services/airport-fast-track" element={<ServicesAirportFastTrack />} />
                                        <Route path="/services/ground-services" element={<GroundServices />} />
                                        <Route path="/destination" element={<Destination />} />
                                        <Route path="/destination/:slug" element={<DestinationDetail />} />
                                        <Route path="/about" element={<Aboutus />} />
                                        <Route path="/contact" element={<Contactus />} />
                                        <Route path="/blog" element={<Blogs />} />
                                        <Route path="/blog/:slug" element={<BlogDetail />} />
                                        <Route path="/experiences" element={<Experiences />} />
                                        <Route path="/request-quote" element={<RequestQuote />} />
                                        <Route path="/become-a-partner" element={<BecomePartner />} />
                                        <Route path="/travel-trade" element={<TravelTrade />} />
                                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                        <Route path="/terms" element={<Terms />} />
                                        <Route path="/booking" element={<Booking />} />
                                        <Route path="/checkout" element={<Checkouts />} />
                                        <Route path="/trip" element={<Trip />} />

                                        {ROUTE_ALIASES.map(([from, to]) => (
                                            <Route key={from} path={from} element={<Navigate to={to} replace />} />
                                        ))}

                                        <Route path="/admin/login" element={<AdminLogin />} />
                                        {/* Public password-reset flow (linked from the emailed URL and the login page). */}
                                        <Route path="/forgot-password" element={<ForgotPassword />} />
                                        <Route path="/reset-password" element={<ResetPassword />} />
                                        <Route path="/admin" element={<AdminLayout />}>
                                            <Route index element={<Navigate to="/admin/dashboard" replace />} />
                                            <Route path="dashboard" element={<AdminDashboard />} />
                                            <Route path="destinations" element={<AdminDestinations />} />
                                            <Route path="tours" element={<AdminTours />} />
                                            <Route path="routes" element={<AdminRoutes />} />
                                            <Route path="posts" element={<AdminBlogs />} />
                                            <Route path="special-offers" element={<AdminSpecialOffers />} />
                                            <Route path="media" element={<AdminMedia />} />
                                            <Route path="enquiries" element={<AdminEnquiries />} />
                                            <Route path="bookings" element={<AdminBookings />} />
                                            <Route path="users" element={<AdminUsers />} />
                                            <Route path="audit" element={<AdminAudit />} />
                                            <Route path="account" element={<AdminAccount />} />
                                        </Route>

                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </Suspense>
                            </ErrorBoundary>
                        </main>

                        <Footer />
                    </div>

                    <CookieConsent />
                </AuthProvider>
            </AnalyticsProvider>
        </Router>
    );
}

export default App;
