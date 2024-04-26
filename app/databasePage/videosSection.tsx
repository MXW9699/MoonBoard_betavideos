import React from 'react';
import VideoBox from './videoBox';
import { Video } from '../types/types';

const videoSection = ({ vids }: { vids: Video[] }) => {
  return (
    <div className="videoSection">
      {vids.map((video) => {
        return <VideoBox key={`video${video.ID}`} source={video.link} />;
      })}
    </div>
  );
};

export default videoSection;
