import React from 'react';
import VideoBox from './videoBox.jsx';

const videoSection = ({ vids }) => {
  return (
    <div className="videoSection">
      {vids.map((video) => {
        return <VideoBox key={`video${video.ID}`} source={video.link} />;
      })}
    </div>
  );
};

export default videoSection;
