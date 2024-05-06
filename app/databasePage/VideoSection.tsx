import React, { useMemo } from 'react';
import { Video } from '../types/types';
import VideoBox from './VideoBox';


export default function VideoSection({ vids }: { vids: Video[] }) {
  const memoSection = useMemo(
    () => (
      <div className="videoSection">
        {vids.map((video) => {
          return <VideoBox key={`video${video.ID}`} name={video.problemName} source={video.link} />;
        })}
      </div>
    ),
    [vids]
  );

  return <>{memoSection}</>;
}
