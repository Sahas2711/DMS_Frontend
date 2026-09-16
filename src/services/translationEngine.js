const ENDPOINT =
    'https://translate.googleapis.com/translate_a/single';

const SOURCE = 'en';

/*
 * Google Translate's unofficial GTX endpoint is sensitive to
 * excessively long query strings.
 *
 * Do NOT use 60 arbitrary text nodes per request.
 * Build batches based on both number of lines and characters.
 */
const MAX_BATCH_LINES = 18;
const MAX_BATCH_CHARS = 3500;

const CONCURRENCY = 5;

const DEBOUNCE_MS = 300;

const SHOW_TEXT = 4;
const FILTER_ACCEPT = 1;
const FILTER_REJECT = 2;

const NO_TRANSLATE =
    '[translate="no"], [data-no-translate]';

const SKIP_SELECTOR =
    'script,style,noscript,code,pre,textarea,select,template,svg,math,option';

const ATTR_NAMES = [
    'aria-label',
    'placeholder',
    'title',
    'alt',
];

/*
 * Keep the cache in memory for the current session.
 *
 * sessionStorage additionally means:
 *
 * visit page
 * → translate Japanese
 * → switch Korean
 * → cached
 *
 * and even:
 *
 * refresh
 * → Japanese
 *
 * can reuse translations already fetched during the session.
 */

const CACHE_STORAGE_KEY = 'ast-translation-cache-v1';

const cache = new Map();

const textRecords = new Map();
const attrRecords = new Map();

let current = 'en';

let observer = null;
let timer = null;

let runId = 0;
let translationRunning = false;


/* ═══════════════════════════════════════════════════════════════
   CACHE
   ═══════════════════════════════════════════════════════════════ */

function keyOf(lang, value) {
    return `${lang}\u0000${value}`;
}

function loadPersistentCache() {
    if (typeof window === 'undefined') return;

    try {
        const raw =
            window.sessionStorage.getItem(
                CACHE_STORAGE_KEY
            );

        if (!raw) return;

        const parsed = JSON.parse(raw);

        if (!parsed || typeof parsed !== 'object') {
            return;
        }

        for (const [key, value] of Object.entries(parsed)) {
            if (typeof value === 'string') {
                cache.set(key, value);
            }
        }
    } catch {
        // Storage unavailable/corrupt. Memory cache still works.
    }
}

function persistCache() {
    if (typeof window === 'undefined') return;

    try {
        /*
         * Prevent sessionStorage from growing indefinitely.
         */
        const entries = [...cache.entries()];

        const MAX_PERSISTED_ENTRIES = 3000;

        const limited =
            entries.length > MAX_PERSISTED_ENTRIES
                ? entries.slice(
                      entries.length -
                          MAX_PERSISTED_ENTRIES
                  )
                : entries;

        window.sessionStorage.setItem(
            CACHE_STORAGE_KEY,
            JSON.stringify(
                Object.fromEntries(limited)
            )
        );
    } catch {
        // Storage quota/private mode/etc.
    }
}

loadPersistentCache();


/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */

const hasLetters = (value) =>
    /\p{L}/u.test(value);

function buildBatches(items) {
    const batches = [];

    let currentBatch = [];
    let currentChars = 0;

    for (const item of items) {
        const length =
            typeof item === 'string'
                ? item.length
                : 0;

        /*
         * A single extremely long string gets its own batch.
         */
        if (
            length > MAX_BATCH_CHARS ||
            (currentBatch.length >= MAX_BATCH_LINES) ||
            (
                currentBatch.length > 0 &&
                currentChars + length >
                    MAX_BATCH_CHARS
            )
        ) {
            if (currentBatch.length) {
                batches.push(currentBatch);
            }

            currentBatch = [item];
            currentChars = length;

            continue;
        }

        currentBatch.push(item);
        currentChars += length;
    }

    if (currentBatch.length) {
        batches.push(currentBatch);
    }

    return batches;
}


