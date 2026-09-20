import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from 'framer-motion';
import { CAPABILITIES } from '../../pages/homeContent';

/*
 * ═══════════════════════════════════════════════════════════════════
 * B2B TRUST — "THE PARTNERSHIP"
 *
 * Horizontal editorial principles rail.
 *
 * Design:
 * - Four principles presented as one interactive scene
 * - Large image
 * - Animated image replacement
 * - Animated principle content
 * - Horizontal navigation
 * - No sticky positioning
 * - No giant artificial section height
 * - No scroll-dependent visibility
 *
 * Interaction:
 * - Hover/focus/click a principle
 * - Image crossfades to the selected principle
 * - Content transitions
 * - Navigation arrows
 *
 * Static-first:
 * - First principle is visible immediately
 * - All principle labels remain accessible
 * - Animation enhances the experience but is not required
 * ═══════════════════════════════════════════════════════════════════
 */

export default function B2BTrust() {
    const reduce = useReducedMotion();
    const [active, setActive] = useState(0);

    const current = CAPABILITIES[active];

    const selectPrinciple = (index) => {
        setActive(index);
    };

    const previous = () => {
        setActive((currentIndex) =>
            currentIndex === 0
                ? CAPABILITIES.length - 1
                : currentIndex - 1
        );
    };

    const next = () => {
        setActive((currentIndex) =>
            currentIndex === CAPABILITIES.length - 1
                ? 0
                : currentIndex + 1
        );
    };

    return (
        <section
            aria-label="Why partners choose us"
            className="
                relative
                overflow-hidden
                bg-navy-deep
                text-white
            "
        >
            {/* ═══════════════════════════════════════════════
                HEADER
            ═══════════════════════════════════════════════ */}

            <div
                className="
                    mx-auto
                    max-w-[1500px]
                    px-5
                    pb-12
                    pt-24
                    sm:px-8
                    lg:px-12
                    lg:pb-16
                    lg:pt-32
                "
            >
                <div
                    className="
                        flex
                        flex-col
                        gap-8
                        lg:flex-row
                        lg:items-end
                        lg:justify-between
                    "
                >
                    <div>
                        <p
                            className="
                                mb-6
                                flex
                                items-center
                                gap-4
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.3em]
                                text-gold/75
                            "
                        >
                            <span
                                aria-hidden="true"
                                className="
                                    h-px
                                    w-10
                                    bg-gold/50
                                "
                            />

                            The partnership
                        </p>

                        <h2
                            className="
                                font-display
                                text-[clamp(2.8rem,6vw,5.6rem)]
                                leading-[0.94]
                                tracking-[-0.035em]
                            "
                        >
                            Local knowledge.
                            <br />

                            <span className="italic text-gold">
                                Global standards.
                            </span>
                        </h2>
                    </div>

                    <p
                        className="
                            max-w-sm
                            text-[13px]
                            leading-[1.85]
                            text-white/55
                            lg:pb-1
                        "
                    >
                        Your clients expect memorable travel.
                        You need deadlines met, details right and
                        a partner who answers. That is the job.
                    </p>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════
                PRINCIPLE NAVIGATION
            ═══════════════════════════════════════════════ */}

            <div
                className="
                    mx-auto
                    max-w-[1500px]
                    px-5
                    sm:px-8
                    lg:px-12
                "
            >
                <div
                    role="tablist"
                    aria-label="Partnership principles"
                    className="
                        grid
                        grid-cols-2
                        border-y
                        border-white/10
                        sm:grid-cols-4
                    "
                >
                    {CAPABILITIES.map((cap, index) => {
                        const isActive =
                            index === active;

                        return (
                            <button
                                key={cap.number}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`principle-panel-${cap.number}`}
                                onMouseEnter={() =>
                                    selectPrinciple(index)
                                }
                                onFocus={() =>
                                    selectPrinciple(index)
                                }
                                onClick={() =>
                                    selectPrinciple(index)
                                }
                                className="
                                    group
                                    relative
                                    border-r
                                    border-b
                                    border-white/10
                                    px-4
                                    py-5
                                    text-left
                                    transition-colors
                                    duration-300
                                    last:border-r-0
                                    sm:border-b-0
                                    sm:px-5
                                    lg:px-7
                                "
                            >
                                {/* Active indicator */}
                                <span
                                    aria-hidden="true"
                                    className={`
                                        absolute
                                        left-0
                                        right-0
                                        top-0
                                        h-px
                                        origin-left
                                        transition-transform
                                        duration-500
                                        ease-[cubic-bezier(0.16,1,0.3,1)]
                                        ${
                                            isActive
                                                ? 'scale-x-100 bg-gold'
                                                : 'scale-x-0 bg-gold group-hover:scale-x-100'
                                        }
                                    `}
                                />

                                <div className="flex items-center gap-3">
                                    <span
                                        className={`
                                            font-display
                                            text-[10px]
                                            tracking-[0.18em]
                                            transition-colors
                                            duration-300
                                            ${
                                                isActive
                                                    ? 'text-gold'
                                                    : 'text-white/35 group-hover:text-white/60'
                                            }
                                        `}
                                    >
                                        {cap.number}
                                    </span>

                                    <span
                                        aria-hidden="true"
                                        className={`
                                            h-px
                                            transition-all
                                            duration-500
                                            ${
                                                isActive
                                                    ? 'w-8 bg-gold/60'
                                                    : 'w-3 bg-white/20 group-hover:w-6'
                                            }
                                        `}
                                    />
                                </div>

                                <span
                                    className={`
                                        mt-3
                                        block
                                        font-display
                                        text-[clamp(1rem,1.7vw,1.35rem)]
                                        leading-tight
                                        transition-colors
                                        duration-300
                                        ${
                                            isActive
                                                ? 'text-white'
                                                : 'text-white/45 group-hover:text-white/80'
                                        }
                                    `}
                                >
                                    {cap.title}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ═══════════════════════════════════════════════
                ACTIVE PRINCIPLE
            ═══════════════════════════════════════════════ */}

            <div
                className="
                    mx-auto
                    max-w-[1500px]
                    px-5
                    py-12
                    sm:px-8
                    sm:py-16
                    lg:px-12
                    lg:py-20
                "
            >
                <div
                    id={`principle-panel-${current.number}`}
                    role="tabpanel"
                    className="
                        grid
                        min-h-0
                        items-center
                        gap-10
                        lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]
                        lg:gap-16
                        xl:gap-24
                    "
                >
                    {/* ═══════════════════════════════════════
                        IMAGE
                    ═══════════════════════════════════════ */}

                    <div
                        className="
                            relative
                            aspect-[16/10]
                            w-full
                            overflow-hidden
                            bg-[#0c1528]
                            lg:aspect-[16/9]
                        "
                    >
                        <AnimatePresence
                            mode="sync"
                            initial={false}
                        >
                            <motion.img
                                key={current.number}
                                src={current.image}
                                alt={current.imageAlt}
                                className="
                                    absolute
                                    inset-0
                                    h-full
                                    w-full
                                    object-cover
                                "
                                initial={
                                    reduce
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                            scale: 1.06,
                                        }
                                }
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={
                                    reduce
                                        ? {
                                            opacity: 0,
                                        }
                                        : {
                                            opacity: 0,
                                            scale: 1.02,
                                        }
                                }
                                transition={{
                                    opacity: {
                                        duration: reduce
                                            ? 0.15
                                            : 0.55,
                                    },
                                    scale: {
                                        duration: reduce
                                            ? 0
                                            : 1.1,
                                        ease: [
                                            0.16,
                                            1,
                                            0.3,
                                            1,
                                        ],
                                    },
                                }}
                                loading={
                                    active === 0
                                        ? 'eager'
                                        : 'lazy'
                                }
                                decoding="async"
                            />
                        </AnimatePresence>

                        {/* Image treatment */}
                        <div
                            aria-hidden="true"
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-navy-deep/55
                                via-transparent
                                to-transparent
                            "
                        />

                        {/* Image number */}
                        <div
                            className="
                                absolute
                                left-6
                                top-6
                                flex
                                items-center
                                gap-3
                                sm:left-8
                                sm:top-8
                            "
                        >
                            <span
                                className="
                                    font-display
                                    text-[11px]
                                    tracking-[0.2em]
                                    text-white/85
                                "
                            >
                                {current.number}
                            </span>

                            <span
                                aria-hidden="true"
                                className="
                                    h-px
                                    w-8
                                    bg-gold/60
                                "
                            />

                            <span
                                className="
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-white/50
                                "
                            >
                                Principle
                            </span>
                        </div>

                        {/* Image index */}
                        <span
                            aria-hidden="true"
                            className="
                                absolute
                                bottom-5
                                right-6
                                font-display
                                text-[clamp(4rem,9vw,8rem)]
                                leading-none
                                text-white/[0.12]
                            "
                        >
                            {current.number}
                        </span>
                    </div>

                    {/* ═══════════════════════════════════════
                        CONTENT
                    ═══════════════════════════════════════ */}

                    <AnimatePresence
                        mode="wait"
                        initial={false}
                    >
                        <motion.div
                            key={current.number}
                            initial={
                                reduce
                                    ? {
                                        opacity: 0,
                                    }
                                    : {
                                        opacity: 0,
                                        x: 20,
                                    }
                            }
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={
                                reduce
                                    ? {
                                        opacity: 0,
                                    }
                                    : {
                                        opacity: 0,
                                        x: -16,
                                    }
                            }
                            transition={{
                                duration: reduce
                                    ? 0.15
                                    : 0.55,
                                ease: [
                                    0.16,
                                    1,
                                    0.3,
                                    1,
                                ],
                            }}
                            className="
                                relative
                                flex
                                flex-col
                                justify-center
                                lg:min-h-[420px]
                            "
                        >
                            <p
                                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.28em]
                                    text-gold/75
                                "
                            >
                                {current.number} — Principle
                            </p>

                            <h3
                                className="
                                    mt-4
                                    max-w-2xl
                                    font-display
                                    text-[clamp(2.4rem,4.5vw,5rem)]
                                    leading-[0.9]
                                    tracking-[-0.035em]
                                "
                            >
                                {current.title}
                            </h3>

                            <div
                                aria-hidden="true"
                                className="
                                    mt-7
                                    h-px
                                    w-16
                                    bg-gold/50
                                "
                            />

                            <p
                                className="
                                    mt-7
                                    max-w-xl
                                    text-[13px]
                                    leading-[1.9]
                                    text-white/65
                                "
                            >
                                {current.body}
                            </p>

                            <Link
                                to="/travel-trade"
                                className="
                                    group
                                    mt-8
                                    inline-flex
                                    w-fit
                                    items-center
                                    gap-3
                                    border-b
                                    border-gold/40
                                    pb-1.5
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.2em]
                                    text-white
                                    transition-colors
                                    duration-300
                                    hover:border-gold
                                    hover:text-gold
                                    focus-visible:outline
                                    focus-visible:outline-2
                                    focus-visible:outline-offset-4
                                    focus-visible:outline-gold
                                "
                            >
                                How we work with the trade

                                <span
                                    aria-hidden="true"
                                    className="
                                        transition-transform
                                        duration-500
                                        group-hover:translate-x-1.5
                                    "
                                >
                                    →
                                </span>
                            </Link>

                            {/* Small progress */}
                            <div
                                className="
                                    mt-10
                                    flex
                                    items-center
                                    gap-3
                                "
                            >
                                {CAPABILITIES.map(
                                    (cap, index) => (
                                        <button
                                            key={cap.number}
                                            type="button"
                                            aria-label={`Show ${cap.title}`}
                                            aria-current={
                                                index === active
                                                    ? 'true'
                                                    : undefined
                                            }
                                            onClick={() =>
                                                selectPrinciple(
                                                    index
                                                )
                                            }
                                            className="
                                                group
                                                py-2
                                            "
                                        >
                                            <span
                                                className={`
                                                    block
                                                    h-px
                                                    transition-all
                                                    duration-500
                                                    ${
                                                        index ===
                                                        active
                                                            ? 'w-12 bg-gold'
                                                            : 'w-5 bg-white/20 group-hover:w-8 group-hover:bg-white/40'
                                                    }
                                                `}
                                            />
                                        </button>
                                    )
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ═══════════════════════════════════════════
                    ARROW CONTROLS
                ═══════════════════════════════════════════ */}

                <div
                    className="
                        mt-8
                        flex
                        items-center
                        justify-between
                        border-t
                        border-white/10
                        pt-5
                    "
                >
                    <p
                        className="
                            text-[9px]
                            uppercase
                            tracking-[0.24em]
                            text-white/30
                        "
                    >
                        {String(active + 1).padStart(2, '0')}
                        {' '}
                        /{' '}
                        {String(
                            CAPABILITIES.length
                        ).padStart(2, '0')}
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={previous}
                            aria-label="Previous principle"
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                border
                                border-white/15
                                text-white/65
                                transition-all
                                duration-300
                                hover:border-gold/60
                                hover:text-gold
                                focus-visible:outline
                                focus-visible:outline-2
                                focus-visible:outline-offset-2
                                focus-visible:outline-gold
                            "
                        >
                            ←
                        </button>

                        <button
                            type="button"
                            onClick={next}
                            aria-label="Next principle"
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                border
                                border-white/15
                                text-white/65
                                transition-all
                                duration-300
                                hover:border-gold/60
                                hover:text-gold
                                focus-visible:outline
                                focus-visible:outline-2
                                focus-visible:outline-offset-2
                                focus-visible:outline-gold
                            "
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}