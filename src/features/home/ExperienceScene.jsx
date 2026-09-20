import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { TRAVEL_STYLES } from '../../pages/homeContent';
import { EASE_EDITORIAL } from '../../pages/motionTokens';

/*
  EXPERIENCE SCENE — "SIX WAYS IN"

  Desktop:
  - Travel styles on the left
  - Persistent image plate on the right
  - Image changes when a style is hovered/focused/clicked
  - Image NEVER follows the cursor

  Mobile:
  - Styles first
  - Image plate below
  - Tap/focus changes active image
*/

export default function ExperienceScene() {
    const reduce = useReducedMotion();
    const [active, setActive] = useState(0);

    const style = TRAVEL_STYLES[active];

    return (
        <section
            aria-label="Travel styles"
            className="relative overflow-hidden bg-ivory text-navy"
        >
            <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-24 sm:px-8 lg:px-12 lg:pb-36 lg:pt-32">

                {/* ─────────────────────────────────────────────
                    HEADER
                ───────────────────────────────────────────── */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-6 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze">
                            <span
                                aria-hidden="true"
                                className="h-px w-10 bg-gold/60"
                            />
                            Travel styles
                        </p>

                        <h2 className="font-display text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.98] tracking-[-0.03em] text-navy">
                            One place,
                            <br />
                            <span className="italic text-navy/55">
                                six ways in.
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-xs text-[13px] leading-[1.8] text-navy/60">
                        Every programme is built around an interest, a pace and
                        a priority — never a template.
                    </p>
                </div>

                {/* ─────────────────────────────────────────────
                    DESKTOP EXPERIENCE LAYOUT

                    LEFT  = typography
                    RIGHT = persistent image
                ───────────────────────────────────────────── */}
                <div className="mt-16 lg:mt-24 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)] lg:items-start lg:gap-16 xl:gap-24">

                    {/* ─────────────────────────────────────
                        LEFT — STYLE INDEX
                    ───────────────────────────────────── */}
                    <div>
                        <ul
                            aria-label="Travel styles"
                            className="relative"
                        >
                            {TRAVEL_STYLES.map((item, index) => (
                                <li
                                    key={item.id}
                                    className="border-t border-navy/10 last:border-b"
                                >
                                    <StyleRow
                                        item={item}
                                        index={index}
                                        active={index === active}
                                        onSelect={() => setActive(index)}
                                    />
                                </li>
                            ))}
                        </ul>

                        {/* Desktop active detail */}
                        <div className="mt-10 hidden lg:block">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={style.id}
                                    initial={
                                        reduce
                                            ? { opacity: 0 }
                                            : { opacity: 0, y: 12 }
                                    }
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    exit={
                                        reduce
                                            ? { opacity: 0 }
                                            : { opacity: 0, y: -8 }
                                    }
                                    transition={{
                                        duration: 0.45,
                                        ease: EASE_EDITORIAL,
                                    }}
                                    className="flex items-baseline justify-between gap-8"
                                >
                                    <p className="max-w-lg text-[13px] leading-[1.8] text-navy/65">
                                        {style.detail}
                                    </p>

                                    <Link
                                        to={`/request-quote?trip_type=${style.tripType}`}
                                        className="group inline-flex shrink-0 items-center gap-2 border-b border-bronze/40 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy transition-colors duration-300 hover:border-bronze hover:text-bronze"
                                    >
                                        Plan this style

                                        <span
                                            aria-hidden="true"
                                            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                                        >
                                            →
                                        </span>
                                    </Link>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* ─────────────────────────────────────
                        RIGHT — FIXED IMAGE BLOCK

                        IMPORTANT:
                        This is intentionally NOT positioned
                        from the mouse.

                        It remains in this column and changes
                        only when active style changes.
                    ───────────────────────────────────── */}
                    <div className="hidden lg:block lg:sticky lg:top-28">
                        <div className="relative overflow-hidden bg-stone aspect-[4/5] w-full max-w-[520px] ml-auto">

                            <AnimatePresence
                                mode="sync"
                                initial={false}
                            >
                                <motion.img
                                    key={style.id}
                                    src={style.image}
                                    alt={style.imageAlt || ''}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    initial={
                                        reduce
                                            ? { opacity: 0 }
                                            : {
                                                opacity: 0,
                                                scale: 1.06,
                                            }
                                    }
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: reduce ? 1 : 0.98,
                                    }}
                                    transition={{
                                        opacity: {
                                            duration: reduce ? 0.15 : 0.45,
                                            ease: 'easeOut',
                                        },
                                        scale: {
                                            duration: reduce ? 0 : 0.8,
                                            ease: EASE_EDITORIAL,
                                        },
                                    }}
                                />
                            </AnimatePresence>

                            {/* Image gradient */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent"
                            />

                            {/* Image metadata */}
                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={style.id}
                                        initial={{
                                            opacity: 0,
                                            y: reduce ? 0 : 10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: reduce ? 0 : -5,
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            ease: EASE_EDITORIAL,
                                        }}
                                    >
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
                                            {String(active + 1).padStart(2, '0')}
                                        </p>

                                        <p className="mt-1 font-display text-2xl leading-none">
                                            {style.name}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>

                                <span
                                    aria-hidden="true"
                                    className="font-display text-[11px] tracking-[0.14em] text-white/70"
                                >
                                    ASIA
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─────────────────────────────────────────────
                    MOBILE IMAGE

                    Desktop image above is hidden on mobile.
                    Mobile gets a normal image block.
                ───────────────────────────────────────────── */}
                <div className="mt-12 lg:hidden">
                    <div
                        className="relative aspect-[16/10] overflow-hidden"
                        aria-live="polite"
                    >
                        <AnimatePresence
                            mode="wait"
                            initial={false}
                        >
                            <motion.img
                                key={style.id}
                                src={style.image}
                                alt={style.imageAlt || ''}
                                className="absolute inset-0 h-full w-full object-cover"
                                initial={
                                    reduce
                                        ? { opacity: 0 }
                                        : {
                                            opacity: 0,
                                            scale: 1.06,
                                        }
                                }
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: reduce ? 0.15 : 0.7,
                                    ease: EASE_EDITORIAL,
                                }}
                                loading="lazy"
                                decoding="async"
                            />
                        </AnimatePresence>

                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent"
                        />

                        <div className="absolute bottom-5 left-5 text-white">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
                                {String(active + 1).padStart(2, '0')}
                            </p>

                            <p className="mt-1 font-display text-2xl">
                                {style.name}
                            </p>
                        </div>
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={style.id}
                            initial={
                                reduce
                                    ? { opacity: 0 }
                                    : { opacity: 0, y: 10 }
                            }
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.4,
                                ease: EASE_EDITORIAL,
                            }}
                            className="mt-5"
                        >
                            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-bronze">
                                {String(active + 1).padStart(2, '0')} —{' '}
                                {style.name}
                            </p>

                            <p className="mt-2 text-[13px] leading-[1.8] text-navy/65">
                                {style.detail}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}


