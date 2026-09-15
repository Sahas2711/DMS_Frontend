import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import servicesHeroImg from '../../assets/services/servicespage-heroimg.webp';
import travelYourWayImg from '../../assets/services/travel-your-way.webp';
import beautifulWeekendImg from '../../assets/services/beautiful-weekend.webp';
import bespokeTravelImg from '../../assets/services/bespoke-travel-experience.webp';
import PageHero from '../../components/PageHero';
import Seo from '../../components/Seo';
import { PAGE_META } from '../../config/site';

gsap.registerPlugin(ScrollTrigger);
window.__hasScrollTrigger = true; // tells App to refresh triggers on route change

const Services = () => {
    const storyImgWrapperRef = useRef(null);
    const storyImgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                storyImgWrapperRef.current,
                {
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                },
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
        });

        return () => ctx.revert();
    }, []);
    return (
        <div className="w-full flex flex-col">
            <Seo {...PAGE_META['/services/tailor-made-tours']} path="/services/tailor-made-tours" />

            <PageHero
                image={servicesHeroImg}
                alt=""
                eyebrow="Services / Tailor-Made Tours"
                rule="wide"
            />

            {/* Travel Your Way Section */}
            <section className="w-full bg-[#F8F6F0] py-20 px-6 md:px-12 lg:px-24 xl:px-40 flex justify-center">
                <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    {/* Left side: Image */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                        <div 
                            ref={storyImgWrapperRef}
                            className="w-full max-w-[500px] overflow-hidden shadow-sm"
                            style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
                        >
                            <img 
                                ref={storyImgRef}
                                src={travelYourWayImg} 
                                alt="Travel Your Way" 
                                className="w-full h-auto object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>
                    
                    {/* Right side: Content */}
                    <div className="w-full md:w-1/2 flex flex-col items-start text-left max-w-xl">
                        <span className="text-gray-500 text-xs md:text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                            Travel, Your Way
                        </span>
                        
                        <h2 className="text-[#2c3e50] text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-snug">
                            NOT JUST A TOUR. A <br className="hidden lg:block"/>
                            JOURNEY DESIGNED <br className="hidden lg:block"/>
                            FOR YOU.
                        </h2>
                        
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                            We believe travel should be as unique as you are. Forget rigid 
                            itineraries and crowded buses. We meticulously design each 
                            day around your personal rhythm, allowing for spontaneous 
                            discoveries and authentic connections.
                        </p>
                        
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
                            From the moment you arrive until your journey home, every detail is 
                            considered, every experience vetted, and every transition seamless.
                        </p>
                        
                        <a href="#" className="text-gray-900 font-bold text-xs tracking-wide flex items-center hover:text-gray-600 transition-colors border-b-[1.5px] border-gray-900 pb-1">
                            Discover More <span className="ml-1">→</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* The Creative Process Section */}
            <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-24 xl:px-40 flex flex-col items-center">
                <h2 className="text-[#2c3e50] text-3xl md:text-4xl lg:text-5xl font-serif mb-16 tracking-wide uppercase">
                    The Creative Process
                </h2>
                
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="bg-[#FCFBF8] border border-[#f0eee4] p-10 lg:p-14 flex flex-col items-center text-center shadow-sm">
                        <span className="text-5xl font-serif text-[#E8D399] mb-6">01</span>
                        <h3 className="text-[#2c3e50] text-base lg:text-lg font-serif tracking-widest uppercase mb-4">
                            Tell Us Your Dream
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                            We start with a conversation to understand your passions, your 
                            pace, and what makes a trip truly unforgettable for you.
                        </p>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="bg-[#FCFBF8] border border-[#f0eee4] p-10 lg:p-14 flex flex-col items-center text-center shadow-sm">
                        <span className="text-5xl font-serif text-[#E8D399] mb-6">02</span>
                        <h3 className="text-[#2c3e50] text-base lg:text-lg font-serif tracking-widest uppercase mb-4">
                            We Craft Your<br/>Journey
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                            Our experts design a bespoke itinerary, suggesting hidden gems, 
                            exclusive access, and carefully selected accommodations.
                        </p>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="bg-[#FCFBF8] border border-[#f0eee4] p-10 lg:p-14 flex flex-col items-center text-center shadow-sm">
                        <span className="text-5xl font-serif text-[#E8D399] mb-6">03</span>
                        <h3 className="text-[#2c3e50] text-base lg:text-lg font-serif tracking-widest uppercase mb-4">
                            Travel Your Way
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                            Embark on your journey with 24/7 support, knowing every detail has 
                            been arranged. Your only job is to be present.
                        </p>
                    </div>
                </div>
            </section>

            {/* Every Detail, Your Choice Section */}
            <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-24 xl:px-40 flex flex-col items-center">
                <div className="text-center mb-12 flex flex-col items-center">
                    <h2 className="text-[#2c3e50] text-3xl md:text-4xl lg:text-5xl font-serif mb-4 uppercase">
                        Every Detail, Your Choice.
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base">
                        Build the foundation of your experience.
                    </p>
                </div>
                
                <div className="w-full max-w-6xl relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
                    {/* Background Image */}
                    <img 
                        src={beautifulWeekendImg} 
                        alt="Beautiful Weekend" 
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        loading="lazy"
                        decoding="async"
                    />
                    
                    {/* Form Box */}
                    <div className="relative z-10 bg-[#f4f4f4]/95 p-8 md:p-12 w-[90%] max-w-md flex flex-col shadow-xl">
                        {/* Destination */}
                        <div className="mb-6">
                            <label className="block text-[10px] md:text-xs font-bold text-gray-500 tracking-wider mb-2 uppercase" htmlFor="servicestailormadetours-destination">
                                Destination
                            </label>
                            <input id="servicestailormadetours-destination" name="destination" 
                                type="text" 
                                placeholder="Where to?" 
                                className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-700 focus:outline-none focus:border-gray-500 text-sm md:text-base placeholder-gray-400"
                            />
                        </div>
                        
                        {/* Dates */}
                        <div className="mb-6">
                            <label className="block text-[10px] md:text-xs font-bold text-gray-500 tracking-wider mb-2 uppercase" htmlFor="servicestailormadetours-dates">
                                Dates
                            </label>
                            <input id="servicestailormadetours-dates" name="dates" 
                                type="text" 
                                placeholder="When?" 
                                className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-700 focus:outline-none focus:border-gray-500 text-sm md:text-base placeholder-gray-400"
                            />
                        </div>
                        
                        {/* Accommodation Style */}
                        <div className="mb-10 relative">
                            <label className="block text-[10px] md:text-xs font-bold text-gray-500 tracking-wider mb-2 uppercase" htmlFor="servicestailormadetours-accommodationStyle">
                                Accommodation Style
                            </label>
                            <select id="servicestailormadetours-accommodationStyle" name="accommodationStyle" className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-700 focus:outline-none focus:border-gray-500 appearance-none text-sm md:text-base">
                                <option>Boutique Hotel</option>
                                <option>Luxury Resort</option>
                                <option>Private Villa</option>
                            </select>
                            {/* Custom arrow for select */}
                            <div className="absolute right-0 top-9 pointer-events-none text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </div>
                        
                        <button className="w-full bg-black text-white text-[10px] md:text-xs font-bold tracking-widest uppercase py-4 hover:bg-gray-800 transition-colors">
                            START CUSTOMIZING
                        </button>
                    </div>
                </div>
            </section>

            {/* Bespoke Travel Experiences Section */}
            <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <img 
                    src={bespokeTravelImg} 
                    alt="Bespoke Travel Experiences" 
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    loading="lazy"
                    decoding="async"
                />
                
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/40 z-0"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center px-6 mt-8">
                    <span className="text-[#E8D399] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4">
                        Bespoke Travel Experiences
                    </span>
                    
                    <h2 className="text-white text-4xl md:text-5xl lg:text-7xl font-serif tracking-wide mb-6 drop-shadow-md">
                        TAILOR-MADE TOURS
                    </h2>
                    
                    <h3 className="text-white text-xl md:text-3xl font-serif tracking-wide mb-4 drop-shadow-sm">
                        Your Journey. Your Way.
                    </h3>
                    
                    <p className="text-gray-100 text-sm md:text-base tracking-wide font-light max-w-2xl mb-10 drop-shadow-sm">
                        Personalized journeys crafted around your interests, pace, style and dreams.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                        <button className="bg-[#E8D399] text-gray-900 text-xs font-bold tracking-widest uppercase py-3.5 px-8 hover:bg-[#d9c48b] transition-colors shadow-lg">
                            PLAN MY JOURNEY
                        </button>
                        <button className="bg-transparent border border-white text-white text-xs font-bold tracking-widest uppercase py-3.5 px-8 hover:bg-white hover:text-black transition-colors shadow-lg">
                            EXPLORE DESTINATIONS
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
