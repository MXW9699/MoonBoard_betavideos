import React, { useState, useEffect, useMemo } from 'react';

export default function VideoBox({
  name,
  source,
}: {
  name: String;
  source: string;
}) {
  const [loading, setLoading] = useState(true);
  const [cachedContent, setCachedContent] = useState<string | null>(null);

  const content = useMemo(
    () => (
      <iframe
        key={`${source}`}
        loading="lazy"
        className="videoBox"
        src={cachedContent || source} // Use cached content if available, otherwise use source
        onLoad={() => setLoading(false)} // Call handleLoad when iframe is loaded
      />
    ),
    [source]
  );

  useEffect(() => {
    // Check if the iframe content is cached
    if (!source) setLoading(false);
    const cachedContent = localStorage.getItem(source);
    if (cachedContent) {
      setCachedContent(cachedContent); // Set cached content if available
    }
  }, [source]); // Trigger effect when source changes

  return (
    <div>
      {loading && <p>Loading...</p>}
      {source ? content : <div className="videoBox">{name}</div>}
    </div>
  );
}
