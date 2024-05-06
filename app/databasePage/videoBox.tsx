import React, { useState, useEffect, useMemo } from 'react';

export function VideoBox({ source }: { source: string }) {
  const [loading, setLoading] = useState(true);
  const [cachedContent, setCachedContent] = useState<string | null>(null);

  const content = useMemo(
    () => (
      <iframe
        key={`${source}`}
        loading="lazy"
        className="videoBox"
        src={cachedContent || source} // Use cached content if available, otherwise use source
        onLoad={() => setLoading(false)} // set loaded after load
        sandbox="allow-same-origin allow-scripts"
      />
    ),
    [source]
  );

  useEffect(() => {
    // Check if the iframe content is cached
    const cachedContent = localStorage.getItem(source);
    if (cachedContent) {
      setCachedContent(cachedContent); // Set cached content if available
    }
  }, [source]); // Trigger effect when source changes

  return (
    <div>
      {loading && <p>Loading...</p>}
      {content}
    </div>
  );
}