async function runPool(items, size, fn) {
    let index = 0;

    const workers = Array.from(
        {
            length: Math.min(
                size,
                items.length
            ),
        },
        async () => {
            while (true) {
                const currentIndex = index++;

                if (currentIndex >= items.length) {
                    break;
                }

                try {
                    await fn(
                        items[currentIndex]
                    );
                } catch {
                    /*
                     * One failed batch must not prevent the
                     * remaining batches from completing.
                     */
                }
            }
        }
    );

    await Promise.all(workers);
}


/* ═══════════════════════════════════════════════════════════════
   GOOGLE TRANSLATE REQUEST
   ═══════════════════════════════════════════════════════════════ */

async function rawBatch(lines, target) {
    if (!lines.length) {
        return [];
    }

    const controller =
        typeof AbortController !== 'undefined'
            ? new AbortController()
            : null;

    /*
     * Don't allow one hanging request to hold the entire
     * translation operation forever.
     */
    const timeout =
        typeof window !== 'undefined'
            ? window.setTimeout(() => {
                  controller?.abort();
              }, 10000)
            : null;

    try {
        const url =
            `${ENDPOINT}?client=gtx` +
            `&sl=${SOURCE}` +
            `&tl=${encodeURIComponent(target)}` +
            `&dt=t` +
            `&q=${encodeURIComponent(
                lines.join('\n')
            )}`;

        const response = await fetch(url, {
            method: 'GET',
            signal: controller?.signal,
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        const segments =
            Array.isArray(data) &&
            Array.isArray(data[0])
                ? data[0]
                : null;

        if (!segments) {
            return null;
        }

        /*
         * GTX sometimes returns fewer segments than expected.
         * In that case, let the caller retry smaller batches.
         */
        const result = [];

        for (const segment of segments) {
            const translated =
                Array.isArray(segment)
                    ? segment[0]
                    : null;

            if (
                typeof translated ===
                'string'
            ) {
                result.push(translated);
            }
        }

        if (result.length !== lines.length) {
            return null;
        }

        return result.map(
            (line, index) =>
                index < result.length - 1
                    ? line.replace(/\n+$/, '')
                    : line
        );
    } catch {
        return null;
    } finally {
        if (timeout) {
            window.clearTimeout(timeout);
        }
    }
}


/* ═══════════════════════════════════════════════════════════════
   FETCH MISSING TRANSLATIONS
   ═══════════════════════════════════════════════════════════════ */

async function fetchMissing(lines, target) {
    const unique = [
        ...new Set(
            lines.filter(
                (value) =>
                    typeof value === 'string' &&
                    value.trim() !== ''
            )
        ),
    ];

    if (!unique.length) {
        return;
    }

    const missing = unique.filter(
        (line) =>
            !cache.has(
                keyOf(target, line)
            )
    );

    if (!missing.length) {
        return;
    }

    const batches = buildBatches(missing);

    await runPool(
        batches,
        CONCURRENCY,
        async (batch) => {
            /*
             * Check cache again because another worker may
             * have populated it.
             */
            const stillMissing =
                batch.filter(
                    (line) =>
                        !cache.has(
                            keyOf(target, line)
                        )
                );

            if (!stillMissing.length) {
                return;
            }

            const result = await rawBatch(
                stillMissing,
                target
            );

            if (result) {
                stillMissing.forEach(
                    (line, index) => {
                        cache.set(
                            keyOf(target, line),
                            result[index]
                        );
                    }
                );

                return;
            }

            /*
             * Batch failed.
             *
             * Retry each line individually, but only for
             * the failed batch.
             */
            await runPool(
                stillMissing,
                3,
                async (line) => {
                    const single =
                        await rawBatch(
                            [line],
                            target
                        );

                    if (single?.[0]) {
                        cache.set(
                            keyOf(
                                target,
                                line
                            ),
                            single[0]
                        );
                    }
                }
            );
        }
    );

    persistCache();
}


/* ═══════════════════════════════════════════════════════════════
   TRANSLATE VALUES
   ═══════════════════════════════════════════════════════════════ */

async function translateValues(
    values,
    target,
    requestId
) {
    const unique = [
        ...new Set(
            values.filter(
                (value) =>
                    typeof value === 'string' &&
                    value.trim() !== ''
            )
        ),
    ];

    const resolved = new Map();

    if (!unique.length) {
        return resolved;
    }

    const pending = [];
    const missingLines = [];

    for (const value of unique) {
        const fullKey =
            keyOf(target, value);

        const cached =
            cache.get(fullKey);

        if (cached != null) {
            resolved.set(
                value,
                cached
            );

            continue;
        }

        const lines =
            value.split('\n');

        const parts = [];

        for (const line of lines) {
            if (line === '') {
                parts.push('');
                continue;
            }

            const lineKey =
                keyOf(target, line);

            const cachedLine =
                cache.get(lineKey);

            if (cachedLine != null) {
                parts.push(cachedLine);
            } else {
                parts.push(null);
                missingLines.push(line);
            }
        }

        pending.push({
            value,
            fullKey,
            lines,
            parts,
        });
    }

    if (requestId !== runId) {
        return resolved;
    }

    await fetchMissing(
        missingLines,
        target
    );

    /*
     * User switched language while network requests were running.
     */
    if (requestId !== runId) {
        return resolved;
    }

    for (const item of pending) {
        const {
            value,
            fullKey,
            lines,
            parts,
        } = item;

        for (
            let index = 0;
            index < parts.length;
            index += 1
        ) {
            if (parts[index] !== null) {
                continue;
            }

            parts[index] =
                cache.get(
                    keyOf(
                        target,
                        lines[index]
                    )
                ) ?? lines[index];
        }

        const translated =
            parts.join('\n');

        cache.set(
            fullKey,
            translated
        );

        resolved.set(
            value,
            translated
        );
    }

    return resolved;
}


/* ═══════════════════════════════════════════════════════════════
   TEXT NODE COLLECTION
   ═══════════════════════════════════════════════════════════════ */

function collectTextNodes(root) {
    const found = [];

    if (!root) {
        return found;
    }

    const walker =
        document.createTreeWalker(
            root,
            SHOW_TEXT,
            {
                acceptNode(node) {
                    const parent =
                        node.parentElement;

                    if (!parent) {
                        return FILTER_REJECT;
                    }

                    if (
                        parent.closest(
                            NO_TRANSLATE
                        )
                    ) {
                        return FILTER_REJECT;
                    }

                    if (
                        parent.matches(
                            SKIP_SELECTOR
                        )
                    ) {
                        return FILTER_REJECT;
                    }

                    const value =
                        node.nodeValue;

                    if (
                        value == null ||
                        value.length === 0 ||
                        value.length > 1500
                    ) {
                        return FILTER_REJECT;
                    }

                    if (
                        !hasLetters(value)
                    ) {
                        return FILTER_REJECT;
                    }

                    return FILTER_ACCEPT;
                },
            }
        );

    let node;

    while (
        (node = walker.nextNode())
    ) {
        found.push(node);
    }

    return found;
}


/* ═══════════════════════════════════════════════════════════════
   ATTRIBUTE COLLECTION
   ═══════════════════════════════════════════════════════════════ */

function collectAttrTargets(root) {
    const found = [];

    if (!root) {
        return found;
    }

    const elements =
        root.querySelectorAll('*');

    for (const element of elements) {
        if (
            element.closest(
                NO_TRANSLATE
            )
        ) {
            continue;
        }

        if (
            element.matches(
                SKIP_SELECTOR
            )
        ) {
            continue;
        }

        for (const name of ATTR_NAMES) {
            const value =
                element.getAttribute(
                    name
                );

            if (
                value == null ||
                value.trim() === '' ||
                value.length > 1500
            ) {
                continue;
            }

            if (!hasLetters(value)) {
                continue;
            }

            found.push({
                element,
                name,
                value,
            });
        }
    }

    return found;
}


/* ═══════════════════════════════════════════════════════════════
   ORIGINAL TEXT RECORDS
   ═══════════════════════════════════════════════════════════════ */

function ensureTextRecord(node) {
    let record =
        textRecords.get(node);

    if (!record) {
        record = {
            orig: node.nodeValue,
            applied: null,
            lang: null,
        };

        textRecords.set(
            node,
            record
        );
    }

    /*
     * React may replace a text node's content.
     *
     * If the current value isn't the known original or
     * currently applied translation, treat it as new source text.
     */
    if (
        record.applied !== null &&
        node.nodeValue !== record.applied &&
        node.nodeValue !== record.orig
    ) {
        record.orig = node.nodeValue;
        record.applied = null;
        record.lang = null;
    }

    return record;
}


function ensureAttrRecord(element) {
    let record =
        attrRecords.get(element);

    if (!record) {
        record = {
            orig: {},
            applied: {},
        };

        attrRecords.set(
            element,
            record
        );
    }

    return record;
}


/* ═══════════════════════════════════════════════════════════════
   TRANSLATE BODY
   ═══════════════════════════════════════════════════════════════ */

async function translateBody(
    target,
    requestId
) {
    if (
        typeof document === 'undefined' ||
        !document.body
    ) {
        return false;
    }

    const nodes =
        collectTextNodes(
            document.body
        );

    /*
     * IMPORTANT:
     *
     * We translate record.orig rather than node.nodeValue.
     *
     * Therefore:
     *
     * Japanese → Korean
     *
     * does NOT need:
     *
     * Japanese → English → Korean
     *
     * and does NOT need to restore the whole DOM first.
     */
    const textCandidates = [];

    for (const node of nodes) {
        const record =
            ensureTextRecord(node);

        if (
            record.lang === target &&
            node.nodeValue ===
                record.applied
        ) {
            continue;
        }

        textCandidates.push({
            node,
            source: record.orig,
            record,
        });
    }

    /*
     * Attributes are collected separately.
     */
    const attrs =
        collectAttrTargets(
            document.body
        );

    const attrCandidates = [];

    for (const item of attrs) {
        const {
            element,
            name,
            value,
        } = item;

        const record =
            ensureAttrRecord(
                element
            );

        if (
            record.applied[name]?.lang ===
                target &&
            record.applied[name]?.value ===
                value
        ) {
            continue;
        }

        /*
         * If React changed the attribute, that new value becomes
         * the English source.
         */
        if (
            record.applied[name] &&
            value !==
                record.applied[name].value
        ) {
            record.orig[name] = value;
        }

        if (
            record.orig[name] == null
        ) {
            record.orig[name] = value;
        }

        attrCandidates.push({
            element,
            name,
            source: record.orig[name],
            record,
        });
    }

    /*
     * TEXT + ATTRIBUTES RUN IN PARALLEL.
     *
     * This removes unnecessary sequential waiting.
     */
    const [
        textMap,
        attrMap,
    ] = await Promise.all([
        translateValues(
            textCandidates.map(
                (item) => item.source
            ),
            target,
            requestId
        ),

        translateValues(
            attrCandidates.map(
                (item) => item.source
            ),
            target,
            requestId
        ),
    ]);

    if (requestId !== runId) {
        return false;
    }

    /*
     * Apply text translations in one synchronous pass.
     */
    for (const item of textCandidates) {
        const translated =
            textMap.get(
                item.source
            );

        if (translated == null) {
            continue;
        }

        /*
         * React may have replaced the node while the request
         * was running.
         */
        if (!item.node.isConnected) {
            continue;
        }

        if (
            item.node.nodeValue !==
            translated
        ) {
            item.node.nodeValue =
                translated;
        }

        item.record.applied =
            translated;

        item.record.lang =
            target;
    }

    /*
     * Apply attributes.
     */
    for (const item of attrCandidates) {
        const translated =
            attrMap.get(
                item.source
            );

        if (translated == null) {
            continue;
        }

        if (
            !item.element.isConnected
        ) {
            continue;
        }

        if (
            item.element.getAttribute(
                item.name
            ) !== translated
        ) {
            item.element.setAttribute(
                item.name,
                translated
            );
        }

        item.record.applied[
            item.name
        ] = {
            value: translated,
            lang: target,
        };
    }

    return (
        textCandidates.length > 0 ||
        attrCandidates.length > 0
    );
}


/* ═══════════════════════════════════════════════════════════════
   MUTATION OBSERVER
   ═══════════════════════════════════════════════════════════════ */

function scheduleMutationTranslation() {
    clearTimeout(timer);

    timer = setTimeout(() => {
        if (
            current &&
            current !== 'en' &&
            !translationRunning
        ) {
            /*
             * Check if any new nodes need translation
             * before starting a full translateBody pass.
             */
            const nodes =
                collectTextNodes(
                    document.body
                );

            let hasNew = false;

            for (const node of nodes) {
                const record =
                    ensureTextRecord(node);

                if (
                    record.lang !== current &&
                    record.orig != null
                ) {
                    hasNew = true;
                    break;
                }
            }

            if (!hasNew) {
                return;
            }

            const id = ++runId;

            translationRunning = true;

            translateBody(current, id)
                .then(() => {
                    if (id === runId) {
                        translationRunning = false;
                    }
                })
                .catch(() => {
                    if (id === runId) {
                        translationRunning = false;
                    }
                });
        }
    }, DEBOUNCE_MS);
}


function startObserver() {
    if (
        observer ||
        typeof MutationObserver ===
            'undefined' ||
        typeof document ===
            'undefined' ||
        !document.body
    ) {
        return;
    }

    observer =
        new MutationObserver(
            scheduleMutationTranslation
        );

    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true,
            characterData: true,
        }
    );
}


