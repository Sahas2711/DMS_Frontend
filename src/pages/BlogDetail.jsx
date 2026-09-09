import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Seo from '../components/Seo';
import { SITE } from '../config/site';
import { POST_CATEGORY_LABEL } from '../config/posts';
import { postImage } from '../config/postImages';
import { fetchPostBySlug } from '../services/api/cms';
import { errorMessage } from '../services/api/client';

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
                <div className="text-navy text-sm font-semibold tracking-wider uppercase">Loading story…</div>
            </div>
        );
    }

    if (state.status === 'error') {
        return (
            <div className="min-h-[60vh] bg-cream flex items-center justify-center px-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-md text-center">
                    <Seo title="Story not found" noIndex path={`/blog/${slug}`} />
                    <h1 className="text-navy font-serif text-2xl font-bold mb-2">Story not available</h1>
                    <p className="text-steel text-sm leading-relaxed mb-5">{state.error}</p>
                    <Link to="/blog" className="btn btn--wine btn--md">
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to the journal
                    </Link>
                </div>
            </div>
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
        <div className="w-full flex flex-col bg-[#FFFFFF]">
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

            {/* Back link */}
            <div className="w-full max-w-4xl mx-auto px-6 md:px-8 pt-10 md:pt-14 text-left">
                <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-navy hover:text-bronze transition-colors uppercase tracking-wider">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Travel Journal
                </Link>
            </div>

            {/* Hero */}
            <section className="relative w-full h-[46vh] md:h-[58vh] flex items-center justify-center overflow-hidden">
                <img
                    src={cover}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-navy/50 z-0" aria-hidden="true" />
                <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase bg-white/90 text-navy px-3 py-1 rounded-full mb-4">
                        {post.tag || POST_CATEGORY_LABEL[post.category] || post.category}
                    </span>
                    <h1 className="text-white text-3xl md:text-5xl font-serif tracking-wide leading-tight">{post.title}</h1>
                    <div className="w-24 h-px bg-gold my-5" aria-hidden="true" />
                    <div className="flex flex-wrap items-center justify-center gap-4 text-gray-100 text-sm">
                        <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-gold" aria-hidden="true" />
                            {formatDate(post.published_at)}
                        </span>
                        {post.read_time_minutes && (
                            <span className="inline-flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
                                {post.read_time_minutes} min read
                            </span>
                        )}
                        {post.author && <span>{post.author}</span>}
                    </div>
                </div>
            </section>

            {/* Body */}
            <section className="w-full pt-12 md:pt-16 pb-20 md:pb-28 px-6 md:px-8 flex justify-center">
                <div className="w-full max-w-3xl text-left">
                    {post.excerpt && (
                        <p className="text-lg md:text-xl text-navy font-serif leading-relaxed mb-8">
                            {post.excerpt}
                        </p>
                    )}
                    {paragraphs.length > 0 ? (
                        paragraphs.map((paragraph, i) => (
                            <p key={i} className="text-steel text-sm md:text-base leading-[1.9] mb-6">
                                {paragraph}
                            </p>
                        ))
                    ) : (
                        <p className="text-steel text-sm md:text-base leading-[1.9]">
                            This story is still being written — check back soon for the full dispatch.
                        </p>
                    )}

                    <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-champagne flex items-center justify-center text-bronze font-bold text-sm">
                                {(post.author || post.category).split(' ').map((w) => w[0]).join('').slice(0, 3).toUpperCase()}
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-bold text-navy">{post.author || 'Asian Star Travel'}</span>
                                <span className="text-xs text-gray-400">{post.author_role || POST_CATEGORY_LABEL[post.category] || post.category}</span>
                            </div>
                        </div>
                        <Link to="/blog" className="text-xs font-semibold text-bronze hover:text-navy transition-colors uppercase tracking-wider">
                            ← Back to the journal
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BlogDetail;