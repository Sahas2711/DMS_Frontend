import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { PAGE_META, SITE } from '../config/site';
import { itemListSchema } from '../config/structuredData';
import { fetchTours, resolveMediaUrl } from '../services/api/cms';
import toursHeroImg from '../assets/home/Tourspage-hero section.webp';
import vipBgImg from '../assets/home/vip-benifits-bg.webp';
import extraBenefitsImg from '../assets/home/extraordinary-benifits.webp';

// VIP Benefit Icons
import roomUpgradeIcon from '../assets/home/room-upgrade.png';
import cashCreditIcon from '../assets/home/cash_credit.png';
import complimentaryIcon from '../assets/home/complimentary.png';
import loyaltyPointsIcon from '../assets/home/loyalty-points.png';
import earlyCheckInIcon from '../assets/home/check_in-early.png';
import lateCheckOutIcon from '../assets/home/check-in-late.png';

const VIP_BENEFITS = [
    {
        icon: roomUpgradeIcon,
        title: "Room upgrade",
        subtitle: "to a better category"
    },
    {
        icon: cashCreditIcon,
        title: "$100 hotel credit",
        subtitle: "for your stay"
    },
    {
        icon: complimentaryIcon,
        title: "Complimentary",
        subtitle: "breakfast for two every day"
    },
    {
        icon: loyaltyPointsIcon,
        title: "Earn Loyalty Points",
        subtitle: "Hyatt, Bonvoy, Hilton, Shangri-La"
    },
    {
        icon: earlyCheckInIcon,
        title: "Early Check-In",
        subtitle: "to start your stay early"
    },
    {
        icon: lateCheckOutIcon,
        title: "Late Check-Out",
        subtitle: "to extend your stay"
    }
];

const SPECIAL_OFFERS = [
    { tag: "Stay 4 nights, pay for 3", title: "Emirates Palace Abu Dhabi", location: "Abu Dhabi, United Arab Emirates" },
    { tag: "Stay 3 nights, pay for 2", title: "One&Only Aesthesis", location: "Glyfada, Greece" },
    { tag: "Stay 4 nights, pay for 3", title: "One&Only One Za'abeel", location: "Dubai, United Arab Emirates" },
    { tag: "Stay 4 nights, pay for 3", title: "Conrad Singapore Marina Bay", location: "Singapore, Singapore" },
    { tag: "Stay 4 nights, pay for 3", title: "Rosewood Hotel Georgia", location: "Vancouver, Canada" },
    { tag: "Stay 3 nights, pay for 2", title: "Corinthia Hotel London", location: "London, United Kingdom" },
    { tag: "Stay 3 nights, pay for 2", title: "Fairmont Copley Plaza, Boston", location: "Boston, United States" },
    { tag: "Stay 4 nights, pay for 3", title: "Shangri-La The Shard, London", location: "London, United Kingdom" },
    { tag: "Stay 3 nights, pay for 2", title: "The Fifth Avenue Hotel", location: "New York, United States" },
    { tag: "Stay 3 nights, pay for 2", title: "Sofitel Legend The Grand Amsterdam", location: "Amsterdam, Netherlands" },
    { tag: "Stay 4 nights, pay for 3", title: "Conservatorium Amsterdam", location: "Amsterdam, Netherlands" }
];

const POPULAR_HOTELS = [
    { title: "Shangri-La The Shard, London", location: "London, United Kingdom" },
    { title: "Conrad Bangkok", location: "Bangkok, Thailand" },
    { title: "InterContinental Cascais - Estoril", location: "Estoril, Portugal" },
    { title: "Hyatt Regency Malta", location: "St. Julians, Malta" },
    { title: "Thompson Madrid by Hyatt", location: "Madrid, Spain" },
    { title: "Hotel das Cataratas, A Belmond Hotel, Iguassu F...", location: "Foz do Iguaçu, Brazil" }
];

const TagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 mr-1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h.008v.008H6V7.5z" />
    </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 mr-1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

