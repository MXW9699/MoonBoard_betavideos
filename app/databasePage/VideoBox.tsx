import React, { useState, useEffect, useMemo, useRef } from 'react';
import { VideoType } from '../types/types';
import Video from './Video';

export default function VideoBox({ video }: { video: VideoType }) {
  // useEffect(() => {
  //   // Check if the iframe content is cached
  //   if (!source) setLoading(false);
  //   const cachedContent = localStorage.getItem(source);
  //   if (cachedContent) {
  //     setCachedContent(cachedContent); // Set cached content if available
  //   }
  // }, [source]); // Trigger effect when source changes

  return (
    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
      <div className="videoBox">
        {video.video ? (
          <Video video={video} />
        ) : (
          <iframe
            loading="lazy"
            style={{ height: '100%', width: '100%' }}
            src={video.link}
          ></iframe>
        )}
      </div>
      <a href={video.link.slice(0, video.link.length - 6)}>
        {video.problemName}
      </a>
    </div>
  );
}
