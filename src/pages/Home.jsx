import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';
import heroImage from '../assets/home/hero-image-home.webp';

// Icons
import tailorMadeIcon from '../assets/home/Tailor-Made-Tours.svg';
import privateTransfersIcon from '../assets/home/private-transfers.svg';
import airportFastTrackIcon from '../assets/home/airport-fast-track.svg';
import carRentalIcon from '../assets/home/car-rental.svg';
import corporateIncentiveIcon from '../assets/home/corporate-incentive-travel.svg';
import groundServicesIcon from '../assets/home/ground-services.svg';

// Destination Images
import keralaImg from '../assets/home/Kerala-Heritage.webp';
import meghalayaImg from '../assets/home/Meghalaya-Adventure.webp';
import aasamImg from '../assets/home/Asam.webp';
import himachalImg from '../assets/home/Himachal-Pradesh.webp';
import panjabImg from '../assets/home/Panjab.webp';
import factsBgImg from '../assets/home/Facts-pile-bg-img.webp';
import watermarkImg from '../assets/home/facts-sectioncards-watermark.png';

// Popular Destinations
import abuDhabiImg from '../assets/home/Abu-Dhabi-City-Tour.webp';
import yasIslandImg from '../assets/home/Yas-Island-Guided-Tour.webp';
import popWatermark1 from '../assets/home/watermark1-Popular-Destinations.png';
import popWatermark2 from '../assets/home/watermark2-Popular-Destinations.png';
import sliderBtnImg from '../assets/home/sliderbutton-popular destination.svg';
import planTripImg from '../assets/home/plan-your-trip.webp';
import darjeelingImg from '../assets/home/Darjeeling.webp';
import maharashtraImg from '../assets/home/Maharashtra.webp';
import telanganaImg from '../assets/home/Telangana.webp';
import europeImg from '../assets/home/Europe.webp';
import koreaImg from '../assets/home/Korea.webp';
import vietnamImg from '../assets/home/Vietnam.webp';
import discoverVietnamImg from '../assets/home/Discover-vietnam.webp';

const SERVICES = [
    {
        id: 'tailor-made',
        num: '01',
        category: 'tours',
        tag: 'Bespoke Itineraries',
        title: 'Tailor-Made Tours',
        description: 'Private itineraries designed around your pace, interests and travel dates — never off-the-shelf.',
        icon: tailorMadeIcon,
        link: '/services/tailor-made-tours'
    },
    {
        id: 'private-transfers',
        num: '02',
        category: 'transfers',
        tag: 'Executive Fleet',
        title: 'Private Transfers',
        description: 'Comfortable, punctual private cars with professional local drivers between every destination.',
        icon: privateTransfersIcon,
        link: '/services/private-tours'
    },
    {
        id: 'airport-fast-track',
        num: '03',
        category: 'vip',
        tag: 'Airside VIP Clearance',
        title: 'Airport Fast Track',
        description: 'Skip the queues with expedited immigration and VIP assistance on arrival and departure.',
        icon: airportFastTrackIcon,
        link: '/services/airport-fast-track'
    },
    {
        id: 'car-rental',
        num: '04',
        category: 'transfers',
        tag: 'Flexible Chauffeur',
        title: 'Car Rental & Sedans',
        description: 'Flexible self-drive and chauffeured vehicle options for city stays and longer road journeys.',
        icon: carRentalIcon,
        link: '/services/private-tours'
    },
    {
        id: 'corporate',
        num: '05',
        category: 'corporate',
        tag: 'MICE & Groups',
        title: 'Corporate & Incentive Travel',
        description: 'Meetings, incentives and group programs delivered with reliable, detail-first ground handling.',
        icon: corporateIncentiveIcon,
        link: '/services/ground-services'
    },
    {
        id: 'ground-services',
        num: '06',
        category: 'corporate',
        tag: 'Nationwide DMC',
        title: 'Ground Services in Vietnam',
        description: 'Full local DMC support — guides, permits, bookings and on-trip assistance across the country.',
        icon: groundServicesIcon,
        link: '/services/ground-services'
    }
];

