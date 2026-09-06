import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import StarIcon from '../components/icons/StarIcon';
import { SITE } from '../config/site';

const SUGGESTIONS = [
    { label: 'Journeys & Experiences', to: '/tours' },
    { label: 'Travel Trade', to: '/travel-trade' },
    { label: 'Destinations', to: '/destination' },
    { label: 'Contact Us', to: '/contact' },
];

const NotFound = () => (
    <>
        <Seo
            title={`Page Not Found | ${SITE.name}`}
            description="The page you were looking for could not be found."
            noIndex
        />

        <section className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24 bg-ivory">
            <StarIcon className="w-8 h-8 text-gold mb-6" />

            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-bronze mb-4">
                Error 404
            </p>

            <h1 className="text-navy text-3xl md:text-5xl font-serif mb-5">
                This page has gone off the map
            </h1>

            <div className="w-24 h-px bg-gold mb-6" aria-hidden="true" />

            <p className="text-steel max-w-md mb-10">
                The page you are looking for may have moved or no longer exists. Here are a
                few places worth heading instead.
            </p>

            <nav aria-label="Suggested pages" className="flex flex-wrap gap-3 justify-center">
                {SUGGESTIONS.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className="px-6 py-3 rounded-full border border-navy/15 text-navy text-sm hover:bg-navy hover:text-white transition-colors"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            <Link to="/" className="mt-10 text-sm text-bronze underline underline-offset-4 hover:text-navy transition-colors">
                Return to the homepage
            </Link>
        </section>
    </>
);

export default NotFound;
