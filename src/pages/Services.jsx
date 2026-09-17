import { Link } from 'react-router-dom';
const heroImage = '/images/aboutus/Aboutus-hero-image.webp';
const tailorMadeImg = '/images/aboutus/Tailor-Made-Tours.webp';
const privateTransfersImg = '/images/aboutus/Private-Transfers.webp';
const airportFastTrackImg = '/images/aboutus/Airport-Fast-Track.webp';
const groundServicesImg = '/images/aboutus/Ground-Services.webp';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';

const CORE_SERVICES = [
    {
        title: 'Tailor-Made Tours',
        description:
            'Private itineraries designed around your clients\u2019 pace, interests and travel dates \u2014 never off-the-shelf.',
        image: tailorMadeImg,
        link: '/tours',
        cta: 'Explore Tours',
        tag: 'FIT & COUPLES',
    },
    {
        title: 'Private Transfers',
        description:
            'Private cars with professional local drivers between every destination \u2014 comfortable and on time.',
        image: privateTransfersImg,
        link: '/request-quote',
        cta: 'Request a Quote',
        tag: 'LOGISTICS',
    },
    {
        title: 'Airport Fast Track',
        description:
            'Expedited immigration and VIP assistance on arrival and departure \u2014 a seamless experience for your clients.',
        image: airportFastTrackImg,
        link: '/request-quote',
        cta: 'Request a Quote',
        tag: 'VIP ASSISTANCE',
    },
    {
        title: 'Ground Services',
        description:
            'End-to-end destination handling for agencies and tour operators \u2014 confirmed, dependable, local.',
        image: groundServicesImg,
        link: '/become-a-partner',
        cta: 'Become a Partner',
        tag: 'DMC OPERATIONS',
    },
];

const REQUEST_STEPS = [
    {
        number: '01',
        title: 'Send the brief',
        description: 'Tell us dates, destination, travellers and hotel tier.',
    },
    {
        number: '02',
        title: 'Receive the proposal',
        description: 'A tailored itinerary with net or trade pricing within one business day.',
    },
    {
        number: '03',
        title: 'Refine together',
        description: 'Adjust hotels, pace and inclusions until it is ready for your client.',
    },
    {
        number: '04',
        title: 'We operate it',
        description: 'Licensed local handling from confirmation to the final transfer.',
    },
];

const Services = () => (
    <div className="w-full bg-white">
        <Seo {...PAGE_META['/services']} path="/services" image={heroImage} />

        <PageHero
            image={heroImage}
            alt=""
            title="Services"
            eyebrow="Everything we operate for your clients"
            uppercase
        />

        {/* Intro */}
        <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-7 flex flex-col text-left">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-3 block">
                        OUR SERVICES
                    </span>
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-[40px] font-serif font-normal leading-[1.2] mb-5">
                        The ground services behind every great itinerary
                    </h2>
                    <p className="text-steel text-sm md:text-base leading-relaxed mb-6">
                        From tailor-made tour design to airport fast track and private transfers,
                        our local teams handle every detail across India, Vietnam, Japan and South Korea \u2014
                        so your clients only feel the difference.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/request-quote" className="btn btn--gold btn--lg">
                            Request a Quote
                        </Link>
                        <Link to="/tours" className="btn btn--outline btn--lg">
                            Browse Tours
                        </Link>
                    </div>
                </div>

                <div className="lg:col-span-5 bg-cream rounded-3xl p-8 md:p-10 border border-gray-100 text-left">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase block mb-6">
                        HOW TO WORK WITH US
                    </span>
                    <ol className="flex flex-col gap-6">
                        {REQUEST_STEPS.map((step) => (
                            <li key={step.number} className="flex items-start gap-5">
                                <span className="w-10 h-10 rounded-full bg-champagne border border-bronze/30 text-bronze font-serif text-base font-bold flex items-center justify-center shrink-0">
                                    {step.number}
                                </span>
                                <div>
                                    <h3 className="text-navy text-sm font-bold mb-1">{step.title}</h3>
                                    <p className="text-steel text-xs leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>

        {/* Service cards */}
        <section className="w-full bg-ivory py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center border-t border-gray-100/80">
            <div className="w-full max-w-7xl">
                <div className="flex flex-col items-start mb-12 text-left">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-3 block">
                        WHAT WE DO
                    </span>
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-[40px] font-serif font-normal leading-[1.2]">
                        Services we operate for travel agents
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CORE_SERVICES.map((service) => (
                        <div
                            key={service.title}
                            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <span className="absolute top-4 left-4 bg-navy/85 text-white text-[10px] font-bold tracking-[0.18em] uppercase rounded-full px-3 py-1.5">
                                    {service.tag}
                                </span>
                            </div>
                            <div className="p-6 md:p-8 flex flex-col flex-grow text-left">
                                <h3 className="text-navy text-xl font-serif font-normal mb-2.5">
                                    {service.title}
                                </h3>
                                <p className="text-steel text-sm leading-relaxed mb-6 flex-grow">
                                    {service.description}
                                </p>
                                <Link to={service.link} className="btn btn--gold btn--sm self-start">
                                    {service.cta}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTAs */}
        <section className="w-full bg-white py-16 md:py-20 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-navy rounded-3xl p-8 md:p-10 text-left">
                    <h3 className="text-white text-2xl md:text-3xl font-serif font-normal mb-3">
                        Ready to request a quote?
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-7">
                        Send the brief with dates, destination, travellers and hotel tier.
                    </p>
                    <Link to="/request-quote" className="btn btn--gold btn--lg">
                        Request a Quote
                    </Link>
                </div>
                <div className="bg-cream rounded-3xl p-8 md:p-10 border border-gray-100 text-left">
                    <h3 className="text-navy text-2xl md:text-3xl font-serif font-normal mb-3">
                        Want to work with us regularly?
                    </h3>
                    <p className="text-steel text-sm leading-relaxed mb-7">
                        Join the partner network for trade rates, a dedicated account manager and
                        priority support.
                    </p>
                    <Link to="/become-a-partner" className="btn btn--outline btn--lg">
                        Become a Partner
                    </Link>
                </div>
            </div>
        </section>
    </div>
);

export default Services;