const DESTINATIONS = [
    {
        title: 'Kerala & Heritage',
        tag: 'God\'s Own Country',
        description: 'Kerala, often hailed as "God\'s Own Country"',
        image: keralaImg,
        link: '/destination'
    },
    {
        title: 'Meghalaya & Adventure',
        tag: 'Living Bridges',
        description: 'Bays, mountains, caves & rice terraces',
        image: meghalayaImg,
        link: '/destination'
    },
    {
        title: 'Aasam',
        tag: 'Wildlife & Tea',
        description: 'Flexible itineraries & unhurried escapes',
        image: aasamImg,
        link: '/destination'
    },
    {
        title: 'Himachal Pradesh',
        tag: 'Himalayan Serenity',
        description: 'Serene mountain trails, pine valleys & snowy peaks',
        image: himachalImg,
        link: '/destination'
    },
    {
        title: 'Panjab',
        tag: 'Culture & Heritage',
        description: 'Corporate journeys & group experiences',
        image: panjabImg,
        link: '/destination'
    }
];

const POPULAR_TOURS = [
    {
        title: 'Abu Dhabi City Tour',
        image: abuDhabiImg,
        days: 3,
        spots: 8
    },
    {
        title: 'Yas Island Guided Tour',
        image: yasIslandImg,
        days: null,
        spots: 3
    },
    {
        title: 'The ultimate Adventure itinerary',
        image: abuDhabiImg, 
        days: 3,
        spots: 5
    },
    {
        title: 'Dubai Desert Safari',
        image: yasIslandImg, 
        days: 1,
        spots: 12
    },
    {
        title: 'Cultural Heritage Walk',
        image: abuDhabiImg, 
        days: 2,
        spots: 10
    }
];

const FACTS_DATA = [
    {
        id: 1,
        title: 'Record-breaking Speed',
        description: "Did you know Ferrari World Abu Dhabi is home to the world's fastest roller coaster?",
        link: '/destination'
    },
    {
        id: 2,
        title: 'Grand Mosque Splendor',
        description: "Sheikh Zayed Grand Mosque features 82 white marble domes, 24-carat gold chandeliers, and the world's largest hand-knotted carpet.",
        link: '/destination'
    },
    {
        id: 3,
        title: 'Rain of Light Dome',
        description: "Louvre Abu Dhabi's 180-meter geometric dome is crafted from 7,850 metal stars, filtering sunbeams into an enchanting rain of light.",
        link: '/destination'
    },
    {
        id: 4,
        title: 'Living Falconry Heritage',
        description: "Abu Dhabi Falcon Hospital is the world's leading avian center, celebrating centuries of Bedouin falconry tradition and care.",
        link: '/destination'
    },
    {
        id: 5,
        title: 'Pristine Mangrove Sanctuaries',
        description: 'Jubail Mangrove Park spans sprawling coastal reserves offering serene boardwalk walks, kayaking channels, and marine habitats.',
        link: '/destination'
    }
];

const WHY_TRAVEL_LIST = [
    'Expert Local Destination Knowledge',
    'Trusted & Reliable Operations Team',
    'Flexible, Tailor-Made Travel Planning',
    'Private & Group Travel Solutions',
    'Fast & Responsive Customer Support'
];

const DOMESTIC_DESTINATIONS = [
    { title: 'Maharashtra', tours: '2 TOURS', image: maharashtraImg },
    { title: 'Telangana', tours: '2 TOUR', image: telanganaImg },
    { title: 'Darjeeling', tours: '2 TOUR', image: darjeelingImg }
];

const INTERNATIONAL_DESTINATIONS = [
    { title: 'Europe', tours: '2 TOURS', image: europeImg },
    { title: 'Korea', tours: '1 TOUR', image: koreaImg },
    { title: 'Vietnam', tours: '1 TOUR', image: vietnamImg }
];const EditorialServiceCard = ({ service, index }) => (
    <motion.div
        key={service.id || index}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
            duration: 0.65,
            delay: index * 0.08,
            ease: [0.16, 1, 0.3, 1]
        }}
        whileHover={{ y: -6 }}
        className="bg-white rounded-2xl p-8 sm:p-9 shadow-[0_4px_24px_rgba(8,22,52,0.03)] hover:shadow-[0_16px_36px_rgba(8,22,52,0.08)] border border-[#EDE8E0] hover:border-gold/40 transition-all duration-300 flex flex-col items-start h-full text-left group cursor-pointer"
    >
        {/* Original Luxury SVG Icon */}
        <img 
            src={service.icon} 
            alt={service.title} 
            className="w-14 h-14 mb-6 object-contain group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
            decoding="async"
        />

        {/* Title */}
        <h3 className="text-navy text-xl font-serif font-bold mb-3">
            {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed flex-grow mb-6">
            {service.description}
        </p>

        {/* Action Link */}
        <Link 
            to={service.link}
            className="text-gold hover:text-[#B39758] font-semibold text-sm transition-colors flex items-center gap-1.5 mt-auto group/link"
        >
            <span>Learn more</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
        </Link>
    </motion.div>
);

