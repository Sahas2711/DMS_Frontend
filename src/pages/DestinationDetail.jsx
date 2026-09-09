import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { SITE } from '../config/site';
import {
    breadcrumbListSchema,
    touristDestinationSchema,
} from '../config/structuredData';
import { fetchDestinationBySlug, fetchTours } from '../services/api/cms';
import { errorMessage } from '../services/api/client';
import MediaImage from '../components/cms/MediaImage';

const noSeo = {
    meta_title: '',
    meta_description: '',
    canonical_url: '',
    robots: '',
    og_title: '',
    og_description: '',
    og_image_url: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image_url: '',
};

function DestinationDetail() {
    const { slug } = useParams();
    const [state, setState] = useState({ status: 'loading', destination: null, error: null });
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        fetchDestinationBySlug(slug)
            .then((destination) => {
                if (controller.signal.aborted) return;
                setState({ status: 'success', destination, error: null });
                return fetchTours({ destination: destination.slug, pageSize: 100, sort: 'display_order' })
                    .then((data) => {
                        if (!controller.signal.aborted) setTours(data.items || []);
                    })
                    .catch(() => {});
            })
            .catch((error) => {
                if (!controller.signal.aborted) {
                    setState({ status: 'error', destination: null, error: errorMessage(error, 'This destination could not be loaded.') });
                }
            });

        return () => controller.abort();
    }, [slug]);

    if (state.status === 'loading') {
        return (
            <div className="min-h-[60vh] flex items-center justify-center" aria-busy="true">
                <div className="text-navy text-sm font-semibold tracking-wider uppercase">Loading destination…</div>
            </div>
        );
    }

    if (state.status === 'error') {
        return (
            <div className="min-h-[60vh] bg-cream flex items-center justify-center px-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-md text-center">
                    <Seo title="Destination not found" noIndex path={`/destination/${slug}`} />
                    <h1 className="text-navy font-serif text-2xl font-bold mb-2">Destination not available</h1>
                    <p className="text-steel text-sm leading-relaxed mb-5">{state.error}</p>
<Link to="/destination" className="btn btn--wine btn--md">
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Browse destinations
                    </Link>
                </div>
            </div>
        );
    }

    const dest = state.destination;
    const seo = dest.seo_metadata || noSeo;
    const heroImage = dest.hero_media?.url;
    const description = seo.meta_description || dest.short_description || SITE.description;
    const canonical = seo.canonical_url || `/destination/${dest.slug}`;
    const metaTitle = seo.meta_title || `${dest.name} — ${SITE.name}`;

    return (
        <div className="w-full flex flex-col">
            <Seo
                title={metaTitle}
                description={description}
                path={canonical}
                image={seo.og_image_url || heroImage}
                noIndex={Boolean(seo.robots && seo.robots.toLowerCase().includes('noindex'))}
                robots={seo.robots || undefined}
                ogTitle={seo.og_title || undefined}
                ogDescription={seo.og_description || undefined}
                twitterTitle={seo.twitter_title || undefined}
                twitterDescription={seo.twitter_description || undefined}
                twitterImage={seo.twitter_image_url || undefined}
            />
            <JsonLd
                data={[
                    breadcrumbListSchema([
                        { name: 'Home', url: '/' },
                        { name: 'Destinations', url: '/destination' },
                        { name: dest.name, url: canonical },
                    ]),
                    touristDestinationSchema({ destination: dest, seo }),
                ]}
            />

            {/* Hero */}
            <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                <MediaImage
                    src={heroImage}
                    alt={dest.hero_media?.alt_text || dest.name}
                    fallbackChar={dest.name?.charAt(0)}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-navy/40 z-0" aria-hidden="true" />
                <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase bg-white/90 text-navy px-3 py-1 rounded-full mb-4">
                        <MapPin className="h-3.5 w-3.5 text-bronze" aria-hidden="true" />
                        {dest.country} {dest.code ? `· ${dest.code}` : ''}
                    </span>
                    <h1 className="text-white text-3xl md:text-5xl font-serif tracking-wide mb-4">{dest.name}</h1>
                    <div className="w-24 h-px bg-gold mb-5" aria-hidden="true" />
                    {dest.short_description && (
                        <p className="text-gray-100 text-sm md:text-base max-w-2xl leading-relaxed">{dest.short_description}</p>
                    )}
                </div>
            </section>

            {/* Body */}
            <section className="w-full bg-white py-14 md:py-20 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center">
                <div className="w-full max-w-4xl flex flex-col gap-10">
                    <Link to="/destination" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-steel hover:text-navy transition-colors self-start">
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All destinations
                    </Link>

                    {dest.description && (
                        <div className="prose prose-lg prose-gray max-w-none">
                            {dest.description.split('\n\n').map((para, i) => (
                                <p key={i} className="text-steel leading-relaxed mb-5">{para}</p>
                            ))}
                        </div>
                    )}

                    {tours.length > 0 && (
                        <div>
                            <h2 className="text-navy font-serif text-2xl mb-6">Sample journeys in {dest.name}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {tours.map((tour) => (
                                    <Link
                                        key={tour.public_id || tour.slug}
                                        to={`/tours/${tour.slug}`}
                                        className="group bg-cream hover:bg-champagne transition-colors rounded-2xl overflow-hidden border border-gray-100"
                                    >
                                        {tour.hero_media?.url && (
                                            <MediaImage
                                                src={tour.hero_media.url}
                                                alt={tour.hero_media.alt_text || tour.title}
                                                fallbackChar={tour.title?.charAt(0)}
                                                className="w-full h-44 object-cover"
                                            />
                                        )}
                                        <div className="p-5">
                                            <h3 className="text-navy font-serif text-lg font-bold group-hover:text-bronze transition-colors">{tour.title}</h3>
                                            {tour.summary && <p className="text-steel text-sm mt-1 line-clamp-2">{tour.summary}</p>}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="bg-cream border border-bronze/20 rounded-2xl p-8 text-center">
                        <h2 className="text-navy font-serif text-2xl mb-2">Design a journey to {dest.name}</h2>
                        <p className="text-steel text-sm mb-6 max-w-lg mx-auto leading-relaxed">
                            Tell us the dates, hotel tier and group size — our DMC specialists will tailor every detail.
                        </p>
                        <Link
                            to={`/request-quote?destination=${dest.slug}`}
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

export default DestinationDetail;