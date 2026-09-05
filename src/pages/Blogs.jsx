import { useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/blogs/blogs-hero-image.webp';
import travelJournalImg from '../assets/blogs/travel-journal-section-image.webp';
import editorsDispatchImg from '../assets/blogs/editors-dispatch.webp';
import vietnamTravelImg from '../assets/blogs/VIETNAM-TRAVEL.webp';
import destinationsImg from '../assets/blogs/DESTINATIONS.webp';
import travelTipsImg from '../assets/blogs/TRAVEL-TIPS.webp';
import seamlessHanoiTransitImg from '../assets/blogs/SEAMLESS-HANOI-TRANSIT.webp';

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white mb-4">
        <path d="M12 2C12.5 7.5 16.5 11.5 22 12C16.5 12.5 12.5 16.5 12 22C11.5 16.5 7.5 12.5 2 12C7.5 11.5 11.5 7.5 12 2Z" />
    </svg>
);

const PhotoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#8C7A53]">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

const CATEGORIES = [
    'All',
    'Travel Tips',
    'Destinations',
    'Airport Services',
    'Vietnam Travel',
    'Travel Guides'
];

const ARTICLES = [
    {
        tag: "VIETNAM TRAVEL",
        image: vietnamTravelImg,
        date: "14 Oct 2025",
        readTime: "4 min read",
        title: "Hanoi's Hidden French Colonial Cafes & Architectural Walking Guide",
        description: "Step off the beaten path into quiet tree-lined courtyards, heritage villas, and the finest artisanal egg coffee haunts in the capital.",
        author: "By Cultural Desk",
        link: "#"
    },
    {
        tag: "DESTINATIONS",
        image: destinationsImg,
        date: "09 Oct 2025",
        readTime: "7 min read",
        title: "Chasing the Golden Season: Mu Cang Chai's Terraced Highlands",
        description: "An insider's journey through Northern Vietnam's dramatic harvest peaks, private luxury lodges, and tribal trekking routes.",
        author: "By Expedition Lead",
        link: "#"
    },
    {
        tag: "TRAVEL TIPS",
        image: travelTipsImg,
        date: "02 Oct 2025",
        readTime: "5 min read",
        title: "Essential Vietnam Visa on Arrival & Fast-Track Protocol for 2025",
        description: "Navigating new e-visa clearances, stamping fee procedures, and how VIP airport concierge guarantees zero wait time upon landing.",
        author: "By Aviation Bureau",
        link: "#"
    }
];

