import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from '../../assets/services/Ground-Services-Hero.webp';
import coordinatedSupportImg from '../../assets/services/Coordinated-terminal-support.webp';
import tellUsWhereImg from '../../assets/services/tell-uwhere-flying.webp';
import popWatermark1 from '../../assets/home/watermark1-Popular-Destinations.png';
import popWatermark2 from '../../assets/home/watermark2-Popular-Destinations.png';
import travelOnYourTermsImg from '../../assets/services/Travel-on-your-terms.webp';
import PageHero from '../../components/PageHero';
import Seo from '../../components/Seo';
import { PAGE_META } from '../../config/site';

gsap.registerPlugin(ScrollTrigger);

const GroundServices = () => {
    const terminalImgWrapperRef = useRef(null);
    const terminalImgRef = useRef(null);
    const termsImgWrapperRef = useRef(null);
    const termsImgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                terminalImgWrapperRef.current,
                {
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                },
                {
                    scrollTrigger: {
                        trigger: terminalImgWrapperRef.current,
                        start: "top 95%",
                        toggleActions: "play reverse play reverse",
                    },
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 2,
                    ease: "power3.inOut",
                }
            );

            gsap.fromTo(
                terminalImgRef.current,
                { scale: 1.2 },
                {
                    scrollTrigger: {
                        trigger: terminalImgWrapperRef.current,
                        start: "top 95%",
                        toggleActions: "play reverse play reverse",
                    },
                    scale: 1,
                    duration: 2,
                    ease: "power3.inOut",
                }
            );

            gsap.fromTo(
                termsImgWrapperRef.current,
                {
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                },
                {
                    scrollTrigger: {
                        trigger: termsImgWrapperRef.current,
                        start: "top 95%",
                        toggleActions: "play reverse play reverse",
                    },
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 2,
                    ease: "power3.inOut",
                }
            );

            gsap.fromTo(
                termsImgRef.current,
                { scale: 1.2 },
                {
                    scrollTrigger: {
                        trigger: termsImgWrapperRef.current,
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
            <Seo {...PAGE_META['/services/ground-services']} path="/services/ground-services" />

            <PageHero
                image={heroImage}
                alt=""
                eyebrow="Services / Ground Services"
                uppercase
            />

            {/* Coordinated Terminal Support Section */}
            <section className="w-full bg-[#f6f6f4] py-20 px-6 md:px-12 lg:px-24 flex justify-center">
                <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                        <span className="text-[#334155] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">
                            Coordinated terminal support
                        </span>

                        <h2 className="text-ink text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.1] mb-6">
                            Every detail on the <br className="hidden md:block" /> ground, quietly handled.
                        </h2>

                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
                            From curbside welcome to lounge departure, our local airport teams coordinate the people, baggage, and timing that make travel feel effortless.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
                            <button className="bg-ink hover:bg-[#1d2939] text-white font-medium py-3 px-8 rounded-md transition-colors shadow-sm text-sm cursor-pointer">
                                Request ground support
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-ink font-medium py-3 px-8 rounded-md transition-colors shadow-sm border border-gray-200 text-sm cursor-pointer">
                                Explore fast track
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-10 md:gap-16 w-full max-w-lg">
                            <div className="flex flex-col">
                                <span className="text-ink text-2xl font-bold mb-1">24/7</span>
                                <span className="text-gray-400 text-[10px] uppercase tracking-wider">Live flight monitoring</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-ink text-2xl font-bold mb-1">80+</span>
                                <span className="text-gray-400 text-[10px] uppercase tracking-wider">International airports</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-ink text-2xl font-bold mb-1">1:1</span>
                                <span className="text-gray-400 text-[10px] uppercase tracking-wider">Dedicated coordinator</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="w-full lg:w-1/2">
                        <div 
                            ref={terminalImgWrapperRef}
                            className="w-full overflow-hidden rounded-2xl shadow-lg"
                            style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
                        >
                            <img
                                ref={terminalImgRef}
                                src={coordinatedSupportImg}
                                alt="Coordinated terminal support"
                                className="w-full h-auto object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Tell Us Where You Are Flying Section */}
            <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 flex justify-center items-center overflow-hidden min-h-[500px]">
                {/* Background Image */}
                <img
                    src={tellUsWhereImg}
                    alt="Tell us where you are flying"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    loading="lazy"
                    decoding="async"
                />

                {/* Overlay card */}
                <div className="relative z-10 w-full max-w-7xl bg-[#e9ebe6]/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-10 lg:gap-16 items-center border border-white/20">

                    {/* Left Side text */}
                    <div className="w-full md:w-5/12 flex flex-col text-left">
                        {/* Yellow rounded square */}
                        <div className="w-12 h-12 bg-[#fbbc42] rounded-[10px] mb-6 shadow-sm"></div>
                        <h2 className="text-ink text-3xl font-bold mb-4 leading-tight">
                            Tell us where you are flying.
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                            Send your flight details and a concierge will confirm a tailored ground service plan.
                        </p>
                    </div>

                    {/* Right Side Form */}
                    <div className="w-full md:w-7/12 flex flex-col">
                        <form className="flex flex-col gap-4 w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Flight Number */}
                                <div className="flex flex-col text-left">
                                    <label className="text-ink text-xs font-bold mb-2" htmlFor="groundservices-flightNumber">Flight number</label>
                                    <input id="groundservices-flightNumber" name="flightNumber"
                                        type="text"
                                        placeholder="e.g. SQ 322"
                                        className="w-full px-4 py-3 rounded-md border-none focus:ring-2 focus:ring-ink text-sm text-gray-700 shadow-sm"
                                    />
                                </div>
                                {/* Travel Date */}
                                <div className="flex flex-col text-left">
                                    <label className="text-ink text-xs font-bold mb-2" htmlFor="groundservices-travelDate">Travel date</label>
                                    <input id="groundservices-travelDate" name="travelDate"
                                        type="text"
                                        placeholder="DD / MM / YYYY"
                                        className="w-full px-4 py-3 rounded-md border-none focus:ring-2 focus:ring-ink text-sm text-gray-700 shadow-sm"
                                    />
                                </div>
                                {/* Airport */}
                                <div className="flex flex-col text-left">
                                    <label className="text-ink text-xs font-bold mb-2" htmlFor="groundservices-airport">Airport</label>
                                    <input id="groundservices-airport" name="airport"
                                        type="text"
                                        placeholder="Arrival or departure airport"
                                        className="w-full px-4 py-3 rounded-md border-none focus:ring-2 focus:ring-ink text-sm text-gray-700 shadow-sm"
                                    />
                                </div>
                                {/* Travellers */}
                                <div className="flex flex-col text-left">
                                    <label className="text-ink text-xs font-bold mb-2" htmlFor="groundservices-travellers">Travellers</label>
                                    <div className="relative">
                                        <select id="groundservices-travellers" name="travellers" defaultValue="" className="w-full px-4 py-3 rounded-md border-none focus:ring-2 focus:ring-ink text-sm text-gray-700 appearance-none bg-white shadow-sm">
                                            <option value="" disabled className="hidden"></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4+">4+</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="button"
                                className="w-full mt-2 bg-[#081324] hover:bg-[#121f33] text-white font-medium text-sm py-3.5 rounded-md transition-colors shadow-md"
                            >
                                Check ground service availability
                            </button>
                        </form>
                    </div>

                </div>
            </section>

            {/* Your Airport Team Section */}
            <section className="w-full bg-navy relative overflow-hidden py-24 px-6 md:px-12 lg:px-24 flex justify-center">
                {/* Watermarks */}
                <img src={popWatermark1} alt="" className="absolute top-0 left-0 w-48 md:w-auto md:h-full md:max-w-none opacity-30 md:opacity-100 pointer-events-none z-0" loading="lazy" decoding="async" />
                <img src={popWatermark2} alt="" className="absolute top-0 right-0 w-32 md:w-auto opacity-30 md:opacity-100 pointer-events-none z-0" loading="lazy" decoding="async" />
                
                {/* Content */}
                <div className="relative z-10 w-full max-w-7xl flex flex-col">
                    {/* Header text */}
                    <div className="w-full max-w-2xl mb-12 text-left">
                        <p className="text-white text-sm font-medium mb-2">
                            Your airport team
                        </p>
                        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            A seamless handoff at<br className="hidden md:block" /> every airport touchpoint.
                        </h2>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                            Select the support that fits your itinerary. Your coordinator confirms every service before your travel day.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
                        {/* Card 1 */}
                        <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col">
                            <div className="w-10 h-10 bg-[#e8f1fc] rounded-lg mb-6"></div>
                            <h3 className="text-ink text-base font-bold mb-2">Meet & greet</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                A named host welcomes you at the terminal, kerb, or aircraft bridge.
                            </p>
                        </div>
                        
                        {/* Card 2 */}
                        <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col">
                            <div className="w-10 h-10 bg-[#e8f1fc] rounded-lg mb-6"></div>
                            <h3 className="text-ink text-base font-bold mb-2">Baggage handling</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Porter coordination and baggage assistance from check-in to collection.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col">
                            <div className="w-10 h-10 bg-[#e8f1fc] rounded-lg mb-6"></div>
                            <h3 className="text-ink text-base font-bold mb-2">Lounge coordination</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Confirmed lounge access and an escorted route to your departure gate.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col">
                            <div className="w-10 h-10 bg-[#e8f1fc] rounded-lg mb-6"></div>
                            <h3 className="text-ink text-base font-bold mb-2">Airside transfers</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Where available, discreet transfers that protect every minute of your connection.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Travel On Your Terms Section */}
            <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-24 flex justify-center">
                <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Image */}
                    <div className="w-full lg:w-1/2">
                        <div 
                            ref={termsImgWrapperRef}
                            className="w-full overflow-hidden rounded-2xl shadow-sm"
                            style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
                        >
                            <img 
                                ref={termsImgRef}
                                src={travelOnYourTermsImg} 
                                alt="Travel on your terms" 
                                className="w-full h-auto object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="w-full lg:w-1/2 flex flex-col text-left">
                        <span className="text-[#0284c7] text-sm font-bold mb-3">
                            Travel on your terms
                        </span>
                        
                        <h2 className="text-ink text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                            Built around your<br className="hidden lg:block" /> itinerary, not a template.
                        </h2>
                        
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10">
                            Whether you are travelling with family, coordinating an executive delegation, or protecting a short connection, we align the service plan to your flight and airport.
                        </p>
                        
                        {/* List Items */}
                        <div className="flex flex-col gap-8">
                            {/* Item 1 */}
                            <div className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-[#e8f1fc] text-[#0284c7] flex items-center justify-center font-bold text-sm shrink-0">
                                    1
                                </div>
                                <div className="flex flex-col mt-0.5">
                                    <h4 className="text-ink font-bold text-base mb-1">Share the flight details</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">Arrival, departure, passengers, baggage, and special requests.</p>
                                </div>
                            </div>
                            
                            {/* Item 2 */}
                            <div className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-[#e8f1fc] text-[#0284c7] flex items-center justify-center font-bold text-sm shrink-0">
                                    2
                                </div>
                                <div className="flex flex-col mt-0.5">
                                    <h4 className="text-ink font-bold text-base mb-1">Receive a tailored service plan</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">We confirm what is available at your airport and coordinate the timing.</p>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-[#e8f1fc] text-[#0284c7] flex items-center justify-center font-bold text-sm shrink-0">
                                    3
                                </div>
                                <div className="flex flex-col mt-0.5">
                                    <h4 className="text-ink font-bold text-base mb-1">Meet your concierge on the day</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">Your host tracks the flight and stays with you through the agreed journey.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Coverage Section */}
            <section className="w-full bg-[#F3F2EE] py-24 px-6 md:px-12 lg:px-24 flex justify-center">
                <div className="w-full max-w-7xl flex flex-col">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
                        <div className="flex flex-col text-left max-w-2xl">
                            <span className="text-gray-500 text-sm font-medium mb-3">
                                Global coverage
                            </span>
                            <h2 className="text-ink text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                Support where your journey takes you.
                            </h2>
                        </div>
                        <div className="max-w-xs text-left">
                            <p className="text-gray-500 text-sm leading-relaxed md:pb-2">
                                Services vary by airport. We will always confirm the exact support available before booking.
                            </p>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
                        {/* Card 1 */}
                        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#0284c7] mb-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                            <h3 className="text-ink text-base font-bold mb-1">Southeast Asia</h3>
                            <p className="text-gray-500 text-xs">Singapore • Bangkok • Ho Chi Minh City</p>
                        </div>
                        
                        {/* Card 2 */}
                        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#0284c7] mb-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                            <h3 className="text-ink text-base font-bold mb-1">Middle East</h3>
                            <p className="text-gray-500 text-xs">Dubai • Doha • Abu Dhabi</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#0284c7] mb-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                            <h3 className="text-ink text-base font-bold mb-1">Europe</h3>
                            <p className="text-gray-500 text-xs">London • Paris • Frankfurt</p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#0284c7] mb-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                            <h3 className="text-ink text-base font-bold mb-1">North America</h3>
                            <p className="text-gray-500 text-xs">New York • Los Angeles • Toronto</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GroundServices;
