import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from '../../assets/services/AirportTrack-hero.webp';
import globalCoverageImg from '../../assets/services/global-coverage.webp';
import arrivalsImg from '../../assets/services/arivals.webp';
import watermark1 from '../../assets/home/watermark1-Popular-Destinations.png';
import PageHero from '../../components/PageHero';
import Seo from '../../components/Seo';
import { PAGE_META } from '../../config/site';

gsap.registerPlugin(ScrollTrigger);

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
            // Ease out cubic
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
        return () => cancelAnimationFrame(animationFrameId);
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {prefix}
            {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
            {suffix}
        </span>
    );
};

const ServicesAirportFastTrack = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const coverageImgWrapperRef = useRef(null);
    const coverageImgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (coverageImgWrapperRef.current && coverageImgRef.current) {
                gsap.fromTo(
                    coverageImgWrapperRef.current,
                    {
                        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                    },
                    {
                        scrollTrigger: {
                            trigger: coverageImgWrapperRef.current,
                            start: "top 95%",
                            toggleActions: "play reverse play reverse",
                        },
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        duration: 2,
                        ease: "power3.inOut",
                    }
                );

                gsap.fromTo(
                    coverageImgRef.current,
                    { scale: 1.2 },
                    {
                        scrollTrigger: {
                            trigger: coverageImgWrapperRef.current,
                            start: "top 95%",
                            toggleActions: "play reverse play reverse",
                        },
                        scale: 1,
                        duration: 2,
                        ease: "power3.inOut",
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqItems = [
        { question: "How far in advance should I book?", answer: "We recommend booking at least 48 hours in advance to guarantee availability, though we can often accommodate last-minute requests depending on the airport." },
        { question: "Does fast track guarantee priority immigration?", answer: "In most airports, yes. Fast track lanes are designated for premium passengers and our service grants you access to these expedited queues." },
        { question: "Can you help families or travelers needing extra assistance?", answer: "Absolutely. Our hosts are experienced in assisting families with children, elderly travelers, and those requiring wheelchair assistance." }
    ];

    return (
        <div className="w-full">
            <Seo {...PAGE_META['/services/airport-fast-track']} path="/services/airport-fast-track" />

            <PageHero
                image={heroImage}
                alt=""
                eyebrow="Services / Airport Fast Track"
                rule="wide"
            />

            {/* Stats Section */}
            <section className="w-full bg-white py-8 md:py-12 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 text-center">

                    {/* Stat 1 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col items-center w-full md:w-1/4"
                    >
                        <span className="text-2xl md:text-3xl font-bold text-navy-light mb-1 md:mb-2">
                            <AnimatedCounter value={60} suffix="+" duration={2} />
                        </span>
                        <span className="text-xs md:text-sm text-[#7f8c9f]">international airports</span>
                    </motion.div>

                    {/* Stat 2 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col items-center w-full md:w-1/4"
                    >
                        <span className="text-2xl md:text-3xl font-bold text-navy-light mb-1 md:mb-2 inline-flex items-center">
                            <AnimatedCounter value={24} duration={1.5} />/<AnimatedCounter value={7} duration={1.5} />
                        </span>
                        <span className="text-xs md:text-sm text-[#7f8c9f]">global support</span>
                    </motion.div>

                    {/* Stat 3 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col items-center w-full md:w-1/4"
                    >
                        <span className="text-2xl md:text-3xl font-bold text-navy-light mb-1 md:mb-2 inline-flex items-center">
                            <AnimatedCounter value={4.9} decimals={1} duration={2} />/5
                        </span>
                        <span className="text-xs md:text-sm text-[#7f8c9f]">traveler satisfaction</span>
                    </motion.div>

                    {/* Stat 4 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col items-center w-full md:w-1/4"
                    >
                        <span className="text-2xl md:text-3xl font-bold text-navy-light mb-1 md:mb-2">
                            <AnimatedCounter value={15} suffix=" min" duration={1.8} />
                        </span>
                        <span className="text-xs md:text-sm text-[#7f8c9f]">average response time</span>
                    </motion.div>

                </div>
            </section>

            {/* Global Coverage Section */}
            <section className="w-full bg-[#F3F2EE] py-20 px-6 md:px-12 lg:px-24 xl:px-40 flex justify-center">
                <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Side: Image */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                        <div 
                            ref={coverageImgWrapperRef}
                            className="w-full max-w-[600px] rounded-2xl overflow-hidden shadow-xl"
                            style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
                        >
                            <img
                                ref={coverageImgRef}
                                src={globalCoverageImg}
                                alt="Global Coverage"
                                className="w-full h-auto object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                        <span className="text-[#2b7bb5] text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase mb-4 block">
                            Global Coverage
                        </span>

                        <h2 className="text-ink text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6">
                            A warm welcome across the <br className="hidden lg:block" />
                            world's busiest terminals.
                        </h2>

                        <p className="text-gray-500 text-sm leading-relaxed mb-10">
                            From business capitals to long-haul hubs, Asian Star Travel partners with local
                            airport specialists who know every terminal turn.
                        </p>

                        {/* 2x2 Grid for Regions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">

                            {/* Card 1 */}
                            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex flex-col justify-center">
                                <h4 className="text-ink text-sm font-bold mb-1">Asia Pacific</h4>
                                <p className="text-gray-400 text-xs">Singapore · Bangkok · Seoul</p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex flex-col justify-center">
                                <h4 className="text-ink text-sm font-bold mb-1">Middle East</h4>
                                <p className="text-gray-400 text-xs">Dubai · Doha · Abu Dhabi</p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex flex-col justify-center">
                                <h4 className="text-ink text-sm font-bold mb-1">Europe</h4>
                                <p className="text-gray-400 text-xs">London · Paris · Rome</p>
                            </div>

                            {/* Card 4 */}
                            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex flex-col justify-center">
                                <h4 className="text-ink text-sm font-bold mb-1">Americas</h4>
                                <p className="text-gray-400 text-xs">New York · Miami · Toronto</p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* Arrivals/Booking Section */}
            <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 xl:px-40 flex items-center justify-center min-h-[80vh]">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={arrivalsImg}
                        alt="Arrivals"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Left Side Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                        {/* Pill Badge */}
                        <div className="flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full mb-8 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#2b7bb5] mr-2">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                            </svg>
                            <span className="text-ink text-xs font-semibold">Meet, assist, and glide through arrivals</span>
                        </div>

                        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Arrive like every <br className="hidden lg:block" /> minute matters.
                        </h2>

                        <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
                            A personal airport host meets you at the gate, guides you through priority
                            formalities, and gets you onward with calm, confident ease.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gold mr-2">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                                <span className="text-white text-sm font-medium">Arrival & departure service</span>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gold mr-2">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                                <span className="text-white text-sm font-medium">Trusted local hosts</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Form Card */}
                    <div className="w-full lg:w-[450px] bg-white rounded-xl shadow-2xl p-6 md:p-8 relative">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-ink text-xl md:text-2xl font-bold">Plan your fast track</h3>
                            <span className="bg-[#eff6ff] text-[#1d4ed8] text-[10px] font-bold px-2 py-1 rounded-md">24/7 support</span>
                        </div>
                        <p className="text-gray-500 text-xs mb-6">Get a confirmed itinerary within 2 hours.</p>

                        <form className="flex flex-col space-y-5">
                            {/* Service direction */}
                            <div className="flex flex-col">
                                <label className="text-ink text-xs font-semibold mb-2" htmlFor="servicesairportfasttrack-serviceDirection">Service direction</label>
                                <select id="servicesairportfasttrack-serviceDirection" name="serviceDirection" className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-700 focus:ring-2 focus:ring-gold focus:outline-none bg-white">
                                    <option>Arrival assistance</option>
                                    <option>Departure assistance</option>
                                    <option>Connection assistance</option>
                                </select>
                            </div>

                            {/* Airport */}
                            <div className="flex flex-col">
                                <label className="text-ink text-xs font-semibold mb-2" htmlFor="servicesairportfasttrack-airport">Airport</label>
                                <select id="servicesairportfasttrack-airport" name="airport" className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-700 focus:ring-2 focus:ring-gold focus:outline-none bg-white">
                                    <option>Select your airport</option>
                                    <option>Dubai (DXB)</option>
                                    <option>London (LHR)</option>
                                    <option>New York (JFK)</option>
                                    <option>Vietnam (SGN)</option>
                                </select>
                            </div>

                            {/* Date and Flight */}
                            <div className="flex gap-4">
                                <div className="flex flex-col w-1/2">
                                    <label className="text-ink text-xs font-semibold mb-2" htmlFor="servicesairportfasttrack-arrivalDate">Arrival date</label>
                                    <input id="servicesairportfasttrack-arrivalDate" name="arrivalDate" type="text" placeholder="DD / MM / YYYY" className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-700 focus:ring-2 focus:ring-gold focus:outline-none" />
                                </div>
                                <div className="flex flex-col w-1/2">
                                    <label className="text-ink text-xs font-semibold mb-2" htmlFor="servicesairportfasttrack-flightNumber">Flight number</label>
                                    <input id="servicesairportfasttrack-flightNumber" name="flightNumber" type="text" placeholder="e.g. EK 404" className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-700 focus:ring-2 focus:ring-gold focus:outline-none" />
                                </div>
                            </div>

                            {/* Submit */}
                            <button type="button" className="w-full bg-[#fbbc42] hover:bg-[#e5ab3b] text-ink font-bold py-3 rounded-md transition-colors flex justify-center items-center mt-2">
                                Check availability
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </button>
                        </form>

                        <p className="text-gray-400 text-[10px] text-center mt-6 leading-relaxed">
                            No payment required to check availability. A concierge will confirm your service details.
                        </p>
                    </div>

                </div>
            </section>

            {/* Arrive & Depart with Ease Section */}
            <section className="w-full bg-[#F3F2EE] py-20 px-6 md:px-12 lg:px-24 flex justify-center">
                <div className="w-full max-w-7xl flex flex-col items-center">

                    {/* Header */}
                    <h2 className="text-[#333333] text-3xl md:text-4xl font-serif tracking-widest uppercase mb-4 text-center">
                        Arrive & Depart with Ease
                    </h2>
                    {/* Gold Separator */}
                    <div className="w-16 md:w-24 h-[1px] bg-gold mb-12"></div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">

                        {[
                            { name: "Shangri-La The Shard, London", location: "London, United Kingdom" },
                            { name: "Conrad Bangkok", location: "Bangkok, Thailand" },
                            { name: "InterContinental Cascais - Estoril", location: "Estoril, Portugal" },
                            { name: "Hyatt Regency Malta", location: "St. Julians, Malta" },
                            { name: "Thompson Madrid by Hyatt", location: "Madrid, Spain" },
                            { name: "Hotel das Cataratas, A Belmond Hotel, Iguassu F...", location: "Foz do Iguaçu, Brazil" }
                        ].map((hotel, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col">
                                {/* Image Placeholder */}
                                <div className="w-full h-48 bg-[#d1d5db]"></div>
                                {/* Content */}
                                <div className="p-5 flex flex-col flex-grow justify-between">
                                    <h3 className="text-[#333333] text-sm font-medium mb-3">{hotel.name}</h3>
                                    <div className="flex items-center text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1.5">
                                            <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11 0 .308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.02.01.006.004zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-[10px] font-serif tracking-wide">{hotel.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* The Aeropass Difference Section */}
            <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-24 xl:px-40 flex justify-center">
                <div className="w-full max-w-7xl flex flex-col">

                    {/* Header */}
                    <div className="mb-16 max-w-3xl text-left">
                        <span className="text-[#2b7bb5] text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase mb-4 block">
                            The Aeropass Difference
                        </span>
                        <h2 className="text-ink text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
                            A smoother airport experience <br className="hidden md:block" />
                            from door to departure lounge.
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                            Every journey is different. Your dedicated host makes the airport feel simple, personal, <br className="hidden lg:block" />
                            and fully under control.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

                        {/* Card 1 */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-start">
                            <div className="bg-[#eff6ff] p-3 rounded-xl mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#2b7bb5]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>
                            </div>
                            <h3 className="text-ink text-lg font-bold mb-4">Meet at the moment you need</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Your host welcomes you at the aircraft bridge, curbside, or check-in—exactly where your journey begins.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-start">
                            <div className="bg-[#eff6ff] p-3 rounded-xl mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#2b7bb5]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>
                            </div>
                            <h3 className="text-ink text-lg font-bold mb-4">Priority through formalities</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Navigate immigration, security, and baggage collection with clear guidance and fast-track access where available.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-start">
                            <div className="bg-[#eff6ff] p-3 rounded-xl mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#2b7bb5]">
                                    {/* Briefcase. The command after "M20.25 10.5" was a stray
                                        "b" (not a valid SVG path command), which made the browser
                                        reject the whole path and render nothing. */}
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 10.5c0-2.25-1.875-4.5-4.5-4.5h-1.5c-1.5 0-3 1.5-3 3v2.25H20.25zM8.25 6h7.5M3.75 10.5h16.5v9a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-9z" />
                                </svg>
                            </div>
                            <h3 className="text-ink text-lg font-bold mb-4">Onward travel, coordinated</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                We coordinate luggage support, terminal handovers, and your pre-arranged driver so nothing is left to chance.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Simple by Design Section */}
            <section className="w-full bg-[#fafafa] py-24 px-6 md:px-12 lg:px-24 xl:px-40 flex justify-center overflow-hidden">
                <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-20">

                    {/* Left Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full lg:w-1/3 flex flex-col items-start text-left mt-2"
                    >
                        <span className="text-[#1e293b] text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase mb-4 block">
                            Simple by Design
                        </span>

                        <h2 className="text-ink text-3xl md:text-4xl font-bold leading-tight mb-6 text-navy-light">
                            Three steps to a calmer <br className="hidden xl:block" /> journey.
                        </h2>

                        <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm">
                            Book online in minutes. We handle the local detail before your wheels touch down.
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link 
                                to="/booking" 
                                className="group bg-[#1a2f4c] hover:bg-[#111f33] text-white text-sm font-semibold py-3.5 px-7 rounded-md transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
                            >
                                <span>Start your booking</span>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={2} 
                                    stroke="currentColor" 
                                    className="w-4 h-4 ml-2.5 transition-transform duration-300 group-hover:translate-x-1.5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Column (Steps) */}
                    <div className="w-full lg:w-3/5 flex flex-col space-y-6">

                        {/* Step 1 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100 hover:border-gray-200 flex items-center transition-all duration-300 cursor-default"
                        >
                            <div className="flex-shrink-0 bg-[#1a2f4c] group-hover:bg-[#0ea5e9] group-hover:scale-105 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-6 shadow-sm transition-all duration-300">
                                1
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-navy-light text-base font-bold mb-1">Share your flight details</h4>
                                <p className="text-gray-500 text-xs md:text-sm">Choose your airport, travel date, service direction, and guest count.</p>
                            </div>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100 hover:border-gray-200 flex items-center transition-all duration-300 cursor-default"
                        >
                            <div className="flex-shrink-0 bg-[#1a2f4c] group-hover:bg-[#0ea5e9] group-hover:scale-105 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-6 shadow-sm transition-all duration-300">
                                2
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-navy-light text-base font-bold mb-1">Receive a tailored confirmation</h4>
                                <p className="text-gray-500 text-xs md:text-sm">A concierge confirms availability, inclusions, and meeting instructions.</p>
                            </div>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100 hover:border-gray-200 flex items-center transition-all duration-300 cursor-default"
                        >
                            <div className="flex-shrink-0 bg-[#1a2f4c] group-hover:bg-[#0ea5e9] group-hover:scale-105 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-6 shadow-sm transition-all duration-300">
                                3
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-navy-light text-base font-bold mb-1">Meet your host and move with ease</h4>
                                <p className="text-gray-500 text-xs md:text-sm">Follow your personalized instructions and enjoy a seamless airport passage.</p>
                            </div>
                        </motion.div>

                    </div>

                </div>
            </section>

            {/* Travel With Confidence Testimonial Section */}
            <section className="relative w-full bg-ink py-24 px-6 md:px-12 lg:px-24 xl:px-40 flex items-center justify-center overflow-hidden min-h-[350px]">

                {/* Background Watermarks */}
                <img
                    src={watermark1}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-100 pointer-events-none z-0"
                    loading="lazy"
                    decoding="async"
                />

                <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10">

                    {/* Left: Text Content */}
                    <div className="w-full md:w-2/3 flex flex-col items-start text-left pl-4 md:pl-10 lg:pl-20">
                        <span className="text-[#0ea5e9] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4">
                            Travel with confidence
                        </span>

                        <h2 className="text-white text-2xl md:text-3xl lg:text-[32px] font-medium leading-snug mb-6 max-w-2xl">
                            "Our host was waiting as the doors opened. We were in the city before the arrivals hall felt busy."
                        </h2>

                        <p className="text-white text-xs md:text-sm font-semibold">
                            Maya R. · Singapore arrival service
                        </p>
                    </div>

                    {/* Right: Button */}
                    <div className="w-full md:w-1/3 flex justify-start md:justify-end pr-4 md:pr-10 lg:pr-20">
                        <motion.div
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link 
                                to="/booking"
                                className="group bg-[#fbbc42] hover:bg-[#e5ab3b] text-ink text-sm font-bold py-3.5 px-8 rounded-md transition-all duration-300 flex items-center shadow-md hover:shadow-lg whitespace-nowrap"
                            >
                                <span>Reserve your assistance</span>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={2} 
                                    stroke="currentColor" 
                                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1.5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* FAQ Section */}
            <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-24 xl:px-40 flex justify-center">
                <div className="w-full max-w-4xl flex flex-col space-y-4">
                    {faqItems.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                            <button 
                                className="w-full text-left px-6 py-5 bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
                                onClick={() => toggleFaq(index)}
                            >
                                <span className="text-ink text-sm md:text-[15px] font-medium">{faq.question}</span>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={2} 
                                    stroke="currentColor" 
                                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                            <div className={`px-6 text-gray-500 text-sm leading-relaxed bg-white overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 pb-5 border-t border-gray-100 mt-2 pt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ServicesAirportFastTrack;