/* ═══════════════════════════════════════════════════════════════
   STYLE ROW
   ═══════════════════════════════════════════════════════════════ */

function StyleRow({
    item,
    index,
    active,
    onSelect,
}) {
    return (
        <button
            type="button"
            onMouseEnter={onSelect}
            onFocus={onSelect}
            onClick={onSelect}
            aria-pressed={active}
            className="group block w-full py-6 text-left lg:py-8"
        >
            <div className="flex items-baseline gap-5 sm:gap-8">

                {/* Number */}
                <span
                    className={`font-display text-[12px] tracking-[0.2em] transition-colors duration-500 ${
                        active
                            ? 'text-bronze'
                            : 'text-navy/70'
                    }`}
                >
                    {String(index + 1).padStart(2, '0')}
                </span>

                {/* Name */}
                <span
                    className={`font-display text-[clamp(1.7rem,4.2vw,3.4rem)] leading-none tracking-[-0.02em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        active
                            ? 'translate-x-3 text-navy'
                            : 'text-navy/75 group-hover:translate-x-1.5 group-hover:text-navy'
                    }`}
                >
                    {item.name}
                </span>

                {/* Active line */}
                <span
                    aria-hidden="true"
                    className={`ml-auto hidden h-px self-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:block ${
                        active
                            ? 'w-32 bg-bronze/70'
                            : 'w-8 bg-navy/20'
                    }`}
                />
            </div>

            {/* Supporting line */}
            <p
                className={`ml-12 mt-2 max-w-xl text-[12px] leading-relaxed transition-colors duration-500 sm:ml-16 ${
                    active
                        ? 'text-navy/80'
                        : 'text-navy/65'
                }`}
            >
                {item.line}
            </p>
        </button>
    );
}