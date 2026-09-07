import { Link } from 'react-router-dom';
import heroImage from '../assets/aboutus/our-story-image.webp';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';

const TRADE_STEPS = [
    {
        number: '01',
        title: 'Send the brief',
        description: 'Use the request-a-quote form with dates, destination, travellers and hotel tier.',
    },
    {
        number: '02',
        title: 'Receive the proposal',
        description: 'A tailored itinerary with net or trade pricing, hotels, transport and experiences.',
    },
    {
        number: '03',
        title: 'Refine together',
        description: 'Adjust hotels, pace and inclusions until it is ready for your client.',
    },
    {
        number: '04',
        title: 'We operate it',
        description: 'Licensed ground handling from confirmation to the final transfer.',
    },
];

const TRADE_SUPPORT = [
    { title: 'Net & trade rates', description: 'Clear pricing structures built for resale.' },
    { title: 'Groups & series', description: 'Departures, coach logistics and multi-lingual guides.' },
    { title: 'MICE desk', description: 'Venues, gala dinners and incentive programmes.' },
    { title: 'On-trip support', description: 'Dedicated support while your clients are on the road.' },
];

const TravelTrade = () => (
    <div className="w-full bg-white">
        <Seo {...PAGE_META['/travel-trade']} path="/travel-trade" />

        <PageHero image={heroImage} alt="" eyebrow="Travel Trade" uppercase />

        {/* Intro */}
        <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-6 flex flex-col text-left">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-3 block">
                        B2B PARTNER
                    </span>
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-[40px] font-serif font-normal leading-[1.2] mb-5">
                        Your local team across Vietnam, Japan &amp; Australia
                    </h2>
                    <p className="text-steel text-sm md:text-base leading-relaxed mb-6">
                        We are a destination management company — the people behind the scenes who
                        turn your itineraries into reality. Licensed and staffed by local
                        specialists, we handle hotels, transport, guiding and every detail in
                        between, so you can focus on selling.
                    </p>
                    <ul className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {TRADE_SUPPORT.map((item) => (
                            <li key={item.title} className="bg-cream rounded-2xl p-5 border border-gray-100 text-left">
                                <h3 className="text-navy text-sm font-bold mb-1.5">{item.title}</h3>
                                <p className="text-steel text-xs leading-relaxed">{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-6 bg-ivory rounded-3xl p-8 md:p-12 border border-gray-100 flex flex-col gap-8">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase block text-left">
                        HOW IT WORKS
                    </span>
                    <ol className="flex flex-col gap-7 text-left">
                        {TRADE_STEPS.map((step) => (
                            <li key={step.number} className="flex items-start gap-5">
                                <span className="w-11 h-11 rounded-full bg-champagne border border-bronze/30 text-bronze font-serif text-lg font-bold flex items-center justify-center shrink-0">
                                    {step.number}
                                </span>
                                <div>
                                    <h3 className="text-navy text-base font-bold mb-1">{step.title}</h3>
                                    <p className="text-steel text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>

        {/* CTAs */}
        <section className="w-full bg-ivory py-16 md:py-20 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center border-t border-gray-100/80">
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-navy rounded-3xl p-8 md:p-10 text-left">
                    <h3 className="text-white text-2xl md:text-3xl font-serif font-normal mb-3">
                        Ready to request a quote?
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-7">
                        Send the brief and receive a tailored proposal within one business day.
                    </p>
                    <Link
                        to="/request-quote"
                        className="btn btn--gold btn--lg"
                    >
                        Request a Quote
                    </Link>
                </div>
                <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 text-left shadow-sm">
                    <h3 className="text-navy text-2xl md:text-3xl font-serif font-normal mb-3">
                        Want to work with us regularly?
                    </h3>
                    <p className="text-steel text-sm leading-relaxed mb-7">
                        Join the partner network for trade rates, a dedicated account manager and
                        priority support.
                    </p>
                    <Link
                        to="/become-a-partner"
                        className="btn btn--wine btn--lg"
                    >
                        Become a Partner
                    </Link>
                </div>
            </div>
        </section>
    </div>
);

export default TravelTrade;
