import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/bookings/booking-hero-image.webp';
import inboundTransitImg from '../assets/bookings/INBOUND-TRANSIT.webp';
import outboundTransitImg from '../assets/bookings/OUTBOUND-TRANSIT.webp';
import seamlessHanoiTransitImg from '../assets/bookings/SEAMLESS-HANOI-TRANSIT.webp';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';

const MeetAssistIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-bronze">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075-5.925a1.575 1.575 0 0 1 3.15 0v4.5m-3.15-4.5.075 5.925m3.075-5.925a1.575 1.575 0 0 1 3.15 0v4.5m-15.675-3a1.575 1.575 0 0 0-3.15 0v3c0 6.075 4.925 11 11 11s11-4.925 11-11v-1.5" />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-bronze">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
);

const FlightLandingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-bronze">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75h19.5m-17.7-6.225 3.375.9 3.075-5.325a.75.75 0 0 1 1.05-.262l1.95 1.125a.75.75 0 0 1 .263 1.05l-1.8 3.113 4.2.9 2.025-1.5a.75.75 0 0 1 .9.075l1.35 1.05a.75.75 0 0 1 .15.975l-2.025 3.525a.75.75 0 0 1-.9.375l-13.65-3.675a.75.75 0 0 1-.525-.9l.525-1.95a.75.75 0 0 1 .712-.562Z" />
    </svg>
);

const CarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-bronze">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h7.5m-7.5 0v-2.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 .75.75v2.25m3 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-13.5-3v-3.75a2.25 2.25 0 0 1 2.25-2.25h10.5a2.25 2.25 0 0 1 2.25 2.25v3.75m-15 0h15" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
);

const FEATURES = [
    {
        icon: MeetAssistIcon,
        title: "Meet & Assist",
        desc: "Personal escort greeted directly at the gate or aerobridge."
    },
    {
        icon: ShieldCheckIcon,
        title: "Fast Track Immigration",
        desc: "Dedicated diplomatic & priority clearance lanes."
    },
    {
        icon: FlightLandingIcon,
        title: "Arrival & Departure",
        desc: "End-to-end assistance tailored for inbound and outbound flights."
    },
    {
        icon: CarIcon,
        title: "Optional Transfers",
        desc: "Private executive chauffeur sedan direct to central Hanoi."
    }
];

