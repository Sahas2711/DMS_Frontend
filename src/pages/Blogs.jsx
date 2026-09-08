import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock } from 'lucide-react';
import heroImage from '../assets/blogs/blogs-hero-image.webp';
import travelJournalImg from '../assets/blogs/travel-journal-section-image.webp';
import editorsDispatchImg from '../assets/blogs/editors-dispatch.webp';
import vietnamTravelImg from '../assets/blogs/VIETNAM-TRAVEL.webp';
import destinationsImg from '../assets/blogs/DESTINATIONS.webp';
import travelTipsImg from '../assets/blogs/TRAVEL-TIPS.webp';
import seamlessHanoiTransitImg from '../assets/blogs/SEAMLESS-HANOI-TRANSIT.webp';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';

const PhotoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-bronze">
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
        author: "By Cultural Desk"
    },
    {
        tag: "DESTINATIONS",
        image: destinationsImg,
        date: "09 Oct 2025",
        readTime: "7 min read",
        title: "Chasing the Golden Season: Mu Cang Chai's Terraced Highlands",
        description: "An insider's journey through Northern Vietnam's dramatic harvest peaks, private luxury lodges, and tribal trekking routes.",
        author: "By Expedition Lead"
    },
    {
        tag: "TRAVEL TIPS",
        image: travelTipsImg,
        date: "02 Oct 2025",
        readTime: "5 min read",
        title: "Essential Vietnam Visa on Arrival & Fast-Track Protocol for 2025",
        description: "Navigating new e-visa clearances, stamping fee procedures, and airport fast-track assistance protocols for smoother arrivals.",
        author: "By Aviation Bureau"
    }
];

