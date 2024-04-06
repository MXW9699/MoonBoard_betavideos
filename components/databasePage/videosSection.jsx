import React from 'react';
import VideoBox from './videoBox.jsx';

const videoSection = ({ vids }) => {
  //create an array of problem divs
  const vidbox = [];
  for (let i = 0; i < vids.length; i++) {
    vidbox.push(<VideoBox key={`video${vids[i].ID}`} source={vids[i].link} />);
  }
  return <div className="videoSection">{vidbox}</div>;
};

export default videoSection;
