import { Link } from 'react-router-dom';
import heroImage from '../assets/contactus/Contactus-hero-image.webp';
import mapImage from '../assets/contactus/map-image-contactus.webp';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import ContactForm from '../components/forms/ContactForm';
import { PAGE_META, SITE } from '../config/site';

const INSTANT_CONNECTIONS = [
    {
        title: "Chat on WhatsApp",
        value: "+84 933 128 766",
        tag: "FASTEST RESPONSE",
        link: "https://wa.me/84933128766",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-navy">
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-navy">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-.607 0-1.21-.023-1.808-.069-1.077-.083-1.942-.924-2.062-1.996A48.406 48.406 0 0 1 12 15.75c-1.396 0-2.769-.072-4.108-.211A2.25 2.25 0 0 1 6 13.346v-3.75c0-1.136.847-2.1 1.98-2.193.856-.07 1.724-.122 2.604-.154" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75A2.25 2.25 0 0 1 6 4.5h9a2.25 2.25 0 0 1 2.25 2.25v5.25a2.25 2.25 0 0 1-2.25 2.25H9.75L6 17.25V14.25H6A2.25 2.25 0 0 1 3.75 12V6.75Z" />
            </svg>
        )
    },
    {
        title: "Direct Hotline",
        value: "+84 24 3828 9999",
        tag: "VOICE CONSULTATION",
        link: "tel:+842438289999",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-navy">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
        )
    }
];

const EXPERTISE_GUARANTEES = [
    {
        number: "01",
        title: "Destination Specialists",
        description: "In-house ground experts for Vietnam, Japan and Australia crafting authentic, insider itineraries."
    },
    {
        number: "02",
        title: "Bespoke Private Itineraries",
        description: "Private, entirely flexible, and handcrafted strictly according to your timeline, luxury tier, and client's tempo."
    },
    {
        number: "03",
        title: "Dedicated Trade Support",
        description: "A named account team coordinating quotes, confirmations and ground services for your programs."
    },
    {
        number: "04",
        title: "Licensed Ground Operator",
        description: "Operated to industry standards with vetted guides, drivers and hotels across our launch destinations."
    }
];

