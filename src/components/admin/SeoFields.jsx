import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Input, Textarea } from './ui';

/**
 * SEO metadata editor shared by the CMS create/edit forms. Maps directly to the
 * backend `SeoMetadata` schema.
 */
export function SeoFields({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const seo = value || {};

    const set = (key, val) => {
        onChange({ ...seo, [key]: val });
    };

    return (
        <div className="border border-gray-100 rounded-xl overflow-hidden">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between px-4 py-3 bg-cream text-left hover:bg-champagne/60 transition-colors cursor-pointer"
                aria-expanded={open}
            >
                <span className="text-xs font-bold tracking-wider uppercase text-navy">SEO &amp; social sharing</span>
                {open ? <ChevronUp className="h-4 w-4 text-bronze" aria-hidden="true" /> : <ChevronDown className="h-4 w-4 text-bronze" aria-hidden="true" />}
            </button>

            {open && (
                <div className="p-4 space-y-4">
                    <Input id="meta_title" label="Meta title" maxLength={200} value={seo.meta_title || ''} onChange={(e) => set('meta_title', e.target.value)} placeholder="Public page <title>" />
                    <Textarea id="meta_description" label="Meta description" rows={2} maxLength={300} value={seo.meta_description || ''} onChange={(e) => set('meta_description', e.target.value)} placeholder="Shown under the page title in search results" />
                    <Input id="canonical_url" label="Canonical URL" type="url" maxLength={500} value={seo.canonical_url || ''} onChange={(e) => set('canonical_url', e.target.value)} placeholder="https://www.asianstartravel.vn/…" />
                    <Input id="robots" label="Robots directive" maxLength={50} value={seo.robots || ''} onChange={(e) => set('robots', e.target.value)} placeholder="index, follow (default)" />
                    <Input id="og_title" label="OpenGraph title" maxLength={200} value={seo.og_title || ''} onChange={(e) => set('og_title', e.target.value)} />
                    <Input id="og_description" label="OpenGraph description" maxLength={300} value={seo.og_description || ''} onChange={(e) => set('og_description', e.target.value)} />
                    <Input id="og_image_url" label="OpenGraph image URL" type="url" maxLength={500} value={seo.og_image_url || ''} onChange={(e) => set('og_image_url', e.target.value)} />
                    <Input id="twitter_title" label="Twitter title" maxLength={200} value={seo.twitter_title || ''} onChange={(e) => set('twitter_title', e.target.value)} />
                    <Input id="twitter_description" label="Twitter description" maxLength={300} value={seo.twitter_description || ''} onChange={(e) => set('twitter_description', e.target.value)} />
                    <Input id="twitter_image_url" label="Twitter image URL" type="url" maxLength={500} value={seo.twitter_image_url || ''} onChange={(e) => set('twitter_image_url', e.target.value)} />
                    <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={seo.sitemap_include !== false}
                            onChange={(e) => set('sitemap_include', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-[#731E2A] focus:ring-[#731E2A]"
                        />
                        Include in sitemap
                    </label>
                    <Input id="sitemap_priority" label="Sitemap priority" type="number" min="0" max="1" step="0.1" value={seo.sitemap_priority ?? ''} onChange={(e) => set('sitemap_priority', e.target.value === '' ? undefined : Number(e.target.value))} placeholder="0.5" />
                </div>
            )}
        </div>
    );
}