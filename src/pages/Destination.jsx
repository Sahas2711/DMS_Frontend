import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import heroImage from '../assets/destination/Destination-hero-image.webp';
import chooseSupportImg from '../assets/destination/Choose-your-support.webp';
import StarIcon from '../components/icons/StarIcon';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { PAGE_META, SITE } from '../config/site';
import { itemListSchema } from '../config/structuredData';
import { fetchDestinations, fetchTours } from '../services/api/cms';

const AnimatedCounter = ({ value, duration = 2, decimals = 0, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    useEffect(() => {
        if (!isInView) return;
        let startTime = null;
        let animationFrameId;

        const startVal = 0;
        const endVal = Number(value);

        const animateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = startVal + (endVal - startVal) * easeProgress;
            setCount(current);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animateCount);
            } else {
                setCount(endVal);
            }
        };

        animationFrameId = requestAnimationFrame(animateCount);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {prefix}
            {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
            {suffix}
        </span>
    );
};

const FEATURED_AIRPORTS = [
    { code: "SIN - Singapore", place: "Singapore Changi", description: "An effortless handover from kerbside welcome to lounge-ready departure.", service: "Arrival & departure", bg: "bg-[#e7f3fd]" },
    { code: "DXB - Dubai", place: "Dubai International", description: "A considered path through one of the world's busiest international hubs.", service: "Arrival, departure & transit", bg: "bg-[#0f2947]" },
    { code: "LHR - London", place: "London Heathrow", description: "Tight connections and terminal changes, handled with calm precision.", service: "Arrival & departure", bg: "bg-[#52b1e6]" },
    { code: "BKK - Bangkok", place: "Suvarnabhumi", description: "A warm local welcome and smoother passage through the terminal.", service: "Arrival & departure", bg: "bg-[#f2b84b]" },
];

