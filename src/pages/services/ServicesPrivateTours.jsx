import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from '../../assets/services/Private-Transfer-Hero-services.webp';
import travelYourWayImg from '../../assets/services/travel-your-way.webp';
import chairsIcon from '../../assets/services/chairs.svg';
import passengerIcon from '../../assets/services/passanger.svg';
import refreshmentIcon from '../../assets/services/Refreshment.svg';
import suitcaseIcon from '../../assets/services/suitcase.svg';
import wifiIcon from '../../assets/services/wifi.svg';

gsap.registerPlugin(ScrollTrigger);

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white mb-4">
        <path d="M12 2C12.5 7.5 16.5 11.5 22 12C16.5 12.5 12.5 16.5 12 22C11.5 16.5 7.5 12.5 2 12C7.5 11.5 11.5 7.5 12 2Z" />
    </svg>
);

const ServicesPrivateTours = () => {
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
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative w-full h-[50vh] md:h-[65vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <img
                    src={heroImage}
                    alt="Private Transfers Hero"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Dark/Blue Overlay to improve text readability */}
                <div className="absolute inset-0 bg-[#081634]/30 z-0"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center px-6 -mt-10">
                    <StarIcon />

                    <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif tracking-widest mb-6">
                        Asian Star Travel
                    </h1>

                    {/* Orange/Gold Separator Line */}
                    <div className="w-48 md:w-64 h-[1px] bg-[#C5A869] mb-6 opacity-80"></div>

                    <p className="text-white text-sm md:text-base tracking-wider font-light drop-shadow-md">
                        Services / Private Transfers &amp; Chauffeur
                    </p>
                </div>
            </section>

            {/* Travel Your Way Section */}
            <section className="w-full bg-[#F3F2EE] py-20 px-6 md:px-12 lg:px-24 xl:px-40 flex justify-center">
                <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                    {/* Left side: Content */}
                    <div className="w-full md:w-1/2 flex flex-col items-start text-left max-w-xl">
                        <span className="text-gray-500 text-xs md:text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                            Travel, Your Way
                        </span>

                        <h2 className="text-[#2c3e50] text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-snug">
                            NOT JUST A TOUR. A <br className="hidden lg:block" />
                            JOURNEY DESIGNED <br className="hidden lg:block" />
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

                    {/* Right side: Image */}
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
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* The Fleet Section */}
            <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-24 xl:px-40 flex flex-col items-center">
                <div className="text-center mb-20">
                    <span className="text-gray-500 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                        Our Collection
                    </span>
                    <h2 className="text-[#2c3e50] text-4xl lg:text-5xl font-serif">
                        The Fleet
                    </h2>
                </div>

                {/* Vehicle 1 */}
                <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12 lg:gap-20 mb-24">
                    <div className="w-full md:w-1/2">
                        <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#c3cce0] via-[#e2d5e3] to-[#facfce] shadow-sm"></div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col items-start text-left max-w-md">
                        <h3 className="text-[#2c3e50] text-sm md:text-base font-serif font-bold tracking-[0.15em] uppercase mb-6">
                            Mercedes-Benz S-Class Or Similar
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-8">
                            The pinnacle of luxury sedans, offering peerless comfort for up to three passengers. Ideal for executive airport transfers and business travel.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center text-gray-700 text-xs md:text-sm">
                                <img src={passengerIcon} alt="Passenger" className="w-5 h-5 mr-4 opacity-70" /> 3 Passengers
                            </li>
                            <li className="flex items-center text-gray-700 text-xs md:text-sm">
                                <img src={suitcaseIcon} alt="Suitcase" className="w-5 h-5 mr-4 opacity-70" /> 2 Large Suitcases
                            </li>
                            <li className="flex items-center text-gray-700 text-xs md:text-sm">
                                <img src={wifiIcon} alt="Wifi" className="w-5 h-5 mr-4 opacity-70" /> Complimentary Wi-Fi
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Vehicle 2 (Reversed) */}
                <div className="w-full max-w-6xl flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20 mb-24">
                    <div className="w-full md:w-1/2">
                        <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#c3cce0] via-[#e2d5e3] to-[#facfce] shadow-sm"></div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col items-start text-left max-w-md mr-auto">
                        <h3 className="text-[#2c3e50] text-sm md:text-base font-serif font-bold tracking-[0.15em] uppercase mb-6">
                            Range Rover Vogue Or Similar
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-8">
                            Commanding presence with exceptional interior space. Perfect for small groups, families, or when additional luggage capacity is required.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center text-gray-700 text-xs md:text-sm">
                                <img src={passengerIcon} alt="Passenger" className="w-5 h-5 mr-4 opacity-70" /> 4 Passengers
                            </li>
                            <li className="flex items-center text-gray-700 text-xs md:text-sm">
                                <img src={suitcaseIcon} alt="Suitcase" className="w-5 h-5 mr-4 opacity-70" /> 4 Large Suitcases
                            </li>
                            <li className="flex items-center text-gray-700 text-xs md:text-sm">
                                <img src={refreshmentIcon} alt="Refreshments" className="w-5 h-5 mr-4 opacity-70" /> Refreshments
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Vehicle 3 */}
                <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    <div className="w-full md:w-1/2">
                        <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#c3cce0] via-[#e2d5e3] to-[#facfce] shadow-sm"></div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col items-start text-left max-w-md">
                        <h3 className="text-[#2c3e50] text-sm md:text-base font-serif font-bold tracking-[0.15em] uppercase mb-6">
                            Mercedes-Benz V-Class
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-8">
                            Spacious, versatile, and uncompromised in its luxury. The definitive choice for group travel, touring, and roadshows.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center text-gray-700 text-xs md:text-sm">
                                <img src={passengerIcon} alt="Passenger" className="w-5 h-5 mr-4 opacity-70" /> 6-7 Passengers
                            </li>
                            <li className="flex items-center text-gray-700 text-xs md:text-sm">
                                <img src={suitcaseIcon} alt="Suitcase" className="w-5 h-5 mr-4 opacity-70" /> 6 Large Suitcases
                            </li>
                            <li className="flex items-center text-gray-700 text-xs md:text-sm">
                                <img src={chairsIcon} alt="Chairs" className="w-5 h-5 mr-4 opacity-70" /> Leather Captain Chairs
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ServicesPrivateTours;
