import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from '../assets/aboutus/Aboutus-hero-image.webp';
import aboutSectionImg from '../assets/aboutus/aboutus-section.webp';
import ourStoryImg from '../assets/aboutus/our-story-image.webp';
import tailorMadeImg from '../assets/aboutus/Tailor-Made-Tours.webp';
import privateTransfersImg from '../assets/aboutus/Private-Transfers.webp';
import airportFastTrackImg from '../assets/aboutus/Airport-Fast-Track.webp';
import groundServicesImg from '../assets/aboutus/Ground-Services.webp';
import regionalReachImg from '../assets/aboutus/REGIONAL-REACH-section-image.webp';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';

gsap.registerPlugin(ScrollTrigger);

const CompassIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#B8924A]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.828 9.172-2.121 5.656L7.05 16.95l2.122-5.657 5.656-2.121Z" />
    </svg>
);

const SealCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#A27B38] flex-shrink-0 mt-0.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
);

const SERVICES = [
    {
        title: "FIT & Tailor-Made Tours",
        description: "Private itineraries designed around your clients' pace, interests and travel dates — never off-the-shelf.",
        image: tailorMadeImg,
        link: "/tours",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-navy">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.828 9.172-2.121 5.656L7.05 16.95l2.122-5.657 5.656-2.121Z" />
            </svg>
        )
    },
    {
        title: "Private Transfers",
        description: "Private cars with professional local drivers between every destination — comfortable and on time.",
        image: privateTransfersImg,
        link: "/request-quote",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-navy">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 0V8.25m0 6h17.25m0-6H2.25m17.25 0a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 8.25m15 0v6" />
            </svg>
        )
    },
    {
        title: "Airport Fast Track",
        description: "Expedited immigration and VIP assistance on arrival and departure — a seamless experience for your clients.",
        image: airportFastTrackImg,
        link: "/request-quote",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-navy">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.33a2.996 2.996 0 0 0-2.583-1.455H7.789a2.996 2.996 0 0 0-2.583 1.455.75.75 0 0 0 .666 1.045h6.634a.75.75 0 0 0 .666-1.045Z" />
            </svg>
        )
    },
    {
        title: "Ground Services",
        description: "End-to-end destination handling for agencies and tour operators — confirmed, dependable, local.",
        image: groundServicesImg,
        link: "/become-a-partner",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-navy">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918" />
            </svg>
        )
    }
];

const WHO_WE_SERVE = [
    {
        title: "Independent Travelers (FIT)",
        description: "Private, flexible itineraries for individuals, couples and families.",
        tag: "TAILOR-MADE",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-bronze">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
        )
    },
    {
        title: "Group Travel (GIT)",
        description: "Coordinated programs and reliable logistics for organized groups.",
        tag: "LOGISTICS & ESCORTS",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-bronze">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
        )
    },
    {
        title: "Incentive Groups",
        description: "Rewarding, well-run experiences for corporate and incentive travel.",
        tag: "CORPORATE PRECISION",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-bronze">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.003 0H9.497m5.003 0A2.25 2.25 0 0 0 16.75 12V4.5a.75.75 0 0 0-.75-.75h-8a.75.75 0 0 0-.75.75V12a2.25 2.25 0 0 0 2.25 2.25" />
            </svg>
        )
    },
    {
        title: "Travel Partners",
        description: "Dependable local ground handling for overseas agencies and tour operators.",
        tag: "B2B INBOUND DMC",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-bronze">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582" />
            </svg>
        )
    }
];

