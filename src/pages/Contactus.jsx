import { motion } from 'framer-motion';
const heroImage = '/images/contactus/Contactus-hero-image.webp';
const mapImage = '/images/contactus/map-image-contactus.webp';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';
import ContactForm from '../components/forms/ContactForm';
import { PageTransition, Rise } from '../components/editorial';

const CHANNELS = [
    {
        tag: '01',
        label: 'WhatsApp',
        value: '+84 933 128 766',
        note: 'Fastest response',
        link: 'https://wa.me/84933128766',
    },
    {
        tag: '02',
        label: 'Messenger',
        value: '@asianstartravel.vn',
        note: 'Social concierge',
        link: 'https://m.me/asianstartravel.vn',
    },
    {
        tag: '03',
        label: 'Direct Hotline',
        value: '1900 272 716 / +84 24 3828 9999',
        note: 'Voice consultation',
        link: 'tel:+842438289999',
    },
];

const OFFICES = [
    {
        code: 'SGN',
        coords: 'LAT 10.8231° N / LON 106.6297° E',
        name: 'Ho Chi Minh City — Regional Office',
        scope: 'Mekong Delta & South Vietnam operations',
        address: 'Floor 7, 4 Nguyen Thi Minh Khai St., Sai Gon Ward, District 1, Ho Chi Minh City',
        phone: '+84 777 302 220',
        tel: 'tel:+84777302220',
    },
    {
        code: 'HAN',
        coords: 'LAT 21.0285° N / LON 105.8542° E',
        name: 'Hanoi — Central Headquarters',
        scope: 'Northern Vietnam & Ha Long fleet dispatch',
        address: '141 Nguyen Van Cu St., Bo De Ward, Long Bien District, Ha Noi',
        phone: '+84 24 3828 9999',
        tel: 'tel:+842438289999',
    },
];

