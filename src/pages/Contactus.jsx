import { useState } from 'react';
import heroImage from '../assets/contactus/Contactus-hero-image.webp';
import mapImage from '../assets/contactus/map-image-contactus.webp';

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white mb-4">
        <path d="M12 2C12.5 7.5 16.5 11.5 22 12C16.5 12.5 12.5 16.5 12 22C11.5 16.5 7.5 12.5 2 12C7.5 11.5 11.5 7.5 12 2Z" />
    </svg>
);

const INSTANT_CONNECTIONS = [
    {
        title: "Chat on WhatsApp",
        value: "+84 933 128 766",
        tag: "FASTEST RESPONSE",
        link: "https://wa.me/84933128766",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#081634]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
        )
    },
    {
        title: "Connect on Messenger",
        value: "@asianstartravel.vn",
        tag: "SOCIAL CONCIERGE",
        link: "https://m.me/asianstartravel.vn",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#081634]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-.607 0-1.21-.023-1.808-.069-1.077-.083-1.942-.924-2.062-1.996A48.406 48.406 0 0 1 12 15.75c-1.396 0-2.769-.072-4.108-.211A2.25 2.25 0 0 1 6 13.346v-3.75c0-1.136.847-2.1 1.98-2.193.856-.07 1.724-.122 2.604-.154" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75A2.25 2.25 0 0 1 6 4.5h9a2.25 2.25 0 0 1 2.25 2.25v5.25a2.25 2.25 0 0 1-2.25 2.25H9.75L6 17.25V14.25H6A2.25 2.25 0 0 1 3.75 12V6.75Z" />
            </svg>
        )
    },
    {
        title: "Direct Hotline",
        value: "1900 272 716 / +84 24 3828 9999",
        tag: "VOICE CONSULTATION",
        link: "tel:+842438289999",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#081634]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
        )
    }
];

const EXPERTISE_GUARANTEES = [
    {
        number: "01",
        title: "Local Vietnam Travel Experts",
        description: "In-house destination specialists resident in Hanoi and Saigon crafting authentic insider pathways."
    },
    {
        number: "02",
        title: "Bespoke Private Itineraries",
        description: "Private, entirely flexible, and handcrafted strictly according to your timeline, luxury tier, and personal tempo."
    },
    {
        number: "03",
        title: "24/7 Dedicated Ground Support",
        description: "Real-time airbridge coordination, chauffeur transfers, and 24-hour on-duty managers on standby."
    },
    {
        number: "04",
        title: "Licensed Operator",
        description: "Vietnam National Administration of Tourism accreditation: No. 01-2873/2025/CDLQGVN-GP LHQT."
    }
];

