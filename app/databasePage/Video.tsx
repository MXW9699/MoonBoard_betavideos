import React, { useRef, useState } from 'react';
import { VideoType } from '../types/types';

export default function Video({ video }: { video: VideoType }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const videoElement = vidRef.current;
    if (!videoElement) return;
    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <video
        ref={vidRef}
        style={{ width: '100%', height: '100%' }}
        crossOrigin="anonymous"
        src={video.video}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controls
      />
      {!isPlaying && (
        <div className="playButton" onClick={togglePlay}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="white"
            className="bi bi-play"
            viewBox="0 0 16 16"
          >
            <path d="M11.39 8l-6.2-4.5A.5.5 0 0 0 4 4.06v7.77a.5.5 0 0 0 .69.46l6.2-4.5a.5.5 0 0 0 0-.82z" />
          </svg>
        </div>
      )}
    </>
  );
}
