import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';
import { EXPERIENCE_CATEGORIES, LAUNCH_COUNTRIES } from '../config/enquiry';
import heroImage from '../assets/home/hero-image-home.webp';

import tailorMadeIcon from '../assets/home/Tailor-Made-Tours.svg';
import privateTransfersIcon from '../assets/home/private-transfers.svg';
import airportFastTrackIcon from '../assets/home/airport-fast-track.svg';
import corporateIncentiveIcon from '../assets/home/corporate-incentive-travel.svg';
import groundServicesIcon from '../assets/home/ground-services.svg';
import planTripImg from '../assets/home/plan-your-trip.webp';

const CORE_SERVICES = [
    {
        id: 'tailor-made',
        num: '01',
        title: 'Tailor-Made Itineraries',
        description: 'Private, flexible programmes built around your clients\u2019 pace, interests and dates \u2014 never off-the-shelf.',
        icon: tailorMadeIcon,
        link: '/experiences',
    },
    {
        id: 'private-transfers',
        num: '02',
        title: 'Private Transfers & Logistics',
        description: 'Professional local drivers, vetted vehicles and punctual ground transport between every destination.',
        icon: privateTransfersIcon,
        link: '/request-quote',
    },
    {
        id: 'fast-track',
        num: '03',
        title: 'Airport Fast Track',
        description: 'Expedited immigration clearance and VIP assistance on arrival and departure at major gateways.',
        icon: airportFastTrackIcon,
        link: '/request-quote',
    },
    {
        id: 'mice',
        num: '04',
        title: 'MICE & Group Programmes',
        description: 'Full-service support for conferences, incentive trips and group logistics with venues, transfers and creative team experiences.',
        icon: corporateIncentiveIcon,
        link: '/experiences',
    },
    {
        id: 'ground-services',
        num: '05',
        title: 'DMC Ground Handling',
        description: 'Licensed local operations \u2014 guides, permits, hotel bookings and on-trip assistance across Vietnam, Japan and Australia.',
        icon: groundServicesIcon,
        link: '/request-quote',
    },
];

const WHY_PARTNER = [
    'In-house destination specialists across Vietnam, Japan and Australia',
    'Trade-priced net rates you can mark up confidently',
    'Single DMC across three launch destinations',
    'Dedicated account support that answers in hours, not days',
    'FIT, Groups, MICE, Honeymoon & Luxury under one roof',
];

const TRADE_PROCESS = [
    {
        step: '01',
        title: 'Send your brief',
        description: 'Use the request-a-quote form or email your requirements directly. Include dates, group size, budget tier and any special requests.',
    },
    {
        step: '02',
        title: 'Receive a proposal',
        description: 'A destination specialist reviews your brief and sends a tailored itinerary with hotels, transport, experiences and trade pricing \u2014 usually within one business day.',
    },
    {
        step: '03',
        title: 'Refine and confirm',
        description: 'Work with your specialist to adjust the programme until it is ready to sell. We handle all ground logistics once the client confirms.',
    },
];

const ServiceCard = ({ service, index }) => (
    <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6 }}
        className="bg-white rounded-2xl p-8 sm:p-9 shadow-[0_4px_24px_rgba(8,22,52,0.03)] hover:shadow-[0_16px_36px_rgba(8,22,52,0.08)] border border-[#EDE8E0] hover:border-gold/40 transition-all duration-300 flex flex-col items-start h-full text-left group"
    >
        <img
            src={service.icon}
            alt={service.title}
            className="w-14 h-14 mb-6 object-contain group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
            decoding="async"
        />
        <h3 className="text-navy text-xl font-serif font-bold mb-3">{service.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-grow mb-6">{service.description}</p>
        <Link
            to={service.link}
            className="text-gold hover:text-[#B39758] font-semibold text-sm transition-colors flex items-center gap-1.5 mt-auto group/link"
        >
            <span>Learn more</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
        </Link>
    </motion.div>
);

