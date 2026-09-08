import { Link } from 'react-router-dom';
import { SITE } from '../config/site';

const Footer = () => {
    return (
        <footer className="bg-navy text-gray-300 pt-16 pb-8 px-6 md:px-12 lg:px-24 xl:px-40 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                {/* Column 1: Brand Info */}
                <div className="flex flex-col space-y-6">
                    <h3 className="text-white text-2xl font-serif">{SITE.name}</h3>
                    <p className="leading-relaxed">
                        {SITE.name} is a global B2B DMC, crafting private journeys, MICE, group and luxury experiences for travel agents and tour operators across Vietnam, Japan and Australia.
                    </p>
                    <p className="italic text-gold">
                        {SITE.tagline}
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h4 className="text-white font-bold tracking-wider mb-6 text-xs uppercase">Quick Links</h4>
                    <ul className="space-y-4">
                        <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/tours" className="hover:text-white transition-colors">Tours</Link></li>
                        <li><Link to="/destination" className="hover:text-white transition-colors">Destinations</Link></li>
                        <li><Link to="/blog" className="hover:text-white transition-colors">Travel Blog</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Column 3: Services */}
                <div>
                    <h4 className="text-white font-bold tracking-wider mb-6 text-xs uppercase">Services</h4>
                    <ul className="space-y-4">
                        <li><Link to="/services/tailor-made-tours" className="hover:text-white transition-colors">Tailor-Made Tours</Link></li>
                        <li><Link to="/services/private-tours" className="hover:text-white transition-colors">Private Tours</Link></li>
                        <li><Link to="/services/airport-fast-track" className="hover:text-white transition-colors">Airport Fast Track</Link></li>
                        <li><Link to="/services/ground-services" className="hover:text-white transition-colors">Ground Services</Link></li>
                        <li><Link to="/request-quote" className="hover:text-white transition-colors">Request a Quote</Link></li>
                    </ul>
                </div>

                {/* Column 4: Contact & Follow */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <h4 className="text-white font-bold tracking-wider mb-6 text-xs uppercase">Contact</h4>
                        <div className="space-y-3.5 text-xs text-gray-300">
                            <p className="leading-relaxed">
                                <span className="text-white font-semibold block mb-0.5">Registered Office:</span>
                                {SITE.registeredAddress}
                            </p>
                            <p className="pt-1">
                                <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors underline-offset-2 hover:underline">
                                    {SITE.email}
                                </a>
                            </p>
                            {SITE.teamContacts.length > 0 && (
                                <ul className="pt-1 space-y-1.5">
                                    {SITE.teamContacts.map((person) => (
                                        <li key={person.email} className="flex items-baseline gap-2">
                                            <span className="text-white font-semibold">{person.name}</span>
                                            <a
                                                href={`mailto:${person.email}`}
                                                className="hover:text-white transition-colors underline-offset-2 hover:underline"
                                            >
                                                {person.email}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="pt-4">
                        <h4 className="text-white font-bold tracking-wider mb-4 text-xs uppercase">Follow Us</h4>
                        <div className="flex flex-wrap gap-3">
                            {SITE.social.facebook && (
                                <a
                                    href={SITE.social.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white text-xs"
                                >
                                    Facebook
                                    <span className="sr-only"> (opens in a new tab)</span>
                                </a>
                            )}
                            {SITE.social.instagram && (
                                <a
                                    href={SITE.social.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white text-xs"
                                >
                                    Instagram
                                    <span className="sr-only"> (opens in a new tab)</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-400">
                <p>Copyright {new Date().getFullYear()} &copy; {SITE.name}</p>
                <div className="flex items-center gap-5">
                    <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
                    <Link to="/admin/login" className="hover:text-white transition-colors">Admin</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;