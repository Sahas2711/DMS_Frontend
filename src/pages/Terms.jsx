import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import StarIcon from '../components/icons/StarIcon';
import { PAGE_META, SITE } from '../config/site';

/**
 * Structural starting point for the site Terms of Use — this is not legal
 * advice. Have counsel review before launch (same approach as the privacy page).
 */
const SECTIONS = [
    {
        heading: 'Acceptance of these terms',
        body: [
            'These terms govern your use of the Asian Star Travel website and the services described on it. By using the website you accept these terms in full.',
        ],
    },
    {
        heading: 'A B2B travel platform',
        body: [
            'This website serves travel agents, agencies, tour operators and other travel trade partners. It markets destination management services across India, Vietnam, Japan and South Korea.',
            'Nothing on this website is an offer or contract for travel services until we confirm a proposal in writing.',
        ],
    },
    {
        heading: 'Quotations and bookings',
        body: [
            'A request for a quote is not a booking. Quotations are prepared on the information provided and may change if requirements, dates or availability change before confirmation.',
            'Bookings are only confirmed once we issue written confirmation and, where agreed, receive the relevant payment or deposit.',
        ],
    },
    {
        heading: 'Your information',
        body: [
            'By submitting a form on this website you confirm the details are accurate. Our use of your information is described in the Privacy Policy.',
        ],
    },
    {
        heading: 'Website availability',
        body: [
            'We aim to keep this website available at all times, but we do not guarantee uninterrupted access. We may update or change the content, services and pricing shown on the website at any time.',
        ],
    },
    {
        heading: 'Liability',
        body: [
            'To the fullest extent permitted by law, we are not liable for indirect or consequential loss arising from your use of this website. Nothing in these terms limits liability that cannot be limited by law.',
        ],
    },
    {
        heading: 'Governing law',
        body: [
            'These terms are governed by the laws of the Socialist Republic of Vietnam, and the parties submit to the exclusive jurisdiction of its courts.',
        ],
    },
    {
        heading: 'Contact',
        body: [
            `Questions about these terms can be sent to ${SITE.email}.`,
        ],
    },
];

const Terms = () => (
    <>
        <Seo {...PAGE_META['/terms']} path="/terms" />

        <section className="w-full bg-navy py-20 md:py-28 px-6">
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
                <StarIcon />
                <h1 className="text-white text-3xl md:text-5xl font-serif tracking-wide mb-6">
                    Terms of Use
                </h1>
                <div className="w-24 h-px bg-gold" aria-hidden="true" />
            </div>
        </section>

        <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12">
            <div className="max-w-3xl mx-auto">
                {SECTIONS.map((section) => (
                    <div key={section.heading} className="mb-12 last:mb-0">
                        <h2 className="text-navy text-xl md:text-2xl font-serif mb-4">
                            {section.heading}
                        </h2>
                        {section.body.map((paragraph) => (
                            <p key={paragraph} className="text-steel leading-relaxed mb-4 last:mb-0">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                ))}

                <p className="mt-16 pt-8 border-t border-stone text-sm text-steel">
                    Last updated: {new Date().getFullYear()} · Also see the{' '}
                    <Link to="/privacy-policy" className="text-navy underline hover:text-bronze">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </section>
    </>
);

export default Terms;