const DestinationCard = ({ country, index }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'end start'],
    });
    const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="relative rounded-[20px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-[340px] sm:h-[360px] md:h-[375px] w-full group cursor-pointer border border-[#EDE8E0]/40 bg-neutral-900"
        >
            <Link to="/destination" className="w-full h-full block relative overflow-hidden">
                <motion.div
                    style={{ y: imgY }}
                    className="absolute -top-[10%] left-0 w-full h-[120%] pointer-events-none"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-[#2c4368]" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90 pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-6 text-left z-20 w-full transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white text-xl font-serif font-medium drop-shadow-md">
                            {country.name}
                        </h3>
                        <span className="text-gold text-2xl mr-2">{country.flag}</span>
                    </div>
                    <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed drop-shadow-sm">
                        {country.description}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

const Home = () => {
    return (
        <div className="w-full flex flex-col">
            <Seo {...PAGE_META['/']} path="/" />

            {/* Hero Section */}
            <section className="relative w-full h-[85vh] sm:h-[90vh] lg:min-h-screen overflow-hidden flex items-center justify-center bg-navy">
                <img
                    src={heroImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-center z-0 block select-none"
                    fetchPriority="high"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/35 via-black/10 to-navy/25 z-0 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center px-6 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center justify-center"
                    >
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-gold uppercase mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                            B2B DMC &middot; Vietnam &middot; Japan &middot; Australia
                        </span>
                        <h1 className="text-white font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] font-normal">
                            <span>Your Trusted</span>
                            <span className="text-gold text-xs sm:text-sm md:text-base">&diams;</span>
                            <span>DMC Partner</span>
                        </h1>
                        <p className="text-white/80 text-sm sm:text-base md:text-lg mt-6 max-w-xl leading-relaxed drop-shadow font-light">
                            Ground handling, tailor-made itineraries and dedicated trade support across three launch destinations.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row gap-3 mt-8 pointer-events-auto"
                    >
                        <Link
                            to="/request-quote"
                            className="bg-gold hover:bg-[#b59758] text-navy font-bold text-xs tracking-wider uppercase py-3.5 px-8 rounded-full transition-colors shadow-sm"
                        >
                            Request a Quote
                        </Link>
                        <Link
                            to="/become-a-partner"
                            className="border border-white/50 hover:border-white hover:bg-white hover:text-navy text-white font-bold text-xs tracking-wider uppercase py-3.5 px-8 rounded-full transition-all"
                        >
                            Become a Partner
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Core Services Section */}
            <section className="w-full bg-[#F8F6F0] py-20 md:py-28 px-6 md:px-12 lg:px-24 xl:px-40 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl text-center mb-16"
                >
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-4 block">
                        WHAT WE DELIVER
                    </span>
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 tracking-tight">
                        Full-Service Ground Operations
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                        From the first itinerary draft to the final transfer, our local teams handle every detail across Vietnam, Japan and Australia.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                    {CORE_SERVICES.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </section>

            {/* Experience Categories */}
            <section className="w-full bg-white py-20 md:py-28 px-6 md:px-12 lg:px-24 xl:px-40 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl text-center mb-14"
                >
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-4 block">
                        FIVE WAYS TO TRAVEL
                    </span>
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-[44px] font-serif font-normal leading-[1.2] mb-4">
                        One DMC, five experience categories
                    </h2>
                    <p className="text-steel text-sm md:text-base max-w-2xl leading-relaxed">
                        We design journeys around the way your clients want to travel. Every experience can be combined, extended or rebuilt from scratch.
                    </p>
                </motion.div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 text-left">
                    {EXPERIENCE_CATEGORIES.map((category, index) => (
                        <motion.div
                            key={category.value}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-cream rounded-2xl md:rounded-3xl p-7 md:p-8 flex flex-col border border-stone shadow-sm hover:shadow-lg transition-shadow duration-300"
                        >
                            <span className="text-gold text-2xl font-serif font-bold mb-3 block">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-navy text-xl md:text-2xl font-serif font-bold mb-1">{category.title}</h3>
                            <p className="text-bronze text-[11px] font-bold tracking-[0.12em] uppercase mb-3">{category.tagline}</p>
                            <p className="text-steel text-xs md:text-sm leading-relaxed mb-5 flex-grow">{category.description}</p>
                            <ul className="space-y-1.5">
                                {category.points.map((point) => (
                                    <li key={point} className="text-xs text-gray-600 flex items-start gap-2">
                                        <span className="text-gold mt-0.5" aria-hidden="true">&check;</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Launch Destinations */}
            <section className="w-full bg-navy relative overflow-hidden py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-24 xl:px-40 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl text-center mb-14"
                >
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-gold uppercase mb-4 block">
                        LAUNCH DESTINATIONS
                    </span>
                    <h2 className="text-white text-3xl md:text-4xl lg:text-[44px] font-serif font-normal leading-[1.2] mb-4">
                        Where we take your clients
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed">
                        Local teams on the ground in each destination, so the experience is as seamless in Hanoi as it is in Tokyo or Sydney.
                    </p>
                </motion.div>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
                    {LAUNCH_COUNTRIES.map((country, index) => (
                        <DestinationCard key={country.slug} country={country} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12"
                >
                    <Link
                        to="/destination"
                        className="text-gold font-bold text-xs tracking-widest uppercase inline-flex items-center hover:text-[#fbbc42] transition-colors py-1"
                    >
                        <span>EXPLORE ALL DESTINATIONS</span>
                        <span className="ml-2">&rarr;</span>
                    </Link>
                </motion.div>
            </section>

            {/* Why Partner Section */}
            <section className="w-full bg-[#F8F6F0] py-24 md:py-32 px-6 md:px-12 lg:px-24 xl:px-40 flex justify-center overflow-hidden">
                <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-16 lg:gap-24">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full md:w-1/2 relative mt-8 md:mt-0 group"
                    >
                        <div className="overflow-hidden rounded-[2rem] shadow-xl">
                            <img
                                src={planTripImg}
                                alt="Plan your trip"
                                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35, duration: 0.6, type: 'spring', stiffness: 200 }}
                            className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 bg-navy p-5 md:p-6 rounded-2xl shadow-2xl min-w-[200px] border border-white/10 hover:scale-105 transition-transform duration-300"
                        >
                            <h4 className="text-gold font-serif text-base md:text-lg font-semibold mb-1">
                                Global B2B DMC
                            </h4>
                            <p className="text-gray-300 text-xs md:text-sm">
                                Vietnam · Japan · Australia
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full md:w-1/2 flex flex-col items-start mt-12 md:mt-0"
                    >
                        <h2 className="text-navy text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-10 leading-tight">
                            Why travel agents<br/>partner with us
                        </h2>

                        <div className="flex flex-col space-y-5 mb-10 w-full">
                            {WHY_PARTNER.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex items-start group"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#fdf5e6] group-hover:bg-gold/20 flex items-center justify-center mr-4 flex-shrink-0 transition-colors duration-200 shadow-sm mt-0.5">
                                        <svg className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-[#2a3b5c] font-semibold text-sm md:text-base group-hover:text-navy transition-colors">
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                                <Link
                                    to="/request-quote"
                                    className="bg-navy hover:bg-[#0a1f4a] text-white font-semibold py-3.5 px-8 rounded-full text-sm tracking-wide shadow-lg hover:shadow-xl hover:shadow-navy/25 transition-all duration-300 inline-flex items-center gap-2 group"
                                >
                                    <span>Request a Quote</span>
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 font-bold">&rarr;</span>
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                                <Link
                                    to="/become-a-partner"
                                    className="border border-gray-400 hover:border-navy hover:bg-navy hover:text-white text-gray-700 font-semibold py-3.5 px-8 rounded-full text-sm tracking-wide transition-all duration-300"
                                >
                                    Become a Partner
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works - Trade Process */}
            <section className="w-full bg-white py-20 md:py-28 px-6 md:px-12 lg:px-24 xl:px-40 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl text-center mb-16"
                >
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-4 block">
                        HOW IT WORKS
                    </span>
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-[44px] font-serif font-normal leading-[1.2] mb-4">
                        From enquiry to confirmed programme
                    </h2>
                    <p className="text-steel text-sm md:text-base max-w-2xl leading-relaxed">
                        A simple three-step process designed for travel trade professionals.
                    </p>
                </motion.div>

                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {TRADE_PROCESS.map((item, index) => (
                        <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                            className="text-left"
                        >
                            <span className="text-gold text-3xl font-serif font-bold mb-4 block">{item.step}</span>
                            <h3 className="text-navy text-lg md:text-xl font-serif font-bold mb-3">{item.title}</h3>
                            <p className="text-steel text-sm leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full relative py-16 md:py-20 lg:py-24 flex flex-col items-center text-center px-6 overflow-hidden">
                <motion.img
                    src={heroImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/35 to-navy/65 z-0" />

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 flex flex-col items-center max-w-3xl"
                >
                    <span className="text-[#EAB308] text-xs font-bold tracking-[0.2em] uppercase mb-2.5 inline-block drop-shadow">
                        B2B DMC &middot; Vietnam &middot; Japan &middot; Australia
                    </span>
                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-serif font-medium mb-4 leading-tight drop-shadow-md">
                        Ready to add these<br/>destinations to your portfolio?
                    </h2>
                    <p className="text-gray-200 text-xs sm:text-sm md:text-base mb-6 max-w-xl leading-relaxed drop-shadow">
                        Send your requirements and our trade desk will come back with a tailored proposal within one business day.
                    </p>

                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="mb-2">
                        <Link
                            to="/request-quote"
                            className="bg-[#EAB308] hover:bg-[#FACC15] text-navy font-bold py-3.5 px-9 rounded-full text-sm tracking-wide shadow-[0_6px_25px_rgba(234,179,8,0.35)] hover:shadow-[0_10px_35px_rgba(234,179,8,0.45)] transition-all duration-300 inline-block"
                        >
                            Request a Quote
                        </Link>
                    </motion.div>

                    <p className="text-gray-300 text-[11px] sm:text-xs mb-6 font-light tracking-wide">
                        Typical response within one business day. No payment required at this stage.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            to="/travel-trade"
                            className="border border-white/60 hover:border-white hover:bg-white hover:text-navy transition-all duration-300 text-white text-xs font-medium py-2 px-5 rounded-full backdrop-blur-xs"
                        >
                            Travel Trade Overview
                        </Link>
                        <Link
                            to="/become-a-partner"
                            className="border border-white/60 hover:border-white hover:bg-white hover:text-navy transition-all duration-300 text-white text-xs font-medium py-2 px-5 rounded-full backdrop-blur-xs"
                        >
                            Become a Partner
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
