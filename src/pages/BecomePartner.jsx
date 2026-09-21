import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const heroImage = '/images/home/India-hero-image.webp';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';
import BecomePartnerForm from '../components/forms/BecomePartnerForm';
import { PageTransition, Rise } from '../components/editorial';

const DIFFERENTIATORS = [
    {
        number: '01',
        title: 'Destination-Led Planning',
        body: 'Programmes begin with the place, not the price list. Local teams in every destination — embedded partners who know every road and relationship.',
    },
    {
        number: '02',
        title: 'Tailor-Made Programmes',
        body: 'Every itinerary is built from scratch. No templates, no shortcuts — your clients get a journey designed exclusively for them.',
    },
    {
        number: '03',
        title: 'Responsive Communication',
        body: 'One trade desk, one business day. A single point of contact who knows your business, from first brief to final transfer.',
    },
    {
        number: '04',
        title: 'Operational Precision',
        body: 'Meticulous planning and on-call ground support — the kind of detail only an on-the-ground operator can provide.',
    },
];

const SUPPORT = [
    { title: 'Net & Trade Pricing', description: 'Transparent rates designed for tour operators and travel agencies.' },
    { title: 'Ground Support', description: 'On-call operations team during every trip — your clients are never alone.' },
    { title: 'Co-branded Materials', description: 'Custom itineraries, PDFs and proposals under your brand.' },
    { title: 'Dedicated Partner Manager', description: 'A single point of contact who knows your business.' },
];

const PARTNER_TYPES = [
    'Tour Operators',
    'Travel Agencies',
    'Inbound DMCs',
    'MICE Planners',
    'Luxury Concierge',
    'Corporate Travel',
];

