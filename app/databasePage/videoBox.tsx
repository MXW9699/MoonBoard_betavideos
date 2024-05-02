import React, { useState, useEffect, useRef } from 'react';

const VideoBox = ({ source }: { source: string }) => {
  const [loading, setLoading] = useState(true);
  const [cachedContent, setCachedContent] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const cachedContent = localStorage.getItem(source);
    if (cachedContent) {
      setCachedContent(cachedContent);
      setLoading(false);
    }
  }, [source]);

  const handleLoad = () => {
    setLoading(false);
    const content = iframeRef.current?.contentDocument?.documentElement.innerHTML;
    if (content) {
      localStorage.setItem(source, content);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      <iframe
        loading="lazy"
        className="videoBox"
        src={source}
        onLoad={handleLoad}
        ref={iframeRef}
      ></iframe>
    </div>
  );
};

export default VideoBox;
