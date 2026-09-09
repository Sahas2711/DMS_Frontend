import { describe, expect, it } from 'vitest';

import { SITE } from './site';
import { blogPostingSchema, breadcrumbListSchema, itemListSchema } from './structuredData';

const ORIGIN = SITE.url;

describe('structuredData', () => {
    describe('blogPostingSchema', () => {
        const post = {
            title: 'Hanoi Coffee Guide',
            slug: 'hanoi-coffee-guide',
            excerpt: 'Where to drink egg coffee in the Old Quarter.',
            author: '',
            published_at: '2025-07-01T09:00:00Z',
        };

        it('builds a BlogPosting from real post values', () => {
            const schema = blogPostingSchema({
                post,
                seo: {},
                canonical: `/blog/${post.slug}`,
                image: '/assets/cover.webp',
            });
            expect(schema['@type']).toBe('BlogPosting');
            expect(schema.headline).toBe(post.title);
            expect(schema.description).toBe(post.excerpt);
            expect(schema.url).toBe(`${ORIGIN}/blog/hanoi-coffee-guide`);
            expect(schema.mainEntityOfPage).toBe(`${ORIGIN}/blog/hanoi-coffee-guide`);
            expect(schema.image).toEqual([`${ORIGIN}/assets/cover.webp`]);
            expect(schema.datePublished).toBe(post.published_at);
            expect(schema.author).toEqual({ '@type': 'Person', name: SITE.name });
            expect(schema.publisher).toEqual({ '@id': `${ORIGIN}/#organization` });
        });

        it('uses a real author when the post has one', () => {
            const schema = blogPostingSchema({
                post: { ...post, author: 'Nikhil' },
                seo: {},
                canonical: '/blog/x',
            });
            expect(schema.author).toEqual({ '@type': 'Person', name: 'Nikhil' });
        });

        it('omits dates and data-URI images rather than fabricating them', () => {
            const schema = blogPostingSchema({
                post: { ...post, published_at: null },
                seo: {},
                canonical: '/blog/x',
                image: 'data:image/png;base64,Zm9v',
            });
            expect(schema.datePublished).toBeUndefined();
            expect(schema.image).toBeUndefined();
        });

        it('never emits undefined values', () => {
            const schema = blogPostingSchema({
                post: { title: 'x', slug: 'x' },
                seo: {},
                canonical: '/blog/x',
            });
            expect(JSON.stringify(schema)).not.toContain('undefined');
        });
    });

    describe('breadcrumbListSchema', () => {
        it('positions items from 1 in order', () => {
            const schema = breadcrumbListSchema([
                { name: 'Home', url: '/' },
                { name: 'Travel Journal', url: '/blog' },
            ]);
            expect(schema.itemListElement.map((item) => item.position)).toEqual([1, 2]);
            expect(schema.itemListElement[0].item).toBe(`${ORIGIN}/`);
        });
    });

    describe('itemListSchema', () => {
        it('builds absolute URLs for listing pages', () => {
            const schema = itemListSchema([{ name: 'Hanoi Coffee Guide', url: '/blog/hanoi-coffee-guide' }]);
            expect(schema.itemListElement[0].url).toBe(`${ORIGIN}/blog/hanoi-coffee-guide`);
        });
    });
});