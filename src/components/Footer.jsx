import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#081634] text-gray-300 pt-16 pb-8 px-6 md:px-12 lg:px-24 xl:px-40 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                {/* Column 1: Brand Info */}
                <div className="flex flex-col space-y-6">
                    <h3 className="text-white text-2xl font-serif">Asian Star Travel</h3>
                    <p className="leading-relaxed">
                        Asian Star Travel is a Vietnam-based inbound travel company & DMC, crafting private journeys and reliable ground services from Ho Chi Minh City.
                    </p>
                    <p className="italic text-[#C5A869]">
                        Discover Vietnam: Timeless Charm!
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h4 className="text-white font-bold tracking-wider mb-6 text-xs uppercase">Quick Links</h4>
                    <ul className="space-y-4">
                        <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/tours" className="hover:text-white transition-colors">Tours</Link></li>
                        <li><Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
                        <li><Link to="/blog" className="hover:text-white transition-colors">Travel Blog</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Column 3: Services */}
                <div>
                    <h4 className="text-white font-bold tracking-wider mb-6 text-xs uppercase">Services</h4>
                    <ul className="space-y-4">
                        <li><Link to="/services/tailor-made" className="hover:text-white transition-colors">Tailor-Made Tours</Link></li>
                        <li><Link to="/services/private-transfers" className="hover:text-white transition-colors">Private Transfers</Link></li>
                        <li><Link to="/services/airport-fast-track" className="hover:text-white transition-colors">Airport Fast Track</Link></li>
                        <li><Link to="/services/ground-services-india" className="hover:text-white transition-colors">Ground Services in India</Link></li>
                    </ul>
                </div>

                {/* Column 4: Contact & Follow */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <h4 className="text-white font-bold tracking-wider mb-6 text-xs uppercase">Contact</h4>
                        <div className="space-y-3.5 text-10px text-gray-300">
                            <p className="leading-relaxed">
                                <span className="text-white font-semibold block mb-0.5">India Office:</span>
                                7th Floor Kirloskar Tech Park, Godrej Woodsman Estate, Hebbal Kempapura, Bengaluru, Karnataka 560024
                            </p>
                            <p className="leading-relaxed">
                                <span className="text-white font-semibold block mb-0.5">Head Office:</span>
                                No. 141 Nguyen Van Cu Street, Bo De Ward, Ha Noi City
                            </p>
                            {/* <p className="leading-relaxed">
                                <span className="text-white font-semibold block mb-0.5">Ho Chi Minh Branch:</span>
                                No. 4 Nguyen Thi Minh Khai Street, Sai Gon Ward, Ho Chi Minh City
                            </p> */}
                            <p className="pt-1">
                                <a href="mailto:info@asianstartravel.vn" className="hover:text-white transition-colors underline-offset-2 hover:underline">
                                    info@asianstartravel.vn
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <h4 className="text-white font-bold tracking-wider mb-4 text-xs uppercase">Follow Us</h4>
                        <a
                            href="#"
                            className="inline-block px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white text-xs"
                        >
                            Facebook
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                <p>Copyright 2026 &copy; Asian Star Travel</p>
                <Link to="/privacy-policy" className="hover:text-white transition-colors mt-4 md:mt-0">Privacy Policy</Link>
            </div>
        </footer>
    );
};

export default Footer;
