import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tours from './pages/Tours';
import Services from './pages/services/Services';
import ServicesPrivateTours from './pages/services/ServicesPrivateTours';
import ServicesTailorMadeTours from './pages/services/ServicesTailorMadeTours';
import ServicesAirportFastTrack from './pages/services/ServicesAirportFastTrack';
import GroundServices from './pages/services/GroundServices';
import Destination from './pages/Destination';
import Aboutus from './pages/Aboutus';
import Contactus from './pages/Contactus';
import Blogs from './pages/Blogs';
import Checkouts from './pages/Checkouts';
import Booking from './pages/Booking';
import Trip from './pages/Trip';

function SmoothScroll() {
  const { pathname } = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth < 1024;

    // On mobile touch devices, use native hardware-accelerated momentum scrolling
    if (isTouch || isMobile) {
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

  // Reset scroll position on route change without destroying/recreating Lenis instance
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
        <Navbar />
        <main className="flex-grow w-full max-w-full overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/itineraries" element={<Tours />} />
            <Route path="/itinerary" element={<Tours />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/private-tours" element={<ServicesPrivateTours />} />
            <Route path="/services/private-transfers" element={<ServicesPrivateTours />} />
            <Route path="/services/tailor-made-tours" element={<ServicesTailorMadeTours />} />
            <Route path="/services/tailor-made" element={<ServicesTailorMadeTours />} />
            <Route path="/services/airport-fast-track" element={<ServicesAirportFastTrack />} />
            <Route path="/services/fast-track" element={<ServicesAirportFastTrack />} />
            <Route path="/services/services-airport-fast-track" element={<ServicesAirportFastTrack />} />
            <Route path="/services/ground-services" element={<GroundServices />} />
            <Route path="/services/ground-services-india" element={<GroundServices />} />
            <Route path="/destination" element={<Destination />} />
            <Route path="/destinations" element={<Destination />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/about-us" element={<Aboutus />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/contact-us" element={<Contactus />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/checkout" element={<Checkouts />} />
            <Route path="/checkouts" element={<Checkouts />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/trip" element={<Trip />} />
            <Route path="/trips" element={<Trip />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
