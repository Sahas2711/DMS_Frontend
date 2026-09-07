import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';
import { fetchDestinations, fetchTours } from '../services/api/cms';
import { errorMessage } from '../services/api/client';
import { LAUNCH_COUNTRIES } from '../config/enquiry';
import MediaImage from '../components/cms/MediaImage';
import heroImage from '../assets/destination/Destination-hero-image.webp';
import PageHero from '../components/PageHero';

const DestinationCard = ({ destination }) => (
    <Link
        to={`/destination/${destination.slug}`}
        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100/90 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full text-left"
    >
        <MediaImage
            src={destination.hero_media?.url}
            alt={destination.hero_media?.alt_text || `${destination.name} highlights`}
            fallbackChar={destination.name?.charAt(0)}
            className="w-full h-44 object-cover"
        />
        <div className="p-5 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-navy font-serif text-lg font-bold">{destination.name}</h4>
                {destination.code && (
                    <span className="text-[10px] font-bold text-gray-400 tracking-wider">{destination.code}</span>
                )}
            </div>
            {destination.short_description ? (
                <p className="text-steel text-xs md:text-sm leading-relaxed flex-grow">
                    {destination.short_description}
                </p>
            ) : (
                <p className="text-gray-400 text-xs flex-grow">Details coming soon.</p>
            )}
        </div>
    </Link>
);

const EMPTY_RESULT = { key: null, status: 'loading', destinations: [], tours: [], error: null };

const DestinationCatalog = () => {
    const [result, setResult] = useState(EMPTY_RESULT);
    const [attempt, setAttempt] = useState(0);
    const key = `destinations#${attempt}`;

    useEffect(() => {
        let cancelled = false;

        Promise.all([
            fetchDestinations({ pageSize: 100, sort: 'display_order' }),
            fetchTours({ pageSize: 100, sort: 'display_order' }),
        ])
            .then(([destData, tourData]) => {
                if (!cancelled) {
                    setResult({
                        key,
                        status: 'success',
                        destinations: destData.items ?? [],
                        tours: tourData.items ?? [],
                        error: null,
                    });
                }
            })
            .catch((error) => {
                if (!cancelled) {
                    setResult({
                        key,
                        status: 'error',
                        destinations: [],
                        tours: [],
                        error: errorMessage(error, 'We could not load destinations right now.'),
                    });
                }
            });

        return () => {
            cancelled = true;
        };
    }, [key]);

    const state = result.key === key ? result : EMPTY_RESULT;

    if (state.status === 'loading') {
        return (
            <div className="flex flex-col gap-16" aria-busy="true">
                {LAUNCH_COUNTRIES.map((country) => (
                    <div key={country.name} className="animate-pulse">
                        <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden">
                                    <div className="h-44 bg-gray-200" />
                                    <div className="p-5 space-y-2">
                                        <div className="h-4 w-24 bg-gray-200 rounded" />
                                        <div className="h-3 w-full bg-gray-100 rounded" />
                                        <div className="h-3 w-3/4 bg-gray-100 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (state.status === 'error') {
        return (
            <div className="w-full bg-red-50 border border-red-200 rounded-2xl p-10 text-center">
                <p className="text-red-800 text-sm font-semibold mb-2">Could not load destinations</p>
                <p className="text-red-700/80 text-xs mb-5 max-w-md mx-auto leading-relaxed">{state.error}</p>
                <button
                    type="button"
                    onClick={() => setAttempt((n) => n + 1)}
                    className="bg-[#731E2A] hover:bg-[#5C1822] text-white font-bold text-xs tracking-wider uppercase py-2.5 px-6 rounded-full transition-colors"
                >
                    Try again
                </button>
            </div>
        );
    }

    const toursByCountry = {};
    for (const tour of state.tours) {
        const country = tour.destination?.country;
        if (country) toursByCountry[country] = (toursByCountry[country] || 0) + 1;
    }

    const emptyOverall = state.destinations.length === 0;

    return (
        <div className="flex flex-col gap-16 md:gap-20">
            {emptyOverall && (
                <div className="w-full bg-cream border border-gray-100 rounded-2xl p-10 text-center">
                    <h3 className="text-navy text-xl font-serif font-semibold mb-2">No destinations published yet</h3>
                    <p className="text-steel text-sm leading-relaxed max-w-md mx-auto mb-5">
                        Our destination library is being prepared. In the meantime, tell us which of
                        Vietnam, Japan or Australia your clients are interested in.
                    </p>
                    <Link
                        to="/request-quote"
                        className="btn btn--wine btn--lg"
                    >
                        Request a quote
                    </Link>
                </div>
            )}

            {LAUNCH_COUNTRIES.map((country, index) => {
                const destinations = state.destinations.filter((d) => d.country === country.name);
                const journeyCount = toursByCountry[country.name] || 0;
                if (emptyOverall) return null;

                return (
                    <section key={country.name} className="flex flex-col text-left" id={country.slug}>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                            <div>
                                <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-2 block">
                                    {String(index + 1).padStart(2, '0')} · {country.name.toUpperCase()}
                                </span>
                                <h3 className="text-navy text-2xl md:text-4xl font-serif font-normal">
                                    {country.name}
                                </h3>
                                <p className="text-steel text-xs md:text-sm mt-2 max-w-xl leading-relaxed">
                                    {country.description}
                                </p>
                            </div>
                            <Link
                                to="/tours"
                                className="btn btn--navy btn--md shrink-0"
                            >
                                {journeyCount > 0 ? `${journeyCount} journe${journeyCount === 1 ? 'y' : 'ys'} available` : 'Explore journeys'} →
                            </Link>
                        </div>

                        {destinations.length === 0 ? (
                            <p className="text-gray-400 text-sm">
                                Destination guides for {country.name} are being prepared. Request a quote
                                and our specialists will help in the meantime.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {destinations.map((destination) => (
                                    <DestinationCard key={destination.public_id || destination.slug} destination={destination} />
                                ))}
                            </div>
                        )}
                    </section>
                );
            })}
        </div>
    );
};

const Destination = () => (
    <div className="w-full">
        <Seo {...PAGE_META['/destination']} path="/destination" />

        <PageHero image={heroImage} alt="" eyebrow="Destinations" uppercase />

        <section className="w-full bg-ivory py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
            <div className="w-full max-w-7xl flex flex-col">
                <div className="flex flex-col items-center text-center mb-14">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-3 block">
                        LAUNCH DESTINATIONS
                    </span>
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-[44px] font-serif font-normal leading-[1.2] mb-4">
                        Where we take your clients
                    </h2>
                    <p className="text-steel text-sm md:text-base max-w-2xl leading-relaxed">
                        We build our destination management around three launch markets — with local
                        teams on the ground in each, so the experience is as seamless in Hanoi as it
                        is in Tokyo or Sydney.
                    </p>
                </div>

                <DestinationCatalog />
            </div>
        </section>
    </div>
);

export default Destination;
