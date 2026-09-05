import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/checkouts/checkouts-hero-image.webp';
import seamlessHanoiTransitImg from '../assets/checkouts/SEAMLESS-HANOI-TRANSIT.webp';

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white mb-4">
        <path d="M12 2C12.5 7.5 16.5 11.5 22 12C16.5 12.5 12.5 16.5 12 22C11.5 16.5 7.5 12.5 2 12C7.5 11.5 11.5 7.5 12 2Z" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const ShieldLockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-emerald-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
);

const COUNTRIES_AND_CODES = [
    { code: '+1', country: 'United States', label: '+1 (USA)' },
    { code: '+91', country: 'India', label: '+91 (IND)' },
    { code: '+84', country: 'Vietnam', label: '+84 (VNM)' },
    { code: '+44', country: 'United Kingdom', label: '+44 (UK)' },
    { code: '+61', country: 'Australia', label: '+61 (AUS)' },
    { code: '+65', country: 'Singapore', label: '+65 (SGP)' },
    { code: '+971', country: 'United Arab Emirates', label: '+971 (UAE)' },
    { code: '+49', country: 'Germany', label: '+49 (DEU)' },
    { code: '+33', country: 'France', label: '+33 (FRA)' },
    { code: '+81', country: 'Japan', label: '+81 (JPN)' },
    { code: '+82', country: 'South Korea', label: '+82 (KOR)' },
    { code: '+86', country: 'China', label: '+86 (CHN)' },
    { code: '+1-CA', country: 'Canada', label: '+1 (CAN)' },
    { code: '+60', country: 'Malaysia', label: '+60 (MYS)' },
    { code: '+66', country: 'Thailand', label: '+66 (THA)' },
    { code: '+62', country: 'Indonesia', label: '+62 (IDN)' },
    { code: '+63', country: 'Philippines', label: '+63 (PHL)' },
    { code: '+34', country: 'Spain', label: '+34 (ESP)' },
    { code: '+39', country: 'Italy', label: '+39 (ITA)' },
    { code: '+41', country: 'Switzerland', label: '+41 (CHE)' },
    { code: '+31', country: 'Netherlands', label: '+31 (NLD)' },
    { code: '+64', country: 'New Zealand', label: '+64 (NZL)' },
    { code: '+27', country: 'South Africa', label: '+27 (ZAF)' },
    { code: '+55', country: 'Brazil', label: '+55 (BRA)' },
    { code: '+52', country: 'Mexico', label: '+52 (MEX)' },
    { code: '+966', country: 'Saudi Arabia', label: '+966 (SAU)' },
    { code: '+974', country: 'Qatar', label: '+974 (QAT)' },
    { code: '+7', country: 'Russia', label: '+7 (RUS)' },
    { code: '+48', country: 'Poland', label: '+48 (POL)' },
    { code: '+46', country: 'Sweden', label: '+46 (SWE)' },
    { code: '+47', country: 'Norway', label: '+47 (NOR)' },
    { code: '+45', country: 'Denmark', label: '+45 (DNK)' },
    { code: '+358', country: 'Finland', label: '+358 (FIN)' },
    { code: '+353', country: 'Ireland', label: '+353 (IRL)' },
    { code: '+351', country: 'Portugal', label: '+351 (PRT)' },
    { code: '+30', country: 'Greece', label: '+30 (GRC)' },
    { code: '+90', country: 'Turkey', label: '+90 (TUR)' },
    { code: '+852', country: 'Hong Kong', label: '+852 (HKG)' },
    { code: '+886', country: 'Taiwan', label: '+886 (TWN)' }
];

