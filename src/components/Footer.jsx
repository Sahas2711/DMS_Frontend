import { Link } from 'react-router-dom';
import { SITE } from '../config/site';

const Footer = () => {
    return (
        <footer className="bg-navy text-gray-300 pt-16 pb-8 px-6 md:px-12 lg:px-24 xl:px-40 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-12 mb-12">
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

                {/* Column 2: Explore */}
                <div>
                    <h4 className="text-white font-bold tracking-wider mb-6 text-xs uppercase">Explore</h4>
                    <ul className="space-y-4">
                        <li><Link to="/destination" className="hover:text-white transition-colors">Destinations</Link></li>
                        <li><Link to="/experiences" className="hover:text-white transition-colors">Experiences</Link></li>
                        <li><Link to="/travel-trade" className="hover:text-white transition-colors">Travel Trade</Link></li>
                        <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/blog" className="hover:text-white transition-colors">Travel Journal</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Column 3: For Travel Trade */}
                <div>
                    <h4 className="text-white font-bold tracking-wider mb-6 text-xs uppercase">For Travel Trade</h4>
                    <ul className="space-y-4">
                        <li><Link to="/request-quote" className="hover:text-white transition-colors">Request a Quote</Link></li>
                        <li><Link to="/become-a-partner" className="hover:text-white transition-colors">Become a Partner</Link></li>
                        <li><Link to="/travel-trade" className="hover:text-white transition-colors">Travel Trade Overview</Link></li>
                        <li><Link to="/experiences" className="hover:text-white transition-colors">FIT, Groups, MICE &amp; More</Link></li>
                    </ul>
                </div>



                {/* Column 4: Destinations */}
                <div>
                    <h4 className="text-white font-bold tracking-wider mb-6 text-xs uppercase">Destinations</h4>
                    <ul className="space-y-4">
                        <li><Link to="/destination" className="hover:text-white transition-colors">Vietnam</Link></li>
                        <li><Link to="/destination" className="hover:text-white transition-colors">Japan</Link></li>
                        <li><Link to="/destination" className="hover:text-white transition-colors">Australia</Link></li>
                    </ul>
                </div>

                {/* Column 5: Contact & Follow */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <h4 className="text-white font-bold tracking-wider mb-6 text-xs uppercase">Contact</h4>
                        <div className="space-y-3.5 text-xs text-gray-300">
                            <p className="leading-relaxed">
                                <span className="text-white font-semibold block mb-0.5">Head Office:</span>
                                {SITE.registeredAddress}
                            </p>
                            <p className="pt-1">
                                <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors underline-offset-2 hover:underline">
                                    {SITE.email}
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <h4 className="text-white font-bold tracking-wider mb-4 text-xs uppercase">Follow Us</h4>
                        <a
                            href="https://www.facebook.com/asianstartravel.vn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white text-xs"
                        >
                            Facebook
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-400">
                <p>Copyright {new Date().getFullYear()} &copy; {SITE.name}</p>
                <div className="flex items-center gap-5">
                    <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
