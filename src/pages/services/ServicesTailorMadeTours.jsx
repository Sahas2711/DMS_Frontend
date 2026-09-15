import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import servicesHeroImg from '../../assets/services/servicespage-heroimg.webp';
import travelYourWayImg from '../../assets/services/travel-your-way.webp';
import beautifulWeekendImg from '../../assets/services/beautiful-weekend.webp';
import bespokeTravelImg from '../../assets/services/bespoke-travel-experience.webp';
import PageHero from '../../components/PageHero';
import Seo from '../../components/Seo';
import { Rise } from '../../components/editorial';
import { PAGE_META } from '../../config/site';

const EASE = [0.16, 1, 0.3, 1];

const Services = () => {
    const reduce = useReducedMotion();

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
            <section className="w-full bg-[var(--color-eggshell)] py-20 sm:py-28 lg:py-36">
                <div className="page-container">
                    <div className="w-full flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        {/* Left side: Image */}
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                            <motion.div
                                initial={reduce ? {} : { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                                whileInView={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: EASE }}
                                className="w-full max-w-[500px] overflow-hidden"
                            >
                                <motion.img
                                    initial={reduce ? {} : { scale: 1.2 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: EASE }}
                                    src={travelYourWayImg}
                                    alt="Travel Your Way"
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </motion.div>
                        </div>

                        {/* Right side: Content */}
                        <div className="w-full md:w-1/2 flex flex-col items-start text-left max-w-xl">
                            <Rise>
                                <span className="eyebrow mb-4">
                                    Travel, Your Way
                                </span>
                            </Rise>

                            <Rise delay={0.1}>
                                <h2 className="text-[var(--color-ink)] text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-snug">
                                    NOT JUST A TOUR. A <br className="hidden lg:block" />
                                    JOURNEY DESIGNED <br className="hidden lg:block" />
                                    FOR YOU.
                                </h2>
                            </Rise>

                            <Rise delay={0.2}>
                                <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed mb-6">
                                    We believe travel should be as unique as you are. Forget rigid
                                    itineraries and crowded buses. We meticulously design each
                                    day around your personal rhythm, allowing for spontaneous
                                    discoveries and authentic connections.
                                </p>
                            </Rise>

                            <Rise delay={0.3}>
                                <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed mb-8">
                                    From the moment you arrive until your journey home, every detail is
                                    considered, every experience vetted, and every transition seamless.
                                </p>
                            </Rise>

                            <Rise delay={0.4}>
                                <Link to="/services" className="link-premium">
                                    Discover More <span className="link-arrow">&rarr;</span>
                                </Link>
                            </Rise>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Creative Process Section */}
            <section className="w-full bg-white py-20 sm:py-28 lg:py-36">
                <div className="page-container flex flex-col items-center">
                    <Rise>
                        <h2 className="text-[var(--color-ink)] text-3xl md:text-4xl lg:text-5xl font-serif mb-16 tracking-wide uppercase">
                            The Creative Process
                        </h2>
                    </Rise>

                    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <Rise delay={0.1}>
                            <div className="bg-[var(--color-cream)] border border-[var(--color-border-subtle)] p-10 lg:p-14 flex flex-col items-center text-center shadow-sm">
                                <span className="text-5xl font-serif text-[var(--color-gold)] mb-6">01</span>
                                <h3 className="text-[var(--color-ink)] text-base lg:text-lg font-serif tracking-widest uppercase mb-4">
                                    Tell Us Your Dream
                                </h3>
                                <p className="text-[var(--color-text-muted)] text-xs md:text-sm leading-relaxed">
                                    We start with a conversation to understand your passions, your
                                    pace, and what makes a trip truly unforgettable for you.
                                </p>
                            </div>
                        </Rise>

                        {/* Step 2 */}
                        <Rise delay={0.2}>
                            <div className="bg-[var(--color-cream)] border border-[var(--color-border-subtle)] p-10 lg:p-14 flex flex-col items-center text-center shadow-sm">
                                <span className="text-5xl font-serif text-[var(--color-gold)] mb-6">02</span>
                                <h3 className="text-[var(--color-ink)] text-base lg:text-lg font-serif tracking-widest uppercase mb-4">
                                    We Craft Your<br />Journey
                                </h3>
                                <p className="text-[var(--color-text-muted)] text-xs md:text-sm leading-relaxed">
                                    Our experts design a bespoke itinerary, suggesting hidden gems,
                                    exclusive access, and carefully selected accommodations.
                                </p>
                            </div>
                        </Rise>

                        {/* Step 3 */}
                        <Rise delay={0.3}>
                            <div className="bg-[var(--color-cream)] border border-[var(--color-border-subtle)] p-10 lg:p-14 flex flex-col items-center text-center shadow-sm">
                                <span className="text-5xl font-serif text-[var(--color-gold)] mb-6">03</span>
                                <h3 className="text-[var(--color-ink)] text-base lg:text-lg font-serif tracking-widest uppercase mb-4">
                                    Travel Your Way
                                </h3>
                                <p className="text-[var(--color-text-muted)] text-xs md:text-sm leading-relaxed">
                                    Embark on your journey knowing every detail has been arranged.
                                    Your only job is to be present.
                                </p>
                            </div>
                        </Rise>
                    </div>
                </div>
            </section>

            {/* Every Detail, Your Choice Section */}
            <section className="w-full bg-white py-20 sm:py-28 lg:py-36">
                <div className="page-container flex flex-col items-center">
                    <Rise>
                        <div className="text-center mb-12 flex flex-col items-center">
                            <h2 className="text-[var(--color-ink)] text-3xl md:text-4xl lg:text-5xl font-serif mb-4 uppercase">
                                Every Detail, Your Choice.
                            </h2>
                            <p className="text-[var(--color-text-muted)] text-sm md:text-base">
                                Build the foundation of your experience.
                            </p>
                        </div>
                    </Rise>

                    <Rise delay={0.1}>
                        <div className="w-full max-w-6xl relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
                            {/* Background Image */}
                            <img
                                src={beautifulWeekendImg}
                                alt="Beautiful Weekend"
                                className="absolute inset-0 w-full h-full object-cover z-0"
                                loading="lazy"
                                decoding="async"
                            />

                            {/* Form Box */}
                            <div className="relative z-10 bg-[var(--color-cream)]/95 p-8 md:p-12 w-[90%] max-w-md flex flex-col shadow-xl">
                                {/* Destination */}
                                <div className="mb-6">
                                    <label className="block text-[10px] md:text-xs font-bold text-[var(--color-text-muted)] tracking-wider mb-2 uppercase" htmlFor="servicestailormadetours-destination">
                                        Destination
                                    </label>
                                    <input id="servicestailormadetours-destination" name="destination"
                                        type="text"
                                        placeholder="Where to?"
                                        className="w-full bg-transparent border-b border-[var(--color-border-subtle)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-ink)] text-sm md:text-base placeholder-[var(--color-text-muted)]"
                                    />
                                </div>

                                {/* Dates */}
                                <div className="mb-6">
                                    <label className="block text-[10px] md:text-xs font-bold text-[var(--color-text-muted)] tracking-wider mb-2 uppercase" htmlFor="servicestailormadetours-dates">
                                        Dates
                                    </label>
                                    <input id="servicestailormadetours-dates" name="dates"
                                        type="text"
                                        placeholder="When?"
                                        className="w-full bg-transparent border-b border-[var(--color-border-subtle)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-ink)] text-sm md:text-base placeholder-[var(--color-text-muted)]"
                                    />
                                </div>

                                {/* Accommodation Style */}
                                <div className="mb-10 relative">
                                    <label className="block text-[10px] md:text-xs font-bold text-[var(--color-text-muted)] tracking-wider mb-2 uppercase" htmlFor="servicestailormadetours-accommodationStyle">
                                        Accommodation Style
                                    </label>
                                    <select id="servicestailormadetours-accommodationStyle" name="accommodationStyle" className="w-full bg-transparent border-b border-[var(--color-border-subtle)] py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-ink)] appearance-none text-sm md:text-base">
                                        <option>Boutique Hotel</option>
                                        <option>Luxury Resort</option>
                                        <option>Private Villa</option>
                                    </select>
                                    {/* Custom arrow for select */}
                                    <div className="absolute right-0 top-9 pointer-events-none text-[var(--color-text-muted)]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>

                                <Link
                                    to="/request-quote"
                                    className="w-full bg-[var(--color-ink)] text-white text-[10px] md:text-xs font-bold tracking-widest uppercase py-4 hover:bg-[var(--color-navy-light)] transition-colors text-center"
                                >
                                    START CUSTOMIZING
                                </Link>
                            </div>
                        </div>
                    </Rise>
                </div>
            </section>

            {/* Bespoke Travel Experiences Section */}
            <section className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
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
                    <Rise>
                        <span className="text-[var(--color-gold)] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4">
                            Bespoke Travel Experiences
                        </span>
                    </Rise>

                    <Rise delay={0.1}>
                        <h2 className="text-white text-4xl md:text-5xl lg:text-7xl font-serif tracking-wide mb-6 drop-shadow-md">
                            TAILOR-MADE TOURS
                        </h2>
                    </Rise>

                    <Rise delay={0.2}>
                        <h3 className="text-white text-xl md:text-3xl font-serif tracking-wide mb-4 drop-shadow-sm">
                            Your Journey. Your Way.
                        </h3>
                    </Rise>

                    <Rise delay={0.3}>
                        <p className="text-gray-100 text-sm md:text-base tracking-wide font-light max-w-2xl mb-10 drop-shadow-sm">
                            Personalized journeys crafted around your interests, pace, style and dreams.
                        </p>
                    </Rise>

                    <Rise delay={0.4}>
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                            <Link to="/request-quote" className="bg-[var(--color-gold)] text-white text-xs font-bold tracking-widest uppercase py-3.5 px-8 hover:bg-[var(--color-gold-light)] transition-colors shadow-lg text-center">
                                PLAN MY JOURNEY
                            </Link>
                            <Link to="/destinations" className="bg-transparent border border-white text-white text-xs font-bold tracking-widest uppercase py-3.5 px-8 hover:bg-white hover:text-[var(--color-ink)] transition-colors shadow-lg text-center">
                                EXPLORE DESTINATIONS
                            </Link>
                        </div>
                    </Rise>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-[var(--color-navy)] py-20 sm:py-28 lg:py-36">
                <div className="page-container flex flex-col items-center text-center">
                    <Rise>
                        <span className="eyebrow text-[var(--color-gold-light)] mb-4 block">
                            Start Planning
                        </span>
                    </Rise>
                    <Rise delay={0.1}>
                        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-snug">
                            Let Us Design <br className="hidden md:block" />
                            Your Perfect Trip
                        </h2>
                    </Rise>
                    <Rise delay={0.2}>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
                            Every detail curated, every moment intentional. Share your vision and we will handle the rest.
                        </p>
                    </Rise>
                    <Rise delay={0.3}>
                        <Link
                            to="/request-quote"
                            className="btn btn--gold"
                        >
                            Request a Quote
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </Rise>
                </div>
            </section>
        </div>
    );
};

export default Services;
