import React from 'react';
import { Video } from '../types/types';
import VideoBox from './VideoBox';

const VideoSection = ({ vids }: { vids: Video[] }) => {
  return (
    <div className="videoSection">
      {vids.map((video) => {
        return <VideoBox key={`video${video.ID}`} source={video.link} />;
      })}
    </div>
  );
};

export default VideoSection;
