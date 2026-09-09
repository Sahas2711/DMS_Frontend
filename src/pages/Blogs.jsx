import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/blogs/blogs-hero-image.webp';
import seamlessHanoiTransitImg from '../assets/blogs/SEAMLESS-HANOI-TRANSIT.webp';
import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { PAGE_META } from '../config/site';
import { POST_CATEGORIES } from '../config/posts';
import { postImage } from '../config/postImages';
import { fetchPosts } from '../services/api/cms';

const PhotoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-bronze">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

// The seeded posts ship without a cover_image_url; map their slugs to the
// bundled cover art the static journal historically used. Newly created CMS
// posts render their own cover_image_url (media library or absolute URL).

function formatDate(value) {
    if (!value) return '';
    const d = new Date(value);
    return Number.isNaN(d.getTime())
        ? value
        : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
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
        filteredArticles.find((p) => p.category === 'AIRPORT SERVICES' && (!featured || p.public_id !== featured.public_id)) ||
        filteredArticles.find((p) => (!featured || p.public_id !== featured.public_id)) ||
        null;
    const featuredId = featured?.public_id;
    const editorsId = editorsPick?.public_id;
    const gridArticles = filteredArticles.filter(
        (p) => p.public_id !== featuredId && p.public_id !== editorsId
    );

    return (
        <div className="w-full bg-[#FFFFFF]">
            <Seo {...PAGE_META['/blog']} path="/blog" />

            <PageHero image={heroImage} alt="" eyebrow="Travel Blog" uppercase />

            {/* Travel Journal / Travel Inspiration & Expert Tips Section */}
            <section className="w-full pt-16 md:pt-20 pb-8 md:pb-12 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center bg-[#FFFFFF]">
                <div className="w-full max-w-7xl flex flex-col items-center">

                    {/* Eyebrow Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne border border-[#EDE4D0] text-bronze text-[11px] font-bold tracking-widest uppercase mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-bronze"></span>
                        TRAVEL JOURNAL
                    </div>

                    {/* Section Title */}
                    <h2 className="text-navy text-3xl md:text-4xl lg:text-[46px] font-serif font-normal text-center leading-[1.2] mb-4">
                        Travel Inspiration &amp; Expert Tips
                    </h2>

                    {/* Subtitle */}
                    <p className="text-steel text-sm md:text-base text-center max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed">
                        Discover travel guides, airport tips, destinations and useful insights for a smoother journey across Southeast Asia and beyond.
                    </p>

                    {/* Featured Cover Story Visual */}
                    {featured ? (
                        <Link
                            to={`/blog/${featured.slug}`}
                            className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl min-h-[380px] md:min-h-[480px] lg:min-h-[540px] flex flex-col justify-end p-6 sm:p-8 md:p-12 group cursor-pointer"
                        >
                            <img
                                src={postImage(featured)}
                                alt={featured.title}
                                className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                                decoding="async"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent z-0"></div>

                            <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div className="flex flex-col items-start text-left">
                                    <span className="inline-block text-[9px] sm:text-[10px] font-bold tracking-widest text-[#E3CA90] bg-navy/60 backdrop-blur-sm px-3.5 py-1 rounded-full uppercase mb-3 border border-[#E3CA90]/30">
                                        {(featured.tag || featured.category).replace(/_/g, ' ')}
                                    </span>
                                    <h3 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-serif font-normal leading-[1.2] max-w-2xl drop-shadow-md">
                                        {featured.title}
                                    </h3>
                                    <span className="mt-3 text-[11px] text-white/80">
                                        {featured.excerpt}
                                    </span>
                                </div>

                                <div className="bg-white/95 backdrop-blur-md rounded-xl md:rounded-2xl p-3.5 sm:p-4 shadow-xl border border-white/60 flex items-center gap-3 flex-shrink-0 self-start md:self-end">
                                    <div className="w-9 h-9 rounded-lg bg-champagne flex items-center justify-center flex-shrink-0">
                                        <PhotoIcon />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[9px] sm:text-[10px] font-bold text-bronze tracking-widest uppercase">
                                            READ THE STORY
                                        </span>
                                        <span className="text-xs sm:text-sm font-bold text-navy">
                                            {featured.read_time_minutes ? `${featured.read_time_minutes} min read` : formatDate(featured.published_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="w-full rounded-2xl md:rounded-3xl bg-cream border border-gray-100 min-h-[380px] flex items-center justify-center">
                            {loading ? (
                                <span className="text-steel text-sm">Preparing the travel journal…</span>
                            ) : (
                                <span className="text-steel text-sm">{error || 'No published stories yet — check back soon.'}</span>
                            )}
                        </div>
                    )}

                </div>
            </section>

            {/* Editor's Dispatch & Latest Articles Section */}
            <section className="w-full bg-[#F3F2EE] pt-8 md:pt-10 pb-20 md:pb-28 px-6 md:px-12 lg:px-20 xl:px-32 flex justify-center border-t border-gray-200/60">
                <div className="w-full max-w-7xl flex flex-col items-center">

                    {/* Category Filter Pills */}
                    <div className="w-full flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1 mb-6 md:mb-8 text-left">
                        {CATEGORIES.map((cat) => {
                            const isActive = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                                        isActive
                                            ? 'bg-[#7A5C1E] text-white shadow-sm'
                                            : 'bg-[#EAE7DF] hover:bg-[#DDD9CF] text-[#475467]'
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>

                    {error && !posts.length && (
                        <div className="w-full bg-white rounded-2xl border border-red-200 p-8 text-center mb-12">
                            <p className="text-steel text-sm">{error}</p>
                            <button
                                type="button"
                                onClick={() => { setLoading(true); load(1, false); }}
                                className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-navy text-white text-xs font-semibold transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Top Featured Card: Editor's Dispatch */}
                    {editorsPick && (
                        <div className="w-full bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-gray-100/80 grid grid-cols-1 lg:grid-cols-12 mb-16 md:mb-20 group">
                            <div className="lg:col-span-6 relative overflow-hidden min-h-[300px] lg:min-h-[420px]">
                                <img
                                    src={postImage(editorsPick)}
                                    alt={editorsPick.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute top-5 left-5 bg-navy/90 backdrop-blur-sm text-white text-[9px] md:text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase border border-white/20">
                                    EDITOR'S DISPATCH
                                </div>
                            </div>

                            <div className="lg:col-span-6 p-8 md:p-12 lg:p-14 flex flex-col justify-between text-left">
                                <div>
                                    <div className="flex items-center justify-between text-xs mb-3">
                                        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase">
                                            {editorsPick.category.replace(/_/g, ' ')}
                                        </span>
                                        <span className="text-gray-400 flex items-center gap-1.5 text-xs">
                                            🕒 {formatDate(editorsPick.published_at)} · {editorsPick.read_time_minutes ? `${editorsPick.read_time_minutes} min read` : 'Read'}
                                        </span>
                                    </div>

                                    <h3 className="text-navy text-2xl md:text-3xl lg:text-[34px] font-serif font-normal leading-[1.2] my-4">
                                        {editorsPick.title}
                                    </h3>

                                    <p className="text-steel text-xs md:text-sm leading-relaxed mb-8">
                                        {editorsPick.excerpt}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-champagne flex items-center justify-center text-bronze font-bold text-xs">
                                            {(editorsPick.author || editorsPick.category).split(' ').map((w) => w[0]).join('').slice(0, 3).toUpperCase()}
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="text-xs font-bold text-navy">
                                                {editorsPick.author || 'Asian Star Travel'}
                                            </span>
                                            <span className="text-[10px] text-gray-400">
                                                {editorsPick.author_role || editorsPick.tag || 'Travel Journal'}
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/blog/${editorsPick.slug}`}
                                        className="text-xs font-semibold text-navy hover:text-bronze flex items-center gap-1.5 transition-colors group-hover:gap-2.5"
                                    >
                                        Read Article
                                        <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Middle Section Header */}
                    <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 text-left">
                        <div>
                            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase mb-2 block">
                                SELECTED STORIES
                            </span>
                            <h2 className="text-navy text-3xl md:text-4xl font-serif font-normal">
                                Latest Articles &amp; Insights
                            </h2>
                        </div>
                        <span className="text-xs text-gray-500 mt-2 md:mt-0">
                            Showing {filteredArticles.length} of {Math.max(total, posts.length)} dispatches
                        </span>
                    </div>

                    {/* 3 Articles Grid */}
                    {gridArticles.length === 0 && !loading ? (
                        <div className="w-full bg-white rounded-2xl border border-gray-100 p-10 text-center text-steel text-sm">
                            No stories in this category yet.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 w-full mb-12 md:mb-14">
                            {gridArticles.map((article) => (
                                <Link
                                    key={article.public_id}
                                    to={`/blog/${article.slug}`}
                                    className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={postImage(article)}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-navy text-[9px] font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-sm">
                                            {article.category.replace(/_/g, ' ')}
                                        </span>
                                    </div>

                                    <div className="p-6 md:p-7 flex flex-col justify-between flex-grow text-left">
                                        <div>
                                            <span className="text-[11px] text-gray-400 block mb-2">
                                                📅 {formatDate(article.published_at)} · {article.read_time_minutes ? `${article.read_time_minutes} min read` : 'Read'}
                                            </span>
                                            <h3 className="text-navy text-base md:text-lg font-serif font-bold mb-3 leading-snug">
                                                {article.title}
                                            </h3>
                                            <p className="text-steel text-xs leading-relaxed mb-6">
                                                {article.excerpt}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                            <span className="text-[11px] text-gray-400">
                                                {article.author ? `By ${article.author}` : 'Asian Star Travel'}
                                            </span>
                                            <span className="text-xs font-semibold text-bronze hover:text-navy flex items-center gap-1 transition-colors">
                                                Read More
                                                <span>→</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Bottom Load Button */}
                    {hasMore && (
                        <button
                            type="button"
                            onClick={loadMore}
                            disabled={loadMorePending}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#EBE9E2] hover:bg-[#E0DDD4] text-navy text-xs font-semibold transition-colors shadow-sm disabled:opacity-60"
                        >
                            <span>{loadMorePending ? '⏳' : '🔄'}</span>
                            {loadMorePending ? 'Loading…' : 'Load Prior Dispatches'}
                        </button>
                    )}

                </div>
            </section>

            {/* Seamless Hanoi Transit CTA Banner Section */}
            <section className="relative w-full overflow-hidden min-h-[380px] md:min-h-[440px] flex items-center justify-center">
                <img
                    src={seamlessHanoiTransitImg}
                    alt="Seamless Hanoi Transit"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    loading="lazy"
                    decoding="async"
                />

                <div className="absolute inset-0 bg-navy/40 z-0"></div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16 md:py-20 flex flex-col items-center text-center">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-[#E3CA90] uppercase mb-3 block">
                        SEAMLESS HANOI TRANSIT
                    </span>

                    <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif font-normal leading-tight mb-4 drop-shadow-md">
                        Hanoi Airport, Made Easy.
                    </h2>

                    <p className="text-gray-200 text-xs sm:text-sm md:text-base max-w-lg mb-8 leading-relaxed drop-shadow-sm">
                        Book your Fast Track assistance today and experience effortless airport hospitality.
                    </p>

                    <Link
                        to="/services/airport-fast-track"
                        className="inline-flex items-center justify-center bg-[#E5B869] hover:bg-[#D4A758] text-navy font-bold text-xs md:text-sm px-8 py-3.5 rounded-lg uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                        BOOK NOW
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Blogs;