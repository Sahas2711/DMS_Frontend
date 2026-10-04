import { Link } from 'react-router-dom';

import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';

const heroImage = '/images/aboutus/Aboutus-hero-image.webp';

const tailorMadeImg = '/images/aboutus/Tailor-Made-Tours.webp';
const privateTransfersImg = '/images/aboutus/Private-Transfers.webp';
const airportFastTrackImg = '/images/aboutus/Airport-Fast-Track.webp';
const groundServicesImg = '/images/aboutus/Ground-Services.webp';

const groundSupportCTAImg ='/images/aboutus/LAnding_page_2.webp';


/* =========================================================
   CORE SERVICES
========================================================= */

const CORE_SERVICES = [
    {
        title: 'Tailor-Made Tours',
        description:
            'Private itineraries designed around your clients’ pace, interests and travel dates — never off-the-shelf.',
        image: tailorMadeImg,
        link: '/tours',
        cta: 'Explore Tours',
        tag: 'FIT & COUPLES',
    },
    {
        title: 'Private Transfers',
        description:
            'Private cars with professional local drivers between every destination — comfortable and on time.',
        image: privateTransfersImg,
        link: '/request-quote',
        tag: 'LOGISTICS',
    },
    {
        title: 'Airport Fast Track',
        description:
            'Expedited immigration and VIP assistance on arrival and departure — a seamless experience for your clients.',
        image: airportFastTrackImg,
        link: '/request-quote',
        tag: 'VIP ASSISTANCE',
    },
    {
        title: 'Ground Services',
        description:
            'End-to-end destination handling for agencies and tour operators — confirmed, dependable, local.',
        image: groundServicesImg,
        link: '/become-a-partner',
        cta: 'Become a Partner',
        tag: 'DMC OPERATIONS',
    },
];


/* =========================================================
   REQUEST PROCESS
========================================================= */

const REQUEST_STEPS = [
    {
        title: 'Send the brief',
        description:
            'Tell us dates, destination, travellers and hotel tier.',
    },
    {
        title: 'Receive the proposal',
        description:
            'A tailored itinerary with net or trade pricing within one business day.',
    },
    {
        title: 'Refine together',
        description:
            'Adjust hotels, pace and inclusions until it is ready for your client.',
    },
    {
        title: 'We operate it',
        description:
            'Licensed local handling from confirmation to the final transfer.',
    },
];


/* =========================================================
   SERVICES PAGE
========================================================= */

