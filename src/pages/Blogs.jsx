import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import Seo from '../components/Seo';

import JsonLd from '../components/JsonLd';

import { PAGE_META } from '../config/site';

import { POST_CATEGORIES } from '../config/posts';

import { postImage, travelCTAImg } from '../config/postImages';

import { itemListSchema } from '../config/structuredData';

import { fetchPosts } from '../services/api/cms';

import { PageTransition, Rise } from '../components/editorial';


function formatDate(value) {
    if (!value) return '';

    const d = new Date(value);

    return Number.isNaN(d.getTime())
        ? value
        : d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
}


const CATEGORIES = ['All', ...POST_CATEGORIES.map((c) => c.label)];


const Blogs = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadMorePending, setLoadMorePending] = useState(false);
    const [error, setError] = useState('');

    const hasMore = posts.length < total;


    const load = (
        nextPage,
        append = false,
        category = selectedCategory
    ) => {
        const categoryValue =
            category === 'All'
                ? undefined
                : POST_CATEGORIES.find(
                    (c) => c.label === category
                )?.value;

        const promise = fetchPosts({
            page: nextPage,
            pageSize: 9,
            category: categoryValue,
        })
            .then((data) => {
                const items = data?.items || [];

                setPosts((prev) =>
                    append ? [...prev, ...items] : items
                );

                setTotal(
                    data?.meta?.total ?? items.length
                );

                setPage(nextPage);
                setError('');
            })
            .catch((err) => {
                setError(
                    err?.message ||
                    'Could not load the travel journal. Please try again.'
                );

                if (!append) {
                    setPosts([]);
                }
            })
            .finally(() => {
                setLoading(false);
                setLoadMorePending(false);
            });

        return promise;
    };


    useEffect(() => {
        load(1, false);
    }, []);


    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setLoading(true);
        setPosts([]);

        load(1, false, cat);
    };


    const loadMore = () => {
        if (!hasMore || loadMorePending) return;

        setLoadMorePending(true);

        load(page + 1, true);
    };


    const filteredArticles =
        selectedCategory === 'All'
            ? posts
            : posts.filter((p) =>
                POST_CATEGORIES.some(
                    (c) =>
                        c.label === selectedCategory &&
                        c.value === p.category
                )
            );


    const featured =
        filteredArticles.find((p) => p.is_featured) ||
        filteredArticles[0] ||
        null;


    const editorsPick =
        filteredArticles.find(
            (p) =>
                (!featured ||
                    p.public_id !== featured.public_id)
        ) || null;


    const featuredId = featured?.public_id;
    const editorsId = editorsPick?.public_id;


    const gridArticles = filteredArticles.filter(
        (p) =>
            p.public_id !== featuredId &&
            p.public_id !== editorsId
    );


    return (
        <PageTransition>

            <div className="w-full bg-white">

                <Seo
                    {...PAGE_META['/blog']}
                    path="/blog"
                />

                <JsonLd
                    data={[itemListSchema(posts)]}
                />


                {/* =========================================================
                    FEATURE STORY
                ========================================================== */}

                <section
                    className="
                        relative
                        flex
                        min-h-[70vh]
                        w-full
                        items-end
                        overflow-hidden
                        lg:min-h-[85vh]
                    "
                >

                    {featured ? (
                        <>

                            {/* Background image */}

                            <Link
                                to={`/blog/${featured.slug}`}
                                className="absolute inset-0 z-0"
                                tabIndex={-1}
                                aria-hidden="true"
                            >

                                <img
                                    src={postImage(featured)}
                                    alt=""
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                    "
                                    fetchPriority="high"
                                    loading="eager"
                                    decoding="async"
                                />

                            </Link>


                            {/* Image overlay */}

                            <div
                                className="
                                    absolute
                                    inset-0
                                    z-0
                                    bg-gradient-to-t
                                    from-[var(--color-navy-deep)]/90
                                    via-[var(--color-navy)]/40
                                    to-[var(--color-navy)]/10
                                "
                            />


                            {/* =================================================
                                FEATURE CONTENT
                            ================================================= */}

                            <div
                                className="
                                    relative
                                    z-10
                                    mx-auto
                                    w-full
                                    max-w-[1400px]
                                    px-5
                                    pb-14
                                    sm:px-8
                                    sm:pb-20
                                    lg:px-12
                                    lg:pb-24
                                "
                            >

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 30,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.9,
                                        delay: 0.15,
                                        ease: [
                                            0.16,
                                            1,
                                            0.3,
                                            1,
                                        ],
                                    }}

                                    /*
                                     * IMPORTANT:
                                     * Increased from max-w-3xl.
                                     * This gives the title enough horizontal
                                     * space to stay around 2 lines.
                                     */
                                    className="
                                        w-full
                                        max-w-[1100px]
                                    "
                                >

                                    <p
                                        className="
                                            eyebrow
                                            mb-4
                                            text-[var(--color-gold)]/80
                                            sm:mb-5
                                        "
                                    >
                                        The Travel Journal
                                    </p>


                                    {featured.tag && (
                                        <p
                                            className="
                                                mb-4
                                                text-[9px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.22em]
                                                text-white/50
                                                sm:text-[10px]
                                                sm:tracking-[0.25em]
                                            "
                                        >
                                            {featured.tag.replace(
                                                /_/g,
                                                ' '
                                            )}{' '}
                                            — Feature Story
                                        </p>
                                    )}


                                    {/* =================================================
                                        FEATURE TITLE

                                        Desktop:
                                        - Wider container
                                        - Smaller font
                                        - Tight line height
                                        - Prevents unnecessary 3-4 line wrapping

                                        Mobile:
                                        - Natural responsive wrapping
                                    ================================================= */}

                                    <Link
                                        to={`/blog/${featured.slug}`}
                                        className="group block"
                                    >

                                        <h1
                                            className="
                                                mb-5
                                                max-w-[1100px]
                                                font-display
                                                text-[clamp(2rem,3.8vw,4rem)]
                                                leading-[0.96]
                                                tracking-[-0.035em]
                                                text-white
                                                transition-colors
                                                duration-500
                                                group-hover:text-[var(--color-gold)]

                                                sm:text-[clamp(2.2rem,4vw,4rem)]

                                                lg:max-w-[1100px]
                                            "
                                        >
                                            {featured.title}
                                        </h1>

                                    </Link>


                                    {featured.excerpt && (
                                        <p
                                            className="
                                                mb-7
                                                max-w-2xl
                                                line-clamp-2
                                                font-body
                                                text-sm
                                                leading-relaxed
                                                text-white/60
                                                sm:mb-8
                                                sm:text-base
                                                lg:text-lg
                                            "
                                        >
                                            {featured.excerpt}
                                        </p>
                                    )}


                                    {/* CTA */}

                                    <div
                                        className="
                                            flex
                                            flex-wrap
                                            items-center
                                            gap-4
                                            sm:gap-5
                                        "
                                    >

                                        <Link
                                            to={`/blog/${featured.slug}`}
                                            className="
                                                btn
                                                btn--md
                                                btn--gold
                                            "
                                        >
                                            Read the Story

                                            <span
                                                aria-hidden="true"
                                            >
                                                →
                                            </span>
                                        </Link>


                                        <span
                                            className="
                                                text-[10px]
                                                uppercase
                                                tracking-[0.15em]
                                                text-white/45
                                                sm:text-[11px]
                                            "
                                        >
                                            {featured.read_time_minutes
                                                ? `${featured.read_time_minutes} min read`
                                                : formatDate(
                                                    featured.published_at
                                                )}
                                        </span>

                                    </div>

                                </motion.div>

                            </div>

                        </>

                    ) : (

                        /* =====================================================
                           LOADING / EMPTY / ERROR
                        ====================================================== */

                        <div
                            className="
                                flex
                                min-h-[50vh]
                                w-full
                                items-center
                                justify-center
                                bg-[var(--color-navy-deep)]
                                px-6
                            "
                        >

                            <div
                                className="text-center"
                                aria-busy={loading}
                            >

                                <p
                                    className="
                                        eyebrow
                                        mb-4
                                        justify-center
                                        text-[var(--color-gold)]/70
                                    "
                                >
                                    The Travel Journal
                                </p>

                                <p
                                    className="
                                        font-display
                                        text-xl
                                        italic
                                        text-white/80
                                        sm:text-2xl
                                    "
                                >
                                    {loading
                                        ? 'Preparing the travel journal…'
                                        : error ||
                                        'No published stories yet — check back soon.'}
                                </p>


                                {!loading && error && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLoading(true);
                                            load(1, false);
                                        }}
                                        className="btn btn--md btn--gold mt-8"
                                    >
                                        Retry
                                    </button>
                                )}

                            </div>

                        </div>

                    )}

                </section>


                {/* =========================================================
                    EDITORIAL INDEX
                ========================================================== */}

                <section
                    className="
                        w-full
                        bg-[var(--color-ivory)]
                        py-20
                        sm:py-28
                        lg:py-36
                    "
                >

                    <div
                        className="
                            mx-auto
                            max-w-[1400px]
                            px-5
                            sm:px-8
                            lg:px-12
                        "
                    >

                        {/* Category filter */}

                        <Rise
                            className="
                                mb-8
                                flex
                                flex-wrap
                                items-end
                                justify-between
                                gap-6
                            "
                        >

                            <div>

                                <p className="eyebrow mb-3">
                                    The Index
                                </p>

                                <h2
                                    className="
                                        font-display
                                        text-[clamp(1.8rem,4vw,3rem)]
                                        leading-[0.95]
                                        tracking-[-0.02em]
                                        text-[var(--color-navy)]
                                    "
                                >
                                    Dispatches from the ground.
                                </h2>

                            </div>


                            <span
                                className="
                                    text-xs
                                    text-[var(--color-text-muted)]
                                "
                            >
                                Showing {filteredArticles.length} of{' '}
                                {Math.max(total, posts.length)} stories
                            </span>

                        </Rise>


                        {/* Categories */}

                        <div
                            className="
                                mb-12
                                flex
                                flex-wrap
                                gap-x-8
                                gap-y-2
                                border-y
                                border-[var(--color-border-subtle)]
                                lg:mb-16
                            "
                            role="group"
                            aria-label="Filter stories by category"
                        >

                            {CATEGORIES.map((cat) => {

                                const isActive =
                                    selectedCategory === cat;

                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() =>
                                            handleCategoryChange(cat)
                                        }
                                        aria-pressed={isActive}
                                        className={`
                                            relative
                                            py-4
                                            text-[11px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.18em]
                                            transition-colors
                                            duration-300
                                            focus-visible:outline
                                            focus-visible:outline-2
                                            focus-visible:outline-[var(--color-gold)]
                                            focus-visible:-outline-offset-4
                                            ${isActive
                                                ? 'text-[var(--color-navy)]'
                                                : 'text-[var(--color-text-muted)] hover:text-[var(--color-navy)]'
                                            }
                                        `}
                                    >

                                        {cat}

                                        <span
                                            aria-hidden="true"
                                            className={`
                                                absolute
                                                bottom-0
                                                left-0
                                                h-px
                                                w-full
                                                origin-left
                                                bg-[var(--color-gold)]
                                                transition-transform
                                                duration-500
                                                ease-[cubic-bezier(0.16,1,0.3,1)]
                                                ${isActive
                                                    ? 'scale-x-100'
                                                    : 'scale-x-0'
                                                }
                                            `}
                                        />

                                    </button>
                                );
                            })}

                        </div>


                        {/* =====================================================
                            EDITOR'S DISPATCH
                        ====================================================== */}

                        {editorsPick && (
                            <Rise className="mb-16 lg:mb-20">

                                <Link
                                    to={`/blog/${editorsPick.slug}`}
                                    className="
                                        group
                                        grid
                                        grid-cols-1
                                        border
                                        border-[var(--color-border-subtle)]
                                        bg-white
                                        lg:grid-cols-12
                                    "
                                >

                                    <div
                                        className="
                                            relative
                                            aspect-[16/10]
                                            overflow-hidden
                                            lg:col-span-6
                                            lg:aspect-auto
                                            lg:min-h-[420px]
                                        "
                                    >

                                        <img
                                            src={postImage(editorsPick)}
                                            alt={editorsPick.title}
                                            className="
                                                absolute
                                                inset-0
                                                h-full
                                                w-full
                                                object-cover
                                                transition-transform
                                                duration-700
                                                ease-[cubic-bezier(0.16,1,0.3,1)]
                                                group-hover:scale-[1.04]
                                            "
                                            loading="lazy"
                                            decoding="async"
                                        />

                                        <span
                                            className="
                                                absolute
                                                left-5
                                                top-5
                                                bg-[var(--color-navy)]/85
                                                px-3
                                                py-1.5
                                                text-[9px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.25em]
                                                text-[var(--color-gold)]
                                                backdrop-blur-sm
                                            "
                                        >
                                            Editor's Dispatch
                                        </span>

                                    </div>


                                    <div
                                        className="
                                            flex
                                            flex-col
                                            p-8
                                            md:p-12
                                            lg:col-span-6
                                            lg:p-14
                                        "
                                    >

                                        <p className="eyebrow mb-5">
                                            {editorsPick.category?.replace(
                                                /_/g,
                                                ' '
                                            )}{' '}
                                            —{' '}
                                            {formatDate(
                                                editorsPick.published_at
                                            )}
                                        </p>


                                        <h3
                                            className="
                                                mb-6
                                                font-display
                                                text-2xl
                                                leading-[1.05]
                                                tracking-[-0.02em]
                                                text-[var(--color-navy)]
                                                transition-colors
                                                duration-300
                                                group-hover:text-[var(--color-gold)]
                                                md:text-3xl
                                                lg:text-[2.4rem]
                                            "
                                        >
                                            {editorsPick.title}
                                        </h3>


                                        <p
                                            className="
                                                mb-10
                                                text-sm
                                                leading-relaxed
                                                text-[var(--color-text-secondary)]
                                                md:text-base
                                            "
                                        >
                                            {editorsPick.excerpt}
                                        </p>


                                        <div
                                            className="
                                                mt-auto
                                                flex
                                                items-center
                                                justify-between
                                                border-t
                                                border-[var(--color-border-subtle)]
                                                pt-6
                                            "
                                        >

                                            <span
                                                className="
                                                    text-xs
                                                    text-[var(--color-text-muted)]
                                                "
                                            >
                                                {editorsPick.author ||
                                                    'Asian Star Travel'}

                                                {editorsPick.read_time_minutes
                                                    ? ` · ${editorsPick.read_time_minutes} min read`
                                                    : ''}
                                            </span>


                                            <span
                                                className="
                                                    link-premium
                                                    text-[var(--color-navy)]
                                                    transition-colors
                                                    group-hover:text-[var(--color-gold)]
                                                "
                                            >
                                                Read Article
                                                <span
                                                    className="link-arrow"
                                                    aria-hidden="true"
                                                >
                                                    →
                                                </span>
                                            </span>

                                        </div>

                                    </div>

                                </Link>

                            </Rise>
                        )}


                        {/* =====================================================
                            SECONDARY STORIES
                        ====================================================== */}

                        {gridArticles.length === 0 && !loading ? (

                            <div
                                className="
                                    border
                                    border-[var(--color-border-subtle)]
                                    bg-white
                                    p-12
                                    text-center
                                "
                            >

                                <p
                                    className="
                                        mb-2
                                        font-display
                                        text-lg
                                        italic
                                        text-[var(--color-navy)]/70
                                    "
                                >
                                    {error
                                        ? 'The journal could not be loaded.'
                                        : 'No stories in this category yet.'}
                                </p>


                                {error && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLoading(true);
                                            load(1, false);
                                        }}
                                        className="btn btn--sm btn--navy mt-4"
                                    >
                                        Retry
                                    </button>
                                )}

                            </div>

                        ) : (

                            <div
                                className="
                                    mb-14
                                    grid
                                    grid-cols-1
                                    gap-x-8
                                    gap-y-14
                                    md:grid-cols-2
                                    lg:grid-cols-3
                                "
                            >

                                {gridArticles.map(
                                    (article, index) => (

                                        <Rise
                                            key={article.public_id}
                                            delay={
                                                (index % 3) * 0.08
                                            }
                                        >

                                            <Link
                                                to={`/blog/${article.slug}`}
                                                className="group block"
                                            >

                                                <div
                                                    className="
                                                        relative
                                                        mb-5
                                                        aspect-[16/10]
                                                        overflow-hidden
                                                    "
                                                >

                                                    <img
                                                        src={postImage(article)}
                                                        alt={article.title}
                                                        className="
                                                            h-full
                                                            w-full
                                                            object-cover
                                                            transition-transform
                                                            duration-700
                                                            ease-[cubic-bezier(0.16,1,0.3,1)]
                                                            group-hover:scale-[1.05]
                                                        "
                                                        loading="lazy"
                                                        decoding="async"
                                                    />

                                                </div>


                                                <p
                                                    className="
                                                        mb-2
                                                        text-[10px]
                                                        font-semibold
                                                        uppercase
                                                        tracking-[0.22em]
                                                        text-[var(--color-bronze)]/70
                                                    "
                                                >
                                                    {article.category?.replace(
                                                        /_/g,
                                                        ' '
                                                    )}{' '}
                                                    ·{' '}
                                                    {formatDate(
                                                        article.published_at
                                                    )}
                                                </p>


                                                <h3
                                                    className="
                                                        mb-2.5
                                                        font-display
                                                        text-lg
                                                        leading-snug
                                                        text-[var(--color-navy)]
                                                        transition-colors
                                                        duration-300
                                                        group-hover:text-[var(--color-gold)]
                                                        md:text-xl
                                                    "
                                                >
                                                    {article.title}
                                                </h3>


                                                <p
                                                    className="
                                                        mb-3
                                                        line-clamp-2
                                                        text-sm
                                                        leading-relaxed
                                                        text-[var(--color-text-secondary)]
                                                    "
                                                >
                                                    {article.excerpt}
                                                </p>


                                                <span
                                                    className="
                                                        text-[11px]
                                                        font-semibold
                                                        uppercase
                                                        tracking-[0.15em]
                                                        text-[var(--color-navy)]/40
                                                        transition-colors
                                                        duration-300
                                                        group-hover:text-[var(--color-gold)]
                                                    "
                                                >
                                                    Read More →
                                                </span>

                                            </Link>

                                        </Rise>

                                    )
                                )}

                            </div>

                        )}


                        {/* =====================================================
                            PAGINATION
                        ====================================================== */}

                        {total > 9 && (

                            <div
                                className="
                                    mt-8
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                "
                            >

                                {Array.from(
                                    {
                                        length: Math.ceil(
                                            total / 9
                                        ),
                                    },
                                    (_, i) => i + 1
                                ).map((pageNum) => (

                                    <button
                                        key={pageNum}
                                        type="button"
                                        onClick={() => {
                                            setLoading(true);
                                            setPosts([]);
                                            load(
                                                pageNum,
                                                false
                                            );
                                        }}
                                        aria-current={
                                            pageNum === page
                                                ? 'page'
                                                : undefined
                                        }
                                        className={`
                                            h-10
                                            min-w-[40px]
                                            px-3
                                            text-[11px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.1em]
                                            transition-all
                                            duration-300

                                            ${pageNum === page
                                                ? 'bg-[var(--color-navy)] text-white'
                                                : 'border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:border-[var(--color-navy)] hover:text-[var(--color-navy)]'
                                            }
                                        `}
                                    >
                                        {pageNum}
                                    </button>

                                ))}

                            </div>

                        )}


                        {/* =====================================================
                            LOAD MORE
                        ====================================================== */}

                        {hasMore && (

                            <div className="mt-8 text-center">

                                <button
                                    type="button"
                                    onClick={loadMore}
                                    disabled={loadMorePending}
                                    className="
                                        link-premium
                                        text-[var(--color-navy)]
                                        hover:text-[var(--color-gold)]
                                        disabled:pointer-events-none
                                        disabled:opacity-50
                                    "
                                >

                                    {loadMorePending
                                        ? 'Loading…'
                                        : 'Load Prior Dispatches'}

                                    <span
                                        className="link-arrow"
                                        aria-hidden="true"
                                    >
                                        ↓
                                    </span>

                                </button>

                            </div>

                        )}

                    </div>

                </section>


                {/* =========================================================
                    TRADE CTA
                ========================================================== */}

                <section
                    className="
                        relative
                        w-full
                        overflow-hidden
                        bg-[var(--color-navy)]
                        bg-cover
                        bg-center
                        bg-no-repeat
                        py-20
                        sm:py-28
                        lg:py-36
                    "
                    style={{
                        backgroundImage: `url(${travelCTAImg})`,
                    }}
                >

                    {/* Dark overlay */}

                    <div
                        aria-hidden="true"
                        className="
                            absolute
                            inset-0
                            bg-[var(--color-navy)]/60
                        "
                    />


                    {/* Gradient overlay */}

                    <div
                        aria-hidden="true"
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-r
                            from-[var(--color-navy)]/80
                            via-[var(--color-navy)]/50
                            to-[var(--color-navy)]/65
                        "
                    />


                    {/* CTA content */}

                    <div
                        className="
                            relative
                            z-10
                            mx-auto
                            max-w-[1400px]
                            px-5
                            text-center
                            sm:px-8
                            lg:px-12
                        "
                    >

                        <Rise>

                            <p
                                className="
                                    eyebrow
                                    mb-5
                                    justify-center
                                    text-[var(--color-gold)]
                                "
                            >
                                Travel Trade
                            </p>


                            <h2
                                className="
                                    mb-6
                                    font-display
                                    text-[clamp(2rem,4.5vw,3.5rem)]
                                    leading-[0.95]
                                    tracking-[-0.02em]
                                    text-white
                                "
                            >
                                Ready to partner with us?
                            </h2>


                            <p
                                className="
                                    mx-auto
                                    mb-10
                                    max-w-lg
                                    font-body
                                    text-sm
                                    leading-relaxed
                                    text-white/75
                                    sm:text-base
                                "
                            >
                                Trade rates, dedicated support and
                                reliable ground handling across India,
                                Vietnam, Japan and South Korea.
                            </p>


                            <div
                                className="
                                    flex
                                    flex-wrap
                                    justify-center
                                    gap-4
                                "
                            >

                                <Link
                                    to="/become-a-partner"
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        border
                                        border-white/40
                                        bg-white/10
                                        px-7
                                        py-3.5
                                        text-[10px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.2em]
                                        text-white
                                        backdrop-blur-sm
                                        transition-all
                                        duration-300
                                        hover:border-white
                                        hover:bg-white
                                        hover:text-[var(--color-navy)]
                                    "
                                >
                                    Become a Partner

                                    <span className="ml-3 text-sm">
                                        →
                                    </span>

                                </Link>

                            </div>

                        </Rise>

                    </div>

                </section>

            </div>

        </PageTransition>
    );
};


export default Blogs;