const Contactus = () => {
    return (
        <div className="w-full bg-[#FFFFFF]">
            <Seo {...PAGE_META['/contact']} path="/contact" />

            <PageHero image={heroImage} alt="" eyebrow="Contact Us" uppercase />

            {/* Instant Connections Section */}
            <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center bg-[#FFFFFF]">
                <div className="w-full max-w-6xl bg-cream rounded-3xl p-8 md:p-14 lg:p-16 flex flex-col items-center text-center shadow-sm border border-gray-100/80">
                    
                    {/* Eyebrow */}
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-4 block">
                        INSTANT CONNECTIONS
                    </span>

                    {/* Heading */}
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-[42px] font-serif font-normal leading-[1.2] mb-4">
                        Need Help Planning Across Vietnam, Japan &amp; Australia?
                    </h2>

                    {/* Subtitle */}
                    <p className="text-steel text-sm md:text-base max-w-xl mx-auto mb-12 md:mb-14 leading-relaxed">
                        Our B2B team is ready to help you shape programs for your clients — destination advice, FIT and group support, MICE and more.
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
                                <div className="w-12 h-12 rounded-full bg-[#F3F4F6] group-hover:bg-champagne transition-colors flex items-center justify-center mb-5">
                                    {item.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-navy text-base md:text-lg font-serif font-semibold mb-1.5">
                                    {item.title}
                                </h3>

                                {/* Value */}
                                <p className="text-xs md:text-sm font-semibold text-bronze mb-4">
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
            <section className="w-full bg-ivory py-20 md:py-28 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center border-t border-gray-100/80">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* Left Column: Direct Concierge Contacts */}
                    <div className="lg:col-span-5 flex flex-col items-start text-left">
                        {/* Eyebrow */}
                        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-3 block">
                            IMMEDIATE CONCIERGE
                        </span>

                        {/* Title */}
                        <h2 className="text-navy text-3xl md:text-4xl lg:text-[40px] font-serif font-normal leading-[1.2] mb-4">
                            Prefer to reach us directly?
                        </h2>

                        {/* Subtitle */}
                        <p className="text-steel text-sm md:text-base leading-relaxed mb-8">
                            Reach our B2B team directly for inquiries, join requests, or confidential delegations.
                        </p>

                        {/* Card 1: Direct Email */}
                        <div className="w-full bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80 flex items-start gap-4 mb-4 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-bronze">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                                </svg>
                            </div>
                            <div className="flex flex-col text-left min-w-0">
                                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                                    DIRECT EMAIL
                                </span>
                                <a
                                    href={`mailto:${SITE.enquiryEmails.contact}`}
                                    className="text-sm md:text-base font-bold text-navy hover:text-bronze transition-colors truncate mt-0.5"
                                >
                                    {SITE.enquiryEmails.contact}
                                </a>
                                <span className="text-xs text-gray-500 mt-0.5">
                                    General inquiries
                                </span>
                            </div>
                        </div>

                        {/* Card 2: Head Office Address */}
                        <div className="w-full bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80 mb-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-bronze">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                                    </svg>
                                </div>
                                <div className="flex items-center justify-between flex-grow">
                                    <h3 className="text-sm md:text-base font-bold text-navy">
                                        Head Office
                                    </h3>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                                        HQ
                                    </span>
                                </div>
                            </div>
                            <div className="pl-14 text-left">
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {SITE.registeredAddress}
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Trade Desk Contacts */}
                        <div className="w-full bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100/80 mb-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-bronze">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                </div>
                                <div className="flex items-center justify-between flex-grow">
                                    <h3 className="text-sm md:text-base font-bold text-navy">
                                        Travel Trade Desk
                                    </h3>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-champagne text-bronze">
                                        B2B
                                    </span>
                                </div>
                            </div>
                            <div className="pl-14 flex flex-col gap-1.5 text-left">
                                <p className="text-xs text-gray-600">
                                    <span className="text-navy font-bold inline-block w-32">Quote requests</span>
                                    <a href={`mailto:${SITE.enquiryEmails.quote}`} className="hover:text-bronze transition-colors">
                                        {SITE.enquiryEmails.quote}
                                    </a>
                                </p>
                                <p className="text-xs text-gray-600">
                                    <span className="text-navy font-bold inline-block w-32">Partner network</span>
                                    <a href={`mailto:${SITE.enquiryEmails.partner}`} className="hover:text-bronze transition-colors">
                                        {SITE.enquiryEmails.partner}
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Security note */}
                        <div className="w-full flex items-center gap-2 text-xs text-gray-500 mb-3 text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-bronze flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            <span>Your details are used only to respond to your inquiry with absolute discretion.</span>
                        </div>

                        <div className="w-full bg-white p-3.5 rounded-xl border border-gray-100 flex items-center gap-2.5 text-[10px] text-gray-500 font-mono tracking-wider text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#2E7D32] flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                            </svg>
                            <span>Licensed international tour operator.</span>
                        </div>
                    </div>

                    {/* Right Column: Bespoke Inquiry Form */}
                    <div className="lg:col-span-7 bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col text-left">
                        {/* Eyebrow */}
                        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-2 block">
                            BESPOKE INQUIRY
                        </span>

                        {/* Title */}
                        <h2 className="text-navy text-2xl md:text-3xl lg:text-[34px] font-serif font-normal mb-2">
                            Send Us a Message
                        </h2>

                        {/* Subtitle */}
                        <p className="text-steel text-xs md:text-sm mb-8 leading-relaxed">
                            Send us a message and our team will respond. Planning a trip or itinerary?
                            Use the{' '}
                            <Link to="/request-quote" className="text-navy underline hover:text-bronze font-semibold">
                                request-a-quote form
                            </Link>{' '}
                            instead — it captures all the details our specialists need.
                        </p>

                        <ContactForm />
                    </div>

                </div>
            </section>

            {/* Physical Presence / Visit Our Offices Section */}
            <section className="w-full bg-ivory py-20 md:py-28 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="w-full max-w-7xl flex flex-col items-center">
                    
                    {/* Eyebrow */}
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-4 block text-center">
                        PHYSICAL PRESENCE
                    </span>

                    {/* Section Title */}
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-[46px] font-serif font-normal text-center leading-[1.2] mb-4">
                        Visit Our Head Office
                    </h2>

                    {/* Subtitle */}
                    <p className="text-steel text-sm md:text-base text-center max-w-xl mb-12 md:mb-14 leading-relaxed">
                        Our registered head office — the B2B/wholesale operations hub serving travel agents and tour operators across Vietnam, Japan and Australia.
                    </p>

                    {/* Map Visual Container */}
                    <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl min-h-[440px] md:min-h-[520px] flex flex-col justify-between p-6 sm:p-8 md:p-10 border border-gray-200/60">
                        {/* Background Map Image */}
                        <img
                            src={mapImage}
                            alt="Asian Star Travel head office location"
                            className="absolute inset-0 w-full h-full object-cover z-0"
                            loading="lazy"
                            decoding="async"
                        />

                        {/* Tint Overlay */}
                        <div className="absolute inset-0 bg-navy/15 z-0"></div>

                        {/* Head Office Floating Card */}
                        <div className="relative z-10 grid w-full mt-10">
                            <div className="bg-cream/95 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-xl border border-white/60 flex flex-col justify-between text-left md:max-w-lg">
                                <div>
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-champagne flex items-center justify-center flex-shrink-0 text-bronze">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-sm md:text-base font-bold text-navy">
                                                    Head Office
                                                </h3>
                                                <span className="text-[10px] md:text-[11px] text-gray-500 block">
                                                    B2B / Wholesale Operations
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EDEBE4] text-bronze flex-shrink-0">
                                            BLR DESK
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 my-3 leading-relaxed">
                                        {SITE.registeredAddress}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-gray-200/60 mt-2">
                                    <span className="text-xs font-semibold text-navy flex items-center gap-1.5">
                                        ✦ Launch markets: Vietnam · Japan · Australia
                                    </span>
                                    <a
                                        href={`mailto:${SITE.enquiryEmails.contact}`}
                                        className="text-xs font-semibold text-navy hover:text-bronze transition-colors"
                                    >
                                        Email HQ
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
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-4 block text-center">
                        PEACE OF MIND GUARANTEE
                    </span>

                    {/* Section Title */}
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-[46px] font-serif font-normal text-center leading-[1.2] mb-3">
                        Your Journey, Our Local Expertise
                    </h2>

                    {/* Accent divider line */}
                    <div className="w-16 h-[2px] bg-gold mb-14 md:mb-16"></div>

                    {/* 4 Cards Grid */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
                        {EXPERTISE_GUARANTEES.map((item, index) => (
                            <div
                                key={index}
                                className="bg-cream rounded-2xl md:rounded-3xl p-7 md:p-8 flex flex-col justify-start text-left border border-stone shadow-sm hover:shadow-lg transition-all duration-300 group"
                            >
                                <span className="text-gold text-xl md:text-2xl font-serif font-bold mb-4 block">
                                    {item.number}
                                </span>
                                <h3 className="text-navy text-base md:text-lg font-bold mb-3 leading-snug">
                                    {item.title}
                                </h3>
                                <p className="text-steel text-xs md:text-sm leading-relaxed">
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
