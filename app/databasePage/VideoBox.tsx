import React, { useState, useEffect, useMemo, useRef } from 'react';

export default function VideoBox({
  name,
  source,
}: {
  name: String;
  source: string;
}) {
  const [loading, setLoading] = useState(true);
  const [cachedContent, setCachedContent] = useState<string | null>(null);
  const iframRef = useRef<HTMLIFrameElement>(null);

  function removeScrollIFrame() {
    console.log(iframRef.current);
    if (iframRef && iframRef.current) {
      const document = iframRef.current.contentDocument;
      // console.log(document);
      if (document) {
        const body = document.querySelector('body');
        console.log(body);
        if (body) body.style.overflow = 'hidden';
      }
    }
  }

  let item = `<blockquote
        class="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/CzR6f1xu1Hm/"
        data-instgrm-version="14"
      >
      </blockquote>
      <script async src="//www.instagram.com/embed.js"></script>`;

  const content = (
    <div className="videoBox">
      <iframe
        ref={iframRef}
        key={`${source}`}
        loading="lazy"
        //srcDoc={item}
        src={cachedContent || source} // Use cached content if available, otherwise use source
        onLoad={() => setLoading(false)} // Call handleLoad when iframe is loaded
        style={{
          height: '700px',
          width: '100%',
          position: 'relative',
          top: '-55px',
        }}
      />
    </div>
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
    <div style={{ textAlign: 'center' }}>
      {loading && <p>Loading...</p>}
      {source ? content : <div className="videoBox">{name}</div>}
      <p>{name}</p>
    </div>
  );
}