const Booking = () => {
    const dateInputRef = useRef(null);

    // Interactive Reservation State
    const [transitType, setTransitType] = useState('ARRIVAL');
    const [serviceDate, setServiceDate] = useState('2026-04-15');
    const [serviceDateDisplay, setServiceDateDisplay] = useState('04/15/2026');
    const [flightNumber, setFlightNumber] = useState('');
    const [travellers, setTravellers] = useState('1');
    const [serviceLevel, setServiceLevel] = useState('standard');

    const handleDateChange = (e) => {
        const val = e.target.value;
        if (!val) return;
        setServiceDate(val);
        const [yyyy, mm, dd] = val.split('-');
        setServiceDateDisplay(`${mm}/${dd}/${yyyy}`);
    };

    // Calculate dynamic price based on guest count & service level
    const guestMultiplier = parseInt(travellers, 10) || 1;
    let baseUnit = 33.90;
    if (serviceLevel === 'vip') baseUnit = 48.00;
    if (serviceLevel === 'lounge') baseUnit = 71.90;
    if (serviceLevel === 'diplomatic') baseUnit = 98.00;

    const totalEstimate = (baseUnit * guestMultiplier).toFixed(2);

    return (
        <div className="w-full bg-[#FFFFFF]">
            <Seo {...PAGE_META['/booking']} path="/booking" />

            <PageHero image={heroImage} alt="" eyebrow="Services / Booking Trip" />

            {/* 4 Features Bar Section */}
            <section className="w-full bg-[#FFFFFF] border-b border-gray-100 py-8 md:py-10 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-start">
                    {FEATURES.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                            <div key={idx} className="flex items-start gap-3.5 text-left group">
                                <div className="w-11 h-11 rounded-xl bg-champagne flex items-center justify-center flex-shrink-0 group-hover:bg-[#F3EBD0] transition-colors">
                                    <IconComponent />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-navy font-bold text-sm md:text-[15px] mb-1 leading-snug">
                                        {item.title}
                                    </h4>
                                    <p className="text-steel text-xs leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Reserve Your Assistance Section (#F5F3EE background) */}
            <section className="w-full bg-[#F5F3EE] py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="max-w-5xl w-full bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-gray-100 flex flex-col items-center text-center">
                    
                    {/* Eyebrow */}
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-1.5 block">
                        NOI BAI EXPEDITED SERVICES
                    </span>

                    {/* Section Heading */}
                    <h2 className="text-navy text-2xl sm:text-3xl md:text-[34px] font-serif font-normal mb-1.5">
                        Reserve Your Assistance
                    </h2>

                    {/* Subtitle */}
                    <p className="text-steel text-xs sm:text-sm mb-6 leading-relaxed max-w-lg">
                        Instant confirmation with your flight number and date.
                    </p>

                    {/* Arrival / Departure Tabs */}
                    <div className="w-full grid grid-cols-2 rounded-xl overflow-hidden mb-6 border border-gray-200/80">
                        <button
                            type="button"
                            onClick={() => setTransitType('ARRIVAL')}
                            className={`py-2.5 sm:py-3 text-xs sm:text-sm font-bold tracking-wider transition-all cursor-pointer ${
                                transitType === 'ARRIVAL'
                                    ? 'bg-navy text-white shadow-sm'
                                    : 'bg-stone text-gray-700 hover:bg-[#E8E4DC]'
                            }`}
                        >
                            ARRIVAL
                        </button>
                        <button
                            type="button"
                            onClick={() => setTransitType('DEPARTURE')}
                            className={`py-2.5 sm:py-3 text-xs sm:text-sm font-bold tracking-wider transition-all cursor-pointer ${
                                transitType === 'DEPARTURE'
                                    ? 'bg-navy text-white shadow-sm'
                                    : 'bg-stone text-gray-700 hover:bg-[#E8E4DC]'
                            }`}
                        >
                            DEPARTURE
                        </button>
                    </div>

                    {/* Form Grid */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-5 text-left">
                        {/* Service Date */}
                        <div>
                            <label className="text-[11px] font-semibold text-navy block mb-1.5" htmlFor="booking-serviceDate">
                                Service Date
                            </label>
                            <div
                                className="relative cursor-pointer"
                                onClick={() => {
                                    if (dateInputRef.current) {
                                        try {
                                            dateInputRef.current.showPicker();
                                        } catch {
                                            dateInputRef.current.focus();
                                        }
                                    }
                                }}
                            >
                                <input id="booking-serviceDate" name="serviceDate"
                                    type="text"
                                    readOnly
                                    value={serviceDateDisplay}
                                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-cream border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-bronze cursor-pointer pr-10"
                                />
                                <input
                                    ref={dateInputRef}
                                    type="date"
                                    value={serviceDate}
                                    onChange={handleDateChange}
                                    className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
                                />
                                <span className="absolute right-3.5 top-3 sm:top-3.5 pointer-events-none">
                                    <CalendarIcon />
                                </span>
                            </div>
                        </div>

                        {/* Flight Number */}
                        <div>
                            <label className="text-[11px] font-semibold text-navy block mb-1.5" htmlFor="booking-flightNumber">
                                Flight Number
                            </label>
                            <input id="booking-flightNumber" name="flightNumber"
                                type="text"
                                value={flightNumber}
                                onChange={(e) => setFlightNumber(e.target.value)}
                                placeholder="E.G. VN311, SQ192, BA253"
                                className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-cream border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-bronze"
                            />
                        </div>

                        {/* Travellers */}
                        <div>
                            <label className="text-[11px] font-semibold text-navy block mb-1.5" htmlFor="booking-travellers">
                                Travellers
                            </label>
                            <select id="booking-travellers" name="travellers"
                                value={travellers}
                                onChange={(e) => setTravellers(e.target.value)}
                                className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-cream border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-bronze cursor-pointer"
                            >
                                <option value="1">1 Guest</option>
                                <option value="2">2 Guests</option>
                                <option value="3">3 Guests</option>
                                <option value="4">4 Guests</option>
                                <option value="5">5+ Guests (VIP Delegation)</option>
                            </select>
                        </div>

                        {/* Service Level */}
                        <div>
                            <label className="text-[11px] font-semibold text-navy block mb-1.5" htmlFor="booking-serviceLevel">
                                Service Level
                            </label>
                            <select id="booking-serviceLevel" name="serviceLevel"
                                value={serviceLevel}
                                onChange={(e) => setServiceLevel(e.target.value)}
                                className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-cream border border-gray-200 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-bronze cursor-pointer"
                            >
                                <option value="standard">Standard Fast Track</option>
                                <option value="vip">VIP Fast Track + Dedicated Escort</option>
                                <option value="lounge">VIP Fast Track + Executive Lounge</option>
                                <option value="diplomatic">Full Diplomatic &amp; Curbside Protocol</option>
                            </select>
                        </div>
                    </div>

                    {/* Total Estimated Amount Strip */}
                    <div className="w-full bg-cream rounded-xl py-3 px-4 sm:px-5 flex items-center justify-between border border-gray-200/60 mb-5 text-left">
                        <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                                TOTAL ESTIMATED AMOUNT
                            </span>
                            <span className="text-xs text-gray-500">
                                Inclusive of priority lane access
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl sm:text-3xl font-serif font-bold text-navy">
                                ${totalEstimate}
                            </span>
                            <span className="text-xs text-gray-500 ml-1 font-semibold">USD</span>
                        </div>
                    </div>

                    {/* Continue Booking CTA Button */}
                    <Link
                        to="/checkout"
                        className="w-full bg-[#E5B869] hover:bg-[#D4A758] text-navy font-bold py-3.5 rounded-xl text-xs sm:text-sm tracking-widest uppercase transition-all shadow-md hover:shadow-lg active:scale-[0.99] block text-center cursor-pointer"
                    >
                        CONTINUE BOOKING
                    </Link>

                    {/* Guarantee Note */}
                    <div className="mt-3.5 flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>Free cancellation up to 24 hours · Pay on arrival or online</span>
                    </div>

                </div>
            </section>

            {/* Our Services Section */}
            <section className="w-full bg-[#FFFFFF] py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="max-w-6xl w-full flex flex-col items-center text-center">
                    
                    {/* Eyebrow */}
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-2 block">
                        BESPOKE CONCIERGE
                    </span>

                    {/* Section Title */}
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-[42px] font-serif font-normal mb-2">
                        Our Services
                    </h2>

                    {/* Subtitle */}
                    <p className="text-steel text-xs sm:text-sm md:text-base mb-12 md:mb-14 leading-relaxed max-w-xl">
                        Personalised care for every stage of your flight.
                    </p>

                    {/* 2-Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full text-left">
                        {/* Card 1: Arrival Assistance */}
                        <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            {/* Image with Tag */}
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={inboundTransitImg}
                                    alt="Arrival Assistance"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <span className="absolute top-4 left-4 bg-navy/80 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase">
                                    INBOUND TRANSIT
                                </span>
                            </div>

                            {/* Body Content */}
                            <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                                <div>
                                    <div className="flex items-center justify-between gap-4 mb-3">
                                        <h3 className="text-navy text-xl sm:text-2xl font-serif font-bold">
                                            Arrival Assistance
                                        </h3>
                                        <span className="text-bronze font-bold text-sm sm:text-base whitespace-nowrap">
                                            From $33.90
                                        </span>
                                    </div>
                                    <p className="text-steel text-xs sm:text-sm leading-relaxed mb-6">
                                        Meet your personal host at the arrival gate. Seamlessly bypass crowded queues through dedicated priority immigration channels, baggage collection, and curbside coordination.
                                    </p>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="w-full bg-navy hover:bg-[#122345] text-white font-bold py-3.5 rounded-xl text-xs tracking-widest uppercase transition-all shadow-md active:scale-[0.99] text-center block mt-auto cursor-pointer"
                                >
                                    BOOK ARRIVAL
                                </Link>
                            </div>
                        </div>

                        {/* Card 2: Departure Assistance */}
                        <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            {/* Image with Tag */}
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={outboundTransitImg}
                                    alt="Departure Assistance"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <span className="absolute top-4 left-4 bg-navy/80 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase">
                                    OUTBOUND TRANSIT
                                </span>
                            </div>

                            {/* Body Content */}
                            <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                                <div>
                                    <div className="flex items-center justify-between gap-4 mb-3">
                                        <h3 className="text-navy text-xl sm:text-2xl font-serif font-bold">
                                            Departure Assistance
                                        </h3>
                                        <span className="text-bronze font-bold text-sm sm:text-base whitespace-nowrap">
                                            From $36.50
                                        </span>
                                    </div>
                                    <p className="text-steel text-xs sm:text-sm leading-relaxed mb-6">
                                        Curbside meet &amp; assist at Noi Bai International. Fast-track airline check-in counters, expedited priority security, and immigration escort straight to your lounge or gate.
                                    </p>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="w-full bg-navy hover:bg-[#122345] text-white font-bold py-3.5 rounded-xl text-xs tracking-widest uppercase transition-all shadow-md active:scale-[0.99] text-center block mt-auto cursor-pointer"
                                >
                                    BOOK DEPARTURE
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Why Asian Star Travel Section (#FBF9F4 background) */}
            <section className="w-full bg-ivory py-20 md:py-28 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="max-w-6xl w-full flex flex-col items-center text-center">
                    
                    {/* Eyebrow */}
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-2 block">
                        DISTINCTIVE HOSPITALITY
                    </span>

                    {/* Section Title */}
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-[42px] font-serif font-normal mb-12 md:mb-14">
                        Why Asian Star Travel
                    </h2>

                    {/* 3 Numbered Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full text-left">
                        {/* Card 01 */}
                        <div className="bg-white rounded-2xl md:rounded-3xl p-7 sm:p-8 md:p-9 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col justify-start">
                            <span className="text-gold text-3xl sm:text-4xl font-serif font-normal mb-4 block">
                                01
                            </span>
                            <h3 className="text-navy font-serif font-bold text-lg sm:text-xl mb-3">
                                Professional Assistance
                            </h3>
                            <p className="text-steel text-xs sm:text-sm leading-relaxed">
                                Certified, uniform concierges with official Noi Bai airport security clearance and English fluency.
                            </p>
                        </div>

                        {/* Card 02 */}
                        <div className="bg-white rounded-2xl md:rounded-3xl p-7 sm:p-8 md:p-9 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col justify-start">
                            <span className="text-gold text-3xl sm:text-4xl font-serif font-normal mb-4 block">
                                02
                            </span>
                            <h3 className="text-navy font-serif font-bold text-lg sm:text-xl mb-3">
                                Airport Expertise
                            </h3>
                            <p className="text-steel text-xs sm:text-sm leading-relaxed">
                                Deep local operational knowledge navigating Terminal 1 (Domestic) &amp; Terminal 2 (International) seamlessly.
                            </p>
                        </div>

                        {/* Card 03 */}
                        <div className="bg-white rounded-2xl md:rounded-3xl p-7 sm:p-8 md:p-9 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col justify-start">
                            <span className="text-gold text-3xl sm:text-4xl font-serif font-normal mb-4 block">
                                03
                            </span>
                            <h3 className="text-navy font-serif font-bold text-lg sm:text-xl mb-3">
                                Personalised Service
                            </h3>
                            <p className="text-steel text-xs sm:text-sm leading-relaxed">
                                Real-time flight tracking, flexible delays accommodated, and custom care for families, executives, and elders.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Seamless Hanoi Transit CTA Banner Section */}
            <section className="relative w-full overflow-hidden min-h-[380px] md:min-h-[440px] flex items-center justify-center">
                {/* Background Image */}
                <img
                    src={seamlessHanoiTransitImg}
                    alt="Seamless Hanoi Transit"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    loading="lazy"
                    decoding="async"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-navy/40 z-0"></div>

                {/* Content */}
                <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16 md:py-20 flex flex-col items-center text-center">
                    {/* Eyebrow */}
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#E3CA90] uppercase mb-3 block">
                        SEAMLESS HANOI TRANSIT
                    </span>

                    {/* Title */}
                    <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif font-normal leading-tight mb-4 drop-shadow-md">
                        Hanoi Airport, Made Easy.
                    </h2>

                    {/* Subtitle */}
                    <p className="text-gray-200 text-xs sm:text-sm md:text-base max-w-lg mb-8 leading-relaxed drop-shadow-sm">
                        Book your Fast Track assistance today and experience effortless airport hospitality.
                    </p>

                    {/* CTA Button */}
                    <Link
                        to="/checkout"
                        className="inline-flex items-center justify-center bg-[#E5B869] hover:bg-[#D4A758] text-navy font-bold text-xs md:text-sm px-8 py-3.5 rounded-lg uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        BOOK NOW
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Booking;