const Aboutus = () => {
    const introImgWrapperRef = useRef(null);
    const introImgRef = useRef(null);
    const storyImgWrapperRef = useRef(null);
    const storyImgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (introImgWrapperRef.current && introImgRef.current) {
                gsap.fromTo(
                    introImgWrapperRef.current,
                    { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
                    {
                        scrollTrigger: {
                            trigger: introImgWrapperRef.current,
                            start: "top 95%",
                            toggleActions: "play reverse play reverse",
                        },
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        duration: 2,
                        ease: "power3.inOut",
                    }
                );

                gsap.fromTo(
                    introImgRef.current,
                    { scale: 1.2 },
                    {
                        scrollTrigger: {
                            trigger: introImgWrapperRef.current,
                            start: "top 95%",
                            toggleActions: "play reverse play reverse",
                        },
                        scale: 1,
                        duration: 2,
                        ease: "power3.inOut",
                    }
                );
            }

            if (storyImgWrapperRef.current && storyImgRef.current) {
                gsap.fromTo(
                    storyImgWrapperRef.current,
                    { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
                    {
                        scrollTrigger: {
                            trigger: storyImgWrapperRef.current,
                            start: "top 95%",
                            toggleActions: "play reverse play reverse",
                        },
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        duration: 2,
                        ease: "power3.inOut",
                    }
                );

                gsap.fromTo(
                    storyImgRef.current,
                    { scale: 1.2 },
                    {
                        scrollTrigger: {
                            trigger: storyImgWrapperRef.current,
                            start: "top 95%",
                            toggleActions: "play reverse play reverse",
                        },
                        scale: 1,
                        duration: 2,
                        ease: "power3.inOut",
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full">
            <Seo {...PAGE_META['/about']} path="/about" image={heroImage} />

            <PageHero image={heroImage} alt="" title="About Us" eyebrow="About Us" uppercase />

            {/* About Us Main Intro Section */}
            <section className="w-full bg-ivory py-20 md:py-28 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column: Content */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="lg:col-span-6 flex flex-col items-start text-left"
                    >
                        
                        {/* Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE0] border border-[#E9DEC9] text-[#7A6237] text-[11px] font-semibold tracking-wider uppercase mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B8924A]"></span>
                            GLOBAL B2B DMC
                        </div>

                        {/* Title */}
                        <h2 className="text-navy text-4xl md:text-5xl lg:text-[54px] font-serif font-normal tracking-tight mb-6">
                            About Us
                        </h2>

                        {/* Description */}
                        <p className="text-steel text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                            Asian Star Travel is a global B2B DMC — the ground partner travel
                            agents trust across Vietnam, Japan and Australia.
                        </p>

                        {/* Buttons / CTA */}
                        <div className="flex items-center gap-6 mb-12 sm:mb-16">
                            <Link
                                to="/request-quote"
                                className="btn btn--navy btn--lg"
                            >
                                Request a Quote
                            </Link>
                            <a
                                href="#our-story"
                                className="inline-flex items-center gap-1.5 text-navy font-medium text-sm hover:text-gold transition-colors"
                            >
                                Read Our Story
                                <span className="text-base leading-none">↓</span>
                            </a>
                        </div>

                        {/* Stats / Metas */}
                        <div className="w-full grid grid-cols-3 gap-4 pt-6 border-t border-gray-200/80">
                            {/* Meta 1 */}
                            <div className="flex flex-col pr-2 border-r border-gray-200/80">
                                <span className="text-[10px] md:text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                                    HQ OPERATIONS
                                </span>
                                <span className="text-xs md:text-sm lg:text-base font-semibold text-navy mt-1">
                                    Bengaluru
                                </span>
                            </div>

                            {/* Meta 2 */}
                            <div className="flex flex-col px-2 border-r border-gray-200/80">
                                <span className="text-[10px] md:text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                                    SCOPE
                                </span>
                                <span className="text-xs md:text-sm lg:text-base font-semibold text-navy mt-1">
                                    Vietnam · Japan · Australia
                                </span>
                            </div>

                            {/* Meta 3 */}
                            <div className="flex flex-col pl-2">
                                <span className="text-[10px] md:text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                                    LICENSE
                                </span>
                                <span className="text-xs md:text-sm lg:text-base font-semibold text-navy mt-1">
                                    Licensed Tour Operator
                                </span>
                            </div>
                        </div>

                    </motion.div>

                    {/* Right Column: Image with Floating Card */}
                    <div className="lg:col-span-6 flex justify-center lg:justify-end">
                        <div 
                            ref={introImgWrapperRef}
                            className="relative w-full max-w-[560px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
                            style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
                        >
                            {/* Image */}
                            <img
                                ref={introImgRef}
                                src={aboutSectionImg}
                                alt="Asian Star Travel Vietnam Operations"
                                className="w-full h-auto object-cover aspect-[4/3] md:aspect-[16/11]"
                                loading="lazy"
                                decoding="async"
                            />

                            {/* Floating Card at Bottom */}
                            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-ivory/95 backdrop-blur-md rounded-xl md:rounded-2xl p-3.5 sm:p-4 shadow-lg border border-white/60 flex items-center justify-between gap-3 z-10">
                                <div className="flex items-center gap-3 min-w-0">
                                    {/* Icon Badge */}
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-champagne flex items-center justify-center flex-shrink-0">
                                        <CompassIcon />
                                    </div>
                                    {/* Text */}
                                    <div className="flex flex-col text-left truncate">
                                        <span className="text-[9px] sm:text-[10px] font-bold text-bronze tracking-wider uppercase">
                                            LOCAL GROUND MANAGEMENT
                                        </span>
                                        <span className="text-xs sm:text-sm md:text-base font-bold text-navy truncate">
                                            Seamless Vietnam Operations
                                        </span>
                                    </div>
                                </div>

                                {/* Right Badge */}
                                <span className="px-3 py-1 rounded-full bg-[#EDEBE4] text-[#475467] text-[11px] sm:text-xs font-medium border border-[#DFDDD4] flex-shrink-0">
                                    Vietnam
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Our Story Section */}
            <section id="our-story" className="w-full bg-[#FFFFFF] py-20 md:py-28 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column: Image with top-left floating badge */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-start">
                        <div 
                            ref={storyImgWrapperRef}
                            className="relative w-full max-w-[460px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl"
                            style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
                        >
                            <img
                                ref={storyImgRef}
                                src={ourStoryImg}
                                alt="Asian Star Travel Ground Hospitality"
                                className="w-full h-auto object-cover aspect-[4/5]"
                                loading="lazy"
                                decoding="async"
                            />

                            {/* Top Left Floating Badge */}
                            <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-md border border-white/60 flex flex-col text-left z-10">
                                <span className="text-[9px] sm:text-[10px] font-bold text-bronze tracking-widest uppercase">
                                    GROUND HOSPITALITY
                                </span>
                                <span className="text-xs sm:text-sm font-bold text-navy mt-0.5">
                                    End-to-end Local Coordination
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Story Text Content */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="lg:col-span-7 flex flex-col items-start text-left lg:pl-4"
                    >
                        {/* Eyebrow */}
                        <span className="text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-4">
                            OUR STORY
                        </span>

                        {/* Heading */}
                        <h2 className="text-navy text-3xl md:text-4xl lg:text-[44px] font-serif font-normal leading-[1.2] mb-6">
                            Crafting Private Journeys &amp; Reliable Ground Handling
                        </h2>

                        {/* Paragraph 1 */}
                        <p className="text-steel text-sm md:text-base leading-relaxed mb-5">
                            Asian Star Travel is a global B2B destination management company. We design and operate FIT, group, MICE, honeymoon and luxury experiences across Vietnam, Japan and Australia — handling every detail for our partner agencies, from the first enquiry to the final transfer.
                        </p>

                        {/* Paragraph 2 */}
                        <p className="text-steel text-sm md:text-base leading-relaxed mb-8">
                            We work with travel agencies, tour operators and OTAs who need a reliable DMC partner on the ground across the region.
                        </p>

                        {/* Bottom Quote Card */}
                        <div className="w-full bg-cream border border-stone rounded-2xl p-5 md:p-6 flex items-start gap-4 shadow-sm">
                            <SealCheckIcon />
                            <div className="flex flex-col text-left">
                                <p className="text-xs md:text-sm font-bold text-navy leading-snug mb-1">
                                    "Handling every detail locally, from the first enquiry to the final transfer."
                                </p>
                                <p className="text-[11px] md:text-xs text-gray-500">
                                    Direct dispatch from our DMC desk.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* Four Ways We Help You Experience Vietnam Section */}
            <section className="w-full bg-ivory py-20 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="w-full max-w-7xl flex flex-col items-center">
                    
                    {/* Eyebrow */}
                    <span className="text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-4 block text-center">
                        OUR SERVICES
                    </span>

                    {/* Section Title */}
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-[46px] font-serif font-normal text-center leading-[1.2] mb-4">
                        What Our DMC Handles for Trade Partners
                    </h2>

                    {/* Subtitle */}
                    <p className="text-steel text-sm md:text-base text-center max-w-xl mb-14 md:mb-16">
                        FIT and group programs, transfers, fast-track clearance and full ground handling — operated by our local team.
                    </p>

                    {/* Cards Grid */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
                        {SERVICES.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                                whileHover={{ y: -6 }}
                                className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100/80 group"
                            >
                                {/* Image with Corner Icon */}
                                <div className="relative w-full aspect-[4/3] overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md z-10">
                                        {service.icon}
                                    </div>
                                </div>

                                {/* Content Body */}
                                <div className="p-6 flex flex-col flex-grow justify-between text-left">
                                    <div>
                                        <h3 className="text-navy text-lg md:text-xl font-serif font-semibold mb-2.5 group-hover:text-bronze transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-steel text-xs md:text-sm leading-relaxed mb-6">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Link */}
                                    <Link
                                        to={service.link}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-bronze hover:text-navy group-hover:gap-2.5 transition-all mt-auto cursor-pointer"
                                    >
                                        Explore
                                        <span className="text-sm leading-none">→</span>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Regional Reach / Destinations We Cover Banner Section (Full Width) */}
            <section className="relative w-full overflow-hidden min-h-[360px] md:min-h-[440px] lg:min-h-[480px] flex items-center">
                {/* Background Image */}
                <img
                    src={regionalReachImg}
                    alt="Destinations We Cover Across Vietnam"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    loading="lazy"
                    decoding="async"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-transparent z-0"></div>

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-16 md:py-24 flex flex-col items-start text-left">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="max-w-xl"
                    >
                        {/* Subhead / Tag */}
                        <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-gold uppercase mb-4 block">
                            REGIONAL REACH
                        </span>

                        {/* Heading */}
                        <h2 className="text-white text-3xl md:text-4xl lg:text-[46px] font-serif font-normal leading-[1.15] mb-4">
                            Destinations We Cover
                        </h2>

                        {/* Description */}
                        <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                            From the northern highlands to the southern coast, we craft private journeys across Vietnam's regions.
                        </p>

                        {/* Button */}
                        <Link
                            to="/destination"
                            className="btn btn--gold btn--md inline-flex items-center gap-2"
                        >
                            Explore Destinations
                            <span className="text-base leading-none group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Who We Serve / Tailored to How You Travel Section */}
            <section className="w-full bg-ivory py-20 md:py-28 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="w-full max-w-7xl flex flex-col items-center">
                    
                    {/* Eyebrow */}
                    <span className="text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-4 block text-center">
                        WHO WE SERVE
                    </span>

                    {/* Section Title */}
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-[46px] font-serif font-normal text-center leading-[1.2] mb-4">
                        Tailored to How You Travel
                    </h2>

                    {/* Subtitle */}
                    <p className="text-steel text-sm md:text-base text-center max-w-xl mb-14 md:mb-16">
                        From solo travelers to large group programs, we tailor our support to how you travel.
                    </p>

                    {/* Cards Grid */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
                        {WHO_WE_SERVE.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                                whileHover={{ y: -6 }}
                                className="bg-white rounded-2xl md:rounded-3xl p-7 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left border border-gray-100/80 group"
                            >
                                <div>
                                    {/* Icon Badge */}
                                    <div className="w-10 h-10 rounded-full bg-champagne flex items-center justify-center mb-6">
                                        {item.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-navy text-lg md:text-xl font-serif font-semibold mb-3 group-hover:text-bronze transition-colors">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-steel text-xs md:text-sm leading-relaxed mb-8">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Tag Footer */}
                                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] text-bronze uppercase mt-auto">
                                    {item.tag}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Aboutus;