const BecomePartner = () => (
    <PageTransition>
        <div className="w-full bg-white">
            <Seo {...PAGE_META['/become-a-partner']} path="/become-a-partner" noIndex />

            {/* ── Arrival: full-bleed partnership hero ── */}
            <section className="relative w-full h-[50vh] md:h-[65vh] lg:min-h-screen flex items-center overflow-hidden">
                <img
                    src={heroImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-[var(--color-navy-deep)]/55" aria-hidden="true" />
                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="eyebrow text-[var(--color-gold)]/80 mb-5">Partnership</p>
                        <h1 className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.94] tracking-[-0.03em] text-white mb-6">
                            A ground partner
                            <span className="block italic text-[var(--color-gold)]">for the trade.</span>
                        </h1>
                        <p className="font-body text-white/50 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
                            Asian Star Travel works behind the scenes with travel agencies, tour operators
                            and OTAs — so you sell Asia with a dependable operator on the ground.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#partner-form" className="btn btn--md btn--gold">
                                Apply to Partner
                            </a>
                            <Link to="/request-quote" className="btn btn--md btn--outline-white">
                                Request a Quote
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Why Asian Star Travel — the four differentiators as a ledger ── */}
            <section className="w-full bg-[var(--color-ivory)] py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <Rise className="max-w-3xl mb-16 lg:mb-20">
                        <p className="eyebrow mb-5">Why Asian Star Travel</p>
                        <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-[-0.03em] text-[var(--color-navy)] mb-8">
                            Four reasons partners{' '}
                            <span className="italic text-[var(--color-gold)]">stay with us.</span>
                        </h2>
                        <p className="font-body text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed">
                            One DMC across India, Vietnam, Japan and South Korea — so you sell more with
                            fewer partners, with dedicated support behind every quote.
                        </p>
                    </Rise>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
                        {DIFFERENTIATORS.map((item, index) => (
                            <Rise key={item.number} delay={index * 0.08}>
                                <div className="border-t border-[var(--color-border-subtle)] py-10 lg:py-12">
                                    <span className="text-[var(--color-gold)]/60 text-[11px] font-semibold tracking-[0.2em] block mb-5">
                                        {item.number}
                                    </span>
                                    <h3 className="font-display text-2xl sm:text-3xl text-[var(--color-navy)] mb-4 leading-[1.1]">
                                        {item.title}
                                    </h3>
                                    <p className="font-body text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed max-w-md">
                                        {item.body}
                                    </p>
                                </div>
                            </Rise>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Who we work with + How we support — navy chapter ── */}
            <section className="w-full bg-[var(--color-navy)] py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <Rise className="mb-14 lg:mb-16">
                        <p className="eyebrow text-[var(--color-gold)]/70 mb-4">How We Support Partners</p>
                        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-white">
                            Built around how the trade works.
                        </h2>
                    </Rise>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        <Rise className="lg:col-span-5">
                            <h3 className="font-display text-lg text-white/60 mb-6">Who we work with</h3>
                            <ul className="border-t border-white/10">
                                {PARTNER_TYPES.map((type) => (
                                    <li key={type} className="border-b border-white/10 py-4 flex items-baseline gap-4">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]/50 shrink-0" aria-hidden="true" />
                                        <span className="font-display text-lg sm:text-xl text-white/85">{type}</span>
                                    </li>
                                ))}
                            </ul>
                        </Rise>

                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-12">
                            {SUPPORT.map((item, index) => (
                                <Rise key={item.title} delay={index * 0.08}>
                                    <h3 className="font-display text-xl sm:text-2xl text-white mb-3 leading-[1.15]">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/35 text-sm sm:text-base leading-relaxed font-body">
                                        {item.description}
                                    </p>
                                </Rise>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── What to expect — four-step strip ── */}
            <section className="w-full bg-[var(--color-cream)] py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <Rise className="mb-12">
                        <p className="eyebrow mb-4">What to Expect</p>
                        <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)]">
                            From application to first proposal.
                        </h2>
                    </Rise>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                        {[
                            { step: '01', title: 'Apply below', text: 'Tell us about your business and the destinations you sell.' },
                            { step: '02', title: 'We reply within one business day', text: 'A conversation with our trade desk — not a generic email.' },
                            { step: '03', title: 'Trade terms agreed', text: 'Net rates and working terms, shared clearly.' },
                            { step: '04', title: 'Send your first brief', text: 'Receive a tailored proposal with net or trade pricing.' },
                        ].map((item, index) => (
                            <Rise key={item.step} delay={index * 0.08}>
                                <div className="border-t border-[var(--color-navy)]/15 pt-6">
                                    <span className="text-[var(--color-gold)]/60 text-[11px] font-semibold tracking-[0.2em] block mb-3">
                                        {item.step}
                                    </span>
                                    <h3 className="font-display text-lg text-[var(--color-navy)] mb-2 leading-snug">{item.title}</h3>
                                    <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.text}</p>
                                </div>
                            </Rise>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Partner application form ── */}
            <section id="partner-form" className="w-full bg-white py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12 scroll-mt-24">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    <Rise className="lg:col-span-5">
                        <p className="eyebrow mb-4">Partner Application</p>
                        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)] mb-6">
                            Apply to work with us.
                        </h2>
                        <p className="font-body text-[var(--color-text-secondary)] text-base leading-relaxed mb-8 max-w-md">
                            Tell us about your business. Our trade desk reviews every application and
                            responds within one business day.
                        </p>
                        <div className="bg-[var(--color-champagne)] p-5 max-w-md">
                            <p className="text-sm text-[var(--color-navy)]/80 leading-relaxed">
                                Already a partner? Your account manager can help — or use the{' '}
                                <Link to="/request-quote" className="underline hover:text-[var(--color-gold)] transition-colors">
                                    request-a-quote form
                                </Link>{' '}
                                to send new business.
                            </p>
                        </div>
                    </Rise>

                    <Rise delay={0.1} className="lg:col-span-7">
                        <div className="bg-white border border-[var(--color-border-subtle)] shadow-xl p-6 md:p-10">
                            <BecomePartnerForm />
                        </div>
                    </Rise>
                </div>
            </section>
        </div>
    </PageTransition>
);

export default BecomePartner;
