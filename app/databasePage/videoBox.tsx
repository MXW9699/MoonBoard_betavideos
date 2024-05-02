import React, { useState, useEffect } from 'react';

const VideoBox = ({ source }: { source: string }) => {
  const [loading, setLoading] = useState(true);
  const [cachedContent, setCachedContent] = useState<string | null>(null);

  useEffect(() => {
    // Check if the iframe content is cached
    const cachedContent = localStorage.getItem(source);
    console.log("localStorage")
    if (cachedContent) {
      setCachedContent(cachedContent); // Set cached content if available
    }
    // setLoading(false); // Set loading to false since the content is already cached
  }, [source]); // Trigger effect when source changes

  const handleLoad = () => {
    // localStorage.setItem(source, source); // Cache the iframe content
    // console.log(localStorage)
    setLoading(false); // Set loading to false once the iframe has loaded
  };

  return (
    <div>
      {loading && <p>Loading...</p>}{' '}
      {/* Conditional rendering of loading message */}
      <iframe
        loading="lazy"
        className="videoBox"
        src={cachedContent || source} // Use cached content if available, otherwise use source
        onLoad={handleLoad} // Call handleLoad when iframe is loaded
      ></iframe>
    </div>
  );
};

export default VideoBox;