const Checkouts = () => {
    const dateInputRef = useRef(null);
    const timeInputRef = useRef(null);

    // State management for interactive form and pricing
    const [transitDirection, setTransitDirection] = useState('inbound');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [addons, setAddons] = useState({
        mercedes: false,
        lounge: false,
    });
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Form inputs state
    const [formData, setFormData] = useState({
        fullName: 'Eleanor Vance',
        email: 'eleanor.vance@vanceholdings.com',
        phonePrefix: '+1 (USA)',
        phone: '(415) 890-3342',
        country: 'United States',
        flightNumber: 'SQ 192',
        arrivalDate: '2025-10-28',
        arrivalDateDisplay: '28 Oct 2025',
        landingTime: '14:45',
        placardNotes: 'Placard Name: Eleanor Vance. Traveling with 2 check-in bags. Please prepare luggage porter cart at carousel #3.',
        cardName: 'Eleanor Vance',
        cardNumber: '•••• •••• •••• 4291',
        cardExpiry: '08 / 28',
        cardCvv: '888',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // When phone code changes, auto-suggest or update prefix
    const handlePhonePrefixChange = (e) => {
        const selectedLabel = e.target.value;
        const matched = COUNTRIES_AND_CODES.find(c => c.label === selectedLabel);
        setFormData(prev => ({
            ...prev,
            phonePrefix: selectedLabel,
            country: matched ? matched.country : prev.country
        }));
    };

    // When country changes, auto-suggest prefix if available
    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        const matched = COUNTRIES_AND_CODES.find(c => c.country === selectedCountry);
        setFormData(prev => ({
            ...prev,
            country: selectedCountry,
            phonePrefix: matched ? matched.label : prev.phonePrefix
        }));
    };

    const handleDateChange = (e) => {
        const val = e.target.value;
        if (!val) return;
        const d = new Date(val);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formatted = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
        setFormData(prev => ({
            ...prev,
            arrivalDate: val,
            arrivalDateDisplay: formatted
        }));
    };

    const toggleAddon = (key) => {
        setAddons(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Calculate dynamic pricing
    const basePrice = 33.90;
    const porterPrice = 14.10;
    const mercedesPrice = addons.mercedes ? 62.00 : 0;
    const loungePrice = addons.lounge ? 38.00 : 0;
    const totalPrice = (basePrice + porterPrice + mercedesPrice + loungePrice).toFixed(2);

    const handleConfirmBooking = (e) => {
        e.preventDefault();
        setIsConfirmed(true);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    return (
        <div className="w-full bg-[#FFFFFF]">
            {/* Hero Section */}
            <section className="relative w-full h-[45vh] md:h-[60vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <img
                    src={heroImage}
                    alt="Checkout Hero"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Dark/Blue Overlay to improve text readability */}
                <div className="absolute inset-0 bg-[#081634]/35 z-0"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center px-6 -mt-10">
                    <StarIcon />

                    <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif tracking-widest mb-6">
                        ASMALLWORLD
                    </h1>

                    {/* Gold separator line */}
                    <div className="w-24 md:w-32 h-[1px] bg-[#C5A869] mb-6"></div>

                    <p className="text-white text-sm md:text-base font-light tracking-wide">
                        Services / Checkout
                    </p>
                </div>
            </section>

            {/* Main Checkout Experience Section */}
            <main className="w-full py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 max-w-7xl mx-auto">
                
                {/* Breadcrumbs & Header Row */}
                <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
                    <div className="flex flex-col text-left">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                            <Link to="/" className="hover:text-[#081634] transition-colors">Home</Link>
                            <span>&gt;</span>
                            <Link to="/services" className="hover:text-[#081634] transition-colors">Services</Link>
                            <span>&gt;</span>
                            <Link to="/services/airport-fast-track" className="hover:text-[#081634] transition-colors">Hanoi Fast Track</Link>
                            <span>&gt;</span>
                            <span className="text-[#081634] font-medium">Checkout</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-[#081634] text-2xl sm:text-3xl md:text-4xl font-serif font-normal">
                            Checkout &amp; Confirmation
                        </h2>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1">
                            Please review your booking details and enter traveller information to complete your reservation.
                        </p>
                    </div>

                    {/* Top Live Dispatch Active Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase self-start md:self-auto">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        LIVE DISPATCH ACTIVE: NOI BAI T2
                    </div>
                </div>

                {isConfirmed ? (
                    /* Booking Success Confirmation View */
                    <div className="w-full bg-[#FAF9F5] border border-emerald-300 rounded-3xl p-8 md:p-14 text-center my-8 shadow-xl">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <span className="text-[11px] font-bold tracking-widest text-[#8C7A53] uppercase mb-2 block">
                            RESERVATION CONFIRMED &bull; BOOKING #AST-88392
                        </span>
                        <h2 className="text-[#081634] text-3xl md:text-4xl font-serif mb-4">
                            Thank you, {formData.fullName}!
                        </h2>
                        <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base mb-6 leading-relaxed">
                            Your Hanoi VIP Airport Fast Track service has been locked in for <strong>{formData.arrivalDateDisplay} ({formData.flightNumber})</strong>.
                            Your official voucher and coordinator dispatch details have been dispatched to <strong>{formData.email}</strong>.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                type="button"
                                onClick={() => setIsConfirmed(false)}
                                className="px-6 py-3 bg-[#081634] text-white rounded-xl text-xs font-semibold hover:bg-[#122345] transition-colors cursor-pointer"
                            >
                                Edit / View Reservation Details
                            </button>
                            <Link
                                to="/"
                                className="px-6 py-3 bg-white border border-gray-300 text-[#081634] rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Return to Homepage
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Two-Column Form & Summary Grid */
                    <form onSubmit={handleConfirmBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                        
                        {/* Left Column: Form Steps (8 Cols) */}
                        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6 text-left">
                            
                            {/* STEP 1: Primary Traveller & Contact */}
                            <div className="bg-[#FAF9F5] rounded-2xl p-6 sm:p-8 border border-[#EFECE6] shadow-sm">
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/60">
                                    <div className="flex items-center gap-3">
                                        <span className="w-7 h-7 rounded-full bg-[#081634] text-white text-xs font-bold flex items-center justify-center">
                                            1
                                        </span>
                                        <h3 className="text-[#081634] font-serif font-bold text-lg md:text-xl">
                                            Primary Traveller &amp; Contact
                                        </h3>
                                    </div>
                                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#FAF3DF] text-[#8C7A53] uppercase tracking-wider">
                                        LEAD PASSENGER
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 gap-5">
                                    {/* Full Name */}
                                    <div>
                                        <label className="text-xs font-semibold text-[#081634] block mb-1.5">
                                            Full Legal Name (as shown on passport) *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="fullName"
                                                required
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C7A53] pr-10"
                                            />
                                            <span className="absolute right-3.5 top-3.5 text-emerald-600 font-bold text-sm">
                                                ✓
                                            </span>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="text-xs font-semibold text-[#081634] block mb-1.5">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C7A53]"
                                        />
                                        <span className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1.5">
                                            🔒 Booking confirmation, flight watch alerts, and airport coordinator phone will be sent here.
                                        </span>
                                    </div>

                                    {/* Phone & Country */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="min-w-0">
                                            <label className="text-xs font-semibold text-[#081634] block mb-1.5">
                                                Mobile Phone / WhatsApp *
                                            </label>
                                            <div className="flex gap-2 min-w-0 w-full">
                                                <select
                                                    name="phonePrefix"
                                                    value={formData.phonePrefix}
                                                    onChange={handlePhonePrefixChange}
                                                    className="w-28 sm:w-32 shrink-0 px-2 py-3 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C7A53] cursor-pointer"
                                                >
                                                    {COUNTRIES_AND_CODES.map((item, idx) => (
                                                        <option key={idx} value={item.label}>
                                                            {item.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="(415) 890-3342"
                                                    className="min-w-0 flex-1 w-full px-3.5 py-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C7A53]"
                                                />
                                            </div>
                                        </div>
                                        <div className="min-w-0">
                                            <label className="text-xs font-semibold text-[#081634] block mb-1.5">
                                                Country of Passport / Residence *
                                            </label>
                                            <select
                                                name="country"
                                                required
                                                value={formData.country}
                                                onChange={handleCountryChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C7A53] cursor-pointer"
                                            >
                                                {COUNTRIES_AND_CODES.map((item, idx) => (
                                                    <option key={idx} value={item.country}>
                                                        {item.country}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* STEP 2: Flight Schedule & Itinerary */}
                            <div className="bg-[#FAF9F5] rounded-2xl p-6 sm:p-8 border border-[#EFECE6] shadow-sm">
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/60">
                                    <div className="flex items-center gap-3">
                                        <span className="w-7 h-7 rounded-full bg-[#081634] text-white text-xs font-bold flex items-center justify-center">
                                            2
                                        </span>
                                        <h3 className="text-[#081634] font-serif font-bold text-lg md:text-xl">
                                            Flight Schedule &amp; Itinerary
                                        </h3>
                                    </div>
                                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        AUTO-TRACK ACTIVE
                                    </span>
                                </div>

                                {/* Direction Toggle Tabs */}
                                <div className="mb-5">
                                    <label className="text-xs font-semibold text-[#081634] block mb-2">
                                        Transit Direction
                                    </label>
                                    <div className="grid grid-cols-2 gap-3 p-1 rounded-xl bg-gray-200/60">
                                        <button
                                            type="button"
                                            onClick={() => setTransitDirection('inbound')}
                                            className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                                transitDirection === 'inbound'
                                                    ? 'bg-white text-[#081634] shadow-sm'
                                                    : 'text-gray-600 hover:text-[#081634]'
                                            }`}
                                        >
                                            <span>🛬</span> Inbound Arrival (HAN T2)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setTransitDirection('outbound')}
                                            className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                                transitDirection === 'outbound'
                                                    ? 'bg-white text-[#081634] shadow-sm'
                                                    : 'text-gray-600 hover:text-[#081634]'
                                            }`}
                                        >
                                            <span>🛫</span> Outbound Departure (HAN T2)
                                        </button>
                                    </div>
                                </div>

                                {/* Flight Number, Date, Time */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                                    {/* Flight Number */}
                                    <div>
                                        <label className="text-xs font-semibold text-[#081634] block mb-1.5">
                                            Flight Number *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="flightNumber"
                                                required
                                                value={formData.flightNumber}
                                                onChange={handleInputChange}
                                                className="w-full px-3.5 py-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#8C7A53]"
                                            />
                                            <span className="absolute right-2.5 top-3 text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                SIN → HAN
                                            </span>
                                        </div>
                                    </div>

                                    {/* Arrival Date (Active interactive Date Picker) */}
                                    <div>
                                        <label className="text-xs font-semibold text-[#081634] block mb-1.5">
                                            Arrival Date *
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
                                            <input
                                                type="text"
                                                readOnly
                                                value={formData.arrivalDateDisplay}
                                                className="w-full px-3.5 py-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C7A53] cursor-pointer pr-10"
                                            />
                                            <input
                                                ref={dateInputRef}
                                                type="date"
                                                name="arrivalDate"
                                                value={formData.arrivalDate}
                                                onChange={handleDateChange}
                                                className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
                                            />
                                            <span className="absolute right-3.5 top-3.5 pointer-events-none">
                                                <CalendarIcon />
                                            </span>
                                        </div>
                                    </div>

                                    {/* Scheduled Landing (Active interactive Time Picker) */}
                                    <div>
                                        <label className="text-xs font-semibold text-[#081634] block mb-1.5">
                                            Scheduled Landing *
                                        </label>
                                        <div
                                            className="relative cursor-pointer"
                                            onClick={() => {
                                                if (timeInputRef.current) {
                                                    try {
                                                        timeInputRef.current.showPicker();
                                                    } catch {
                                                        timeInputRef.current.focus();
                                                    }
                                                }
                                            }}
                                        >
                                            <input
                                                type="text"
                                                name="landingTime"
                                                required
                                                value={formData.landingTime}
                                                onChange={handleInputChange}
                                                className="w-full px-3.5 py-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C7A53] pr-10"
                                            />
                                            <input
                                                ref={timeInputRef}
                                                type="time"
                                                value={formData.landingTime}
                                                onChange={handleInputChange}
                                                name="landingTime"
                                                className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
                                            />
                                            <span className="absolute right-3.5 top-3.5 pointer-events-none">
                                                <ClockIcon />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Live Radar Alert Box */}
                                <div className="w-full bg-[#FAF3DF]/60 border border-[#EDE4D0] rounded-xl p-3.5 flex items-start gap-3">
                                    <span className="text-[#8C7A53] text-base">✈</span>
                                    <p className="text-xs text-[#7A6237] leading-relaxed">
                                        <strong>Singapore Airlines SQ 192</strong> from Singapore Changi (SIN) to Hanoi Noi Bai (HAN). Our airport coordinator will monitor your aircraft's descent on radar and assemble at the jetbridge 15 minutes prior to touchdown.
                                    </p>
                                </div>
                            </div>

                            {/* STEP 3: Luggage & Special Instructions */}
                            <div className="bg-[#FAF9F5] rounded-2xl p-6 sm:p-8 border border-[#EFECE6] shadow-sm">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200/60">
                                    <span className="w-7 h-7 rounded-full bg-[#081634] text-white text-xs font-bold flex items-center justify-center">
                                        3
                                    </span>
                                    <h3 className="text-[#081634] font-serif font-bold text-lg md:text-xl">
                                        Luggage &amp; Special Instructions
                                    </h3>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#081634] block mb-1.5">
                                        Arrival Nameboard / Signage &amp; Baggage Details (Optional)
                                    </label>
                                    <textarea
                                        rows={3}
                                        name="placardNotes"
                                        value={formData.placardNotes}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8C7A53] resize-none"
                                    />
                                    <span className="text-[11px] text-gray-400 mt-1 block">
                                        Our escort officer will display this exact placard at the aerobridge terminal exit.
                                    </span>
                                </div>
                            </div>

                            {/* STEP 4: Payment Guarantee */}
                            <div className="bg-[#FAF9F5] rounded-2xl p-6 sm:p-8 border border-[#EFECE6] shadow-sm">
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/60">
                                    <div className="flex items-center gap-3">
                                        <span className="w-7 h-7 rounded-full bg-[#081634] text-white text-xs font-bold flex items-center justify-center">
                                            4
                                        </span>
                                        <h3 className="text-[#081634] font-serif font-bold text-lg md:text-xl">
                                            Payment Guarantee
                                        </h3>
                                    </div>
                                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-gray-100 text-gray-500 uppercase tracking-wider flex items-center gap-1">
                                        🔒 PCI DSS L1 COMPLIANT
                                    </span>
                                </div>

                                {/* Payment Method Options */}
                                <div className="flex flex-col gap-3">
                                    
                                    {/* Option 1: Credit or Debit Card */}
                                    <div className={`rounded-xl border p-4 sm:p-5 transition-all ${paymentMethod === 'card' ? 'border-[#8C7A53] bg-white shadow-sm' : 'border-gray-200 bg-white/60'}`}>
                                        <label className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="card"
                                                    checked={paymentMethod === 'card'}
                                                    onChange={() => setPaymentMethod('card')}
                                                    className="w-4 h-4 text-[#8C7A53] focus:ring-[#8C7A53]"
                                                />
                                                <div>
                                                    <span className="text-sm font-bold text-[#081634] block">
                                                        Credit or Debit Card
                                                    </span>
                                                    <span className="text-[11px] text-gray-400">
                                                        Visa, Mastercard, American Express, JCB
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold">
                                                <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">VISA</span>
                                                <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">MC</span>
                                                <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">AMEX</span>
                                                <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">JCB</span>
                                            </div>
                                        </label>

                                        {/* Card Input Details */}
                                        {paymentMethod === 'card' && (
                                            <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-1 gap-4">
                                                <div>
                                                    <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                                                        Cardholder Full Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="cardName"
                                                        value={formData.cardName}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#8C7A53]"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                                                        Card Number
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            name="cardNumber"
                                                            value={formData.cardNumber}
                                                            onChange={handleInputChange}
                                                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#8C7A53]"
                                                        />
                                                        <span className="absolute right-3 top-3 text-gray-400">💳</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                                                            Expiration
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="cardExpiry"
                                                            value={formData.cardExpiry}
                                                            onChange={handleInputChange}
                                                            placeholder="MM / YY"
                                                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-center font-mono focus:outline-none focus:ring-2 focus:ring-[#8C7A53]"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                                                            Security Code (CVV)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="cardCvv"
                                                            value={formData.cardCvv}
                                                            onChange={handleInputChange}
                                                            placeholder="CVV"
                                                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 text-sm text-center font-mono focus:outline-none focus:ring-2 focus:ring-[#8C7A53]"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Option 2: Corporate Bank Wire */}
                                    <div className={`rounded-xl border p-4 sm:p-5 transition-all ${paymentMethod === 'wire' ? 'border-[#8C7A53] bg-white shadow-sm' : 'border-gray-200 bg-white/60'}`}>
                                        <label className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="wire"
                                                    checked={paymentMethod === 'wire'}
                                                    onChange={() => setPaymentMethod('wire')}
                                                    className="w-4 h-4 text-[#8C7A53] focus:ring-[#8C7A53]"
                                                />
                                                <div>
                                                    <span className="text-sm font-bold text-[#081634] block">
                                                        Corporate Bank Wire (USD / EUR / SGD)
                                                    </span>
                                                    <span className="text-[11px] text-gray-400">
                                                        Direct invoice issued with official company seal
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-gray-400 text-base">🏦</span>
                                        </label>
                                    </div>

                                    {/* Option 3: Pay on Arrival */}
                                    <div className={`rounded-xl border p-4 sm:p-5 transition-all ${paymentMethod === 'arrival' ? 'border-[#8C7A53] bg-white shadow-sm' : 'border-gray-200 bg-white/60'}`}>
                                        <label className="flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="arrival"
                                                    checked={paymentMethod === 'arrival'}
                                                    onChange={() => setPaymentMethod('arrival')}
                                                    className="w-4 h-4 text-[#8C7A53] focus:ring-[#8C7A53]"
                                                />
                                                <div>
                                                    <span className="text-sm font-bold text-[#081634] block">
                                                        Pay on Arrival at Noi Bai Airport (Verified Reservation)
                                                    </span>
                                                    <span className="text-[11px] text-gray-400">
                                                        Settled via mobile POS or Cash to escort coordinator
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-500 uppercase">
                                                Pre-authorized
                                            </span>
                                        </label>
                                    </div>

                                </div>
                            </div>

                            {/* Submit Button & Cancellation note */}
                            <div className="flex flex-col items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    className="w-full bg-[#7A5C1E] hover:bg-[#664C16] text-white font-bold py-4 rounded-xl text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl active:scale-[0.99] cursor-pointer"
                                >
                                    <span>🔒</span>
                                    Pay Now &amp; Confirm Booking (${totalPrice} USD)
                                </button>
                                <span className="text-xs text-gray-500 flex items-center gap-1.5">
                                    <ShieldLockIcon />
                                    Complimentary cancellation &amp; full refund up to 24 hours prior to flight touchdown.
                                </span>
                            </div>

                        </div>

                        {/* Right Column: Reservation Summary Card (4 or 5 Cols) */}
                        <div className="lg:col-span-5 xl:col-span-4 sticky top-24 flex flex-col gap-6 text-left">
                            
                            {/* Summary Card */}
                            <div className="bg-[#FAF9F5] border border-[#EFECE6] rounded-3xl p-6 sm:p-7 shadow-lg">
                                {/* Top Header */}
                                <div className="flex items-start justify-between gap-2 mb-3 pb-3 border-b border-gray-200/60">
                                    <div>
                                        <span className="text-[10px] font-bold tracking-[0.15em] text-[#8C7A53] uppercase block mb-1">
                                            VIP AIRPORT RESERVATION
                                        </span>
                                        <h3 className="text-[#081634] text-xl font-serif font-bold">
                                            Hanoi Airport Fast Track
                                        </h3>
                                    </div>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EDEBE4] text-[#8C7A53] flex-shrink-0">
                                        HAN T2
                                    </span>
                                </div>

                                {/* Metadata Grid */}
                                <div className="flex flex-col gap-2 text-xs py-2 border-b border-gray-200/60">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Service Scope:</span>
                                        <span className="font-semibold text-[#081634]">Arrival VIP Fast Track Escort</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Airport &amp; Terminal:</span>
                                        <span className="font-semibold text-[#081634]">Noi Bai Int'l (HAN) - Terminal 2</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Scheduled Arrival:</span>
                                        <span className="font-semibold text-[#081634]">{formData.arrivalDateDisplay} · {formData.landingTime} Local</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Flight Code:</span>
                                        <span className="font-semibold text-[#081634]">{formData.flightNumber} (Singapore Airlines)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Party Size:</span>
                                        <span className="font-semibold text-[#081634]">1 Adult Traveller</span>
                                    </div>
                                </div>

                                {/* Service Inclusions */}
                                <div className="py-4 border-b border-gray-200/60">
                                    <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-2.5">
                                        SERVICE INCLUSIONS
                                    </span>
                                    <ul className="space-y-2 text-[11px] text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-emerald-600 font-bold">✓</span>
                                            <span>Airbridge gate meet &amp; greet with personalized name placard</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-emerald-600 font-bold">✓</span>
                                            <span>Priority diplomatic &amp; expedited immigration channel</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-emerald-600 font-bold">✓</span>
                                            <span>Baggage carousel reclaim &amp; dedicated portering assistance</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-emerald-600 font-bold">✓</span>
                                            <span>Continuous escort through customs to curbside vehicle handover</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Upgrade Transfers & Lounges */}
                                <div className="py-4 border-b border-gray-200/60">
                                    <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-2.5">
                                        UPGRADE YOUR TRANSFER
                                    </span>
                                    <div className="space-y-2.5">
                                        {/* Upgrade 1 */}
                                        <label className={`flex items-start justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${addons.mercedes ? 'border-[#8C7A53] bg-white shadow-sm' : 'border-gray-200 bg-white/50'}`}>
                                            <div className="flex items-start gap-2.5">
                                                <input
                                                    type="checkbox"
                                                    checked={addons.mercedes}
                                                    onChange={() => toggleAddon('mercedes')}
                                                    className="mt-0.5 rounded text-[#8C7A53] focus:ring-[#8C7A53]"
                                                />
                                                <div>
                                                    <span className="font-bold text-[#081634] block">
                                                        Private Mercedes E-Class Transfer
                                                    </span>
                                                    <span className="text-[10px] text-gray-500">
                                                        Noi Bai T2 to Hanoi City Center
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="font-bold text-[#8C7A53] flex-shrink-0">
                                                +$62.00
                                            </span>
                                        </label>

                                        {/* Upgrade 2 */}
                                        <label className={`flex items-start justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${addons.lounge ? 'border-[#8C7A53] bg-white shadow-sm' : 'border-gray-200 bg-white/50'}`}>
                                            <div className="flex items-start gap-2.5">
                                                <input
                                                    type="checkbox"
                                                    checked={addons.lounge}
                                                    onChange={() => toggleAddon('lounge')}
                                                    className="mt-0.5 rounded text-[#8C7A53] focus:ring-[#8C7A53]"
                                                />
                                                <div>
                                                    <span className="font-bold text-[#081634] block">
                                                        VIP Lotus Executive Lounge (HAN)
                                                    </span>
                                                    <span className="text-[10px] text-gray-500">
                                                        Shower, buffet &amp; quiet workspace
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="font-bold text-[#8C7A53] flex-shrink-0">
                                                +$38.00
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="py-4 border-b border-gray-200/60 text-xs space-y-2">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Fast Track Concierge (1 Guest)</span>
                                        <span>${basePrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Dedicated Luggage Porter Service</span>
                                        <span>${porterPrice.toFixed(2)}</span>
                                    </div>
                                    {addons.mercedes && (
                                        <div className="flex justify-between text-gray-600">
                                            <span>Mercedes E-Class Private Transfer</span>
                                            <span>+$62.00</span>
                                        </div>
                                    )}
                                    {addons.lounge && (
                                        <div className="flex justify-between text-gray-600">
                                            <span>VIP Lotus Lounge Access</span>
                                            <span>+$38.00</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-gray-600">
                                        <span>Taxes &amp; Airport Authority Surcharge</span>
                                        <span className="text-emerald-700 font-medium">Included</span>
                                    </div>
                                </div>

                                {/* Total Price */}
                                <div className="pt-4 flex items-center justify-between">
                                    <div>
                                        <span className="text-sm font-bold text-[#081634] block">
                                            Total Amount
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase">
                                            ALL TAXES &amp; TIPS INCLUDED
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl sm:text-3xl font-serif font-bold text-[#081634]">
                                            ${totalPrice}
                                        </span>
                                        <span className="text-xs text-gray-500 ml-1">USD</span>
                                    </div>
                                </div>
                            </div>

                            {/* Operations Verification Badge */}
                            <div className="bg-[#FAF9F5] border border-[#EFECE6] rounded-2xl p-4 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#081634] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                                        AST
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-[#081634]">
                                            Noi Bai Operations Dispatch Desk
                                        </span>
                                        <span className="text-[10px] text-gray-400">
                                            Coordinator assigned 3 hrs prior to touchdown
                                        </span>
                                    </div>
                                </div>
                                <ShieldLockIcon />
                            </div>

                        </div>

                    </form>
                )}

                {/* Bottom Trust & Guarantee Cards (3 columns) */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 mt-16 border-t border-gray-100 text-left">
                    {/* Badge 1 */}
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF9F5] border border-[#EFECE6]/80">
                        <div className="w-10 h-10 rounded-xl bg-[#FAF3DF] flex items-center justify-center text-[#8C7A53] flex-shrink-0">
                            🔒
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-[#081634] mb-1">
                                Encrypted Payment Guarantee
                            </h4>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Bank-grade 256-bit SSL transaction gateway. No raw card credentials are retained on our dispatch servers.
                            </p>
                        </div>
                    </div>

                    {/* Badge 2 */}
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF9F5] border border-[#EFECE6]/80">
                        <div className="w-10 h-10 rounded-xl bg-[#FAF3DF] flex items-center justify-center text-[#8C7A53] flex-shrink-0">
                            ✉
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-[#081634] mb-1">
                                Instant Direct Confirmation
                            </h4>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Your verified VIP Fast Track voucher and duty officer direct WhatsApp line arrive in your inbox in under 60 seconds.
                            </p>
                        </div>
                    </div>

                    {/* Badge 3 */}
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#FAF9F5] border border-[#EFECE6]/80">
                        <div className="w-10 h-10 rounded-xl bg-[#FAF3DF] flex items-center justify-center text-[#8C7A53] flex-shrink-0">
                            🎧
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-[#081634] mb-1">
                                24/7 Operations Desk
                            </h4>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Direct tarmac assistance at +84 (0) 24 3999 8888 for flight delays, gate diversions, or last-minute passenger changes.
                            </p>
                        </div>
                    </div>
                </div>

            </main>

            {/* Seamless Hanoi Transit CTA Banner Section */}
            <section className="relative w-full overflow-hidden min-h-[380px] md:min-h-[440px] flex items-center justify-center">
                {/* Background Image */}
                <img
                    src={seamlessHanoiTransitImg}
                    alt="Seamless Hanoi Transit"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-[#081634]/40 z-0"></div>

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
                        to="/services/airport-fast-track"
                        className="inline-flex items-center justify-center bg-[#E5B869] hover:bg-[#D4A758] text-[#081634] font-bold text-xs md:text-sm px-8 py-3.5 rounded-lg uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                        BOOK NOW
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Checkouts;
