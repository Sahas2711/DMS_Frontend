import { Link } from 'react-router-dom';
import { HOME_IMAGES } from '../homeContent';
import TopographicField from './TopographicField';

/* ═══════════════════════════════════════════════════════════════════
   FINAL CTA — STATIC FIRST FOUNDATION
   
   Rules:
   1. All content visible immediately
   2. No scroll-dependent opacity changes
   3. Stable layout without excessive fixed heights
   4. Natural document flow
   5. Clear visual hierarchy
   ═══════════════════════════════════════════════════════════════════ */

export default function FinalCTA() {
    return (
        <section
            aria-label="Start a partnership"
            className="relative bg-navy-deep text-white"
        >
            {/* Background photograph */}
            <div className="absolute inset-0">
                <img
                    src={HOME_IMAGES.cta}
                    alt=""
                    className="h-full w-full object-cover opacity-30"
                    loading="lazy"
                    decoding="async"
                />
            </div>

            {/* Gradient overlays */}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/82 to-navy-deep/55" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-transparent to-navy-deep/35" />

            {/* Topographic signature */}
            <div className="absolute inset-0 z-[1]">
                <TopographicField />
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
                {/* Eyebrow */}
                <p className="mb-7 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/85">
                    <span aria-hidden="true" className="h-px w-10 bg-gold/60" />
                    Your brief. Our ground.
                </p>

                {/* Main heading */}
                <h2 className="max-w-[1050px] font-display text-[clamp(2.8rem,7vw,6.8rem)] leading-[0.94] tracking-[-0.035em]">
                    <span className="block">
                        Your clients expect
                    </span>
                    <span className="mt-1 block">
                        <span className="italic text-gold">
                            memorable.
                        </span>{' '}
                        <span className="text-white/88">
                            We handle the rest.
                        </span>
                    </span>
                </h2>

                {/* Route line */}
                <div aria-hidden="true" className="relative mt-10 h-px w-full max-w-3xl bg-gradient-to-r from-gold/70 via-gold/30 to-transparent">
                    {/* Waypoint */}
                    <span className="absolute right-0 top-1/2 h-[5px] w-[5px] -translate-y-1/2 rotate-45 bg-gold" />
                </div>

                {/* Supporting copy */}
                <p className="mt-7 max-w-xl text-[14px] leading-[1.85] text-white/70">
                    Deadlines, details, flawless execution on the ground. Send the brief —
                    a destination specialist replies within one business day.
                </p>

                {/* Actions */}
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                        to="/request-quote"
                        className="group inline-flex min-h-12 items-center justify-center gap-3 bg-gold px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-deep transition-colors duration-300 hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    >
                        Request a Quote
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            aria-hidden="true"
                            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>

                    <Link
                        to="/become-a-partner"
                        className="inline-flex min-h-12 items-center justify-center border border-white/40 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 transition-colors duration-300 hover:border-gold/70 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    >
                        Become a Partner
                    </Link>
                </div>

                {/* Destination / trade context */}
                <p className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-[9px] uppercase tracking-[0.26em] text-white/50">
                    <span>
                        One trade desk
                    </span>
                    <span aria-hidden="true" className="h-[3px] w-[3px] rotate-45 bg-gold/50" />
                    <span>
                        India · Vietnam · Japan · South Korea
                    </span>
                </p>
            </div>
        </section>
    );
}