function stopObserver() {
    clearTimeout(timer);

    timer = null;

    if (observer) {
        observer.disconnect();
        observer = null;
    }
}


/* ═══════════════════════════════════════════════════════════════
   RESTORE ENGLISH
   ═══════════════════════════════════════════════════════════════ */

function restore() {
    /*
     * Stop observing BEFORE modifying the DOM.
     *
     * This is important.
     */
    stopObserver();

    for (
        const [node, record]
        of textRecords
    ) {
        if (
            !node.isConnected
        ) {
            continue;
        }

        if (
            record.orig != null &&
            node.nodeValue !==
                record.orig
        ) {
            node.nodeValue =
                record.orig;
        }

        record.applied = null;
        record.lang = null;
    }

    for (
        const [element, record]
        of attrRecords
    ) {
        if (
            !element.isConnected
        ) {
            continue;
        }

        for (
            const name in record.orig
        ) {
            element.setAttribute(
                name,
                record.orig[name]
            );
        }

        record.applied = {};
    }

    if (
        typeof document !== 'undefined'
    ) {
        document.documentElement.lang =
            SOURCE;
    }
}


/* ═══════════════════════════════════════════════════════════════
   PUBLIC APPLY
   ═══════════════════════════════════════════════════════════════ */

export async function apply(
    target,
    force = false
) {
    if (
        typeof document === 'undefined' ||
        !document.body
    ) {
        return true;
    }

    if (
        !target ||
        target === SOURCE
    ) {
        runId += 1;

        current = SOURCE;

        translationRunning = false;

        restore();

        return true;
    }

    /*
     * Don't start duplicate translations.
     */
    if (
        !force &&
        target === current &&
        translationRunning
    ) {
        return true;
    }

    /*
     * Same language and already translated.
     */
    if (
        !force &&
        target === current
    ) {
        return true;
    }

    const id = ++runId;

    /*
     * IMPORTANT:
     *
     * Do NOT restore when switching:
     *
     * Japanese → Korean
     *
     * because records already contain the original English.
     */
    stopObserver();

    current = target;

    document.documentElement.lang =
        target;

    translationRunning = true;

    try {
        const ok =
            await translateBody(
                target,
                id
            );

        /*
         * Ignore stale requests.
         */
        if (id !== runId) {
            return true;
        }

        if (!ok) {
            translationRunning = false;

            return true;
        }

        translationRunning = false;

        startObserver();

        return true;
    } catch (error) {
        if (id !== runId) {
            return true;
        }

        console.error(
            '[Translation]',
            error
        );

        translationRunning = false;

        startObserver();

        return false;
    }
}


/* ═══════════════════════════════════════════════════════════════
   PUBLIC STOP
   ═══════════════════════════════════════════════════════════════ */

export function stop() {
    runId += 1;

    translationRunning = false;

    stopObserver();
}


/* ═══════════════════════════════════════════════════════════════
   PUBLIC RESET (test helper)
   ═══════════════════════════════════════════════════════════════ */

export function reset() {
    stop();

    cache.clear();
    textRecords.clear();
    attrRecords.clear();

    current = 'en';
    runId = 0;
}