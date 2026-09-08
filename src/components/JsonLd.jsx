const toJson = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

/**
 * Renders JSON-LD structured data. Pass an object or an array of schema.org
 * objects; each object is emitted in its own <script type="application/ld+json">
 * block so the JSON remains valid for crawler parsers.
 */
const JsonLd = ({ data }) => {
    if (!data) return null;
    const payloads = Array.isArray(data) ? data : [data];
    return (
        <>
            {payloads.map((payload, index) => (
                <script key={index} type="application/ld+json">
                    {toJson(payload)}
                </script>
            ))}
        </>
    );
};

export default JsonLd;