const EditorialDestinationCard = ({ dest, index }) => {
    const cardRef = useRef(null);

    // Subtle scroll-driven parallax for the photograph
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ y: -6 }}
            className="relative rounded-[20px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-[340px] sm:h-[360px] md:h-[375px] w-full group cursor-pointer border border-[#EDE8E0]/40 bg-neutral-900"
        >
            <Link to={dest.link || '/destination'} className="w-full h-full block relative overflow-hidden">
                {/* Scroll Parallax Image Container */}
                <motion.div 
                    style={{ y: imgY }}
                    className="absolute -top-[10%] left-0 w-full h-[120%] pointer-events-none"
                >
                    <img 
                        src={dest.image} 
                        alt={dest.title} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-108 origin-center"
                        loading="lazy"
                        decoding="async"
                    />
                </motion.div>

                {/* Luxury Vignette Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90 pointer-events-none"></div>

                {/* Card Content with Smooth Elevation */}
                <div className="absolute bottom-0 left-0 p-6 text-left z-20 w-full transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white text-xl font-serif font-medium drop-shadow-md">
                            {dest.title}
                        </h3>
                        <span className="text-gold text-base opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-medium">
                            &rarr;
                        </span>
                    </div>
                    <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed drop-shadow-sm">
                        {dest.description}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

const EditorialPlanTripCard = () => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
            duration: 0.7,
            delay: 5 * 0.08,
            ease: [0.16, 1, 0.3, 1]
        }}
        whileHover={{ y: -6 }}
        className="bg-navy rounded-[20px] p-6 shadow-sm hover:shadow-2xl border border-white/5 hover:border-gold/40 transition-all duration-500 h-[340px] sm:h-[360px] md:h-[375px] w-full flex flex-col items-center justify-center text-center group cursor-pointer relative overflow-hidden"
    >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,168,105,0.06),transparent_70%)] pointer-events-none"></div>

        <Link to="/trip" className="flex flex-col items-center justify-center w-full h-full relative z-10">
            <p className="text-gray-300 mb-3 text-xs sm:text-sm font-light">
                Not sure where to start?
            </p>
            <span className="text-gold font-serif text-2xl md:text-3xl group-hover:text-[#DEBA77] transition-colors flex items-center gap-2 font-medium">
                <span>Plan Your Trip</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
            </span>
        </Link>
    </motion.div>
);

