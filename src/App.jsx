import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import RouteFallback from './components/RouteFallback';
import Home from './pages/Home';

// Every route other than the landing page is code-split, so a visitor arriving
// at /contact no longer downloads the checkout flow, the tours carousel and
// every other page before the site becomes interactive.
const Tours = lazy(() => import('./pages/Tours'));
const Services = lazy(() => import('./pages/services/Services'));
const ServicesPrivateTours = lazy(() => import('./pages/services/ServicesPrivateTours'));
const ServicesTailorMadeTours = lazy(() => import('./pages/services/ServicesTailorMadeTours'));
const ServicesAirportFastTrack = lazy(() => import('./pages/services/ServicesAirportFastTrack'));
const GroundServices = lazy(() => import('./pages/services/GroundServices'));
const Destination = lazy(() => import('./pages/Destination'));
const Aboutus = lazy(() => import('./pages/Aboutus'));
const Contactus = lazy(() => import('./pages/Contactus'));
const Blogs = lazy(() => import('./pages/Blogs'));
const Checkouts = lazy(() => import('./pages/Checkouts'));
const Booking = lazy(() => import('./pages/Booking'));
const Trip = lazy(() => import('./pages/Trip'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * Legacy and alternate URLs redirect to a single canonical path per page rather
 * than rendering the same content at several addresses.
 */
const ROUTE_ALIASES = [
    ['/itineraries', '/tours'],
    ['/itinerary', '/tours'],
    ['/services/private-transfers', '/services/private-tours'],
    ['/services/tailor-made', '/services/tailor-made-tours'],
    ['/services/fast-track', '/services/airport-fast-track'],
    ['/services/services-airport-fast-track', '/services/airport-fast-track'],
    ['/services/ground-services-india', '/services/ground-services'],
    ['/destinations', '/destination'],
    ['/about-us', '/about'],
    ['/contact-us', '/contact'],
    ['/blogs', '/blog'],
    ['/checkouts', '/checkout'],
    ['/bookings', '/booking'],
    ['/trips', '/trip'],
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
                                <Route path="/services" element={<Services />} />
                                <Route path="/services/private-tours" element={<ServicesPrivateTours />} />
                                <Route path="/services/tailor-made-tours" element={<ServicesTailorMadeTours />} />
                                <Route path="/services/airport-fast-track" element={<ServicesAirportFastTrack />} />
                                <Route path="/services/ground-services" element={<GroundServices />} />
                                <Route path="/destination" element={<Destination />} />
                                <Route path="/about" element={<Aboutus />} />
                                <Route path="/contact" element={<Contactus />} />
                                <Route path="/blog" element={<Blogs />} />
                                <Route path="/checkout" element={<Checkouts />} />
                                <Route path="/booking" element={<Booking />} />
                                <Route path="/trip" element={<Trip />} />
                                <Route path="/privacy-policy" element={<PrivacyPolicy />} />

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
        </Router>
    );
}

export default App;
