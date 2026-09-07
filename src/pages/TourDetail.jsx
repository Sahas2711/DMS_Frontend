import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Check } from 'lucide-react';
import Seo from '../components/Seo';
import { SITE } from '../config/site';
import { fetchTourBySlug } from '../services/api/cms';
import { errorMessage } from '../services/api/client';
import { TRIP_TYPE_BY_VALUE } from '../config/enquiry';
import MediaImage from '../components/cms/MediaImage';

const noSeo = { meta_title: '', meta_description: '', canonical_url: '', og_image_url: '' };

function TourDetail() {
    const { slug } = useParams();
    const [state, setState] = useState({ status: 'loading', tour: null, error: null });

    useEffect(() => {
        const controller = new AbortController();

        fetchTourBySlug(slug)
            .then((tour) => {
                if (!controller.signal.aborted) setState({ status: 'success', tour, error: null });
            })
            .catch((error) => {
                if (!controller.signal.aborted) {
                    setState({ status: 'error', tour: null, error: errorMessage(error, 'This journey could not be loaded.') });
                }
            });

        return () => controller.abort();
    }, [slug]);

    useEffect(() => {
        if (state.tour) {
            document.title = `${state.tour.title} — ${SITE.name}`;
        }
    }, [state.tour]);

    if (state.status === 'loading') {
        return (
            <div className="min-h-[60vh] flex items-center justify-center" aria-busy="true">
                <div className="text-navy text-sm font-semibold tracking-wider uppercase">Loading journey…</div>
            </div>
        );
    }

    if (state.status === 'error') {
        return (
            <div className="min-h-[60vh] bg-cream flex items-center justify-center px-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-md text-center">
                    <Seo title="Journey not found" noIndex path={`/tours/${slug}`} />
                    <h1 className="text-navy font-serif text-2xl font-bold mb-2">Journey not available</h1>
                    <p className="text-steel text-sm leading-relaxed mb-5">{state.error}</p>
                    <Link to="/tours" className="inline-flex items-center gap-2 bg-[#731E2A] hover:bg-[#5C1822] text-white font-bold text-xs tracking-wider uppercase py-3 px-6 rounded-full transition-colors">
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Browse all journeys
                    </Link>
                </div>
            </div>
        );
    }

    const tour = state.tour;
    const seo = tour.seo_metadata || noSeo;
    const heroImage = tour.hero_media?.url;
    const description = seo.meta_description || tour.summary || SITE.description;
    const canonical = seo.canonical_url || `/tours/${tour.slug}`;
    const metaTitle = seo.meta_title || `${tour.title} — ${SITE.name}`;
    const days = tour.duration_days;
    const nights = tour.duration_nights;

    return (
        <div className="w-full flex flex-col">
            <Seo title={metaTitle} description={description} path={canonical} image={seo.og_image_url} />

            {/* Hero */}
            <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                <MediaImage
                    src={heroImage}
                    alt={tour.hero_media?.alt_text || tour.title}
                    fallbackChar={tour.title?.charAt(0)}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-navy/40 z-0" aria-hidden="true" />
                <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase bg-white/90 text-navy px-3 py-1 rounded-full mb-4">
                        {TRIP_TYPE_BY_VALUE[tour.category] || tour.category}
                    </span>
                    <h1 className="text-white text-3xl md:text-5xl font-serif tracking-wide mb-4">{tour.title}</h1>
                    <div className="w-24 h-px bg-gold mb-5" aria-hidden="true" />
                    <div className="flex flex-wrap items-center justify-center gap-4 text-gray-100 text-sm">
                        {days && (
                            <span className="inline-flex items-center gap-1.5">
                                <Calendar className="h-4 w-4 text-gold" aria-hidden="true" />
                                {nights ? `${days} days / ${nights} nights` : `${days} days`}
                            </span>
                        )}
                        {tour.destination && (
                            <Link to={`/destination/${tour.destination.slug}`} className="inline-flex items-center gap-1.5 hover:text-white underline underline-offset-2">
                                {tour.destination.country} · {tour.destination.name}
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Body */}
            <section className="w-full bg-white py-14 md:py-20 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="w-full max-w-4xl flex flex-col gap-10">
                    <Link to="/tours" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-steel hover:text-navy transition-colors self-start">
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All journeys
                    </Link>

                    {tour.summary && (
                        <p className="text-navy text-lg md:text-xl font-serif leading-relaxed">{tour.summary}</p>
                    )}

                    {tour.highlights && tour.highlights.length > 0 && (
                        <div>
                            <h2 className="text-navy font-serif text-2xl mb-5">Why clients love it</h2>
                            <ul className="space-y-3">
                                {tour.highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-3 text-steel">
                                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-champagne text-bronze shrink-0">
                                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                        </span>
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {tour.description && (
                        <div className="prose prose-lg prose-gray max-w-none">
                            {tour.description.split('\n\n').map((para, i) => (
                                <p key={i} className="text-steel leading-relaxed mb-5">{para}</p>
                            ))}
                        </div>
                    )}

                    {/* CTA */}
                    <div className="bg-cream border border-bronze/20 rounded-2xl p-8 text-center">
                        <h2 className="text-navy font-serif text-2xl mb-2">Plan this journey for your clients</h2>
                        <p className="text-steel text-sm mb-6 max-w-lg mx-auto leading-relaxed">
                            This sample can be tailored around dates, hotel tiers and travel style. Send us your brief and our specialists will design the itinerary.
                        </p>
                        <Link
                            to={`/request-quote?trip_type=${tour.category}`}
                            className="btn btn--wine btn--lg"
                        >
                            Request a quote
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TourDetail;