const Destination = () => {
    const [featured, setFeatured] = useState(FEATURED_AIRPORTS);

    // Live CMS destinations — the static airports above are the offline
    // fallback used when the backend is unreachable.
    useEffect(() => {
        let cancelled = false;

        Promise.allSettled([
            fetchDestinations({ pageSize: 6 }),
            fetchTours({ pageSize: 100 }),
        ]).then(([destsRes]) => {
            if (cancelled) return;
            const items = (destsRes.status === 'fulfilled' ? destsRes.value?.items : []) || [];
            if (!items.length) return;
            const colors = ["bg-[#e7f3fd]", "bg-[#0f2947]", "bg-[#52b1e6]", "bg-[#f2b84b]"];
            setFeatured(
                items.slice(0, 4).map((d, i) => ({
                    code: `${d.code || d.name.slice(0, 3).toUpperCase()} - ${d.country || d.name}`,
                    place: d.name,
                    description: d.short_description || d.country || 'Concierge support coordinated by our local team.',
                    service: "Arrival & departure",
                    bg: colors[i % colors.length],
                    link: `/destination/${d.slug}`,
                }))
            );
        });

        return () => {
            cancelled = true;
        };
    }, []);

    const scrollToFeatured = () => {
        const element = document.getElementById('featured-destinations');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full">
            <Seo {...PAGE_META['/destination']} path="/destination" />
            <JsonLd data={[itemListSchema(featured)]} />

            {/* Hero Section — animated, so it keeps its own markup rather than
                using the shared <PageHero /> */}
            <section className="relative w-full h-[50vh] md:h-[65vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <img
                    src={heroImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover z-0 scale-105 animate-fade-in"
                    fetchPriority="high"
                    decoding="async"
                />

                {/* Overlay to improve text readability */}
                <div className="absolute inset-0 bg-navy/30 z-0" aria-hidden="true"></div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 flex flex-col items-center text-center px-6 -mt-10"
                >
                    <StarIcon />

                    <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif tracking-widest mb-6">
                        {SITE.wordmark}
                    </h1>

                    {/* Gold separator line */}
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "6rem" }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        className="h-[1px] bg-gold mb-6"
                    />

                    <p className="text-white text-sm md:text-base font-light tracking-wide uppercase">
                        Destinations
                    </p>
                </motion.div>
            </section>

            {/* Find Your Airport Section */}
            <section className="w-full bg-[#F3F2EE] py-24 px-6 md:px-12 lg:px-24 flex justify-center overflow-hidden">
                <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                    {/* Left Side Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full lg:w-1/2 flex flex-col text-left mt-4 pr-0 lg:pr-12"
                    >
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center text-ink text-xs font-bold mb-6 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full w-fit shadow-sm border border-gray-200/60"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 text-navy">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                            Concierge support across 80+ airports
                        </motion.div>

                        <h2 className="text-navy text-4xl md:text-5xl lg:text-[48px] font-bold leading-[1.1] mb-6">
                            Your smoothest airport moment starts with the right destination.
                        </h2>

                        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
                            Discover the airports where AeroPass coordinates a more considered arrival, departure, or connection—then tailor the service around your exact flight.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10 border-b border-gray-200/80 pb-10">
                            <motion.button 
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={scrollToFeatured}
                                className="group bg-navy hover:bg-[#122345] text-white font-medium py-3.5 px-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center text-sm"
                            >
                                <span>Explore airports</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 ml-2 mt-0.5 transition-transform duration-300 group-hover:translate-y-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                </svg>
                            </motion.button>
                            <motion.div
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                <Link 
                                    to="/services/ground-services"
                                    className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-navy font-medium py-3.5 px-6 rounded-md transition-all duration-300 shadow-sm hover:shadow-md text-sm border border-gray-200/80"
                                >
                                    Arrange ground support
                                </Link>
                            </motion.div>
                        </div>

                        {/* Stats with Animated Counters */}
                        <div className="flex items-center gap-10 md:gap-12 w-full max-w-lg">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="flex flex-col"
                            >
                                <span className="text-navy text-2xl md:text-[26px] font-bold mb-1">
                                    <AnimatedCounter value={80} suffix="+" />
                                </span>
                                <span className="text-gray-500 text-[11px] font-medium tracking-wide">Airport partners</span>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex flex-col"
                            >
                                <span className="text-navy text-2xl md:text-[26px] font-bold mb-1">24/7</span>
                                <span className="text-gray-500 text-[11px] font-medium tracking-wide">Flight monitoring</span>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex flex-col"
                            >
                                <span className="text-navy text-2xl md:text-[26px] font-bold mb-1">
                                    <AnimatedCounter value={4} suffix=" regions" />
                                </span>
                                <span className="text-gray-500 text-[11px] font-medium tracking-wide">Global coverage</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side Form Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30, scale: 0.98 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full lg:w-1/2 flex justify-end"
                    >
                        <div className="bg-navy rounded-[24px] p-8 md:p-10 shadow-2xl flex flex-col w-full max-w-[540px] relative border border-white/10 hover:border-white/20 transition-all duration-300">
                            <span className="text-[#94a3b8] text-[10px] font-bold tracking-widest mb-3 uppercase">Find your airport</span>
                            <h3 className="text-white text-2xl md:text-[28px] font-bold mb-8 leading-snug">Start with the journey you are taking.</h3>

                            <form className="flex flex-col gap-5">
                                <div className="flex flex-col text-left">
                                    <label className="text-white text-[11px] font-medium mb-2" htmlFor="destination-destinationAirport">Destination airport</label>
                                    <input id="destination-destinationAirport" name="destinationAirport"
                                        type="text"
                                        placeholder="Search city or airport code"
                                        className="w-full px-4 py-3.5 rounded-[6px] border border-transparent focus:border-[#0ea5e9] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/30 text-sm text-gray-800 bg-white shadow-sm placeholder-gray-400 transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col text-left">
                                        <label className="text-white text-[11px] font-medium mb-2" htmlFor="destination-travelDate">Travel date</label>
                                        <input id="destination-travelDate" name="travelDate"
                                            type="text"
                                            placeholder="DD / MM / YYYY"
                                            className="w-full px-4 py-3.5 rounded-[6px] border border-transparent focus:border-[#0ea5e9] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/30 text-sm text-gray-800 bg-white shadow-sm placeholder-gray-400 transition-all"
                                        />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <label className="text-white text-[11px] font-medium mb-2" htmlFor="destination-journeyType">Journey type</label>
                                        <div className="relative">
                                            <select id="destination-journeyType" name="journeyType" 
                                                defaultValue=""
                                                className="w-full px-4 py-3.5 rounded-[6px] border border-transparent focus:border-[#0ea5e9] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/30 text-sm text-gray-700 appearance-none bg-white shadow-sm transition-all cursor-pointer"
                                            >
                                                <option value="" disabled className="text-gray-400">Select journey type</option>
                                                <option value="arrival" className="text-gray-700">Arrival</option>
                                                <option value="departure" className="text-gray-700">Departure</option>
                                                <option value="connection" className="text-gray-700">Connection</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full mt-2"
                                >
                                    <Link
                                        to="/booking"
                                        className="group w-full bg-[#0e2142] hover:bg-[#122a52] text-[#8ab4f8] hover:text-white font-medium text-[13px] py-4 rounded-[6px] transition-all duration-300 shadow-inner flex justify-center items-center gap-2 border border-[#162d59] hover:border-[#20407a]"
                                    >
                                        <span>Check availability</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                    </Link>
                                </motion.div>

                                <p className="text-[#94a3b8] text-[10px] mt-2 leading-relaxed">
                                    We confirm the exact concierge options available for your terminal and flight schedule.
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Destinations Section */}
            <section id="featured-destinations" className="w-full bg-white py-24 px-6 md:px-12 lg:px-24 flex justify-center overflow-hidden">
                <div className="w-full max-w-7xl flex flex-col">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col text-left max-w-2xl"
                        >
                            <span className="text-[#94a3b8] text-[11px] font-bold tracking-wider mb-4 uppercase">Featured destinations</span>
                            <h2 className="text-navy text-3xl md:text-4xl lg:text-[44px] font-bold leading-tight">
                                Airport expertise in the cities that move the world.
                            </h2>
                        </motion.div>

                        <motion.p 
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[#64748b] text-sm md:text-base leading-relaxed max-w-sm text-left md:text-right pb-2"
                        >
                            Each airport has its own rhythm. Our local teams know how to make yours feel more seamless.
                        </motion.p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {featured.map((airport, index) => (
                            <motion.div 
                                key={airport.place}
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
                                className="group bg-white rounded-2xl shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.12)] border border-gray-100/90 hover:border-gray-200 flex flex-col overflow-hidden h-full transition-all duration-300 cursor-pointer"
                            >
                                <Link to={airport.link || "/booking"} className="flex flex-col h-full w-full">
                                    {/* Top color block */}
                                    <div className={`${airport.bg} h-[210px] w-full p-6 flex items-end relative overflow-hidden`}>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="bg-white text-ink text-[10px] font-bold py-1.5 px-3 rounded-md shadow-sm relative z-10 group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
                                            {airport.code}
                                        </div>
                                    </div>
                                    {/* Content */}
                                    <div className="p-6 md:p-7 flex flex-col flex-grow text-left">
                                        <h3 className="text-ink group-hover:text-[#0ea5e9] text-[17px] font-bold mb-2 transition-colors duration-300">
                                            {airport.place}
                                        </h3>
                                        <p className="text-[#64748b] text-[14px] leading-relaxed">
                                            {airport.description}
                                        </p>
                                        <div className="flex items-center text-ink text-[11px] font-bold mt-auto pt-8">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 mr-2 text-[#64748b] group-hover:text-[#0ea5e9] group-hover:scale-110 transition-all duration-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            {airport.service}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Choose Your Support Section */}
            <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 flex justify-center items-center overflow-hidden min-h-[600px]">
                {/* Background Image */}
                <img
                    src={chooseSupportImg}
                    alt="Choose your support"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    loading="lazy"
                    decoding="async"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-[#06112a]/50 z-0"></div>

                <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                    {/* Left Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full lg:w-1/2 flex flex-col text-left"
                    >
                        <span className="text-[#fbbc42] text-[11px] font-bold tracking-wider mb-4 uppercase">Choose your support</span>
                        <h2 className="text-white text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight mb-6">
                            The destination is only the beginning.
                        </h2>
                        <p className="text-gray-200 text-sm md:text-[15px] leading-relaxed mb-12 max-w-lg">
                            Whether you need an efficient route through formalities or a fully coordinated terminal experience, your local service plan is built around the journey ahead.
                        </p>

                        <div className="flex flex-col gap-5">
                            {/* Fast Track Card */}
                            <motion.div
                                whileHover={{ y: -4, scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link 
                                    to="/services/airport-fast-track"
                                    className="group bg-white rounded-[16px] p-6 shadow-lg hover:shadow-2xl flex items-start gap-6 transition-all duration-300 block"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="bg-[#e7f3fd] group-hover:bg-[#0ea5e9] w-12 h-12 rounded-[10px] flex-shrink-0 flex items-center justify-center transition-colors duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#0f2947] group-hover:text-white transition-colors duration-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="text-navy group-hover:text-[#0ea5e9] text-[15px] font-bold mb-1 transition-colors duration-300">Airport Fast Track</h4>
                                            <p className="text-[#64748b] text-[14px] leading-relaxed mb-4">
                                                Priority guidance through airport formalities when every minute matters.
                                            </p>
                                            <div className="flex items-center text-[#0f2947] group-hover:text-[#0ea5e9] text-[11px] font-bold transition-colors duration-300">
                                                <span>Explore Fast Track</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* Ground Services Card */}
                            <motion.div
                                whileHover={{ y: -4, scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link 
                                    to="/services/ground-services"
                                    className="group bg-white rounded-[16px] p-6 shadow-lg hover:shadow-2xl flex items-start gap-6 transition-all duration-300 block"
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="bg-[#e7f3fd] group-hover:bg-[#0ea5e9] w-12 h-12 rounded-[10px] flex-shrink-0 flex items-center justify-center transition-colors duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#0f2947] group-hover:text-white transition-colors duration-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="text-navy group-hover:text-[#0ea5e9] text-[15px] font-bold mb-1 transition-colors duration-300">Ground Services</h4>
                                            <p className="text-[#64748b] text-[14px] leading-relaxed mb-4">
                                                Meet & greet, baggage assistance, lounge coordination, and airside support.
                                            </p>
                                            <div className="flex items-center text-[#0f2947] group-hover:text-[#0ea5e9] text-[11px] font-bold transition-colors duration-300">
                                                <span>Explore Ground Services</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full lg:w-1/2 flex justify-end mt-10 lg:mt-0"
                    >
                        <div className="bg-[#eef6fe] rounded-2xl p-8 md:p-10 flex flex-col text-left w-full max-w-[540px] shadow-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-[#0f2947] mb-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>

                            <h3 className="text-navy text-2xl font-bold mb-4">Not seeing your airport?</h3>
                            <p className="text-[#4b5e7d] text-[13px] leading-relaxed mb-6">
                                Our coverage grows with our travellers. Share your itinerary and our concierge team will check local availability for you.
                            </p>

                            {/* Inner white card */}
                            <div className="bg-white rounded-xl p-6 flex flex-col gap-6 shadow-sm border border-gray-100/80 mb-6">
                                {/* Item 1 */}
                                <div className="flex items-start gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-[18px] h-[18px] text-[#3872c9] mt-0.5 flex-shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <div className="flex flex-col">
                                        <span className="text-navy text-[12px] font-bold mb-1">Flight-aware support</span>
                                        <span className="text-[#64748b] text-[12px]">We work around live flight timings.</span>
                                    </div>
                                </div>
                                {/* Item 2 */}
                                <div className="flex items-start gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-[18px] h-[18px] text-[#3872c9] mt-0.5 flex-shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <div className="flex flex-col">
                                        <span className="text-navy text-[12px] font-bold mb-1">Confirmed before you travel</span>
                                        <span className="text-[#64748b] text-[12px]">No assumptions—just a clear service plan.</span>
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    to="/contact-us"
                                    className="group w-full bg-navy hover:bg-[#122345] text-white text-xs font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    <span>Contact Concierge Team</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Destination;
