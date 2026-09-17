import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
const heroImage = '/images/services/Private-Transfer-Hero-services.webp';
const travelYourWayImg = '/images/services/travel-your-way.webp';
import chairsIcon from '../../assets/services/chairs.svg';
import passengerIcon from '../../assets/services/passanger.svg';
import refreshmentIcon from '../../assets/services/Refreshment.svg';
import suitcaseIcon from '../../assets/services/suitcase.svg';
import wifiIcon from '../../assets/services/wifi.svg';
import PageHero from '../../components/PageHero';
import Seo from '../../components/Seo';
import { Rise } from '../../components/editorial';
import { PAGE_META } from '../../config/site';

const EASE = [0.16, 1, 0.3, 1];

const ServicesPrivateTours = () => {
    const reduce = useReducedMotion();

    return (
        <div className="w-full">
            <Seo {...PAGE_META['/services/private-tours']} path="/services/private-tours" />

            <PageHero
                image={heroImage}
                alt=""
                eyebrow="Services / Private Transfers & Chauffeur"
                rule="wide"
            />

            {/* Travel Your Way Section */}
            <section className="w-full bg-[var(--color-cream)] py-20 sm:py-28 lg:py-36">
                <div className="page-container">
                    <div className="w-full flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                        {/* Left side: Content */}
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

                        {/* Right side: Image */}
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
                    </div>
                </div>
            </section>

            {/* The Fleet Section */}
            <section className="w-full bg-white py-20 sm:py-28 lg:py-36">
                <div className="page-container flex flex-col items-center">
                    <Rise>
                        <div className="text-center mb-20">
                            <span className="eyebrow mb-4 block">
                                Our Collection
                            </span>
                            <h2 className="text-[var(--color-ink)] text-4xl lg:text-5xl font-serif">
                                The Fleet
                            </h2>
                        </div>
                    </Rise>

                    {/* Vehicle 1 */}
                    <Rise delay={0.1}>
                        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12 lg:gap-20 mb-24">
                            <div className="w-full md:w-1/2">
                                <div className="w-full aspect-[4/3] bg-[var(--color-stone)] shadow-sm flex items-center justify-center text-[var(--color-text-muted)] text-sm">
                                    S-Class
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col items-start text-left max-w-md">
                                <h3 className="text-[var(--color-ink)] text-sm md:text-base font-serif font-bold tracking-[0.15em] uppercase mb-6">
                                    Mercedes-Benz S-Class Or Similar
                                </h3>
                                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-8">
                                    The pinnacle of luxury sedans, offering peerless comfort for up to three passengers. Ideal for executive airport transfers and business travel.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center text-[var(--color-text-primary)] text-xs md:text-sm">
                                        <img src={passengerIcon} alt="Passenger" className="w-5 h-5 mr-4 opacity-70" loading="lazy" decoding="async" /> 3 Passengers
                                    </li>
                                    <li className="flex items-center text-[var(--color-text-primary)] text-xs md:text-sm">
                                        <img src={suitcaseIcon} alt="Suitcase" className="w-5 h-5 mr-4 opacity-70" loading="lazy" decoding="async" /> 2 Large Suitcases
                                    </li>
                                    <li className="flex items-center text-[var(--color-text-primary)] text-xs md:text-sm">
                                        <img src={wifiIcon} alt="Wifi" className="w-5 h-5 mr-4 opacity-70" loading="lazy" decoding="async" /> Complimentary Wi-Fi
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Rise>

                    {/* Vehicle 2 (Reversed) */}
                    <Rise delay={0.1}>
                        <div className="w-full max-w-6xl flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20 mb-24">
                            <div className="w-full md:w-1/2">
                                <div className="w-full aspect-[4/3] bg-[var(--color-stone)] shadow-sm flex items-center justify-center text-[var(--color-text-muted)] text-sm">
                                    Range Rover
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col items-start text-left max-w-md mr-auto">
                                <h3 className="text-[var(--color-ink)] text-sm md:text-base font-serif font-bold tracking-[0.15em] uppercase mb-6">
                                    Range Rover Vogue Or Similar
                                </h3>
                                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-8">
                                    Commanding presence with exceptional interior space. Perfect for small groups, families, or when additional luggage capacity is required.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center text-[var(--color-text-primary)] text-xs md:text-sm">
                                        <img src={passengerIcon} alt="Passenger" className="w-5 h-5 mr-4 opacity-70" loading="lazy" decoding="async" /> 4 Passengers
                                    </li>
                                    <li className="flex items-center text-[var(--color-text-primary)] text-xs md:text-sm">
                                        <img src={suitcaseIcon} alt="Suitcase" className="w-5 h-5 mr-4 opacity-70" loading="lazy" decoding="async" /> 4 Large Suitcases
                                    </li>
                                    <li className="flex items-center text-[var(--color-text-primary)] text-xs md:text-sm">
                                        <img src={refreshmentIcon} alt="Refreshments" className="w-5 h-5 mr-4 opacity-70" loading="lazy" decoding="async" /> Refreshments
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Rise>

                    {/* Vehicle 3 */}
                    <Rise delay={0.1}>
                        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                            <div className="w-full md:w-1/2">
                                <div className="w-full aspect-[4/3] bg-[var(--color-stone)] shadow-sm flex items-center justify-center text-[var(--color-text-muted)] text-sm">
                                    V-Class
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col items-start text-left max-w-md">
                                <h3 className="text-[var(--color-ink)] text-sm md:text-base font-serif font-bold tracking-[0.15em] uppercase mb-6">
                                    Mercedes-Benz V-Class
                                </h3>
                                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-8">
                                    Spacious, versatile, and uncompromised in its luxury. The definitive choice for group travel, touring, and roadshows.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center text-[var(--color-text-primary)] text-xs md:text-sm">
                                        <img src={passengerIcon} alt="Passenger" className="w-5 h-5 mr-4 opacity-70" loading="lazy" decoding="async" /> 6-7 Passengers
                                    </li>
                                    <li className="flex items-center text-[var(--color-text-primary)] text-xs md:text-sm">
                                        <img src={suitcaseIcon} alt="Suitcase" className="w-5 h-5 mr-4 opacity-70" loading="lazy" decoding="async" /> 6 Large Suitcases
                                    </li>
                                    <li className="flex items-center text-[var(--color-text-primary)] text-xs md:text-sm">
                                        <img src={chairsIcon} alt="Chairs" className="w-5 h-5 mr-4 opacity-70" loading="lazy" decoding="async" /> Leather Captain Chairs
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Rise>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-[var(--color-navy)] py-20 sm:py-28 lg:py-36">
                <div className="page-container flex flex-col items-center text-center">
                    <Rise>
                        <span className="eyebrow text-[var(--color-gold-light)] mb-4 block">
                            Ready to Travel?
                        </span>
                    </Rise>
                    <Rise delay={0.1}>
                        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-snug">
                            Your Private Transfer, <br className="hidden md:block" />
                            Perfected.
                        </h2>
                    </Rise>
                    <Rise delay={0.2}>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
                            Tell us your itinerary and we will craft a seamless private transfer experience around your schedule.
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

export default ServicesPrivateTours;