const Contactus = () => (
    <PageTransition>
        <div className="w-full bg-white">
            <Seo {...PAGE_META['/contact']} path="/contact" />

            {/* ── Arrival ── */}
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
                        <p className="eyebrow text-[var(--color-gold)]/80 mb-5">Contact</p>
                        <h1 className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.94] tracking-[-0.03em] text-white mb-6">
                            Talk to the team
                            <span className="block italic text-[var(--color-gold)]">on the ground.</span>
                        </h1>
                        <p className="font-body text-white/50 text-base sm:text-lg leading-relaxed max-w-xl">
                            FIT, groups, MICE, partnerships — our specialists are one message away.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Instant channels ── */}
            <section className="w-full bg-[var(--color-ivory)] py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <Rise className="max-w-2xl mb-14">
                        <p className="eyebrow mb-4">Instant Connections</p>
                        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)]">
                            Need help planning a journey?
                        </h2>
                    </Rise>

                    <div className="border-t border-[var(--color-border-subtle)]">
                        {CHANNELS.map((channel, index) => (
                            <Rise key={channel.tag} delay={index * 0.06}>
                                <a
                                    href={channel.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 border-b border-[var(--color-border-subtle)] py-7"
                                >
                                    <span className="text-[var(--color-gold)]/60 text-[11px] font-semibold tracking-[0.2em] sm:w-12">
                                        {channel.tag}
                                    </span>
                                    <span className="font-display text-xl sm:text-2xl text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors duration-300 sm:w-56 shrink-0">
                                        {channel.label}
                                    </span>
                                    <span className="font-body text-base sm:text-lg text-[var(--color-navy)]/80 group-hover:text-[var(--color-navy)] transition-colors">
                                        {channel.value}
                                    </span>
                                    <span className="sm:ml-auto text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--color-text-muted)]">
                                        {channel.note}
                                    </span>
                                    <span
                                        className="hidden sm:block text-[var(--color-navy)]/30 group-hover:text-[var(--color-gold)] group-hover:translate-x-1 transition-all duration-300"
                                        aria-hidden="true"
                                    >
                                        →
                                    </span>
                                </a>
                            </Rise>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Direct contacts + enquiry form ── */}
            <section className="w-full bg-white py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12 border-t border-[var(--color-border-subtle)]">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    <Rise className="lg:col-span-5">
                        <p className="eyebrow mb-4">Immediate Concierge</p>
                        <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)] mb-6">
                            Prefer to reach us directly?
                        </h2>
                        <p className="font-body text-[var(--color-text-secondary)] text-base leading-relaxed mb-10 max-w-md">
                            Speak with a destination specialist for immediate inquiries, custom
                            itineraries or group programmes.
                        </p>

                        <dl className="space-y-8">
                            <div className="border-t border-[var(--color-border-subtle)] pt-6">
                                <dt className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-2">
                                    Direct Email
                                </dt>
                                <dd>
                                    <a
                                        href="mailto:nikhil@asianstartravels.com"
                                        className="font-display text-lg text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors"
                                    >
                                        nikhil@asianstartravels.com
                                    </a>
                                    <span className="block text-sm text-[var(--color-text-secondary)] mt-1">
                                        Concierge &amp; custom itinerary inquiries
                                    </span>
                                </dd>
                            </div>

                            <div className="border-t border-[var(--color-border-subtle)] pt-6">
                                <dt className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-2">
                                    VIP Assistance
                                </dt>
                                <dd>
                                    <a
                                        href="tel:+919930524949"
                                        className="font-display text-lg text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-colors"
                                    >
                                        +91 99305 24949
                                    </a>
                                    <span className="block text-sm text-[var(--color-text-secondary)] mt-1">
                                        On-duty manager during every trip
                                    </span>
                                </dd>
                            </div>

                            <div className="border-t border-[var(--color-border-subtle)] pt-6">
                                <dt className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-2">
                                    Offices
                                </dt>
                                <dd className="space-y-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                    <p>
                                        <span className="block text-[var(--color-navy)] font-medium">Ho Chi Minh City</span>
                                        No. 4 Nguyen Thi Minh Khai Street, Sai Gon Ward, Ho Chi Minh City
                                    </p>
                                    <p>
                                        <span className="block text-[var(--color-navy)] font-medium">Hanoi</span>
                                        No. 141 Nguyen Van Cu Street, Bo De Ward, Ha Noi City
                                    </p>
                                    <p>
                                        <span className="block text-[var(--color-navy)] font-medium">Mumbai</span>
                                        601 Rose Mary House, Lady Jamshedji 2nd X Road, Mumbai, Maharashtra 400016
                                        <span className="block mt-1">+91 99305 24949</span>
                                    </p>
                                </dd>
                            </div>

                            <div className="border-t border-[var(--color-border-subtle)] pt-6">
                                <dt className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-2">
                                    Hours
                                </dt>
                                <dd className="text-sm text-[var(--color-text-secondary)]">
                                    Mon – Sat: 08:30 – 18:00 (GMT+7)
                                </dd>
                            </div>
                        </dl>

                        <div className="mt-10 bg-[var(--color-champagne)] p-5">
                            <p className="text-xs text-[var(--color-navy)]/80 leading-relaxed">
                                Licensed international tour operator — No. 01-2873/2025/CDLQGVN-GP LHQT.
                                Your details are used only to respond to your inquiry.
                            </p>
                        </div>
                    </Rise>

                    <Rise delay={0.1} className="lg:col-span-7">
                        <div className="bg-[var(--color-ivory)] border border-[var(--color-border-subtle)] shadow-xl p-6 md:p-10">
                            <p className="eyebrow mb-3">Bespoke Inquiry</p>
                            <h2 className="font-display text-2xl md:text-3xl text-[var(--color-navy)] mb-2">
                                Tell us about your trip
                            </h2>
                            <p className="text-sm text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                                Complete the inquiry details below. We tailor every itinerary around your
                                pace, preferences and travel style.
                            </p>
                            <ContactForm />
                        </div>
                    </Rise>
                </div>
            </section>

            {/* ── Offices — coordinates chapter ── */}
            <section className="relative w-full overflow-hidden">
                <img
                    src={mapImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-[var(--color-navy-deep)]/80" aria-hidden="true" />

                <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36">
                    <Rise className="mb-12">
                        <p className="eyebrow text-[var(--color-gold)]/70 mb-4">Physical Presence</p>
                        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-white">
                            Where you'll find us.
                        </h2>
                    </Rise>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {OFFICES.map((office, index) => (
                            <Rise key={office.code} delay={index * 0.1}>
                                <article className="h-full bg-white/[0.04] backdrop-blur-md border border-white/10 p-7 sm:p-8 flex flex-col">
                                    <div className="flex items-baseline justify-between gap-4 mb-5">
                                        <span className="font-mono text-[11px] tracking-[0.15em] text-[var(--color-gold)]/80 uppercase">
                                            {office.coords}
                                        </span>
                                        <span className="text-[10px] font-semibold tracking-[0.2em] text-white/40">
                                            {office.code} DESK
                                        </span>
                                    </div>
                                    <h3 className="font-display text-xl sm:text-2xl text-white mb-2 leading-[1.15]">
                                        {office.name}
                                    </h3>
                                    <p className="text-xs text-white/40 mb-5">{office.scope}</p>
                                    <p className="text-sm text-white/60 leading-relaxed mb-6">{office.address}</p>
                                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                                        <span className="text-xs text-white/40">Direct call</span>
                                        <a
                                            href={office.tel}
                                            className="font-display text-base text-white hover:text-[var(--color-gold)] transition-colors"
                                        >
                                            {office.phone}
                                        </a>
                                    </div>
                                </article>
                            </Rise>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Closing strip ── */}
            <section className="w-full bg-[var(--color-cream)] py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12">
                <div className="max-w-[1400px] mx-auto text-center">
                    <Rise>
                        <p className="eyebrow mb-4 justify-center">Peace of Mind</p>
                        <p className="font-display text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.1] tracking-[-0.02em] text-[var(--color-navy)] max-w-2xl mx-auto italic">
                            "Handling every detail locally, from the first inquiry to the final departure."
                        </p>
                    </Rise>
                </div>
            </section>
        </div>
    </PageTransition>
);

export default Contactus;
