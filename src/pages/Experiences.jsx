import { Link } from 'react-router-dom';
import heroImage from '../assets/aboutus/Aboutus-hero-image.webp';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { EXPERIENCE_CATEGORIES } from '../config/enquiry';
import { PAGE_META } from '../config/site';

const Experiences = () => (
    <div className="w-full bg-white">
        <Seo {...PAGE_META['/experiences']} path="/experiences" image={heroImage} />

        <PageHero image={heroImage} alt="" title="Experiences" eyebrow="Experiences" uppercase />

        <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
            <div className="w-full max-w-7xl flex flex-col items-center text-center">
                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-4 block">
                    WHAT WE CREATE
                </span>
                <h2 className="text-navy text-3xl md:text-4xl lg:text-[44px] font-serif font-normal leading-[1.2] mb-4 max-w-3xl">
                    One DMC, five ways to travel
                </h2>
                <p className="text-steel text-sm md:text-base max-w-2xl mb-14 leading-relaxed">
                    We design journeys around the way your clients want to travel — across Vietnam,
                    Japan and Australia. Every experience can be combined, extended or rebuilt from
                    scratch.
                </p>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 text-left">
                    {EXPERIENCE_CATEGORIES.map((category, index) => (
                        <div
                            key={category.value}
                            className="bg-cream rounded-2xl md:rounded-3xl p-7 md:p-8 flex flex-col border border-stone shadow-sm hover:shadow-lg transition-shadow duration-300"
                        >
                            <span className="text-gold text-2xl font-serif font-bold mb-3 block">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-navy text-xl md:text-2xl font-serif font-bold mb-1">
                                {category.title}
                            </h3>
                            <p className="text-bronze text-[11px] font-bold tracking-[0.12em] uppercase mb-3">
                                {category.tagline}
                            </p>
                            <p className="text-steel text-xs md:text-sm leading-relaxed mb-5 flex-grow">
                                {category.description}
                            </p>
                            <ul className="space-y-1.5 mb-6">
                                {category.points.map((point) => (
                                    <li key={point} className="text-xs text-gray-600 flex items-start gap-2">
                                        <span className="text-gold mt-0.5" aria-hidden="true">✓</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-col gap-2 mt-auto">
                                <Link
                                    to={`/request-quote?trip_type=${category.value}`}
                                    className="btn btn--wine btn--md w-full"
                                >
                                    Request a quote
                                </Link>
                                <Link
                                    to={`/tours?category=${category.value}`}
                                    className="text-navy hover:text-bronze text-xs font-semibold text-center py-1 transition-colors"
                                >
                                    View {category.title.toLowerCase()} journeys →
                                </Link>
                            </div>
                        </div>
                    ))}

                    {/* Not sure? card */}
                    <div className="bg-navy rounded-2xl md:rounded-3xl p-7 md:p-8 flex flex-col text-left shadow-lg">
                        <h3 className="text-white text-xl md:text-2xl font-serif font-bold mb-2">
                            Not sure where to start?
                        </h3>
                        <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6 flex-grow">
                            Tell us who is travelling and what they love — we will recommend the
                            right experience type and put together a proposal.
                        </p>
                        <Link
                            to="/request-quote"
                            className="btn btn--gold btn--md w-full"
                        >
                            Get a recommendation
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

export default Experiences;
