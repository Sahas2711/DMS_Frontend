import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import { SITE } from '../config/site';
import { POST_CATEGORY_LABEL } from '../config/posts';
import { postImage } from '../config/postImages';
import { blogPostingSchema, breadcrumbListSchema } from '../config/structuredData';
import { fetchPostBySlug } from '../services/api/cms';
import { errorMessage } from '../services/api/client';
import { PageTransition } from '../components/editorial';
import { usePrefersReducedMotion } from '../components/motion/animations';

const noSeo = {
    meta_title: '',
    meta_description: '',
    canonical_url: '',
    robots: '',
    og_title: '',
    og_description: '',
    og_image_url: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image_url: '',
};

function formatDate(value) {
    if (!value) return '';
    const d = new Date(value);
    return Number.isNaN(d.getTime())
        ? value
        : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}

function BlogDetail() {
    const { slug } = useParams();
    const [state, setState] = useState({ status: 'loading', post: null, error: null });
    const prefersReducedMotion = usePrefersReducedMotion();

    // Reading progress — a functional hairline, not decoration. Spring keeps
    // it in sync without layout thrash; static bar under reduced motion.
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

    useEffect(() => {
        let cancelled = false;

        fetchPostBySlug(slug)
            .then((post) => {
                if (!cancelled) setState({ status: 'success', post, error: null });
            })
            .catch((error) => {
                if (!cancelled) {
                    setState({ status: 'error', post: null, error: errorMessage(error, 'This story could not be loaded.') });
                }
            });

        return () => {
            cancelled = true;
        };
    }, [slug]);

    if (state.status === 'loading') {
        return (
            <div className="min-h-[60vh] flex items-center justify-center" aria-busy="true">
                <div className="text-[var(--color-navy)] text-sm font-semibold tracking-wider uppercase">Loading story…</div>
            </div>
        );
    }

    if (state.status === 'error') {
        return (
            <PageTransition>
                <div className="min-h-[60vh] bg-[var(--color-cream)] flex items-center justify-center px-6">
                    <div className="bg-white border border-[var(--color-border-subtle)] p-10 max-w-md text-center">
                        <Seo title="Story not found" noIndex path={`/blog/${slug}`} />
                        <h1 className="text-[var(--color-navy)] font-display text-2xl mb-2">Story not available</h1>
                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-6">{state.error}</p>
                        <Link to="/blog" className="btn btn--md btn--navy">
                            ← Back to the journal
                        </Link>
                    </div>
                </div>
            </PageTransition>
        );
    }

    const post = state.post;
    const seo = post.seo_metadata || noSeo;
    const description = seo.meta_description || post.excerpt || SITE.description;
    const canonical = seo.canonical_url || `/blog/${post.slug}`;
    const metaTitle = seo.meta_title || `${post.title} | ${SITE.name}`;
    const cover = postImage(post);
    const paragraphs = (post.body || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

    return (
        <PageTransition>
            <div className="w-full flex flex-col bg-white">
                <Seo
                    title={metaTitle}
                    description={description}
                    path={canonical}
                    image={seo.og_image_url || (cover && !cover.startsWith('data:') ? cover : undefined)}
                    noIndex={Boolean(seo.robots && seo.robots.toLowerCase().includes('noindex'))}
                    robots={seo.robots || undefined}
                    ogTitle={seo.og_title || undefined}
                    ogDescription={seo.og_description || undefined}
                    twitterTitle={seo.twitter_title || undefined}
                    twitterDescription={seo.twitter_description || undefined}
                    twitterImage={seo.twitter_image_url || undefined}
                />
                <JsonLd
                    data={[
                        breadcrumbListSchema([
                            { name: 'Home', url: '/' },
                            { name: 'Travel Journal', url: '/blog' },
                            { name: post.title, url: canonical },
                        ]),
                        blogPostingSchema({ post, seo, canonical, image: cover }),
                    ]}
                />

                {/* Reading progress hairline */}
                <motion.div
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--color-gold)] z-50 origin-left"
                    style={prefersReducedMotion ? { scaleX: 0 } : { scaleX: progress }}
                />

                {/* Back link */}
                <div className="w-full max-w-[720px] mx-auto px-5 sm:px-8 pt-10 md:pt-14 text-left">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-[11px] font-semibold text-[var(--color-navy)]/50 hover:text-[var(--color-gold)] transition-colors uppercase tracking-[0.18em]"
                    >
                        ← Travel Journal
                    </Link>
                </div>

                {/* Title block — typography-first, above the image */}
                <header className="w-full max-w-[720px] mx-auto px-5 sm:px-8 pt-8 md:pt-10 pb-10 md:pb-14 text-left">
                    <motion.div
                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="eyebrow mb-5">
                            {post.tag || POST_CATEGORY_LABEL[post.category] || post.category}
                            {post.published_at ? ` — ${formatDate(post.published_at)}` : ''}
                        </p>
                        <h1 className="font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.025em] text-[var(--color-navy)] mb-8">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--color-text-muted)] uppercase tracking-[0.15em]">
                            {post.author && <span className="text-[var(--color-navy)] font-semibold">{post.author}</span>}
                            {post.read_time_minutes && <span>{post.read_time_minutes} min read</span>}
                        </div>
                    </motion.div>
                </header>

                {/* Lead image */}
                <figure className="w-full max-w-[1100px] mx-auto px-5 sm:px-8">
                    <motion.div
                        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <img
                            src={cover}
                            alt={post.title}
                            className="w-full aspect-[16/9] object-cover"
                            fetchPriority="high"
                            loading="eager"
                            decoding="async"
                        />
                    </motion.div>
                </figure>

                {/* Body — single readable measure */}
                <section className="w-full pt-14 md:pt-20 pb-20 md:pb-28 px-5 sm:px-8 flex justify-center">
                    <div className="w-full max-w-[720px] text-left">
                        {post.excerpt && (
                            <p className="font-display italic text-[clamp(1.15rem,2vw,1.45rem)] leading-[1.5] text-[var(--color-navy)]/90 mb-10">
                                {post.excerpt}
                            </p>
                        )}
                        <div className="font-body text-[var(--color-text-secondary)] text-[15px] md:text-base leading-[1.9] space-y-6">
                            {paragraphs.length > 0 ? (
                                paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)
                            ) : (
                                <p>This story is still being written — check back soon for the full dispatch.</p>
                            )}
                        </div>

                        {/* Author footer */}
                        <div className="border-t border-[var(--color-border-subtle)] mt-14 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <span
                                    aria-hidden="true"
                                    className="w-11 h-11 grid place-items-center bg-[var(--color-champagne)] text-[var(--color-bronze)] font-display text-sm"
                                >
                                    {(post.author || post.category).split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                                </span>
                                <div>
                                    <span className="block text-sm font-semibold text-[var(--color-navy)]">
                                        {post.author || 'Asian Star Travel'}
                                    </span>
                                    <span className="block text-xs text-[var(--color-text-muted)]">
                                        {post.author_role || POST_CATEGORY_LABEL[post.category] || post.category}
                                    </span>
                                </div>
                            </div>
                            <Link to="/blog" className="link-premium text-[var(--color-navy)]/60 hover:text-[var(--color-gold)]">
                                Back to the journal
                                <span className="link-arrow" aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Continue reading */}
                <section className="w-full bg-[var(--color-navy)] py-20 sm:py-24 px-5 sm:px-8">
                    <div className="max-w-[1400px] mx-auto text-center">
                        <p className="eyebrow text-[var(--color-gold)]/70 mb-4 justify-center">The Travel Journal</p>
                        <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.0] tracking-[-0.02em] text-white mb-8">
                            More dispatches from the ground.
                        </h2>
                        <Link to="/blog" className="btn btn--md btn--gold">
                            Browse the Journal
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}

export default BlogDetail;