const Home = () => {
    const popularCarouselRef = useRef(null);
    const [factIndex, setFactIndex] = useState(0);

    const touchStartX = useRef(null);
    const touchStartY = useRef(null);
    const touchEndX = useRef(null);
    const touchEndY = useRef(null);

    const handleNextFact = () => {
        setFactIndex((prev) => (prev + 1) % FACTS_DATA.length);
    };

    const handlePrevFact = () => {
        setFactIndex((prev) => (prev - 1 + FACTS_DATA.length) % FACTS_DATA.length);
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
        touchStartY.current = e.targetTouches[0].clientY;
        touchEndX.current = null;
        touchEndY.current = null;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
        touchEndY.current = e.targetTouches[0].clientY;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;
        const diffX = touchStartX.current - touchEndX.current;
        const diffY = touchStartY.current - (touchEndY.current ?? touchStartY.current);

        // Detect horizontal swipe if horizontal movement exceeds vertical and is > 35px
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
            if (diffX > 0) {
                handleNextFact();
            } else {
                handlePrevFact();
            }
        }
        touchStartX.current = null;
        touchStartY.current = null;
        touchEndX.current = null;
        touchEndY.current = null;
    };

    const scrollPopularRight = () => {
        if (popularCarouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = popularCarouselRef.current;
            const cardWidth = clientWidth < 640 ? 300 : 424;
            if (scrollLeft + clientWidth >= scrollWidth - 20) {
                popularCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                popularCarouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }
    };

    const scrollPopularLeft = () => {
        if (popularCarouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = popularCarouselRef.current;
            const cardWidth = clientWidth < 640 ? 300 : 424;
            if (scrollLeft <= 20) {
                popularCarouselRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
            } else {
                popularCarouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            }
        }
    };

    // Auto slide Popular Destinations every 10 seconds
    useEffect(() => {
        const autoSlideTimer = setInterval(() => {
            if (popularCarouselRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = popularCarouselRef.current;
                const cardWidth = clientWidth < 640 ? 300 : 424;
                if (scrollLeft + clientWidth >= scrollWidth - 30) {
                    popularCarouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    popularCarouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
                }
            }
        }, 10000);

        return () => clearInterval(autoSlideTimer);
    }, []);

    return (
        <div className="w-full flex flex-col">
            <Seo {...PAGE_META['/']} path="/" />

            {/* Hero Section */}
            <section className="relative w-full h-[85vh] sm:h-[90vh] lg:min-h-screen overflow-hidden flex items-center justify-center bg-navy">
                {/* Background Image — the LCP element, so it loads eagerly at high priority */}
                <img
                    src={heroImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-center z-0 block select-none"
                    fetchPriority="high"
                    decoding="async"
                />

                {/* Subtle Luxury Gradient Overlay for depth and text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-black/10 to-navy/25 z-0 pointer-events-none" />

                {/* Clean Direct Typography */}
                <div className="relative z-10 flex flex-col items-center text-center px-6 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center justify-center"
                    >
                        <h1 className="text-white font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] font-normal">
                            <span>Travel</span>
                            <span className="text-gold text-xs sm:text-sm md:text-base">✦</span>
                            <span>Discover</span>
                            <span className="text-gold text-xs sm:text-sm md:text-base">✦</span>
                            <span>Belong</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Travel Services Section */}
            <section className="w-full bg-[#F8F6F0] py-20 md:py-28 px-6 md:px-12 lg:px-24 xl:px-40 flex flex-col items-center">
                {/* Section Header with Smooth Scroll Reveal */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl text-center mb-16"
                >
                    <h2 className="text-navy text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight">
                        Travel Services Designed Around You
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                        From the first inquiry to the final transfer, every detail is handled by our local team in Vietnam — for private travelers and overseas agency partners alike.
                    </p>
                </motion.div>

                {/* Clean Luxury Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                    {SERVICES.map((service, index) => (
                        <EditorialServiceCard 
                            key={service.id || index} 
                            service={service} 
                            index={index} 
                        />
                    ))}
                </div>
            </section>

            {/* Discover India Section */}
            <section className="w-full bg-white py-20 md:py-28 px-6 md:px-12 lg:px-24 xl:px-40 flex flex-col items-center">
                {/* Header with Smooth Scroll Reveal */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl text-center mb-14"
                >
                    <h2 className="text-navy text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
                        Discover India Your Way
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                        Five ways to experience the country — each shaped into a private, unhurried journey.
                    </p>
                </motion.div>

                {/* Clean Destination Cards Grid with Scroll Parallax */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full max-w-6xl">
                    {DESTINATIONS.map((dest, index) => (
                        <EditorialDestinationCard 
                            key={index} 
                            dest={dest} 
                            index={index} 
                        />
                    ))}

                    {/* CTA Card (6th Card) */}
                    <EditorialPlanTripCard />
                </div>
            </section>

            {/* Facts Section with Abu Dhabi Card Deck Slider */}
            <section
                className="w-full py-20 md:py-28 px-6 md:px-12 lg:px-24 xl:px-32 bg-cover bg-center relative flex items-center min-h-[520px] md:min-h-[580px]"
                style={{ backgroundImage: `url(${factsBgImg})` }}
            >
                <div className="w-full max-w-7xl mx-auto flex justify-center md:justify-end relative z-10">
                    <div 
                        className="relative w-[300px] sm:w-[350px] md:w-[380px] h-[480px] md:h-[500px] shrink-0 flex items-center justify-center group my-6 touch-pan-y"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Navigation Arrows (Hidden on mobile, visible on desktop hover) */}
                        <button
                            type="button"
                            onClick={handlePrevFact}
                            aria-label="Previous card"
                            className="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 w-11 h-11 bg-white hover:bg-gray-50 rounded-full shadow-xl hidden md:flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer text-[#007A65]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={handleNextFact}
                            aria-label="Next card"
                            className="absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 bg-white hover:bg-gray-50 rounded-full shadow-xl hidden md:flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer text-[#007A65]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                        {/* Stacked Cards */}
                        <div className="relative w-full h-full flex items-center justify-center touch-pan-y">
                            {FACTS_DATA.map((fact, index) => {
                                const total = FACTS_DATA.length;
                                const offset = (index - factIndex + total) % total;

                                if (offset > 2) return null;

                                const isTop = offset === 0;
                                const scale = isTop ? 1 : 1 - offset * 0.04;
                                const xOffset = isTop ? 0 : offset * 12;
                                const yOffset = isTop ? 0 : offset * 8;
                                const rotateOffset = isTop ? 0 : offset * 3;
                                const zIndex = 10 - offset;
                                const opacity = isTop ? 1 : offset === 1 ? 0.9 : 0.7;

                                return (
                                    <motion.div
                                        key={fact.id}
                                        className={`absolute inset-0 w-full h-full rounded-[28px] p-7 sm:p-10 flex flex-col justify-between select-none overflow-hidden shadow-[0_12px_40px_rgba(41,38,47,0.15)] touch-pan-y ${
                                            isTop ? 'bg-white cursor-grab active:cursor-grabbing' : 'bg-[#F7F7F7] pointer-events-none'
                                        }`}
                                        style={{
                                            zIndex,
                                            transformOrigin: 'bottom right',
                                            touchAction: 'pan-y',
                                        }}
                                        animate={{
                                            scale,
                                            x: xOffset,
                                            y: yOffset,
                                            rotate: rotateOffset,
                                            opacity,
                                        }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 26,
                                        }}
                                        drag={isTop ? 'x' : false}
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={0.6}
                                        onDragEnd={(_, info) => {
                                            if (info.offset.x < -35 || (info.offset.x < -10 && info.velocity.x < -150)) {
                                                handleNextFact();
                                            } else if (info.offset.x > 35 || (info.offset.x > 10 && info.velocity.x > 150)) {
                                                handlePrevFact();
                                            }
                                        }}
                                    >
                                        {/* Background Watermark */}
                                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
                                            <img
                                                src={watermarkImg}
                                                alt=""
                                                className="absolute top-0 right-0 h-full w-auto object-cover opacity-85 pointer-events-none select-none"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>

                                        {/* Card Content */}
                                        <div className="relative z-10 flex flex-col h-full justify-between">
                                            <div>
                                                {/* Icon */}
                                                <div className="mb-6 text-[#007A65]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                                    </svg>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-5 leading-tight tracking-tight">
                                                    {fact.title.includes('Speed') ? (
                                                        <>
                                                            Record-<br />breaking Speed
                                                        </>
                                                    ) : (
                                                        fact.title
                                                    )}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-gray-500 text-sm sm:text-[0.95rem] leading-relaxed mb-6 font-normal">
                                                    {fact.description}
                                                </p>
                                            </div>

                                            {/* Bottom CTA */}
                                            <div className="pt-4">
                                                <Link
                                                    to={fact.link}
                                                    className="inline-flex items-center text-[#007A65] font-bold text-xs sm:text-[13px] tracking-wider uppercase hover:text-[#005c4c] transition-colors py-1.5 px-3 border border-gray-800 rounded hover:bg-gray-50"
                                                >
                                                    <span>LEARN MORE</span>
                                                    <span className="ml-2 font-bold">&gt;</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Pagination Dots */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                            {FACTS_DATA.map((fact, index) => {
                                const isActive = factIndex === index;
                                return (
                                    <button
                                        key={fact.id}
                                        type="button"
                                        onClick={() => setFactIndex(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                        className={`transition-all duration-200 cursor-pointer flex items-center justify-center p-1.5 ${
                                            isActive
                                                ? 'w-4 h-4 rounded-full border border-white bg-transparent'
                                                : 'w-3 h-3 rounded-full bg-white/50 hover:bg-white/80'
                                        }`}
                                    >
                                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Destinations Section */}
            <section className="w-full bg-navy relative overflow-hidden py-20 md:py-28 lg:py-32 pl-6 md:pl-12 lg:pl-20 xl:pl-32 pr-6 md:pr-12 lg:pr-0 flex flex-col items-center">
                {/* Watermarks */}
                <img src={popWatermark1} alt="" className="absolute top-0 left-0 w-48 md:w-auto md:h-full md:max-w-none opacity-30 md:opacity-100 pointer-events-none z-0" loading="lazy" decoding="async" />
                <img src={popWatermark2} alt="" className="absolute top-0 right-0 w-32 md:w-auto opacity-30 md:opacity-100 pointer-events-none z-0" loading="lazy" decoding="async" />
                
                {/* Content */}
                <div className="relative z-10 w-full flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-20 items-start lg:items-center">
                    {/* Left text */}
                    <div className="lg:w-[28%] xl:w-[26%] text-left w-full pr-0 lg:pr-4 flex flex-col items-start flex-shrink-0">
                        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-serif mb-6 leading-tight">
                            Popular<br/>Destinations
                        </h2>
                        <Link 
                            to="/tours" 
                            className="group text-white font-bold text-xs tracking-widest uppercase inline-flex items-center hover:text-[#fbbc42] transition-colors py-1"
                        >
                            <span>SEE ALL ITINERARIES</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>

                        {/* Mobile Navigation Arrows */}
                        <div className="flex items-center gap-3 mt-6 lg:hidden">
                            <button
                                type="button"
                                onClick={scrollPopularLeft}
                                aria-label="Previous destination"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={scrollPopularRight}
                                aria-label="Next destination"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right carousel */}
                    <div className="lg:w-[72%] xl:w-[74%] w-full relative">
                        <div 
                            ref={popularCarouselRef}
                            className="flex overflow-x-auto gap-5 sm:gap-6 pb-6 pt-2 pr-6 md:pr-12 lg:pr-16 snap-x snap-mandatory scroll-smooth touch-pan-x" 
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                        >
                            {POPULAR_TOURS.map((tour, index) => (
                                <Link 
                                    to="/tours"
                                    key={index} 
                                    className="w-[280px] sm:w-[340px] md:w-[380px] bg-white rounded-3xl overflow-hidden shadow-xl snap-start flex-shrink-0 relative group cursor-pointer flex flex-col h-[390px] sm:h-[410px] transition-transform duration-300 hover:-translate-y-1 block"
                                >
                                    <div className="h-[55%] overflow-hidden relative">
                                        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" loading="lazy" decoding="async" />
                                    </div>
                                    <div className="p-6 sm:p-7 bg-white flex flex-col flex-grow justify-between text-left">
                                        <h3 className="text-gray-900 group-hover:text-[#0ea5e9] font-bold text-lg sm:text-xl md:text-2xl line-clamp-2 leading-snug transition-colors duration-300">{tour.title}</h3>
                                        
                                        <div className="flex items-center space-x-6 text-gray-400 text-[11px] font-bold tracking-wide uppercase border-t border-gray-100 pt-4 mt-auto">
                                            {tour.days && (
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    {tour.days} DAYS
                                                </div>
                                            )}
                                            {tour.spots && (
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                                    {tour.spots} SPOTS
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        
                        {/* Left Slider Arrow */}
                        <button 
                            type="button"
                            onClick={scrollPopularLeft}
                            aria-label="Scroll left"
                            className="absolute -left-4 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 hover:scale-110 active:scale-95 transition-transform hidden sm:flex items-center justify-center cursor-pointer drop-shadow-2xl"
                        >
                            <img src={sliderBtnImg} alt="Previous" className="w-12 lg:w-14 h-12 lg:h-14 object-contain rounded-full rotate-180" loading="lazy" decoding="async" />
                        </button>

                        {/* Right Slider Arrow */}
                        <button 
                            type="button"
                            onClick={scrollPopularRight}
                            aria-label="Scroll right"
                            className="absolute right-4 sm:right-6 md:right-8 lg:right-12 xl:right-16 top-1/2 -translate-y-1/2 z-30 hover:scale-110 active:scale-95 transition-transform hidden sm:flex items-center justify-center cursor-pointer drop-shadow-2xl"
                        >
                            <img src={sliderBtnImg} alt="Next" className="w-12 lg:w-14 h-12 lg:h-14 object-contain rounded-full" loading="lazy" decoding="async" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Why Travel Section */}
            <section className="w-full bg-[#F8F6F0] py-24 md:py-32 px-6 md:px-12 lg:px-24 xl:px-40 flex justify-center overflow-hidden">
                <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-16 lg:gap-24 pl-4 md:pl-8">
                    {/* Left Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full md:w-1/2 relative mt-8 md:mt-0 group"
                    >
                        <div className="overflow-hidden rounded-[2rem] shadow-xl">
                            <img
                                src={planTripImg}
                                alt="Plan your trip"
                                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        
                        {/* Overlay Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35, duration: 0.6, type: 'spring', stiffness: 200 }}
                            className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 bg-navy p-5 md:p-6 rounded-2xl shadow-2xl min-w-[200px] border border-white/10 hover:scale-105 transition-transform duration-300 cursor-pointer"
                        >
                            <h4 className="text-gold font-serif text-base md:text-lg font-semibold mb-1">
                                Trusted India DMC
                            </h4>
                            <p className="text-gray-300 text-xs md:text-sm">
                                Based in Ho Chi Minh City
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full md:w-1/2 flex flex-col items-start mt-12 md:mt-0"
                    >
                        <h2 className="text-navy text-4xl md:text-5xl font-serif font-bold mb-10 leading-tight">
                            Why Travel with Asian<br/>Star Travel
                        </h2>
                        
                        <div className="flex flex-col space-y-5 mb-10 w-full">
                            {WHY_TRAVEL_LIST.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="flex items-center group cursor-pointer hover:translate-x-2 transition-transform duration-200"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#fdf5e6] group-hover:bg-gold/20 flex items-center justify-center mr-4 flex-shrink-0 transition-colors duration-200 shadow-sm">
                                        <svg className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <span className="text-[#2a3b5c] font-semibold text-sm md:text-base group-hover:text-navy transition-colors">
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                        
                        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                            <Link
                                to="/trip"
                                className="bg-navy hover:bg-[#0a1f4a] text-white font-semibold py-3.5 px-8 rounded-full text-sm tracking-wide shadow-lg hover:shadow-xl hover:shadow-navy/25 transition-all duration-300 inline-flex items-center gap-2 group"
                            >
                                <span>Plan Your Trip</span>
                                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-bold">&rarr;</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Popular Domestic Destinations */}
            <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-24 xl:px-40 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl mb-12"
                >
                    <h2 className="text-navy text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
                        Popular Domestic Destinations
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto font-normal">
                        Browse tours by destination across Vietnam.
                    </p>
                </motion.div>
                
                <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {DOMESTIC_DESTINATIONS.map((dest, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            whileHover={{ y: -6 }}
                            className="relative rounded-[22px] overflow-hidden shadow-[0_4px_20px_rgba(8,22,52,0.06)] hover:shadow-[0_20px_45px_rgba(8,22,52,0.14)] transition-all duration-500 h-[420px] lg:h-[460px] group cursor-pointer w-full bg-neutral-900"
                        >
                            <Link to="/destination" className="w-full h-full block relative overflow-hidden">
                                <img
                                    src={dest.image}
                                    alt={dest.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-108"
                                    loading="lazy"
                                    decoding="async"
                                />
                                
                                {/* Luxury Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent transition-opacity duration-500 group-hover:from-navy"></div>
                                
                                {/* Text Content */}
                                <div className="absolute bottom-0 left-0 p-8 text-left z-10 w-full transition-transform duration-300 group-hover:-translate-y-1">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <h3 className="text-white font-serif text-2xl lg:text-3xl font-medium tracking-tight">
                                            {dest.title}
                                        </h3>
                                        <span className="text-gold text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-bold">
                                            &rarr;
                                        </span>
                                    </div>
                                    <p className="text-gold text-xs font-bold tracking-widest uppercase">
                                        {dest.tours}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                    <Link
                        to="/destination"
                        className="border border-gray-400 hover:border-navy hover:bg-navy hover:text-white transition-all duration-300 text-gray-700 text-xs font-bold tracking-widest uppercase py-3.5 px-8 rounded-full inline-flex items-center gap-2 group shadow-sm hover:shadow-lg"
                    >
                        <span>READ MORE</span>
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
                    </Link>
                </motion.div>
            </section>

            {/* Best International Destinations */}
            <section className="w-full bg-white pb-24 px-6 md:px-12 lg:px-24 xl:px-40 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl mb-12"
                >
                    <h2 className="text-navy text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
                        Best International Destinations
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto font-normal">
                        Browse tours by destination across Vietnam.
                    </p>
                </motion.div>
                
                <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {INTERNATIONAL_DESTINATIONS.map((dest, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            whileHover={{ y: -6 }}
                            className="relative rounded-[22px] overflow-hidden shadow-[0_4px_20px_rgba(8,22,52,0.06)] hover:shadow-[0_20px_45px_rgba(8,22,52,0.14)] transition-all duration-500 h-[420px] lg:h-[460px] group cursor-pointer w-full bg-neutral-900"
                        >
                            <Link to="/destination" className="w-full h-full block relative overflow-hidden">
                                <img
                                    src={dest.image}
                                    alt={dest.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-108"
                                    loading="lazy"
                                    decoding="async"
                                />
                                
                                {/* Luxury Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent transition-opacity duration-500 group-hover:from-navy"></div>
                                
                                {/* Text Content */}
                                <div className="absolute bottom-0 left-0 p-8 text-left z-10 w-full transition-transform duration-300 group-hover:-translate-y-1">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <h3 className="text-white font-serif text-2xl lg:text-3xl font-medium tracking-tight">
                                            {dest.title}
                                        </h3>
                                        <span className="text-gold text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-bold">
                                            &rarr;
                                        </span>
                                    </div>
                                    <p className="text-gold text-xs font-bold tracking-widest uppercase">
                                        {dest.tours}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                    <Link
                        to="/destination"
                        className="border border-gray-400 hover:border-navy hover:bg-navy hover:text-white transition-all duration-300 text-gray-700 text-xs font-bold tracking-widest uppercase py-3.5 px-8 rounded-full inline-flex items-center gap-2 group shadow-sm hover:shadow-lg"
                    >
                        <span>READ MORE</span>
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
                    </Link>
                </motion.div>
            </section>

            {/* Discover Vietnam CTA Section */}
            <section className="w-full relative py-16 md:py-20 lg:py-24 flex flex-col items-center text-center px-6 overflow-hidden">
                <motion.img
                    src={discoverVietnamImg}
                    alt="Discover Vietnam"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/35 to-navy/65 z-0"></div>
                
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 flex flex-col items-center max-w-3xl"
                >
                    <span className="text-[#EAB308] text-xs font-bold tracking-[0.2em] uppercase mb-2.5 inline-block drop-shadow">
                        DISCOVER VIETNAM · TIMELESS CHARM
                    </span>
                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-serif font-medium mb-4 leading-tight drop-shadow-md">
                        Begin Your Journey Around<br/>The World
                    </h2>
                    <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-6 max-w-xl leading-relaxed drop-shadow">
                        Tell us your travel style, group size, and preferred dates. Our local team will help craft the right program.
                    </p>
                    
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="mb-2">
                        <Link
                            to="/contact"
                            className="bg-[#EAB308] hover:bg-[#FACC15] text-navy font-bold py-3.5 px-9 rounded-full text-sm tracking-wide shadow-[0_6px_25px_rgba(234,179,8,0.35)] hover:shadow-[0_10px_35px_rgba(234,179,8,0.45)] transition-all duration-300 inline-block"
                        >
                            Send Travel Request
                        </Link>
                    </motion.div>
                    
                    <p className="text-gray-300 text-[11px] sm:text-xs mb-6 font-light tracking-wide">
                        Typical reply within one business day.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            to="/trip"
                            className="border border-white/60 hover:border-white hover:bg-white hover:text-navy transition-all duration-300 text-white text-xs font-medium py-2 px-5 rounded-full backdrop-blur-xs"
                        >
                            Private travelers
                        </Link>
                        <Link
                            to="/services"
                            className="border border-white/60 hover:border-white hover:bg-white hover:text-navy transition-all duration-300 text-white text-xs font-medium py-2 px-5 rounded-full backdrop-blur-xs"
                        >
                            Travel agencies & tour operators
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
