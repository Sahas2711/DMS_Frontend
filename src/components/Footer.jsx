import { Link } from 'react-router-dom';
import { SITE } from '../config/site';

const DESTINATION_LINKS = [
    { label: 'India', path: '/destination/delhi' },
    { label: 'Vietnam', path: '/destination/ha-long-bay' },
    { label: 'Japan', path: '/destination/tokyo' },
    { label: 'South Korea', path: '/destination/seoul' },
];

const COMPANY_LINKS = [
    { label: 'About Us', path: '/about' },
    { label: 'Destinations', path: '/destination' },
    { label: 'Experiences', path: '/experiences' },
    { label: 'Itineraries', path: '/tours' },
    { label: 'Journal', path: '/blog' },
    { label: 'Contact', path: '/contact' },
];

const PARTNER_LINKS = [
    { label: 'Become a Partner', path: '/become-a-partner' },
    { label: 'Request a Quote', path: '/request-quote' },
    { label: 'Travel Trade', path: '/travel-trade' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms of Use', path: '/terms' },
];

export default function Footer() {
    const year = new Date().getFullYear();
    const socials = [
        { label: 'Facebook', href: SITE.social.facebook },
        { label: 'Instagram', href: SITE.social.instagram },
    ].filter((s) => s.href);

    return (
        <footer className="relative overflow-hidden bg-navy-deep text-white">
            <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

            <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
                {/* Masthead row */}
                <div className="mb-14 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex items-start gap-5">
                        <img
                            src="/logo.jpeg"
                            alt="Asian Star Travel"
                            className="h-14 w-auto shrink-0 self-start"
                            width="148"
                            height="125"
                            loading="lazy"
                            decoding="async"
                        />
                        <div>
                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/60">
                                Asian Star Travel
                            </p>
                            <p className="max-w-md font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.01em] text-white/90">
                                The ground partner behind journeys across&nbsp;
                                <span className="text-gold">India, Vietnam, Japan&nbsp;&amp;&nbsp;South&nbsp;Korea.</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            to="/request-quote"
                            className="bg-gold px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-navy-deep transition-colors duration-300 hover:bg-gold-light"
                        >
                            Request a Quote
                        </Link>
                        <Link
                            to="/become-a-partner"
                            className="border border-white/20 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 transition-colors duration-300 hover:border-white/50 hover:text-white"
                        >
                            Become a Partner
                        </Link>
                    </div>
                </div>

                {/* Link columns */}
                <div className="grid grid-cols-2 gap-10 border-t border-white/[0.06] pt-12 sm:grid-cols-3 lg:grid-cols-5">
                    <div>
                        <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">
                            Destinations
                        </h4>
                        <ul className="space-y-3">
                            {DESTINATION_LINKS.map((l) => (
                                <li key={l.path}>
                                    <Link to={l.path} className="text-sm text-white/45 transition-colors duration-300 hover:text-gold">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {COMPANY_LINKS.map((l) => (
                                <li key={l.path}>
                                    <Link to={l.path} className="text-sm text-white/45 transition-colors duration-300 hover:text-gold">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">
                            For Partners
                        </h4>
                        <ul className="space-y-3">
                            {PARTNER_LINKS.map((l) => (
                                <li key={l.path}>
                                    <Link to={l.path} className="text-sm text-white/45 transition-colors duration-300 hover:text-gold">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">
                            Contact
                        </h4>
                        <ul className="space-y-3 text-sm text-white/45">
                            <li>
                                <a href={`mailto:${SITE.email}`} className="transition-colors duration-300 hover:text-gold">
                                    {SITE.email}
                                </a>
                            </li>
                            {SITE.teamContacts.map((t) => (
                                <li key={t.email}>
                                    <a href={`mailto:${t.email}`} className="transition-colors duration-300 hover:text-gold">
                                        {t.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">
                            Follow
                        </h4>
                        <div className="flex items-center gap-3">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={s.label}
                                    className="grid h-9 w-9 place-items-center border border-white/10 text-[9px] font-semibold uppercase tracking-wider text-white/40 transition-colors duration-300 hover:border-gold/40 hover:text-gold"
                                >
                                    {s.label[0]}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Legal row */}
                <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
                    <p className="text-[10px] tracking-[0.14em] text-white/25">
                        &copy; {year} Asian Star Travel. All rights reserved.
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/25">
                        India &bull; Vietnam &bull; Japan &bull; South Korea
                    </p>
                </div>
                <p className="mt-4 max-w-2xl text-[10px] leading-relaxed tracking-wide text-white/15">
                    Registered office: {SITE.registeredAddress}
                </p>
            </div>
        </footer>
    );
}