const Contactus = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        travelDates: '',
        travelers: '',
        serviceInterest: '',
        travelArrangement: '',
        travelStyle: '',
        message: '',
        agreePrivacy: false,
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                country: '',
                travelDates: '',
                travelers: '',
                serviceInterest: '',
                travelArrangement: '',
                travelStyle: '',
                message: '',
                agreePrivacy: false,
            });
        }, 5000);
    };

    return (
        <div className="w-full bg-[#FFFFFF]">
            {/* Hero Section */}
            <section className="relative w-full h-[50vh] md:h-[65vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <img
                    src={heroImage}
                    alt="Contact Us Hero"
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
                        Contact Us
                    </p>
                </div>
            </section>

            {/* Instant Connections Section */}
            <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center bg-[#FFFFFF]">
                <div className="w-full max-w-6xl bg-[#FAF9F5] rounded-3xl p-8 md:p-14 lg:p-16 flex flex-col items-center text-center shadow-sm border border-gray-100/80">
                    
                    {/* Eyebrow */}
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#8C7A53] uppercase mb-4 block">
                        INSTANT CONNECTIONS
                    </span>

                    {/* Heading */}
                    <h2 className="text-[#081634] text-3xl md:text-4xl lg:text-[42px] font-serif font-normal leading-[1.2] mb-4">
                        Need Help Planning Your Vietnam Journey?
                    </h2>

                    {/* Subtitle */}
                    <p className="text-[#556987] text-sm md:text-base max-w-xl mx-auto mb-12 md:mb-14 leading-relaxed">
                        Our local travel team is ready to help you create a personalized Vietnam experience in real time.
                    </p>

                    {/* 3 Channels Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
                        {INSTANT_CONNECTIONS.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-2xl p-7 md:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100/80 group"
                            >
                                {/* Top Icon */}
                                <div className="w-12 h-12 rounded-full bg-[#F3F4F6] group-hover:bg-[#FAF3DF] transition-colors flex items-center justify-center mb-5">
                                    {item.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-[#081634] text-base md:text-lg font-serif font-semibold mb-1.5">
                                    {item.title}
                                </h3>

                                {/* Value */}
                                <p className="text-xs md:text-sm font-semibold text-[#8C7A53] mb-4">
                                    {item.value}
                                </p>

                                {/* Tag */}
                                <span className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mt-auto">
                                    {item.tag}
                                </span>
                            </a>
                        ))}
                    </div>

                </div>
            </section>

            {/* Direct Concierge & Bespoke Inquiry Form Section */}
            <section className="w-full bg-[#FBF9F4] py-20 md:py-28 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center border-t border-gray-100/80">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* Left Column: Direct Concierge Contacts */}
                    <div className="lg:col-span-5 flex flex-col items-start text-left">
                        {/* Eyebrow */}
                        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#8C7A53] uppercase mb-3 block">
                            IMMEDIATE CONCIERGE
                        </span>

                        {/* Title */}
                        <h2 className="text-[#081634] text-3xl md:text-4xl lg:text-[40px] font-serif font-normal leading-[1.2] mb-4">
                            Prefer to reach us directly?
                        </h2>

                        {/* Subtitle */}
                        <p className="text-[#556987] text-sm md:text-base leading-relaxed mb-8">
                            Speak directly with our dedicated Vietnam destination specialists for immediate inquiries, aviation fast-track, or confidential delegations.
                        </p>

                        {/* Card 1: Direct Email */}
                        <div className="w-full bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80 flex items-start gap-4 mb-4 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#8C7A53]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                                </svg>
                            </div>
                            <div className="flex flex-col text-left min-w-0">
                                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                                    DIRECT EMAIL
                                </span>
                                <a
                                    href="mailto:nikhil@asianstartravels.com"
                                    className="text-sm md:text-base font-bold text-[#081634] hover:text-[#8C7A53] transition-colors truncate mt-0.5"
                                >
                                    nikhil@asianstartravels.com
                                </a>
                                <span className="text-xs text-gray-500 mt-0.5">
                                    Concierge &amp; Custom Itinerary Inquiries
                                </span>
                            </div>
                        </div>

                        {/* Card 2: Head Office Address */}
                        <div className="w-full bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80 mb-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#8C7A53]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                                    </svg>
                                </div>
                                <div className="flex items-center justify-between flex-grow">
                                    <h3 className="text-sm md:text-base font-bold text-[#081634]">
                                        Head Office Address
                                    </h3>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                                        HQ
                                    </span>
                                </div>
                            </div>
                            <div className="pl-14 text-left">
                                <p className="text-xs text-gray-600 mb-1">
                                    No. 4 Nguyen Thi Minh Khai Street, Sai Gon Ward, Ho Chi Minh City
                                </p>
                                <p className="text-xs text-gray-600 mb-4">
                                    No. 141 Nguyen Van Cu Street, Bo De Ward, Ha Noi City
                                </p>
                                <p className="text-xs font-semibold text-[#081634] mb-1">
                                    📞 (+84) 777 302 220, (+91) 70211 62391
                                </p>
                                <p className="text-[11px] text-gray-400">
                                    🕒 Mon – Sat: 08:30 – 18:00 (GMT+7)
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Office Address Mumbai */}
                        <div className="w-full bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80 mb-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#8C7A53]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                </div>
                                <div className="flex items-center justify-between flex-grow">
                                    <h3 className="text-sm md:text-base font-bold text-[#081634]">
                                        Office Address
                                    </h3>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF3DF] text-[#8C7A53]">
                                        DISTRICT 1
                                    </span>
                                </div>
                            </div>
                            <div className="pl-14 text-left">
                                <p className="text-xs text-gray-600 mb-4">
                                    Building No./Flat No.: 601 Rose Mary House Lady Jamshedji 2nd X Road Mumbai Maharashtra 400016
                                </p>
                                <p className="text-xs font-semibold text-[#081634] mb-1">
                                    📞 +91 99305 24949
                                </p>
                                <p className="text-[11px] text-gray-400">
                                    🕒 Mon – Sat: 08:30 – 18:00 (GMT+7)
                                </p>
                            </div>
                        </div>

                        {/* Card 4: 24/7 VIP Assistance */}
                        <a
                            href="tel:+919930524949"
                            className="w-full bg-gradient-to-r from-[#F7F6F0] to-[#EFECE3] rounded-2xl p-5 md:p-6 shadow-sm border border-[#E5E0D5] flex items-center justify-between gap-4 mb-6 hover:shadow-md transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2E7D32] shadow-sm flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .94-3.138 7.37 7.37 0 0 1-.876-2.017A8.25 8.25 0 0 1 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col text-left">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-[#081634]">
                                            24/7 VIP Assistance
                                        </span>
                                        <span className="bg-[#E8F5E9] text-[#2E7D32] text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                            LIVE
                                        </span>
                                    </div>
                                    <span className="text-sm md:text-base font-bold text-[#081634] mt-0.5">
                                        +91 99305 24949
                                    </span>
                                </div>
                            </div>
                            <span className="text-gray-400 group-hover:text-[#081634] group-hover:translate-x-1 transition-all text-base">
                                →
                            </span>
                        </a>

                        {/* Security & License notes */}
                        <div className="w-full flex items-center gap-2 text-xs text-gray-500 mb-3 text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#8C7A53] flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            <span>Your details are used only to respond to your inquiry with absolute discretion.</span>
                        </div>

                        <div className="w-full bg-white p-3.5 rounded-xl border border-gray-100 flex items-center gap-2.5 text-[10px] text-gray-500 font-mono tracking-wider text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#2E7D32] flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                            </svg>
                            <span>LICENSED INTERNATIONAL TOUR OPERATOR - NO: 01-2873/2025/CDLQGVN-GP LHQT</span>
                        </div>
                    </div>

                    {/* Right Column: Bespoke Inquiry Form */}
                    <div className="lg:col-span-7 bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col text-left">
                        {/* Eyebrow */}
                        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#8C7A53] uppercase mb-2 block">
                            BESPOKE INQUIRY
                        </span>

                        {/* Title */}
                        <h2 className="text-[#081634] text-2xl md:text-3xl lg:text-[34px] font-serif font-normal mb-2">
                            Tell Us About Your Trip
                        </h2>

                        {/* Subtitle */}
                        <p className="text-[#556987] text-xs md:text-sm mb-8 leading-relaxed">
                            Complete the inquiry details below. We tailor every itinerary around your pace, preferences, and travel style.
                        </p>

                        {/* Success Message */}
                        {isSubmitted ? (
                            <div className="p-6 bg-[#E8F5E9] border border-[#A5D6A7] rounded-xl text-center">
                                <h3 className="text-[#2E7D32] font-bold text-lg mb-2">Thank you! Your travel request has been received.</h3>
                                <p className="text-xs md:text-sm text-gray-700">Our dedicated Vietnam destination specialist will review your details and contact you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                {/* Row 1: Full Name & Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-[11px] font-semibold text-[#081634] block mb-1.5">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="e.g. Eleanor Vance"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C7A53] transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold text-[#081634] block mb-1.5">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C7A53] transition"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Phone & Country */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-[11px] font-semibold text-[#081634] block mb-1.5">
                                            Phone / WhatsApp
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+84 ... or +1 ..."
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C7A53] transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold text-[#081634] block mb-1.5">
                                            Country / Residence
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            placeholder="e.g. United States, United Kingdom, Australia"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C7A53] transition"
                                        />
                                    </div>
                                </div>

                                {/* Row 3: Travel Dates & Number of Travelers */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-[11px] font-semibold text-[#081634] block mb-1.5">
                                            Travel Dates
                                        </label>
                                        <input
                                            type="text"
                                            name="travelDates"
                                            value={formData.travelDates}
                                            onChange={handleChange}
                                            placeholder="e.g. Oct 2026, ~10 to 14 days"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C7A53] transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold text-[#081634] block mb-1.5">
                                            Number of Travelers
                                        </label>
                                        <input
                                            type="text"
                                            name="travelers"
                                            value={formData.travelers}
                                            onChange={handleChange}
                                            placeholder="e.g. 2 Adults, 1 Child"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C7A53] transition"
                                        />
                                    </div>
                                </div>

                                {/* Row 4: Service Interest & Travel Arrangement */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-[11px] font-semibold text-[#081634] block mb-1.5">
                                            Service Interest <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="serviceInterest"
                                            required
                                            value={formData.serviceInterest}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#8C7A53] transition"
                                        >
                                            <option value="">Select primary service</option>
                                            <option value="Tailor-Made Tours">Tailor-Made Tours</option>
                                            <option value="Private Transfers">Private Transfers</option>
                                            <option value="Airport Fast Track">Airport Fast Track</option>
                                            <option value="Ground Services">Ground Services</option>
                                            <option value="Comprehensive DMC Package">Comprehensive DMC Package</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-semibold text-[#081634] block mb-1.5">
                                            Travel Arrangement
                                        </label>
                                        <select
                                            name="travelArrangement"
                                            value={formData.travelArrangement}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#8C7A53] transition"
                                        >
                                            <option value="">Select travel arrangement</option>
                                            <option value="Solo / Couple (FIT)">Solo / Couple (FIT)</option>
                                            <option value="Small Family / Private Group">Small Family / Private Group</option>
                                            <option value="Corporate & Incentive Travel">Corporate &amp; Incentive Travel</option>
                                            <option value="Organized Group Travel (GIT)">Organized Group Travel (GIT)</option>
                                            <option value="Travel Agency / B2B Partnership">Travel Agency / B2B Partnership</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row 5: Travel Style & Special Interests */}
                                <div>
                                    <label className="text-[11px] font-semibold text-[#081634] block mb-1.5">
                                        Travel Style &amp; Special Interests
                                    </label>
                                    <input
                                        type="text"
                                        name="travelStyle"
                                        value={formData.travelStyle}
                                        onChange={handleChange}
                                        placeholder="e.g. Culture & Heritage, Fine Dining, Halong Cruise, Coastal Wellness"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C7A53] transition"
                                    />
                                </div>

                                {/* Row 6: Message */}
                                <div>
                                    <label className="text-[11px] font-semibold text-[#081634] block mb-1.5">
                                        Message / Travel Request Details <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Please share any specific destinations, preferred hotel tier (5-star boutique, ultra-luxury), flight details, dietary wishes, or custom operational requirements..."
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C7A53] transition resize-none"
                                    />
                                </div>

                                {/* Row 7: Privacy Checkbox */}
                                <div className="flex items-start gap-3 mt-1">
                                    <input
                                        type="checkbox"
                                        id="agreePrivacy"
                                        name="agreePrivacy"
                                        required
                                        checked={formData.agreePrivacy}
                                        onChange={handleChange}
                                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#731E2A] focus:ring-[#731E2A]"
                                    />
                                    <label htmlFor="agreePrivacy" className="text-xs text-gray-500 text-left leading-relaxed">
                                        I agree that Asian Star Travel may use my details to respond to this inquiry in accordance with privacy guidelines.
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#731E2A] hover:bg-[#5C1822] text-white font-bold py-4 rounded-lg text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow-md mt-2"
                                >
                                    SEND TRAVEL REQUEST →
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </section>

            {/* Physical Presence / Visit Our Offices Section */}
            <section className="w-full bg-[#FBF9F4] py-20 md:py-28 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="w-full max-w-7xl flex flex-col items-center">
                    
                    {/* Eyebrow */}
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#8C7A53] uppercase mb-4 block text-center">
                        PHYSICAL PRESENCE
                    </span>

                    {/* Section Title */}
                    <h2 className="text-[#081634] text-3xl md:text-4xl lg:text-[46px] font-serif font-normal text-center leading-[1.2] mb-4">
                        Visit Our Offices
                    </h2>

                    {/* Subtitle */}
                    <p className="text-[#556987] text-sm md:text-base text-center max-w-xl mb-12 md:mb-14 leading-relaxed">
                        Meet our destination directors and operational ground teams in Vietnam's two major commercial and cultural hubs.
                    </p>

                    {/* Map Visual Container */}
                    <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl min-h-[440px] md:min-h-[520px] flex flex-col justify-between p-6 sm:p-8 md:p-10 border border-gray-200/60">
                        {/* Background Map Image */}
                        <img
                            src={mapImage}
                            alt="Asian Star Travel Office Locations Map"
                            className="absolute inset-0 w-full h-full object-cover z-0"
                        />

                        {/* Tint Overlay */}
                        <div className="absolute inset-0 bg-[#081634]/15 z-0"></div>

                        {/* Top-Left Coordinates Badge */}
                        <div className="relative z-10 flex flex-col text-left text-[10px] md:text-xs font-mono font-bold tracking-wider text-[#B8924A] uppercase drop-shadow">
                            <span>LAT 21.0285° N / LON 105.8542° E [HAN]</span>
                            <span>LAT 10.8231° N / LON 106.6297° E [SGN]</span>
                        </div>

                        {/* Bottom Office Floating Cards */}
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full mt-10">
                            {/* Hanoi Card */}
                            <div className="bg-[#FAF9F5]/95 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-xl border border-white/60 flex flex-col justify-between text-left">
                                <div>
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-[#FAF3DF] flex items-center justify-center flex-shrink-0 text-[#8C7A53]">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-sm md:text-base font-bold text-[#081634]">
                                                    Hanoi Central Headquarters
                                                </h3>
                                                <span className="text-[10px] md:text-[11px] text-gray-500 block">
                                                    Northern Vietnam &amp; Halong Fleet Dispatch
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EDEBE4] text-[#8C7A53] flex-shrink-0">
                                            HAN DESK
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 my-3 leading-relaxed">
                                        141 Nguyen Van Cu St., Bo De Ward, Long Bien District, Ha Noi
                                    </p>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-gray-200/60 mt-2">
                                    <span className="text-xs font-semibold text-[#081634] flex items-center gap-1.5">
                                        ✈ Noi Bai Int'l Airport Liaison
                                    </span>
                                    <a
                                        href="tel:+842438289999"
                                        className="text-xs font-semibold text-[#081634] hover:text-[#8C7A53] transition-colors"
                                    >
                                        Direct Call
                                    </a>
                                </div>
                            </div>

                            {/* Ho Chi Minh City Card */}
                            <div className="bg-[#FAF9F5]/95 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-xl border border-white/60 flex flex-col justify-between text-left">
                                <div>
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-[#FAF3DF] flex items-center justify-center flex-shrink-0 text-[#8C7A53]">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-sm md:text-base font-bold text-[#081634]">
                                                    Ho Chi Minh City Regional Office
                                                </h3>
                                                <span className="text-[10px] md:text-[11px] text-gray-500 block">
                                                    Mekong Delta &amp; South Vietnam Operations
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EDEBE4] text-[#8C7A53] flex-shrink-0">
                                            SGN DESK
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 my-3 leading-relaxed">
                                        Floor 7, 4 Nguyen Thi Minh Khai St., Sai Gon Ward, District 1, Ho Chi Minh City
                                    </p>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-gray-200/60 mt-2">
                                    <span className="text-xs font-semibold text-[#081634] flex items-center gap-1.5">
                                        🚗 Tan Son Nhat Airbridge Escort
                                    </span>
                                    <a
                                        href="tel:+84777302220"
                                        className="text-xs font-semibold text-[#081634] hover:text-[#8C7A53] transition-colors"
                                    >
                                        Direct Call
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Peace of Mind Guarantee Section */}
            <section className="w-full bg-[#FFFFFF] py-20 md:py-28 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center border-t border-gray-100/80">
                <div className="w-full max-w-7xl flex flex-col items-center">
                    
                    {/* Eyebrow */}
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#8C7A53] uppercase mb-4 block text-center">
                        PEACE OF MIND GUARANTEE
                    </span>

                    {/* Section Title */}
                    <h2 className="text-[#081634] text-3xl md:text-4xl lg:text-[46px] font-serif font-normal text-center leading-[1.2] mb-3">
                        Your Journey, Our Local Expertise
                    </h2>

                    {/* Accent divider line */}
                    <div className="w-16 h-[2px] bg-[#C5A869] mb-14 md:mb-16"></div>

                    {/* 4 Cards Grid */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
                        {EXPERTISE_GUARANTEES.map((item, index) => (
                            <div
                                key={index}
                                className="bg-[#FAF9F5] rounded-2xl md:rounded-3xl p-7 md:p-8 flex flex-col justify-start text-left border border-[#EFECE6] shadow-sm hover:shadow-lg transition-all duration-300 group"
                            >
                                <span className="text-[#C5A869] text-xl md:text-2xl font-serif font-bold mb-4 block">
                                    {item.number}
                                </span>
                                <h3 className="text-[#081634] text-base md:text-lg font-bold mb-3 leading-snug">
                                    {item.title}
                                </h3>
                                <p className="text-[#556987] text-xs md:text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Contactus;
