import { Link } from 'react-router-dom';
import heroImage from '../assets/aboutus/REGIONAL-REACH-section-image.webp';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import BecomePartnerForm from '../components/forms/BecomePartnerForm';
import { PAGE_META } from '../config/site';

const PARTNER_BENEFITS = [
    {
        title: 'Trade rates & net pricing',
        description: 'Competitive net rates you can mark up confidently, shared in a clear proposal.',
    },
    {
        title: 'A dedicated trade desk',
        description: 'Named account support that answers in hours, not days — across time zones.',
    },
    {
        title: 'Vietnam, Japan & Australia',
        description: 'One DMC across three launch destinations, so you sell more with fewer partners.',
    },
    {
        title: 'Reliable ground handling',
        description: 'Licensed operation with vetted guides, drivers and hotels at every step.',
    },
];

const BecomePartner = () => (
    <div className="w-full bg-white">
        <Seo {...PAGE_META['/become-a-partner']} path="/become-a-partner" noIndex image={heroImage} />

        <PageHero image={heroImage} alt="" title="Become a Partner" eyebrow="Become a Partner" uppercase />

        <section className="w-full bg-ivory py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                <div className="lg:col-span-5 flex flex-col items-start text-left">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-3 block">
                        PARTNER NETWORK
                    </span>
                    <h2 className="text-navy text-3xl md:text-4xl font-serif font-normal leading-[1.2] mb-4">
                        Built for travel agents, agencies &amp; operators.
                    </h2>
                    <p className="text-steel text-sm md:text-base leading-relaxed mb-8">
                        Join our partner network and get a trusted ground partner across Vietnam,
                        Japan and Australia — with dedicated support behind every quote.
                    </p>

                    <div className="w-full flex flex-col gap-4">
                        {PARTNER_BENEFITS.map((benefit) => (
                            <div
                                key={benefit.title}
                                className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow"
                            >
                                <span className="mt-0.5 w-8 h-8 rounded-full bg-champagne text-bronze flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </span>
                                <div className="text-left">
                                    <h3 className="text-navy text-sm md:text-base font-bold mb-1">{benefit.title}</h3>
                                    <p className="text-steel text-xs md:text-sm leading-relaxed">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full bg-cream rounded-2xl p-5 mt-8 border border-gray-100 text-left">
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Already a partner? Your account manager can help — or use the{' '}
                            <Link to="/request-quote" className="text-navy underline hover:text-bronze">
                                request-a-quote form
                            </Link>{' '}
                            to send new business.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-7 bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-2 block">
                        PARTNER APPLICATION
                    </span>
                    <h2 className="text-navy text-2xl md:text-3xl font-serif font-normal mb-8">
                        Apply to work with us
                    </h2>
                    <BecomePartnerForm />
                </div>
            </div>
        </section>
    </div>
);

export default BecomePartner;