const Tours = () => {
    const [popularHotels, setPopularHotels] = useState(POPULAR_HOTELS);

    // Live CMS journeys — falls back to the static hotel list offline.
    useEffect(() => {
        let cancelled = false;

        fetchTours({ pageSize: 100 })
            .then((data) => {
                if (cancelled) return;
                const items = (data?.items || []).filter((t) => t.hero_media?.url);
                if (!items.length) return;
                setPopularHotels(
                    items.map((t) => ({
                        title: t.title,
                        location: t.destination ? `${t.destination.name}, ${t.destination.country}` : t.destination?.country || 'Journeys',
                        image: resolveMediaUrl(t.hero_media.url),
                    }))
                );
            })
            .catch(() => {});

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="w-full flex flex-col">
            <Seo {...PAGE_META['/tours']} path="/tours" />
            <JsonLd data={[itemListSchema(popularHotels)]} />

            {/* Hero Section */}
            <section className="relative w-full h-[60vh] md:h-[75vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <img
                    src={toursHeroImg}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    fetchPriority="high"
                    decoding="async"
                />

                {/* Dark/Blue Overlay to match screenshot tint and improve text readability */}
                <div className="absolute inset-0 bg-navy/30 z-0" aria-hidden="true"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center px-6 -mt-16 md:-mt-24">
                    <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif tracking-widest mb-4">
                        {SITE.wordmark}
                    </h1>

                    <h2 className="text-white text-xl md:text-3xl font-serif tracking-wide mb-6">
                        Tours
                    </h2>

                    {/* Gold Separator Line */}
                    <div className="w-64 md:w-96 h-[1px] bg-gold mb-6 opacity-80"></div>

                    <p className="text-gray-100 text-xs md:text-sm tracking-wider font-light">
                        Hotels we love with extraordinary benefits
                    </p>
                </div>
            </section>

            {/* VIP Benefits Section */}
            <section className="w-full bg-[#F8F6F0] py-20 px-6 md:px-12 lg:px-24 xl:px-40 flex justify-center">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-7xl relative rounded-[2rem] overflow-hidden shadow-xl"
                >
                    {/* Background Image */}
                    <img
                        src={vipBgImg}
                        alt="VIP Benefits Background"
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        loading="lazy"
                        decoding="async"
                    />

                    {/* Subtle Overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-black/20 z-0"></div>

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-14 lg:p-20 flex flex-col items-start text-left">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-white text-3xl md:text-4xl lg:text-5xl font-serif mb-6 drop-shadow-sm"
                        >
                            VIP benefits for Premium Members*
                        </motion.h2>

                        <motion.div 
                            initial={{ scaleX: 0, originX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-16 h-[2px] bg-gold mb-6"
                        />

                        <motion.p 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="text-white text-sm md:text-base lg:text-lg mb-12 opacity-95 drop-shadow-sm max-w-2xl"
                        >
                            Our exclusive {SITE.name} VIP rate offers you extraordinary benefits at no extra cost
                        </motion.p>

                        {/* Benefit Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 w-full mb-12">
                            {VIP_BENEFITS.map((benefit, index) => (
                                <motion.div 
                                    key={index} 
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.15 + index * 0.08, ease: "easeOut" }}
                                    whileHover={{ y: -6, scale: 1.02 }}
                                    className="bg-[#F2DFCB] rounded-2xl p-5 flex flex-col items-center text-center shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
                                >
                                    <motion.img 
                                        src={benefit.icon} 
                                        alt={benefit.title} 
                                        className="w-12 h-12 object-contain mb-5 transition-transform duration-300 group-hover:scale-110" 
                                    />
                                    <h3 className="text-[#3A5B74] font-medium text-xs md:text-sm mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600 text-[10px] md:text-xs leading-snug">{benefit.subtitle}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-white text-[10px] md:text-xs max-w-4xl opacity-90"
                        >
                            *VIP benefits are available to {SITE.name} Premium Members. Benefits vary by hotel and may be subject to availability
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* Special Offers Section */}
            <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-24 xl:px-40 flex flex-col items-center">
                <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 flex flex-col items-center"
                >
                    <h2 className="text-[#2c3e50] text-4xl md:text-5xl font-serif mb-4">
                        Special Offers
                    </h2>
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-16 h-[1px] bg-gold"
                    />
                </motion.div>

                <div className="w-full max-w-7xl">
                    {/* Top 2 Large Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {SPECIAL_OFFERS.slice(0, 2).map((offer, index) => (
                            <motion.div 
                                key={index} 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                                whileHover={{ y: -6 }}
                                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col cursor-pointer group"
                            >
                                {/* Gray Image Placeholder */}
                                <div className="w-full h-64 md:h-80 bg-[#d3d3d3] overflow-hidden">
                                    <div className="w-full h-full bg-[#d3d3d3] transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="text-[#3A5B74] text-[10px] md:text-xs font-bold mb-2 flex items-center">
                                        <TagIcon /> {offer.tag}
                                    </div>
                                    <h3 className="text-gray-900 font-serif font-medium text-lg md:text-xl mb-3 group-hover:text-[#00605F] transition-colors">{offer.title}</h3>
                                    <div className="text-gray-500 text-xs flex items-center mt-auto">
                                        <LocationIcon /> {offer.location}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Grid of 3 Cards per row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {SPECIAL_OFFERS.slice(2).map((offer, index) => (
                            <motion.div 
                                key={index} 
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: "easeOut" }}
                                whileHover={{ y: -6 }}
                                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col cursor-pointer group"
                            >
                                {/* Gray Image Placeholder */}
                                <div className="w-full h-48 md:h-56 bg-[#d3d3d3] overflow-hidden">
                                    <div className="w-full h-full bg-[#d3d3d3] transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="text-[#3A5B74] text-[10px] md:text-xs font-bold mb-2 flex items-center">
                                        <TagIcon /> {offer.tag}
                                    </div>
                                    <h3 className="text-gray-900 font-serif font-medium text-base md:text-lg mb-3 group-hover:text-[#00605F] transition-colors">{offer.title}</h3>
                                    <div className="text-gray-500 text-[10px] md:text-xs flex items-center mt-auto">
                                        <LocationIcon /> {offer.location}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* See All Button */}
                    <div className="flex justify-center w-full">
                        <motion.button 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            className="bg-navy hover:bg-[#11264f] transition-colors text-white text-xs font-bold tracking-widest uppercase py-3.5 px-8 rounded-full shadow-md cursor-pointer"
                        >
                            SEE ALL SPECIAL OFFERS
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Extraordinary Benefits CTA Section */}
            <section className="w-full bg-[#F8F6F0] py-20 px-6 md:px-12 lg:px-24 xl:px-40 flex justify-center">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-7xl relative rounded-[2rem] overflow-hidden shadow-lg h-[400px] flex items-center"
                >
                    {/* Background Image */}
                    <img
                        src={extraBenefitsImg}
                        alt="Extraordinary Benefits"
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        loading="lazy"
                        decoding="async"
                    />

                    {/* Gradient overlay for text readability (darker on left) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-0"></div>

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-14 lg:p-20 flex flex-col items-start text-left max-w-2xl">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-white text-3xl md:text-5xl font-serif mb-6 drop-shadow-sm leading-tight"
                        >
                            Sign up for extraordinary benefits
                        </motion.h2>

                        {/* Coral Separator Line */}
                        <motion.div 
                            initial={{ scaleX: 0, originX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-24 h-[2px] bg-[#FF7F50] mb-6"
                        />

                        <motion.p 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="text-white text-sm md:text-base lg:text-lg mb-10 opacity-95 drop-shadow-sm"
                        >
                            Enjoy the world's best hotels with our extraordinary benefits
                        </motion.p>

                        <motion.button 
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            className="bg-[#FF7F50] hover:bg-[#e66c40] transition-colors text-white text-xs font-bold tracking-widest uppercase py-3.5 px-8 rounded-full shadow-md cursor-pointer"
                        >
                            CREATE YOUR ACCOUNT
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* Popular Hotels Section */}
            <section className="w-full bg-[#F8F6F0] py-20 px-6 md:px-12 lg:px-24 xl:px-40 flex flex-col items-center">
                <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 flex flex-col items-center"
                >
                    <h2 className="text-[#2c3e50] text-4xl md:text-5xl font-serif mb-4">
                        Popular Hotels
                    </h2>
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-16 h-[1px] bg-gold"
                    />
                </motion.div>

                <div className="w-full max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {popularHotels.map((hotel, index) => (
                            <motion.div 
                                key={index} 
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: "easeOut" }}
                                whileHover={{ y: -6 }}
                                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer group"
                            >
                                {/* Image or Gray Placeholder */}
                                <div className="w-full h-56 bg-[#d3d3d3] overflow-hidden">
                                    {hotel.image ? (
                                        <img src={hotel.image} alt={hotel.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                                    ) : (
                                        <div className="w-full h-full bg-[#d3d3d3] transition-transform duration-500 group-hover:scale-105" />
                                    )}
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-gray-800 font-sans text-sm md:text-base mb-3 group-hover:text-[#00605F] transition-colors">{hotel.title}</h3>
                                    <div className="text-gray-500 text-[10px] md:text-xs flex items-center mt-auto">
                                        <LocationIcon /> {hotel.location}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Tours;
