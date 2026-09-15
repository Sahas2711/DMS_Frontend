import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { PAGE_META, SITE } from '../config/site';
import { PageTransition } from '../components/editorial';
import heroImage from '../assets/aboutus/Aboutus-hero-image.webp';

const CookiePolicy = () => {
    return (
        <PageTransition>
            <div className="w-full bg-white">
                <Seo {...PAGE_META['/cookie-policy']} path="/cookie-policy" />

                <PageHero
                    image={heroImage}
                    alt=""
                    title="Cookie Policy"
                    eyebrow="Legal"
                    uppercase
                />

                <section className="py-20 sm:py-28 lg:py-36 bg-white">
                    <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
                        <p className="text-[var(--color-text-muted)] text-sm font-body mb-8">
                            Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>

                        <div className="prose prose-lg max-w-none font-body text-[var(--color-text-secondary)] leading-[1.8] space-y-6">
                            <h2 className="font-display text-2xl text-[var(--color-navy)]">What Are Cookies</h2>
                            <p>
                                Cookies are small text files that are placed on your computer or mobile device when you
                                visit a website. They are widely used to make websites work more efficiently and to
                                provide information to website owners.
                            </p>

                            <h2 className="font-display text-2xl text-[var(--color-navy)]">How We Use Cookies</h2>
                            <p>
                                We use cookies to improve your experience on our website, to remember your preferences,
                                and to understand how visitors use our site. We do not use cookies to collect
                                personally identifiable information.
                            </p>

                            <h2 className="font-display text-2xl text-[var(--color-navy)]">Types of Cookies We Use</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    <strong>Essential cookies:</strong> Required for the website to function properly.
                                    These cannot be disabled.
                                </li>
                                <li>
                                    <strong>Analytics cookies:</strong> Help us understand how visitors interact with
                                    our website by collecting anonymous data.
                                </li>
                                <li>
                                    <strong>Preference cookies:</strong> Allow the website to remember choices you make,
                                    such as your language or region.
                                </li>
                            </ul>

                            <h2 className="font-display text-2xl text-[var(--color-navy)]">Managing Cookies</h2>
                            <p>
                                You can control and manage cookies through your browser settings. Please note that
                                disabling certain cookies may affect the functionality of our website.
                            </p>

                            <h2 className="font-display text-2xl text-[var(--color-navy)]">Changes to This Policy</h2>
                            <p>
                                We may update this Cookie Policy from time to time. Any changes will be posted on this
                                page with an updated revision date.
                            </p>

                            <h2 className="font-display text-2xl text-[var(--color-navy)]">Contact Us</h2>
                            <p>
                                If you have questions about our use of cookies, please contact us at{' '}
                                <a href={`mailto:${SITE.email}`} className="text-[var(--color-bronze)] underline hover:text-[var(--color-navy)] transition-colors">
                                    {SITE.email}
                                </a>.
                            </p>
                        </div>

                        <div className="mt-12 pt-8 border-t border-[var(--color-navy)]/10">
                            <Link
                                to="/"
                                className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[var(--color-navy)] border-b border-[var(--color-navy)]/30 hover:border-[var(--color-navy)] pb-0.5 transition-colors duration-300"
                            >
                                &larr; Back to Home
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default CookiePolicy;