const Blogs = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredArticles = selectedCategory === 'All'
        ? ARTICLES
        : ARTICLES.filter(a => a.tag.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(a.tag.toLowerCase()));

    return (
        <div className="w-full bg-[#FFFFFF]">
            <Seo {...PAGE_META['/blog']} path="/blog" image={heroImage} />

            <PageHero image={heroImage} alt="" title="Travel Journal" eyebrow="Travel Blog" uppercase />

            {/* Travel Journal / Travel Inspiration & Expert Tips Section */}
            <section className="w-full pt-16 md:pt-20 pb-8 md:pb-12 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center bg-[#FFFFFF]">
                <div className="w-full max-w-7xl flex flex-col items-center">
                    
                    {/* Eyebrow Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne border border-[#EDE4D0] text-bronze text-[11px] font-bold tracking-widest uppercase mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-bronze"></span>
                        TRAVEL JOURNAL
                    </div>

                    {/* Section Title */}
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-[46px] font-serif font-normal text-center leading-[1.2] mb-4">
                        Travel Inspiration &amp; Expert Tips
                    </h2>

                    {/* Subtitle */}
                    <p className="text-steel text-sm md:text-base text-center max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed">
                        Discover travel guides, airport tips, destinations and useful insights for a smoother journey across Southeast Asia and beyond.
                    </p>

                    {/* Featured Cover Story Visual */}
                    <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl min-h-[380px] md:min-h-[480px] lg:min-h-[540px] flex flex-col justify-end p-6 sm:p-8 md:p-12 group">
                        {/* Background Image */}
                        <img
                            src={travelJournalImg}
                            alt="Timeless Waters: Navigating the Karst Labyrinths"
                            className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                            decoding="async"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent z-0"></div>

                        {/* Banner Content */}
                        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                            {/* Left Text */}
                            <div className="flex flex-col items-start text-left">
                                <span className="inline-block text-[9px] sm:text-[10px] font-bold tracking-widest text-[#E3CA90] bg-navy/60 backdrop-blur-sm px-3.5 py-1 rounded-full uppercase mb-3 border border-[#E3CA90]/30">
                                    COVER STORY - HA LONG ARCHIPELAGO
                                </span>
                                <h3 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-serif font-normal leading-[1.2] max-w-2xl drop-shadow-md">
                                    Timeless Waters: Navigating the Karst Labyrinths in Indochine Grandeur
                                </h3>
                            </div>

                            {/* Right Glass Badge */}
                            <div className="bg-white/95 backdrop-blur-md rounded-xl md:rounded-2xl p-3.5 sm:p-4 shadow-xl border border-white/60 flex items-center gap-3 flex-shrink-0 self-start md:self-end">
                                <div className="w-9 h-9 rounded-lg bg-champagne flex items-center justify-center flex-shrink-0">
                                    <PhotoIcon />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[9px] sm:text-[10px] font-bold text-bronze tracking-widest uppercase">
                                        FIELD ARCHIVE
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-navy">
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
                                    aria-pressed={isActive}
                                    className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer ${
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
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="absolute top-5 left-5 bg-navy/90 backdrop-blur-sm text-white text-[9px] md:text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase border border-white/20">
                                EDITOR'S DISPATCH
                            </div>
                        </div>

                        {/* Right Column: Article Details */}
                        <div className="lg:col-span-6 p-8 md:p-12 lg:p-14 flex flex-col justify-between text-left">
                            <div>
                                {/* Top Meta Row */}
                                <div className="flex items-center justify-between text-xs mb-3">
                                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase">
                                        AIRPORT SERVICES
                                    </span>
                                    <span className="text-gray-400 flex items-center gap-1.5 text-xs">
                                        <Clock className="h-3.5 w-3.5" aria-hidden="true" /> 18 Oct 2025 · 6 min read
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-navy text-2xl md:text-3xl lg:text-[34px] font-serif font-normal leading-[1.2] my-4">
                                    The Connoisseur's Guide to Seamless International Transit at Hanoi Noi Bai
                                </h3>

                                {/* Description */}
                                <p className="text-steel text-xs md:text-sm leading-relaxed mb-8">
                                    From airbridge personal escorts to diplomatic fast-track immigration and private Mercedes transfers, learn how bespoke airport concierge redefines Southeast Asian arrivals for distinguished travelers.
                                </p>
                            </div>

                            {/* Bottom Author Row */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-champagne flex items-center justify-center text-bronze font-bold text-xs">
                                        AST
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-xs font-bold text-navy">
                                            Concierge Protocol Team
                                        </span>
                                        <span className="text-[10px] text-gray-400">
                                            Noi Bai Operations Unit
                                        </span>
                                    </div>
                                </div>

                        </div>
                            </div>
                        </div>

                    {/* Middle Section Header */}
                    <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 text-left">
                        <div>
                            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-2 block">
                                SELECTED STORIES
                            </span>
                            <h2 className="text-navy text-3xl md:text-4xl font-serif font-normal">
                                Latest Articles &amp; Insights
                            </h2>
                        </div>
                        <span className="text-xs text-gray-500 mt-2 md:mt-0">
                            Showing {filteredArticles.length} of {ARTICLES.length} dispatches
                        </span>
                    </div>

                    {/* 3 Articles Grid */}
                    {filteredArticles.length === 0 ? (
                        <div className="w-full text-center py-12 bg-white rounded-2xl border border-gray-100">
                            <p className="text-navy font-serif text-lg font-semibold mb-1">No stories in this category yet</p>
                            <p className="text-steel text-sm mb-4">Try another filter, or check back soon for new dispatches.</p>
                            <button type="button" onClick={() => setSelectedCategory('All')} className="btn btn--gold btn--sm">View all stories</button>
                        </div>
                    ) : (
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
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-navy text-[9px] font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-sm">
                                        {article.tag}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="p-6 md:p-7 flex flex-col justify-between flex-grow text-left">
                                    <div>
                                        <span className="text-[11px] text-gray-400 block mb-2 flex items-center gap-1.5">
                                            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> {article.date} · {article.readTime}
                                        </span>
                                        <h3 className="text-navy text-base md:text-lg font-serif font-bold mb-3 leading-snug">
                                            {article.title}
                                        </h3>
                                        <p className="text-steel text-xs leading-relaxed mb-6">
                                            {article.description}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                        <span className="text-[11px] text-gray-400">
                                            {article.author}
                                        </span>
                                        <span className="text-[11px] text-bronze flex items-center gap-1">
                                            Excerpt
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    )}
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
                        Fast-track and reconnect assistance for your clients across Vietnam, Japan and Australia. Send us the details and we will confirm the service plan.
                    </p>

                    {/* CTA Button */}
                    <Link
                        to="/request-quote"
                        className="btn btn--gold btn--lg"
                    >
                        Request a Quote
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Blogs;
