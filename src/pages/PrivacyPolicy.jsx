import Seo from '../components/Seo';
import StarIcon from '../components/icons/StarIcon';
import { PAGE_META, SITE } from '../config/site';

/**
 * IMPORTANT: this is a structural starting point, not legal advice. The
 * sections below describe the data this frontend actually collects (enquiry and
 * booking form fields, the app_language preference, and the Google Translate
 * cookie). Have counsel review and complete the bracketed items before launch.
 */
const SECTIONS = [
    {
        heading: 'Who we are',
        body: [
            `${SITE.name} is a global B2B destination management company. When we refer to "we", "us" or "our" in this policy, we mean ${SITE.name}.`,
            `You can reach us about anything in this policy at ${SITE.email}.`,
        ],
    },
    {
        heading: 'Information we collect',
        body: [
            'When you submit an enquiry or booking form on this website, we collect the details you provide: your name, email address, telephone number, country, travel dates, number of travellers, flight details, service preferences and any message or special requests you include.',
            'We do not collect payment card details through this website. Payments, where applicable, are handled by our payment provider, and card data is never stored on our servers.',
            'We store your chosen display language in your browser so the site remembers it on your next visit.',
        ],
    },
    {
        heading: 'How we use your information',
        body: [
            'We use the information you provide to respond to your enquiry, prepare quotations and itineraries, arrange the services you book, and contact you about your travel arrangements.',
            'We will only send you marketing communications if you have asked to receive them, and you can opt out at any time.',
        ],
    },
    {
        heading: 'Cookies and third-party services',
        body: [
            'This website uses Google Translate to offer the site in additional languages. When you select a language, a preference cookie is set and your page content is sent to Google for translation. Google processes this data under its own privacy policy.',
            'We use cookies and similar browser storage that are necessary for the site to function and to remember your preferences.',
            'If analytics is configured on this site, it is loaded only after you accept our cookie banner, and it is used to understand aggregate site usage. It is never loaded before you consent.',
        ],
    },
    {
        heading: 'Sharing your information',
        body: [
            'To deliver the services you book we may share the necessary details with our operational partners, such as hotels, transport providers, guides and airport service teams.',
            'We do not sell your personal information.',
        ],
    },
    {
        heading: 'Data retention',
        body: [
            'We keep enquiry and booking records for as long as needed to provide our services and to meet our legal, accounting and tax obligations.',
        ],
    },
    {
        heading: 'Your rights',
        body: [
            'You may request access to the personal information we hold about you, ask us to correct it, or ask us to delete it where we are not required to keep it.',
            `To make a request, contact us at ${SITE.email}.`,
        ],
    },
    {
        heading: 'Changes to this policy',
        body: [
            'We may update this policy from time to time. The date below shows when it was last revised.',
        ],
    },
];

const PrivacyPolicy = () => (
    <>
        <Seo {...PAGE_META['/privacy-policy']} path="/privacy-policy" />

        <section className="w-full bg-navy py-20 md:py-28 px-6">
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
                <StarIcon />
                <h1 className="text-white text-3xl md:text-5xl font-serif tracking-wide mb-6">
                    Privacy Policy
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
                    Last updated: {new Date().getFullYear()}
                </p>
            </div>
        </section>
    </>
);

export default PrivacyPolicy;
