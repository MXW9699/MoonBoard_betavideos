import React, { useMemo } from 'react';
import {VideoType } from '../types/types';
import VideoBox from './VideoBox';



export default function VideoSection({ vids }: { vids: VideoType[] }) {
  const memoSection = useMemo(
    () => (
      <div className="videoSection">
        {vids.map((video) => {
          return <VideoBox key={`video${video.ID}`} video={video}/>
        })}
      </div>
    ),
    [vids]
  );

  return <>{memoSection}</>;
}