const Blogs = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredArticles = selectedCategory === 'All'
        ? ARTICLES
        : ARTICLES.filter(a => a.tag.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(a.tag.toLowerCase()));

    return (
        <div className="w-full bg-[#FFFFFF]">
            {/* Hero Section */}
            <section className="relative w-full h-[50vh] md:h-[65vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <img
                    src={heroImage}
                    alt="Travel Blogs Hero"
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

                    <p className="text-white text-sm md:text-base font-light tracking-wide uppercase">
                        Travel Blog
                    </p>
                </div>
            </section>

            {/* Travel Journal / Travel Inspiration & Expert Tips Section */}
            <section className="w-full pt-16 md:pt-20 pb-8 md:pb-12 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center bg-[#FFFFFF]">
                <div className="w-full max-w-7xl flex flex-col items-center">
                    
                    {/* Eyebrow Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF3DF] border border-[#EDE4D0] text-[#8C7A53] text-[11px] font-bold tracking-widest uppercase mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A53]"></span>
                        TRAVEL JOURNAL
                    </div>

                    {/* Section Title */}
                    <h2 className="text-[#081634] text-3xl md:text-4xl lg:text-[46px] font-serif font-normal text-center leading-[1.2] mb-4">
                        Travel Inspiration &amp; Expert Tips
                    </h2>

                    {/* Subtitle */}
                    <p className="text-[#556987] text-sm md:text-base text-center max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed">
                        Discover travel guides, airport tips, destinations and useful insights for a smoother journey across Southeast Asia and beyond.
                    </p>

                    {/* Featured Cover Story Visual */}
                    <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl min-h-[380px] md:min-h-[480px] lg:min-h-[540px] flex flex-col justify-end p-6 sm:p-8 md:p-12 group cursor-pointer">
                        {/* Background Image */}
                        <img
                            src={travelJournalImg}
                            alt="Timeless Waters: Navigating the Karst Labyrinths"
                            className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#081634]/90 via-[#081634]/30 to-transparent z-0"></div>

                        {/* Banner Content */}
                        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                            {/* Left Text */}
                            <div className="flex flex-col items-start text-left">
                                <span className="inline-block text-[9px] sm:text-[10px] font-bold tracking-widest text-[#E3CA90] bg-[#081634]/60 backdrop-blur-sm px-3.5 py-1 rounded-full uppercase mb-3 border border-[#E3CA90]/30">
                                    COVER STORY - HA LONG ARCHIPELAGO
                                </span>
                                <h3 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-serif font-normal leading-[1.2] max-w-2xl drop-shadow-md">
                                    Timeless Waters: Navigating the Karst Labyrinths in Indochine Grandeur
                                </h3>
                            </div>

                            {/* Right Glass Badge */}
                            <div className="bg-white/95 backdrop-blur-md rounded-xl md:rounded-2xl p-3.5 sm:p-4 shadow-xl border border-white/60 flex items-center gap-3 flex-shrink-0 self-start md:self-end">
                                <div className="w-9 h-9 rounded-lg bg-[#FAF3DF] flex items-center justify-center flex-shrink-0">
                                    <PhotoIcon />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[9px] sm:text-[10px] font-bold text-[#8C7A53] tracking-widest uppercase">
                                        FIELD ARCHIVE
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-[#081634]">
                                        Gulf of Tonkin Exclusive Dispatch
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Editor's Dispatch & Latest Articles Section */}
            <section className="w-full bg-[#F3F2EE] pt-8 md:pt-10 pb-20 md:pb-28 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center border-t border-gray-200/60">
                <div className="w-full max-w-7xl flex flex-col items-center">
                    
                    {/* Category Filter Pills */}
                    <div className="w-full flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1 mb-6 md:mb-8 text-left">
                        {CATEGORIES.map((cat) => {
                            const isActive = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                                        isActive
                                            ? 'bg-[#7A5C1E] text-white shadow-sm'
                                            : 'bg-[#EAE7DF] hover:bg-[#DDD9CF] text-[#475467]'
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>

                    {/* Top Featured Card: Editor's Dispatch */}
                    <div className="w-full bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-gray-100/80 grid grid-cols-1 lg:grid-cols-12 mb-16 md:mb-20 group">
                        {/* Left Column: Image with top-left badge */}
                        <div className="lg:col-span-6 relative overflow-hidden min-h-[300px] lg:min-h-[420px]">
                            <img
                                src={editorsDispatchImg}
                                alt="The Connoisseur's Guide to Seamless International Transit at Hanoi Noi Bai"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-5 left-5 bg-[#081634]/90 backdrop-blur-sm text-white text-[9px] md:text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase border border-white/20">
                                EDITOR'S DISPATCH
                            </div>
                        </div>

                        {/* Right Column: Article Details */}
                        <div className="lg:col-span-6 p-8 md:p-12 lg:p-14 flex flex-col justify-between text-left">
                            <div>
                                {/* Top Meta Row */}
                                <div className="flex items-center justify-between text-xs mb-3">
                                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#8C7A53] uppercase">
                                        AIRPORT SERVICES
                                    </span>
                                    <span className="text-gray-400 flex items-center gap-1.5 text-xs">
                                        🕒 18 Oct 2025 · 6 min read
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-[#081634] text-2xl md:text-3xl lg:text-[34px] font-serif font-normal leading-[1.2] my-4">
                                    The Connoisseur's Guide to Seamless International Transit at Hanoi Noi Bai
                                </h3>

                                {/* Description */}
                                <p className="text-[#556987] text-xs md:text-sm leading-relaxed mb-8">
                                    From airbridge personal escorts to diplomatic fast-track immigration and private Mercedes transfers, learn how bespoke airport concierge redefines Southeast Asian arrivals for distinguished travelers.
                                </p>
                            </div>

                            {/* Bottom Author Row */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-[#FAF3DF] flex items-center justify-center text-[#8C7A53] font-bold text-xs">
                                        AST
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-xs font-bold text-[#081634]">
                                            Concierge Protocol Team
                                        </span>
                                        <span className="text-[10px] text-gray-400">
                                            Noi Bai Operations Unit
                                        </span>
                                    </div>
                                </div>

                                <a
                                    href="#"
                                    className="text-xs font-semibold text-[#081634] hover:text-[#8C7A53] flex items-center gap-1.5 transition-colors group-hover:gap-2.5"
                                >
                                    Read Article
                                    <span>→</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Middle Section Header */}
                    <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 text-left">
                        <div>
                            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#8C7A53] uppercase mb-2 block">
                                SELECTED STORIES
                            </span>
                            <h2 className="text-[#081634] text-3xl md:text-4xl font-serif font-normal">
                                Latest Articles &amp; Insights
                            </h2>
                        </div>
                        <span className="text-xs text-gray-500 mt-2 md:mt-0">
                            Showing {filteredArticles.length} of 24 dispatches
                        </span>
                    </div>

                    {/* 3 Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 w-full mb-12 md:mb-14">
                        {filteredArticles.map((article, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#081634] text-[9px] font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-sm">
                                        {article.tag}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="p-6 md:p-7 flex flex-col justify-between flex-grow text-left">
                                    <div>
                                        <span className="text-[11px] text-gray-400 block mb-2">
                                            📅 {article.date} · {article.readTime}
                                        </span>
                                        <h3 className="text-[#081634] text-base md:text-lg font-serif font-bold mb-3 leading-snug">
                                            {article.title}
                                        </h3>
                                        <p className="text-[#556987] text-xs leading-relaxed mb-6">
                                            {article.description}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                        <span className="text-[11px] text-gray-400">
                                            {article.author}
                                        </span>
                                        <a
                                            href={article.link}
                                            className="text-xs font-semibold text-[#8C7A53] hover:text-[#081634] flex items-center gap-1 transition-colors"
                                        >
                                            Read More
                                            <span>→</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Load Button */}
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#EBE9E2] hover:bg-[#E0DDD4] text-[#081634] text-xs font-semibold transition-colors shadow-sm"
                    >
                        <span>🔄</span>
                        Load Prior Dispatches
                    </button>

                </div>
            </section>

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

export default Blogs;
