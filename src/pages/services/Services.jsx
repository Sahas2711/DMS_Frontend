import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import servicesHeroImg from '../../assets/services/servicespage-heroimg.webp';
import tailorMadeImg from '../../assets/services/bespoke-travel-experience.webp';
import privateTransfersImg from '../../assets/services/Private-Transfer-Hero-services.webp';
import airportFastTrackImg from '../../assets/services/AirportTrack-hero.webp';
import groundServicesImg from '../../assets/services/Ground-Services-Hero.webp';

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white mb-4">
        <path d="M12 2C12.5 7.5 16.5 11.5 22 12C16.5 12.5 12.5 16.5 12 22C11.5 16.5 7.5 12.5 2 12C7.5 11.5 11.5 7.5 12 2Z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#C5A869] flex-shrink-0 mt-0.5">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
);

const SERVICES_LIST = [
    {
        id: 'tailor-made-tours',
        badge: 'BESPOKE EXPERIENCES',
        title: 'Tailor-Made Private Tours',
        tagline: 'Crafted around your pace, luxury standards, and personal curiosities.',
        description: 'From the terraced emerald highlands of Sapa to private luxury wooden junk cruises across Halong Bay, our travel specialists design every single day uniquely for you.',
        image: tailorMadeImg,
        href: '/services/tailor-made-tours',
        priceHint: 'Custom Quote',
        features: [
            '100% personalized itineraries crafted by resident destination specialists',
            'Private certified multilingual guides and hand-picked boutique stays',
            'Exclusive behind-the-scenes cultural and culinary insider access',
            'Dedicated 24/7 on-trip concierge and route flexibility'
        ]
    },
    {
        id: 'private-transfers',
        badge: 'EXECUTIVE FLEET',
        title: 'Private Transfers & Chauffeur Services',
        tagline: 'Punctual, luxurious, and seamless city-to-city transportation.',
        description: 'Travel in ultimate comfort with our pristine fleet of Mercedes-Benz sedans, Range Rovers, and VIP executive minivans driven by professional, vetted chauffeurs.',
        image: privateTransfersImg,
        href: '/services/private-tours',
        priceHint: 'From $45 / transfer',
        features: [
            'Premium fleet: Mercedes S-Class, Range Rover Vogue & VIP V-Class',
            'Professional English-speaking chauffeurs in immaculate business attire',
            'Complimentary onboard high-speed Wi-Fi, chilled water, and refreshments',
            'Flight delay monitoring with automatic pickup time adjustments'
        ]
    },
    {
        id: 'airport-fast-track',
        badge: 'AIRSIDE PRIORITY',
        title: 'Airport Fast Track & VIP Concierge',
        tagline: 'Bypass long immigration lines with dedicated VIP airport handling.',
        description: 'Arrive and depart stress-free. Our personal concierge greets you directly at the aerobridge or aircraft gate, smoothly escorting you through diplomatic clearance lanes.',
        image: airportFastTrackImg,
        href: '/services/airport-fast-track',
        priceHint: 'From $33.90 / guest',
        features: [
            'Personal host greeting directly at the aircraft door or aerobridge',
            'Priority fast-track lane clearance for immigration & customs',
            'Porter luggage collection assistance at the baggage carousel',
            'Optional VIP lounge pass and curbside chauffeur handover'
        ]
    },
    {
        id: 'ground-services',
        badge: 'DMC LOGISTICS & MICE',
        title: 'Ground Services & DMC Management',
        tagline: 'End-to-end destination management for private groups, FIT, and MICE.',
        description: 'Complete operational ground support across Vietnam, India, and Southeast Asia. We coordinate local permits, high-profile corporate incentive trips, and complex group movements.',
        image: groundServicesImg,
        href: '/services/ground-services',
        priceHint: 'Tailored DMC Programs',
        features: [
            'Licensed international tour operator & full local DMC liability coverage',
            'Specialized MICE, corporate incentives, and group conference management',
            'Tarmac logistics, charter flights, and luxury yacht charters',
            '24/7 dedicated operations control center and crisis response'
        ]
    }
];

const ADVANTAGES = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#C5A869]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
        ),
        title: 'Official Licensed DMC',
        desc: 'Fully accredited with Vietnam National Administration of Tourism license No. 01-2873/2025.'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#C5A869]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        ),
        title: '24/7 Live Monitoring',
        desc: 'Real-time flight tracking and 24-hour operations desk ensuring zero delay or missed connections.'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#C5A869]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 0V8.25m0 6h17.25m0-6H2.25m17.25 0a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 8.25m15 0v6" />
            </svg>
        ),
        title: 'Executive Fleet',
        desc: 'Owned & managed high-spec luxury sedans, SUVs, and VIP vans with seasoned professional drivers.'
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#C5A869]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
        ),
        title: 'Dedicated Concierge',
        desc: 'One-on-one personal travel managers dedicated to your trip from inquiry to departure.'
    }
];

