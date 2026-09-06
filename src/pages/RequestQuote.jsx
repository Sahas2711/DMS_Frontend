import { Link, useSearchParams } from 'react-router-dom';
import heroImage from '../assets/home/plan-your-trip.webp';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import RequestQuoteForm from '../components/forms/RequestQuoteForm';
import { PAGE_META } from '../config/site';

const RequestQuote = () => {
    const [searchParams] = useSearchParams();
    const tripType = searchParams.get('trip_type') || '';

    return (
        <div className="w-full bg-white">
            <Seo {...PAGE_META['/request-quote']} path="/request-quote" noIndex />

            <PageHero image={heroImage} alt="" eyebrow="Request a Quote" uppercase />

            <section className="w-full bg-ivory py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    {/* Intro / trade desk context */}
                    <div className="lg:col-span-4 flex flex-col items-start text-left lg:sticky lg:top-8">
                        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-3 block">
                            TRAVEL TRADE
                        </span>
                        <h2 className="text-navy text-3xl md:text-4xl font-serif font-normal leading-[1.2] mb-4">
                            Tell us what your clients need.
                        </h2>
                        <p className="text-steel text-sm md:text-base leading-relaxed mb-6">
                            Send us the trip requirements and we will come back with a tailored,
                            trade-priced proposal — usually within one business day.
                        </p>
                        <div className="w-full bg-cream rounded-2xl p-5 md:p-6 border border-gray-100 space-y-4 text-left">
                            <p className="text-xs text-gray-600 leading-relaxed">
                                <span className="text-navy font-bold block mb-1">What happens next</span>
                                1. A specialist reviews your dates and requirements.
                                <br />
                                2. You receive a draft proposal with hotels, transport and experiences.
                                <br />
                                3. We refine it together until it is ready to sell.
                            </p>
                        </div>
                        <p className="text-xs text-gray-400 mt-6 leading-relaxed">
                            Planning for your own trip instead? Our{' '}
                            <Link to="/contact" className="text-navy underline hover:text-bronze">contact form</Link>{' '}
                            or WhatsApp concierge can help you directly.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-8 bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100">
                        <RequestQuoteForm initialTripType={tripType} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RequestQuote;
