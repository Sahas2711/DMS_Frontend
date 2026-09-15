import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { PAGE_META } from '../config/site';
import { POST_CATEGORIES } from '../config/posts';
import { postImage } from '../config/postImages';
import { itemListSchema } from '../config/structuredData';
import { fetchPosts } from '../services/api/cms';
import { PageTransition } from '../components/editorial';
import { usePrefersReducedMotion } from '../components/motion/animations';

import heroImage from '../assets/blogs/travel-journal-section-image.webp';

function formatDate(value) {
    if (!value) return '';
    const d = new Date(value);
    return Number.isNaN(d.getTime())
        ? value
        : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

const CATEGORIES = ['All', ...POST_CATEGORIES.map((c) => c.label)];

/** Shared rise reveal — the page's only motion vocabulary. */
const Rise = ({ children, delay = 0, className = '' }) => {
    const prefersReducedMotion = usePrefersReducedMotion();
    return (
        <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Blogs = () => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadMorePending, setLoadMorePending] = useState(false);
    const [error, setError] = useState('');

    const hasMore = posts.length < total;

    const load = (nextPage, append = false) => {
        const promise = fetchPosts({ page: nextPage, pageSize: 9 })
            .then((data) => {
                const items = data?.items || [];
                setPosts((prev) => (append ? [...prev, ...items] : items));
                setTotal(data?.meta?.total ?? items.length);
                setPage(nextPage);
                setError('');
            })
            .catch((err) => {
                setError(err?.message || 'Could not load the travel journal. Please try again.');
                if (!append) setPosts([]);
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

    const loadMore = () => {
        if (!hasMore || loadMorePending) return;
        setLoadMorePending(true);
        load(page + 1, true);
    };

    const filteredArticles = selectedCategory === 'All'
        ? posts
        : posts.filter((p) => POST_CATEGORIES.some((c) => c.label === selectedCategory && c.value === p.category));

    const featured = filteredArticles.find((p) => p.is_featured) || filteredArticles[0] || null;
    const editorsPick =
        filteredArticles.find((p) => (!featured || p.public_id !== featured.public_id)) ||
        null;
    const featuredId = featured?.public_id;
    const editorsId = editorsPick?.public_id;
    const gridArticles = filteredArticles.filter(
        (p) => p.public_id !== featuredId && p.public_id !== editorsId
    );

    return (
        <PageTransition>
            <div className="w-full bg-white">
                <Seo {...PAGE_META['/blog']} path="/blog" />
                <JsonLd data={[itemListSchema(posts)]} />

                {/* ── Feature story — full-bleed ── */}
                <section className="relative w-full min-h-[70vh] lg:min-h-[85vh] flex items-end overflow-hidden">
                    {featured ? (
                        <>
                            <Link
                                to={`/blog/${featured.slug}`}
                                className="absolute inset-0 z-0"
                                tabIndex={-1}
                                aria-hidden="true"
                            >
                                <img
                                    src={postImage(featured)}
                                    alt=""
                                    className="w-full h-full object-cover"
                                    fetchPriority="high"
                                    loading="eager"
                                    decoding="async"
                                />
                            </Link>
                            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--color-navy-deep)]/90 via-[var(--color-navy)]/40 to-[var(--color-navy)]/10" />

                            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 pb-14 sm:pb-20">
                                <motion.div
                                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                    className="max-w-3xl"
                                >
                                    <p className="eyebrow text-[var(--color-gold)]/80 mb-5">The Travel Journal</p>
                                    {featured.tag && (
                                        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-4">
                                            {featured.tag.replace(/_/g, ' ')} — Feature Story
                                        </p>
                                    )}
                                    <Link to={`/blog/${featured.slug}`} className="group block">
                                        <h1 className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-white mb-6 group-hover:text-[var(--color-gold)] transition-colors duration-500">
                                            {featured.title}
                                        </h1>
                                    </Link>
                                    {featured.excerpt && (
                                        <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-xl mb-8 line-clamp-2 font-body">
                                            {featured.excerpt}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap items-center gap-5">
                                        <Link to={`/blog/${featured.slug}`} className="btn btn--md btn--gold">
                                            Read the Story
                                            <span aria-hidden="true">→</span>
                                        </Link>
                                        <span className="text-[11px] tracking-[0.15em] uppercase text-white/40">
                                            {featured.read_time_minutes
                                                ? `${featured.read_time_minutes} min read`
                                                : formatDate(featured.published_at)}
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    ) : (
                        /* Loading / empty / error state for the feature */
                        <div className="w-full bg-[var(--color-navy-deep)] min-h-[50vh] flex items-center justify-center px-6">
                            <div className="text-center" aria-busy={loading}>
                                <p className="eyebrow text-[var(--color-gold)]/70 mb-4 justify-center">The Travel Journal</p>
                                <p className="font-display text-white/80 text-xl sm:text-2xl italic">
                                    {loading
                                        ? 'Preparing the travel journal…'
                                        : error || 'No published stories yet — check back soon.'}
                                </p>
                                {!loading && error && (
                                    <button
                                        type="button"
                                        onClick={() => { setLoading(true); load(1, false); }}
                                        className="btn btn--md btn--gold mt-8"
                                    >
                                        Retry
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </section>

                {/* ── Editorial index ── */}
                <section className="w-full bg-[var(--color-ivory)] py-20 sm:py-28 px-5 sm:px-8 lg:px-16">
                    <div className="max-w-[1400px] mx-auto">
                        {/* Category filter — editorial text tabs */}
                        <Rise className="flex items-end justify-between gap-6 flex-wrap mb-8">
                            <div>
                                <p className="eyebrow mb-3">The Index</p>
                                <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-navy)]">
                                    Dispatches from the ground.
                                </h2>
                            </div>
                            <span className="text-xs text-[var(--color-text-muted)]">
                                Showing {filteredArticles.length} of {Math.max(total, posts.length)} stories
                            </span>
                        </Rise>

                        <div className="flex flex-wrap gap-x-8 gap-y-2 border-y border-[var(--color-border-subtle)] mb-12 lg:mb-16" role="group" aria-label="Filter stories by category">
                            {CATEGORIES.map((cat) => {
                                const isActive = selectedCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat)}
                                        aria-pressed={isActive}
                                        className={`relative py-4 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] focus-visible:-outline-offset-4 ${isActive ? 'text-[var(--color-navy)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-navy)]'}`}
                                    >
                                        {cat}
                                        <span
                                            aria-hidden="true"
                                            className={`absolute left-0 bottom-0 h-px w-full bg-[var(--color-gold)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Editor's dispatch — split feature */}
                        {editorsPick && (
                            <Rise className="mb-16 lg:mb-20">
                                <Link
                                    to={`/blog/${editorsPick.slug}`}
                                    className="group grid grid-cols-1 lg:grid-cols-12 bg-white border border-[var(--color-border-subtle)]"
                                >
                                    <div className="lg:col-span-6 relative overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
                                        <img
                                            src={postImage(editorsPick)}
                                            alt={editorsPick.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <span className="absolute top-5 left-5 bg-[var(--color-navy)]/85 backdrop-blur-sm text-[var(--color-gold)] text-[9px] font-semibold tracking-[0.25em] uppercase px-3 py-1.5">
                                            Editor's Dispatch
                                        </span>
                                    </div>

                                    <div className="lg:col-span-6 p-8 md:p-12 lg:p-14 flex flex-col">
                                        <p className="eyebrow mb-5">
                                            {editorsPick.category?.replace(/_/g, ' ')} — {formatDate(editorsPick.published_at)}
                                        </p>
                                        <h3 className="font-display text-2xl md:text-3xl lg:text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-[var(--color-navy)] mb-6 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                                            {editorsPick.title}
                                        </h3>
                                        <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed mb-10">
                                            {editorsPick.excerpt}
                                        </p>
                                        <div className="mt-auto pt-6 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                                            <span className="text-xs text-[var(--color-text-muted)]">
                                                {editorsPick.author || 'Asian Star Travel'}
                                                {editorsPick.read_time_minutes ? ` · ${editorsPick.read_time_minutes} min read` : ''}
                                            </span>
                                            <span className="link-premium text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors">
                                                Read Article
                                                <span className="link-arrow" aria-hidden="true">→</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </Rise>
                        )}

                        {/* Secondary stories — numbered editorial grid */}
                        {gridArticles.length === 0 && !loading ? (
                            <div className="bg-white border border-[var(--color-border-subtle)] p-12 text-center">
                                <p className="font-display italic text-[var(--color-navy)]/70 text-lg mb-2">
                                    {error ? 'The journal could not be loaded.' : 'No stories in this category yet.'}
                                </p>
                                {error && (
                                    <button
                                        type="button"
                                        onClick={() => { setLoading(true); load(1, false); }}
                                        className="btn btn--sm btn--navy mt-4"
                                    >
                                        Retry
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 mb-14">
                                {gridArticles.map((article, index) => (
                                    <Rise key={article.public_id} delay={(index % 3) * 0.08}>
                                        <Link to={`/blog/${article.slug}`} className="group block">
                                            <div className="relative aspect-[16/10] overflow-hidden mb-5">
                                                <img
                                                    src={postImage(article)}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute bottom-3 right-3 font-display italic text-3xl text-white/90 drop-shadow-[0_1px_10px_rgba(8,22,52,0.5)]"
                                                >
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--color-bronze)]/70 mb-2">
                                                {article.category?.replace(/_/g, ' ')} · {formatDate(article.published_at)}
                                            </p>
                                            <h3 className="font-display text-lg md:text-xl text-[var(--color-navy)] leading-snug mb-2.5 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                                                {article.title}
                                            </h3>
                                            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-2 mb-3">
                                                {article.excerpt}
                                            </p>
                                            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[var(--color-navy)]/40 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                                                Read More →
                                            </span>
                                        </Link>
                                    </Rise>
                                ))}
                            </div>
                        )}

                        {/* Load more — text button */}
                        {hasMore && (
                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={loadMore}
                                    disabled={loadMorePending}
                                    className="link-premium text-[var(--color-navy)] hover:text-[var(--color-gold)] disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    {loadMorePending ? 'Loading…' : 'Load Prior Dispatches'}
                                    <span className="link-arrow" aria-hidden="true">↓</span>
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* ── Trade CTA ── */}
                <section className="w-full bg-[var(--color-navy)] py-24 sm:py-32 px-5 sm:px-8 lg:px-16">
                    <div className="max-w-[1400px] mx-auto text-center">
                        <Rise>
                            <p className="eyebrow text-[var(--color-gold)]/70 mb-5 justify-center">Travel Trade</p>
                            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-white mb-6">
                                Ready to partner with us?
                            </h2>
                            <p className="text-white/40 text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed font-body">
                                Trade rates, dedicated support and reliable ground handling across India,
                                Vietnam, Japan and South Korea.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link to="/request-quote" className="btn btn--md btn--gold">
                                    Request a Quote
                                </Link>
                                <Link to="/become-a-partner" className="btn btn--md btn--outline-white">
                                    Become a Partner
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
