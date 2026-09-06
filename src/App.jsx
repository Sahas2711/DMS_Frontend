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
import Home from './pages/Home';

// Every route other than the landing page is code-split, so a visitor arriving
// at /contact no longer downloads the checkout flow, the tours carousel and
// every other page before the site becomes interactive.
const Tours = lazy(() => import('./pages/Tours'));
const Destination = lazy(() => import('./pages/Destination'));
const Aboutus = lazy(() => import('./pages/Aboutus'));
const Contactus = lazy(() => import('./pages/Contactus'));
const Blogs = lazy(() => import('./pages/Blogs'));
const Experiences = lazy(() => import('./pages/Experiences'));
const RequestQuote = lazy(() => import('./pages/RequestQuote'));
const BecomePartner = lazy(() => import('./pages/BecomePartner'));
const TravelTrade = lazy(() => import('./pages/TravelTrade'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * Legacy and alternate URLs redirect to a single canonical path per page rather
 * than rendering the same content at several addresses.
 */
const ROUTE_ALIASES = [
    ['/itineraries', '/tours'],
    ['/itinerary', '/tours'],
    // Former consumer service pages (airport fast track, private transfers,
    // tailor-made, India ground services) are outside Phase-1 B2B DMC scope.
    // Their URLs hand off to the Phase-1 enquiry workflow instead of dead routes.
    ['/services', '/request-quote'],
    ['/services/private-tours', '/request-quote'],
    ['/services/private-transfers', '/request-quote'],
    ['/services/tailor-made-tours', '/request-quote'],
    ['/services/tailor-made', '/request-quote'],
    ['/services/airport-fast-track', '/request-quote'],
    ['/services/fast-track', '/request-quote'],
    ['/services/services-airport-fast-track', '/request-quote'],
    ['/services/ground-services', '/request-quote'],
    ['/services/ground-services-india', '/request-quote'],
    ['/destinations', '/destination'],
    ['/about-us', '/about'],
    ['/contact-us', '/contact'],
    ['/blogs', '/blog'],
    // The former consumer booking/checkout/trip flows are Phase 2/3. Instead of
    // dead routes they now hand off to the Phase-1 enquiry workflow.
    ['/checkout', '/request-quote'],
    ['/checkouts', '/request-quote'],
    ['/booking', '/request-quote'],
    ['/bookings', '/request-quote'],
    ['/trip', '/request-quote'],
    ['/trips', '/request-quote'],
];

function SmoothScroll() {
    const { pathname } = useLocation();
    const lenisRef = useRef(null);

    useEffect(() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isMobile = window.innerWidth < 1024;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Touch devices keep native momentum scrolling, and visitors who ask for
        // reduced motion should not get hijacked scrolling at all.
        if (isTouch || isMobile || prefersReducedMotion) {
            return;
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
    }, []);

    // Reset scroll position on route change without recreating the Lenis instance
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
}

function App() {
    return (
        <Router>
            <AnalyticsProvider>
                <SmoothScroll />
                <div className="min-h-screen bg-gray-100 flex flex-col w-full max-w-full overflow-x-hidden relative">
                    <a
                        href="#main-content"
                        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-navy focus:text-white focus:text-sm"
                    >
                        Skip to main content
                    </a>

                    <Navbar />

                    <main id="main-content" className="flex-grow w-full max-w-full overflow-x-hidden">
                        <ErrorBoundary>
                            <Suspense fallback={<RouteFallback />}>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/tours" element={<Tours />} />
                                    <Route path="/destination" element={<Destination />} />
                                    <Route path="/about" element={<Aboutus />} />
                                    <Route path="/contact" element={<Contactus />} />
                                    <Route path="/blog" element={<Blogs />} />
                                    <Route path="/experiences" element={<Experiences />} />
                                    <Route path="/request-quote" element={<RequestQuote />} />
                                    <Route path="/become-a-partner" element={<BecomePartner />} />
                                    <Route path="/travel-trade" element={<TravelTrade />} />
                                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                    <Route path="/terms" element={<Terms />} />

                                    {ROUTE_ALIASES.map(([from, to]) => (
                                        <Route key={from} path={from} element={<Navigate to={to} replace />} />
                                    ))}

                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </Suspense>
                        </ErrorBoundary>
                    </main>

                    <Footer />
                </div>

                <CookieConsent />
            </AnalyticsProvider>
        </Router>
    );
}

export default App;