const Services = () => {
    return (
        <div className="w-full bg-[#FFFFFF]">
            {/* Hero Section */}
            <section className="relative w-full h-[50vh] md:h-[65vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
                <img
                    src={servicesHeroImg}
                    alt="Services Hero"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-[#081634]/30 z-0"></div>

                <div className="relative z-10 flex flex-col items-center text-center px-6 -mt-10">
                    <StarIcon />

                    <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif tracking-widest mb-6">
                        ASMALLWORLD
                    </h1>

                    {/* Gold separator line */}
                    <div className="w-24 md:w-32 h-[1px] bg-[#C5A869] mb-6"></div>

                    <p className="text-white text-sm md:text-base font-light tracking-wide uppercase">
                        Services
                    </p>
                </div>
            </section>

            {/* Intro Section */}
            <section className="w-full bg-[#FBF9F4] py-20 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center border-b border-gray-200/50">
                <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE0] border border-[#E9DEC9] text-[#7A6237] text-[11px] font-semibold tracking-wider uppercase mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8924A]"></span>
                        PREMIER DESTINATION MANAGEMENT
                    </div>
                    <h2 className="text-[#081634] text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
                        Excellence at Every Touchpoint
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed">
                        From expedited VIP airport arrivals and executive chauffeur fleets to completely bespoke private itineraries, Asian Star Travel provides unmatched precision, comfort, and local authenticity for discerning travelers and international agency partners.
                    </p>
                </motion.div>
            </section>

            {/* Main Services Pillars List */}
            <section className="w-full bg-white py-20 md:py-28 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="w-full max-w-7xl flex flex-col space-y-16 md:space-y-24">
                    {SERVICES_LIST.map((service, index) => {
                        const isEven = index % 2 === 1;
                        return (
                            <motion.div
                                key={service.id}
                                id={service.id}
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.7, ease: 'easeOut' }}
                                className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16 bg-[#FAFAF8] rounded-3xl p-6 sm:p-8 lg:p-12 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300`}
                            >
                                {/* Service Image */}
                                <div className="w-full lg:w-1/2 aspect-[16/11] rounded-2xl overflow-hidden shadow-md relative group">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-[#081634]/90 backdrop-blur-sm text-[#C5A869] text-[10px] font-bold tracking-widest px-3.5 py-1.5 rounded-full uppercase border border-[#C5A869]/30">
                                        {service.badge}
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-[#081634] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                                        {service.priceHint}
                                    </div>
                                </div>

                                {/* Service Content */}
                                <div className="w-full lg:w-1/2 flex flex-col text-left">
                                    <h3 className="text-[#081634] text-2xl sm:text-3xl font-serif font-bold mb-3 leading-snug">
                                        {service.title}
                                    </h3>
                                    <p className="text-[#C5A869] text-xs sm:text-sm font-medium mb-4 italic">
                                        "{service.tagline}"
                                    </p>
                                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    {/* Features Checklist */}
                                    <div className="space-y-2.5 mb-8">
                                        {service.features.map((feat, i) => (
                                            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                                                <CheckIcon />
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action CTA Buttons */}
                                    <div className="flex flex-wrap items-center gap-3.5 pt-4 border-t border-gray-200">
                                        <Link
                                            to={service.href}
                                            className="bg-[#081634] hover:bg-[#152a52] text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all shadow-sm uppercase tracking-wider text-center flex items-center gap-2 cursor-pointer"
                                        >
                                            Explore Details &rarr;
                                        </Link>
                                        <Link
                                            to="/booking"
                                            className="bg-[#C5A869] hover:bg-[#b59758] text-[#081634] text-xs font-bold px-6 py-3.5 rounded-xl transition-all shadow-sm uppercase tracking-wider text-center cursor-pointer"
                                        >
                                            Book Service
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Why Choose Asian Star Travel (DMC Pillars) */}
            <section className="w-full bg-[#081634] text-white py-20 md:py-28 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="w-full max-w-7xl">
                    <motion.div 
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <span className="text-[11px] font-bold tracking-[0.25em] text-[#C5A869] uppercase mb-2 block">
                            THE ASIAN STAR ADVANTAGE
                        </span>
                        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
                            Why Global Partners &amp; Travelers Trust Us
                        </h2>
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-20 h-[1px] bg-[#C5A869] mx-auto mb-6 opacity-80"
                        />
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                            With our headquarters in Hanoi and branch office in Ho Chi Minh City, we operate with rigorous operational oversight, licensed safety assurances, and exceptional attention to detail.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {ADVANTAGES.map((adv, index) => (
                            <motion.div 
                                key={index} 
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                                whileHover={{ y: -6 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col text-left hover:bg-white/10 transition-colors cursor-pointer"
                            >
                                <div className="p-3 bg-white/10 rounded-xl w-fit mb-5">
                                    {adv.icon}
                                </div>
                                <h4 className="text-white text-lg font-serif font-semibold mb-2">{adv.title}</h4>
                                <p className="text-gray-400 text-xs leading-relaxed">{adv.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Consultation CTA */}
            <section className="w-full bg-[#F8F6F0] py-20 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="max-w-5xl w-full bg-gradient-to-r from-[#0E1C37] to-[#1B2A47] rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden shadow-xl flex flex-col items-center"
                >
                    <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[#C5A869]/10 blur-3xl pointer-events-none"></div>
                    <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-[#C5A869]/10 blur-3xl pointer-events-none"></div>

                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#C5A869] uppercase mb-3 block">
                        READY TO PLAN YOUR JOURNEY?
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 max-w-2xl">
                        Let us coordinate your seamless arrival, departure, or tailor-made tour.
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm max-w-xl mb-8 leading-relaxed">
                        Speak with our local destination specialists today. We provide immediate consultations, custom proposals, and instant booking confirmations.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                        <Link
                            to="/booking"
                            className="w-full sm:w-auto bg-[#C5A869] hover:bg-[#b59758] text-[#081634] text-xs font-bold px-8 py-4 rounded-xl transition-all shadow-md uppercase tracking-wider cursor-pointer text-center"
                        >
                            Book Online Now
                        </Link>
                        <Link
                            to="/contact"
                            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-8 py-4 rounded-xl border border-white/20 transition-all uppercase tracking-wider cursor-pointer text-center"
                        >
                            Inquire with Concierge
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Services;