const Services = () => (
    <div className="w-full overflow-hidden bg-white">

        <Seo
            {...PAGE_META['/services']}
            path="/services"
            image={heroImage}
        />


        {/* =====================================================
            HERO
        ====================================================== */}

        <PageHero
            image={heroImage}
            alt=""
            title="Services"
            eyebrow="Everything we operate for your clients"
            uppercase
        />


        {/* =====================================================
            INTRO
        ====================================================== */}

        <section className="w-full bg-white px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-20">

            <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">

                {/* LEFT */}
                <div className="flex flex-col text-left lg:col-span-7">

                    <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-bronze md:text-[11px]">
                        OUR SERVICES
                    </span>

                    <h2 className="mb-5 max-w-3xl font-display text-[clamp(2rem,4vw,3.4rem)] leading-[0.98] tracking-[-0.03em] text-navy">
                        The ground services behind every great itinerary
                    </h2>

                    <p className="mb-6 max-w-2xl text-sm leading-relaxed text-steel md:text-base">
                        From tailor-made tour design to airport fast track
                        and private transfers, our local teams handle every
                        detail across India, Vietnam, Japan and South Korea —
                        so your clients only feel the difference.
                    </p>

                    <div className="flex flex-wrap gap-4">

                        <Link
                            to="/tours"
                            className="
                                inline-flex
                                min-h-[48px]
                                items-center
                                justify-center
                                border
                                border-[var(--color-navy)]
                                bg-transparent
                                px-7
                                py-3.5
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-[var(--color-navy)]
                                no-underline
                                transition-all
                                duration-300
                                hover:bg-[var(--color-navy)]
                                hover:text-white
                            "
                        >
                            Browse Tours
                            <span className="ml-3 text-sm">
                                →
                            </span>
                        </Link>

                    </div>

                </div>


                {/* RIGHT */}
                <div className="rounded-3xl border border-gray-100 bg-cream p-7 text-left sm:p-8 lg:col-span-5 lg:p-9">

                    <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.2em] text-bronze md:text-[11px]">
                        HOW TO WORK WITH US
                    </span>

                    <ol className="flex flex-col gap-5">

                        {REQUEST_STEPS.map((step, index) => (

                            <li
                                key={step.title}
                                className="flex gap-4"
                            >

                                <span
                                    className="
                                        flex
                                        h-7
                                        w-7
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-[var(--color-gold)]/40
                                        text-[10px]
                                        font-semibold
                                        text-[var(--color-bronze)]
                                    "
                                >
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                <div>

                                    <h3 className="mb-1 text-sm font-bold text-navy">
                                        {step.title}
                                    </h3>

                                    <p className="text-xs leading-relaxed text-steel">
                                        {step.description}
                                    </p>

                                </div>

                            </li>

                        ))}

                    </ol>

                </div>

            </div>

        </section>


        {/* =====================================================
            TRAVEL ON YOUR TERMS
        ====================================================== */}

        <section className="w-full bg-[var(--color-ivory)] px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-20">

            <div className="mx-auto max-w-[1400px]">

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-7">

                        <p className="eyebrow mb-4">
                            Travel on your terms
                        </p>

                        <h2
                            className="
                                max-w-3xl
                                font-display
                                text-[clamp(2rem,4vw,3.6rem)]
                                leading-[0.95]
                                tracking-[-0.03em]
                                text-[var(--color-navy)]
                            "
                        >
                            Built around your
                            <br />
                            <span className="italic text-[var(--color-gold)]">
                                itinerary, not a template.
                            </span>
                        </h2>

                        <p
                            className="
                                mt-6
                                max-w-2xl
                                text-base
                                leading-relaxed
                                text-[var(--color-text-secondary)]
                            "
                        >
                            Whether you are travelling with family,
                            coordinating an executive delegation, or
                            protecting a short connection, we align the
                            service plan to your flight and airport.
                        </p>

                    </div>


                    {/* RIGHT PROCESS */}
                    <div className="lg:col-span-5">

                        <div className="space-y-6">

                            <div className="border-t border-[var(--color-border-subtle)] pt-5">

                                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-bronze)]">
                                    01
                                </p>

                                <h3 className="mb-2 font-display text-xl text-[var(--color-navy)]">
                                    Share the flight details
                                </h3>

                                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                                    Arrival, departure, passengers, baggage,
                                    and special requests.
                                </p>

                            </div>


                            <div className="border-t border-[var(--color-border-subtle)] pt-5">

                                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-bronze)]">
                                    02
                                </p>

                                <h3 className="mb-2 font-display text-xl text-[var(--color-navy)]">
                                    Receive a tailored service plan
                                </h3>

                                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                                    We confirm what is available at your
                                    airport and coordinate the timing.
                                </p>

                            </div>


                            <div className="border-t border-[var(--color-border-subtle)] pt-5">

                                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-bronze)]">
                                    03
                                </p>

                                <h3 className="mb-2 font-display text-xl text-[var(--color-navy)]">
                                    Meet your concierge on the day
                                </h3>

                                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                                    Your host tracks the flight and stays
                                    with you through the agreed journey.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* GLOBAL COVERAGE */}

                <div className="mt-14 border-t border-[var(--color-border-subtle)] pt-10">

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">

                        {/* COVERAGE INTRO */}
                        <div className="lg:col-span-5">

                            <p className="eyebrow mb-4">
                                Global coverage
                            </p>

                            <h2
                                className="
                                    font-display
                                    text-[clamp(1.8rem,3.5vw,3rem)]
                                    leading-[0.98]
                                    tracking-[-0.025em]
                                    text-[var(--color-navy)]
                                "
                            >
                                Support where your
                                <br />
                                journey takes you.
                            </h2>

                            <p className="mt-5 max-w-lg text-sm leading-relaxed text-[var(--color-text-secondary)]">
                                Services vary by airport. We will always
                                confirm the exact support available before
                                booking.
                            </p>

                        </div>


                        {/* COVERAGE CARDS */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:col-span-7">

                            <div className="border-t border-[var(--color-border-subtle)] pt-5">

                                <div className="mb-4 text-[var(--color-bronze)]">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="8"
                                        />
                                        <path d="M12 8v4l3 2" />
                                    </svg>
                                </div>

                                <h3 className="mb-2 font-display text-lg text-[var(--color-navy)]">
                                    Southeast Asia
                                </h3>

                                <p className="text-sm text-[var(--color-text-secondary)]">
                                    Singapore • Bangkok • Ho Chi Minh City
                                </p>

                            </div>


                            <div className="border-t border-[var(--color-border-subtle)] pt-5">

                                <div className="mb-4 text-[var(--color-bronze)]">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="8"
                                        />
                                        <path d="M8 12h8M12 8v8" />
                                    </svg>
                                </div>

                                <h3 className="mb-2 font-display text-lg text-[var(--color-navy)]">
                                    Middle East
                                </h3>

                                <p className="text-sm text-[var(--color-text-secondary)]">
                                    Dubai • Doha • Abu Dhabi
                                </p>

                            </div>


                            <div className="border-t border-[var(--color-border-subtle)] pt-5">

                                <div className="mb-4 text-[var(--color-bronze)]">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.4"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="8"
                                        />
                                        <path d="M7 12h10" />
                                    </svg>
                                </div>

                                <h3 className="mb-2 font-display text-lg text-[var(--color-navy)]">
                                    Europe
                                </h3>

                                <p className="text-sm text-[var(--color-text-secondary)]">
                                    London
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>


        {/* =====================================================
            SERVICE CARDS
        ====================================================== */}

        <section className="w-full border-t border-gray-100/80 bg-ivory px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

            <div className="mx-auto w-full max-w-[1400px]">

                <div className="mb-10 flex flex-col items-start text-left">

                    <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-bronze md:text-[11px]">
                        WHAT WE DO
                    </span>

                    <h2
                        className="
                            font-display
                            text-[clamp(2rem,4vw,3.4rem)]
                            leading-[0.98]
                            tracking-[-0.03em]
                            text-navy
                        "
                    >
                        Services we operate for travel agents
                    </h2>

                </div>


                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    {CORE_SERVICES.map((service) => (

                        <div
                            key={service.title}
                            className="
                                flex
                                flex-col
                                overflow-hidden
                                rounded-3xl
                                border
                                border-gray-100
                                bg-white
                                shadow-sm
                            "
                        >

                            {/* IMAGE */}

                            <div className="relative h-56 overflow-hidden bg-[var(--color-cream)]">

                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                        transition-transform
                                        duration-700
                                        hover:scale-105
                                    "
                                    loading="lazy"
                                    decoding="async"
                                />

                                <span
                                    className="
                                        absolute
                                        left-4
                                        top-4
                                        rounded-full
                                        bg-[var(--color-navy)]/85
                                        px-3
                                        py-1.5
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.18em]
                                        text-white
                                        backdrop-blur-sm
                                    "
                                >
                                    {service.tag}
                                </span>

                            </div>


                            {/* CARD CONTENT */}

                            <div className="flex flex-grow flex-col p-6 text-left md:p-8">

                                <h3 className="mb-2.5 font-display text-xl font-normal text-navy">
                                    {service.title}
                                </h3>

                                <p className="mb-6 flex-grow text-sm leading-relaxed text-steel">
                                    {service.description}
                                </p>


                                {service.cta && (

                                    <Link
                                        to={service.link}
                                        className="
                                            inline-flex
                                            min-h-[44px]
                                            w-fit
                                            items-center
                                            justify-center
                                            bg-[var(--color-gold)]
                                            px-6
                                            py-3
                                            text-[10px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.18em]
                                            text-[var(--color-navy)]
                                            no-underline
                                            transition-all
                                            duration-300
                                            hover:bg-[var(--color-gold-light)]
                                            hover:shadow-md
                                        "
                                    >
                                        {service.cta}

                                        <span
                                            className="ml-3 text-sm"
                                            aria-hidden="true"
                                        >
                                            →
                                        </span>

                                    </Link>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>


        {/* =====================================================
            GROUND SUPPORT CTA
        ====================================================== */}

<section
    className="relative w-full overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    style={{
        backgroundImage: `url(${groundSupportCTAImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }}
>
    {/* Light overlay so text remains readable */}
    <div
        aria-hidden="true"
        className="absolute inset-0 bg-[var(--color-ivory)]/65"
    />

    <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="max-w-3xl">

            <p className="eyebrow mb-4 text-[var(--color-bronze)]">
                Ground Support
            </p>

            <h2
                className="
                    max-w-2xl
                    font-display
                    text-[clamp(2.2rem,5vw,4.2rem)]
                    leading-[0.92]
                    tracking-[-0.03em]
                    text-[var(--color-navy)]
                "
            >
                Arrive &amp; Depart
                <br />
                <span className="italic text-[var(--color-gold)]">
                    Without the Stress
                </span>
            </h2>

            <p
                className="
                    mt-6
                    max-w-xl
                    text-base
                    leading-relaxed
                    text-[var(--color-text-secondary)]
                    sm:text-lg
                "
            >
                Let our airport team handle the details while you focus
                on your journey.
            </p>

            <div className="mt-8">
                <Link
                    to="/request-quote"
                    className="
                        inline-flex
                        min-h-[48px]
                        items-center
                        justify-center
                        bg-[var(--color-navy)]
                        px-7
                        py-3.5
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-white
                        no-underline
                        transition-all
                        duration-300
                        hover:bg-[var(--color-navy-light)]
                    "
                >
                    Request Ground Support

                    <span className="ml-3 text-sm" aria-hidden="true">
                        →
                    </span>
                </Link>
            </div>

        </div>
    </div>
</section>


        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <section className="w-full bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

            <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-6 md:grid-cols-2">

                {/* REQUEST QUOTE */}

                <div className="rounded-3xl bg-[var(--color-navy)] p-7 text-left sm:p-9">

                    <h3 className="mb-3 font-display text-2xl font-normal text-white md:text-3xl">
                        Ready to request a quote?
                    </h3>

                    <p className="mb-7 max-w-md text-sm leading-relaxed text-gray-300">
                        Send the brief with dates, destination, travellers
                        and hotel tier.
                    </p>

                    <Link
                        to="/request-quote"
                        className="
                            inline-flex
                            min-h-[48px]
                            w-fit
                            items-center
                            justify-center
                            bg-[var(--color-gold)]
                            px-7
                            py-3.5
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-[var(--color-navy)]
                            no-underline
                            transition-all
                            duration-300
                            hover:bg-[var(--color-gold-light)]
                        "
                    >
                        Request a Quote

                        <span className="ml-3 text-sm">
                            →
                        </span>

                    </Link>

                </div>


                {/* BECOME PARTNER */}

                <div className="rounded-3xl border border-gray-100 bg-cream p-7 text-left sm:p-9">

                    <h3 className="mb-3 font-display text-2xl font-normal text-navy md:text-3xl">
                        Want to work with us regularly?
                    </h3>

                    <p className="mb-7 max-w-md text-sm leading-relaxed text-steel">
                        Join the partner network for trade rates, a dedicated
                        account manager and priority support.
                    </p>

                    <Link
                        to="/become-a-partner"
                        className="
                            inline-flex
                            min-h-[48px]
                            w-fit
                            items-center
                            justify-center
                            border
                            border-[var(--color-navy)]
                            bg-transparent
                            px-7
                            py-3.5
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-[var(--color-navy)]
                            no-underline
                            transition-all
                            duration-300
                            hover:bg-[var(--color-navy)]
                            hover:text-white
                        "
                    >
                        Become a Partner

                        <span className="ml-3 text-sm">
                            →
                        </span>

                    </Link>

                </div>

            </div>

        </section>

    </div>
);

export default Services;
