import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/Trip/trip-hero-image.webp';
import tasteImg from '../assets/Trip/taste.webp';
import heritageImg from '../assets/Trip/heritage.webp';
import saveThisForLaterImg from '../assets/Trip/SAVE-THIS-FOR-LATER.webp';

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white mb-4">
        <path d="M12 2C12.5 7.5 16.5 11.5 22 12C16.5 12.5 12.5 16.5 12 22C11.5 16.5 7.5 12.5 2 12C7.5 11.5 11.5 7.5 12 2Z" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

const CutleryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v6.75m0 0a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V3m4.5 6.75V21m7.5-18v18m3-18v6.75a3 3 0 0 1-3 3h0m0-9.75v18" />
    </svg>
);

const TempleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5m-15 10.5V10.5M3 21h18" />
    </svg>
);

const CompassSparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
        <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
    </svg>
);

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);

const ChatBubbleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-200">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
);

const Trip = () => {
    const dateInputRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [travelers, setTravelers] = useState('2');
    const [interest, setInterest] = useState('Choose an interest');
    const [matchedNotification, setMatchedNotification] = useState(false);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleMatch = () => {
        setMatchedNotification(true);
        setTimeout(() => setMatchedNotification(false), 3000);
    };

    return (
        <div className="w-full bg-[#FFFFFF]">
            {/* Hero Section */}
            <section className="relative w-full h-[50vh] md:h-[65vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <img
                    src={heroImage}
                    alt="Trip Hero"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Dark/Blue Overlay to improve text readability */}
                <div className="absolute inset-0 bg-[#081634]/30 z-0"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center px-6 -mt-10">
                    <StarIcon />

                    <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif tracking-widest mb-6">
                        ASMALLWORLD
                    </h1>

                    {/* Gold separator line */}
                    <div className="w-24 md:w-32 h-[1px] bg-[#C5A869] mb-6"></div>

                    <p className="text-white text-sm md:text-base font-light tracking-wide">
                        Services / Ground services
                    </p>
                </div>
            </section>

            {/* Build A Day You Will Love Filter Bar */}
            <section className="w-full bg-[#0E1C37] py-6 md:py-8 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center border-t border-white/5">
                <div className="max-w-7xl w-full flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Left Title */}
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1 block">
                            BUILD A DAY YOU WILL LOVE
                        </span>
                        <h2 className="text-white text-xl sm:text-2xl md:text-[26px] font-serif font-bold">
                            Tell us how you want to explore
                        </h2>
                    </div>

                    {/* Right Interactive Controls */}
                    <div className="flex flex-wrap items-center gap-3 relative">
                        {/* Any dates Pill */}
                        <div
                            className="relative bg-white text-[#081634] text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full flex items-center gap-2 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
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
                            <span>{selectedDate ? selectedDate : 'Any dates'}</span>
                            <CalendarIcon />
                            <input
                                ref={dateInputRef}
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
                            />
                        </div>

                        {/* Travelers Selector Pill */}
                        <div className="relative bg-white text-[#081634] text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-colors">
                            <span>{travelers} travelers</span>
                            <UsersIcon />
                            <select
                                value={travelers}
                                onChange={(e) => setTravelers(e.target.value)}
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            >
                                <option value="1">1 traveler</option>
                                <option value="2">2 travelers</option>
                                <option value="3">3 travelers</option>
                                <option value="4">4 travelers</option>
                                <option value="5+">5+ travelers</option>
                            </select>
                        </div>

                        {/* Interest Dropdown Pill */}
                        <div className="relative bg-white text-[#081634] text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-colors">
                            <span>{interest}</span>
                            <ChevronDownIcon />
                            <select
                                value={interest}
                                onChange={(e) => setInterest(e.target.value)}
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            >
                                <option value="Choose an interest">Choose an interest</option>
                                <option value="Culture & Heritage">Culture & Heritage</option>
                                <option value="Taste & Street Food">Taste & Street Food</option>
                                <option value="Nature & Adventure">Nature & Adventure</option>
                                <option value="Private Shore Excursions">Private Shore Excursions</option>
                                <option value="VIP City Expeditions">VIP City Expeditions</option>
                            </select>
                        </div>

                        {/* Match me Button */}
                        <button
                            type="button"
                            onClick={handleMatch}
                            className="bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer whitespace-nowrap"
                        >
                            Match me
                        </button>

                        {/* Match Notification feedback */}
                        {matchedNotification && (
                            <div className="absolute -bottom-10 right-0 bg-emerald-500 text-white text-xs px-4 py-1.5 rounded-full shadow-lg animate-fade-in">
                                Finding personalized itineraries for you...
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Choose the Hanoi that speaks to you Section */}
            <section className="w-full bg-[#FFFFFF] py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="max-w-7xl w-full flex flex-col">

                    {/* Header Row (2 Columns) */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#081634] uppercase mb-2 block">
                                A CITY OF CONTRASTS
                            </span>
                            <h2 className="text-[#081634] text-3xl sm:text-4xl md:text-[44px] font-serif font-bold leading-tight">
                                Choose the Hanoi <br className="hidden sm:inline" />
                                that speaks to you
                            </h2>
                        </div>
                        <div className="max-w-md">
                            <p className="text-[#556987] text-xs sm:text-sm md:text-[15px] leading-relaxed">
                                Move from the incense-softened calm of old temples to a street-side bowl of pho before lunch. Every turn brings a new texture.
                            </p>
                        </div>
                    </div>

                    {/* 3-Column Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {/* Card 1: Taste */}
                        <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={tasteImg}
                                    alt="Taste Hanoi"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold tracking-wider text-[#081634] uppercase">
                                            TASTE
                                        </span>
                                        <CutleryIcon />
                                    </div>
                                    <h3 className="text-[#081634] font-serif font-bold text-lg sm:text-xl mb-2">
                                        Follow the flavor trail
                                    </h3>
                                    <p className="text-[#556987] text-xs sm:text-sm leading-relaxed">
                                        Breakfast pho, hidden cafés and recipes shaped by generations.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Heritage */}
                        <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={heritageImg}
                                    alt="Heritage Hanoi"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold tracking-wider text-[#081634] uppercase">
                                            HERITAGE
                                        </span>
                                        <TempleIcon />
                                    </div>
                                    <h3 className="text-[#081634] font-serif font-bold text-lg sm:text-xl mb-2">
                                        Read the city’s layers
                                    </h3>
                                    <p className="text-[#556987] text-xs sm:text-sm leading-relaxed">
                                        Ancient courtyards, French facades and remarkable local craft.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Deep Navy Promo Box */}
                        <div className="bg-[#0E1C37] rounded-2xl md:rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-lg text-white group hover:shadow-2xl transition-all duration-300">
                            <div>
                                <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center mb-6">
                                    <CompassSparkleIcon />
                                </div>
                                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase mb-3 block">
                                    TRAVEL DIFFERENTLY
                                </span>
                                <h3 className="text-white text-2xl sm:text-3xl font-serif font-bold leading-snug mb-8">
                                    A local guide, only for your group.
                                </h3>
                            </div>

                            <Link
                                to="/tours"
                                className="bg-white hover:bg-gray-100 text-[#081634] font-bold text-xs sm:text-sm px-6 py-3 rounded-full inline-flex items-center justify-center transition-all w-fit shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                Explore More
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            {/* Curated For Your First Visit / Small Moments Section */}
            <section className="w-full bg-[#F5F3EE] py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="max-w-7xl w-full flex flex-col">

                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                        <div>
                            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#081634] uppercase mb-2 block">
                                CURATED FOR YOUR FIRST VISIT
                            </span>
                            <h2 className="text-[#081634] text-3xl sm:text-4xl font-serif font-bold">
                                Small moments, planned beautifully
                            </h2>
                        </div>
                        <Link
                            to="/tours"
                            className="bg-[#525252] hover:bg-[#404040] text-white font-medium text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all shadow-sm active:scale-95 w-fit whitespace-nowrap"
                        >
                            See all experiences
                        </Link>
                    </div>

                    {/* 3 Curated Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {/* Card 1: Morning */}
                        <div className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <span className="bg-[#F3F4F6] text-gray-700 text-[11px] font-semibold px-3 py-1 rounded-full">
                                        Morning
                                    </span>
                                    <button
                                        type="button"
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                                    >
                                        <HeartIcon />
                                    </button>
                                </div>
                                <h3 className="text-[#081634] font-serif font-bold text-lg sm:text-xl mb-2 group-hover:text-[#C5A869] transition-colors">
                                    Old Quarter + coffee ritual
                                </h3>
                                <p className="text-[#D97706] text-xs font-medium mb-6">
                                    3 hours · Private guide · From $42
                                </p>
                            </div>
                            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                                <span className="text-[#081634] font-bold text-xs sm:text-sm">
                                    From $42
                                </span>
                                <Link
                                    to="/tours"
                                    className="text-[#081634] font-bold text-xs sm:text-sm flex items-center gap-1 hover:text-[#C5A869] transition-colors"
                                >
                                    Details →
                                </Link>
                            </div>
                        </div>

                        {/* Card 2: Afternoon */}
                        <div className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <span className="bg-[#F3F4F6] text-gray-700 text-[11px] font-semibold px-3 py-1 rounded-full">
                                        Afternoon
                                    </span>
                                    <button
                                        type="button"
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                                    >
                                        <HeartIcon />
                                    </button>
                                </div>
                                <h3 className="text-[#081634] font-serif font-bold text-lg sm:text-xl mb-2 group-hover:text-[#C5A869] transition-colors">
                                    Temple of Literature &amp; craft
                                </h3>
                                <p className="text-[#D97706] text-xs font-medium mb-6">
                                    4 hours · Local storyteller · From $55
                                </p>
                            </div>
                            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                                <span className="text-[#081634] font-bold text-xs sm:text-sm">
                                    From $55
                                </span>
                                <Link
                                    to="/tours"
                                    className="text-[#081634] font-bold text-xs sm:text-sm flex items-center gap-1 hover:text-[#C5A869] transition-colors"
                                >
                                    Details →
                                </Link>
                            </div>
                        </div>

                        {/* Card 3: Evening */}
                        <div className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <span className="bg-[#F3F4F6] text-gray-700 text-[11px] font-semibold px-3 py-1 rounded-full">
                                        Evening
                                    </span>
                                    <button
                                        type="button"
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                                    >
                                        <HeartIcon />
                                    </button>
                                </div>
                                <h3 className="text-[#081634] font-serif font-bold text-lg sm:text-xl mb-2 group-hover:text-[#C5A869] transition-colors">
                                    Hanoi after dark
                                </h3>
                                <p className="text-[#D97706] text-xs font-medium mb-6">
                                    3.5 hours · Food tastings · From $49
                                </p>
                            </div>
                            <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                                <span className="text-[#081634] font-bold text-xs sm:text-sm">
                                    From $49
                                </span>
                                <Link
                                    to="/tours"
                                    className="text-[#081634] font-bold text-xs sm:text-sm flex items-center gap-1 hover:text-[#C5A869] transition-colors"
                                >
                                    Details →
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Save This For Later CTA Banner Section */}
            <section className="relative w-full overflow-hidden min-h-[380px] md:min-h-[440px] flex items-center justify-center">
                {/* Background Image */}
                <img
                    src={saveThisForLaterImg}
                    alt="Save This For Later"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#081634]/85 via-[#081634]/60 to-transparent z-0"></div>

                {/* Content Container */}
                <div className="relative z-10 max-w-7xl w-full px-6 md:px-12 lg:px-20 xl:px-32 py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    {/* Left Column */}
                    <div className="max-w-2xl">
                        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#E5B869] uppercase mb-2 block">
                            SAVE THIS FOR LATER
                        </span>
                        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight mb-4 drop-shadow-md">
                            Your Hanoi journey starts <br />
                            with one good conversation.
                        </h2>
                        <p className="text-gray-200 text-xs sm:text-sm md:text-base max-w-xl mb-8 leading-relaxed drop-shadow-sm">
                            Share your dates, pace and wish list. Our travel designers will return with a thoughtful plan—not a template.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center bg-[#081634] hover:bg-[#122345] text-white border border-white/20 font-medium text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            Speak with a Hanoi specialist
                        </Link>
                    </div>

                    {/* Right Floating Glass Card */}
                    <div className="bg-[#22272F]/75 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/10 text-white max-w-xs w-full shadow-2xl flex flex-col items-start">
                        <div className="mb-3">
                            <ChatBubbleIcon />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">
                            Usually replies within a day
                        </h4>
                        <p className="text-xs text-gray-300 leading-relaxed">
                            Tell us what you are dreaming of.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Trip;
